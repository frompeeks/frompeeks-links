/* ============================================
   НАВИГАЦИЯ МЕЖДУ РАЗДЕЛАМИ
   ============================================ */

/**
 * Инициализация системы навигации
 * Обрабатывает переключение между разными разделами сайта
 */
function initNavigation() {
    // Получаем все кнопки навигации и секции контента
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');
    
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mobileOverlay = document.querySelector('.mobile-overlay');

    // Добавляем обработчик клика на каждую кнопку навигации
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Получаем ID целевой секции из data-атрибута
            const targetSection = btn.dataset.section;
            
            // Переключаем секцию
            switchSection(targetSection, navBtns, sections);
            
            // Закрываем мобильное меню после выбора
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });

    // Обработчик для кнопки меню
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            toggleMobileMenu();
        });
    }

    // Обработчик для оверлея
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            closeMobileMenu();
        });
    }

    // Закрытие меню при изменении размера экрана
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

/**
 * Переключение активной секции
 * @param {string} targetSection - ID секции для отображения
 * @param {NodeList} navBtns - Список кнопок навигации
 * @param {NodeList} sections - Список секций контента
 */
function switchSection(targetSection, navBtns, sections) {
    // Убираем класс active со всех кнопок
    navBtns.forEach(btn => btn.classList.remove('active'));
    
    // Добавляем класс active на текущую кнопку
    const activeBtn = document.querySelector(`[data-section="${targetSection}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Скрываем все секции
    sections.forEach(section => section.classList.remove('active'));
    
    // Показываем целевую секцию
    const targetElement = document.getElementById(targetSection);
    if (targetElement) {
        targetElement.classList.add('active');
        
        // Прокручиваем страницу наверх при переключении секций
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

/**
 * Переключение мобильного меню
 */
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (sidebar && mobileOverlay) {
        const isActive = sidebar.classList.toggle('active');
        mobileOverlay.classList.toggle('active', isActive);
        
        // Меняем иконку меню
        if (menuToggle) {
            menuToggle.textContent = isActive ? '✕' : '☰';
        }
        
        // Блокируем прокрутку body при открытом меню
        document.body.style.overflow = isActive ? 'hidden' : '';
    }
}

/**
 * Закрытие мобильного меню
 */
function closeMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (sidebar && mobileOverlay) {
        sidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
        
        // Возвращаем иконку меню
        if (menuToggle) {
            menuToggle.textContent = '☰';
        }
        
        // Разблокируем прокрутку body
        document.body.style.overflow = '';
    }
}

/**
 * Получение текущей активной секции
 * @returns {string|null} ID активной секции или null
 */
function getCurrentSection() {
    const activeSection = document.querySelector('.content-section.active');
    return activeSection ? activeSection.id : null;
}

/**
 * Программное переключение на определенную секцию
 * @param {string} sectionId - ID секции для отображения
 */
function navigateToSection(sectionId) {
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');
    switchSection(sectionId, navBtns, sections);
}