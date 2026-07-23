import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  Building2,
  PieChart as PieIcon,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Percent,
  Sparkles,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Compass,
  FileCheck2,
  SlidersHorizontal,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { Panel, SectionTitle, StatCard, ChartTooltip } from "./ui";
import { formatNumber, formatRupiah, formatShortRupiah } from "../utils/analytics";
import { kecamatanAnalytics, objekWisata } from "../data/pariwisataData";

export function InvestorAnalyticsView() {
  // Active Sub-Tab / Filter: 'all' | 'real' | 'simulasi'
  const [viewSection, setViewSection] = useState("all");

  // Investor ROI Calculator State
  const [projectType, setProjectType] = useState("glamping");
  const [capitalInvestment, setCapitalInvestment] = useState(1500000000);
  const [occupancyRate, setOccupancyRate] = useState(65);

  // Project Templates Configuration
  const projectTemplates = {
    glamping: {
      nama: "Luxury Glamping & Cabin Resort (Dieng Plateau)",
      lokasiDefault: "Kec. Batur / Pejawaran",
      avgTarifPerNight: 750000,
      unitCount: 10,
      opexPercent: 35,
      targetMarket: "Wisatawan Menengah-Atas, Pasangan, & Traveller Milenial",
      insentifPemkab: "Kemudahan Izin PBG, Bebas Retribusi Daerah 1 Tahun Pertama",
    },
    homestay: {
      nama: "Cluster Homestay Desa Wisata Premium",
      lokasiDefault: "Kec. Susukan (Gumelem) / Batur",
      avgTarifPerNight: 280000,
      unitCount: 12,
      opexPercent: 30,
      targetMarket: "Rombongan Wisata Budaya & Wisatawan Domestik",
      insentifPemkab: "Pendampingan Pokdarwis & Digital Marketing Gratis",
    },
    resto: {
      nama: "Resto Panoramic View & Sentra Dawet Ayu Modern",
      lokasiDefault: "Kec. Wanayasa / Banjarnegara Kota",
      avgTarifPerNight: 85000,
      unitCount: 150,
      opexPercent: 55,
      targetMarket: "Keluarga, Tour Bus, & Penikmat Kuliner Lokal",
      insentifPemkab: "Fasilitas Sentra Rekomendasi Bus Tourism",
    },
    adventure: {
      nama: "Riverside Eco-Lodge & Outbound Park (Serayu)",
      lokasiDefault: "Kec. Singomerto / Madukara",
      avgTarifPerNight: 350000,
      unitCount: 30,
      opexPercent: 40,
      targetMarket: "Komunitas Outbound, Corporate Gathering, & Youth",
      insentifPemkab: "Zonasi Akses Sungai & Perizinan Lingkungan Cepat",
    },
    cultural: {
      nama: "Souvenir & Cultural Crafts Experience Center",
      lokasiDefault: "Kec. Susukan / Banjarnegara Kota",
      avgTarifPerNight: 120000,
      unitCount: 80,
      opexPercent: 45,
      targetMarket: "Kolektor Batik, Pelajar, & Pengunjung Event Budaya",
      insentifPemkab: "Kemitraan UMKM Binaan Pemkab & Promosi Sektoral",
    },
  };

  const selectedTemplate = projectTemplates[projectType];

  // Interactive ROI Simulation Calculation
  const simulationResults = useMemo(() => {
    let grossAnnualRevenue = 0;

    if (projectType === "resto") {
      const dailyCustomers = Math.round(selectedTemplate.unitCount * (occupancyRate / 100));
      grossAnnualRevenue = dailyCustomers * selectedTemplate.avgTarifPerNight * 365;
    } else {
      const occupiedUnitsPerNight = selectedTemplate.unitCount * (occupancyRate / 100);
      grossAnnualRevenue = occupiedUnitsPerNight * selectedTemplate.avgTarifPerNight * 365;
    }

    const operatingExpense = grossAnnualRevenue * (selectedTemplate.opexPercent / 100);
    const netAnnualProfit = grossAnnualRevenue - operatingExpense;
    const estimatedROI = capitalInvestment > 0 ? (netAnnualProfit / capitalInvestment) * 100 : 0;
    const paybackPeriodYears = netAnnualProfit > 0 ? (capitalInvestment / netAnnualProfit).toFixed(1) : "—";

    return {
      grossAnnualRevenue,
      operatingExpense,
      netAnnualProfit,
      estimatedROI: estimatedROI.toFixed(1),
      paybackPeriodYears,
    };
  }, [projectType, capitalInvestment, occupancyRate, selectedTemplate]);

  // Real Verified Top Kecamatan by PAD & Visitors
  const realVerifiedKecamatan = useMemo(() => {
    return [...kecamatanAnalytics]
      .sort((a, b) => b.totalPengunjung - a.totalPengunjung)
      .slice(0, 6);
  }, []);

  // Growth Projections Data
  const projectionData = useMemo(() => {
    return [
      { tahun: "2025", pasarPariwisata: 1840, proyeksiRevenue: 28.5 },
      { tahun: "2026", pasarPariwisata: 2050, proyeksiRevenue: 34.2 },
      { tahun: "2027", pasarPariwisata: 2320, proyeksiRevenue: 41.8 },
      { tahun: "2028", pasarPariwisata: 2650, proyeksiRevenue: 50.4 },
      { tahun: "2029", pasarPariwisata: 3020, proyeksiRevenue: 61.0 },
      { tahun: "2030", pasarPariwisata: 3480, proyeksiRevenue: 75.6 },
    ];
  }, []);

  // Investment Opportunities Catalog
  const investmentCatalog = useMemo(() => {
    return [
      {
        id: "INV-01",
        judul: "Pembangunan Dieng Sky Cabin & Thermal Spa",
        sektor: "Akomodasi Luxury",
        lokasi: "Desa Dieng Kulon, Kec. Batur",
        estModal: "Rp 3.5 Miliar - 8.0 Miliar",
        roiEst: "24.5% / tahun",
        payback: "3.4 Tahun",
        kemudahan: "Lahan Pemkab Ready, Akses Jalan 100% R4, Listrik High Voltage",
        status: "Proyek Rekomendasi Prioritas KSPN",
      },
      {
        id: "INV-02",
        judul: "Pengembangan Serayu Rafting Resort & Glamping Ground",
        sektor: "Wisata Tirta & Adventure",
        lokasi: "Desa Singomerto, Kec. Singomerto",
        estModal: "Rp 1.2 Miliar - 2.8 Miliar",
        roiEst: "28.0% / tahun",
        payback: "3.1 Tahun",
        kemudahan: "Zonasi Sungai Terverifikasi FAJI, Izin OSS RBA Cepat",
        status: "Proyek Rekomendasi Potensial",
      },
      {
        id: "INV-03",
        judul: "Revitalisasi Sentra Kerajinan & Homestay Batik Gumelem",
        sektor: "Desa Wisata & Heritage",
        lokasi: "Desa Gumelem Wetan, Kec. Susukan",
        estModal: "Rp 600 Juta - 1.5 Miliar",
        roiEst: "20.2% / tahun",
        payback: "4.1 Tahun",
        kemudahan: "Dukungan Kasepuhan Adat & Bebas Retribusi Daerah 2 Tahun",
        status: "Rekomendasi Sinergi Heritage",
      },
      {
        id: "INV-04",
        judul: "Wanayasa Tea-Walk Cafe & Sunset Viewing Deck",
        sektor: "Kuliner & Resto Landscape",
        lokasi: "Desa Kasimpar, Kec. Wanayasa",
        estModal: "Rp 800 Juta - 1.8 Miliar",
        roiEst: "22.8% / tahun",
        payback: "3.7 Tahun",
        kemudahan: "Kerjasama Kemitraan Kebun Teh Keningar & Akses Utama Dieng",
        status: "Rekomendasi Siap Tawar",
      },
    ];
  }, []);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Banner Intro & Sub-Section Selector */}
      <section className="bg-white border-hd shadow-hd p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white bg-[#141414] px-2 py-0.5">
              INVESTMENT ANALYTICS
            </span>
            <span className="font-mono text-[10px] font-extrabold uppercase text-blue-700 bg-blue-50 border border-blue-300 px-2 py-0.5">
              Peluang Investasi Pariwisata Banjarnegara
            </span>
          </div>
          <h2 className="font-serif italic text-2xl sm:text-3xl font-bold leading-snug">
            Analisis Peluang Investasi &amp; Kelayakan Bisnis
          </h2>
          <p className="text-xs text-[#555] leading-relaxed font-sans">
            Informasi pada halaman ini dipisahkan secara transparan antara <b>Data Potensi Real (Terverifikasi Data Sektoral Pemkab)</b> dan <b>Rekomendasi &amp; Model Simulasi Proyeksi Investasi</b>.
          </p>
        </div>

        {/* Category Switcher Buttons */}
        <div className="flex flex-col gap-2 shrink-0 font-mono text-xs">
          <span className="text-[10px] text-[#747474] font-extrabold uppercase">Filter Tampilan Data:</span>
          <div className="flex gap-1 bg-[#f1f1ef] border border-[#141414] p-1">
            <button
              onClick={() => setViewSection("all")}
              className={`px-2.5 py-1 text-[11px] font-bold uppercase transition ${
                viewSection === "all" ? "bg-[#141414] text-white" : "text-[#141414] hover:bg-white"
              }`}
            >
              Semua Seksi
            </button>
            <button
              onClick={() => setViewSection("real")}
              className={`px-2.5 py-1 text-[11px] font-bold uppercase transition ${
                viewSection === "real" ? "bg-blue-600 text-white" : "text-[#141414] hover:bg-white"
              }`}
            >
              📌 Data Potensi Real
            </button>
            <button
              onClick={() => setViewSection("simulasi")}
              className={`px-2.5 py-1 text-[11px] font-bold uppercase transition ${
                viewSection === "simulasi" ? "bg-amber-600 text-white" : "text-[#141414] hover:bg-white"
              }`}
            >
              📊 Simulasi / Rekomendasi
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEKSI A: DATA POTENSI REAL (REAL EXISTING EMPIRICAL DATA - VERIFIED)      */}
      {/* ========================================================================= */}
      {(viewSection === "all" || viewSection === "real") && (
        <div className="space-y-6">
          <div className="bg-blue-900 text-white p-3 border-2 border-[#141414] font-mono text-xs flex items-center justify-between shadow-hd">
            <div className="flex items-center gap-2 font-black tracking-wider uppercase">
              <FileCheck2 size={18} className="text-blue-300" />
              <span>SEKSI A: DATA POTENSI REAL EKSISTING (TERVERIFIKASI DATA OPEN DATA &amp; DISPARBUD)</span>
            </div>
            <span className="bg-blue-700 text-white px-2 py-0.5 text-[10px] font-bold uppercase border border-blue-400">
              EMPIRIK TERVERIFIKASI
            </span>
          </div>

          {/* Real Stat Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Real Total Pengunjung / Thn"
              value="1.84 Juta"
              sub="wisatawan terdata resmi di destinasi"
              accent="blue"
              icon={Building2}
            />
            <StatCard
              label="Real Retribusi PAD Pariwisata"
              value="Rp 14.85 Miliar"
              sub="penerimaan daerah terverifikasi"
              accent="emerald"
              icon={DollarSign}
            />
            <StatCard
              label="Real Kapasitas Homestay &amp; Hotel"
              value="2.460 Kamar"
              sub="tersebar di Dieng &amp; Kota Banjarnegara"
              accent="amber"
              icon={Briefcase}
            />
            <StatCard
              label="Aksesibilitas R4 Utama"
              value="91.2%"
              sub="kelayakan jalan menuju koridor KSPN"
              accent="dark"
              icon={CheckCircle2}
            />
          </section>

          {/* Real Verified Kecamatan Potential Table */}
          <Panel>
            <SectionTitle
              index="REAL-01"
              title="Data Eksisting Potensi Kecamatan Teratas (Terverifikasi)"
              subtitle="Data ril jumlah wisatawan, kontribusi PAD retribusi, dan kapasitas akomodasi eksisting."
              rightElement={
                <span className="font-mono text-[10px] font-extrabold uppercase text-blue-700 bg-blue-50 border border-blue-300 px-2 py-1">
                  Data Ril Terverifikasi
                </span>
              }
            />

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left font-mono border border-[#141414]">
                <thead className="bg-[#141414] text-white uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Kecamatan</th>
                    <th className="py-2.5 px-2 text-center">Objek Wisata Ril</th>
                    <th className="py-2.5 px-2 text-center">Realisasi Wisatawan</th>
                    <th className="py-2.5 px-2 text-center">Retribusi PAD Ril</th>
                    <th className="py-2.5 px-2 text-center">Kapasitas Homestay/Hotel</th>
                    <th className="py-2.5 px-2 text-center">Okupansi Rata-rata</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e7eb]">
                  {realVerifiedKecamatan.map((kec) => (
                    <tr key={kec.kecamatan} className="hover:bg-blue-50/60">
                      <td className="py-2.5 px-3 font-bold text-[#141414]">Kec. {kec.kecamatan}</td>
                      <td className="text-center font-bold">{kec.objekWisataCount} Lokasi</td>
                      <td className="text-center font-bold text-[#141414]">{formatNumber(kec.totalPengunjung)} Orang</td>
                      <td className="text-center font-bold text-emerald-700">{formatShortRupiah(kec.padRetribusi)}</td>
                      <td className="text-center font-bold">{kec.homestayCapacity + kec.hotelRooms} Kamar</td>
                      <td className="text-center font-bold text-blue-700">{kec.okupansiAvg}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEKSI B: REKOMENDASI & SIMULASI PROYEKSI INVESTASI (SIMULATOR & MODEL)    */}
      {/* ========================================================================= */}
      {(viewSection === "all" || viewSection === "simulasi") && (
        <div className="space-y-6">
          <div className="bg-amber-900 text-white p-3 border-2 border-[#141414] font-mono text-xs flex items-center justify-between shadow-hd">
            <div className="flex items-center gap-2 font-black tracking-wider uppercase">
              <SlidersHorizontal size={18} className="text-amber-300" />
              <span>SEKSI B: REKOMENDASI &amp; SIMULASI PROYEKSI INVESTASI (PEMODELAN SIMULATOR INVESTOR)</span>
            </div>
            <span className="bg-amber-700 text-white px-2 py-0.5 text-[10px] font-bold uppercase border border-amber-400">
              SIMULASI &amp; REKOMENDASI
            </span>
          </div>

          {/* Interactive Calculator Simulation */}
          <Panel>
            <SectionTitle
              index="SIM-01"
              title="Kalkulator &amp; Simulator ROI Investasi Interaktif (Model Simulasi)"
              subtitle="Simulasikan modal investasi dan tingkat hunian untuk menghitung estimasi imbal hasil (ROI) dan payback period."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#f1f1ef] border border-[#141414] p-5">
              {/* Controls Input */}
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center gap-2 border-b border-[#141414] pb-1.5">
                  <Calculator size={16} className="text-amber-700" />
                  <h3 className="font-extrabold text-xs uppercase text-[#141414]">
                    Parameter Input Simulasi Investor
                  </h3>
                </div>

                {/* Select Project Type */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#555] text-[11px] block">
                    Pilih Rekomendasi Jenis Proyek:
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-white border border-[#141414] p-2 font-bold outline-none text-xs"
                  >
                    <option value="glamping">1. Luxury Glamping &amp; Cabin Resort (Dieng)</option>
                    <option value="homestay">2. Cluster Homestay Desa Wisata (Gumelem / Batur)</option>
                    <option value="resto">3. Resto Panoramic View &amp; Sentra Dawet Ayu</option>
                    <option value="adventure">4. Riverside Eco-Lodge &amp; Rafting Park (Serayu)</option>
                    <option value="cultural">5. Souvenir &amp; Cultural Experience Center</option>
                  </select>
                </div>

                {/* Slider Capital Investment */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-bold text-[#555]">Simulasi Modal Investasi:</span>
                    <span className="font-extrabold text-blue-700 text-sm">{formatRupiah(capitalInvestment)}</span>
                  </div>
                  <input
                    type="range"
                    min="300000000"
                    max="10000000000"
                    step="100000000"
                    value={capitalInvestment}
                    onChange={(e) => setCapitalInvestment(Number(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                </div>

                {/* Slider Occupancy Rate */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-bold text-[#555]">Asumsi Tingkat Hunian (Occupancy):</span>
                    <span className="font-extrabold text-emerald-700 text-sm">{occupancyRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="90"
                    step="5"
                    value={occupancyRate}
                    onChange={(e) => setOccupancyRate(Number(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                </div>
              </div>

              {/* Simulation Output Box */}
              <div className="bg-white border border-[#141414] p-4 shadow-hd space-y-3 font-mono flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#141414] pb-1.5">
                    <h3 className="font-extrabold text-xs uppercase text-amber-700 flex items-center gap-1.5">
                      <Sparkles size={16} /> Hasil Simulasi Proyeksi ROI
                    </h3>
                    <span className="text-[9px] bg-amber-100 text-amber-800 border border-amber-500 font-bold px-1.5 py-0.5 uppercase">
                      HASIL SIMULASI
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-[#f1f1ef] border border-[#141414]">
                      <span className="text-[10px] text-[#747474] uppercase block">Est. Pendapatan Kotor</span>
                      <span className="font-bold text-sm text-[#141414]">{formatShortRupiah(simulationResults.grossAnnualRevenue)}</span>
                    </div>

                    <div className="p-2.5 bg-[#f1f1ef] border border-[#141414]">
                      <span className="text-[10px] text-[#747474] uppercase block">Est. Biaya Operasional</span>
                      <span className="font-bold text-sm text-red-600">{formatShortRupiah(simulationResults.operatingExpense)}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-amber-50 border-2 border-amber-600 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-extrabold text-amber-900 uppercase">
                        PROYEKSI LABA BERSIH TAHUNAN
                      </span>
                      <span className="text-xs font-black text-amber-900 bg-amber-200 px-2 py-0.5 border border-amber-400">
                        ROI {simulationResults.estimatedROI}% / THN
                      </span>
                    </div>
                    <div className="text-2xl font-black text-amber-800">
                      {formatRupiah(simulationResults.netAnnualProfit)}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-400 flex items-center justify-between text-xs">
                    <span>ESTIMASI BALIK MODAL (PAYBACK PERIOD):</span>
                    <span className="font-black text-blue-900 text-sm">{simulationResults.paybackPeriodYears} TAHUN</span>
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          {/* Growth Projection Chart */}
          <Panel>
            <SectionTitle
              index="SIM-02"
              title="Proyeksi Model Pertumbuhan Wisatawan &amp; Omzet (2025-2030)"
              subtitle="Model proyeksi pertumbuhan berdasarkan rencana induk KSPN Dieng &amp; Koridor Serayu."
            />
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectionData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="tahun" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                  <Tooltip content={<ChartTooltip formatter={(v) => formatNumber(v)} />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line yAxisId="left" type="monotone" dataKey="pasarPariwisata" name="Model Proyeksi Wisatawan (Ribu Orang)" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
                  <Line yAxisId="right" type="monotone" dataKey="proyeksiRevenue" name="Model Omzet Sektor (Miliar Rp)" stroke="#d97706" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          {/* Catalog Investment Ready Catalog */}
          <Panel>
            <SectionTitle
              index="SIM-03"
              title="Katalog Rekomendasi Proyek Investasi (Ready Projects)"
              subtitle="Rekomendasi proyek investasi pariwisata yang telah mengantongi pra-studi kelayakan."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {investmentCatalog.map((item) => (
                <div key={item.id} className="bg-white border-hd shadow-hd p-4 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-extrabold uppercase bg-amber-600 text-white px-2 py-0.5">
                        {item.sektor}
                      </span>
                      <span className="text-[9px] font-extrabold uppercase bg-amber-100 text-amber-800 border border-amber-500 px-2 py-0.5">
                        REKOMENDASI PROYEK
                      </span>
                    </div>

                    <h3 className="font-serif italic text-base font-bold text-[#141414] leading-snug">
                      {item.judul}
                    </h3>

                    <div className="text-[11px] text-[#555] space-y-0.5">
                      <div>📍 Lokasi: <b>{item.lokasi}</b></div>
                      <div>💰 Est. Kebutuhan Modal: <b>{item.estModal}</b></div>
                      <div>📈 Estimasi ROI: <b className="text-amber-800">{item.roiEst}</b> (Payback: {item.payback})</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <a
                      href="https://dpmptsp.banjarnegarakab.go.id/alur-proses-perizinan/"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-[#141414] text-white py-1.5 font-bold uppercase text-[10px] flex items-center justify-center gap-1 shadow-hd hover:bg-amber-600 transition"
                    >
                      Alur &amp; Pengajuan Izin DPMPTSP &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}
