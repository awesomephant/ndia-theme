import { initToolbar } from "./initToolbar";
import textBalancer from 'text-balancer';

window.addEventListener("DOMContentLoaded", () => {
  console.log(`%cSite by MK`, "color: gray")
  initToolbar();
  textBalancer.balanceText('.event__title');
});
