// Official National Statistics Dataset (2016 - 2026)
export const NATIONAL_STATS = {
  country: "Republic of Veridia",
  lastUpdated: "November 2026",
  source: "National Statistics Bureau & Central Bank Registry",

  // Key Performance Indicators (Headline metrics)
  kpis: [
    { id: "gdp", label: "Gross Domestic Product", value: "$2.84T", change: "+3.2% YoY", trend: "up", color: "green", detail: "Constant 2020 prices, seasonally adjusted" },
    { id: "cpi", label: "Inflation Rate (CPI)", value: "2.4%", change: "-0.3% MoM", trend: "down", color: "blue", detail: "Target band: 2.0% ± 0.5%" },
    { id: "unemployment", label: "Unemployment Rate", value: "3.7%", change: "-0.2% QoQ", trend: "up", color: "purple", detail: "Near historical low, 4.2% in 2024" },
    { id: "population", label: "Total Population", value: "68.4M", change: "+0.4% YoY", trend: "up", color: "amber", detail: "Census estimate as of Q3 2026" },
    { id: "trade", label: "Trade Balance", value: "+$14.2B", change: "+$2.1B YoY", trend: "up", color: "green", detail: "Merchandise & services surplus" },
    { id: "renewables", label: "Renewable Energy", value: "45.2%", change: "+4.8% YoY", trend: "up", color: "green", detail: "Share of total electricity generation" }
  ],

  // Macroeconomics: Annual GDP (Billion USD)
  gdpSeries: [
    { year: "2016", value: 2050, growth: 2.3 },
    { year: "2017", value: 2120, growth: 2.4 },
    { year: "2018", value: 2210, growth: 2.8 },
    { year: "2019", value: 2280, growth: 2.1 },
    { year: "2020", value: 2190, growth: -3.9 },
    { year: "2021", value: 2350, growth: 5.6 },
    { year: "2022", value: 2470, growth: 3.4 },
    { year: "2023", value: 2580, growth: 2.7 },
    { year: "2024", value: 2680, growth: 2.9 },
    { year: "2025", value: 2750, growth: 3.0 },
    { year: "2026", value: 2840, growth: 3.2 }
  ],

  // Sectoral Share of GDP (%)
  gdpSectors: [
    { sector: "Services & Financial", share: 71.5, color: "#1d4ed8" },
    { sector: "Manufacturing & Industrial", share: 18.2, color: "#0284c7" },
    { sector: "Construction & Infrastructure", share: 6.8, color: "#059669" },
    { sector: "Agriculture & Forestry", share: 3.5, color: "#d97706" }
  ],

  // Monthly CPI Inflation (%)
  inflationSeries: [
    { month: "Nov 25", cpi: 3.4, core: 3.2 },
    { month: "Jan 26", cpi: 3.1, core: 3.0 },
    { month: "Mar 26", cpi: 2.8, core: 2.8 },
    { month: "May 26", cpi: 2.6, core: 2.6 },
    { month: "Jul 26", cpi: 2.5, core: 2.5 },
    { month: "Sep 26", cpi: 2.4, core: 2.3 },
    { month: "Nov 26", cpi: 2.4, core: 2.2 }
  ],

  // Population Age-Sex Cohorts (Thousands of people) for Population Pyramid
  pyramidData: [
    { age: "85+", male: 420, female: 680 },
    { age: "80-84", male: 680, female: 920 },
    { age: "75-79", male: 1150, female: 1380 },
    { age: "70-74", male: 1650, female: 1820 },
    { age: "65-69", male: 1980, female: 2110 },
    { age: "60-64", male: 2240, female: 2310 },
    { age: "55-59", male: 2450, female: 2490 },
    { age: "50-54", male: 2580, female: 2610 },
    { age: "45-49", male: 2420, female: 2440 },
    { age: "40-44", male: 2350, female: 2370 },
    { age: "35-39", male: 2410, female: 2390 },
    { age: "30-34", male: 2510, female: 2480 },
    { age: "25-29", male: 2390, female: 2340 },
    { age: "20-24", male: 2210, female: 2150 },
    { age: "15-19", male: 2050, female: 1980 },
    { age: "10-14", male: 1990, female: 1920 },
    { age: "5-9", male: 1910, female: 1840 },
    { age: "0-4", male: 1820, female: 1750 }
  ],

  // Regional Unemployment Rates (%)
  regionalLabour: [
    { region: "Capital Metropolitan", rate: 3.1, workforce: "14.2M" },
    { region: "Northern Industrial Corridor", rate: 4.2, workforce: "8.6M" },
    { region: "Western Coast & Maritime", rate: 3.5, workforce: "7.1M" },
    { region: "Southern Plains & Agritech", rate: 3.8, workforce: "5.4M" },
    { region: "Eastern Highlands", rate: 4.6, workforce: "3.2M" }
  ],

  // International Trade (Billion USD)
  tradeBalance: [
    { year: "2021", exports: 480, imports: 465, balance: 15 },
    { year: "2022", exports: 540, imports: 532, balance: 8 },
    { year: "2023", exports: 590, imports: 581, balance: 9 },
    { year: "2024", exports: 645, imports: 633, balance: 12 },
    { year: "2025", exports: 690, imports: 678, balance: 12 },
    { year: "2026", exports: 735, imports: 721, balance: 14 }
  ],

  // Top Trading Commodities
  topCommodities: [
    { item: "Advanced Electronics & Chips", type: "Export", value: "$98.5B", share: "13.4%" },
    { item: "Pharmaceuticals & Biotech", type: "Export", value: "$84.2B", share: "11.5%" },
    { item: "Green Tech & Electric Vehicles", type: "Export", value: "$76.1B", share: "10.4%" },
    { item: "Precision Machinery & Aerospace", type: "Export", value: "$62.8B", share: "8.5%" },
    { item: "Energy & Industrial Minerals", type: "Import", value: "$92.4B", share: "12.8%" },
    { item: "Specialty Chemicals", type: "Import", value: "$48.3B", share: "6.7%" }
  ]
};
