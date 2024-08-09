import $ from 'jquery';
import {rating, meals, regions, departure, star, country, duration} from './obgFile';



export class AdvancedSearch {
  filterRow: JQuery<HTMLElement>;
  destinationCurrent: JQuery<HTMLElement>;
  dateCurrent: JQuery<HTMLElement>;
  durationCurrent: JQuery<HTMLElement>;

  constructor() {
    this.filterRow = $('.category__filter-row');
    this.destinationCurrent = $('.info__destination-current');
    this.dateCurrent = $('.info__date-current');
    this.durationCurrent = $('.info__duration-current');
    this.init();
  }

  init() {
    this.accordion();
    this.activeFilter();
    this.addActiveClassForStar();
    this.addActiveClassForMeals();
    this.addActiveClassForTour();
    this.addActiveClassForDeparture();
    this.addTextForCurrents();
  }

  accordion() {
    $('.search__btn').on('click', function () {
      $('.search__btn').addClass('search__btn_act');
      $('.search__row-bottom').addClass('search__row-bottom_active');

      $('.search__btn-close').removeClass('search__btn-close_act');
      $('.search__line').removeClass('search__line_act');
    });

    $('.search__btn-close').on('click', function () {
      $('.search__row-bottom').removeClass('search__row-bottom_active');
      $('.search__btn-close').addClass('search__btn-close_act');
      $('.search__line').addClass('search__line_act');
    });
  }

  activeFilter() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((value, key) => {
      switch (key) {
        case 'isStar':
          this.rating(value);
          break;
        case 'isMeals':
          this.meals(value);
          break;
        case 'isTour':
          this.tours(value);
          break;
        case 'isRegion':
          this.region(value);
          break;
        case 'flight':
          this.flight(value);
          break;
        case 'departure':
          this.departure(value);
          break;
      }
    });
  }

  rating(val: string) {
    if (rating[val]) {
      this.filterRow.append(
        `<div class="category__filter-rating">
          <h3 class="category__filter-title">Рейтинг</h3>
          <p class="category__filter-text">${rating[val]}</p>
        </div>`
      );
    }
  }

  meals(val: string) {
    if (meals[val]) {
      this.filterRow.append(
        `<div class="category__filter-meals">
          <h3 class="category__filter-title">Питание</h3>
          <p class="category__filter-text">${meals[val]}</p>
        </div>`
      );
    }
  }

  tours(val: string) {
    if (val === 'true') {
      this.filterRow.append(
        `<div class="category__filter-tour">
          <h3 class="category__filter-title">Состав тура</h3>
          <p class="category__filter-text">Туристический пакет</p>
        </div>`
      );
    }
  }

  flight(val: string) {
    if (val === 'true') {
      this.filterRow.append(
        `<div class="category__filter-tour">
          <h3 class="category__filter-title">Состав тура</h3>
          <p class="category__filter-text">Только перелет</p>
        </div>`
      );
    }
  }

  region(val: string) {
    const filterRow = $('.category__filter-row');

    if (regions[val]) {
      filterRow.append(`
          <div class="category__filter-region">
            <h3 class="category__filter-title">Регион</h3>
            <p class="category__filter-text">${regions[val]}</p>
          </div>
        `);
    }
  }

  departure(val: string) {
    if (departure[val]) {
      this.filterRow.append(
        `<div class="category__filter-flying">
          <h3 class="category__filter-title">Вылет из</h3>
          <p class="category__filter-text">${departure[val]}</p>
        </div>`
      );
    }
  }

  addActiveClassForStar() {
    const urlParams = new URLSearchParams(window.location.search);
    const savedStar = urlParams.get('isStar');



    if (savedStar && star[savedStar]) {
      $(`.category__btns-stars[data-stars="${star[savedStar]}"]`).addClass('category__btns-stars_act');
    }
  }

  addActiveClassForMeals() {
    const urlParams = new URLSearchParams(window.location.search);
    const savedMeals = urlParams.get('isMeals');

    const meals: { [key: string]: string } = {
      '1': 'ao',
      '2': 'bb',
      '3': 'hb',
      '4': 'fb',
      '5': 'ai',
      '6': 'uai',
    };

    if (savedMeals && meals[savedMeals]) {
      $(`.category__btns-meals[data-meals="${meals[savedMeals]}"]`).addClass('category__btns-meals_act');
    }
  }

  addActiveClassForTour() {
    const urlParams = new URLSearchParams(window.location.search);
    const savedTour = urlParams.get('isTour');
    const savedFlight = urlParams.get('flight');

    if (savedTour === 'true') {
      $('.category__btns-tour[data-tour="tour"]').addClass('category__btns-tour_act');
    } else if (savedFlight === 'true') {
      $('.category__btns-tour[data-tour="fly"]').addClass('category__btns-tour_act');
    }
  }

  addActiveClassForDeparture() {
    const urlParams = new URLSearchParams(window.location.search);
    const savedDeparture = urlParams.get('departure');

    const departure: { [key: string]: string } = {
      '1': 'kiev',
      '2': 'lviv',
    };

    if (savedDeparture && departure[savedDeparture]) {
      $(`.category__btns-city[data-city="${departure[savedDeparture]}"]`).addClass('category__btns-city_act');
    }
  }

  addTextForCurrents() {
    const urlParams = new URLSearchParams(window.location.search);
    const savedDestination = urlParams.get('isCountry');
    const savedDuration = urlParams.get('isDuration');
    const savedDate = urlParams.get('date');
    const savedAdults = urlParams.get('adults');
    const savedKids = urlParams.get('kids');
    const savedYears = urlParams.get('years');
    const yearsArr = savedYears ? savedYears.match(/\d+ \D+/g) : [];



    if (savedDuration && duration[savedDuration]) {
      this.durationCurrent.text(duration[savedDuration]);
    } else if (this.durationCurrent.text() === '') {
      this.durationCurrent.text('Длительность');
    }

    if (savedDestination && country[savedDestination]) {
      this.destinationCurrent.text(country[savedDestination]);
    } else if (this.destinationCurrent.text() === '') {
      this.destinationCurrent.text('Направление');
    }

    if (savedDate) {
      this.dateCurrent.text(savedDate);
      console.log(savedDate);
    } else if (this.dateCurrent.text() === '') {
      this.dateCurrent.text('Дата');
    }

    if (savedAdults || savedKids) {
      $('.info__guests-counter').text(savedAdults !== null ? savedAdults : '');
      $('.info__guests-subcounter').text(savedKids !== null ? savedKids : '');
      $('.info__guests-counters_adults').text(savedAdults !== null ? savedAdults : '');
      $('.info__guests-counters_kids').text(savedKids !== null ? savedKids : '');
    } else {
      $('.info__guests-counters_adults').text('0');
      $('.info__guests-counters_kids').text('0');
    }

    $(document).ready(function () {
      if (yearsArr) {
        $.each(yearsArr, function (index, item) {
          $('.info__guests-item-current').eq(index).text(item);
        });
      }
    });
  }

  showAdvancedInfoHotTour() {
    const tableBtn = document.querySelectorAll('.table__btn');
    const subThead = document.querySelector('.table__row');
    tableBtn.forEach(function (btn) {
      btn.addEventListener('click', () => {
        btn.classList.toggle('table__btn_act');
        subThead?.classList.toggle('table__row_show');
      });
    });
  }
}
