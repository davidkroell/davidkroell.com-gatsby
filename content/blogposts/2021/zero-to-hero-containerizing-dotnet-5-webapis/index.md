---
title: "Zero to Hero: Containerizing .NET 5.0 WebApis"
categories: ["programming"]
image: "./esteban-lopez-6yjAC0-OwkA-unsplash.jpg"
imageCredit: https://unsplash.com/photos/6yjAC0-OwkA
date: "2021-07-10"
description: "The ultimate guide for running your .NET 5.0 WebApi inside a Docker container."
---

In this guide I'd like to show the most important topics and aspects when talking about containerizing a .NET 5.0 WebApi application.
There are many articles about it online but no one takes care of all aspects - until now.
With this guide you'd be able to go from zero :zero: to hero :mount_fuji: when talking about containers and .NET 5.0 WebApi.

> This articles focuses on building the app inside a Linux container. 
I won't talk about .NET Framework (4.x) which would require the Windows platform to run.

### What's inside

The following topics are going to be considered in this guide:

* Configuration
* Testing
* OpenAPI spec (Swaggerfile) generation
* Image size optimizations
* Container security
* Overwriting defaults

## Intial Dockerfile setup

This is the base version we are going to improve step by step in this guide.
The major downside is, that there is much more included in the
final image than we need for production use.

```Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:5.0-alpine AS build
WORKDIR /source

# Copy and restore
COPY . .
# make sure this is set in the RuntimeIdentifiers of the .csproj
RUN dotnet restore -r linux-musl-x64

# publish project (StartupProject is the startup project)
RUN dotnet publish -c Release -o /appReleased -r linux-musl-x64 \
    --no-restore StartupProject/*.csproj

ENTRYPOINT ["/appReleased/StartupProject"]
```


## Configuration

Application configuration is nowadays typically done in `appsettings.json`.
Nevertheless there are a bunch more configuration providers pre-built in the ASP .NET Core 5.0 framework.
These include the following:
* Environment variables
* Command line args
* Directory files

In fact it does matter in which order you apply these setting because they can overwrite each other.
This powerful feature enables us to have some default configuration which can be overwritten at runtime.

My way of configuring the application is a mixture of the `appsettings.json` file and environment variables.

Since the settings file is a JSON, nesting is possible.
When providing configuration with environment variables,
you should split these using `__` (a `double underline`).

Taking the following file as example:

```json
// appsettings.json
{
    "JWT": {
        "Secret": ""
    }
    // ...
}
```

Assuming the configuration file from above,
overwriting with environment variables
is possible with the following statement:

```bash
export JWT__Secret=superSecureJWTSecret
```

I don't want the secrets like external API keys, JWT details, etc.
inside my Git history, so they are provided as environment variables at application runtime.

I'm using the settings file for a basic default configuration
and the environment variables for the complete setup.
As already mentioned above, the environment variables will overwrite configuration done in
`appsettings.json`, when the same key is provided. 

## Testing

Running tests every time you build your application is a crucial part of any CI pipeline,
and executing them inside an isolated environment is even better.

Running unit tests within the new .NET 5.0 ecosystem is as easy as calling a single command with the .NET CLI:

```Dockerfile
RUN dotnet test --no-restore
```

Because we restored the project right before,
we do not need to restore again (which would be the default behaviour).
This implies that we can save some CI-Pipeline time with the `--no-restore` flag.


## OpenAPI spec (Swaggerfile) generation

