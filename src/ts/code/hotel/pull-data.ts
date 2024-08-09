import $ from "jquery";
import { Header } from "../../components/header";
import {app} from "./../../modules/firebase"
import { getFirestore, getDocs, collection  } from "firebase/firestore";
import { HotelSlider, HotelSecondSlider } from "../../code/swiper";

interface Photo{
    urlWebp: string;
    url: string;
}
interface BottomSlide{
    name: string;
    date: string;
    country: string;
    beach: string;
    price: Array<string>
    star: number
    img: Array<{url :string, urlWebp: string}>
}
export class PullData{

    app: typeof app
    currentUrl: URL
    id : string | null

    constructor(){
        this.app = app;
        this.currentUrl = new URL(window.location.href);
        this.id =  this.currentUrl.searchParams.get("id") || null;
         
        this.loadData();
    }

    map(country: string, region: string){
        const link: JQuery<HTMLElement> = $(".top-img__hotel-info");
        const href: string | undefined  = link.attr("href");
        const newHref = href?.replace(/query=/, `query=${country}, ${region}`)
        if(newHref){
            $(".top-img__hotel-info").attr("href", newHref)
        }
    }

    async loadData(){
        const db = getFirestore(this.app);
        const querySnapshot = await getDocs(collection(db, "hotels"));

        let i = 0;
        const length: number = querySnapshot.docs.length - 1

        let loadStatus = false 
        querySnapshot.forEach((doc) => {
            const random: number =  +(Math.random() * length).toFixed()

            if(doc.id === this.id){
                this.changeInfo(doc.data())
                loadStatus = true
            }

            if(doc.id !== this.id && i < 4){
                i++
                this.bottomSlide(querySnapshot.docs[random].data(), querySnapshot.docs[random].id)
            }
        });

        if(!loadStatus){
            window.location.href = "404.html"
        }        

        new HotelSecondSlider();
        new Header()

        this.clickSlide();
    }

    bottomSlide(data: object, id: string){
        const sliderWrapper = $("#bottom-slider");

        const currentData =  data as BottomSlide
        const name: string = currentData.name;
        const date = this.dateFormat(currentData.date).replace(' г.', '');
        const country = currentData.country;
        const beach = currentData.beach
        const stars = currentData.star
        const img = currentData.img[0]

        const price: number = +currentData.price[0]
        const newPrice: number = +currentData.price[1]
        const sale: boolean | number = newPrice? +(((price - +newPrice) / price) * 100).toFixed()  : false

        const renderStars = () => {
            let container = ''
            for(let i = 0; i < stars; i++){
                container += '<svg><use xlink:href="#start"></use></svg>'
            }
            return container
        }

        const renderOldPrice = `
            <div class="slide__old-price"><span id="old-price">${price}</span> €/чел</div>
        `; 

        const renderSale = `
            <div class="slide__sale">
                <svg><use xlink:href="#sale-bg"></use></svg>
                <span>-<span id="sale">${sale}</span>%</span>
            </div>
        `;   
        
        sliderWrapper.append(`
            <div class="swiper-slide slide" data-id="${id}">
                <div class="slide__wrap">
                    <div class="slide__image">
                        <div class="slide__img">
                            <picture>
                                <source srcset="${img.urlWebp}"/>
                                <img src="${img.url}" width="1024" height="683" loading="lazy" alt="hotel-image"/>
                            </picture>
                        </div>
                    
                        <div class="slide__tag slide__tag-date">
                            <svg><use xlink:href="#clock"></use></svg>
                    
                            <span>${date}</span>
                        </div>
                    
                        <div class="slide__tag slide__tag-location">
                            <svg><use xlink:href="#point"></use></svg>
                            <span>${country}${beach === ''?"":"," + beach}</span>
                        </div>
                    </div>
                    
                    <div class="slide__info">
                        <div class="slide__row slide__row-one">
                            <span class="slide__title">${name}</span>
                            <div class="slide__stars">${renderStars()}</div>
                        </div>
                
                        <div class="slide__row slide__row-two">
                            <div class="slide__price"><span><span id="price">${sale? newPrice : price}</span>€</span>/чел</div>
                    
                            ${sale? renderOldPrice : ""}
                    
                            ${sale ? renderSale : ""}
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    clickSlide(){
        const allSlide = document.querySelectorAll(".slide");
        allSlide.forEach(item => {
            item.addEventListener("click", () => {
                const id = item.getAttribute("data-id");
                window.location.href = `/hotel.html?id=${id}`
            })
        })
    }

    dateFormat(date: string){
        const year = date.replace(/.{6}/, "");
        const month = date.replace(/.{3}/, "").replace(/\.[0-9]{4}/, "");
        const day = date.replace(/\.\w{2}\.\w{4}/, "");
        const dateObj = new Date(`${year}-${month}-${day}`);

        const months = [
            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ];
        
        const dayNewForm = dateObj.getDate();
        const monthNewForm = months[dateObj.getMonth()];
        const yearNewForm = dateObj.getFullYear();
        
        return `${dayNewForm} ${monthNewForm} ${yearNewForm} г.`;
    }

    changeInfo(doc: any){
        $(".top-img__hotel-name").html(doc.name)
        $("#country").html(doc.country);
        $("#local").html(doc.region);
        $("#date-flight").html(this.dateFormat(doc.date));
        $("#days").html(doc.duration);
        $("#departure").html(doc.departureIn);
        $("#foods").html(doc.meals);
        $("#rooms").html(doc.room.join(", "));
        $(".tour__price-sum").html(doc.price[0]).attr('data-price', doc.price.length === 1?doc.price[0]: doc.price[1] );
        $(".tour__total-price").html(doc.price[0]);
        $(".text-block__main-text").html(doc.hotelInfo.description)
        $("#location").html(doc.hotelInfo.location)

        this.stars(doc.star)
        this.renderPhotoSlide(doc.img)


        this.renderList($("#forKids"), doc.hotelInfo.forKids)
        this.renderList($("#beach"), doc.hotelInfo.beach)
        this.renderList($("#allRooms"), doc.hotelInfo.rooms)
        this.renderList($("#restaurants"), doc.hotelInfo.restaurants)
        this.renderList($("#sports"), doc.hotelInfo.sport)
        this.renderList($("#service"), doc.hotelInfo.service)

        this.map(doc.country, doc.region);
    }

    stars(star: number){
        for(let i = 0; i < star; i++){
            $(".top-img__hotel-stars").append(`
                <svg><use xlink:href="#start"></use></svg>
            `);
        }
    }

    renderList(container: JQuery<HTMLElement>, listArr: Array<string>){
        listArr.forEach(item => {
            container.append(`
                <li>${item}</li>
            `)
        })
    }

    renderPhotoSlide(photoArr: Array<Photo>){
        const swiperOne = $("#swiper-image-two");
        const swiperTwo = $("#swiper-image-one");

        photoArr.forEach((photoUrl, index) => {
            swiperOne.append(`
                <div class="swiper-slide">
                <picture>
                    <source srcset="${photoUrl.urlWebp}"/>
                    <img src="${photoUrl.url}" alt="Description of the image" ${index !== 0? 'loading="lazy"': ''} width="1024" height="768"/>
                </picture>
                </div>
            `);
            
            swiperTwo.append(`
            <div class="swiper-slide">
            <picture>
                <source srcset="${photoUrl.urlWebp}"/>
                <img src="${photoUrl.url}" alt="Description of the image" ${index > 3? 'loading="lazy"': ''} width="1024" height="768"/>
            </picture>
            </div>
        `);
        })

        new HotelSlider();
    }


}

















