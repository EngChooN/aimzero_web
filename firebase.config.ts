import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

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

export const authService = getAuth(app);
export const dbService = getFirestore();
export const realtimeDbService = getDatabase();
