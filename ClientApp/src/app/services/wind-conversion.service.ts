import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindConversionService {

  constructor() { }

  // for the supplied degree return the point on the compass
  // Algorithm supplied by https://stackoverflow.com/a/25867068/55640
  convertDegreeToCompassPoint(wind_deg: number): string {
    const compassPoints = ["North", "North North East", "North East", "East North East", "East", "East South East", "South East", "South South East",
      "South", "South South West", "South West", "West South West", "West", "West North West", "North West", "North North West"];
    const rawPosition = Math.floor((wind_deg / 22.5) + 0.5);
    const arrayPosition = (rawPosition % 16);
    return compassPoints[arrayPosition];
  };

  // convert the wind speed in to something the user can more easily understand
  // Formula https://www.weather.gov/media/epz/wxcalc/windConversion.pdf
  convertMetersPerSecToMPH(mps: number): number {
    const mph = +((2.23694 * mps).toFixed(2));
    return mph;
  }

}
