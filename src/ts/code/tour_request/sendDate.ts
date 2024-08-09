import {app} from "./../../modules/firebase"
import $ from "jquery";
import { collection, addDoc, getFirestore } from "firebase/firestore"; 
interface dateObj extends Object {
    country: string | null;
    region: string
    dataStart: string
    dataFinish: string
    people: object
    price: string
    food: string
    stars: string
    wouldLike: string
    name: string
    tel: string
    email: string
}

interface castomEvent extends Event {
    detail: {stars: string} 
}

export class SendDate{
    dateObj : dateObj
    constructor (){
        this.dateObj = {
            country:  "",
            region: "",
            dataStart: "",
            dataFinish: "", 
            people: {kids: 0, adults: 1}, 
            price: "",
            food:  "",
            stars:  "",
            wouldLike:  "",
            name:  "",
            tel:  "",
            email:  "",
        }

        this.init()
    }
    init(){
        this.selectDate()
    }

    selectDate(){
        console.log(this.dateObj, 1)
        document.addEventListener("selectTour", () => {
            this.dateObj.country = $(".drop-country__county").html()
            this.dateObj.region = $(".drop-country__tour").html()
        });

        document.addEventListener("finalDate", () => {
            this.dateObj.dataStart = $("#start-date").html()
            this.dateObj.dataFinish = $("#final-date").html()
        });

        document.addEventListener("myCustomEvent", (e : Event) => {
            const even = e as castomEvent
            this.dateObj.people = even.detail
        });

        document.addEventListener("selectFood", () => {
            this.dateObj.food = $(".food__btn-info").html()
        });

        document.addEventListener("selectStars", (e) => {
            const even = e as castomEvent
            this.dateObj.stars = even.detail.stars
        });

        $('#input-price').on("input", () => {
            this.dateObj.price = String($('#input-price').val())
        });

        $('.form__textarea').on("input", () => {
            this.dateObj.wouldLike = String($('.form__textarea').val())
        });

        $('#input-name').on("input", () => {
            this.dateObj.name = String($('#input-name').val())
        });

        $('#input-tel').on("input", () => {
            this.dateObj.tel = String($('#input-tel').val())
        });

        $('#input-mail').on("input", () => {
            this.dateObj.email = String($('#input-mail').val())
        });

        $('#adviser-inp').on("input", () => {
            this.dateObj.tel = String($('#adviser-inp').val())
        });
    }
    
    async sendDate(form: boolean = true){
        const db = getFirestore(app);
        if(form){
            await addDoc(collection(db, "callYouForm"), this.dateObj);
        }else{
            await addDoc(collection(db, "callYouForm"), {phone: this.dateObj.tel});
        }

        this.clearFormTwo()
    }

    clearFormTwo(){
        $('#input-price').val('');
        $('.form__textarea').val('');
        $('.food__btn-info').html('Выбрать');
        $(".form__stars-one-star").each((_index, item) => {
            item.classList.remove("form__stars-one-star_active");
        })
    }
}