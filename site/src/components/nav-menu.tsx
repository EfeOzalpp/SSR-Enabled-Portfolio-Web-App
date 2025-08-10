// src/components/NavMenu.tsx
import { useEffect, useRef } from "react";
import { useProjectVisibility } from "../utils/context-providers/project-context.tsx";
import lottie from "lottie-web";
import titleData from "../svg/efeozalp.json";
import githubData from "../svg/github.json";
import linkedinData from "../svg/linkedin.json";

const NavMenu = () => {
  const lottieContainer = useRef<HTMLDivElement>(null);
  const githubContainer = useRef<HTMLDivElement>(null);
  const linkedinContainer = useRef<HTMLDivElement>(null);

  const {
    setCurrentIndex,
    currentIndex,
    projectCount,
    scrollContainerRef,
    isDragging,
  } = useProjectVisibility();

  const clickStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastScrollTime = useRef(0);
  const handledByTouchTs = useRef(0);
  const SCROLL_DELAY = 300; // ms

  // ---- Click vs Drag (mouse) ----
  const handleMouseDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    clickStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string
  ) => {
    // Ignore synthetic click right after a touch
    if (Date.now() - handledByTouchTs.current < 600) {
      e.preventDefault();
      return;
    }

    const dx = Math.abs(e.clientX - clickStartPos.current.x);
    const dy = Math.abs(e.clientY - clickStartPos.current.y);

    // Treat as click (not drag)
    if (dx < 5 && dy < 5) {
      e.preventDefault();
      if (url === "/") {
        window.location.reload();
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    } else {
      e.preventDefault(); // drag -> no nav
    }
  };

  // ---- Touch: tap vs drag on links ----
  const handleLinkTouchStart = (e: React.TouchEvent<HTMLAnchorElement>) => {
    const t = e.touches[0];
    clickStartPos.current = { x: t.clientX, y: t.clientY };
  };

  const handleLinkTouchEnd = (
    e: React.TouchEvent<HTMLAnchorElement>,
    url: string
  ) => {
    const t = e.changedTouches[0];
    const dx = Math.abs(t.clientX - clickStartPos.current.x);
    const dy = Math.abs(t.clientY - clickStartPos.current.y);
    const dist = Math.hypot(dx, dy);

    if (dist < 10) {
      e.preventDefault();
      handledByTouchTs.current = Date.now();
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // ---- Touch: vertical drag to scroll projects ----
  const handleNavTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    touchStartPos.current = { x: t.clientX, y: t.clientY };
  };

  const handleNavTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) return;

    const now = Date.now();
    if (now - lastScrollTime.current < SCROLL_DELAY) return;

    const t = e.touches[0];
    const deltaY = t.clientY - touchStartPos.current.y;

    const container = scrollContainerRef.current;
    if (!container) return;

    if (Math.abs(deltaY) > 30) {
      if (deltaY > 0 && currentIndex > 0) {
        const target = container.children[currentIndex - 1] as HTMLElement;
        target.scrollIntoView({ behavior: "smooth" });
        setCurrentIndex(currentIndex - 1);
      } else if (deltaY < 0 && currentIndex < projectCount - 1) {
        const target = container.children[currentIndex + 1] as HTMLElement;
        target.scrollIntoView({ behavior: "smooth" });
        setCurrentIndex(currentIndex + 1);
      }

      window.dispatchEvent(new CustomEvent("arrowWiggle"));
      lastScrollTime.current = now;
      touchStartPos.current.y = t.clientY;
    }
  };

  // ---- Lottie: Title ----
  useEffect(() => {
    const containerEl = lottieContainer.current;
    if (!containerEl) return;

    const anim = lottie.loadAnimation({
      container: containerEl,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: titleData,
    });

    const targetFrameStart = 80;
    const targetFrameEnd = 175;
    let interval: ReturnType<typeof setInterval> | null = null;
    let destroyed = false;

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
        if ((!reverse && current >= target) || (reverse && current <= target)) {
          if (interval) clearInterval(interval);
          anim.goToAndStop(target, true);
          return;
        }
        anim.goToAndStop(current + (reverse ? -1 : 1), true);
      }, 16); // ~60fps
    };

    const onMouseEnter = () => stepToFrame(targetFrameStart, true);
    const onMouseLeave = () => stepToFrame(targetFrameEnd, false);

    containerEl.addEventListener("mouseenter", onMouseEnter);
    containerEl.addEventListener("mouseleave", onMouseLeave);
    anim.addEventListener("enterFrame", onEnterFrame);

    return () => {
      if (!destroyed) {
        destroyed = true;
        anim.removeEventListener("enterFrame", onEnterFrame);
        anim.destroy();
      }
      if (interval) clearInterval(interval);
      containerEl.removeEventListener("mouseenter", onMouseEnter);
      containerEl.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  // ---- Lottie: GitHub ----
  useEffect(() => {
    const containerEl = githubContainer.current;
    if (!containerEl) return;

    const githubAnim = lottie.loadAnimation({
      container: containerEl,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: githubData,
    });

    githubAnim.goToAndStop(0, true);
    const stopFrame = 26;
    let destroyed = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const onGithubEnterFrame = () => {
      if (githubAnim.currentFrame >= stopFrame) {
        githubAnim.removeEventListener("enterFrame", onGithubEnterFrame);
        githubAnim.pause();
        githubAnim.goToAndStop(stopFrame, true);
      }
    };

    timeoutId = setTimeout(() => {
      githubAnim.play();
      githubAnim.addEventListener("enterFrame", onGithubEnterFrame);
    }, 1600);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (!destroyed) {
        destroyed = true;
        githubAnim.removeEventListener("enterFrame", onGithubEnterFrame);
        githubAnim.destroy();
      }
    };
  }, []);

  // ---- Lottie: LinkedIn ----
  useEffect(() => {
    const containerEl = linkedinContainer.current;
    if (!containerEl) return;

    const linkedinAnim = lottie.loadAnimation({
      container: containerEl,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: linkedinData,
    });

    linkedinAnim.goToAndStop(0, true);
    const stopFrame = 20;
    let destroyed = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const onLinkedinEnterFrame = () => {
      if (linkedinAnim.currentFrame >= stopFrame) {
        linkedinAnim.removeEventListener("enterFrame", onLinkedinEnterFrame);
        linkedinAnim.pause();
        linkedinAnim.goToAndStop(stopFrame, true);
      }
    };

    timeoutId = setTimeout(() => {
      linkedinAnim.play();
      linkedinAnim.addEventListener("enterFrame", onLinkedinEnterFrame);
    }, 1200);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (!destroyed) {
        destroyed = true;
        linkedinAnim.removeEventListener("enterFrame", onLinkedinEnterFrame);
        linkedinAnim.destroy();
      }
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
          onTouchEnd={(e) =>
            handleLinkTouchEnd(e, "https://github.com/EfeOzalpp")
          }
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
