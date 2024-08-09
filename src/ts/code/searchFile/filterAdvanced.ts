import { FilteringData } from './filteringData';

export class SelectedFilter {
  constructor() {}

  selectedFilter(key: string, value: string | number | boolean): void {
    const urlParams = new URLSearchParams(window.location.search);
    const savedCountry = urlParams.get('isCountry');
    const savedDuration = urlParams.get('isDuration');
    const savedDate = urlParams.get('date');
    const savedKids = urlParams.get('kids');
    const minPrice = urlParams.get('priceMin');
    const maxPrice = urlParams.get('priceMax');

    if (savedCountry) {
      new FilteringData().filterAdvanced('isCountry', +savedCountry, key, value);
    }
    if (savedDuration) {
      new FilteringData().filterAdvanced('isDuration', +savedDuration, key, value);
    }
    if (savedDate) {
      new FilteringData().filterAdvanced('date', savedDate, key, value);
    }
    if (savedKids ) {
      if (savedKids !== '0') {
        new FilteringData().filterAdvanced('isKids', true, key, value);
      } else {
        new FilteringData().filterAdvanced('isKids', false, key, value);
      }
    }

    if (minPrice && maxPrice ) {
      new FilteringData().filterAdvanced('priceMin', +minPrice, 'priceMax', +maxPrice);
    }
  }
}
