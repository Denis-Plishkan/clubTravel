import { Header } from "../components/header";
import { DropCountry } from "../code/tour_request/drop-country";
import { Calendar } from "../code/tour_request/calendar";
import { Food } from "../code/tour_request/food";
import { TourRequest } from "../code/tour_request/main";

document.addEventListener("DOMContentLoaded", () => {
  new Food();
  new DropCountry();
  new Calendar();
  new TourRequest();
  new Header();
});
