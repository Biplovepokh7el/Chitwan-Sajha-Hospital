import db from '../config/db.js';

export const getAdminStats = (req, res, next) => {
  try {
    const doctorCount = db.prepare('SELECT COUNT(*) as count FROM doctors').get().count;
    const departmentCount = db.prepare('SELECT COUNT(*) as count FROM departments').get().count;
    const appointmentCount = db.prepare('SELECT COUNT(*) as count FROM appointments').get().count;
    const pendingAppointments = db.prepare("SELECT COUNT(*) as count FROM appointments WHERE status = 'Pending'").get().count;
    const patientCount = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'patient'").get().count;
    const reportCount = db.prepare('SELECT COUNT(*) as count FROM lab_reports').get().count;
    const inquiryCount = db.prepare('SELECT COUNT(*) as count FROM inquiries').get().count;

    const recentAppointments = db.prepare(`
      SELECT * FROM appointments ORDER BY id DESC LIMIT 5
    `).all();

    const recentLogs = db.prepare(`
      SELECT * FROM system_logs ORDER BY id DESC LIMIT 8
    `).all();

    res.json({
      success: true,
      stats: {
        totalDoctors: doctorCount,
        totalDepartments: departmentCount,
        totalAppointments: appointmentCount,
        pendingAppointments,
        totalPatients: patientCount,
        totalReports: reportCount,
        totalInquiries: inquiryCount
      },
      recentAppointments,
      recentLogs
    });
  } catch (error) {
    next(error);
  }
};

export const getSystemLogs = (req, res, next) => {
  try {
    const logs = db.prepare('SELECT * FROM system_logs ORDER BY id DESC LIMIT 50').all();
    res.json({ success: true, logs });
  } catch (error) {
    next(error);
  }
};
