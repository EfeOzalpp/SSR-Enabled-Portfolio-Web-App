// src/components/NavMenu.tsx
import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import titleData from "../svg/efeozalp.json";
import githubData from "../svg/github.json";
import linkedinData from "../svg/linkedin.json";

const NavMenu = () => {
  const lottieContainer = useRef<HTMLDivElement>(null);
  const githubContainer = useRef<HTMLDivElement>(null);
  const linkedinContainer = useRef<HTMLDivElement>(null);

  // Title
  useEffect(() => {
    const el = lottieContainer.current;
    if (!el) return;
    const anim = lottie.loadAnimation({
      container: el,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: titleData,
    });

    const stopAt = 175;
    const startHold = 80;

    const stepToFrame = (target: number) => {
      const step = () => {
        const cur = anim.currentFrame;
        if (Math.abs(cur - target) <= 1) {
          anim.goToAndStop(target, true);
          return;
        }
        anim.goToAndStop(cur + (cur < target ? 1 : -1), true);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const onEnterFrame = () => {
      if (anim.currentFrame >= stopAt) {
        anim.removeEventListener("enterFrame", onEnterFrame);
        anim.goToAndStop(stopAt, true);
      }
    };

    const onEnter = () => stepToFrame(startHold);
    const onLeave = () => stepToFrame(stopAt);

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    anim.addEventListener("enterFrame", onEnterFrame);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      anim.removeEventListener("enterFrame", onEnterFrame);
      anim.destroy();
    };
  }, []);

  // GitHub
  useEffect(() => {
    const el = githubContainer.current;
    if (!el) return;
    const anim = lottie.loadAnimation({
      container: el,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: githubData,
    });
    anim.goToAndStop(0, true);
    const stopAt = 26;
    const onEnterFrame = () => {
      if (anim.currentFrame >= stopAt) {
        anim.removeEventListener("enterFrame", onEnterFrame);
        anim.goToAndStop(stopAt, true);
      }
    };
    const t = setTimeout(() => {
      anim.play();
      anim.addEventListener("enterFrame", onEnterFrame);
    }, 1600);

    return () => {
      clearTimeout(t);
      anim.removeEventListener("enterFrame", onEnterFrame);
      anim.destroy();
    };
  }, []);

  // LinkedIn
  useEffect(() => {
    const el = linkedinContainer.current;
    if (!el) return;
    const anim = lottie.loadAnimation({
      container: el,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: linkedinData,
    });
    anim.goToAndStop(0, true);
    const stopAt = 20;
    const onEnterFrame = () => {
      if (anim.currentFrame >= stopAt) {
        anim.removeEventListener("enterFrame", onEnterFrame);
        anim.goToAndStop(stopAt, true);
      }
    };
    const t = setTimeout(() => {
      anim.play();
      anim.addEventListener("enterFrame", onEnterFrame);
    }, 1200);

    return () => {
      clearTimeout(t);
      anim.removeEventListener("enterFrame", onEnterFrame);
      anim.destroy();
    };
  }, []);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <nav className="nav-menu">
      <div className="nav-left">
        <a
          href="/"
          className="home-link"
          draggable="false"
          onClick={handleHomeClick}
          aria-label="Home"
        >
          <div ref={lottieContainer} className="title-lottie" />
        </a>
      </div>

      <div className="nav-right">
        <a
          href="https://github.com/EfeOzalpp"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          draggable="false"
          aria-label="GitHub"
        >
          <div ref={githubContainer} className="github-lottie" />
        </a>

        <a
          href="https://www.linkedin.com/in/efe-ozalp/"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin-link"
          draggable="false"
          aria-label="LinkedIn"
        >
          <div ref={linkedinContainer} className="linkedin-lottie" />
        </a>
      </div>
    </nav>
  );
};

export default NavMenu;
