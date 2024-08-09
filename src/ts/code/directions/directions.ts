import { Tours } from "../../type";
import { getFirestore, collection, getDocs, Firestore } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
import { app } from "../../modules/firebase";

const companyWrapper = document.querySelector(".directions__wrapper");
export class DirectionProduct {
  app: FirebaseApp;
  db: Firestore;
  productsArray: Tours[];

  constructor() {
    this.app = app;
    this.db = getFirestore(this.app);
    this.productsArray = [];
  }

  async loadCards() {
    const querySnapshot = await getDocs(collection(this.db, "hotels"));
    querySnapshot.forEach((doc) => {
      const product = doc.data() as Tours;
      product.id = doc.id;

      this.productsArray.push(product);
    });

    this.renderProducts();
  }

  renderProducts() {
    this.productsArray.forEach((product) => {
      const { img, country, region, price, work, id } = product;

      if (img && Array.isArray(img) && img.length > 0) {
        const { url, urlWebp } = img[0];

        let template = `
        <div class="directions__card">
        <div class="directions__card-img">
          <picture class="hero__bg-img">
            <source srcset=${urlWebp} type="image/webp" />
            <img src=${url} alt="bg" />
          </picture>
        </div>
        <div class="directions__card-place-wrapper">
            <div class="directions__card-place">
            `;

        if (region.length < 8) {
          template += `
                    <p class="directions__card-place-town">${region}</p>
                `;
        } else {
          template += `
                    <p class="directions__card-place-town">${region.slice(0, 8) + "..."}</p>
                `;
        }

        template += `
                <p class="directions__card-place-country">${country}</p>
            </div>
            <div class="directions__card-price">
                <p class="directions__card-price-person">от <span>${price[0]}€</span>/чел</p>
                <p class="directions__card-price-offer">214 предложения</p>
            </div>
        </div>
        <div class="directions__card-season-wrapper">
            <div class="directions__card-season">
                <p class="directions__card-season-start-end">${work[0]}</p>
                <p class="directions__card-season-start-end">${work[1]}</p>
            </div>
            <svg>
              <use xlink:href="#calendar-directions"></use>
            </svg>
        </div>
        <a href="https://club-travel.netlify.app/hotel.html?id=${id}" class="directions__btn btn">Выбрать тур</a>
      </div>
        `;

        if (companyWrapper) {
          companyWrapper.insertAdjacentHTML("beforeend", template);
        }
      }
    });
  }
}
