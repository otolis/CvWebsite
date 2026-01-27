import React from 'react';

const Footer = ({ personalInfo }) => {
    return (
        <footer className="footerSection">
            <p>© {new Date().getFullYear()} {personalInfo.firstName} {personalInfo.lastName}</p>
            <p className="footerSub">Built with React, Vite & Anime.js</p>
        </footer>
    );
};

export default Footer;
