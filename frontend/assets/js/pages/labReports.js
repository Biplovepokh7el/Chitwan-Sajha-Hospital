import { api } from '../api.js';

export async function renderLabReportsPage() {
  return `
    <div class="page-header-banner">
      <div class="container">
        <h1 class="page-header-title">Online Diagnostic Reports</h1>
        <div class="breadcrumbs">
          <a href="/" data-link>Home</a> / <span>Lab Reports</span>
        </div>
      </div>
    </div>

    <section class="section-padding">
      <div class="container" style="max-width: 680px;">
        <div class="glass-panel" style="padding: 2rem; text-align: center; margin-bottom: 2.5rem;">
          <div style="width: 56px; height: 56px; background: rgba(0, 168, 143, 0.1); color: var(--accent-teal); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 1.25rem auto;">
            <i class="fa-solid fa-file-waveform"></i>
          </div>
          <h2 style="font-size: 1.4rem; font-weight: 700; color: var(--primary-navy); margin-bottom: 0.4rem;">Retrieve Diagnostic Report</h2>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Enter your Report Code (e.g., LAB-2026-88192) or registered phone number to download your official PDF report.</p>

          <form id="lab-report-search-form" style="display: flex; gap: 0.5rem;">
            <input type="text" id="report-query-input" class="form-control" placeholder="Report Code or Mobile No..." value="LAB-2026-88192" required>
            <button type="submit" class="btn btn-primary" style="white-space: nowrap;"><i class="fa-solid fa-magnifying-glass"></i> Search</button>
          </form>
        </div>

        <div id="lab-report-results-container"></div>
      </div>
    </section>
  `;
}
