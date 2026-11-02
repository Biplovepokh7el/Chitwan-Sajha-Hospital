import db from '../config/db.js';

export const getLabReports = (req, res, next) => {
  try {
    const { code, phone } = req.query;

    let query = 'SELECT * FROM lab_reports WHERE 1=1';
    const params = [];

    if (code) {
      query += ' AND report_code = ?';
      params.push(code);
    }

    if (phone) {
      query += ' AND patient_phone LIKE ?';
      params.push(`%${phone}%`);
    }

    if (req.user && req.user.role === 'patient') {
      query += ' AND (patient_id = ? OR patient_phone = ?)';
      params.push(req.user.id, req.user.phone);
    }

    query += ' ORDER BY id DESC';

    const reports = db.prepare(query).all(...params);
    res.json({ success: true, count: reports.length, reports });
  } catch (error) {
    next(error);
  }
};

export const downloadReportPdf = async (req, res, next) => {
  try {
    const { reportCode } = req.params;
    const report = db.prepare('SELECT * FROM lab_reports WHERE report_code = ? OR id = ?').get(reportCode, reportCode);

    if (!report) {
      return res.status(404).json({ success: false, message: 'Lab report not found.' });
    }

    const { generateLabReportPDF } = await import('../services/pdfService.js');
    generateLabReportPDF(report, res);
  } catch (error) {
    next(error);
  }
};

export const createLabReport = (req, res, next) => {
  try {
    const { patient_name, patient_phone, doctor_name, department, test_name, result_summary, status, report_date } = req.body;
    const report_code = 'LAB-2026-' + Math.floor(10000 + Math.random() * 90000);
    const file_url = `/api/reports/${report_code}/pdf`;

    const result = db.prepare(`
      INSERT INTO lab_reports (report_code, patient_name, patient_phone, doctor_name, department, test_name, result_summary, status, report_date, file_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(report_code, patient_name, patient_phone, doctor_name, department, test_name, result_summary, status || 'Ready', report_date || new Date().toISOString().split('T')[0], file_url);

    res.status(201).json({
      success: true,
      message: 'Lab report uploaded.',
      report_code,
      reportId: result.lastInsertRowid
    });
  } catch (error) {
    next(error);
  }
};
