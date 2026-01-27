import React from 'react';

const Projects = ({ projects, onProjectClick }) => {
    return (
        <section className="sectionBlock">
            <h3 className="sectionHeader">Projects (Click to View)</h3>
            <div className="projectsGrid">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="projectCard clickableCard"
                        onClick={() => onProjectClick(project)}
                    >
                        <h4 className="projectTitle">{project.title}</h4>
                        <p className="projectDescription">{project.description}</p>
                        <div className="techStackContainer">
                            {project.tech.map((tech, idx) => (
                                <span key={idx} className="techBadge">{tech}</span>
                            ))}
                        </div>
                        <span className="clickView">Click for details</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
