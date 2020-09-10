(() => {
  const container = document.querySelector(".container");

  const firstSlide = container.querySelector(".slide:first-child");
  const firstSlideContent = firstSlide.querySelector(".content > div");

  const secondSlide = container.querySelector(".slide:last-child");
  const secondSlideImage = secondSlide.querySelector(".image");
  const secondSlideContent = secondSlide.querySelector(".content > div");

  let slideHeight;

  function getScrollFromTop() {
    return window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
  }

  function setupContainer() {
    slideHeight = secondSlide.offsetHeight;
    firstSlide.style.top = container.offsetTop;
    secondSlideImage.style.transform = `translateX(100%)`;
  }

  function updateContainer() {
    if (
      getScrollFromTop() >= container.offsetTop &&
      getScrollFromTop() <= slideHeight + container.offsetTop
    ) {
      // While scrolling through effect region

      // Percentage of the scrolling region through which
      // the user has revealed
      percRegionScrolled =
        ((getScrollFromTop() - container.offsetTop) / slideHeight) * 100;

      // Make first slide fixed
      firstSlide.classList.add("fixed");
      firstSlide.classList.remove("absolute");

      // Make image and content from second slide fixed so that
      // they can be controlled by JS to create the effect
      secondSlideImage.classList.add("fixed");
      secondSlideContent.classList.add("fixed");

      // Show/hide text contents
      if (percRegionScrolled > 40) {
        firstSlideContent.classList.add("hide");
      } else {
        firstSlideContent.classList.remove("hide");
      }

      // Reveal the second image (decrease translateX on the way down)
      const revealAmount = 100 - percRegionScrolled * 1.8;
      secondSlideImage.style.transform = `translateX(${
        revealAmount < 0 ? 0 : revealAmount
      }%)`;

      // Give the second image some time to
      // relocate before the transition kicks in
      if (percRegionScrolled < 5) {
        secondSlideImage.style.transition = "none";
      } else {
        secondSlideImage.style.transition = null;
      }
    } else {
      // While scrolling thorough other regions

      // Release first slide to go with the document's flow
      firstSlide.classList.add("absolute");
      firstSlide.classList.remove("fixed");

      // Release second slide to follow the document's flow
      secondSlideContent.classList.remove("fixed");
      secondSlideImage.classList.remove("fixed");
      secondSlideImage.style.transform = null;
    }

    // Show the second image after it's been scrolled over' (32 is a slack)
    if (getScrollFromTop() >= container.offsetTop + slideHeight - 32) {
      secondSlideImage.classList.add("stay");
    } else {
      secondSlideImage.classList.remove("stay");
    }
  }

  setupContainer();
  updateContainer();
  window.addEventListener("resize", setupContainer);
  window.addEventListener("scroll", updateContainer);
})();
