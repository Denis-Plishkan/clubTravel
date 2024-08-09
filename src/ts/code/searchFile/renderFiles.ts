import $ from 'jquery';
import { DropdownSearch } from './dropSearch';
import { Calendar } from './priceCalendar';
import { CalendarSwiper } from '../swiper';
import { Hotel } from './type';
import { FilterRegion } from './filterRegion';
import { AdvancedSearch } from './advanced';

export class RenderHotels {
  constructor() {}

  renderHotels(info: Hotel[]) {
    if (info.length > 0) {
      $('.result__content').html('');

      const hotelsHtml = info
        .map((item) => {
          const starsCount = item.star;
          const starsHTML = Array(starsCount).fill('<svg><use xlink:href="#star"></use></svg>').join('');
          const hotelId = item.id;
          const imagesHtml = item.img
            .map(
              (img) => `
                  <div class="swiper-slide result__slide">
                      <picture>
                          <source srcset="${img.urlWebp}" type="image/webp"/>
                          <img src="${img.url}" alt="photo"/>
                      </picture>
                  </div>`
            )
            .join('');

          const roomsHtml = Array.isArray(item.room)
            ? item.room
                .map(
                  (room) => `
                    <tr class="table__tr">
                        <td class="table__td">${item.date}</td>
                        <td class="table__td">${item.duration}</td>
                        <td class="table__td">${item.meals}</td>
                        <td class="table__td">${room}</td>
                        <td class="table__td">${item.price[0]}€<span>/чел</span></td>
                        <td class="table__td"><button class="table__link">выбрать</button></td>
                    </tr>
                    <tr class="table__sub-tbody">
                        <td class="table__sub-td" colspan="6"> <hr class="table__line"></td>
                    </tr>`
                )
                .join('')
            : '';

          return `
                  <div class="result__hotel">
                      <div class="result__slider">
                          <div class="swiper result__swiper">
                              <div class="swiper-wrapper result__wrapper">
                                  ${imagesHtml}
                              </div>
                              <div class="swiper-button-next result__btn-next">
                                  <svg><use xlink:href="#chevron-left"></use></svg>
                              </div>
                              <div class="swiper-button-prev result__btn-prev">
                                  <svg><use xlink:href="#chevron-left"></use></svg>
                              </div>
                          </div>
                      </div>
                      <div class="result__row">
                          <div class="result__info">
                              <div class="result__info-item">
                                  <h4 class="result__info-title">${item.name}</h4>
                                  <div class="result__info-location">
                                      <svg><use xlink:href="#point"></use></svg>
                                      <p class="result__info-country">${item.country},</p>
                                      <p class="result__info-region">${item.region}</p>
                                  </div>
                                  <p class="result__info-descript">${item.description[0].main}</p>
                              </div>
                              <div class="result__info-subitem">
                                  <a class="result__info-link" href="hotel.html?id=${hotelId}">
                                      Подробнее об отеле
                                      <svg><use xlink:href="#arrow-right"></use></svg>
                                  </a>
                              </div>
                          </div>

                          <div class="result__rating">
                            <div class="result__rating-item">
                              <div class="result__rating-star">${starsHTML}</div>
                                <div class="result__rating-subitem">
                                  <p class="result__rating-duration">
                                    <svg><use xlink:href="#clock"></use></svg>
                                    ${item.duration} ${new RenderHotTour().getNightForm(item.duration)}
                                  </p>
                        
                                  <p class="result__rating-meal">
                                      <svg><use xlink:href="#food"></use></svg>
                                      ${item.meals}
                                  </p>
                        
                                  <p class="result__rating-room">
                                      <svg><use xlink:href="#house"></use></svg>
                                      ${item.room[0]}
                                  </p>
                        
                                  <p class="result__rating-beach">
                                      <svg><use xlink:href="#sun"></use></svg>
                                      ${item.beach}
                                  </p>
                                </div>
                              </div>
                            <div class="result__price">
                                <p class="result__price-num">
                                    <span>${item.room.length}</span> предложения от
                                    <span>${item.price[0]}€</span><span>/чел</span>
                                </p>
                                <button class="result__price-btn">Открыть</button>
                            </div>
                        </div>


                      </div>

                  </div>

                  <table class="result__table table table_act">
                  <thead class="table__thead">
                      <tr class="table__tr">
                          <th class="table__th">Дата</th>
                          <th class="table__th">Период</th>
                          <th class="table__th">Питание</th>
                          <th class="table__th">Тип номера</th>
                          <th class="table__th">Стоимость</th>
                      </tr>
                  </thead>
                  <tbody class="table__tbody">
                      ${roomsHtml}
                  </tbody>
              </table>
                `;
        })
        .join('');

      $('.result__content').append(hotelsHtml);

      $('.result__price-btn').each(function () {
        $(this).on('click', function () {
          // $(this).closest('.result__content').find('.table').toggleClass('table_act');
        });
      });
    }
  }
}

