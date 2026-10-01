// Standalone Client-Side Data Service for Chitwan Sajha Hospital (25-Bed General Hospital)

const STORAGE_KEYS = {
  APPOINTMENTS: 'cs_hospital_appointments',
  INQUIRIES: 'cs_hospital_inquiries',
  TOKEN: 'cs_hospital_jwt',
  USER: 'cs_hospital_user'
};

// Official 8 Departments of Chitwan Sajha Hospital (25-Bed General Hospital)
const SEED_DEPARTMENTS = [
  {
    id: 1,
    name: "General Medicine",
    slug: "medicine",
    icon: "fa-stethoscope",
    short_desc: "Diagnosis and medical management of adult illnesses, hypertension, diabetes, and infectious diseases.",
    overview: "The Department of General Medicine at Chitwan Sajha Hospital provides comprehensive inpatient (IPD) and outpatient (OPD) medical care. Our team handles chronic disease management, seasonal fevers, metabolic conditions, and preventative adult care.",
    services: [
      "Hypertension & Cardiovascular Risk Management",
      "Type 1 & Type 2 Diabetes Care",
      "Thyroid & Endocrine Evaluation",
      "Respiratory & Bronchial Asthma Care",
      "Infectious Disease & Dengue Treatment",
      "Routine Health & Metabolic Checkups"
    ],
    equipment: [
      "Digital ECG Monitoring",
      "Multipara Patient Monitors",
      "24-Hour Nebulization & Oxygen Support"
    ],
    faqs: [
      { q: "What are the OPD timing for General Medicine?", a: "General Medicine OPD runs Sunday to Friday from 8:00 AM to 7:00 PM." }
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "General & Laparoscopic Surgery",
    slug: "surgery",
    icon: "fa-user-nurse",
    short_desc: "Elective and emergency surgical care, keyhole laparoscopic procedures, and wound care.",
    overview: "Equipped with clean modular operation theaters, our General & Laparoscopic Surgery department handles appendectomies, hernia repairs, gallbladder removals, and trauma surgery.",
    services: [
      "Laparoscopic Cholecystectomy (Gallbladder)",
      "Appendectomy (Keyhole & Open)",
      "Hernia Mesh Repair",
      "Hydrocele & Varicocele Operations",
      "Abscess Drainage & Minor Surgical Procedures",
      "Trauma & Wound Debridement"
    ],
    equipment: [
      "High-Definition Laparoscopy Tower",
      "Cautery & Electrosurgical Units",
      "Autoclave & Sterilization Suite"
    ],
    faqs: [
      { q: "Are laparoscopic surgeries available at Chitwan Sajha Hospital?", a: "Yes, we perform minimally invasive laparoscopic procedures for faster recovery." }
    ],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Radiology & Ultrasound",
    slug: "radiology",
    icon: "fa-x-ray",
    short_desc: "Diagnostic imaging services including 24/7 Digital X-Ray, Color Doppler, and 3D/4D Ultrasound.",
    overview: "Our Radiology department delivers fast, accurate diagnostic imaging to guide clinical diagnosis. Services are available round-the-clock for emergency cases.",
    services: [
      "High-Resolution Abdominal & Pelvic USG",
      "Color Doppler Vascular Studies",
      "Obstetric 3D/4D Fetal Anomaly Ultrasound",
      "24/7 Digital Chest & Skeletal X-Rays",
      "Small Parts & Thyroid Ultrasound",
      "Image-Guided Fluid Aspiration"
    ],
    equipment: [
      "Mindray High-End Color Doppler USG System",
      "500mA Fixed Digital X-Ray Unit",
      "Portable Mobile X-Ray Machine"
    ],
    faqs: [
      { q: "Is fasting required for abdominal ultrasound?", a: "Yes, 6 to 8 hours of fasting is recommended for optimal abdominal USG imaging." }
    ],
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Gynecology & Obstetrics",
    slug: "gynecology",
    icon: "fa-person-pregnant",
    short_desc: "Compassionate women's health care, antenatal screening, normal delivery, and cesarean sections.",
    overview: "Dedicated to female health, providing comprehensive care from routine Pap smears and antenatal care to labor management and gynecological surgeries.",
    services: [
      "Antenatal & Postnatal Care (ANC/PNC)",
      "Normal Normal & Assisted Deliveries",
      "Cesarean Section (C-Section)",
      "Hysterectomy & Ovarian Cyst Surgery",
      "Infertility Counseling & Screening",
      "Cervical Cancer Screening (Pap Smear)"
    ],
    equipment: [
      "Fetal Heart Rate Doppler",
      "Labor Delivery Beds & Resuscitator",
      "Gynecological Examination Suite"
    ],
    faqs: [
      { q: "Do you offer emergency obstetric care 24/7?", a: "Yes, our Gynecologists and surgical team are available 24/7 for emergency obstetric care." }
    ],
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Orthopedics & Trauma Care",
    slug: "orthopedics",
    icon: "fa-bone",
    short_desc: "Fracture reduction, bone casting, joint surgery, and road traffic accident trauma care.",
    overview: "Specialized care for fractures, joint dislocations, arthritis, back pain, and sports injuries with emergency fracture fixation.",
    services: [
      "Closed & Open Fracture Reduction",
      "Plaster Casting & Splinting",
      "Internal Fixation & Bone Plating",
      "Joint Pain & Arthritis Management",
      "Spine & Back Pain Clinic",
      "Tendon & Ligament Repair"
    ],
    equipment: [
      "C-Arm Image Intensifier Fluoroscopy",
      "Orthopedic Surgical Table",
      "Plaster Room & Immobilization Suite"
    ],
    faqs: [
      { q: "Do you treat emergency fracture cases?", a: "Yes, our emergency team provides immediate splinting, X-ray evaluation, and orthopedic surgery." }
    ],
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Anesthesia & Critical Care",
    slug: "anesthesia",
    icon: "fa-syringe",
    short_desc: "Pre-operative assessment, surgical anesthesia, pain management, and ICU monitoring.",
    overview: "Ensuring patient comfort and safety during surgical procedures while managing critical general care patients in our 25-bed hospital setup.",
    services: [
      "General Anesthesia for Major Surgeries",
      "Spinal & Epidural Regional Anesthesia",
      "Pre-Anesthetic Evaluation (PAC)",
      "Post-Operative Recovery Care",
      "Acute Pain Management",
      "Critical Patient Resuscitation"
    ],
    equipment: [
      "Modern Anesthesia Workstations",
      "Capnography & Pulse Oximetry",
      "Syringe Infusion Pumps & Defibrillators"
    ],
    faqs: [
      { q: "What is PAC evaluation before surgery?", a: "Pre-Anesthetic Clearance checks heart, lung, and blood parameters to ensure safe surgery." }
    ],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Pediatrics & Child Health",
    slug: "pediatrics",
    icon: "fa-baby",
    short_desc: "Infant and pediatric OPD, vaccination, growth monitoring, and newborn medical care.",
    overview: "Providing compassionate medical care for infants and children, including childhood immunizations, nutrition advice, and fever management.",
    services: [
      "General Pediatric OPD Consultations",
      "Newborn Care & Jaundice Screening",
      "Childhood Immunization & Vaccine Center",
      "Growth & Development Assessment",
      "Pediatric Asthma & Allergy Care",
      "Nutritional Counseling"
    ],
    equipment: [
      "Infant Radiant Warmers",
      "Phototherapy Unit for Jaundice",
      "Pediatric Nebulizers & Scales"
    ],
    faqs: [
      { q: "Which vaccines are available at the hospital?", a: "We provide Nepal National Immunization vaccines as well as optional recommended child vaccines." }
    ],
    image: "https://images.unsplash.com/photo-1502740479091-635887520276?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "24/7 Emergency & Casualty",
    slug: "emergency",
    icon: "fa-truck-medical",
    short_desc: "Round-the-clock emergency triage, acute medical stabilization, and ambulance response.",
    overview: "Chitwan Sajha Hospital operates a 24-hour emergency casualty unit at Bharatpur-10, Hulak Chowk equipped for trauma, acute chest pain, poisoning, and surgical emergencies.",
    services: [
      "24/7 Emergency Triage & Resuscitation",
      "Trauma & Road Traffic Accident Care",
      "Acute Poisoning & Snakebite First Aid",
      "Mobile Ambulance Dispatch (+977 981-9283223)",
      "Minor Emergency Procedures & Stitches",
      "Nebulization & Oxygen Therapy"
    ],
    equipment: [
      "Multipara Emergency Monitors",
      "Zoll Biphasic Defibrillator",
      "Suction & Oxygen Resuscitation Units"
    ],
    faqs: [
      { q: "How can I contact the emergency line?", a: "Call +977 (56) 520111 or +977 981-9283223 immediately for 24/7 emergency response." }
    ],
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
  }
];

const SEED_DOCTORS = [
  {
    id: 1,
    name: "Dr. Ramesh Chandra Adhikari",
    slug: "dr-ramesh-chandra-adhikari",
    nmc_no: "NMC-5421",
    qualification: "MBBS, MD (Internal Medicine)",
    experience: "14+ Years Experience",
    specialization: "Consultant Physician & Medical Specialist",
    department_id: 1,
    department_name: "General Medicine",
    availability: {
      "Sun": ["09:00 AM - 01:00 PM", "04:00 PM - 07:00 PM"],
      "Mon": ["09:00 AM - 01:00 PM", "04:00 PM - 07:00 PM"],
      "Tue": ["09:00 AM - 01:00 PM"],
      "Wed": ["09:00 AM - 01:00 PM", "04:00 PM - 07:00 PM"],
      "Thu": ["09:00 AM - 01:00 PM", "04:00 PM - 07:00 PM"],
      "Fri": ["09:00 AM - 01:00 PM"]
    },
    languages: "Nepali, English, Hindi",
    bio: "Dr. Ramesh Chandra Adhikari is a senior consultant physician providing care for hypertension, diabetes, respiratory conditions, and internal medicine illnesses at Chitwan Sajha Hospital.",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    price_nrs: 600,
    rating: 4.9
  },
  {
    id: 2,
    name: "Dr. Sunita Sharma Banskota",
    slug: "dr-sunita-sharma-banskota",
    nmc_no: "NMC-6814",
    qualification: "MBBS, MS (General Surgery)",
    experience: "12+ Years Experience",
    specialization: "Consultant General & Laparoscopic Surgeon",
    department_id: 2,
    department_name: "General & Laparoscopic Surgery",
    availability: {
      "Sun": ["10:00 AM - 02:00 PM"],
      "Mon": ["10:00 AM - 02:00 PM", "05:00 PM - 07:30 PM"],
      "Tue": ["10:00 AM - 02:00 PM"],
      "Thu": ["10:00 AM - 02:00 PM", "05:00 PM - 07:30 PM"],
      "Fri": ["10:00 AM - 02:00 PM"]
    },
    languages: "Nepali, English",
    bio: "Dr. Sunita Sharma specializes in laparoscopic gallbladder removal, hernia repairs, appendectomies, and emergency surgical care.",
    photo: "https://images.unsplash.com/photo-1594824813570-848242114463?auto=format&fit=crop&w=400&q=80",
    price_nrs: 700,
    rating: 4.95
  },
  {
    id: 3,
    name: "Dr. Bijay Raj Gurung",
    slug: "dr-bijay-raj-gurung",
    nmc_no: "NMC-7290",
    qualification: "MBBS, MS (Orthopedics)",
    experience: "13+ Years Experience",
    specialization: "Consultant Orthopedic & Trauma Surgeon",
    department_id: 5,
    department_name: "Orthopedics & Trauma Care",
    availability: {
      "Sun": ["08:30 AM - 01:00 PM"],
      "Mon": ["08:30 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      "Wed": ["08:30 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
      "Thu": ["08:30 AM - 01:00 PM"],
      "Fri": ["08:30 AM - 01:00 PM"]
    },
    languages: "Nepali, English, Gurung",
    bio: "Dr. Bijay Raj Gurung handles bone fracture management, joint disslocation reduction, plaster immobilizations, and trauma care.",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    price_nrs: 700,
    rating: 4.88
  },
  {
    id: 4,
    name: "Dr. Anju Karki Thapa",
    slug: "dr-anju-karki-thapa",
    nmc_no: "NMC-8105",
    qualification: "MBBS, MD (Obstetrics & Gynecology)",
    experience: "10+ Years Experience",
    specialization: "Consultant Gynecologist & Obstetrician",
    department_id: 4,
    department_name: "Gynecology & Obstetrics",
    availability: {
      "Sun": ["09:00 AM - 02:00 PM"],
      "Tue": ["09:00 AM - 02:00 PM"],
      "Wed": ["09:00 AM - 02:00 PM"],
      "Thu": ["09:00 AM - 02:00 PM"]
    },
    languages: "Nepali, English, Hindi",
    bio: "Dr. Anju Karki Thapa provides comprehensive women's healthcare, pregnancy care, normal deliveries, and cesarean operations.",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    price_nrs: 650,
    rating: 4.87
  },
  {
    id: 5,
    name: "Dr. Pradeep Kumar Mahato",
    slug: "dr-pradeep-kumar-mahato",
    nmc_no: "NMC-9432",
    qualification: "MBBS, MD (Pediatrics)",
    experience: "9+ Years Experience",
    specialization: "Consultant Pediatrician",
    department_id: 7,
    department_name: "Pediatrics & Child Health",
    availability: {
      "Sun": ["08:00 AM - 12:00 PM"],
      "Mon": ["08:00 AM - 12:00 PM", "04:00 PM - 07:00 PM"],
      "Tue": ["08:00 AM - 12:00 PM"],
      "Thu": ["08:00 AM - 12:00 PM"],
      "Fri": ["08:00 AM - 12:00 PM"]
    },
    languages: "Nepali, English, Maithili",
    bio: "Dr. Pradeep Mahato provides newborn checkups, child vaccination, growth monitoring, and pediatric medical treatment.",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
    price_nrs: 600,
    rating: 4.92
  }
];

// Board of Directors (BOD) Dataset
const SEED_BOD = [
  {
    id: 1,
    name: "Dr. Nawaraj Lamichhane",
    role: "Chairman",
    qualifications: "BE (Civil), M.Sc",
    bio: "Visionary leader with extensive experience in regional healthcare infrastructure and corporate management in Central Nepal.",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Dr. Ramesh Chandra Adhikari",
    role: "Vice-Chairman & Consultant Physician",
    qualifications: "MBBS, MD (Internal Medicine)",
    bio: "Pioneer physician guiding medical quality assurance, clinical standards, and doctor welfare at Chitwan Sajha Hospital.",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Dr. Bijay Raj Gurung",
    role: "Managing Director",
    qualifications: "MBBS, MS (Orthopedics)",
    bio: "Oversees hospital operations, medical equipment procurement, and emergency response logistics.",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "Dr. Sunita Sharma Banskota",
    role: "Director - Clinical Operations",
    qualifications: "MBBS, MS (General Surgery)",
    bio: "Directs surgical theater scheduling, infection control protocols, and nursing care standards.",
    photo: "https://images.unsplash.com/photo-1594824813570-848242114463?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    name: "Dr. Sarita Karki",
    role: "Director - Hospital Administration",
    qualifications: "MD, MHA (Hospital Administration)",
    bio: "Manages patient experience, outpatient department (OPD) efficiency, and regulatory compliance.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    name: "Advocate Ram Krishna Shrestha",
    role: "Company Secretary & Legal Counsel",
    qualifications: "LL.M, Corporate Law",
    bio: "Advises the Board on institutional governance, statutory compliance, and corporate legal matters.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  }
];

const SEED_CHAIRMAN_MESSAGE = {
  chairman_name: "Dr. Nawaraj Lamichhane",
  title: "Chairman, Board of Directors",
  photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  message_en: `Welcome to Chitwan Sajha Hospital Pvt. Ltd. Founded at Bharatpur-10, Hulak Chowk, our institution was established with a singular mission: to provide high-quality, compassionate, and affordable general medical and surgical care for the families of Chitwan and surrounding districts.

As a dedicated 25-bed general hospital, we believe that world-class healthcare begins with integrity, patient comfort, and reliable diagnostic accuracy. We have equipped our facility with modern 24/7 Digital X-Ray, Color Doppler Ultrasound, clean modular surgical suites, and round-the-clock emergency casualty care.

Our esteemed medical faculty comprises board-certified consultants across General Medicine, Surgery, Pediatrics, Gynecology, Orthopedics, and Anesthesia. Every member of our team is committed to treating each patient with empathy, respect, and clinical precision.

We sincerely thank the community of Bharatpur and Bagmati Province for trusting Chitwan Sajha Hospital as your partner in health and healing.`,
  message_ne: `चितवन साझा अस्पताल प्रालिमा यहाँहरूलाई हार्दिक स्वागत छ। भरतपुर-१०, हुलाक चोकमा स्थित यस अस्पताल सर्वसुलभ, गुणस्तरीय र उत्तरदायी स्वास्थ्य सेवा प्रदान गर्ने उद्देश्यका साथ स्थापना भएको हो।

२५ शैयाको यो सामान्य अस्पतालमा आधुनिक डिजिटल एक्स-रे, भिडियो एक्स-रे (USG), २४ सै घण्टा इमर्जेन्सी सेवा र आधुनिक अपरेसन थिएटर उपलब्ध छ। हाम्रो अनुभवी चिकित्सक टोली यहाँहरूको सेवामा सधैं समर्पित छ।`
};

const SEED_PACKAGES = [
  {
    id: 1,
    title: "General Health Screening",
    slug: "general-health-screening",
    category: "General",
    price_nrs: 2500,
    original_price_nrs: 3500,
    tests_count: 22,
    is_popular: true,
    description: "Routine health audit including blood count, blood sugar, renal function, and urinalysis.",
    includes: [
      "Complete Blood Count (CBC)",
      "Fasting Blood Sugar (FBS)",
      "Renal Function Test (Urea & Creatinine)",
      "Urine Routine Examination",
      "Digital Chest X-Ray",
      "Medical OPD Consultation"
    ]
  },
  {
    id: 2,
    title: "Diabetic & Metabolic Package",
    slug: "diabetic-metabolic",
    category: "Metabolic",
    price_nrs: 3200,
    original_price_nrs: 4500,
    tests_count: 18,
    is_popular: false,
    description: "Specialized monitoring package for diabetic and hypertensive patients.",
    includes: [
      "HbA1c Glycated Hemoglobin",
      "Fasting & Post-Prandial Blood Sugar",
      "Lipid Profile Test",
      "Serum Creatinine & Urine Microalbumin",
      "ECG (12-Lead)",
      "Consultant Physician OPD"
    ]
  },
  {
    id: 3,
    title: "Women Wellness Checkup",
    slug: "women-wellness",
    category: "Women",
    price_nrs: 3800,
    original_price_nrs: 5000,
    tests_count: 24,
    is_popular: false,
    description: "Health package for females including pelvic ultrasound, blood profile, and gynecologist OPD.",
    includes: [
      "Pelvic Ultrasound (USG)",
      "Complete Blood Count & Hemoglobin",
      "Thyroid Stimulating Hormone (TSH)",
      "Urine Culture & Sensitivity",
      "Gynecologist Consultation"
    ]
  }
];

const SEED_APPOINTMENTS = [];

function getStoredAppointments() {
  const stored = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored appointments', e);
    }
  }
  return SEED_APPOINTMENTS;
}

function saveAppointments(apts) {
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(apts));
}

