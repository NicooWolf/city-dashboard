import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherInt, weatherError } from '../models/weather.interface';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherApiUrl = 'https://api.openweathermap.org/data/2.5';
  private weatherApiKey = '950eafce8385dc37c8dde9e882e12fdc';

  private weatherErrorValues: weatherError = {
    weather: [{ main: 'No Data', description: 'No Data' }],
    main: {
      temp: null,
      feels_like: null,
    },
  };

  constructor(private http: HttpClient) {}

  getCapitalWeather(
    capital: string | undefined,
    cc2: string | undefined
  ): Observable<WeatherInt | weatherError> {
    const url = `${this.weatherApiUrl}/weather?appid=${this.weatherApiKey}&q=${capital},${cc2}`;

    if (capital === undefined || capital === 'No Capital' || cc2 === undefined)
      return of(<WeatherInt>{});

    return this.http
      .get<WeatherInt>(url)
      .pipe(catchError((err) => of(this.weatherErrorValues)));
  }
}
