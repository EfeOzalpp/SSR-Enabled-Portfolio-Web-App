// src/components/LoadingScreen.tsx
import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import loading from '../svg/loading.json';

const LoadingScreen = ({ isFullScreen = true }) => {
  const container = useRef<HTMLDivElement>(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: container.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loading,
    });

    const timer = setTimeout(() => setFadeIn(true), 300);

    return () => {
      clearTimeout(timer);
      anim.destroy();
    };
  }, []);

return (
    <div
      className={`loading-overlay ${!isFullScreen ? 'relative-mode' : ''}`}
    >
      <div className="fade-in-content visible">
          <div ref={container} className="loading-lottie" />
        </div>
    </div>
  );
};

export default LoadingScreen;
