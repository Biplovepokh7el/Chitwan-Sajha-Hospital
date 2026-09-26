import { store } from '../state.js';

export function renderNavbar() {
  const { language } = store.getState();
  const isNe = language === 'ne';

  return `
    <!-- Top Emergency Contact & Announcement Bar -->
    <div class="top-bar">
      <div class="container top-bar-content">
        <div class="top-bar-info">
          <span><i class="fa-solid fa-phone-volume" style="color: var(--danger);"></i> ${isNe ? 'इमर्जेन्सी २४/७:' : 'Emergency 24/7:'} <a href="tel:+9779819283223" style="font-weight: 700;">+977 981-9283223</a> / <a href="tel:+97756520111" style="font-weight: 700;">(056) 520111</a></span>
          <span><i class="fa-solid fa-clock" style="color: var(--accent-teal);"></i> ${isNe ? 'OPD: आइत - शुक्र (८:०० AM - ७:०० PM)' : 'OPD: Sun - Fri (8:00 AM - 7:00 PM)'}</span>
          <span><i class="fa-solid fa-location-dot" style="color: var(--accent-teal);"></i> ${isNe ? 'भरतपुर-१०, हुलाक चोक, नेपाल' : 'Bharatpur-10, Hulak Chowk, Nepal'}</span>
        </div>
        <div class="top-bar-right">
          <button id="lang-toggle-btn" class="btn" style="padding: 0.25rem 0.65rem; font-size: 0.75rem; background: rgba(255,255,255,0.15); color: #FFF; border-radius: 4px; font-weight: 700; min-height: 32px;" title="Switch Language">
            <i class="fa-solid fa-globe"></i> ${isNe ? 'English' : 'नेपाली'}
          </button>
        </div>
      </div>
    </div>

    <!-- Main Navigation Header -->
    <header class="header-nav">
      <div class="container">
        <nav class="navbar">
          <a href="/" data-link class="logo-brand">
            <img src="/assets/images/logo.jpg" alt="Chitwan Sajha Hospital Logo" style="height: 48px; width: 48px; object-fit: contain; border-radius: 6px;">
            <div>
              <div style="line-height: 1.1; font-size: 1.15rem; font-weight: 800; color: var(--primary-navy); letter-spacing: -0.02em;">
                ${isNe ? 'चितवन साझा' : 'CHITWAN SAJHA'}
              </div>
              <div style="font-size: 0.68rem; font-weight: 700; color: var(--accent-teal); letter-spacing: 1.1px; text-transform: uppercase;">
                ${isNe ? 'अस्पताल प्रालि (२५ शैया)' : 'HOSPITAL PVT. LTD. (25 BEDS)'}
              </div>
            </div>
          </a>

          <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle Navigation Menu" aria-expanded="false">
            <i class="fa-solid fa-bars" id="menu-icon"></i>
          </button>

          <ul class="nav-menu" id="nav-menu">
            <li><a href="/" data-link class="nav-link">${store.t('nav_home')}</a></li>
            
            <li class="has-dropdown">
              <a href="/about" data-link class="nav-link">
                ${store.t('nav_about')} <i class="fa-solid fa-chevron-down" style="font-size: 0.65rem;"></i>
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
                ${store.t('nav_departments')} <i class="fa-solid fa-chevron-down" style="font-size: 0.65rem;"></i>
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
            <li><a href="/health-packages" data-link class="nav-link">${store.t('nav_packages')}</a></li>
            <li><a href="/contact" data-link class="nav-link">${store.t('nav_contact')}</a></li>
          </ul>

          <div class="navbar-actions">
            <a href="tel:+9779819283223" class="btn btn-emergency">
              <i class="fa-solid fa-phone"></i> <span>${isNe ? 'इमर्जेन्सी' : 'Emergency 24/7'}</span>
            </a>
            <a href="/appointment" data-link class="btn btn-primary">
              <i class="fa-solid fa-calendar-check"></i> <span>${store.t('book_appointment')}</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  `;
}
