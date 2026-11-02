import { api } from '../api.js';
import { store } from '../state.js';

export async function renderDoctors() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialSearch = urlParams.get('search') || '';
  const initialDept = urlParams.get('department') || '';
  const isNe = store.getLang() === 'ne';

  const [docsRes, deptsRes] = await Promise.all([
    api.getDoctors({ search: initialSearch, department: initialDept }),
    api.getDepartments()
  ]);

  const doctors = docsRes.doctors || [];
  const departments = deptsRes.departments || [];

  return `
    <div class="hero-section" style="padding: 3rem 0;">
      <div class="container">
        <div class="breadcrumbs" style="color: var(--color-sky); margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem;">
          <a href="/" data-link style="color: var(--color-sky);">${store.t('nav_home')}</a> / <span style="color: var(--text-inverse);">${store.t('nav_doctors')}</span>
        </div>
        <h1 class="hero-title" style="font-size: 2.25rem; margin-bottom: 0.5rem;">
          ${isNe ? 'विशेषज्ञ डाक्टर विवरण' : 'Find a Specialist Doctor'}
        </h1>
        <p class="hero-subtitle" style="margin-bottom: 0; font-size: 1rem;">
          ${isNe ? 'भरतपुर-१० स्थित अनुभवी तथा NMC दर्ता प्राप्त कन्सल्टेन्ट डाक्टरहरू' : 'NMC-registered consultant specialists at Chitwan Sajha Hospital, Bharatpur-10'}
        </p>
      </div>
    </div>

    <section class="section-padding" style="min-height: 60vh;">
      <div class="container">
        <!-- Filter Controls Bar -->
        <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2.5rem; border-radius: var(--radius-lg);">
          <div style="display: grid; grid-template-columns: 2fr 2fr 1fr; gap: 1rem; align-items: end;">
            <div>
              <label class="form-label">${isNe ? 'डाक्टर वा विशेषता खोज्नुहोस्' : 'Search Doctor Name or Specialty'}</label>
              <input type="text" id="doc-search-input" class="form-control" value="${initialSearch}" placeholder="${isNe ? 'डाक्टरको नाम वा विशेषता...' : 'Type doctor name, specialty, or qualification...'}">
            </div>
            <div>
              <label class="form-label">${isNe ? 'विभाग छान्नुहोस्' : 'Filter by Department'}</label>
              <select id="doc-dept-filter" class="form-control">
                <option value="">${isNe ? 'सबै विभागहरू' : 'All Departments'}</option>
                ${departments.map(d => `<option value="${d.id}" ${initialDept == d.id ? 'selected' : ''}>${d.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <button id="doc-filter-btn" class="btn btn-primary" style="width: 100%;">
                <i class="fa-solid fa-filter"></i> ${isNe ? 'फिल्टर लागू' : 'Apply Filter'}
              </button>
            </div>
          </div>
        </div>

        <div id="doctors-list-container" class="card-grid">
          ${renderDoctorCardsList(doctors)}
        </div>
      </div>
    </section>
  `;
}

export function renderDoctorCardsList(doctors) {
  const isNe = store.getLang() === 'ne';

  if (!doctors || doctors.length === 0) {
    return `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1.5px solid var(--border-color);">
        <i class="fa-solid fa-user-slash fa-3x" style="color: var(--text-muted); margin-bottom: 1.25rem;"></i>
        <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--color-ink); margin-bottom: 0.5rem;">${isNe ? 'कुनै डाक्टर भेटिएन' : 'No Medical Specialists Found'}</h3>
        <p class="text-muted" style="font-size: 0.95rem; margin: 0 auto; max-width: 480px; line-height: var(--lh-normal);">
          ${isNe ? 'तपाईंले खोज्नुभएको नाम वा विभागसँग मिल्ने डाक्टर भेटिएन। कृपया अर्को नाम वा सबै विभाग छान्नुहोस्।' : 'No doctors match your query. Please try searching another keyword or select "All Departments".'}
        </p>
      </div>
    `;
  }

  return doctors.map(doc => {
    return `
      <div class="doctor-card">
        <a href="/doctor/${doc.slug}" data-link class="doctor-img-wrapper">
          <img src="${doc.photo}" alt="${doc.name}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80';">
          <div class="doctor-action-overlay">
            <span class="btn btn-primary" style="font-size: 0.85rem; padding: 0.45rem 1rem;">
              <i class="fa-solid fa-paper-plane"></i> ${isNe ? 'सम्पर्क गर्नुहोस्' : 'Contact Us'}
            </span>
          </div>
        </a>
        <div class="doctor-card-body">
          <span class="doctor-nmc">${doc.nmc_no}</span>
          <div style="font-size: 0.775rem; font-weight: 700; color: var(--color-royal); text-transform: uppercase; margin-bottom: 0.25rem;">${doc.department_name}</div>
          <a href="/doctor/${doc.slug}" data-link class="doctor-name">${doc.name}</a>
          <div class="doctor-specialty">${doc.qualification}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.35rem;">
            <i class="fa-solid fa-briefcase" style="color: var(--color-royal);"></i> ${doc.experience}
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">
            <i class="fa-solid fa-language" style="color: var(--color-royal);"></i> ${doc.languages || 'Nepali, English'}
          </div>

          <div style="display: flex; gap: 0.5rem; margin-top: auto;">
            <a href="/doctor/${doc.slug}" data-link class="btn btn-outline" style="flex: 1; font-size: 0.825rem; padding: 0.5rem;">
              <i class="fa-solid fa-id-card"></i> ${isNe ? 'डाक्टर प्रोफाइल' : 'View Profile'}
            </a>
            <a href="/contact" data-link class="btn btn-primary" style="flex: 1; font-size: 0.825rem; padding: 0.5rem;">
              <i class="fa-solid fa-paper-plane"></i> ${isNe ? 'सम्पर्क' : 'Contact'}
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

