console.log("app.js loaded");

import { db } from "./firebase.js";

import { 
  collection, addDoc, getDocs 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

window.showPage = function(page){
  if(page==="purchase") loadPurchasePage();
  if(page==="stock") loadStockPage();
};

/* PAGE LOADERS */
function loadPurchasePage(){
  document.getElementById("app").innerHTML=`
    <h2>Purchase</h2>
    <input id="p_code" placeholder="item code">
    <input id="p_qty" placeholder="qty" type="number">
    <button id="saveBtn">Save</button>

    <h3>Purchase List</h3>
    <table>
      <thead><tr><th>Code</th><th>Qty</th></tr></thead>
      <tbody id="purchaseBody"></tbody>
    </table>
  `;

  document.getElementById("saveBtn").onclick = savePurchase;
  loadPurchaseList();
}

function loadStockPage(){
  document.getElementById("app").innerHTML=`
    <h2>Stock</h2>
    <table>
      <thead><tr><th>Code</th><th>Qty</th></tr></thead>
      <tbody id="stockBody"></tbody>
    </table>
  `;

  loadStockList();
}

/* SAVE PURCHASE */
async function savePurchase(){

  const code=document.getElementById("p_code").value;
  const qty =Number(document.getElementById("p_qty").value);

  await addDoc(collection(db,"purchase"),{
    code,
    qty,
    createdAt:Date.now()
  });

  loadPurchaseList();
}

/* FETCH PURCHASE */
async function loadPurchaseList(){
  const tbody=document.getElementById("purchaseBody");
  tbody.innerHTML="";

  const snap = await getDocs(collection(db,"purchase"));

  snap.forEach(doc=>{
    const d=doc.data();
    tbody.insertAdjacentHTML("beforeend",`
      <tr><td>${d.code}</td><td>${d.qty}</td></tr>
    `);
  });
}

/* FETCH STOCK */
async function loadStockList(){
  const tbody=document.getElementById("stockBody");
  tbody.innerHTML="";

  const snap = await getDocs(collection(db,"stock"));

  snap.forEach(doc=>{
    const d=doc.data();
    tbody.insertAdjacentHTML("beforeend",`
      <tr><td>${d.code}</td><td>${d.qty}</td></tr>
    `);
  });
}

/* INITIAL PAGE */
showPage("purchase");
