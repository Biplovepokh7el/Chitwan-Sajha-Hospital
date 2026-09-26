export function renderFooter() {
  return `
    <footer class="footer" style="background: var(--primary-navy-dark); color: #CBD5E1; padding: 3.5rem 0 1.5rem 0; border-top: 1px solid var(--border-color);">
      <div class="container">
        <div class="footer-grid" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 2.5rem; margin-bottom: 2.5rem;">
          <div>
            <a href="/" data-link class="logo-brand" style="color: #FFFFFF; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.75rem; text-decoration: none;">
              <img src="/assets/images/logo.jpg" alt="Chitwan Sajha Hospital Logo" style="height: 48px; width: 48px; object-fit: contain; background: #FFF; padding: 2px; border-radius: 6px;">
              <div>
                <div style="line-height: 1.1; font-size: 1.15rem; font-weight: 800; color: #FFFFFF;">CHITWAN SAJHA</div>
                <div style="font-size: 0.65rem; color: var(--accent-teal); letter-spacing: 1.2px; font-weight: 700;">HOSPITAL PVT. LTD. (25 BEDS)</div>
              </div>
            </a>
            <p style="font-size: 0.85rem; margin-bottom: 1.25rem; line-height: 1.6; color: #94A3B8;">
              Chitwan Sajha Hospital is a 25-bed general hospital located at Bharatpur-10, Hulak Chowk, Nepal. Providing ethical medical care, general & laparoscopic surgery, 24/7 digital diagnostics, and emergency casualty response.
            </p>
            <p style="font-size: 0.78rem; color: var(--accent-teal); font-weight: 600;">
              <i class="fa-solid fa-shield-halved"></i> Licensed by Ministry of Health & Population • NMC Registered Medical Team
            </p>
          </div>

          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #FFFFFF; margin-bottom: 1rem; font-family: var(--heading-font);">Quick Links</h4>
            <ul style="list-style: none; padding: 0; font-size: 0.85rem; line-height: 2;">
              <li><a href="/about" data-link style="color: #94A3B8;">About Hospital</a></li>
              <li><a href="/chairman-message" data-link style="color: #94A3B8;">Chairman's Message</a></li>
              <li><a href="/board-of-directors" data-link style="color: #94A3B8;">Board of Directors (BOD)</a></li>
              <li><a href="/doctors" data-link style="color: #94A3B8;">Specialist Doctors</a></li>
              <li><a href="/appointment" data-link style="color: #94A3B8;">Book OPD Appointment</a></li>
            </ul>
          </div>

          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #FFFFFF; margin-bottom: 1rem; font-family: var(--heading-font);">Departments</h4>
            <ul style="list-style: none; padding: 0; font-size: 0.85rem; line-height: 2;">
              <li><a href="/department/medicine" data-link style="color: #94A3B8;">General Medicine</a></li>
              <li><a href="/department/surgery" data-link style="color: #94A3B8;">Laparoscopic Surgery</a></li>
              <li><a href="/department/radiology" data-link style="color: #94A3B8;">Radiology & USG</a></li>
              <li><a href="/department/gynecology" data-link style="color: #94A3B8;">Gynecology & ANC</a></li>
              <li><a href="/department/orthopedics" data-link style="color: #94A3B8;">Orthopedics & Trauma</a></li>
              <li><a href="/department/emergency" data-link style="color: var(--danger); font-weight: 700;">24/7 Emergency Casualty</a></li>
            </ul>
          </div>

          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #FFFFFF; margin-bottom: 1rem; font-family: var(--heading-font);">Hospital Contact</h4>
            <p style="font-size: 0.85rem; margin-bottom: 0.6rem; color: #94A3B8;"><i class="fa-solid fa-location-dot" style="color: var(--accent-teal);"></i> Bharatpur-10, Hulak Chowk (Sajha Petro Pump, 10 Bypass Rd), Chitwan, Nepal</p>
            <p style="font-size: 0.85rem; margin-bottom: 0.6rem; color: #94A3B8;"><i class="fa-solid fa-phone" style="color: var(--danger);"></i> Emergency Lines: <a href="tel:+9779819283223" style="color: #FFF; font-weight: 700;">+977 981-9283223</a> / <a href="tel:+97756520111" style="color: #FFF; font-weight: 700;">+977 (56) 520111</a></p>
            <p style="font-size: 0.85rem; margin-bottom: 0.6rem; color: #94A3B8;"><i class="fa-brands fa-whatsapp" style="color: #25D366;"></i> WhatsApp: <a href="https://wa.me/9779819283223" target="_blank" style="color: #25D366; font-weight: 700;">+977 981-9283223</a></p>
            <p style="font-size: 0.85rem; margin-bottom: 0.6rem; color: #94A3B8;"><i class="fa-solid fa-clock" style="color: var(--accent-teal);"></i> OPD Hours: Sun - Fri (8:00 AM - 7:00 PM)</p>
          </div>
        </div>

        <div class="footer-bottom" style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem; text-align: center; font-size: 0.8rem; color: #64748B;">
          <p>© 2026 Chitwan Sajha Hospital Pvt. Ltd., Bharatpur-10, Hulak Chowk, Chitwan, Bagmati Province, Nepal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Floating Emergency Widgets -->
    <div class="floating-widgets" style="position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 999; display: flex; flex-direction: column; gap: 0.75rem;">
      <a href="https://wa.me/9779819283223" target="_blank" class="float-btn float-whatsapp" style="width: 50px; height: 50px; background: #25D366; color: #FFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; box-shadow: var(--shadow-md); text-decoration: none;" title="WhatsApp Hospital Desk">
        <i class="fa-brands fa-whatsapp"></i>
      </a>
      <a href="tel:+9779819283223" class="float-btn float-emergency" style="width: 50px; height: 50px; background: var(--danger); color: #FFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; box-shadow: var(--shadow-md); text-decoration: none;" title="Call 24/7 Emergency (+977 981-9283223)">
        <i class="fa-solid fa-phone-flip"></i>
      </a>
    </div>
  `;
}
