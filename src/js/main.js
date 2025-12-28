import { initLanguage } from './modules/language.js';
import { initScrollAnimations } from './modules/scroll-anim.js';

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация языка и анимаций AOS
    initLanguage();
    initScrollAnimations();

    // === Theme switcher ===
    const themeToggle = document.querySelector('.theme-toggle');
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

    // === View buttons switcher (HR / Finance / Projects) ===
    const viewButtons = document.querySelectorAll('.view-btn');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Активируем выбранную кнопку
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const view = btn.dataset.view; // hr | finance | projects

            // Скрываем/показываем Summary и Experience
            const summarySection = document.querySelector('.summary');
            const experienceSection = document.querySelector('.experience');
            const projectsSection = document.getElementById('projects-view');

            if (view === 'projects') {
                summarySection.style.display = 'none';
                experienceSection.style.display = 'none';
                projectsSection.style.display = 'block';
                projectsSection.classList.add('active');
            } else {
                summarySection.style.display = 'block';
                experienceSection.style.display = 'block';
                if (projectsSection) {
                    projectsSection.style.display = 'none';
                    projectsSection.classList.remove('active');
                }

                // HR / Finance — переключаем контент внутри Summary и Experience
                document.querySelectorAll('#view-summary .view-content').forEach(el => el.classList.remove('active'));
                document.querySelector(`#${view}-summary`).classList.add('active');

                document.querySelectorAll('.experience .view-content').forEach(el => el.classList.remove('active'));
                const expBlock = document.querySelector(`#${view}-experience`);
                if (expBlock) expBlock.classList.add('active');
            }
        });
    });

});