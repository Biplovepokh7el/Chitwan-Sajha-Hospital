import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import db from '../config/db.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedDatabase() {
  console.log('🌱 Starting Chitwan Sajha Hospital Database Seeding...');

  // 1. Load & Execute Schema
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schemaSql);
  console.log('✅ Database schema verified/created.');

  // 2. Hash default passwords
  const adminPass = await bcrypt.hash('Admin@123', 10);
  const doctorPass = await bcrypt.hash('Doctor@123', 10);
  const patientPass = await bcrypt.hash('Patient@123', 10);

  // Clear existing data cleanly if re-seeding
  db.prepare('DELETE FROM users').run();
  db.prepare('DELETE FROM departments').run();
  db.prepare('DELETE FROM doctors').run();
  db.prepare('DELETE FROM appointments').run();
  db.prepare('DELETE FROM health_packages').run();
  db.prepare('DELETE FROM lab_reports').run();
  db.prepare('DELETE FROM news_events').run();
  db.prepare('DELETE FROM blogs').run();
  db.prepare('DELETE FROM gallery').run();
  db.prepare('DELETE FROM testimonials').run();
  db.prepare('DELETE FROM inquiries').run();

  // 3. Insert Users
  const insertUser = db.prepare(`
    INSERT INTO users (name, email, phone, password, role, avatar)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const adminResult = insertUser.run(
    'Chitwan Sajha Admin',
    'admin@chitwansajha.org',
    '+977-56-520100',
    adminPass,
    'admin',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  );

  const docUser1 = insertUser.run(
    'Dr. Ramesh Chandra Adhikari',
    'dr.ramesh@chitwansajha.org',
    '+977-9855012345',
    doctorPass,
    'doctor',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'
  );

  const docUser2 = insertUser.run(
    'Dr. Sunita Sharma Banskota',
    'dr.sunita@chitwansajha.org',
    '+977-9855023456',
    doctorPass,
    'doctor',
    'https://images.unsplash.com/photo-1594824813570-848242114463?auto=format&fit=crop&w=400&q=80'
  );

  const docUser3 = insertUser.run(
    'Dr. Bijay Raj Gurung',
    'dr.bijay@chitwansajha.org',
    '+977-9855034567',
    doctorPass,
    'doctor',
    'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80'
  );

  const patientUser = insertUser.run(
    'Hari Bahadur Shrestha',
    'patient@chitwansajha.org',
    '+977-9845011223',
    patientPass,
    'patient',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  );

  console.log('✅ Default System Users Created:');
  console.log('   Admin: admin@chitwansajha.org / Admin@123');
  console.log('   Doctor: dr.ramesh@chitwansajha.org / Doctor@123');
  console.log('   Patient: patient@chitwansajha.org / Patient@123');

  // 4. Insert Departments
  const insertDept = db.prepare(`
    INSERT INTO departments (name, slug, icon, short_desc, overview, services_json, equipment_json, faqs_json, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const cardioDept = insertDept.run(
    'Cardiology & Cardiac Surgery',
    'cardiology',
    'fa-heart-pulse',
    'Comprehensive heart care, interventional cardiology, electrophysiology, and open-heart surgery.',
    'Chitwan Sajha Heart Center provides world-class cardiovascular treatment in Central Nepal. Equipped with a state-of-the-art Flat-Panel Cath Lab, advanced CCU, and 24/7 dedicated STEMI emergency response.',
    JSON.stringify([
      'Coronary Angiography & Angioplasty (PTCA)',
      'Pacemaker & ICD Implantation',
      'Coronary Artery Bypass Grafting (CABG)',
      'Echocardiography & TEE',
      '24-Hour Holter Monitoring',
      'Pediatric Cardiology'
    ]),
    JSON.stringify([
      'Philips Azurion 7 Biplane Cath Lab',
      'GE Vivid E95 4D Echocardiography',
      'Maquet Intra-Aortic Balloon Pump (IABP)',
      'Medtronic Heart-Lung Machine'
    ]),
    JSON.stringify([
      { q: 'When should I visit a Cardiologist?', a: 'You should seek immediate cardiology evaluation if you experience severe chest pain, breathlessness on exertion, irregular heartbeats, or unexplained dizziness.' },
      { q: 'Is Cath Lab service available 24/7?', a: 'Yes, our Cath Lab team is available round-the-clock for primary angioplasty emergency procedures.' }
    ]),
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
  );

  const neuroDept = insertDept.run(
    'Neurology & Neurosurgery',
    'neurology',
    'fa-brain',
    'Advanced treatment for brain, spinal cord, nerve disorders, and stroke care.',
    'The Department of Neuroscience offers comprehensive diagnostic and therapeutic options for complex neurological disorders. Featuring sub-specialty clinics for Epilepsy, Movement Disorders, and Micro-Neurosurgery.',
    JSON.stringify([
      'Acute Stroke Thrombolysis',
      'Brain Tumor Resection',
      'Minimally Invasive Spine Surgery',
      'Epilepsy & Seizure Management',
      'EEG, EMG, and Nerve Conduction Studies',
      'Parkinson Disease Care'
    ]),
    JSON.stringify([
      '3.0 Tesla Silent MRI System',
      '128-Slice Ultra-Fast Dual Source CT',
      'Zeiss Kinevo 900 Surgical Microscope',
      'Nicolet Video EEG Suite'
    ]),
    JSON.stringify([
      { q: 'What are warning signs of a Stroke?', a: 'Remember FAST: Face drooping, Arm weakness, Speech difficulty, and Time to call emergency.' }
    ]),
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80'
  );

  const orthoDept = insertDept.run(
    'Orthopedics & Joint Replacement',
    'orthopedics',
    'fa-bone',
    'Pioneering robotic joint replacement, complex trauma surgery, and sports medicine.',
    'Chitwan Sajha Orthopedic Center is renowned for total knee and hip replacements, arthroscopic sports surgeries, and pediatric orthopedic correctives with rapid rehabilitation protocols.',
    JSON.stringify([
      'Total Knee & Hip Replacement (TKR/THR)',
      'Arthroscopic ACL/PCL Knee Reconstruction',
      'Complex Fracture & Polytrauma Care',
      'Spine Fusion & Disc Surgery',
      'Pediatric Deformity Correction'
    ]),
    JSON.stringify([
      'Robotic Knee Replacement System',
      'C-Arm High Definition Fluoroscopy',
      'Dedicated Laminar Air Flow OT'
    ]),
    JSON.stringify([
      { q: 'How long is hospital stay after Knee Replacement?', a: 'Most patients are discharged comfortably within 3 to 4 days with assisted walking.' }
    ]),
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
  );

  const gastroDept = insertDept.run(
    'Gastroenterology & Hepatology',
    'gastroenterology',
    'fa-stethoscope',
    'Expert care for digestive tract diseases, liver wellness, and advanced endoscopy.',
    'Leading center in Bharatpur for advanced diagnostic and therapeutic gastrointestinal procedures, liver transplantation consultation, and ERCP.',
    JSON.stringify([
      'Diagnostic & Therapeutic Upper GI Endoscopy',
      'Colonoscopy & Polypectomy',
      'ERCP for Bile Duct Stones & Strictures',
      'Liver Cirrhosis & Hepatitis Care',
      'Capsule Endoscopy'
    ]),
    JSON.stringify([
      'Olympus EVIS X1 Endoscopy Tower',
      'FibroScan 530 Compact Liver Scanner',
      'Endoscopic Ultrasound (EUS)'
    ]),
    JSON.stringify([
      { q: 'Is Endoscopy painful?', a: 'Endoscopy is performed under mild sedation, making it completely painless and fast.' }
    ]),
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  );

  const pedsDept = insertDept.run(
    'Pediatrics & Neonatology (NICU)',
    'pediatrics',
    'fa-baby',
    'Comprehensive child health, pediatric surgery, and level-III NICU care.',
    'Providing compassionate medical care for infants, children, and adolescents. Home to Chitwan region’s highest equipped Level-3 NICU and PICU.',
    JSON.stringify([
      'Level-III NICU & PICU Intensive Care',
      'Pediatric Cardiology & Pulmonology',
      'Neonatal Surgery',
      'Childhood Immunization & Growth Tracking',
      'Developmental Pediatrics'
    ]),
    JSON.stringify([
      'Dräger Isolette 8000 Incubators',
      'High-Frequency Oscillatory Ventilators (HFOV)',
      'Phototherapy Units'
    ]),
    JSON.stringify([
      { q: 'What vaccination schedule do you follow?', a: 'We follow both Nepal National Immunization Program and WHO recommended guidelines.' }
    ]),
    'https://images.unsplash.com/photo-1502740479091-635887520276?auto=format&fit=crop&w=800&q=80'
  );

  const emergencyDept = insertDept.run(
    'Emergency & Trauma Center',
    'emergency',
    'fa-truck-medical',
    '24/7 Level-1 trauma response, air ambulance helipad, and critical resuscitation.',
    'Our Emergency Medicine department is staffed round-the-clock by certified emergency physicians, trauma surgeons, and advanced cardiac life support (ACLS) nurses.',
    JSON.stringify([
      '24/7 Resuscitation & Polytrauma Care',
      'Rooftop Air Ambulance Helipad Transfer',
      'Dedicated Emergency OT & CT Room',
      'Poisoning & Toxicological Care',
      'Cardiac & Stroke Rapid Response'
    ]),
    JSON.stringify([
      'Mindray BeneVision Central Monitor',
      'Zoll R Series ALS Defibrillators',
      'Point-of-Care Ultrasound (POCUS)'
    ]),
    JSON.stringify([
      { q: 'What is the Emergency Hotline number?', a: 'Call +977-56-520999 or 102 immediately for mobile ambulance dispatch.' }
    ]),
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
  );

  // 5. Insert Doctors
  const insertDoctor = db.prepare(`
    INSERT INTO doctors (user_id, name, slug, qualification, experience, specialization, department_id, department_name, availability_json, languages, awards, research, bio, photo, price_nrs, rating)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertDoctor.run(
    docUser1.lastInsertRowid,
    'Dr. Ramesh Chandra Adhikari',
    'dr-ramesh-chandra-adhikari',
    'MBBS, MD (Cardiology), DM (Interventional Cardiology - AIIMS)',
    '18+ Years Experience',
    'Senior Interventional Cardiologist',
    cardioDept.lastInsertRowid,
    'Cardiology & Cardiac Surgery',
    JSON.stringify({
      "Sun": ["09:00 AM - 01:00 PM", "04:00 PM - 07:00 PM"],
      "Mon": ["09:00 AM - 01:00 PM", "04:00 PM - 07:00 PM"],
      "Tue": ["09:00 AM - 01:00 PM"],
      "Wed": ["09:00 AM - 01:00 PM", "04:00 PM - 07:00 PM"],
      "Thu": ["09:00 AM - 01:00 PM", "04:00 PM - 07:00 PM"],
      "Fri": ["09:00 AM - 01:00 PM"]
    }),
    'Nepali, English, Hindi',
    'Nepal Medical Council Excellence Award, National Heart Fellow Award 2023',
    'Published 25+ papers in international cardiac journals on Transradial Coronary Angioplasty.',
    'Dr. Ramesh Chandra Adhikari is one of Nepal’s leading interventional cardiologists with over 10,000 successful coronary procedures.',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    1200,
    4.95
  );

  insertDoctor.run(
    docUser2.lastInsertRowid,
    'Dr. Sunita Sharma Banskota',
    'dr-sunita-sharma-banskota',
    'MBBS, MS (Neurosurgery), Fellowship in Micro-Neurosurgery (Japan)',
    '14+ Years Experience',
    'Chief Neurosurgeon & Spine Specialist',
    neuroDept.lastInsertRowid,
    'Neurology & Neurosurgery',
    JSON.stringify({
      "Sun": ["10:00 AM - 02:00 PM"],
      "Mon": ["10:00 AM - 02:00 PM", "05:00 PM - 08:00 PM"],
      "Tue": ["10:00 AM - 02:00 PM"],
      "Thu": ["10:00 AM - 02:00 PM", "05:00 PM - 08:00 PM"],
      "Fri": ["10:00 AM - 02:00 PM"]
    }),
    'Nepali, English',
    'Best Surgical Paper Award 2021, Pioneer Woman Neurosurgeon Nepal',
    'Research on Endoscopic Brain Tumor Surgery & Minimally Invasive Spine Procedures.',
    'Dr. Sunita Sharma specializes in intricate brain tumor extractions and endoscopic spinal surgery with high patient satisfaction.',
    'https://images.unsplash.com/photo-1594824813570-848242114463?auto=format&fit=crop&w=400&q=80',
    1500,
    4.98
  );

  insertDoctor.run(
    docUser3.lastInsertRowid,
    'Dr. Bijay Raj Gurung',
    'dr-bijay-raj-gurung',
    'MBBS, MS (Ortho), Fellowship in Joint Replacement & Sports Medicine (UK)',
    '15+ Years Experience',
    'Senior Orthopedic & Joint Replacement Surgeon',
    orthoDept.lastInsertRowid,
    'Orthopedics & Joint Replacement',
    JSON.stringify({
      "Sun": ["08:30 AM - 01:00 PM"],
      "Mon": ["08:30 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      "Wed": ["08:30 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      "Thu": ["08:30 AM - 01:00 PM"],
      "Fri": ["08:30 AM - 01:00 PM"]
    }),
    'Nepali, English, Gurung',
    'Excellence in Robotic Surgery 2024, Sports Injury Pioneer Award',
    'Pioneering study on Computer-Assisted Knee Arthroplasty in Asian patients.',
    'Dr. Bijay Raj Gurung has performed thousands of joint replacements and keyhole knee surgeries, enabling athletes and seniors to regain pain-free mobility.',
    'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    1100,
    4.90
  );

  insertDoctor.run(
    null,
    'Dr. Anju Karki Thapa',
    'dr-anju-karki-thapa',
    'MBBS, MD (Gastroenterology), DM (Hepatology)',
    '12+ Years Experience',
    'Senior Gastroenterologist & Hepatologist',
    gastroDept.lastInsertRowid,
    'Gastroenterology & Hepatology',
    JSON.stringify({
      "Sun": ["09:00 AM - 02:00 PM"],
      "Tue": ["09:00 AM - 02:00 PM"],
      "Wed": ["09:00 AM - 02:00 PM"],
      "Thu": ["09:00 AM - 02:00 PM"]
    }),
    'Nepali, English, Hindi',
    'Nepal Gastroenterology Society Young Investigator Award',
    'Clinical trials on Fatty Liver Disease management in Nepalese adult demographic.',
    'Dr. Anju Karki Thapa is a renowned expert in digestive endoscopy, liver disease treatments, and ERCP stone removals.',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    1000,
    4.87
  );

  insertDoctor.run(
    null,
    'Dr. Pradeep Kumar Mahato',
    'dr-pradeep-kumar-mahato',
    'MBBS, MD (Pediatrics), Fellowship in Neonatology (Singapore)',
    '11+ Years Experience',
    'Senior Neonatologist & Pediatrician',
    pedsDept.lastInsertRowid,
    'Pediatrics & Neonatology (NICU)',
    JSON.stringify({
      "Sun": ["08:00 AM - 12:00 PM"],
      "Mon": ["08:00 AM - 12:00 PM", "04:00 PM - 07:00 PM"],
      "Tue": ["08:00 AM - 12:00 PM"],
      "Thu": ["08:00 AM - 12:00 PM"],
      "Fri": ["08:00 AM - 12:00 PM"]
    }),
    'Nepali, English, Maithili, Tharu',
    'Child Health Guardian Award 2022',
    'Research on Premature Infant Survival Protocols in High-Altitude and Terai regions.',
    'Dr. Pradeep Mahato leads our NICU team, saving premature infants and providing expert pediatric advice to families across Chitwan and Nawalpur.',
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    950,
    4.93
  );

  // 6. Insert Health Packages
  const insertPkg = db.prepare(`
    INSERT INTO health_packages (title, category, price_nrs, original_price_nrs, tests_count, includes_json, description, is_popular)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertPkg.run(
    'Executive Full Body Master Screening',
    'Executive',
    14500,
    21000,
    68,
    JSON.stringify([
      'Complete Blood Count (CBC) with ESR',
      'Comprehensive Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)',
      'Liver Function Test (LFT) & Kidney Function Test (KFT)',
      'HbA1c & Fasting / PP Blood Sugar',
      'Thyroid Profile (T3, T4, TSH)',
      'Chest X-Ray Digital & Whole Abdomen Ultrasound (USG)',
      'ECG 12-Lead & Cardiac Stress Treadmill Test (TMT)',
      'Urine Routine & Stool Occult Blood',
      'Consultation with Physician & Dietician Advice'
    ]),
    'Designed for busy professionals and executives desiring thorough early-detection screening of vital organ systems.',
    1
  );

  insertPkg.run(
    'Comprehensive Cardiac Care Package',
    'Heart',
    9800,
    14000,
    32,
    JSON.stringify([
      'Lipid Profile & High Sensitivity CRP (hs-CRP)',
      'Cardiac Echo Color Doppler (2D Echo)',
      'Treadmill Test (TMT) / Stress ECG',
      'Homocysteine & Serum Electrolytes',
      'Blood Sugar Fasting & HbA1c',
      'Renal Function Profile',
      'Consultation with Senior Cardiologist'
    ]),
    'Focused heart checkup for individuals with hypertension, high cholesterol, family cardiac history, or chest discomfort.',
    1
  );

  insertPkg.run(
    'Senior Citizen Platinum Health Check',
    'Senior Citizen',
    11200,
    16500,
    54,
    JSON.stringify([
      'Complete Hemogram & Bone Mineral Density (DEXA Scan)',
      'Vitamin D3 & Vitamin B12 Levels',
      'Prostate Specific Antigen (PSA) for Men / Pap Smear for Women',
      'Whole Body Ultrasound & Renal Function',
      'Cardiac ECG & Echocardiogram',
      'Eye Screening & Audiometry Hearing Test',
      'Geriatric Specialist Consultation'
    ]),
    'Tailored health evaluation for adults aged 60+ to ensure healthy aging, joint strength, and organ vitality.',
    0
  );

  insertPkg.run(
    'Women’s Wellness & Hormonal Shield',
    'Women',
    8500,
    12500,
    42,
    JSON.stringify([
      'Pap Smear & Cervical Cytology',
      'Mammogram / Breast Ultrasound',
      'Thyroid Profile & Female Hormonal Panel (FSH, LH, Prolactin)',
      'Complete Blood Count & Iron Studies',
      'Pelvic Ultrasound (USG)',
      'Calcium & Vitamin D Check',
      'Senior Gynecologist Consultation'
    ]),
    'Essential health checkup for women of all ages to screen for breast health, cervical wellness, and hormonal balance.',
    1
  );

  insertPkg.run(
    'Diabetes Control & Organ Protection',
    'Diabetes',
    6200,
    9000,
    28,
    JSON.stringify([
      'HbA1c & Fasting/Post-Prandial Glucose',
      'Microalbuminuria & Urine Routine',
      'Kidney Function & Lipid Profile',
      'Diabetic Foot Neuropathy Examination',
      'Fundus Eye Retina Screening',
      'Diabetologist & Nutritionist Counseling'
    ]),
    'Specialized checkup for diabetic patients to prevent complications in kidneys, eyes, nerves, and heart.',
    0
  );

  // 7. Insert Lab Reports
  const insertReport = db.prepare(`
    INSERT INTO lab_reports (report_code, patient_id, patient_name, patient_phone, doctor_name, department, test_name, result_summary, status, report_date, file_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertReport.run(
    'LAB-2026-88192',
    patientUser.lastInsertRowid,
    'Hari Bahadur Shrestha',
    '+977-9845011223',
    'Dr. Ramesh Chandra Adhikari',
    'Cardiology',
    'Comprehensive Lipid & Cardiac Biomarkers',
    'Total Cholesterol: 185 mg/dL (Normal), HDL: 48 mg/dL, LDL: 110 mg/dL, Triglycerides: 135 mg/dL, hs-CRP: 0.9 mg/L (Low Risk).',
    'Ready',
    '2026-08-01',
    '/api/reports/LAB-2026-88192/pdf'
  );

  insertReport.run(
    'LAB-2026-88193',
    patientUser.lastInsertRowid,
    'Hari Bahadur Shrestha',
    '+977-9845011223',
    'Dr. Anju Karki Thapa',
    'Gastroenterology',
    'Liver Function & Hepatitis Panel',
    'SGOT/AST: 24 U/L, SGPT/ALT: 28 U/L, Bilirubin Total: 0.8 mg/dL, HBsAg: Negative, Anti-HCV: Negative.',
    'Ready',
    '2026-07-28',
    '/api/reports/LAB-2026-88193/pdf'
  );

  // 8. Insert Appointments
  const insertAppointment = db.prepare(`
    INSERT INTO appointments (appointment_number, patient_id, patient_name, patient_phone, patient_email, department_id, doctor_id, doctor_name, appointment_date, appointment_time, reason, insurance_provider, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertAppointment.run(
    'APT-2026-0914',
    patientUser.lastInsertRowid,
    'Hari Bahadur Shrestha',
    '+977-9845011223',
    'patient@chitwansajha.org',
    cardioDept.lastInsertRowid,
    docUser1.lastInsertRowid,
    'Dr. Ramesh Chandra Adhikari',
    '2026-08-10',
    '10:30 AM',
    'Routine annual cardiac follow-up and ECG check.',
    'Government Health Insurance Board (HIB Nepal)',
    'Confirmed'
  );

  insertAppointment.run(
    'APT-2026-0915',
    patientUser.lastInsertRowid,
    'Hari Bahadur Shrestha',
    '+977-9845011223',
    'patient@chitwansajha.org',
    orthoDept.lastInsertRowid,
    docUser3.lastInsertRowid,
    'Dr. Bijay Raj Gurung',
    '2026-08-15',
    '02:00 PM',
    'Right knee mild stiffness after trekking.',
    'Shikhar Insurance Co.',
    'Pending'
  );

  // 9. Insert Blogs & News
  const insertBlog = db.prepare(`
    INSERT INTO blogs (title, slug, category, author_name, author_title, read_time, tags, content, image, date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertBlog.run(
    'Protecting Your Heart During Monsoon & High Altitude Travel in Nepal',
    'protecting-your-heart-monsoon-altitude-nepal',
    'Cardiology',
    'Dr. Ramesh Chandra Adhikari',
    'Senior Interventional Cardiologist',
    '6 min read',
    'Heart Care, Monsoon Health, Nepal Cardiology',
    'Humidity, temperature fluctuations, and altitude changes can significantly impact blood pressure and heart function. In this article, Dr. Ramesh Chandra Adhikari outlines essential precautions for cardiac patients living in or visiting the Terai and hilly regions of Nepal...',
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    '2026-07-25'
  );

  insertBlog.run(
    'Early Symptoms of Stroke & The Golden Hour of Emergency Care',
    'early-symptoms-stroke-golden-hour-emergency',
    'Neurology',
    'Dr. Sunita Sharma Banskota',
    'Chief Neurosurgeon',
    '5 min read',
    'Stroke Awareness, Emergency Medicine, Brain Health',
    'Stroke is a medical emergency where every minute counts. Reassuringly, quick administration of thrombolytic therapy within 4.5 hours can completely reverse ischemic stroke deficits. Learn how to recognize FAST symptoms instantly...',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    '2026-07-18'
  );

  const insertNews = db.prepare(`
    INSERT INTO news_events (title, type, slug, date, location, summary, content, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertNews.run(
    'Chitwan Sajha Hospital Launches Advanced 3T MRI & Biplane Cath Lab',
    'news',
    'launches-advanced-3t-mri-biplane-cath-lab',
    '2026-07-30',
    'Chitwan Sajha Hospital Auditorium, Bharatpur',
    'Chitwan Sajha Hospital inaugurates Central Nepal’s most technological diagnostic suite, featuring silent 3.0 Tesla MRI and Philips Azurion Cath Lab.',
    'In a landmark event attended by medical dignitaries, Mayor of Bharatpur, and healthcare leaders, Chitwan Sajha Hospital officially commissioned state-of-the-art diagnostic equipment...',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
  );

  insertNews.run(
    'Free Mega Community Cardiac & Diabetes Camp at Ratnanagar',
    'health_camp',
    'free-mega-community-cardiac-diabetes-camp-ratnanagar',
    '2026-08-12',
    'Ratnanagar Community Center, Chitwan',
    'Join our team of cardiologists and endocrinologists for free blood pressure, ECG, blood sugar testing, and specialist consultations.',
    'As part of Chitwan Sajha Hospital Corporate Social Responsibility (CSR), a 1-day free health camp will provide screening for over 1,000 citizens in Eastern Chitwan...',
    'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'
  );

  // 10. Insert Testimonials
  const insertTestimonial = db.prepare(`
    INSERT INTO testimonials (patient_name, location, rating, treatment, content, avatar, date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insertTestimonial.run(
    'Bishnu Maya Adhikari',
    'Narayangadh, Chitwan',
    5,
    'Angioplasty & Cardiac Care',
    'When my husband suffered severe chest pain at midnight, Chitwan Sajha Hospital’s Emergency & Cath Lab team performed emergency angioplasty within 30 minutes. We are deeply grateful to Dr. Ramesh and the nursing staff for saving his life.',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    '2026-07-20'
  );

  insertTestimonial.run(
    'Michael R. Stevens',
    'Queensland, Australia (International Medical Tourism)',
    5,
    'Total Knee Replacement Surgery',
    'I flew to Chitwan Nepal for my knee replacement. The hospital facilities, robotic accuracy, private room luxury, and post-op care rivaled top hospitals in Australia at one-third of the cost. Fantastic experience!',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    '2026-07-14'
  );

  // 11. Insert Gallery Items
  const insertGallery = db.prepare(`
    INSERT INTO gallery (title, category, type, url, caption)
    VALUES (?, ?, ?, ?, ?)
  `);

  insertGallery.run(
    'Biplane Cardiac Cath Lab',
    'Technology',
    'image',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    'Ultra-modern cardiac intervention suite operating 24/7 for acute coronary emergencies.'
  );

  insertGallery.run(
    'Laminar Air Flow Operation Theater',
    'Operation Theater',
    'image',
    'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    'Zero-infection sterile surgical suits with HEPA filtration.'
  );

  insertGallery.run(
    'Rooftop Air Ambulance Helipad',
    'Hospital',
    'image',
    'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80',
    'Direct trauma patient reception from emergency helicopter evacuations.'
  );

  console.log('🎉 Database seeding completed successfully!');
}

seedDatabase().catch((err) => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});
