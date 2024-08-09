import{a as _,H as u}from"./header--MTLiN39.js";import{g as h,b as v,c as y}from"./index.esm2017-JmUSUlhM.js";const t=document.querySelector(".directions__wrapper");class g{app;db;productsArray;constructor(){this.app=_,this.db=h(this.app),this.productsArray=[]}async loadCards(){(await v(y(this.db,"hotels"))).forEach(s=>{const r=s.data();r.id=s.id,this.productsArray.push(r)}),this.renderProducts()}renderProducts(){this.productsArray.forEach(a=>{const{img:s,country:r,region:e,price:o,work:i,id:n}=a;if(s&&Array.isArray(s)&&s.length>0){const{url:p,urlWebp:l}=s[0];let c=`
        <div class="directions__card">
        <div class="directions__card-img">
          <picture class="hero__bg-img">
            <source srcset=${l} type="image/webp" />
            <img src=${p} alt="bg" />
          </picture>
        </div>
        <div class="directions__card-place-wrapper">
            <div class="directions__card-place">
            `;e.length<8?c+=`
                    <p class="directions__card-place-town">${e}</p>
                `:c+=`
                    <p class="directions__card-place-town">${e.slice(0,8)+"..."}</p>
                `,c+=`
                <p class="directions__card-place-country">${r}</p>
            </div>
            <div class="directions__card-price">
                <p class="directions__card-price-person">от <span>${o[0]}€</span>/чел</p>
                <p class="directions__card-price-offer">214 предложения</p>
            </div>
        </div>
        <div class="directions__card-season-wrapper">
            <div class="directions__card-season">
                <p class="directions__card-season-start-end">${i[0]}</p>
                <p class="directions__card-season-start-end">${i[1]}</p>
            </div>
            <svg>
              <use xlink:href="#calendar-directions"></use>
            </svg>
        </div>
        <a href="https://club-travel.netlify.app/hotel.html?id=${n}" class="directions__btn btn">Выбрать тур</a>
      </div>
        `,t&&t.insertAdjacentHTML("beforeend",c)}})}}document.addEventListener("DOMContentLoaded",async function(){await new g().loadCards(),new u});
