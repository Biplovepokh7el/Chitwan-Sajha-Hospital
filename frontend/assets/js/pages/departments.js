import { api } from '../api.js';
import { store } from '../state.js';

export async function renderDepartments() {
  const res = await api.getDepartments();
  const departments = res.departments || [];
  const isNe = store.getLang() === 'ne';

  return `
    <div class="hero-section" style="padding: 3rem 0;">
      <div class="container">
        <div class="breadcrumbs" style="color: var(--color-sky); margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem;">
          <a href="/" data-link style="color: var(--color-sky);">${store.t('nav_home')}</a> / <span style="color: var(--text-inverse);">${store.t('nav_departments')}</span>
        </div>
        <h1 class="hero-title" style="font-size: 2.25rem; margin-bottom: 0.5rem;">
          ${isNe ? 'अस्पतालका ८ वटा विशेषज्ञ विभागहरू' : '8 Specialized Medical & Surgical Units'}
        </h1>
        <p class="hero-subtitle" style="margin-bottom: 0; font-size: 1rem;">
          ${isNe ? 'चितवन साझा अस्पतालमा उपलब्ध ओपिडी, शल्यक्रिया तथा भिडियो एक्स-रे सेवाहरू' : 'Comprehensive IPD, OPD, Laparoscopic Surgery, Radiology & 24/7 Emergency at Bharatpur-10'}
        </p>
      </div>
    </div>

    <section class="section-padding">
      <div class="container">
        <div class="card-grid">
          ${departments.map(dept => `
            <a href="/department/${dept.slug}" data-link class="dept-card">
              <div style="position: relative; overflow: hidden; border-radius: var(--radius-md); margin-bottom: 1.25rem; height: 190px;">
                <img src="${dept.image}" alt="${dept.name}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80';">
                <div style="position: absolute; top: 12px; left: 12px; width: 44px; height: 44px; background: var(--color-ink); color: var(--text-inverse); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; box-shadow: var(--shadow-md);">
                  <i class="fa-solid ${dept.icon || 'fa-stethoscope'}"></i>
                </div>
              </div>
              <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--color-ink);">${dept.name}</h3>
              <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.25rem; line-height: var(--lh-normal); flex-grow: 1;">${dept.short_desc}</p>
              <div class="dept-arrow">
                ${store.t('view_dept')} <i class="fa-solid fa-arrow-right" style="font-size: 0.8rem;"></i>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export async function renderDepartmentDetail(params) {
  const isNe = store.getLang() === 'ne';
  try {
    const res = await api.getDepartmentBySlug(params.slug);
    const dept = res.department;
    const services = dept.services || (dept.services_json ? JSON.parse(dept.services_json) : []);
    const equipment = dept.equipment || (dept.equipment_json ? JSON.parse(dept.equipment_json) : []);
    const faqs = dept.faqs || (dept.faqs_json ? JSON.parse(dept.faqs_json) : []);

    return `
      <div class="hero-section" style="padding: 3rem 0; background: linear-gradient(135deg, rgba(6,33,79,0.92), rgba(11,60,158,0.85)), url('${dept.image}') center/cover;">
        <div class="container">
          <div class="breadcrumbs" style="color: var(--color-sky); margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem;">
            <a href="/" data-link style="color: var(--color-sky);">${store.t('nav_home')}</a> / <a href="/departments" data-link style="color: var(--color-sky);">${store.t('nav_departments')}</a> / <span style="color: var(--text-inverse);">${dept.name}</span>
          </div>
          <h1 class="hero-title" style="font-size: 2.25rem; margin-bottom: 0.5rem;">${dept.name}</h1>
          <p class="hero-subtitle" style="margin-bottom: 0; font-size: 1rem; color: var(--color-sky); max-width: 680px;">${dept.short_desc}</p>
        </div>
      </div>

      <section class="section-padding">
        <div class="container">
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2.5rem;">
            <div>
              <div class="glass-panel" style="padding: 2rem; margin-bottom: 2rem;">
                <h2 style="font-size: 1.35rem; font-weight: 700; color: var(--color-ink); margin-bottom: 1rem;">${isNe ? 'विभाग परिचय' : 'Department Overview'}</h2>
                <p style="line-height: var(--lh-relaxed); color: var(--text-main); font-size: 1rem; margin-bottom: 1.75rem;">${dept.overview}</p>

                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-royal); margin-bottom: 1rem;">${isNe ? 'मुख्य स्वास्थ्य सेवाहरू' : 'Key Medical & Surgical Services'}</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.85rem; margin-bottom: 1.75rem;">
                  ${services.map(s => `
                    <div style="display: flex; align-items: center; gap: 0.5rem; background: var(--color-mist); border: 1px solid rgba(23,97,194,0.15); color: var(--color-ink); padding: 0.75rem 1rem; border-radius: var(--radius-md); font-size: 0.9rem; font-weight: 600;">
                      <i class="fa-solid fa-circle-check" style="color: var(--color-royal);"></i>
                      <span>${s}</span>
                    </div>
                  `).join('')}
                </div>

                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-royal); margin-bottom: 1rem;">${isNe ? 'उपलब्ध प्रविधि तथा उपकरणहरू' : 'Advanced Medical Equipment'}</h3>
                <ul style="list-style: none; padding: 0; font-size: 0.95rem; line-height: 1.8;">
                  ${equipment.map(eq => `
                    <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.6rem;">
                      <i class="fa-solid fa-microscope" style="color: var(--color-royal);"></i> 
                      <span>${eq}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              ${faqs && faqs.length > 0 ? `
                <div class="glass-panel" style="padding: 2rem;">
                  <h2 style="font-size: 1.3rem; font-weight: 700; color: var(--color-ink); margin-bottom: 1.25rem;">${isNe ? 'सामान्य प्रश्नोत्तर' : 'Frequently Asked Questions'}</h2>
                  ${faqs.map(faq => `
                    <div style="margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
                      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-ink); margin-bottom: 0.35rem;">Q: ${faq.q}</h4>
                      <p style="font-size: 0.9rem; color: var(--text-muted); line-height: var(--lh-normal);">A: ${faq.a}</p>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>

            <div>
              <div class="glass-panel" style="padding: 1.75rem; position: sticky; top: 100px;">
                <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1.25rem; color: var(--color-ink);">${isNe ? 'विभागका विशेषज्ञ डाक्टरहरू' : 'Department Specialists'}</h3>
                
                ${dept.doctors && dept.doctors.length > 0 ? dept.doctors.map(doc => `
                  <a href="/doctor/${doc.slug}" data-link style="display: flex; gap: 0.85rem; margin-bottom: 1.25rem; align-items: center; text-decoration: none; color: inherit;">
                    <img src="${doc.photo}" alt="${doc.name}" style="width: 52px; height: 52px; border-radius: 50%; object-fit: cover; border: 2px solid var(--color-royal);" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80';">
                    <div>
                      <div style="font-weight: 700; font-size: 0.95rem; color: var(--color-ink);">${doc.name}</div>
                      <div style="font-size: 0.8rem; color: var(--text-muted);">${doc.qualification}</div>
                    </div>
                  </a>
                `).join('') : `<p class="text-muted">${isNe ? 'डाक्टर सूची अपडेट हुँदैछ।' : 'Specialist consultants available at OPD.'}</p>`}

                <div style="margin-top: 1.5rem;">
                  <a href="/contact" data-link class="btn btn-primary" style="width: 100%;">
                    <i class="fa-solid fa-paper-plane"></i> ${isNe ? 'विभागसँग सम्पर्क गर्नुहोस्' : 'Contact Department'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  } catch (err) {
    return `<div class="container section-padding text-center"><h2>Department Not Found</h2></div>`;
  }
}
