import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getPosition(): Observable<any> {
    return Observable.create(observer => {
      window.navigator.geolocation.getCurrentPosition(position => {
        observer.next(position);
        observer.complete();
      },
        error => observer.error(error));
    });
  }

  // Add the latitude and longitude values to a new params object
  setLatitudeLongitude(latitude: string, longitude: string) {
    let params = new HttpParams();
    params = params.append('latitude', latitude);
    params = params.append('longitude',longitude);
    return params;
  }
}
