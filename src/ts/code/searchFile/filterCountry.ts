import $ from 'jquery';
import { FilteringData } from './filteringData';

export class Country {
  destinationCurrent: JQuery<HTMLElement>;

  constructor() {
    this.destinationCurrent = $('.info__destination-current');
    this.selectCountry();
    const urlParams = new URLSearchParams(window.location.search);
    const isCountry = urlParams.get('isCountry');

    if (isCountry) {
      new FilteringData().restoreFilterFromUrl('isCountry');
    }
  }

  selectCountry(): void {
    $('.info__destination-list li').on('click', (event) => {
      const index = $(event.currentTarget).index();

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('isCountry', index.toString());
      window.history.pushState({}, '', newUrl.toString());

      new FilteringData().removeParametersFromUrl(['isDuration', 'date', 'kids', 'adults', 'isStar']);
    });
  }
}
