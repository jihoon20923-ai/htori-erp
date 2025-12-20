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

export function loadPage(){
  const hash = window.location.hash.substring(2) || "dashboard";
  fetch(routes[hash])
    .then(res => res.text())
    .then(html => {
      document.getElementById("app").innerHTML = html;
    })
    .catch(err => {
      console.error("loadPage error:", err);
    });
}
