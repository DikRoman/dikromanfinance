export function initCertCarousel() {
    const carousel = document.querySelector('.cert-carousel');
    if (!carousel) return;

    const viewport = carousel.querySelector('.cert-carousel__viewport');
    const track = carousel.querySelector('.cert-track');
    const prevBtn = carousel.querySelector('.cert-carousel__btn--prev');
    const nextBtn = carousel.querySelector('.cert-carousel__btn--next');
    if (!viewport || !track || !prevBtn || !nextBtn) return;

    const cards = [...track.querySelectorAll('.cert-card:not([aria-hidden="true"])')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let paused = false;
    let rafId = null;

    const getStep = () => {
        const card = cards[0];
        if (!card) return viewport.clientWidth;
        const style = getComputedStyle(track);
        const gap = parseFloat(style.gap) || 24;
        return card.offsetWidth + gap;
    };

    const getLoopWidth = () => track.scrollWidth / 2;

    const normalizeScroll = () => {
        const loopWidth = getLoopWidth();
        if (loopWidth <= 0) return;
        while (viewport.scrollLeft >= loopWidth) viewport.scrollLeft -= loopWidth;
        while (viewport.scrollLeft < 0) viewport.scrollLeft += loopWidth;
    };

    const scrollByStep = (direction) => {
        viewport.scrollBy({ left: direction * getStep(), behavior: 'smooth' });
        window.setTimeout(normalizeScroll, 350);
    };

    const tick = () => {
        if (!paused && !reducedMotion) {
            viewport.scrollLeft += 0.6;
            normalizeScroll();
        }
        rafId = requestAnimationFrame(tick);
    };

    prevBtn.addEventListener('click', () => scrollByStep(-1));
    nextBtn.addEventListener('click', () => scrollByStep(1));

    carousel.addEventListener('mouseenter', () => { paused = true; });
    carousel.addEventListener('mouseleave', () => { paused = false; });
    carousel.addEventListener('focusin', () => { paused = true; });
    carousel.addEventListener('focusout', (e) => {
        if (!carousel.contains(e.relatedTarget)) paused = false;
    });

    viewport.addEventListener('scroll', normalizeScroll, { passive: true });

    tick();

    return () => {
        if (rafId) cancelAnimationFrame(rafId);
    };
}
