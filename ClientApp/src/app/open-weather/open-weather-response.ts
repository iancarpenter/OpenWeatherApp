export class OpenWeatherResponse {
  coord: {
    lon: number
    lat: number
  } 
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: string
    sunset: string
  }
  timezone: number
  id: number
  name: string
  cod: number

  constructor(coord, weather, base, main, visibility, wind, clouds, dt, sys, timezone, id, name, cod) {
    this.coord = coord;
    this.weather = weather;
    this.base = base;
    this.main = main;
    this.visibility = visibility;
    this.wind = wind;
    this.clouds = clouds;
    this.dt = dt;
    this.sys = sys,
    this.timezone = timezone;
    this.id = id;
    this.name = name;
    this.cod = cod;
  }

}


