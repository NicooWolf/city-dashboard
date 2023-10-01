import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '../models/store.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private initialState = {
    capitalWeather: { weather: null },
    capitalTime: { time: null },
    countryHolidays: { holidays: null },
    selectedCountry: null,
  };

  private storeSubject: BehaviorSubject<Store> = new BehaviorSubject<any>(
    this.initialState
  );

  private store$: Observable<Store> = this.storeSubject.asObservable();

  public setStoreData(updateData: any) {
    const updatedData = { ...this.storeSubject.value, ...updateData };
    this.storeSubject.next(updatedData);
  }

  public resetStore(resetValues: any) {
    this.storeSubject = new BehaviorSubject<any>({
      ...this.initialState,
      ...resetValues,
    });
  }

  get getStoreData(): Observable<Store> {
    return this.store$;
  }
}
