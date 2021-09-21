using System;
using System.Collections.Generic;

namespace DavidKroell.StrategyPattern
{
    internal class StartupClassic
    {
        public static void Run(bool isDelivery, ICollection<Order> orders)
        {
            var billCalculatorContext = new BillCalculatorContext(
                new BillCalculatorRestaurantStrategy(),
                new BillCalculatorDeliveryStrategy());

            var strategy = isDelivery
                ? "delivery"
                : "restaurant";
            
            var price = billCalculatorContext.GetTotalPrice(strategy, orders);
            Console.WriteLine($"Total bill is: {price} - calculated with {nameof(StartupClassic)}");
        }
    }
}