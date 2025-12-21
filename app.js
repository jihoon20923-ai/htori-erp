console.log("app.js loaded");

import { db } from "./firebase.js";

function showPage(page){
  if(page==="purchase") loadPurchasePage();
  if(page==="stock") loadStockPage();
}

function loadPurchasePage(){
  document.getElementById("app").innerHTML = `
    <h2>Purchase</h2>
    <input id="p_code" placeholder="item code">
    <input id="p_qty" placeholder="qty">
    <button onclick="savePurchase()">Save</button>

    <h3>Purchase List</h3>
    <table border="1" width="100%">
      <thead><tr><th>Code</th><th>Qty</th></tr></thead>
      <tbody id="purchaseBody"></tbody>
    </table>
  `;
}

function loadStockPage(){
  document.getElementById("app").innerHTML = `
    <h2>Stock</h2>
    <table border="1" width="100%">
      <thead><tr><th>Code</th><th>Qty</th></tr></thead>
      <tbody id="stockBody"></tbody>
    </table>
  `;
}
import { collection, addDoc, getDocs } 
from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

window.savePurchase = async function(){

  const code = document.getElementById("p_code").value;
  const qty  = Number(document.getElementById("p_qty").value);

  await addDoc(collection(db,"purchase"),{
    code,
    qty,
    createdAt: Date.now()
  });

  loadPurchaseList();
}
async function loadPurchaseList(){
  const tbody=document.getElementById("purchaseBody");

  const snap = await getDocs(collection(db,"purchase"));
  tbody.innerHTML="";

  snap.forEach(doc=>{
    const d=doc.data();
    tbody.innerHTML+=`
      <tr><td>${d.code}</td><td>${d.qty}</td></tr>
    `;
  });
}
async function loadStockList(){
  const tbody=document.getElementById("stockBody");

  const snap = await getDocs(collection(db,"stock"));
  tbody.innerHTML="";

  snap.forEach(doc=>{
    const d=doc.data();
    tbody.innerHTML+=`
      <tr><td>${d.code}</td><td>${d.qty}</td></tr>
    `;
  });
}
showPage("purchase");
