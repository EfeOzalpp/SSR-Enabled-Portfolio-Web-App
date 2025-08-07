// setupIntersectionObserver.ts
let observer: IntersectionObserver | null = null;

const setupIntersectionObserver = (pauseAnimation: boolean, rootElement: Document | ShadowRoot = document) => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }

  if (pauseAnimation) return;

  const applyTransform = (percentage: number, imageContainer: HTMLElement, imageContainer2: HTMLElement) => {
    if (!imageContainer || !imageContainer2) return;

    let imageContainerTransform = 'translate(0em, 0em)';
    let imageContainer2Transform = 'translate(1em, -27.8em)';
    let imageContainerZIndex = '5';
    let imageContainer2ZIndex = '1';

    const width = window.innerWidth;

    if (width <= 767) {
      if (percentage > 0.35) {
        imageContainerTransform = 'translate(1em, 1.5em)';
        imageContainer2Transform = 'translate(-1em, -29.5em)';
        imageContainerZIndex = '1';
        imageContainer2ZIndex = '5';
      } else if (percentage > 0.15) {
        imageContainerTransform = 'translate(0.5em, 0.75em)';
        imageContainer2Transform = 'translate(-0.5em, -28.9em)';
      } else {
        imageContainer2Transform = 'translate(0em, -28.4em)';
      }
    } else if (width <= 1023) {
      if (percentage > 0.55) {
        imageContainerTransform = 'translate(1em, 2em)';
        imageContainer2Transform = 'translate(-1em, -27em)';
        imageContainerZIndex = '1';
        imageContainer2ZIndex = '5';
      } else if (percentage > 0.15) {
        imageContainerTransform = 'translate(0em, 1em)';
        imageContainer2Transform = 'translate(-0.5em, -28em)';
      } else {
        imageContainerTransform = 'translate(-1em, 0em)';
        imageContainer2Transform = 'translate(0em, -29em)';
      }
    } else if (width >= 1024) {
      if (percentage > 0.4) {
        imageContainerTransform = 'translate(0em, 0em)';
        imageContainer2Transform = 'translate(1em, -27.5em)';
        imageContainerZIndex = '1';
        imageContainer2ZIndex = '5';
      } else if (percentage > 0.33) {
        imageContainerTransform = 'translate(2.5em, 0.7em)';
        imageContainer2Transform = 'translate(1.4em, -26em)';
      }
    } else {
      if (percentage > 0.4) {
        imageContainer2Transform = 'translate(2em, -42em)';
        imageContainerZIndex = '1';
        imageContainer2ZIndex = '5';
      } else {
        imageContainer2Transform = 'translate(2em, -42em)';
      }
    }

    imageContainer.style.transform = imageContainerTransform;
    imageContainer.style.zIndex = imageContainerZIndex;
    imageContainer2.style.transform = imageContainer2Transform;
    imageContainer2.style.zIndex = imageContainer2ZIndex;
  };

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      const element = entry.target as HTMLElement;
      const imageContainer = element.querySelector('.image-container') as HTMLElement;
      const imageContainer2 = element.querySelector('.image-container2') as HTMLElement;

      const rect = element.getBoundingClientRect();
      const vh = window.innerHeight;
      const vc = vh / 2;
      const percentage = Math.max(0, Math.min(rect.height, vc - rect.top)) / rect.height;

      applyTransform(percentage, imageContainer, imageContainer2);
    });
  };

  const observerOptions: IntersectionObserverInit = {
    threshold: Array.from({ length: 101 }, (_, i) => i / 100),
  };

  observer = new IntersectionObserver(observerCallback, observerOptions);

  const cards = rootElement.querySelectorAll('.card-container');
  cards.forEach((card, index) => {
    if (index < 3) {
      const rect = card.getBoundingClientRect();
      const vh = window.innerHeight;
      const vc = vh / 2;
      const percentage = Math.max(0, Math.min(rect.height, vc - rect.top)) / rect.height;

      const img1 = card.querySelector('.image-container') as HTMLElement;
      const img2 = card.querySelector('.image-container2') as HTMLElement;
      applyTransform(percentage, img1, img2);
    }

    observer.observe(card);
  });
};

export default setupIntersectionObserver;
