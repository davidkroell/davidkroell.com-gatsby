---
title: "Don't use String.ToLower() in C# when comparing strings"
categories: ["programming"]
image: "./amador-loureiro-BVyNlchWqzs-unsplash.jpg"
imageCredit: https://unsplash.com/photos/BVyNlchWqzs
date: "2022-03-15"
description: "Using String.ToLower() to compare strings with different casing can impact the performance of your C# apps"
---

When comparing strings, often the casing should be ignored in the comparison.
Most of the times, this is required because every user writes text different.
I do not really care when there is "Apple" or "apple" in a dataset.
To me, this is the same.
On the other side, "A" and "a" are different characters for computers.

To overcome this problem, a working and very wide-spread approach is to first lowercase (or uppercase)
all letters and then compare them.
Most of us done it, me too - but no longer.
Although there is a drawback you should keep in mind when it comes to performance.

I've created a litte benchmark program an I'll evaluate the results afterwards.
First I'll explain the benchmark setup.


## Benchmark setup

I've evaluated three types of string equality comparison.

1. Strings which are equal (except casing)
1. Strings which are not equal, differing in the **last** character
1. Strings which are not equal, differing in the **first** character

These three test-cases were applied to string with lengths of 10, 100 and 1000 characters

My benchmark code looks like the below code snippet, where `StringToCheck` and `VerifyString` are generated.

```cs
[Benchmark]
public void StringComparison_Equals()
{
    var result = StringToCheck.Equals(VerifyString, StringComparison.CurrentCultureIgnoreCase);
}

[Benchmark]
public void StringComparison_EqualityOperator()
{
    var result = StringToCheck.ToLower() == VerifyString.ToLower();
}
```

## Benchmark results

I've used [`BenchmarkDotNet`](https://github.com/dotnet/BenchmarkDotNet)
to run my test and enable the `MemoryDiagnoser` to also anaylse memory usage/allocations.


```
BenchmarkDotNet=v0.13.1, OS=Windows 10.0.19044.1526 (21H2)
Intel Core i7-8650U CPU 1.90GHz (Kaby Lake R), 1 CPU, 8 logical and 4 physical cores
.NET SDK=6.0.101
  [Host]     : .NET 6.0.1 (6.0.121.56705), X64 RyuJIT
  DefaultJob : .NET 6.0.1 (6.0.121.56705), X64 RyuJIT


|                                    Method | Length |        Mean |     Error |    StdDev |      Median |  Gen 0 | Allocated |
|------------------------------------------ |------- |------------:|----------:|----------:|------------:|-------:|----------:|
|                   StringComparison_Equals |     10 |    55.42 ns |  1.766 ns |  5.180 ns |    55.51 ns |      - |         - |
|           StringComparison_Equals_b_Start |     10 |    46.70 ns |  0.973 ns |  1.965 ns |    46.41 ns |      - |         - |
|             StringComparison_Equals_b_End |     10 |    81.11 ns |  1.815 ns |  5.236 ns |    80.42 ns |      - |         - |
|         StringComparison_EqualityOperator |     10 |    79.07 ns |  2.444 ns |  7.168 ns |    77.24 ns | 0.0229 |      96 B |
| StringComparison_EqualityOperator_b_Start |     10 |    80.76 ns |  2.589 ns |  7.551 ns |    79.09 ns | 0.0229 |      96 B |
|   StringComparison_EqualityOperator_b_End |     10 |    86.48 ns |  2.763 ns |  8.016 ns |    85.40 ns | 0.0229 |      96 B |
|                   StringComparison_Equals |    100 |   131.51 ns |  2.654 ns |  7.485 ns |   128.91 ns |      - |         - |
|           StringComparison_Equals_b_Start |    100 |    51.06 ns |  1.427 ns |  4.162 ns |    49.94 ns |      - |         - |
|             StringComparison_Equals_b_End |    100 |   410.15 ns | 10.802 ns | 31.849 ns |   403.00 ns |      - |         - |
|         StringComparison_EqualityOperator |    100 |   246.99 ns |  4.642 ns |  4.342 ns |   246.59 ns | 0.1070 |     448 B |
| StringComparison_EqualityOperator_b_Start |    100 |   243.33 ns |  2.462 ns |  2.056 ns |   243.46 ns | 0.1070 |     448 B |
|   StringComparison_EqualityOperator_b_End |    100 |   260.33 ns |  5.702 ns | 16.176 ns |   253.08 ns | 0.1070 |     448 B |
|                   StringComparison_Equals |   1000 |   878.83 ns |  7.949 ns |  7.047 ns |   878.38 ns |      - |         - |
|           StringComparison_Equals_b_Start |   1000 |    46.50 ns |  0.944 ns |  0.883 ns |    46.13 ns |      - |         - |
|             StringComparison_Equals_b_End |   1000 | 3,291.64 ns | 27.859 ns | 26.060 ns | 3,283.96 ns |      - |         - |
|         StringComparison_EqualityOperator |   1000 | 2,001.56 ns | 31.459 ns | 27.888 ns | 1,993.78 ns | 0.9670 |   4,048 B |
| StringComparison_EqualityOperator_b_Start |   1000 | 1,966.92 ns | 32.515 ns | 28.824 ns | 1,967.16 ns | 0.9670 |   4,048 B |
|   StringComparison_EqualityOperator_b_End |   1000 | 2,002.98 ns | 39.681 ns | 30.980 ns | 1,997.75 ns | 0.9670 |   4,048 B |

```

As you can seee in the above table, the `Equals` method is sometimes faster, but does not allocate any memory.


The biggest difference is, when the strings differ in the first character.
It takes about the same time to compare string with 10, 100 and 1000 if they differ at the start.
In contrast to that, with `EqualityOperator` this cannot be seen.


For the version with `EqualityOperator` it takes the same time, no matter where the difference is.
This is not true for the `Equals`, this gets faster, the earlier the difference is.
This is probably only because of the `ToLower()` in the first place.


In addition, memory is allocated when using `EqualityOperator` with `ToLower()`.
That's because of a new instance with all lowercased letters has to be created.
See: [String.ToLower Method - Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/api/system.string.tolower?view=net-6.0)


Additional memory allocations are bad because the garbage collector needs to clean them up again,
which will cost valuable CPU time and therefore slows down the application


## Summary

Don't use `ToLower()` when comparing strings (neither use `ToUpper()`).
This also applies to related string operations like `StartsWith()`, `EndsWith()`, `Contains()` and so on.
I also interpret this as a code smell, because the available language features are not used.
In addition, some IDE's even detect this smell.

As always, the code can be found at my [GitHub](https://github.com/davidkroell/davidkroell.com/tree/main/content/blogposts/2022/dont-use-tolower-to-compare-strings/src).
There you can also find the benchmark report in CSV format.


