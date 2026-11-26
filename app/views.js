import { NATIONAL_STATS } from './data.js';
import { createAreaChart, createPyramidChart, createGroupedBarChart, createDonutChart } from './charts.js';

export function renderOverview() {
  const kpiCards = NATIONAL_STATS.kpis.map(k => `
    <div class="kpi-card ${k.color}" data-kpi-id="${k.id}">
      <span class="kpi-label">${k.label}</span>
      <span class="kpi-val">${k.value}</span>
      <div class="kpi-change ${k.trend}">
        <span>${k.change}</span>
      </div>
      <small style="color: var(--text-muted); font-size: 0.72rem;">${k.detail}</small>
    </div>
  `).join("");

  const gdpChart = createAreaChart({
    data: NATIONAL_STATS.gdpSeries,
    xKey: "year",
    yKey: "value",
    color: "#1d4ed8",
    unit: "B",
    yMin: 1800
  });

  const cpiChart = createAreaChart({
    data: NATIONAL_STATS.inflationSeries,
    xKey: "month",
    yKey: "cpi",
    color: "#059669",
    unit: "%",
    yMin: 0
  });

  return `
    <section class="view-header">
      <div class="view-title-group">
        <h1>National Economic & Social Dashboard</h1>
        <p>Key headline indicators and macroeconomic developments for ${NATIONAL_STATS.country} (${NATIONAL_STATS.lastUpdated})</p>
      </div>
      <div class="filter-bar">
        <button class="filter-chip active" data-period="all">All Available</button>
        <button class="filter-chip" data-period="5y">5-Year Trend</button>
        <button class="filter-chip" data-period="1y">Latest 12M</button>
      </div>
    </section>

    <!-- Top KPI Grid -->
    <section class="kpi-grid">
      ${kpiCards}
    </section>

    <!-- Main Charts Section -->
    <section class="dashboard-grid">
      <div class="chart-card">
        <div class="chart-card-header">
          <div class="chart-title-group">
            <h2>Gross Domestic Product (GDP Trend)</h2>
            <span>Annual real GDP in Billion USD (2016 - 2026)</span>
          </div>
          <span style="font-weight: 700; color: var(--primary); font-size: 0.9rem;">+3.2% Annual Growth</span>
        </div>
        <div class="chart-container">
          ${gdpChart}
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-card-header">
          <div class="chart-title-group">
            <h2>Consumer Price Inflation (CPI)</h2>
            <span>Headline inflation rate monthly path</span>
          </div>
          <span style="font-weight: 700; color: var(--accent-green); font-size: 0.9rem;">2.4% Target Aligned</span>
        </div>
        <div class="chart-container">
          ${cpiChart}
        </div>
      </div>
    </section>

    <!-- Demographics & Trade Quick Preview -->
    <section class="dashboard-grid">
      <div class="chart-card">
        <div class="chart-card-header">
          <div class="chart-title-group">
            <h2>Population Pyramid Structure</h2>
            <span>Age-sex distribution (Thousands of inhabitants)</span>
          </div>
          <a href="#/demographics" style="color: var(--primary); font-size: 0.85rem; font-weight: 600; text-decoration: none;">View Detailed Cohorts →</a>
        </div>
        <div class="chart-container">
          ${createPyramidChart({ data: NATIONAL_STATS.pyramidData.slice(0, 10), height: 260 })}
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-card-header">
          <div class="chart-title-group">
            <h2>Sectoral Composition of GDP</h2>
            <span>Share of gross output by industry</span>
          </div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-around; gap: 16px; flex-wrap: wrap;">
          ${createDonutChart({ data: NATIONAL_STATS.gdpSectors, valKey: "share", labelKey: "sector" })}
          <div class="chart-legend" style="flex-direction: column; gap: 8px;">
            ${NATIONAL_STATS.gdpSectors.map(s => `
              <div class="legend-item">
                <span class="legend-dot" style="background: ${s.color};"></span>
                <span style="font-size: 0.82rem;">${s.sector}: <strong>${s.share}%</strong></span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderEconomy() {
  const tradeChart = createGroupedBarChart({
    data: NATIONAL_STATS.tradeBalance,
    xKey: "year",
    yKey1: "exports",
    yKey2: "imports",
    label1: "Exports",
    label2: "Imports"
  });

  const commodityRows = NATIONAL_STATS.topCommodities.map(c => `
    <tr>
      <td><strong>${c.item}</strong></td>
      <td><span class="filter-chip" style="font-size: 0.72rem; padding: 2px 6px;">${c.type}</span></td>
      <td><strong>${c.value}</strong></td>
      <td>${c.share}</td>
      <td style="color: var(--accent-green); font-weight: 600;">Expanding</td>
    </tr>
  `).join("");

  return `
    <section class="view-header">
      <div class="view-title-group">
        <h1>Macroeconomics & International Trade</h1>
        <p>National accounts, balance of payments, export dynamics and industry output breakdown</p>
      </div>
    </section>

    <section class="dashboard-grid">
      <div class="chart-card">
        <div class="chart-card-header">
          <div class="chart-title-group">
            <h2>International Merchandise Trade Balance</h2>
            <span>Total Exports vs Imports in Billion USD (2021 - 2026)</span>
          </div>
          <div class="chart-legend">
            <div class="legend-item"><span class="legend-dot" style="background: #059669;"></span> Exports</div>
            <div class="legend-item"><span class="legend-dot" style="background: #0284c7;"></span> Imports</div>
          </div>
        </div>
        <div class="chart-container">
          ${tradeChart}
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-card-header">
          <div class="chart-title-group">
            <h2>Key Export & Import Categories</h2>
            <span>Top traded commodity classes by annual value</span>
          </div>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Flow</th>
                <th>Value</th>
                <th>Share</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${commodityRows}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;
}

export function renderDemographics() {
  return `
    <section class="view-header">
      <div class="view-title-group">
        <h1>Population Structure & Demographics</h1>
        <p>Age-sex cohorts, demographic transition, life expectancy and dependency ratios</p>
      </div>
    </section>

    <div class="chart-card">
      <div class="chart-card-header">
        <div class="chart-title-group">
          <h2>National Population Pyramid (2026 Census Cohorts)</h2>
          <span>Male vs Female distribution by 5-year age intervals</span>
        </div>
        <div class="chart-legend">
          <div class="legend-item"><span class="legend-dot" style="background: #2563eb;"></span> Male (49.1%)</div>
          <div class="legend-item"><span class="legend-dot" style="background: #ec4899;"></span> Female (50.9%)</div>
        </div>
      </div>
      <div class="chart-container">
        ${createPyramidChart({ data: NATIONAL_STATS.pyramidData, height: 420 })}
      </div>
    </div>
  `;
}

export function renderLabour() {
  const regionRows = NATIONAL_STATS.regionalLabour.map(r => `
    <tr>
      <td><strong>${r.region}</strong></td>
      <td><span style="font-weight: 700; color: ${r.rate < 4 ? 'var(--accent-green)' : 'var(--accent-amber)'};">${r.rate}%</span></td>
      <td>${r.workforce}</td>
      <td><span style="color: var(--accent-green); font-size: 0.85rem;">+2.4% YoY</span></td>
      <td>Full Employment Zone</td>
    </tr>
  `).join("");

  return `
    <section class="view-header">
      <div class="view-title-group">
        <h1>Labour Market, Employment & Wages</h1>
        <p>Workforce participation, regional unemployment spreads and real wage growth</p>
      </div>
    </section>

    <div class="chart-card">
      <div class="chart-card-header">
        <div class="chart-title-group">
          <h2>Regional Labour Market Conditions</h2>
          <span>Employment metrics across administrative provinces</span>
        </div>
      </div>
      <div class="data-table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Economic Region</th>
              <th>Unemployment Rate</th>
              <th>Active Workforce</th>
              <th>Wage Growth</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${regionRows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function renderEnergy() {
  return `
    <section class="view-header">
      <div class="view-title-group">
        <h1>Energy Transition & Environmental Indicators</h1>
        <p>Clean power generation share, grid decarbonization and emissions per capita</p>
      </div>
    </section>

    <div class="kpi-grid">
      <div class="kpi-card green">
        <span class="kpi-label">Renewable Electricity Share</span>
        <span class="kpi-val">45.2%</span>
        <div class="kpi-change up"><span>+4.8% YoY</span></div>
        <small style="color: var(--text-muted);">Solar, Wind & Hydro</small>
      </div>
      <div class="kpi-card blue">
        <span class="kpi-label">Grid Carbon Intensity</span>
        <span class="kpi-val">182 g/kWh</span>
        <div class="kpi-change down"><span>-12.4% YoY</span></div>
        <small style="color: var(--text-muted);">CO2 per electricity unit</small>
      </div>
      <div class="kpi-card purple">
        <span class="kpi-label">Per Capita CO2</span>
        <span class="kpi-val">4.6 Tons</span>
        <div class="kpi-change down"><span>-6.1% YoY</span></div>
        <small style="color: var(--text-muted);">Annual emissions footprint</small>
      </div>
    </div>
  `;
}
