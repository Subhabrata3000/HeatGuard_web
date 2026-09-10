import React, { useState } from 'react';
import {
  Home, Map as MapIcon, LayoutDashboard, Sparkles, Thermometer, Users, Bell,
  LifeBuoy, BarChart3, Megaphone, Info, Search, Lock, Flame, Sun, Wind,
  Droplet, Droplets, Snowflake, Layers, Plus, Minus, ChevronRight, ArrowRight,
  X, TrendingUp, AlertTriangle, HardHat, Building2, HeartPulse, Baby, Siren,
  UserRound, Gauge, MapPin, Hospital, Target, Download, Clock,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  ResponsiveContainer, ReferenceDot, Label,
} from 'recharts';
import {
  ComposableMap, Geographies, Geography, Marker, ZoomableGroup,
} from 'react-simple-maps';
import heatguardLogo from './heatguard-logo.png';
import heroBannerImg from './hero-banner.png';
import sidebarSunsetImg from './sidebar-sunset.png';
import ashokaEmblemWhite from './ashoka-emblem-white.png';

/* ---------------------------------------------------------------------- */
/*  Design tokens                                                          */
/* ---------------------------------------------------------------------- */

const THEME = {
  navy: '#0B192C',
  navyPanel: '#11213A',
  navyActive: '#1E3E62',
  bg: '#F4F6F9',
  border: '#E5E9F0',
};

const RISK = {
  low: { label: 'Low', text: 'text-emerald-600', bg: 'bg-emerald-500', bgSoft: 'bg-emerald-50', hex: '#10B981' },
  moderate: { label: 'Moderate', text: 'text-amber-600', bg: 'bg-amber-500', bgSoft: 'bg-amber-50', hex: '#F59E0B' },
  high: { label: 'High', text: 'text-orange-600', bg: 'bg-orange-500', bgSoft: 'bg-orange-50', hex: '#F97316' },
  extreme: { label: 'Extreme', text: 'text-red-600', bg: 'bg-red-600', bgSoft: 'bg-red-50', hex: '#DC2626' },
};

const RISK_STATS = {
  extreme: { heatIndex: '49.2', temp: '41.2', humidity: '68', wind: '8' },
  high: { heatIndex: '44.6', temp: '38.4', humidity: '60', wind: '10' },
  moderate: { heatIndex: '37.8', temp: '33.1', humidity: '55', wind: '12' },
  low: { heatIndex: '31.0', temp: '28.6', humidity: '48', wind: '15' },
};

/* ---------------------------------------------------------------------- */
/*  Shared primitives                                                      */
/* ---------------------------------------------------------------------- */

