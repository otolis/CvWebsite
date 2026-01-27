import React from 'react';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

const Experience = ({ experience }) => {
    const sectionRef = useScrollAnimations({
        animationType: 'stagger-slide',
        selector: '.experienceCard',
        stagger: 200
    });

    return (
        <section className="sectionBlock" ref={sectionRef}>
            <h3 className="sectionHeader" style={{ opacity: 0 }}>Experience</h3>
            {experience.map((job) => (
                <div key={job.id} className="experienceCard" style={{ opacity: 0 }}>
                    <div className="cardHeader">
                        <h4 className="jobRole">{job.role}</h4>
                        <span className="jobDate">{job.period}</span>
                    </div>
                    <div className="companyName">{job.company}</div>
                    <ul className="taskList">
                        {job.tasks.map((task, index) => (
                            <li key={index} className="taskItem">{task}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    );
};

export default Experience;
