import { useState, useMemo } from "react";
import {
  Award,
  TrendingUp,
  Info,
  AlertTriangle,
  Bus,
  Wifi,
} from "lucide-react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  Line,
  ComposedChart,
} from "recharts";
import { Panel, SectionTitle, StatCard } from "./ui";
import { formatNumber, formatShortRupiah } from "../utils/analytics";
import { objekWisata, seasonalityBulanan, kalenderEvent } from "../data/pariwisataData";
import { additionalDestinationsAll } from "../data/additionalDestinations";

// Color mapping for categories in Scatter Plot
const CATEGORY_COLORS = {
  "Alam": "#0284c7",          // Sky Blue
  "Budaya & Sejarah": "#d97706", // Amber
  "Tirta / Air": "#2563eb",   // Royal Blue
  "Edukasi & Satwa": "#059669", // Emerald
  "Religi": "#7c3aed",        // Purple
  "Kuliner & Belanja": "#e11d48", // Rose
};

// Facility index weights
const FACILITY_WEIGHTS = {
  "Toilet / MCK": 20,
  "Area Parkir": 20,
  "Mushola": 15,
  "Warung Makan": 15,
  "Toko Souvenir": 10,
  "Gazebo / Tempat Istirahat": 10,
  "Pusat Informasi": 10,
};

