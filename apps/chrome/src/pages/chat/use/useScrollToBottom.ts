import { useState, useEffect, useRef } from 'react';

const easeOutCubic = (t: number) => {
    return 1 - Math.pow(1 - t, 3);
};

export const useScrollToBottom = (scrollContainerSelector: string) => {
    const [showScrollButton, setShowScrollButton] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    const checkScrollPosition = () => {
        const scrollContainer = containerRef.current?.querySelector(scrollContainerSelector);
        if (scrollContainer) {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
            setShowScrollButton(scrollHeight - (scrollTop + clientHeight) > 50);
        }
    };

    const scrollToBottom = () => {
        const scrollContainer = containerRef.current?.querySelector(scrollContainerSelector);
        if (scrollContainer) {
            const start = scrollContainer.scrollTop;
            const end = scrollContainer.scrollHeight - scrollContainer.clientHeight;
            const duration = 500;
            const startTime = performance.now();

            const animateScroll = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = easeOutCubic(progress);
                scrollContainer.scrollTop = start + (end - start) * easeProgress;

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }
            };

            requestAnimationFrame(animateScroll);
        }
    };

    useEffect(() => {
        const scrollContainer = containerRef.current?.querySelector(scrollContainerSelector);
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', checkScrollPosition);
            return () => scrollContainer.removeEventListener('scroll', checkScrollPosition);
        }
    }, [scrollContainerSelector]);

    return {
        containerRef,
        showScrollButton,
        scrollToBottom,
        checkScrollPosition
    };
};