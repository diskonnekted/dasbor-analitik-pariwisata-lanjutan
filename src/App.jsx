import { useMemo, useState, lazy, Suspense } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CloudSun,
  Compass,
  Database,
  DollarSign,
  ExternalLink,
  Filter as FilterIcon,
  Globe,
  Grid,
  Info,
  Landmark,
  Layers,
  Map,
  MapPin,
  Mountain,
  Printer,
  Radar,
  Radio,
  Route as RouteIcon,
  Search,
  ShieldAlert,
  Sliders,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Utensils,
  X,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar as RechartsRadar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartTooltip,
  DestinasiDetailModal,
  Header,
  Panel,
  ProgressBar,
  SectionTitle,
  StatCard,
  TabButton,
} from "./components/ui";
import { Footer } from "./components/Footer";

// Statically imported views to guarantee 100% production server loading stability
import { TourismMap } from "./components/TourismMap";
import { CagarBudayaView } from "./components/CagarBudayaView";
import { InvestorAnalyticsView } from "./components/InvestorAnalyticsView";
import { AdditionalDestinationsView } from "./components/AdditionalDestinationsView";
import { AdvancedAnalyticsView } from "./components/AdvancedAnalyticsView";
import SmartWeatherView from "./components/SmartWeatherView";
import DisasterRiskView from "./components/DisasterRiskView";
import UMKMTrackerView from "./components/UMKMTrackerView";
import {
  dataAkomodasi,
  kalenderEvent,
  kecamatanAnalytics,
  metaPariwisata,
  objekWisata,
  rekomendasiKebijakan,
  ruteWisataTematik,
  seasonalityBulanan,
  trenKunjunganTahunan,
} from "./data/pariwisataData";
import {
  calculateEconomicMultiplier,
  calculateTPS,
  formatNumber,
  formatRupiah,
  formatShortRupiah,
  getCarryingCapacityInfo,
  prepareTourismRadarData,
} from "./utils/analytics";

