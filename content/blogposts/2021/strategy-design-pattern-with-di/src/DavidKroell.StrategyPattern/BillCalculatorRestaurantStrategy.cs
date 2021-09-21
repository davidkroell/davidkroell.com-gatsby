using System.Collections.Generic;

namespace DavidKroell.StrategyPattern
{
    public class BillCalculatorRestaurantStrategy : IBillCalculator
    {
        private const decimal PerServingPrice = 1.50m;

        public decimal GetTotalPrice(ICollection<Order> orders)
        {
            var total = 0m;

            foreach (var order in orders)
            {
                total += order.Price;
                total += PerServingPrice;
            }

            return total;
        }
    }
}