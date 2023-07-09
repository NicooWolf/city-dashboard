import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from 'src/app/cities/interfaces/store.interface';
import { StoreService } from 'src/app/cities/services/store.service';

@Component({
  selector: 'shared-search-dropdown',
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.scss'],
})
export class SearchDropdownComponent {
  @Input()
  public searchLabel: string = '';

  @Input()
  public countriesNames: string[] = [];

  @Input()
  public countriesFlags: string[] = [];

  @Input()
  public countryFlag: string = '';

  @Output() emitCapitalValue: EventEmitter<Store> = new EventEmitter<Store>();

  constructor(private storeService: StoreService) {}

  public selectedValue(val: string): void {
    this.storeService.resetStore(<Store>{ isLoading: false });

    const values: Store = { countryName: val, isLoading: true };

    this.emitCapitalValue.emit(values);
    console.log('flag desde search', this.countryFlag);
    console.log('flagssssssss desde search', this.countriesFlags);
  }
}
