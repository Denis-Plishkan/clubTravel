
import { app } from "../../modules/firebase";
import { getAuth, Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FirebaseApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { fbUser } from "../../type";
 
export class Registration {
  app: FirebaseApp;
  auth: Auth;

  constructor() {
    this.app = app;
    this.auth = getAuth();
    this.registrationWithEmail = this.registrationWithEmail.bind(this);
    this.registrationWithGoogle = this.registrationWithGoogle.bind(this);
  }

  registrationWithEmail() {
    const emailInput = document.querySelector("#registrationMail") as HTMLInputElement;
    const email = emailInput.value;
    const passwordInput = document.querySelector("#registrationPassword") as HTMLInputElement;
    const password = passwordInput.value;
    const repeatPasswordInput = document.querySelector("#registrationRepeatPassword") as HTMLInputElement;

    if (password !== repeatPasswordInput.value) {
      return;
    }

    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userData) => {
        const user = userData.user;
        const userDataWithEmail: fbUser = {
          email: user.email || '',
          name: '',
          photo: '',
          orders: []
        };
        
        this.addUserToFirebase(user.uid, userDataWithEmail)
          .then(() => {
            emailInput.value = '';
            passwordInput.value = '';
            repeatPasswordInput.value = '';

            window.location.href = 'account.html';
            console.log("Registration with email successful:", user);
          })
          .catch((error) => {
            console.error("Error adding user to Firebase: ", error);
          }) 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Registration with email failed:", errorCode, errorMessage);
      });
  }

    registrationWithGoogle() {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(this.auth, googleProvider)
      .then((result) => {
        const user = result.user;
        const userDataWithGoogle: fbUser = {
          email: user.email || '',
          name: user.displayName || '',
          photo: user.photoURL || '',
          orders: []
        };

       this.addUserToFirebase(user.uid, userDataWithGoogle)
        .then(() => {
          window.location.href = 'account.html';
          console.log("Registration with Google successful:", user);
        })
          .catch((error) => {
            console.error("Error adding user to Firebase: ", error);
          })
        
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Registration with Google failed:", errorCode, errorMessage);
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