import { StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService = new StoreService();

  const initialStoreData = service['initialState'];

  it('#Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test setStoreData method', () => {
    it('#Should update store data correctly', () => {
      const updateData: any = {
        capitalWeather: { weather: 'fake' },
        selectedCountry: 'fake',
      };

      service.setStoreData(updateData);

      const updatedStoreData = service['storeSubject'].value;

      expect(updatedStoreData).toEqual({
        ...initialStoreData,
        ...updateData,
      });
    });
  });

  describe('Test resetStoreData method', () => {
    it('#Should reset store data correctly', () => {
      const resetData: any = {
        capitalWeather: { weather: null },
      };

      service.resetStore(resetData);

      const resetStoreData = service['storeSubject'].value;
      expect(resetStoreData).toEqual({
        ...initialStoreData,
        ...resetData,
      });
    });
  });

  describe('Test getStoreData method', () => {
    it('#Should return the store data', () => {
      const getStoreData = service.getStoreData;

      expect(getStoreData).toEqual(service['store$']);
    });
  });
});
