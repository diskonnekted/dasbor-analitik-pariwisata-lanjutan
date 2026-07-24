import { useState, useMemo } from "react";
import {
  DollarSign,
  Briefcase,
  Building2,
  CheckCircle2,
  Calculator,
  FileCheck2,
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { Panel, SectionTitle, StatCard, ChartTooltip } from "./ui";
import { formatNumber, formatRupiah, formatShortRupiah } from "../utils/analytics";
import { kecamatanAnalytics, objekWisata } from "../data/pariwisataData";

export function InvestorAnalyticsView() {
  const [viewSection, setViewSection] = useState("all");
  const [projectType, setProjectType] = useState("glamping");
  const [capitalInvestment, setCapitalInvestment] = useState(1500000000);
  const [occupancyRate, setOccupancyRate] = useState(65);

  const projectTemplates = {
    glamping: { nama: "Luxury Glamping & Cabin Resort (Dieng)", avgTarifPerNight: 750000, unitCount: 10, opexPercent: 35 },
    homestay: { nama: "Cluster Homestay Desa Wisata Premium", avgTarifPerNight: 280000, unitCount: 12, opexPercent: 30 },
    resto: { nama: "Resto Panoramic View & Sentra Dawet Ayu", avgTarifPerNight: 85000, unitCount: 150, opexPercent: 55 },
    adventure: { nama: "Riverside Eco-Lodge & Outbound Park (Serayu)", avgTarifPerNight: 350000, unitCount: 30, opexPercent: 40 },
    cultural: { nama: "Souvenir & Cultural Crafts Experience Center", avgTarifPerNight: 120000, unitCount: 80, opexPercent: 45 },
  };

  const selectedTemplate = projectTemplates[projectType];

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
    return { grossAnnualRevenue, operatingExpense, netAnnualProfit, estimatedROI: estimatedROI.toFixed(1), paybackPeriodYears };
  }, [projectType, capitalInvestment, occupancyRate, selectedTemplate]);

  const realVerifiedKecamatan = useMemo(() => [...kecamatanAnalytics].sort((a, b) => b.totalPengunjung - a.totalPengunjung).slice(0, 6), []);

  const projectionData = useMemo(() => [
    { tahun: "2025", pasarPariwisata: 1840, proyeksiRevenue: 28.5 },
    { tahun: "2026", pasarPariwisata: 2050, proyeksiRevenue: 34.2 },
    { tahun: "2027", pasarPariwisata: 2320, proyeksiRevenue: 41.8 },
    { tahun: "2028", pasarPariwisata: 2650, proyeksiRevenue: 50.4 },
    { tahun: "2029", pasarPariwisata: 3020, proyeksiRevenue: 61.0 },
    { tahun: "2030", pasarPariwisata: 3480, proyeksiRevenue: 75.6 },
  ], []);

  const investmentCatalog = useMemo(() => [
    { id: "INV-01", judul: "Pembangunan Dieng Sky Cabin & Thermal Spa", sektor: "Akomodasi Luxury", lokasi: "Desa Dieng Kulon, Kec. Batur", estModal: "Rp 3.5 - 8.0 Miliar", roiEst: "24.5% / tahun", payback: "3.4 Tahun", kemudahan: "Lahan Pemkab Ready, Akses Jalan 100% R4", status: "Prioritas KSPN" },
    { id: "INV-02", judul: "Pengembangan Serayu Rafting Resort & Glamping", sektor: "Wisata Tirta & Adventure", lokasi: "Desa Singomerto, Kec. Singomerto", estModal: "Rp 1.2 - 2.8 Miliar", roiEst: "28.0% / tahun", payback: "3.1 Tahun", kemudahan: "Zonasi Sungai Terverifikasi FAJI", status: "Rekomendasi Potensial" },
    { id: "INV-03", judul: "Revitalisasi Sentra Kerajinan & Homestay Batik Gumelem", sektor: "Desa Wisata & Heritage", lokasi: "Desa Gumelem Wetan, Kec. Susukan", estModal: "Rp 600 Juta - 1.5 Miliar", roiEst: "20.2% / tahun", payback: "4.1 Tahun", kemudahan: "Dukungan Kasepuhan Adat", status: "Sinergi Heritage" },
    { id: "INV-04", judul: "Wanayasa Tea-Walk Cafe & Sunset Viewing Deck", sektor: "Kuliner & Resto Landscape", lokasi: "Desa Kasimpar, Kec. Wanayasa", estModal: "Rp 800 Juta - 1.8 Miliar", roiEst: "22.8% / tahun", payback: "3.7 Tahun", kemudahan: "Kerjasama Kemitraan Kebun Teh", status: "Siap Tawar" },
  ], []);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Banner Intro */}
      <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white bg-slate-800 px-2.5 py-1 rounded-full">
              INVESTMENT ANALYTICS
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary-100 text-primary-800 border border-primary-200">
              Peluang Investasi Pariwisata Banjarnegara
            </span>
          </div>
          <h2 className="font-sans text-xl sm:text-2xl font-bold leading-snug text-slate-900">
            Analisis Peluang Investasi & Kelayakan Bisnis
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Informasi dipisahkan secara transparan antara <b>Data Potensi Real (Terverifikasi)</b> dan <b>Rekomendasi & Model Simulasi Proyeksi Investasi</b>.
          </p>
        </div>

        <div className="flex flex-col gap-2 shrink-0 font-mono text-xs">
          <span className="text-[10px] text-slate-500 font-bold uppercase">Filter Tampilan:</span>
          <div className="flex gap-1 bg-slate-100 border border-slate-200 p-1 rounded-lg">
            {[
              { key: "all", label: "Semua Seksi" },
              { key: "real", label: "Data Potensi Real" },
              { key: "simulasi", label: "Simulasi / Rekomendasi" },
            ].map((btn) => (
              <button
                key={btn.key}
                onClick={() => setViewSection(btn.key)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition ${
                  viewSection === btn.key
                    ? "bg-slate-800 text-white"
                    : "text-slate-600 hover:bg-white"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SEKSI A: DATA POTENSI REAL */}
      {(viewSection === "all" || viewSection === "real") && (
        <div className="space-y-6">
          <div className="bg-blue-900 text-white p-3 border-2 border-slate-800 rounded-xl font-mono text-xs flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 font-bold tracking-wider uppercase">
              <FileCheck2 size={17} className="text-blue-300" />
              <span>SEKSI A: DATA POTENSI REAL EKSISTING (TERVERIFIKASI)</span>
            </div>
            <span className="bg-blue-700 text-white px-2 py-0.5 text-[10px] font-bold uppercase rounded-full border border-blue-500">
              EMPIRIK TERVERIFIKASI
            </span>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Real Total Pengunjung / Thn" value="1.84 Juta" sub="wisatawan terdata resmi di destinasi" accent="blue" icon={Building2} />
            <StatCard label="Real Retribusi PAD Pariwisata" value="Rp 14.85 Miliar" sub="penerimaan daerah terverifikasi" accent="emerald" icon={DollarSign} />
            <StatCard label="Real Kapasitas Akomodasi" value="2.460 Kamar" sub="tersebar di Dieng & Kota Banjarnegara" accent="amber" icon={Briefcase} />
            <StatCard label="Aksesibilitas R4 Utama" value="91.2%" sub="kelayakan jalan menuju koridor KSPN" accent="dark" icon={CheckCircle2} />
          </section>

          <Panel>
            <SectionTitle
              index="REAL-01"
              title="Data Eksisting Potensi Kecamatan Teratas (Terverifikasi)"
              subtitle="Data ril jumlah wisatawan, kontribusi PAD retribusi, dan kapasitas akomodasi eksisting."
              rightElement={<span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary-100 text-primary-800 border border-primary-200">Data Ril Terverifikasi</span>}
            />

            <div className="overflow-x-auto -mx-5 px-5">
              <table className="w-full text-xs text-left font-mono">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-semibold">
                  <tr>
                    <th className="py-3 px-3">Kecamatan</th>
                    <th className="py-3 px-2 text-center">Objek Wisata Ril</th>
                    <th className="py-3 px-2 text-center">Realisasi Wisatawan</th>
                    <th className="py-3 px-2 text-center">Retribusi PAD Ril</th>
                    <th className="py-3 px-2 text-center">Kapasitas Kamar</th>
                    <th className="py-3 px-2 text-center">Okupansi Avg</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {realVerifiedKecamatan.map((kec) => (
                    <tr key={kec.kecamatan} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-semibold text-slate-900">Kec. {kec.kecamatan}</td>
                      <td className="text-center font-semibold">{kec.objekWisataCount} Lokasi</td>
                      <td className="text-center font-semibold text-slate-900">{formatNumber(kec.totalPengunjung)} Orang</td>
                      <td className="text-center font-semibold text-emerald-700">{formatShortRupiah(kec.padRetribusi)}</td>
                      <td className="text-center font-semibold">{kec.homestayCapacity + kec.hotelRooms} Kamar</td>
                      <td className="text-center font-semibold text-primary-700">{kec.okupansiAvg}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      )}

      {/* SEKSI B: SIMULASI */}
      {(viewSection === "all" || viewSection === "simulasi") && (
        <div className="space-y-6">
          <div className="bg-amber-900 text-white p-3 border-2 border-slate-800 rounded-xl font-mono text-xs flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 font-bold tracking-wider uppercase">
              <SlidersHorizontal size={17} className="text-amber-300" />
              <span>SEKSI B: REKOMENDASI & SIMULASI PROYEKSI INVESTASI</span>
            </div>
            <span className="bg-amber-700 text-white px-2 py-0.5 text-[10px] font-bold uppercase rounded-full border border-amber-500">
              SIMULASI & REKOMENDASI
            </span>
          </div>

          {/* Interactive Calculator */}
          <Panel>
            <SectionTitle
              index="SIM-01"
              title="Kalkulator & Simulator ROI Investasi Interaktif"
              subtitle="Simulasikan modal investasi dan tingkat hunian untuk menghitung estimasi ROI dan payback period."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-50 border border-slate-200 rounded-lg p-5">
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
                  <Calculator size={15} className="text-amber-700" />
                  <h3 className="font-semibold text-xs uppercase text-slate-800">Parameter Input Simulasi</h3>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[11px] text-slate-600 block">Pilih Jenis Proyek:</label>
                  <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="w-full bg-white border border-slate-200 p-2 font-semibold rounded-lg outline-none text-xs focus:border-primary-500 transition-all">
                    <option value="glamping">1. Luxury Glamping & Cabin Resort (Dieng)</option>
                    <option value="homestay">2. Cluster Homestay Desa Wisata (Gumelem / Batur)</option>
                    <option value="resto">3. Resto Panoramic View & Sentra Dawet Ayu</option>
                    <option value="adventure">4. Riverside Eco-Lodge & Rafting Park (Serayu)</option>
                    <option value="cultural">5. Souvenir & Cultural Experience Center</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-semibold text-slate-600">Simulasi Modal Investasi:</span>
                    <span className="font-bold text-primary-700 text-sm">{formatRupiah(capitalInvestment)}</span>
                  </div>
                  <input type="range" min="300000000" max="10000000000" step="100000000" value={capitalInvestment} onChange={(e) => setCapitalInvestment(Number(e.target.value))} className="w-full cursor-pointer accent-primary-600" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-semibold text-slate-600">Tingkat Hunian (Occupancy):</span>
                    <span className="font-bold text-emerald-700 text-sm">{occupancyRate}%</span>
                  </div>
                  <input type="range" min="30" max="90" step="5" value={occupancyRate} onChange={(e) => setOccupancyRate(Number(e.target.value))} className="w-full cursor-pointer accent-primary-600" />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-3 font-mono flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <h3 className="font-semibold text-xs uppercase text-amber-700 flex items-center gap-1.5">
                      <Sparkles size={15} /> Hasil Simulasi Proyeksi ROI
                    </h3>
                    <span className="text-[9px] bg-amber-100 text-amber-800 border border-amber-400 font-semibold px-1.5 py-0.5 rounded-full uppercase">
                      HASIL SIMULASI
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="text-[10px] text-slate-500 uppercase block">Est. Pendapatan Kotor</span>
                      <span className="font-bold text-sm text-slate-900">{formatShortRupiah(simulationResults.grossAnnualRevenue)}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="text-[10px] text-slate-500 uppercase block">Est. Biaya Operasional</span>
                      <span className="font-bold text-sm text-red-600">{formatShortRupiah(simulationResults.operatingExpense)}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-amber-50 border-2 border-amber-500 rounded-lg space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-amber-900 uppercase">PROYEKSI LABA BERSIH TAHUNAN</span>
                      <span className="text-xs font-bold text-amber-900 bg-amber-200 px-2 py-0.5 border border-amber-400 rounded-full">
                        ROI {simulationResults.estimatedROI}% / THN
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-amber-800">{formatRupiah(simulationResults.netAnnualProfit)}</div>
                  </div>

                  <div className="p-3 bg-primary-50 border border-primary-300 flex items-center justify-between text-xs rounded-lg">
                    <span>PAYBACK PERIOD:</span>
                    <span className="font-bold text-primary-900 text-sm">{simulationResults.paybackPeriodYears} TAHUN</span>
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          {/* Growth Projection Chart */}
          <Panel>
            <SectionTitle
              index="SIM-02"
              title="Proyeksi Pertumbuhan Wisatawan & Omzet (2025-2030)"
              subtitle="Model proyeksi berdasarkan rencana induk KSPN Dieng & Koridor Serayu."
            />
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectionData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="tahun" tick={{ fontSize: 11, fontFamily: "Inter" }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11, fontFamily: "Inter" }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fontFamily: "Inter" }} />
                  <Tooltip content={<ChartTooltip formatter={(v) => formatNumber(v)} />} />
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: "Inter" }} />
                  <Line yAxisId="left" type="monotone" dataKey="pasarPariwisata" name="Model Proyeksi Wisatawan (Ribu Orang)" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }} />
                  <Line yAxisId="right" type="monotone" dataKey="proyeksiRevenue" name="Model Omzet Sektor (Miliar Rp)" stroke="#d97706" strokeWidth={2.5} dot={{ r: 4, fill: "#d97706", strokeWidth: 2, stroke: "#fff" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          {/* Investment Catalog */}
          <Panel>
            <SectionTitle
              index="SIM-03"
              title="Katalog Rekomendasi Proyek Investasi"
              subtitle="Rekomendasi proyek investasi pariwisata yang telah mengantongi pra-studi kelayakan."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              {investmentCatalog.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-3 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold uppercase bg-amber-600 text-white px-2 py-0.5 rounded-full">{item.sektor}</span>
                      <span className="text-[9px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-400 px-2 py-0.5 rounded-full">REKOMENDASI</span>
                    </div>
                    <h3 className="font-sans text-base font-bold text-slate-900 leading-snug">{item.judul}</h3>
                    <div className="text-[11px] text-slate-500 space-y-0.5">
                      <div>📍 Lokasi: <b className="text-slate-700">{item.lokasi}</b></div>
                      <div>💰 Est. Modal: <b className="text-slate-700">{item.estModal}</b></div>
                      <div>📈 ROI: <b className="text-amber-800">{item.roiEst}</b> (Payback: {item.payback})</div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <a href="https://dpmptsp.banjarnegarakab.go.id/alur-proses-perizinan/" target="_blank" rel="noreferrer" className="w-full bg-slate-800 text-white py-1.5 font-semibold uppercase text-[10px] flex items-center justify-center gap-1 rounded-lg hover:bg-slate-700 transition">
                      Alur & Pengajuan Izin DPMPTSP <ArrowRight size={12} />
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