import { useEffect } from 'react';
import * as animeModule from 'animejs';
const anime = animeModule.default || animeModule;

export const usePageAnimations = (onFinished) => {
    useEffect(() => {
        if (!anime || typeof anime.timeline !== 'function') {
            const elements = document.querySelectorAll('.headerSection, .sectionBlock');
            elements.forEach(el => el.style.opacity = 1);
            if (onFinished) onFinished();
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
                .finished.then(() => {
                    if (onFinished) onFinished();
                });
        }
    }, [onFinished]);

    const handleNameHover = (e) => {
        if (!anime) return;
        anime({
            targets: e.target.children,
            translateY: [-5, 0],
            color: ['#646cff', '#ffffff'],
            easing: 'easeInOutQuad',
            duration: 500,
            delay: anime.stagger(50)
        });
    };

    return { handleNameHover };
};
