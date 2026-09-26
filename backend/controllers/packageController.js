import db from '../config/db.js';

export const getPackages = (req, res, next) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM health_packages WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY id ASC';
    const packages = db.prepare(query).all(...params);

    const formatted = packages.map(pkg => ({
      ...pkg,
      includes: JSON.parse(pkg.includes_json || '[]')
    }));

    res.json({ success: true, count: formatted.length, packages: formatted });
  } catch (error) {
    next(error);
  }
};

export const getPackageById = (req, res, next) => {
  try {
    const { id } = req.params;
    const pkg = db.prepare('SELECT * FROM health_packages WHERE id = ?').get(id);

    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found.' });
    }

    const formatted = {
      ...pkg,
      includes: JSON.parse(pkg.includes_json || '[]')
    };

    res.json({ success: true, package: formatted });
  } catch (error) {
    next(error);
  }
};

export const createPackage = (req, res, next) => {
  try {
    const { title, category, price_nrs, original_price_nrs, tests_count, includes, description, is_popular } = req.body;

    const result = db.prepare(`
      INSERT INTO health_packages (title, category, price_nrs, original_price_nrs, tests_count, includes_json, description, is_popular)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, category, price_nrs, original_price_nrs || price_nrs, tests_count, JSON.stringify(includes || []), description, is_popular ? 1 : 0);

    res.status(201).json({ success: true, message: 'Health package created.', packageId: result.lastInsertRowid });
  } catch (error) {
    next(error);
  }
};

export const deletePackage = (req, res, next) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM health_packages WHERE id = ?').run(id);
    res.json({ success: true, message: 'Health package deleted.' });
  } catch (error) {
    next(error);
  }
};
