export interface TimeZone {
  time: Time;
  isFetching?: boolean;
}

export interface Time {
  datetime: string;
}

export interface timeError {
  weather: [{ main: string; description: string }];
  main: {
    temp: null;
    feels_like: null;
  };
}
