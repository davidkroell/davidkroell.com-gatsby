using BenchmarkDotNet.Attributes;

namespace SwitchIsFasterThanIf;

public class SwitchAndIfBenchmark
{
    [GlobalSetup]
    public void Setup()
    {
        var months = new List<string>
        {
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Okt",
            "Nov",
            "Dez"
        };

        IEnumerable<string> monthsConcated = months;

        for (int i = 0; i < N; i++)
        {
            monthsConcated = monthsConcated.Concat(months);
        }
        
        Months = monthsConcated.ToList();
    }
    
    [Params(1, 10, 100)]
    public int N { get; set; }

    private List<string> Months { get; set; }
    
    [Benchmark]
    public void GetMonthIndex_Switch()
    {
        foreach (var month in Months)
        {
            GetMonthIndexSwitch(month);
        }
    }
    
    [Benchmark]
    public void GetMonthIndex_If()
    {
        foreach (var month in Months)
        {
            GetMonthIndexIf(month);
        }
    }

    private int GetMonthIndexSwitch(string month)
    {
        return month switch
        {
            "Jan" => 1,
            "Feb" => 2,
            "Mar" => 3,
            "Apr" => 4,
            "May" => 5,
            "Jun" => 6,
            "Jul" => 7,
            "Aug" => 8,
            "Sep" => 9,
            "Okt" => 10,
            "Nov" => 11,
            "Dez" => 12,
            _     => throw new ArgumentException(),
        };
    }
    
    private int GetMonthIndexIf(string month)
    {
        if (month == "Jan")
        {
            return 1;
        }

        if (month == "Feb")
        {
            return 2;
        }

        if (month == "Mar")
        {
            return 3;
        }

        if (month == "Apr")
        {
            return 4;
        }

        if (month == "May")
        {
            return 5;
        }

        if (month == "Jun")
        {
            return 6;
        }

        if (month == "Jul")
        {
            return 7;
        }

        if (month == "Aug")
        {
            return 8;
        }

        if (month == "Sep")
        {
            return 9;
        }

        if (month == "Okt")
        {
            return 10;
        }

        if (month == "Nov")
        {
            return 11;
        }

        if (month == "Dez")
        {
            return 12;
        }

        throw new ArgumentException();
    }
}
