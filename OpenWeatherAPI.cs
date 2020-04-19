using System.Net.Http;
using System.Threading.Tasks;

namespace OpenWeatherApp
{    
    public class OpenWeatherAPI
    {
        private static readonly HttpClient client = new HttpClient();
        public async Task<string> Main(string latitude, string longitude)
        {
            string openWeatherResponse = await CallOpenWeatherApi(latitude, longitude);
            return openWeatherResponse;
        }

        private async Task<string> CallOpenWeatherApi(string latitude, string longitude)
        {
            client.DefaultRequestHeaders.Accept.Clear();

            client.DefaultRequestHeaders.Add("User-Agent", ".NET OpenWeatherApp");

            const string apiKey = "";

            string webService = string.Format($"http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={apiKey}");

            string webServiceResponse = await client.GetStringAsync(webService);

            return webServiceResponse;
        }
    }
}
