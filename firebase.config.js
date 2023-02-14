import firebase from "firebase/app";
import "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1hNPgZA9WN9x9Gsxjc4nhMJyHD2Uf7WA",
  authDomain: "aimzero-web.firebaseapp.com",
  projectId: "aimzero-web",
  storageBucket: "aimzero-web.appspot.com",
  messagingSenderId: "970182175469",
  appId: "1:970182175469:web:7802d2d8cc298917a37ae4",
  measurementId: "G-850R54ZMNQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = firebase.auth();
