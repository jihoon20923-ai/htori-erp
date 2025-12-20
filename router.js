const base = "/htori-erp";

const routes = {
  dashboard:  `${base}/pages/dashboard.html`,
  purchase:   `${base}/pages/purchase.html`,
  stock:      `${base}/pages/stock.html`,
  production: `${base}/pages/production.html`,
  bom:        `${base}/pages/bom.html`,
  defect:     `${base}/pages/defect.html`,
  outsource:  `${base}/pages/outsource.html`,
  employee:   `${base}/pages/employee.html`
};
async function loadItems(){
  try {
    console.log("loadItems called");
    const qSnapshot = await getDocs(collection(db,"items"));
    console.log("qSnapshot size =", qSnapshot.size);

    const tbody = document.getElementById("itemsTableBody");
    tbody.innerHTML = "";
      } catch(err){
    console.error("loadItems error:", err);
  }
}
