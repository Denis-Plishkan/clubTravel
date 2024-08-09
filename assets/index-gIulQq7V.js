import{a as n,H as S}from"./header--MTLiN39.js";import{H as $,C as x,a as T,W as q,S as C}from"./swiper-d2BTqZOf.js";import{g as l,b as u,c as _,q as h,w as m}from"./index.esm2017-JmUSUlhM.js";import{A as W}from"./allImportFile-MzPxAZ_w.js";import"./air-datepicker-wA5O5680.js";const y=document.querySelector(".main-company__swiper-wrapper");class k{app;db;productsArray;constructor(){this.app=n,this.db=l(this.app),this.productsArray=[]}async loadCards(){(await u(_(this.db,"hotels"))).forEach(e=>{const r=e.data();this.productsArray.push(r)}),this.renderProducts()}renderProducts(){this.productsArray.forEach(s=>{const{name:e,price:r,img:a,date:i}=s;if(a&&Array.isArray(a)&&a.length>0){const{url:o,urlWebp:t}=a[0];let c=`
      <div class="swiper-slide main-company__swiper-slide">
        <div class="main-company__card">
        <div class="main-company__card-img">
          <picture class="hero__bg-img">
            <source srcset=${t} type="image/webp" />
            <img src=${o} alt="bg" />
          </picture>
          `;r[1]&&(c+=`
            <div class="main-company__card-line">
            <svg>
              <use xlink:href="#company-line"></use>
            </svg>
            <div class="main-company__card-line-wrapper">
              <p class="main-company__card-line-price">от ${r[1]}€</p>
            </div>
          </div>
            `),c+=`
          <div class="main-company__card-data-wrapper">
            <svg>
              <use xlink:href="#clock"></use>
            </svg>
            <p class="main-company__card-data">${i}</p>
          </div>
        </div>
        <p class="main-company__card-text">${e}</p>
      </div>
      </div>
        `,y&&y.insertAdjacentHTML("beforeend",c)}})}}const v=document.querySelector(".hot-deals__swiper-wrapper");class H{app;db;productsArray;constructor(){this.app=n,this.db=l(this.app),this.productsArray=[]}async loadCards(){const s=h(_(this.db,"hotels"),m("hotTour","==",!0));(await u(s)).forEach(r=>{const a=r.data();this.productsArray.push(a)}),this.renderProducts()}renderProducts(){this.productsArray.forEach(s=>{const{name:e,price:r,country:a,region:i,star:o,img:t,date:c}=s;if(t&&Array.isArray(t)&&t.length>0){const{url:b,urlWebp:A}=t[0];let p=`
      <div class="swiper-slide hot-deals__swiper-slide">
        <div class="hot-deals__card">
        <div class="hot-deals__card-img">
          <picture class="hero__bg-img">
            <source srcset=${A} type="image/webp" />
            <img src=${b} alt="bg" />
          </picture>
          <div class="hot-deals__card-data-wrapper hot-deals__card-data-top">
            <svg>
              <use xlink:href="#clock"></use>
            </svg>
            <p class="hot-deals__card-data">${c}</p>
          </div>
          <div class="hot-deals__card-place-wrapper">
            <svg>
              <use xlink:href="#place"></use>
            </svg>
            <p class="hot-deals__card-place">${a}, ${i}</p>
          </div>
        </div>
        <div class="hot-deals__card-wrappers">
        <div class="hot-deals__card-text-wrapper">
            <p class="hot-deals__card-text">${e}</p>
            <div class="hot-deals__card-stars-wrapper">
            `;for(let w=0;w<o;w++)p+=`
              <svg>
                <use xlink:href="#star"></use>
              </svg>
              `;p+=`
            </div>
          </div>
          <div class="hot-deals__card-prices-wrapper">
            <div class="hot-deals__card-price-wrapper">
              <p class="hot-deals__card-price-new"><span>${r[1]}€</span>/чел</p>
              <p class="hot-deals__card-price-old">${r[0]} €/чел</p>
            </div>
            `,r&&(p+=`
                  <div class="hot-deals__card-line">
                  <svg>
                    <use xlink:href="#company-line"></use>
                  </svg>
                  <div class="hot-deals__card-line-wrapper">
                    <p class="hot-deals__card-line-price">-${((r[0]-r[1])/r[0]*100).toFixed(0)}%</p>
                  </div>
                </div>
                </div>
                </div>
              </div>
            </div>
                  `),v&&v.insertAdjacentHTML("beforeend",p)}})}}const g=document.querySelector(".winter-tour__swiper-wrapper");class P{app;db;productsArray;constructor(){this.app=n,this.db=l(this.app),this.productsArray=[]}async loadCards(){const s=h(_(this.db,"hotels"),m("isWinterTour","==",!0));(await u(s)).forEach(r=>{const a=r.data();a.id=r.id,this.productsArray.push(a)}),this.renderProducts()}renderProducts(){this.productsArray.forEach(s=>{const{country:e,img:r,price:a,id:i}=s;if(r&&Array.isArray(r)&&r.length>0){const{url:o,urlWebp:t}=r[0];let c=`
      <div class="swiper-slide winter-tour__swiper-slide">
        <div class="winter-tour__card">
        <div class="winter-tour__card-img">
          <picture class="hero__bg-img">
            <source srcset=${t} type="image/webp" />
            <img src=${o} alt="bg" />
          </picture>
        </div>
        <div class="winter-tour__card-text-wrapper">
            <div class="winter-tour__card-place-wrapper">
                <svg>
                    <use xlink:href="#map-marker"></use>
                </svg>
                <p class="winter-tour__card-place">${e}</p>
            </div>  
            <p class="winter-tour__card-price-new">от <span>${a[0]}€</span>/чел</p>
            
        </div>
        <a href="https://club-travel.netlify.app/hotel.html?id=${i}" class="winter-tour__btn btn">Выбрать тур</a>
        `;g&&g.insertAdjacentHTML("beforeend",c)}}),this.getYearsSeason()}getYearsSeason(){const s=document.querySelector(".winter-tour__text");if(s){const e=+this.productsArray[0].date.slice(6);s.textContent+=`Зима ${e-1} - ${e}`}}}const f=document.querySelector(".summer-tour__swiper-wrapper");class E{app;db;productsArray;constructor(){this.app=n,this.db=l(this.app),this.productsArray=[]}async loadCards(){const s=h(_(this.db,"hotels"),m("isSummerTour","==",!0));(await u(s)).forEach(r=>{const a=r.data();a.id=r.id,this.productsArray.push(a)}),this.renderProducts()}renderProducts(){this.productsArray.forEach(s=>{const{country:e,img:r,price:a,id:i}=s;if(r&&Array.isArray(r)&&r.length>0){const{url:o,urlWebp:t}=r[0];let c=`
      <div class="swiper-slide summer-tour__swiper-slide">
        <div class="summer-tour__card">
        <div class="summer-tour__card-img">
          <picture class="hero__bg-img">
            <source srcset=${t} type="image/webp" />
            <img src=${o} alt="bg" />
          </picture>
        </div>
        <div class="summer-tour__card-text-wrapper">
            <div class="summer-tour__card-place-wrapper">
                <svg>
                    <use xlink:href="#map-marker"></use>
                </svg>
                <p class="summer-tour__card-place">${e}</p>
            </div>  
            <p class="summer-tour__card-price-new">от <span>${a[0]}€</span>/чел</p>
            
        </div>
        <a href="https://club-travel.netlify.app/hotel.html?id=${i}" class="summer-tour__btn btn">Выбрать тур</a>
        `;f&&f.insertAdjacentHTML("beforeend",c)}}),this.getYearsSeason()}getYearsSeason(){const s=document.querySelector(".summer-tour__text");if(s){const e=+this.productsArray[0].date.slice(6);s.textContent+=`Лето ${e-1} - ${e}`}}}document.addEventListener("DOMContentLoaded",async function(){const d=new k,s=new H,e=new P,r=new E;new $,new x,new T,new q,new C,new W,await d.loadCards(),await s.loadCards(),await e.loadCards(),await r.loadCards(),new S});
