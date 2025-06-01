/**
 * Video Review Carousel
 * Реализация бесконечной карусели с видео-отзывами
 */
document.addEventListener("DOMContentLoaded", () => {
  // Получаем контейнер карусели
  const carousel = document.getElementById("video-carousel");
  
  if (!carousel) return;
  
  // Получаем все слайды
  const track = carousel.querySelector(".splide__track");
  const list = carousel.querySelector(".splide__list");
  const originalSlides = Array.from(carousel.querySelectorAll(".splide__slide"));
  const videos = Array.from(carousel.querySelectorAll(".splide__slide video"));
  
  if (!originalSlides.length || !videos.length) return;
  
  // Добавляем стрелки навигации
  let prevArrow = carousel.querySelector(".carousel-arrow--prev");
  let nextArrow = carousel.querySelector(".carousel-arrow--next");
  
  if (!prevArrow) {
    prevArrow = document.createElement("button");
    prevArrow.className = "carousel-arrow carousel-arrow--prev";
    prevArrow.innerHTML = "&#10094;";
    prevArrow.setAttribute("aria-label", "Предыдущий слайд");
    prevArrow.style.display = "block";
    carousel.appendChild(prevArrow);
  } else {
    prevArrow.style.display = "block";
  }
  
  if (!nextArrow) {
    nextArrow = document.createElement("button");
    nextArrow.className = "carousel-arrow carousel-arrow--next";
    nextArrow.innerHTML = "&#10095;";
    nextArrow.setAttribute("aria-label", "Следующий слайд");
    nextArrow.style.display = "block";
    carousel.appendChild(nextArrow);
  } else {
    nextArrow.style.display = "block";
  }
  
  // Настройки карусели
  let currentIndex = 0;
  let slideWidth = 0;
  let slidesToShow = 4;
  let isAnimating = false;
  let autoplayInterval = null;
  const autoplayDelay = 5000;
  
  // Клонируем слайды для бесконечной карусели
  function setupInfiniteCarousel() {
    // Удаляем существующие клоны
    const existingClones = list.querySelectorAll(".clone");
    existingClones.forEach(clone => clone.remove());
    
    // Создаем клоны в начале и в конце
    const clonesBefore = [];
    const clonesAfter = [];
    
    // Клонируем слайды в конец
    originalSlides.forEach(slide => {
      const clone = slide.cloneNode(true);
      clone.classList.add("clone");
      clone.setAttribute("aria-hidden", "true");
      list.appendChild(clone);
      clonesAfter.push(clone);
    });
    
    // Клонируем слайды в начало (в обратном порядке)
    [...originalSlides].reverse().forEach(slide => {
      const clone = slide.cloneNode(true);
      clone.classList.add("clone");
      clone.setAttribute("aria-hidden", "true");
      list.insertBefore(clone, list.firstChild);
      clonesBefore.push(clone);
    });
    
    // Получаем все слайды (включая клоны)
    const allSlides = Array.from(list.querySelectorAll(".splide__slide"));
    
    // Настраиваем обработчики для видео
    setupVideoHandlers();
    
    // Устанавливаем начальную позицию (после клонов в начале)
    currentIndex = originalSlides.length;
    updateCarouselPosition(false);
    
    return allSlides;
  }
  
  // Функция для обновления количества отображаемых слайдов
  function updateSlidesToShow() {
    const windowWidth = window.innerWidth;
    
    if (windowWidth >= 1025) {
      slidesToShow = 4;
    } else if (windowWidth >= 768) {
      slidesToShow = 3;
    } else if (windowWidth >= 480) {
      slidesToShow = 2;
    } else {
      slidesToShow = 1;
    }
    
    // Обновляем ширину слайдов
    const allSlides = list.querySelectorAll(".splide__slide");
    slideWidth = carousel.offsetWidth / slidesToShow;
    
    allSlides.forEach(slide => {
      slide.style.width = `${slideWidth}px`;
    });
    
    // Обновляем позицию карусели
    updateCarouselPosition(false);
  }
  
  // Функция для обновления позиции карусели
  function updateCarouselPosition(smooth = true) {
    if (isAnimating) return;
    
    const allSlides = list.querySelectorAll(".splide__slide");
    
    if (smooth) {
      isAnimating = true;
      list.style.transition = "transform 0.5s ease";
    } else {
      list.style.transition = "none";
    }
    
    list.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    
    if (smooth) {
      setTimeout(() => {
        // После завершения анимации проверяем, нужно ли перепрыгнуть
        const totalSlides = allSlides.length;
        const originalLength = originalSlides.length;
        
        if (currentIndex >= originalLength * 2) {
          // Если достигли конца, перепрыгиваем к первому набору клонов
          currentIndex = originalLength;
          list.style.transition = "none";
          list.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        } else if (currentIndex < originalLength) {
          // Если достигли начала, перепрыгиваем к последнему набору клонов
          currentIndex = originalLength * 2 - 1;
          list.style.transition = "none";
          list.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        }
        
        isAnimating = false;
      }, 500);
    }
  }
  
  // Функция для перехода к следующему слайду
  function nextSlide() {
    if (isAnimating) return;
    
    pauseAllVideos();
    currentIndex++;
    updateCarouselPosition(true);
  }
  
  // Функция для перехода к предыдущему слайду
  function prevSlide() {
    if (isAnimating) return;
    
    pauseAllVideos();
    currentIndex--;
    updateCarouselPosition(true);
  }
  
  // Функция для остановки всех видео
  function pauseAllVideos() {
    const allVideos = list.querySelectorAll("video");
    allVideos.forEach(video => {
      if (!video.paused) {
        video.pause();
      }
      const slide = video.closest(".splide__slide");
      if (slide) {
        slide.classList.remove("is-playing");
      }
    });
  }
  
  // Настройка обработчиков для видео
  function setupVideoHandlers() {
    const allSlides = list.querySelectorAll(".splide__slide");
    
    allSlides.forEach(slide => {
      // Удаляем существующие оверлеи
      const existingOverlay = slide.querySelector(".video-overlay");
      if (existingOverlay) {
        existingOverlay.remove();
      }
      
      const video = slide.querySelector("video");
      if (!video) return;
      
      // Скрываем стандартные элементы управления
      video.removeAttribute("controls");
      
      // Создаем оверлей для кнопки воспроизведения/паузы
      const overlay = document.createElement("div");
      overlay.className = "video-overlay";
      slide.appendChild(overlay);
      
      // Добавляем обработчик клика на слайд
      slide.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (video.paused) {
          pauseAllVideos();
          video.play();
          slide.classList.add("is-playing");
          stopAutoplay();
        } else {
          video.pause();
          slide.classList.remove("is-playing");
          startAutoplay();
        }
      });
      
      // События видео
      video.addEventListener("ended", () => {
        slide.classList.remove("is-playing");
        startAutoplay();
      });
      
      video.addEventListener("pause", () => {
        slide.classList.remove("is-playing");
      });
      
      video.addEventListener("play", () => {
        slide.classList.add("is-playing");
      });
    });
  }
  
  // Автопрокрутка
  function startAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
    
    autoplayInterval = setInterval(() => {
      nextSlide();
    }, autoplayDelay);
    
    console.log("Автопрокрутка запущена");
  }
  
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
      console.log("Автопрокрутка остановлена");
    }
  }
  
  // Объект для управления автопрокруткой (аналогично Splide)
  const Autoplay = {
    play: startAutoplay,
    pause: stopAutoplay,
    isPaused: () => autoplayInterval === null
  };
  
  // Обработчики событий для стрелок
  prevArrow.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Клик по кнопке 'Предыдущий'");
    prevSlide();
    stopAutoplay();
    startAutoplay();
  });
  
  nextArrow.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Клик по кнопке 'Следующий'");
    nextSlide();
    stopAutoplay();
    startAutoplay();
  });
  
  // Обработка свайпов для мобильных устройств
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });
  
  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
    }
    
    startAutoplay();
  }, { passive: true });
  
  // Обработчик изменения размера окна
  window.addEventListener("resize", () => {
    updateSlidesToShow();
  });
  
  // Инициализация
  setupInfiniteCarousel();
  updateSlidesToShow();
  
  // Запускаем автопрокрутку
  setTimeout(() => {
    startAutoplay();
  }, 1000);
  
  // Останавливаем автопрокрутку при наведении
  carousel.addEventListener("mouseenter", () => {
    stopAutoplay();
  });
  
  carousel.addEventListener("mouseleave", () => {
    startAutoplay();
  });
  
  console.log("Бесконечная карусель инициализирована", {
    "Количество оригинальных слайдов": originalSlides.length,
    "Количество видео": videos.length,
    "Ширина слайда": slideWidth,
    "Слайдов на экране": slidesToShow
  });
});