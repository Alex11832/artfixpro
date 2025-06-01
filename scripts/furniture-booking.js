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
.sticky-total {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: #f4f7fb;
  box-shadow: 0 -2px 10px rgba(34,34,34,0.07);
  border-radius: 0 0 8px 8px;
  padding: 10px 0;
  margin-bottom: 0;
}
  </style>
    <form id="furnitureQuizForm" class="wall-hanging-booking-form" novalidate>
      <h2>Furniture Assembly</h2>
      <div class="service-block furniture-block" style="max-height:420px;overflow-y:auto;position:relative;">
        <div class="category-label">What do you need assembled? <span class="required">*</span></div>
        <div class="category-options-multi" style="gap:8px 12px;flex-wrap:wrap;">
          ${renderFurnitureOption('Desk/Table', 'desk', 70)}
          ${renderFurnitureOption('Bed Frame', 'bed', 80)}
          ${renderFurnitureOption('Chair', 'chair', 50)}
          ${renderFurnitureOption('TV Stand', 'tv', 90)}
          ${renderFurnitureOption('Bookcase (Small)', 'bookcaseS', 75)}
          ${renderFurnitureOption('Bookcase (Large)', 'bookcaseL', 90)}
          ${renderFurnitureOption('Outdoor Furniture', 'outdoor', 85)}
          ${renderFurnitureOption('Cabinets', 'cabinets', 85)}
          ${renderFurnitureOption('Couch', 'couch', 80)}
          ${renderFurnitureOption('Crib', 'crib', 75)}
          ${renderFurnitureOption('Shelves', 'shelves', 75)}
          ${renderFurnitureOption('Other Furniture, <span style="font-size:0.93rem;color:#b99;margin-top:4px;display:block;">Price $75/hour, not included in total</span>', 'other', 75, '$75/hr')}
          <!-- Other furniture -->
        </div>
        <div class="price-banner sticky-total" style="margin-top:18px;">
          Total: <span id="total-price" style="font-weight:700; color:#219150;">$0</span>
        </div>
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
  // Отправка формы в Telegram Bot
    function sendToTelegram(fields, onSuccess, onError) {
    const pageUrl = window.location.href;
    const cleanPhone = fields.phone.replace(/\D/g, "");
    const phoneLink = `[+1${cleanPhone}](tel:+1${cleanPhone})`;

    // Первое сообщение (для тебя/менеджера)
    let details = `🪑 *New Furniture Assembly Order*\n` +
        `🌐 Order from: ${pageUrl}\n` +
        `*From*: ${fields.name}\n` +
        `*Phone*: ${phoneLink}\n` +
        `*Address*: ${fields.address}\n` +
        `*Date*: ${fields.date} ${fields.time}\n\n` +
        `${fields.catDetails ? fields.catDetails : ""}`;
    if (fields.details) details += `\n\n*Comment*: ${fields.details}`;

    // Второе сообщение (для клиента)
    let secondMsg = `✅ Hello ${fields.name}!\nThank you for choosing ArtFixPro LLC.\n\n` +
        `Your total is $${fields.total}.\n\n` +
        `We'll be assembling:\n${fields.catList}` +
        `\nOur technician will arrive on ${fields.date} at ${fields.time}. We appreciate your trust and look forward to assisting you!`;

    // Третье сообщение (для клиента, если дата занята)
    let thirdMsg = `⚠️ Hello ${fields.name}! Thank you for contacting ArtFixPro LLC.\n` +
        `Unfortunately, the date/time you selected is already booked.\n` +
        `Would you like to reschedule for ${fields.date} at ${fields.time}?\n\n` +
        `We'll be assembling:\n${fields.catList}` +
        `\nYour total is $${fields.total}.\n\n` +
        `Please let us know if that works for you. We appreciate your understanding!`;

    // Telegram отправка
    const tgToken = "8064031856:AAGYg6dkeDBdHp0C8XmV9UdNO20TedaMLd0";
    const chatId = "443139059";
    const sendMsg = (text) =>
        fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
        });

    sendMsg(details)
        .then(() => { if (onSuccess) onSuccess(); })
        .then(() => sendMsg(secondMsg))
        .then(() => sendMsg(thirdMsg))
        .catch((err) => { if (onError) onError(err); });
    }

  // Furniture items and prices for calculation
  const prices = {
    desk: 70, bed: 80, chair: 50, tv: 90, bookcaseS: 75, bookcaseL: 90,
    outdoor: 85, cabinets: 85, couch: 80, crib: 75, shelves: 75, other: 0
  };

  // Counter logic
  Object.keys(prices).forEach(type => {
    document.getElementById(`btn-minus-${type}`).onclick = () => updateQty(type, -1);
    document.getElementById(`btn-plus-${type}`).onclick = () => updateQty(type, 1);
  });
  function updateQty(type, delta) {
    quizFormContainer.querySelectorAll('.input-error-message').forEach(el => el.remove());
    const el = document.getElementById(`qty-${type}`);
    let val = parseInt(el.innerText, 10);
    val = isNaN(val) ? 0 : val + delta;
    if (val < 0) val = 0;
    if (val > 99) val = 99;
    el.innerText = val;
    quizFormContainer.querySelector('.service-block.furniture-block').classList.remove('input-error');
    updateTotal();
  }
  function updateTotal() {
    let total = 0;
    Object.keys(prices).forEach(type => {
      const qty = parseInt(document.getElementById('qty-' + type).innerText, 10) || 0;
      total += qty * prices[type];
    });
    document.getElementById('total-price').innerText = `$${total}`;
  }

  // Phone formatting
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
  const quizForm = document.getElementById("furnitureQuizForm");
  quizForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let isValid = true;

    // Remove old errors
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

    // Проверка: выбрана хотя бы одна категория мебели
    let oneChecked = false;
    Object.keys(prices).forEach(type => {
    const val = parseInt(document.getElementById('qty-' + type).innerText, 10) || 0;
    if (val > 0) oneChecked = true;
    });
    // для Other Furniture
    const otherQty = parseInt(document.getElementById('qty-other').innerText, 10) || 0;
    if (otherQty > 0) oneChecked = true;

    if (!oneChecked) {
    const firstCat = quizFormContainer.querySelector('.category-options-multi');
    let msg = document.createElement('div');
    msg.className = 'input-error-message';
    msg.textContent = "Please select at least one item.";
    firstCat.after(msg);
    quizFormContainer.querySelector('.service-block.furniture-block').classList.add('input-error');
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
    });

    // Скроллим к первой ошибке
    const firstError = quizForm.querySelector('.input-error');
    if (firstError) firstError.scrollIntoView({behavior: 'smooth', block: 'center'});

    if (!isValid) return;

    // Собираем данные
    const fields = {};
    new FormData(quizForm).forEach((value, key) => { fields[key] = value; });

    // Формируем детали заказа
    let total = 0;
    let orderDetails = '';
    let orderList = '';
    Object.keys(prices).forEach(type => {
    const nameMap = {
        desk: 'Desk/Table', bed: 'Bed Frame', chair: 'Chair', tv: 'TV Stand',
        bookcaseS: 'Bookcase (Small)', bookcaseL: 'Bookcase (Large)', outdoor: 'Outdoor Furniture',
        cabinets: 'Cabinets', couch: 'Couch', crib: 'Crib', shelves: 'Shelves', other: 'Other Furniture'
    };
    const price = prices[type];
    const qty = parseInt(document.getElementById('qty-' + type).innerText, 10) || 0;
    if (qty > 0) {
        if (type === 'other') {
        orderDetails += `• Other Furniture: ${qty} × $75/hr\n`;
        orderList += `Other Furniture × ${qty}\n`;
        } else {
        orderDetails += `• ${nameMap[type]}: ${qty} × $${price} = $${qty*price}\n`;
        orderList += `${nameMap[type]} × ${qty}\n`;
        total += qty * price;
        }
    }
    });
    orderDetails += `\nTotal: $${total}`;
    fields.catDetails = orderDetails;
    fields.catList = orderList;
    fields.total = total;

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

  // Helper for sticky total
  document.querySelector('.furniture-block').addEventListener('scroll', function() {
    const total = document.querySelector('.sticky-total');
    if (!total) return;
    if (this.scrollHeight - this.scrollTop === this.clientHeight) {
      total.style.boxShadow = 'none';
    } else {
      total.style.boxShadow = '0 -2px 10px rgba(34,34,34,0.07)';
    }
  });

  updateTotal();
}

// Render option for each furniture
function renderFurnitureOption(title, key, price) {
  return `
    <div class="category-option" style="min-width:120px;">
      <span>${title}</span>
      <span style="font-size:0.98rem;color:#638;">$${price}</span>
      <div style="display:flex;align-items:center;justify-content:center;margin-top:5px;">
        <button type="button" id="btn-minus-${key}" class="qty-btn">-</button>
        <span id="qty-${key}" style="width:22px;display:inline-block;text-align:center;">0</span>
        <button type="button" id="btn-plus-${key}" class="qty-btn">+</button>
      </div>
    </div>
  `;
}
document.addEventListener("DOMContentLoaded", () => {
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
  
});
