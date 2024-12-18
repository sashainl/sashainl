document.addEventListener("DOMContentLoaded", () => {
    const sliderTrack = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.querySelector(".nav-button.left");
    const nextButton = document.querySelector(".nav-button.right");
  
    let currentIndex = 0;
    const totalSlides = slides.length;
  
    function updateSlider() {
      const offset = -currentIndex * 100; // 슬라이드 너비만큼 이동
      sliderTrack.style.transform = `translateX(${offset}%)`;
    }
  
    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
      updateSlider();
    });
  
    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
      updateSlider();
    });
  });
  