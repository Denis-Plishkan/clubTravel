import $ from 'jquery';
import { FilteringData } from './filteringData';
import { RenderHotTour } from './renderFiles';
export class Guests {
  guestsItemAdults: JQuery<HTMLElement>;
  searchPanelBtn: JQuery<HTMLElement>;
  counterKids: JQuery<HTMLElement>;
  durationCurrent: JQuery<HTMLElement>;
  destinationCurrent: JQuery<HTMLElement>;
  dateCurrent: JQuery<HTMLElement>;
  kidsCounter: JQuery<HTMLElement>;
  url: URL;

  constructor() {
    this.guestsItemAdults = $('.info__guests-item_adults');
    this.counterKids = $('.info__guests-counters_kids');
    this.searchPanelBtn = $('.search__panel-btn');
    this.durationCurrent = $('.info__duration-current');
    this.destinationCurrent = $('.info__destination-current');
    this.dateCurrent = $('.info__date-current');
    this.kidsCounter = $('.info__guests-subcounter');
    this.updateGuests();
    this.updateKids();
    this.closeDropDown();
    this.haldelsClik();

    this.url = new URL(window.location.href);

    // const urlParams = new URLSearchParams(window.location.search);
    // const kids = urlParams.get('kids');
    // const isKids = urlParams.get('isKids');

    // if (kids === '0') {
    //   new FilteringData().restoreFilterFromUrl('isKids', false);
    // }
  }

  updateGuests(): void {
    let adultsCounter = $('.guests__current-counter');
    let counterTop = $('.info__guests-counter');

    this.guestsItemAdults.each(function () {
      let minusBtn = $(this).find('.info__guests-minus_adults');
      let plusBtn = $(this).find('.info__guests-plus_adults');
      let counter = $(this).find('.info__guests-counters_adults');

      minusBtn.on('click', function () {
        let currentValue = +counter.text();
        if (currentValue > 0) {
          counter.text(currentValue - 1);
          adultsCounter.text(currentValue - 1);
          counterTop.text(currentValue - 1);
        }

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('adults', counterTop.text());
        history.pushState({}, '', newUrl.toString());
      });

      plusBtn.on('click', function () {
        let currentValue = +counter.text();
        if (currentValue < 9) {
          counter.text(currentValue + 1);
          adultsCounter.text(currentValue + 1);
          counterTop.text(currentValue + 1);
        }

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('adults', counterTop.text());
        history.pushState({}, '', newUrl.toString());
      });
    });
  }

