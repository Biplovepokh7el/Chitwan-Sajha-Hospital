import { store } from '../state.js';

export function renderNavbar() {
  const { language } = store.getState();
  const isNe = language === 'ne';

  return `
    <!-- Top Emergency Bar -->
    <div class="top-bar">
      <div class="container top-bar-content">
        <div class="top-bar-info">
          <span><i class="fa-solid fa-phone-volume" style="color: var(--danger);"></i> ${isNe ? 'इमर्जेन्सी २४/७:' : 'Emergency 24/7:'} <a href="tel:+9779819283223" style="font-weight: 700; color: #FFFFFF;">+977 981-9283223</a> / <a href="tel:+97756520111" style="font-weight: 700; color: #FFFFFF;">(056) 520111</a></span>
          <span><i class="fa-solid fa-clock" style="color: #2DD4BF;"></i> ${isNe ? 'OPD: आइत - शुक्र (८:०० AM - ७:०० PM)' : 'OPD: Sun - Fri (8:00 AM - 7:00 PM)'}</span>
          <span><i class="fa-solid fa-location-dot" style="color: #2DD4BF;"></i> ${isNe ? 'भरतपुर-१०, हुलाक चोक, नेपाल' : 'Bharatpur-10, Hulak Chowk, Nepal'}</span>
        </div>
      </div>
    </div>

    <!-- Main Navigation Header -->
    <header class="header-nav">
      <div class="container">
        <nav class="navbar" style="display: flex; align-items: center; justify-content: space-between; height: 72px;">
          <!-- Clean Logo Lockup (NO 25 beds text) -->
          <a href="/" data-link class="logo-brand" style="display: flex; align-items: center; gap: 0.75rem; text-decoration: none;">
            <img src="/assets/images/logo.jpg" alt="Chitwan Sajha Hospital Logo" style="height: 46px; width: 46px; object-fit: contain; border-radius: 6px;">
            <div>
              <div style="line-height: 1.1; font-size: 1.15rem; font-weight: 800; color: var(--primary-navy); font-family: var(--heading-font); letter-spacing: -0.02em;">
                ${store.t('brand_title_p1')}
              </div>
              <div style="font-size: 0.68rem; font-weight: 700; color: var(--accent-teal); letter-spacing: 1px; text-transform: uppercase;">
                ${store.t('brand_title_p2')}
              </div>
            </div>
          </a>

          <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle Navigation Menu" aria-expanded="false">
            <i class="fa-solid fa-bars" id="menu-icon"></i>
          </button>

          <!-- Nav Menu -->
          <ul class="nav-menu" id="nav-menu">
            <li><a href="/" data-link class="nav-link">${store.t('nav_home')}</a></li>
            
            <li class="has-dropdown">
              <a href="/about" data-link class="nav-link">
                ${store.t('nav_about')}
              </a>
              <div class="mega-dropdown" style="width: 240px; grid-template-columns: 1fr;">
                <div class="mega-col">
                  <h4 style="margin-bottom: 0.5rem; color: var(--accent-teal); font-weight: 700;">About Hospital</h4>
                  <ul>
                    <li><a href="/about" data-link>${store.t('nav_overview')}</a></li>
                    <li><a href="/chairman-message" data-link>${store.t('nav_chairman_msg')}</a></li>
                    <li><a href="/board-of-directors" data-link>${store.t('nav_bod')}</a></li>
                    <li><a href="/doctors" data-link>${store.t('nav_doctors')}</a></li>
                  </ul>
                </div>
              </div>
            </li>

            <li class="has-dropdown">
              <a href="/departments" data-link class="nav-link">
                ${store.t('nav_departments')}
              </a>
              <div class="mega-dropdown" style="width: 480px; grid-template-columns: 1fr 1fr; left: -100px;">
                <div class="mega-col">
                  <h4 style="margin-bottom: 0.5rem; color: var(--accent-teal); font-weight: 700;">Medical & Surgical</h4>
                  <ul>
                    <li><a href="/department/medicine" data-link>General Medicine</a></li>
                    <li><a href="/department/surgery" data-link>Laparoscopic Surgery</a></li>
                    <li><a href="/department/orthopedics" data-link>Orthopedics & Trauma</a></li>
                    <li><a href="/department/gynecology" data-link>Gynecology & Obstetrics</a></li>
                  </ul>
                </div>
                <div class="mega-col">
                  <h4 style="margin-bottom: 0.5rem; color: var(--accent-teal); font-weight: 700;">Diagnostics & Critical Care</h4>
                  <ul>
                    <li><a href="/department/radiology" data-link>Radiology & USG</a></li>
                    <li><a href="/department/anesthesia" data-link>Anesthesia & Critical Care</a></li>
                    <li><a href="/department/pediatrics" data-link>Pediatrics & Child Health</a></li>
                    <li><a href="/department/emergency" data-link style="color: var(--danger); font-weight: 700;">24/7 Emergency Casualty</a></li>
                  </ul>
                </div>
              </div>
            </li>

            <li><a href="/doctors" data-link class="nav-link">${store.t('nav_doctors')}</a></li>
            <li><a href="/board-of-directors" data-link class="nav-link">${store.t('nav_bod')}</a></li>
            <li><a href="/contact" data-link class="nav-link">${store.t('nav_contact')}</a></li>
          </ul>

          <!-- Single Horizontal Flex Row Action Buttons (No stacking) -->
          <div class="navbar-actions" style="display: flex; flex-direction: row; align-items: center; gap: 0.5rem; flex-wrap: nowrap;">
            <a href="tel:+9779819283223" class="btn btn-emergency" style="padding: 0.5rem 0.85rem; font-size: 0.825rem; white-space: nowrap;">
              <i class="fa-solid fa-phone"></i> <span class="btn-text-emergency">${isNe ? 'इमर्जेन्सी' : 'Emergency 24/7'}</span>
            </a>
            <a href="/appointment" data-link class="btn btn-primary" style="padding: 0.5rem 0.95rem; font-size: 0.85rem; white-space: nowrap;">
              <i class="fa-solid fa-calendar-check"></i> <span>${store.t('book_appointment')}</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  `;
}
