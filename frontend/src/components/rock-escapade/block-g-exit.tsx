import React, { useState, useEffect } from 'react';

const ExitButton = ({ onExit }) => {
  const [visible, setVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleClick = () => {
    if (onExit) onExit();
    setIsFadingOut(true);
  };

  useEffect(() => {
    if (isFadingOut) {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 300); // Match CSS transition duration

      return () => clearTimeout(timeout);
    }
  }, [isFadingOut]);

  if (!visible) return null;

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
        zIndex: 10000,
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}
    >
      Exit
    </div>
  );
};

export default ExitButton;
