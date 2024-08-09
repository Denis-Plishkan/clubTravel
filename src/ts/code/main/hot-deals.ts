import { Tours } from '../../type';
import { getFirestore, collection, getDocs, query, where, Firestore } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import { app } from '../../modules/firebase';

const hotDealsWrapper = document.querySelector('.hot-deals__swiper-wrapper');

export class HotDealsProduct {
  app: FirebaseApp;
  db: Firestore;
  productsArray: Tours[];

  constructor() {
    this.app = app;
    this.db = getFirestore(this.app);
    this.productsArray = [];
  }

  async loadCards() {
    const filterHotDeals = query(collection(this.db, 'hotels'), where('hotTour', '==', true));

    const querySnapshot = await getDocs(filterHotDeals);
    querySnapshot.forEach((doc) => {
      const product = doc.data() as Tours;

      this.productsArray.push(product);
    });

    this.renderProducts();
  }

  renderProducts() {
    this.productsArray.forEach((product) => {
      const { name, price, country, region, star, img, date } = product;

      if (img && Array.isArray(img) && img.length > 0) {
        const { url, urlWebp } = img[0];

        let template = `
      <div class="swiper-slide hot-deals__swiper-slide">
        <div class="hot-deals__card">
        <div class="hot-deals__card-img">
          <picture class="hero__bg-img">
            <source srcset=${urlWebp} type="image/webp" />
            <img src=${url} alt="bg" />
          </picture>
          <div class="hot-deals__card-data-wrapper hot-deals__card-data-top">
            <svg>
              <use xlink:href="#clock"></use>
            </svg>
            <p class="hot-deals__card-data">${date}</p>
          </div>
          <div class="hot-deals__card-place-wrapper">
            <svg>
              <use xlink:href="#place"></use>
            </svg>
            <p class="hot-deals__card-place">${country}, ${region}</p>
          </div>
        </div>
        <div class="hot-deals__card-wrappers">
        <div class="hot-deals__card-text-wrapper">
            <p class="hot-deals__card-text">${name}</p>
            <div class="hot-deals__card-stars-wrapper">
            `;
        for (let i = 0; i < star; i++) {
          template += `
              <svg>
                <use xlink:href="#star"></use>
              </svg>
              `;
        }

        template += `
            </div>
          </div>
          <div class="hot-deals__card-prices-wrapper">
            <div class="hot-deals__card-price-wrapper">
              <p class="hot-deals__card-price-new"><span>${price[1]}€</span>/чел</p>
              <p class="hot-deals__card-price-old">${price[0]} €/чел</p>
            </div>
            `;
        if (price) {
          template += `
                  <div class="hot-deals__card-line">
                  <svg>
                    <use xlink:href="#company-line"></use>
                  </svg>
                  <div class="hot-deals__card-line-wrapper">
                    <p class="hot-deals__card-line-price">-${(((price[0] - price[1]) / price[0]) * 100).toFixed(0)}%</p>
                  </div>
                </div>
                </div>
                </div>
              </div>
            </div>
                  `;
        }

        if (hotDealsWrapper) {
          hotDealsWrapper.insertAdjacentHTML('beforeend', template);
        }
      }
    });
  }
}
