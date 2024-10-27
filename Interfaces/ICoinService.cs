using CriptoCalculator.Models;

namespace CriptoCalculator.Interfaces
{
    public interface ICoinService
    {
        Task<CoinPrice> GetCoinPriceAsync(string name, string currency, string date);
        Task<List<Coin>> GetCoinsListAsync();
    }
}
