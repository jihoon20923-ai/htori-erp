import { loadPage } from "./router.js";

window.addEventListener("load", () => loadPage());
window.addEventListener("hashchange", () => loadPage());
