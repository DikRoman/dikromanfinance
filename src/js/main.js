import { initLanguage } from './modules/language.js';
import { initScrollAnimations } from './modules/scroll-anim.js';

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация языка и анимаций AOS
    initLanguage();
    initScrollAnimations();

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

    // === View buttons switcher (HR / Finance) ===
    const viewButtons = document.querySelectorAll('.view-btn');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const view = btn.dataset.view; // hr | finance

            document.querySelectorAll('#view-summary .view-content').forEach(el => el.classList.remove('active'));
            const summaryBlock = document.querySelector(`#${view}-summary`);
            if (summaryBlock) summaryBlock.classList.add('active');

            document.querySelectorAll('.experience .view-content').forEach(el => el.classList.remove('active'));
            const expBlock = document.querySelector(`#${view}-experience`);
            if (expBlock) expBlock.classList.add('active');
        });
    });

});