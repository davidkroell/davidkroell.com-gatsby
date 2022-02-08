using System;
using System.Diagnostics;
using System.Text.Json;
using System.Threading.Tasks;

namespace DavidKroell.BoostAsync;

public static class Program
{
    public static async Task Main()
    {
        var profileLoader = new ProfileLoader();

        var sw = Stopwatch.StartNew();

        var profile = await profileLoader.GetProfileDetailsAsync("TheAwesomeSquirrel");

        Console.WriteLine($"Profile details retrieved, took {sw.ElapsedMilliseconds}ms");

        Console.WriteLine(JsonSerializer.Serialize(profile, new JsonSerializerOptions
        {
            WriteIndented = true
        }));

        sw.Restart();

        var profileFast = await profileLoader.GetProfileDetailsFastAsync("TheAwesomeSquirrel");

        Console.WriteLine($"Profile details retrieved, took {sw.ElapsedMilliseconds}ms");

        Console.WriteLine(JsonSerializer.Serialize(profileFast, new JsonSerializerOptions
        {
            WriteIndented = true
        }));
    }
}