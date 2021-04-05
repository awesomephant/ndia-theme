function initTools() {
  const toolbar = document.querySelector(".toolbar");
  const options = toolbar.querySelectorAll("input")
  options.forEach(o => {
    o.addEventListener("change", e => {
      const setting = o.getAttribute("name")
      document.body.setAttribute(`data-${setting}`, o.getAttribute("value"))
    })
  })

}
export { initTools };