function Card({ className = '', children, style = {}, ...rest }) {
  return (
    <div
      className={`bg-white rounded-xl ${className}`}
      style={{ border: `1px solid ${THEME.border}`, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}

function Pill({ risk, children, className = '' }) {
  const r = RISK[risk];
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${r.bg} ${className}`}>
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------------- */
/*  Nav data                                                                */
/* ---------------------------------------------------------------------- */

const TOP_NAV = ['Home', 'Live Map', 'Heat Alerts', 'Resources', 'Advisory', 'Reports', 'About'];

const NAV_ITEMS = [
  { label: 'Home', icon: Home },
  { label: 'Live Heat-Risk Map', icon: MapIcon },
  { label: 'Executive Overview', icon: LayoutDashboard },
  { label: 'AI Prediction', icon: Sparkles },
  { label: 'Thermal Stress Analysis', icon: Thermometer },
  { label: 'Vulnerable Population', icon: Users },
  { label: 'Alerts & Advisories', icon: Bell },
  { label: 'Resources & Response', icon: LifeBuoy },
  { label: 'Analytics & Reports', icon: BarChart3 },
  { label: 'Public Advisory', icon: Megaphone },
  { label: 'About Project', icon: Info },
];

/* ---------------------------------------------------------------------- */
/*  Government Emblem SVG                                                  */
/* ---------------------------------------------------------------------- */

function StateEmblem({ className = 'w-7 h-10' }) {
  return (
    <img
      src={ashokaEmblemWhite}
      alt="State Emblem of India"
      className={`${className} object-contain`}
    />
  );
}

/* ---------------------------------------------------------------------- */
/*  layout/TopNavBar                                                        */
/* ---------------------------------------------------------------------- */

function TopNavBar({ activeTop, setActiveTop }) {
  return (
    <header
      className="bg-white border-b px-6 py-2.5 flex items-center justify-between gap-6"
      style={{ borderColor: THEME.border }}
    >
      {/* Brand & Emblem Logo */}
      <div className="flex items-center shrink-0">
        <img
          src={heatguardLogo}
          alt="HeatGuard - Heat Risk Early Warning System"
          className="h-14 md:h-16 w-auto object-contain cursor-pointer select-none"
        />
      </div>

      {/* Center Navigation Pills */}
      <nav className="flex gap-x-6 items-center text-sm font-medium text-slate-700">
        {TOP_NAV.map((item) => {
          const isActive = activeTop === item;
          return (
            <button
              key={item}
              onClick={() => setActiveTop(item)}
              className={
                isActive
                  ? 'bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium transition-colors'
                  : 'hover:text-blue-700 transition-colors py-2'
              }
            >
              {item}
            </button>
          );
        })}
      </nav>

      {/* Search and Government Login */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search district, ward or location..."
            className="pl-3.5 pr-10 py-1.5 text-xs rounded-md border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 w-64 text-slate-700 shadow-sm"
          />
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#0B192C] text-white rounded flex items-center justify-center hover:bg-slate-800 transition-colors"
            title="Search"
          >
            <Search className="w-3 h-3" />
          </button>
        </div>
        <div className="text-right">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-md text-white text-xs font-semibold bg-[#0B192C] hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Government Login</span>
          </button>
          <div className="text-[10px] text-slate-400 mt-0.5">A Safer, Healthier and Climate Resilient India</div>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------------- */
/*  layout/HeroBanner                                                       */
/* ---------------------------------------------------------------------- */

function HeroBanner() {
  return (
    <div className="relative overflow-hidden w-full h-[148px] lg:h-[160px]">
      {/* Background Panorama Image positioned to show monuments and shoreline */}
      <img
        src={heroBannerImg}
        alt="Be Aware. Be Prepared. Beat the Heat."
        className="absolute inset-0 w-full h-full object-cover object-[center_78%] pointer-events-none select-none"
      />
      {/* Soft gradient to keep text ultra-crisp and readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent pointer-events-none" />

      {/* Hero Content centered in the sky above the skyline */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pb-4">
        <h1
          className="text-2xl lg:text-3xl font-bold text-white tracking-wide leading-tight"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.65), 0 1px 4px rgba(0,0,0,0.85)' }}
        >
          Be Aware. Be Prepared. Beat the Heat.
        </h1>
        <p
          className="text-white text-xs lg:text-sm mt-1.5 font-medium"
          style={{ textShadow: '0 1px 6px rgba(0,0,0,0.75)' }}
        >
          Real-time information. Early warnings. Safer communities.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  layout/AlertTicker                                                      */
/* ---------------------------------------------------------------------- */

function AlertTicker({ visible, onDismiss }) {
  if (!visible) return null;
  return (
    <div className="bg-red-50 border-y border-red-100 px-6 py-2 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-xs md:text-sm text-red-700 font-medium min-w-0">
        <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
        <span className="truncate">
          <span className="font-bold mr-1">Heatwave Alert:</span>
          Extreme heat conditions expected in parts of West Bengal, Odisha and Jharkhand from 12-15 May. Stay hydrated and avoid prolonged outdoor exposure.
        </span>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <button className="text-xs font-semibold text-slate-800 hover:text-red-700 flex items-center gap-1 transition-colors">
          View All Alerts <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button onClick={onDismiss} className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="Dismiss alert">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  layout/LeftSidebar                                                      */
/* ---------------------------------------------------------------------- */

function LeftSidebar({ active, setActive }) {
  return (
    <aside className="w-60 shrink-0 flex flex-col text-white" style={{ backgroundColor: THEME.navy }}>
      <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ label, icon: Icon }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                isActive
                  ? 'text-white bg-[#1E3E62] shadow-sm'
                  : 'text-slate-300 hover:bg-[#11213A] hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-300' : 'text-slate-400'}`} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Extreme Heat Advisory Tip */}
      <div className="px-4 py-3 flex items-start gap-3 mt-auto">
        <svg className="w-8 h-8 shrink-0 text-amber-400 mt-0.5" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="5" fill="#FBBF24" />
          <g stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="1.5" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22.5" />
            <line x1="1.5" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22.5" y2="12" />
            <line x1="4.5" y1="4.5" x2="6.3" y2="6.3" />
            <line x1="17.7" y1="17.7" x2="19.5" y2="19.5" />
            <line x1="4.5" y1="19.5" x2="6.3" y2="17.7" />
            <line x1="17.7" y1="6.3" x2="19.5" y2="4.5" />
          </g>
        </svg>
        <div className="text-xs text-white/95 font-medium leading-[1.35]">
          <div>Extreme heat</div>
          <div>can be dangerous.</div>
          <div>Stay informed.</div>
          <div>Stay safe.</div>
        </div>
      </div>

      {/* Savanna Sunset Tree Card */}
      <div className="mx-3 mb-3 rounded-xl overflow-hidden h-36 lg:h-[154px] border border-slate-700/70 shadow-md shrink-0">
        <img
          src={sidebarSunsetImg}
          alt="Savanna Sunset"
          className="w-full h-full object-cover object-[center_60%]"
        />
      </div>

      {/* Government of India Branding */}
      <div className="px-4 py-3.5 flex items-center gap-3 border-t border-white/10 shrink-0">
        <StateEmblem className="w-8 h-12 shrink-0 drop-shadow" />
        <div className="text-xs text-white leading-tight font-medium">
          <div className="font-semibold tracking-wide text-white">Government of India</div>
          <div className="text-slate-300 text-[11px] font-normal mt-0.5">Ministry of Earth Sciences</div>
        </div>
      </div>
    </aside>
  );
}

/* ---------------------------------------------------------------------- */
/*  dashboard/MetricsRow                                                    */
/* ---------------------------------------------------------------------- */

