import React, { useState } from 'react';
import './App.css';

// Data
import { cvData } from './data/cvData';

// Hooks
import { usePageAnimations } from './hooks/usePageAnimations';

// Components
import Header from './components/Header';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showTypewriter, setShowTypewriter] = useState(false);

  // Initialize animations and hover handlers
  const { handleNameHover } = usePageAnimations(() => setShowTypewriter(true));

  return (
    <div className="mainWrapper">
      <ProjectModal
        item={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <Header
        personalInfo={cvData.personalInfo}
        onNameHover={handleNameHover}
        showTypewriter={showTypewriter}
      />

      <Experience experience={cvData.experience} />

      <Projects
        projects={cvData.projects}
        onProjectClick={setSelectedProject}
      />

      <Skills skills={cvData.skills} />

      <Education education={cvData.education} />

      <Footer personalInfo={cvData.personalInfo} />
    </div>
  );
}

export default App;
