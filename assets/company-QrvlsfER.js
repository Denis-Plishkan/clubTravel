import{a as m,H as l}from"./header--MTLiN39.js";import{g as y,b as u,c as h}from"./index.esm2017-JmUSUlhM.js";const e=document.querySelector(".company-company__wrapper");class _{app;db;productsArray;constructor(){this.app=m,this.db=y(this.app),this.productsArray=[]}async loadCards(){(await u(h(this.db,"hotels"))).forEach(c=>{const a=c.data();a.id=c.id,this.productsArray.push(a)}),this.renderProducts()}renderProducts(){this.productsArray.forEach(t=>{const{name:c,price:a,img:r,date:d,id:n}=t;if(r&&Array.isArray(r)&&r.length>0){const{url:p,urlWebp:i}=r[0];let s=`
        <div class="company-company__card" data-id="${n}">
        <div class="company-company__card-img">
          <picture class="hero__bg-img">
            <source srcset=${i} type="image/webp" />
            <img src=${p} alt="bg" />
          </picture>
          `;a[1]&&(s+=`
            <div class="company-company__card-line">
            <svg>
              <use xlink:href="#company-line"></use>
            </svg>
            <div class="company-company__card-line-wrapper">
              <p class="company-company__card-line-price">от ${a[1]}€</p>
            </div>
          </div>
            `),s+=`
          <div class="company-company__card-data-wrapper">
            <svg>
              <use xlink:href="#clock"></use>
            </svg>
            <p class="company-company__card-data">${d}</p>
          </div>
        </div>
        <p class="company-company__card-text">${c}</p>
      </div>
        `,e&&e.insertAdjacentHTML("beforeend",s)}}),this.getTourId()}getTourId(){document.querySelectorAll(".company-company__card").forEach(c=>{const a=c;a.dataset.id&&a.addEventListener("click",()=>{const r=a.dataset.id;window.location.href=`https://club-travel.netlify.app/hotel.html?id=${r}`})})}}document.addEventListener("DOMContentLoaded",async function(){await new _().loadCards(),new l});
