import Cookies from 'js-cookie';

function initTools() {
  const toolbar = document.querySelector(".toolbar");
  const groups = toolbar.querySelectorAll(".options-group")
  groups.forEach(group => {
    const options = group.querySelectorAll("input")
    const setting = group.getAttribute("data-setting")
    options.forEach(o => {
      o.addEventListener("change", e => {
        const value = o.getAttribute("value")
        Cookies.set(setting, value, { secure: true, sameSite: "strict" });
        document.body.setAttribute(`data-${setting}`, value)
      })
    })
  })


  // Set dark/contrast colour theme if user has darkmode enabled and no
  // other colour theme is set. We don't need to do the same for light mode
  // because light/contrast is teh default anyway.
  
  if (window.matchMedia('(prefers-color-scheme: dark)').matches && Cookies.get("colour") == undefined) {
    Cookies.set("colour", "dark-contrast", { secure: true, sameSite: "strict" });
    document.body.setAttribute("data-colour", "dark-contrast")
  }

}
export { initTools };
