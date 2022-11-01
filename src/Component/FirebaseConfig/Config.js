// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM-GxU3nka5O61c2GhhYm4yzUdDP5TjhQ",
  authDomain: "advancequizapp-f07fc.firebaseapp.com",
  projectId: "advancequizapp-f07fc",
  storageBucket: "advancequizapp-f07fc.appspot.com",
  messagingSenderId: "472678132350",
  appId: "1:472678132350:web:c6e0eae5a20bd48851462f",
  measurementId: "G-7VEDE0848Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app