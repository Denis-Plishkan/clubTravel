import $ from "jquery";
import { DropDown } from "../../components/dropdown";

export class InfoBlock {
  totalPrice: JQuery<HTMLElement>;
  dropDown: DropDown;
  constructor() {
    this.totalPrice = $(".tour__total-price");
    this.dropDown = new DropDown(".tour__quantity-drop", ".tour__quantity-tegs");
    this.priceCalculator();
    this.selecTour()
  }

  selecTour(){
    $(".tour__setected-select").on("click", () => {
      window.history.back()
    })
  }

  priceCalculator() {
    document.addEventListener("myCustomEvent", () => {
      const priceOnePerson = $(".tour__price-sum").data("price");
      const allPeople = this.dropDown.getKids() + this.dropDown.getAdults();
      const total = String(+priceOnePerson * allPeople);
      let sum = "";
      if (total.length > 3) {
        let count = 0;
        for (let i = total.length - 1; i >= 0; i--) {
          count++;
          sum += total[i];
          if (count === 3) {
            sum += " ";
          }
        }
        sum = sum.split("").reverse().join("");
      } else {
        sum = total;
      }
      this.totalPrice.html(sum);
    });
  }
}
