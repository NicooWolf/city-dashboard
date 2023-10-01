import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../models/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  private countriesApiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    const url = `${this.countriesApiUrl}/all`;

    return this.http.get<Country[]>(url).pipe(catchError((err) => of([])));
  }
}
