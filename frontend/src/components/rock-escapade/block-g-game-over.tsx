import React, { useState, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import gameOver from '../../svg/gameover.json';

const BlockGGameOver = ({ onRestart, visibleTrigger, coins }) => {
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

  // Reset logic for visibleTrigger
  useEffect(() => {
    if (visibleTrigger) {
      setVisible(true);
      setIsFadingOut(false);
    }
  }, [visibleTrigger]);

  // Disable scrolling when visible
  useEffect(() => {
    if (!visible) return;

    const preventScroll = (e) => {
      e.preventDefault();
    };

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

  // Play gameOver lottie once when component renders
  useEffect(() => {
    if (!lottieRef.current) return;

    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: gameOver,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  if (!visible) return null;

return (
  <div
    className={`block-g-gameover ${isFadingOut ? 'fade-out' : ''}`}
    onClick={handleClick}
  >
    <div ref={lottieRef} className="gameover-lottie" />
    <div className='gameover-text-area'>
      <h3 className='gameover-text'>Game Over</h3>
      <div className="gameover-coin-count">
        <h1>
          <span style={{ color: 'rgb(255, 205, 55)' }}>{coins} </span> 
          <span style={{ color: ' #c498ff' }}>  Coins Collected</span>
        </h1>
      </div>
      <h4 className='gameover-cta'>Click to Play Again</h4>
    </div>
  </div>
  );
};

export default BlockGGameOver;
