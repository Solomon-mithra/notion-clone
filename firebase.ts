// Import the functions you need from the SDKs you need
import { getApps, initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7UqoOtSns-OPQQJ64SZPcZPRyR3udMCU",
  authDomain: "notion-clone-8ed31.firebaseapp.com",
  projectId: "notion-clone-8ed31",
  storageBucket: "notion-clone-8ed31.firebasestorage.app",
  messagingSenderId: "1082087606489",
  appId: "1:1082087606489:web:21d32e01a8a4d773f956c8",
  measurementId: "G-ENVEW024MD"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export {db};