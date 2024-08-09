import { FilteringData } from './filteringData';
import { Country } from './filterCountry';
import { Duration } from './filterDuration';
import { SelectData } from './filterDate';
import { Guests } from './filterGuests';
import { Hotels } from './filterHotel';
import { AdvancedSearch } from './advanced';

export class AllImportFile {
  filterinf: FilteringData;
  duration: Duration;
  selectData: SelectData;
  guests: Guests;
  hotels: Hotels;
  country: Country;
  advanced: AdvancedSearch;

  constructor() {
    this.filterinf = new FilteringData();
    this.country = new Country();
    this.duration = new Duration();
    this.selectData = new SelectData();
    this.guests = new Guests();
    this.hotels = new Hotels();
    this.advanced = new AdvancedSearch()
  }
}
