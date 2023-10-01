import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@src/app/cities/models/store.interface';
import { TimeZone, Time } from '@src/app/cities/models/timezone.interface';
import { StoreService } from '@src/app/cities/services/store.service';
import { handleCardStates } from '@src/app/shared/utils/isFetching';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shared-time-card',
  templateUrl: './time-card.component.html',
  styleUrls: ['./time-card.component.scss'],
})
export class TimeCardComponent implements OnInit, OnDestroy {
  store$ = this.storeService.getStoreData;
  storeSubscription: Subscription | null = null;
  showSpinner: boolean = false;
  showTimeCard: boolean = false;
  hasError: boolean | null = false;

  capitalTimeDayData: Date = new Date();
  capitalTime: number = 0;
  isDay: boolean = true;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  ngOnDestroy(): void {
    if (this.storeSubscription !== null) this.storeSubscription.unsubscribe();
  }

  loadAllData(): void {
    this.storeSubscription = this.store$.subscribe({
      next: (store: Store) => {
        if (store.selectedCountry?.capital === 'No Capital') {
          this.hasError = true;
          return;
        }

        this.hasError = false;

        const timeStore: Time = store.capitalTime?.time;

        this.capitalTimeDayData = new Date(timeStore?.datetime);

        this.capitalTime = new Date(timeStore?.datetime).getHours();

        this.capitalTime > 7 && this.capitalTime < 19
          ? (this.isDay = true)
          : (this.isDay = false);

        const isFetching: boolean | undefined = store.capitalTime?.isFetching;

        const { spinnerState, cardState } = handleCardStates(
          this.showSpinner,
          this.showTimeCard,
          isFetching
        );
        this.showSpinner = spinnerState;
        this.showTimeCard = cardState;
      },
    });
  }

  get displayTimeCard(): boolean {
    return (
      !this.hasError &&
      !isNaN(this.capitalTimeDayData.valueOf()) &&
      this.showTimeCard
    );
  }
}
