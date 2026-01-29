import { useEffect, useRef } from 'react';
import { animate, utils, onScroll } from 'animejs';

export const useScrollAnimations = (options = {}) => {
    const elementRef = useRef(null);
    const {
        animationType = 'fade-up',
        selector = null, // CSS selector for children to stagger
        stagger = 0,     // Delay between children
        delay = 0,        // Initial delay
        trigger = null,   // Extra dependency to re-trigger
    } = options;

    useEffect(() => {
        const element = elementRef.current;

        // Immediate fallback if element or onScroll is missing
        if (!element || typeof onScroll !== 'function') {
            if (element) {
                element.style.opacity = '1';
                element.style.transform = 'none';
            }
            return;
        }

        // Anime.js v4 ScrollObserver via onScroll
        // This is highly optimized for both desktop and mobile
        const observer = onScroll({
            target: element,
            // Trigger when the element enters the viewport
            onEnter: () => {
                triggerAnimation(element, animationType, selector, stagger, delay);
                requestAnimationFrame(() => {
                    if (observer && observer.revert) observer.revert();
                });
            }
        });

        return () => {
            if (observer && typeof observer.revert === 'function') {
                observer.revert();
            }
        };
    }, [animationType, selector, stagger, delay, trigger]);

    const triggerAnimation = (target, type, childSelector, staggerVal, initialDelay) => {
        const showElement = (el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        };

        if (typeof animate !== 'function') {
            showElement(target);
            if (childSelector) {
                target.querySelectorAll(childSelector).forEach(showElement);
            }
            return;
        }

        const targets = childSelector ? target.querySelectorAll(childSelector) : target;

        // Ensure container/header is visible immediately to prevent black screen
        showElement(target);
        const header = target.querySelector('.sectionHeader');
        if (header) showElement(header);

        const animationConfigs = {
            'fade-up': {
                translateY: [30, 0],
                opacity: [0, 1],
            },
            'fade-right': {
                translateX: [-30, 0],
                opacity: [0, 1],
            },
            'reveal': {
                rotateX: [45, 0],
                translateY: [50, 0],
                opacity: [0, 1],
            },
            'zoom-in': {
                scale: [0.8, 1],
                opacity: [0, 1],
            },
            'stagger-slide': {
                translateX: [-20, 0],
                opacity: [0, 1],
            }
        };

        const config = animationConfigs[type] || animationConfigs['fade-up'];

        animate(targets, {
            ...config,
            easing: 'easeOutExpo',
            duration: 1000,
            delay: utils.stagger(staggerVal, { start: initialDelay })
        });
    };

    return elementRef;
};
