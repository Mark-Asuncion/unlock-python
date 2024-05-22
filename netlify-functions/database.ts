import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const FIREBASE_CFG = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENTID,
};

export function dbInit() {
    const app = initializeApp(FIREBASE_CFG);
    const db = getFirestore(app);
    return db;
}

