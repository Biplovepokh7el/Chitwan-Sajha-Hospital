-- Chitwan Sajha Hospital Database Schema (SQLite compatible)

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'patient', -- 'admin', 'doctor', 'patient'
  avatar TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS departments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  short_desc TEXT,
  overview TEXT,
  services_json TEXT, -- JSON array
  equipment_json TEXT, -- JSON array
  faqs_json TEXT, -- JSON array
  image TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS doctors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  qualification TEXT NOT NULL,
  experience TEXT NOT NULL,
  specialization TEXT NOT NULL,
  department_id INTEGER NOT NULL,
  department_name TEXT NOT NULL,
  availability_json TEXT NOT NULL, -- JSON object for schedule
  languages TEXT NOT NULL,
  awards TEXT,
  research TEXT,
  bio TEXT,
  photo TEXT,
  price_nrs INTEGER NOT NULL DEFAULT 1000,
  rating REAL DEFAULT 4.9,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  appointment_number TEXT UNIQUE NOT NULL,
  patient_id INTEGER,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  department_id INTEGER NOT NULL,
  doctor_id INTEGER NOT NULL,
  doctor_name TEXT NOT NULL,
  appointment_date TEXT NOT NULL,
  appointment_time TEXT NOT NULL,
  reason TEXT,
  insurance_provider TEXT,
  status TEXT DEFAULT 'Pending', -- 'Pending', 'Confirmed', 'Completed', 'Cancelled'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (doctor_id) REFERENCES doctors (id),
  FOREIGN KEY (department_id) REFERENCES departments (id)
);

CREATE TABLE IF NOT EXISTS health_packages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- Executive, Heart, Diabetes, Women, Senior, Corporate
  price_nrs INTEGER NOT NULL,
  original_price_nrs INTEGER,
  tests_count INTEGER NOT NULL,
  includes_json TEXT NOT NULL, -- JSON array of included tests
  description TEXT,
  is_popular INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lab_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  report_code TEXT UNIQUE NOT NULL,
  patient_id INTEGER,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  doctor_name TEXT NOT NULL,
  department TEXT NOT NULL,
  test_name TEXT NOT NULL,
  result_summary TEXT NOT NULL,
  status TEXT DEFAULT 'Ready', -- 'Ready', 'Processing'
  report_date TEXT NOT NULL,
  file_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  type TEXT NOT NULL, -- 'news', 'event', 'health_camp'
  slug TEXT UNIQUE NOT NULL,
  date TEXT NOT NULL,
  location TEXT,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  author TEXT DEFAULT 'Chitwan Sajha Media Team',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blogs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_title TEXT NOT NULL,
  read_time TEXT DEFAULT '5 min read',
  tags TEXT,
  content TEXT NOT NULL,
  image TEXT,
  date TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Hospital', 'ICU', 'Operation Theater', 'Events', 'Technology'
  type TEXT DEFAULT 'image', -- 'image' or 'video'
  url TEXT NOT NULL,
  caption TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_name TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  treatment TEXT NOT NULL,
  content TEXT NOT NULL,
  avatar TEXT,
  date TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'contact', -- 'contact', 'international', 'complaint'
  status TEXT DEFAULT 'New',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS system_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_email TEXT,
  action TEXT NOT NULL,
  ip TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
