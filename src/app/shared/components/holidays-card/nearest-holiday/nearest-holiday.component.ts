import { Component, OnInit } from '@angular/core';
import { HolidaysCardComponent } from '../holidays-card.component';
import { StoreService } from '@src/app/cities/services/store.service';
import { HolidaysService } from '@src/app/cities/services/holidays.service';

@Component({
  selector: 'shared-nearest-holiday',
  templateUrl: './nearest-holiday.component.html',
  styleUrls: ['./nearest-holiday.component.scss'],
})
export class NearestHolidayComponent
  extends HolidaysCardComponent
  implements OnInit
{
  constructor(storeService: StoreService, holidaysService: HolidaysService) {
    super(storeService, holidaysService);
  }

  get displayNearestCard(): boolean {
    return (
      !this.hasError && this.showHolidaysCard && this.countryHolidays.length > 0
    );
  }
}
