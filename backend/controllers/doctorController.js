import db from '../config/db.js';

export const getDoctors = (req, res, next) => {
  try {
    const { department, search, availability, lang } = req.query;

    let query = 'SELECT * FROM doctors WHERE 1=1';
    const params = [];

    if (department) {
      query += ' AND (department_id = ? OR department_name LIKE ?)';
      params.push(department, `%${department}%`);
    }

    if (search) {
      query += ' AND (name LIKE ? OR specialization LIKE ? OR qualification LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (lang) {
      query += ' AND languages LIKE ?';
      params.push(`%${lang}%`);
    }

    query += ' ORDER BY id ASC';

    const doctors = db.prepare(query).all(...params);

    // Parse JSON availability
    const formatted = doctors.map(doc => ({
      ...doc,
      availability: JSON.parse(doc.availability_json || '{}')
    }));

    res.json({
      success: true,
      count: formatted.length,
      doctors: formatted
    });
  } catch (error) {
    next(error);
  }
};

export const getDoctorBySlug = (req, res, next) => {
  try {
    const { slug } = req.params;
    const doctor = db.prepare('SELECT * FROM doctors WHERE slug = ? OR id = ?').get(slug, slug);

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found.' });
    }

    const formatted = {
      ...doctor,
      availability: JSON.parse(doctor.availability_json || '{}')
    };

    res.json({ success: true, doctor: formatted });
  } catch (error) {
    next(error);
  }
};

export const createDoctor = (req, res, next) => {
  try {
    const {
      name, qualification, experience, specialization,
      department_id, department_name, availability_json,
      languages, awards, research, bio, photo, price_nrs
    } = req.body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const result = db.prepare(`
      INSERT INTO doctors (name, slug, qualification, experience, specialization, department_id, department_name, availability_json, languages, awards, research, bio, photo, price_nrs)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(name, slug, qualification, experience, specialization, department_id, department_name, typeof availability_json === 'string' ? availability_json : JSON.stringify(availability_json), languages, awards, research, bio, photo, price_nrs || 1000);

    res.status(201).json({
      success: true,
      message: 'Doctor profile created successfully.',
      doctorId: result.lastInsertRowid
    });
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = (req, res, next) => {
  try {
    const { id } = req.params;
    const fields = req.body;

    const doctor = db.prepare('SELECT id FROM doctors WHERE id = ?').get(id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found.' });
    }

    let availability_json = fields.availability_json;
    if (typeof availability_json === 'object') {
      availability_json = JSON.stringify(availability_json);
    }

    db.prepare(`
      UPDATE doctors
      SET name = COALESCE(?, name),
          qualification = COALESCE(?, qualification),
          experience = COALESCE(?, experience),
          specialization = COALESCE(?, specialization),
          department_id = COALESCE(?, department_id),
          department_name = COALESCE(?, department_name),
          availability_json = COALESCE(?, availability_json),
          languages = COALESCE(?, languages),
          bio = COALESCE(?, bio),
          photo = COALESCE(?, photo),
          price_nrs = COALESCE(?, price_nrs)
      WHERE id = ?
    `).run(
      fields.name, fields.qualification, fields.experience, fields.specialization,
      fields.department_id, fields.department_name, availability_json,
      fields.languages, fields.bio, fields.photo, fields.price_nrs, id
    );

    res.json({ success: true, message: 'Doctor updated successfully.' });
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = (req, res, next) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM doctors WHERE id = ?').run(id);
    res.json({ success: true, message: 'Doctor deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
