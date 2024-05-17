// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAeshQupW3-FWiSHAf4EK6fYu93hSgpOnA",
    authDomain: "oss24-9d001.firebaseapp.com",
    databaseURL: "https://oss24-9d001-default-rtdb.firebaseio.com",
    projectId: "oss24-9d001",
    storageBucket: "oss24-9d001.appspot.com",
    messagingSenderId: "796041330666",
    appId: "1:796041330666:web:0f4519d59f0d595df73c93",
    measurementId: "G-0Y8W999ZH4"
  };

console.log(firebaseConfig.apiKey);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(app);