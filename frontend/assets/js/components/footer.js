import { store } from '../state.js';

export function renderFooter() {
  const { language } = store.getState();
  const isNe = language === 'ne';

  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Hospital Brand & Licensing Column -->
          <div>
            <a href="/" data-link class="logo-brand" style="color: var(--text-inverse); margin-bottom: 1.25rem;">
              <img src="/assets/images/logo.jpg" alt="Chitwan Sajha Hospital Logo" class="logo-img" style="background: #FFFFFF; padding: 2px;">
              <div>
                <div class="logo-title" style="color: var(--text-inverse);">CHITWAN SAJHA</div>
                <div class="logo-subtitle" style="color: var(--color-sky);">HOSPITAL PVT. LTD.</div>
              </div>
            </a>
            <p style="font-size: 0.9rem; margin-bottom: 1.25rem; line-height: 1.65; color: var(--color-blue-100);">
              ${isNe 
                ? 'चितवन साझा अस्पताल प्रालि भरतपुर-१०, हुलाक चोकमा स्थित २५ शैयाको सामान्य अस्पताल हो। यहाँ निष्पक्ष चिकित्सा, शल्यक्रिया, डिजिटल भिडियो एक्स-रे तथा २४ सै घण्टा इमर्जेन्सी सेवा उपलब्ध छ।'
                : 'Chitwan Sajha Hospital Pvt. Ltd. is a 25-bed general hospital located at Bharatpur-10, Hulak Chowk, Nepal providing ethical general medicine, laparoscopic surgery, digital diagnostics, and 24/7 emergency casualty response.'
              }
            </p>
            <div style="font-size: 0.85rem; color: var(--color-sky); font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-shield-halved" style="font-size: 1.1rem;"></i> 
              <span>${isNe ? 'स्वास्थ्य तथा जनसंख्या मन्त्रालयबाट स्वीकृत • NMC दर्ता प्राप्त चिकित्सकहरू' : 'Licensed by Ministry of Health & Population • NMC Registered Medical Faculty'}</span>
            </div>
          </div>

          <!-- Quick Navigation Links Column -->
          <div>
            <h4>${isNe ? 'मुख्य लिङ्कहरू' : 'Quick Links'}</h4>
            <ul>
              <li><a href="/about" data-link>${store.t('nav_overview')}</a></li>
              <li><a href="/chairman-message" data-link>${store.t('nav_chairman_msg')}</a></li>
              <li><a href="/board-of-directors" data-link>${store.t('nav_bod')}</a></li>
              <li><a href="/doctors" data-link>${store.t('nav_doctors')}</a></li>
              <li><a href="/contact" data-link>${store.t('nav_contact')}</a></li>
            </ul>
          </div>

          <!-- Department Directory Column -->
          <div>
            <h4>${isNe ? 'विभागहरू' : 'Departments'}</h4>
            <ul>
              <li><a href="/department/medicine" data-link>General Medicine</a></li>
              <li><a href="/department/surgery" data-link>Laparoscopic Surgery</a></li>
              <li><a href="/department/radiology" data-link>Radiology & USG</a></li>
              <li><a href="/department/gynecology" data-link>Gynecology & Obs</a></li>
              <li><a href="/department/orthopedics" data-link>Orthopedics & Trauma</a></li>
              <li><a href="/department/emergency" data-link style="color: var(--color-emergency); font-weight: 700;">24/7 Emergency Casualty</a></li>
            </ul>
          </div>

          <!-- Emergency Contact Column -->
          <div>
            <h4>${isNe ? 'अस्पताल सम्पर्क' : 'Hospital Contact'}</h4>
            <p style="font-size: 0.9rem; margin-bottom: 0.75rem; color: var(--color-blue-100); display: flex; gap: 0.6rem;">
              <i class="fa-solid fa-location-dot" style="color: var(--color-sky); margin-top: 3px;"></i> 
              <span>Bharatpur-10, Hulak Chowk (Sajha Petro Pump, 10 Bypass Rd), Chitwan, Nepal</span>
            </p>
            <p style="font-size: 0.9rem; margin-bottom: 0.75rem; color: var(--color-blue-100); display: flex; gap: 0.6rem;">
              <i class="fa-solid fa-phone" style="color: var(--color-emergency); margin-top: 3px;"></i> 
              <span>
                Emergency: <a href="tel:+9779819283223" style="color: var(--text-inverse); font-weight: 700;">+977 981-9283223</a> / <a href="tel:+97756520111" style="color: var(--text-inverse); font-weight: 700;">+977 (56) 520111</a>
              </span>
            </p>
            <p style="font-size: 0.9rem; margin-bottom: 0.75rem; color: var(--color-blue-100); display: flex; gap: 0.6rem;">
              <i class="fa-solid fa-clock" style="color: var(--color-sky); margin-top: 3px;"></i> 
              <span>OPD Hours: Sun - Fri (8:00 AM - 7:00 PM)</span>
            </p>
          </div>
        </div>

        <!-- Footer Copyright & Legal Line -->
        <div class="footer-bottom">
          <p>© 2026 Chitwan Sajha Hospital Pvt. Ltd., Bharatpur-10, Hulak Chowk, Chitwan, Bagmati Province, Nepal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Fixed Floating Bottom Mobile Emergency Bar -->
    <div class="mobile-floating-bar" id="mobile-floating-bar">
      <div class="mobile-floating-content">
        <a href="tel:+9779819283223" class="mobile-call-btn">
          <i class="fa-solid fa-phone-volume"></i>
          <span>${isNe ? 'इमर्जेन्सी कल गर्नुहोस्: ९८१९२८३२२३' : 'Call 24/7 Emergency: +977 981-9283223'}</span>
        </a>
      </div>
    </div>
  `;
}
