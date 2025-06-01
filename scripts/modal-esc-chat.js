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
