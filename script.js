// Tailwind configuration (moved from inline in index.html)
tailwind.config = {
  theme: {
    extend: {
      colors: {
        charcoal: '#161512',
        steel: '#26241f',
        steellight: '#37342c',
        gold: '#c9972a',
        goldlight: '#e4b457',
        leather: '#3e2723',
        cream: '#ede6da',
        creamdim: '#b7ae9e',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    }
  }
};

// DOM-dependent scripts run after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');
  let menuOpen = false;

  function setMenu(open) {
    menuOpen = open;
    menuBtn.setAttribute('aria-expanded', String(open));
    if (open) {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
      mobileMenu.style.opacity = '1';
      iconOpen.classList.add('hidden');
      iconClose.classList.remove('hidden');
    } else {
      mobileMenu.style.maxHeight = '0px';
      mobileMenu.style.opacity = '0';
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
    }
  }
  setMenu(false);

  menuBtn.addEventListener('click', () => setMenu(!menuOpen));
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });

  // Header shadow on scroll
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-lg', 'shadow-black/40');
    } else {
      header.classList.remove('shadow-lg', 'shadow-black/40');
    }
  });

  // Testimonials carousel
  const track = document.getElementById('testi-track');
  const slides = track.children.length;
  const dotsWrap = document.getElementById('testi-dots');
  let current = 0;
  let autoTimer;

  for (let i = 0; i < slides; i++) {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Ir a la reseña ' + (i + 1));
    dot.className = 'w-2.5 h-2.5 rounded-full transition-colors ' + (i === 0 ? 'bg-gold' : 'bg-steellight');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  }

  function updateDots() {
    [...dotsWrap.children].forEach((d, i) => {
      d.className = 'w-2.5 h-2.5 rounded-full transition-colors ' + (i === current ? 'bg-gold' : 'bg-steellight');
    });
  }

  function goTo(index) {
    current = (index + slides) % slides;
    track.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
    resetAuto();
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 6000);
  }

  document.getElementById('testi-next').addEventListener('click', () => goTo(current + 1));
  document.getElementById('testi-prev').addEventListener('click', () => goTo(current - 1));
  resetAuto();

  // Smooth-scroll offset correction for sticky header (native anchors already smooth via CSS)
});