  updateKids(): void {
    let kidsCounter = $('.info__guests-counters_kids');
    let kidsItem = $('.info__guests-item_kids');
    let minusBtn = kidsItem.find('.info__guests-minus_kids');
    let plusBtn = kidsItem.find('.info__guests-plus_kids');
    let counter = kidsItem.find('.info__guests-counters_kids');
    let counterKids = $('.info__guests-subcounter');

    minusBtn.on('click', function () {
      let currentVal = +counter.text();
      if (currentVal > 0) {
        counter.text(currentVal - 1);
        kidsCounter.text(currentVal - 1);
        counterKids.text(currentVal - 1);
        // $('.info__guests-item').eq(3).remove();
      }

      if (+kidsCounter === 1) {
        minusBtn.prop('disabled', true);
      }

      if (currentVal === 1) {
        plusBtn.prop('disabled', false);
      }

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('kids', counterKids.text());
      history.pushState({}, '', newUrl.toString());

      new FilteringData().removeParametersFromUrl(['isCountry', 'isDuration', 'date']);
    });

    plusBtn.on('click', function () {
      let currentVal = +counter.text();
      if (currentVal < 9) {
        counter.text(currentVal + 1);
        kidsCounter.text(currentVal + 1);
        counterKids.text(currentVal + 1);
      }

      if (currentVal + 1 === 9) {
        plusBtn.prop('disabled', true);
      }

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('kids', counterKids.text());
      history.pushState({}, '', newUrl.toString());

      new FilteringData().removeParametersFromUrl(['isCountry', 'isDuration', 'date']);
    });

    function createYearsHtml(numKids: number) {
      let yearsHtml = '';
      for (let i = 0; i < numKids; i++) {
        yearsHtml += `
            <li class="info__guests-item info__guests-item_sub">
                <p class="info__guests-item-current">Ребёнок</p>
                <ul class="info__guests-sublist">
                    <li class="info__guests-item-years"><span>&lt;</span>1 года</li>
                    <li class="info__guests-item-years">1 год</li>
                    <li class="info__guests-item-years">2 года</li>
                    <li class="info__guests-item-years">3 года</li>
                    <li class="info__guests-item-years">4 года</li>
                    <li class="info__guests-item-years">5 лет</li>
                    <li class="info__guests-item-years">6 лет</li>
                    <li class="info__guests-item-years">7 лет</li>
                    <li class="info__guests-item-years">8 лет</li>
                    <li class="info__guests-item-years">9 лет</li>
                    <li class="info__guests-item-years">10 лет</li>
                    <li class="info__guests-item-years">11 лет</li>
                    <li class="info__guests-item-years">12 лет</li>
                    <li class="info__guests-item-years">13 лет</li>
                    <li class="info__guests-item-years">14 лет</li>
                    <li class="info__guests-item-years">15 лет</li>
                    <li class="info__guests-item-years">16 лет</li>
                    <li class="info__guests-item-years">17 лет</li>
                </ul>
            </li>`;
      }

      $('.info__guests-list li').eq(2).after(yearsHtml);
    }

    createYearsHtml(+kidsCounter.text());

    function updateURL() {
      const selectedYears = $('.info__guests-item-current').text();
      const url = new URL(window.location.href);
      url.searchParams.set('years', selectedYears);
      window.history.replaceState({}, '', url);
    }

    $('.info__guests-list').on('click', '.info__guests-item_sub', function () {
      $(this).find('.info__guests-sublist').toggleClass('info__guests-sublist_show');
    });

    $('.info__guests-list').on('click', '.info__guests-item-years', function () {
      const selectedYear = $(this).text();
      $(this).parent().prev().text(selectedYear);
      $(this).find('.info__guests-sublist').removeClass('info__guests-sublist_show');
      updateURL();
    });
  }


  closeDropDown(): void {
    $('.info__guests-add').on('click', () => {
      $('.dropdown__list').removeClass('dropdown__list_show');
    });
  }

  haldelsClik() {
    this.searchPanelBtn.on('click', async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const allParams = Array.from(urlParams.keys());
      const saveKids = urlParams.get('kids');
      const saveCountry = urlParams.get('isCountry') ?? '';
      const saveDuration = urlParams.get('isDuration') ?? '';
      const date = this.dateCurrent.text().trim();
      console.log(allParams);
      if (allParams.includes('isCountry')) {
        new FilteringData().getHotelsByFilter('isCountry', +saveCountry);
        allParams.shift();
      }

      if (allParams.includes('isDuration')) {
        new FilteringData().getHotelsByFilter('isDuration', +saveDuration);

        allParams.shift();
      }

      if (allParams.includes('date')) {
        new FilteringData().getHotelsByFilter('date', date);
        allParams.shift();
      }

      if (this.url.pathname === '/hot_offers.html') {
        const hotels = await new FilteringData().getHotelsByFilter('hotTour', true);
        if (hotels.length > 0) {
          const filteredHotels = hotels.filter((hotel) => hotel.isCountry === +saveCountry);
          if (filteredHotels.length > 0) {
            new RenderHotTour().renderTable(filteredHotels);
          } else {
            new RenderHotTour().renderTable(filteredHotels);
          }
        } else {
          console.log('Немає готелів з hotTour = true');
        }
      }

      if (allParams.includes('kids')) {
        if (saveKids === '0') {
          new FilteringData().getHotelsByFilter('isKids', false);
        } else {
          new FilteringData().getHotelsByFilter('isKids', true);
        }
        // new FilteringData().removeParametersFromUrl(['isCountry', 'isDuration', 'date']);
        allParams.shift();
      }
    });
  }
}
