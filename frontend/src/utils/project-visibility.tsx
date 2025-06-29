// Keep up with active project title
import React, { createContext, useState, useContext } from 'react';

interface ProjectVisibilityContextType {
  activeProject?: string;
  setActiveProject: (title: string) => void;
}

const ProjectVisibilityContext = createContext<ProjectVisibilityContextType | undefined>(undefined);

export const ProjectVisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeProject, setActiveProject] = useState<string | undefined>(undefined);

  return (
    <ProjectVisibilityContext.Provider value={{ activeProject, setActiveProject }}>
      {children}
    </ProjectVisibilityContext.Provider>
  );
};

export const useProjectVisibility = () => {
  const context = useContext(ProjectVisibilityContext);
  if (!context) throw new Error('useProjectVisibility must be used within ProjectVisibilityProvider');
  return context;
};

