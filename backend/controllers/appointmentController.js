import db from '../config/db.js';

export const bookAppointment = async (req, res, next) => {
  try {
    const {
      patient_name, patient_phone, patient_email,
      department_id, doctor_id, doctor_name,
      appointment_date, appointment_time, reason, insurance_provider
    } = req.body;

    const patient_id = req.user ? req.user.id : null;
    const appointment_number = 'APT-2026-' + Math.floor(1000 + Math.random() * 9000);

    const result = db.prepare(`
      INSERT INTO appointments (
        appointment_number, patient_id, patient_name, patient_phone, patient_email,
        department_id, doctor_id, doctor_name, appointment_date, appointment_time,
        reason, insurance_provider, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Confirmed')
    `).run(
      appointment_number, patient_id, patient_name, patient_phone, patient_email,
      department_id, doctor_id, doctor_name, appointment_date, appointment_time,
      reason || '', insurance_provider || 'Self Paying', 'Confirmed'
    );

    const appointment = db.prepare('SELECT * FROM appointments WHERE id = ?').get(result.lastInsertRowid);

    // Send email notification (non-blocking, lazy-loaded)
    try {
      const { sendAppointmentEmail } = await import('../services/emailService.js');
      sendAppointmentEmail(appointment);
    } catch (e) { console.warn('Email service unavailable:', e.message); }

    res.status(201).json({
      success: true,
      message: 'Appointment booked and confirmed successfully!',
      appointment
    });
  } catch (error) {
    next(error);
  }
};

export const getAppointmentByNumber = (req, res, next) => {
  try {
    const { aptNumber } = req.params;
    const appointment = db.prepare('SELECT * FROM appointments WHERE appointment_number = ?').get(aptNumber);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found.' });
    }
    res.json({ success: true, appointment });
  } catch (error) {
    next(error);
  }
};

export const getPatientAppointments = (req, res, next) => {
  try {
    const userId = req.user.id;
    const email = req.user.email;

    const appointments = db.prepare(`
      SELECT * FROM appointments 
      WHERE patient_id = ? OR patient_email = ? 
      ORDER BY appointment_date DESC, id DESC
    `).all(userId, email);

    res.json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    next(error);
  }
};

export const getAllAppointments = (req, res, next) => {
  try {
    const { status, date } = req.query;
    let query = 'SELECT * FROM appointments WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (date) {
      query += ' AND appointment_date = ?';
      params.push(date);
    }

    query += ' ORDER BY id DESC';

    const appointments = db.prepare(query).all(...params);
    res.json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentStatus = (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, appointment_date, appointment_time } = req.body;

    db.prepare(`
      UPDATE appointments
      SET status = COALESCE(?, status),
          appointment_date = COALESCE(?, appointment_date),
          appointment_time = COALESCE(?, appointment_time)
      WHERE id = ? OR appointment_number = ?
    `).run(status, appointment_date, appointment_time, id, id);

    res.json({ success: true, message: 'Appointment status updated successfully.' });
  } catch (error) {
    next(error);
  }
};

export const downloadAppointmentPdf = async (req, res, next) => {
  try {
    const { aptNumber } = req.params;
    const appointment = db.prepare('SELECT * FROM appointments WHERE appointment_number = ? OR id = ?').get(aptNumber, aptNumber);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment slip not found.' });
    }

    const { generateAppointmentPDF } = await import('../services/pdfService.js');
    generateAppointmentPDF(appointment, res);
  } catch (error) {
    next(error);
  }
};
