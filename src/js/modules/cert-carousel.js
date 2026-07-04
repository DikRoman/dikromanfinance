export function initCertCarousel() {
    const carousel = document.querySelector('.cert-carousel');
    if (!carousel) return;

    const viewport = carousel.querySelector('.cert-carousel__viewport');
    const track = carousel.querySelector('.cert-track');
    const prevBtn = carousel.querySelector('.cert-carousel__btn--prev');
    const nextBtn = carousel.querySelector('.cert-carousel__btn--next');
    if (!viewport || !track || !prevBtn || !nextBtn) return;

    const cards = [...track.querySelectorAll('.cert-card')];

    const getStep = () => {
        const card = cards[0];
        if (!card) return viewport.clientWidth;
        const style = getComputedStyle(track);
        const gap = parseFloat(style.gap) || 24;
        return card.offsetWidth + gap;
    };

    const updateButtons = () => {
        const maxScroll = viewport.scrollWidth - viewport.clientWidth;
        prevBtn.disabled = viewport.scrollLeft <= 1;
        nextBtn.disabled = viewport.scrollLeft >= maxScroll - 1;
    };

    const scrollByStep = (direction) => {
        viewport.scrollBy({ left: direction * getStep(), behavior: 'smooth' });
    };

    prevBtn.addEventListener('click', () => scrollByStep(-1));
    nextBtn.addEventListener('click', () => scrollByStep(1));
    viewport.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);

    updateButtons();
}
