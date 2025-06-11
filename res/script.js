const heroImage = document.querySelector('.hero-image');
const letters = document.querySelectorAll('.letter');

letters.forEach(letter => {
    letter.addEventListener('animationend', () => {
        letter.classList.remove('animate');
        letter.classList.add('scroll-anim');
    });
});

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const progress = Math.min(scrollY / viewportHeight, 1);

    heroImage.style.transform = `translateY(${-progress * 30}%)`;

    document.querySelectorAll('.scroll-anim').forEach((letter, index) => {
        const delay = index * 0.1;
        const adjustedProgress = Math.max(progress - delay, 0);
        letter.style.transform = `translateY(${-adjustedProgress * 400}%)`;
        letter.style.opacity = `${1 - progress * 3}`;
    });
});

// Плавный скролл к прайс-карте по клику на кнопку
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        const target = document.querySelector('#price-card');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
  const whySection = document.querySelector('.why-section');

  if (!whySection) {
    console.warn('why-section not found');
    return;
  }

  const infoBox = whySection.querySelector('.info-box');
  const slides = infoBox.querySelectorAll('.info-item');

  // Updated: get buttons from the new .carousel-nav
  const carouselNav = whySection.querySelector('.carousel-nav');
  const prevBtn = carouselNav?.querySelector('.prev');
  const nextBtn = carouselNav?.querySelector('.next');

  if (!infoBox || slides.length === 0 || !prevBtn || !nextBtn) {
    console.warn('Carousel elements missing inside why-section:', {
      infoBox,
      slides,
      prevBtn,
      nextBtn
    });
    return;
  }

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  // Initialize first slide
  showSlide(currentIndex);
});

document.addEventListener('DOMContentLoaded', function () {
    new Masonry('.image-gallery', {
      itemSelector: '.gallery-item',
      columnWidth: '.grid-sizer',
      gutter: 10,
      percentPosition: true
    });
  });





const videos = [
  "vids/IMG_0801.MOV",
  "vids/IMG_0967.MP4",
  "vids/IMG_0988.MOV",
  "vids/IMG_6158.MOV",
  "vids/IMG_9023.MOV"
];

let vid_index = 0;

function updateVideos() {
  const videoElems = document.querySelectorAll(".video-column video");

  videoElems.forEach((vid, i) => {
    // Start fade out
    vid.style.opacity = 0;

    // Delay change until fade-out is mostly done
    setTimeout(() => {
      const source = videos[(vid_index + i) % videos.length];

      // Only update if source is different (prevents flicker)
      if (vid.currentSrc !== location.origin + "/" + source) {
        vid.src = source;
        vid.load();
        vid.oncanplay = () => {
          vid.play();
          // Fade back in
          vid.style.opacity = 1;
        };
      } else {
        // If source is the same, just fade back in
        vid.style.opacity = 1;
      }
    }, 200); // matches half of CSS transition
  });
}

document.getElementById("nextVideo").addEventListener("click", () => {
  vid_index = (vid_index + 1) % videos.length;
  updateVideos();
});

document.getElementById("prevVideo").addEventListener("click", () => {
  vid_index = (vid_index - 1 + videos.length) % videos.length;
  updateVideos();
});

// Init
updateVideos();


document.querySelectorAll('.dropdown-label').forEach(label => {
  label.addEventListener('click', () => {
    const module = label.closest('.dropdown-module');
    const content = module.querySelector('.dropdown-content');

    if (module.classList.contains('open')) {
      // closing
      content.style.maxHeight = content.scrollHeight + 'px'; // ensure current height
      requestAnimationFrame(() => {
        content.style.maxHeight = '0';
        module.classList.remove('open');
      });
    } else {
      // opening
      content.style.maxHeight = content.scrollHeight + 'px';
      module.classList.add('open');
    }
  });
});

document.querySelector('.play-button').addEventListener('click', () => {
    const target = document.querySelector('#course-video-block');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});