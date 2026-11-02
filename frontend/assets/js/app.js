import { Router, routes } from './router.js';
import { store } from './state.js';
import { api } from './api.js';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderDoctorCardsList } from './pages/doctors.js';
import { initEffects } from './effects.js';

document.addEventListener('DOMContentLoaded', async () => {
  const headerContainer = document.getElementById('header-container');
  const footerContainer = document.getElementById('footer-container');

  function updateLayout() {
    if (headerContainer) headerContainer.innerHTML = renderNavbar();
    if (footerContainer) footerContainer.innerHTML = renderFooter();
    initEffects();
  }

  updateLayout();
  
  // Re-render layout on language change
  store.subscribe(() => {
    updateLayout();
  });

  const router = new Router(routes);
  await router.handleRoute();

  // Helper for Doctor Filter in Directory
  async function performDoctorFilter() {
    const searchInput = document.getElementById('doc-search-input');
    const deptSelect = document.getElementById('doc-dept-filter');
    const container = document.getElementById('doctors-list-container');

    if (!container) return;

    const search = searchInput ? searchInput.value.trim() : '';
    const department = deptSelect ? deptSelect.value : '';

    container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem;"><i class="fa-solid fa-spinner fa-spin fa-2x" style="color: var(--color-royal);"></i></div>';

    try {
      const res = await api.getDoctors({ department, search });
      container.innerHTML = renderDoctorCardsList(res.doctors || []);
      initEffects();
    } catch (err) {
      console.error('Filter error:', err);
      container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--color-emergency);">Failed to fetch doctors list.</div>';
    }
  }

  // Event Listeners for Doctor Search & Filters
  document.addEventListener('click', async (e) => {
    if (e.target.closest('#doc-filter-btn')) {
      e.preventDefault();
      await performDoctorFilter();
    }
  });

  document.addEventListener('change', async (e) => {
    if (e.target.id === 'doc-dept-filter') {
      await performDoctorFilter();
    }
  });

  document.addEventListener('input', async (e) => {
    if (e.target.id === 'doc-search-input') {
      await performDoctorFilter();
    }
  });

  // Contact Form Submission Handler
  document.addEventListener('submit', async (e) => {
    if (e.target.id === 'contact-inquiry-form') {
      e.preventDefault();
      const honeypot = document.getElementById('contact-website')?.value;
      if (honeypot) {
        alert('Spam submission detected.');
        return;
      }
      const name = document.getElementById('contact-name')?.value;
      const email = document.getElementById('contact-email')?.value;
      const phone = document.getElementById('contact-phone')?.value;
      const message = document.getElementById('contact-message')?.value;

      try {
        await api.sendInquiry({ name, email, phone, message });
        alert(store.getLang() === 'ne' ? 'तपाईंको सन्देश प्राप्त भयो। अस्पताल टोलीले चाँडै सम्पर्क गर्नेछ।' : 'Inquiry received. Our medical staff will contact you shortly.');
        e.target.reset();
      } catch (err) {
        alert(err.message || 'Failed to send enquiry');
      }
    }
  });
});
