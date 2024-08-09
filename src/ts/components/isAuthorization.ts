import { getAuth, onAuthStateChanged } from "firebase/auth";

export class IsAuthorization {
    
    constructor() {
        this.initializeButton();
        this.watchAuthState(); 
    }

    async checkAuthorizationUser() {
        const user = await getAuth().currentUser;
        if (user) {
            console.log('Пользователь авторизован:', user.uid);
            window.location.href = "account.html"; 
        } else {
            console.log('Пользователь не авторизован');
            window.location.href = "authorization.html";
        }

    }

    watchAuthState() {
        onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                console.log('Пользователь авторизован:', user.uid);
            } else {
                console.log('Пользователь не авторизован');
                if (!window.location.href.includes("authorization.html")) {
                    window.location.href = "authorization.html";
                }
            }
        });
    }

    initializeButton() {
        const buttonUser = document.querySelector('.top-list__link-user');
        
        if (buttonUser) {
            buttonUser.addEventListener('click', (e) => {
                e.preventDefault();
                this.checkAuthorizationUser();
            });
        } else {
            console.error('Кнопка не найдена');
        }
    }
}