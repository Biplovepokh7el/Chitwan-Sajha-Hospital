import { api } from '../api.js';

export async function renderPackagesPage() {
  const res = await api.getPackages();
  const packages = res.packages || [];

  return `
    <div class="page-header-banner">
      <div class="container">
        <h1 class="page-header-title">Preventive Health Checkup Packages</h1>
        <div class="breadcrumbs">
          <a href="/" data-link>Home</a> / <span>Health Packages</span>
        </div>
      </div>
    </div>

    <section class="section-padding">
      <div class="container">
        <div class="card-grid">
          ${packages.map(pkg => `
            <a href="/appointment?pkg=${pkg.id}" data-link class="pkg-card ${pkg.is_popular ? 'popular' : ''}">
              ${pkg.is_popular ? '<span class="pkg-popular-badge">RECOMMENDED</span>' : ''}
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase;">${pkg.category} Category</div>
              <h3 style="font-size: 1.25rem; font-weight: 700; margin: 0.2rem 0 0.5rem 0; color: var(--primary-navy);">${pkg.title}</h3>
              <p style="font-size: 0.825rem; color: var(--text-muted); margin-bottom: 0.85rem;">${pkg.description || 'Comprehensive health evaluation.'}</p>
              
              <div class="pkg-price" style="font-size: 1.8rem; margin-bottom: 0.85rem; color: var(--primary-navy);">
                NPR ${pkg.price_nrs.toLocaleString()}
                ${pkg.original_price_nrs ? `<span style="text-decoration: line-through; color: var(--text-muted); font-size: 0.9rem; margin-left: 0.4rem;">NPR ${pkg.original_price_nrs.toLocaleString()}</span>` : ''}
              </div>

              <div style="font-weight: 600; font-size: 0.85rem; color: var(--accent-teal); margin-bottom: 0.85rem;">
                <i class="fa-solid fa-list-check"></i> ${pkg.tests_count} Diagnostic Tests Included:
              </div>

              <ul style="list-style: none; font-size: 0.825rem; margin-bottom: 1.5rem; flex-grow: 1;">
                ${(pkg.includes || []).map(item => `
                  <li style="margin-bottom: 0.35rem; display: flex; align-items: flex-start; gap: 0.4rem;">
                    <i class="fa-solid fa-check" style="color: var(--accent-teal); margin-top: 0.2rem; font-size: 0.75rem;"></i>
                    <span>${item}</span>
                  </li>
                `).join('')}
              </ul>

              <div class="btn btn-primary" style="width: 100%; font-size: 0.85rem; text-align: center; margin-top: auto;">
                <i class="fa-solid fa-calendar-check"></i> Book Package Checkup
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