export const api = {
  getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN) || '';
  },

  setToken(token) {
    if (token) localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    else localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  async login(email, password) {
    const role = (email && email.includes('admin')) ? 'admin' : 'patient';
    const user = {
      id: Date.now(),
      name: role === 'admin' ? 'Hospital Admin' : 'Patient',
      email: email,
      role: role
    };
    const token = `token_${Date.now()}`;
    this.setToken(token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return { success: true, token, user };
  },

  async getMe() {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (storedUser) return { success: true, user: JSON.parse(storedUser) };
    return { success: false, user: null };
  },

  async logout() {
    this.setToken(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    return { success: true };
  },

  async getDoctors(params = {}) {
    let doctors = [...SEED_DOCTORS];
    const { department, search } = params;

    if (department) {
      doctors = doctors.filter(d => String(d.department_id) === String(department));
    }
    if (search) {
      const q = search.toLowerCase();
      doctors = doctors.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.specialization.toLowerCase().includes(q) || 
        d.department_name.toLowerCase().includes(q)
      );
    }
    return { success: true, doctors };
  },

  async getDoctorBySlug(slug) {
    const doc = SEED_DOCTORS.find(d => d.slug === slug || String(d.id) === String(slug));
    if (!doc) throw new Error('Doctor profile not found.');
    return { success: true, doctor: doc };
  },

  async getDepartments() {
    return { success: true, departments: SEED_DEPARTMENTS };
  },

  async getDepartmentBySlug(slug) {
    const dept = SEED_DEPARTMENTS.find(d => d.slug === slug || String(d.id) === String(slug));
    if (!dept) throw new Error('Department not found.');
    const deptDocs = SEED_DOCTORS.filter(doc => String(doc.department_id) === String(dept.id));
    return { success: true, department: { ...dept, doctors: deptDocs } };
  },

  async getBoardOfDirectors() {
    return { success: true, bod: SEED_BOD };
  },

  async getChairmanMessage() {
    return { success: true, data: SEED_CHAIRMAN_MESSAGE };
  },

  async bookAppointment(data) {
    const apts = getStoredAppointments();
    const newId = apts.length > 0 ? Math.max(...apts.map(a => Number(a.id) || 0)) + 1 : 1;
    const aptNum = `CSH-${Math.floor(10000 + Math.random() * 90000)}`;

    const newApt = {
      id: newId,
      appointment_number: aptNum,
      patient_name: data.patient_name,
      patient_phone: data.patient_phone,
      patient_email: data.patient_email || '',
      department_id: data.department_id,
      doctor_id: data.doctor_id,
      doctor_name: data.doctor_name || 'Specialist Doctor',
      appointment_date: data.appointment_date,
      appointment_time: data.appointment_time || 'Morning OPD',
      reason: data.reason || 'General OPD Consultation',
      status: 'Confirmed'
    };

    apts.unshift(newApt);
    saveAppointments(apts);
    return { success: true, appointment: newApt };
  },

  async getPackages() {
    return { success: true, packages: SEED_PACKAGES };
  },

  async sendInquiry(data) {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch (e) {
      // Fallback to local storage if running offline/static mode
    }

    const inquiries = JSON.parse(localStorage.getItem(STORAGE_KEYS.INQUIRIES) || '[]');
    inquiries.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    return { success: true, message: 'Inquiry received' };
  }
};
