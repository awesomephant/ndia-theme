import textBalancer from 'text-balancer';
import { initTools } from "./initTools.js.js";
import { initTooltips } from "./initTooltips.js";
import { markAbbreviations } from "./markAbbreviations.js";

window.addEventListener("DOMContentLoaded", () => {
  console.log(`%cSite by MK`, "color: gray")
  initTools();
  initTooltips()
  markAbbreviations()
  const descriptionToggles = document.querySelectorAll(".description__toggle")
  descriptionToggles.forEach(t => {
    t.addEventListener("click", e => {
      console.log(t.parentElement)
      let rest = t.parentElement
      if (rest.classList.contains("active")){
        rest.classList.remove("active")
        t.innerText = "Show more"
      } else {
        rest.classList.add("active")
        t.innerText = "Show less"
      }
    })
  })
  textBalancer.balanceText('.event__title, h2, h3, h4');
});