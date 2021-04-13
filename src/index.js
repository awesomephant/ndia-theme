import { mk_initToolbar } from "./mk.js";
import textBalancer from 'text-balancer';
import { initTools } from "./initTools.js.js";

window.addEventListener("DOMContentLoaded", () => {
  console.log(`%cSite by MK`, "color: gray")
  mk_initToolbar();
  initTools();
  textBalancer.balanceText('.event__title, h3, h4');
});