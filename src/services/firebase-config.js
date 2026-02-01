// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See README_FIREBASE.md for instructions on how to get these values
const firebaseConfig = {
    apiKey: "AIzaSyAdiN3OZBSwNbzbvlVvW1k9p3InbO7x33U",
    authDomain: "sindinor-app.firebaseapp.com",
    projectId: "sindinor-app",
    storageBucket: "sindinor-app.firebasestorage.app",
    messagingSenderId: "1054363188873",
    appId: "1:1054363188873:web:239217906b83753a631058deer   "
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
