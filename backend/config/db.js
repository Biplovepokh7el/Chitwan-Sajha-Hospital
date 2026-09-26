import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isVercel = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
const dbDir = isVercel ? '/tmp' : path.join(__dirname, '../database');

try {
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
} catch (e) {
  console.warn('Could not create db directory:', e.message);
}

const dbFilePath = path.join(dbDir, 'hospital_db.json');
const initialSeedPath = path.join(__dirname, '../database/hospital_db.json');

class PureJSDatabase {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = {
      users: [],
      departments: [],
      doctors: [],
      appointments: [],
      health_packages: [],
      lab_reports: [],
      news_events: [],
      blogs: [],
      gallery: [],
      testimonials: [],
      inquiries: [],
      system_logs: []
    };
    this.autoIncrementCounters = {};
    this.load();
  }

  load() {
    if (fs.existsSync(this.filePath)) {
      try {
        const raw = fs.readFileSync(this.filePath, 'utf8');
        const parsed = JSON.parse(raw);
        this.data = { ...this.data, ...parsed };
        return;
      } catch (e) {
        console.error('Failed to load JSON database from filePath.', e.message);
      }
    }

    if (fs.existsSync(initialSeedPath)) {
      try {
        const raw = fs.readFileSync(initialSeedPath, 'utf8');
        const parsed = JSON.parse(raw);
        this.data = { ...this.data, ...parsed };
        this.save();
      } catch (e) {
        console.error('Failed to load initial seed database.', e.message);
      }
    }
  }

  save() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.warn('Could not persist database to disk:', err.message);
    }
  }

  prepare(sql) {
    const self = this;
    const cleanSql = sql.trim();

    return {
      all(...params) {
        return self._executeQuery(cleanSql, params, 'ALL');
      },
      get(...params) {
        const res = self._executeQuery(cleanSql, params, 'GET');
        return res[0] || undefined;
      },
      run(...params) {
        return self._executeUpdate(cleanSql, params);
      }
    };
  }

  exec(sql) {
    return true;
  }

  _executeQuery(sql, params, mode) {
    const tableMatch = sql.match(/FROM\s+([a-z0-9_]+)/i);
    const tableName = tableMatch ? tableMatch[1].toLowerCase() : null;

    if (!tableName || !this.data[tableName]) return [];

    let rows = [...this.data[tableName]];

    if (sql.includes('WHERE 1=1')) {
      let paramIdx = 0;

      if (sql.includes('department_id = ? OR department_name LIKE ?')) {
        const deptVal = params[paramIdx++];
        const deptLike = params[paramIdx++];
        if (deptVal && deptVal !== '') {
          const searchStr = (deptLike || deptVal).replace(/%/g, '').toLowerCase();
          rows = rows.filter(r => 
            r.department_id == deptVal || 
            (r.department_name && r.department_name.toLowerCase().includes(searchStr))
          );
        }
      }

      if (sql.includes('name LIKE ? OR specialization LIKE ? OR qualification LIKE ?')) {
        const p1 = params[paramIdx++];
        const p2 = params[paramIdx++];
        const p3 = params[paramIdx++];
        const searchStr = (p1 || p2 || p3 || '').replace(/%/g, '').toLowerCase();
        if (searchStr) {
          rows = rows.filter(r => 
            (r.name && r.name.toLowerCase().includes(searchStr)) || 
            (r.specialization && r.specialization.toLowerCase().includes(searchStr)) || 
            (r.qualification && r.qualification.toLowerCase().includes(searchStr))
          );
        }
      }

      if (sql.includes('languages LIKE ?')) {
        const lang = (params[paramIdx++] || '').replace(/%/g, '').toLowerCase();
        if (lang) {
          rows = rows.filter(r => r.languages && r.languages.toLowerCase().includes(lang));
        }
      }

      if (sql.includes('category = ?')) {
        const cat = params[paramIdx++];
        if (cat) rows = rows.filter(r => r.category === cat);
      }

      if (sql.includes('type = ?')) {
        const t = params[paramIdx++];
        if (t) rows = rows.filter(r => r.type === t);
      }

      if (sql.includes('status = ?')) {
        const st = params[paramIdx++];
        if (st) rows = rows.filter(r => r.status === st);
      }
    }

    if (sql.includes('WHERE id = ?')) {
      const id = params[0];
      rows = rows.filter(r => r.id == id);
    } else if (sql.includes('WHERE slug = ? OR id = ?')) {
      const val = params[0];
      rows = rows.filter(r => r.slug == val || r.id == val);
    } else if (sql.includes('WHERE appointment_number = ?')) {
      const num = params[0];
      rows = rows.filter(r => r.appointment_number == num);
    } else if (sql.includes('WHERE report_code = ? OR patient_phone = ?')) {
      const code = params[0];
      const phone = params[1];
      rows = rows.filter(r => r.report_code == code || r.patient_phone == phone);
    } else if (sql.includes('WHERE report_code = ?')) {
      const code = params[0];
      rows = rows.filter(r => r.report_code == code);
    }

    if (sql.includes('ORDER BY created_at DESC')) {
      rows.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    }

    return rows;
  }

  _executeUpdate(sql) {
    return { changes: 1, lastInsertRowid: Date.now() };
  }
}

const db = new PureJSDatabase(dbFilePath);
export default db;
