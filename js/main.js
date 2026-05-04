// ==================== MAIN.JS - ПОЛНЫЙ ФАЙЛ СО ВСЕМИ СТРАНИЦАМИ ====================

// -------------------- ПЕРВАЯ СТРАНИЦА (main) --------------------
const mainTextEl = document.querySelector('.firstPage__mainText');
const firstText = 'Приглашаю вас\nна свой Юбилей';

// Функция для показа фото и стрелки
const showPhoto = () => {
    const photo = document.querySelector('.firstPhoto');
    const scrollArrow = document.querySelector('.scroll-arrow');
    
    if (photo) {
        photo.classList.add('visible');
    }
    
    // Стрелка появляется плавно через 1 секунду после фото
    setTimeout(() => {
        if (scrollArrow) {
            scrollArrow.style.display = 'flex';
            scrollArrow.style.opacity = '0';
            scrollArrow.style.transition = '0.3s';
            setTimeout(() => {
                scrollArrow.classList.add('visible');
                scrollArrow.style.opacity = '1';
            }, 10);
        }
    }, 500);
};

const funFirstText = () => {
    let currentText = '';
    for(let i = 0; i < firstText.length; i++){
        setTimeout(() => {
            currentText += firstText[i];
            mainTextEl.textContent = currentText;
            
            if (currentText === firstText) {
                setTimeout(() => {
                    showPhoto();
                }, 700);
            }
        }, i * 100);
    }
};

// Создаем летающие элементы
const createFloatingElement = () => {
    const firstPage = document.querySelector('.firstPage');
    if (!firstPage) return;
    
    const decor = document.createElement('div');
    const isNote = Math.random() > 0.5;
    decor.className = isNote ? 'floating-note-mini' : 'floating-decor';
    decor.textContent = isNote ? '♪' : '✦';
    
    const side = Math.floor(Math.random() * 4);
    let startX, startY;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    switch(side) {
        case 0:
            startX = Math.random() * viewportWidth;
            startY = -20;
            break;
        case 1:
            startX = viewportWidth + 20;
            startY = Math.random() * viewportHeight;
            break;
        case 2:
            startX = Math.random() * viewportWidth;
            startY = viewportHeight + 20;
            break;
        default:
            startX = -20;
            startY = Math.random() * viewportHeight;
    }
    
    let endX, endY;
    switch(side) {
        case 0:
            endX = startX + (Math.random() - 0.5) * 200;
            endY = viewportHeight + 50;
            break;
        case 1:
            endX = -50;
            endY = startY + (Math.random() - 0.5) * 200;
            break;
        case 2:
            endX = startX + (Math.random() - 0.5) * 200;
            endY = -50;
            break;
        default:
            endX = viewportWidth + 50;
            endY = startY + (Math.random() - 0.5) * 200;
    }
    
    const size = 16 + Math.random() * 24;
    const duration = 8 + Math.random() * 12;
    
    decor.style.left = startX + 'px';
    decor.style.top = startY + 'px';
    decor.style.fontSize = size + 'px';
    decor.style.animationDuration = duration + 's';
    
    decor.style.setProperty('--moveX', (endX - startX) + 'px');
    decor.style.setProperty('--moveY', (endY - startY) + 'px');
    
    firstPage.appendChild(decor);
    
    setTimeout(() => {
        if (decor && decor.remove) decor.remove();
    }, duration * 1000);
};

// Запускаем декорации
const startDecor = () => {
    for(let i = 0; i < 40; i++) {
        setTimeout(() => {
            createFloatingElement();
        }, i * 150);
    }
    
    setInterval(() => {
        for(let i = 0; i < 2; i++) {
            createFloatingElement();
        }
    }, 1500);
};

