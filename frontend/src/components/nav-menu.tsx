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

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: lottieContainer.current!,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: titleData,
    });

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

  useEffect(() => {
    const githubAnim = lottie.loadAnimation({
      container: githubContainer.current!,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: githubData,
    });

    githubAnim.goToAndStop(0, true);

    const stopFrame = 32;

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
    }, 2200);

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

    const stopFrame = 32;

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
    }, 2000);

    return () => {
      clearTimeout(timeout);
      linkedinAnim.destroy();
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
        <div ref={githubContainer} className="github-lottie"></div>
        <div ref={linkedinContainer} className="linkedin-lottie"></div>
      </div>
    </nav>
  );
};

export default NavMenu;
