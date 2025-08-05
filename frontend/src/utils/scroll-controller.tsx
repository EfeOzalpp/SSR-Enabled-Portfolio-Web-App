import { useEffect, useRef, useState, Suspense } from 'react';
import { useProjectVisibility } from './project-context.tsx';
import ViewProject from '../components/view-project.tsx';
import RockEscapade from '../components/rock-escapade-case-study/rock-escapade-case-study.tsx';
import LoadingScreen from './loading.tsx';

const ScrollController = () => {
  const {
    currentIndex,
    projectComponents,
    scrollContainerRef,
    focusedProjectKey,
  } = useProjectVisibility();

  const isGameFocused = focusedProjectKey === 'game';

  const [justExitedFocusKey, setJustExitedFocusKey] = useState<string | null>(null);
  const [invisibleKeys, setInvisibleKeys] = useState<Set<string>>(new Set());
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [viewportStyle, setViewportStyle] = useState({ height: '98dvh', paddingBottom: '2dvh' });

  const updateViewportStyle = () => {
    const width = window.innerWidth;
    if (width >= 1025) {
      setViewportStyle({ height: '96dvh', paddingBottom: '4dvh' });
    } else if (width >= 768) {
      setViewportStyle({ height: '92dvh', paddingBottom: '8dvh' });
    } else {
      setViewportStyle({ height: '98dvh', paddingBottom: '2dvh' });
    }
  };

  useEffect(() => {
    updateViewportStyle();
    window.addEventListener('resize', updateViewportStyle);
    return () => window.removeEventListener('resize', updateViewportStyle);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.classList.add('no-snap');
    const timeout = setTimeout(() => container.classList.remove('no-snap'), 800);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  /* Résizé logic
  useEffect(() => {
    let resizeTimeout: ReturnType<typeof setTimeout>;

    const onResize = () => {
      updateViewportStyle();

      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const targetEl = projectRefs.current[projectComponents[currentIndex]?.key];
        if (targetEl) {
          requestAnimationFrame(() => {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      }, 400); // Let layout settle first
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [currentIndex, projectComponents]); */

  useEffect(() => {
    if (focusedProjectKey) {
      const keysToHide = projectComponents.filter(p => p.key !== focusedProjectKey).map(p => p.key);
      setInvisibleKeys(new Set(keysToHide));
    } else {
      const timeout = setTimeout(() => setInvisibleKeys(new Set()), 400);
      return () => clearTimeout(timeout);
    }
  }, [focusedProjectKey, projectComponents]);

  useEffect(() => {
    if (focusedProjectKey) {
      setJustExitedFocusKey(focusedProjectKey);
    }
  }, [focusedProjectKey]);

  useEffect(() => {
    if (!focusedProjectKey && justExitedFocusKey && scrollContainerRef.current) {
      const el = projectRefs.current[justExitedFocusKey];
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'auto' });
          setJustExitedFocusKey(null);
        });
      }
    }
  }, [focusedProjectKey, justExitedFocusKey]);

  // émbéddéd app top - bottom détéction to triggér synthéthic scroll for snappyscrollthingy
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      console.log('❌ scrollContainerRef not available.');
      return;
    }

    let embeddedEl: HTMLElement | null = null;
    let retries = 0;
    const maxRetries = 10;

    const attachHandlers = () => {
      embeddedEl = document.querySelector('.embedded-app');
      if (!embeddedEl) {
        retries++;
        if (retries <= maxRetries) {
          console.log(`🔄 Retrying to find .embedded-app (${retries}/${maxRetries})...`);
          setTimeout(attachHandlers, 300);
        } else {
          console.warn('⚠️ Failed to find .embedded-app.');
        }
        return;
      }

      console.log('✅ .embedded-app found. Attaching scroll and touch handlers.');

      // WHEEL SUPPORT
      const handleWheel = (e: WheelEvent) => {
        const deltaY = e.deltaY;
        const scrollTop = embeddedEl!.scrollTop;
        const scrollHeight = embeddedEl!.scrollHeight;
        const clientHeight = embeddedEl!.clientHeight;

        const atTop = scrollTop <= 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

        if (deltaY < 0 && atTop) {
          console.log('🔼 Wheel: at top → synthetic scroll UP');
          e.preventDefault();
          scrollContainer.scrollBy({ top: -300, behavior: 'smooth' });
        } else if (deltaY > 0 && atBottom) {
          console.log('🔽 Wheel: at bottom → synthetic scroll DOWN');
          e.preventDefault();
          scrollContainer.scrollBy({ top: 300, behavior: 'smooth' });
        }
      };

      embeddedEl.addEventListener('wheel', handleWheel, { passive: false });

      // TOUCH SUPPORT
      let startY = 0;

      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          startY = e.touches[0].clientY;
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length !== 1) return;

        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;

        const scrollTop = embeddedEl!.scrollTop;
        const scrollHeight = embeddedEl!.scrollHeight;
        const clientHeight = embeddedEl!.clientHeight;

        const atTop = scrollTop <= 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
        const scrollAmount = Math.max(100, window.innerHeight * 0.9);

        if (deltaY > 5 && atTop) {
          console.log('📱 Touch: drag down at top → synthetic scroll UP');
          e.preventDefault();
          scrollContainer.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
        } else if (deltaY < -5 && atBottom) {
          console.log('📱 Touch: drag up at bottom → synthetic scroll DOWN');
          scrollContainer.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        }
      };

      embeddedEl.addEventListener('touchstart', handleTouchStart, { passive: true });
      embeddedEl.addEventListener('touchmove', handleTouchMove, { passive: false });

      // CLEANUP
      return () => {
        embeddedEl?.removeEventListener('wheel', handleWheel);
        embeddedEl?.removeEventListener('touchstart', handleTouchStart);
        embeddedEl?.removeEventListener('touchmove', handleTouchMove);
      };
    };

    const cleanup = attachHandlers();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="SnappyScrollThingy"
      style={{
        height: viewportStyle.height,
        overflowY: 'scroll',
        scrollSnapType: focusedProjectKey ? 'none' : 'y mandatory',
        scrollBehavior: 'smooth',
        paddingBottom: viewportStyle.paddingBottom,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <style>{`.SnappyScrollThingy::-webkit-scrollbar { display: none; }`}</style>

      {projectComponents.map((item) => {
        const isFocused = focusedProjectKey === item.key;
        const isHidden = invisibleKeys.has(item.key);

        return (
          <div
            key={item.key}
            ref={(el) => (projectRefs.current[item.key] = el)}
            style={{
              height: isHidden ? '0px' : isFocused ? 'auto' : viewportStyle.height,
              overflow: isFocused ? 'visible' : 'hidden',
              scrollSnapAlign: isHidden ? 'none' : 'start',
              opacity: isHidden ? 0 : 1,
              visibility: isHidden ? 'hidden' : 'visible',
              pointerEvents: isHidden ? 'none' : 'auto',
              transition: 'opacity 0.4s ease, visibility 0.4s ease',
            }}
          >
            <div style={{ minHeight: viewportStyle.height }}>
            <Suspense fallback={<LoadingScreen isFullScreen={false} />}>
              <item.Component onIdleChange={() => {}} />
              {isFocused && item.title === 'Evade the Rock' && <RockEscapade />}
            </Suspense>
            </div>
          </div>
        );
      })}

      <ViewProject
        currentProject={projectComponents[currentIndex]}
        nextProject={projectComponents[currentIndex + 1] ?? null}
      />
    </div>   
  );
};

export default ScrollController;