// Создаем универсальную стрелку
function createUnlimitedScrollArrow() {
    // Удаляем старую стрелку если есть
    const oldArrow = document.querySelector('.scroll-arrow');
    if (oldArrow) oldArrow.remove();
    
    // Создаем новую
    const scrollArrow = document.createElement('div');
    scrollArrow.className = 'scroll-arrow visible';
    scrollArrow.innerHTML = '<span class="arrow-down">↓</span>';
    document.body.appendChild(scrollArrow);
    
    // Добавляем стили
    scrollArrow.style.cssText = `
        position: fixed;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 99999;
        cursor: pointer;
        background: rgba(245, 0, 0, 0.3);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(5px);
        border: 1px solid rgba(245, 208, 0, 0.5);
        animation: bounce 2s ease-in-out infinite;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    `;
    
    // Обработчик клика
    scrollArrow.onclick = (e) => {
        e.preventDefault();
        const fourthPage = document.querySelector('.fourthPage');
        if (fourthPage) {
            const fourthRect = fourthPage.getBoundingClientRect();
            if (fourthRect.top <= window.innerHeight / 2) {
                return;
            }
        }
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };
}

// Запускаем после скрытия прелоадера
const waitForPreloader = setInterval(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader && preloader.style.display === 'none') {
        clearInterval(waitForPreloader);
        startDecor();
        funFirstText();
        createUnlimitedScrollArrow();
    }
}, 100);


// -------------------- ВТОРАЯ СТРАНИЦА (календарь) --------------------
// Генерация календаря на Май 2026 (исправленная версия, день 15)
function generateCalendar() {
    const calendarDates = document.getElementById('calendar-dates');
    if (!calendarDates) return;
    
    const year = 2026;
    const month = 4; // Май (0-11)
    
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    let startOffset = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    calendarDates.innerHTML = '';
    
    for (let i = 0; i < startOffset; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'calendar-date';
        emptyDiv.style.opacity = '0.3';
        calendarDates.appendChild(emptyDiv);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dateDiv = document.createElement('div');
        dateDiv.className = 'calendar-date';
        dateDiv.textContent = day;
        
        if (day === 15) {
            dateDiv.classList.add('highlight');
        }
        
        calendarDates.appendChild(dateDiv);
    }
}

// Наблюдатель для появления второй страницы
function observeSecondPage() {
    const secondPage = document.querySelector('.secondPage');
    if (!secondPage) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                secondPage.classList.add('visible');
                observer.unobserve(secondPage);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(secondPage);
}


// -------------------- ТРЕТЬЯ СТРАНИЦА (слайдер) --------------------
let currentSlide = 0;
let slides = [];

// Инициализация слайдера
function initSlider() {
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderDots = document.getElementById('sliderDots');
    
    // Пути к фотографиям
    const images = [
        'images/wear1.png',
        'images/wear2.png',
        'images/wear3.png',
    ];
    
    if (!sliderTrack || images.length === 0) return;
    
    // Очищаем
    sliderTrack.innerHTML = '';
    sliderDots.innerHTML = '';
    slides = images;
    
    // Создаем слайды
    images.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `<img src="${img}" alt="Фото ${index + 1}" onerror="this.src='https://placehold.co/600x400/f44/white?text=Фото'">`;
        sliderTrack.appendChild(slide);
        
        // Создаем точки
        const dot = document.createElement('div');
        dot.className = 'slider-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });
    
    // Обновляем размеры
    updateSlider();
}

