document.addEventListener("DOMContentLoaded", () => {
  // Открытие квиза по клику
  const openBtns = document.querySelectorAll("#openPlansBtn, #openPlansBtn2");
  const bookingFormOverlay = document.getElementById("bookingFormOverlay");
  const quizCloseBtn = document.getElementById("quizCloseBtn");
  const quizFormContainer = document.getElementById("quizFormContainer");

  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      renderQuizForm();
      bookingFormOverlay.classList.remove("hidden");
      document.body.classList.add("modal-open");
    });
  });

  quizCloseBtn.addEventListener("click", () => {
    bookingFormOverlay.classList.add("hidden");
    document.body.classList.remove("modal-open");
    quizFormContainer.innerHTML = ""; // Очистка
  });

  // Закрытие по клику вне окна
  bookingFormOverlay.addEventListener("click", (e) => {
    if (e.target === bookingFormOverlay) {
      bookingFormOverlay.classList.add("hidden");
      document.body.classList.remove("modal-open");
      quizFormContainer.innerHTML = "";
    }
  });

  // Отправка формы в Telegram Bot
function sendToTelegram(fields, onSuccess, onError) {
  const pageUrl = window.location.href;
    // Format phone for clickable link in Telegram
    const cleanPhone = fields.phone.replace(/\D/g, "");
    const phoneLink = `[+1${cleanPhone}](tel:+1${cleanPhone})`;
  let details = `🖼 New Wall Hanging Order
    🌐 Order from: ${pageUrl}
    From: ${fields.name}
    Phone: ${phoneLink}
    Address: ${fields.address}
    Date: ${fields.date} ${fields.time}
    Ladder: ${fields.ladder}
    ${fields.catDetails ? fields.catDetails : ""}`;

  if (fields.details) details += `\nComment: ${fields.details}`;
   // Сообщение для клиента (подтверждение)
  const tgMsg1 = `✅ Hello ${fields.name}! Thank you for choosing ArtFixPro LLC. Your order has been confirmed. The service cost is $75.00/hour, and our technician will arrive on ${fields.date} at ${fields.time}. We appreciate your trust and look forward to assisting you!`;

  // Сообщение если нужно отказать/перенести
  const tgMsg2 = `⚠️ Hello ${fields.name}! Thank you for contacting ArtFixPro LLC. Unfortunately, the date/time you selected is already booked. Would you like to reschedule for ${fields.date} at ${fields.time}? Please let us know if that works for you. We appreciate your understanding!`;

  const tgToken = "8064031856:AAGYg6dkeDBdHp0C8XmV9UdNO20TedaMLd0";
  const chatId = "443139059";
  const sendMsg = (text) =>
    fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
    });

  sendMsg(details)
    .then(() => {
      if (onSuccess) onSuccess();})
    .then(() => sendMsg(tgMsg1))
    .then(() => sendMsg(tgMsg2))
    
    .catch((err) => {
      if (onError) onError(err);
    });
}

  // Форма квиза
  function renderQuizForm() {
    quizFormContainer.innerHTML = `
      <style>
        body {background:#f5f7fa;}
        .wall-hanging-booking-form {
          max-width: 500px;
          margin: 0 auto 0 auto;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 6px 32px rgba(34,34,34,0.10);
          padding: 32px 18px;
          font-family: 'Inter', Arial, sans-serif;
        }
        .wall-hanging-booking-form h2 {
          text-align: center;
          margin-bottom: 12px;
          font-size: 2rem;
          letter-spacing: -1px;
        }
          .input-error {
            border-color: #e23c3c !important;
            background: #fff6f6 !important;
          }
          .input-error-message {
            color: #e23c3c;
            font-size: 0.98em;
            margin: 3px 0 7px 4px;
            line-height: 1.2;
            font-weight: 500;
            letter-spacing: -0.02em;
          }
        .price-banner {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f4f7fb;
          color: #1a3257;
          font-weight: 600;
          border-radius: 8px;
          font-size: 1.08rem;
          margin-bottom: 22px;
          gap: 10px;
          padding: 8px 0;
        }
        .form-label {
          font-weight: 500;
          margin-top: 16px;
          margin-bottom: 6px;
          display: block;
          color: #162c46;
        }
        .required { color: #d50000; }
        .category-options-multi {
          display: flex;
          gap: 14px;
          margin-bottom: 18px;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .category-option {
          background: #f4f7fb;
          border: 2px solid #d9e3ef;
          border-radius: 14px;
          flex: 1 1 90px;
          min-width: 85px;
          max-width: 120px;
          padding: 15px 8px 10px 8px;
          text-align: center;
          cursor: pointer;
          transition: border 0.17s, box-shadow 0.17s, background 0.18s;
          user-select: none;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .category-option svg {
          height: 38px;
          margin-bottom: 7px;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        .category-option.active {
          border: 2px solid #2382f4;
          background: #e9f2ff;
          box-shadow: 0 3px 12px 0 rgba(35,130,244,0.09);
        }
        .category-option span {
          font-size: 1rem;
          color: #234;
          margin-top: 3px;
          font-weight: 500;
        }
        @media (max-width: 600px) {
          .category-options-multi {
            flex-wrap: wrap;
            gap: 7px;
          }
          .category-option {
            min-width: 78px;
            max-width: 120px;
            padding: 10px 3px 8px 3px;
            font-size: 0.96rem;
          }
        }
        .category-details {
          margin-bottom: 18px;
          margin-top: 8px;
          padding: 13px 0 8px 0;
          border-bottom: 1px solid #eee;
          background: #fcfcfd;
        }
        .category-label {
          font-weight: 600;
          color: #2382f4;
          font-size: 1.07rem;
          margin-bottom: 6px;
          margin-top: 2px;
        }

        .radio-group {
          display: flex;
          flex-wrap: wrap;
          gap: 18px 32px;
          margin-bottom: 12px; 
        }

        .radio-group label {
          background: #f7f9fc;
          border: 1.3px solid #d8e4f7;
          border-radius: 7px;
          padding: 7px 16px 7px 10px;
          min-width: unset;
          font-size: 1rem;
          font-weight: 400;
          display: flex;
          align-items: center;
          gap: 7px;
          color: #1a3257;
          transition: border-color 0.15s, box-shadow 0.18s;
          cursor: pointer;
          margin-bottom: 7px;
          box-shadow: 0 2px 7px 0 rgba(60,130,244,0.02);
          white-space: nowrap;
        }

        input[type="radio"] {
          accent-color: #2382f4;
          /* margin-right: 5px; */
          flex-shrink: 10;
        }

        input, textarea {
          padding: 8px 10px;
          margin-top: 2px;
          border: 1.2px solid #d6dbe8;
          border-radius: 8px;
          font-size: 1rem;
          background: #f8fafb;
          transition: border .16s;
          margin-bottom: 11px;
          resize: vertical;
        }
        textarea {
          width: 95%;
          margin-right: 10px;
        }

        input:focus, textarea:focus {
          border-color: #2382f4;
          background: #fff;
          outline: none;
        }
        .green_sumbit_btn {
          width: 100%;
          background: linear-gradient(90deg, #35b956 0%, #28ad8d 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 15px 0;
          font-size: 1.13rem;
          font-weight: 600;
          margin-top: 12px;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 16px 0 rgba(40,173,141,0.08);
          cursor: pointer;
          transition: background 0.18s;
        }
        .green_sumbit_btn:hover {
          background: linear-gradient(90deg, #28ad8d 0%, #35b956 100%);
        }
        .service-block {
      background: #f8fbff;
      border: 2px solid #d3e6fb;
      border-radius: 15px;
      margin-bottom: 22px;
      padding: 18px 16px 14px 16px;
      box-shadow: 0 2px 10px 0 rgba(35,130,244,0.07);
      transition: border 0.2s, box-shadow 0.2s;
    }

    .art-block { border-color: #fbbc04; background: #fffdf7; }
    .mirror-block { border-color: #82cfff; background: #f6fbff; }
    .shelf-block { border-color: #b2e7c3; background: #f6fff8; }
    .curtain-block { border-color: #e1c5fb; background: #faf6ff; }

    .service-block .category-label {
      color: #2876d9;
      margin-bottom: 9px;
      font-size: 1.08rem;
      font-weight: 700;
    }

    .form-label {
      display: block;
      margin: 15px 0 7px 0;
      font-weight: 500;
      color: #234;
    }

    .radio-group {
      display: flex;
      flex-wrap: wrap;
      gap: 0 34px;  /* горизонтальный отступ между радиокнопками */
      margin-bottom: 12px;
    }

    .radio-group label {
      min-width: 140px;       /* задаёт минимальную ширину, чтобы не прыгали */
      display: flex;
      align-items: center;
      line-height: 1.2;
      font-size: 1.01rem;
      color: #20344a;
      margin-bottom: 8px;
    }

    input[type="radio"] {
      accent-color: #2382f4;
      /* margin-right: 7px; */
    }

    @media (max-width: 600px) {
      .radio-group label {
        min-width: 110px;
        font-size: 0.99rem;
      }
      .service-block {
        padding: 13px 6px 11px 10px;
      }
    }
      /* Оверлей */
#bookingFormOverlay {
  position: fixed;
  inset: 0;
  background: rgba(36,45,70,0.17);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 12000;
  transition: opacity .2s;
}

/* Скрытое окно */
#bookingFormOverlay.hidden {
  display: none !important;
}

/* Внутри модального окна квиза */
.booking_modal {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 42px 0 rgba(10, 23, 55, 0.19);
  position: relative;
  padding: 0;
  max-width: 540px;
  width: 98vw;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Контейнер формы, чтобы прокручивался только он */
#quizFormContainer {
  padding: 28px 18px 20px 18px;
  overflow-y: auto;
  max-height: 80vh;
  min-height: 120px;
}

/* Кнопка закрытия всегда видна */
.booking-close {
  position: absolute;
  top: 12px;
  right: 14px;
  font-size: 2.1rem;
  color: #a7a7a7;
  border: none;
  background: none;
  z-index: 2;
  cursor: pointer;
  padding: 0 5px;
  transition: color 0.16s;
}
.booking-close:hover { color: #e35a44; }

@media (width: 600px) {
  .booking_modal {
    width: 100vw;
    border-radius: 0;
    min-width: 0;
  }
  #quizFormContainer {
    padding: 13px 5vw 13px 5vw;
    max-height: 74vh;
  }
}

  </style>
      <form id="wallHangingQuiz" class="wall-hanging-booking-form" novalidate>
        <h2>Book Wall Hanging Service</h2>
        <div class="price-banner">
          <span>$75/hour</span> <span>•</span> <span>Minimum 1 hour</span>
        </div>
        <label class="form-label">What do you want to hang? <span class="required">*</span></label>
        <div class="category-options-multi">
          <div class="category-option" data-category="art">
            <svg width="36" height="36" fill="none" stroke="#234" stroke-width="2"><rect x="6" y="8" width="24" height="20" rx="2"/><polyline points="6,12 18,3 30,12"/></svg>
            <span>Pictures & Art</span>
          </div>
          <div class="category-option" data-category="mirror">
            <svg width="36" height="36" fill="none" stroke="#234" stroke-width="2"><rect x="10" y="6" width="16" height="24" rx="8"/><line x1="18" y1="8" x2="18" y2="28"/></svg>
            <span>Mirrors</span>
          </div>
          <div class="category-option" data-category="shelf">
            <svg width="36" height="36" fill="none" stroke="#234" stroke-width="2"><rect x="8" y="24" width="20" height="4" rx="1"/><rect x="10" y="14" width="8" height="7" rx="1"/><rect x="20" y="12" width="6" height="9" rx="1"/></svg>
            <span>Shelves</span>
          </div>
          <div class="category-option" data-category="curtain">
            <svg width="36" height="36" fill="none" stroke="#234" stroke-width="2"><line x1="7" y1="12" x2="29" y2="12"/><rect x="7" y="14" width="4" height="10" rx="1"/><rect x="25" y="14" width="4" height="10" rx="1"/></svg>
            <span>Curtain Rods</span>
          </div>
        </div>

        <!-- Art -->
        <div class="service-block art-block category-details" id="details-art" style="display:none;">
          <div class="category-label">Pictures & Art</div>
          <label class="form-label">Number of small items*</label>
          <div class="radio-group">
            <label><input type="radio" name="small-items-art" value="none"> None</label>
            <label><input type="radio" name="small-items-art" value="1-5"> 1-5</label>
            <label><input type="radio" name="small-items-art" value="6-10"> 6-10</label>
            <label><input type="radio" name="small-items-art" value="10+"> More than 10</label>
          </div>
          <label class="form-label">Number of large items*</label>
          <div class="radio-group">
            <label><input type="radio" name="large-items-art" value="none"> None</label>
            <label><input type="radio" name="large-items-art" value="1-5"> 1-5</label>
            <label><input type="radio" name="large-items-art" value="6-10"> 6-10</label>
            <label><input type="radio" name="large-items-art" value="10+"> More than 10</label>
          </div>
        </div>

        <!-- Mirrors -->
        <div class="service-block mirror-block category-details" id="details-mirror" style="display:none;">
          <div class="category-label">Mirrors</div>
          <label class="form-label">Is it heavy?*</label>
          <div class="radio-group">
            <label><input type="radio" name="mirror-heavy" value="no"> No, less than 15 lbs</label>
            <label><input type="radio" name="mirror-heavy" value="yes"> Yes, more than 15 lbs</label>
          </div>
          <label class="form-label">How many mirrors?*</label>
          <div class="radio-group">
            <label><input type="radio" name="mirror-count" value="1"> 1</label>
            <label><input type="radio" name="mirror-count" value="2-3"> 2-3</label>
            <label><input type="radio" name="mirror-count" value="4+"> 4 or more</label>
          </div>
        </div>

        <!-- Shelves -->
        <div class="service-block shelf-block category-details" id="details-shelf" style="display:none;">
          <div class="category-label">Shelves</div>
          <label class="form-label">How many shelves?*</label>
          <div class="radio-group">
            <label><input type="radio" name="shelf-count" value="1"> 1</label>
            <label><input type="radio" name="shelf-count" value="2-3"> 2-3</label>
            <label><input type="radio" name="shelf-count" value="4+"> 4 or more</label>
          </div>
        </div>

        <!-- Curtain Rods -->
        <div class="service-block curtain-block category-details" id="details-curtain" style="display:none;">
          <div class="category-label">Curtain Rods</div>
          <label class="form-label">How many rods to install?*</label>
          <div class="radio-group">
            <label><input type="radio" name="curtain-count" value="1"> 1</label>
            <label><input type="radio" name="curtain-count" value="2-3"> 2-3</label>
            <label><input type="radio" name="curtain-count" value="4+"> 4 or more</label>
          </div>
        </div>
        
        <!-- Ladder -->
        <label class="form-label" style="margin-top:20px;">Will a ladder be needed?*</label>
        <div class="radio-group">
          <label><input type="radio" name="ladder" value="none" required> No ladder needed</label>
          <label><input type="radio" name="ladder" value="Up to 8 ft"> Up to 8 ft (small ladder)</label>
          <label><input type="radio" name="ladder" value="Up to 10 ft"> Up to 10 ft (medium ladder)</label>
          <label><input type="radio" name="ladder" value="Up to 14 ft"> Up to 14 ft (tall ladder)</label>
          <label><input type="radio" name="ladder" value="More than 14 ft"> More than 14 ft</label>
        </div>
        <label class="form-label" for="name">Your Name*</label>
        <input type="text" id="name" name="name" required>
        <label class="form-label" for="phone">Phone*</label>
        <input type="tel" id="phone" name="phone" required placeholder="+1 (___) ___-____">
        <label class="form-label" for="address">Address*</label>
        <input type="text" id="address" name="address" required placeholder="Street, Apt, City">
        <label class="form-label" for="date">Preferred Date*</label>
        <input type="date" id="date" name="date" required>
        <label class="form-label" for="time">Preferred Time*</label>
          <select id="time" name="time" required>
            <option value="">Select a time</option>
            <option value="8:00 AM">8:00 AM</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
            <option value="5:00 PM">5:00 PM</option>
            <option value="6:00 PM">6:00 PM</option>
            <option value="7:00 PM">7:00 PM</option>
          </select>
        <label class="form-label" for="details">Anything else?</label>
        <textarea id="details" name="details" rows="3" placeholder="Describe anything important (type of wall, access, special requests, etc.)"></textarea>
        <button type="submit" class="green_sumbit_btn">Book Now</button>
      </form>
    `;

    // Логика раскрытия секций
    quizFormContainer.querySelectorAll('.category-option').forEach(option => {
      option.addEventListener('click', function() {
        this.classList.toggle('active');
        const cat = this.getAttribute('data-category');
        const details = document.getElementById('details-' + cat);
        if (this.classList.contains('active')) {
          details.style.display = '';
          Array.from(details.querySelectorAll('input,select,textarea')).forEach(el => el.required = true);
        } else {
          details.style.display = 'none';
          Array.from(details.querySelectorAll('input,select,textarea')).forEach(el => el.required = false);
          Array.from(details.querySelectorAll('input[type="radio"],input[type="text"],input[type="number"],select,textarea')).forEach(el => {
            if (el.type === "radio" || el.type === "checkbox") el.checked = false;
            else el.value = '';
          });
        }
      });
    });

    // Форматирование телефона
    const phoneInput = quizFormContainer.querySelector('input[name="phone"]');
    phoneInput.addEventListener("input", () => {
      let numbers = phoneInput.value.replace(/\D/g, "");
      if (numbers.startsWith("1")) numbers = numbers.slice(1);
      if (numbers.length > 10) numbers = numbers.slice(0, 10);
      if (numbers.length >= 6) {
        phoneInput.value = `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
      } else if (numbers.length >= 3) {
        phoneInput.value = `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
      } else {
        phoneInput.value = numbers;
      }
    });

    // Минимальная дата
    const dateInput = quizFormContainer.querySelector('input[name="date"]');
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);

    // ====== Валидация и отправка ======
    // Используем безопасный доступ и отладку:
    const quizForm = document.getElementById("wallHangingQuiz");
    if (!quizForm) {
      alert("Form with id 'wallHangingQuiz' not found!");
      return;
    }
    
  quizForm.addEventListener("submit", function(e) {
      e.preventDefault();
      let isValid = true;

      // Удаляем все старые ошибки и подсветку
      this.querySelectorAll('.input-error-message').forEach(el => el.remove());
      this.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

      // Убираем ошибку при вводе
      this.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', function() {
          input.classList.remove('input-error');
          if (input.nextElementSibling && input.nextElementSibling.classList && input.nextElementSibling.classList.contains('input-error-message')) {
            input.nextElementSibling.remove();
          }
        });
      });

  // Проверка категорий
  const activeCats = Array.from(quizFormContainer.querySelectorAll('.category-option.active'));
  if (activeCats.length === 0) {
    const firstCat = quizFormContainer.querySelector('.category-options-multi');
    let msg = document.createElement('div');
    msg.className = 'input-error-message';
    msg.textContent = "Select at least one type of item to hang";
    firstCat.after(msg);
    isValid = false;
  }

  // Все обязательные поля
  this.querySelectorAll("input, select, textarea").forEach((input) => {
    if (input.required && !input.value.trim()) {
      input.classList.add("input-error");
      let msg = document.createElement('div');
      msg.className = 'input-error-message';
      msg.textContent = "Please fill out this field";
      if (input.type === 'select-one') msg.textContent = "Please select an option";
      input.after(msg);
      isValid = false;
    }
    if (input.name === "phone" && input.value.replace(/\D/g, "").length !== 10) {
      input.classList.add("input-error");
      let msg = document.createElement('div');
      msg.className = 'input-error-message';
      msg.textContent = "Enter a valid 10-digit US phone";
      input.after(msg);
      isValid = false;
    }
    if (input.name === "zip" && input.value && !/^\d{5}$/.test(input.value)) {
      input.classList.add("input-error");
      let msg = document.createElement('div');
      msg.className = 'input-error-message';
      msg.textContent = "Enter a valid 5-digit ZIP code";
      input.after(msg);
      isValid = false;
    }
  });

  // CUSTOM RADIO VALIDATION:
  let radioGroups = {};
  this.querySelectorAll('input[type="radio"]:not([disabled]):not([hidden])').forEach(input => {
    const name = input.name;
    if (input.closest('.category-details') && input.closest('.category-details').style.display === 'none') return;
    if (!radioGroups[name]) radioGroups[name] = [];
    radioGroups[name].push(input);
  });
  Object.keys(radioGroups).forEach(name => {
    const group = radioGroups[name];
    if (group.some(r => r.required)) {
      if (!group.some(r => r.checked)) {
        group.forEach(r => r.classList.add('input-error'));
        let last = group[group.length-1];
        let msg = document.createElement('div');
        msg.className = 'input-error-message';
        msg.textContent = "Please select one of these options";
        last.parentNode.after(msg);
        isValid = false;
      }
    }
  });

  // Скроллим к первой ошибке
  const firstError = quizForm.querySelector('.input-error');
  if (firstError) firstError.scrollIntoView({behavior: 'smooth', block: 'center'});

   if (!isValid) return;

  // Собираем данные с формы
  const fields = {};
  new FormData(quizForm).forEach((value, key) => {
    fields[key] = value;
  });

  // Получаем все активные категории
