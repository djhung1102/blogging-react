import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAb2sWs85Li-CKRdXOf80Y_ha3k8HszEkI",
    authDomain: "blogging-438e0.firebaseapp.com",
    projectId: "blogging-438e0",
    storageBucket: "blogging-438e0.appspot.com",
    messagingSenderId: "522183399055",
    appId: "1:522183399055:web:4090fe0a9b1fb3e301c2fa",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
