export interface Holidays {
  holidays: Holiday[];
  isFetching: boolean;
}

export interface Holiday {
  country: string;
  iso: string;
  year: number;
  date: string;
  day: string;
  name: string;
  type: string;
}

export interface holidaysTableCols {
  field: string;
  header: string;
}
