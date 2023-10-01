import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CelsiusPipe } from './pipes/celsius.pipe';
import { FormsModule } from '@angular/forms';
import { FahrenheitPipe } from './pipes/fahrenheit.pipe';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { HolidaysCardComponent } from './components/holidays-card/holidays-card.component';
import { CountrySelectComponent } from './components/country-select/country-select.component';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { TimeCardComponent } from './components/time-card/time-card.component';
import { DateCardComponent } from './components/time-card/date-card/date-card.component';
import { ButtonModule } from 'primeng/button';
import { NearestHolidayComponent } from './components/holidays-card/nearest-holiday/nearest-holiday.component';

@NgModule({
  declarations: [
    CelsiusPipe,
    FahrenheitPipe,
    WeatherCardComponent,
    CountrySelectComponent,
    TimeCardComponent,
    HolidaysCardComponent,
    NearestHolidayComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ProgressSpinnerModule,
    InputSwitchModule,
    TableModule,
    ButtonModule,
    DateCardComponent,
  ],
  exports: [
    WeatherCardComponent,
    CountrySelectComponent,
    TimeCardComponent,
    HolidaysCardComponent,
    NearestHolidayComponent,
  ],
})
export class SharedModule {}
