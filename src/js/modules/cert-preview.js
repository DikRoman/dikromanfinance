export function initCertPreview() {
    const modal = document.getElementById('cert-modal');
    if (!modal) return;

    const body = modal.querySelector('.cert-modal__body');
    const closeBtn = modal.querySelector('.cert-modal__close');
    const backdrop = modal.querySelector('.cert-modal__backdrop');
    const cards = document.querySelectorAll('.cert-card[data-cert-src]:not([aria-hidden="true"])');

    const close = () => {
        modal.hidden = true;
        modal.classList.remove('is-open');
        document.body.classList.remove('cert-modal-open');
        body.innerHTML = '';
    };

    const open = (card) => {
        const src = card.dataset.certSrc;
        const type = card.dataset.certType || 'pdf';
        const title = card.dataset.certTitle || '';

        body.innerHTML = type === 'image'
            ? `<img class="cert-modal__img" src="${src}" alt="${title}">`
            : `<iframe class="cert-modal__iframe" src="${src}" title="${title}"></iframe>`;

        modal.hidden = false;
        modal.classList.add('is-open');
        document.body.classList.add('cert-modal-open');
        closeBtn.focus();
    };

    cards.forEach((card) => {
        card.addEventListener('click', () => open(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open(card);
            }
        });
    });

    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });
}
