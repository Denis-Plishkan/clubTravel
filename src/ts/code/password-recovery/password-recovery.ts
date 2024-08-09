import { app } from "../../modules/firebase";
import { getAuth, Auth, sendPasswordResetEmail } from "firebase/auth";
import { FirebaseApp } from "firebase/app";

export class PasswordRecovery {
  app: FirebaseApp;
  auth: Auth;

  constructor() {
    this.app = app;
    this.auth = getAuth();
    this.passwordRecovery = this.passwordRecovery.bind(this);
  }

  passwordRecovery() {
    const emailInput = document.querySelector(
      "#passwordRecoveryMail",
    ) as HTMLInputElement;
    const email = emailInput.value;

    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        alert("Password reset email sent. Please check your inbox.");
        window.location.href = 'authorization.html';
        emailInput.value = "";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Password reset failed:", errorCode, errorMessage);
        alert("Password reset failed. Please try again later.");
      });
  }
}
