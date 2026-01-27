import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const Header = ({ personalInfo, onNameHover, showTypewriter }) => {
    const { displayedText } = useTypewriter(
        showTypewriter ? personalInfo.summary : "",
        30
    );

    return (
        <header className="headerSection">
            <h1 className="nameTitle" onMouseEnter={onNameHover}>
                {`${personalInfo.firstName} ${personalInfo.lastName}`.split('').map((letter, index) => (
                    <span key={index} style={{ display: 'inline-block', whiteSpace: 'pre', pointerEvents: 'none' }}>
                        {letter}
                    </span>
                ))}
            </h1>

            <h2 className="roleTitle">{personalInfo.title}</h2>
            <div className="contactInfo">
                <span>{personalInfo.location}</span> |
                <span> {personalInfo.email}</span> |
                <span> {personalInfo.github}</span>
            </div>

            <div className="summaryContainer">
                <p className="summaryText">
                    {displayedText}
                    <span className="cursor">|</span>
                </p>
            </div>

            <a href={personalInfo.cvPdf} download className="downloadButton">
                Download CV
            </a>
        </header>
    );
};

export default Header;
