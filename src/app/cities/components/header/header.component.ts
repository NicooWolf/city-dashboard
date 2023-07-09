import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CitiesService } from '../../services/cities.service';
import { Country } from '../../interfaces/country.interface';
import { StoreService } from '../../services/store.service';
import { Store } from '../../interfaces/store.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public countries: Country[] = [];
  public countryCodes: string[] = [];
  public countriesNames: string[] = [];
  public countryName: string | undefined = '';
  public selectedCapital!: string[];
  public countryContinents: string[] = [];
  public uniqueCountryCode: string = '';
  public countryContinent: string = '';
  public countriesFlags: string[] = [];
  public countryFlag: string = '';

  constructor(
    private citiesService: CitiesService,
    private storeService: StoreService
  ) {}

  @Output() emitCapitalValue: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.getAllCountries();
    this.getLocalStorageData();
  }

  getCapitalValue({ countryName, isLoading }: Store) {
    this.countryName = countryName;
    this.storeService.setStore({ isLoading: isLoading });
    this.emitCapitalValue.emit(countryName);

    this.setCountryValues();
  }

  getCapital(): void {
    this.citiesService
      .getCapital(<string>this.countryName)
      .subscribe((capital: Country[]) =>
        capital.map((name) => {
          this.selectedCapital =
            name.capital !== undefined
              ? name.capital
              : ['No capital for this Country in database.'];
          this.storeService.setStore(<Store>{
            countryName: this.countryName,
            countryCapital: this.selectedCapital[0],
          });
        })
      );
  }

  getUniqueCountryCode(): void {
    this.uniqueCountryCode = this.citiesService.getuniqueCountryCode(
      this.countriesNames,
      <string>this.countryName,
      this.countryCodes
    );
  }

  setCountryValues(): void {
    this.countryContinent = this.citiesService.getCountryContinent(
      this.countryContinents,
      this.countriesNames,
      <string>this.countryName
    );
    this.countryFlag = this.citiesService.getCountryFlag(
      this.countriesFlags,
      this.countriesNames,
      <string>this.countryName
    );
    this.getCapital();
    this.getUniqueCountryCode();
    this.storeService.setStore({
      countryCode: this.uniqueCountryCode,
      countryContinent: this.countryContinent,
      countryFlag: this.countryFlag,
    });
  }

  getAllCountries(): void {
    this.citiesService.getAllCountries().subscribe((countries: Country[]) => {
      this.countries = countries
        .slice(1, this.citiesService.generateRandomNum(50))
        .filter((country: Country) => country.cca2 !== 'AQ');
      this.countriesNames = this.countries.map(
        (country: Country) => country.name.common
      );
      this.countryCodes = this.countries.map(
        (country: Country) => country.cca2
      );
      this.countryContinents = this.countries.map(
        (country: Country) => country.continents[0]
      );
      this.countriesFlags = this.countries.map((country) => country.flags.svg);
    });
  }

  getLocalStorageData() {
    const localStore: string | null = localStorage.getItem('store');
    if (localStore) {
      const localParse: Store = JSON.parse(localStore);
      const countryCapital = <string>localParse.countryCapital;
      this.selectedCapital = [countryCapital];
    }
  }
}
