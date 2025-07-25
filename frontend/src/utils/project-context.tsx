// utils/project-context.tsx
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useMemo,
  ReactNode,
} from 'react';

import { getShuffledComponents } from './shuffled-components.tsx';

interface ProjectComponent {
  key: string;
  title: string;
  component: React.ReactElement;
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

  setMouseIdle: (idle: boolean) => void;
}

interface ProjectVisibilityProviderProps {
  children: ReactNode;
  setMouseIdle: (idle: boolean) => void;
}
const ProjectVisibilityContext = createContext<ProjectVisibilityContextType | undefined>(undefined);

export const ProjectVisibilityProvider = ({ children, setMouseIdle }: ProjectVisibilityProviderProps) => {
  const [activeProject, setActiveProject] = useState<string | undefined>(undefined);
  const [blockGClick, setBlockGClick] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [focusedProjectKey, setFocusedProjectKey] = useState<string | null>(null);
  const [previousScrollY, setPreviousScrollY] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const projectComponents = useMemo(
    () => getShuffledComponents(setMouseIdle),
    [setMouseIdle]
  );

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
        setMouseIdle,
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