export async function renderDoctorDetail(params) {
  const isNe = store.getLang() === 'ne';
  try {
    const res = await api.getDoctorBySlug(params.slug);
    const doc = res.doctor;
    const availability = doc.availability || {};

    return `
      <div class="hero-section" style="padding: 3rem 0;">
        <div class="container">
          <div class="breadcrumbs" style="color: var(--color-sky); margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem;">
            <a href="/" data-link style="color: var(--color-sky);">${store.t('nav_home')}</a> / <a href="/doctors" data-link style="color: var(--color-sky);">${store.t('nav_doctors')}</a> / <span style="color: var(--text-inverse);">${doc.name}</span>
          </div>
          <h1 class="hero-title" style="font-size: 2.25rem; margin-bottom: 0.25rem;">${doc.name}</h1>
          <p class="hero-subtitle" style="margin-bottom: 0; font-size: 1rem; color: var(--color-sky);">
            ${doc.specialization} • ${doc.department_name}
          </p>
        </div>
      </div>

      <section class="section-padding">
        <div class="container">
          <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2.5rem;">
            <div>
              <div class="glass-panel" style="overflow: hidden; padding: 1rem; margin-bottom: 1.5rem; text-align: center;">
                <img src="${doc.photo}" alt="${doc.name}" style="width: 100%; height: 360px; object-fit: cover; border-radius: var(--radius-md);" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80';">
                <div style="margin-top: 1rem;">
                  <span class="badge badge-brand" style="font-size: 0.85rem; padding: 0.35rem 0.85rem;">Nepal Medical Council: ${doc.nmc_no}</span>
                </div>
              </div>

              <!-- OPD Schedule Card -->
              <div class="glass-panel" style="padding: 1.5rem;">
                <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-ink); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                  <i class="fa-solid fa-calendar-days" style="color: var(--color-royal);"></i> ${isNe ? 'OPD परामर्श समय' : 'OPD Consultation Schedule'}
                </h3>
                <ul style="list-style: none; padding: 0; font-size: 0.9rem; line-height: 2;">
                  ${Object.entries(availability).map(([day, times]) => `
                    <li style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding: 0.3rem 0;">
                      <strong style="color: var(--color-ink);">${day}:</strong>
                      <span style="color: var(--color-royal); font-weight: 600;">${Array.isArray(times) ? times.join(', ') : times}</span>
                    </li>
                  `).join('')}
                </ul>
                <div style="margin-top: 1.25rem;">
                  <a href="/contact" data-link class="btn btn-primary" style="width: 100%;">
                    <i class="fa-solid fa-paper-plane"></i> ${isNe ? 'अस्पताल सम्पर्क गर्नुहोस्' : 'Contact Hospital OPD'}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div class="glass-panel" style="padding: 2rem; margin-bottom: 2rem;">
                <h2 style="font-size: 1.4rem; font-weight: 700; color: var(--color-ink); margin-bottom: 1rem;">${isNe ? 'डाक्टर परिचय तथा अनुभव' : 'Biography & Clinical Background'}</h2>
                <p style="line-height: var(--lh-relaxed); color: var(--text-main); font-size: 1rem; margin-bottom: 1.5rem;">${doc.bio || 'Senior medical specialist at Chitwan Sajha Hospital Pvt. Ltd.'}</p>
                
                <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-royal); margin-bottom: 0.5rem;">${isNe ? 'योग्यता तथा अनुभव' : 'Qualifications & Experience'}</h3>
                <p style="margin-bottom: 1.25rem; font-size: 0.95rem; color: var(--text-muted);">${doc.qualification} (${doc.experience})</p>

                <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-royal); margin-bottom: 0.5rem;">${isNe ? 'भाषा ज्ञान' : 'Languages Spoken'}</h3>
                <p style="font-size: 0.95rem; color: var(--text-muted);">${doc.languages || 'Nepali, English'}</p>
              </div>

              <div class="glass-panel" style="padding: 2rem; background: var(--color-mist); border-color: rgba(23, 97, 194, 0.2);">
                <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-ink); margin-bottom: 0.5rem;">${isNe ? 'अस्पतालमा परामर्श लिनुहोस्' : 'Schedule OPD Consultation'}</h3>
                <p style="font-size: 0.925rem; color: var(--text-muted); margin-bottom: 1.25rem; line-height: var(--lh-normal);">
                  ${isNe ? 'डाक्टरसँग OPD परामर्शका लागि हाम्रो भरतपुर-१० हुलाक चोकमा रहेको अस्पतालमा सिधै सम्पर्क गर्नुहोस्।' : 'To consult with this specialist, please visit our OPD counter at Bharatpur-10, Hulak Chowk or call our contact lines.'}
                </p>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                  <a href="/contact" data-link class="btn btn-primary">
                    <i class="fa-solid fa-paper-plane"></i> ${isNe ? 'सम्पर्क फारम' : 'Contact Form'}
                  </a>
                  <a href="tel:+9779819283223" class="btn btn-emergency">
                    <i class="fa-solid fa-phone"></i> ${PHONE_NUMBER}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  } catch (err) {
    return `<div class="container section-padding text-center"><h2>Doctor Profile Not Found</h2></div>`;
  }
}
