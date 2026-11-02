import db from '../config/db.js';

export const getDepartments = (req, res, next) => {
  try {
    const departments = db.prepare('SELECT * FROM departments ORDER BY id ASC').all();

    const formatted = departments.map(d => ({
      ...d,
      services: JSON.parse(d.services_json || '[]'),
      equipment: JSON.parse(d.equipment_json || '[]'),
      faqs: JSON.parse(d.faqs_json || '[]')
    }));

    res.json({ success: true, count: formatted.length, departments: formatted });
  } catch (error) {
    next(error);
  }
};

export const getDepartmentBySlug = (req, res, next) => {
  try {
    const { slug } = req.params;
    const dept = db.prepare('SELECT * FROM departments WHERE slug = ? OR id = ?').get(slug, slug);

    if (!dept) {
      return res.status(404).json({ success: false, message: 'Department not found.' });
    }

    // Fetch doctors belonging to this department
    const doctors = db.prepare('SELECT * FROM doctors WHERE department_id = ?').all(dept.id);
    const formattedDocs = doctors.map(doc => ({
      ...doc,
      availability: JSON.parse(doc.availability_json || '{}')
    }));

    const formatted = {
      ...dept,
      services: JSON.parse(dept.services_json || '[]'),
      equipment: JSON.parse(dept.equipment_json || '[]'),
      faqs: JSON.parse(dept.faqs_json || '[]'),
      doctors: formattedDocs
    };

    res.json({ success: true, department: formatted });
  } catch (error) {
    next(error);
  }
};

export const createDepartment = (req, res, next) => {
  try {
    const { name, icon, short_desc, overview, services, equipment, faqs, image } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const result = db.prepare(`
      INSERT INTO departments (name, slug, icon, short_desc, overview, services_json, equipment_json, faqs_json, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      name, slug, icon || 'fa-stethoscope', short_desc, overview,
      JSON.stringify(services || []), JSON.stringify(equipment || []), JSON.stringify(faqs || []), image
    );

    res.status(201).json({ success: true, message: 'Department created.', departmentId: result.lastInsertRowid });
  } catch (error) {
    next(error);
  }
};

export const deleteDepartment = (req, res, next) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM departments WHERE id = ?').run(id);
    res.json({ success: true, message: 'Department deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
