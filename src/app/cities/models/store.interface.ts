import { SelectedCountry } from './country.interface';
import { Holidays } from './holidays.interface';
import { TimeZone } from './timezone.interface';
import { WeatherInt } from './weather.interface';

export interface Store {
  countryHolidays: Holidays;
  selectedCountry: SelectedCountry;
  capitalWeather: WeatherInt;
  capitalTime: TimeZone;
}
