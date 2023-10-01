import { HolidaysService } from './holidays.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('HolidaysService', () => {
  const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj(
    'HttpClient',
    ['get']
  );

  let service: HolidaysService = new HolidaysService(httpClientSpy);

  const cc2 = 'AR';

  it('#Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test getHolidays method', () => {
    it('#Should return a list of holidays on success', () => {
      const expectedHolidays = [
        {
          holidays: [
            {
              name: 'Holiday1',
              country: '',
              iso: '',
              year: 2023,
              date: '',
              day: '',
              type: '',
            },
          ],
          isFetching: false,
        },
        {
          holidays: [
            {
              name: 'Holiday2',
              country: '',
              iso: '',
              year: 2024,
              date: '',
              day: '',
              type: '',
            },
          ],
          isFetching: false,
        },
      ];

      httpClientSpy.get.and.returnValue(of(expectedHolidays));

      service.getHolidays(cc2).subscribe((holidays) => {
        expect(holidays).toEqual(expectedHolidays);
      });

      expect(httpClientSpy.get).toHaveBeenCalledWith(
        `${service['holidaysApiUrl']}/holidays?country=${cc2}&year=2023`,
        {
          headers: { 'X-Api-Key': service['holidaysApiKey'] },
        }
      );
    });

    it('#Should handle errors and return an empty array on error', () => {
      httpClientSpy.get.and.returnValue(throwError(() => []));

      service.getHolidays(cc2).subscribe((holidays) => {
        expect(holidays).toEqual([]);
      });

      expect(httpClientSpy.get).toHaveBeenCalledWith(
        `${service['holidaysApiUrl']}/holidays?country=${cc2}&year=2023`,
        {
          headers: { 'X-Api-Key': service['holidaysApiKey'] },
        }
      );
    });

    it('#Should return an empty array if cc2 is undefined', () => {
      const undefinedCc2 = undefined;

      service.getHolidays(undefinedCc2).subscribe((holidays) => {
        expect(holidays).toEqual([]);
      });
    });
  });

  describe('Test daysToHoliday method', () => {
    it('#Should calculate days to holiday correctly', () => {
      const store: any = {
        capitalTime: {
          time: {
            datetime: '2023-09-30T00:00:00Z',
          },
        },
      };

      const nextHoliday = '2023-10-05';

      const result = service.daysToHoliday(nextHoliday, store);

      expect(result).toBe(5);
    });
  });

  describe('Test findNearestHoliday method', () => {
    it('#Should find nearest holiday when futureDates exist', () => {
      const store: any = {
        capitalTime: {
          time: {
            datetime: '2023-09-30T00:00:00Z',
          },
        },
        countryHolidays: {
          holidays: [{ date: '2023-10-05' }, { date: '2023-10-10' }],
        },
      };

      const result = service.findNearestHoliday(store);

      expect(result.nearestDate).toEqual(new Date('2023-10-06'));
      expect(result.daysToHoliday).toBe(6);
    });

    it('#Should handle when futureDates and capitalTime are undefined', () => {
      const store: any = {
        capitalTime: {
          time: {
            datetime: undefined,
          },
        },
        countryHolidays: {
          holidays: undefined,
        },
      };

      const result = service.findNearestHoliday(store);

      expect(result.nearestDate).toBeUndefined();
      expect(result.daysToHoliday).toBeNaN();
    });
  });
});
