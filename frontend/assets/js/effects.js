import { store } from './state.js';

export function initEffects() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // 1. Sticky Header Shrink & Glassmorphism Shadow
  const header = document.getElementById('main-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('shrunk');
      } else {
        header.classList.remove('shrunk');
      }
    };
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Cursor-Follow Spotlight Glow on Department Cards
  const deptCards = document.querySelectorAll('.dept-card');
  deptCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 3. Subtle 3D Tilt Effect on Doctor Cards (Max 6-8 deg)
  const doctorCards = document.querySelectorAll('.doctor-card');
  doctorCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.matchMedia('(hover: none)').matches) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6; // Max -6 to 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;  // Max -6 to 6 deg
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 4. Fact Strip Count-Up Numbers via IntersectionObserver
  const countElements = document.querySelectorAll('[data-count]');
  if (countElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          if (!isNaN(target)) {
            let start = 0;
            const duration = 1200;
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;
            const timer = setInterval(() => {
              start += increment;
              if (start >= target) {
                el.textContent = `${target}+`;
                clearInterval(timer);
              } else {
                el.textContent = `${Math.floor(start)}+`;
              }
            }, stepTime);
          }
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    countElements.forEach(el => observer.observe(el));
  }

  // 5. Mobile Menu Toggle & Drawer Open/Close
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.onclick = (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    };

    // Close menu when clicking outside
    document.onclick = (e) => {
      if (!e.target.closest('#main-header')) {
        navMenu.classList.remove('active');
        if (menuToggle) {
          menuToggle.setAttribute('aria-expanded', 'false');
          const icon = menuToggle.querySelector('i');
          if (icon) icon.className = 'fa-solid fa-bars';
        }
      }
    };
  }

  // 6. Language Switcher Click Event
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.onclick = () => {
      const current = store.getLang();
      const next = current === 'ne' ? 'en' : 'ne';
      store.setLang(next);
      window.location.reload();
    };
  }
}

// Make initEffects available on window
window.initEffects = initEffects;
