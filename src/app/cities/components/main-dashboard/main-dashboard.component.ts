import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { WeatherInt } from '../../interfaces/weather.interface';
import { TimeZone } from '../../interfaces/timezone.interface';
import { Holidays } from '../../interfaces/holidays.interface';
import { Subscription, tap } from 'rxjs';
import { Store } from '../../interfaces/store.interface';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
})
export class MainDashboardComponent implements OnInit, OnDestroy {
  public store!: Store;
  private storeSubscription!: Subscription;

  public weatherData?: WeatherInt;
  public timeData?: TimeZone;
  public holidaysData?: Holidays[];
  public daysToHoliday?: number;
  public nextCountryHoliday?: string;
  public capitalInfo?: string;
  public countryFlag?: string;

  @Input()
  public isLoading!: boolean;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.getUpdatedStore();
  }

  ngOnDestroy(): void {
    this.killStoreSubscription();
  }

  getUpdatedStore(): void {
    this.storeSubscription = this.storeService.store$
      .pipe(
        tap((store: Store) => {
          const propertyCount = Object.keys(store).length;
          if (propertyCount === 11) {
            this.isLoading = false;
            localStorage.setItem('store', JSON.stringify(store));
          } else {
            this.isLoading = <boolean>this.store?.isLoading;
          }
        })
      )
      .subscribe((store: Store) => {
        this.store = store;
        this.weatherData = store.weatherInfo;
        this.timeData = store.countryTime;
        this.holidaysData = store.countryHolidays;
        this.daysToHoliday = store.daysToHoliday;
        this.nextCountryHoliday = store.nextCountryHoliday;
        this.capitalInfo = store.countryCapital;
        this.countryFlag = store.countryFlag;
      });
  }

  killStoreSubscription(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  getLocalStoreData(): void {
    const localStore = localStorage.getItem('store');
    if (localStore) {
      this.store = JSON.parse(localStore);
      this.weatherData = this.store.weatherInfo;
      this.timeData = this.store.countryTime;
      this.holidaysData = this.store.countryHolidays;
      this.daysToHoliday = this.store.daysToHoliday;
      this.nextCountryHoliday = this.store.nextCountryHoliday;
      this.countryFlag = this.store.countryFlag;
      this.capitalInfo = this.store.countryCapital;
    }
  }
}
