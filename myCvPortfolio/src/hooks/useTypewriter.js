import { useState, useEffect } from 'react';

export const useTypewriter = (text, speed = 30, delay = 0) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        let i = 0;
        let timer;

        const startTyping = () => {
            timer = setInterval(() => {
                setDisplayedText(text.slice(0, i + 1));
                i++;
                if (i >= text.length) {
                    clearInterval(timer);
                    setIsFinished(true);
                }
            }, speed);
        };

        const delayTimer = setTimeout(startTyping, delay);

        return () => {
            clearInterval(timer);
            clearTimeout(delayTimer);
        };
    }, [text, speed, delay]);

    return { displayedText, isFinished };
};
