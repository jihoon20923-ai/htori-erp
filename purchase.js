console.log("purchase.js loaded");

import { db } from "./firebase/firebase-config.js";
import { 
  collection, addDoc, getDocs, updateDoc, doc, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

/* Add PO row */
document.getElementById("addRowBtn").addEventListener("click", e=>{
  e.preventDefault();
  const tbody = document.getElementById("poItemsBody");
  tbody.insertAdjacentHTML("beforeend",`
    <tr>
      <td><input class="poCode"></td>
      <td><input class="poQty" type="number"></td>
      <td><input class="poPrice" type="number"></td>
    </tr>
  `);
});

/* Save PO */
document.getElementById("poForm").addEventListener("submit", async e=>{
  e.preventDefault();

  const poNumber = document.getElementById("poNumber").value;
  const supplier = document.getElementById("supplier").value;

  const rows = document.querySelectorAll("#poItemsBody tr");

  let items = [];

  rows.forEach(r=>{
    const code = r.querySelector(".poCode").value;
    const qty = Number(r.querySelector(".poQty").value);
    const unitPrice = Number(r.querySelector(".poPrice").value);

    if(code){
      items.push({code, qty, unitPrice});
    }
  });

  await addDoc(collection(db,"purchase_orders"), {
    poNumber,
    supplier,
    items,
    status:"pending",
    createdAt: serverTimestamp()
  });

  loadPOs();
});


/* Approve PO */
window.approvePO = async (id)=>{
  await updateDoc(doc(db,"purchase_orders", id),{
    status:"approved",
    updatedAt: serverTimestamp()
  });
  loadPOs();
};


/* Receive PO */
window.receivePO = async (id)=>{
  const docRef = doc(db,"purchase_orders",id);
  const snap = await getDoc(docRef);
  const po = snap.data();

  for(const item of po.items){
    await addStock(item.code, item.qty);
  }

  await updateDoc(docRef,{
    status:"received",
    updatedAt: serverTimestamp()
  });

  loadPOs();
};

/* Stock + increase */
async function addStock(code, qty) {
  const qSnap = await getDocs(collection(db,"items"));
  let id = null;
  let current = 0;

  qSnap.forEach(d=>{
    const data = d.data();
    if(data.code == code){
      id = d.id;
      current = data.qty;
    }
  });

  if(id){
    await updateDoc(doc(db,"items",id),{
      qty: current + qty,
      updatedAt: serverTimestamp()
    });
  }
}


/* Load PO list */
async function loadPOs(){

  const filterSupplier = document.getElementById("filterSupplier").value;
  const tbody = document.getElementById("poTableBody");
  tbody.innerHTML="";

  const qSnapshot = await getDocs(collection(db,"purchase_orders"));

  qSnapshot.forEach(docSnap=>{
    const po = docSnap.data();
    if(filterSupplier && !po.supplier.includes(filterSupplier)) return;

    tbody.insertAdjacentHTML("beforeend",`
      <tr>
        <td>${po.poNumber}</td>
        <td>${po.supplier}</td>
        <td>${po.items.map(i=>`${i.code} (${i.qty} @${i.unitPrice})`).join(", ")}</td>
        <td>${po.status}</td>
        <td>${po.createdAt?.toDate().toLocaleString()}</td>
        <td><button onclick="approvePO('${docSnap.id}')">Approve</button></td>
        <td><button onclick="receivePO('${docSnap.id}')">Receive</button></td>
      </tr>
    `)
  });
}

setTimeout(loadPOs, 0);
