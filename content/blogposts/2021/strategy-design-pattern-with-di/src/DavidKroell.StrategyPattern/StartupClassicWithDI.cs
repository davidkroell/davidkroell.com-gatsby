using System;
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;

namespace DavidKroell.StrategyPattern
{
    internal class StartupClassicWithDI
    {
        public static void Run(bool isDelivery, ICollection<Order> orders)
        {
            var serviceProvider = new ServiceCollection()
                .AddSingleton<BillCalculatorRestaurantStrategy>()
                .AddSingleton<BillCalculatorDeliveryStrategy>()
                .AddSingleton<BillCalculatorContext>()
                .BuildServiceProvider();

            var strategy = isDelivery
                ? "delivery"
                : "restaurant";

            var billCalculatorContext = serviceProvider.GetRequiredService<BillCalculatorContext>();
            
            var price = billCalculatorContext.GetTotalPrice(strategy, orders);
            Console.WriteLine($"Total bill is: {price} - calculated with {nameof(StartupClassicWithDI)}");
        }
    }
}