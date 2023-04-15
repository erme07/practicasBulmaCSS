document.addEventListener('DOMContentLoaded', () => {

  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0),
    slider = document.querySelector(".slider"),
    slides = document.querySelector(".slides"),
    slider_nav = document.querySelector(".slider__nav"),
    numberOfSlides = slides.childElementCount;
  let slideNumber = 0, auto = 0;

  const desactivar = () => {
    Array.from(slides.children).forEach(element => {
      element.classList.remove("active")
    });
    Array.from(slider_nav.children).forEach(element => {
      element.classList.remove("active");
    });
  }
  const activar = () => {
    slides.children[slideNumber].classList.add("active");
    slider_nav.children[slideNumber].classList.add("active");
  }
  const nextSlide = () => {
    slideNumber++;
    if (slideNumber > numberOfSlides - 1) {
      slideNumber = 0;
    }
    desactivar();
    activar()
  }
  const autoSlide = () => {
    auto = setInterval(() => {
      nextSlide();
    }, 5000);
  }

  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });

  slider.addEventListener("mouseover", () => {
    clearInterval(auto);
  });
  slider.addEventListener("mouseout", () => {
    autoSlide();
  });

  document.addEventListener("click", (e) => {
    if (e.target.getAttribute("data-name") === "slide-number") {
      desactivar();
      e.target.parentNode.classList.add("active");
      slides.children[e.target.getAttribute("data-value")].classList.add("active");
      slideNumber = Number(e.target.getAttribute("data-value"));
    }
    if (e.target.getAttribute("data-name") === 'prev') {
      slideNumber--;
      if (slideNumber < 0) {
        slideNumber = numberOfSlides - 1;
      }
      desactivar();
      activar();
    }
    if (e.target.getAttribute("data-name") === 'next') {
      nextSlide();
    }
  });

  autoSlide();
});