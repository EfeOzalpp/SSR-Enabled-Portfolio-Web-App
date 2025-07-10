import React, { useState, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import gameOver from '../../svg/gameover.json';
import highScore from '../../svg/highscore.json';

const BlockGGameOver = ({ onRestart, visibleTrigger, coins, newHighScore }) => {
  const [visible, setVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const lottieRef = useRef(null);

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

  useEffect(() => {
    if (visibleTrigger) {
      setVisible(true);
      setIsFadingOut(false);
    }
  }, [visibleTrigger]);

  useEffect(() => {
    if (!visible) return;

    const preventScroll = (e) => e.preventDefault();

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventScroll, { passive: false });

    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventScroll);

      document.body.style.overflow = '';
    };
  }, [visible]);

  useEffect(() => {
    console.log('BlockGGameOver rendered with coins:', coins);
  }, [coins]);

  useEffect(() => {
    if (!lottieRef.current) return;

    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: 'svg',
      loop: newHighScore ? true : false,
      autoplay: true,
      animationData: newHighScore ? highScore : gameOver,
    });

    return () => {
      anim.destroy();
    };
  }, [newHighScore]);

  if (!visible) return null;

  return (
    <div
      className={`block-g-gameover ${isFadingOut ? 'fade-out' : ''}`}
      onClick={handleClick}
    >
      <div ref={lottieRef} className="gameover-lottie" />
      <div className='gameover-text-area'>
        <h1
          className='gameover-text'
          style={{
            color: newHighScore ? 'rgb(255 230 203)' : '#c498ff',
          }}
        >
          {newHighScore ? 'New High Score!' : 'Game Over'}
        </h1>

        <div style={{ margin: '8px 0' }}>—</div>

        <div className="gameover-coin-count">
          <h2 style={{ color: 'rgb(255, 205, 55)' }}>
            {coins} Coins Collected
          </h2>
        </div>

        <h4 className='gameover-cta'>Click to Play Again</h4>
      </div>
    </div>
  );
};

export default BlockGGameOver;
