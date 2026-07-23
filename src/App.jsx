import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRightLeft,
  Briefcase,
  Calendar,
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
  Printer,
  Radar,
  Radio,
  Route as RouteIcon,
  Search,
  Sliders,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Utensils,
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
import { TourismMap } from "./components/TourismMap";
import { CagarBudayaView } from "./components/CagarBudayaView";
import { InvestorAnalyticsView } from "./components/InvestorAnalyticsView";
import { Footer } from "./components/Footer";
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
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'advanced' | 'routes' | 'events' | 'cagarbudaya' | 'investor'
  const [query, setQuery] = useState("");
  const [selectedKec, setSelectedKec] = useState("Semua");
  const [selectedKategori, setSelectedKategori] = useState("Semua");
  const [selectedDestinasiModal, setSelectedDestinasiModal] = useState(null);

  // Peer benchmark kecamatan
  const [peerKecA, setPeerKecA] = useState("Batur");
  const [peerKecB, setPeerKecB] = useState("Susukan");

  // Economic Multiplier Interactive Calculator State
  const [calcVisitors, setCalcVisitors] = useState(500000);
  const [calcSpending, setCalcSpending] = useState(300000);

  // Selected thematic route for WebGIS
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  const q = query.toLowerCase();

  // Filtered tourist destinations
  const filteredObjekWisata = useMemo(() => {
    return objekWisata.filter((item) => {
      const matchQuery =
        !q ||
        item.nama.toLowerCase().includes(q) ||
        item.desa.toLowerCase().includes(q) ||
        item.kecamatan.toLowerCase().includes(q);

      const matchKec =
        selectedKec === "Semua" ||
        item.kecamatan.toLowerCase() === selectedKec.toLowerCase();

      const matchKat =
        selectedKategori === "Semua" || item.kategori === selectedKategori;

      return matchQuery && matchKec && matchKat;
    });
  }, [q, selectedKec, selectedKategori]);

  // Top PAD destinations
  const topPADWisata = useMemo(() => {
    return [...objekWisata]
      .sort((a, b) => b.padTahunan - a.padTahunan)
      .slice(0, 8);
  }, []);

  // Summary Metrics
  const totalPengunjungAll = useMemo(() => {
    return objekWisata.reduce((acc, curr) => acc + curr.pengunjung, 0);
  }, []);

  const totalPADAll = useMemo(() => {
    return objekWisata.reduce((acc, curr) => acc + curr.padTahunan, 0);
  }, []);

  const avgOkupansiAkomodasi = useMemo(() => {
    const total = dataAkomodasi.reduce((acc, c) => acc + c.tpk, 0);
    return Math.round(total / dataAkomodasi.length);
  }, []);

  // Economic Multiplier Calculation Result
  const multiplierResult = useMemo(() => {
    return calculateEconomicMultiplier(calcVisitors, calcSpending, 2.4);
  }, [calcVisitors, calcSpending]);

  // Radar Data for Kecamatan Peer Benchmarking
  const radarData = useMemo(() => {
    const rowA = kecamatanAnalytics.find((k) => k.kecamatan === peerKecA);
    const rowB = kecamatanAnalytics.find((k) => k.kecamatan === peerKecB);
    return prepareTourismRadarData(rowA, rowB);
  }, [peerKecA, peerKecB]);

  // Categories list
  const kategoriList = useMemo(() => {
    return ["Semua", ...new Set(objekWisata.map((o) => o.kategori))];
  }, []);

  // Kecamatan list
  const kecamatanList = useMemo(() => {
    return ["Semua", ...kecamatanAnalytics.map((k) => k.kecamatan)];
  }, []);

  return (
    <div className="min-h-screen bg-[#f1f1ef] text-[#141414] font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* Sticky Header */}
      <Header onPrint={() => window.print()} />

      <main className="max-w-[1340px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Banner Hero Intro */}
        <section className="bg-white border-hd shadow-hd p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white bg-[#141414] px-2 py-0.5">
                ANALITIK PARIWISATA &amp; INVESTASI
              </span>
              <span className="font-mono text-[10px] font-extrabold uppercase text-blue-700 bg-blue-50 border border-blue-300 px-2 py-0.5">
                {metaPariwisata.totalDestinasi} Destinasi &amp; {metaPariwisata.totalKecamatan} Kecamatan
              </span>
            </div>
            <h2 className="font-serif italic text-2xl sm:text-3xl font-bold leading-snug">
              Sistem Analitik Pariwisata, Cagar Budaya &amp; Peluang Investasi
            </h2>
            <p className="text-xs text-[#555] font-sans leading-relaxed">
              Visualisasi data sektoral &amp; Open Data Banjarnegara: Mengukur Tourism Potential Score (TPS), pergerakan wisatawan,
              tingkat okupansi penginapan, beban daya dukung (carrying capacity), serta simulasi ROI peluang investasi pariwisata.
            </p>
          </div>

          <div className="bg-[#f1f1ef] border-hd p-3.5 font-mono text-xs shrink-0 space-y-2 min-w-[260px]">
            <div className="flex justify-between items-center text-[11px] font-bold border-b border-[#141414] pb-1">
              <span>TOTAL PAD PARIWISATA</span>
              <span className="text-emerald-700 font-extrabold">{formatShortRupiah(totalPADAll)}</span>
            </div>
            <div className="text-[10px] text-[#666] leading-tight">
              Tercatat dari retribusi destinasi, pajak hotel &amp; homestay, serta wahana wisata daerah.
            </div>
          </div>
        </section>

        {/* Global Filter Bar */}
        <div className="bg-white border-hd shadow-hd p-3.5 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          <div className="flex items-center gap-2 border border-[#141414] px-3 py-2 bg-[#f1f1ef] min-w-[280px]">
            <Search size={16} className="text-[#555]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari objek wisata / desa di Banjarnegara…"
              className="bg-transparent outline-none font-mono text-xs w-full placeholder:text-[#888]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] font-extrabold text-[#747474] uppercase shrink-0">
                Kecamatan:
              </span>
              <select
                value={selectedKec}
                onChange={(e) => setSelectedKec(e.target.value)}
                className="bg-white border border-[#141414] px-2.5 py-1.5 font-mono text-xs font-bold outline-none"
              >
                {kecamatanList.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] font-extrabold text-[#747474] uppercase shrink-0">
                Kategori:
              </span>
              <select
                value={selectedKategori}
                onChange={(e) => setSelectedKategori(e.target.value)}
                className="bg-white border border-[#141414] px-2.5 py-1.5 font-mono text-xs font-bold outline-none"
              >
                {kategoriList.map((kat) => (
                  <option key={kat} value={kat}>
                    {kat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <TabButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            icon={Layers}
          >
            01. Dashboard Utama
          </TabButton>
          <TabButton
            active={activeTab === "advanced"}
            onClick={() => setActiveTab("advanced")}
            icon={TrendingUp}
          >
            02. Analisa Lanjutan
          </TabButton>
          <TabButton
            active={activeTab === "routes"}
            onClick={() => setActiveTab("routes")}
            icon={RouteIcon}
          >
            03. Peta Tematik
          </TabButton>
          <TabButton
            active={activeTab === "events"}
            onClick={() => setActiveTab("events")}
            icon={Calendar}
          >
            04. Kalender Event &amp; Rekomendasi
          </TabButton>
          <TabButton
            active={activeTab === "cagarbudaya"}
            onClick={() => setActiveTab("cagarbudaya")}
            icon={Landmark}
          >
            05. Cagar Budaya
          </TabButton>
          <TabButton
            active={activeTab === "investor"}
            onClick={() => setActiveTab("investor")}
            icon={Briefcase}
          >
            06. Peluang Investasi
          </TabButton>
        </div>

        {/* ========================================== */}
        {/* TAB 01: DASHBOARD UTAMA (OVERVIEW)         */}
        {/* ========================================== */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            {/* Stat Cards Row */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Total Kunjungan Wisatawan"
                value={formatNumber(totalPengunjungAll)}
                sub="wisatawan domestik & mancanegara / thn"
                accent="blue"
                icon={Users}
              />
              <StatCard
                label="Kontribusi Retribusi PAD"
                value={formatShortRupiah(totalPADAll)}
                sub="dari retribusi & pajak sektor wisata"
                accent="emerald"
                icon={DollarSign}
              />
              <StatCard
                label="Tingkat Okupansi Akomodasi"
                value={`${avgOkupansiAkomodasi}%`}
                sub="rata-rata hunian hotel & homestay"
                accent="amber"
                icon={Activity}
              />
              <StatCard
                label="Objek Wisata Terdata"
                value={filteredObjekWisata.length}
                sub={`tersebar di ${metaPariwisata.totalKecamatan} kecamatan`}
                accent="purple"
                icon={MapPin}
              />
            </section>

            {/* WebGIS Interactive Map Section */}
            <Panel>
              <SectionTitle
                index="01"
                title="Peta WebGIS Sebaran Objek Wisata &amp; GeoJSON Kecamatan"
                subtitle="Arahkan kursor pada wilayah kecamatan atau klik pin marker objek wisata untuk analisa lokasi."
                rightElement={
                  <span className="font-mono text-[10px] text-blue-700 font-extrabold bg-blue-50 border border-blue-300 px-2.5 py-1">
                    Layer: GeoJSON Kecamatan Banjarnegara
                  </span>
                }
              />
              <TourismMap
                onSelectDestinasi={(item) => setSelectedDestinasiModal(item)}
                selectedKecamatanFilter={selectedKec}
                activeRouteId={selectedRouteId}
              />
            </Panel>

            {/* Charts Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chart 1: Multi-Year Visitors & PAD */}
              <Panel>
                <SectionTitle
                  index="02"
                  title="Tren Kunjungan Wisatawan &amp; PAD Multi-Tahun"
                  subtitle="Perkembangan kunjungan wisatawan domestik vs mancanegara (2019-2025)."
                />
                <div className="h-[310px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={trenKunjunganTahunan}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="tahun" tick={{ fontSize: 11, fontStyle: "normal" }} />
                      <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                      <Tooltip content={<ChartTooltip formatter={(v) => formatNumber(v)} />} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Bar yAxisId="left" dataKey="domestik" name="Wisatawan Domestik" fill="#2563eb" />
                      <Line yAxisId="right" dataKey="retribusiPAD" name="PAD Retribusi (Rp)" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} />
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
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => formatShortRupiah(v)} />
                      <YAxis dataKey="nama" type="category" width={130} tick={{ fontSize: 10 }} />
                      <Tooltip content={<ChartTooltip formatter={(v) => formatRupiah(v)} />} />
                      <Bar dataKey="padTahunan" name="Retribusi PAD (Rp)" onClick={(data) => setSelectedDestinasiModal(data)}>
                        {topPADWisata.map((entry, i) => (
                          <Cell key={i} fill={i === 0 ? "#059669" : i < 3 ? "#2563eb" : "#4b5563"} className="cursor-pointer hover:opacity-80" />
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
                title="Matriks Utama Destinasi Pariwisata Banjarnegara"
                subtitle="Klik pada baris mana saja untuk melihat detail fasilitas, carrying capacity, dan analisa lokasi."
                rightElement={
                  <span className="font-mono text-[10px] text-[#747474] font-extrabold uppercase">
                    Menampilkan {filteredObjekWisata.length} Destinasi
                  </span>
                }
              />
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left font-mono border border-[#141414]">
                  <thead className="bg-[#141414] text-white uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Nama Objek Wisata</th>
                      <th className="py-2.5 px-2 text-center">Kategori</th>
                      <th className="py-2.5 px-2 text-center">Lokasi</th>
                      <th className="py-2.5 px-2 text-center">Wisatawan / Thn</th>
                      <th className="py-2.5 px-2 text-center">Tiket Masuk</th>
                      <th className="py-2.5 px-2 text-center">PAD Retribusi</th>
                      <th className="py-2.5 px-2 text-center">Carrying Capacity</th>
                      <th className="py-2.5 px-2 text-center">Akses R4</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e7eb]">
                    {filteredObjekWisata.map((item) => {
                      const capInfo = getCarryingCapacityInfo(item.carryingCapacityAvg, item.carryingCapacityMax);
                      return (
                        <tr
                          key={item.id}
                          onClick={() => setSelectedDestinasiModal(item)}
                          className="hover:bg-blue-50/70 cursor-pointer transition-colors"
                        >
                          <td className="py-2.5 px-3 font-bold text-[#141414] flex items-center gap-2">
                            <MapPin size={14} className="text-blue-600 shrink-0" />
                            <span>{item.nama}</span>
                          </td>
                          <td className="text-center py-2.5 px-2">
                            <span className="text-[9px] bg-blue-50 border border-blue-300 text-blue-800 font-bold px-2 py-0.5 uppercase">
                              {item.kategori}
                            </span>
                          </td>
                          <td className="text-center py-2.5 px-2 text-[#555]">
                            {item.desa}, Kec. {item.kecamatan}
                          </td>
                          <td className="text-center font-bold text-[#141414]">
                            {formatNumber(item.pengunjung)}
                          </td>
                          <td className="text-center text-blue-700 font-bold">
                            {item.tiket ? formatRupiah(item.tiket) : "Gratis"}
                          </td>
                          <td className="text-center font-bold text-emerald-700">
                            {formatShortRupiah(item.padTahunan)}
                          </td>
                          <td className="text-center py-2.5 px-2">
                            <span className={`text-[9px] font-extrabold px-2 py-0.5 border ${capInfo.border} ${capInfo.bg} ${capInfo.color}`}>
                              {capInfo.status}
                            </span>
                          </td>
                          <td className="text-center font-bold">
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

        {/* ========================================== */}
        {/* TAB 02: ANALISA LANJUTAN                  */}
        {/* ========================================== */}
        {activeTab === "advanced" && (
          <div className="space-y-6 animate-fade-in">
            {/* Section 1: Tourism Potential Score (TPS) */}
            <Panel>
              <SectionTitle
                index="01"
                title="Tourism Potential Score (TPS) — Pemetaan Potensi Per Kecamatan"
                subtitle="Skor komposit (0-100) berdasarkan 5 dimensi: Daya Tarik, Retribusi, Aksesibilitas, Akomodasi, &amp; Promosi Digital."
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                {/* Radar Chart Peer Benchmark */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 bg-[#f1f1ef] border-hd p-3">
                    <span className="font-mono text-xs font-extrabold uppercase text-[#141414]">
                      Komparasi Peer Kecamatan:
                    </span>
                    <div className="flex items-center gap-2">
                      <select
                        value={peerKecA}
                        onChange={(e) => setPeerKecA(e.target.value)}
                        className="bg-white border border-[#141414] p-1.5 font-mono text-xs font-bold outline-none"
                      >
                        {kecamatanAnalytics.map((k) => (
                          <option key={k.kecamatan} value={k.kecamatan}>
                            A: {k.kecamatan}
                          </option>
                        ))}
                      </select>
                      <span className="font-mono text-xs font-bold">vs</span>
                      <select
                        value={peerKecB}
                        onChange={(e) => setPeerKecB(e.target.value)}
                        className="bg-white border border-[#141414] p-1.5 font-mono text-xs font-bold outline-none"
                      >
                        {kecamatanAnalytics.map((k) => (
                          <option key={k.kecamatan} value={k.kecamatan}>
                            B: {k.kecamatan}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="h-[340px] border border-[#141414] bg-white p-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontStyle: "normal" }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                        <RechartsRadar name={peerKecA} dataKey={peerKecA} stroke="#2563eb" fill="#2563eb" fillOpacity={0.35} strokeWidth={2} />
                        <RechartsRadar name={peerKecB} dataKey={peerKecB} stroke="#d97706" fill="#d97706" fillOpacity={0.35} strokeWidth={2} />
                        <Legend wrapperStyle={{ fontSize: 11 }} />
                        <Tooltip content={<ChartTooltip formatter={(v) => `${v} Pts`} />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Top TPS Kecamatan Table */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs font-extrabold uppercase border-b border-[#141414] pb-1.5">
                    Ranking TPS Kecamatan Teratas
                  </h3>
                  <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                    {kecamatanAnalytics.map((kec, idx) => (
                      <div
                        key={kec.kecamatan}
                        className="p-3 border border-[#141414] bg-white shadow-hd flex items-center justify-between font-mono text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-sm bg-[#141414] text-white w-6 h-6 flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <div>
                            <span className="font-bold text-[#141414] block">Kec. {kec.kecamatan}</span>
                            <span className="text-[10px] text-[#666]">
                              {kec.objekWisataCount} Objek Wisata | Multiplier: {kec.multiplierIndex}x
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-extrabold text-sm text-blue-700 block">
                            {kec.tpsScore} <span className="text-[9px] font-normal text-[#555]">/ 100</span>
                          </span>
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 bg-blue-50 border border-blue-300 text-blue-800">
                            {kec.tpsScore >= 80 ? "Sangat Tinggi" : kec.tpsScore >= 70 ? "Tinggi" : "Sedang"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Panel>

            {/* Section 2: Visitor Flow & Seasonality Pattern */}
            <Panel>
              <SectionTitle
                index="02"
                title="Visitor Flow &amp; Pola Musiman Kunjungan (Seasonality)"
                subtitle="Identifikasi bulan lonjakan (peak season) dan strategi pemerataan kunjungan sepanjang tahun."
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={seasonalityBulanan}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="bulan" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip content={<ChartTooltip formatter={(v) => `${formatNumber(v)} Orang`} />} />
                      <Bar dataKey="kunjungan" name="Perkiraan Wisatawan">
                        {seasonalityBulanan.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              entry.status === "Super Peak"
                                ? "#dc2626"
                                : entry.status === "Peak"
                                ? "#f59e0b"
                                : "#2563eb"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-[#f1f1ef] border border-[#141414] p-4 font-mono text-xs space-y-3">
                  <div className="font-extrabold uppercase border-b border-[#141414] pb-1 text-red-700 flex items-center gap-1.5">
                    <AlertTriangle size={16} /> Analisa Lonjakan Musiman
                  </div>
                  <div className="space-y-2 text-[11px] leading-relaxed">
                    <p>
                      • <b>Super Peak:</b> Bulan <b>Agustus (DCF)</b> &amp; <b>Desember (Nataru)</b> mencapai puncak 245.000+ wisatawan/bulan.
                    </p>
                    <p>
                      • <b>Low Season:</b> Bulan Maret (Pra-Ramadhan) &amp; Februari mengalami penurunan hingga 72.000 wisatawan.
                    </p>
                  </div>
                  <div className="p-2.5 bg-white border border-[#141414] text-[10px] space-y-1">
                    <span className="font-bold text-[#141414] block">💡 Rekomendasi Tindakan:</span>
                    <span>Penyelenggaraan event pengganti di bulan low-season (Maret/September) seperti Festival Dawet Ayu.</span>
                  </div>
                </div>
              </div>
            </Panel>

            {/* Section 3: Economic Multiplier Calculator */}
            <Panel>
              <SectionTitle
                index="03"
                title="Kalkulator Dampak Economic Multiplier Sektor Pariwisata"
                subtitle="Simulasi perputaran uang dan manfaat langsung terhadap ekonomi UMKM lokal."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f1f1ef] border border-[#141414] p-5">
                {/* Input Controls */}
                <div className="space-y-4 font-mono text-xs">
                  <h3 className="font-extrabold uppercase border-b border-[#141414] pb-1">
                    Parameter Input Simulasi
                  </h3>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#555] block">
                      Jumlah Wisatawan Tahunan: <b>{formatNumber(calcVisitors)}</b> orang
                    </label>
                    <input
                      type="range"
                      min="100000"
                      max="2500000"
                      step="50000"
                      value={calcVisitors}
                      onChange={(e) => setCalcVisitors(Number(e.target.value))}
                      className="w-full cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#555] block">
                      Rata-Rata Belanja Wisatawan / Kunjungan: <b>{formatRupiah(calcSpending)}</b>
                    </label>
                    <input
                      type="range"
                      min="100000"
                      max="1000000"
                      step="25000"
                      value={calcSpending}
                      onChange={(e) => setCalcSpending(Number(e.target.value))}
                      className="w-full cursor-pointer"
                    />
                  </div>

                  <div className="text-[10px] text-[#666] italic bg-white p-2 border border-gray-300">
                    *Faktor pengali ekonomi (multiplier factor) Banjarnegara dikalkulasi pada <b>2.4x</b> berdasarkan perputaran rantai pasok lokal.
                  </div>
                </div>

                {/* Output Impact Display */}
                <div className="bg-white border border-[#141414] p-4 shadow-hd space-y-3 font-mono">
                  <h3 className="font-extrabold text-xs uppercase border-b border-[#141414] pb-1 text-emerald-700">
                    Proyeksi Dampak Ekonomi
                  </h3>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#666]">Pengeluaran Langsung (Direct):</span>
                      <span className="font-bold text-[#141414]">{formatShortRupiah(multiplierResult.directSpending)}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#666]">Manfaat UMKM &amp; Kuliner (45%):</span>
                      <span className="font-bold text-blue-700">{formatShortRupiah(multiplierResult.msmeBenefit)}</span>
                    </div>

                    <div className="p-3 bg-emerald-50 border border-emerald-400 mt-2 space-y-1">
                      <span className="text-[10px] font-extrabold text-emerald-900 uppercase block">
                        TOTAL EFstring EKONOMI (INDIRECT &amp; INDUCED)
                      </span>
                      <div className="text-xl font-black text-emerald-700">
                        {formatShortRupiah(multiplierResult.totalEconomicImpact)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 03: PETA TEMATIK                       */}
        {/* ========================================== */}
        {activeTab === "routes" && (
          <div className="space-y-6 animate-fade-in">
            <Panel>
              <SectionTitle
                index="01"
                title="Peta Tematik &amp; Koridor Rute Wisata Banjarnegara"
                subtitle="Pilih salah satu rute tematik di bawah ini untuk menampilkan koridor di peta interaktif."
              />

              {/* WebGIS Map Filtered by Route */}
              <TourismMap
                onSelectDestinasi={(item) => setSelectedDestinasiModal(item)}
                selectedKecamatanFilter="Semua"
                activeRouteId={selectedRouteId}
              />
            </Panel>

            {/* Rute Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ruteWisataTematik.map((rute) => {
                const isSelected = selectedRouteId === rute.id;
                return (
                  <div
                    key={rute.id}
                    className={`bg-white border-hd shadow-hd p-4 space-y-3 transition-all ${
                      isSelected ? "border-2 border-blue-600 bg-blue-50/40" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span
                          className="font-mono text-[9px] font-extrabold uppercase px-2 py-0.5 text-white inline-block mb-1"
                          style={{ backgroundColor: rute.warna }}
                        >
                          {rute.durasi}
                        </span>
                        <h3 className="font-serif italic text-lg font-bold text-[#141414]">
                          {rute.namaRute}
                        </h3>
                      </div>

                      <button
                        onClick={() => setSelectedRouteId(isSelected ? null : rute.id)}
                        className={`font-mono text-[10px] font-extrabold uppercase px-3 py-1.5 border border-[#141414] shadow-hd transition cursor-pointer ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-white text-[#141414] hover:bg-[#f1f1ef]"
                        }`}
                      >
                        {isSelected ? "✔ Rute Aktif" : "Tampilkan Rute"}
                      </button>
                    </div>

                    <p className="text-xs font-sans text-[#555] leading-relaxed">
                      {rute.deskripsi}
                    </p>

                    <div className="font-mono text-xs space-y-1 bg-[#f1f1ef] p-2.5 border border-[#141414]">
                      <span className="font-bold text-[10px] uppercase text-[#747474] block">
                        Destinasi Singgah Utama:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {rute.objekTujuan.map((obj, i) => (
                          <span
                            key={i}
                            className="bg-white border border-gray-400 text-[10px] font-bold px-2 py-0.5"
                          >
                            📍 {obj}
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

        {/* ========================================== */}
        {/* TAB 04: KALENDER EVENT & REKOMENDASI        */}
        {/* ========================================== */}
        {activeTab === "events" && (
          <div className="space-y-6 animate-fade-in">
            {/* Section 1: Event Calendar */}
            <Panel>
              <SectionTitle
                index="01"
                title="Kalender Event &amp; Festival Budaya Banjarnegara"
                subtitle="Agenda festival tahunan pendongkrak kunjungan wisatawan."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {kalenderEvent.map((ev) => (
                  <div
                    key={ev.id}
                    className="bg-white border-hd shadow-hd p-4 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[9px] font-extrabold uppercase px-2 py-0.5 bg-[#141414] text-white">
                          {ev.bulan}
                        </span>
                        <span className="font-mono text-[9px] font-extrabold uppercase text-blue-700 bg-blue-50 border border-blue-300 px-1.5 py-0.5">
                          {ev.status}
                        </span>
                      </div>

                      <h3 className="font-serif italic text-base font-bold text-[#141414] leading-snug">
                        {ev.namaEvent}
                      </h3>

                      <div className="font-mono text-[11px] text-[#555] space-y-1">
                        <div>📅 <b>{ev.tanggal}</b></div>
                        <div>📍 {ev.lokasi}</div>
                        <div>👥 Est. <b>{formatNumber(ev.estimasiPengunjung)}</b> Pengunjung</div>
                      </div>

                      <div className="bg-[#f1f1ef] p-2 border border-gray-300 font-mono text-[10px] text-[#444]">
                        <b>Highlight:</b> {ev.highlight}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200 text-[10px] font-mono text-[#666]">
                      Penyelenggara: <b>{ev.penyelenggara}</b>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Section 2: Policy Recommendations */}
            <Panel>
              <SectionTitle
                index="02"
                title="Rekomendasi Kebijakan Pengembangan Pariwisata (Data-Driven)"
                subtitle="Output formulasi strategi untuk Dinas Pariwisata &amp; Kebudayaan Kabupaten Banjarnegara."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rekomendasiKebijakan.map((rek, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-hd shadow-hd p-4 space-y-2.5 font-mono text-xs"
                  >
                    <div className="flex justify-between items-center border-b border-[#141414] pb-1.5">
                      <span className="font-extrabold text-[#141414] uppercase">
                        {idx + 1}. {rek.aspek}
                      </span>
                      <span
                        className={`text-[9px] font-extrabold px-2 py-0.5 border ${
                          rek.prioritas.includes("TINGGI")
                            ? "bg-red-100 text-red-800 border-red-400"
                            : "bg-amber-100 text-amber-800 border-amber-400"
                        }`}
                      >
                        {rek.prioritas}
                      </span>
                    </div>

                    <div className="text-[11px] text-red-700 bg-red-50 p-2 border border-red-200">
                      <b>Isu/Tantangan:</b> {rek.masalah}
                    </div>

                    <div className="text-[11px] text-[#141414] bg-[#f1f1ef] p-2 border border-[#141414]">
                      <b>Rekomendasi Aksi:</b> {rek.rekomendasi}
                    </div>

                    <div className="text-[10px] text-emerald-800 font-bold">
                      🎯 <b>Target Dampak:</b> {rek.dampakTarget}
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 05: CAGAR BUDAYA                     */}
        {/* ========================================== */}
        {activeTab === "cagarbudaya" && (
          <CagarBudayaView />
        )}

        {/* ========================================== */}
        {/* TAB 06: PELUANG INVESTASI (NEW INVESTOR)   */}
        {/* ========================================== */}
        {activeTab === "investor" && (
          <InvestorAnalyticsView />
        )}
      </main>

      {/* Drill-down Modal */}
      {selectedDestinasiModal && (
        <DestinasiDetailModal
          item={selectedDestinasiModal}
          onClose={() => setSelectedDestinasiModal(null)}
        />
      )}

      {/* Footer & Disclaimer */}
      <Footer />
    </div>
  );
}

export default App;
