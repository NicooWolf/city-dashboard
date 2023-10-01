import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@src/app/cities/models/store.interface';
import {
  WeatherInt,
  skyStatus,
  skyValues,
} from '@src/app/cities/models/weather.interface';
import { handleCardStates } from '@src/app/shared/utils/isFetching';
import { StoreService } from 'src/app/cities/services/store.service';
import { skyStatusConstants } from '../../constants/weather.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shared-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements OnInit, OnDestroy {
  store$ = this.storeService.getStoreData;
  storeSubscription: Subscription | null = null;
  showSpinner: boolean = false;
  showWeatherCard: boolean = false;
  checked: boolean = false;
  hasError: boolean | null = false;

  capitalTemp: number = 0;
  selectedCapital: string = '';
  countryCca2: string = '';
  capitalSkyStatus!: skyValues;
  skyStatusConstants: skyStatus = skyStatusConstants;
  capitalSkyStatusDesc: string = '';
  tempFeelsLike: number = 0;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  ngOnDestroy(): void {
    if (this.storeSubscription !== null) this.storeSubscription.unsubscribe();
  }

  public loadAllData(): void {
    this.storeSubscription = this.store$.subscribe({
      next: (store: Store) => {
        if (store.selectedCountry?.capital === 'No Capital') {
          this.hasError = true;
          return;
        }

        this.hasError = false;

        const weatherStore: WeatherInt = store.capitalWeather.weather;

        this.capitalTemp = weatherStore?.main?.temp;
        this.selectedCapital = store.selectedCountry?.capital;
        this.countryCca2 = store.selectedCountry?.cca2;
        this.capitalSkyStatus = weatherStore?.weather[0]?.main;
        this.capitalSkyStatusDesc = weatherStore?.weather[0]?.description;
        this.tempFeelsLike = weatherStore?.main?.feels_like;

        const isFetching: boolean | undefined =
          store.capitalWeather?.isFetching;

        const { spinnerState, cardState } = handleCardStates(
          this.showSpinner,
          this.showWeatherCard,
          isFetching
        );
        this.showSpinner = spinnerState;
        this.showWeatherCard = cardState;
      },
    });
  }

  get displayWeatherCard(): boolean {
    return !this.hasError && this.showWeatherCard;
  }
}
