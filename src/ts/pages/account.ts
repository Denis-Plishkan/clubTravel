import { Header } from "../components/header";
import { Account } from "../code/account/account";
import { IsAuthorization } from "../components/isAuthorization";
import { justValidateChangeName } from "../modules/justValidate";


document.addEventListener("DOMContentLoaded", async function() {
    new IsAuthorization();
    const productAccount = new Account();
    productAccount.isChangeInput();
    await productAccount.loadCards();
    
    justValidateChangeName();
    
    const button = document.querySelector('.account__settings-button');
    button?.addEventListener('click', () => {
        productAccount.getFormData();
    })

    new Header();
})


