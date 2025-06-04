// Обработка Esc — закрытие любых модальных окон по клавише Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Закрытие overlay-модалок
    const plansOverlay = document.getElementById("plansOverlay");
    const bookingOverlay = document.getElementById("bookingFormOverlay");

    if (plansOverlay && !plansOverlay.classList.contains("hidden")) {
      plansOverlay.classList.add("hidden");
      document.body.classList.remove("modal-open");
    }
    if (bookingOverlay && !bookingOverlay.classList.contains("hidden")) {
      bookingOverlay.classList.add("hidden");
      document.body.classList.remove("modal-open");
    }
  }
});

// toggleChatMenu — открытие/закрытие меню чата
function toggleChatMenu() {
  const menu = document.getElementById('chat-menu-items');
  const chatIcon = document.getElementById('chat-icon');
  const closeIcon = document.getElementById('close-icon');
  const tooltip = document.getElementById('tooltip-toggle');

  const isOpening = menu.classList.contains('hidden');

  menu.classList.toggle('hidden');
  chatIcon.classList.toggle('icon-hidden');
  closeIcon.classList.toggle('icon-hidden');
  tooltip.textContent = isOpening ? 'Hide' : 'Chat';
}

// Splider
var splide = new Splide('.splide', {
    type   : 'loop',
    perMove: 1,
    focus  : 'center',
    autoplay: true,
    perPage: 4, // desktop
    breakpoints: {
      1024: {
        perPage: 4,
      },
      768: {
        perPage: 3,
        focus: 0, // отключаем центрирование на планшете
      },
      480: {
        perPage: 2,
        focus: 0, // отключаем центрирование на мобилке
      }
    }
  });

  splide.mount();

  // Video review
  document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('#video-carousel .splide__slide').forEach(slide => {
    const video = slide.querySelector('video');

    slide.addEventListener('click', function () {
      // Остановить все остальные видео
      document.querySelectorAll('#video-carousel video').forEach(v => {
        if (v !== video) {
          v.pause();
          v.currentTime = 0;
          v.load(); // Вернуть постер другим видео (если нужно)
        }
      });

      // Запустить или приостановить только это видео
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  });
});

// События Google Tag Manager для кликов на WhatsApp и SMS/телефон (делегирование)
document.addEventListener("click", function(e) {
  // WhatsApp: отслеживаем клик по ссылке на wa.me с aria-label="WhatsApp"
  if (e.target.closest('a[href^="https://wa.me/"][aria-label="WhatsApp"]')) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "WhatsApp button" });
  }

  // SMS или телефон: отслеживаем клик по sms: ссылке
  if (e.target.closest('a[href^="sms:"]')) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "phoneClick" });
  }
});
