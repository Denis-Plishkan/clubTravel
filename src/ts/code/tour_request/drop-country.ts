import $ from "jquery";
export class DropCountry {
  dropDown: JQuery<HTMLElement>;
  dropMain: JQuery<HTMLElement>;
  btn: JQuery<HTMLElement>;
  allAccordions: JQuery<HTMLElement>;
  countryMainDrop: JQuery<HTMLElement>;
  tourMainDrop: JQuery<HTMLElement>;

  constructor() {
    this.dropDown = $(".drop-country");
    this.dropMain = $(".drop-country__accordions");
    this.btn = $(".drop-country__btn");
    this.allAccordions = $(".accordion");
    this.countryMainDrop = $(".drop-country__county");
    this.tourMainDrop = $(".drop-country__tour");
    this.init();
  }
  init() {
    this.open();
    this.observer();
    this.accordion();
  }

  checkTour(): boolean {
    const info = this.countryMainDrop.html();
    if (info === "Страна") {
      console.log(1);
      return false;
    } else {
      console.log(2);
      return true;
    }
  }

  open() {
    this.btn.on("click", () => {
      this.dropDown.toggleClass("drop-country_active");
    });
    const context = this;

    $(document).on("click", function (e: JQuery.ClickEvent) {
      if (context.dropDown.has(e.target).length == 0) {
        context.dropDown.removeClass("drop-country_active");
      }
    });
  }
  
  observer(): void {
    const mainDropHeight: number = Number(this.dropMain.height());
    const context = this;

    $(document).ready(function () {
      const options = {
        root: null,
        rootMargin: `0px 0px -${mainDropHeight + 30}px 0px`,
        threshold: 1,
      };
      function callback(entries: IntersectionObserverEntry[]): void {
        entries.forEach((entry) => {
          const windowHeight: number = Number($(window).height());
          const distanceTop: number = Number(entry.boundingClientRect.top);

          if (windowHeight > 700 && distanceTop > 0) {
            if (entry.isIntersecting) {
              context.dropDown.addClass("drop-country_bottom");
              context.dropDown.removeClass("drop-country_top");
            } else {
              context.dropDown.addClass("drop-country_top");
              context.dropDown.removeClass("drop-country_bottom");
            }
          }
        });
      }

      const items = $(".drop-country__btn");

      const observer = new IntersectionObserver(callback, options);

      items.each(function (_index, item) {
        observer.observe(item);
      });
    });
  }
  accordion() {
    const context = this;

    this.allAccordions.each((_index, item) => {
      open(item);
      select(item);
    });

    function select(accordion: HTMLElement) {
      const li = accordion.querySelectorAll("li");
      const city = String(
        accordion.querySelector(".accordion__country")?.textContent,
      );

      li.forEach((item) => {
        item.addEventListener("click", () => {
          context.countryMainDrop.html(city);
          context.tourMainDrop.html(String(item.textContent));
          context.dropDown.removeClass("drop-country_active");
          
          document.dispatchEvent(new Event('selectTour'));
        });
      });
    }

    function open(accordion: HTMLElement) {
      document.addEventListener("click", (e) => {
        if (!accordion.contains(e.target as Node)) {
          accordion.classList.remove("accordion_active");
        } else {
          accordion.classList.toggle("accordion_active");
        }
      });
    }
  }
}
