// Global Application State Store with Full Bilingual Translation Engine (EN / NE)

class StateStore {
  constructor() {
    this.state = {
      user: JSON.parse(localStorage.getItem('cs_user')) || null,
      language: localStorage.getItem('cs_lang') || 'en',
      selectedDoctorForBooking: null,
      selectedPackageForBooking: null
    };
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  getLang() {
    return this.state.language;
  }

  setLanguage(lang) {
    this.state.language = lang;
    localStorage.setItem('cs_lang', lang);
    document.documentElement.setAttribute('lang', lang);
    this.notify();
  }

  toggleLanguage() {
    const nextLang = this.state.language === 'en' ? 'ne' : 'en';
    this.setLanguage(nextLang);
  }

  // Comprehensive Translation Dictionary
  t(key) {
    const lang = this.state.language;
    const dict = {
      // Top Bar & Emergency
      emergency_247: { en: "Emergency 24/7", ne: "इमर्जेन्सी २४/७" },
      opd_hours: { en: "OPD: Sun - Fri (8:00 AM - 7:00 PM)", ne: "OPD: आइत - शुक्र (बिहान ८:०० - बेलुकी ७:००)" },
      location_short: { en: "Bharatpur-10, Hulak Chowk, Nepal", ne: "भरतपुर-१०, हुलाक चोक, नेपाल" },
      book_appointment: { en: "Book Appointment", ne: "अपोइन्टमेन्ट लिनुहोस्" },
      call_emergency: { en: "Call Emergency", ne: "इमर्जेन्सी कल" },
      emergency_btn: { en: "Emergency 24/7", ne: "इमर्जेन्सी २४/७" },

      // Brand Title
      brand_title_p1: { en: "CHITWAN SAJHA", ne: "चितवन साझा" },
      brand_title_p2: { en: "HOSPITAL PVT. LTD.", ne: "अस्पताल प्रालि" },
      
      // Menu Items
      nav_home: { en: "Home", ne: "गृहपृष्ठ" },
      nav_about: { en: "About Us", ne: "हाम्रो बारेमा" },
      nav_overview: { en: "Overview & Facility", ne: "अस्पताल परिचय" },
      nav_chairman_msg: { en: "Chairman's Message", ne: "अध्यक्षको सन्देश" },
      nav_bod: { en: "Board of Directors", ne: "सञ्चालक समिति (BOD)" },
      nav_departments: { en: "Departments", ne: "चिकित्सा विभागहरू" },
      nav_doctors: { en: "Doctors", ne: "चिकित्सकहरू" },
      nav_contact: { en: "Contact & Location", ne: "सम्पर्क तथा ठेगाना" },

      // Hero Section
      hero_tagline: { 
        en: "General Hospital • Bharatpur-10, Hulak Chowk", 
        ne: "सामान्य अस्पताल • भरतपुर-१०, हुलाक चोक" 
      },
      hero_title: { 
        en: "Chitwan Sajha Hospital Pvt. Ltd.", 
        ne: "चितवन साझा अस्पताल प्रालि" 
      },
      hero_subtitle: { 
        en: "Providing compassionate, ethical, and high-quality general medical, surgical, diagnostic, and 24/7 emergency services for the community of Chitwan and Central Nepal.", 
        ne: "चितवन र मध्य नेपालका बासिन्दाहरूका लागि सर्वसुलभ, गुणस्तरीय र चौबीसै घण्टा भरपर्दो सामान्य चिकित्सा, शल्यक्रिया तथा आकस्मिक स्वास्थ्य सेवा।" 
      },
      
      // Facts Strip Tokens
      fact_beds_title: { en: "25 Inpatient Beds", ne: "२५ शैयाको सुविधा" },
      fact_beds_desc: { en: "Attentive IPD wards & private cabins", ne: "उत्कृष्ट भर्ना वार्ड तथा केबिन" },
      fact_emergency_title: { en: "24/7 Emergency", ne: "२४/७ इमर्जेन्सी" },
      fact_emergency_desc: { en: "Round-the-clock casualty & ambulance", ne: "चौबीसै घण्टा आकस्मिक सेवा" },
      fact_doctors_title: { en: "NMC Doctors", ne: "एनएमसी दर्ता चिकित्सक" },
      fact_doctors_desc: { en: "Board-certified specialist consultants", ne: "अनुभवी विशेषज्ञ टोली" },
      fact_diagnostics_title: { en: "Digital Diagnostics", ne: "डिजिटल ल्याब तथा USG" },
      fact_diagnostics_desc: { en: "Digital X-Ray & 3D/4D Color Doppler", ne: "डिजिटल एक्स-रे तथा भिडियो एक्स-रे" },

      // Section Titles & Subtitles
      depts_tag: { en: "Clinical Specialties", ne: "चिकित्सा सेवाहरू" },
      depts_title: { en: "Departments & Specialties", ne: "विभाग तथा चिकित्सा सेवाहरू" },
      depts_subtitle: { en: "Comprehensive outpatient and inpatient medical departments in Bharatpur-10.", ne: "भरतपुर-१० मा स्थित विभिन्न विशेषज्ञ चिकित्सा तथा शल्यक्रिया विभागहरू।" },
      
      why_tag: { en: "Trusted Local Care", ne: "हाम्रा विशेषताहरू" },
      why_title: { en: "Why Choose Chitwan Sajha Hospital?", ne: "चितवन साझा अस्पताल किन छान्ने?" },
      why_subtitle: { en: "Dedicated to delivering ethical, accessible, and high-quality medical services.", ne: "बिरामीको सुरक्षा, गुणस्तरीय उपचार र उत्तरदायी सेवामा समर्पित।" },
      
      doctors_tag: { en: "Medical Faculty", ne: "विशेषज्ञ चिकित्सकहरू" },
      doctors_title: { en: "Our Specialist Doctors", ne: "हाम्रा वरिष्ठ डाक्टरहरू" },
      doctors_subtitle: { en: "NMC-registered consultant physicians and surgeons available for OPD consultation.", ne: "ओपीडी परामर्श तथा शल्यक्रियाका लागि उपलब्ध वरिष्ठ चिकित्सकहरू।" },

      chairman_sec_tag: { en: "Leadership Vision", ne: "अध्यक्षको सन्देश" },
      chairman_sec_title: { en: "Message from the Chairman", ne: "अध्यक्षज्यूको हार्दिक सन्देश" },
      
      emergency_sec_title: { en: "24/7 Emergency Casualty Response", ne: "२४/७ आकस्मिक तथा इमर्जेन्सी सेवा" },
      emergency_sec_desc: { en: "For urgent medical triage, trauma care, acute pain, or immediate ambulance dispatch:", ne: "इमर्जेन्सी, दुर्घटना, आकस्मिक बिरामी तथा एम्बुलेन्सका लागि तत्काल सम्पर्क गर्नुहोस्:" },

      map_sec_tag: { en: "Hospital Location", ne: "अस्पतालको स्थान" },
      map_sec_title: { en: "Visit Chitwan Sajha Hospital", ne: "चितवन साझा अस्पताल" },
      map_sec_subtitle: { en: "Bharatpur-10, Hulak Chowk (Sajha Petro Pump, 10 Bypass Rd), Chitwan, Nepal.", ne: "भरतपुर-१०, हुलाक चोक (साझा पेट्रो पम्प, १० बाइपास रोड), चितवन।" },

      // Actions
      view_dept: { en: "Explore Department", ne: "विभाग हेर्नुहोस्" },
      book_opd: { en: "Book OPD Appointment", ne: "ओपीडी अपोइन्टमेन्ट" },
      view_bod_btn: { en: "View Board of Directors", ne: "सञ्चालक समिति हेर्नुहोस्" },
      open_maps: { en: "Open Directions in Google Maps", ne: "गुगल म्यापमा हेर्नुहोस्" }
    };

    if (dict[key] && dict[key][lang]) {
      return dict[key][lang];
    }
    return key;
  }

  showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container') || this.createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.padding = '0.75rem 1.25rem';
    toast.style.marginBottom = '0.5rem';
    toast.style.borderRadius = 'var(--radius-sm)';
    toast.style.background = 'var(--bg-card)';
    toast.style.border = '1px solid var(--border-color)';
    toast.style.color = type === 'danger' ? '#D32F2F' : type === 'success' ? '#15803D' : '#0F2C59';
    toast.style.fontWeight = '600';
    toast.style.fontSize = '0.875rem';
    toast.style.boxShadow = 'var(--shadow-md)';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '0.5rem';

    toast.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'danger' ? 'fa-circle-xmark' : 'fa-circle-info'}"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.style.position = 'fixed';
    container.style.top = '1.25rem';
    container.style.right = '1.25rem';
    container.style.zIndex = '3000';
    document.body.appendChild(container);
    return container;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

export const store = new StateStore();
