using System;
using System.Collections.Generic;

namespace DavidKroell.StrategyPattern
{
    public class BillCalculatorContext
    {
        private readonly Dictionary<string, IBillCalculator> _strategies;

        public BillCalculatorContext(BillCalculatorRestaurantStrategy restaurantStrategy,
                                     BillCalculatorDeliveryStrategy deliveryStrategy)
        {
            // all the available strategies
            _strategies = new Dictionary<string, IBillCalculator>
            {
                {"restaurant", restaurantStrategy},
                {"delivery", deliveryStrategy}
            };
        }

        public decimal GetTotalPrice(string strategy, ICollection<Order> orders)
        {
            if(_strategies.TryGetValue(strategy, out var billCalculator))
            {
                // the call to the strategy
                return billCalculator.GetTotalPrice(orders);
            }

            throw new NotSupportedException($"Strategy {strategy} is not supported");
        }
    }
}
