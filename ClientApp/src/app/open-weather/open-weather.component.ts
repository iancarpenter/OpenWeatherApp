import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OpenWeatherResponse } from './open-weather-response';
import { LocationService } from '../services/location.service';
import { JsonToObjectService } from '../services/json-to-object.service';
import { Subscription } from 'rxjs';
import { WindConversionService } from '../services/wind-conversion.service';

@Component({
  selector: 'app-open-weather',
  templateUrl: './open-weather.component.html',
  styleUrls: ['./open-weather.component.css']
})
export class OpenWeatherComponent implements OnInit, OnDestroy {

  openWeatherResponse = new OpenWeatherResponse({}, [{}], null, {}, null, {}, {}, null, {}, null, null, null, null);

  weatherIcon = "assets/icons/unknown.png";
  riseIcon = "assets/icons/rise.png";
  setIcon = "assets/icons/set.png";

  windDirection = 'loading...';
  windSpeedInMPH = 0;

  locationSubscription: Subscription;
  openWeatherSubscription: Subscription;
  

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private locationService: LocationService,
    private jsonToObjectService: JsonToObjectService,
    private windConversionService: WindConversionService) { }
    

  // Obtain the location information from the service
  // and use the response to obtain the weather information for that location
  ngOnInit() {
    this.locationSubscription = this.locationService.getPosition().subscribe(pos => {
      let latitudeLongitudeParams = this.locationService.setLatitudeLongitude(pos.coords.latitude, pos.coords.longitude);
      this.callOpenWeatherAPI(latitudeLongitudeParams);
    });
  }

  // call Open Weather, assign the response to an object and set the weather icon
  private callOpenWeatherAPI(latitudeLongitudeParams: HttpParams) {
    this.openWeatherSubscription = this.http.get<string>(this.baseUrl + 'OpenWeather', { params: latitudeLongitudeParams }).subscribe(result => {      
      this.openWeatherResponse = this.jsonToObjectService.copyJSONToObject(result);
      this.weatherIcon = this.jsonToObjectService.setWeatherIcon();
      this.windDirection = this.windConversionService.convertDegreeToCompassPoint(this.openWeatherResponse.wind.deg);
      this.windSpeedInMPH = this.windConversionService.convertMetersPerSecToMPH(this.openWeatherResponse.wind.speed);      
    },
      error => console.error(error));
  }


  ngOnDestroy() {
    this.locationSubscription.unsubscribe();
    this.openWeatherSubscription.unsubscribe();
  }
}
