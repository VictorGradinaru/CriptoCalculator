using CriptoCalculator.Interfaces;
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

        
        [HttpGet("GetCoinsList")]
        public async Task<IActionResult> GetCoinsList()
        {
            var result = await _coinService.GetCoinsListAsync();

            return Ok(result);
        }
    }
}
