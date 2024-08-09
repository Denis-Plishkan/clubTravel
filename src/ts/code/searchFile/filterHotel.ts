import $ from 'jquery';
import { FilteringData } from './filteringData';
import { SelectedFilter } from './filterAdvanced';
import noUiSlider, { target } from 'nouislider';

import 'nouislider/dist/nouislider.css';

export class Hotels {
  urlParams: URLSearchParams;

  constructor() {
    this.urlParams = new URLSearchParams(window.location.search);
    this.initial();
  }

  initial(): void {
    this.selectingMeals();
    this.selectingStars();
    this.priceSlider();
    this.selectiongTourAndFlight();
    this.selectingDeparture();
  }

  selectingMeals(): void {
    $('.category__btns-meals').on('click', function() {
      const meals = $(this).index();
      $('.category__btns-meals').removeClass('category__btns-meals_act');
      $(this).toggleClass('category__btns-meals_act');
  
      new SelectedFilter().selectedFilter('isMeals', meals);
    });
  }

  

  selectingStars() {
    $('.category__btns-stars').on('click', (event) => {
      const star = $(event.currentTarget).index() + 1;

      new SelectedFilter().selectedFilter('isStar', star);
    });
  }

  priceSlider(): void {
    const savedPriceMin = this.urlParams.get('priceMin');
    const savedPriceMax = this.urlParams.get('priceMax');
    const startMin = savedPriceMin ? parseInt(savedPriceMin) : 300;
    const startMax = savedPriceMax ? parseInt(savedPriceMax) : 4300;
    const slider = document.querySelector('.category__slider') as target;

    noUiSlider.create(slider, {
      range: {
        'min': 300,
        'max': 6000,
      },
      start: [startMin, startMax],
      connect: true,
      tooltips: true,
      format: {
        to: function (value) {
          return Math.round(+value) + '€';
        },
        from: function (value) {
          return Math.round(+value);
        },
      },
      step: 200,
    });

    slider.noUiSlider?.on('change', function (values: (string | number)[], _handle: number) {
      const priceMin = typeof values[0] === 'string' ? values[0].slice(0, -1) : values[0].toString();

      const priceMax = typeof values[1] === 'string' ? values[1].slice(0, -1) : values[1].toString();

      function filterPrice(priceMin: number, priceMax: number): void {
        new SelectedFilter().selectedFilter('priceMin', priceMin);
        new SelectedFilter().selectedFilter('priceMax', priceMax);
      }

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('priceMin', priceMin);
      newUrl.searchParams.set('priceMax', priceMax);

      window.history.pushState({}, '', newUrl.toString());

      filterPrice(+priceMin, +priceMax);
    });
  }

  selectiongTourAndFlight(): void {
    $('.category__btns-tour').on('click', (event) => {
      const tourName = $(event.currentTarget).data('tour');

      if (tourName === 'tour') {
        new SelectedFilter().selectedFilter('touristPackage', true);
        new FilteringData().removeParametersFromUrl(['flight']);
      } else {
        new SelectedFilter().selectedFilter('flight', true);
        new FilteringData().removeParametersFromUrl(['touristPackage']);
      }
    });
  }

  selectingDeparture() {
    $('.category__btns-city').on('click', (event) => {
      const cityIndex = $(event.currentTarget).index();

      new SelectedFilter().selectedFilter('departure', cityIndex);
    });
  }
}
