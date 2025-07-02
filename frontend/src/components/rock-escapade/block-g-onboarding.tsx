import React, { useState } from 'react';

const BlockGOnboarding = ({ onStart }) => {
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    if (onStart) onStart();
    setVisible(false);
  };

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
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        cursor: 'pointer',
        zIndex: 9999,
        transition: 'opacity 0.3s ease',
      }}
    >
      Click to Start
    </div>
  );
};

export default BlockGOnboarding;
