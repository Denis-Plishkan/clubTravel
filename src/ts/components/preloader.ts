import $ from "jquery";

export class Preloader{
    header: JQuery<HTMLElement>
    preloader: JQuery<HTMLElement>
    body: JQuery<HTMLElement>
    constructor(){
        this.header = $('.header');
        this.preloader = $(".preloader");
        this.body = $("body");

        this.init()

    }

    init(){
        this.removePreloader();
    }

    removePreloader(){
        setTimeout(() => {
            this.header.removeClass("header_preload");
            this.body.addClass("preloder-hidden");
            this.preloader.addClass("preloader_hidden");

        },300)
    }
}  