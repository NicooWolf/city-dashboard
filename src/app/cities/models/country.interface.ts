export interface Country {
  name: Name;
  cca2: string;
  capital: string[];
  flags: Flags;
}

export interface SelectedCountry {
  formattedName: string;
  name: string;
  capital: string;
  cca2: string;
  flag: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

export interface Name {
  common: string;
}
