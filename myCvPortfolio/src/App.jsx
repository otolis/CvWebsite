import React, { useEffect, useRef, useState } from 'react';
import * as animeModule from 'animejs';
import { cvData } from './data/cvData';
import './App.css';

const anime = animeModule.default || animeModule;

function App() {
  const containerRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // State for Typewriter Effect
  const [summaryText, setSummaryText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // 1. Entrance Animations
    if (!anime || typeof anime.timeline !== 'function') {
      const elements = document.querySelectorAll('.headerSection, .sectionBlock');
      elements.forEach(el => el.style.opacity = 1);
    } else {
      anime.set('.headerSection, .sectionBlock', { opacity: 0, translateY: 20 });

      const timeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 800
      });

      timeline
        .add({
          targets: '.headerSection',
          translateY: [20, 0],
          opacity: [0, 1]
        })
        .add({
          targets: '.sectionBlock',
          translateY: [20, 0],
          opacity: [0, 1],
          delay: anime.stagger(150) 
        }, '-=400')
        // Start typing after entrance is done
        .finished.then(() => setIsTyping(true));
    }
  }, []);

  // 2. Typewriter Logic
  useEffect(() => {
    if (isTyping) {
      const fullText = cvData.personalInfo.summary;
      let i = 0;
      const typeSpeed = 30; // Speed in ms

      const typingInterval = setInterval(() => {
        setSummaryText(fullText.slice(0, i + 1));
        i++;
        if (i >= fullText.length) {
          clearInterval(typingInterval);
        }
      }, typeSpeed);

      return () => clearInterval(typingInterval);
    }
  }, [isTyping]);

  const handleProjectClick = (project) => {
    setSelectedItem(project);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleNameHover = (e) => {
    anime({
      targets: e.target.children,
      translateY: [-5, 0],
      color: ['#646cff', '#ffffff'],
      easing: 'easeInOutQuad',
      duration: 500,
      delay: anime.stagger(50)
    });
  };

  return (
    <div className="mainWrapper" ref={containerRef}>
      
      {/* Modal Overlay */}
      {selectedItem && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button className="closeButton" onClick={closeModal}>&times;</button>
            <h2 className="modalTitle">{selectedItem.title}</h2>
            <div className="modalTagContainer">
              {selectedItem.tech.map((t, i) => (
                <span key={i} className="modalBadge">{t}</span>
              ))}
            </div>
            <p className="modalDescription">{selectedItem.description}</p>
            <a href={`https://${selectedItem.link}`} className="modalLink" target="_blank" rel="noreferrer">
              View Source Code
            </a>
          </div>
        </div>
      )}

      {/* Header Section */}
      <header className="headerSection">
        <h1 className="nameTitle" onMouseEnter={handleNameHover}>
          {`${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName}`.split('').map((letter, index) => (
            <span key={index} style={{ display: 'inline-block', whiteSpace: 'pre', pointerEvents: 'none' }}>
              {letter}
            </span>
          ))}
        </h1>

        <h2 className="roleTitle">{cvData.personalInfo.title}</h2>
        <div className="contactInfo">
          <span>{cvData.personalInfo.location}</span> | 
          <span> {cvData.personalInfo.email}</span> | 
          <span> {cvData.personalInfo.github}</span>
        </div>
        
        {/* Typewriter Summary */}
        <div className="summaryContainer">
          <p className="summaryText">
            {summaryText}
            <span className="cursor">|</span>
          </p>
        </div>
        
        <a href={cvData.personalInfo.cvPdf} download className="downloadButton">
          Download CV
        </a>
      </header>

      {/* Experience */}
      <section className="sectionBlock">
        <h3 className="sectionHeader">Experience</h3>
        {cvData.experience.map((job) => (
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

      {/* Projects */}
      <section className="sectionBlock">
        <h3 className="sectionHeader">Projects (Click to View)</h3>
        <div className="projectsGrid">
          {cvData.projects.map((project) => (
            <div 
              key={project.id} 
              className="projectCard clickableCard"
              onClick={() => handleProjectClick(project)}
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

      {/* Technical Skills */}
      <section className="sectionBlock">
        <h3 className="sectionHeader">Technical Skills</h3>
        <div className="skillsContainer">
          <div className="skillGroup">
            <h4 className="skillCategory">Proficient</h4>
            <div className="skillTags">
              {cvData.skills.proficient.map((skill, idx) => (
                <span key={idx} className="skillBadge primarySkill animatedSkill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="skillGroup">
            <h4 className="skillCategory">Intermediate</h4>
            <div className="skillTags">
              {cvData.skills.intermediate.map((skill, idx) => (
                <span key={idx} className="skillBadge secondarySkill animatedSkill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Soft Skills */}
      <section className="sectionBlock">
        <h3 className="sectionHeader">Soft Skills & Certifications</h3>
        <div className="softSkillsContainer">
          {cvData.skills.softSkills.map((skill, idx) => (
            <div key={idx} className="softSkillItem">
              <span className="checkIcon">✓</span> {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="sectionBlock">
        <h3 className="sectionHeader">Education</h3>
        {cvData.education.map((edu) => (
          <div key={edu.id} className="educationItem">
            <div className="educationDegree">{edu.degree}</div>
            <div className="educationMeta">{edu.institution} | {edu.period}</div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="footerSection">
        <p>© {new Date().getFullYear()} {cvData.personalInfo.firstName} {cvData.personalInfo.lastName}</p>
        <p className="footerSub">Built with React, Vite & Anime.js</p>
      </footer>

    </div>
  );
}

export default App;