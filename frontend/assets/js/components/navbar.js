import { store } from '../state.js';

export function renderNavbar() {
  const { language } = store.getState();
  const isNe = language === 'ne';

  return `
    <!-- Top Emergency & Info Bar -->
    <div class="top-bar">
      <div class="container top-bar-content">
        <div class="top-bar-info">
          <span>
            <i class="fa-solid fa-phone-volume" style="color: var(--color-emergency);"></i> 
            <strong>${isNe ? 'इमर्जेन्सी २४/७:' : 'Emergency 24/7:'}</strong> 
            <a href="tel:+9779819283223">+977 981-9283223</a> &nbsp;|&nbsp; <a href="tel:+97756520111">(056) 520111</a>
          </span>
          <span class="top-bar-hide-sm">
            <i class="fa-solid fa-clock" style="color: var(--color-sky);"></i> 
            ${isNe ? 'OPD: आइत - शुक्र (८ AM - ७ PM)' : 'OPD: Sun - Fri (8:00 AM - 7:00 PM)'}
          </span>
          <span class="top-bar-hide-md">
            <i class="fa-solid fa-location-dot" style="color: var(--color-sky);"></i> 
            ${isNe ? 'भरतपुर-१०, हुलाक चोक' : 'Bharatpur-10, Hulak Chowk'}
          </span>
        </div>

        <div class="top-bar-right">
          <!-- Language Toggle (EN / NE) -->
          <div class="lang-toggle" id="lang-toggle" role="button" aria-label="Toggle Language" tabindex="0">
            <span class="lang-btn ${!isNe ? 'active' : ''}" data-lang="en">EN</span>
            <span class="lang-btn ${isNe ? 'active' : ''}" data-lang="ne">नेपाली</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Sticky Glass Main Header -->
    <header class="header-nav" id="main-header">
      <div class="container">
        <nav class="navbar">
          <!-- Logo Brand Lockup -->
          <a href="/" data-link class="logo-brand">
            <img src="/assets/images/logo.jpg" alt="Chitwan Sajha Hospital Logo" class="logo-img">
            <div class="logo-text">
              <div class="logo-title">${store.t('brand_title_p1')}</div>
              <div class="logo-subtitle">${store.t('brand_title_p2')}</div>
            </div>
          </a>

          <!-- Mobile Hamburger Toggle Button -->
          <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle Navigation Menu" aria-expanded="false">
            <i class="fa-solid fa-bars" id="menu-icon"></i>
          </button>

          <!-- Main Desktop Navigation Menu (Streamlined, Non-Duplicated) -->
          <ul class="nav-menu" id="nav-menu">
            <li>
              <a href="/" data-link class="nav-link">${store.t('nav_home')}</a>
            </li>
            
            <!-- About Hospital Dropdown -->
            <li class="has-dropdown">
              <a href="/about" data-link class="nav-link">
                ${store.t('nav_about')} <i class="fa-solid fa-chevron-down nav-arrow"></i>
              </a>
              <div class="mega-dropdown dropdown-sm">
                <div class="mega-col">
                  <h4>About Hospital</h4>
                  <ul>
                    <li><a href="/about" data-link><i class="fa-solid fa-hospital"></i> ${store.t('nav_overview')}</a></li>
                    <li><a href="/chairman-message" data-link><i class="fa-solid fa-message"></i> ${store.t('nav_chairman_msg')}</a></li>
                    <li><a href="/board-of-directors" data-link><i class="fa-solid fa-users-gear"></i> ${store.t('nav_bod')}</a></li>
                  </ul>
                </div>
              </div>
            </li>

            <!-- Departments Mega Dropdown -->
            <li class="has-dropdown">
              <a href="/departments" data-link class="nav-link">
                ${store.t('nav_departments')} <i class="fa-solid fa-chevron-down nav-arrow"></i>
              </a>
              <div class="mega-dropdown dropdown-md">
                <div class="mega-col">
                  <h4>Medical & Surgical</h4>
                  <ul>
                    <li><a href="/department/medicine" data-link><i class="fa-solid fa-stethoscope"></i> General Medicine</a></li>
                    <li><a href="/department/surgery" data-link><i class="fa-solid fa-user-nurse"></i> Laparoscopic Surgery</a></li>
                    <li><a href="/department/orthopedics" data-link><i class="fa-solid fa-bone"></i> Orthopedics & Trauma</a></li>
                    <li><a href="/department/gynecology" data-link><i class="fa-solid fa-person-pregnant"></i> Gynecology & Obs</a></li>
                  </ul>
                </div>
                <div class="mega-col">
                  <h4>Diagnostics & Emergency</h4>
                  <ul>
                    <li><a href="/department/radiology" data-link><i class="fa-solid fa-x-ray"></i> Radiology & USG</a></li>
                    <li><a href="/department/anesthesia" data-link><i class="fa-solid fa-syringe"></i> Anesthesia & ICU</a></li>
                    <li><a href="/department/pediatrics" data-link><i class="fa-solid fa-baby"></i> Pediatrics & Child Health</a></li>
                    <li><a href="/department/emergency" data-link style="color: var(--color-emergency); font-weight: 700;"><i class="fa-solid fa-truck-medical"></i> 24/7 Emergency Casualty</a></li>
                  </ul>
                </div>
              </div>
            </li>

            <li>
              <a href="/doctors" data-link class="nav-link">${store.t('nav_doctors')}</a>
            </li>
            <li>
              <a href="/contact" data-link class="nav-link">${store.t('nav_contact')}</a>
            </li>
          </ul>

          <!-- Primary Header Action Buttons -->
          <div class="navbar-actions">
            <a href="tel:+9779819283223" class="btn btn-emergency btn-sm-nav">
              <i class="fa-solid fa-phone-volume"></i> 
              <span>${isNe ? 'इमर्जेन्सी' : 'Emergency 24/7'}</span>
            </a>
            <a href="/contact" data-link class="btn btn-primary btn-sm-nav">
              <i class="fa-solid fa-paper-plane"></i> 
              <span>${isNe ? 'सम्पर्क' : 'Contact Us'}</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  `;
}
