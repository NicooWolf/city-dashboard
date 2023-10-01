export interface WeatherInt {
  weather: Weather | any;
  main: Main;
  name: string;
  isFetching: boolean;
}

export interface skyStatus {
  Clear: string;
  Clouds: string;
  Rain: string;
  Snow: string;
}

export interface weatherError {
  weather: [{ main: string; description: string }];
  main: {
    temp: null;
    feels_like: null;
  };
}

export enum skyValues {
  Clear = 'Clear',
  Clouds = 'Clouds',
  Rain = 'Rain',
  Snow = 'Snow',
}

export interface Main {
  temp: number;
  feels_like: number;
}

export interface Weather {
  id: number;
  main: Main;
  description: string;
  icon: string;
}
