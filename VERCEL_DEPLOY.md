# Инструкция по деплою на Vercel

## Быстрый старт

### Шаг 1: Создайте аккаунт на Vercel
1. Перейдите на https://vercel.com
2. Зарегистрируйтесь через GitHub (рекомендуется) или email

### Шаг 2: Создайте GitHub репозиторий
1. Зайдите на https://github.com
2. Создайте новый репозиторий (например: `dikarev-finance-site`)
3. **Важно:** Не добавляйте README, .gitignore или лицензию (они уже есть в проекте)

### Шаг 3: Загрузите проект в GitHub

Откройте терминал в папке проекта и выполните:

```bash
cd /Users/romandikarev/Desktop/SelfPage_FinanceSpec

# Инициализируйте git (если еще не сделано)
git init

# Добавьте все файлы
git add .

# Создайте первый коммит
git commit -m "Initial commit"

# Добавьте удаленный репозиторий (замените YOUR_USERNAME и REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Загрузите на GitHub
git branch -M main
git push -u origin main
```

### Шаг 4: Подключите проект к Vercel

1. Зайдите на https://vercel.com/dashboard
2. Нажмите **"Add New..."** → **"Project"**
3. Выберите ваш GitHub репозиторий
4. Настройки проекта:
   - **Framework Preset:** Other
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Нажмите **"Deploy"**

Vercel автоматически соберет и задеплоит ваш сайт!

### Шаг 5: Подключите свой домен dikarevfinance.ru

1. В проекте на Vercel перейдите в **Settings** → **Domains**
2. Добавьте домен: `dikarevfinance.ru` и `www.dikarevfinance.ru`
3. Vercel покажет DNS настройки (обычно это CNAME записи)

#### Настройка DNS на REG.RU:

1. Зайдите в панель REG.RU
2. Найдите раздел **DNS** или **Управление DNS**
3. Добавьте/измените записи:
   - **Тип:** CNAME
   - **Имя:** @ (или оставьте пустым для корневого домена)
   - **Значение:** `cname.vercel-dns.com` (или то, что покажет Vercel)
   
   Если корневой домен не поддерживает CNAME, используйте A-запись:
   - **Тип:** A
   - **Имя:** @
   - **Значение:** IP адрес, который покажет Vercel (обычно 76.76.21.21)

   Для www:
   - **Тип:** CNAME
   - **Имя:** www
   - **Значение:** `cname.vercel-dns.com`

4. Подождите 5-30 минут (DNS обновление)
5. Vercel автоматически выпустит SSL сертификат

## Обновление сайта

После любых изменений просто:

```bash
# Внесите изменения в код
# Соберите проект
npm run build

# Загрузите на GitHub
git add .
git commit -m "Описание изменений"
git push
```

Vercel **автоматически** задеплоит обновления! 🎉

## Преимущества Vercel:

✅ Автоматический деплой при каждом push в GitHub  
✅ Бесплатный SSL сертификат  
✅ CDN по всему миру (быстрая загрузка)  
✅ Предпросмотр изменений перед деплоем  
✅ История версий  
✅ Полностью бесплатно для статических сайтов

## Полезные ссылки:

- Vercel Dashboard: https://vercel.com/dashboard
- Документация Vercel: https://vercel.com/docs
- Настройка домена: https://vercel.com/docs/concepts/projects/domains

