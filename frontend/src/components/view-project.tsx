// View Project Button
import React from 'react';
import { useProjectVisibility } from '../utils/project-visibility.tsx';

export const ViewProject = () => {
  const { activeProject } = useProjectVisibility();

  return (
    <div className="view-project-wrapper">
      <button className="view-project-btn">
        <h2>{activeProject}</h2>
        <svg className="view-project-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" fill="#FFF" />
        </svg>
      </button>
    </div>
  );
};

export default ViewProject;


