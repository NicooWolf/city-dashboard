import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '../interfaces/store.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private storeSubject: BehaviorSubject<Store> = new BehaviorSubject<Store>({});
  public store$ = this.storeSubject.asObservable();

  constructor() {}

  get store(): Store {
    return this.storeSubject.value;
  }

  setStore(updateData: Store | {}): void {
    const updatedStore = { ...this.store, ...updateData };
    this.storeSubject.next(updatedStore);
    console.log('this.store >>> ', updatedStore);
  }

  resetStore(resetValue: Store | {} = {}): void {
    this.storeSubject.next(resetValue);
  }
}
