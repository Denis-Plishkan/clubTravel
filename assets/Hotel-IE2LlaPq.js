import{$ as s,a as w,H as y,i as S}from"./header--MTLiN39.js";import{D as k}from"./dropdown-DwgpOafU.js";import{g as v,b as F,c as L,d as _,a as j,u as I,e as O,s as P}from"./index.esm2017-JmUSUlhM.js";import{b as q,c as x}from"./swiper-d2BTqZOf.js";class E{totalPrice;dropDown;constructor(){this.totalPrice=s(".tour__total-price"),this.dropDown=new k(".tour__quantity-drop",".tour__quantity-tegs"),this.priceCalculator(),this.selecTour()}selecTour(){s(".tour__setected-select").on("click",()=>{window.history.back()})}priceCalculator(){document.addEventListener("myCustomEvent",()=>{const t=s(".tour__price-sum").data("price"),e=this.dropDown.getKids()+this.dropDown.getAdults(),r=String(+t*e);let i="";if(r.length>3){let a=0;for(let o=r.length-1;o>=0;o--)a++,i+=r[o],a===3&&(i+=" ");i=i.split("").reverse().join("")}else i=r;this.totalPrice.html(i)})}}class H{app;currentUrl;id;constructor(){this.app=w,this.currentUrl=new URL(window.location.href),this.id=this.currentUrl.searchParams.get("id")||null,this.loadData()}map(t,e){const a=s(".top-img__hotel-info").attr("href")?.replace(/query=/,`query=${t}, ${e}`);a&&s(".top-img__hotel-info").attr("href",a)}async loadData(){const t=v(this.app),e=await F(L(t,"hotels"));let r=0;const i=e.docs.length-1;let a=!1;e.forEach(o=>{const n=+(Math.random()*i).toFixed();o.id===this.id&&(this.changeInfo(o.data()),a=!0),o.id!==this.id&&r<4&&(r++,this.bottomSlide(e.docs[n].data(),e.docs[n].id))}),a||(window.location.href="404.html"),new q,new y,this.clickSlide()}bottomSlide(t,e){const r=s("#bottom-slider"),i=t,a=i.name,o=this.dateFormat(i.date).replace(" г.",""),n=i.country,l=i.beach,h=i.star,m=i.img[0],c=+i.price[0],p=+i.price[1],d=p?+((c-+p)/c*100).toFixed():!1,$=()=>{let g="";for(let f=0;f<h;f++)g+='<svg><use xlink:href="#start"></use></svg>';return g},D=`
            <div class="slide__old-price"><span id="old-price">${c}</span> €/чел</div>
        `,b=`
            <div class="slide__sale">
                <svg><use xlink:href="#sale-bg"></use></svg>
                <span>-<span id="sale">${d}</span>%</span>
            </div>
        `;r.append(`
            <div class="swiper-slide slide" data-id="${e}">
                <div class="slide__wrap">
                    <div class="slide__image">
                        <div class="slide__img">
                            <picture>
                                <source srcset="${m.urlWebp}"/>
                                <img src="${m.url}" width="1024" height="683" loading="lazy" alt="hotel-image"/>
                            </picture>
                        </div>
                    
                        <div class="slide__tag slide__tag-date">
                            <svg><use xlink:href="#clock"></use></svg>
                    
                            <span>${o}</span>
                        </div>
                    
                        <div class="slide__tag slide__tag-location">
                            <svg><use xlink:href="#point"></use></svg>
                            <span>${n}${l===""?"":","+l}</span>
                        </div>
                    </div>
                    
                    <div class="slide__info">
                        <div class="slide__row slide__row-one">
                            <span class="slide__title">${a}</span>
                            <div class="slide__stars">${$()}</div>
                        </div>
                
                        <div class="slide__row slide__row-two">
                            <div class="slide__price"><span><span id="price">${d?p:c}</span>€</span>/чел</div>
                    
                            ${d?D:""}
                    
                            ${d?b:""}
                        </div>
                    </div>
                </div>
            </div>
        `)}clickSlide(){document.querySelectorAll(".slide").forEach(e=>{e.addEventListener("click",()=>{const r=e.getAttribute("data-id");window.location.href=`/hotel.html?id=${r}`})})}dateFormat(t){const e=t.replace(/.{6}/,""),r=t.replace(/.{3}/,"").replace(/\.[0-9]{4}/,""),i=t.replace(/\.\w{2}\.\w{4}/,""),a=new Date(`${e}-${r}-${i}`),o=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],n=a.getDate(),l=o[a.getMonth()],h=a.getFullYear();return`${n} ${l} ${h} г.`}changeInfo(t){s(".top-img__hotel-name").html(t.name),s("#country").html(t.country),s("#local").html(t.region),s("#date-flight").html(this.dateFormat(t.date)),s("#days").html(t.duration),s("#departure").html(t.departureIn),s("#foods").html(t.meals),s("#rooms").html(t.room.join(", ")),s(".tour__price-sum").html(t.price[0]).attr("data-price",t.price.length===1?t.price[0]:t.price[1]),s(".tour__total-price").html(t.price[0]),s(".text-block__main-text").html(t.hotelInfo.description),s("#location").html(t.hotelInfo.location),this.stars(t.star),this.renderPhotoSlide(t.img),this.renderList(s("#forKids"),t.hotelInfo.forKids),this.renderList(s("#beach"),t.hotelInfo.beach),this.renderList(s("#allRooms"),t.hotelInfo.rooms),this.renderList(s("#restaurants"),t.hotelInfo.restaurants),this.renderList(s("#sports"),t.hotelInfo.sport),this.renderList(s("#service"),t.hotelInfo.service),this.map(t.country,t.region)}stars(t){for(let e=0;e<t;e++)s(".top-img__hotel-stars").append(`
                <svg><use xlink:href="#start"></use></svg>
            `)}renderList(t,e){e.forEach(r=>{t.append(`
                <li>${r}</li>
            `)})}renderPhotoSlide(t){const e=s("#swiper-image-two"),r=s("#swiper-image-one");t.forEach((i,a)=>{e.append(`
                <div class="swiper-slide">
                <picture>
                    <source srcset="${i.urlWebp}"/>
                    <img src="${i.url}" alt="Description of the image" ${a!==0?'loading="lazy"':""} width="1024" height="768"/>
                </picture>
                </div>
            `),r.append(`
            <div class="swiper-slide">
            <picture>
                <source srcset="${i.urlWebp}"/>
                <img src="${i.url}" alt="Description of the image" ${a>3?'loading="lazy"':""} width="1024" height="768"/>
            </picture>
            </div>
        `)}),new x}}class U{objData;orderBtn;user;currentUrl;constructor(){this.currentUrl=new URL(window.location.href),this.orderBtn=s(".tour__btn"),this.user=!1,this.objData={date:"",idOrder:0,price:0,payStatus:!1,email:"",id:this.currentUrl.searchParams.get("id")||null},this.init()}init(){this.getSing(),this.setOrder(),this.dateOrder()}async getSing(){const t=await new S().promise();t&&(this.user=t,this.objData.email=t.email?t.email:null)}dateOrder(){const t=new Date,e=t.getTime();this.objData.idOrder=+String(e).slice(3),this.objData.date=this.dateFormat(t)}setOrder(){this.orderBtn.on("click",async()=>{if(typeof this.user!="boolean"){const t=this.user.uid,e=v(w);this.objData.price=+s(".tour__total-price").html().replace(" ",""),this.objData.payStatus=!1;const r=_(e,"users",t);(await j(r)).exists()?await I(r,{orders:O(this.objData)}):await P(_(e,"users",t),{orders:[this.objData]}),confirm("Тур добавлен и ожидает оплаты, перейти в личный кабинет?")&&(window.location.href="Account.html")}else confirm("Чтобы забронировать тур необходимо авторизоваться, перейти на страницу авторизации?")&&(window.location.href="authorization.html")})}dateFormat(t){const e=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"],r=t.getDate(),i=e[t.getMonth()],a=t.getFullYear(),o=t.getHours(),n=t.getMinutes();return`${r} ${i} ${a} ${o}:${n}`}}document.addEventListener("DOMContentLoaded",()=>{new E,new H,new U});
