import { loadPage } from "./router.js";

function initRouter(){
  if(!window.location.hash){
    window.location.hash = "#/dashboard";
  }
  loadPage();
}

window.addEventListener("load", initRouter);
window.addEventListener("hashchange", loadPage);
