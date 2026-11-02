import { api } from '../api.js';
import { store } from '../state.js';

const PHONE_NUMBER = '+977 981-9283223';
const LANDLINE = '+977 (56) 520111';
const LAT = '27.68584718001731';
const LNG = '84.43963948407959';

export async function renderHome() {
  const [deptsRes, docsRes, chairmanRes] = await Promise.allSettled([
    api.getDepartments(),
    api.getDoctors(),
    api.getChairmanMessage()
  ]);

  const departments = deptsRes.status === 'fulfilled' ? deptsRes.value.departments : [];
  const doctors = docsRes.status === 'fulfilled' ? docsRes.value.doctors : [];
  const chairmanData = chairmanRes.status === 'fulfilled' ? chairmanRes.value.data : null;
  const isNe = store.getLang() === 'ne';

  return `
    <!-- HERO SECTION WITH OPEN RING GRAPHIC MOTIF -->
    <section class="hero-section">
      <div class="hero-bg-ring"></div>
      <div class="container hero-content-grid">
        <div>
          <span class="section-tag" style="background: rgba(44, 188, 237, 0.15); color: var(--color-sky); border-color: rgba(44, 188, 237, 0.3);">
            <i class="fa-solid fa-hospital"></i> ${store.t('hero_tagline')}
          </span>
          <h1 class="hero-title">
            ${store.t('hero_title')}
          </h1>
          <p class="hero-subtitle">
            ${store.t('hero_subtitle')}
          </p>
          <div class="hero-cta-group">
            <a href="tel:+9779819283223" class="btn btn-emergency">
              <i class="fa-solid fa-phone-volume"></i> 
              <span>${isNe ? 'इमर्जेन्सीकल: ' : 'Call Emergency: '}${PHONE_NUMBER}</span>
            </a>
            <a href="/contact" data-link class="btn btn-outline" style="border-color: var(--color-sky); color: var(--text-inverse);">
              <i class="fa-solid fa-envelope"></i> 
              <span>${isNe ? 'सम्पर्क गर्नुहोस्' : 'Contact Us'}</span>
            </a>
          </div>
        </div>

        <div class="open-ring-wrapper">
          <div class="open-ring-graphic"></div>
          <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" alt="Chitwan Sajha Hospital Building at Bharatpur-10" style="width: 100%; height: 360px; object-fit: cover;" loading="eager">
          <div style="position: absolute; bottom: 16px; left: 16px; background: rgba(6, 33, 79, 0.85); backdrop-filter: blur(8px); padding: 0.5rem 1rem; border-radius: var(--radius-full); border: 1px solid rgba(255,255,255,0.2); color: var(--text-inverse); font-size: 0.825rem; font-weight: 700; display: flex; align-items: center; gap: 0.5rem;">
            <span style="width: 10px; height: 10px; background: #22C55E; border-radius: 50%; display: inline-block; box-shadow: 0 0 8px #22C55E;"></span>
            ${isNe ? '२४/७ इमर्जेन्सी र भिडियो एक्स-रे खुला' : '24/7 Emergency & Diagnostics Active'}
          </div>
        </div>
      </div>
    </section>

    <!-- FACT STRIP & KEY METRICS -->
    <div class="container">
      <div class="fact-strip">
        <div class="fact-item">
          <div class="fact-icon"><i class="fa-solid fa-bed"></i></div>
          <div>
            <div class="fact-number" data-count="25">25</div>
            <div class="fact-label">${store.t('fact_beds_title')}</div>
          </div>
        </div>

        <div class="fact-item">
          <div class="fact-icon" style="color: var(--color-emergency); background: rgba(211, 47, 47, 0.12);"><i class="fa-solid fa-truck-medical"></i></div>
          <div>
            <div class="fact-number" data-count="24">24/7</div>
            <div class="fact-label">${store.t('fact_emergency_title')}</div>
          </div>
        </div>

        <div class="fact-item">
          <div class="fact-icon"><i class="fa-solid fa-user-doctor"></i></div>
          <div>
            <div class="fact-number" data-count="8">8</div>
            <div class="fact-label">${store.t('fact_doctors_title')}</div>
          </div>
        </div>

        <div class="fact-item">
          <div class="fact-icon"><i class="fa-solid fa-x-ray"></i></div>
          <div>
            <div class="fact-number">24/7</div>
            <div class="fact-label">${store.t('fact_diagnostics_title')}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- QUICK ACTIONS GRID -->
    <section class="section-padding" style="background: var(--bg-main);">
      <div class="container">
        <div class="text-center">
          <span class="section-tag">${isNe ? 'द्रुत सेवाहरू' : 'Quick Actions'}</span>
          <h2 class="section-title">${isNe ? 'अस्पताल सेवाहरूमा छिटो पहुँच' : 'Fast Access to Care & Contact'}</h2>
          <p class="section-subtitle">${isNe ? 'इमर्जेन्सी कल, डाक्टर र विभाग खोज्न सजिलो' : 'Direct emergency hotline, hospital contact, and doctor directory'}</p>
        </div>

        <div class="quick-action-grid">
          <a href="tel:+9779819283223" class="quick-tile">
            <i class="fa-solid fa-phone-volume quick-icon" style="color: var(--color-emergency);"></i>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.4rem;">${isNe ? '२४/७ इमर्जेन्सीकल' : '24/7 Emergency Line'}</h3>
            <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem;">${isNe ? 'तत्काल एम्बुलेन्स र इमर्जेन्सी टोली' : 'Immediate medical triage & ambulance response'}</p>
            <div style="font-weight: 700; color: var(--color-emergency); font-size: 0.85rem; display: flex; align-items: center; gap: 0.4rem; margin-top: auto;">
              ${PHONE_NUMBER} <i class="fa-solid fa-arrow-right"></i>
            </div>
          </a>

          <a href="/contact" data-link class="quick-tile">
            <i class="fa-solid fa-hospital-user quick-icon"></i>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.4rem;">${isNe ? 'अस्पताल सम्पर्क' : 'Contact Hospital'}</h3>
            <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem;">${isNe ? 'भरतपुर-१०, हुलाक चोक स्थान र फारम' : 'Bharatpur-10 address, map & contact form'}</p>
            <div style="font-weight: 700; color: var(--color-royal); font-size: 0.85rem; display: flex; align-items: center; gap: 0.4rem; margin-top: auto;">
              ${isNe ? 'सम्पर्क फारम' : 'Contact Details'} <i class="fa-solid fa-arrow-right"></i>
            </div>
          </a>

          <a href="/doctors" data-link class="quick-tile">
            <i class="fa-solid fa-user-doctor quick-icon"></i>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.4rem;">${isNe ? 'विशेषज्ञ डाक्टरहरू' : 'Find Specialist Doctor'}</h3>
            <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem;">${isNe ? 'NMC दर्ता प्राप्त अनुभवी कन्सल्टेन्ट' : 'View qualifications & OPD schedules'}</p>
            <div style="font-weight: 700; color: var(--color-royal); font-size: 0.85rem; display: flex; align-items: center; gap: 0.4rem; margin-top: auto;">
              ${isNe ? 'डाक्टर सूची' : 'Doctor Directory'} <i class="fa-solid fa-arrow-right"></i>
            </div>
          </a>

          <a href="/departments" data-link class="quick-tile">
            <i class="fa-solid fa-layer-group quick-icon"></i>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.4rem;">${isNe ? '८ वटा विशेषज्ञ विभाग' : '8 Specialized Units'}</h3>
            <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem;">${isNe ? 'मेडिसिन, सर्जरी, रेडियोलोजी, अर्थो' : 'Medicine, Surgery, Radiology, Ortho & Obs'}</p>
            <div style="font-weight: 700; color: var(--color-royal); font-size: 0.85rem; display: flex; align-items: center; gap: 0.4rem; margin-top: auto;">
              ${isNe ? 'विभागहरू हेर्नुहोस्' : 'View Departments'} <i class="fa-solid fa-arrow-right"></i>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- CHAIRMAN'S MESSAGE SECTION -->
    ${chairmanData ? `
      <section class="section-padding" style="background: var(--bg-card); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
        <div class="container" style="max-width: 960px;">
          <div class="glass-panel" style="padding: 2.5rem;">
            <div class="text-center" style="margin-bottom: 1.75rem;">
              <span class="section-tag">${store.t('chairman_sec_tag')}</span>
              <h2 class="section-title">${store.t('chairman_sec_title')}</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: 160px 1fr; gap: 2.25rem; align-items: flex-start;">
              <div style="text-align: center;">
                <img src="${chairmanData.photo}" alt="${chairmanData.chairman_name}" style="width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 4px solid var(--color-royal); margin-bottom: 0.65rem;" loading="lazy">
                <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--color-ink); margin-bottom: 0.2rem;">${chairmanData.chairman_name}</h4>
                <p style="font-size: 0.825rem; font-weight: 700; color: var(--color-royal);">${chairmanData.title}</p>
              </div>

              <div>
                <p style="line-height: var(--lh-relaxed); font-size: 1rem; color: var(--text-main); white-space: pre-line; margin-bottom: 1.5rem;">
                  ${isNe ? chairmanData.message_ne : chairmanData.message_en}
                </p>
                <a href="/chairman-message" data-link class="btn btn-outline" style="font-size: 0.9rem;">
                  <i class="fa-solid fa-file-contract"></i> ${isNe ? 'अध्यक्षको पूरा मन्तव्य पढ्नुहोस्' : 'Read Full Chairman Statement'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    ` : ''}

    <!-- DEPARTMENTS GRID -->
    <section class="section-padding" style="background: var(--bg-main);">
      <div class="container">
        <div class="text-center">
          <span class="section-tag">${store.t('depts_tag')}</span>
          <h2 class="section-title">${store.t('depts_title')}</h2>
          <p class="section-subtitle">${store.t('depts_subtitle')}</p>
        </div>

        <div class="card-grid">
          ${departments.map(dept => `
            <a href="/department/${dept.slug}" data-link class="dept-card">
              <div class="dept-icon-box">
                <i class="fa-solid ${dept.icon || 'fa-stethoscope'}"></i>
              </div>
              <h3>${dept.name}</h3>
              <p>${dept.short_desc}</p>
              <div class="dept-arrow">
                ${store.t('view_dept')} <i class="fa-solid fa-arrow-right" style="font-size: 0.8rem;"></i>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- WHY CHOOSE US -->
    <section class="section-padding" style="background: var(--bg-card); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <div class="text-center">
          <span class="section-tag">${store.t('why_tag')}</span>
          <h2 class="section-title">${store.t('why_title')}</h2>
          <p class="section-subtitle">${store.t('why_subtitle')}</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.75rem;">
          <div class="glass-panel" style="padding: 2rem; text-align: center;">
            <div style="width: 56px; height: 56px; background: rgba(211, 47, 47, 0.12); color: var(--color-emergency); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1.25rem auto;">
              <i class="fa-solid fa-truck-medical"></i>
            </div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-ink); margin-bottom: 0.5rem;">24/7 Emergency Casualty</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: var(--lh-normal);">Round-the-clock emergency triage, acute trauma care, and mobile ambulance response at Hulak Chowk.</p>
          </div>

          <div class="glass-panel" style="padding: 2rem; text-align: center;">
            <div style="width: 56px; height: 56px; background: var(--color-mist); color: var(--color-royal); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1.25rem auto;">
              <i class="fa-solid fa-user-doctor"></i>
            </div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-ink); margin-bottom: 0.5rem;">NMC Registered Doctors</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: var(--lh-normal);">Board-certified specialist consultants across General Medicine, Surgery, Pediatrics, Orthopedics, and Gynecology.</p>
          </div>

          <div class="glass-panel" style="padding: 2rem; text-align: center;">
            <div style="width: 56px; height: 56px; background: var(--color-mist); color: var(--color-royal); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1.25rem auto;">
              <i class="fa-solid fa-x-ray"></i>
            </div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-ink); margin-bottom: 0.5rem;">24/7 Digital Diagnostics</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: var(--lh-normal);">High-resolution Digital X-Ray, 3D/4D Color Doppler Ultrasound, and computerized pathology testing.</p>
          </div>

          <div class="glass-panel" style="padding: 2rem; text-align: center;">
            <div style="width: 56px; height: 56px; background: var(--color-mist); color: var(--color-royal); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1.25rem auto;">
              <i class="fa-solid fa-bed-pulse"></i>
            </div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-ink); margin-bottom: 0.5rem;">Clean 25-Bed Facility</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: var(--lh-normal);">Attentive inpatient nursing care, general wards, private cabins, and modular surgical operating theaters.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SPECIALIST DOCTORS SPOTLIGHT -->
    <section class="section-padding" style="background: var(--bg-main);">
      <div class="container">
        <div class="text-center">
          <span class="section-tag">${store.t('doctors_tag')}</span>
          <h2 class="section-title">${store.t('doctors_title')}</h2>
          <p class="section-subtitle">${store.t('doctors_subtitle')}</p>
        </div>

        <div class="card-grid">
          ${doctors.map(doc => `
            <div class="doctor-card">
              <div class="doctor-img-wrapper">
                <img src="${doc.photo}" alt="${doc.name} - ${doc.specialization}" loading="lazy">
                <div class="doctor-action-overlay">
                  <a href="/contact" data-link class="btn btn-primary" style="width: 100%; font-size: 0.85rem; padding: 0.5rem;">
                    <i class="fa-solid fa-paper-plane"></i> ${isNe ? 'सम्पर्क गर्नुहोस्' : 'Contact Us'}
                  </a>
                </div>
              </div>
              <div class="doctor-card-body">
                <span class="doctor-nmc">${doc.nmc_no}</span>
                <div style="font-size: 0.775rem; font-weight: 700; color: var(--color-royal); text-transform: uppercase; margin-bottom: 0.2rem;">${doc.department_name}</div>
                <h3 class="doctor-name">${doc.name}</h3>
                <div class="doctor-specialty">${doc.qualification}</div>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem; line-height: var(--lh-normal); flex-grow: 1;">${doc.bio}</p>
                <div style="display: flex; gap: 0.5rem; margin-top: auto;">
                  <a href="/doctor/${doc.slug}" data-link class="btn btn-outline" style="flex: 1; font-size: 0.825rem; padding: 0.5rem;">
                    <i class="fa-solid fa-id-card"></i> ${isNe ? 'डाक्टर विवरण' : 'View Profile'}
                  </a>
                  <a href="/contact" data-link class="btn btn-primary" style="flex: 1; font-size: 0.825rem; padding: 0.5rem;">
                    <i class="fa-solid fa-paper-plane"></i> ${isNe ? 'सम्पर्क' : 'Contact'}
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 24/7 EMERGENCY CALLOUT BAND -->
    <section class="section-padding" style="background: var(--gradient-emergency); color: var(--text-inverse); text-align: center;">
      <div class="container" style="max-width: 840px;">
        <div style="display: inline-flex; width: 68px; height: 68px; background: rgba(255,255,255,0.2); border-radius: 50%; align-items: center; justify-content: center; font-size: 2.25rem; margin: 0 auto 1.5rem auto;">
          <i class="fa-solid fa-phone-volume"></i>
        </div>
        <h2 style="font-size: clamp(2rem, 3.5vw, 2.5rem); font-weight: 800; margin-bottom: 0.85rem; color: var(--text-inverse);">
          ${store.t('emergency_sec_title')}
        </h2>
        <p style="font-size: 1.1rem; line-height: var(--lh-relaxed); margin-bottom: 2.25rem; color: #FFCDD2;">
          ${store.t('emergency_sec_desc')}
        </p>
        <div style="display: flex; gap: 1.25rem; justify-content: center; flex-wrap: wrap;">
          <a href="tel:+9779819283223" class="btn" style="background: var(--text-inverse); color: var(--color-emergency); font-size: 1.15rem; padding: 0.9rem 2rem; font-weight: 800; box-shadow: var(--shadow-lg);">
            <i class="fa-solid fa-mobile-screen"></i> ${PHONE_NUMBER}
          </a>
          <a href="tel:+97756520111" class="btn" style="background: rgba(255,255,255,0.18); color: var(--text-inverse); border: 1.5px solid rgba(255,255,255,0.4); font-size: 1.1rem; padding: 0.9rem 1.75rem; font-weight: 700;">
            <i class="fa-solid fa-phone"></i> Landline: ${LANDLINE}
          </a>
        </div>
      </div>
    </section>

    <!-- LOCATION & MAP HUB -->
    <section class="section-padding" style="background: var(--bg-card);">
      <div class="container">
        <div class="text-center">
          <span class="section-tag">${store.t('map_sec_tag')}</span>
          <h2 class="section-title">${store.t('map_sec_title')}</h2>
          <p class="section-subtitle">${store.t('map_sec_subtitle')}</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 2rem; margin-top: 1.5rem; align-items: stretch;">
          <div class="glass-panel" style="padding: 2rem; display: flex; flex-direction: column; justify-content: center;">
            <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--color-ink); margin-bottom: 1.5rem;">Contact Details</h3>

            <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; align-items: flex-start;">
              <i class="fa-solid fa-location-dot" style="color: var(--color-royal); font-size: 1.35rem; margin-top: 0.2rem;"></i>
              <div>
                <strong>Location & Address:</strong>
                <p style="font-size: 0.925rem; color: var(--text-muted); margin-top: 0.2rem; line-height: var(--lh-normal);">Bharatpur-10, Hulak Chowk (Sajha Petro Pump, 10 Bypass Rd), Chitwan, Nepal</p>
              </div>
            </div>

            <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; align-items: flex-start;">
              <i class="fa-solid fa-phone" style="color: var(--color-emergency); font-size: 1.25rem; margin-top: 0.2rem;"></i>
              <div>
                <strong>24/7 Emergency Lines:</strong>
                <p style="font-size: 0.925rem; color: var(--text-muted); margin-top: 0.2rem;">
                  <a href="tel:+9779819283223" style="color: var(--color-emergency); font-weight: 700;">+977 981-9283223</a> / <a href="tel:+97756520111" style="color: var(--color-ink); font-weight: 700;">(056) 520111</a>
                </p>
              </div>
            </div>

            <div style="display: flex; gap: 1rem; margin-bottom: 1.75rem; align-items: flex-start;">
              <i class="fa-solid fa-clock" style="color: var(--color-royal); font-size: 1.25rem; margin-top: 0.2rem;"></i>
              <div>
                <strong>OPD Hours:</strong>
                <p style="font-size: 0.925rem; color: var(--text-muted); margin-top: 0.2rem;">Sunday to Friday: 8:00 AM – 7:00 PM</p>
              </div>
            </div>

            <a href="https://www.google.com/maps?q=${LAT},${LNG}" target="_blank" class="btn btn-primary" style="width: 100%;">
              <i class="fa-solid fa-location-arrow"></i> ${store.t('open_maps')}
            </a>
          </div>

          <div class="glass-panel" style="position: relative; overflow: hidden; min-height: 400px; border-radius: var(--radius-lg);">
            <iframe 
              src="https://maps.google.com/maps?q=${LAT},${LNG}&z=17&output=embed" 
              width="100%" 
              height="100%" 
              style="border:0; min-height: 400px;" 
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
