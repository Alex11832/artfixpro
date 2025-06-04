document.addEventListener("DOMContentLoaded", () => {
  const openBtns = document.querySelectorAll("#openPlansBtn, #openPlansBtn2")
  const plansOverlay = document.getElementById("plansOverlay");
  const bookingOverlay = document.getElementById("bookingFormOverlay");
  const bookingCloseBtn = document.getElementById("bookingClose");
  const bookingContainer = document.getElementById("bookingFormContainer");
  const selectButtons = document.querySelectorAll(".select-plan-btn");
  const planCards = document.querySelectorAll(".plan-card");
  const closePlansBtn = document.getElementById("plansClose");

  // Закрытие окна бронирования по кнопке
  bookingCloseBtn?.addEventListener("click", () => {
    bookingOverlay.classList.add("hidden");
    document.body.classList.remove("modal-open");
  });

  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      plansOverlay.classList.remove("hidden")
      document.body.classList.add("modal-open")

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'quizStarted' });

      // Инициализируем карусель при открытии модального окна
      setTimeout(initOverlayCarousel, 100)
    })
  })

  closePlansBtn?.addEventListener("click", () => {
    plansOverlay.classList.add("hidden")
    document.body.classList.remove("modal-open")
  })

  bookingCloseBtn?.addEventListener("click", () => {
    bookingOverlay.classList.add("hidden")
    document.body.classList.remove("modal-open")
  })
  
  // === 2. КАРУСЕЛЬ ТАРИФОВ (планы, слайдер) ===
  function initOverlayCarousel() {
    // Только мобильные и планшеты
    if (window.innerWidth >= 1025) {
      planCards.forEach(card => card.classList.add("plan-card-visible"));
      return;
    }

    let activeIndex = 0;
    let startX, moveX, startTime;
    const carousel = document.querySelector(".plans-carousel");

    function updateCarousel() {
      planCards.forEach((card, index) => {
        card.classList.remove("active", "prev", "next");
        if (index === activeIndex) card.classList.add("active");
        else if (index === (activeIndex - 1 + planCards.length) % planCards.length) card.classList.add("prev");
        else if (index === (activeIndex + 1) % planCards.length) card.classList.add("next");
      });
    }
    updateCarousel();

    planCards.forEach((card, index) => {
      card.addEventListener("click", () => {
        if (window.innerWidth < 1025) {
          activeIndex = index;
          updateCarousel();
        }
      });
    });

    // Свайпы на мобильных
    if (window.innerWidth < 1025 && carousel) {
      carousel.addEventListener("touchstart", handleTouchStart, { passive: true });
      carousel.addEventListener("touchmove", handleTouchMove, { passive: true });
      carousel.addEventListener("touchend", handleTouchEnd, { passive: true });
    }
    function handleTouchStart(e) { startX = e.touches[0].clientX; startTime = Date.now(); }
    function handleTouchMove(e) { if (!startX) return; moveX = e.touches[0].clientX; }
    function handleTouchEnd() {
      if (!startX || !moveX) return;
      const diffX = moveX - startX, diffTime = Date.now() - startTime;
      const isSwipe = Math.abs(diffX) > 50 && diffTime < 300;
      const isDrag = Math.abs(diffX) > 100;
      if (isSwipe || isDrag) {
        if (diffX > 0) activeIndex = (activeIndex - 1 + planCards.length) % planCards.length;
        else activeIndex = (activeIndex + 1) % planCards.length;
        updateCarousel();
      }
      startX = null; moveX = null;
    }
    // При изменении размера экрана
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1025) planCards.forEach(card => card.classList.add("plan-card-visible"));
      else updateCarousel();
    });
  }

  // === 3. ОТКРЫТИЕ ФОРМЫ БРОНИРОВАНИЯ ===
  selectButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = btn.closest(".plan-card");
      const planName = card.querySelector("h3")?.textContent?.trim() || "TV Mounting";
      plansOverlay.classList.add("hidden");
      bookingOverlay.classList.remove("hidden");
      document.body.classList.add("modal-open");

       // Устанавливаем цену по выбранному тарифу
      let servicePrice = 60, bookingFee = 25;
      if (planName.includes("Smart")) servicePrice = 90;
      if (planName.includes("Pro")) servicePrice = 130;
      let totalPrice = servicePrice + bookingFee;

      // === Форма бронирования ===
      bookingContainer.innerHTML = `
        <h2>Book: ${planName}</h2>
          <div class="booking-price-breakdown" style="background:#f7fafd;padding:12px 16px;border-radius:7px;font-size:15px;margin-bottom:16px;">
          <div style="display:flex;justify-content:space-between;"><span>TV Mounting (1 TV):</span><span>$${servicePrice}</span></div>
          <div style="display:flex;justify-content:space-between;"><span>Booking Fee:</span><span>$${bookingFee}</span></div>
          <div style="border-top:1px solid #e5e7eb;margin:7px 0 5px;"></div>
          <div style="display:flex;justify-content:space-between;font-weight:600;"><span>Total:</span><span>$${totalPrice}</span></div>
          <div style="font-size:13px;color:#888;margin-top:4px;">No hidden fees — what you see is what you pay.</div>
        </div>
        <form id="bookingForm" novalidate>
          <div class="form-group">
            <label for="date">Select Date:</label>
            <input type="date" name="date" id="date" required>
          </div>
          <div class="form-group">
            <label for="time">Select Time:</label>
            <select name="time" id="time" required>
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
          </div>
          <div class="form-group">
            <label for="first-name">First Name:</label>
            <input type="text" name="firstName" id="first-name" required placeholder="e.g. John">
          </div>
          <div class="form-group">
            <label for="last-name">Last Name:</label>
            <input type="text" name="lastName" id="last-name" required placeholder="e.g. Smith">
          </div>
          <div class="form-group">
            <label for="phone">Phone:</label>
            <input type="tel" name="phone" id="phone" required placeholder="(123) 456-7890">
          </div>
          <div class="form-group">
            <label for="address">Street Address:</label>
            <input type="text" name="address" id="address" required placeholder="e.g. 123 Main St">
          </div>
          <div class="form-group">
            <label for="zip">ZIP Code:</label>
            <input type="text" name="zip" id="zip" required placeholder="5-digit ZIP code" maxlength="5" inputmode="numeric">
          </div>
          <input type="hidden" name="selectedPlanName" value="${planName}">
          <button type="submit" class="green_sumbit_btn">Confirm Booking</button>
        </form>
      `;

      // Форматирование телефона
      const phoneInput = document.getElementById("phone");
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

      // Форматирование ZIP
      const zipInput = document.getElementById("zip");
      zipInput.addEventListener("input", () => {
        let digits = zipInput.value.replace(/\D/g, "");
        if (digits.length > 5) digits = digits.substring(0, 5);
        zipInput.value = digits;
      });

      // Минимальная дата (сегодня)
      const dateInput = document.getElementById("date");
      const today = new Date().toISOString().split("T")[0];
      dateInput.setAttribute("min", today);

      // === 4. ВАЛИДАЦИЯ И ОТПРАВКА ФОРМЫ ===
      const form = document.getElementById("bookingForm");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;

        // Проверка всех полей
        form.querySelectorAll("input, select").forEach((input) => {
          if (!input.value.trim()) {
            input.classList.add("input-error");
            isValid = false;
            return;
          }
          // ZIP — только 5 цифр
          if (input.id === "zip") {
            if (!/^\d{5}$/.test(input.value.trim())) {
              input.classList.add("input-error");
              isValid = false;
              return;
            }
          }
          // Phone — только 10 цифр
          if (input.id === "phone") {
            if (input.value.replace(/\D/g, "").length !== 10) {
              input.classList.add("input-error");
              isValid = false;
              return;
            }
          }
          input.classList.remove("input-error");
        });

        if (!isValid) return;

        // Сбор данных формы
        const data = {
          date: form.querySelector("#date").value,
          time: form.querySelector("#time").value,
          firstName: form.querySelector("#first-name").value,
          lastName: form.querySelector("#last-name").value,
          phone: form.querySelector("#phone").value,
          address: form.querySelector("#address").value,
          zip: form.querySelector("#zip").value,
        };

        // Формат даты
        const [year, month, day] = data.date.split('-');
        const formattedDate = `${month}/${day}/${year}`;
        // Формат телефона
        const cleanPhone = data.phone.replace(/\D/g, "");
        const phoneLink = `+1${cleanPhone}`;
        const pageUrl = window.location.href;

        // --- Отправка данных через Telegram Bot API ---
        const message = `📺 New TV Mounting Request:
          🌐 Order from: ${pageUrl}
          💰 Plan: ${planName}
          🗓 Date: ${formattedDate}
          ⏰ Time: ${data.time}
          👤 Name: ${data.firstName} ${data.lastName}
          📞 Phone: ${phoneLink}
          📍 Address: ${data.address}
          📮 ZIP: ${data.zip} `

        // Calculate cart total based on plan
        let cartTotal = 85;
        if (planName.includes("Smart")) {
          cartTotal = 115;
        } else if (planName.includes("Pro")) {
          cartTotal = 155;
        }
        
        setTimeout(() => {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'submitQuizFormSuccess',
            value: cartTotal
          });
          console.log("✅ cartTotal value pushed:", cartTotal);
        }, 100);


        // Prepare the confirmation message template
        const confirmationMessage = `✅ Hello ${data.firstName}! Thank you for choosing ArtFixPro LLC. Your order has been confirmed. The service cost is $${cartTotal.toFixed(2)}, and our technician will arrive on ${formattedDate} at ${data.time}. We appreciate your trust and look forward to assisting you!`

        // Prepare the reschedule message template
        const rescheduleMessage = `⚠️ Hello ${data.firstName}! Thank you for contacting ArtFixPro LLC. The service cost is $${cartTotal.toFixed(2)}. Unfortunately, the date/time you selected is already booked. Would you like to reschedule for ${formattedDate} at ${data.time}? Please let us know if that works for you. We appreciate your understanding!`

        // Use a proxy server or serverless function to avoid CORS issues
        // For example, you can use a service like cors-anywhere or create your own proxy
        const proxyUrl = "https://cors-anywhere.herokuapp.com/"
        const telegramApiUrl = "https://api.telegram.org/bot8064031856:AAGYg6dkeDBdHp0C8XmV9UdNO20TedaMLd0/sendMessage"

        // Send the main booking message
        fetch(telegramApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: "https://artfixpro.com",
          },
          body: JSON.stringify({ chat_id: "443139059", text: message }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok")
            }
            return response.json()
          })
          .then(() => {
            window.dataLayer = window.dataLayer || [];
        

            bookingContainer.innerHTML = `
              <div class="success-message">
                <div class="success-icon">✓</div>
                <h2>Thank you!</h2>
                <p>Your booking request has been submitted.</p>
              </div>
              `          
          })
          .then(() => {
            // Send the confirmation message
            return fetch(telegramApiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Origin: "https://artfixpro.com",
              },
              body: JSON.stringify({ chat_id: "443139059", text: confirmationMessage }),
            })
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok")
            }
            return response.json()
          })
          .then(() => {
            // Send the reschedule message (in a real scenario, you might want to conditionally send this)
            return fetch(telegramApiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Origin: "https://artfixpro.com",
              },
              body: JSON.stringify({ chat_id: "443139059", text: rescheduleMessage }),
            })
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok")
            }
            return response.json()
          })
          
        .catch(() => {
          alert("❌ Failed to send the message. Please try again or contact us directly.");
        });
      });
    });
  });

  // Инициализация карусели при первом открытии
  if (plansOverlay && !plansOverlay.classList.contains("hidden")) {
    initOverlayCarousel();
  }

  // (Если нужно инициализировать всегда на мобильных — можно раскомментировать строку ниже)
  // initOverlayCarousel();
});
