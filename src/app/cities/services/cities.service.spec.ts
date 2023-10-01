import { HttpClient } from '@angular/common/http';
import { CitiesService } from './cities.service';
import { of, throwError } from 'rxjs';

describe('CitiesService', () => {
  const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj(
    'HttpClient',
    ['get']
  );

  let service: CitiesService = new CitiesService(httpClientSpy);

  it('#Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test getAllCountries method', () => {
    it('#Should return a list of countries on success', () => {
      const expectedCountries = [
        {
          name: { common: 'Country1' },
          cca2: 'cca1',
          capital: ['Capital1'],
          flags: { png: '', svg: '', alt: '' },
        },
        {
          name: { common: 'Country2' },
          cca2: 'cca2',
          capital: ['Capital2'],
          flags: { png: '', svg: '', alt: '' },
        },
      ];

      httpClientSpy.get.and.returnValue(of(expectedCountries));

      service.getAllCountries().subscribe((countries) => {
        expect(countries).toEqual(expectedCountries);
      });

      expect(httpClientSpy.get).toHaveBeenCalledWith(
        `${service['countriesApiUrl']}/all`
      );
    });

    it('#Should handle errors and return an empty array on error', () => {
      httpClientSpy.get.and.returnValue(throwError(() => []));

      service.getAllCountries().subscribe((countries) => {
        expect(countries).toEqual([]);
      });

      expect(httpClientSpy.get).toHaveBeenCalledWith(
        `${service['countriesApiUrl']}/all`
      );
    });
  });
});
