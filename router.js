// router.js

const base = "/htori-erp";   // 반드시 repository 이름과 동일해야 함

// HTML fragment 경로 매핑
const routes = {
  dashboard:  `${base}/pages/dashboard.html`,
  purchase:   `${base}/pages/purchase.html`,
  stock:      `${base}/pages/stock.html`,
  production: `${base}/pages/production.html`,
  bom:        `${base}/pages/bom.html`,
  defect:     `${base}/pages/defect.html`,
  outsource:  `${base}/pages/outsource.html`,
  employee:   `${base}/pages/employee.html`
  movement: `${base}/pages/movement.html`,
};

export async function loadPage(){

  const hash = window.location.hash.substring(2) || "dashboard";

  fetch(routes[hash])
    .then(res=>res.text())
    .then(html=>{

      // 페이지 HTML 삽입
      document.getElementById("app").innerHTML = html;

      // DOM 삽입 완료 이후 script attach 보장
      setTimeout(()=>{
        loadPageScript(hash);
      },0);
    })
    .catch(err=>{
      console.error("loadPage error:", err);
    });
}


/* 해당 페이지의 js 파일 자동 로드 */
function loadPageScript(hash){

  const scriptPath = `${base}/${hash}.js`;

  // script 존재 여부 확인 후 attach
  fetch(scriptPath)
    .then(res=>{
      if(res.ok){
        const script = document.createElement("script");
        script.type = "module";
        script.src = scriptPath;
        document.body.appendChild(script);
      }
    })
    .catch(()=>{});
}
