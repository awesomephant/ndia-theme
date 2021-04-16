function initTools() {
  const toolbar = document.querySelector(".toolbar");
  const groups = toolbar.querySelectorAll(".options-group")
  groups.forEach(group => {
    const options = group.querySelectorAll("input")
    const setting = group.getAttribute("data-setting")
    options.forEach(o => {
      o.addEventListener("change", e => {
        const value = o.getAttribute("value")
        document.cookie = `${setting}=${value}; samesite=strict;path=/`;
        document.body.setAttribute(`data-${setting}`, value)
      })
    })
  })

}
export { initTools };
