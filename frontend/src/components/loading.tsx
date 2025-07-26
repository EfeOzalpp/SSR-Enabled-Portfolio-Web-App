// src/components/LoadingOverlay.tsx
import React, { useEffect, useState } from 'react';

const LoadingOverlay = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Trigger fade out after page load
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 500); // adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-overlay ${fadeOut ? 'fade-out' : ''}`}></div>
  );
};

export default LoadingOverlay;
