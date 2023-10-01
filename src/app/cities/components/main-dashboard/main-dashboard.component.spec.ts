import { MainDashboardComponent } from './main-dashboard.component';
import { StoreService } from '../../services/store.service';
import { of } from 'rxjs';

describe('MainDashboardComponent', () => {
  const spyStoreService = jasmine.createSpyObj<StoreService>('StoreService', [
    'getStoreData',
  ]);

  let component: MainDashboardComponent = new MainDashboardComponent(
    spyStoreService
  );

  const mockSubscription = jasmine.createSpyObj('Subscription', [
    'unsubscribe',
    'subscribe',
  ]);

  const mockLoadAllData = () => component.loadAllData();

  it('#Should component initialized', () => {
    expect(component).toBeTruthy();
  });

  describe('Test component lifecycle methods', () => {
    it('#Should call load data on ngOnInit', () => {
      spyOn(component, 'loadAllData');

      component.ngOnInit();

      expect(component.loadAllData).toHaveBeenCalledTimes(1);
    });

    it('#Should unsubscribe onDestroy', () => {
      component.storeSubscription = mockSubscription;

      component.ngOnDestroy();

      expect(mockSubscription.unsubscribe).toHaveBeenCalledTimes(1);
    });
  });

  describe('Test loadAllData method', () => {
    it('#Should set hasError to true when selectedCountry has "No Capital"', () => {
      const mockStoreData = {
        selectedCountry: { capital: 'No Capital' },
        countryHolidays: { holidays: [] },
      };
      component.store$ = of(<any>mockStoreData);

      mockLoadAllData();

      expect(component.hasError).toBeTruthy();
    });

    it('#Should set hasError to false when selectedCountry has a valid Capital', () => {
      const mockStoreData = {
        selectedCountry: { capital: 'Buenos Aires' },
        countryHolidays: { holidays: [] },
      };
      component.store$ = of(<any>mockStoreData);

      mockLoadAllData();

      expect(component.hasError).toBeFalsy();
    });

    it('#Should set showHolidaysCard to false when holidays is empty', () => {
      const mockStoreData = {
        selectedCountry: { capital: 'Buenos Aires' },
        countryHolidays: { holidays: [] },
      };
      component.store$ = of(<any>mockStoreData);

      mockLoadAllData();

      expect(component.showHolidaysCard).toBeFalsy();
    });

    it('#Should set showHolidaysCard to true when holidays has data', () => {
      const mockStoreData = {
        selectedCountry: { capital: 'Buenos Aires' },
        countryHolidays: { holidays: [{ fake: 'fake' }] },
      };
      component.store$ = of(<any>mockStoreData);

      mockLoadAllData();

      expect(component.showHolidaysCard).toBeTruthy();
    });
  });
});
