import $ from "jquery";
import 'jquery-validation';
import { AsYouType, validatePhoneNumberLength } from 'libphonenumber-js'


type JQueryValidateForm = JQuery<HTMLFormElement>;


type addValidator = {
  validator: {
    addMethod: (
      name: string,
      method: (value: string, element: Element) => boolean,
      message: string
    ) => void;
  };
};

export class Contacts {
  constructor() {
    this.init();
  }

  init() {
    this.validateForm();
    this.inputMask()
  }

  validateForm() {
    const element = $("#form") as JQueryValidateForm;

    ($ as addValidator).validator.addMethod("laxEmail", function(value: string) {
      return /^(?!.*\.\.)[\w.-]{3,20}@[\wа-я.][\wа-я.-]{1,20}[\wа-я.]\.[a-z]{2,10}/.test(value);
    }, 'Введите корректный email');

    ($ as addValidator).validator.addMethod("min", function(value : string) {
      if(/\+380/.test(value)){
        return  value.replace(/ |\+/g, '').length >= 12;
      }else{
        return  value.replace(/ |\+/g, '').length >= 10;
      }
    }, 'Номер должен состоять из 10 цифр');

    element.validate({
      rules: {
        phone: {
          required: true,
          min: true,
        },
        mail: {
          laxEmail: true,
          required: true,
          minlength: 13,
        },
      },
      messages: {
        phone: {
          required: "Введите номер",
        },
        mail: {
          required: "Введите почту",
          minlength: "Номер должен состоять из 10 цифр"
        },
      },
      highlight: function(element: HTMLElement, _errorClass: string, validClass: string) {
        return $(element).addClass("border-error").removeClass(validClass);
      },
      unhighlight: function(element: HTMLElement, _errorClass: string, validClass: string) {
        return $(element).addClass(validClass).removeClass("border-error");
      },
      submitHandler(form: HTMLFormElement) {
        alert("Мы скоро с вами свяжемся");
        $(form).trigger("reset");
      }
    });
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
}
