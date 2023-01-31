// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import App from "./App";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNidgwcc6qr0SjnKEdwa7xMBv03Kuv1ow",
  authDomain: "tugasbesar-67840.firebaseapp.com",
  projectId: "tugasbesar-67840",
  storageBucket: "tugasbesar-67840.appspot.com",
  messagingSenderId: "1089091638830",
  appId: "1:1089091638830:web:9a5f9f584eb55bec7c31bf",
  measurementId: "G-ECQX6FRLWT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
