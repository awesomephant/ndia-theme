import { mk_initToolbar } from "./mk.js";
import textBalancer from 'text-balancer';
import { initTools } from "./initTools.js.js";
import { initTooltips } from "./initTooltips.js";

window.addEventListener("DOMContentLoaded", () => {
  console.log(`%cSite by MK`, "color: gray")
  mk_initToolbar();
  initTools();
  initTooltips()
  textBalancer.balanceText('.event__title, h2, h3, h4');
});