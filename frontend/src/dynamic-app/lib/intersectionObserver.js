// Intersection Observer to Transform UI-cards based on visibility
let observer = null; // Store the observer instance globally
let hasTriggeredOnce = false;
let isMouseInsideShadowRoot = false;
let shadowAppEl = null; // used for mouseenter/leave binding

const setupIntersectionObserver = (pauseAnimation, rootElement = document, rootElId = 'shadow-dynamic-app') => {

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

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      const isInShadowDOM = rootElement instanceof ShadowRoot;

      if (isInShadowDOM) {
        if (hasTriggeredOnce && !isMouseInsideShadowRoot) return;
        hasTriggeredOnce = true;
      }

      calculateAndApplyTransform(entry.target);
    });
  };

  const applyTransform = (percentage, imageContainer, imageContainer2, isShadowRoot = false) => {

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
        imageContainerTransform = 'translate(4em, -4em)';
        imageContainer2Transform = 'translate(1em, -60em)';
        imageContainerZIndex = '1';
        imageContainer2ZIndex = '5';
      } else if (percentage > 0.35 && percentage <= 0.55) {
        imageContainerTransform = 'translate(3em, -5.4em)';
        imageContainer2Transform = 'translate(0.95em, -61.3em)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      } else if (percentage > 0.15 && percentage <= 0.35) {
        imageContainerTransform = 'translate(1.6em, -6.2em)';
        imageContainer2Transform = 'translate(0.87em, -62.7em)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      } else {
        imageContainerTransform = 'translate(-1em, -7em)';
        imageContainer2Transform = 'translate(0.8em, -64em)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      }
    }
    // Conditions for screen width above 1024px
    else if (window.innerWidth > 1024) {
      if (isShadowRoot) {
        if (percentage > 0.55) {
          imageContainerTransform = 'translate(-0.5em, 2em)';
          imageContainer2Transform = 'translate(1em, -27.5em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage > 0.15 && percentage <= 0.55) {
          imageContainerTransform = 'translate(0.3em, 0.6em)';
          imageContainer2Transform = 'translate(-0.6em, -26.3em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        } else {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(1em, -26em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        }
      } else {
        if (percentage > 0.55) {
          imageContainerTransform = 'translate(1.4em, 3.4em)';
          imageContainer2Transform = 'translate(-0.4em, -26em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
         } else if (percentage > 0.15 && percentage <= 0.55) {
          imageContainerTransform = 'translate(0.6em, 0.7em)';
          imageContainer2Transform = 'translate(1.4em, -25.3em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        } else {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(1.5em, -26em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        }
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

    applyTransform(
    percentageAboveCenter,
    imageContainer,
    imageContainer2,
    rootElement instanceof ShadowRoot
    );
  };

    // Pre-transform the first 3 items on initial load
  const initialCards = rootElement.querySelectorAll('.card-container');
  initialCards.forEach((card, index) => {
    if (index < 3) calculateAndApplyTransform(card);
  });

  observer = new IntersectionObserver(observerCallback, observerOptions);
  if (rootElement instanceof ShadowRoot) {
    shadowAppEl = rootElement.querySelector(`#${rootElId}`);
    if (shadowAppEl) {
      shadowAppEl.addEventListener('mouseenter', () => {
        isMouseInsideShadowRoot = true;
        // Reconnect the observer
        rootElement.querySelectorAll('.card-container').forEach((card) => observer.observe(card));
      });

      shadowAppEl.addEventListener('mouseleave', () => {
        isMouseInsideShadowRoot = false;
        if (observer) observer.disconnect();
      });
    }
  }

  observer = new IntersectionObserver(observerCallback, observerOptions);
  rootElement.querySelectorAll('.card-container').forEach((card) => observer.observe(card));
};

export default setupIntersectionObserver;
