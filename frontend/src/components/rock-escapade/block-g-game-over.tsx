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
    <div
      onClick={handleClick}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        cursor: 'pointer',
        zIndex: 9999,
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div>Game Over</div>
      <div style={{ fontSize: '1rem', marginTop: '1rem' }}>Click to Restart</div>
    </div>
  );
};

export default BlockGGameOver;
