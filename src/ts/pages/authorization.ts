import { Header } from "../components/header";
import { justValidateAuthorization } from "../modules/justValidate";
import { Authorization } from "../code/authorization/authorization";
import { ButtonEventHandler } from "../components/buttonEventHandler";


document.addEventListener("DOMContentLoaded", () => {

    justValidateAuthorization();
    
    const authorizationInstance = new Authorization();

    new ButtonEventHandler<Authorization>('.authorization__btn-registration', authorizationInstance, 'authorizationWithEmail');
    new ButtonEventHandler<Authorization>('.authorization__form-btn-google', authorizationInstance, 'authorizationWithGoogle');

    new Header();
})

