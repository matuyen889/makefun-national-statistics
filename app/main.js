import { renderOverview, renderEconomy, renderDemographics, renderLabour, renderEnergy } from './views.js';
import { NATIONAL_STATS } from './data.js';

// Client-side Hash Router for National Statistics Portal
const routes = {
  '#/': renderOverview,
  '#/economy': renderEconomy,
  '#/demographics': renderDemographics,
  '#/labour': renderLabour,
  '#/energy': renderEnergy,
};

function navigate() {
  const hash = window.location.hash || '#/';
  const app = document.getElementById('app');
  const viewFn = routes[hash] || renderOverview;

  app.innerHTML = viewFn();

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// Live Search Filter across all indicators
function setupSearch() {
  const input = document.getElementById('indicator-search');
  if (!input) return;

  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.kpi-card');
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (!q || text.includes(q)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Theme Switcher (Default: Institutional Dark)
function setupTheme() {
  const btn = document.getElementById('theme-toggle');
  const current = localStorage.getItem('nsb-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', current);

  btn?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('nsb-theme', next);
  });
}

// Official CSV Data Export
function setupExport() {
  const btn = document.getElementById('export-btn');
  btn?.addEventListener('click', () => {
    let csv = "Indicator,Value,Period,Detail,Source\n";
    NATIONAL_STATS.kpis.forEach(k => {
      csv += `"${k.label}","${k.value}","${k.change}","${k.detail}","${k.source}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Veridia_National_Statistics_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

// Initialize on DOM ready
window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  setupSearch();
  setupExport();
  navigate();
  window.siteReady = true;
});
