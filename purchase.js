// purchase.js

console.log("purchase.js loaded");

import { db } from "./firebase/firebase-config.js";
import { 
  collection, addDoc, getDocs, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const poForm = document.getElementById("poForm");

poForm.addEventListener("submit", async (e)=>{
  e.preventDefault();

  const poNumber = document.getElementById("poNumber").value;
  const supplier = document.getElementById("supplier").value;
  const itemCode = document.getElementById("itemCode").value;
  const itemQty = Number(document.getElementById("itemQty").value);
  const unitPrice = Number(document.getElementById("unitPrice").value);

  try{
    await addDoc(collection(db,"purchase_orders"), {
      poNumber,
      supplier,
      items:[
        { code:itemCode, qty:itemQty, unitPrice }
      ],
      status:"open",
      createdAt: serverTimestamp()
    });
    console.log("PO Added");
  } catch(err){
    console.error("add PO error:", err);
  }

  loadPOs();
  poForm.reset();
});


async function loadPOs(){
  console.log("loadPO called");
  const qSnapshot = await getDocs(collection(db,"purchase_orders"));

  const tbody = document.getElementById("poTableBody");
  tbody.innerHTML = "";

  qSnapshot.forEach(docSnap =>{
    const po = docSnap.data();
    tbody.innerHTML += `
      <tr>
        <td>${po.poNumber}</td>
        <td>${po.supplier}</td>
        <td>${po.items.map(i=>`${i.code}:${i.qty}`).join(", ")}</td>
        <td>${po.status}</td>
        <td>${po.createdAt?.toDate().toLocaleString() || ""}</td>
      </tr>
    `;
  });
}

window.onload = loadPOs;
