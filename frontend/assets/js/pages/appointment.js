import { store } from '../state.js';

export async function renderAppointmentPage() {
  const isNe = store.getLang() === 'ne';

  return `
    <div class="page-header-banner" style="background: linear-gradient(135deg, #071933, #0F2C59); color: #FFF; padding: 3rem 0; text-align: center;">
      <div class="container">
        <h1 class="page-header-title" style="font-size: 2.25rem; font-weight: 800; color: #FFF; margin-bottom: 0.5rem; font-family: var(--heading-font);">
          ${isNe ? 'अस्पताल सम्पर्क तथा ओपीडी जानकारी' : 'OPD & Hospital Contact Information'}
        </h1>
        <p style="color: var(--accent-teal); font-weight: 600; font-size: 0.95rem;">Chitwan Sajha Hospital • Bharatpur-10, Hulak Chowk</p>
      </div>
    </div>

    <section class="section-padding">
      <div class="container" style="max-width: 760px;">
        <div class="glass-panel" style="padding: 2.5rem; border-radius: var(--radius-md); text-align: center;">
          <div style="width: 64px; height: 64px; background: rgba(0, 121, 107, 0.1); color: var(--accent-teal); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.75rem; margin: 0 auto 1.25rem auto;">
            <i class="fa-solid fa-hospital-user"></i>
          </div>
          
          <h2 style="font-size: 1.4rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.75rem;">
            ${isNe ? 'ओपीडी परामर्श तथा अस्पताल सेवा' : 'OPD Consultations & Inquiries'}
          </h2>
          <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 2rem;">
            ${isNe 
              ? 'ओपीडी परामर्श र डाक्टर सेवाद्वारा जानकारी लिनका लागि कृपया हाम्रो अस्पतालको फोन नम्बर वा प्रत्यक्ष हुलाक चोकस्थित काउन्टरमा सम्पर्क गर्नुहोस्।' 
              : 'For specialist OPD consultations and inquiries, please contact our reception directly or visit our hospital counter at Bharatpur-10, Hulak Chowk.'
            }
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; text-align: left; margin-bottom: 2rem;">
            <div style="background: var(--bg-card-hover); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.5rem;"><i class="fa-solid fa-phone" style="color: var(--danger);"></i> Direct Phone Lines</h4>
              <p style="font-size: 0.875rem; margin-bottom: 0.25rem;"><a href="tel:+9779819283223" style="font-weight: 700; color: var(--danger);">+977 981-9283223</a></p>
              <p style="font-size: 0.875rem;"><a href="tel:+97756520111" style="font-weight: 700; color: var(--primary-navy);">+977 (56) 520111</a></p>
            </div>

            <div style="background: var(--bg-card-hover); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.5rem;"><i class="fa-solid fa-clock" style="color: var(--accent-teal);"></i> OPD Reception Hours</h4>
              <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.25rem;">Sunday – Friday: 8:00 AM – 7:00 PM</p>
              <p style="font-size: 0.85rem; color: var(--danger); font-weight: 600;">Emergency Casualty: 24/7 Open</p>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="/doctors" data-link class="btn btn-primary">
              <i class="fa-solid fa-user-doctor"></i> View Our Doctors
            </a>
            <a href="/contact" data-link class="btn btn-outline">
              <i class="fa-solid fa-envelope"></i> Send General Inquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}
