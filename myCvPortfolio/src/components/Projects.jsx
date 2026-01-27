import React from 'react';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

const Projects = ({ projects, onProjectClick }) => {
    const sectionRef = useScrollAnimations({
        animationType: 'reveal',
        selector: '.projectCard',
        stagger: 150
    });

    return (
        <section className="sectionBlock" ref={sectionRef}>
            <h3 className="sectionHeader" style={{ opacity: 0 }}>Projects (Click to View)</h3>
            <div className="projectsGrid">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="projectCard clickableCard"
                        onClick={() => onProjectClick(project)}
                        style={{ opacity: 0 }}
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
