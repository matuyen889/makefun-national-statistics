// Pure SVG Vector Charting Engine (Zero External Dependencies, Pixel Sharp, Dark Mode Optimized)

/**
 * Creates an interactive SVG Area/Line Chart with gradient fill
 */
export function createAreaChart({ data, xKey, yKey, width = 560, height = 220, color = "#38bdf8", unit = "", yMin = 0 }) {
  const padding = { top: 18, right: 24, bottom: 28, left: 48 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const yValues = data.map(d => d[yKey]);
  const minVal = yMin !== undefined ? yMin : Math.min(...yValues);
  const maxVal = Math.max(...yValues) * 1.08;

  const getX = i => padding.left + (i / (data.length - 1)) * chartW;
  const getY = val => padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;

  const points = data.map((d, i) => `${getX(i).toFixed(1)},${getY(d[yKey]).toFixed(1)}`);
  const linePath = `M ${points.join(" L ")}`;
  const areaPath = `${linePath} L ${getX(data.length - 1).toFixed(1)},${(padding.top + chartH).toFixed(1)} L ${padding.left.toFixed(1)},${(padding.top + chartH).toFixed(1)} Z`;

  // Gridlines & Y-Axis labels (3 intervals)
  let gridSvg = "";
  const steps = 3;
  for (let s = 0; s <= steps; s++) {
    const val = minVal + (s / steps) * (maxVal - minVal);
    const y = getY(val);
    gridSvg += `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="rgba(148, 163, 184, 0.15)" stroke-dasharray="3 3" />
      <text x="${padding.left - 6}" y="${y + 4}" text-anchor="end" fill="#94a3b8" font-size="10" font-family="sans-serif">${Math.round(val)}${unit}</text>
    `;
  }

  // X-Axis labels & data points
  let xLabels = "";
  let dots = "";
  data.forEach((d, i) => {
    // Show every label if <= 8, else every other
    const showLabel = data.length <= 8 || i % 2 === 0 || i === data.length - 1;
    const x = getX(i);
    const y = getY(d[yKey]);
    if (showLabel) {
      xLabels += `<text x="${x}" y="${height - 8}" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="sans-serif">${d[xKey]}</text>`;
    }
    dots += `
      <circle cx="${x}" cy="${y}" r="3.5" fill="${color}" stroke="#0b1120" stroke-width="2" />
    `;
  });

  const gradId = `areaGrad-${color.replace(/[^a-zA-Z0-9]/g, '')}`;

  return `
    <svg viewBox="0 0 ${width} ${height}" class="chart-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.4" />
          <stop offset="100%" stop-color="${color}" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      ${gridSvg}
      <path d="${areaPath}" fill="url(#${gradId})" />
      <path d="${linePath}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      ${dots}
      ${xLabels}
    </svg>
  `;
}

/**
 * Creates a Horizontal Population Pyramid Chart (Male vs Female Cohorts)
 */
export function createPyramidChart({ data, width = 560, height = 240 }) {
  const padding = { top: 15, right: 20, bottom: 25, left: 20 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const rowH = chartH / data.length;
  const centerGap = 44;
  const halfW = (chartW - centerGap) / 2;
  const centerLeft = padding.left + halfW;
  const centerRight = centerLeft + centerGap;

  const maxVal = Math.max(...data.map(d => Math.max(d.male, d.female))) * 1.1;

  let rows = "";
  data.forEach((d, i) => {
    const y = padding.top + i * rowH;
    const barH = Math.max(2, rowH - 3);
    const maleW = (d.male / maxVal) * halfW;
    const femaleW = (d.female / maxVal) * halfW;

    rows += `
      <rect x="${centerLeft - maleW}" y="${y}" width="${maleW}" height="${barH}" rx="2" fill="#38bdf8" opacity="0.9" />
      <text x="${centerLeft + centerGap / 2}" y="${y + barH / 2 + 3.5}" text-anchor="middle" fill="#cbd5e1" font-size="9" font-weight="600" font-family="sans-serif">${d.age}</text>
      <rect x="${centerRight}" y="${y}" width="${femaleW}" height="${barH}" rx="2" fill="#f43f5e" opacity="0.9" />
    `;
  });

  return `
    <svg viewBox="0 0 ${width} ${height}" class="chart-svg" preserveAspectRatio="xMidYMid meet">
      <!-- Axis Legend Header -->
      <text x="${centerLeft - halfW / 2}" y="${height - 6}" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="700">MALE (Thousands)</text>
      <text x="${centerRight + halfW / 2}" y="${height - 6}" text-anchor="middle" fill="#f43f5e" font-size="10" font-weight="700">FEMALE (Thousands)</text>
      ${rows}
    </svg>
  `;
}

/**
 * Creates a Grouped Bar Chart (Exports vs Imports comparison)
 */
export function createGroupedBarChart({ data, xKey, yKey1, yKey2, label1 = "Exports", label2 = "Imports", width = 560, height = 240 }) {
  const padding = { top: 20, right: 24, bottom: 30, left: 45 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const allVals = data.flatMap(d => [d[yKey1], d[yKey2]]);
  const maxVal = Math.max(...allVals) * 1.15;
  const groupW = chartW / data.length;
  const barW = Math.min(22, (groupW - 14) / 2);

  let gridSvg = "";
  for (let s = 0; s <= 3; s++) {
    const val = (s / 3) * maxVal;
    const y = padding.top + chartH - (val / maxVal) * chartH;
    gridSvg += `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="rgba(148, 163, 184, 0.15)" stroke-dasharray="3 3" />
      <text x="${padding.left - 6}" y="${y + 4}" text-anchor="end" fill="#94a3b8" font-size="10" font-family="sans-serif">$${Math.round(val)}B</text>
    `;
  }

  let bars = "";
  let xLabels = "";
  data.forEach((d, i) => {
    const groupX = padding.left + i * groupW + groupW / 2;
    const h1 = (d[yKey1] / maxVal) * chartH;
    const h2 = (d[yKey2] / maxVal) * chartH;
    const y1 = padding.top + chartH - h1;
    const y2 = padding.top + chartH - h2;

    bars += `
      <rect x="${groupX - barW - 2}" y="${y1}" width="${barW}" height="${h1}" rx="3" fill="#10b981" />
      <rect x="${groupX + 2}" y="${y2}" width="${barW}" height="${h2}" rx="3" fill="#38bdf8" />
    `;

    xLabels += `<text x="${groupX}" y="${height - 8}" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="sans-serif">${d[xKey]}</text>`;
  });

  return `
    <svg viewBox="0 0 ${width} ${height}" class="chart-svg" preserveAspectRatio="xMidYMid meet">
      ${gridSvg}
      ${bars}
      ${xLabels}
    </svg>
  `;
}

/**
 * Creates an SVG Donut Chart for Sectoral Composition
 */
export function createDonutChart({ data, valKey = "share", labelKey = "sector", size = 180 }) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.38;
  const strokeWidth = size * 0.22;
  const circ = 2 * Math.PI * radius;

  let offset = 0;
  const total = data.reduce((acc, d) => acc + d[valKey], 0);

  let paths = "";
  data.forEach(d => {
    const fraction = d[valKey] / total;
    const dash = fraction * circ;
    paths += `
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${d.color}" stroke-width="${strokeWidth}"
        stroke-dasharray="${dash} ${circ - dash}" stroke-dashoffset="${-offset}" />
    `;
    offset += dash;
  });

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <g transform="rotate(-90 ${cx} ${cy})">
        ${paths}
      </g>
      <circle cx="${cx}" cy="${cy}" r="${radius - strokeWidth / 2 - 1}" fill="#111827" />
      <text x="${cx}" y="${cy - 4}" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="sans-serif">GDP SHARE</text>
      <text x="${cx}" y="${cy + 12}" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="800" font-family="sans-serif">100%</text>
    </svg>
  `;
}
