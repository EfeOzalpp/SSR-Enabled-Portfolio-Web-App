// View Project Button
import React, { useEffect, useState } from 'react'
import client from '../utils/sanity'

interface MediaBlock {
  title: string
}

export const ViewProject = () => {
  const [projects, setProjects] = useState<MediaBlock[]>([])

  useEffect(() => {
    client
      .fetch(
        `*[_type == "mediaBlock" && title in ["Enhanced Scoop", "Rotary Lamp"]]{
          title
        }`
      )
      .then(setProjects)
  }, [])

  return (
    <div className="view-project-wrapper">
      <button className="view-project-btn">
        <span>{projects[0]?.title ?? 'View Project'}</span>
        <svg
          className="view-project-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" fill="#CCC" />
          {/* Replace with real icon */}
        </svg>
      </button>
    </div>
  )
}

export default ViewProject
