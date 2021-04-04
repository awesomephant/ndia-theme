function initExhibitions() {
  const container = document.querySelector(".exhibitions")
  if (!container) {
    return;
  }
  const controls = container.querySelectorAll(".exhibitions__nav a")
  const panels = container.querySelectorAll(".exhibitions__panel")
  let currentTab = 0;

  function getTabByHref(href) {
    //    console.log(`looking for ${href}`)
    let index = 0;
    controls.forEach((c, i) => {
      if (c.getAttribute("href").replace("#", "") === href.replace("#", "")) {
        // console.log(`found at ${i}`)
        index = i
      }
    })
    return index;
  }

  function setTab(index) {
    if (!panels[index]) {
      console.error(`Panel index ${index} is out of bounds`)
      return;
    }
    panels.forEach(p => {
      p.classList.remove("active")
    })
    controls.forEach(c => {
      c.setAttribute("aria-selected", "false")
    })
    controls[index].setAttribute("aria-selected", "true")
    panels[index].classList.add("active")
    location.hash = controls[index].getAttribute("href")
    currentTab = index;
  }

  controls.forEach((c, i) => {
    c.addEventListener("click", () => {
      setTab(i)
    })
  })
  // We need some extra logic here because not all tabs are present, all the time.
  if (location.hash.toLowerCase() === "#current") {
    setTab(getTabByHref("current"))
  } else if (location.hash.toLowerCase() === "#upcoming") {
    setTab(getTabByHref("upcoming"))
  } else if (location.hash.toLowerCase() === "#past") {
    setTab(getTabByHref("past"))
  } else {
    setTab(0)
  }

}

export { initExhibitions };
