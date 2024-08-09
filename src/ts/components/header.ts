import $ from "jquery";
import { GetSing} from "./../modules/firebase"
import { Preloader } from "./preloader";

interface user{
  uid: string
}
export class Header {
  burgerBtn: JQuery<HTMLDivElement>;
  body: JQuery<HTMLDivElement>;
  constructor() {
    this.burgerBtn = $(".menu__icon");
    this.body = $("body");

    this.init();
  }

  init(){
    new Preloader()
    this.burger();
    this.getSing();
    this.resize();
    this.delLinkAtHome()

    setTimeout(() => {
      this.scroll();
    },300)
  }

  delLinkAtHome(){
    const condition = /index.html/g.test(window.location.href)

    if(condition){
      const link = document.querySelector(".header__logo-link")
      link?.addEventListener("click", (e) => {
        e.preventDefault()
      })
    }
  }

  burger(): void {
    const context = this;
    this.burgerBtn.on("click", function () {
      context.body.toggleClass("burger-active");
    });
  }

  scroll() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 70 || window.pageYOffset > 70) {
        this.body.addClass("scroll");
      } else {
        this.body.removeClass("scroll");
      }
    });
  }

      
  resize() {
    const context = this

    function scheckScreen(){
        if (navigator.maxTouchPoints) {
            context.body.addClass("touch-screen");
        } else {
            context.body.removeClass("touch-screen");
        }
    }

    scheckScreen()
    window.addEventListener('resize' ,  scheckScreen)
}

  async getSing(){
    const user = await new GetSing().promise() as user 
    const icon = $(".top-list__link-user")
    const mobIcon = $(".menu__user-mobile-link")
    
    if(user){
      icon.html('<svg id="icon-account"><use xlink:href="#user"></use></svg>')
      icon.removeClass("top-list__not-sing")
      icon.attr("href", "Account.html");

      mobIcon.attr("href", "Account.html");
      mobIcon.html('<svg id="icon-account"><use xlink:href="#user"></use></svg>')

      console.log("Пользователь авторизирован")
    }else{
      icon.html('<svg id="icon-account"><use xlink:href="#sing"></use></svg>')
      icon.addClass("top-list__not-sing")
      icon.attr("href", "authorization.html");

      mobIcon.attr("href", "authorization.html");
      mobIcon.html('<svg id="icon-account"><use xlink:href="#sing"></use></svg>')
      console.log("Пользователь не авторизирован")
    }
  }
}
