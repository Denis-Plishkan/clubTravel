import $ from 'jquery';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { FilteringData } from './filteringData';

export class SelectData {
  dateCurrent: JQuery<HTMLElement>;

  constructor() {
    this.dateCurrent = $('.info__date-current');
    this.calendar();
    const urlParams = new URLSearchParams(window.location.search);
    const date = urlParams.get('date');

    if (date) {
      new FilteringData().restoreFilterFromUrl('date');
    }
  }

  calendar() {
    new AirDatepicker('#calendar', {
      onSelect: function ({ date }) {
        const dateObj = Array.isArray(date) ? date[0] : date;
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();

        const formattedDate = `${day}.${month}.${year}`;

        $('.info__date-current').text(formattedDate);

        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('date', formattedDate);
        window.history.pushState({ path: currentUrl.href }, '', currentUrl.href);

        new FilteringData().removeParametersFromUrl(['isCountry', 'isDuration', 'kids', 'adults', 'isStar']);
      },
    });
  }
}
