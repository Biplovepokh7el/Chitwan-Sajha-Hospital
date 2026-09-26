import { api } from '../api.js';

export async function renderDepartments() {
  const res = await api.getDepartments();
  const departments = res.departments || [];

  return `
    <div class="page-header-banner">
      <div class="container">
        <h1 class="page-header-title">Clinical Departments</h1>
        <div class="breadcrumbs">
          <a href="/" data-link>Home</a> / <span>Departments</span>
        </div>
      </div>
    </div>

    <section class="section-padding">
      <div class="container">
        <div class="card-grid">
          ${departments.map(dept => `
            <a href="/department/${dept.slug}" data-link class="dept-card" style="display: flex; flex-direction: column; height: 100%;">
              <div style="position: relative; overflow: hidden; border-radius: var(--radius-sm); margin-bottom: 1rem; height: 180px;">
                <img src="${dept.image}" alt="${dept.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80';">
                <div style="position: absolute; top: 12px; left: 12px; width: 40px; height: 40px; background: var(--primary-navy); color: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; box-shadow: 0 4px 6px rgba(0,0,0,0.15);">
                  <i class="fa-solid ${dept.icon || 'fa-stethoscope'}"></i>
                </div>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--primary-navy);">${dept.name}</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">${dept.short_desc}</p>
              <div class="btn btn-outline" style="width: 100%; margin-top: auto; font-size: 0.8rem; text-align: center;">
                View Department & Doctors <i class="fa-solid fa-arrow-right" style="font-size: 0.75rem;"></i>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export async function renderDepartmentDetail(params) {
  try {
    const res = await api.getDepartmentBySlug(params.slug);
    const dept = res.department;
    const services = dept.services || (dept.services_json ? JSON.parse(dept.services_json) : []);
    const equipment = dept.equipment || (dept.equipment_json ? JSON.parse(dept.equipment_json) : []);
    const faqs = dept.faqs || (dept.faqs_json ? JSON.parse(dept.faqs_json) : []);

    return `
      <div class="page-header-banner" style="background: linear-gradient(135deg, rgba(7,25,51,0.92), rgba(15,44,89,0.85)), url('${dept.image}') center/cover;">
        <div class="container">
          <h1 class="page-header-title">${dept.name}</h1>
          <p style="color: var(--accent-teal); font-weight: 600; max-width: 600px; margin: 0 auto; font-size: 0.95rem;">${dept.short_desc}</p>
        </div>
      </div>

      <section class="section-padding">
        <div class="container">
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2.5rem;">
            <div>
              <div class="glass-panel" style="padding: 1.75rem; margin-bottom: 2rem;">
                <h2 style="font-size: 1.3rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.85rem;">Department Overview</h2>
                <p style="line-height: 1.7; color: var(--text-main); font-size: 0.95rem; margin-bottom: 1.5rem;">${dept.overview}</p>

                <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--accent-blue); margin-bottom: 0.75rem;">Key Services & Procedures</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; margin-bottom: 1.5rem;">
                  ${services.map(s => `
                    <div style="display: flex; align-items: center; gap: 0.4rem; background: var(--bg-card-hover); padding: 0.6rem 0.85rem; border-radius: var(--radius-sm); font-size: 0.85rem;">
                      <i class="fa-solid fa-circle-check" style="color: var(--accent-teal);"></i>
                      <span>${s}</span>
                    </div>
                  `).join('')}
                </div>

                <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--accent-blue); margin-bottom: 0.75rem;">Advanced Medical Equipment</h3>
                <ul style="list-style: none; font-size: 0.875rem; line-height: 1.7;">
                  ${equipment.map(eq => `
                    <li style="margin-bottom: 0.35rem;"><i class="fa-solid fa-microscope" style="color: var(--accent-teal);"></i> ${eq}</li>
                  `).join('')}
                </ul>
              </div>

              ${faqs && faqs.length > 0 ? `
                <div class="glass-panel" style="padding: 1.75rem;">
                  <h2 style="font-size: 1.2rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.85rem;">Frequently Asked Questions</h2>
                  ${faqs.map(faq => `
                    <div style="margin-bottom: 1rem;">
                      <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.25rem;">Q: ${faq.q}</h4>
                      <p style="font-size: 0.85rem; color: var(--text-muted);">A: ${faq.a}</p>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>

            <div>
              <div class="glass-panel" style="padding: 1.5rem; position: sticky; top: 90px;">
                <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; color: var(--primary-navy);">Department Specialists</h3>
                
                ${dept.doctors && dept.doctors.length > 0 ? dept.doctors.map(doc => `
                  <a href="/doctor/${doc.slug}" data-link style="display: flex; gap: 0.75rem; margin-bottom: 1rem; align-items: center; text-decoration: none; color: inherit;">
                    <img src="${doc.photo}" alt="${doc.name}" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80';">
                    <div>
                      <div style="font-weight: 600; font-size: 0.9rem; color: var(--primary-navy);">${doc.name}</div>
                      <div style="font-size: 0.75rem; color: var(--text-muted);">${doc.specialization}</div>
                    </div>
                  </a>
                `).join('') : '<p class="text-muted">No doctors listed currently.</p>'}

                <a href="/appointment?dept=${dept.id}" data-link class="btn btn-primary" style="width: 100%; margin-top: 0.75rem; font-size: 0.85rem;">
                  <i class="fa-solid fa-calendar-check"></i> Book OPD Appointment
                </a>
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
