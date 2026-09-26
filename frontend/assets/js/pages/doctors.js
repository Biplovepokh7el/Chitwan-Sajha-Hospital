import { api } from '../api.js';

export async function renderDoctors() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialSearch = urlParams.get('search') || '';
  const initialDept = urlParams.get('department') || '';

  const [docsRes, deptsRes] = await Promise.all([
    api.getDoctors({ search: initialSearch, department: initialDept }),
    api.getDepartments()
  ]);

  const doctors = docsRes.doctors || [];
  const departments = deptsRes.departments || [];

  return `
    <div class="page-header-banner">
      <div class="container">
        <h1 class="page-header-title" style="color: #FFFFFF !important; text-shadow: 0 2px 8px rgba(0,0,0,0.5);">Find a Medical Specialist</h1>
        <div class="breadcrumbs">
          <a href="/" data-link style="color: #2DD4BF !important; font-weight: 700;">Home</a> / <span style="color: #FFFFFF !important; font-weight: 700;">Doctors Directory</span>
        </div>
      </div>
    </div>

    <section class="section-padding" style="min-height: 65vh; flex-grow: 1;">
      <div class="container">
        <!-- Filter Controls -->
        <div class="glass-panel" style="padding: 1.25rem; margin-bottom: 2rem;">
          <div style="display: grid; grid-template-columns: 2fr 2fr 1fr; gap: 0.85rem; align-items: center;">
            <div>
              <label class="form-label" style="margin-bottom: 0.25rem;">Search Doctor Name or Specialty</label>
              <input type="text" id="doc-search-input" class="form-control" value="${initialSearch}" placeholder="Type doctor name, specialty, or qualification...">
            </div>
            <div>
              <label class="form-label" style="margin-bottom: 0.25rem;">Filter by Department</label>
              <select id="doc-dept-filter" class="form-control">
                <option value="">All Departments</option>
                ${departments.map(d => `<option value="${d.id}" ${initialDept == d.id ? 'selected' : ''}>${d.name}</option>`).join('')}
              </select>
            </div>
            <div style="padding-top: 1.25rem;">
              <button id="doc-filter-btn" class="btn btn-primary" style="width: 100%;"><i class="fa-solid fa-filter"></i> Apply Filter</button>
            </div>
          </div>
        </div>

        <div id="doctors-list-container" class="card-grid" style="min-height: 520px;">
          ${renderDoctorCardsList(doctors)}
        </div>
      </div>
    </section>
  `;
}

