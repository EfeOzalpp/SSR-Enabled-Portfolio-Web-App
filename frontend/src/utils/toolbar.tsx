import { useEffect, useRef } from 'react';

type ToolBarProps = {
  onIdleChange: (idle: boolean) => void;
  onTouchTap?: (x: number, y: number) => void;
};

const ToolBar = ({ onIdleChange, onTouchTap }: ToolBarProps) => {
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wasIdle = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleActivity = () => {
      if (wasIdle.current) {
        wasIdle.current = false;
        onIdleChange(false);
      }

      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        onIdleChange(true);
        wasIdle.current = true;
      }, 1000);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const dx = Math.abs(touch.clientX - touchStartRef.current.x);
      const dy = Math.abs(touch.clientY - touchStartRef.current.y);
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 10) {
        handleActivity();
        if (onTouchTap) onTouchTap(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, [onIdleChange, onTouchTap]);

  return null;
};

export default ToolBar;
