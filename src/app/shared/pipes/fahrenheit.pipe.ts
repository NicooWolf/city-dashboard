import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fahrenheit',
})
export class FahrenheitPipe implements PipeTransform {
  transform(value: number | undefined) {
    if (value === null) {
      return (value = undefined);
    } else {
      return value !== undefined
        ? ((value - 273.15) * (9 / 5) + 32).toFixed(2).toString() + ' °F'
        : '';
    }
  }
}
