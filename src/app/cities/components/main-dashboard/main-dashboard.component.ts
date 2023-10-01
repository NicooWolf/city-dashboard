import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store.interface';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
})
export class MainDashboardComponent implements OnInit, OnDestroy {
  store$ = this.storeService.getStoreData;
  storeSubscription: Subscription | null = null;
  showSpinner: boolean = false;
  showHolidaysCard: boolean = false;
  hasError: boolean = false;

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

        this.showHolidaysCard = store.countryHolidays?.holidays?.length > 0;
      },
    });
  }
}
