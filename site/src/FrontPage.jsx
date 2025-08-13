// src/FrontPage.jsx
import { useEffect } from 'react';
import loadable from '@loadable/component'; 
import ViewProject from './utils/title/view-project.tsx';
import { TitleProvider } from './utils/title/title-context.tsx';
import ScrollController from './utils/scroll-controller.tsx';
import { ProjectVisibilityProvider } from './utils/context-providers/project-context.tsx';

// NavMenu will NOT render on the server; only after hydration on the client.
// Fallback is null to keep SSR markup identical.
const NavMenu = loadable(() => import('./components/nav-menu.tsx'), {
  ssr: false,
  fallback: null,
});

function Frontpage() {
  // tiny UX helpers; ok on both SSR/CSR (no DOM read until effect)
  useEffect(() => {
    document.documentElement.classList.add('font-small');

    const preventPinchZoom = (event) => {
      const tag = event?.target?.tagName?.toLowerCase?.() || '';
      if (tag === 'video') return;
      if ('touches' in event && event.touches?.length > 1) event.preventDefault();
    };
    const preventGesture = (e) => {
      const tag = e?.target?.tagName?.toLowerCase?.() || '';
      if (tag === 'video') return;
      e.preventDefault();
    };

    document.addEventListener('touchmove', preventPinchZoom, { passive: false });
    document.addEventListener('gesturestart', preventGesture);
    document.addEventListener('gesturechange', preventGesture);
    document.addEventListener('gestureend', preventGesture);

    return () => {
      document.documentElement.classList.remove('font-small');
      document.removeEventListener('touchmove', preventPinchZoom);
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
      document.removeEventListener('gestureend', preventGesture);
    };
  }, []);

  return (
    <ProjectVisibilityProvider>
      <div className="HereGoesNothing" id="landing" style={{ position: 'relative' }}>
        {/* NavMenu is client-only now */}
        <NavMenu />
        <TitleProvider>
          <ViewProject />
        </TitleProvider>
        <ScrollController />
      </div>
    </ProjectVisibilityProvider>
  );
}

export default Frontpage;
