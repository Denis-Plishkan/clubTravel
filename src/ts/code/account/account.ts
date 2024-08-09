import { Users } from '../../type';
import { getFirestore, collection, getDocs, Firestore, doc, updateDoc } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import { app } from '../../modules/firebase';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { uploadImageToFirebaseStorage } from '../account/getPhoto';
import { Pagination } from './pagination';

const accountOrder = document.querySelector('.account__order');
const accountOrders = document.querySelector('.account__table-bottom-left');
const accountOrdersMobile = document.querySelector('.account__table-bottom-left-mobile');
const accountLeftWrapper = document.querySelector('.account-mobile__table');
const accountLeft = document.querySelector('.account__left');
export class Account {
  app: FirebaseApp;
  db: Firestore;
  usersArray: Users[];
  currentUser: User | null;

  constructor() {
    this.app = app;
    this.db = getFirestore(this.app);
    this.usersArray = [];
    this.currentUser = null;
    this.initAuth();
    this.renderAccountLeft();
  }

  initAuth() {
    const auth = getAuth();

    onAuthStateChanged(auth, (users) => {
      this.currentUser = users;

      if (users) {
        this.loadCards();
      } else {
        this.usersArray = [];
        this.renderUsers();
      }
    });
  }

  exitAccount() {
    const auth = getAuth();
    auth
      .signOut()
      .then(() => {
        console.log('Пользователь вышел из аккаунта');
      })
      .catch((error) => {
        console.error('Ошибка при выходе из аккаунта:', error);
      });
  }

  async renderAccountLeft() {
    const accountLeftSkeleton = document.querySelector('.account__left-skeleton');
    const querySnapshot = await getDocs(collection(this.db, 'users'));

    if (!this.currentUser) return;

    const userEmail = this.currentUser.email;

    querySnapshot.forEach((doc) => {
      const user = doc.data();

      if (user.email === userEmail) {
        const { name, photo } = user;

        let templateRenderLeft = `
            <div class="account__left-photo">
            
            <img src="${photo}" alt="bg" />
            
          </div>
          <p class="account__left-name">${name ? name : 'Пользователь'}</p>
        `;

        if (accountLeft) {
          accountLeft.insertAdjacentHTML('afterbegin', templateRenderLeft);
          accountLeftSkeleton?.classList.add('active');
        }
      }
    });

    this.settings();

    const exitButton = document.querySelector('.account__left-exit');

    exitButton?.addEventListener('click', (e) => {
      e.preventDefault();
      this.exitAccount();
    });
  }

  settings() {
    const buttonSettings = document.querySelector('.account__left-settings');
    const buttonOrders = document.querySelector('.account__left-order');
    const accountRight = document.querySelector('.account__right');
    const accountSettings = document.querySelector('.account__settings');
    const accountLeftWrapper = document.querySelector('.account__left-wrapper');
  
    const setActiveTab = (tab: string) => {
      if (tab === 'settings') {
        buttonSettings?.classList.add('active');
        buttonOrders?.classList.remove('active');
        accountRight?.classList.add('active');
        accountSettings?.classList.remove('active');
      } else if (tab === 'orders') {
        buttonOrders?.classList.add('active');
        buttonSettings?.classList.remove('active');
        accountRight?.classList.remove('active');
        accountSettings?.classList.add('active');
      }
    };
  
    const switchToSettings = () => {
      setActiveTab('settings');
      localStorage.setItem('selectedTab', 'settings');
    };
  
    const switchToOrders = () => {
      setActiveTab('orders');
      localStorage.setItem('selectedTab', 'orders');
    };
  
    buttonSettings?.addEventListener('click', switchToSettings);
    buttonOrders?.addEventListener('click', switchToOrders);
  
    accountLeftWrapper?.addEventListener('click', (e) => {
      const clickElement = e.target as HTMLElement;
      if (clickElement) {
        const clickContent = clickElement.textContent;
        if (clickContent && clickContent.includes('Настройки')) {
          switchToSettings();
        } else if (clickContent && clickContent.includes('Мои заказы')) {
          switchToOrders();
        }
      }
    });
  
    const selectedTab = localStorage.getItem('selectedTab');
  
    if (selectedTab) {
      setActiveTab(selectedTab);
    }
  }
  

