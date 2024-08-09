import $ from "jquery";

export class Food {
  food: JQuery<HTMLElement>;
  foodMain: JQuery<HTMLElement>;
  btn: JQuery<HTMLElement>;
  allLi: JQuery<HTMLElement>;
  currentSelect: JQuery<HTMLElement>;
  errorFood: JQuery<HTMLElement>;

  constructor() {
    this.food = $(".food");
    this.foodMain = $(".food__list");
    this.btn = $(".food__btn");
    this.allLi = this.food.find("li");
    this.currentSelect = $(".food__btn-info");
    this.errorFood = $(".form__error-food");
    this.init();
  }
  init() {
    this.open();
    this.observer();
    this.select();
  }

  select() {
    this.allLi.each((_index, item) => {
      item.addEventListener("click", () => {
        this.currentSelect.html(String(item.textContent));
        this.errorFood.removeClass("form__error-food_active");
        document.dispatchEvent(new Event('selectFood'));
      });
    });
  }

  open(): void {
    this.food.on("click", () => {
      this.food.toggleClass("food_active");
    });
    const context = this;

    $(document).on("click", function (e: JQuery.ClickEvent) {
      if (context.food.has(e.target).length == 0) {
        context.food.removeClass("food_active");
      }
    });
  }
  observer(): void {
    const mainDropHeight: number = Number(this.foodMain.height());
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
              context.food.addClass("food_bottom");
              context.food.removeClass("food_top");
            } else {
              context.food.addClass("food_top");
              context.food.removeClass("food_bottom");
            }
          }
        });
      }

      const items = $(".food__btn");

      const observer = new IntersectionObserver(callback, options);

      items.each(function (_index, item) {
        observer.observe(item);
      });
    });
  }
}
