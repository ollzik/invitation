// Не нужно импортировать, функция доступна глобально

const preloaderButton = document.querySelector('.preloader__button');
const bodyElement = document.querySelector('body');
const preloader = document.querySelector('.preloader');

const playClickSound = () => {
    const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio not supported'));
};

preloaderButton.addEventListener('click', () => {
    playClickSound();
    
    bodyElement.classList.remove('non-active');
    
    preloader.style.opacity = '0';
    preloader.style.transition = 'opacity 0.6s ease';
    
    setTimeout(() => {
        preloader.style.display = 'none';
        
        // Вызываем глобальную функцию
        if (window.funFirstText) {
            window.funFirstText();
        }
    }, 600);
});