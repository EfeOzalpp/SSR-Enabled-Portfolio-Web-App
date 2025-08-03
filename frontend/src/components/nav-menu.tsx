// src/components/NavMenu.tsx
import { useEffect, useRef } from "react";
import { useProjectVisibility } from '../utils/project-context.tsx';
import lottie from "lottie-web";
import titleData from "../svg/efeozalp.json";
import githubData from "../svg/github.json";
import linkedinData from "../svg/linkedin.json";

const NavMenu = () => {
  const lottieContainer = useRef<HTMLDivElement>(null);
  const githubContainer = useRef<HTMLDivElement>(null);
  const linkedinContainer = useRef<HTMLDivElement>(null);

  const { setCurrentIndex, currentIndex, projectCount, scrollContainerRef, isDragging } = useProjectVisibility();

  const clickStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastScrollTime = useRef(0);
  const SCROLL_DELAY = 300; // ms

  // Mouse events for click vs drag
  const handleMouseDown = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    clickStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, url: string) => {
    const deltaX = Math.abs(e.clientX - clickStartPos.current.x);
    const deltaY = Math.abs(e.clientY - clickStartPos.current.y);

    if (deltaX < 5 && deltaY < 5) {
      if (url === "/") {
        window.location.reload(); // refresh current page
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    } else {
      e.preventDefault();
    }
  };


  // Touch events for tap vs drag within links
  const handleLinkTouchStart = (e: React.TouchEvent<HTMLAnchorElement>) => {
    const touch = e.touches[0];
    clickStartPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleLinkTouchEnd = (e: React.TouchEvent<HTMLAnchorElement>, url: string) => {
    const touch = e.changedTouches[0];
    const deltaX = Math.abs(touch.clientX - clickStartPos.current.x);
    const deltaY = Math.abs(touch.clientY - clickStartPos.current.y);
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    if (distance < 10) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Touch events for nav drag scrolling behaviour
  const handleNavTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleNavTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
     if (isDragging) return;
     
    const now = Date.now();
    if (now - lastScrollTime.current < SCROLL_DELAY) return;

    const touch = e.touches[0];
    const deltaY = touch.clientY - touchStartPos.current.y;

      console.log('Drag detected', { deltaY });

    const container = scrollContainerRef.current;
    if (!container) return;

    if (Math.abs(deltaY) > 30) {
      if (deltaY > 0 && currentIndex > 0) {
        const target = container.children[currentIndex - 1] as HTMLElement;
        target.scrollIntoView({ behavior: 'smooth' });
        setCurrentIndex(currentIndex - 1);
      } else if (deltaY < 0 && currentIndex < projectCount - 1) {
        const target = container.children[currentIndex + 1] as HTMLElement;
        target.scrollIntoView({ behavior: 'smooth' });
        setCurrentIndex(currentIndex + 1);
      }
      window.dispatchEvent(new CustomEvent('arrowWiggle'));

      lastScrollTime.current = now;
      touchStartPos.current.y = touch.clientY; // reset start for continuous drag
    }
  };

  // Lottie title animation with hover reverse effect
  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: lottieContainer.current!,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: titleData,
    });

    const targetFrameStart = 80;
    const targetFrameEnd = 175;
    let interval: NodeJS.Timeout | null = null;

    const onEnterFrame = () => {
      if (anim.currentFrame >= targetFrameEnd) {
        anim.removeEventListener("enterFrame", onEnterFrame);
        anim.pause();
        anim.goToAndStop(targetFrameEnd, true);
      }
    };

    const stepToFrame = (target: number, reverse: boolean) => {
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        const current = anim.currentFrame;
        if (
          (!reverse && current >= target) ||
          (reverse && current <= target)
        ) {
          clearInterval(interval!);
          anim.goToAndStop(target, true);
          return;
        }
        anim.goToAndStop(current + (reverse ? -1 : 1), true);
      }, 16); // ~60fps
    };

    const containerEl = lottieContainer.current!;
    containerEl.addEventListener("mouseenter", () =>
      stepToFrame(targetFrameStart, true)
    );
    containerEl.addEventListener("mouseleave", () =>
      stepToFrame(targetFrameEnd, false)
    );

    anim.addEventListener("enterFrame", onEnterFrame);

    return () => {
      anim.removeEventListener("enterFrame", onEnterFrame);
      anim.destroy();
      if (interval) clearInterval(interval);
      containerEl.removeEventListener("mouseenter", () => {});
      containerEl.removeEventListener("mouseleave", () => {});
    };
  }, []);


  // GitHub and LinkedIn animations (unchanged)
  useEffect(() => {
    const githubAnim = lottie.loadAnimation({
      container: githubContainer.current!,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: githubData,
    });

    githubAnim.goToAndStop(0, true);

    const stopFrame = 26;

    const timeout = setTimeout(() => {
      githubAnim.play();

      const onGithubEnterFrame = () => {
        if (githubAnim.currentFrame >= stopFrame) {
          githubAnim.removeEventListener("enterFrame", onGithubEnterFrame);
          githubAnim.pause();
          githubAnim.goToAndStop(stopFrame, true);
        }
      };

      githubAnim.addEventListener("enterFrame", onGithubEnterFrame);
    }, 1600);

    return () => {
      clearTimeout(timeout);
      githubAnim.destroy();
    };
  }, []);

  useEffect(() => {
    const linkedinAnim = lottie.loadAnimation({
      container: linkedinContainer.current!,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: linkedinData,
    });

    linkedinAnim.goToAndStop(0, true);

    const stopFrame = 20;

    const timeout = setTimeout(() => {
      linkedinAnim.play();

      const onLinkedinEnterFrame = () => {
        if (linkedinAnim.currentFrame >= stopFrame) {
          linkedinAnim.removeEventListener("enterFrame", onLinkedinEnterFrame);
          linkedinAnim.pause();
          linkedinAnim.goToAndStop(stopFrame, true);
        }
      };

      linkedinAnim.addEventListener("enterFrame", onLinkedinEnterFrame);
    }, 1200);

    return () => {
      clearTimeout(timeout);
      linkedinAnim.destroy();
    };
  }, []);

  return (
    <nav
      className="nav-menu"
      onTouchStart={handleNavTouchStart}
      onTouchMove={handleNavTouchMove}
    >
      <div className="nav-left">
        <a
          href="/"
          className="home-link"
          draggable="false"
          onMouseDown={handleMouseDown}
          onClick={(e) => handleLinkClick(e, "/")}
          onTouchStart={handleLinkTouchStart}
          onTouchEnd={(e) => handleLinkTouchEnd(e, "/")}
        >
          <div ref={lottieContainer} className="title-lottie"></div>
        </a>
      </div>

      <div className="nav-right">
        <a
          href="https://github.com/EfeOzalpp"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          draggable="false"
          onMouseDown={handleMouseDown}
          onClick={(e) => handleLinkClick(e, "https://github.com/EfeOzalpp")}
          onTouchStart={handleLinkTouchStart}
          onTouchEnd={(e) => handleLinkTouchEnd(e, "https://github.com/EfeOzalpp")}
        >
          <div ref={githubContainer} className="github-lottie"></div>
        </a>

        <a
          href="https://www.linkedin.com/in/efe-ozalp/"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin-link"
          draggable="false"
          onMouseDown={handleMouseDown}
          onClick={(e) =>
            handleLinkClick(e, "https://www.linkedin.com/in/efe-ozalp/")
          }
          onTouchStart={handleLinkTouchStart}
          onTouchEnd={(e) =>
            handleLinkTouchEnd(e, "https://www.linkedin.com/in/efe-ozalp/")
          }
        >
          <div ref={linkedinContainer} className="linkedin-lottie"></div>
        </a>
      </div>
    </nav>
  );
};

export default NavMenu;
