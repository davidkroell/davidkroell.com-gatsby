---
title: "Progress indicator for console applications"
categories: ['programming']
image: './unsplash-7_kRuX1hSXM.webp'
imageCredit: https://unsplash.com/photos/7_kRuX1hSXM
date: "2020-12-01"
time: 3
description: "Some thoughts about progress indicators in console application. I've added implementation details for Go and C# using several approaches."
---

Every piece of software should inform the user about it's current state and progress. For longer-lasting operations it's sometimes very difficult to evaluate the level of completion.

Whether it can also be impossible, most of the time it's not worth the complexity.

So I would like to show you a dead-simple but very effective way to tell the user that the app is still running but it will take some time.
The solution below is impressively easy but works very well.
Hence the simplicity it is almost always worth to make use of this approach.

## Desired state

Since we would like to make it as simple as possible, we do not want to report any remaining time or percentage of completion.
Just print anything on the screen which should tell that something is happening in the background.
Taking the requirements above into consideration, something like a repeated printing of dots `.` would be just fine.

It would then somehow look like this:

```shell
Doing long lasting operation...
Finished!
```

Where dots get appended to the line as time flies and finally, after the operation is complete, `Finished!` is printed.

## Implementation

I'll describe it here for C# and Go.

In a C# console application, you can use the following code:
```csharp
Console.Write("Doing long lasting operation");

var cts = new CancellationTokenSource();

var dotPrinting = new Task(() =>
{
	while (true)
	{
		Console.Write('.');
		Thread.Sleep(500);
	}

}, cts.Token);
dotPrinting.Start();

// doing work which takes some time
Thread.Sleep(4000);
cts.Cancel(); // stop the dot-printing task

Console.WriteLine("\nFinished!");
```
Note the difference between `Console.Write()` and `Console.WriteLine()` here, for appending to the same line and writing to a new one.
When the `Finished!` output gets printed, a `\n` has to be added before to start on a new line.

It could also be implemented the other way round, with the work in the separate Task and the dot-printing on 'main thread'.
This would also make it possible to cancel the worker by console input or something like that.
In order to achieve this, a `CancellationTokenSource` would have to be added.

```csharp
Console.Write("Doing long lasting operation - now inside the Task");

var work = new Task(() =>
{
	// doing work which takes some time
	Thread.Sleep(4000);
});
work.Start();

// check for task completion
// or some console input to cancel the work
while (!work.IsCompleted)
{
	Console.Write('.');
	Thread.Sleep(500);
}

Console.WriteLine("\nFinished!");
```


In Golang, the following code would do the same as above:
```go
fmt.Print("Doing long lasting operation")
closer := make(chan struct{})

// start a new goroutine
go func() {
	// endless loop
	for {
		select {
		// either wait 500 milliseconds and print a dot
		case <-time.Tick(500 * time.Millisecond):
			fmt.Print(".")
		// or return the goroutine
		case <-closer:
			return
		}
	}
}()

// doing work which takes some time
time.Sleep(4 * time.Second)

// make the goroutine return and therefore stop printing dots
// in this case the return statement in the receiving goroutine may not be reached,
// since the main goroutine eventually exits faster
closer <- struct{}{}

fmt.Println("\nFinished!")
```

When you think of cancellation, in C#, one could wait for console input and then cancel the background task.
Compared to C# tasks, cancelling goroutines explicitely is not possible. 
When the use case allows it, you may however split your work into a loop and introduce channels using the `select` statement.
Whether it is a good decision depends of course on the use case.

