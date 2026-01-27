import React from 'react';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

const Education = ({ education }) => {
    const sectionRef = useScrollAnimations({
        animationType: 'fade-up',
        selector: '.educationItem',
        stagger: 200
    });

    return (
        <section className="sectionBlock" ref={sectionRef}>
            <h3 className="sectionHeader" style={{ opacity: 0 }}>Education</h3>
            {education.map((edu) => (
                <div key={edu.id} className="educationItem" style={{ opacity: 0 }}>
                    <div className="educationDegree">{edu.degree}</div>
                    <div className="educationMeta">{edu.institution} | {edu.period}</div>
                </div>
            ))}
        </section>
    );
};

export default Education;