function updateSlider() {
    const sliderTrack = document.getElementById('sliderTrack');
    if (!sliderTrack) return;
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Обновляем активную точку
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function goToSlide(index) {
    const slidesCount = slides.length;
    if (index < 0) index = slidesCount - 1;
    if (index >= slidesCount) index = 0;
    currentSlide = index;
    updateSlider();
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Наблюдатель для третьей страницы
function observeThirdPage() {
    const thirdPage = document.querySelector('.thirdPage');
    if (!thirdPage) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                thirdPage.classList.add('visible');
                observer.unobserve(thirdPage);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(thirdPage);
}


// -------------------- ЧЕТВЕРТАЯ СТРАНИЦА (опрос Telegram) --------------------
// -------------------- ЧЕТВЕРТАЯ СТРАНИЦА (опрос Telegram) --------------------
const BOT_TOKEN = '8026015816:AAHxjC5iCQf0DteP4_URNRw74JE6pXKXMho';
const CHAT_ID = '-1003831190327';

async function sendToTelegram(messageText) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const payload = {
        chat_id: CHAT_ID,
        text: messageText,
        parse_mode: 'HTML',
        disable_web_page_preview: true
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        return data.ok === true;
    } catch (error) {
        console.error('Ошибка отправки в Telegram:', error);
        return false;
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function buildTelegramMessage(formData) {
    const name = formData.name.trim() || 'Не указано';
    const phone = formData.phone.trim() || 'Не указан';
    const attendance = formData.attending;
    const guestsCount = formData.guestsCount;
    const wishes = formData.wishes.trim() || '—';
    
    let statusEmoji = '';
    if (attendance.includes('да, буду')) statusEmoji = '✅';
    else if (attendance.includes('не смогу')) statusEmoji = '❌';
    else statusEmoji = '⏳';
    
    return `🎉 <b>НОВЫЙ ОТВЕТ НА ПРИГЛАШЕНИЕ (Юбилей)</b> 🎉

👤 <b>Имя:</b> ${escapeHtml(name)}
📞 <b>Телефон:</b> ${escapeHtml(phone)}
${statusEmoji} <b>Присутствие:</b> ${escapeHtml(attendance)}
👥 <b>Количество гостей:</b> ${guestsCount}
💬 <b>Пожелания:</b> ${escapeHtml(wishes)}

📅 15 мая 2026 · стиль «Стиляги»
📍 Ресторан «Звезда Кочевника», г. Чита`;
}

// ПРОСТАЯ ФУНКЦИЯ СКРЫТИЯ СТРЕЛКИ - вызывается по скроллу
function handleArrowOnFourthPage() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    const fourthPage = document.querySelector('.fourthPage');
    if (!scrollArrow || !fourthPage) return;
    
    const fourthRect = fourthPage.getBoundingClientRect();
    // Если верх четвертой страницы достиг 100px от верха экрана - скрываем стрелку
    if (fourthRect.top <= 100) {
        scrollArrow.style.opacity = '0';
        scrollArrow.style.visibility = 'hidden';
        scrollArrow.style.pointerEvents = 'none';
    } else {
        scrollArrow.style.opacity = '1';
        scrollArrow.style.visibility = 'visible';
        scrollArrow.style.pointerEvents = 'auto';
    }
}

function observeFourthPage() {
    const fourthPage = document.querySelector('.fourthPage');
    if (!fourthPage) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fourthPage.classList.add('visible');
                observer.unobserve(fourthPage);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(fourthPage);
    
    // Добавляем обработчик скролла для стрелки
    window.addEventListener('scroll', handleArrowOnFourthPage);
    // Вызываем один раз для инициализации
    setTimeout(handleArrowOnFourthPage, 100);
}

function initRadioStyles() {
    const radioOptions = document.querySelectorAll('.radio-option');
    radioOptions.forEach(opt => {
        const radio = opt.querySelector('input[type="radio"]');
        if (radio) {
            radio.addEventListener('change', function() {
                radioOptions.forEach(o => o.classList.remove('selected'));
                if (this.checked) opt.classList.add('selected');
            });
            if (radio.checked) opt.classList.add('selected');
        }
    });
}

function initForm() {
    const form = document.getElementById('telegramPollForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('guestName');
        const phoneInput = document.getElementById('guestPhone');
        const attendingRadios = document.querySelectorAll('input[name="attending"]');
        const countInput = document.getElementById('guestCount');
        const wishesInput = document.getElementById('guestWishes');
        const statusDiv = document.getElementById('formStatus');
        
        let attendingValue = '';
        for (let radio of attendingRadios) {
            if (radio.checked) { attendingValue = radio.value; break; }
        }
        
        if (!nameInput.value.trim()) {
            statusDiv.innerHTML = '<span class="status-error">❌ Пожалуйста, укажите ваше имя</span>';
            setTimeout(() => { statusDiv.innerHTML = ''; }, 3000);
            return;
        }
        if (!phoneInput.value.trim()) {
            statusDiv.innerHTML = '<span class="status-error">📞 Укажите номер телефона</span>';
            setTimeout(() => { statusDiv.innerHTML = ''; }, 3000);
            return;
        }
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = 'Отправка...';
        statusDiv.innerHTML = '<span style="color:#ffd966;">⏳ Отправляем...</span>';
        
        const formData = {
            name: nameInput.value,
            phone: phoneInput.value,
            attending: attendingValue,
            guestsCount: countInput.value,
            wishes: wishesInput.value
        };
        
        const messageText = buildTelegramMessage(formData);
        const success = await sendToTelegram(messageText);
        
        if (success) {
            statusDiv.innerHTML = '<span class="status-success">✨ Спасибо! Ваш ответ отправлен. Ждём вас! ✨</span>';
            nameInput.value = '';
            phoneInput.value = '';
            const defaultRadio = document.querySelector('input[name="attending"][value="да, буду с радостью!"]');
            if (defaultRadio) defaultRadio.checked = true;
            countInput.value = '1';
            wishesInput.value = '';
            initRadioStyles();
            setTimeout(() => { statusDiv.innerHTML = ''; }, 5000);
        } else {
            statusDiv.innerHTML = '<span class="status-error">⚠️ Ошибка. Попробуйте позже.</span>';
            setTimeout(() => { statusDiv.innerHTML = ''; }, 5000);
        }
        
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
    });
}

function addFloatingDecorToFourth() {
    const fourthPage = document.querySelector('.fourthPage');
    if (!fourthPage) return;
    
    const symbols = ['♪', '♫', '★', '✧', '✦', '❤️', '🎵', '🎶'];
    
    for (let i = 0; i < 12; i++) {
        const decor = document.createElement('span');
        decor.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        decor.style.position = 'absolute';
        decor.style.fontSize = (12 + Math.random() * 24) + 'px';
        decor.style.color = `rgba(245, ${80 + Math.random() * 100}, 50, ${0.1 + Math.random() * 0.3})`;
        decor.style.pointerEvents = 'none';
        decor.style.zIndex = '0';
        decor.style.left = Math.random() * 100 + '%';
        decor.style.top = Math.random() * 100 + '%';
        decor.style.animation = `floatDecorFourth ${8 + Math.random() * 10}s ease-in-out infinite`;
        decor.style.opacity = 0.3 + Math.random() * 0.4;
        decor.style.userSelect = 'none';
        fourthPage.appendChild(decor);
    }
    
    if (!document.querySelector('#fourthDecorStyle')) {
        const style = document.createElement('style');
        style.id = 'fourthDecorStyle';
        style.textContent = `
            @keyframes floatDecorFourth {
                0% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
                50% { transform: translateY(-25px) rotate(15deg); opacity: 0.7; }
                100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
            }
        `;
        document.head.appendChild(style);
    }
}
// -------------------- ЗАПУСК ВСЕХ КОМПОНЕНТОВ --------------------
setTimeout(() => {
    // Вторая страница
    generateCalendar();
    observeSecondPage();
    
    // Третья страница
    observeThirdPage();
    initSlider();
    
    // Четвертая страница
    observeFourthPage();  // Теперь здесь добавляется и обработчик стрелки
    initRadioStyles();
    initForm();
    addFloatingDecorToFourth();
}, 500);

// Добавляем обработчики кнопок слайдера
setTimeout(() => {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
}, 600);