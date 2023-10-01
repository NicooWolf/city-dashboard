import { WeatherService } from './weather.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('WeatherService', () => {
  const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj(
    'HttpClient',
    ['get']
  );

  let service: WeatherService = new WeatherService(httpClientSpy);

  const cc2 = 'AR';
  const capital = 'Buenos Aires';

  it('#Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test getCapitalWeather method', () => {
    it('#Should return capital weather on success', () => {
      const expectedWeather = {
        weather: [{ main: 'Sunny', description: 'Clear sky' }],
        main: {
          temp: 25.0,
          feels_like: 27.0,
        },
        name: '',
        isFetching: false,
      };

      httpClientSpy.get.and.returnValue(of(expectedWeather));

      service.getCapitalWeather(capital, cc2).subscribe((weather) => {
        expect(weather).toEqual(expectedWeather);
      });

      expect(httpClientSpy.get).toHaveBeenCalledWith(
        `${service['weatherApiUrl']}/weather?appid=${service['weatherApiKey']}&q=${capital},${cc2}`
      );
    });

    it('#Should handle errors and return weatherErrorValues on error', () => {
      httpClientSpy.get.and.returnValue(throwError('Error'));

      service.getCapitalWeather(capital, cc2).subscribe((weather) => {
        expect(weather).toEqual(service['weatherErrorValues']);
      });

      expect(httpClientSpy.get).toHaveBeenCalledWith(
        `${service['weatherApiUrl']}/weather?appid=${service['weatherApiKey']}&q=${capital},${cc2}`
      );
    });

    it('#Should return an empty object if country or capital is undefined', () => {
      const undefinedCapital = undefined;

      service.getCapitalWeather(undefinedCapital, cc2).subscribe((weather) => {
        expect(weather).toEqual(<any>{});
      });
    });

    it('#Should return an empty object if capital is "No Capital"', () => {
      const noCapital = 'No Capital';

      service.getCapitalWeather(noCapital, cc2).subscribe((weather) => {
        expect(weather).toEqual(<any>{});
      });
    });
  });
});
