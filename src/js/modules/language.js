export function initLanguage() {
    let translations = {};
    let currentLang = localStorage.getItem('language') || 'ru';

    // Загружаем переводы
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`assets/lang/${lang}.json`);
            if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
            translations = await response.json();
            applyTranslations();
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback на русский, если английский не загрузился
            if (lang === 'en') {
                currentLang = 'ru';
                loadTranslations('ru');
            }
        }
    }

    // Применяем переводы ко всем элементам с data-key
    function applyTranslations() {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[key]) {
                // Для элементов с innerHTML (поддержка <br>)
                if (element.tagName === 'P' || element.tagName === 'LI' || element.tagName === 'H1' || element.tagName === 'H2') {
                    element.innerHTML = translations[key];
                } else {
                    element.textContent = translations[key];
                }
            }
        });

        document.querySelectorAll('[data-key-aria]').forEach(element => {
            const key = element.getAttribute('data-key-aria');
            if (translations[key]) {
                element.setAttribute('aria-label', translations[key]);
            }
        });

        // Обновляем атрибут lang у html
        document.documentElement.lang = currentLang;
    }

    // Переключение языка
    function switchLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        loadTranslations(lang);
        
        // Обновляем активную кнопку
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    // Обработчики для кнопок переключения языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang !== currentLang) {
                switchLanguage(lang);
            }
        });
    });

    // Инициализация при загрузке
    loadTranslations(currentLang);
    
    // Устанавливаем активную кнопку
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
}
