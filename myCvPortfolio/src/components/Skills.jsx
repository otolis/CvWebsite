import React, { useState } from 'react';
import PhysicsSkills from './PhysicsSkills';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

const Skills = ({ skills }) => {
    const [skillsView, setSkillsView] = useState('list');
    const sectionRef = useScrollAnimations({
        animationType: 'zoom-in',
        selector: '.skillBadge',
        stagger: 50,
        trigger: skillsView
    });

    return (
        <section className="sectionBlock" ref={sectionRef} key={skillsView}>
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
                        <h4 className="skillCategory">Languages</h4>
                        <div className="skillTags">
                            {skills.languages.map((skill, idx) => (
                                <span key={idx} className="skillBadge primarySkill animatedSkill" style={{ opacity: 0 }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="skillGroup">
                        <h4 className="skillCategory">Frameworks & Libraries</h4>
                        <div className="skillTags">
                            {skills.frameworks.map((skill, idx) => (
                                <span key={idx} className="skillBadge secondarySkill animatedSkill" style={{ opacity: 0 }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="skillGroup">
                        <h4 className="skillCategory">Tools & Technologies</h4>
                        <div className="skillTags">
                            {skills.tools.map((skill, idx) => (
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
