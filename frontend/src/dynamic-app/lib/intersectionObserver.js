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
    if (!imageContainer || !imageContainer2) return;

    let imageContainerTransform, imageContainer2Transform;
    let imageContainerZIndex, imageContainer2ZIndex;

    // Conditions for screen width <= 768px
    if (window.innerWidth <= 767) {
      if (isShadowRoot) {
        if (percentage > 0.35) {
          imageContainerTransform = 'translate(0.5em, 1em)';
          imageContainer2Transform = 'translate(0.5em, -32.5em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage > 0.15 && percentage <= 0.35) {
          imageContainerTransform = 'translate(1.5em, 0.5em)';
          imageContainer2Transform = 'translate(-0.25em, -34.5em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        } else {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(0em, -33.5em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        }
      } else {
        if (percentage > 0.35) {
          imageContainerTransform = 'translate(1em, 1.5em)';
          imageContainer2Transform = 'translate(-1em, -29.5em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage > 0.15 && percentage <= 0.35) {
          imageContainerTransform = 'translate(0.5em, 0.75em)';
          imageContainer2Transform = 'translate(-0.5em, -28.9em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        } else {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(0em, -28.4em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        }
      }
    }
    // Conditions for screen width between 768px and 1024px
    else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
      if (isShadowRoot) {
        if (percentage > 0.4) {
          imageContainerTransform = 'translate(-1em, 0em)';
          imageContainer2Transform = 'translate(0em, -23.5em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage > 0.15 && percentage <= 0.4) {
          imageContainerTransform = 'translate(0.5em, 0em)';
          imageContainer2Transform = 'translate(-1em, -24em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        } else {
          imageContainerTransform = 'translate(-1em, 0em)';
          imageContainer2Transform = 'translate(0em, -23.5em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        }
      } else {
        if (percentage > 0.55) {
          imageContainerTransform = 'translate(1em, 2em)';
          imageContainer2Transform = 'translate(-1em, -27em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage > 0.15 && percentage <= 0.55) {
          imageContainerTransform = 'translate(0em, 1em)';
          imageContainer2Transform = 'translate(-0.5em, -28em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        } else {
          imageContainerTransform = 'translate(-1em, 0em)';
          imageContainer2Transform = 'translate(0em, -29em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        }
      }
    }
    // Conditions for screen width above 1024px
    else if (window.innerWidth > 1024) {
      if (isShadowRoot) {
        if (percentage > 0.5) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(1em, -28em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage > 0.25 && percentage <= 0.5) {
          imageContainerTransform = 'translate(0.5em, 0em)';
          imageContainer2Transform = 'translate(0em, -28em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        } else {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(1em, -28em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        }
      } else {
        if (percentage > 0.4) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(1.5em, -26em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
         } else if (percentage > 0.33 && percentage <= 0.4) {
          imageContainerTransform = 'translate(2.5em, 0.7em)';
          imageContainer2Transform = 'translate(1.4em, -26em)';
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
    else if (window.innerWidth > 2025) {
      if (isShadowRoot) {
        if (percentage > 0.5) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(2em, -30em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage > 0.25 && percentage <= 0.5) {
          imageContainerTransform = 'translate(1em, 0em)';
          imageContainer2Transform = 'translate(1em, -30em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        } else {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(2em, -30em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        }
      } else {
        if (percentage > 0.4) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(3em, -28em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage > 0.33 && percentage <= 0.4) {
          imageContainerTransform = 'translate(3em, 1em)';
          imageContainer2Transform = 'translate(2em, -28em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        } else {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(3em, -28em)';
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

      // Support touch-based or drag-based activation inside Shadow DOM
      shadowAppEl.addEventListener('pointerdown', () => {
        if (!isMouseInsideShadowRoot) {
          isMouseInsideShadowRoot = true;
          rootElement.querySelectorAll('.card-container').forEach((card) => observer.observe(card));
        }
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
