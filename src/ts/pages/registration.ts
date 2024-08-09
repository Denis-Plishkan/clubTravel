import { Header } from "../components/header";
import { justValidateRegistration } from "../modules/justValidate";
import { Registration } from "../code/registration/registration";
import { ButtonEventHandler } from "../components/buttonEventHandler";

document.addEventListener("DOMContentLoaded", () => {
    justValidateRegistration();
    
    const registrationInstance = new Registration();

    new ButtonEventHandler<Registration>('.registration__btn-registration', registrationInstance, 'registrationWithEmail');
    new ButtonEventHandler<Registration>('.registration__form-btn-google', registrationInstance, 'registrationWithGoogle');
    
    new Header();
})
