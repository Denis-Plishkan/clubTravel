import { InfoBlock } from "../code/hotel/info-block";
import { PullData } from "../code/hotel/pull-data";
import { Order } from "../code/hotel/order";

document.addEventListener("DOMContentLoaded", () => {
  new InfoBlock();
  new PullData();
  new Order();
});


