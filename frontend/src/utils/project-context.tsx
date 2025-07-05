// Keep up with active project title
import React, { createContext, useState, useContext, useRef } from 'react';
import getShuffledComponents from './shuffled-components.tsx';

interface ProjectVisibilityContextType {
  activeProject?: string;
  setActiveProject: (title: string) => void;
  blockGClick: boolean;
  setBlockGClick: (clicked: boolean) => void;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  projectCount: number;
  projectComponents: ProjectComponent[]; // ensure ProjectComponent interface is imported
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const ProjectVisibilityContext = createContext<ProjectVisibilityContextType | undefined>(undefined);

export const ProjectVisibilityProvider = ({ children }) => {
  const [activeProject, setActiveProject] = useState<string | undefined>(undefined);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [blockGClick, setBlockGClick] = useState(false);

  const [projectComponents] = useState(getShuffledComponents());
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <ProjectVisibilityContext.Provider value={{
      activeProject,
      setActiveProject,
      blockGClick,
      setBlockGClick,
      currentIndex,
      setCurrentIndex,
      projectCount: projectComponents.length,
      projectComponents,
      scrollContainerRef
    }}>
      {children}
    </ProjectVisibilityContext.Provider>
  );
};

export const useProjectVisibility = () => {
  const context = useContext(ProjectVisibilityContext);
  if (!context) throw new Error('useProjectVisibility must be used within ProjectVisibilityProvider');
  return context;
};
