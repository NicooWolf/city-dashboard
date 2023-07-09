import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celsius',
})
export class CelsiusPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value === null) {
      return value;
    } else {
      return value !== undefined
        ? (value - 273.15).toFixed(2).toString() + ' °C'
        : '';
    }
  }
}
