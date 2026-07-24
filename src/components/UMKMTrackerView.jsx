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
      {selectedImpact && (
        <Panel title={`Dampak Ekonomi UMKM - ${selectedKecamatan}`} subtitle="Kalkulasi berdasarkan koperasi, pasar, sarana dagang & tenaga kerja">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border-2 border-emerald-200 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <Store className="w-8 h-8 text-emerald-500" />
              </div>
              <p className={`text-2xl font-bold ${selectedImpact.impactColor}`}>{selectedImpact.impactLevel}</p>
              <p className="text-xs text-slate-500 mt-1">Dampak Ekonomi</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-slate-800">{selectedImpact.impactScore}/100</p>
              <p className="text-xs text-slate-500 mt-1">Impact Score</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <DollarSign className="w-8 h-8 text-amber-500" />
              </div>
              <p className="text-xl font-bold text-slate-800">{selectedImpact.estimatedImpact}</p>
              <p className="text-xs text-slate-500 mt-1">Ekonomi Estimasi</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-slate-800">{umkmPerKecamatan.find(k => k.kecamatan === selectedKecamatan)?.tenagaKerja || 0}</p>
              <p className="text-xs text-slate-500 mt-1">Tenaga Kerja</p>
            </div>
          </div>
        </Panel>
      )}

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
    </div>
  );
}
