import { api } from '../api.js';
import { store } from '../state.js';

export async function renderAboutPage() {
  const isNe = store.getLang() === 'ne';

  return `
    <div class="hero-section" style="padding: 3rem 0;">
      <div class="container">
        <div class="breadcrumbs" style="color: var(--color-sky); margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem;">
          <a href="/" data-link style="color: var(--color-sky);">${store.t('nav_home')}</a> / <span style="color: var(--text-inverse);">${store.t('nav_about')}</span>
        </div>
        <h1 class="hero-title" style="font-size: 2.25rem; margin-bottom: 0.5rem;">
          ${isNe ? 'चितवन साझा अस्पतालको परिचय' : 'About Chitwan Sajha Hospital'}
        </h1>
        <p class="hero-subtitle" style="margin-bottom: 0; font-size: 1rem; color: var(--color-sky);">
          ${isNe ? 'भरतपुर-१०, हुलाक चोक स्थित २५ शैयाको सामान्य अस्पताल' : '25-Bed General Hospital at Bharatpur-10, Hulak Chowk, Chitwan, Nepal'}
        </p>
      </div>
    </div>

    <section class="section-padding">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; margin-bottom: 4rem;">
          <div>
            <span class="section-tag">${isNe ? 'हाम्रो परिचय' : 'Institutional Profile'}</span>
            <h2 class="section-title">${isNe ? 'गुणस्तरीय तथा सर्वसुलभ स्वास्थ्य सेवा' : 'Ethical & Quality Healthcare in Chitwan'}</h2>
            <p style="line-height: var(--lh-relaxed); color: var(--text-main); font-size: 1rem; margin-bottom: 1.25rem;">
              Chitwan Sajha Hospital Pvt. Ltd. is a registered general healthcare institution located at Bharatpur-10, Hulak Chowk, Nepal. Founded to serve the growing population of Chitwan and surrounding districts in Bagmati and Gandaki provinces, our hospital delivers accessible, patient-centered medical, surgical, and emergency care.
            </p>
            <p style="line-height: var(--lh-relaxed); color: var(--text-muted); font-size: 0.95rem;">
              Equipped with modern 24/7 Digital X-Ray, 3D/4D Color Doppler Ultrasound, clean modular surgical operating suites, pediatric vaccination center, and a 24-hour emergency casualty unit.
            </p>
          </div>
          <div class="open-ring-wrapper">
            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" alt="Hospital Building" loading="lazy" style="width: 100%; height: 350px; object-fit: cover;">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.75rem;">
          <div class="glass-panel" style="padding: 2rem; text-align: center;">
            <div style="font-size: 2.25rem; color: var(--color-royal); margin-bottom: 1rem;"><i class="fa-solid fa-bullseye"></i></div>
            <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-ink); margin-bottom: 0.5rem;">Our Mission</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: var(--lh-normal);">Deliver ethical, accessible, and evidence-based medical and surgical treatment to all patients with utmost clinical integrity.</p>
          </div>

          <div class="glass-panel" style="padding: 2rem; text-align: center;">
            <div style="font-size: 2.25rem; color: var(--color-sky); margin-bottom: 1rem;"><i class="fa-solid fa-eye"></i></div>
            <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-ink); margin-bottom: 0.5rem;">Our Vision</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: var(--lh-normal);">To be Central Nepal's most trusted general community hospital recognized for patient safety and clinical excellence.</p>
          </div>

          <div class="glass-panel" style="padding: 2rem; text-align: center;">
            <div style="font-size: 2.25rem; color: var(--color-royal); margin-bottom: 1rem;"><i class="fa-solid fa-hand-holding-medical"></i></div>
            <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-ink); margin-bottom: 0.5rem;">Core Values</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: var(--lh-normal);">Compassion, clinical transparency, affordable pricing, safety standards, and continuous medical quality improvement.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

export async function renderChairmanMessage() {
  const res = await api.getChairmanMessage();
  const data = res.data;
  const isNe = store.getLang() === 'ne';

  return `
    <div class="hero-section" style="padding: 3rem 0;">
      <div class="container">
        <div class="breadcrumbs" style="color: var(--color-sky); margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem;">
          <a href="/" data-link style="color: var(--color-sky);">${store.t('nav_home')}</a> / <a href="/about" data-link style="color: var(--color-sky);">${store.t('nav_about')}</a> / <span style="color: var(--text-inverse);">${store.t('nav_chairman_msg')}</span>
        </div>
        <h1 class="hero-title" style="font-size: 2.25rem; margin-bottom: 0.5rem;">
          ${isNe ? 'अध्यक्षको मन्तव्य' : "Chairman's Message"}
        </h1>
        <p class="hero-subtitle" style="margin-bottom: 0; font-size: 1rem; color: var(--color-sky);">
          Dr. Nawaraj Lamichhane • Chairman, Chitwan Sajha Hospital Pvt. Ltd.
        </p>
      </div>
    </div>

    <section class="section-padding">
      <div class="container" style="max-width: 900px;">
        <div class="glass-panel" style="padding: 2.5rem; border-radius: var(--radius-lg);">
          <div style="display: flex; gap: 2rem; align-items: center; margin-bottom: 2rem; flex-wrap: wrap;">
            <img src="${data.photo}" alt="${data.chairman_name}" style="width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 4px solid var(--color-royal);" loading="lazy">
            <div>
              <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--color-ink);">${data.chairman_name}</h2>
              <div style="color: var(--color-royal); font-weight: 700; font-size: 1rem; margin-top: 0.25rem;">${data.title}</div>
              <div style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.25rem;">Chitwan Sajha Hospital Pvt. Ltd.</div>
            </div>
          </div>

          <div style="line-height: var(--lh-relaxed); font-size: 1.05rem; color: var(--text-main); white-space: pre-line;">
            ${isNe ? data.message_ne : data.message_en}
          </div>

          <div style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <strong style="color: var(--color-ink); font-size: 1.05rem;">${data.chairman_name}</strong>
              <div style="font-size: 0.85rem; color: var(--text-muted);">${data.title}</div>
            </div>
            <a href="/board-of-directors" data-link class="btn btn-outline" style="font-size: 0.9rem;">
              <i class="fa-solid fa-users"></i> ${store.t('view_bod_btn')}
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export async function renderBoardOfDirectors() {
  const res = await api.getBoardOfDirectors();
  const bodList = res.bod || [];
  const isNe = store.getLang() === 'ne';

  return `
    <div class="hero-section" style="padding: 3rem 0;">
      <div class="container">
        <div class="breadcrumbs" style="color: var(--color-sky); margin-bottom: 0.5rem; font-weight: 600; font-size: 0.9rem;">
          <a href="/" data-link style="color: var(--color-sky);">${store.t('nav_home')}</a> / <a href="/about" data-link style="color: var(--color-sky);">${store.t('nav_about')}</a> / <span style="color: var(--text-inverse);">${store.t('nav_bod')}</span>
        </div>
        <h1 class="hero-title" style="font-size: 2.25rem; margin-bottom: 0.5rem;">
          ${isNe ? 'सञ्चालक समिति' : 'Board of Directors (BOD)'}
        </h1>
        <p class="hero-subtitle" style="margin-bottom: 0; font-size: 1rem; color: var(--color-sky);">
          ${isNe ? 'चितवन साझा अस्पताल प्रालिको नेतृत्व तथा व्यवस्थापन' : 'Executive Leadership & Strategic Governance'}
        </p>
      </div>
    </div>

    <section class="section-padding">
      <div class="container">
        <div class="text-center" style="margin-bottom: 3rem;">
          <span class="section-tag">${isNe ? 'नेतृत्व' : 'Leadership'}</span>
          <h2 class="section-title">${isNe ? 'सञ्चालक समितिका सदस्यहरू' : 'Board of Directors'}</h2>
          <p class="section-subtitle">Medical consultants and corporate executives guiding Chitwan Sajha Hospital.</p>
        </div>

        <div class="card-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.75rem;">
          ${bodList.map(member => `
            <div class="glass-panel" style="padding: 2rem 1.5rem; display: flex; flex-direction: column; text-align: center; height: 100%;">
              <div style="width: 120px; height: 120px; margin: 0 auto 1.25rem auto;">
                <img src="${member.photo}" alt="${member.name} - ${member.role}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 4px solid var(--color-royal);" loading="lazy">
              </div>
              <span class="badge badge-brand" style="align-self: center; margin-bottom: 0.65rem; font-size: 0.8rem;">${member.role}</span>
              <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--color-ink); margin-bottom: 0.25rem;">${member.name}</h3>
              <div style="font-size: 0.85rem; font-weight: 600; color: var(--color-royal); margin-bottom: 0.85rem;">${member.qualifications}</div>
              <p style="font-size: 0.9rem; color: var(--text-muted); line-height: var(--lh-normal); margin-top: auto;">${member.bio}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
