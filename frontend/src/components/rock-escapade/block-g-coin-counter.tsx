import React from 'react';

interface CoinCounterProps {
  coins: number;
}

const CoinCounter: React.FC<CoinCounterProps> = ({ coins }) => {
  return (
    <h2
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        color: '#FFD700',
        zIndex: 10000,
        pointerEvents: 'none',
      }}
    >
      Coins: {coins}
    </h2>
  );
};

export default CoinCounter;
