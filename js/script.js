function initStickyHeader() {
    const headerSection = document.querySelector('.header-section');
    const stickyHeader = document.querySelector('.header-nav-section--sticky');
    
    if (!headerSection || !stickyHeader) {
        console.error('Required elements not found');
        return;
    }

    let headerBottom = headerSection.getBoundingClientRect().bottom + window.scrollY;
    let ticking = false;
    let isVisible = false;

    const updateHeaderPosition = () => {
        headerBottom = headerSection.getBoundingClientRect().bottom + window.scrollY;
    };

    const showStickyHeader = () => {
        const scrollPosition = window.pageYOffset;

        if (scrollPosition > headerBottom && !isVisible) {
            stickyHeader.classList.add('visible');
            isVisible = true;
        } else if (scrollPosition <= headerBottom && isVisible) {
            stickyHeader.classList.remove('visible');
            isVisible = false;
        }

        ticking = false;
    };

    // Throttle scroll events using requestAnimationFrame
    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(showStickyHeader);
            ticking = true;
        }
    };

    // Throttle resize events
    let resizeTimeout;
    const onResize = () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(updateHeaderPosition, 100);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    showStickyHeader();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStickyHeader);
} else {
    initStickyHeader();
}

for (let i = 0; i < 69; i++) {
        const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink', 'yellow', 'cyan', 'lime'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        console.log(`%cSTONKS`, `color: ${randomColor}; font-weight: bold; font-size: 16px;`);
    }
