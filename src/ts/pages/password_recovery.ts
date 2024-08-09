import { Header } from "../components/header";
import { justValidatePasswordRecovery } from "../modules/justValidate";
import { PasswordRecovery } from "../code/password-recovery/password-recovery";
import { ButtonEventHandler } from "../components/buttonEventHandler";

document.addEventListener("DOMContentLoaded", () => {

  justValidatePasswordRecovery();
  
  const passwordRecoveryInstance = new PasswordRecovery();

  new ButtonEventHandler<PasswordRecovery>('.password-recovery__btn-registration', passwordRecoveryInstance, 'passwordRecovery');
  
  new Header();
})
