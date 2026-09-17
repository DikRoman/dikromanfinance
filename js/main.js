import { initLanguage } from './modules/language.js';
import { initScrollAnimations } from './modules/scroll-anim.js';
import { initCertPreview } from './modules/cert-preview.js';
import { initCertCarousel } from './modules/cert-carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initScrollAnimations();
    initCertPreview();
    initCertCarousel();

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
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

    // === Theme switcher (optional — button removed from UI) ===
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'dark';
        document.body.classList.add(`theme-${currentTheme}`);
        themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('theme-dark');
            document.body.classList.toggle('theme-light');
            const isDark = document.body.classList.contains('theme-dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggle.textContent = isDark ? '☀️' : '🌙';
        });
    }

});