export function renderDoctorCardsList(doctors) {
  if (!doctors || doctors.length === 0) {
    return `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; min-height: 520px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--bg-card); border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
        <i class="fa-solid fa-user-slash fa-3x" style="color: var(--text-muted); margin-bottom: 1.25rem;"></i>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.5rem;">No Medical Specialists Found</h3>
        <p class="text-muted" style="font-size: 0.95rem; margin: 0; max-width: 480px; line-height: 1.6;">
          No doctors match your search query or selected department. Please try typing another doctor name or selecting 'All Departments'.
        </p>
      </div>
    `;
  }

  return doctors.map(doc => {
    return `
      <div class="doctor-card" style="display: flex; flex-direction: column; border-radius: var(--radius-sm); overflow: hidden; background: var(--bg-card); border: 1px solid var(--border-color);">
        <a href="/doctor/${doc.slug}" data-link class="doctor-img-wrapper" style="position: relative; overflow: hidden; height: 260px;">
          <img src="${doc.photo}" alt="${doc.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80';">
        </a>
        <div class="doctor-card-body" style="padding: 1.15rem; display: flex; flex-direction: column; flex-grow: 1;">
          <div class="doctor-dept" style="font-size: 0.75rem; font-weight: 700; color: var(--accent-teal); text-transform: uppercase; margin-bottom: 0.25rem;">${doc.department_name}</div>
          <a href="/doctor/${doc.slug}" data-link class="doctor-name" style="font-size: 1.05rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.25rem; text-decoration: none;">${doc.name}</a>
          <div class="doctor-specialty" style="font-size: 0.825rem; color: var(--text-main); margin-bottom: 0.5rem; font-weight: 500;">${doc.qualification}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.4rem;">
            <i class="fa-solid fa-briefcase" style="color: var(--accent-teal);"></i> ${doc.experience}
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.85rem;">
            <i class="fa-solid fa-language"></i> ${doc.languages || 'Nepali, English'}
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.4rem; margin-top: auto;">
            <a href="/appointment?doc=${doc.id}" data-link class="btn btn-primary" style="font-size: 0.825rem; padding: 0.5rem; width: 100%; text-align: center;">
              <i class="fa-solid fa-calendar-check"></i> Book OPD Appointment
            </a>
            <a href="/doctor/${doc.slug}" data-link class="btn btn-outline" style="font-size: 0.8rem; padding: 0.4rem 0.6rem; width: 100%; text-align: center; border-radius: var(--radius-sm); text-decoration: none;">
              View Profile & Schedule
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

export async function renderDoctorDetail(params) {
  try {
    const res = await api.getDoctorBySlug(params.slug);
    const doc = res.doctor;
    const availability = doc.availability || {};

    return `
      <div class="page-header-banner">
        <div class="container">
          <h1 class="page-header-title" style="color: #FFFFFF !important; text-shadow: 0 2px 8px rgba(0,0,0,0.5);">${doc.name}</h1>
          <p style="color: #00ffcc !important; font-weight: 600; font-size: 1rem; text-shadow: 0 1px 3px rgba(0,0,0,0.4);">${doc.specialization} • ${doc.department_name}</p>
        </div>
      </div>

      <section class="section-padding">
        <div class="container">
          <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2.5rem;">
            <div>
              <div class="doctor-card" style="margin-bottom: 1.5rem; overflow: hidden; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <img src="${doc.photo}" alt="${doc.name}" style="width: 100%; height: 340px; object-fit: cover;" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80';">
                <div style="padding: 1.25rem;">
                  <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.35rem; color: var(--primary-navy);">OPD Consultation Fee</h3>
                  <div style="font-size: 1.8rem; font-weight: 700; color: var(--accent-teal); margin-bottom: 1rem;">NPR ${doc.price_nrs}</div>
                  
                  <div style="display: flex; flex-direction: column; gap: 0.65rem;">
                    <a href="/appointment?doc=${doc.id}" data-link class="btn btn-primary" style="width: 100%; text-align: center;">
                      <i class="fa-solid fa-calendar-check"></i> Book OPD Slot
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="glass-panel" style="padding: 1.75rem; margin-bottom: 1.75rem;">
                <h2 style="font-size: 1.3rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.85rem;">Biography & Background</h2>
                <p style="line-height: 1.7; color: var(--text-main); font-size: 0.95rem; margin-bottom: 1.25rem;">${doc.bio || 'Senior medical specialist at Chitwan Sajha Hospital.'}</p>
                
                <h3 style="font-size: 1rem; font-weight: 700; color: var(--accent-blue); margin-bottom: 0.35rem;">Qualifications & Fellowships</h3>
                <p style="margin-bottom: 1rem; font-size: 0.9rem;">${doc.qualification}</p>

                <h3 style="font-size: 1rem; font-weight: 700; color: var(--accent-blue); margin-bottom: 0.35rem;">Awards & Honors</h3>
                <p style="margin-bottom: 1rem; font-size: 0.9rem;">${doc.awards || 'N/A'}</p>

                <h3 style="font-size: 1rem; font-weight: 700; color: var(--accent-blue); margin-bottom: 0.35rem;">Research & Publications</h3>
                <p style="font-size: 0.9rem;">${doc.research || 'N/A'}</p>
              </div>

              <div class="glass-panel" style="padding: 1.75rem;">
                <h2 style="font-size: 1.3rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.85rem;">OPD Weekly Schedule</h2>
                <div class="table-responsive">
                  <table class="custom-table">
                    <thead>
                      <tr>
                        <th>Day</th>
                        <th>Available Timings</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${Object.entries(availability).map(([day, slots]) => `
                        <tr>
                          <td><strong>${day}</strong></td>
                          <td>${Array.isArray(slots) ? slots.join(', ') : 'Not Available'}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
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
