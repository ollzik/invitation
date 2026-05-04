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

// Функция для плавного скролла
// Функция для плавного скролла на 100vh
// Функция для плавного скролла на 100vh
// Самый простой и надежный вариант
// Функция для плавного скролла (работает всегда)
// Функция для плавного скролла (работает всегда)
// Создаем универсальную стрелку, которая работает всегда
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
    `;
    
    // Обработчик клика
    scrollArrow.onclick = (e) => {
        e.preventDefault();
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };
}

// Замените setupScrollArrow() на createUnlimitedScrollArrow()
// В коде waitForPreloader замените:
// setupScrollArrow(); → createUnlimitedScrollArrow();

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

















// Генерация календаря на Май 2026
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
        
        if (day === 17) {
            dateDiv.classList.add('highlight');
        }
        
        calendarDates.appendChild(dateDiv);
    }
}

// Генерация календаря на Май 2026
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

// Запускаем после загрузки
setTimeout(() => {
    generateCalendar();
    observeSecondPage();
}, 500);











// Слайдер для третьей страницы
let currentSlide = 0;
let slides = [];

// Инициализация слайдера (фото загрузите сами в массив)
function initSlider() {
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderDots = document.getElementById('sliderDots');
    
    // СЮДА ВСТАВЬТЕ ПУТИ К ВАШИМ ФОТОГРАФИЯМ
    const images = [
        'images/wear1.png',  // замените на свои
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
        slide.innerHTML = `<img src="${img}" alt="Фото ${index + 1}">`;
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

// Добавьте вызовы в существующие функции или в setTimeout
setTimeout(() => {
    generateCalendar();
    observeSecondPage();
    observeThirdPage();
    initSlider();
}, 500);

// Добавляем обработчики кнопок
setTimeout(() => {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
}, 600);



