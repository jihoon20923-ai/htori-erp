import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARxh0wfAo2RMz_-3KsWUUQYfND_F3_3fI",
  authDomain: "htori-erp-38ed1.firebaseapp.com",
  databaseURL: "https://htori-erp-38ed1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "htori-erp-38ed1",
  storageBucket: "htori-erp-38ed1.firebasestorage.app",
  messagingSenderId: "653618187246",
  appId: "1:653618187246:web:cfdf888e1bbb3106cedcff",
  measurementId: "G-Z3J1NW0KQE"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
