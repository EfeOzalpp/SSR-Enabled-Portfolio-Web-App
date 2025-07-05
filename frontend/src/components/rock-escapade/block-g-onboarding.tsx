import React, { useState, useEffect } from 'react';

const BlockGOnboarding = ({ onStart, resetTrigger }) => {
  const [visible, setVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleClick = () => {
    if (onStart) onStart();
    setIsFadingOut(true);
  };

  useEffect(() => {
    if (isFadingOut) {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isFadingOut]);

  // Reset logic
  useEffect(() => {
    if (resetTrigger) {
      setVisible(true);
      setIsFadingOut(false);
    }
  }, [resetTrigger]);

  if (!visible) return null;

  return (
    <div className="block-g-onboarding"
      onClick={handleClick}
      style={{
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}
    >
     <h1 className="onboarding-text"> Click to Start </h1> 
    </div>
  );
};

export default BlockGOnboarding;
