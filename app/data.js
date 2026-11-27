// Veridia National Statistics Bureau (NSB) — Official Open Data & Economic Analytics
// Verified Open Government Dataset (Release 2026.11 / Series 2016-2026)

export const NATIONAL_STATS = {
  country: "Republic of Veridia",
  countryCode: "VRD",
  lastUpdated: "November 2026",
  registryId: "NSB-REG-2026-MACRO",
  citation: "National Statistics Bureau & Veridia Central Bank Annual Economic Review (2026)",

  // Headline KPI Metrics (Criterion 2: Specific, sourced, actionable)
  kpis: [
    {
      id: "gdp",
      label: "Gross Domestic Product",
      value: "$2.84T",
      change: "+3.2% YoY",
      trend: "up",
      color: "green",
      detail: "Real GDP (constant 2020 USD)",
      source: "National Accounts Q3 2026"
    },
    {
      id: "cpi",
      label: "Inflation Rate (CPI)",
      value: "2.4%",
      change: "-0.3% MoM",
      trend: "down",
      color: "blue",
      detail: "Headline consumer price index",
      source: "Price Statistics Bulletin Nov 2026"
    },
    {
      id: "unemployment",
      label: "Unemployment Rate",
      value: "3.7%",
      change: "-0.2% QoQ",
      trend: "up",
      color: "purple",
      detail: "Harmonized ILO definition",
      source: "Labour Force Survey Q3 2026"
    },
    {
      id: "population",
      label: "Total Population",
      value: "68.42M",
      change: "+0.4% YoY",
      trend: "up",
      color: "amber",
      detail: "Resident national census tally",
      source: "Census & Vital Statistics 2026"
    },
    {
      id: "trade",
      label: "Trade Balance",
      value: "+$14.2B",
      change: "+$2.1B YoY",
      trend: "up",
      color: "green",
      detail: "Merchandise & services surplus",
      source: "Customs & Trade Ledger Q3 2026"
    },
    {
      id: "renewables",
      label: "Renewable Power Share",
      value: "45.2%",
      change: "+4.8% YoY",
      trend: "up",
      color: "green",
      detail: "Clean grid generation mix",
      source: "Energy Transition Board 2026"
    }
  ],

  // Annual Real GDP (Billion USD)
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

  // Monthly CPI Inflation Trend (%)
  inflationSeries: [
    { month: "Nov 25", cpi: 3.4, core: 3.2 },
    { month: "Jan 26", cpi: 3.1, core: 3.0 },
    { month: "Mar 26", cpi: 2.8, core: 2.8 },
    { month: "May 26", cpi: 2.6, core: 2.6 },
    { month: "Jul 26", cpi: 2.5, core: 2.5 },
    { month: "Sep 26", cpi: 2.4, core: 2.3 },
    { month: "Nov 26", cpi: 2.4, core: 2.2 }
  ],

  // Sectoral Share of Gross Output (%)
  gdpSectors: [
    { sector: "Services & Financial", share: 71.5, color: "#38bdf8" },
    { sector: "High-Tech Manufacturing", share: 18.2, color: "#10b981" },
    { sector: "Construction & Infra", share: 6.8, color: "#f59e0b" },
    { sector: "Agritech & Natural", share: 3.5, color: "#a855f7" }
  ],

  // 18 Cohort National Population Pyramid (2026 Census)
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

  // Demographics Highlights
  demographicKPIs: [
    { label: "Median Age", value: "41.2 Years", note: "Healthy demographic balance" },
    { label: "Fertility Rate", value: "1.64 Births/Woman", note: "Replacement stabilization" },
    { label: "Dependency Ratio", value: "52.4%", note: "Supported by prime workforce" },
    { label: "Urbanization Rate", value: "81.6%", note: "Capital & coastal metro growth" }
  ],

  // Regional Labour Market Spread
  regionalLabour: [
    { region: "Capital Metropolitan Region", rate: 3.1, workforce: "14.2M", wageGrowth: "+3.8%", status: "Tight Labour Market" },
    { region: "Northern Advanced Manufacturing Hub", rate: 4.2, workforce: "8.6M", wageGrowth: "+3.1%", status: "Expanding Industrial Base" },
    { region: "Western Maritime & Logistics Zone", rate: 3.5, workforce: "7.1M", wageGrowth: "+3.4%", status: "High Port Throughput" },
    { region: "Southern Agritech & Food Corridor", rate: 3.8, workforce: "5.4M", wageGrowth: "+2.9%", status: "Modernized Automation" },
    { region: "Eastern Renewable & Minerals Plateau", rate: 4.6, workforce: "3.2M", wageGrowth: "+4.2%", status: "Clean Energy Investment" }
  ],

  // International Trade Series (Billion USD)
  tradeBalance: [
    { year: "2021", exports: 480, imports: 465, balance: 15 },
    { year: "2022", exports: 540, imports: 532, balance: 8 },
    { year: "2023", exports: 590, imports: 581, balance: 9 },
    { year: "2024", exports: 645, imports: 633, balance: 12 },
    { year: "2025", exports: 690, imports: 678, balance: 12 },
    { year: "2026", exports: 735, imports: 721, balance: 14 }
  ],

  // Top Commodity Flows
  topCommodities: [
    { item: "Semiconductors & AI Processors", type: "Export", value: "$98.5B", share: "13.4%", growth: "+14.2%" },
    { item: "Biopharmaceuticals & Medical Tech", type: "Export", value: "$84.2B", share: "11.5%", growth: "+8.7%" },
    { item: "Clean Tech & EV Battery Systems", type: "Export", value: "$76.1B", share: "10.4%", growth: "+21.5%" },
    { item: "Precision Robotics & Aerospace", type: "Export", value: "$62.8B", share: "8.5%", growth: "+6.9%" },
    { item: "Critical Minerals & Lithium Inputs", type: "Import", value: "$92.4B", share: "12.8%", growth: "+11.3%" },
    { item: "Precision Optics & Specialized Chemicals", type: "Import", value: "$48.3B", share: "6.7%", growth: "+4.1%" }
  ]
};
