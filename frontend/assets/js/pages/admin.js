import { api } from '../api.js';
import { store } from '../state.js';

export async function renderAdminDashboard() {
  const { user } = store.getState();

  if (!user || user.role !== 'admin') {
    return renderAdminLogin();
  }

  const [statsRes, aptsRes, docsRes, deptsRes, logsRes] = await Promise.all([
    api.getAdminStats(),
    api.getAllAppointments(),
    api.getDoctors(),
    api.getDepartments(),
    api.getSystemLogs()
  ]);

  const stats = statsRes.stats || {};
  const appointments = aptsRes.appointments || [];
  const doctors = docsRes.doctors || [];
  const logs = logsRes.logs || [];

  return `
    <div class="admin-layout">
      <div class="admin-sidebar">
        <div class="admin-logo">
          <i class="fa-solid fa-user-shield" style="color: var(--accent-teal);"></i>
          <span>HIS ADMIN</span>
        </div>
        <ul class="admin-nav">
          <li><a href="#dashboard" class="active"><i class="fa-solid fa-chart-line"></i> Dashboard</a></li>
          <li><a href="#appointments"><i class="fa-solid fa-calendar-check"></i> Appointments (${stats.pendingAppointments || 0})</a></li>
          <li><a href="#doctors"><i class="fa-solid fa-user-doctor"></i> Doctor CRUD</a></li>
          <li><a href="#departments"><i class="fa-solid fa-hospital-user"></i> Department CRUD</a></li>
          <li><a href="#logs"><i class="fa-solid fa-list-check"></i> Audit Logs</a></li>
          <li style="margin-top: auto;"><button id="admin-logout-btn" class="btn btn-outline" style="width: 100%; border-color: rgba(255,255,255,0.2); color: #fff;"><i class="fa-solid fa-right-from-bracket"></i> Logout</button></li>
        </ul>
      </div>

      <div class="admin-content">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.75rem;">
          <div>
            <h1 style="font-size: 1.5rem; font-weight: 700; color: var(--primary-navy); margin: 0;">Chitwan Sajha HIS Management</h1>
            <p style="color: var(--text-muted); font-size: 0.85rem;">User: <strong>${user.name}</strong> (${user.email})</p>
          </div>
          <button id="add-doctor-modal-btn" class="btn btn-primary"><i class="fa-solid fa-user-plus"></i> Add New Doctor</button>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(0, 168, 143, 0.1); color: var(--accent-teal);"><i class="fa-solid fa-calendar-check"></i></div>
            <div>
              <div class="stat-val">${stats.totalAppointments || 0}</div>
              <div class="stat-lbl">Total Appointments</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(180, 83, 9, 0.1); color: var(--warning);"><i class="fa-solid fa-clock"></i></div>
            <div>
              <div class="stat-val">${stats.pendingAppointments || 0}</div>
              <div class="stat-lbl">Pending Confirmation</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(29, 97, 231, 0.1); color: var(--accent-blue);"><i class="fa-solid fa-user-doctor"></i></div>
            <div>
              <div class="stat-val">${stats.totalDoctors || 0}</div>
              <div class="stat-lbl">Active Specialists</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(22, 101, 52, 0.1); color: var(--success);"><i class="fa-solid fa-users"></i></div>
            <div>
              <div class="stat-val">${stats.totalPatients || 0}</div>
              <div class="stat-lbl">Registered Patients</div>
            </div>
          </div>
        </div>

        <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2rem;">
          <h2 style="font-size: 1.2rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 1rem;">Recent OPD Appointments</h2>
          <div class="table-responsive">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Slip No</th>
                  <th>Patient Name</th>
                  <th>Contact</th>
                  <th>Doctor</th>
                  <th>Date & Slot</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${appointments.slice(0, 10).map(apt => `
                  <tr>
                    <td><strong>${apt.appointment_number}</strong></td>
                    <td>${apt.patient_name}</td>
                    <td>${apt.patient_phone}</td>
                    <td>${apt.doctor_name}</td>
                    <td>${apt.appointment_date} <br><small class="text-muted">${apt.appointment_time}</small></td>
                    <td><span class="badge ${apt.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}">${apt.status}</span></td>
                    <td>
                      <button data-apt-id="${apt.id}" data-action="Confirm" class="btn-apt-status btn btn-primary" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;">Confirm</button>
                      <button data-apt-id="${apt.id}" data-action="Cancelled" class="btn-apt-status btn btn-outline" style="padding: 0.2rem 0.5rem; font-size: 0.75rem; color: var(--danger); border-color: var(--danger);">Cancel</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2rem;">
          <h2 style="font-size: 1.2rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 1rem;">Doctor CRUD Management</h2>
          <div class="table-responsive">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Specialization</th>
                  <th>Fee (NPR)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${doctors.map(doc => `
                  <tr>
                    <td><img src="${doc.photo}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;"></td>
                    <td><strong>${doc.name}</strong></td>
                    <td>${doc.department_name}</td>
                    <td>${doc.specialization}</td>
                    <td>NPR ${doc.price_nrs}</td>
                    <td>
                      <button data-doc-id="${doc.id}" class="btn-delete-doc btn btn-outline" style="padding: 0.2rem 0.5rem; font-size: 0.75rem; color: var(--danger); border-color: var(--danger);"><i class="fa-solid fa-trash"></i> Delete</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="glass-panel" style="padding: 1.5rem;">
          <h2 style="font-size: 1.2rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 1rem;">System Audit Logs</h2>
          <div class="table-responsive">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>IP</th>
                </tr>
              </thead>
              <tbody>
                ${logs.map(log => `
                  <tr>
                    <td><small>${log.timestamp}</small></td>
                    <td>${log.user_email || 'System'}</td>
                    <td><strong>${log.action}</strong></td>
                    <td>${log.ip || '127.0.0.1'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAdminLogin() {
  return `
    <div class="page-header-banner" style="background: var(--primary-navy-dark);">
      <div class="container text-center">
        <h1 class="page-header-title">Admin Authentication</h1>
        <p style="color: var(--accent-teal);">Chitwan Sajha HIS Management</p>
      </div>
    </div>

    <section class="section-padding">
      <div class="container" style="max-width: 440px;">
        <div class="glass-panel" style="padding: 2rem;">
          <form id="admin-login-form">
            <div class="form-group">
              <label class="form-label">Administrator Email</label>
              <input type="email" id="admin-email" class="form-control" value="admin@chitwansajha.org" required>
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" id="admin-password" class="form-control" value="Admin@123" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 0.85rem;">
              <i class="fa-solid fa-lock"></i> Authorize Admin Access
            </button>
          </form>
        </div>
      </div>
    </section>
  `;
}
