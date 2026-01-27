import React from 'react';

const ProjectModal = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <button className="closeButton" onClick={onClose}>&times;</button>
                <h2 className="modalTitle">{item.title}</h2>
                <div className="modalTagContainer">
                    {item.tech.map((t, i) => (
                        <span key={i} className="modalBadge">{t}</span>
                    ))}
                </div>
                <p className="modalDescription">{item.description}</p>
                <a href={`https://${item.link}`} className="modalLink" target="_blank" rel="noreferrer">
                    View Source Code
                </a>
            </div>
        </div>
    );
};

export default ProjectModal;
