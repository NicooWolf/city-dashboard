import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fahrenheit',
})
export class FahrenheitPipe implements PipeTransform {
  transform(value: number | string) {
    if (value === null) {
      return (value = 'No Data');
    } else {
      return value !== undefined
        ? ((<number>value - 273.15) * (9 / 5) + 32).toFixed(2).toString() +
            ' °F'
        : '';
    }
  }
}
