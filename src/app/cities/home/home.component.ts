import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherInt } from '../interfaces/weather.interface';
import { TimeZone } from '../interfaces/timezone.interface';
import { Holidays } from '../interfaces/holidays.interface';
import { CitiesService } from '../services/cities.service';
import { StoreService } from '../services/store.service';
import { Subscription } from 'rxjs';
import { Store } from '../interfaces/store.interface';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public countryCapital!: string;
  public countryCode!: string;
  public selectedCountry!: string;

  public isLoading: boolean = false;

  public store!: Store;
  private storeSubscription!: Subscription;

  constructor(
    private citiesService: CitiesService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getUpdatedStore();
  }

  ngOnDestroy(): void {
    this.killStoreSubscription();
  }

  getUpdatedStore(): void {
    this.storeSubscription = this.storeService.store$.subscribe(
      (store: Store) => {
        this.store = store;
      }
    );
  }

  killStoreSubscription(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  getWeather(): void {
    this.citiesService
      .getCapitalWeather(this.countryCapital, this.countryCode)
      .subscribe((weather: WeatherInt) => {
        this.storeService.setStore(<Store>{ weatherInfo: weather });
      });
  }

  getTime(): void {
    this.citiesService
      .getLocalTime(this.selectedCountry, this.countryCapital)
      .subscribe((time: TimeZone) => {
        this.storeService.setStore(<Store>{ countryTime: time });
      });
  }

  getHolidays(): void {
    this.citiesService
      .getHolidays(this.countryCode)
      .subscribe((holidays: Holidays[]) => {
        this.storeService.setStore(<Store>{ countryHolidays: holidays });
        this.findNearestHoliday();
      });
  }

  findNearestHoliday(): void {
    const today = new Date().toISOString().split('T')[0];
    const futureDates: any = this.store?.countryHolidays
      ?.filter((vacation: Holidays) => vacation.date > today)
      .map((vacation: Holidays) => new Date(vacation.date));

    if (futureDates.length > 0) {
      const nearestDate = new Date(Math.min(...futureDates));
      this.storeService.setStore({
        nextCountryHoliday: nearestDate.toISOString().split('T')[0],
      });
      this.daysToHoliday();
    } else {
      this.storeService.setStore({
        nextCountryHoliday: '',
      });
    }
  }

  daysToHoliday(): void {
    const today: Date = new Date();
    const target: Date = new Date(<string>this.store.nextCountryHoliday);

    const differenceMs: number = target.getTime() - today.getTime();

    this.storeService.setStore({
      daysToHoliday: Math.ceil(differenceMs / (1000 * 60 * 60 * 24)),
    });
  }

  get getIsLoading() {
    return this.store.isLoading;
  }

  getCapitalValue(countryName: string): void {
    setTimeout(() => {
      this.setCountryValues(countryName);
      this.getWeather();
      this.getTime();
      this.getHolidays();
    }, 500);

    this.isLoading = true;
  }

  setCountryValues(countryName: string): void {
    this.countryCapital = <string>this.store.countryCapital;
    this.countryCode = <string>this.store.countryCode;
    this.selectedCountry = countryName;
  }
}