export function AdvancedAnalyticsView() {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("Semua");

  // ==========================================
  // 1. ANALISIS KORELASI INFRASTRUKTUR & RATING (NO. 4)
  // ==========================================
  const correlationData = useMemo(() => {
    return objekWisata
      .filter(item => selectedCategoryFilter === "Semua" || item.kategori.includes(selectedCategoryFilter))
      .map(item => {
        // Map digital signal to numerical scale for scatter sizing or coloring
        let signalScore = 50;
        if (item.sinyalDigital === "Sangat Baik") signalScore = 100;
        else if (item.sinyalDigital === "Baik") signalScore = 75;
        else if (item.sinyalDigital === "Cukup") signalScore = 50;
        else if (item.sinyalDigital === "Kurang") signalScore = 25;

        // Simplify primary category mapping
        let primaryCat = "Alam";
        if (item.kategori.includes("Budaya")) primaryCat = "Budaya & Sejarah";
        else if (item.kategori.includes("Tirta")) primaryCat = "Tirta / Air";
        else if (item.kategori.includes("Edukasi")) primaryCat = "Edukasi & Satwa";
        else if (item.kategori.includes("Religi")) primaryCat = "Religi";
        else if (item.kategori.includes("Kuliner")) primaryCat = "Kuliner & Belanja";

        return {
          name: item.nama,
          x: item.aksesibilitasR4, // X-Axis: Road Accessibility %
          y: item.pengunjung,      // Y-Axis: Visitor Count
          z: item.rating * 10,     // Z-Axis (Size): Rating out of 50
          rating: item.rating,
          signal: item.sinyalDigital,
          signalScore,
          category: primaryCat,
          color: CATEGORY_COLORS[primaryCat] || "#64748b",
        };
      });
  }, [selectedCategoryFilter]);

  // ==========================================
  // 2. ANALISIS EFEKTIVITAS KALENDER EVENT (NO. 5)
  // ==========================================
  const eventImpactData = useMemo(() => {
    // Map monthly visitors and events
    return seasonalityBulanan.map(m => {
      // Find events in this month
      const monthEvents = kalenderEvent.filter(
        e => e.bulan.toLowerCase().includes(m.bulan.toLowerCase())
      );
      
      const totalEventVisitors = monthEvents.reduce((acc, curr) => acc + curr.estimasiPengunjung, 0);
      const eventCount = monthEvents.length;

      // Event Impact Index: ratio of event-targeted visitors to average monthly baseline
      // Let's assume a baseline index contribution
      const impactScore = eventCount > 0 
        ? Math.round((totalEventVisitors / m.kunjungan) * 100) 
        : 0;

      return {
        bulan: m.bulan,
        kunjunganWisatawan: m.kunjungan,
        eventCount,
        totalEventVisitors,
        impactIndex: Math.min(impactScore, 100), // capped at 100% impact for visualization
        eventsName: monthEvents.map(e => e.namaEvent).join(", ") || "Tidak ada event",
      };
    });
  }, []);

  // Metrics for Event Impact
  const eventMetrics = useMemo(() => {
    const totalEvents = kalenderEvent.length;
    const monthsWithEvents = eventImpactData.filter(d => d.eventCount > 0).length;
    const avgImpact = Math.round(
      eventImpactData.reduce((acc, curr) => acc + curr.impactIndex, 0) / (monthsWithEvents || 1)
    );
    return { totalEvents, monthsWithEvents, avgImpact };
  }, [eventImpactData]);

  // ==========================================
  // 3. INDEKS KESIAPAN FASILITAS & AMENITAS (NO. 6)
  // ==========================================
  const facilityScoreData = useMemo(() => {
    // Combine primary destinations with open data destinations
    const primaryMapped = objekWisata.map(item => ({
      id: item.id,
      nama: item.nama,
      kecamatan: item.kecamatan,
      fasilitas: item.fasilitas,
      kategori: item.kategori,
      source: "Utama"
    }));

    const openDataMapped = additionalDestinationsAll.map((item, idx) => ({
      id: `OD-${idx}`,
      nama: item.nama,
      kecamatan: item.kecamatan,
      fasilitas: item.fasilitas || [],
      kategori: item.kategori,
      source: "Open Data"
    }));

    const combined = [...primaryMapped, ...openDataMapped];

    return combined.map(item => {
      let score = 0;
      const verifiedFacilities = [];
      const missingFacilities = [];

      Object.entries(FACILITY_WEIGHTS).forEach(([facilityName, weight]) => {
        let hasFacility = false;
        const lowerFacilities = item.fasilitas.map(f => f.toLowerCase());
        
        if (facilityName === "Toilet / MCK") {
          hasFacility = lowerFacilities.some(f => f.includes("toilet") || f.includes("mck") || f.includes("kamar mandi"));
        } else if (facilityName === "Area Parkir") {
          hasFacility = lowerFacilities.some(f => f.includes("parkir"));
        } else if (facilityName === "Mushola") {
          hasFacility = lowerFacilities.some(f => f.includes("mushola") || f.includes("musholla") || f.includes("masjid") || f.includes("wudhu"));
        } else if (facilityName === "Warung Makan") {
          hasFacility = lowerFacilities.some(f => f.includes("warung") || f.includes("makan") || f.includes("kuliner") || f.includes("resto") || f.includes("cafe") || f.includes("kafe") || f.includes("kantin"));
        } else if (facilityName === "Toko Souvenir") {
          hasFacility = lowerFacilities.some(f => f.includes("souvenir") || f.includes("cendera") || f.includes("oleh") || f.includes("toko") || f.includes("showroom") || f.includes("galeri") || f.includes("keramik"));
        } else if (facilityName === "Gazebo / Tempat Istirahat") {
          hasFacility = lowerFacilities.some(f => f.includes("gazebo") || f.includes("istirahat") || f.includes("cottage") || f.includes("homestay") || f.includes("penginapan") || f.includes("pendopo") || f.includes("loker") || f.includes("camp"));
        } else if (facilityName === "Pusat Informasi") {
          hasFacility = lowerFacilities.some(f => f.includes("informasi") || f.includes("info") || f.includes("pemandu") || f.includes("guide") || f.includes("basecamp") || f.includes("rescue") || f.includes("pos"));
        }

        if (hasFacility) {
          score += weight;
          verifiedFacilities.push(facilityName);
        } else {
          missingFacilities.push(facilityName);
        }
      });

      return {
        id: item.id,
        nama: item.nama,
        kecamatan: item.kecamatan,
        score: Math.min(score, 100),
        verified: verifiedFacilities,
        missing: missingFacilities,
        kategori: item.kategori,
        source: item.source,
      };
    }).sort((a, b) => b.score - a.score);
  }, []);

  // Summary statistics for facilities
  const facilityStats = useMemo(() => {
    const avgScore = Math.round(
      facilityScoreData.reduce((acc, curr) => acc + curr.score, 0) / facilityScoreData.length
    );
    const fullyEquipped = facilityScoreData.filter(d => d.score >= 85).length;
    const needAttention = facilityScoreData.filter(d => d.score < 50);
    return { avgScore, fullyEquipped, needAttention };
  }, [facilityScoreData]);

  // Custom tooltips
  const CustomScatterTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-white font-mono text-[10px] space-y-1">
          <p className="font-bold border-b border-slate-700 pb-1 text-primary-300">{data.name}</p>
          <p>Kategori: <b className="text-slate-200">{data.category}</b></p>
          <p>Aksesibilitas R4: <b className="text-sky-400">{data.x}%</b></p>
          <p>Sinyal Digital: <b className="text-indigo-400">{data.signal}</b></p>
          <p>Pengunjung: <b className="text-emerald-400">{formatNumber(data.y)} orang/thn</b></p>
          <p>Rating: <b className="text-amber-400">★ {data.rating} / 5.0</b></p>
        </div>
      );
    }
    return null;
  };

  const CustomEventTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-white font-mono text-[10px] space-y-1 max-w-[280px]">
          <p className="font-bold border-b border-slate-700 pb-1 text-primary-300">Bulan {data.bulan}</p>
          <p>Total Pengunjung: <b className="text-slate-200">{formatNumber(data.kunjunganWisatawan)} orang</b></p>
          <p>Jumlah Event: <b className="text-amber-400">{data.eventCount} festival</b></p>
          {data.eventCount > 0 && (
            <>
              <p>Est. Pengunjung Event: <b className="text-sky-400">{formatNumber(data.totalEventVisitors)} orang</b></p>
              <p>Indeks Dampak Event: <b className="text-emerald-400">{data.impactIndex}%</b></p>
              <p className="text-[9px] text-slate-400 border-t border-slate-800 pt-1 leading-snug">
                Event: {data.eventsName}
              </p>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* SECTION HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Korelasi Aksesibilitas"
          value={`${correlationData.filter(d => d.x >= 90).length} Objek`}
          sub="akses jalan R4 sangat layak (>=90%)"
          accent="blue"
          icon={Bus}
        />
        <StatCard
          label="Indeks Dampak Event"
          value={`${eventMetrics.avgImpact}%`}
          sub={`kontribusi event di ${eventMetrics.monthsWithEvents} bulan aktif`}
          accent="amber"
          icon={TrendingUp}
        />
        <StatCard
          label="Rerata Skor Fasilitas"
          value={`${facilityStats.avgScore}/100`}
          sub={`${facilityStats.fullyEquipped} destinasi berfasilitas lengkap`}
          accent="emerald"
          icon={Award}
        />
      </div>

      {/* PANEL 4: KORELASI INFRASTRUKTUR VS PENGUNJUNG */}
      <Panel className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3 mb-4">
          <SectionTitle
            index="01"
            title="Matriks Korelasi Aksesibilitas & Kunjungan"
            subtitle="Menganalisis pengaruh kelayakan jalan roda 4 terhadap daya tarik kunjungan & rating wisatawan."
          />
          {/* Category Filter */}
          <div className="flex items-center gap-2 font-mono text-xs shrink-0">
            <span className="text-slate-500 font-semibold">Filter Kategori:</span>
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="Semua">Semua Kategori</option>
              <option value="Alam">Wisata Alam</option>
              <option value="Budaya">Budaya & Sejarah</option>
              <option value="Tirta">Tirta / Air</option>
              <option value="Edukasi">Edukasi & Satwa</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chart Wrapper */}
          <div className="lg:col-span-3 h-[320px] bg-slate-50 rounded-xl p-3 border border-slate-200 relative">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Aksesibilitas R4" 
                  unit="%" 
                  domain={[40, 100]}
                  stroke="#64748b"
                  fontSize={10}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Pengunjung" 
                  stroke="#64748b"
                  fontSize={10}
                  tickFormatter={formatShortRupiah}
                />
                <ZAxis type="number" dataKey="z" range={[60, 400]} />
                <Tooltip content={<CustomScatterTooltip />} />
                <Scatter name="Destinasi Wisata" data={correlationData} fill="#0284c7">
                  {correlationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Scatter>
                <Legend 
                  wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace', paddingTop: '10px' }}
                  payload={Object.entries(CATEGORY_COLORS).map(([cat, col]) => ({
                    value: cat,
                    type: 'circle',
                    color: col,
                  }))}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Analytical Insights */}
          <div className="space-y-3 font-mono text-[11px] text-slate-600 bg-slate-50 p-4 border border-slate-200 rounded-xl">
            <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block border-b border-slate-200 pb-1.5">
              💡 Insight Korelasi
            </span>
            <p>
              • <b>Aksesibilitas R4 vs Pengunjung:</b> Destinasi dengan akses R4 &gt; 90% (wilayah kota & KSPN Dieng) menguasai <b>82% total kunjungan</b> tahunan.
            </p>
            <p>
              • <b>Efek Ukuran Balon (Rating):</b> Destinasi di pojok kanan bawah memiliki jalan yang sangat baik tetapi pengunjung sedikit. Ini merupakan destinasi potensial yang <b>butuh stimulus promosi digital</b>.
            </p>
            <p>
              • <b>Sinyal Digital:</b> Area blind spot (sinyal cukup/kurang) memiliki keterbatasan dalam memicu penyebaran konten *real-time* oleh wisatawan di media sosial.
            </p>
          </div>
        </div>
      </Panel>

      {/* PANEL 5: EFEKTIVITAS EVENT & SEASONALITY */}
      <Panel className="p-5">
        <SectionTitle
          index="02"
          title="Analisis Dampak Event Terhadap Lonjakan Pengunjung (Seasonality)"
          subtitle="Mengkorelasikan kalender event bulanan dengan pola kunjungan wisatawan untuk mengukur daya ungkit festival."
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
          {/* Analysis Info */}
          <div className="space-y-4 font-mono text-[11px] text-slate-600 bg-amber-50/50 border border-amber-200 rounded-xl p-4">
            <div>
              <span className="font-bold text-amber-900 text-xs uppercase tracking-wider block border-b border-amber-200 pb-1.5">
                📅 Ringkasan Event
              </span>
              <div className="mt-2 space-y-1.5">
                <div className="flex justify-between">
                  <span>Total Event Setahun:</span>
                  <b className="text-amber-800">{eventMetrics.totalEvents} Event</b>
                </div>
                <div className="flex justify-between">
                  <span>Bulan dengan Event:</span>
                  <b className="text-amber-800">{eventMetrics.monthsWithEvents} Bulan</b>
                </div>
                <div className="flex justify-between">
                  <span>Rerata Dampak Event:</span>
                  <b className="text-emerald-700">+{eventMetrics.avgImpact}% Lonjakan</b>
                </div>
              </div>
            </div>
            <p className="text-[10px] leading-relaxed text-slate-600 border-t border-amber-200/60 pt-2">
              * **Indeks Dampak Event** dihitung berdasarkan rasio target estimasi penonton festival dibandingkan dengan rata-rata basis pengunjung bulanan kawasan.
            </p>
          </div>

          {/* Mixed Chart Wrapper */}
          <div className="lg:col-span-3 h-[320px] bg-slate-50 rounded-xl p-3 border border-slate-200">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={eventImpactData} margin={{ top: 15, right: 10, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="bulan" stroke="#64748b" fontSize={10} />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={10} 
                  yAxisId="left" 
                  tickFormatter={formatShortRupiah} 
                  label={{ value: 'Kunjungan Wisatawan', angle: -90, position: 'insideLeft', style: {fontSize: 9, fill: '#64748b'} }}
                />
                <YAxis 
                  orientation="right" 
                  stroke="#d97706" 
                  fontSize={10} 
                  yAxisId="right" 
                  domain={[0, 100]}
                  label={{ value: 'Dampak Event (%)', angle: 90, position: 'insideRight', style: {fontSize: 9, fill: '#d97706'} }}
                />
                <Tooltip content={<CustomEventTooltip />} />
                <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
                <Bar 
                  yAxisId="left" 
                  dataKey="kunjunganWisatawan" 
                  name="Kunjungan Bulanan" 
                  fill="#93c5fd" 
                  radius={[4, 4, 0, 0]} 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="impactIndex" 
                  name="Indeks Dampak Event (%)" 
                  stroke="#d97706" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }} 
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Panel>

      {/* PANEL 6: INDEKS KESIAPAN FASILITAS */}
      <Panel className="p-5">
        <SectionTitle
          index="03"
          title="Indeks Kesiapan Fasilitas & Amenitas Destinasi"
          subtitle="Audit standardisasi kelengkapan fasilitas wajib pariwisata (Toilet, Parkir, Mushola, Makan, Cendera Mata, Gazebo, Informasi)."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* Facility Coverage Index Bar Chart */}
          <div className="lg:col-span-2 h-[350px] bg-slate-50 border border-slate-200 rounded-xl p-3">
            <span className="font-mono font-bold text-[10px] text-slate-500 uppercase block mb-2 px-1">
              Top 10 Destinasi Berdasarkan Kesiapan Fasilitas (%)
            </span>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart
                data={facilityScoreData.slice(0, 10)}
                layout="vertical"
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={9} />
                <YAxis 
                  type="category" 
                  dataKey="nama" 
                  stroke="#64748b" 
                  fontSize={8} 
                  width={110} 
                />
                <Tooltip 
                  formatter={(val) => [`${val}/100`, "Skor Fasilitas"]}
                  contentStyle={{ fontSize: 9, fontFamily: 'monospace' }}
                />
                <Bar dataKey="score" name="Skor Kesiapan" fill="#10b981" radius={[0, 4, 4, 0]}>
                  {facilityScoreData.slice(0, 10).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score >= 85 ? "#059669" : "#10b981"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Attention / Action Needed List */}
          <div className="flex flex-col h-[350px] font-mono text-xs">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex-1 flex flex-col min-h-0">
              <span className="font-bold text-red-950 text-xs uppercase tracking-wider block border-b border-red-200 pb-1.5 flex items-center gap-1.5 shrink-0">
                <AlertTriangle size={14} className="text-red-700 animate-pulse" /> Prioritas Pembangunan
              </span>
              <p className="text-[10px] text-slate-500 mt-1 mb-3 leading-relaxed shrink-0">
                Destinasi wisata dengan skor kesiapan fasilitas kritis (&lt;50%) yang memerlukan intervensi bantuan infrastruktur APBD.
              </p>
              
              <div className="overflow-y-auto flex-1 space-y-2.5 pr-1">
                {facilityScoreData.filter(d => d.score < 50).map((dest) => (
                  <div 
                    key={dest.id} 
                    className="bg-white border border-red-100 rounded-lg p-2.5 space-y-1.5 shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800 text-[10px] truncate max-w-[150px]">
                        {dest.nama}
                      </span>
                      <span className="bg-red-100 text-red-800 font-bold text-[9px] px-1.5 py-0.5 rounded shrink-0">
                        Skor: {dest.score}
                      </span>
                    </div>
                    <div className="text-[9px] text-slate-500 leading-snug">
                      Kec. {dest.kecamatan} ({dest.source}) | <b>Kekurangan:</b> {dest.missing.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
