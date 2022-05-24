using BenchmarkDotNet.Columns;
using BenchmarkDotNet.Configs;
using BenchmarkDotNet.Exporters;
using BenchmarkDotNet.Exporters.Csv;
using BenchmarkDotNet.Reports;
using BenchmarkDotNet.Running;

namespace SwitchIsFasterThanIf;

internal static class Program
{
    internal static void Main()
    {
        var exporter = new CsvExporter(
            CsvSeparator.CurrentCulture,
            new SummaryStyle(
                cultureInfo: System.Globalization.CultureInfo.CurrentCulture,
                printUnitsInHeader: true,
                printUnitsInContent: false,
                timeUnit: Perfolizer.Horology.TimeUnit.Nanosecond,
                sizeUnit: SizeUnit.B
            ));

        var config = ManualConfig.CreateMinimumViable()
            .AddExporter(exporter)
            .AddExporter(MarkdownExporter.Default);


        BenchmarkRunner.Run<SwitchAndIfBenchmark>(config);
    }
}
