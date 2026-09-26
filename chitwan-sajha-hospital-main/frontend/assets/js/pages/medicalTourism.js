import { api } from '../api.js';

export async function renderMedicalTourismPage() {
  return `
    <div class="page-header-banner" style="background: linear-gradient(135deg, rgba(7,25,51,0.95), rgba(15,44,89,0.9)), url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80') center/cover;">
      <div class="container text-center">
        <h1 class="page-header-title">International Patient Services</h1>
        <p style="color: var(--accent-teal); font-weight: 600; max-width: 600px; margin: 0 auto; font-size: 0.95rem;">
          Tertiary Medical Treatment & Facilitation for International Patients in Bharatpur, Nepal.
        </p>
      </div>
    </div>

    <section class="section-padding">
      <div class="container">
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin-bottom: 3.5rem;">
          <div class="glass-panel text-center" style="padding: 1.5rem;">
            <i class="fa-solid fa-plane-arrival fa-2x" style="color: var(--accent-teal); margin-bottom: 0.75rem;"></i>
            <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.35rem;">Airport Facilitation</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Reception from Tribhuvan International Airport (Kathmandu) or Bharatpur Airport.</p>
          </div>

          <div class="glass-panel text-center" style="padding: 1.5rem;">
            <i class="fa-solid fa-passport fa-2x" style="color: var(--accent-blue); margin-bottom: 0.75rem;"></i>
            <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.35rem;">Medical Visa Support</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Assistance letters for medical visa issuance and extensions.</p>
          </div>

          <div class="glass-panel text-center" style="padding: 1.5rem;">
            <i class="fa-solid fa-language fa-2x" style="color: var(--accent-teal); margin-bottom: 0.75rem;"></i>
            <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.35rem;">Language Interpreters</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Dedicated patient relations coordinators for international visitors.</p>
          </div>

          <div class="glass-panel text-center" style="padding: 1.5rem;">
            <i class="fa-solid fa-hotel fa-2x" style="color: var(--accent-blue); margin-bottom: 0.75rem;"></i>
            <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.35rem;">Accommodation</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Hotel and recovery resort bookings for patient companions.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: center;">
          <div>
            <span class="section-tag">Patient Helpdesk</span>
            <h2 class="section-title">International Patient Inquiry</h2>
            <p style="line-height: 1.7; color: var(--text-main); font-size: 0.95rem; margin-bottom: 1.25rem;">
              Our International Patient Service Desk evaluates medical reports and provides cost estimates within 24 hours for joint replacement, cardiac procedures, and neurosurgery.
            </p>
            <div style="background: var(--bg-card-hover); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <h4 style="font-weight: 700; color: var(--primary-navy); margin-bottom: 0.35rem; font-size: 0.95rem;"><i class="fa-solid fa-envelope-open-text" style="color: var(--accent-teal);"></i> Direct Helpdesk:</h4>
              <p style="font-size: 0.85rem; margin-bottom: 0.2rem;">Email: <strong>international@chitwansajha.org</strong></p>
              <p style="font-size: 0.85rem;">Telephone: <strong>+977-9855011000</strong></p>
            </div>
          </div>

          <div class="glass-panel" style="padding: 2rem;">
            <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 1.25rem;">Submit Treatment Inquiry</h3>
            <form id="international-inquiry-form">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input type="text" id="intl-name" class="form-control" required placeholder="Full Name">
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;">
                <div class="form-group">
                  <label class="form-label">Email Address *</label>
                  <input type="email" id="intl-email" class="form-control" required placeholder="email@domain.com">
                </div>
                <div class="form-group">
                  <label class="form-label">Country *</label>
                  <input type="text" id="intl-country" class="form-control" required placeholder="Country of residence">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Required Specialty</label>
                <select id="intl-treatment" class="form-control">
                  <option value="Total Knee / Hip Replacement">Total Knee / Hip Replacement</option>
                  <option value="Coronary Angioplasty / CABG">Coronary Angioplasty / CABG</option>
                  <option value="Micro-Neurosurgery / Spine Surgery">Micro-Neurosurgery / Spine Surgery</option>
                  <option value="Executive Health Checkup">Executive Health Checkup</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Medical History / Query</label>
                <textarea id="intl-message" class="form-control" rows="3" placeholder="Describe symptoms or diagnosis..."></textarea>
              </div>
              <button type="submit" class="btn btn-primary" style="width: 100%;"><i class="fa-solid fa-paper-plane"></i> Submit International Inquiry</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}
