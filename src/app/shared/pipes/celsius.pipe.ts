import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celsius',
})
export class CelsiusPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null) {
      return (value = 'No Data');
    } else {
      return value !== undefined
        ? (<number>value - 273.15).toFixed(2).toString() + ' °C'
        : '';
    }
  }
}
