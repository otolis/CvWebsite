import React, { useState } from 'react';
import PhysicsSkills from './PhysicsSkills';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

const Skills = ({ skills }) => {
    const [skillsView, setSkillsView] = useState('list');
    const sectionRef = useScrollAnimations({
        animationType: 'zoom-in',
        selector: '.skillBadge',
        stagger: 50
    });

    return (
        <section className="sectionBlock" ref={sectionRef}>
            <div className="skillsHeaderContainer">
                <h3 className="sectionHeader" style={{ borderBottom: 'none', marginBottom: 0, opacity: 0 }}>
                    Technical Skills
                </h3>
                <button
                    className="toggleButton"
                    onClick={() => setSkillsView(skillsView === 'physics' ? 'list' : 'physics')}
                >
                    {skillsView === 'physics' ? 'Switch to List View' : 'Try Physics Playground'}
                </button>
            </div>
            <div className="dividerLine"></div>

            {skillsView === 'physics' ? (
                <PhysicsSkills />
            ) : (
                <div className="skillsContainer fade-in">
                    <div className="skillGroup">
                        <h4 className="skillCategory">Proficient</h4>
                        <div className="skillTags">
                            {skills.proficient.map((skill, idx) => (
                                <span key={idx} className="skillBadge primarySkill animatedSkill" style={{ opacity: 0 }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="skillGroup">
                        <h4 className="skillCategory">Intermediate</h4>
                        <div className="skillTags">
                            {skills.intermediate.map((skill, idx) => (
                                <span key={idx} className="skillBadge secondarySkill animatedSkill" style={{ opacity: 0 }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div style={{ marginTop: '30px' }} className="softSkillsContainer">
                {skills.softSkills.map((skill, idx) => (
                    <div key={idx} className="softSkillItem">
                        <span className="checkIcon">✓</span> {skill}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
