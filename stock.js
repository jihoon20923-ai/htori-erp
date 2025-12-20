// stock.js

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

const itemForm = document.getElementById("itemForm");

/* SAVE item */
if(itemForm){
  itemForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const code = document.getElementById("itemCode").value;
    const name = document.getElementById("itemName").value;
    const qty = Number(document.getElementById("itemQty").value);
    const uom = document.getElementById("itemUom").value;
    const location = document.getElementById("itemLoc").value;

    try{
      await addDoc(collection(db, "items"), {
        code,
        name,
        qty,
        uom,
        location,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      console.log("item saved");

      loadItems();
      itemForm.reset();

    } catch(err){
      console.error("add error:", err);
    }
  });
}


/* LOAD list */
async function loadItems(){

  console.log("loadItems start");

  try{
    const qSnapshot = await getDocs(collection(db, "items"));

    const tbody = document.getElementById("itemsTableBody");
    if(!tbody){
      console.warn("tbody not found");
      return;
    }

    tbody.innerHTML = "";

    qSnapshot.forEach(docSnap => {

      const item = docSnap.data();

      tbody.insertAdjacentHTML("beforeend", `
        <tr>
          <td>${item.code}</td>
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>${item.uom}</td>
          <td>${item.location}</td>
          <td><button onclick="delItem('${docSnap.id}')">Delete</button></td>
        </tr>
      `);
    });

  } catch(err){
    console.error("loadItems error:", err);
  }
}


/* DELETE item */
window.delItem = async (id)=>{
  await deleteDoc(doc(db,"items",id));
  console.log("deleted:", id);
  loadItems();
};


/* EXECUTE when script loaded after DOM inserted */
setTimeout(loadItems, 0);
