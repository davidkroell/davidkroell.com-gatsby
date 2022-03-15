using BenchmarkDotNet.Attributes;

namespace StringComparisonBenchmark;

[MemoryDiagnoser]
public class BenchMarkStringCompare
{
    private string StringToCheck;
    private string VerifyString;
    private string VerifyString_b_Start;
    private string VerifyString_b_End;

    [Params(10, 100, 1000)] public int Length;

    [GlobalSetup]
    public void Setup()
    {
        var random = new Random(42042);

        var charsCheck = new char[Length];
        var charsVerify = new char[Length];

        for (var i = 0; i < charsCheck.Length; i++)
        {
            charsCheck[i] = random.Next(0, 1) == 0
                ? 'A'
                : 'a';

            charsVerify[i] = random.Next(0, 1) == 0
                ? 'A'
                : 'a';
        }

        StringToCheck = new string(charsCheck);
        VerifyString = new string(charsVerify);

        charsVerify[0] = 'b';
        VerifyString_b_Start = new string(charsVerify);

        charsVerify[0] = 'a';
        charsVerify[Length - 1] = 'b';
        VerifyString_b_End = new string(charsVerify);
    }

    [Benchmark]
    public void StringComparison_Equals()
    {
        var result = StringToCheck.Equals(VerifyString, StringComparison.CurrentCultureIgnoreCase);
    }

    [Benchmark]
    public void StringComparison_Equals_b_Start()
    {
        var result = StringToCheck.Equals(VerifyString_b_Start, StringComparison.CurrentCultureIgnoreCase);
    }

    [Benchmark]
    public void StringComparison_Equals_b_End()
    {
        var result = StringToCheck.Equals(VerifyString_b_End, StringComparison.CurrentCultureIgnoreCase);
    }


    [Benchmark]
    public void StringComparison_EqualityOperator()
    {
        var result = StringToCheck.ToLower() == VerifyString.ToLower();
    }

    [Benchmark]
    public void StringComparison_EqualityOperator_b_Start()
    {
        var result = StringToCheck.ToLower() == VerifyString_b_Start.ToLower();
    }

    [Benchmark]
    public void StringComparison_EqualityOperator_b_End()
    {
        var result = StringToCheck.ToLower() == VerifyString_b_End.ToLower();
    }
}
