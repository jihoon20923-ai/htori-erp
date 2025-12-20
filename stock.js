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

itemForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const code = document.getElementById("itemCode").value;
  const name = document.getElementById("itemName").value;
  const qty = Number(document.getElementById("itemQty").value);
  const uom = document.getElementById("itemUom").value;
  const location = document.getElementById("itemLoc").value;

  await addDoc(collection(db, "items"), {
    code,
    name,
    qty,
    uom,
    location,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  loadItems();
  itemForm.reset();
});


async function loadItems(){
  const qSnapshot = await getDocs(collection(db,"items"));

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
}

window.delItem = async (id)=>{
  await deleteDoc(doc(db,"items",id));
  loadItems();
};

window.onload = loadItems;
