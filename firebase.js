import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

import { 
  getFirestore 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyARxh0wfAo2RMz_-3KsWUUQYfND_F3_3fI",
  authDomain: "htori-erp-38ed1.firebaseapp.com",
  projectId: "htori-erp-38ed1",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
