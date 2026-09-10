# HeatGuard Web Dashboard

HeatGuard is an advanced climate resilience and heat-risk intelligence dashboard built with React, Vite, and Tailwind CSS. It empowers citizens and government authorities with real-time heat indices, AI-powered thermal stress forecasts, vulnerable population metrics, and district-level interactive choropleth maps.

## 🚀 Features

- **Live Heat-Risk Map:** Real GeoJSON choropleth visualization of West Bengal districts using `react-simple-maps` with zoom/pan controls, floating legends, and dismissible district detail cards.
- **AI Prediction Forecast:** Area trend curves forecasting heat stress milestones (`Now`, `1h`, `3h`, `6h`), predicted peak risk times, and AI confidence ratings.
- **Thermal Stress Analysis:** Comprehensive thermal metrics (Temperature, Humidity, Wind Speed, Solar Radiation, Heat Index, WBGT, and Human Thermal Stress Score).
- **Vulnerable Population Tracking:** Segmented impact monitoring for outdoor workers, elderly individuals, children, and healthcare-sensitive populations.
- **Executive Metrics & Advisories:** High-level summary cards, alert tickers, response resources, and public health guidelines.

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Data Visualization:** Recharts, React-Simple-Maps
- **Icons:** Lucide React

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/Subhabrata3000/HeatGuard_web.git
cd HeatGuard_web
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```
