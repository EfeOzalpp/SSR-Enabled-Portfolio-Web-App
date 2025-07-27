// Intersection Observer to Transform UI-cards based on visibility
let observer = null; // Store the observer instance globally

const setupIntersectionObserver = (pauseAnimation) => {
  if (observer) {
    observer.disconnect(); // Disconnect the observer if it already exists
    observer = null; // Clear the reference
  }

  if (pauseAnimation) {
    return; // Skip setting up the observer when paused
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: Array.from(Array(101).keys(), (x) => x / 100),
  };

  const applyTransform = (percentage, imageContainer, imageContainer2) => {

    let imageContainerTransform, imageContainer2Transform;
    let imageContainerZIndex, imageContainer2ZIndex;

    // Conditions for screen width <= 768px
    if (window.innerWidth <= 768) {
      if (percentage > 0.55) {
        imageContainerTransform = 'translate(2.4vw, 4.6vw)';
        imageContainer2Transform = 'translate(-2.2vw, -108vw)';
        imageContainerZIndex = '1';
        imageContainer2ZIndex = '5';
      } else if (percentage > 0.35 && percentage <= 0.55) {
        imageContainerTransform = 'translate(1.4vw, 3.6vw)';
        imageContainer2Transform = 'translate(-0.6vw, -106.8vw)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      } else if (percentage > 0.15 && percentage <= 0.35) {
        imageContainerTransform = 'translate(-0.4vw, 2.6vw)';
        imageContainer2Transform = 'translate(1vw, -105.6vw)';
        imageContainerZIndex = '6';
        imageContainer2ZIndex = '3';
      } else {
        imageContainerTransform = 'translate(-2.2vw, 1.6vw)';
        imageContainer2Transform = 'translate(2.6vw, -104.4vw)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      }
    }
    // Conditions for screen width between 768px and 1024px
    else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
      if (percentage > 0.55) {
        imageContainerTransform = 'translate(4vw, -4vw)';
        imageContainer2Transform = 'translate(1vw, -60vw)';
        imageContainerZIndex = '1';
        imageContainer2ZIndex = '5';
      } else if (percentage > 0.35 && percentage <= 0.55) {
        imageContainerTransform = 'translate(3vw, -5.4vw)';
        imageContainer2Transform = 'translate(0.95vw, -61.3vw)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      } else if (percentage > 0.15 && percentage <= 0.35) {
        imageContainerTransform = 'translate(1.6vw, -6.2vw)';
        imageContainer2Transform = 'translate(0.87vw, -62.7vw)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      } else {
        imageContainerTransform = 'translate(-1vw, -7vw)';
        imageContainer2Transform = 'translate(0.8vw, -64vw)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      }
    }
    // Conditions for screen width above 1024px
    else if (window.innerWidth > 1024) {
      if (percentage > 0.55) {
        imageContainerTransform = 'translate(3.5vw, 0vw)';
        imageContainer2Transform = 'translate(1vw, -30vw)';
        imageContainerZIndex = '1';
        imageContainer2ZIndex = '5';
      } else if (percentage > 0.35 && percentage <= 0.55) {
        imageContainerTransform = 'translate(3.5vw, 0vw)';
        imageContainer2Transform = 'translate(1vw, -30vw)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      } else if (percentage > 0.15 && percentage <= 0.35) {
        imageContainerTransform = 'translate(0vw, 0vw)';
        imageContainer2Transform = 'translate(1vw, -30vw)';
        imageContainerZIndex = '6';
        imageContainer2ZIndex = '3';
      } else {
        imageContainerTransform = 'translate(0vw, 0vw)';
        imageContainer2Transform = 'translate(1vw, -30vw)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      }
    }

    imageContainer.style.transform = imageContainerTransform;
    imageContainer.style.zIndex = imageContainerZIndex;
    imageContainer2.style.transform = imageContainer2Transform;
    imageContainer2.style.zIndex = imageContainer2ZIndex;
  };

  const calculateAndApplyTransform = (element) => {
    const boundingRect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;
    const elementTop = boundingRect.top;
    const elementHeight = boundingRect.height;

    const imageContainer = element.querySelector('.image-container');
    const imageContainer2 = element.querySelector('.image-container2');

    const percentageAboveCenter = Math.max(0, Math.min(elementHeight, viewportCenter - elementTop)) / elementHeight;

    applyTransform(percentageAboveCenter, imageContainer, imageContainer2);
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      calculateAndApplyTransform(entry.target);
    });
  };

  observer = new IntersectionObserver(observerCallback, observerOptions);
  document.querySelectorAll('.card-container').forEach((card) => observer.observe(card));
};

export default setupIntersectionObserver;
