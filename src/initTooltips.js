function initTooltips() {
  const tooltips = document.querySelectorAll(".button--tooltip")
  tooltips.forEach(tooltip => {
    const trigger = tooltip.querySelector(".button")
    trigger.addEventListener("click", e => {
      e.preventDefault()
      tooltip.classList.toggle("open")
    })
  })
}

export { initTooltips };
