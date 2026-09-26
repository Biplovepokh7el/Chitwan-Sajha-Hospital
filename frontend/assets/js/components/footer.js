export function renderFooter() {
  return `
    <footer class="footer" style="background: var(--primary-navy-dark); color: #CBD5E1; padding: 3.5rem 0 1.5rem 0; border-top: 1px solid rgba(255,255,255,0.1);">
      <div class="container">
        <div class="footer-grid" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 2.5rem; margin-bottom: 2.5rem;">
          <div>
            <!-- Clean Logo Lockup (NO 25 beds text) -->
            <a href="/" data-link class="logo-brand" style="color: #FFFFFF; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.75rem; text-decoration: none;">
              <img src="/assets/images/logo.jpg" alt="Chitwan Sajha Hospital Logo" style="height: 46px; width: 46px; object-fit: contain; background: #FFFFFF; padding: 2px; border-radius: 6px;">
              <div>
                <div style="line-height: 1.1; font-size: 1.15rem; font-weight: 800; color: #FFFFFF; font-family: var(--heading-font);">CHITWAN SAJHA</div>
                <div style="font-size: 0.68rem; color: #2DD4BF; letter-spacing: 1px; font-weight: 700; text-transform: uppercase;">HOSPITAL PVT. LTD.</div>
              </div>
            </a>
            <p style="font-size: 0.875rem; margin-bottom: 1.25rem; line-height: 1.65; color: #CBD5E1;">
              Chitwan Sajha Hospital Pvt. Ltd. is a general healthcare institution at Bharatpur-10, Hulak Chowk, Nepal. Providing ethical medical care, general & laparoscopic surgery, digital diagnostics, and 24/7 emergency casualty response.
            </p>
            <p style="font-size: 0.8rem; color: #2DD4BF; font-weight: 600;">
              <i class="fa-solid fa-shield-halved"></i> Licensed by Ministry of Health & Population • NMC Registered Medical Faculty
            </p>
          </div>

          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #FFFFFF; margin-bottom: 1rem; font-family: var(--heading-font);">Quick Links</h4>
            <ul style="list-style: none; padding: 0; font-size: 0.875rem; line-height: 2.1;">
              <li><a href="/about" data-link style="color: #CBD5E1;">About Hospital</a></li>
              <li><a href="/chairman-message" data-link style="color: #CBD5E1;">Chairman's Message</a></li>
              <li><a href="/board-of-directors" data-link style="color: #CBD5E1;">Board of Directors (BOD)</a></li>
              <li><a href="/doctors" data-link style="color: #CBD5E1;">Specialist Doctors</a></li>
              <li><a href="/appointment" data-link style="color: #CBD5E1;">Book OPD Appointment</a></li>
            </ul>
          </div>

          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #FFFFFF; margin-bottom: 1rem; font-family: var(--heading-font);">Departments</h4>
            <ul style="list-style: none; padding: 0; font-size: 0.875rem; line-height: 2.1;">
              <li><a href="/department/medicine" data-link style="color: #CBD5E1;">General Medicine</a></li>
              <li><a href="/department/surgery" data-link style="color: #CBD5E1;">Laparoscopic Surgery</a></li>
              <li><a href="/department/radiology" data-link style="color: #CBD5E1;">Radiology & USG</a></li>
              <li><a href="/department/gynecology" data-link style="color: #CBD5E1;">Gynecology & ANC</a></li>
              <li><a href="/department/orthopedics" data-link style="color: #CBD5E1;">Orthopedics & Trauma</a></li>
              <li><a href="/department/emergency" data-link style="color: #F87171; font-weight: 700;">24/7 Emergency Casualty</a></li>
            </ul>
          </div>

          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #FFFFFF; margin-bottom: 1rem; font-family: var(--heading-font);">Hospital Contact</h4>
            <p style="font-size: 0.875rem; margin-bottom: 0.6rem; color: #CBD5E1;"><i class="fa-solid fa-location-dot" style="color: #2DD4BF;"></i> Bharatpur-10, Hulak Chowk (Sajha Petro Pump, 10 Bypass Rd), Chitwan, Nepal</p>
            <p style="font-size: 0.875rem; margin-bottom: 0.6rem; color: #CBD5E1;"><i class="fa-solid fa-phone" style="color: #F87171;"></i> Emergency Lines: <a href="tel:+9779819283223" style="color: #FFFFFF; font-weight: 700;">+977 981-9283223</a> / <a href="tel:+97756520111" style="color: #FFFFFF; font-weight: 700;">+977 (56) 520111</a></p>
            <p style="font-size: 0.875rem; margin-bottom: 0.6rem; color: #CBD5E1;"><i class="fa-solid fa-clock" style="color: #2DD4BF;"></i> OPD Hours: Sun - Fri (8:00 AM - 7:00 PM)</p>
          </div>
        </div>

        <div class="footer-bottom" style="border-top: 1px solid rgba(255,255,255,0.15); padding-top: 1.5rem; text-align: center; font-size: 0.85rem; color: #F8FAFC; font-weight: 500;">
          <p style="color: #F8FAFC !important; margin: 0; font-weight: 500;">© 2026 Chitwan Sajha Hospital Pvt. Ltd., Bharatpur-10, Hulak Chowk, Chitwan, Bagmati Province, Nepal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Floating Emergency Widget -->
    <div class="floating-widgets" style="position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 999; display: flex; flex-direction: column; gap: 0.75rem;">
      <a href="tel:+9779819283223" class="float-btn float-emergency" style="width: 48px; height: 48px; background: var(--danger); color: #FFFFFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; box-shadow: var(--shadow-md); text-decoration: none;" title="Call 24/7 Emergency Casualty (+977 981-9283223)">
        <i class="fa-solid fa-phone-flip"></i>
      </a>
    </div>
  `;
}
