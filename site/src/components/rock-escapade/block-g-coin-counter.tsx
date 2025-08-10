import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import coin from '../../svg/coin.json';

interface CoinCounterProps {
  coins: number;
  highScore: number;
  newHighScore: boolean;
}

const CoinCounter: React.FC<CoinCounterProps> = ({ coins, highScore, newHighScore }) => {
  const coinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!coinRef.current) return;

    const anim = lottie.loadAnimation({
      container: coinRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      animationData: coin,
    });

    const assignClass = () => {
      const svg = coinRef.current?.querySelector('svg');
      if (svg) {
        svg.classList.add('coin-lottie');
      }
    };

    anim.addEventListener('DOMLoaded', assignClass);

    const playLoop = () => {
      const totalFrames = anim.totalFrames;
      const segment = [41, totalFrames - 1];

      const loopSegment = () => {
        anim.playSegments(segment, true);
      };

      anim.addEventListener('complete', loopSegment);
      loopSegment();
    };

    playLoop();

    return () => {
      anim.removeEventListener('complete', playLoop);
      anim.removeEventListener('DOMLoaded', assignClass);
      anim.destroy();
    };
  }, []);

  return (
    <div className="coin-counter">
      <div className="coin-count">
        <div className="coin2" ref={coinRef}></div>
        <h3 className="coin-amount">{coins}</h3>
      </div>
      <h3
        className="high-score"
        style={{
          background: newHighScore ? '#f6c44b38' : '#514068bd',
        }}
      >
        {newHighScore ? 'New High Score: ' : 'High Score: '}
        {highScore}
      </h3>
    </div>
  );
};

export default CoinCounter;
