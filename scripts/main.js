window.telegramConfig = {
  botToken: "8064031856:AAGYg6dkeDBdHp0C8XmV9UdNO20TedaMLd0", 
  chatId: "443139059"
};

// Основные функции сайта
document.addEventListener("DOMContentLoaded", () => {
  // Обработка навигационных ссылок
  document.querySelector(".to_contacts")?.addEventListener("click", () => {
    window.location.href = "https://artfixpro.com/#contacts_block";
  });

  document.querySelector(".to_contacts_sec")?.addEventListener("click", () => {
    window.location.href = "https://artfixpro.com/#contacts_block";
  });

  document.querySelector(".to_services_sec")?.addEventListener("click", () => {
    window.location.href = "https://artfixpro.com/#services_block";
  });

  // Сохранение пути сервиса в sessionStorage
  sessionStorage.setItem("service", "/tv-mounting");

  // Очистка summaryData если оно из предыдущей сессии
  const summaryData = sessionStorage.getItem("summaryData");
  if (summaryData) {
    const parsedData = JSON.parse(summaryData);
    if (
      parsedData.summaryItems &&
      parsedData.summaryItems.length > 0 &&
      (parsedData.summaryItems[0].title || parsedData.summaryItems[0].quantity)
    ) {
      sessionStorage.clear();
      window.location.reload();
    }
  }

  // Обработка выбора услуги
  const getQuoteBtn = document.getElementById("getQuoteBtn");
  const serviceType = document.getElementById("serviceType");
  const serviceTypeError = document.getElementById("serviceTypeError");

  if (getQuoteBtn && serviceType && serviceTypeError) {
    getQuoteBtn.addEventListener("click", function() {
      const selectedUrl = serviceType.value;
      
      serviceType.style.borderColor = '';
      serviceTypeError.textContent = '';
      
      if (!selectedUrl) {
        serviceType.style.borderColor = 'red';
        serviceTypeError.textContent = 'Please select a service';
        return;
      }
      
      window.location.href = selectedUrl;
    });
  }

  // Центрирование кнопки "Go to Service"
  const serviceZipButton = document.querySelector('.service_zip_button');
  if (serviceZipButton) {
    serviceZipButton.style.display = 'flex';
    serviceZipButton.style.justifyContent = 'center';
    serviceZipButton.style.marginTop = '20px';
  }

  // Центрирование изображений в секции "Our Services"
  const serviceImages = document.querySelectorAll('.seo-card img');
  serviceImages.forEach(img => {
    img.style.display = 'block';
    img.style.margin = '0 auto 15px';
  });

  // Инициализация формы контактов
  initContactForm();
    
});

// Функция для отправки данных в Telegram
async function sendToTelegram(formData) {
  // Проверяем наличие конфигурации
  if (!window.telegramConfig) {
    window.telegramConfig = {
      botToken: '6889051644:AAGnXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // Замените на реальный токен
      chatId: '-1002XXXXXXXXX' // Замените на реальный ID чата
    };
  }
  
  const botToken = window.telegramConfig.botToken;
  const chatId = window.telegramConfig.chatId;
  
  if (!botToken || !chatId) {
    return false;
  }
  
  const text = `
📝 Новая заявка с сайта:

👤 Имя: ${formData.firstName} ${formData.lastName}
📧 Email: ${formData.email}
📱 Телефон: ${formData.phone}
💬 Комментарий: ${formData.comments}
  `;
  
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML'
      })
    });
    
    const result = await response.json();
    return result.ok;
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return false;
  }
}

