import { Tours } from "../../type";
import { getFirestore, collection, getDocs, Firestore } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
import { app } from "../../modules/firebase";

const companyWrapper = document.querySelector(".company-company__wrapper");

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
      product.id = doc.id;
      
      this.productsArray.push(product);
    });

    this.renderProducts();
  }

  renderProducts() {
    this.productsArray.forEach((product) => {
    const { name, price, img, date, id } = product;

      if (img && Array.isArray(img) && img.length > 0) {
        const { url, urlWebp } = img[0];

        let template = `
        <div class="company-company__card" data-id="${id}">
        <div class="company-company__card-img">
          <picture class="hero__bg-img">
            <source srcset=${urlWebp} type="image/webp" />
            <img src=${url} alt="bg" />
          </picture>
          `;

        if (price[1]) {
          template += `
            <div class="company-company__card-line">
            <svg>
              <use xlink:href="#company-line"></use>
            </svg>
            <div class="company-company__card-line-wrapper">
              <p class="company-company__card-line-price">от ${price[1]}€</p>
            </div>
          </div>
            `;
        }

        template += `
          <div class="company-company__card-data-wrapper">
            <svg>
              <use xlink:href="#clock"></use>
            </svg>
            <p class="company-company__card-data">${date}</p>
          </div>
        </div>
        <p class="company-company__card-text">${name}</p>
      </div>
        `;

        if (companyWrapper) {
          companyWrapper.insertAdjacentHTML("beforeend", template);
        }
      }
    });
    this.getTourId();
  }

  getTourId() {
    const cards = document.querySelectorAll('.company-company__card');
    cards.forEach((card) => {
      const divElement = card as HTMLDivElement;
      if (divElement.dataset.id) {
        divElement.addEventListener('click', () => {
          const id = divElement.dataset.id;
          window.location.href = `https://club-travel.netlify.app/hotel.html?id=${id}`;
        });
      }
    });
  }
}