function MetricCurrentRisk() {
  return (
    <Card className="p-4 flex flex-col justify-between relative overflow-hidden h-[126px]">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
          <Thermometer className="w-4 h-4 text-red-500" />
        </div>
        <span className="text-xs font-medium text-slate-600">Current Heat-Risk Level</span>
      </div>
      <div className="relative z-10">
        <div className="text-2xl font-bold text-red-600 leading-none">High</div>
        <div className="text-[11px] text-slate-400 mt-1">Across the region</div>
      </div>
      {/* Wave graphic anchored to the bottom and stretching horizontally */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-8 overflow-hidden pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 300 32" preserveAspectRatio="none">
          <defs>
            <linearGradient id="card1Wave" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F87171" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.06" />
            </linearGradient>
          </defs>
          <path d="M0,24 C50,24 80,6 130,12 C180,18 210,28 250,16 C275,8 290,4 300,8 L300,32 L0,32 Z" fill="url(#card1Wave)" />
          <path d="M0,24 C50,24 80,6 130,12 C180,18 210,28 250,16 C275,8 290,4 300,8" fill="none" stroke="#F87171" strokeWidth="1.5" />
        </svg>
      </div>
    </Card>
  );
}

function MetricDistrictsByRisk() {
  const items = [
    { label: 'Low', count: 52, bg: 'bg-emerald-500' },
    { label: 'Moderate', count: 68, bg: 'bg-amber-400' },
    { label: 'High', count: 47, bg: 'bg-orange-500' },
    { label: 'Extreme', count: 18, bg: 'bg-red-600' },
  ];
  return (
    <Card className="p-4 flex flex-col justify-between h-[126px]">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
        <Gauge className="w-4 h-4 text-slate-400" />
        Districts / Wards by Risk Level
      </div>
      <div className="flex justify-between items-center w-full mt-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm ${item.bg}`}>
              {item.count}
            </span>
            <span className="text-[11px] font-medium text-slate-500 mt-1">{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MetricHighestRisk() {
  return (
    <Card className="p-4 flex flex-col justify-between h-[126px]">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
        <MapPin className="w-4 h-4 text-red-500" />
        Highest-Risk Location
      </div>
      <div className="flex items-center justify-between gap-1 mt-1">
        <div className="flex items-center gap-1 font-semibold text-xs text-slate-800 truncate">
          <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
          <span className="truncate">Kolkata, West Bengal</span>
        </div>
        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
          Extreme
        </span>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
        <span>Heat Index: <strong className="font-semibold text-slate-800">49.2 &deg;C</strong></span>
        <button className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-0.5">
          View Details &rarr;
        </button>
      </div>
    </Card>
  );
}

function MetricNextPredicted() {
  const tags = [
    { label: '1 Hour', risk: 'High', isExtreme: false, arrow: false },
    { label: '3 Hours', risk: 'High', isExtreme: false, arrow: false },
    { label: '6 Hours', risk: 'Extreme', isExtreme: true, arrow: true },
  ];
  return (
    <Card className="px-3.5 py-2.5 flex flex-col justify-between h-[126px] overflow-hidden">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
        <Clock className="w-3.5 h-3.5 text-slate-500" />
        Next Predicted Risk
      </div>
      <div className="flex flex-col gap-1 mt-0.5">
        {tags.map((t) => (
          <div
            key={t.label}
            className={`flex justify-between items-center w-full px-2.5 py-1 rounded-md text-xs ${
              t.isExtreme
                ? 'bg-rose-50 text-red-600'
                : 'bg-orange-50/80 text-orange-600'
            }`}
          >
            <span className="font-medium text-slate-700 text-[11px]">{t.label}</span>
            <span className="font-bold flex items-center gap-0.5 text-[11px]">
              {t.arrow && <span className="text-[10px]">&uarr;</span>}
              {t.risk}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MetricActiveAlerts() {
  return (
    <Card className="p-4 flex flex-col justify-between h-[126px]">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
        <Bell className="w-4 h-4 text-slate-700" />
        Active Alerts
      </div>
      <div className="mt-0.5">
        <div className="text-3xl font-bold text-red-600 text-left leading-none">12</div>
        <div className="text-[11px] text-slate-400 mt-1">Active across 5 districts</div>
      </div>
      <div className="flex justify-end mt-auto pt-0.5">
        <button className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1">
          View All &rarr;
        </button>
      </div>
    </Card>
  );
}

function MetricsRow() {
  return (
    <div className="grid grid-cols-5 gap-4">
      <MetricCurrentRisk />
      <MetricDistrictsByRisk />
      <MetricHighestRisk />
      <MetricNextPredicted />
      <MetricActiveAlerts />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  dashboard/LiveHeatMap                                                   */
/* ---------------------------------------------------------------------- */

const INDIA_DISTRICT_GEO =
  'https://raw.githubusercontent.com/geohacker/india/master/district/india_district.geojson';

/* Fallback local GeoJSON for instant offline rendering */
const LOCAL_WB_GEO = '/west_bengal.geojson';

/* Risk assignment per district */
const DISTRICT_RISK_MAP = {
  'Darjiling':           'low',
  'Darjeeling':          'low',
  'Jalpaiguri':          'moderate',
  'Kochbihar':           'moderate',
  'Koch Bihar':          'moderate',
  'Cooch Behar':         'moderate',
  'Alipurduar':          'low',
  'Uttar Dinajpur':      'moderate',
  'North Dinajpur':      'moderate',
  'Dakshin Dinajpur':    'moderate',
  'South Dinajpur':      'moderate',
  'Maldah':              'high',
  'Malda':               'high',
  'Murshidabad':         'high',
  'Birbhum':             'high',
  'Nadia':               'moderate',
  'Barddhaman':          'extreme',
  'Bardhaman':           'extreme',
  'Purba Bardhaman':     'extreme',
  'Paschim Bardhaman':   'high',
  'Hugli':               'high',
  'Hooghly':             'high',
  'Haora':               'extreme',
  'Howrah':              'extreme',
  'Kolkata':             'extreme',
  'North 24 Parganas':   'high',
  'North Twenty Four Parganas': 'high',
  'South 24 Parganas':   'moderate',
  'South Twenty Four Parganas': 'moderate',
  'Puruliya':            'high',
  'Purulia':             'high',
  'Bankura':             'high',
  'West Midnapore':      'high',
  'Paschim Medinipur':   'high',
  'East Midnapore':      'moderate',
  'Purba Medinipur':     'moderate',
  'Jhargram':            'moderate',
  'Kalimpong':           'low',
};

const RISK_COLOR = {
  low:      '#10B981',
  moderate: '#F59E0B',
  high:     '#F97316',
  extreme:  '#DC2626',
};

const DISTRICT_CENTROIDS = [
  { name: 'Darjeeling', coords: [88.26, 27.04] },
  { name: 'Jalpaiguri', coords: [88.72, 26.54] },
  { name: 'Cooch Behar', coords: [89.45, 26.32] },
  { name: 'Uttar Dinajpur', coords: [88.16, 25.95] },
  { name: 'Dakshin Dinajpur', coords: [88.65, 25.35] },
  { name: 'Malda', coords: [88.14, 25.00] },
  { name: 'Murshidabad', coords: [88.27, 24.18] },
  { name: 'Birbhum', coords: [87.65, 23.90] },
  { name: 'Nadia', coords: [88.54, 23.47] },
  { name: 'Purulia', coords: [86.36, 23.33] },
  { name: 'Bankura', coords: [87.07, 23.23] },
  { name: 'Bardhaman', coords: [87.86, 23.24] },
  { name: 'Hooghly', coords: [88.25, 22.90] },
  { name: 'Paschim Medinipur', coords: [87.32, 22.42] },
  { name: 'Purba Medinipur', coords: [87.75, 21.95] },
];

const KOLKATA_COORDS = [88.3639, 22.5726];

function LiveHeatMap({ className = '' }) {
  const [searchText, setSearchText] = useState('');
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([87.85, 24.38]);
  const [geoSource, setGeoSource] = useState(LOCAL_WB_GEO);
  const [showKolkataCard, setShowKolkataCard] = useState(true);

  return (
    <Card className={`p-0 flex flex-col overflow-hidden ${className}`} style={{ minHeight: '560px' }}>
      {/* ---- Header ---- */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-start gap-2 mb-3">
          <MapIcon className="w-5 h-5 text-blue-900 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-base font-bold text-blue-900 leading-tight">Live Heat-Risk Map</h3>
            <p className="text-xs text-slate-500 mt-0.5">Explore district/ward level heat-risk across the region</p>
          </div>
        </div>

        {/* ---- Filter Bar ---- */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search district, ward or location..."
              className="w-full pl-8 pr-3 py-[7px] text-xs rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-300 text-slate-700 placeholder:text-slate-400"
            />
          </div>
          <select className="text-xs px-3 py-[7px] rounded-md border border-slate-200 bg-white text-slate-700 shrink-0 cursor-pointer">
            <option>West Bengal</option>
          </select>
          <select className="text-xs px-3 py-[7px] rounded-md border border-slate-200 bg-white text-slate-700 shrink-0 cursor-pointer">
            <option>All Districts</option>
          </select>
        </div>
      </div>

      {/* ---- Map Container ---- */}
      <div className="relative flex-1 mx-4 mb-4 mt-1 rounded-lg bg-blue-50/60 border border-slate-200 overflow-hidden" style={{ minHeight: '440px' }}>
        {/* react-simple-maps ComposableMap with real West Bengal GeoJSON */}
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 6600, center: center }}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        >
          <ZoomableGroup zoom={zoom} center={center} onMoveEnd={({ coordinates, zoom: z }) => { setCenter(coordinates); setZoom(z); }}>
            <Geographies
              geography={geoSource}
              onError={() => setGeoSource(INDIA_DISTRICT_GEO)}
            >
              {({ geographies }) =>
                geographies
                  .filter((geo) => {
                    const props = geo.properties || {};
                    return (
                      !props.NAME_1 ||
                      props.NAME_1 === 'West Bengal' ||
                      props.ST_NM === 'West Bengal' ||
                      props.state === 'West Bengal'
                    );
                  })
                  .map((geo) => {
                    const distName =
                      geo.properties.NAME_2 ||
                      geo.properties.DISTRICT ||
                      geo.properties.district ||
                      geo.properties.name ||
                      '';
                    const risk = DISTRICT_RISK_MAP[distName] || 'moderate';
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={RISK_COLOR[risk]}
                        fillOpacity={0.88}
                        stroke="#FFFFFF"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: 'none' },
                          hover: {
                            fill: RISK_COLOR[risk],
                            fillOpacity: 1,
                            outline: 'none',
                            cursor: 'pointer',
                          },
                          pressed: { outline: 'none' },
                        }}
                      />
                    );
                  })
              }
            </Geographies>

            {/* District text labels */}
            {DISTRICT_CENTROIDS.map((c) => (
              <Marker key={c.name} coordinates={c.coords}>
                <text
                  textAnchor="middle"
                  y={2}
                  fontSize={7}
                  fontWeight={600}
                  fill="#FFFFFF"
                  style={{
                    pointerEvents: 'none',
                    userSelect: 'none',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  }}
                >
                  {c.name}
                </text>
              </Marker>
            ))}

            {/* Kolkata custom pin marker */}
            <Marker coordinates={KOLKATA_COORDS} onClick={() => setShowKolkataCard((prev) => !prev)} style={{ cursor: 'pointer' }}>
              <g transform="translate(-10, -26)">
                <path
                  d="M10 0C4.5 0 0 4.5 0 10c0 7 10 18 10 18s10-11 10-18c0-5.5-4.5-10-10-10z"
                  fill="#DC2626"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <circle cx="10" cy="10" r="4" fill="#FFFFFF" />
              </g>
              <g transform="translate(0, 8)">
                <rect x={-20} y={0} width={40} height={15} rx={3} fill="#0F172A" />
                <text
                  textAnchor="middle"
                  y={11}
                  fontSize={9}
                  fontWeight={700}
                  fill="#FFFFFF"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  Kolkata
                </text>
              </g>
            </Marker>
          </ZoomableGroup>
        </ComposableMap>

        {/* State border neighboring text overlays */}
        <div className="absolute left-4 top-1/3 text-xs font-semibold text-slate-400/80 italic tracking-widest pointer-events-none select-none">
          BIHAR
        </div>
        <div className="absolute left-6 top-3/5 text-xs font-semibold text-slate-400/80 italic tracking-widest pointer-events-none select-none">
          JHARKHAND
        </div>
        <div className="absolute left-10 bottom-8 text-xs font-semibold text-slate-400/80 italic tracking-widest pointer-events-none select-none">
          ODISHA
        </div>
        <div className="absolute right-6 top-1/2 text-xs font-semibold text-slate-400/80 italic tracking-widest pointer-events-none select-none">
          BANGLADESH
        </div>

        {/* ---- Floating Legend (Top Left) ---- */}
        <div className="absolute top-4 left-4 bg-white/90 p-3 rounded shadow-sm border border-slate-100 z-10">
          <div className="text-xs font-bold text-slate-800 mb-2">Heat-Risk Level</div>
          <div className="space-y-1.5">
            {[
              { color: '#10B981', label: 'Low' },
              { color: '#F59E0B', label: 'Moderate' },
              { color: '#F97316', label: 'High' },
              { color: '#DC2626', label: 'Extreme' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-slate-600">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Zoom Controls (Top Right) ---- */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.3, 4))}
            className="w-8 h-8 bg-white rounded flex items-center justify-center shadow-sm border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.3, 1))}
            className="w-8 h-8 bg-white rounded flex items-center justify-center shadow-sm border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 bg-white rounded flex items-center justify-center shadow-sm border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">
            <Layers className="w-4 h-4" />
          </button>
        </div>

        {/* ---- Scale Bar (Bottom Left) ---- */}
        <div className="absolute bottom-4 left-4 flex items-center z-10 select-none">
          <span className="text-[10px] text-slate-500 mr-1.5">0</span>
          <div className="w-8 h-0 border-t-[1.5px] border-slate-500" />
          <span className="text-[10px] text-slate-500 mx-1.5">50</span>
          <div className="w-8 h-0 border-t-[1.5px] border-slate-500" />
          <span className="text-[10px] text-slate-500 mx-1.5">100</span>
          <div className="w-14 h-0 border-t-[1.5px] border-slate-500" />
          <span className="text-[10px] text-slate-500 ml-1.5">200 km</span>
        </div>

        {/* ---- Kolkata Tooltip Card with Cancel Button ---- */}
        {showKolkataCard ? (
          <div
            className="absolute z-20 w-48 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden transition-all duration-200"
            style={{ right: '12px', bottom: '12px' }}
          >
            {/* Header with Title and Cancel/Close Button */}
            <div className="px-3 pt-2.5 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span className="text-sm font-bold text-gray-900">Kolkata</span>
                </div>
                <button
                  onClick={() => setShowKolkataCard(false)}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Close card to see map clearly"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="mt-1.5">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide text-white uppercase bg-red-600">
                  Extreme Risk
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 mx-3" />

            {/* Stats Grid */}
            <div className="px-3 py-2">
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
                <div className="text-slate-500">Heat Index</div>
                <div className="font-bold text-red-600 text-right">49.2 &deg;C</div>

                <div className="text-slate-500">Temp</div>
                <div className="font-semibold text-slate-800 text-right">41.2 &deg;C</div>

                <div className="text-slate-500">Humidity</div>
                <div className="font-semibold text-slate-800 text-right">68 %</div>

                <div className="text-slate-500">Wind Speed</div>
                <div className="font-semibold text-slate-800 text-right">8 km/h</div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 mx-3" />

            {/* Action Links */}
            <div className="px-3 py-2 space-y-1">
              <button className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                View Full Details <ArrowRight className="w-3 h-3" />
              </button>
              <button className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                Get Advisory <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ) : (
          /* Reopen button when card is closed */
          <button
            onClick={() => setShowKolkataCard(true)}
            className="absolute bottom-3 right-3 z-20 px-2.5 py-1.5 bg-white/95 backdrop-blur-sm rounded-md shadow-md border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-all"
            title="Click to view Kolkata heat details"
          >
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            <span>Kolkata Details</span>
          </button>
        )}
      </div>
    </Card>
  );
}

/*  dashboard/AiPredictionChart                                             */
/* ---------------------------------------------------------------------- */

const RISK_FORECAST_DATA = [
  { time: 'Now', value: 2.3 },
  { time: '1h', value: 2.9 },
  { time: '3h', value: 3.9 },
  { time: '6h', value: 2.9 },
];

const PREDICTED_VS_ACTUAL_DATA = [
  { time: 'Now', predicted: 2.3, actual: 2.2 },
  { time: '1h', predicted: 2.9, actual: 2.8 },
  { time: '3h', predicted: 3.9, actual: 3.7 },
  { time: '6h', predicted: 2.9, actual: 3.0 },
];

const RISK_TICK_LABEL = { 1: 'Low', 2: 'Moderate', 3: 'High', 4: 'Extreme' };

function AiPredictionChart() {
  const [tab, setTab] = useState('forecast');

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-900 shrink-0" />
          <h3 className="text-base font-bold text-blue-900 whitespace-nowrap">AI Prediction</h3>
        </div>
        <select className="text-xs px-2.5 py-1 rounded-md border border-slate-200 bg-white text-slate-700 shrink-0 cursor-pointer">
          <option>Kolkata, West Bengal</option>
        </select>
      </div>

      <div className="flex items-center gap-4 border-b border-slate-100 mb-3">
        <button
          onClick={() => setTab('forecast')}
          className={`text-xs font-semibold pb-1.5 border-b-2 transition-colors ${
            tab === 'forecast'
              ? 'border-blue-700 text-blue-700'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Risk Forecast
        </button>
        <button
          onClick={() => setTab('actual')}
          className={`text-xs font-medium pb-1.5 border-b-2 transition-colors ${
            tab === 'actual'
              ? 'border-blue-700 text-blue-700 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Predicted vs Actual
        </button>
      </div>

      <div style={{ height: '175px' }}>
        <ResponsiveContainer width="100%" height="100%">
          {tab === 'forecast' ? (
            <AreaChart data={RISK_FORECAST_DATA} margin={{ top: 20, right: 16, left: -14, bottom: 0 }}>
              <defs>
                <linearGradient id="riskFillGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#FBBF24" stopOpacity={0.06} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#F1F5F9" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11, fill: '#64748B' }}
                axisLine={{ stroke: '#E2E8F0' }}
                tickLine={false}
              />
              <YAxis
                domain={[1, 4]}
                ticks={[1, 2, 3, 4]}
                tickFormatter={(v) => RISK_TICK_LABEL[v]}
                tick={{ fontSize: 10, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
                width={65}
              />
              <RTooltip formatter={(v) => RISK_TICK_LABEL[Math.round(v)]} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#EA580C"
                strokeWidth={2.5}
                fill="url(#riskFillGradient)"
                dot={{ r: 4, fill: '#EA580C', stroke: '#fff', strokeWidth: 1.5 }}
              />
              <ReferenceDot x="3h" y={3.9} r={5} fill="#DC2626" stroke="#fff" strokeWidth={2}>
                <Label
                  value="Peak Risk 3:00 PM"
                  position="top"
                  fill="#DC2626"
                  fontSize={10}
                  fontWeight={700}
                  offset={10}
                />
              </ReferenceDot>
            </AreaChart>
          ) : (
            <AreaChart data={PREDICTED_VS_ACTUAL_DATA} margin={{ top: 20, right: 16, left: -14, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#F1F5F9" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11, fill: '#64748B' }}
                axisLine={{ stroke: '#E2E8F0' }}
                tickLine={false}
              />
              <YAxis
                domain={[1, 4]}
                ticks={[1, 2, 3, 4]}
                tickFormatter={(v) => RISK_TICK_LABEL[v]}
                tick={{ fontSize: 10, fill: '#64748B' }}
                axisLine={false}
                tickLine={false}
                width={65}
              />
              <RTooltip />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="#EA580C"
                strokeWidth={2}
                fill="#EA580C"
                fillOpacity={0.15}
                name="Predicted"
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#0F172A"
                strokeWidth={2}
                strokeDasharray="4 3"
                fill="#0F172A"
                fillOpacity={0.05}
                name="Actual"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full mt-3.5">
        <div className="flex flex-col justify-center items-start p-2.5 bg-rose-50/70 rounded-lg border border-rose-100/60">
          <div className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
            <Target className="w-3.5 h-3.5 text-rose-500 shrink-0" /> Predicted Peak Risk
          </div>
          <div className="text-sm font-bold text-slate-900 mt-1">3:00 PM</div>
        </div>
        <div className="flex flex-col justify-center items-start p-2.5 bg-slate-50 rounded-lg border border-slate-100">
          <div className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-rose-500 shrink-0" /> Risk Trend
          </div>
          <div className="text-sm font-bold text-red-600 mt-1">&uarr; Increasing</div>
        </div>
        <div className="flex flex-col justify-center items-start p-2.5 bg-slate-50 rounded-lg border border-slate-100">
          <div className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
            <Gauge className="w-3.5 h-3.5 text-blue-500 shrink-0" /> AI Confidence
          </div>
          <div className="text-sm font-bold text-slate-900 mt-1">92%</div>
        </div>
      </div>
    </Card>
  );
}

/*  dashboard/ActiveAlertsList                                              */
/* ---------------------------------------------------------------------- */

const ACTIVE_ALERTS = [
  { risk: 'extreme', place: 'Kolkata, West Bengal', time: '12 May 2025, 10:30 AM', note: 'Extreme heat conditions. Avoid outdoor activities.' },
  { risk: 'high', place: 'Bardhaman, West Bengal', time: '12 May 2025, 09:15 AM', note: 'High heat stress expected. Stay hydrated.' },
  { risk: 'moderate', place: 'Purulia, West Bengal', time: '11 May 2025, 05:20 PM', note: 'Rising temperatures. Take necessary precautions.' },
];

function ActiveAlertsList() {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex items-start gap-2">
          <Bell className="w-5 h-5 text-slate-700 mt-0.5" />
          <h3 className="text-sm font-semibold text-slate-800">Active Alerts</h3>
        </div>
        <button className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 shrink-0">
          View All <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      <div className="space-y-2">
        {ACTIVE_ALERTS.map((a) => (
          <button key={a.place} className="w-full text-left flex items-start gap-2 p-2 rounded-lg hover:bg-slate-50">
            <Thermometer className={`w-4 h-4 mt-0.5 shrink-0 ${RISK[a.risk].text}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Pill risk={a.risk}>{RISK[a.risk].label}</Pill>
                <span className="text-xs font-semibold text-slate-800">{a.place}</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">{a.time}</div>
              <div className="text-xs text-slate-500 mt-1">{a.note}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 mt-1" />
          </button>
        ))}
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------------------- */
/*  dashboard/ThermalStressGrid                                             */
/* ---------------------------------------------------------------------- */

function ThermalStressGrid() {
  return (
    <Card className="p-3.5">
      <div className="flex items-center justify-between mb-2.5 gap-2">
        <div className="flex items-center gap-1.5">
          <Thermometer className="w-4 h-4 text-blue-900 shrink-0" />
          <h3 className="text-sm font-bold text-blue-900 whitespace-nowrap">Thermal Stress Analysis</h3>
        </div>
        <select className="text-xs px-2 py-0.5 rounded-md border border-slate-200 bg-white text-slate-700 shrink-0 cursor-pointer">
          <option>Kolkata, West Bengal</option>
        </select>
      </div>

      {/* Row 1: 4 Metric Cards */}
      <div className="grid grid-cols-4 gap-1.5 mb-2">
        <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50/80 rounded-lg border border-slate-100">
          <div className="w-7 h-7 rounded-md bg-red-50 text-red-500 flex items-center justify-center shrink-0">
            <Thermometer className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] text-slate-500 font-medium leading-none">Temperature</div>
            <div className="text-xs font-bold text-slate-900 leading-none mt-1">41.2 &deg;C</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50/80 rounded-lg border border-slate-100">
          <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
            <Droplets className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] text-slate-500 font-medium leading-none">Humidity</div>
            <div className="text-xs font-bold text-slate-900 leading-none mt-1">68 %</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50/80 rounded-lg border border-slate-100">
          <div className="w-7 h-7 rounded-md bg-teal-50 text-teal-500 flex items-center justify-center shrink-0">
            <Wind className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] text-slate-500 font-medium leading-none">Wind Speed</div>
            <div className="text-xs font-bold text-slate-900 leading-none mt-1">8 km/h</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50/80 rounded-lg border border-slate-100">
          <div className="w-7 h-7 rounded-md bg-yellow-50 text-yellow-500 flex items-center justify-center shrink-0">
            <Sun className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] text-slate-500 font-medium leading-none">Solar Radiation</div>
            <div className="text-xs font-bold text-slate-900 leading-none mt-1">820 W/m&sup2;</div>
          </div>
        </div>
      </div>

      {/* Row 2: Heat Index, WBGT, Stress Score, Main Factors */}
      <div className="grid grid-cols-4 gap-1.5">
        <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50/80 rounded-lg border border-slate-100">
          <div className="w-7 h-7 rounded-md bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <Flame className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] text-slate-500 font-medium leading-none">Heat Index</div>
            <div className="text-xs font-bold text-slate-900 leading-none mt-1">49.2 &deg;C</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-50/80 rounded-lg border border-slate-100">
          <div className="w-7 h-7 rounded-md bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
            <Flame className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="text-[9px] text-slate-500 font-medium leading-none">WBGT</div>
            <div className="text-xs font-bold text-slate-900 leading-none mt-1">31.8 &deg;C</div>
          </div>
        </div>

        <div className="px-2 py-1.5 bg-slate-50/80 rounded-lg border border-slate-100 flex flex-col justify-between">
          <div className="text-[9px] text-slate-500 font-medium leading-tight">Human Thermal Stress Score</div>
          <div className="text-xs font-bold text-slate-900 mt-0.5">
            8.7 <span className="text-[9px] font-normal text-slate-400">/ 10</span>
          </div>
          <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden mt-1">
            <div className="bg-red-600 h-full rounded-full" style={{ width: '87%' }} />
          </div>
        </div>

        <div className="px-2 py-1.5 bg-slate-50/80 rounded-lg border border-slate-100 flex flex-col justify-between">
          <div className="text-[9px] font-bold text-slate-800 leading-none mb-1">Main Factors</div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-1 text-[8.5px] text-slate-600 leading-none">
              <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
              <span className="truncate">High Temperature</span>
            </div>
            <div className="flex items-center gap-1 text-[8.5px] text-slate-600 leading-none">
              <span className="w-1 h-1 rounded-full bg-amber-500 shrink-0" />
              <span className="truncate">High Humidity</span>
            </div>
            <div className="flex items-center gap-1 text-[8.5px] text-slate-600 leading-none">
              <span className="w-1 h-1 rounded-full bg-orange-500 shrink-0" />
              <span className="truncate">Strong Solar Radiation</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/*  dashboard/VulnerablePopulationCard                                      */
/* ---------------------------------------------------------------------- */

const VULNERABLE_GROUPS = [
  { label: 'Outdoor Workers', value: '31.2 L', risk: 'High Risk', isHigh: true, icon: HardHat },
  { label: 'Elderly (60+)', value: '18.7 L', risk: 'High Risk', isHigh: true, icon: UserRound },
  { label: 'Children (<18)', value: '22.4 L', risk: 'Moderate Risk', isHigh: false, icon: Baby },
  { label: 'Healthcare Sensitive', value: '5.6 L', risk: 'High Risk', isHigh: true, icon: HeartPulse },
];

function VulnerablePopulationCard() {
  return (
    <Card className="p-3.5">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-blue-900 shrink-0" />
          <h3 className="text-sm font-bold text-blue-900 whitespace-nowrap">Vulnerable Population</h3>
        </div>
        <button className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 whitespace-nowrap shrink-0 transition-colors">
          View Details &rarr;
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-1.5">
        {VULNERABLE_GROUPS.map(({ label, value, risk, isHigh, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-2 p-2 bg-slate-50/80 rounded-lg border border-slate-100"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                isHigh ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] text-slate-500 font-medium truncate leading-tight">{label}</div>
              <div className="text-xs font-bold text-slate-900 leading-tight mt-0.5">{value}</div>
              <div
                className={`text-[9px] font-semibold mt-0.5 leading-tight ${
                  isHigh ? 'text-rose-600' : 'text-amber-600'
                }`}
              >
                {risk}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/*  dashboard/ResourceResponseGrid                                          */
/* ---------------------------------------------------------------------- */

const RESOURCES = [
  { label: 'Cooling Centers', value: '124', status: 'Active', icon: Snowflake, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Water Stations', value: '312', status: 'Active', icon: Droplets, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { label: 'Hospitals', value: '86', status: 'Operational', icon: Hospital, color: 'text-red-500', bg: 'bg-red-50' },
  { label: 'Ambulances', value: '54', status: 'Available', icon: Siren, color: 'text-orange-500', bg: 'bg-orange-50' },
];

function ResourceResponseGrid() {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-2">
          <LifeBuoy className="w-5 h-5 text-slate-700" />
          <h3 className="text-sm font-semibold text-slate-800">Resource & Response</h3>
        </div>
        <button className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 shrink-0">
          View All <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {RESOURCES.map(({ label, value, status, icon: Icon, color, bg }) => (
          <div key={label} className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${bg}`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-slate-500 truncate">{label}</div>
              <div className="text-sm font-bold text-slate-800">
                {value} <span className="text-xs font-normal text-emerald-600">{status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------------------- */
/*  dashboard/AnalyticsReportsGrid                                          */
/* ---------------------------------------------------------------------- */

const ANALYTICS_ITEMS = [
  { label: 'Historical Heat Trends', icon: TrendingUp },
  { label: 'Heatwave Duration', icon: Flame },
  { label: 'High-Risk Zones', icon: AlertTriangle },
  { label: 'Prediction Performance', icon: Gauge },
  { label: 'Alert Accuracy', icon: Target },
  { label: 'Download Reports', icon: Download },
];

function AnalyticsReportsGrid() {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-slate-700" />
          <h3 className="text-sm font-semibold text-slate-800">Analytics & Reports</h3>
        </div>
        <button className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 shrink-0">
          View All <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {ANALYTICS_ITEMS.map(({ label, icon: Icon }) => (
          <button key={label} className="flex flex-col items-start gap-2 p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-left">
            <Icon className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-medium text-slate-600 leading-snug">{label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------------------- */
/*  dashboard/PublicAdvisoryRow                                             */
/* ---------------------------------------------------------------------- */

const ADVISORY_ITEMS = [
  { label: 'For Citizens', icon: Users, color: 'text-violet-500', bg: 'bg-violet-50', note: 'Stay hydrated. Avoid activities.' },
  { label: 'For Outdoor Workers', icon: HardHat, color: 'text-amber-500', bg: 'bg-amber-50', note: 'Take regular breaks. Keep them hydrated.' },
  { label: 'For Children', icon: Baby, color: 'text-orange-500', bg: 'bg-orange-50', note: 'Avoid direct sunlight. Keep them hydrated.' },
  { label: 'For Elderly', icon: UserRound, color: 'text-red-500', bg: 'bg-red-50', note: 'Stay in cool places. Monitor health.' },
];

function PublicAdvisoryRow() {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-slate-700" />
          <h3 className="text-sm font-semibold text-slate-800">Public Advisory</h3>
        </div>
        <button className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 shrink-0">
          Get Personalized Advisory <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {ADVISORY_ITEMS.map(({ label, icon: Icon, color, bg, note }) => (
          <div key={label} className="flex items-start gap-2.5">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${bg}`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-700">{label}</div>
              <div className="text-xs text-slate-400 mt-0.5 leading-snug">{note}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------------------- */
/*  layout/Footer                                                           */
/* ---------------------------------------------------------------------- */

function Footer() {
  return (
    <footer
      className="border-t px-6 py-3 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2"
      style={{ borderColor: THEME.border }}
    >
      <span>&copy; 2025 HeatGuard. All rights reserved.</span>
      <div className="flex items-center gap-2">
        <span className="inline-flex h-3 w-4 overflow-hidden rounded-sm border border-slate-200">
          <span className="flex-1 bg-orange-500" />
          <span className="flex-1 bg-white" />
          <span className="flex-1 bg-green-600" />
        </span>
        Developed for a Safer and Climate Resilient India
      </div>
      <div className="flex items-center gap-3">
        <a href="#" className="hover:text-slate-600">Privacy Policy</a>
        <span>|</span>
        <a href="#" className="hover:text-slate-600">Terms of Use</a>
        <span>|</span>
        <a href="#" className="hover:text-slate-600">Contact Us</a>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------- */
/*  HeatGuardDashboard (root composition)                                   */
/* ---------------------------------------------------------------------- */

export default function HeatGuardDashboard() {
  const [activeTop, setActiveTop] = useState('Home');
  const [activeSide, setActiveSide] = useState('Home');
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <div style={{ overflowX: 'auto' }}>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: THEME.bg, minWidth: '1280px' }}>
        {/* Full-width Top Navigation Header */}
        <TopNavBar activeTop={activeTop} setActiveTop={setActiveTop} />

        {/* Main Body: LeftSidebar on the left, HeroBanner + Content on the right */}
        <div className="flex flex-1 min-h-0">
          <LeftSidebar active={activeSide} setActive={setActiveSide} />

          <div className="flex-1 flex flex-col min-w-0">
            <HeroBanner />
            <AlertTicker visible={alertVisible} onDismiss={() => setAlertVisible(false)} />

            <main className="flex-1 p-4 space-y-4 min-w-0">
              <MetricsRow />

              <div className="grid gap-4 items-start" style={{ gridTemplateColumns: '1.45fr 1.55fr 1fr' }}>
                <div className="min-w-0">
                  <LiveHeatMap />
                </div>
                <div className="flex flex-col gap-4 min-w-0">
                  <AiPredictionChart />
                  <ThermalStressGrid />
                </div>
                <div className="flex flex-col gap-4 min-w-0">
                  <ActiveAlertsList />
                  <VulnerablePopulationCard />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <ResourceResponseGrid />
                <AnalyticsReportsGrid />
                <PublicAdvisoryRow />
              </div>
            </main>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
