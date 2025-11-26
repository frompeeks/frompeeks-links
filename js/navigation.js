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

    // Добавляем обработчик клика на каждую кнопку
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Получаем ID целевой секции из data-атрибута
            const targetSection = btn.dataset.section;
            
            // Переключаем секцию
            switchSection(targetSection, navBtns, sections);
        });
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