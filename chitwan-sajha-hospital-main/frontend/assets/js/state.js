// Global Application State Store with Bilingual Translation Engine (EN / NE)

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

  // Translation Helper Dictionary
  t(key) {
    const lang = this.state.language;
    const dict = {
      // Top Bar & Emergency
      emergency_247: { en: "Emergency 24/7", ne: "इमर्जेन्सी २४/७" },
      opd_hours: { en: "OPD: Sun - Fri (8:00 AM - 7:00 PM)", ne: "OPD: आइत - शुक्र (बिहान ८:०० - बेलुकी ७:००)" },
      location_short: { en: "Bharatpur-10, Hulak Chowk, Nepal", ne: "भरतपुर-१०, हुलाक चोक, नेपाल" },
      book_appointment: { en: "Book Appointment", ne: "अपोइन्टमेन्ट लिनुहोस्" },
      call_emergency: { en: "Call Emergency", ne: "इमर्जेन्सी कल" },
      
      // Menu Items
      nav_home: { en: "Home", ne: "गृहपृष्ठ" },
      nav_about: { en: "About Us", ne: "हाम्रो बारेमा" },
      nav_overview: { en: "Overview & Facility", ne: "अस्पताल परिचय" },
      nav_chairman_msg: { en: "Chairman's Message", ne: "अध्यक्षको सन्देश" },
      nav_bod: { en: "Board of Directors", ne: "सञ्चालक समिति (BOD)" },
      nav_departments: { en: "Departments", ne: "विभागहरू" },
      nav_doctors: { en: "Doctors", ne: "चिकित्सकहरू" },
      nav_packages: { en: "Health Packages", ne: "स्वास्थ्य प्याकेज" },
      nav_contact: { en: "Contact & Location", ne: "सम्पर्क तथा ठेगाना" },

      // Hospital Highlights
      hospital_tagline: { 
        en: "25-Bed General Hospital • Bharatpur-10, Hulak Chowk", 
        ne: "२५ शैयाको सामान्य अस्पताल • भरतपुर-१०, हुलाक चोक" 
      },
      hero_title: { 
        en: "Chitwan Sajha Hospital", 
        ne: "चितवन साझा अस्पताल प्रालि" 
      },
      hero_subtitle: { 
        en: "Providing compassionate, ethical, and high-quality general medical, surgical, and 24/7 emergency services for the community of Chitwan and Central Nepal.", 
        ne: "चितवन र आसपासका बासिन्दाहरूका लागि सर्वसुलभ, गुणस्तरीय र चौबीसै घण्टा भरपर्दो स्वास्थ्य सेवा।" 
      },
      why_choose_us: { en: "Why Choose Chitwan Sajha Hospital?", ne: "चितवन साझा अस्पताल किन छान्ने?" },
      our_departments: { en: "Our Medical Departments", ne: "चिकित्सा विभागहरू" },
      our_doctors: { en: "Our Specialist Doctors", ne: "हाम्रा विशेषज्ञ चिकित्सकहरू" },
      emergency_block_title: { en: "24/7 Emergency Casualty Response", ne: "२४/७ आकस्मिक तथा इमर्जेन्सी सेवा" }
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
    toast.style.color = type === 'danger' ? '#DC2626' : type === 'success' ? '#15803D' : '#0F2C59';
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