  isChangeInput() {
    const input = document.querySelector('.account__settings-input input') as HTMLFormElement;
    const button = document.querySelector('.account__settings-button') as HTMLButtonElement;
    if (input.value === '') {
      button.disabled = true;
    }

    input?.addEventListener('input', () => {
      if (input.value === '' || input.value.length < 3 || input.value.length > 20) {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    });
  }

  async updateUserProfile(name: string, photo?: string) {
    try {
      if (!this.currentUser) throw new Error('No user is currently signed in.');

      const userDocRef = doc(this.db, 'users', this.currentUser.uid);
      await updateDoc(userDocRef, { name, photo });

      console.log('User profile updated successfully!');
      window.location.href = 'account.html';
    } catch (error) {
      console.error('Failed to update user profile:', error);
    }
  }

  async getFormData() {
    const form = document.querySelector('#settingsForm') as HTMLFormElement;
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const name = formData.get('name') as string;
      const photo = formData.get('photo') as File;

      let imageUrl: string | undefined;

      if (photo && photo.size > 0) {
        try {
          imageUrl = await uploadImageToFirebaseStorage(photo);
        } catch (error) {
          console.error('Failed to upload image to Firebase Storage:', error);
        }
      } else {
        const photoHtml = document.querySelector('.account__left-photo img') as HTMLImageElement;
        imageUrl = photoHtml.src;
      }

      await this.updateUserProfile(name, imageUrl);
    });
  }

  async loadCards() {
    if (!this.currentUser) return;
    const userEmail = this.currentUser.email;

    const querySnapshot = await getDocs(collection(this.db, 'users'));
    querySnapshot.forEach((doc) => {
      const users = doc.data().orders;
      users.forEach((user: Users) => {
        if (user.email === userEmail) {
          this.usersArray.push(user);
        }
      });
    });

    this.renderUsers();
    new Pagination(this.usersArray.length);
  }

  renderUsers() {
    this.usersArray.forEach((user, index) => {
      const { date, email, idOrder, payStatus, price } = user;

      let template = `
        <td>${idOrder}</td>
        <td>${price}</td>
        `;
      if (email.length < 20) {
        template += `
                <td>${email}</td>
            `;
      } else {
        template += `
            <td>${email.slice(0, 20) + '...'}</td>
        `;
      }
      template += `
        <td>
          ${payStatus == false ? `<p class="account__payment-processing">В обработке</p>` : `<p class="account__payment-success">Оплачено</p>`}
        </td>
        <td>${date}</td>
        `;
      const wrapperTemplate = `<tr class="order" id=${index} >${template}</tr>`;
      if (accountOrder) {
        accountOrder.insertAdjacentHTML('beforeend', wrapperTemplate);
      }

      let templateMobile = `
          <div id=${index} class="account-mobile__table-wrapper">
            <div class="account-mobile__table-left">
              <p class="account-mobile__table-left-number">Номер заказа</p>
              <p>Сумма</p>
              <p>E-mail</p>
              <p>Cтатус</p>
              <p>Дата</p>
            </div>
            <div class="account-mobile__table-right">
              <p class="account-mobile__table-right-number">${idOrder}</p>
              <p>${price}</p>
              `;
      if (email.length < 23) {
        templateMobile += `
                    <p>${email}</p>
                  `;
      } else {
        templateMobile += `
                  <p>${email.slice(0, 23) + '...'}</p>
              `;
      }
      templateMobile += `
              ${payStatus == false ? `<p class="account__payment-processing">В обработке</p>` : `<p class="account__payment-success">Оплачено</p>`}
              <p>${date}</p>
            </div>
          </div>
        `;

      if (accountLeftWrapper) {
        accountLeftWrapper.insertAdjacentHTML('beforeend', templateMobile);
      }
    });

    let ordersTotal = `
      <p>Показано <span>${this.usersArray.length > 9 ? 9 : this.usersArray.length}</span> из <span>${this.usersArray.length}</span></p>
    `;

    if (accountOrders) {
      accountOrders.insertAdjacentHTML('beforeend', ordersTotal);
    }

    let ordersTotalMobile = `
      <p>Показано <span>${this.usersArray.length > 9 ? 9 : this.usersArray.length}</span> из <span>${this.usersArray.length}</span></p>
    `;

    if (accountOrdersMobile) {
      accountOrdersMobile.insertAdjacentHTML('beforeend', ordersTotalMobile);
    }
  }
}
