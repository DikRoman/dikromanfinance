import { initLanguage } from './modules/language.js';
import { initScrollAnimations } from './modules/scroll-anim.js';

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initScrollAnimations();
    initMaterialsFilters();
    initMobileNav();
});

function initMaterialsFilters() {
    const filters = document.querySelectorAll('.materials-filter');
    const cards = document.querySelectorAll('.product-card');

    if (!filters.length || !cards.length) return;

    filters.forEach((filter) => {
        filter.addEventListener('click', () => {
            const category = filter.dataset.filter;

            filters.forEach((btn) => btn.classList.remove('is-active'));
            filter.classList.add('is-active');

            cards.forEach((card) => {
                const match = category === 'all' || card.dataset.category === category;
                card.classList.toggle('is-hidden', !match);
            });
        });
    });
}

function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!navToggle || !navLinks) return;

    const closeNav = () => {
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
    };

    navToggle.addEventListener('click', () => {
        const isOpen = document.body.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeNav);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeNav();
    });
}
