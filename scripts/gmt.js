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
