import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { TimeZone, timeError } from '../models/timezone.interface';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private timezoneApiUrl = 'https://timezone.abstractapi.com/v1';
  private timezoneApiKey = '4ec72a974c8e4309ade4d96f50654bd0';

  private timeErrorValues: timeError = {
    weather: [{ main: 'No Data', description: 'No Data' }],
    main: {
      temp: null,
      feels_like: null,
    },
  };

  constructor(private http: HttpClient) {}

  getLocalTime(
    country: string | undefined,
    capital: string | undefined
  ): Observable<TimeZone | timeError> {
    const url = `${this.timezoneApiUrl}/current_time/?api_key=${this.timezoneApiKey}&location=${capital}, ${country}`;

    if (country === undefined || capital === undefined)
      return of(this.timeErrorValues);

    return this.http
      .get<TimeZone>(url)
      .pipe(catchError((err) => of(this.timeErrorValues)));
  }
}
