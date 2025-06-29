// src/components/NavMenu.tsx
import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../svg/efeozalp.json";

const NavMenu = () => {
  const lottieContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: lottieContainer.current!,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: animationData,
    });

    // Listen to frame updates to pause at frame 165
    const onEnterFrame = () => {
      if (anim.currentFrame >= 175) {
        anim.removeEventListener("enterFrame", onEnterFrame);
        anim.pause();
        anim.goToAndStop(175, true);
      }
    };

    anim.addEventListener("enterFrame", onEnterFrame);

    return () => {
      anim.removeEventListener("enterFrame", onEnterFrame);
      anim.destroy();
    };
  }, []);

  return (
    <nav className="nav-menu">
      <div className="nav-left">
        <div
          ref={lottieContainer}
          className="title-lottie"
        ></div>
      </div>

      <div className="nav-right">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon-svg"
        >
          <path d="M9 19V6h3v13H9z" />
          <path d="M16 19V10h3v9h-3z" />
        </svg>

        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon-svg"
        >
          <path d="M16 8a6 6 0 00-12 0c0 2.67 2.34 5.33 4 7 1.66-1.67 4-4.33 4-7z" />
          <path d="M12 14s1.5 2 3 2 3-2 3-2" />
        </svg>
      </div>
    </nav>
  );
};

export default NavMenu;
