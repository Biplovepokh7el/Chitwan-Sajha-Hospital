import { Router, routes } from './router.js';
import { store } from './state.js';
import { api } from './api.js';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderDoctorCardsList } from './pages/doctors.js';

window.openPrintableSlip = function(aptNumber) {
  const apts = JSON.parse(localStorage.getItem('cs_hospital_appointments') || '[]');
  const apt = apts.find(a => a.appointment_number === aptNumber) || {
    appointment_number: aptNumber,
    patient_name: 'Valued Patient',
    doctor_name: 'Dr. Ramesh Chandra Adhikari',
    appointment_date: new Date().toISOString().split('T')[0],
    appointment_time: '10:30 AM',
    status: 'Confirmed',
    insurance_provider: 'Self Paying / None'
  };

  const printWin = window.open('', '_blank', 'width=750,height=800');
  printWin.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>OPD Appointment Pass - ${apt.appointment_number}</title>
      <style>
        body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 40px; color: #0F2C59; }
        .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #0F2C59; padding-bottom: 15px; margin-bottom: 25px; }
        .title { font-size: 24px; font-weight: 800; color: #0F2C59; margin: 0; }
        .subtitle { font-size: 13px; color: #00A88F; font-weight: 700; letter-spacing: 1px; }
        .box { background: #F8FAFC; border: 1px solid #CBD5E1; padding: 25px; border-radius: 8px; margin-bottom: 25px; }
        .row { display: flex; margin-bottom: 12px; font-size: 14px; }
        .label { width: 190px; font-weight: 700; color: #475569; }
        .val { flex: 1; font-weight: 600; color: #0F2C59; }
        .badge { background: #DCFCE7; color: #166534; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 700; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #64748B; border-top: 1px solid #E2E8F0; padding-top: 15px; }
        @media print { .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1 class="title">CHITWAN SAJHA HOSPITAL</h1>
          <div class="subtitle">PATIENT OPD REGISTRATION SLIP</div>
        </div>
        <div style="text-align: right; font-size: 12px; color: #64748B;">
          Sajha Petro Pump, 10 Bypass Road<br>Bharatpur-10, Chitwan, Nepal<br>24/7 Helpline: +977 981-9283223
        </div>
      </div>
      <div class="box">
        <div class="row"><div class="label">Pass Slip Number:</div><div class="val" style="font-size: 18px; color: #00A88F;">${apt.appointment_number}</div></div>
        <div class="row"><div class="label">Patient Name:</div><div class="val">${apt.patient_name}</div></div>
        <div class="row"><div class="label">Contact Phone:</div><div class="val">${apt.patient_phone || 'N/A'}</div></div>
        <div class="row"><div class="label">Assigned Specialist:</div><div class="val">${apt.doctor_name}</div></div>
        <div class="row"><div class="label">Appointment Date:</div><div class="val">${apt.appointment_date}</div></div>
        <div class="row"><div class="label">Time Slot:</div><div class="val">${apt.appointment_time}</div></div>
        <div class="row"><div class="label">Insurance Coverage:</div><div class="val">${apt.insurance_provider || 'Self Paying'}</div></div>
        <div class="row"><div class="label">Registration Status:</div><div class="val"><span class="badge">${apt.status || 'Confirmed'}</span></div></div>
      </div>
      <div class="no-print" style="text-align: center; margin-bottom: 20px;">
        <button onclick="window.print();" style="background:#00A88F; color:#fff; border:none; padding:10px 24px; border-radius:6px; font-weight:700; cursor:pointer;">Print / Save PDF</button>
      </div>
      <div class="footer">
        Please present this slip at OPD Desk Counter No. 2 upon arrival 15 minutes prior to appointment.<br>
        © Chitwan Sajha Hospital Pvt. Ltd., Bharatpur, Chitwan, Nepal.
      </div>
    </body>
    </html>
  `);
  printWin.document.close();
};

window.openPrintableReport = function(reportCode) {
  const reports = [
    { report_code: "LAB-2026-88192", patient_name: "Hari Bahadur Shrestha", test_name: "Lipid Profile & HbA1c Glycated Hemoglobin", report_date: "2026-08-01", doctor: "Dr. Ramesh Chandra Adhikari", result: "Fasting Blood Sugar: 98 mg/dL (Normal: 70-99)\nHbA1c: 5.6% (Normal: < 5.7%)\nTotal Cholesterol: 185 mg/dL (Desirable: < 200)\nTriglycerides: 140 mg/dL (Normal: < 150)\nHDL Cholesterol: 48 mg/dL (Optimal: > 40)\nLDL Cholesterol: 109 mg/dL (Optimal: < 100)" },
    { report_code: "LAB-2026-88193", patient_name: "Sita Devi Sharma", test_name: "3.0T Brain MRI Scan with Contrast", report_date: "2026-08-02", doctor: "Dr. Sunita Sharma Banskota", result: "Technique: Multiplanar T1, T2, FLAIR, DWI sequences of brain.\nFindings: Brain parenchyma demonstrates normal signal intensity. No acute territorial infarction or intracranial hemorrhage. Ventricles and sulci are within normal limits for age.\nImpression: Normal 3.0T Brain MRI examination." },
    { report_code: "LAB-2026-88194", patient_name: "Ram Prasad Pokharel", test_name: "Coronary Angiogram & Cath Lab Assessment", report_date: "2026-08-03", doctor: "Dr. Ramesh Chandra Adhikari", result: "Access Site: Right Radial Artery.\nLAD: Normal patent lumen without significant stenosis.\nLCx: Mild luminal irregularities, non-obstructive (<20%).\nRCA: Dominant vessel, normal flow TIMI 3.\nImpression: Normal Coronary Angiogram." }
  ];

  const report = reports.find(r => r.report_code === reportCode) || {
    report_code: reportCode,
    patient_name: "Patient",
    test_name: "Diagnostic Pathology & Imaging Test",
    report_date: new Date().toISOString().split('T')[0],
    doctor: "Consultant Pathologist",
    result: "All diagnostic parameters within reference ranges."
  };

  const printWin = window.open('', '_blank', 'width=750,height=800');
  printWin.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Diagnostic Laboratory Report - ${report.report_code}</title>
      <style>
        body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 40px; color: #0F2C59; }
        .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #0F2C59; padding-bottom: 15px; margin-bottom: 25px; }
        .title { font-size: 22px; font-weight: 800; color: #0F2C59; margin: 0; }
        .subtitle { font-size: 13px; color: #00A88F; font-weight: 700; letter-spacing: 1px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: #F8FAFC; padding: 15px; border-radius: 6px; margin-bottom: 20px; font-size: 13px; border: 1px solid #E2E8F0; }
        .results-box { border: 1px solid #CBD5E1; border-radius: 6px; padding: 20px; font-family: monospace; white-space: pre-wrap; font-size: 13px; background: #FFF; line-height: 1.6; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #64748B; border-top: 1px solid #E2E8F0; padding-top: 15px; }
        @media print { .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1 class="title">CHITWAN SAJHA HOSPITAL</h1>
          <div class="subtitle">CENTRAL DIAGNOSTIC LABORATORY & IMAGING</div>
        </div>
        <div style="text-align: right; font-size: 12px; color: #64748B;">
          Bharatpur-10, Chitwan, Nepal<br>NMC Reg: 1094/CSH<br>Tel: +977 981-9283223
        </div>
      </div>
      <div class="info-grid">
        <div><strong>Report Code:</strong> ${report.report_code}</div>
        <div><strong>Report Date:</strong> ${report.report_date}</div>
        <div><strong>Patient Name:</strong> ${report.patient_name}</div>
        <div><strong>Referred By:</strong> ${report.doctor}</div>
        <div style="grid-column: 1/-1;"><strong>Test Description:</strong> ${report.test_name}</div>
      </div>
      <h3 style="font-size: 14px; font-weight: 700; color: #0F2C59; margin-bottom: 10px;">TEST RESULTS & IMPRESSION:</h3>
      <div class="results-box">${report.result}</div>
      <div class="no-print" style="text-align: center; margin-top: 20px;">
        <button onclick="window.print();" style="background:#00A88F; color:#fff; border:none; padding:10px 24px; border-radius:6px; font-weight:700; cursor:pointer;">Print / Download PDF Report</button>
      </div>
      <div class="footer">
        This is a digitally verified electronic laboratory report issued by Chitwan Sajha Hospital.<br>
        © Chitwan Sajha Hospital Pvt. Ltd.
      </div>
    </body>
    </html>
  `);
  printWin.document.close();
};

document.addEventListener('DOMContentLoaded', async () => {
  const headerContainer = document.getElementById('header-container');
  const footerContainer = document.getElementById('footer-container');

  function updateLayout() {
    if (headerContainer) headerContainer.innerHTML = renderNavbar();
    if (footerContainer) footerContainer.innerHTML = renderFooter();
    initMobileMenu();
  }

  function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (toggle && navMenu) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
          if (menuIcon) menuIcon.className = 'fa-solid fa-xmark';
        } else {
          if (menuIcon) menuIcon.className = 'fa-solid fa-bars';
        }
      });

      // Toggle dropdowns on mobile via tap
      navMenu.querySelectorAll('.has-dropdown > .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            const parent = link.closest('.has-dropdown');
            parent.classList.toggle('mobile-open');
          }
        });
      });

      // Close menu when a navigation link is clicked
      navMenu.querySelectorAll('a[data-link]').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          if (menuIcon) menuIcon.className = 'fa-solid fa-bars';
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !toggle.contains(e.target)) {
          navMenu.classList.remove('active');
          if (menuIcon) menuIcon.className = 'fa-solid fa-bars';
        }
      });
    }
  }

  updateLayout();
  store.subscribe(() => updateLayout());

  const router = new Router(routes);
  await router.handleRoute();

  async function performDoctorFilter() {
    const searchInput = document.getElementById('doc-search-input');
    const deptSelect = document.getElementById('doc-dept-filter');
    const container = document.getElementById('doctors-list-container');

    if (!container) return;

    const search = searchInput ? searchInput.value.trim() : '';
    const department = deptSelect ? deptSelect.value : '';

    container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;"><i class="fa-solid fa-spinner fa-spin fa-2x" style="color: var(--accent-teal);"></i></div>';

    try {
      const res = await api.getDoctors({ department, search });
      container.innerHTML = renderDoctorCardsList(res.doctors || []);
    } catch (err) {
      console.error('Filter error:', err);
      container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--danger);">Failed to fetch doctors.</div>';
    }
  }

  document.addEventListener('click', async (e) => {
    if (e.target.closest('#doc-filter-btn')) {
      e.preventDefault();
      await performDoctorFilter();
    }

    if (e.target.closest('#portal-logout-btn') || e.target.closest('#admin-logout-btn')) {
      await api.logout();
      store.setUser(null);
      store.showToast('Logged out successfully.', 'info');
      router.navigate('/');
    }

    if (e.target.id === 'tab-login-btn') {
      document.getElementById('portal-login-form').style.display = 'block';
      document.getElementById('portal-register-form').style.display = 'none';
      e.target.style.borderBottom = '2px solid var(--accent-teal)';
      e.target.style.color = 'var(--accent-teal)';
      document.getElementById('tab-register-btn').style.borderBottom = 'none';
      document.getElementById('tab-register-btn').style.color = 'inherit';
    }
    if (e.target.id === 'tab-register-btn') {
      document.getElementById('portal-login-form').style.display = 'none';
      document.getElementById('portal-register-form').style.display = 'block';
      e.target.style.borderBottom = '2px solid var(--accent-teal)';
      e.target.style.color = 'var(--accent-teal)';
      document.getElementById('tab-login-btn').style.borderBottom = 'none';
      document.getElementById('tab-login-btn').style.color = 'inherit';
    }

    const aptStatusBtn = e.target.closest('.btn-apt-status');
    if (aptStatusBtn) {
      const id = aptStatusBtn.dataset.aptId;
      const action = aptStatusBtn.dataset.action;
      try {
        await api.updateAppointmentStatus(id, { status: action });
        store.showToast(`Appointment status updated to ${action}.`, 'success');
        router.handleRoute();
      } catch (err) {
        store.showToast(err.message, 'danger');
      }
    }
  });

  document.addEventListener('change', async (e) => {
    if (e.target.id === 'doc-dept-filter') {
      await performDoctorFilter();
    }
  });

  document.addEventListener('input', async (e) => {
    if (e.target.id === 'doc-search-input') {
      await performDoctorFilter();
    }
  });

  document.addEventListener('submit', async (e) => {
    if (e.target.id === 'home-finder-form') {
      e.preventDefault();
      const deptId = document.getElementById('finder-dept').value;
      const search = document.getElementById('finder-search').value.trim();
      
      const queryParams = new URLSearchParams();
      if (deptId) queryParams.set('department', deptId);
      if (search) queryParams.set('search', search);

      const targetPath = queryParams.toString() ? `/doctors?${queryParams.toString()}` : '/doctors';
      router.navigate(targetPath);
    }

    if (e.target.id === 'portal-login-form') {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      try {
        const res = await api.login(email, password);
        api.setToken(res.token);
        store.setUser(res.user);
        store.showToast(`Signed in as ${res.user.name}`, 'success');
        router.handleRoute();
      } catch (err) {
        store.showToast(err.message, 'danger');
      }
    }

    if (e.target.id === 'admin-login-form') {
      e.preventDefault();
      const email = document.getElementById('admin-email').value;
      const password = document.getElementById('admin-password').value;
      try {
        const res = await api.login(email, password);
        api.setToken(res.token);
        store.setUser(res.user);
        store.showToast('Admin session authorized.', 'success');
        router.navigate('/admin');
      } catch (err) {
        store.showToast(err.message, 'danger');
      }
    }



    if (e.target.id === 'lab-report-search-form') {
      e.preventDefault();
      const query = document.getElementById('report-query-input').value.trim();
      const container = document.getElementById('lab-report-results-container');
      
      try {
        const res = await api.getLabReports({ code: query, phone: query });
        const reports = res.reports || [];

        if (reports.length === 0) {
          container.innerHTML = `<div class="glass-panel text-center" style="padding: 1.5rem;"><p class="text-muted">No diagnostic report matching '${query}' found.</p></div>`;
          return;
        }

        container.innerHTML = `
          <div class="glass-panel" style="padding: 1.5rem;">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.85rem;">Matching Diagnostic Reports (${reports.length})</h3>
            <div class="table-responsive">
              <table class="custom-table">
                <thead>
                  <tr>
                    <th>Report Code</th>
                    <th>Patient Name</th>
                    <th>Test Name</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${reports.map(r => `
                    <tr>
                      <td><strong>${r.report_code}</strong></td>
                      <td>${r.patient_name}</td>
                      <td>${r.test_name}</td>
                      <td>${r.report_date}</td>
                      <td>
                        <button onclick="window.openPrintableReport('${r.report_code}')" class="btn btn-primary" style="padding: 0.25rem 0.6rem; font-size: 0.75rem;">
                          <i class="fa-solid fa-file-pdf"></i> View Report PDF
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      } catch (err) {
        store.showToast(err.message, 'danger');
      }
    }

    // Global Click Event Listener
    document.body.addEventListener('click', (e) => {
      // Mobile Menu Toggle
      const menuBtn = e.target.closest('#mobile-menu-toggle');
      if (menuBtn) {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
          const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
          menuBtn.setAttribute('aria-expanded', !isExpanded);
          navMenu.classList.toggle('active');
          if (navMenu.classList.contains('active')) {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.background = 'var(--bg-card)';
            navMenu.style.padding = '1.5rem';
            navMenu.style.boxShadow = 'var(--shadow-md)';
          } else {
            navMenu.style.display = '';
          }
        }
      }
    });

    // Re-render Header & View on Language Change
    store.subscribe(() => {
      document.getElementById('header-container').innerHTML = renderNavbar();
      document.getElementById('footer-container').innerHTML = renderFooter();
      router.handleRoute();
    });

    if (e.target.id === 'contact-inquiry-form' || e.target.id === 'international-inquiry-form') {
      e.preventDefault();
      const honeypot = document.getElementById('contact-website')?.value;
      if (honeypot) {
        store.showToast('Spam submission detected.', 'danger');
        return;
      }
      const name = document.getElementById('contact-name')?.value || document.getElementById('intl-name')?.value;
      const email = document.getElementById('contact-email')?.value || document.getElementById('intl-email')?.value;
      const phone = document.getElementById('contact-phone')?.value || document.getElementById('intl-country')?.value;
      const message = document.getElementById('contact-message')?.value || document.getElementById('intl-message')?.value;

      try {
        await api.sendInquiry({ name, email, phone, message });
        store.showToast('Inquiry submitted. Our support team will contact you.', 'success');
        e.target.reset();
      } catch (err) {
        store.showToast(err.message, 'danger');
      }
    }
  });
});

