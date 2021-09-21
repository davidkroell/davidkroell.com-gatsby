using System;
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;

namespace DavidKroell.StrategyPattern
{
    internal class StartupDI
    {
        public static void Run(bool isDelivery, ICollection<Order> orders)
        {
            var serviceCollection = new ServiceCollection();

            if (isDelivery)
            {
                serviceCollection.AddSingleton<IBillCalculator, BillCalculatorDeliveryStrategy>();
            }
            else
            {
                serviceCollection.AddSingleton<IBillCalculator, BillCalculatorRestaurantStrategy>();
            }

            var serviceProvider = serviceCollection.BuildServiceProvider();
            var billCalculator = serviceProvider.GetRequiredService<IBillCalculator>();

            var price = billCalculator.GetTotalPrice(orders);
            Console.WriteLine($"Total bill is: {price} - calculated with {nameof(StartupDI)}");
        }
    }
}