export class RenderRegions {
  constructor() {}

  renderRegions(region: Hotel[]): void {
    $('.category__regions-item').html('');
    region.forEach((item) => {
      const regionHtml = `
        <button data-region="${item.region}" class="category__btns category__btns-regions">
          <svg>
            <use xlink:href="#check-circle"></use>
          </svg>
          ${item.region}
        </button>`;
      $('.category__regions-item').append(regionHtml);
    });

    new FilterRegion().selectRegion();

    if ($('.category__regions-item').children().length > 5) {
      $('.category__regions-item').removeClass('category__regions-item_change');
    } else {
      $('.category__regions-item').addClass('category__regions-item_change');
    }
  }
}

export class RenderInfo {
  constructor() {}

  renderInfo(item: Hotel[]): void {
    $('.result__header').html('');
    $('.result__calendar').html('');
    const hotels = item.length;
    const offers = item.reduce((acc, item) => acc + item.room.length, 0);
    const infoHtml = `
    <h3 class="result__header-title">
      Найдено <span class="result__header-offers">${offers}</span> предложения в
      <span class="result__header-hotel">${hotels}</span>
      отелях
    </h3>
    
    <div class="result__header-item">
    <div class="result__header-calendar">
      <button class="result__header-btn">
        <svg>
          <use xlink:href="#calendarOne"></use>
        </svg>
        Цены на календаре
      </button>
    </div>

    <div class="result__header-sort">
      <p class="result__header-text">Сортировать:</p>
      <div class="result__header-subitem">
        <div class="result__header-select dropdown">
          <div class="result__header-row dropdown__row">
            <p class="result__header-current dropdown__current">Цена</p>
            <svg class="result__header-icon dropdown__icon">
              <use xlink:href="#chevron-left"></use>
            </svg>
          </div>
          <ul class="result__header-list dropdown__list">
            <li class="dropdown__item">От дешевых к дорогим</li>
            <li class="dropdown__item">От дорогих к дешевым</li>
          </ul>
        </div>

        <div class="result__header-subselect dropdown">
          <div class="result__header-subrow  dropdown__row">
            <p class="result__header-subcurrent result__header-current-rating dropdown__current">Рейтинг</p>
            <svg class="result__header-subicon dropdown__icon">
              <use xlink:href="#chevron-left"></use>
            </svg>
          </div>
          <ul class="result__header-sublist dropdown__list">
            <li class="dropdown__item">Возрастающий</li>
            <li class="dropdown__item">Убывающий</li>
          </ul>
        </div>

      </div>
    </div>
  </div>

    `;

    const calendarHtml = `
    <div class="result__header-slider">
    <div class="result__header-swiper swiper">
      <div class="result__header-wrapper swiper-wrapper">
        <div class="result__header-slide swiper-slide"></div>
        <div class="result__header-slide swiper-slide"></div>
        <div class="result__header-slide swiper-slide"></div>
        <div class="result__header-slide swiper-slide"></div>
        <div class="result__header-slide swiper-slide"></div>
        <div class="result__header-slide swiper-slide"></div>
        <div class="result__header-slide swiper-slide"></div>
        <div class="result__header-slide swiper-slide"></div>
        <div class="result__header-slide swiper-slide"></div>
        <div class="result__header-slide swiper-slide"></div>
        <div class="result__header-slide swiper-slide"></div>
        <div class="result__header-slide swiper-slide"></div>
      </div>

      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
    `;

    $('.result__header').append(infoHtml);
    $('.result__calendar').append(calendarHtml);

    new DropdownSearch('.result__header-select');
    new DropdownSearch('.result__header-subselect');
    new Calendar().initCalendar();
    new CalendarSwiper().swiperCalendar();

    $('.result__header-btn').on('click', function () {
      $('.result__calendar').toggleClass('result__calendar_show');
      $('.result__header-btn').toggleClass('result__header-btn_act');
      $('.result__header-sort').toggleClass('result__header-sort_hide');
    });

    $('.result__header-list li').on('click', (event) => {
      const index = $(event.currentTarget).index();

      if (index === 0) {
        const sortedHotels = item.sort((a, b) => a.price[0] - b.price[0]);
        new RenderHotels().renderHotels(sortedHotels);
      } else {
        const sortedHotels = item.sort((a, b) => b.price[0] - a.price[0]);
        new RenderHotels().renderHotels(sortedHotels);
      }
    });

    $('.result__header-sublist li').on('click', (event) => {
      const index = $(event.currentTarget).index();
      if (index === 0) {
        const sortedHotels = item.sort((a, b) => +a.star - +b.star);
        new RenderHotels().renderHotels(sortedHotels);
      } else {
        const sortedHotels = item.sort((a, b) => +b.star - +a.star);
        new RenderHotels().renderHotels(sortedHotels);
      }
    });
  }
}

