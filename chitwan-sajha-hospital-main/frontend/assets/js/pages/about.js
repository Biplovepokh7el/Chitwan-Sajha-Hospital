import { api } from '../api.js';
import { store } from '../state.js';

export async function renderAboutPage() {
  const isNe = store.getLang() === 'ne';

  return `
    <div class="page-header-banner" style="background: linear-gradient(135deg, #071933, #0F2C59); color: #FFF; padding: 3rem 0; text-align: center;">
      <div class="container">
        <h1 class="page-header-title" style="font-size: 2.25rem; font-weight: 800; color: #FFF; margin-bottom: 0.5rem; font-family: var(--heading-font);">
          ${isNe ? 'चितवन साझा अस्पतालको परिचय' : 'About Chitwan Sajha Hospital'}
        </h1>
        <p style="color: var(--accent-teal); font-weight: 600; font-size: 0.95rem;">
          ${isNe ? '२५ शैयाको सामान्य अस्पताल • भरतपुर-१०, हुलाक चोक' : '25-Bed General Hospital • Bharatpur-10, Hulak Chowk, Nepal'}
        </p>
      </div>
    </div>

    <section class="section-padding">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; margin-bottom: 4rem;">
          <div>
            <span class="section-tag">${isNe ? 'हाम्रो परिचय' : 'Institutional Profile'}</span>
            <h2 class="section-title">Ethical & Quality Healthcare in Chitwan</h2>
            <p style="line-height: 1.7; color: var(--text-main); font-size: 0.95rem; margin-bottom: 1rem;">
              Chitwan Sajha Hospital Pvt. Ltd. is a licensed 25-bed general healthcare institution established in Bharatpur-10, Hulak Chowk, Nepal. Our hospital was created to provide accessible, patient-centered medical, surgical, and emergency care to the residents of Bagmati and neighboring provinces.
            </p>
            <p style="line-height: 1.7; color: var(--text-muted); font-size: 0.9rem;">
              Equipped with modern 24/7 Digital X-Ray, 3D/4D Color Doppler Ultrasound, clean surgical operating theaters, pediatric immunization center, and a 24-hour emergency casualty unit.
            </p>
          </div>
          <div class="hero-image-wrapper" style="border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-color); box-shadow: var(--shadow-md);">
            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" alt="Hospital Building" loading="lazy">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
          <div class="glass-panel" style="padding: 1.75rem; text-align: center;">
            <div style="font-size: 2rem; color: var(--accent-teal); margin-bottom: 0.75rem;"><i class="fa-solid fa-bullseye"></i></div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.5rem; font-family: var(--heading-font);">Our Mission</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">Deliver ethical, accessible, and evidence-based medical and surgical treatment to all patients with utmost clinical integrity.</p>
          </div>

          <div class="glass-panel" style="padding: 1.75rem; text-align: center;">
            <div style="font-size: 2rem; color: var(--accent-blue); margin-bottom: 0.75rem;"><i class="fa-solid fa-eye"></i></div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.5rem; font-family: var(--heading-font);">Our Vision</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">To be Central Nepal's most trusted general community hospital recognized for patient safety and clinical excellence.</p>
          </div>

          <div class="glass-panel" style="padding: 1.75rem; text-align: center;">
            <div style="font-size: 2rem; color: var(--accent-teal); margin-bottom: 0.75rem;"><i class="fa-solid fa-hand-holding-medical"></i></div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.5rem; font-family: var(--heading-font);">Core Values</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6;">Compassion, clinical transparency, affordable pricing, safety standards, and continuous medical quality improvement.</p>
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
    <div class="page-header-banner" style="background: linear-gradient(135deg, #071933, #0F2C59); color: #FFF; padding: 3rem 0; text-align: center;">
      <div class="container">
        <h1 class="page-header-title" style="font-size: 2.25rem; font-weight: 800; color: #FFF; margin-bottom: 0.5rem; font-family: var(--heading-font);">
          ${isNe ? 'अध्यक्षको सन्देश' : "Chairman's Message"}
        </h1>
        <p style="color: var(--accent-teal); font-weight: 600; font-size: 0.95rem;">Chitwan Sajha Hospital Pvt. Ltd.</p>
      </div>
    </div>

    <section class="section-padding">
      <div class="container" style="max-width: 840px;">
        <div class="glass-panel" style="padding: 2.5rem; border-radius: var(--radius-md);">
          <div style="display: flex; gap: 2rem; align-items: center; margin-bottom: 2rem; flex-wrap: wrap;">
            <img src="${data.photo}" alt="${data.chairman_name}" style="width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 4px solid var(--accent-teal);" loading="lazy">
            <div>
              <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--primary-navy); font-family: var(--heading-font);">${data.chairman_name}</h2>
              <div style="color: var(--accent-teal); font-weight: 700; font-size: 0.95rem; margin-top: 0.2rem;">${data.title}</div>
              <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">Chitwan Sajha Hospital Pvt. Ltd.</div>
            </div>
          </div>

          <div style="line-height: 1.8; font-size: 0.98rem; color: var(--text-main); white-space: pre-line;">
            ${isNe ? data.message_ne : data.message_en}
          </div>

          <div style="margin-top: 2rem; pt: 1.5rem; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <strong style="color: var(--primary-navy);">${data.chairman_name}</strong>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${data.title}</div>
            </div>
            <a href="/board-of-directors" data-link class="btn btn-outline" style="font-size: 0.85rem;">
              <i class="fa-solid fa-users"></i> View Board of Directors
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
    <div class="page-header-banner" style="background: linear-gradient(135deg, #071933, #0F2C59); color: #FFF; padding: 3rem 0; text-align: center;">
      <div class="container">
        <h1 class="page-header-title" style="font-size: 2.25rem; font-weight: 800; color: #FFF; margin-bottom: 0.5rem; font-family: var(--heading-font);">
          ${isNe ? 'सञ्चालक समिति' : 'Board of Directors (BOD)'}
        </h1>
        <p style="color: var(--accent-teal); font-weight: 600; font-size: 0.95rem;">
          ${isNe ? 'चितवन साझा अस्पताल प्रालिको नेतृत्व तथा व्यवस्थापन' : 'Corporate Governance & Executive Leadership'}
        </p>
      </div>
    </div>

    <section class="section-padding">
      <div class="container">
        <div class="text-center" style="margin-bottom: 2.5rem;">
          <span class="section-tag">${isNe ? 'नेतृत्व' : 'Leadership'}</span>
          <h2 class="section-title">Board of Directors</h2>
          <p class="section-subtitle">Promoters, medical consultants, and executives guiding the strategic vision of Chitwan Sajha Hospital.</p>
        </div>

        <div class="card-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
          ${bodList.map(member => `
            <div class="glass-panel" style="padding: 1.5rem; display: flex; flex-direction: column; text-align: center; height: 100%;">
              <div style="position: relative; width: 110px; height: 110px; margin: 0 auto 1.25rem auto;">
                <img src="${member.photo}" alt="${member.name} - ${member.role}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 3px solid var(--border-color);" loading="lazy">
              </div>
              <span class="badge badge-success" style="align-self: center; margin-bottom: 0.5rem; font-size: 0.75rem;">${member.role}</span>
              <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.25rem; font-family: var(--heading-font);">${member.name}</h3>
              <div style="font-size: 0.8rem; font-weight: 600; color: var(--accent-teal); margin-bottom: 0.75rem;">${member.qualifications}</div>
              <p style="font-size: 0.825rem; color: var(--text-muted); line-height: 1.55; margin-top: auto;">${member.bio}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
