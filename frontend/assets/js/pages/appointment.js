import { api } from '../api.js';
import { store } from '../state.js';

export async function renderAppointmentPage() {
  const [docsRes, deptsRes] = await Promise.all([
    api.getDoctors(),
    api.getDepartments()
  ]);

  const doctors = docsRes.doctors || [];
  const departments = deptsRes.departments || [];
  const currentUser = store.getState().user;
  const isNe = store.getLang() === 'ne';

  const urlParams = new URLSearchParams(window.location.search);
  const selectedDocId = urlParams.get('doctor');
  const selectedDeptId = urlParams.get('dept');

  return `
    <div class="page-header-banner" style="background: linear-gradient(135deg, #071933, #0F2C59); color: #FFF; padding: 3rem 0; text-align: center;">
      <div class="container">
        <h1 class="page-header-title" style="font-size: 2.25rem; font-weight: 800; color: #FFF; margin-bottom: 0.5rem; font-family: var(--heading-font);">
          ${isNe ? 'OPD अपोइन्टमेन्ट दर्ता' : 'OPD Appointment Booking'}
        </h1>
        <p style="color: var(--accent-teal); font-weight: 600; font-size: 0.95rem;">Chitwan Sajha Hospital • Bharatpur-10, Hulak Chowk</p>
      </div>
    </div>

    <section class="section-padding">
      <div class="container" style="max-width: 760px;">
        <div id="booking-wizard-card" class="glass-panel" style="padding: 2.25rem; border-radius: var(--radius-md);">
          <form id="appointment-booking-form">
            <!-- Spam Protection Honeypot -->
            <input type="text" id="apt-honeypot" style="display:none;" tabindex="-1" autocomplete="off">

            <div style="margin-bottom: 1.5rem;">
              <h2 style="font-size: 1.15rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 1rem; font-family: var(--heading-font);">
                1. ${isNe ? 'बिरामी विवरण' : 'Patient Information'}
              </h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label for="apt-name" class="form-label">${isNe ? 'बिरामीको पूरा नाम *' : 'Patient Full Name *'}</label>
                  <input type="text" id="apt-name" class="form-control" value="${currentUser ? currentUser.name : ''}" required placeholder="Full Name">
                </div>
                <div class="form-group">
                  <label for="apt-phone" class="form-label">${isNe ? 'सम्पर्क मोबाइल नं. *' : 'Mobile Phone Number *'}</label>
                  <input type="tel" id="apt-phone" class="form-control" value="${currentUser ? currentUser.phone || '' : ''}" required placeholder="+977 98XXXXXXXX">
                </div>
              </div>
              <div class="form-group" style="margin-top: 1rem;">
                <label for="apt-email" class="form-label">${isNe ? 'इमेल (वैकल्पिक)' : 'Email Address'}</label>
                <input type="email" id="apt-email" class="form-control" value="${currentUser ? currentUser.email : ''}" placeholder="patient@example.com">
              </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <h2 style="font-size: 1.15rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 1rem; font-family: var(--heading-font);">
                2. ${isNe ? 'विभाग तथा चिकित्सक छनोट' : 'Department & Specialist Selection'}
              </h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label for="apt-dept" class="form-label">${isNe ? 'चिकित्सा विभाग *' : 'Department *'}</label>
                  <select id="apt-dept" class="form-control" required>
                    <option value="">Choose Department...</option>
                    ${departments.map(d => `<option value="${d.id}" ${selectedDeptId == d.id ? 'selected' : ''}>${d.name}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group">
                  <label for="apt-doctor" class="form-label">${isNe ? 'विशेषज्ञ डाक्टर *' : 'Specialist Doctor *'}</label>
                  <select id="apt-doctor" class="form-control" required>
                    <option value="">Choose Doctor...</option>
                    ${doctors.map(doc => `<option value="${doc.id}" data-name="${doc.name}" data-dept="${doc.department_id}" ${selectedDocId == doc.id ? 'selected' : ''}>${doc.name} (${doc.department_name})</option>`).join('')}
                  </select>
                </div>
              </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <h2 style="font-size: 1.15rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 1rem; font-family: var(--heading-font);">
                3. ${isNe ? 'मिति तथा समय' : 'Preferred Date & OPD Time'}
              </h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label for="apt-date" class="form-label">${isNe ? 'अपोइन्टमेन्ट मिति *' : 'Appointment Date *'}</label>
                  <input type="date" id="apt-date" class="form-control" min="${new Date().toISOString().split('T')[0]}" required>
                </div>
                <div class="form-group">
                  <label for="apt-time" class="form-label">${isNe ? 'OPD समय *' : 'Time Slot *'}</label>
                  <select id="apt-time" class="form-control" required>
                    <option value="">Select Time Slot...</option>
                    <option value="Morning (09:00 AM - 11:30 AM)">Morning (09:00 AM - 11:30 AM)</option>
                    <option value="Afternoon (01:00 PM - 03:30 PM)">Afternoon (01:00 PM - 03:30 PM)</option>
                    <option value="Evening (04:00 PM - 06:30 PM)">Evening (04:00 PM - 06:30 PM)</option>
                  </select>
                </div>
              </div>
              <div class="form-group" style="margin-top: 1rem;">
                <label for="apt-reason" class="form-label">${isNe ? 'स्वास्थ्य समस्या / लक्षण' : 'Reason for Visit / Symptoms'}</label>
                <input type="text" id="apt-reason" class="form-control" placeholder="e.g. Fever, routine follow-up, joint pain">
              </div>
            </div>

            <div style="background: rgba(0, 132, 117, 0.08); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid rgba(0, 132, 117, 0.2); margin-bottom: 1.5rem; font-size: 0.8rem; color: var(--text-muted);">
              <i class="fa-solid fa-lock" style="color: var(--accent-teal);"></i> <strong>Data Protection Disclosure:</strong> Your personal and contact details are stored securely solely for scheduling OPD appointments at Chitwan Sajha Hospital and will never be shared with third parties.
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.85rem; font-size: 1rem;">
              <i class="fa-solid fa-paper-plane"></i> ${isNe ? 'अपोइन्टमेन्ट पुष्टि गर्नुहोस्' : 'Confirm & Generate OPD Pass'}
            </button>
          </form>
        </div>
      </div>
    </section>
  `;
}
