import { DropDown } from "../../components/dropdown";
import { AsYouType, validatePhoneNumberLength } from 'libphonenumber-js';
import {SendDate} from "./sendDate"

import $ from "jquery";
import 'jquery-validation';

export class TourRequest {
    input: JQuery<HTMLInputElement>;
    inputBtn: JQuery<HTMLButtonElement>;
    tabsBtn: JQuery<HTMLElement>;
    form: JQuery<HTMLFormElement>;
    tabsSlider: JQuery<HTMLElement>;
    DropPeople: DropDown;
    formBtn: JQuery<HTMLElement>;
    stars: JQuery<HTMLElement>;
    inputForm: JQuery<HTMLElement>;
    formInfo : Object;
    sendDate: SendDate;

    constructor() {
        this.sendDate = new SendDate();
        this.DropPeople = new DropDown(".form__drop-guests", ".form__drop-tags");
        this.stars = $(".form__stars-one-star");
        this.formInfo = {}

        this.input = $("#adviser-inp");
        this.inputBtn = $(".adviser__btn");
        this.inputForm = $("#adviser__form");
        this.tabsBtn = $(".form__tabs");
        this.form = $(".form");

        this.formBtn = this.form.find(".form__btn");
        this.tabsSlider = $(".form__tabs-slider");

        this.validateTel("#adviser__form");
        this.tabs();
        this.points();
        this.stopReload();
        this.clickFormBtn();
        this.inputMask();
        this.selectStars();
        this.validateMainFormOne();
        this.validateMainFormThree();
        this.priceVal();
    }

    priceVal(){
        const inputPrice = document.getElementById("input-price") as HTMLInputElement;
        inputPrice?.addEventListener("input", () => {
            const test = /^[0-9]{0,7}$/.test(inputPrice.value)
            if(!test){
            inputPrice.value = inputPrice.value.slice(0, -1)
            }
        })
    } 

    selectStars() {
        const context = this;

        this.stars.each((_index, item) => {
            item.addEventListener("click", () => {
                addActive(Number(item.getAttribute("data-num")));
                const customEvent = new CustomEvent("selectStars", {
                    detail: {
                    stars: item.getAttribute("data-num")
                    }
                });
                document.dispatchEvent(customEvent);
            });
        });

        function addActive(attribute: number) {
            context.stars.each((index, item) => {
                if (index < attribute) {
                    item.classList.add("form__stars-one-star_active");
                } else {
                    item.classList.remove("form__stars-one-star_active");
                }
            });
        }
    }

    stopReload() {
        this.form.on("submit", (e): void => {
            e.preventDefault();
        });
    }

    tabs() {
        const btnOne = document.querySelector(".form__tab-one");
        const btnTwo = document.querySelector(".form__tab-two");
        const btnThree = document.querySelector(".form__tab-three");

        this.tabsBtn.each((_index, item) => {
            item.addEventListener("click", (e) => {
            if (btnOne?.contains(e.target as Node)) {
                this.points(1);
            } else if (btnTwo?.contains(e.target as Node)) {
                this.points(2);
            } else if (btnThree?.contains(e.target as Node)) {
                this.points(3);
            }
            });
        });
    }

    points(num: number = 1) {
        const btnOne = document.querySelector(".form__tab-one");
        const btnTwo = document.querySelector(".form__tab-two");
        const btnThree = document.querySelector(".form__tab-three");
        const noError = !$(".form").is(".form_error");
        if (num === 1 && noError) {
            btnThree?.classList.remove("form__tab_active");
            btnTwo?.classList.remove("form__tab_active");
            btnOne?.classList.add("form__tab_active");

            this.form.removeClass("form_state-two form_state-three");
            this.form.addClass("form_state-one");

            this.tabsSlider.css({
            left: "0",
            });
        } else if (num === 2 && noError) {
            btnThree?.classList.remove("form__tab_active");
            btnOne?.classList.remove("form__tab_active");
            btnTwo?.classList.add("form__tab_active");

            this.form.removeClass("form_state-one form_state-three");
            this.form.addClass("form_state-two");

            this.tabsSlider.css({
            left: "33.3%",
            });
        } else if (num === 3 && noError) {
            btnOne?.classList.remove("form__tab_active");
            btnTwo?.classList.remove("form__tab_active");
            btnThree?.classList.add("form__tab_active");


            this.form.removeClass("form_state-one form_state-two");
            this.form.addClass("form_state-three");

            this.tabsSlider.css({
            left: "68%",
            });
        }
    }

