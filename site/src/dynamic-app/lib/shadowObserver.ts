// useIntersectionTransform.ts
import { useEffect } from 'react';

export default function useIntersectionTransform(
  ref: React.RefObject<HTMLElement>,
  getShadowRoot: () => ShadowRoot | null,
  pauseAnimation: boolean
) {
  useEffect(() => {
    if (!ref.current || pauseAnimation) return;

    const root = getShadowRoot?.() ?? document;
    const isInShadow = root instanceof ShadowRoot;

    let mouseInside = false;

    // Ensure we listen for pointer entry/exit on the shadow root host
    const shadowAppEl = isInShadow ? root.querySelector('#shadow-dynamic-app') : null;

    const handleEnter = () => (mouseInside = true);
    const handleLeave = () => (mouseInside = false);

    if (shadowAppEl) {
      shadowAppEl.addEventListener('pointerenter', handleEnter);
      shadowAppEl.addEventListener('pointerleave', handleLeave);
    }

    const cardEl = ref.current;
    const imageContainer = cardEl.querySelector('.image-container') as HTMLElement;
    const imageContainer2 = cardEl.querySelector('.image-container2') as HTMLElement;

    if (!imageContainer || !imageContainer2) return;

    const applyTransform = (percentage: number) => {
      const width = window.innerWidth;

      let imageContainerTransform = 'translate(0em, 0em)';
      let imageContainer2Transform = 'translate(1em, -28em)';
      let imageContainerZIndex = '5';
      let imageContainer2ZIndex = '1';

      if (width <= 767) {
        if (percentage > 0.35) {
          imageContainerTransform = 'translate(0.5em, 1em)';
          imageContainer2Transform = 'translate(0.5em, -32.5em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage > 0.15) {
          imageContainerTransform = 'translate(1.5em, 0.5em)';
          imageContainer2Transform = 'translate(-0.25em, -34.5em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        } else {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(0em, -33.5em)';
        }
      } else if (width < 1023) {
        if (percentage > 0.4) {
          imageContainerTransform = 'translate(-1em, 0em)';
          imageContainer2Transform = 'translate(0em, -23.5em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage > 0.15) {
          imageContainerTransform = 'translate(0.5em, 0em)';
          imageContainer2Transform = 'translate(-1em, -24em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        } else {
          imageContainerTransform = 'translate(-1em, 0em)';
          imageContainer2Transform = 'translate(0em, -23.5em)';
        }
      } else if (width >= 1024) {
        if (percentage > 0.5) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(1em, -29.4em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        } else if (percentage > 0.25) {
          imageContainerTransform = 'translate(1.2em, -0.8em)';
          imageContainer2Transform = 'translate(0em, -28em)';
          imageContainerZIndex = '5';
          imageContainer2ZIndex = '1';
        }
      } else {
        if (percentage > 0.5) {
          imageContainerTransform = 'translate(0em, 0em)';
          imageContainer2Transform = 'translate(1em, -43em)';
          imageContainerZIndex = '1';
          imageContainer2ZIndex = '5';
        }
      }

      imageContainer.style.transform = imageContainerTransform;
      imageContainer.style.zIndex = imageContainerZIndex;
      imageContainer2.style.transform = imageContainer2Transform;
      imageContainer2.style.zIndex = imageContainer2ZIndex;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isInShadow && !mouseInside) return;

        const rect = entry.boundingClientRect;
        const vh = window.innerHeight;
        const vc = vh / 2;
        const percentage = Math.max(0, Math.min(rect.height, vc - rect.top)) / rect.height;

        applyTransform(percentage);
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
        root: null,
      }
    );
    const rect = cardEl.getBoundingClientRect();
    const vh = window.innerHeight;
    const vc = vh / 2;
    const percentage = Math.max(0, Math.min(rect.height, vc - rect.top)) / rect.height;

    applyTransform(percentage);
    
    observer.observe(cardEl);

    return () => {
      observer.disconnect();
      if (shadowAppEl) {
        shadowAppEl.removeEventListener('pointerenter', handleEnter);
        shadowAppEl.removeEventListener('pointerleave', handleLeave);
      }
    };
  }, [ref, pauseAnimation, getShadowRoot]);
}
