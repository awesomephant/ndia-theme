function mk_initToolbar() {
  const toolbar = document.querySelector(".mk-toolbar")
  const gridStatus = document.querySelector("#grid-status")
  let gridIsActive = false
  toolbar.classList.toggle("active")
  window.addEventListener("keyup", e => {
    if (e.key === "t") {
      toolbar.classList.toggle("active")
    }
    if (e.key === "g") {
      if (gridIsActive) {
        document.body.classList.remove("mk-grid-active")
        gridStatus.innerText = "Off"
        gridIsActive = false
      } else {
        gridStatus.innerText = "On"
        document.body.classList.add("mk-grid-active")
        gridIsActive = true
      }
    }
  })

}
export { mk_initToolbar };
