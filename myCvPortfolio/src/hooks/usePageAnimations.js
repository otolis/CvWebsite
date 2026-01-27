import { useEffect } from 'react';
import { animate, createTimeline, utils } from 'animejs';

export const usePageAnimations = (onFinished) => {
    useEffect(() => {
        if (typeof createTimeline !== 'function') {
            const elements = document.querySelectorAll('.headerSection');
            elements.forEach(el => el.style.opacity = 1);
            if (onFinished) onFinished();
        } else {
            // Set initial state - ensure visibility fallback
            const headers = document.querySelectorAll('.headerSection');
            headers.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
            });

            const timeline = createTimeline({
                onComplete: () => {
                    if (onFinished) onFinished();
                }
            });

            timeline
                .add('.headerSection', {
                    translateY: [20, 0],
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                    duration: 800
                });
        }
    }, [onFinished]);

    const handleNameHover = (e) => {
        if (typeof animate !== 'function') return;
        animate(e.target.children, {
            translateY: [-5, 0],
            color: ['#646cff', '#ffffff'],
            easing: 'easeInOutQuad',
            duration: 500,
            delay: utils.stagger(50)
        });
    };

    return { handleNameHover };
};
