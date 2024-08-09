import { Tours } from '../../type';
import { app } from "../../modules/firebase";
import { getFirestore, collection, getDocs, query, where, Firestore } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

const summerTourWrapper = document.querySelector(
  ".summer-tour__swiper-wrapper",
);

export class SummerTourProduct {
  app: FirebaseApp;
  db: Firestore;
  productsArray: Tours[];

  constructor() {
    this.app = app;
    this.db = getFirestore(this.app);
    this.productsArray = [];
  }

  async loadCards() {
    const filterSummerTours = query(
      collection(this.db, "hotels"),
      where("isSummerTour", "==", true),
    );

    const querySnapshot = await getDocs(filterSummerTours);
    querySnapshot.forEach((doc) => {
      const product = doc.data() as Tours;
      product.id = doc.id;

      this.productsArray.push(product);
    });

    this.renderProducts();
  }

  renderProducts() {
    this.productsArray.forEach((product) => {
      const { country, img, price, id } = product;

      if (img && Array.isArray(img) && img.length > 0) {
        const { url, urlWebp } = img[0];

        let template = `
      <div class="swiper-slide summer-tour__swiper-slide">
        <div class="summer-tour__card">
        <div class="summer-tour__card-img">
          <picture class="hero__bg-img">
            <source srcset=${urlWebp} type="image/webp" />
            <img src=${url} alt="bg" />
          </picture>
        </div>
        <div class="summer-tour__card-text-wrapper">
            <div class="summer-tour__card-place-wrapper">
                <svg>
                    <use xlink:href="#map-marker"></use>
                </svg>
                <p class="summer-tour__card-place">${country}</p>
            </div>  
            <p class="summer-tour__card-price-new">от <span>${price[0]}€</span>/чел</p>
            
        </div>
        <a href="https://club-travel.netlify.app/hotel.html?id=${id}" class="summer-tour__btn btn">Выбрать тур</a>
        `;

        if (summerTourWrapper) {
          summerTourWrapper.insertAdjacentHTML("beforeend", template);
        }
      }
    });

    this.getYearsSeason();
  }

  getYearsSeason() {
    const text = document.querySelector('.summer-tour__text');
    if (text) {
      const year = +this.productsArray[0].date.slice(6);
      text.textContent += `Лето ${year - 1} - ${year}`;
    }
  }
}
