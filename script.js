(() => {
  const container = document.querySelector(".container");
  const inner = document.querySelector(".inner");

  const firstSlide = container.querySelector(".slide:first-child");
  const firstSlideContent = firstSlide.querySelector(".content > div");

  const secondSlide = container.querySelector(".slide:last-child");
  const secondSlideImage = secondSlide.querySelector(".image");
  const secondSlideContent = secondSlide.querySelector(".content > div");

  function getScrollFromTop() {
    return window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
  }

  function setupContainer() {
    slideHeight = secondSlide.offsetHeight;
    firstSlide.style.top = container.offsetTop;
  }

  function updateContainer() {
    if (
      getScrollFromTop() >= container.offsetTop &&
      getScrollFromTop() <=
        container.offsetHeight - slideHeight + container.offsetTop
    ) {
      // While scrolling through effect region

      // Percentage of the scrolling region through which
      // the user has revealed
      percRegionScrolled =
        ((getScrollFromTop() - container.offsetTop) /
          (container.offsetHeight - slideHeight)) *
        100;

      // Make first slide fixed
      inner.classList.add("fixed");
      inner.classList.remove("stay");

      // Show/hide text contents
      if (percRegionScrolled > 5) {
        firstSlideContent.classList.add("hide");
        secondSlideContent.classList.remove("hide");
      } else {
        firstSlideContent.classList.remove("hide");
        secondSlideContent.classList.add("hide");
      }

      // Give the second image some time to
      // relocate before the transition kicks in
      if (percRegionScrolled <= 0) {
        secondSlideImage.classList.remove("reveal");
      } else {
        secondSlideImage.classList.add("reveal");
      }
    } else if (getScrollFromTop() > slideHeight + container.offsetTop) {
      // Below effect region

      inner.classList.add("stay");
    } else {
      // Above effect region

      // Release first slide to go with the document's flow
      inner.classList.remove("fixed");
      inner.classList.remove("stay");
    }
  }

  setupContainer();
  updateContainer();
  window.addEventListener("resize", setupContainer);
  window.addEventListener("scroll", updateContainer);
})();
