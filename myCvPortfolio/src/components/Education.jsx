import React from 'react';

const Education = ({ education }) => {
    return (
        <section className="sectionBlock">
            <h3 className="sectionHeader">Education</h3>
            {education.map((edu) => (
                <div key={edu.id} className="educationItem">
                    <div className="educationDegree">{edu.degree}</div>
                    <div className="educationMeta">{edu.institution} | {edu.period}</div>
                </div>
            ))}
        </section>
    );
};

export default Education;