// Инициализация формы контактов
function initContactForm() {
  // Получаем элементы формы
  const contactForm = document.querySelector('.contact-form');
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone-number');
  const commentsInput = document.getElementById('questions-comments');
  const privacyCheckbox = document.getElementById('privacy-agreement');
  const successModal = document.querySelector('.success_modal');
  const modalOverlay = document.querySelector('.modal_overlay');
  
  // Если форма не найдена, выходим из функции
  if (!contactForm) return;
  
  // Отключаем встроенную валидацию браузера
  contactForm.setAttribute('novalidate', 'novalidate');
  
  // Проверяем, существуют ли все необходимые элементы
  if (!firstNameInput || !lastNameInput || !emailInput || !phoneInput || !commentsInput || !privacyCheckbox) {
    return;
  }
  
  // Создаем элементы для отображения ошибок
  const inputs = [firstNameInput, lastNameInput, emailInput, phoneInput, commentsInput];
  inputs.forEach(input => {
    // Проверяем, есть ли уже элемент для ошибки
    let errorDiv = input.parentNode.querySelector('.input-error');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'input-error';
      errorDiv.style.color = 'red';
      errorDiv.style.fontSize = '12px';
      errorDiv.style.marginTop = '5px';
      errorDiv.style.display = 'none';
      input.parentNode.appendChild(errorDiv);
    }
    
    // Добавляем обработчик события input для скрытия ошибки при вводе
    input.addEventListener('input', function() {
      const errorDiv = input.parentNode.querySelector('.input-error');
      if (errorDiv) {
        errorDiv.style.display = 'none';
      }
      input.style.borderColor = '';
    });
  });
  
  // Создаем элемент для отображения ошибки чекбокса
  const checkboxContainer = privacyCheckbox.parentNode;
  let checkboxErrorDiv = checkboxContainer.querySelector('.checkbox-error');
  if (!checkboxErrorDiv) {
    checkboxErrorDiv = document.createElement('div');
    checkboxErrorDiv.className = 'checkbox-error';
    checkboxErrorDiv.style.color = 'red';
    checkboxErrorDiv.style.fontSize = '12px';
    checkboxErrorDiv.style.marginTop = '5px';
    checkboxErrorDiv.style.display = 'none';
    checkboxContainer.appendChild(checkboxErrorDiv);
  }
  
  // Создаем блок для подсказки чекбокса, если его еще нет
  if (!document.querySelector('.checkbox-hint')) {
    const checkboxHint = document.createElement('div');
    checkboxHint.className = 'checkbox-hint';
    checkboxHint.style.fontSize = '12px';
    checkboxHint.style.color = '#666';
    checkboxHint.style.marginTop = '5px';
    checkboxHint.textContent = 'We respect your privacy and will only use your information to contact you about our services.';
    
    // Добавляем подсказку ПОСЛЕ контейнера чекбокса
    checkboxContainer.parentNode.insertBefore(checkboxHint, checkboxContainer.nextSibling);
  }
  
  // Добавляем обработчик события change для чекбокса
  privacyCheckbox.addEventListener('change', function() {
    if (privacyCheckbox.checked) {
      checkboxErrorDiv.style.display = 'none';
    }
  });
  
  // Обработчик отправки формы
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (validateForm()) {
      // Показываем индикатор загрузки
      const submitButton = contactForm.querySelector('.send-request-btn');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Собираем данные формы
      const formData = {
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        comments: commentsInput.value.trim()
      };
      
      // Отправляем данные в Telegram
      sendToTelegram(formData)
        .then(success => {
          // Восстанавливаем кнопку
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
          
          if (success) {
            // Очищаем форму
            contactForm.reset();
            
            // Показываем модальное окно успешной отправки
            showSuccessModal();
          } else {
            alert('Error sending your message. Please try again later.');
          }
        })
        .catch((error) => {
          console.error('Form submission error:', error);
          // Восстанавливаем кнопку
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
          
          alert('Error sending your message. Please try again later.');
        });
    }
  });
  
  // Функция для валидации формы
  function validateForm() {
    let isValid = true;
    
    // Валидация имени
    if (!firstNameInput.value.trim()) {
      showError(firstNameInput, 'Please enter your first name');
      isValid = false;
    }
    
    // Валидация фамилии
    if (!lastNameInput.value.trim()) {
      showError(lastNameInput, 'Please enter your last name');
      isValid = false;
    }
    
    // Валидация email
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Please enter your email');
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email');
      isValid = false;
    }
    
    // Валидация телефона
    if (!phoneInput.value.trim()) {
      showError(phoneInput, 'Please enter your phone number');
      isValid = false;
    } else if (!isValidPhone(phoneInput.value.trim())) {
      showError(phoneInput, 'Please enter a valid phone number');
      isValid = false;
    }
    
    // Валидация комментариев
    if (!commentsInput.value.trim()) {
      showError(commentsInput, 'Please enter your questions or comments');
      isValid = false;
    }
    
    // Валидация чекбокса
    if (!privacyCheckbox.checked) {
      showCheckboxError('Please agree to the privacy policy');
      isValid = false;
    }
    
    return isValid;
  }
  
  // Функция для валидации email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Функция для валидации телефона
  function isValidPhone(phone) {
    const phoneRegex = /^\+?[0-9\s\-()]{10,}$/;
    return phoneRegex.test(phone);
  }
  
  // Функция для отображения ошибки
  function showError(input, message) {
    const errorDiv = input.parentNode.querySelector('.input-error');
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.style.display = 'block';
    }
    input.style.borderColor = 'red';
  }
  
  // Функция для отображения ошибки чекбокса
  function showCheckboxError(message) {
    if (checkboxErrorDiv) {
      checkboxErrorDiv.textContent = message;
      checkboxErrorDiv.style.display = 'block';
    }
  }
  
  // Функция для отображения модального окна успешной отправки
  function showSuccessModal() {
    if (successModal && modalOverlay) {
      modalOverlay.style.display = 'flex';
      successModal.style.display = 'block';
      
      // Закрытие модального окна по клику на оверлей
      modalOverlay.onclick = function(e) {
        if (e.target === modalOverlay) {
          modalOverlay.style.display = 'none';
          successModal.style.display = 'none';
        }
      };
      
      // Закрытие модального окна через 5 секунд
      setTimeout(function() {
        modalOverlay.style.display = 'none';
        successModal.style.display = 'none';
      }, 5000);
    }
  }
}