import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * useLenis — adds buttery-smooth scrolling across the page using Lenis.
 *
 * Initializes a Lenis instance on mount, drives it via requestAnimationFrame,
 * and tears everything down on unmount. Respects users who prefer reduced
 * motion by skipping initialization in that case.
 */
export const useLenis = () => {
    useEffect(() => {
        const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        if (prefersReduced) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
        });

        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);
};
