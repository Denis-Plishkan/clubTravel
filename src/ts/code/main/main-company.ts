import { Tours } from '../../type';
import { app } from "../../modules/firebase";
import { getFirestore, collection, getDocs, Firestore } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

const companyWrapper = document.querySelector(".main-company__swiper-wrapper");

export class CompanyProduct {
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

      this.productsArray.push(product);
    });

    this.renderProducts();
  }

  renderProducts() {
    this.productsArray.forEach((product) => {
      const { name, price, img, date } = product;

      if (img && Array.isArray(img) && img.length > 0) {
        const { url, urlWebp } = img[0];

        let template = `
      <div class="swiper-slide main-company__swiper-slide">
        <div class="main-company__card">
        <div class="main-company__card-img">
          <picture class="hero__bg-img">
            <source srcset=${urlWebp} type="image/webp" />
            <img src=${url} alt="bg" />
          </picture>
          `;

        if (price[1]) {
          template += `
            <div class="main-company__card-line">
            <svg>
              <use xlink:href="#company-line"></use>
            </svg>
            <div class="main-company__card-line-wrapper">
              <p class="main-company__card-line-price">от ${price[1]}€</p>
            </div>
          </div>
            `;
        }

        template += `
          <div class="main-company__card-data-wrapper">
            <svg>
              <use xlink:href="#clock"></use>
            </svg>
            <p class="main-company__card-data">${date}</p>
          </div>
        </div>
        <p class="main-company__card-text">${name}</p>
      </div>
      </div>
        `;

        if (companyWrapper) {
          companyWrapper.insertAdjacentHTML("beforeend", template);
        }
      }
    });
  }
}
