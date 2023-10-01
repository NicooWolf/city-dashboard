import { Component } from '@angular/core';
import { Store } from '@src/app/cities/models/store.interface';
import { StoreService } from '@src/app/cities/services/store.service';
import { Subscription } from 'rxjs';
import { handleCardStates } from '../../utils/isFetching';
import {
  Holiday,
  holidaysTableCols,
} from '@src/app/cities/models/holidays.interface';
import { HolidaysService } from '@src/app/cities/services/holidays.service';

@Component({
  selector: 'shared-holidays-card',
  templateUrl: './holidays-card.component.html',
  styleUrls: ['./holidays-card.component.scss'],
})
export class HolidaysCardComponent {
  store$ = this.storeService.getStoreData;
  storeSubscription: Subscription | null = null;
  showSpinner: boolean = false;
  showHolidaysCard: boolean = false;
  checked: boolean = false;
  hasError: boolean = false;

  countryName: string = '';
  countryHolidays: Holiday[] = [];

  holidaysTableCols!: holidaysTableCols[];
  nearestHolyDate: string | Date = '';
  daysToHoliday: number = 0;

  constructor(
    private storeService: StoreService,
    private holidaysService: HolidaysService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
    this.loadTableColumns();
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

        this.countryName = store.selectedCountry?.name;
        this.countryHolidays = store.countryHolidays.holidays;

        this.loadHolidaysData(store);

        const isFetching: boolean | undefined =
          store.countryHolidays?.isFetching;

        const { spinnerState, cardState } = handleCardStates(
          this.showSpinner,
          this.showHolidaysCard,
          isFetching
        );
        this.showSpinner = spinnerState;
        this.showHolidaysCard = cardState;
      },
    });
  }

  loadTableColumns(): void {
    this.holidaysTableCols = [
      { field: 'date', header: 'Date' },
      { field: 'day', header: 'Day' },
      { field: 'name', header: 'Name' },
    ];
  }

  loadHolidaysData(store: Store): void {
    const { daysToHoliday, nearestDate } =
      this.holidaysService.findNearestHoliday(store);

    this.daysToHoliday = daysToHoliday;
    this.nearestHolyDate = nearestDate;
  }

  get displayHolidaysCard(): boolean {
    return !this.hasError && this.showHolidaysCard;
  }
}