A very popular NuGet for a ASP .NET Core 5.0 projects is the
[`Swashbuckle.AspNetCore`](https://www.nuget.org/packages/Swashbuckle.AspNetCore/)
which provides automatic OpenAPI generation.

Most of the users may not know the dotnet CLI tool they provide.
With this tool it is possible to generate the OpenAPI spec directly
from the startup assembly. 

```bash
dotnet tool install --version 6.1.1 Swashbuckle.AspNetCore.Cli
```

> :warning: Make sure you use the same version of the CLI tool
and the NuGet, otherwise it will result in some strange error.

There should now be a `dotnet-tools` config present, which stores all
installed tools and corresponding versions.
This is important as this file is required for the build process later on.
Make sure to also include it in your Git repository.


```Dockerfile
# build swagger.json from controller/endpoint definitions
RUN dotnet tool restore \
        dotnet swagger tofile --output swagger.json StartupProject/bin/Debug/net5.0/StartupProject.dll v1
```

The OpenAPI specification is now written as JSON file inside the built image.
You can for example build a client with the OpenAPI toolkit or just save it for later use.

For building a seperate client, another stage in your Dockerfile would be applicable.

> Official [Docker docs on multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/)

## Image size and multi-staged builds

Until now the build process only spits out my own application and it's dependencies.
As of now, the correct .NET runtime has to be installed and managed seperately.
This is also called **framework-dependent**.
Indeed, there is another type of building and publishing an application.
That's called the **self-contained** release.
When using this, the runtime is provided together with the application code itself.
As a result, the runtime doesn't need to be installed seperately.

Another requirement for using `self-contained` as publishing type is, to make sure that the correct `RuntimeIdentifier` in your `.csproj` file is set.

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

    <PropertyGroup>
        <TargetFramework>net5.0</TargetFramework>
        <RuntimeIdentifiers>linux-musl-x64</RuntimeIdentifiers>
        <OutputType>Exe</OutputType>
    </PropertyGroup>

</Project>
```

For the **Alpine** distribution as base image, the `linux-musl-x64` has to be added.
You may enable multiple RuntimeIdentifers (seperated by ";") in order
to make it executable also on other platforms as self-contained build (for example `win-x64`).

Now the finally built binary has fewer dependencies than the base image we used before provides.
Microsoft has also for this an answer: the base-image `mcr.microsoft.com/dotnet/runtime-deps:5.0-alpine-amd64`
includes everything just to run `self-contained` apps.

It is now possible to switch to a multi-staged Docker build:

```Dockerfile
# Build stage
FROM mcr.microsoft.com/dotnet/sdk:5.0-alpine AS build
WORKDIR /source

# Copy csproj and restore as distinct layers
COPY . .
RUN dotnet restore -r linux-musl-x64

RUN dotnet test --no-restore

# build swagger.json from controller/endpoint definitions
RUN dotnet tool restore \
        dotnet swagger tofile --output swagger.json StartupProject/bin/Debug/net5.0/StartupProject.dll v1

# publish project (StartupProject is the startup project)
RUN dotnet publish -c Release -o /appReleased -r linux-musl-x64 \
    --no-restore StartupProject/*.csproj

# Create final image
FROM mcr.microsoft.com/dotnet/runtime-deps:5.0-alpine-amd64
COPY --from=build /appReleased /app

ENTRYPOINT ["/app/StartupProject"]
```

## Security

From the security point of view, it's important to run your
API in the context of a user with minimal operating system permissions.
The default if not specified would be the `root` user, but
there are multiple drawdowns when using the  superuser with Docker.

However a detailed explanation would go beyond the scope of this article.

> You can follow along here for details: https://sysdig.com/blog/dockerfile-best-practices/

Running apps under another user is as easy as applying the following statements to your Dockerfile:


```Dockerfile
# (truncated)
# Add user, group, and change ownership
RUN adduser --disabled-password --gecos "" --home /app --no-create-home --uid 10001 appuser \
    # make sure to allow your user to access your application binary
    && chown -R appuser:appuser /app

USER appuser
# (truncated)
```

## Overriding defaults 

In case you wondered where the default listening port is configured:
I am going to demistify it now.


The base image we are using here in the final layer has some default configuration
and the listening URL and port is included there.

> You can view the base
[Dockerfile](https://github.com/dotnet/dotnet-docker/blob/main/src/runtime-deps/3.1/alpine3.13/amd64/Dockerfile) 
here

The specific section I am talking about is this one:

```Dockerfile
# ...
ENV \
    # Configure web servers to bind to port 80 when present
    ASPNETCORE_URLS=http://+:80 
# ...
```

I'd like to change them for my application, because I don't like port 80 to be exposed.
I am going with the port 5000, same as the default inside the development environment.


```Dockerfile
# Set listening host and port
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000
```

## Summary

When assembling all the different parts I stated above, you will end up with this final and complete Dockerfile:

```Dockerfile
# Build stage
FROM mcr.microsoft.com/dotnet/sdk:5.0-alpine AS build
WORKDIR /source

# Copy csproj and restore as distinct layers
COPY . .
RUN dotnet restore -r linux-musl-x64

RUN dotnet test --no-restore

# build swagger.json from controller/endpoint definitions
RUN dotnet tool restore \
        dotnet swagger tofile --output swagger.json StartupProject/bin/Debug/net5.0/StartupProject.dll v1

# release project (StartupProject is the startup project)
RUN dotnet publish -c Release -o /appReleased -r linux-musl-x64 --self-contained true \
    --no-restore /p:PublishTrimmed=true /p:PublishReadyToRun=true StartupProject/*.csproj

# Create final image
FROM mcr.microsoft.com/dotnet/runtime-deps:5.0-alpine-amd64
COPY --from=build /appReleased /app

# Add user, group, and change ownership
RUN adduser --disabled-password --gecos "" --home /app --no-create-home --uid 10001 appuser \
    # make sure to allow your user to access your application binary
    && chown -R appuser:appuser /app

USER appuser

# Set listening host and port
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

ENTRYPOINT ["/app/StartupProject"]
```

For me, it includes every aspect I care about and also has a minimal size with maximum security.

