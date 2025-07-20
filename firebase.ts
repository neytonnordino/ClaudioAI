// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCP091dTtD69r1ZFPJ2rPLiQXUgwolgVU",
  authDomain: "claudioai-e1875.firebaseapp.com",
  projectId: "claudioai-e1875",
  storageBucket: "claudioai-e1875.firebasestorage.app",
  messagingSenderId: "395529244369",
  appId: "1:395529244369:web:50896ebb7fa9b4206cfff0",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app )
export {db} 