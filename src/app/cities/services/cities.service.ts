import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap, delay } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { WeatherInt } from '../interfaces/weather.interface';
import { TimeZone } from '../interfaces/timezone.interface';
import { Holidays } from '../interfaces/holidays.interface';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  private countriesApiUrl = 'https://restcountries.com/v3.1';
  private weatherApiUrl = 'https://api.openweathermap.org/data/2.5';
  private weatherApiKey = '950eafce8385dc37c8dde9e882e12fdc';
  private timezoneApiUrl = 'https://timezone.abstractapi.com/v1';
  private timezoneApiKey = '4ec72a974c8e4309ade4d96f50654bd0';
  private holidaysApiUrl = 'https://api.api-ninjas.com/v1';
  private holidaysApiKey = 'hGIGZcgAnNi9rMoZHbF25g==clGzl5pP82iFVIIB';

  constructor(private http: HttpClient) {}

  generateRandomNum(maxNum: number) {
    return Math.floor(Math.random() * maxNum);
  }

  getAllCountries(): Observable<Country[]> {
    const url = `${this.countriesApiUrl}/all`;

    return this.http.get<Country[]>(url).pipe(catchError((err) => of([])));
  }

  getCapital(country: string): Observable<Country[]> {
    const url = `${this.countriesApiUrl}/name/${country}`;
    return this.http.get<Country[]>(url).pipe(catchError((err) => of([])));
  }

  getLocalTime(country: string, capital: string): Observable<TimeZone> {
    const url = `${this.timezoneApiUrl}/current_time/?api_key=${this.timezoneApiKey}&location=${capital}, ${country}`;

    return this.http
      .get<TimeZone>(url)
      .pipe(catchError((err) => of(<TimeZone>{})));
  }

  getCapitalWeather(capital: string, cc2: string): Observable<WeatherInt> {
    const url = `${this.weatherApiUrl}/weather?appid=${this.weatherApiKey}&q=${capital},${cc2}`;

    return this.http.get<WeatherInt>(url).pipe(
      delay(1000),
      catchError((err) => of(<WeatherInt>{}))
    );
  }

  getHolidays(cc2: string): Observable<Holidays[]> {
    const url = `${this.holidaysApiUrl}/holidays?country=${cc2}&year=2023`;

    return this.http
      .get<Holidays[]>(url, { headers: { 'X-Api-Key': this.holidaysApiKey } })
      .pipe(catchError((err) => of([])));
  }

  getCountryFlag(
    countriesFlags: string[],
    countriesNames: string[],
    countryName: string
  ) {
    const countryIndex = this.findCountryIndex(countriesNames, countryName);
    return countriesFlags[countryIndex];
  }

  getuniqueCountryCode(
    countriesNames: string[],
    countryName: string,
    countryCode: string[]
  ): string {
    return this.findCountryCode(
      countryCode,
      this.findCountryIndex(countriesNames, countryName)
    );
  }

  getCountryContinent(
    countryContinents: string[],
    countriesNames: string[],
    countryName: string
  ) {
    const countryIndex = this.findCountryIndex(countriesNames, countryName);
    return countryContinents[countryIndex];
  }

  private findCountryIndex(
    countriesNames: string[],
    countryName: string
  ): number {
    return countriesNames.indexOf(countryName);
  }

  private findCountryCode(countryCode: string[], countryIndex: number): string {
    return countryCode[countryIndex];
  }
}