function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedKec, setSelectedKec] = useState("Semua");
  const [selectedKategori, setSelectedKategori] = useState("Semua");
  const [selectedDestinasiModal, setSelectedDestinasiModal] = useState(null);

  const [peerKecA, setPeerKecA] = useState("Batur");
  const [peerKecB, setPeerKecB] = useState("Susukan");

  const [calcVisitors, setCalcVisitors] = useState(500000);
  const [calcSpending, setCalcSpending] = useState(300000);

  const [selectedRouteId, setSelectedRouteId] = useState(null);

  const tabs = [
    { key: "overview", label: "Dashboard Utama", icon: Layers },
    { key: "advanced", label: "Analisa Lanjutan", icon: TrendingUp },
    { key: "routes", label: "Peta Tematik", icon: RouteIcon },
    { key: "events", label: "Event & Rekomendasi", icon: Calendar },
    { key: "cagarbudaya", label: "Cagar Budaya", icon: Landmark },
    { key: "investor", label: "Investasi", icon: Briefcase },
    { key: "opendata", label: "Wisata Lainnya", icon: Database },
    { key: "weather", label: "Smart Weather", icon: CloudSun },
    { key: "disaster", label: "Bencana & Risiko", icon: AlertTriangle },
    { key: "umkm", label: "Ekonomi & UMKM", icon: ShoppingCart },
  ];

  const handlePrintRecommendations = () => {
    const printContent = document.getElementById("recommendations-container");
    if (!printContent) return;
    const printWindow = window.open("", "_blank", "width=850,height=650");
    printWindow.document.write(`
      <html>
        <head>
          <title>Rekomendasi Kebijakan Pariwisata Banjarnegara</title>
          <style>
            body { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; color: #1e293b; padding: 30px; line-height: 1.5; background: #fff; }
            h1 { font-family: 'Inter', sans-serif; font-size: 18px; font-weight: bold; border-bottom: 2px solid #0f172a; padding-bottom: 8px; margin-bottom: 20px; color: #0f172a; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
            @media (max-width: 650px) { .grid { grid-template-columns: 1fr; } }
            .card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; background: #fff; page-break-inside: avoid; display: flex; flex-direction: column; justify-content: space-between; }
            .header-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 10px; font-weight: bold; }
            .badge { font-size: 8px; font-weight: bold; border: 1px solid #ef4444; background: #fee2e2; color: #991b1b; padding: 2px 6px; border-radius: 9999px; text-transform: uppercase; }
            .badge-sedang { border-color: #f59e0b; background: #fef3c7; color: #92400e; }
            .issue { color: #b91c1c; background: #fef2f2; border: 1px solid #fee2e2; padding: 8px; border-radius: 6px; margin: 8px 0; font-size: 11px; }
            .action { color: #1e293b; background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px; border-radius: 6px; margin: 8px 0; font-size: 11px; }
            .impact { color: #047857; font-weight: bold; font-size: 10px; margin-top: 5px; text-transform: capitalize; }
          </style>
        </head>
        <body>
          <h1>Laporan Rekomendasi Kebijakan & Strategi Pengembangan Pariwisata</h1>
          <div class="grid">
            ${Array.from(printContent.children).map(child => {
              const aspect = child.querySelector('.font-semibold').innerText;
              const priority = child.querySelector('.rounded-full').innerText;
              const issue = child.querySelector('.bg-red-50').innerText;
              const action = child.querySelector('.bg-slate-50').innerText;
              const impact = child.querySelector('.text-emerald-700').innerText;
              const priorityClass = priority.includes("TINGGI") ? "badge" : "badge badge-sedang";
              return `
                <div class="card">
                  <div>
                    <div class="header-row">
                      <span>${aspect}</span>
                      <span class="${priorityClass}">${priority}</span>
                    </div>
                    <div class="issue">${issue}</div>
                    <div class="action">${action}</div>
                  </div>
                  <div class="impact">${impact}</div>
                </div>
              `;
            }).join('')}
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const q = query.toLowerCase();

  const filteredObjekWisata = useMemo(() => {
    return objekWisata.filter((item) => {
      const matchQuery = !q || item.nama.toLowerCase().includes(q) || item.desa.toLowerCase().includes(q) || item.kecamatan.toLowerCase().includes(q);
      const matchKec = selectedKec === "Semua" || item.kecamatan.toLowerCase() === selectedKec.toLowerCase();
      const matchKat = selectedKategori === "Semua" || item.kategori === selectedKategori;
      return matchQuery && matchKec && matchKat;
    });
  }, [q, selectedKec, selectedKategori]);

  const topPADWisata = useMemo(() => {
    return [...objekWisata].sort((a, b) => b.padTahunan - a.padTahunan).slice(0, 8);
  }, []);

  const totalPengunjungAll = useMemo(() => objekWisata.reduce((acc, curr) => acc + curr.pengunjung, 0), []);
  const totalPADAll = useMemo(() => objekWisata.reduce((acc, curr) => acc + curr.padTahunan, 0), []);
  const avgOkupansiAkomodasi = useMemo(() => {
    const total = dataAkomodasi.reduce((acc, c) => acc + c.tpk, 0);
    return Math.round(total / dataAkomodasi.length);
  }, []);

  const multiplierResult = useMemo(() => calculateEconomicMultiplier(calcVisitors, calcSpending, 2.4), [calcVisitors, calcSpending]);
  const radarData = useMemo(() => {
    const rowA = kecamatanAnalytics.find((k) => k.kecamatan === peerKecA);
    const rowB = kecamatanAnalytics.find((k) => k.kecamatan === peerKecB);
    return prepareTourismRadarData(rowA, rowB);
  }, [peerKecA, peerKecB]);

  const kategoriList = useMemo(() => ["Semua", ...new Set(objekWisata.map((o) => o.kategori))], []);
  const kecamatanList = useMemo(() => ["Semua", ...kecamatanAnalytics.map((k) => k.kecamatan)], []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary-600 selection:text-white flex flex-col justify-between">
      <Header onPrint={() => window.print()} />

      <div className="flex h-[calc(100vh-80px)] overflow-hidden">
        {/* SIDEBAR NAVIGATION */}
        <aside className={`${sidebarOpen ? "w-64" : "w-16"} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out flex-shrink-0`}>
          {/* Sidebar Header */}
          <div className="p-3 border-b border-slate-200 flex items-center justify-between">
            {sidebarOpen && (
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Navigasi</span>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
              title={sidebarOpen ? "Tutup sidebar" : "Buka sidebar"}
            >
              {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>

          {/* Tab Buttons */}
          <nav className="flex-1 overflow-y-auto p-2 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                  title={!sidebarOpen ? tab.label : undefined}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {sidebarOpen && <span className="truncate">{tab.label}</span>}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
        {/* ==========================================
            BANNER HERO INTRO
        =========================================== */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white bg-slate-800 px-2.5 py-1 rounded-full">
                ANALITIK PARIWISATA & INVESTASI
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary-100 text-primary-800 border border-primary-200">
                {metaPariwisata.totalDestinasi} Destinasi & {metaPariwisata.totalKecamatan} Kecamatan
              </span>
            </div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold leading-snug text-slate-900">
              Sistem Analitik Pariwisata, Cagar Budaya & Peluang Investasi
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Visualisasi data sektoral & WebGIS interaktif: Mengukur Tourism Potential Score (TPS), pergerakan wisatawan,
              tingkat okupansi penginapan, beban daya dukung, serta simulasi ROI peluang investasi pariwisata.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 font-mono text-xs shrink-0 space-y-2 min-w-[260px]">
            <div className="flex justify-between items-center text-[11px] font-semibold border-b border-slate-200 pb-1.5">
              <span className="text-slate-600">TOTAL PAD PARIWISATA</span>
              <span className="font-bold text-emerald-700">{formatShortRupiah(totalPADAll)}</span>
            </div>
            <div className="text-[10px] text-slate-500 leading-tight">
              Tercatat dari retribusi destinasi, pajak hotel & homestay, serta wahana wisata daerah.
            </div>
          </div>
        </section>

        {/* ==========================================
            GLOBAL FILTER BAR
        =========================================== */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-3.5 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          <div className="flex items-center gap-2 border border-slate-200 px-3 py-2 bg-slate-50 rounded-lg min-w-[280px]">
            <Search size={15} className="text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari objek wisata / desa di Banjarnegara..."
              className="bg-transparent outline-none font-mono text-xs w-full placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] font-semibold text-slate-500 uppercase shrink-0">
                Kecamatan:
              </span>
              <select
                value={selectedKec}
                onChange={(e) => setSelectedKec(e.target.value)}
                className="bg-white border border-slate-200 px-2.5 py-1.5 font-mono text-xs font-semibold rounded-lg outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              >
                {kecamatanList.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] font-semibold text-slate-500 uppercase shrink-0">
                Kategori:
              </span>
              <select
                value={selectedKategori}
                onChange={(e) => setSelectedKategori(e.target.value)}
                className="bg-white border border-slate-200 px-2.5 py-1.5 font-mono text-xs font-semibold rounded-lg outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              >
                {kategoriList.map((kat) => (
                  <option key={kat} value={kat}>{kat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ==========================================
            TAB 01: DASHBOARD UTAMA
        =========================================== */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            {/* Stat Cards Row */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Kunjungan Wisatawan" value={formatNumber(totalPengunjungAll)} sub="wisatawan domestik & mancanegara / thn" accent="blue" icon={Users} />
              <StatCard label="Kontribusi Retribusi PAD" value={formatShortRupiah(totalPADAll)} sub="dari retribusi & pajak sektor wisata" accent="emerald" icon={DollarSign} />
              <StatCard label="Tingkat Okupansi Akomodasi" value={`${avgOkupansiAkomodasi}%`} sub="rata-rata hunian hotel & homestay" accent="amber" icon={Activity} />
              <StatCard label="Objek Wisata Terdata" value={filteredObjekWisata.length} sub={`tersebar di ${metaPariwisata.totalKecamatan} kecamatan`} accent="purple" icon={MapPin} />
            </section>

            {/* WebGIS Interactive Map */}
            <Panel>
              <SectionTitle
                index="01"
                title="Peta WebGIS Sebaran Objek Wisata & GeoJSON Kecamatan"
                subtitle="Arahkan kursor pada wilayah kecamatan atau klik pin marker objek wisata untuk analisa lokasi."
                rightElement={
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary-100 text-primary-800 border border-primary-200">
                    Layer: GeoJSON Kecamatan Banjarnegara
                  </span>
                }
              />
              <Suspense fallback={<div className="h-[460px] bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center font-mono text-xs font-semibold text-slate-500">Memuat Peta WebGIS Leaflet...</div>}>
                <TourismMap onSelectDestinasi={(item) => setSelectedDestinasiModal(item)} selectedKecamatanFilter={selectedKec} activeRouteId={selectedRouteId} />
              </Suspense>
            </Panel>

            {/* Charts Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chart 1: Multi-Year Visitors & PAD */}
              <Panel>
                <SectionTitle
                  index="02"
                  title="Tren Kunjungan Wisatawan & PAD Multi-Tahun"
                  subtitle="Perkembangan kunjungan wisatawan domestik vs mancanegara (2019-2025)."
                />
                <div className="h-[310px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={trenKunjunganTahunan}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="tahun" tick={{ fontSize: 11, fontFamily: "Inter" }} />
                      <YAxis yAxisId="left" tick={{ fontSize: 11, fontFamily: "Inter" }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fontFamily: "Inter" }} />
                      <Tooltip content={<ChartTooltip formatter={(v) => formatNumber(v)} />} />
                      <Legend wrapperStyle={{ fontSize: 11, fontFamily: "Inter" }} />
                      <Bar yAxisId="left" dataKey="domestik" name="Wisatawan Domestik" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" dataKey="retribusiPAD" name="PAD Retribusi (Rp)" stroke="#059669" strokeWidth={2.5} dot={{ r: 4, fill: "#059669", strokeWidth: 2, stroke: "#fff" }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </Panel>

              {/* Chart 2: Top Destinations by PAD */}
              <Panel>
                <SectionTitle
                  index="03"
                  title="Ranking Objek Wisata Kontributor PAD Terbesar"
                  subtitle="Destinasi wisata dengan retribusi pendapatan daerah tertinggi."
                />
                <div className="h-[310px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topPADWisata} layout="vertical" margin={{ left: 40, right: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" tick={{ fontSize: 11, fontFamily: "Inter" }} tickFormatter={(v) => formatShortRupiah(v)} />
                      <YAxis dataKey="nama" type="category" width={130} tick={{ fontSize: 10, fontFamily: "Inter" }} />
                      <Tooltip content={<ChartTooltip formatter={(v) => formatRupiah(v)} />} />
                      <Bar dataKey="padTahunan" name="Retribusi PAD (Rp)" onClick={(data) => setSelectedDestinasiModal(data)}>
                        {topPADWisata.map((entry, i) => (
                          <Cell key={i} fill={i === 0 ? "#059669" : i < 3 ? "#3b82f6" : "#64748b"} radius={[0, 4, 4, 0]} className="cursor-pointer hover:opacity-80" />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
            </section>

            {/* Objek Wisata Main Table */}
            <Panel>
              <SectionTitle
                index="04"
                title="Matriks Destinasi Pariwisata Banjarnegara"
                subtitle="Klik pada baris untuk melihat detail fasilitas, carrying capacity, dan analisa lokasi."
                rightElement={
                  <span className="font-mono text-[10px] text-slate-500 font-semibold">
                    {filteredObjekWisata.length} Destinasi
                  </span>
                }
              />
              <div className="overflow-x-auto -mx-5 px-5">
                <table className="w-full text-xs text-left font-mono">
                  <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-semibold">
                    <tr>
                      <th className="py-3 px-3">Nama Objek Wisata</th>
                      <th className="py-3 px-2 text-center">Kategori</th>
                      <th className="py-3 px-2 text-center">Lokasi</th>
                      <th className="py-3 px-2 text-center">Wisatawan / Thn</th>
                      <th className="py-3 px-2 text-center">Tiket Masuk</th>
                      <th className="py-3 px-2 text-center">PAD Retribusi</th>
                      <th className="py-3 px-2 text-center">Carrying Cap.</th>
                      <th className="py-3 px-2 text-center">Akses R4</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredObjekWisata.map((item) => {
                      const capInfo = getCarryingCapacityInfo(item.carryingCapacityAvg, item.carryingCapacityMax);
                      return (
                        <tr
                          key={item.id}
                          onClick={() => setSelectedDestinasiModal(item)}
                          className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                        >
                          <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-2">
                            <MapPin size={14} className="text-primary-500 shrink-0" />
                            <span>{item.nama}</span>
                          </td>
                          <td className="text-center py-3 px-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold bg-primary-100 text-primary-700">
                              {item.kategori}
                            </span>
                          </td>
                          <td className="text-center py-3 px-2 text-slate-500">
                            {item.desa}, Kec. {item.kecamatan}
                          </td>
                          <td className="text-center font-semibold text-slate-900">
                            {formatNumber(item.pengunjung)}
                          </td>
                          <td className="text-center text-primary-700 font-semibold">
                            {item.tiket ? formatRupiah(item.tiket) : "Gratis"}
                          </td>
                          <td className="text-center font-semibold text-emerald-700">
                            {formatShortRupiah(item.padTahunan)}
                          </td>
                          <td className="text-center py-3 px-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold ${capInfo.border} ${capInfo.bg} ${capInfo.color}`}>
                              {capInfo.status}
                            </span>
                          </td>
                          <td className="text-center font-semibold">
                            {item.aksesibilitasR4}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>
        )}

        {/* ==========================================
            TAB 02: ANALISA LANJUTAN
        =========================================== */}
        {activeTab === "advanced" && (
          <div className="space-y-6 animate-fade-in">
            {/* Section 1: TPS */}
            <Panel>
              <SectionTitle
                index="01"
                title="Tourism Potential Score (TPS) — Pemetaan Potensi Per Kecamatan"
                subtitle="Skor komposit (0-100) berdasarkan 5 dimensi: Daya Tarik, Retribusi, Aksesibilitas, Akomodasi, & Promosi Digital."
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                {/* Radar Chart Peer Benchmark */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <span className="font-mono text-xs font-semibold text-slate-700">
                      Komparasi Kecamatan:
                    </span>
                    <div className="flex items-center gap-2">
                      <select
                        value={peerKecA}
                        onChange={(e) => setPeerKecA(e.target.value)}
                        className="bg-white border border-slate-200 p-1.5 font-mono text-xs font-semibold rounded-lg outline-none focus:border-primary-500 transition-all"
                      >
                        {kecamatanAnalytics.map((k) => (
                          <option key={k.kecamatan} value={k.kecamatan}>A: {k.kecamatan}</option>
                        ))}
                      </select>
                      <span className="font-mono text-xs font-semibold text-slate-400">vs</span>
                      <select
                        value={peerKecB}
                        onChange={(e) => setPeerKecB(e.target.value)}
                        className="bg-white border border-slate-200 p-1.5 font-mono text-xs font-semibold rounded-lg outline-none focus:border-primary-500 transition-all"
                      >
                        {kecamatanAnalytics.map((k) => (
                          <option key={k.kecamatan} value={k.kecamatan}>B: {k.kecamatan}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="h-[340px] border border-slate-200 bg-white rounded-lg p-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontFamily: "Inter" }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fontFamily: "Inter" }} />
                        <RechartsRadar name={peerKecA} dataKey={peerKecA} stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                        <RechartsRadar name={peerKecB} dataKey={peerKecB} stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} strokeWidth={2} />
                        <Legend wrapperStyle={{ fontSize: 11, fontFamily: "Inter" }} />
                        <Tooltip content={<ChartTooltip formatter={(v) => `${v} Pts`} />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Top TPS Ranking */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs font-semibold text-slate-700 border-b border-slate-100 pb-1.5">
                    Ranking TPS Kecamatan Teratas
                  </h3>
                  <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                    {kecamatanAnalytics.map((kec, idx) => (
                      <div
                        key={kec.kecamatan}
                        className="p-3 border border-slate-200 bg-white rounded-lg hover:shadow-sm hover:border-slate-300 transition-all cursor-default"
                      >
                        <div className="flex items-center justify-between font-mono text-xs">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-sm bg-slate-800 text-white w-6 h-6 flex items-center justify-center rounded-full text-[10px]">
                              {idx + 1}
                            </span>
                            <div>
                              <span className="font-semibold text-slate-900 block">Kec. {kec.kecamatan}</span>
                              <span className="text-[10px] text-slate-500">
                                {kec.objekWisataCount} Objek | Multiplier: {kec.multiplierIndex}x
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="font-bold text-sm text-primary-700 block">
                              {kec.tpsScore} <span className="text-[9px] font-normal text-slate-400">/ 100</span>
                            </span>
                            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
                              kec.tpsScore >= 80 ? "bg-emerald-100 text-emerald-800" : kec.tpsScore >= 70 ? "bg-primary-100 text-primary-800" : "bg-amber-100 text-amber-800"
                            }`}>
                              {kec.tpsScore >= 80 ? "Sangat Tinggi" : kec.tpsScore >= 70 ? "Tinggi" : "Sedang"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Panel>

            {/* Section 2: Seasonality */}
            <Panel>
              <SectionTitle
                index="02"
                title="Visitor Flow & Pola Musiman Kunjungan (Seasonality)"
                subtitle="Identifikasi bulan lonjakan dan strategi pemerataan kunjungan sepanjang tahun."
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={seasonalityBulanan}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="bulan" tick={{ fontSize: 11, fontFamily: "Inter" }} />
                      <YAxis tick={{ fontSize: 11, fontFamily: "Inter" }} />
                      <Tooltip content={<ChartTooltip formatter={(v) => `${formatNumber(v)} Orang`} />} />
                      <Bar dataKey="kunjungan" name="Perkiraan Wisatawan" radius={[4, 4, 0, 0]}>
                        {seasonalityBulanan.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              entry.status === "Super Peak" ? "#dc2626" : entry.status === "Peak" ? "#f59e0b" : "#3b82f6"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 font-mono text-xs space-y-3">
                  <div className="font-semibold uppercase border-b border-slate-200 pb-1.5 text-red-700 flex items-center gap-1.5">
                    <AlertTriangle size={15} /> Analisa Lonjakan Musiman
                  </div>
                  <div className="space-y-2 text-[11px] text-slate-600 leading-relaxed">
                    <p>
                      • <b>Super Peak:</b> Bulan <b>Agustus (DCF)</b> & <b>Desember (Nataru)</b> mencapai puncak 245.000+ wisatawan/bulan.
                    </p>
                    <p>
                      • <b>Low Season:</b> Bulan Maret (Pra-Ramadhan) & Februari mengalami penurunan hingga 72.000 wisatawan.
                    </p>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-[10px] space-y-1 text-slate-600">
                    <span className="font-semibold text-slate-800 block">Rekomendasi:</span>
                    Penyelenggaraan event pengganti di bulan low-season (Maret/September) seperti Festival Dawet Ayu.
                  </div>
                </div>
              </div>
            </Panel>

            {/* Section 3: Economic Multiplier */}
            <Panel>
              <SectionTitle
                index="03"
                title="Kalkulator Dampak Economic Multiplier Sektor Pariwisata"
                subtitle="Simulasi perputaran uang dan manfaat langsung terhadap ekonomi UMKM lokal."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 border border-slate-200 rounded-lg p-5">
                <div className="space-y-4 font-mono text-xs">
                  <h3 className="font-semibold uppercase border-b border-slate-200 pb-1.5 text-slate-800">
                    Parameter Input Simulasi
                  </h3>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-600 block">
                      Jumlah Wisatawan Tahunan: <b className="text-slate-900">{formatNumber(calcVisitors)}</b> orang
                    </label>
                    <input
                      type="range"
                      min="100000"
                      max="2500000"
                      step="50000"
                      value={calcVisitors}
                      onChange={(e) => setCalcVisitors(Number(e.target.value))}
                      className="w-full cursor-pointer accent-primary-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-600 block">
                      Rata-Rata Belanja / Kunjungan: <b className="text-slate-900">{formatRupiah(calcSpending)}</b>
                    </label>
                    <input
                      type="range"
                      min="100000"
                      max="1000000"
                      step="25000"
                      value={calcSpending}
                      onChange={(e) => setCalcSpending(Number(e.target.value))}
                      className="w-full cursor-pointer accent-primary-600"
                    />
                  </div>

                  <div className="text-[10px] text-slate-500 italic bg-white p-2 border border-slate-200 rounded-lg">
                    *Faktor pengali ekonomi dikalkulasi pada <b className="text-slate-700">2.4x</b> berdasarkan perputaran rantai pasok lokal.
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-3 font-mono">
                  <h3 className="font-semibold text-xs uppercase border-b border-slate-200 pb-1 text-emerald-700">
                    Proyeksi Dampak Ekonomi
                  </h3>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Pengeluaran Langsung (Direct):</span>
                      <span className="font-semibold text-slate-900">{formatShortRupiah(multiplierResult.directSpending)}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Manfaat UMKM & Kuliner (45%):</span>
                      <span className="font-semibold text-primary-700">{formatShortRupiah(multiplierResult.msmeBenefit)}</span>
                    </div>

                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg mt-2 space-y-1">
                      <span className="text-[10px] font-bold text-emerald-900 uppercase block">
                        TOTAL DAMPAK EKONOMI (INDIRECT & INDUCED)
                      </span>
                      <div className="text-xl font-bold text-emerald-700">
                        {formatShortRupiah(multiplierResult.totalEconomicImpact)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>

            <Suspense fallback={<div className="p-8 bg-white border border-slate-200 rounded-xl text-center font-mono text-xs font-semibold">Memuat Analitik Lanjutan...</div>}>
              <AdvancedAnalyticsView />
            </Suspense>
          </div>
        )}

        {/* ==========================================
            TAB 03: PETA TEMATIK
        =========================================== */}
        {activeTab === "routes" && (
          <div className="space-y-6 animate-fade-in">
            <Panel>
              <SectionTitle
                index="01"
                title="Peta Tematik & Koridor Rute Wisata Banjarnegara"
                subtitle="Pilih salah satu rute tematik untuk menampilkan koridor di peta interaktif."
              />

              <Suspense fallback={<div className="h-[460px] bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center font-mono text-xs font-semibold text-slate-500">Memuat Peta WebGIS Rute...</div>}>
                <TourismMap onSelectDestinasi={(item) => setSelectedDestinasiModal(item)} selectedKecamatanFilter="Semua" activeRouteId={selectedRouteId} />
              </Suspense>
            </Panel>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ruteWisataTematik.map((rute) => {
                const isSelected = selectedRouteId === rute.id;
                return (
                  <div
                    key={rute.id}
                    className={`bg-white border rounded-xl shadow-sm p-4 space-y-3 transition-all ${
                      isSelected ? "border-primary-400 shadow-md ring-2 ring-primary-500/10" : "border-slate-200 hover:shadow-md"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span
                          className="font-mono text-[9px] font-bold uppercase px-2 py-0.5 text-white rounded-full inline-block mb-1"
                          style={{ backgroundColor: rute.warna }}
                        >
                          {rute.durasi}
                        </span>
                        <h3 className="font-sans text-base font-bold text-slate-900">
                          {rute.namaRute}
                        </h3>
                      </div>

                      <button
                        onClick={() => setSelectedRouteId(isSelected ? null : rute.id)}
                        className={`font-mono text-[10px] font-semibold uppercase px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                          isSelected
                            ? "bg-primary-600 text-white border-primary-600"
                            : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
                        }`}
                      >
                        {isSelected ? "Rute Aktif" : "Tampilkan Rute"}
                      </button>
                    </div>

                    <p className="text-xs font-sans text-slate-500 leading-relaxed">
                      {rute.deskripsi}
                    </p>

                    <div className="font-mono text-xs space-y-1 bg-slate-50 p-2.5 border border-slate-200 rounded-lg">
                      <span className="font-semibold text-[10px] uppercase text-slate-500 block">
                        Destinasi Singgah Utama:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {rute.objekTujuan.map((obj, i) => (
                          <span
                            key={i}
                            className="bg-white border border-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          >
                            {obj}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 04: KALENDER EVENT & REKOMENDASI
        =========================================== */}
        {activeTab === "events" && (
          <div className="space-y-6 animate-fade-in">
            <Panel className="p-5">
              <SectionTitle
                index="01"
                title="Kalender Event & Festival Budaya Banjarnegara"
                subtitle="Agenda festival tahunan pendongkrak kunjungan wisatawan."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {kalenderEvent.map((ev) => (
                  <div
                    key={ev.id}
                    className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-3 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[9px] font-bold uppercase px-2 py-0.5 bg-slate-800 text-white rounded-full">
                          {ev.bulan}
                        </span>
                        <span className="font-mono text-[9px] font-semibold uppercase text-primary-700 bg-primary-50 border border-primary-200 px-1.5 py-0.5 rounded-full">
                          {ev.status}
                        </span>
                      </div>

                      <h3 className="font-sans text-base font-bold text-slate-900 leading-snug">
                        {ev.namaEvent}
                      </h3>

                      <div className="font-mono text-[11px] text-slate-500 space-y-0.5">
                        <div><b className="text-slate-700">{ev.tanggal}</b></div>
                        <div>{ev.lokasi}</div>
                        <div>Est. <b className="text-slate-900">{formatNumber(ev.estimasiPengunjung)}</b> Pengunjung</div>
                      </div>

                      <div className="bg-slate-50 p-2 border border-slate-200 rounded-lg font-mono text-[10px] text-slate-600">
                        <b className="text-slate-800">Highlight:</b> {ev.highlight}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-500">
                      Penyelenggara: <b className="text-slate-700">{ev.penyelenggara}</b>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel className="p-5">
              <SectionTitle
                index="02"
                title="Rekomendasi Kebijakan Pengembangan Pariwisata (Data-Driven)"
                subtitle="Output formulasi strategi untuk Dinas Pariwisata & Kebudayaan Kabupaten Banjarnegara."
                rightElement={
                  <button
                    onClick={handlePrintRecommendations}
                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg px-3 py-1.5 font-mono text-[11px] font-semibold transition shadow-md cursor-pointer shrink-0"
                  >
                    <Printer size={13} /> Cetak Rekomendasi
                  </button>
                }
              />

              <div id="recommendations-container" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rekomendasiKebijakan.map((rek, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-2.5 font-mono text-xs"
                  >
                    <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span className="font-semibold text-slate-900 uppercase">
                        {idx + 1}. {rek.aspek}
                      </span>
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                        rek.prioritas.includes("TINGGI")
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {rek.prioritas}
                      </span>
                    </div>

                    <div className="text-[11px] text-red-700 bg-red-50 p-2 border border-red-200 rounded-lg">
                      <b>Isu/Tantangan:</b> {rek.masalah}
                    </div>

                    <div className="text-[11px] text-slate-800 bg-slate-50 p-2 border border-slate-200 rounded-lg">
                      <b>Rekomendasi Aksi:</b> {rek.rekomendasi}
                    </div>

                    <div className="text-[10px] text-emerald-700 font-semibold">
                      Target Dampak: {rek.dampakTarget}
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {/* ==========================================
            TAB 05: CAGAR BUDAYA
        =========================================== */}
        {activeTab === "cagarbudaya" && (
          <Suspense fallback={<div className="p-8 bg-white border border-slate-200 rounded-xl text-center font-mono text-xs font-semibold">Memuat Halaman Cagar Budaya...</div>}>
            <CagarBudayaView />
          </Suspense>
        )}

        {/* ==========================================
            TAB 06: INVESTASI
        =========================================== */}
        {activeTab === "investor" && (
          <Suspense fallback={<div className="p-8 bg-white border border-slate-200 rounded-xl text-center font-mono text-xs font-semibold">Memuat Analitik Investasi...</div>}>
            <InvestorAnalyticsView />
          </Suspense>
        )}

        {/* ==========================================
            TAB 07: WISATA OPENDATA
        =========================================== */}
        {activeTab === "opendata" && (
          <Suspense fallback={<div className="p-8 bg-white border border-slate-200 rounded-xl text-center font-mono text-xs font-semibold">Memuat Wisata OpenData...</div>}>
            <AdditionalDestinationsView />
          </Suspense>
        )}

        {/* ==========================================
            TAB 08: SMART WEATHER DASHBOARD
        =========================================== */}
        {activeTab === "weather" && (
          <Suspense fallback={<div className="p-8 bg-white border border-slate-200 rounded-xl text-center font-mono text-xs font-semibold">Memuat Weather Dashboard...</div>}>
            <SmartWeatherView />
          </Suspense>
        )}

        {activeTab === "disaster" && (
          <Suspense fallback={<div className="p-8 bg-white border border-slate-200 rounded-xl text-center font-mono text-xs font-semibold">Memuat Disaster Risk Dashboard...</div>}>
            <DisasterRiskView />
          </Suspense>
        )}

        {activeTab === "umkm" && (
          <Suspense fallback={<div className="p-8 bg-white border border-slate-200 rounded-xl text-center font-mono text-xs font-semibold">Memuat UMKM Dashboard...</div>}>
            <UMKMTrackerView />
          </Suspense>
        )}
        </div>
      </div>

      {selectedDestinasiModal && (
        <DestinasiDetailModal
          item={selectedDestinasiModal}
          onClose={() => setSelectedDestinasiModal(null)}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
