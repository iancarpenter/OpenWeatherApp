using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace OpenWeatherApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OpenWeatherController : ControllerBase
    {
        [HttpGet]
        public async Task<string> Get(string latitude, string longitude)        
        {           
            OpenWeatherAPI openWeatherAPI = new OpenWeatherAPI();

            string openWeatherResponse = await openWeatherAPI.Main(latitude, longitude);
            
            return openWeatherResponse;
        }                    
    }
}