import Swiper from "swiper";
import {
  Navigation,
  Pagination,
  Autoplay,
  Scrollbar,
  Thumbs,
} from "swiper/modules";
Swiper.use([Navigation, Pagination, Autoplay, Scrollbar, Thumbs]);

export class HeroSwiper {
  swiper: Swiper;
  constructor() {
    this.swiper = new Swiper(".hero-swiper", {
      slidesPerView: "auto",
      speed: 1100,

      navigation: {
        nextEl: ".hero__swiper-button-next",
        prevEl: ".hero__swiper-button-prev",
      },
    });
  }
}

export class CompanySwiper {
  swiper: Swiper;
  constructor() {
    this.swiper = new Swiper(".main-company__swiper", {
      slidesPerView: "auto",
      speed: 1100,
      spaceBetween: 4,

      breakpoints: {
        375: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
      },

      navigation: {
        nextEl: ".main-company__swiper-button-next",
        prevEl: ".main-company__swiper-button-prev",
      },
    });
  }
}

export class HotDealsSwiper {
  swiper: Swiper;
  constructor() {
    this.swiper = new Swiper(".hot-deals__swiper", {
      slidesPerView: "auto",
      speed: 1100,
      spaceBetween: 4,

      breakpoints: {
        375: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
      },

      navigation: {
        nextEl: ".hot-deals__swiper-button-next",
        prevEl: ".hot-deals__swiper-button-prev",
      },
    });
  }
}

export class WinterTourSwiper {
  swiper: Swiper;
  constructor() {
    this.swiper = new Swiper(".winter-tour__swiper", {
      slidesPerView: "auto",
      speed: 1100,
      spaceBetween: 2,

      breakpoints: {
        375: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },

      navigation: {
        nextEl: ".winter-tour__swiper-button-next",
        prevEl: ".winter-tour__swiper-button-prev",
      },
    });
  }
}

export class SummerTourSwiper {
  swiper: Swiper;
  constructor() {
    this.swiper = new Swiper(".summer-tour__swiper", {
      slidesPerView: "auto",
      speed: 1100,
      spaceBetween: 2,

      breakpoints: {
        375: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },

      navigation: {
        nextEl: ".summer-tour__swiper-button-next",
        prevEl: ".summer-tour__swiper-button-prev",
      },
    });
  }
}

export class HotelSlider {
  swiperOne: Swiper;
  swiperTwo: Swiper;
  constructor() {
    this.swiperTwo = new Swiper(".hotel-swiper-one", {
      loop: true,
      spaceBetween: 7,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,

      breakpoints: {
        768: {
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 16,
        },
      },
    });

    this.swiperOne = new Swiper(".hotel-swiper-two", {
      loop: true,
      spaceBetween: 10,
      thumbs: {
        swiper: this.swiperTwo,
      },
    });
  }
}

export class HotelSecondSlider {
  swiper: Swiper;
  constructor() {
    this.swiper = new Swiper(".similars__slider", {
      loop: true,
      navigation: {
        nextEl: ".similars__btn-two",
        prevEl: ".similars__btn-one",
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },
      spaceBetween: 10,
      slidesPerView: 1,
      freeMode: true,
      breakpoints: {
        576: {
          slidesPerView: 2,
        },
        1024: {
          spaceBetween: 16,
          slidesPerView: 3,
        },
      },
    });
  }
}

export class ResultSwiper {
  constructor() {
    this.swiperResult();
  }
  swiperResult() {
    new Swiper(".result__swiper", {
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: ".result__btn-next",
        prevEl: ".result__btn-prev",
      },
    });
  }
}

export class CalendarSwiper{
  constructor(){
    this.swiperCalendar();
  }

  swiperCalendar(){
    new Swiper(".result__header-swiper", {
      spaceBetween: 44,

      breakpoints:{
        320:{
          slidesPerView: "auto",
        }
      },
      navigation: {
        nextEl: ".calendar__btn-next",
        prevEl: ".calendar__btn-prev",
      },
    });
  }
}
