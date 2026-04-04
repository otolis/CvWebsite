import React, { useEffect, useRef } from 'react';

const ScrollProgress = () => {
    const barRef = useRef(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        let ticking = false;
        const update = () => {
            const doc = document.documentElement;
            const max = (doc.scrollHeight - doc.clientHeight) || 1;
            const pct = Math.min(1, Math.max(0, window.scrollY / max));
            bar.style.transform = `scaleX(${pct})`;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', update);
        };
    }, []);

    return (
        <div className="scrollProgressTrack" aria-hidden="true">
            <div ref={barRef} className="scrollProgressBar" />
        </div>
    );
};

export default ScrollProgress;
