using CriptoCalculator.Interfaces;
using CriptoCalculator.Models;
using CriptoCalculator.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CriptoCalculator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoinsController : ControllerBase
    {
        private readonly ICoinService _coinService;

        public CoinsController(ICoinService coinService)
        {
            _coinService = coinService;
        }

        
        [HttpGet("GetCoinPriceHistoryOnDate")]
        public async Task<IActionResult> GetCoinPrice(string name, string currency, string date)
        {
            var result = await _coinService.GetCoinPriceAsync(name, currency, date);

            return Ok(result);
        }


        [HttpGet("GetSimulatedDCAbyDate")]
        public async Task<IActionResult> GetSimulatedDCA(string name, string currency, string startDate, int montlyinvestmentamount)
        {
            decimal totalCoinsInInterval=0;
            if (!DateTime.TryParseExact(startDate, "dd-MM-yyyy", null, System.Globalization.DateTimeStyles.None, out var start))
            {
                return BadRequest("Wrong date format. correct: (dd-MM-yyyy).");
            }

            var montlyCoinPrices = new List<CoinPrice>(); // pretul lunar al monezii - pretul este cel din ziua de 15 al fiecarei luni
            var currentDate = DateTime.Now;


            // Verifică dacă ziua de început este mai mare de 15; dacă da, începe de la luna următoare
            var initialDate = start.Day <= 15 ? new DateTime(start.Year, start.Month, 15) : new DateTime(start.Year, start.Month, 15).AddMonths(1);

            for (var date = initialDate; date <= currentDate; date = date.AddMonths(1))
            {
                var formattedDate = date.ToString("dd-MM-yyyy");
                var result = await _coinService.GetCoinPriceAsync(name, currency, formattedDate);

                if (result != null)
                {
                    montlyCoinPrices.Add(result);
                }
            }

            foreach (var v in montlyCoinPrices)
            {
                totalCoinsInInterval += montlyinvestmentamount / v.Price;
            }

            var todayCoinPrice = await _coinService.GetCoinPriceAsync(name, currency, currentDate.AddDays(-5).ToString("dd-MM-yyyy"));

            //return Ok(new { message = $"Total investment in {montlyCoinPrices.Count} months: {montlyCoinPrices.Count * montlyinvestmentamount}; Current value: {totalCoinsInInterval * todayCoinPrice.Price}" });
            return Ok((totalCoinsInInterval * todayCoinPrice.Price).ToString());
        }


        [HttpGet("GetCoinsList")]
        public async Task<IActionResult> GetCoinsList()
        {
            var result = await _coinService.GetCoinsListAsync();

            return Ok(result);
        }
    }
}
