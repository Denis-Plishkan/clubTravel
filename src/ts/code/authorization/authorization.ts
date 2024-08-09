import { app } from '../../modules/firebase';
import { getAuth, Auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { fbUser } from '../../type';

export class Authorization {
  app: FirebaseApp;
  auth: Auth;

  constructor() {
    this.app = app;
    this.auth = getAuth();
    this.authorizationWithEmail = this.authorizationWithEmail.bind(this);
    this.authorizationWithGoogle = this.authorizationWithGoogle.bind(this);
  }

  authorizationWithEmail() {
    const emailInput = document.querySelector('#authorizationMail') as HTMLInputElement;
    const email = emailInput.value;
    const passwordInput = document.querySelector('#authorizationPassword') as HTMLInputElement;
    const password = passwordInput.value;

    signInWithEmailAndPassword(this.auth, email, password)
      .then((userData) => {
        const user = userData.user;

        window.location.href = 'account.html';
        emailInput.value = '';
        passwordInput.value = '';
        console.log('User signed in:', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Почта или пароль введены неверно');
        console.error('Login failed:', errorCode, errorMessage);
      });
  }

  authorizationWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(this.auth, provider)
      .then((result) => {
        const user = result.user;
        const userDataWithGoogle: fbUser = {
          email: user.email || '',
          name: user.displayName || '',
          photo: user.photoURL || '',
          orders: [],
        };

        this.addUserToFirebase(user.uid, userDataWithGoogle)
          .then(() => {
            window.location.href = 'account.html';
            console.log('Authorization with Google successful. UID:', user.uid);
          })
          .catch((error) => {
            console.error('Error adding user to Firebase: ', error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Не удалось войти с помощью Google');
        console.error('Login failed:', errorCode, errorMessage);
      });
  }

  async addUserToFirebase(uid: string, userData: fbUser) {
    const db = getFirestore(app);
    const userRef = doc(collection(db, 'users'), uid);

    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      console.log('User document already exists. Skipping addition.');
      return;
    }

    await setDoc(userRef, userData)
      .then(() => {
        console.log('Document written with UID as documentId:', uid);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }
}
