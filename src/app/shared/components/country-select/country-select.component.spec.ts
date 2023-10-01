import { StoreService } from '@src/app/cities/services/store.service';
import { CountrySelectComponent } from './country-select.component';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { CitiesService } from '@src/app/cities/services/cities.service';
import { WeatherService } from '@src/app/cities/services/weather.service';
import { TimeService } from '@src/app/cities/services/time.service';
import { HolidaysService } from '@src/app/cities/services/holidays.service';
import {
  Country,
  SelectedCountry,
} from '@src/app/cities/models/country.interface';
import { WeatherInt } from '@src/app/cities/models/weather.interface';
import { Holidays } from '@src/app/cities/models/holidays.interface';
import { TimeZone } from '@src/app/cities/models/timezone.interface';

describe('CountrySelectComponent', () => {
  const storeServiceSpy = jasmine.createSpyObj<StoreService>('StoreService', [
    'setStoreData',
  ]);

  const citiesServiceSpy = jasmine.createSpyObj<CitiesService>(
    'CitiesService',
    ['getAllCountries']
  );

  const weatherServiceSpy = jasmine.createSpyObj<WeatherService>(
    'WeatherService',
    ['getCapitalWeather']
  );

  const timeServiceSpy = jasmine.createSpyObj<TimeService>('TimeService', [
    'getLocalTime',
  ]);

  const holidaysServiceSpy = jasmine.createSpyObj<HolidaysService>(
    'HolidaysService',
    ['getHolidays']
  );

  let component: CountrySelectComponent = new CountrySelectComponent(
    storeServiceSpy,
    citiesServiceSpy,
    weatherServiceSpy,
    timeServiceSpy,
    holidaysServiceSpy
  );

  const allCountriesData: Country[] = [
    {
      name: { common: 'Country1' },
      capital: ['Capital1'],
      cca2: 'cca21',
      flags: { png: 'png1', svg: 'svg1', alt: 'alt1' },
    },
  ];

  const selectedCountry: SelectedCountry = {
    formattedName: 'Country1',
    name: 'Country1',
    capital: 'Capital1',
    cca2: 'cca21',
    flag: 'png1',
  };

  const country = 'Country1';
  const capital = 'Capital1';
  const cca2 = 'cca21';

  const setStoreData = storeServiceSpy.setStoreData;

  citiesServiceSpy.getAllCountries.and.returnValue(of([]));
  weatherServiceSpy.getCapitalWeather.and.returnValue(of(<any>{}));
  holidaysServiceSpy.getHolidays.and.returnValue(of([]));
  timeServiceSpy.getLocalTime.and.returnValue(of(<any>{}));

  it('#Should component initialized', () => {
    expect(component).toBeTruthy();
  });

  describe('Test component lifecycle methods', () => {
    it('#Should call setAllCountries and getAllCounties methods on ngOnInit', () => {
      component.allCountries = new BehaviorSubject(<Country[]>[]);

      spyOn(component, 'setAllCountries');
      spyOn(component, 'getAllCountries');

      component.ngOnInit();

      expect(component.setAllCountries).toHaveBeenCalledTimes(1);
      expect(component.getAllCountries).toHaveBeenCalledTimes(1);
    });

    it('#Should call unsubscribeFromSubs method on ngOnDestroy', () => {
      spyOn(component, 'unsubscribeFromSubs');

      component.ngOnDestroy();

      expect(component.unsubscribeFromSubs).toHaveBeenCalledTimes(1);
    });
  });

  describe('Test getAllCountries method', () => {
    it('#Should getAllCountriesSubscription not be null', () => {
      component.getAllCountries();

      expect(component['getAllCountriesSubscription']).not.toBeNull();
    });

    it('#Should subscribe to citiesService getAllCountries method and update allCountries property with data', () => {
      citiesServiceSpy.getAllCountries.and.returnValue(of(allCountriesData));

      component.getAllCountries();

      expect(citiesServiceSpy.getAllCountries).toHaveBeenCalled();

      component.allCountries.subscribe((countries) => {
        expect(countries).toEqual(allCountriesData);
      });
    });
  });

  describe('Test setAllCountries method', () => {
    it('#Should getAllCountriesSubscription not be null', () => {
      component.setAllCountries();

      expect(component['setAllCountriesSubscription']).not.toBeNull();
    });

    it('#Should subscribe to allCountries and update countriesNames property with selectedCountry data', () => {
      component.allCountries.next(allCountriesData);

      component.setAllCountries();

      expect(component.countriesNames).toContain(selectedCountry);
    });
  });

  describe('Test setCapitalWeather method', () => {
    it('#Should set capitalWeather isFetching in store', () => {
      const weatherStoreData = { capitalWeather: { isFetching: true } };

      component.setCapitalWeather(capital, cca2);

      expect(setStoreData).toHaveBeenCalledWith(weatherStoreData);
    });

    it('#Should getCapitalWeatherSubscription not be null', () => {
      component.setCapitalWeather(capital, cca2);

      expect(component['getCapitalWeatherSubscription']).not.toBeNull();
    });

    it('#Should set capitalWeather data in store', () => {
      const weatherData: WeatherInt = {
        weather: [{ main: 'Sunny', description: 'Clear sky' }],
        main: { temp: 25, feels_like: 28 },
        name: 'Name1',
        isFetching: false,
      };

      weatherServiceSpy.getCapitalWeather.and.returnValue(of(weatherData));

      component.setCapitalWeather(capital, cca2);

      expect(setStoreData).toHaveBeenCalledWith({
        capitalWeather: { weather: weatherData, isFetching: false },
      });
    });
  });

  describe('Test setCountryHolidays method', () => {
    it('#Should set countryHolidays isFetching in store', () => {
      const countryStoreData = { countryHolidays: { isFetching: true } };

      component.setCountryHolidays(cca2);

      expect(setStoreData).toHaveBeenCalledWith(countryStoreData);
    });

    it('#Should getCountryHolidaysSubscription not be null', () => {
      component.setCountryHolidays(cca2);

      expect(component['getCountryHolidaysSubscription']).not.toBeNull();
    });

    it('#Should set countryHolidays data in store', () => {
      const countryHolidays: Holidays[] = [{ holidays: [], isFetching: false }];

      holidaysServiceSpy.getHolidays.and.returnValue(of(countryHolidays));

      component.setCountryHolidays(cca2);

      expect(setStoreData).toHaveBeenCalledWith({
        countryHolidays: { holidays: countryHolidays, isFetching: false },
      });
    });
  });

  describe('Test setCapitalTime method', () => {
    it('#Should set capitalTime isFetching in store', () => {
      const timeStoreData = { capitalTime: { isFetching: true } };

      component.setCapitalTime(country, capital);

      expect(setStoreData).toHaveBeenCalledWith(timeStoreData);
    });

    it('#Should getCapitalTimeSubscription not be null', () => {
      component.setCapitalTime(country, capital);

      expect(component['getCapitalTimeSubscription']).not.toBeNull();
    });

    it('#Should set capitalTime data in store', () => {
      const capitalTime: TimeZone = {
        time: { datetime: 'datetime1' },
        isFetching: false,
      };

      timeServiceSpy.getLocalTime.and.returnValue(of(capitalTime));

      component.setCapitalTime(country, capital);

      expect(setStoreData).toHaveBeenCalledWith({
        capitalTime: { time: capitalTime, isFetching: false },
      });
    });
  });

  describe('Test handleCountryValue method', () => {
    it('#Should emit the country value', () => {
      const emitCountryValueSpy = spyOn(component.emitCountryValue, 'emit');

      component.handleCountryValue(selectedCountry);

      expect(emitCountryValueSpy).toHaveBeenCalledWith(selectedCountry);
    });

    it('#Should set component selectedCountry property', () => {
      component.handleCountryValue(selectedCountry);

      expect(component.selectedCountry).toEqual(selectedCountry);
    });

    it('#Should set selectedCountry in store', () => {
      component.handleCountryValue(selectedCountry);

      expect(setStoreData).toHaveBeenCalledWith({ selectedCountry });
    });

    it('#Should call setCapitalWeather', () => {
      spyOn(component, 'setCapitalWeather');

      component.handleCountryValue(selectedCountry);

      expect(component.setCapitalWeather).toHaveBeenCalledTimes(1);
    });

    it('#Should call setCapitalTime', () => {
      spyOn(component, 'setCapitalTime');

      component.handleCountryValue(selectedCountry);

      expect(component.setCapitalTime).toHaveBeenCalledTimes(1);
    });

    it('#Should call setCountryHolidays', () => {
      spyOn(component, 'setCountryHolidays');

      component.handleCountryValue(selectedCountry);

      expect(component.setCountryHolidays).toHaveBeenCalledTimes(1);
    });
  });

  describe('Test unsubscribeFromSubs method', () => {
    it('#Should unsubscribe from setAllCountriesSubscription', () => {
      component['setAllCountriesSubscription'] = new Subscription();

      spyOn(component['setAllCountriesSubscription'], 'unsubscribe');

      component.ngOnDestroy();

      expect(
        component['setAllCountriesSubscription'].unsubscribe
      ).toHaveBeenCalledTimes(1);
    });

    it('#Should unsubscribe from getAllCountriesSubscription', () => {
      component['getAllCountriesSubscription'] = new Subscription();

      spyOn(component['getAllCountriesSubscription'], 'unsubscribe');

      component.ngOnDestroy();

      expect(
        component['getAllCountriesSubscription'].unsubscribe
      ).toHaveBeenCalledTimes(1);
    });

    it('#Should unsubscribe from getCapitalWeatherSubscription', () => {
      component['getCapitalWeatherSubscription'] = new Subscription();

      spyOn(component['getCapitalWeatherSubscription'], 'unsubscribe');

      component.ngOnDestroy();

      expect(
        component['getCapitalWeatherSubscription'].unsubscribe
      ).toHaveBeenCalledTimes(1);
    });

    it('#Should unsubscribe from getCapitalTimeSubscription', () => {
      component['getCapitalTimeSubscription'] = new Subscription();

      spyOn(component['getCapitalTimeSubscription'], 'unsubscribe');

      component.ngOnDestroy();

      expect(
        component['getCapitalTimeSubscription'].unsubscribe
      ).toHaveBeenCalledTimes(1);
    });

    it('#Should unsubscribe from getCountryHolidaysSubscription', () => {
      component['getCountryHolidaysSubscription'] = new Subscription();

      spyOn(component['getCountryHolidaysSubscription'], 'unsubscribe');

      component.ngOnDestroy();

      expect(
        component['getCountryHolidaysSubscription'].unsubscribe
      ).toHaveBeenCalledTimes(1);
    });
  });
});
