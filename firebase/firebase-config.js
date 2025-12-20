import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDa….",
  authDomain: "htori-erp.firebaseapp.com",
  projectId: "htori-erp",
  storageBucket: "htori-erp.appspot.com",
  messagingSenderId: "2917829146",
  appId: "1:2917829146:web:28129de92f"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
