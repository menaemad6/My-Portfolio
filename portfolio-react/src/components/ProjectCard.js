import React from 'react';

const ProjectCard = ({ project, onClick, className }) => {
  return (
    <li className={`slider--item ${className}`}>
      <div onClick={() => onClick(project)} className="slider--item-image">
        <img 
          src={project.image} 
          alt={project.title} 
          loading="lazy"
          decoding="async"
        />
      </div>
      <p className="slider--item-title">{project.title}</p>
      <p className="slider--item-description">{project.shortDescription || project.description.substring(0, 40) + '...'}</p>
    </li>
  );
};

export default ProjectCard; 