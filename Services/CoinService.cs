using CriptoCalculator.Interfaces;
using CriptoCalculator.Models;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace CriptoCalculator.Services
{
    public class CoinService : ICoinService
    {
        private readonly HttpClient _httpClient;

        public CoinService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<CoinPrice> GetCoinPriceAsync(string name, string currency, string date)
        {
            var url = $"https://api.coingecko.com/api/v3/coins/{name}/history?date={date}&localization=false";
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Add("accept", "application/json");
            request.Headers.Add("x-cg-demo-api-key", "CG-28Y9vLB9yo7Mo7hN86dB71tF");

            var response = await _httpClient.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var data = JsonSerializer.Deserialize<CoinGeckoResponse>(content);

                decimal price = currency.ToLower() switch
                {
                    "usd" => data.market_data.current_price.usd,
                    "eur" => data.market_data.current_price.eur,
                    _ => throw new KeyNotFoundException("Currency not supported.")
                };

                return new CoinPrice
                {
                    Currency = currency,
                    Price = price
                };
            }

            return null;
        }

        public async Task<List<Coin>> GetCoinsListAsync()
        {
            var response = await _httpClient.GetAsync("https://api.coingecko.com/api/v3/coins/list");

            if (!response.IsSuccessStatusCode)
            {
                return new List<Coin>();
            }

            var jsonResponse = await response.Content.ReadAsStringAsync();

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
    
            var coins = JsonSerializer.Deserialize<List<Coin>>(jsonResponse, options);

            return coins?.Take(1000).ToList() ?? new List<Coin>();
        }
    }

    public class CoinGeckoResponse
    {
        public MarketData market_data { get; set; }
    }

    public class MarketData
    {
        public CurrentPrice current_price { get; set; }
    }

    public class CurrentPrice
    {
        public decimal usd { get; set; }
        public decimal eur { get; set; }
    }
}
