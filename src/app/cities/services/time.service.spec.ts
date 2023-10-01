import { TimeService } from './time.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('TimeService', () => {
  const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj(
    'HttpClient',
    ['get']
  );
  let service: TimeService = new TimeService(httpClientSpy);

  const country: string = 'Argentina';
  const capital = 'Buenos Aires';

  const timeErrorValues = service['timeErrorValues'];

  it('#Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test getLocalTime method', () => {
    it('#Should return local time on success', () => {
      const expectedTime = {
        time: { datetime: '2023-09-30T12:00:00Z' },
        isFetching: false,
      };

      httpClientSpy.get.and.returnValue(of(expectedTime));

      service.getLocalTime(country, capital).subscribe((time) => {
        expect(time).toEqual(expectedTime);
      });

      expect(httpClientSpy.get).toHaveBeenCalledWith(
        `${service['timezoneApiUrl']}/current_time/?api_key=${service['timezoneApiKey']}&location=${capital}, ${country}`
      );
    });

    it('#Should handle errors and return timeErrorValues on error', () => {
      httpClientSpy.get.and.returnValue(throwError(() => timeErrorValues));

      service.getLocalTime(country, capital).subscribe((time) => {
        expect(time).toEqual(service['timeErrorValues']);
      });

      expect(httpClientSpy.get).toHaveBeenCalledWith(
        `${service['timezoneApiUrl']}/current_time/?api_key=${service['timezoneApiKey']}&location=${capital}, ${country}`
      );
    });

    it('#Should return timeErrorValues if country or capital is undefined', () => {
      const undefinedCountry = undefined;

      service.getLocalTime(undefinedCountry, capital).subscribe((time) => {
        expect(time).toEqual(service['timeErrorValues']);
      });
    });
  });
});
