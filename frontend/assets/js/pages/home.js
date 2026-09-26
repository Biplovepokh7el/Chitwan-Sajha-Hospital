import { api } from '../api.js';
import { store } from '../state.js';

const WA_NUMBER = '9779819283223';
const PHONE_NUMBER = '+977 981-9283223';
const LANDLINE = '+977 (56) 520111';
const LAT = '27.68584718001731';
const LNG = '84.43963948407959';

export async function renderHome() {
  const [deptsRes, docsRes] = await Promise.allSettled([
    api.getDepartments(),
    api.getDoctors()
  ]);

  const departments = deptsRes.status === 'fulfilled' ? deptsRes.value.departments : [];
  const doctors = docsRes.status === 'fulfilled' ? docsRes.value.doctors : [];
  const isNe = store.getLang() === 'ne';

  return `
    <!-- SECTION 1: HERO (Real Hospital Visual & Single Clear CTA) -->
    <section class="hero-slider-section" style="padding: 4rem 0 3.5rem 0; background: linear-gradient(135deg, #071933 0%, #0F2C59 100%); color: #FFFFFF; position: relative; overflow: hidden;">
      <div class="container hero-content-grid" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 3rem; align-items: center;">
        <div>
          <span class="section-tag" style="background: rgba(0, 132, 117, 0.25); color: #2DD4BF; border: 1px solid rgba(0, 132, 117, 0.4);">
            <i class="fa-solid fa-hospital"></i> ${store.t('hospital_tagline')}
          </span>
          <h1 class="hero-title" style="font-size: 2.75rem; font-weight: 800; margin: 0.85rem 0 1rem 0; line-height: 1.15; color: #FFFFFF; font-family: var(--heading-font);">
            ${store.t('hero_title')}
          </h1>
          <p class="hero-subtitle" style="font-size: 1.05rem; line-height: 1.65; max-width: 560px; color: #CBD5E1; margin-bottom: 2rem;">
            ${store.t('hero_subtitle')}
          </p>
          <div class="hero-cta-group" style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
            <a href="/appointment" data-link class="btn btn-primary" style="padding: 0.85rem 1.75rem; font-size: 1rem; border-radius: var(--radius-sm); font-weight: 700;">
              <i class="fa-solid fa-calendar-check"></i> ${store.t('book_appointment')}
            </a>
            <a href="tel:+9779819283223" class="btn btn-emergency" style="padding: 0.85rem 1.5rem; font-size: 0.95rem; font-weight: 700;">
              <i class="fa-solid fa-phone"></i> ${isNe ? 'इमर्जेन्सी कल: ' : 'Emergency: '}${PHONE_NUMBER}
            </a>
          </div>
        </div>
        <div class="hero-image-wrapper" style="border: 1px solid rgba(255,255,255,0.2); border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-lg);">
          <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" alt="Chitwan Sajha Hospital Building at Bharatpur-10" style="width: 100%; height: 360px; object-fit: cover;" loading="eager">
        </div>
      </div>
    </section>

    <!-- SECTION 2: KEY DEPARTMENTS AS CARDS (8 Official Departments) -->
    <section class="section-padding" style="background: var(--bg-main);">
      <div class="container">
        <div class="text-center">
          <span class="section-tag">${isNe ? 'चिकित्सा सेवाहरू' : 'Clinical Specialties'}</span>
          <h2 class="section-title">${store.t('our_departments')}</h2>
          <p class="section-subtitle">Comprehensive outpatient and inpatient general hospital departments in Bharatpur-10.</p>
        </div>

        <div class="card-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem;">
          ${departments.map(dept => `
            <a href="/department/${dept.slug}" data-link class="dept-card glass-panel" style="padding: 1.5rem; display: flex; flex-direction: column; height: 100%; text-decoration: none; transition: var(--transition);">
              <div style="width: 44px; height: 44px; background: rgba(0, 132, 117, 0.12); color: var(--accent-teal); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; margin-bottom: 1rem;">
                <i class="fa-solid ${dept.icon || 'fa-stethoscope'}"></i>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--primary-navy); font-family: var(--heading-font);">${dept.name}</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem; line-height: 1.55; flex-grow: 1;">${dept.short_desc}</p>
              <div style="font-weight: 700; color: var(--accent-teal); font-size: 0.85rem; display: flex; align-items: center; gap: 0.35rem; margin-top: auto;">
                ${isNe ? 'विभाग हेर्नुहोस्' : 'View Department'} <i class="fa-solid fa-arrow-right" style="font-size: 0.75rem;"></i>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- SECTION 3: WHY CHOOSE US (Honest 25-Bed General Hospital Facts) -->
    <section class="section-padding" style="background: var(--bg-card); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <div class="text-center">
          <span class="section-tag">${isNe ? 'अस्पतालका विशेषताहरू' : 'Trusted Local Care'}</span>
          <h2 class="section-title">${store.t('why_choose_us')}</h2>
          <p class="section-subtitle">Dedicated to delivering ethical, accessible, and high-quality medical services for Chitwan residents.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
          <div class="glass-panel" style="padding: 1.75rem; text-align: center;">
            <div style="width: 54px; height: 54px; background: rgba(220, 38, 38, 0.1); color: var(--danger); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1rem auto;">
              <i class="fa-solid fa-truck-medical"></i>
            </div>
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.5rem; font-family: var(--heading-font);">24/7 Emergency Casualty</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">Round-the-clock emergency triage, acute trauma care, and ambulance dispatch at Hulak Chowk.</p>
          </div>

          <div class="glass-panel" style="padding: 1.75rem; text-align: center;">
            <div style="width: 54px; height: 54px; background: rgba(0, 132, 117, 0.1); color: var(--accent-teal); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1rem auto;">
              <i class="fa-solid fa-user-doctor"></i>
            </div>
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.5rem; font-family: var(--heading-font);">NMC Registered Doctors</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">Board-certified specialist consultants across General Medicine, Surgery, Pediatrics, Orthopedics, and Gynecology.</p>
          </div>

          <div class="glass-panel" style="padding: 1.75rem; text-align: center;">
            <div style="width: 54px; height: 54px; background: rgba(29, 97, 231, 0.1); color: var(--accent-blue); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1rem auto;">
              <i class="fa-solid fa-x-ray"></i>
            </div>
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.5rem; font-family: var(--heading-font);">24/7 Digital Diagnostics</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">High-resolution Digital X-Ray, 3D/4D Color Doppler Ultrasound, and computerized pathology testing.</p>
          </div>

          <div class="glass-panel" style="padding: 1.75rem; text-align: center;">
            <div style="width: 54px; height: 54px; background: rgba(15, 44, 89, 0.1); color: var(--primary-navy); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1rem auto;">
              <i class="fa-solid fa-bed-pulse"></i>
            </div>
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.5rem; font-family: var(--heading-font);">Clean 25-Bed Facility</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">Attentive inpatient nursing care, general wards, private cabins, and modular surgical operating theaters.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 4: DOCTOR HIGHLIGHTS (Clean Grid of Specialist Cards) -->
    <section class="section-padding" style="background: var(--bg-main);">
      <div class="container">
        <div class="text-center">
          <span class="section-tag">${isNe ? 'हाम्रा डाक्टरहरू' : 'Medical Faculty'}</span>
          <h2 class="section-title">${store.t('our_doctors')}</h2>
          <p class="section-subtitle">Consultant physicians and surgeons available for OPD consultation and surgical care.</p>
        </div>

        <div class="card-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
          ${doctors.map(doc => `
            <div class="doctor-card glass-panel" style="display: flex; flex-direction: column; overflow: hidden; height: 100%;">
              <div style="position: relative; overflow: hidden; height: 240px; background: #F1F5F9;">
                <img src="${doc.photo}" alt="${doc.name} - ${doc.specialization}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
                <span class="badge badge-success" style="position: absolute; top: 12px; right: 12px;">${doc.nmc_no}</span>
              </div>
              <div style="padding: 1.25rem; display: flex; flex-direction: column; flex-grow: 1;">
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--accent-teal); text-transform: uppercase; margin-bottom: 0.25rem;">${doc.department_name}</div>
                <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.25rem; font-family: var(--heading-font);">${doc.name}</h3>
                <div style="font-size: 0.825rem; color: var(--text-muted); margin-bottom: 0.5rem; font-weight: 600;">${doc.qualification}</div>
                <p style="font-size: 0.8rem; color: var(--text-light); margin-bottom: 1rem; line-height: 1.5; flex-grow: 1;">${doc.bio}</p>
                <div style="display: flex; gap: 0.5rem; margin-top: auto;">
                  <a href="/appointment?doctor=${doc.id}" data-link class="btn btn-primary" style="flex: 1; padding: 0.5rem; font-size: 0.825rem; text-align: center;">
                    <i class="fa-solid fa-calendar-check"></i> ${isNe ? 'अपोइन्टमेन्ट' : 'Book OPD'}
                  </a>
                  <a href="https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hello, I would like to inquire about consulting ${doc.name}.`)}" target="_blank" class="btn" style="background: #25D366; color: #FFF; padding: 0.5rem 0.75rem; font-size: 0.85rem;" title="WhatsApp Consultation">
                    <i class="fa-brands fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- SECTION 5: EMERGENCY CONTACT BLOCK (Prominent 24/7 Hotline Callout) -->
    <section class="section-padding" style="background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%); color: #FFFFFF; text-align: center;">
      <div class="container" style="max-width: 800px;">
        <div style="display: inline-block; width: 64px; height: 64px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.25rem auto;">
          <i class="fa-solid fa-phone-volume"></i>
        </div>
        <h2 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 0.75rem; color: #FFFFFF; font-family: var(--heading-font);">
          ${store.t('emergency_block_title')}
        </h2>
        <p style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 2rem; color: #FEE2E2;">
          ${isNe ? 'इमर्जेन्सी एम्बुलेन्स तथा प्राथमिक उपचारका लागि २४ सै घण्टा तत्काल सम्पर्क गर्नुहोस्:' : 'For urgent medical triage, road traffic trauma, acute pain, or immediate ambulance dispatch:'}
        </p>
        <div style="display: flex; gap: 1.25rem; justify-content: center; flex-wrap: wrap;">
          <a href="tel:+9779819283223" class="btn" style="background: #FFFFFF; color: #DC2626; font-size: 1.15rem; padding: 0.85rem 1.75rem; font-weight: 800; border-radius: var(--radius-sm); text-decoration: none;">
            <i class="fa-solid fa-mobile-screen"></i> ${PHONE_NUMBER}
          </a>
          <a href="tel:+97756520111" class="btn" style="background: rgba(255,255,255,0.15); color: #FFFFFF; border: 1px solid rgba(255,255,255,0.4); font-size: 1.1rem; padding: 0.85rem 1.5rem; font-weight: 700; border-radius: var(--radius-sm); text-decoration: none;">
            <i class="fa-solid fa-phone"></i> Landline: ${LANDLINE}
          </a>
        </div>
      </div>
    </section>

    <!-- SECTION 6: LOCATION MAP (Pinned Google Map at Bharatpur-10, Hulak Chowk) -->
    <section class="section-padding" style="background: var(--bg-card);">
      <div class="container">
        <div class="text-center">
          <span class="section-tag">${isNe ? 'अस्पतालको स्थान' : 'Hospital Location'}</span>
          <h2 class="section-title">Visit Chitwan Sajha Hospital</h2>
          <p class="section-subtitle">Bharatpur-10, Hulak Chowk (Sajha Petro Pump, 10 Bypass Rd), Chitwan, Nepal.</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem; margin-top: 1.5rem; align-items: stretch;">
          <div class="glass-panel" style="padding: 1.75rem; display: flex; flex-direction: column; justify-content: center;">
            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 1.25rem; font-family: var(--heading-font);">Contact Details</h3>

            <div style="display: flex; gap: 0.85rem; margin-bottom: 1.25rem; align-items: flex-start;">
              <i class="fa-solid fa-location-dot" style="color: var(--accent-teal); font-size: 1.2rem; margin-top: 0.2rem;"></i>
              <div>
                <strong>Location & Address:</strong>
                <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.2rem;">Bharatpur-10, Hulak Chowk, Sajha Petro Pump, 10 Bypass Rd, Chitwan, Nepal</p>
              </div>
            </div>

            <div style="display: flex; gap: 0.85rem; margin-bottom: 1.25rem; align-items: flex-start;">
              <i class="fa-solid fa-phone" style="color: var(--danger); font-size: 1.1rem; margin-top: 0.2rem;"></i>
              <div>
                <strong>24/7 Emergency Lines:</strong>
                <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.2rem;">
                  <a href="tel:+9779819283223" style="color: var(--danger); font-weight: 700;">+977 981-9283223</a> / <a href="tel:+97756520111" style="color: var(--primary-navy); font-weight: 700;">(056) 520111</a>
                </p>
              </div>
            </div>

            <div style="display: flex; gap: 0.85rem; margin-bottom: 1.5rem; align-items: flex-start;">
              <i class="fa-solid fa-clock" style="color: var(--accent-teal); font-size: 1.1rem; margin-top: 0.2rem;"></i>
              <div>
                <strong>OPD Schedule:</strong>
                <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.2rem;">Sunday to Friday: 8:00 AM – 7:00 PM</p>
              </div>
            </div>

            <a href="https://www.google.com/maps?q=${LAT},${LNG}" target="_blank" class="btn btn-primary" style="width: 100%; font-size: 0.9rem;">
              <i class="fa-solid fa-location-arrow"></i> Open Directions in Google Maps
            </a>
          </div>

          <div class="glass-panel" style="position: relative; overflow: hidden; min-height: 380px;">
            <iframe 
              src="https://maps.google.com/maps?q=${LAT},${LNG}&z=17&output=embed" 
              width="100%" 
              height="100%" 
              style="border:0; min-height: 380px;" 
              allowfullscreen="" 
              loading="lazy"
              title="Chitwan Sajha Hospital Google Map Location">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  `;
}
