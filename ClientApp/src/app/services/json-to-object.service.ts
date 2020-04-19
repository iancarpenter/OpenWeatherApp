import { Injectable } from '@angular/core';
import { OpenWeatherComponent } from '../open-weather/open-weather.component';
import { OpenWeatherResponse } from '../open-weather/open-weather-response';

@Injectable({
  providedIn: 'root'
})
export class JsonToObjectService {
  
  openWeatherResponse = new OpenWeatherResponse({}, [{}], null, {}, null, {}, {}, null, {}, null, null, null, null);

  constructor() { }

  // assign the values from the response converting those properties where
  // necessary to ones that can be displayed to the user
  copyJSONToObject(result: string) {
    this.openWeatherResponse['coord'] = result['coord'];
    this.openWeatherResponse['weather'] = result['weather'];
    this.openWeatherResponse.base = result['base'];
    this.convertTemperaturesReceivedFromAPI(result);
    this.openWeatherResponse.visibility = result['visibility'];
    this.openWeatherResponse['wind'] = result['wind'];
    this.openWeatherResponse['clouds'] = result['clouds'];
    this.openWeatherResponse.dt = result['dt'];
    this.convertSunriseSunsetReceivedFromAPI(result);
    this.openWeatherResponse.timezone = result['timezone'];
    this.openWeatherResponse.id = result['id'];
    this.openWeatherResponse.name = result['name'];
    this.openWeatherResponse.cod = result['cod'];

    return this.openWeatherResponse;
  }

  public setWeatherIcon(): string {
    const iconPath = '/assets/icons/';
    const iconExt = '.png';
    return iconPath + this.openWeatherResponse['weather'][0].icon + iconExt;
  }

  // Convert the unix timestamps that are returned by the Openweather api
  // for the sunrise and sunset times into something meaningful
  // Assign the ancillary properties to the rest of the sys section of the class
  private convertSunriseSunsetReceivedFromAPI(result) {
    const sunrise = new Date(result['sys'].sunrise * 1000);

    // replace single hour such as 6 with 06
    const sRDoubleDigitHour = ('0' + sunrise.getHours()).substr(-2);
    const sunriseHour = sRDoubleDigitHour.toString();
    // replace single minute such as 6 with 06
    const sRDoubleDigitMin = ('0' + sunrise.getMinutes()).substr(-2);
    const sunriseMin = sRDoubleDigitMin.toString();

    this.openWeatherResponse.sys.sunrise = sunriseHour + ':' + sunriseMin;

    const sunset = new Date(result['sys'].sunset * 1000);
    // replace single hour such as 6 with 06
    const sSDoubleDigitHour = ('0' + sunset.getHours()).substr(-2);
    const sunsetHour = sSDoubleDigitHour.toString();
    // replace single minute such as 6 with 06
    const sSDoubleDigitMin = ('0' + sunset.getMinutes()).substr(-2);
    const sunsetMin = sSDoubleDigitMin.toString();

    this.openWeatherResponse.sys.sunset = sunsetHour + ':' + sunsetMin;

    this.openWeatherResponse.sys.type = result['sys'].type;
    this.openWeatherResponse.sys.id = result['sys'].id;
    this.openWeatherResponse.sys.country = result['sys'].country;
  }

  convertTemperaturesReceivedFromAPI(result) {
    const KELVIN = 273;

    this.openWeatherResponse.main.temp = Math.floor(result['main'].temp - KELVIN);
    this.openWeatherResponse.main.feels_like = Math.floor(result['main'].feels_like - KELVIN);
    this.openWeatherResponse.main.temp_min = Math.floor(result['main'].temp_min - KELVIN);
    this.openWeatherResponse.main.temp_max = Math.floor(result['main'].temp_max - KELVIN);
    this.openWeatherResponse.main.pressure = result['main'].pressure;
    this.openWeatherResponse.main.humidity = result['main'].humidity;
  }

}
