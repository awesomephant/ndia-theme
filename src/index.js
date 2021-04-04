import { initExhibitions } from './initExhibitions';
import { initImages } from './initImages';
import { initMenu } from './initMenu';
const { initLightbox } = require("./initLightbox");

window.addEventListener("DOMContentLoaded", () => {
  console.log(`%cSite by MK`, "color: gray")
  initLightbox()
  initExhibitions()
  initImages();
  initMenu();

  function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio === 0){
        document.body.classList.add("scrolled")
      } else if (entry.intersectionRatio > .1){
        document.body.classList.remove("scrolled")
      }
    });
  }

  function createScrollObserver() {
    let observer;
    const header = document.querySelector(".header")
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: [0, .5, .8, 1]
    };
    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(header);
  }

  createScrollObserver()
});
