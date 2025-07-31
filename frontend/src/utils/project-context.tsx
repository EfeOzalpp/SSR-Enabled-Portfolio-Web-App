import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useMemo,
  ReactNode,
} from 'react';

import { getShuffledComponents, preloadMap } from './shuffled-components.tsx';

interface ProjectComponent {
  key: string;
  title: string;
  component: React.ReactElement;
  isLink?: boolean;
}

interface ProjectVisibilityContextType {
  activeProject?: string;
  setActiveProject: (title: string) => void;

  blockGClick: boolean;
  setBlockGClick: (clicked: boolean) => void;

  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;

  projectCount: number;
  projectComponents: ProjectComponent[];

  scrollContainerRef: React.RefObject<HTMLDivElement>;

  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;

  focusedProjectKey: string | null;
  setFocusedProjectKey: React.Dispatch<React.SetStateAction<string | null>>;

  previousScrollY: number | null;
  setPreviousScrollY: React.Dispatch<React.SetStateAction<number | null>>;

  isEmbeddedFocused: boolean;
  setIsEmbeddedFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProjectVisibilityProviderProps {
  children: ReactNode;
}

const ProjectVisibilityContext = createContext<ProjectVisibilityContextType | undefined>(undefined);

export const ProjectVisibilityProvider = ({ children }: ProjectVisibilityProviderProps) => {
  const [activeProject, setActiveProject] = useState<string | undefined>(undefined);
  const [blockGClick, setBlockGClick] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [focusedProjectKey, setFocusedProjectKey] = useState<string | null>(null);
  const [previousScrollY, setPreviousScrollY] = useState<number | null>(null);
  const [isEmbeddedFocused, setIsEmbeddedFocused] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const projectComponents = useMemo(() => {
    const shuffled = getShuffledComponents();
    if (shuffled[0]) {
      const preload = preloadMap[shuffled[0].key];
      if (preload) preload();
    }
    return shuffled;
  }, []);

  return (
    <ProjectVisibilityContext.Provider
      value={{
        activeProject,
        setActiveProject,
        blockGClick,
        setBlockGClick,
        currentIndex,
        setCurrentIndex,
        projectCount: projectComponents.length,
        projectComponents,
        scrollContainerRef,
        isDragging,
        setIsDragging,
        focusedProjectKey,
        setFocusedProjectKey,
        previousScrollY,
        setPreviousScrollY,
        isEmbeddedFocused,
        setIsEmbeddedFocused,
      }}
    >
      {children}
    </ProjectVisibilityContext.Provider>
  );
};

export const useProjectVisibility = () => {
  const context = useContext(ProjectVisibilityContext);
  if (!context) {
    throw new Error('useProjectVisibility must be used within ProjectVisibilityProvider');
  }
  return context;
};
