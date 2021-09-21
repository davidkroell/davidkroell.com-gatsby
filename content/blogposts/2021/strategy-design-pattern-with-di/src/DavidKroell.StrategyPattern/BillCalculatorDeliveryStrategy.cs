using System.Collections.Generic;

namespace DavidKroell.StrategyPattern
{
    public class BillCalculatorDeliveryStrategy : IBillCalculator
    {
        private const decimal DeliveryFee      = 4.0m;
        private const decimal DeliveryFeeUntil = 20.0m;


        public decimal GetTotalPrice(ICollection<Order> orders)
        {
            var total = 0m;

            foreach (var order in orders)
            {
                total += order.Price;
            }

            if (total < DeliveryFeeUntil)
            {
                total += DeliveryFee;
            }

            return total;
        }
    }
}