if (activeCats.length === 0) {
  // Фолбэк — пользователь ничего не выбрал (маловероятно из-за валидации)
}

// Формируем детали по выбранным категориям:
let catDetails = '';
activeCats.forEach(cat => {
  let catName = cat.innerText.trim();
  catDetails += `\n--- ${catName} ---\n`;
  if (catName.includes('Art')) {
    catDetails += `Small items: ${fields["small-items-art"] || "-"}\nLarge items: ${fields["large-items-art"] || "-"}\n`;
  }
  if (catName.includes('Mirror')) {
    catDetails += `Heavy: ${fields["mirror-heavy"] || "-"}\nHow many: ${fields["mirror-count"] || "-"}\n`;
  }
  if (catName.includes('Shelves')) {
    catDetails += `How many: ${fields["shelf-count"] || "-"}\n`;
  }
  if (catName.includes('Curtain')) {
    catDetails += `How many: ${fields["curtain-count"] || "-"}\n`;
  }
});
  fields.catDetails = catDetails;

  // Отправка в Telegram
  sendToTelegram(fields,
    () => {
      quizForm.innerHTML = `<div class="success-message"><div class="success-icon">✓</div><h2>Thank you!</h2><p>Your booking request has been submitted.<br>We’ll get in touch soon!</p></div>`;
    },
    () => {
      alert("❌ Failed to send the message. Please try again or contact us directly.");
    }
  );

    });
  }
});
