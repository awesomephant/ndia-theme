function initLightbox() {
  const mediaItems = document.querySelectorAll(".gallery__item img");
  const lightbox = document.querySelector(".lightbox");
  if (!lightbox || mediaItems.length < 2) {
    return;
  }
  const slidesContainer = lightbox.querySelector(".lightbox__slides")
  const slides = lightbox.querySelectorAll(".lightbox__slide")
  const close = lightbox.querySelector("#js-close")
  const prev = lightbox.querySelector("#js-prev")
  const next = lightbox.querySelector("#js-next")
  const indexEl = lightbox.querySelector(".lightbox__index")
  let currentSlide = 0;
  let lastTouch = { x: 0, y: 0, delta: 0 }
  let lastTouchedInner = null;

  function handleKeyboardNavigation(e) {
    e.preventDefault();
    if (e.key === "Escape") {
      closeLightbox();
    }
    if (e.key === "ArrowLeft") {
      advanceLightbox(-1)
    }
    if (e.key === "ArrowRight") {
      advanceLightbox(1)
    }
  }

  function setSlide(index) {
    if (!slides[index]) {
      console.error("Slide index out of bounds")
      return;
    }

    slides.forEach(s => {
      s.classList.remove("current")
      s.classList.remove("prev")
      s.classList.remove("next")
    })

    lightbox.setAttribute("data-current", index)
    slides[index].classList.add("current")

    if (index === 0) {
      slides[slides.length - 1].classList.add("prev")
      slides[1].classList.add("next")
    } else if (index === slides.length - 1) {
      slides[slides.length - 2].classList.add("prev")
      slides[0].classList.add("next")
    } else {

      slides[index + 1].classList.add("next")
      slides[index - 1].classList.add("prev")
    }
    indexEl.innerHTML = `${index + 1}<span class="slash">/</span>${slides.length}`
    currentSlide = index;
  }

  function openLightbox(index) {
    setSlide(index)
    window.addEventListener("keyup", handleKeyboardNavigation);
    document.body.classList.add("lightbox-open");
    lightbox.classList.add("open");
    window.setTimeout(() => {
      lightbox.classList.add("animate");
    }, 200)
  }
  function closeLightbox() {
    window.removeEventListener("keyup", handleKeyboardNavigation);
    document.body.classList.remove("lightbox-open");
    lightbox.classList.remove("open");
    lightbox.classList.remove("animate");
  }
  function advanceLightbox(n) {
    // console.log(`Advancing ${n}`)
    let nextSlide = currentSlide + n;
    if (nextSlide < 0) {
      setSlide(slides.length - 1)
    } else if (nextSlide > slides.length - 1) {
      setSlide(0)
    } else {
      setSlide(nextSlide)
    }
  }

  mediaItems.forEach((item, i) => {
    item.classList.add("has-lightbox")
    item.addEventListener("click", (e) => {
      openLightbox(i);
    });
  });

  close.addEventListener("click", e => {
    e.preventDefault()
    closeLightbox()
  })
  next.addEventListener("click", e => {
    e.preventDefault()
    advanceLightbox(1)
  })
  prev.addEventListener("click", e => {
    e.preventDefault()
    advanceLightbox(-1)
  })

  slidesContainer.addEventListener("touchstart", e => {
    e.preventDefault()
    lastTouchedInner = slides[currentSlide].querySelector(".slide__inner")
    lastTouch = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
  })

  slidesContainer.addEventListener("touchmove", e => {
    e.preventDefault()
    let x = e.touches[0].clientX - lastTouch.x;
    lastTouch.delta = x
    let opacity = 1 - Math.abs(x) * .007
    lastTouchedInner.style.transform = `translateX(${x}px)`
    lastTouchedInner.style.opacity = opacity
  })

  slidesContainer.addEventListener("touchend", e => {
    e.preventDefault()
    window.setTimeout(() => {
      lastTouchedInner.style.transform = `translateX(0)`
      lastTouchedInner.style.opacity = 1
    }, 150)

    if (lastTouch.delta > 50) {
      advanceLightbox(-1)
    } else if (lastTouch.delta < -50) {
      advanceLightbox(1)
    } else {
      lastTouchedInner.style.transition = `100ms`
      lastTouchedInner.style.transform = `translateX(0)`
      lastTouchedInner.style.opacity = 1
      window.setTimeout(() => {
        lastTouchedInner.style.transition = `0ms`
      }, 100)
    }
    lastTouch.delta = 0
  })
}

export { initLightbox };
