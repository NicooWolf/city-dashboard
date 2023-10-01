import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Holiday, Holidays } from '../models/holidays.interface';
import { Store } from '../models/store.interface';

@Injectable({
  providedIn: 'root',
})
export class HolidaysService {
  private holidaysApiUrl = 'https://api.api-ninjas.com/v1';
  private holidaysApiKey = 'hGIGZcgAnNi9rMoZHbF25g==clGzl5pP82iFVIIB';

  constructor(private http: HttpClient) {}

  getHolidays(cc2: string | undefined): Observable<Holidays[]> {
    const url = `${this.holidaysApiUrl}/holidays?country=${cc2}&year=2023`;

    if (cc2 === undefined) return of(<Holidays[]>[]);

    return this.http
      .get<Holidays[]>(url, { headers: { 'X-Api-Key': this.holidaysApiKey } })
      .pipe(catchError((err) => of([])));
  }

  findNearestHoliday(store: Store) {
    const capitalDateTime = store.capitalTime.time?.datetime;

    const today: string = capitalDateTime
      ? new Date(capitalDateTime).toISOString().split('T')[0]
      : '';

    const futureDates: Holiday[] | any = store.countryHolidays.holidays;

    const holiDates = futureDates
      ? futureDates
          .filter((vacation: Holiday) => vacation.date >= today)
          .map((vacation: Holiday) => {
            const dayBeforeDate = new Date(vacation.date);
            const actualHoliDate = dayBeforeDate.setDate(
              dayBeforeDate.getDate() + 1
            );
            return new Date(actualHoliDate);
          })
      : capitalDateTime;

    const nearestDate =
      holiDates?.length > 0
        ? new Date(Math.min(...holiDates))
        : capitalDateTime;

    const daysToHoliday = this.daysToHoliday(nearestDate, store);

    return {
      nearestDate,
      daysToHoliday,
    };
  }

  daysToHoliday(nextHoliday: Date | string, store: Store): number {
    const today: Date = new Date(store.capitalTime?.time?.datetime);
    const target: Date = new Date(nextHoliday);

    const differenceMs: number = target.getTime() - today.getTime();

    const daysToHoliday = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    return daysToHoliday;
  }
}
