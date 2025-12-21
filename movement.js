console.log("movement.js loaded");

import { db } from "./firebase/firebase-config.js";

import{
  collection, getDocs
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

async function loadMoves(){
  const tbody = document.getElementById("moveBody");
  tbody.innerHTML ="";

  const qSnapshot = await getDocs(collection(db,"stock_movements"));

  qSnapshot.forEach(docSnap=>{
    const data = docSnap.data();

    tbody.insertAdjacentHTML("beforeend",`
      <tr>
        <td>${data.itemCode}</td>
        <td>${data.changeQty}</td>
        <td>${data.type}</td>
        <td>${data.ref}</td>
        <td>${data.timestamp?.toDate().toLocaleString()}</td>
      </tr>
    `);
  });
}

setTimeout(loadMoves,0);
