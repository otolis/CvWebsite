import { useEffect } from 'react';
import { animate, utils } from 'animejs';

/**
 * useJuice — small, tasteful animation enhancements built on anime.js v4.
 *
 *  1. Idle sine-wave float on .nameTitle letters (after the initial
 *     intro animation runs, letters gently bob forever).
 *  2. Magnetic hover on .downloadButton — the button eases toward the
 *     cursor using anime.js, then springs back on leave.
 *  3. Event-delegated pop on any .techBadge when hovered.
 *
 * All listeners are attached once on mount and cleaned up on unmount.
 * No existing markup, classes or styles are modified.
 */
export const useJuice = () => {
    useEffect(() => {
        if (typeof animate !== 'function') return;
        const cleanups = [];

        // 1. Idle wave on name letters — start after the intro settles.
        const idleStart = window.setTimeout(() => {
            const letters = document.querySelectorAll('.nameTitle span');
            if (letters.length) {
                animate(letters, {
                    translateY: [0, -6, 0],
                    duration: 2600,
                    loop: true,
                    easing: 'easeInOutSine',
                    delay: utils.stagger(90),
                });
            }
        }, 1200);
        cleanups.push(() => window.clearTimeout(idleStart));

        // 2. Magnetic Download CV button.
        const btn = document.querySelector('.downloadButton');
        if (btn) {
            const strength = 0.35; // lower = subtler pull
            const onMove = (e) => {
                const r = btn.getBoundingClientRect();
                const dx = (e.clientX - (r.left + r.width / 2)) * strength;
                const dy = (e.clientY - (r.top + r.height / 2)) * strength;
                animate(btn, {
                    translateX: dx,
                    translateY: dy,
                    duration: 400,
                    easing: 'easeOutQuad',
                });
            };
            const onLeave = () => {
                animate(btn, {
                    translateX: 0,
                    translateY: 0,
                    duration: 650,
                    easing: 'easeOutElastic(1, .5)',
                });
            };
            btn.addEventListener('pointermove', onMove);
            btn.addEventListener('pointerleave', onLeave);
            cleanups.push(() => {
                btn.removeEventListener('pointermove', onMove);
                btn.removeEventListener('pointerleave', onLeave);
            });
        }

        // 3. Tech badge pop on hover — delegated so it works for any
        //    badge that exists now or is rendered later.
        const onBadgeEnter = (e) => {
            const badge = e.target.closest('.techBadge, .skillBadge');
            if (!badge) return;
            animate(badge, {
                scale: [1, 1.12, 1],
                duration: 520,
                easing: 'easeOutBack',
            });
        };
        document.addEventListener('pointerenter', onBadgeEnter, true);
        cleanups.push(() =>
            document.removeEventListener('pointerenter', onBadgeEnter, true)
        );

        return () => cleanups.forEach((fn) => fn());
    }, []);
};
