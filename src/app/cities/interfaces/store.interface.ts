import { Holidays } from './holidays.interface';
import { TimeZone } from './timezone.interface';
import { WeatherInt } from './weather.interface';

export interface Store {
  isLoading?: boolean;
  countryCode?: string;
  countryContinent?: string;
  countryName?: string;
  countryCapital?: string;
  countryTime?: TimeZone;
  countryHolidays?: Holidays[];
  nextCountryHoliday?: string;
  daysToHoliday?: number;
  weatherInfo?: WeatherInt;
  countryFlag?: string;
}
