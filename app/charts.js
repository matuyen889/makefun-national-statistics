// Pure SVG Charting Utility (Zero Dependencies, Vector Sharp, Accessible)

/**
 * Creates an interactive SVG Area/Line Chart
 */
export function createAreaChart({ data, xKey, yKey, width = 640, height = 280, color = "#1d4ed8", unit = "", yMin = 0 }) {
  const padding = { top: 20, right: 30, bottom: 35, left: 55 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const yValues = data.map(d => d[yKey]);
  const minVal = yMin !== undefined ? yMin : Math.min(...yValues);
  const maxVal = Math.max(...yValues) * 1.08;

  const getX = i => padding.left + (i / (data.length - 1)) * chartW;
  const getY = val => padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;

  // Build SVG path points
  const points = data.map((d, i) => `${getX(i)},${getY(d[yKey])}`);
  const linePath = `M ${points.join(" L ")}`;
  const areaPath = `${linePath} L ${getX(data.length - 1)},${padding.top + chartH} L ${padding.left},${padding.top + chartH} Z`;

  // Gridlines & Y-Axis labels (4 steps)
  let gridSvg = "";
  const steps = 4;
  for (let s = 0; s <= steps; s++) {
    const val = minVal + (s / steps) * (maxVal - minVal);
    const y = getY(val);
    gridSvg += `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" class="chart-grid-line" />
      <text x="${padding.left - 8}" y="${y + 4}" text-anchor="end" class="chart-text">${Math.round(val)}${unit}</text>
    `;
  }

  // X-Axis labels & data dots
  let xLabels = "";
  let dots = "";
  data.forEach((d, i) => {
    const x = getX(i);
    const y = getY(d[yKey]);
    xLabels += `<text x="${x}" y="${height - 10}" text-anchor="middle" class="chart-text">${d[xKey]}</text>`;
    dots += `
      <circle cx="${x}" cy="${y}" r="4" fill="${color}" stroke="#ffffff" stroke-width="2" />
      <title>${d[xKey]}: ${d[yKey]}${unit}</title>
    `;
  });

  return `
    <svg viewBox="0 0 ${width} ${height}" class="chart-svg">
      <defs>
        <linearGradient id="areaGrad-${color.replace('#', '')}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.35" />
          <stop offset="100%" stop-color="${color}" stop-opacity="0.02" />
        </linearGradient>
      </defs>
      ${gridSvg}
      <path d="${areaPath}" fill="url(#areaGrad-${color.replace('#', '')})" />
      <path d="${linePath}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      ${dots}
      ${xLabels}
    </svg>
  `;
}

/**
 * Creates a Horizontal Population Pyramid Chart (Male vs Female Cohorts)
 */
export function createPyramidChart({ data, width = 640, height = 360 }) {
  const padding = { top: 25, right: 30, bottom: 30, left: 30 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const rowH = chartH / data.length;
  const halfW = (chartW - 60) / 2;
  const centerLeft = padding.left + halfW;
  const centerRight = centerLeft + 60;

  const maxVal = Math.max(...data.map(d => Math.max(d.male, d.female))) * 1.1;

  let rows = "";
  data.forEach((d, i) => {
    const y = padding.top + i * rowH;
    const barH = Math.max(2, rowH - 4);
    const maleW = (d.male / maxVal) * halfW;
    const femaleW = (d.female / maxVal) * halfW;

    rows += `
      <!-- Male bar (left side) -->
      <rect x="${centerLeft - maleW}" y="${y}" width="${maleW}" height="${barH}" rx="2" fill="#2563eb" opacity="0.85">
        <title>Age ${d.age} Male: ${d.male.toLocaleString()}k</title>
      </rect>
      <!-- Age label (center) -->
      <text x="${centerLeft + 30}" y="${y + barH / 2 + 4}" text-anchor="middle" class="chart-text" font-weight="600">${d.age}</text>
      <!-- Female bar (right side) -->
      <rect x="${centerRight}" y="${y}" width="${femaleW}" height="${barH}" rx="2" fill="#ec4899" opacity="0.85">
        <title>Age ${d.age} Female: ${d.female.toLocaleString()}k</title>
      </rect>
    `;
  });

  return `
    <svg viewBox="0 0 ${width} ${height}" class="chart-svg">
      <text x="${centerLeft - halfW / 2}" y="14" text-anchor="middle" fill="#2563eb" font-size="12" font-weight="700">Male Population</text>
      <text x="${centerRight + halfW / 2}" y="14" text-anchor="middle" fill="#ec4899" font-size="12" font-weight="700">Female Population</text>
      <line x1="${centerLeft}" y1="${padding.top}" x2="${centerLeft}" y2="${height - padding.bottom}" class="chart-axis-line" />
      <line x1="${centerRight}" y1="${padding.top}" x2="${centerRight}" y2="${height - padding.bottom}" class="chart-axis-line" />
      ${rows}
    </svg>
  `;
}

/**
 * Creates a Grouped Bar Chart (e.g. Exports vs Imports)
 */
export function createGroupedBarChart({ data, xKey, yKey1, yKey2, label1, label2, width = 640, height = 260 }) {
  const padding = { top: 20, right: 30, bottom: 35, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxVal = Math.max(...data.map(d => Math.max(d[yKey1], d[yKey2]))) * 1.15;
  const groupW = chartW / data.length;
  const barW = Math.max(6, (groupW - 20) / 2);

  let bars = "";
  let xLabels = "";

  data.forEach((d, i) => {
    const groupX = padding.left + i * groupW + 10;
    const h1 = (d[yKey1] / maxVal) * chartH;
    const h2 = (d[yKey2] / maxVal) * chartH;

    bars += `
      <rect x="${groupX}" y="${padding.top + chartH - h1}" width="${barW}" height="${h1}" rx="3" fill="#059669">
        <title>${d[xKey]} ${label1}: $${d[yKey1]}B</title>
      </rect>
      <rect x="${groupX + barW + 4}" y="${padding.top + chartH - h2}" width="${barW}" height="${h2}" rx="3" fill="#0284c7">
        <title>${d[xKey]} ${label2}: $${d[yKey2]}B</title>
      </rect>
    `;
    xLabels += `<text x="${groupX + barW + 2}" y="${height - 10}" text-anchor="middle" class="chart-text">${d[xKey]}</text>`;
  });

  return `
    <svg viewBox="0 0 ${width} ${height}" class="chart-svg">
      <line x1="${padding.left}" y1="${padding.top + chartH}" x2="${width - padding.right}" y2="${padding.top + chartH}" class="chart-axis-line" />
      ${bars}
      ${xLabels}
    </svg>
  `;
}

/**
 * Creates a Donut Chart for proportions
 */
export function createDonutChart({ data, valKey, labelKey, size = 220 }) {
  const total = data.reduce((sum, d) => sum + d[valKey], 0);
  let cumulative = 0;
  const r = 80;
  const cx = size / 2;
  const cy = size / 2;

  const slices = data.map(d => {
    const startAngle = (cumulative / total) * 2 * Math.PI;
    cumulative += d[valKey];
    const endAngle = (cumulative / total) * 2 * Math.PI;

    const x1 = cx + r * Math.sin(startAngle);
    const y1 = cy - r * Math.cos(startAngle);
    const x2 = cx + r * Math.sin(endAngle);
    const y2 = cy - r * Math.cos(endAngle);

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return `<path d="${pathData}" fill="${d.color}" opacity="0.9"><title>${d[labelKey]}: ${d[valKey]}%</title></path>`;
  });

  return `
    <svg viewBox="0 0 ${size} ${size}" class="chart-svg" style="max-width: ${size}px;">
      ${slices.join("")}
      <circle cx="${cx}" cy="${cy}" r="50" fill="var(--bg-card)" />
      <text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="14" font-weight="700" fill="var(--text-primary)">GDP</text>
    </svg>
  `;
}
