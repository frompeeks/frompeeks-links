/* ============================================
   ФУНКЦИИ КОПИРОВАНИЯ В БУФЕР ОБМЕНА
   ============================================ */

/**
 * Копирование текста в буфер обмена
 * Использует современный Clipboard API с fallback для старых браузеров
 * @param {string} text - Текст для копирования
 * @param {string} platform - Название платформы (для уведомления)
 */
function copyToClipboard(text, platform) {
    // Проверяем поддержку современного Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        // Используем современный метод
        navigator.clipboard.writeText(text)
            .then(() => {
                showNotification(text, platform);
            })
            .catch(err => {
                console.error('Ошибка копирования через Clipboard API:', err);
                // При ошибке используем резервный метод
                fallbackCopy(text, platform);
            });
    } else {
        // Для старых браузеров используем резервный метод
        fallbackCopy(text, platform);
    }
}

/**
 * Резервный метод копирования для старых браузеров
 * Создает временное текстовое поле для копирования
 * @param {string} text - Текст для копирования
 * @param {string} platform - Название платформы (для уведомления)
 */
function fallbackCopy(text, platform) {
    // Создаем временный textarea элемент
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Делаем элемент невидимым
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    
    // Добавляем на страницу
    document.body.appendChild(textArea);
    
    // Выделяем текст
    textArea.focus();
    textArea.select();
    
    try {
        // Пытаемся скопировать
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification(text, platform);
        } else {
            console.error('Не удалось скопировать текст');
        }
    } catch (err) {
        console.error('Ошибка при копировании:', err);
    }
    
    // Удаляем временный элемент
    document.body.removeChild(textArea);
}

/**
 * Показ уведомления о копировании
 * @param {string} text - Скопированный текст
 * @param {string} platform - Название платформы
 */
function showNotification(text, platform) {
    const notification = document.getElementById('copyNotification');
    
    if (!notification) {
        console.error('Элемент уведомления не найден');
        return;
    }
    
    // Убираем класс hide если он есть
    notification.classList.remove('hide');
    
    // Устанавливаем текст уведомления
    notification.textContent = `✓ ${platform} скопирован: ${text}`;
    
    // Показываем уведомление
    notification.classList.add('show');
    
    // Скрываем уведомление через 2.5 секунды с анимацией
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
        
        // Удаляем класс hide после завершения анимации
        setTimeout(() => {
            notification.classList.remove('hide');
        }, 400);
    }, 2500);
}

/**
 * Проверка поддержки Clipboard API
 * @returns {boolean} true если Clipboard API поддерживается
 */
function isClipboardSupported() {
    return !!(navigator.clipboard && navigator.clipboard.writeText);
}