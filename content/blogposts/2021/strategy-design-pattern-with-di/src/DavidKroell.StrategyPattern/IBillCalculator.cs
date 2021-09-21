using System.Collections.Generic;

namespace DavidKroell.StrategyPattern
{
    public interface IBillCalculator
    {
        decimal GetTotalPrice(ICollection<Order> orders);
    }
}