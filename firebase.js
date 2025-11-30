import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD1O8MltMEonyhbOXxYt1qN_PqQ9BqpI4M",
  authDomain: "htori-erp.firebaseapp.com",
  databaseURL: "https://htori-erp-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "htori-erp",
  storageBucket: "htori-erp.firebasestorage.app",
  messagingSenderId: "548265375862",
  appId: "1:548265375862:web:01acd31b9c4c42cfc6c757"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