    clickFormBtn() {
        this.formBtn.on("click", () => {
            const twoState = $(".form").is(".form_state-two");

            if (twoState) {
            this.points(3);
            }
        });
    }

    clickBtn() {
        alert("В скором времени вам позвонят.");
        this.input.val("");
        $(".adviser__input").removeClass("adviser__input_active");
    }

    inputMask() {
        const inputs = document.querySelectorAll("input[name='phone']")
        inputs.forEach(item => {
            const input = item as HTMLInputElement
            input.addEventListener("input", () => {
            if(input.value.length === 1){
                input.value = "+" + input.value
                if(input.value === "+0"){
                input.value = "+380"
                }
            }
            if(validatePhoneNumberLength(input.value + '0') === "TOO_LONG"){
                input.value = input.value.slice(0, -1)
            }
            input.value = new AsYouType().input(input.value)
            })
        })
    }

    validateTel(inputWrap: string){
        const context = this

        $.validator.addMethod("min", function(value : string) {
            if(/\+380/.test(value)){
            return  value.replace(/ |\+/g, '').length >= 12;
            }else{
            return  value.replace(/ |\+/g, '').length >= 10;
            }
        }, 'Номер должен состоять из 10 цифр');

        $(inputWrap).validate({
            rules: {
                phone: {
                    min: true,
                    maxlength: 16,
                    required: true
                },
            },
            messages: {
            phone: {
                required: "Введите номер",
                maxlength: "Слишком длинный номер"
            },
            },
            submitHandler(form) {
                $(inputWrap).find(".input-row").removeClass("input_active")
                context.sendDate.sendDate(false)
                alert("Мы скоро с вами свяжемся")
                $(form).trigger("reset");
            }
        });
    }

    validateMainFormOne(){
        const context = this

        document.addEventListener("selectTour", () => {
            $("#drop-country").valid();
        });

        document.addEventListener("startDate", () => {
            $("#drop-calendar").valid();
        });

        document.addEventListener("finalDate", () => {
            $("#drop-calendar").valid();
        });

        $.validator.addMethod("dropCountry", function() {
            const checkCountry = $(".drop-country__county").html();
            return checkCountry !== "Страна"
        }, 'Выбирите тур');

        $.validator.addMethod("departure", function() {
            const startDate = $("#start-date").html();
            return startDate.length > 0
        }, 'Выберите дату вылета');

        $.validator.addMethod("arrived", function() {
            const finalDate = $("#final-date").html();
            return finalDate.length > 0
        }, 'Выберите дату возвращения');

        $("#form-state-one").validate({
            rules: {
                dropCalendar: {
                    departure: true,
                    arrived: true,
                },
                dropCountry: {
                    dropCountry: true,
                },
            },
            submitHandler() {
                $(".form").removeClass("form_error");
                context.points(2)
            }
        });
    }

    validateMainFormThree(){
        const context = this

        $.validator.addMethod("laxEmail", function(value: string) {
            return /^(?!.*\.\.)[\w.-]{3,20}@[\wа-я.][\wа-я.-]{1,20}[\wа-я.]\.[a-z]{2,10}/.test(value);
        }, 'Введите корректный email');

        $.validator.addMethod("min", function(value : string) {
            if(/\+380/.test(value)){
            return  value.replace(/ |\+/g, '').length >= 12;
            }else{
            return  value.replace(/ |\+/g, '').length >= 10;
            }
        }, 'Номер должен состоять из 10 цифр');

        $.validator.addMethod("onlyLetters", function(value: string) {
            return /^[a-za-z]*$/i.test(value);
        }, 'Введите корректное имя');

        $("#form-state-three").validate({
            rules: {
                phone: {
                    min: true,
                    maxlength: 16,
                },
                email: {
                    laxEmail: true,
                },
                name: {
                    required: true,
                    onlyLetters: true,
                    minlength: 3,
                },
            },
            messages: {
                phone: {
                    maxlength: "Слишком длинный номер"
                },
                name: {
                    required: "Введите ваше имя",
                    minlength: "Минимум три символа",
                }
            },
            submitHandler(form) {
                alert("Мы скоро с вами свяжемся")
                $(form).trigger("reset");
                context.sendDate.sendDate()
                context.points(1)
            }
        });
    }
}