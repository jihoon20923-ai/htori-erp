// stock.js (root 폴더)

console.log("stock.js loaded");

import { db } from "./firebase/firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Save item
const itemForm = document.getElementById("itemForm");

itemForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const code = document.getElementById("itemCode").value;
  const name = document.getElementById("itemName").value;
  const qty = Number(document.getElementById("itemQty").value);
  const uom = document.getElementById("itemUom").value;
  const location = document.getElementById("itemLoc").value;

  try {
    await addDoc(collection(db, "items"), {
      code,
      name,
      qty,
      uom,
      location,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log("addDoc success");
  } catch (err) {
    console.error("addDoc error:", err);
  }

  loadItems();
  itemForm.reset();
});

// Load items list
async function loadItems(){
  console.log("loadItems started");

  try{
    const qSnapshot = await getDocs(collection(db, "items"));
    console.log("getDocs finished");
    console.log("docs returned =", qSnapshot.size);

    const tbody = document.getElementById("itemsTableBody");
    tbody.innerHTML = "";

    qSnapshot.forEach(docSnap => {
      const item = docSnap.data();

      tbody.innerHTML += `
        <tr>
          <td>${item.code}</td>
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>${item.uom}</td>
          <td>${item.location}</td>
          <td><button onclick="editItem('${docSnap.id}')">Edit</button></td>
          <td><button onclick="delItem('${docSnap.id}')">Delete</button></td>
        </tr>
      `;
    });

  } catch(err) {
    console.error("loadItems error:", err);
  }
}

// Delete doc
window.delItem = async (id)=>{
  try{
    await deleteDoc(doc(db, "items", id));
    console.log("delete success:", id);
    loadItems();
  } catch(err){
    console.error("delete error:", err);
  }
};

setTimeout(loadPOs, 0);
