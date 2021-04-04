function initMenu() {
    const toggle = document.querySelector(".nav__toggle")
    const menu = document.querySelector(".nav--small")
    let isOpen = false;

    toggle.addEventListener("click", () => {
        if (isOpen){
            menu.classList.remove("open")
            document.body.classList.remove("nav-open")
            isOpen = false
        } else {
            menu.classList.add("open")
            document.body.classList.add("nav-open")
            isOpen = true
        }
    })
}

export { initMenu }