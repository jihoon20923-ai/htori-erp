import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

import { 
  getFirestore 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
