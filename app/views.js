import { NATIONAL_STATS } from './data.js';
import { createAreaChart, createPyramidChart, createGroupedBarChart, createDonutChart } from './charts.js';

export function renderOverview() {
  const kpiCards = NATIONAL_STATS.kpis.map(k => `
    <div class="kpi-card ${k.color}" data-kpi-id="${k.id}">
      <div class="kpi-top">
        <span class="kpi-label">${k.label}</span>
        <div class="kpi-change ${k.trend}">
          <span>${k.change}</span>
        </div>
      </div>
      <div class="kpi-val">${k.value}</div>
      <div class="kpi-meta">
        <span class="kpi-detail">${k.detail}</span>
        <span class="kpi-src">${k.source}</span>
      </div>
    </div>
  `).join("");

  const gdpChart = createAreaChart({
    data: NATIONAL_STATS.gdpSeries,
    xKey: "year",
    yKey: "value",
    color: "#38bdf8",
    unit: "B",
    yMin: 1900,
    width: 580,
    height: 195
  });

  const cpiChart = createAreaChart({
    data: NATIONAL_STATS.inflationSeries,
    xKey: "month",
    yKey: "cpi",
    color: "#10b981",
    unit: "%",
    yMin: 1.5,
    width: 580,
    height: 195
  });

  return `
    <section class="view-header">
      <div class="view-title-group">
        <div class="portal-badge">OFFICIAL OPEN DATA REPOSITORY • RELEASE 2026.11</div>
        <h1>National Economic & Demographics Executive Terminal</h1>
        <p>Comprehensive statistical intelligence & verified accounts for the ${NATIONAL_STATS.country} (${NATIONAL_STATS.lastUpdated})</p>
      </div>
      <div class="portal-meta-strip">
        <div class="meta-tag"><span>REGISTRY:</span> <strong>${NATIONAL_STATS.registryId}</strong></div>
        <div class="meta-tag"><span>STATUS:</span> <strong style="color: var(--accent-green);">VERIFIED OFFLINE</strong></div>
      </div>
    </section>

    <!-- Top KPI Row (6 Indicators) -->
    <section class="kpi-grid">
      ${kpiCards}
    </section>

    <!-- Executive Dashboard Grid -->
    <section class="dashboard-grid">
      <!-- Left Column: Macroeconomic Trajectory -->
      <div class="chart-card">
        <div class="chart-card-header">
          <div class="chart-title-group">
            <h2>Real Gross Domestic Product (GDP Trajectory)</h2>
            <span>Annual real output in Billion USD (2016 - 2026) • Source: Central Bank Registry</span>
          </div>
          <span class="badge-growth">+3.2% Real Expansion</span>
        </div>
        <div class="chart-container">
          ${gdpChart}
        </div>
      </div>

      <!-- Right Column: Sectoral Composition -->
      <div class="chart-card">
        <div class="chart-card-header">
          <div class="chart-title-group">
            <h2>Sectoral Share of Economic Output</h2>
            <span>Value-added gross output composition by major industrial sector</span>
          </div>
        </div>
        <div class="donut-wrapper">
          ${createDonutChart({ data: NATIONAL_STATS.gdpSectors, valKey: "share", labelKey: "sector", size: 160 })}
          <div class="chart-legend vertical">
            ${NATIONAL_STATS.gdpSectors.map(s => `
              <div class="legend-item">
                <span class="legend-dot" style="background: ${s.color};"></span>
                <span class="legend-label">${s.sector}: <strong>${s.share}%</strong></span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </section>

    <!-- Secondary Row: Inflation & Population Pyramid Structure -->
    <section class="dashboard-grid">
      <div class="chart-card">
        <div class="chart-card-header">
          <div class="chart-title-group">
            <h2>Consumer Price Inflation (Monthly CPI Rate)</h2>
            <span>Headline inflation trend • Target band 2.0% ± 0.5% • Source: Price Statistics Bureau</span>
          </div>
          <span class="badge-growth green">Target Anchored (2.4%)</span>
        </div>
        <div class="chart-container">
          ${cpiChart}
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-card-header">
          <div class="chart-title-group">
            <h2>Demographic Pyramid Cohort Summary</h2>
            <span>Census 2026 resident age-sex profile (Ages 0 to 85+)</span>
          </div>
          <a href="#/demographics" class="card-action-link">Full Census Report →</a>
        </div>
        <div class="chart-container">
          ${createPyramidChart({ data: NATIONAL_STATS.pyramidData.slice(0, 9), width: 520, height: 195 })}
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
    label2: "Imports",
    width: 620,
    height: 240
  });

  const commodityRows = NATIONAL_STATS.topCommodities.map(c => `
    <tr>
      <td><strong>${c.item}</strong></td>
      <td><span class="flow-badge ${c.type.toLowerCase()}">${c.type}</span></td>
      <td><strong>${c.value}</strong></td>
      <td>${c.share}</td>
      <td style="color: var(--accent-green); font-weight: 700;">${c.growth}</td>
      <td style="color: var(--text-muted); font-size: 0.78rem;">Verified Ledger</td>
    </tr>
  `).join("");

  return `
    <section class="view-header">
      <div class="view-title-group">
        <div class="portal-badge">NATIONAL ACCOUNTS & TRADE DIVISION</div>
        <h1>Macroeconomics & International Trade Balance</h1>
        <p>Comprehensive external trade accounts, commodity flows, balance of payments and competitiveness indicators</p>
      </div>
      <div class="portal-meta-strip">
        <div class="meta-tag"><span>SURPLUS:</span> <strong style="color: var(--accent-green);">+$14.2B USD</strong></div>
        <div class="meta-tag"><span>EXPORTS YoY:</span> <strong style="color: var(--primary);">+6.5%</strong></div>
      </div>
    </section>

    <section class="dashboard-grid">
      <div class="chart-card">
        <div class="chart-card-header">
          <div class="chart-title-group">
            <h2>International Merchandise Trade Balance (2021 - 2026)</h2>
            <span>Annual merchandise exports vs imports in Billion USD • Official Customs Ledger</span>
          </div>
          <div class="chart-legend">
            <div class="legend-item"><span class="legend-dot" style="background: #10b981;"></span> Exports</div>
            <div class="legend-item"><span class="legend-dot" style="background: #38bdf8;"></span> Imports</div>
          </div>
        </div>
        <div class="chart-container">
          ${tradeChart}
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-card-header">
          <div class="chart-title-group">
            <h2>Top Strategic Commodities & Value Chains</h2>
            <span>Leading export and import commodity classifications by trade value</span>
          </div>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Commodity Category</th>
                <th>Flow</th>
                <th>Annual Value</th>
                <th>Share</th>
                <th>Growth</th>
                <th>Audit</th>
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
  const kpiItems = NATIONAL_STATS.demographicKPIs.map(k => `
    <div class="kpi-card purple">
      <span class="kpi-label">${k.label}</span>
      <div class="kpi-val">${k.value}</div>
      <span class="kpi-detail">${k.note}</span>
    </div>
  `).join("");

  return `
    <section class="view-header">
      <div class="view-title-group">
        <div class="portal-badge">CENSUS & DEMOGRAPHIC INTELLIGENCE DIVISION</div>
        <h1>National Population Structure & Census Demographics</h1>
        <p>Official 2026 Census Cohort Breakdown, age-dependency ratios, and demographic transition indicators</p>
      </div>
      <div class="portal-meta-strip">
        <div class="meta-tag"><span>RESIDENTS:</span> <strong>68,420,000</strong></div>
        <div class="meta-tag"><span>MEDIAN AGE:</span> <strong>41.2 YRS</strong></div>
      </div>
    </section>

    <div class="kpi-grid">
      ${kpiItems}
    </div>

    <div class="chart-card" style="margin-top: 20px;">
      <div class="chart-card-header">
        <div class="chart-title-group">
          <h2>Full 18-Cohort National Population Pyramid (2026 Census)</h2>
          <span>Male vs Female distribution by 5-year chronological intervals (Thousands of inhabitants)</span>
        </div>
        <div class="chart-legend">
          <div class="legend-item"><span class="legend-dot" style="background: #38bdf8;"></span> Male (33.6M • 49.1%)</div>
          <div class="legend-item"><span class="legend-dot" style="background: #f43f5e;"></span> Female (34.8M • 50.9%)</div>
        </div>
      </div>
      <div class="chart-container" style="padding: 10px 0;">
        ${createPyramidChart({ data: NATIONAL_STATS.pyramidData, width: 780, height: 380 })}
      </div>
    </div>
  `;
}

export function renderLabour() {
  const regionRows = NATIONAL_STATS.regionalLabour.map(r => `
    <tr>
      <td><strong>${r.region}</strong></td>
      <td><span class="status-rate ${r.rate < 4 ? 'green' : 'amber'}">${r.rate}%</span></td>
      <td><strong>${r.workforce}</strong></td>
      <td><span style="color: var(--accent-green); font-weight: 700;">${r.wageGrowth}</span></td>
      <td><span class="badge-status">${r.status}</span></td>
    </tr>
  `).join("");

  return `
    <section class="view-header">
      <div class="view-title-group">
        <div class="portal-badge">LABOUR MARKET & EMPLOYMENT SURVEY</div>
        <h1>Regional Workforce Dynamics & Wage Growth</h1>
        <p>Harmonized unemployment statistics, provincial participation rates and real compensation developments</p>
      </div>
      <div class="portal-meta-strip">
        <div class="meta-tag"><span>HEADLINE UNEMPLOYMENT:</span> <strong style="color: var(--accent-green);">3.7%</strong></div>
        <div class="meta-tag"><span>ACTIVE WORKFORCE:</span> <strong>38.5M</strong></div>
      </div>
    </section>

    <div class="chart-card">
      <div class="chart-card-header">
        <div class="chart-title-group">
          <h2>Provincial Labour Market & Employment Registry</h2>
          <span>Administrative economic provinces ordered by workforce volume</span>
        </div>
      </div>
      <div class="data-table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Economic Administrative Province</th>
              <th>Unemployment Rate</th>
              <th>Active Labour Force</th>
              <th>Real Wage Growth</th>
              <th>Market Classification</th>
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
        <div class="portal-badge">CLIMATE & ENERGY TRANSITION REGISTRY</div>
        <h1>National Energy Generation & Environmental Metrics</h1>
        <p>Renewable power mix, power grid decarbonization trajectory and industrial carbon intensity</p>
      </div>
    </section>

    <div class="kpi-grid">
      <div class="kpi-card green">
        <span class="kpi-label">Renewable Electricity Share</span>
        <div class="kpi-val">45.2%</div>
        <div class="kpi-change up"><span>+4.8% YoY</span></div>
        <span class="kpi-detail">Hydro (21%), Wind (16%), Solar (8.2%)</span>
      </div>
      <div class="kpi-card blue">
        <span class="kpi-label">Grid Carbon Intensity</span>
        <div class="kpi-val">182 g/kWh</div>
        <div class="kpi-change down"><span>-12.4% YoY</span></div>
        <span class="kpi-detail">CO2 per net electricity generation unit</span>
      </div>
      <div class="kpi-card purple">
        <span class="kpi-label">Per Capita GHG Emissions</span>
        <div class="kpi-val">4.6 Tons</div>
        <div class="kpi-change down"><span>-6.1% YoY</span></div>
        <span class="kpi-detail">National greenhouse emissions footprint</span>
      </div>
    </div>
  `;
}
