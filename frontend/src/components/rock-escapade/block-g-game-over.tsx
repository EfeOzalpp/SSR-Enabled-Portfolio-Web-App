import React, { useState, useEffect } from 'react';

const BlockGGameOver = ({ onRestart, visibleTrigger }) => {
  const [visible, setVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleClick = () => {
    if (onRestart) onRestart();
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

  // Reset logic for visibleTrigger
  useEffect(() => {
    if (visibleTrigger) {
      setVisible(true);
      setIsFadingOut(false);
    }
  }, [visibleTrigger]);

  if (!visible) return null;

  return (
    <div className="block-g-gameover"
      onClick={handleClick}
      style={{
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}
    >
      <h1>Game Over</h1>
      <h2>Click to Restart</h2>
    </div>
  );
};

export default BlockGGameOver;