export class RenderHotTour {
  constructor() {}

  getNightForm(duration: number | string) {
    if (duration === 1) {
      return 'ночь';
    } else if (duration === 3 || duration === 7 || duration === 10 || duration === 14 || duration === 21) {
      return 'ночей';
    } else {
      return 'ночі';
    }
  }

  renderTable(info: Hotel[]) {
    if (info.length > 0) {
      $('.table').html('');

      const tableHeadHtml = `
        <div class="table__thead">
          <div class="table__tr">
            <p class="table__th">Дата</p>
            <p class="table__th">Откуда</p>
            <p class="table__th">Куда</p>
            <p class="table__th">Длительность</p>
            <p class="table__th">Цена</p>
            <p class="table__th"></p>
          </div>
        </div>`;

      const tableInfoHead = `
        <div class="table__row">
          <div class="table__row-thead">
            <div class="table__tr">
              <p class="table__th">Отель</p>
              <p class="table__th">Категория</p>
              <p class="table__th">Питание</p>
              <p class="table__th">Состав тура</p>
              <p class="table__th">Цена</p>
              <p class="table__th"></p>
            </div>
          </div>
        </div>`;

      let tableRow = '';
      info.forEach((item) => {
        tableRow = `
          <div class="table__tbody table__tbody_add">
            <div class="table__tr">
              <p class="table__td">${item.date}</p>
              <p class="table__td">${item.departureIn}</p>
              <p class="table__td">${item.country}</p>
              <p class="table__td">${item.duration} ${this.getNightForm(item.duration)}</p>
              <p class="table__td">от <span>${item.price[0]}€</span>/чел</p>
              <p class="table__td"><button class="table__btn">Открыть</button></p>
            </div>
          </div>`;
      });

      let hotelRow = '';
      info.forEach((item) => {
        const starsCount = item.star;
        const starSvg = '<svg><use xlink:href="#star"></use></svg>';
        const starsHTML = Array(starsCount).fill(starSvg).join('');
        hotelRow = `
          <div class="table__tbody">
            <div class="table__tr">
              <p class="table__td table__td_name">${item.name}</p>
              <p class="table__td table__td_star">${starsHTML}</p>
              <p class="table__td table__td_meals">${item.meals}</p>
              <p class="table__td">${item.touristPackage}</p>
              <p class="table__td">от <span>${item.price[0]}€</span>/чел</p>
              <p class="table__td"><button class="table__subbtn">выбрать</button></p>
            </div>
          </div>`;
      });

      const render = tableHeadHtml + tableRow;

      $('.table').append(render);
      $('.table').append(tableInfoHead);
      $('.table__row').append(hotelRow);
      new AdvancedSearch().showAdvancedInfoHotTour();
    } else {
      $('.table').html('');
      $('.table').append('<h2 class="table__title">По вашему запросу ничего не найдено</h2>');
    }
  }
}
