import { api } from '../api.js';
import { store } from '../state.js';

const LAT = '27.68584718001731';
const LNG = '84.43963948407959';

export async function renderContactPage() {
  const isNe = store.getLang() === 'ne';

  return `
    <div class="hero-section" style="padding: 3rem 0;">
      <div class="container">
        <div class="breadcrumbs" style="color: var(--color-sky); margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem;">
          <a href="/" data-link style="color: var(--color-sky);">${store.t('nav_home')}</a> / <span style="color: var(--text-inverse);">${store.t('nav_contact')}</span>
        </div>
        <h1 class="hero-title" style="font-size: 2.25rem; margin-bottom: 0.5rem;">
          ${isNe ? 'अस्पताल सम्पर्क तथा ठेगाना' : 'Contact & Hospital Location'}
        </h1>
        <p class="hero-subtitle" style="margin-bottom: 0; font-size: 1rem; color: var(--color-sky);">
          Chitwan Sajha Hospital Pvt. Ltd. • Bharatpur-10, Hulak Chowk, Chitwan, Nepal
        </p>
      </div>
    </div>

    <section class="section-padding">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem;">
          <div>
            <span class="section-tag">${isNe ? 'सम्पर्क विवरण' : 'Hospital Direct Contact'}</span>
            <h2 class="section-title">${isNe ? 'चितवन साझा अस्पतालमा सम्पर्क' : 'Get in Touch with Our Medical Staff'}</h2>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 2rem; line-height: var(--lh-relaxed);">
              ${isNe 
                ? 'हाम्रो २४ सै घण्टा इमर्जेन्सी काउन्टर तथा OPD सोधपुछ काउन्टर भरतपुर-१० हुलाक चोकमा रहेको छ।' 
                : 'Our 24/7 emergency casualty desk and OPD reception counter are conveniently located at Hulak Chowk, Bharatpur-10 (Sajha Petro Pump, 10 Bypass Rd).'
              }
            </p>

            <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem;">
              <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <div style="width: 48px; height: 48px; background: var(--color-mist); color: var(--color-royal); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0;">
                  <i class="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h3 style="font-weight: 700; color: var(--color-ink); font-size: 1.05rem; margin-bottom: 0.25rem;">${isNe ? 'अस्पतालको ठेगाना' : 'Physical Hospital Address'}</h3>
                  <p style="font-size: 0.9rem; color: var(--text-muted); line-height: var(--lh-normal);">
                    Bharatpur-10, Hulak Chowk (Sajha Petro Pump, 10 Bypass Rd), Chitwan, Bagmati Province, Nepal
                  </p>
                </div>
              </div>

              <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <div style="width: 48px; height: 48px; background: rgba(211, 47, 47, 0.12); color: var(--color-emergency); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0;">
                  <i class="fa-solid fa-phone-volume"></i>
                </div>
                <div>
                  <h3 style="font-weight: 700; color: var(--color-ink); font-size: 1.05rem; margin-bottom: 0.25rem;">${isNe ? '२४/७ इमर्जेन्सी तथा फोन नम्वर' : '24/7 Emergency & Landline Helplines'}</h3>
                  <p style="font-size: 0.9rem; color: var(--text-muted); line-height: var(--lh-normal);">
                    Mobile / Emergency: <a href="tel:+9779819283223" style="color: var(--color-emergency); font-weight: 700;">+977 981-9283223</a><br>
                    Landline: <a href="tel:+97756520111" style="color: var(--color-ink); font-weight: 700;">+977 (56) 520111</a>
                  </p>
                </div>
              </div>

              <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <div style="width: 48px; height: 48px; background: var(--color-mist); color: var(--color-royal); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0;">
                  <i class="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h3 style="font-weight: 700; color: var(--color-ink); font-size: 1.05rem; margin-bottom: 0.25rem;">${isNe ? 'इमेल सम्पर्क' : 'Email Enquiries'}</h3>
                  <p style="font-size: 0.9rem; color: var(--text-muted);">info@chitwansajha.org</p>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-panel" style="padding: 2.25rem; border-radius: var(--radius-lg);">
            <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--color-ink); margin-bottom: 1.25rem;">${isNe ? 'सोधपुछ फारम पठाउनुहोस्' : 'Send an Enquiry'}</h3>
            <form id="contact-inquiry-form">
              <!-- Honeypot anti-spam field -->
              <input type="text" id="contact-website" style="display:none;" tabindex="-1" autocomplete="off">

              <div class="form-group">
                <label for="contact-name" class="form-label">${isNe ? 'पूरा नाम *' : 'Full Name *'}</label>
                <input type="text" id="contact-name" class="form-control" required placeholder="${isNe ? 'तपाईंको पूरा नाम...' : 'Your full name...'}">
              </div>
              
              <div class="form-group">
                <label for="contact-phone" class="form-label">${isNe ? 'मोबाइल नम्बर *' : 'Mobile Phone Number *'}</label>
                <input type="tel" id="contact-phone" class="form-control" required placeholder="+977 98XXXXXXXX">
              </div>

              <div class="form-group">
                <label for="contact-email" class="form-label">${isNe ? 'इमेल ठेगाना' : 'Email Address'}</label>
                <input type="email" id="contact-email" class="form-control" placeholder="name@domain.com">
              </div>

              <div class="form-group" style="margin-bottom: 1.5rem;">
                <label for="contact-message" class="form-label">${isNe ? 'सन्देश / सोधपुछ विवरण *' : 'Message / Enquiry *'}</label>
                <textarea id="contact-message" class="form-control" rows="4" required placeholder="${isNe ? 'तपाईंको प्रश्न वा सन्देश यहाँ लेख्नुहोस्...' : 'How can our hospital staff assist you?'}"></textarea>
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%;">
                <i class="fa-solid fa-paper-plane"></i> ${isNe ? 'सन्देश पठाउनुहोस्' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- MAP LOCATION SECTION -->
    <section class="section-padding" style="background: var(--bg-main);">
      <div class="container">
        <div class="glass-panel" style="overflow: hidden; height: 420px; border-radius: var(--radius-xl);">
          <iframe 
            src="https://maps.google.com/maps?q=${LAT},${LNG}&z=17&output=embed" 
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy"
            title="Chitwan Sajha Hospital Map Location">
          </iframe>
        </div>
      </div>
    </section>
  `;
}
