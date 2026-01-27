import React, { useState } from 'react';
import PhysicsSkills from './PhysicsSkills';

const Skills = ({ skills }) => {
    const [skillsView, setSkillsView] = useState('list');

    return (
        <section className="sectionBlock">
            <div className="skillsHeaderContainer">
                <h3 className="sectionHeader" style={{ borderBottom: 'none', marginBottom: 0 }}>
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
                                <span key={idx} className="skillBadge primarySkill animatedSkill">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="skillGroup">
                        <h4 className="skillCategory">Intermediate</h4>
                        <div className="skillTags">
                            {skills.intermediate.map((skill, idx) => (
                                <span key={idx} className="skillBadge secondarySkill animatedSkill">
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
