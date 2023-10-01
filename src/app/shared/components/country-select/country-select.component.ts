import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  Country,
  SelectedCountry,
} from '@src/app/cities/models/country.interface';
import { Holidays } from '@src/app/cities/models/holidays.interface';
import { TimeZone, timeError } from '@src/app/cities/models/timezone.interface';
import {
  WeatherInt,
  weatherError,
} from '@src/app/cities/models/weather.interface';
import { CitiesService } from '@src/app/cities/services/cities.service';
import { HolidaysService } from '@src/app/cities/services/holidays.service';
import { StoreService } from '@src/app/cities/services/store.service';
import { TimeService } from '@src/app/cities/services/time.service';
import { WeatherService } from '@src/app/cities/services/weather.service';
import { BehaviorSubject, Subscription, map } from 'rxjs';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
})
export class CountrySelectComponent implements OnInit, OnDestroy {
  public allCountries: BehaviorSubject<Country[]> = new BehaviorSubject<
    Country[]
  >([]);

  private getAllCountriesSubscription: Subscription | null = null;
  private setAllCountriesSubscription: Subscription | null = null;
  private getCapitalWeatherSubscription: Subscription | null = null;
  private getCapitalTimeSubscription: Subscription | null = null;
  private getCountryHolidaysSubscription: Subscription | null = null;

  public countriesNames: SelectedCountry[] = [];
  public selectedCountry!: SelectedCountry;

  @Output() emitCountryValue: EventEmitter<SelectedCountry> =
    new EventEmitter<SelectedCountry>();

  constructor(
    private storeService: StoreService,
    private citiesService: CitiesService,
    private weatherService: WeatherService,
    private timeService: TimeService,
    private holidaysService: HolidaysService
  ) {}

  ngOnInit(): void {
    this.setAllCountries();
    this.getAllCountries();
  }

  ngOnDestroy(): void {
    this.unsubscribeFromSubs();
  }

  getAllCountries(): void {
    this.getAllCountriesSubscription = this.citiesService
      .getAllCountries()
      .subscribe({
        next: (countries: Country[]) => {
          this.allCountries.next(countries);
        },
      });
  }

  setAllCountries() {
    this.setAllCountriesSubscription = this.allCountries
      .pipe(
        map((countries: Country[]) =>
          countries.map((country: Country) => {
            const countryName: string = country.name.common;
            const formattedName: string =
              countryName.trim().length > 18
                ? countryName.slice(0, 18) + '...'
                : countryName;

            return <SelectedCountry>{
              formattedName,
              name: countryName,
              capital:
                country.capital?.length > 0 ? country.capital[0] : 'No Capital',
              cca2: country.cca2,
              flag: country.flags.png,
            };
          })
        )
      )
      .subscribe({
        next: (countryNames: any) => {
          this.countriesNames = countryNames;
        },
        error(err) {
          console.error({ err });
          return [{}];
        },
      });
  }

  setCapitalWeather(capital: string, cca2: string): void {
    this.storeService.setStoreData({ capitalWeather: { isFetching: true } });

    this.getCapitalWeatherSubscription = this.weatherService
      .getCapitalWeather(capital, cca2)
      .subscribe({
        next: (capitalWeather: WeatherInt | weatherError) =>
          this.storeService.setStoreData({
            capitalWeather: { weather: capitalWeather, isFetching: false },
          }),
      });
  }

  setCountryHolidays(cca2: string) {
    this.storeService.setStoreData({
      countryHolidays: { isFetching: true },
    });

    this.getCountryHolidaysSubscription = this.holidaysService
      .getHolidays(cca2)
      .subscribe({
        next: (countryHolidays: Holidays[]) => {
          this.storeService.setStoreData({
            countryHolidays: { holidays: countryHolidays, isFetching: false },
          });
        },
      });
  }

  setCapitalTime(country: string, capital: string): void {
    this.storeService.setStoreData({ capitalTime: { isFetching: true } });

    this.getCapitalTimeSubscription = this.timeService
      .getLocalTime(country, capital)
      .subscribe({
        next: (capitalTime: TimeZone | timeError) => {
          this.storeService.setStoreData({
            capitalTime: { time: capitalTime, isFetching: false },
          });
        },
      });
  }

  handleCountryValue(selectedCountry: SelectedCountry): void {
    this.emitCountryValue.emit(selectedCountry);

    this.selectedCountry = selectedCountry;

    this.storeService.setStoreData({ selectedCountry });

    this.setCapitalWeather(selectedCountry?.capital, selectedCountry?.cca2);
    this.setCapitalTime(selectedCountry?.name, selectedCountry?.capital);
    this.setCountryHolidays(selectedCountry?.cca2);
  }

  unsubscribeFromSubs() {
    if (this.setAllCountriesSubscription !== null)
      this.setAllCountriesSubscription.unsubscribe();

    if (this.getAllCountriesSubscription !== null)
      this.getAllCountriesSubscription.unsubscribe();

    if (this.getCapitalWeatherSubscription !== null)
      this.getCapitalWeatherSubscription.unsubscribe();

    if (this.getCapitalTimeSubscription !== null)
      this.getCapitalTimeSubscription.unsubscribe();

    if (this.getCountryHolidaysSubscription !== null)
      this.getCountryHolidaysSubscription.unsubscribe();
  }
}
