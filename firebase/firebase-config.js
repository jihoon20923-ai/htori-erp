import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey:"YOUR_KEY",
  authDomain:"YOUR_PROJECT.firebaseapp.com",
  projectId:"YOUR_PROJECT_ID",
  storageBucket:"YOUR_PROJECT.appspot.com",
  messagingSenderId:"XXXX",
  appId:"XXXX"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
