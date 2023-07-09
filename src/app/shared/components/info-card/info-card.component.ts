import { Component, Input } from '@angular/core';
import { Holidays } from 'src/app/cities/interfaces/holidays.interface';
import { TimeZone } from 'src/app/cities/interfaces/timezone.interface';
import { WeatherInt } from 'src/app/cities/interfaces/weather.interface';

@Component({
  selector: 'shared-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent {
  @Input()
  public weatherInfo?: WeatherInt;

  @Input()
  public timeInfo?: TimeZone;

  @Input()
  public holidaysInfo?: Holidays[];

  @Input()
  public daysToHoliday?: number;

  @Input()
  public nextCountryHoliday?: string;

  constructor() {}

  isCelsius: boolean = true;

  onToggle(): string {
    return this.isCelsius ? 'Fahrenheit' : 'Celsius';
  }
}
