import React from 'react';

interface CoinCounterProps {
  coins: number;
  highScore: number;
}

const CoinCounter: React.FC<CoinCounterProps> = ({ coins, highScore }) => {
  return (
    <div className= "coin-counter" >
      <h3 className="coin-amount" >Coins: {coins}</h3>
      <h3 className="high-score">
        High Score: {highScore}
      </h3>
    </div>
  );
};

export default CoinCounter;
