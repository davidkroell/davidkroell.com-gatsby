using System;
using System.Collections.Generic;

namespace DavidKroell.StrategyPattern
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            var isDelivery = args.Length >= 1 && args[1] == "--delivery";

            var orders = new List<Order>
            {
                new Order("Caesar Salad", 11),
                new Order("Red Curry", 13.50m),
                new Order("Steak", 22),
            };
            
            // print order details
            Console.WriteLine("Bill for these orders:");
            orders.ForEach(x => Console.WriteLine($"{x.DishName.PadRight(20)}{x.Price.ToString().PadLeft(6)}"));
            WriteSeparator();
            Console.WriteLine();

            Console.WriteLine($"IsDelivery: {isDelivery}");

            
            StartupClassic.Run(isDelivery, orders);
            StartupDI.Run(isDelivery, orders);
            StartupClassicWithDI.Run(isDelivery, orders);
            WriteSeparator();
            Console.WriteLine();

            // flip strategy
            isDelivery = !isDelivery;
            Console.WriteLine($"IsDelivery: {isDelivery}");

            StartupClassic.Run(isDelivery, orders);
            StartupDI.Run(isDelivery, orders);
            StartupClassicWithDI.Run(isDelivery, orders);
        }
        
        private static void WriteSeparator() => Console.WriteLine("====================================================");
    }
}
