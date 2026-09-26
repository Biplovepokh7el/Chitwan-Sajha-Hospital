import { api } from '../api.js';
import { store } from '../state.js';

const LAT = '27.68584718001731';
const LNG = '84.43963948407959';

export async function renderContactPage() {
  const isNe = store.getLang() === 'ne';

  return `
    <div class="page-header-banner" style="background: linear-gradient(135deg, #071933, #0F2C59); color: #FFF; padding: 3rem 0; text-align: center;">
      <div class="container">
        <h1 class="page-header-title" style="font-size: 2.25rem; font-weight: 800; color: #FFF; margin-bottom: 0.5rem; font-family: var(--heading-font);">
          ${isNe ? 'सम्पर्क तथा ठेगाना' : 'Contact & Hospital Location'}
        </h1>
        <p style="color: var(--accent-teal); font-weight: 600; font-size: 0.95rem;">Chitwan Sajha Hospital • Bharatpur-10, Hulak Chowk, Nepal</p>
      </div>
    </div>

    <section class="section-padding">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem;">
          <div>
            <span class="section-tag">${isNe ? 'सम्पर्क विवरण' : 'Hospital Details'}</span>
            <h2 class="section-title">Get in Touch</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.75rem;">Our 24/7 emergency casualty desk and OPD reception are located at Hulak Chowk, Bharatpur-10.</p>

            <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2rem;">
              <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
                <div style="width: 40px; height: 40px; background: rgba(0, 132, 117, 0.1); color: var(--accent-teal); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;"><i class="fa-solid fa-location-dot"></i></div>
                <div>
                  <h3 style="font-weight: 700; color: var(--primary-navy); font-size: 0.95rem; font-family: var(--heading-font);">Physical Address</h3>
                  <p style="font-size: 0.85rem; color: var(--text-muted);">Bharatpur-10, Hulak Chowk (Sajha Petro Pump, 10 Bypass Rd), Chitwan, Nepal</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
                <div style="width: 40px; height: 40px; background: rgba(220, 38, 38, 0.1); color: var(--danger); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;"><i class="fa-solid fa-phone"></i></div>
                <div>
                  <h3 style="font-weight: 700; color: var(--primary-navy); font-size: 0.95rem; font-family: var(--heading-font);">Emergency & Landline Helplines (24/7)</h3>
                  <p style="font-size: 0.85rem; color: var(--text-muted);">
                    <a href="tel:+9779819283223" style="color: var(--danger); font-weight: 700;">+977 981-9283223</a> / <a href="tel:+97756520111" style="color: var(--primary-navy); font-weight: 700;">+977 (56) 520111</a>
                  </p>
                </div>
              </div>

              <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
                <div style="width: 40px; height: 40px; background: rgba(0, 132, 117, 0.1); color: var(--accent-teal); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;"><i class="fa-solid fa-envelope"></i></div>
                <div>
                  <h3 style="font-weight: 700; color: var(--primary-navy); font-size: 0.95rem; font-family: var(--heading-font);">Email Communication</h3>
                  <p style="font-size: 0.85rem; color: var(--text-muted);">info@chitwansajha.org | appointments@chitwansajha.org</p>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-panel" style="padding: 2rem; border-radius: var(--radius-md);">
            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 1.25rem; font-family: var(--heading-font);">Send an Inquiry</h3>
            <form id="contact-inquiry-form">
              <!-- Honeypot anti-spam field -->
              <input type="text" id="contact-website" style="display:none;" tabindex="-1" autocomplete="off">

              <div style="margin-bottom: 1rem;">
                <label for="contact-name" class="form-label">Full Name *</label>
                <input type="text" id="contact-name" class="form-control" required placeholder="Your full name...">
              </div>
              <div style="margin-bottom: 1rem;">
                <label for="contact-email" class="form-label">Email Address *</label>
                <input type="email" id="contact-email" class="form-control" required placeholder="name@domain.com">
              </div>
              <div style="margin-bottom: 1rem;">
                <label for="contact-phone" class="form-label">Mobile Number *</label>
                <input type="tel" id="contact-phone" class="form-control" required placeholder="+977 98XXXXXXXX">
              </div>
              <div style="margin-bottom: 1.25rem;">
                <label for="contact-message" class="form-label">Message / Inquiry *</label>
                <textarea id="contact-message" class="form-control" rows="4" required placeholder="How can our medical team assist you?"></textarea>
              </div>
              <button type="submit" class="btn btn-primary" style="width: 100%;">
                <i class="fa-solid fa-paper-plane"></i> Submit Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}
