// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
import {getFirestore} from 'firebase/firestore';
import {getDatabase} from 'firebase/database';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmCm5l1oSJOaUyoYnj_IywJi9Nz1bRe50",
  authDomain: "printloader-3f823.firebaseapp.com",
  databaseURL: "https://printloader-3f823-default-rtdb.firebaseio.com",
  projectId: "printloader-3f823",
  storageBucket: "printloader-3f823.appspot.com",
  messagingSenderId: "199442356933",
  appId: "1:199442356933:web:a5533e2db6f34b364ceeac",
  measurementId: "G-L0VC6MN2RT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore();

export const storage = getStorage(app);

export const rtdb = getDatabase(app);

export const auth = getAuth(app);  