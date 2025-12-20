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

export async function loadPage(){
  const hash = window.location.hash.substring(2) || "dashboard";

  const html = await fetch(routes[hash]).then(res=>res.text());
  document.getElementById("app").innerHTML = html;

  // 페이지 js 자동 로딩
  loadPageScript(hash);
}

function loadPageScript(hash){
  const script = document.createElement("script");
  script.type="module";
  script.src = `/htori-erp/${hash}.js`;
  document.body.appendChild(script);
}
