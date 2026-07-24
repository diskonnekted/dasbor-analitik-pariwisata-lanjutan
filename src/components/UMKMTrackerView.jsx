import { useState, useMemo } from "react";
import {
  ShoppingBag,
  Store,
  Users,
  TrendingUp,
  DollarSign,
  Info,
  Star,
  MapPin,
  ShoppingCart,
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
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";
import { Panel, SectionTitle } from "./ui";
import { umkmPerKecamatan, trenUMKMvsWisata, pasarWisata } from "../data/umkmData";
import { calculateUMKMEconomicImpact, getUMKMgrowthRate } from "../utils/analytics";

export default function UMKMTrackerView() {
  const [selectedKecamatan, setSelectedKecamatan] = useState("Banjarnegara");

  // Sort kecamatan by impact score
  const sortedKecamatan = useMemo(() => {
    return [...umkmPerKecamatan]
      .map(k => ({
        ...k,
        impact: calculateUMKMEconomicImpact(k.koperasi, k.pasar, k.saranaDagang, k.tenagaKerja, k.potensiWisata)
      }))
      .sort((a, b) => b.impact.impactScore - a.impact.impactScore);
  }, []);

  // Economic impact data for chart
  const impactChartData = useMemo(() => {
    return umkmPerKecamatan.map(k => {
      const impact = calculateUMKMEconomicImpact(k.koperasi, k.pasar, k.saranaDagang, k.tenagaKerja, k.potensiWisata);
      return {
        kecamatan: k.kecamatan,
        impactScore: impact.impactScore,
        koperasi: k.koperasi,
        pasar: k.pasar,
        tenagaKerja: k.tenagaKerja,
      };
    }).sort((a, b) => b.impactScore - a.impactScore);
  }, []);

  // Growth rate
  const growthRate = useMemo(() => getUMKMgrowthRate(trenUMKMvsWisata), []);

  // Top 5 kecamatan by UMKM
  const topUMKM = useMemo(() => sortedKecamatan.slice(0, 5), [sortedKecamatan]);

  // Selected kecamatan impact
  const selectedImpact = useMemo(() => {
    const kec = umkmPerKecamatan.find(k => k.kecamatan.toLowerCase() === selectedKecamatan.toLowerCase());
    if (!kec) return null;
    return calculateUMKMEconomicImpact(kec.koperasi, kec.pasar, kec.saranaDagang, kec.tenagaKerja, kec.potensiWisata);
  }, [selectedKecamatan]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionTitle
        badge="FITUR 3"
        title="Ekonomi Kreatif & UMKM Tracker"
        subtitle="Dashboard UMKM & dampak ekonomi pariwisata per kecamatan"
        rightElement={
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShoppingCart className="w-4 h-4" />
            <span>Sumber: Disperindagkop-UKM</span>
          </div>
        }
      />

      {/* Kecamatan Selector */}
      <Panel title="Pilih Kecamatan" subtitle="Analisis dampak ekonomi UMKM per lokasi">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
          {sortedKecamatan.map((k) => (
            <button
              key={k.kecamatan}
              onClick={() => setSelectedKecamatan(k.kecamatan)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedKecamatan === k.kecamatan
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
              }`}
            >
              <span className="block text-xs opacity-75">{k.kecamatan}</span>
              <span className="block text-xs font-bold">{k.impact.impactScore}</span>
            </button>
          ))}
        </div>
      </Panel>

      {/* Economic Impact Overview */}
      {selectedImpact && (() => {
        const kecData = umkmPerKecamatan.find(k => k.kecamatan === selectedKecamatan);
        return (
        <Panel title={`Dampak Ekonomi UMKM - ${selectedKecamatan}`} subtitle="Evaluasi 4 indikator: jumlah koperasi, pasar, sarana dagang, dan tenaga kerja">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border-2 border-emerald-200 rounded-xl p-4 text-center">
              <Store className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className={`text-2xl font-bold ${selectedImpact.impactColor}`}>{selectedImpact.impactLevel}</p>
              <p className="text-xs text-slate-500 mt-1 mb-2">Level Dampak</p>
              <div className="text-[10px] text-slate-600 bg-emerald-50 p-2 rounded-lg">
                Berdasarkan bobot koperasi(30%) + pasar(25%) + dagang(25%) + tenaga kerja(20%)
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
              <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-800">{selectedImpact.impactScore}/100</p>
              <p className="text-xs text-slate-500 mt-1 mb-2">Impact Score</p>
              <div className="text-[10px] text-slate-600 bg-blue-50 p-2 rounded-lg">
                Score {selectedImpact.impactScore >= 75 ? "Sangat tinggi — prioritas pembinaan" : selectedImpact.impactScore >= 55 ? "Tinggi — potensi berkembang" : "Sedang/Rendah — butuh pengembangan"}
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
              <DollarSign className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-xl font-bold text-slate-800">{selectedImpact.estimatedImpact}</p>
              <p className="text-xs text-slate-500 mt-1 mb-2">Estimasi Ekonomi</p>
              <div className="text-[10px] text-slate-600 bg-amber-50 p-2 rounded-lg">
                Potensi wis: {kecData?.potensiWisata?.toLocaleString() || 0} × multiplier 2.4x
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
              <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-800">{kecData?.tenagaKerja || 0}</p>
              <p className="text-xs text-slate-500 mt-1 mb-2">Tenaga Kerja UMKM</p>
              <div className="text-[10px] text-slate-600 bg-purple-50 p-2 rounded-lg">
                {kecData?.koperasi || 0} koperasi + {kecData?.pasar || 0} pasar aktif
              </div>
            </div>
          </div>
        </Panel>
        );
      })()}

      {/* Ranking UMKM Impact */}
      <Panel title="Ranking Dampak Ekonomi UMKM" subtitle="Score berdasarkan jumlah koperasi, pasar, sarana dagang & tenaga kerja">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={impactChartData.slice(0, 10)} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="kecamatan" tick={{ fontSize: 10 }} width={100} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload[0]) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-sm">
                        <p className="font-bold text-slate-800">{data.kecamatan}</p>
                        <p className="text-slate-600">Impact Score: <span className="font-bold">{data.impactScore}/100</span></p>
                        <p className="text-slate-600">Koperasi: {data.koperasi} • Pasar: {data.pasar}</p>
                        <p className="text-slate-600">Tenaga Kerja: {data.tenagaKerja}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="impactScore" name="Impact Score" radius={[0, 6, 6, 0]}>
                {impactChartData.slice(0, 10).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.impactScore >= 75 ? "#059669" :
                      entry.impactScore >= 55 ? "#2563eb" :
                      entry.impactScore >= 35 ? "#d97706" : "#64748b"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      {/* Top 5 Kecamatan UMKM */}
      <Panel title="Top 5 Kecamatan Dampak Ekonomi Terkuat">
        <div className="space-y-3">
          {topUMKM.map((k, idx) => (
            <div key={k.kecamatan} className={`flex items-center gap-4 p-4 rounded-xl border ${
              idx === 0 ? "border-emerald-300 bg-emerald-50" :
              idx === 1 ? "border-blue-300 bg-blue-50" :
              idx === 2 ? "border-amber-300 bg-amber-50" :
              "border-slate-200 bg-white"
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                idx === 0 ? "bg-emerald-500" : idx === 1 ? "bg-blue-500" : idx === 2 ? "bg-amber-500" : "bg-slate-400"
              }`}>
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800">{k.kecamatan}</p>
                <p className="text-xs text-slate-600">
                  {k.koperasi} koperasi • {k.pasar} pasar • {k.saranaDagang} sarana dagang
                </p>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${k.impact.impactColor}`}>{k.impact.impactScore}</p>
                <p className="text-xs text-slate-600">Score</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold bg-white ${k.impact.impactColor}`}>
                {k.impact.priority}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Tren UMKM vs Wisata */}
      <Panel title="Tren Pertumbuhan UMKM vs Kunjisan Wisata" subtitle="Perkembangan UMKM, kunjungan wisatawan & PAD per tahun">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trenUMKMvsWisata} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="tahun" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "pad") return ["Rp " + (value / 1000000000).toFixed(1) + " M", "PAD"];
                  return [value.toLocaleString(), name === "umkm" ? "Jumlah UMKM" : "Kunjisan"];
                }}
              />
              <Area yAxisId="left" type="monotone" dataKey="umkm" name="Jumlah UMKM" stroke="#059669" fill="#a7f3d0" />
              <Area yAxisId="left" type="monotone" dataKey="kunjungan" name="Kunjisan (x1000)" stroke="#2563eb" fill="#93c5fd" />
              <Line yAxisId="right" type="monotone" dataKey="pad" name="PAD (M)" stroke="#d97706" strokeWidth={2} dot={{ fill: "#d97706" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      {/* Growth Rates */}
      {growthRate && (
        <Panel title="Laju Pertumbuhan Tahunan" subtitle={`Data terakhir: ${growthRate.tahun}`}>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
              <TrendingUp className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className={`text-3xl font-bold ${growthRate.umkmGrowth > 0 ? "text-emerald-700" : "text-red-600"}`}>
                {growthRate.umkmGrowth > 0 ? "+" : ""}{growthRate.umkmGrowth}%
              </p>
              <p className="text-xs text-slate-600 mt-1">Pertumbuhan UMKM</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <ShoppingBag className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className={`text-3xl font-bold ${growthRate.kunjunganGrowth > 0 ? "text-blue-700" : "text-red-600"}`}>
                {growthRate.kunjunganGrowth > 0 ? "+" : ""}{growthRate.kunjunganGrowth}%
              </p>
              <p className="text-xs text-slate-600 mt-1">Pertumbuhan Kunjisan</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <DollarSign className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className={`text-3xl font-bold ${growthRate.padGrowth > 0 ? "text-amber-700" : "text-red-600"}`}>
                {growthRate.padGrowth > 0 ? "+" : ""}{growthRate.padGrowth}%
              </p>
              <p className="text-xs text-slate-600 mt-1">Pertumbuhan PAD</p>
            </div>
          </div>
        </Panel>
      )}

      {/* Pasar Wisata */}
      <Panel title="Pasar Tradisional sebagai Destinasi Wisata Belanja">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pasarWisata.map((pasar, idx) => (
            <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <Store className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-slate-800">{pasar.nama}</p>
                  <p className="text-xs text-slate-600 mt-1">{pasar.jenis} • Kec. {pasar.kecamatan}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < Math.floor(pasar.rating) ? "text-amber-400 fill-amber-400" : "text-slate-300"} />
                      ))}
                      <span className="text-xs text-slate-600 ml-1">{pasar.rating}</span>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{pasar.harga}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2">Produk: {pasar.produk.join(", ")}</p>
                  <p className="text-xs text-slate-700 mt-2 p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                    💡 {pasar.rekomendasi}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Sektor UMKM Pariwisata */}
      <Panel 
        title="Sektor UMKM Berbasis Pariwisata" 
        subtitle="6 sektor utama yang bergantung pada pariwisata — dependency score menunjukkan seberapa besar pendapatan sektor ini dari wisatawan">
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <strong>💡 Insight:</strong> Sektor dengan dependency tinggi (&gt;80%) paling terdampak fluktuasi kunjungan wisatawan. Diversifikasi pasar domestik & mancanegara penting untuk mitigasi risiko.
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { sector: "Kuliner & Minuman", count: 45, icon: "🍜", description: "Warung, restoran, dawet, kuliner khas", dependency: 95 },
            { sector: "Souvenir & Kerajinan", count: 18, icon: "🎁", description: "Batik, kerajinan tangan, oleh-oleh", dependency: 85 },
            { sector: "Akomodasi", count: 12, icon: "🏨", description: "Homestay, hotel, glamping", dependency: 100 },
            { sector: "Transportasi", count: 8, icon: "🚐", description: "Rental mobil, motor, guide", dependency: 90 },
            { sector: "Agrowisata", count: 6, icon: "🌿", description: "Kebun teh, salak, kopi", dependency: 70 },
            { sector: "Rekreasi & Olahraga", count: 5, icon: "🚣", description: "Rafting, trekking, camping", dependency: 100 },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">{item.sector}</p>
                  <p className="text-xs text-slate-600 mt-1">{item.description}</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">Dependency on Tourism</span>
                      <span className="font-bold text-blue-600">{item.dependency}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${item.dependency}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Multiplier Effect Calculator */}
      <Panel 
        title="Tourism Economic Multiplier Effect" 
        subtitle="Proyeksi dampak ekonomi 4 indikator utama pariwisata Banjarnegara 2025 — setiap angka menunjukkan pertumbuhan vs tahun sebelumnya">
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-800">
          <strong>📊 Penjelasan:</strong> Multiplier 2.4x artinya setiap Rp1 yang dikeluarkan wisatawan masuk ke ekonomi lokal akan berputar 2.4x melalui rantai pasok UMKM (akomodasi → kuliner → transport → souvenir).
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 text-center">
            <DollarSign className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-blue-700">2.4x</p>
            <p className="text-xs text-blue-600 mt-2">Multiplier Effect</p>
            <p className="text-[11px] text-slate-600 mt-1">Setiap Rp1 kunjungan = Rp2.4 ekonomi lokal</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-5 text-center">
            <Users className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-emerald-700">5,850</p>
            <p className="text-xs text-emerald-600 mt-2">Total UMKM 2025</p>
            <p className="text-[11px] text-slate-600 mt-1">+370 UMKM baru dari 2024</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-5 text-center">
            <ShoppingBag className="w-10 h-10 text-amber-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-amber-700">Rp 16.5 M</p>
            <p className="text-xs text-amber-600 mt-2">PAD 2025</p>
            <p className="text-[11px] text-slate-600 mt-1">+11.1% dari tahun sebelumnya</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5 text-center">
            <MapPin className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-purple-700">1,820</p>
            <p className="text-xs text-purple-600 mt-2">Ribu Kunjisan 2025</p>
            <p className="text-[11px] text-slate-600 mt-1">+200 rb dari 2024</p>
          </div>
        </div>
      </Panel>

      {/* UMKM Near Destinations */}
      <Panel 
        title="Kepadatan UMKM per Destinasi Wisata" 
        subtitle="Jumlah UMKM dalam radius 5km dari 8 objek wisata utama — tinggi = peluang ekonomi wisata kuat, rendah = butuh pembinaan">
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
          <strong>🗺️ Catatan:</strong> Data estimasi berdasarkan survei lapangan. Rasio tinggi (UMKM banyak per wisatawan) menandakan sektor souvenir/kuliner berkembang, rasio rendah menunjukkan potensi UMKM belum optimal.
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { destinasi: "Dieng Plateau", umkm: 45, wisatawan: 485000, ratio: 0.09 },
              { destinasi: "Curug Pitu", umkm: 28, wisatawan: 120000, ratio: 0.23 },
              { destinasi: "Arung Jeram", umkm: 35, wisatawan: 85000, ratio: 0.41 },
              { destinasi: "Waduk Tampomas", umkm: 22, wisatawan: 38000, ratio: 0.58 },
              { destinasi: "TRMS Zoo", umkm: 52, wisatawan: 150000, ratio: 0.35 },
              { destinasi: "Desa Gumelem", umkm: 38, wisatawan: 65000, ratio: 0.58 },
              { destinasi: "Kebun Teh", umkm: 18, wisatawan: 54000, ratio: 0.33 },
              { destinasi: "Waduk Mrica", umkm: 25, wisatawan: 42000, ratio: 0.60 },
            ]} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="destinasi" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload[0]) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-sm">
                        <p className="font-bold text-slate-800">{data.destinasi}</p>
                        <p className="text-slate-600">UMKM: <span className="font-bold">{data.umkm}</span></p>
                        <p className="text-slate-600">Wisatawan: <span className="font-bold">{(data.wisatawan / 1000).toFixed(0)}k</span></p>
                        <p className="text-blue-600">Rasio: <span className="font-bold">{data.ratio}</span> UMKM per 1rb wisatawan</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="umkm" name="Jumlah UMKM" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      {/* Tourism Spending Distribution */}
      <Panel 
        title="Distribusi Pengeluaran Wisatawan per Sektor UMKM" 
        subtitle="Persentase budget wisatawan yang masuk ke masing-masing sektor UMKM — akomodasi & kuliner dominan">
        <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800">
          <strong>💰 Analisa:</strong> Akomodasi (32%) dan Kuliner (25%) mendominasi pengeluaran. Peluang pengembangan: souvenir & tiket rekreasi masih bisa ditingkatkan melalui program promosi dan packaging produk.
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { category: "Akomodasi", percentage: 32, icon: "🏨" },
                { category: "Kuliner", percentage: 25, icon: "🍜" },
                { category: "Transportasi", percentage: 18, icon: "🚐" },
                { category: "Souvenir", percentage: 12, icon: "🎁" },
                { category: "Tiket & Rekreasi", percentage: 8, icon: "🎫" },
                { category: "Lainnya", percentage: 5, icon: "💡" },
              ]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Pengeluaran"]}
                />
                <Bar dataKey="percentage" name="Persentase" radius={[6, 6, 0, 0]}>
                  {[32, 25, 18, 12, 8, 5].map((_, index) => (
                    <Cell key={`cell-${index}`} fill={['#1e40af', '#059669', '#d97706', '#7c3aed', '#dc2626', '#64748b'][index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {[
              { sector: "Akomodasi", pct: 32, avg: "Rp 450.000/orang/malam", desc: "Hotel, homestay, glamping, resort" },
              { sector: "Kuliner", pct: 25, avg: "Rp 150.000/orang/hari", desc: "Warung, restoran, dawet, oleh-oleh kuliner" },
              { sector: "Transportasi", pct: 18, avg: "Rp 200.000/orang/trip", desc: "Rental, ojek, guide, shuttle" },
              { sector: "Souvenir", pct: 12, avg: "Rp 100.000/orang", desc: "Batik, kerajinan, produk lokal" },
              { sector: "Tiket & Rekreasi", pct: 8, avg: "Rp 75.000/orang", desc: "Tiket masuk, rafting, trekking" },
              { sector: "Lainnya", pct: 5, avg: "Rp 50.000/orang", desc: "Laundry, SIM, pulsa, lainnya" },
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sm">
                    {[0,1,2,3,4,5][idx]}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-slate-800 text-sm">{item.sector}</p>
                      <span className="text-xs font-bold text-blue-600">{item.pct}%</span>
                    </div>
                    <p className="text-[11px] text-slate-600">{item.desc}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Avg: {item.avg}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}
