import React from 'react';

const Experience = ({ experience }) => {
    return (
        <section className="sectionBlock">
            <h3 className="sectionHeader">Experience</h3>
            {experience.map((job) => (
                <div key={job.id} className="experienceCard">
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
