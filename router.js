export const routes = {
  dashboard:"./pages/dashboard.html",
  purchase:"./pages/purchase.html",
  stock:"./pages/stock.html",
  production:"./pages/production.html",
  bom:"./pages/bom.html",
  defect:"./pages/defect.html",
  outsource:"./pages/outsource.html",
  employee:"./pages/employee.html"
};

export function loadPage(){
  const hash = window.location.hash.substring(2) || "dashboard";
  fetch(routes[hash])
    .then(res => res.text())
    .then(html => {
      document.getElementById("app").innerHTML = html;
    });
}
