import { renderHome } from './pages/home.js';
import { renderDoctors, renderDoctorDetail } from './pages/doctors.js';
import { renderDepartments, renderDepartmentDetail } from './pages/departments.js';
import { renderAppointmentPage } from './pages/appointment.js';
import { renderLabReportsPage } from './pages/labReports.js';
import { renderPackagesPage } from './pages/packages.js';
import { renderMedicalTourismPage } from './pages/medicalTourism.js';
import { renderAboutPage, renderChairmanMessage, renderBoardOfDirectors } from './pages/about.js';
import { renderContactPage } from './pages/contact.js';
import { renderAdminDashboard } from './pages/admin.js';

export const routes = {
  '/': renderHome,
  '/about': renderAboutPage,
  '/chairman-message': renderChairmanMessage,
  '/board-of-directors': renderBoardOfDirectors,
  '/departments': renderDepartments,
  '/department/:slug': renderDepartmentDetail,
  '/doctors': renderDoctors,
  '/doctor/:slug': renderDoctorDetail,
  '/appointment': renderAppointmentPage,
  '/health-packages': renderPackagesPage,
  '/medical-tourism': renderMedicalTourismPage,
  '/lab-reports': renderLabReportsPage,
  '/contact': renderContactPage,
  '/admin': renderAdminDashboard
};


export class Router {
  constructor(routes) {
    this.routes = routes;
    this.appElement = document.getElementById('app');

    window.addEventListener('popstate', () => this.handleRoute());

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-link]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        this.navigate(href);
      }
    });
  }

  navigate(path) {
    window.history.pushState(null, '', path);
    this.handleRoute();
  }

  async handleRoute() {
    const path = window.location.pathname;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let match = null;
    let params = {};

    for (const [routePattern, handler] of Object.entries(this.routes)) {
      const paramNames = [];
      const regexPath = routePattern.replace(/:([^/]+)/g, (_, name) => {
        paramNames.push(name);
        return '([^/]+)';
      });

      const regex = new RegExp(`^${regexPath}$`);
      const result = path.match(regex);

      if (result) {
        match = handler;
        paramNames.forEach((name, index) => {
          params[name] = result[index + 1];
        });
        break;
      }
    }

    if (match) {
      this.appElement.innerHTML = '<div style="padding: 5rem; text-align: center;"><i class="fa-solid fa-spinner fa-spin fa-2x" style="color: var(--accent-teal);"></i></div>';
      try {
        const content = await match(params);
        this.appElement.innerHTML = content;
      } catch (err) {
        console.error('Route render error:', err);
        this.render404();
      }
    } else {
      this.render404();
    }
  }

  render404() {
    this.appElement.innerHTML = `
      <section class="section-padding text-center">
        <div class="container">
          <h1 style="font-size: 5rem; color: var(--accent-teal); font-weight: 800; margin: 0;">404</h1>
          <h2 class="section-title">Page Not Found</h2>
          <p class="section-subtitle">The medical page or resource you requested could not be located.</p>
          <a href="/" data-link class="btn btn-primary"><i class="fa-solid fa-house"></i> Return to Homepage</a>
        </div>
      </section>
    `;
  }
}
