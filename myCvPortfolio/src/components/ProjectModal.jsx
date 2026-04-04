import React, { useEffect, useRef } from 'react';
import { animate, utils } from 'animejs';

const ProjectModal = ({ item, onClose }) => {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (!item || typeof animate !== 'function') return;
        const overlay = overlayRef.current;
        const content = contentRef.current;
        if (!overlay || !content) return;

        // Entrance: overlay fade + content scale/blur in, then stagger
        // badges and description for a bit of extra polish.
        animate(overlay, {
            opacity: [0, 1],
            duration: 280,
            easing: 'easeOutQuad',
        });

        animate(content, {
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.92, 1],
            filter: ['blur(10px)', 'blur(0px)'],
            duration: 620,
            easing: 'easeOutExpo',
        });

        const badges = content.querySelectorAll('.modalBadge');
        if (badges.length) {
            animate(badges, {
                opacity: [0, 1],
                translateY: [10, 0],
                duration: 500,
                delay: utils.stagger(60, { start: 180 }),
                easing: 'easeOutQuad',
            });
        }
    }, [item]);

    if (!item) return null;

    return (
        <div className="modalOverlay" ref={overlayRef} onClick={onClose}>
            <div className="modalContent" ref={contentRef} onClick={(e) => e.stopPropagation()}>
                <button className="closeButton" onClick={onClose}>&times;</button>
                <h2 className="modalTitle">{item.title}</h2>
                <div className="modalTagContainer">
                    {item.tech.map((t, i) => (
                        <span key={i} className="modalBadge">{t}</span>
                    ))}
                </div>
                <p className="modalDescription">{item.description}</p>
                <div className="modalLinks">
                    <a href={`https://${item.link}`} className="modalLink" target="_blank" rel="noreferrer">
                        View Source Code
                    </a>
                    {item.liveDemo && (
                        <a href={`https://${item.liveDemo}`} className="modalLink demoLink" target="_blank" rel="noreferrer">
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
