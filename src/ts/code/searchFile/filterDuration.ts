import $ from 'jquery';
import { FilteringData } from './filteringData';

export class Duration {
  durationCurrent: JQuery<HTMLElement>;

  constructor() {
    this.durationCurrent = $('.info__duration-current');
    this.selectDuration();
    const urlParams = new URLSearchParams(window.location.search);
    const isDuration = urlParams.get('isDuration');

    if (isDuration) {
      new FilteringData().restoreFilterFromUrl('isDuration');
    }
    
  }


  selectDuration(): void {
    $('.info__duration-list li').on('click', event => {
      const duration = $(event.target).index()+1;

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('isDuration', duration.toString());
      window.history.pushState({}, '', newUrl.toString());

      new FilteringData().removeParametersFromUrl(['isCountry', 'date', 'kids', 'adults','isStar']);
    });
  }
}
