import { useState, useMemo } from "react";
import {
  CloudSun,
  Thermometer,
  Droplets,
  Sun,
  Umbrella,
  Calendar,
  TrendingUp,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Info,
  Leaf,
  Mountain,
  Tent,
  Waves,
  Utensils,
  Camera,
  ShoppingBag,
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
  Area,
  AreaChart,
} from "recharts";
import { Panel, SectionTitle, StatCard } from "./ui";
import { curahHujanBulanan, cuacaPerKecamatan, getActivityRecommendation } from "../data/bmkgData";
import {
  calculateWeatherSuitability,
  getOutdoorActivityRiskLevel,
  getClassifySeason,
  getBestTimeToVisit,
  calculateWeatherAdjustedCapacity,
} from "../utils/analytics";
import { objekWisata } from "../data/pariwisataData";

const SEASON_COLORS = {
  "Musim Hujan": "bg-blue-500",
  "Musim Kemarau": "bg-amber-500",
  "Pancaroba": "bg-green-500",
};

export default function SmartWeatherView() {
  const [selectedKecamatan, setSelectedKecamatan] = useState("Batur");
  const [selectedMonth, setSelectedMonth] = useState(6); // July (index 6 = Aug in 0-based)

  const bulanNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  // Weather suitability scores per month
  const weatherScoresData = useMemo(() => {
    return curahHujanBulanan.map((_, idx) => {
      const score = calculateWeatherSuitability(selectedKecamatan, idx);
      return {
        bulan: score.bulan,
        score: score.weatherScore,
        rating: score.rating,
      };
    });
  }, [selectedKecamatan]);

  // Outdoor activity risk per month
  const outdoorRiskData = useMemo(() => {
    return curahHujanBulanan.map((_, idx) => {
      const risk = getOutdoorActivityRiskLevel(idx);
      return {
        bulan: risk.bulan,
        riskLevel: risk.riskLevel,
        riskIcon: risk.riskIcon,
        rainyDays: risk.rainyDays,
      };
    });
  }, []);

  // Season data
  const seasonData = useMemo(() => {
    return curahHujanBulanan.map((_, idx) => {
      const season = getClassifySeason(idx);
      return {
        bulan: season.bulan,
        season: season.season,
        icon: season.seasonIcon,
      };
    });
  }, []);

  // Best time to visit
  const bestTimeToVisit = useMemo(() => getBestTimeToVisit(), []);

  // Activity recommendation
  const activityRec = useMemo(() => getActivityRecommendation(selectedMonth), [selectedMonth]);

  // Weather-adjusted capacity for top destinations
  const capacityAdjustments = useMemo(() => {
    const topDest = objekWisata.filter(d => d.kecamatan.toLowerCase() === selectedKecamatan.toLowerCase());
    if (topDest.length === 0) return [];
    const dest = topDest[0];
    const kecData = { carryingCapacityMax: dest.carryingCapacityMax };
    const result = calculateWeatherAdjustedCapacity(kecData);
    return result ? result.monthlyAdjustments : [];
  }, [selectedKecamatan]);

  // Kecamatan weather info
  const kecamatanInfo = useMemo(() => {
    return cuacaPerKecamatan.find(k => k.kecamatan.toLowerCase() === selectedKecamatan.toLowerCase()) || null;
  }, [selectedKecamatan]);

  // Risk colors
  const riskColorMap = {
    "Low": "text-emerald-700",
    "Moderate": "text-amber-700",
    "High": "text-red-700",
  };

  const riskBgMap = {
    "Low": "bg-emerald-50",
    "Moderate": "bg-amber-50",
    "High": "bg-red-50",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionTitle
          badge="FITUR 1"
          title="Smart Weather Dashboard"
          subtitle="Analisa kondisi cuaca & rekomendasi wisata berbasis data BMKG"
          rightElement={
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4" />
              <span>Sumber: BMKG 2017-2024</span>
            </div>
          }
        />
      </div>

      {/* Kecamatan Selector */}
      <Panel title="Pilih Kecamatan" subtitle="Data cuaca berdasarkan stasiun BMKG terdekat">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
          {cuacaPerKecamatan.map((k) => (
            <button
              key={k.kecamatan}
              onClick={() => setSelectedKecamatan(k.kecamatan)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedKecamatan === k.kecamatan
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
              }`}
            >
              {k.kecamatan}
            </button>
          ))}
        </div>
      </Panel>

      {/* Kecamatan Weather Overview */}
      {kecamatanInfo && (
        <Panel title={`Cuaca ${kecamatanInfo.kecamatan}`} subtitle={`Elevasi: ${kecamatanInfo.elevasi}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-semibold text-blue-700 uppercase">Curah Hujan</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{kecamatanInfo.curahHujanAvg.toLocaleString()} mm</p>
              <p className="text-xs text-blue-600 mt-1">Tahunan</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="w-5 h-5 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700 uppercase">Suhu Rata-rata</span>
              </div>
              <p className="text-2xl font-bold text-amber-900">{kecamatanInfo.suhuRata2}</p>
              <p className="text-xs text-amber-600 mt-1">Range harian</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CloudSun className="w-5 h-5 text-purple-600" />
                <span className="text-xs font-semibold text-purple-700 uppercase">Zona Cuaca</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">{kecamatanInfo.zonaCuaca}</p>
              <p className="text-xs text-purple-600 mt-1">{kecamatanInfo.lembaban} kelembaban</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="text-xs font-semibold text-green-700 uppercase">Musim</span>
              </div>
              <p className="text-lg font-bold text-green-900">{kecamatanInfo.musimHujan}</p>
              <p className="text-xs text-green-600 mt-1">{kecamatanInfo.musimKemarau}</p>
            </div>
          </div>
          {kecamatanInfo.rekomendasi && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800">{kecamatanInfo.rekomendasi}</p>
            </div>
          )}
        </Panel>
      )}

      {/* Weather Suitability Score Chart */}
      <Panel title="Skor Kelayakan Cuaca per Bulan" subtitle="Score 0-100 (≥80 Excellent, ≥60 Good, ≥40 Fair, <40 Poor)">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weatherScoresData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload[0]) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-sm">
                        <p className="font-bold text-slate-800">{data.bulan}</p>
                        <p className="text-slate-600">Score: <span className="font-bold">{data.score}/100</span></p>
                        <p className={data.rating === "Excellent" ? "text-emerald-600 font-semibold" : data.rating === "Good" ? "text-blue-600 font-semibold" : "text-amber-600"}>
                          Rating: {data.rating}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {weatherScoresData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.score >= 80 ? "#059669" :
                      entry.score >= 60 ? "#2563eb" :
                      entry.score >= 40 ? "#d97706" : "#dc2626"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      {/* Outdoor Risk & Season - Calendar Grid */}
      <Panel title="Kalender Cuaca & Risiko Outdoor" subtitle="Visualisasi 12 bulan — hujan, risiko aktivitas, dan klasifikasi musim">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {outdoorRiskData.map((risk, idx) => {
            const season = seasonData[idx];
            const isCurrentMonth = idx === new Date().getMonth();
            
            return (
              <div
                key={risk.bulan}
                className={`relative p-4 rounded-xl border-2 transition-all hover:shadow-lg hover:scale-105 cursor-default ${
                  isCurrentMonth
                    ? "ring-2 ring-blue-500 ring-offset-2 border-blue-300"
                    : "border-slate-200"
                } ${risk.rainyDays <= 5 ? "bg-gradient-to-br from-emerald-50 to-emerald-100" : risk.rainyDays <= 10 ? "bg-gradient-to-br from-amber-50 to-amber-100" : "bg-gradient-to-br from-red-50 to-red-100"}`}
              >
                {/* Month Label */}
                <div className="text-center mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    isCurrentMonth ? "bg-blue-600 text-white" : "bg-white/80 text-slate-700"
                  }`}>
                    {risk.bulan}
                  </span>
                </div>

                {/* Risk Icon */}
                <div className="text-center mb-2">
                  <span className="text-3xl block">{risk.riskIcon}</span>
                </div>

                {/* Rainy Days */}
                <div className="text-center mb-2">
                  <p className="text-2xl font-bold text-slate-800">{risk.rainyDays}</p>
                  <p className="text-xs text-slate-600">hari hujan</p>
                </div>

                {/* Risk Level Badge */}
                <div className="text-center mb-2">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${riskBgMap[risk.riskLevel]} ${riskColorMap[risk.riskLevel]}`}>
                    {risk.riskLevel}
                  </span>
                </div>

                {/* Season Indicator */}
                <div className="text-center pt-2 border-t border-slate-200/50">
                  <span className="text-lg">{season.icon}</span>
                  <p className={`text-[10px] font-semibold mt-1 ${
                    season.season === "Musim Hujan" ? "text-blue-700" :
                    season.season === "Musim Kemarau" ? "text-amber-700" :
                    "text-green-700"
                  }`}>
                    {season.season}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-600 justify-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🟢</span>
            <span>Low Risk (≤5 hari hujan)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🟡</span>
            <span>Moderate (6-10 hari hujan)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔴</span>
            <span>High Risk ({">"}10 hari hujan)</span>
          </div>
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-300">
            <span className="text-2xl">🌧️</span>
            <span className="text-blue-700 font-semibold">Musim Hujan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">☀️</span>
            <span className="text-amber-700 font-semibold">Musim Kemarau</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⛅</span>
            <span className="text-green-700 font-semibold">Pancaroba</span>
          </div>
        </div>
      </Panel>

      {/* Best Time to Visit */}
      <Panel title="Best Time to Visit" subtitle={`Rekomendasi waktu terbaik untuk ${selectedKecamatan}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bestTimeToVisit.map((best, idx) => (
            <div key={best.bulan} className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <div>
                <p className="font-bold text-emerald-900">Bulan {best.bulan}</p>
                <p className="text-sm text-emerald-700">{best.reason}</p>
              </div>
              <CheckCircle2 className="w-6 h-6 text-emerald-500 ml-auto flex-shrink-0" />
            </div>
          ))}
        </div>
      </Panel>

      {/* Month Selector & Activity Recommendation */}
      <Panel title="Rekomendasi Aktivitas" subtitle={`Pilih bulan untuk melihat aktivitas yang direkomendasikan`}>
        <div className="flex items-center gap-4 mb-4">
          <label className="text-sm font-semibold text-slate-700">Bulan:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {bulanNames.map((bulan, idx) => (
              <option key={bulan} value={idx}>{bulan}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {activityRec.map((act, idx) => (
            <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{act.icon}</div>
              <p className="font-semibold text-slate-800 text-sm">{act.activity}</p>
              <p className="text-xs text-slate-500 mt-1">Confidence: {act.confidence}%</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* Weather Impact on Carrying Capacity */}
      <Panel title="Dampak Cuaca terhadap Carrying Capacity" subtitle={`Penyesuaian kapasitas wisata ${selectedKecamatan} berdasarkan musim`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {capacityAdjustments.map((adj) => (
            <div key={adj.bulan} className={`p-3 rounded-xl border ${
              adj.rainyDays <= 5 ? "bg-emerald-50 border-emerald-200" :
              adj.rainyDays <= 10 ? "bg-white border-slate-200" :
              "bg-amber-50 border-amber-200"
            }`}>
              <p className="text-xs font-bold text-slate-700 mb-1">{adj.bulan}</p>
              <p className={`text-lg font-bold ${
                adj.rainyDays <= 5 ? "text-emerald-700" :
                adj.rainyDays <= 10 ? "text-slate-700" :
                "text-amber-700"
              }`}>
                {adj.adjustedCapacity.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 mt-1">{adj.impact}</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* Correlation: Rainy Days vs Tourist Visits */}
      <Panel title="Korelasi: Hari Hujan vs Kunjungan Wisatawan" subtitle="Musim hujan cenderung menurunkan kunjungan outdoor">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={curahHujanBulanan.map((_, idx) => {
              const risk = getOutdoorActivityRiskLevel(idx);
              const season = getClassifySeason(idx);
              const seasonMultiplier = season.season === "Musim Kemarau" ? 1.2 : season.season === "Musim Hujan" ? 0.75 : 1.0;
              const baseVisit = [125, 88, 72, 185, 110, 195, 160, 245, 95, 105, 115, 250][idx];
              return {
                bulan: bulanNames[idx],
                rainyDays: risk.rainyDays,
                adjustedVisits: Math.round(baseVisit * seasonMultiplier),
              };
            })} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area yAxisId="left" type="monotone" dataKey="rainyDays" name="Hari Hujan" stroke="#3b82f6" fill="#93c5fd" />
              <Area yAxisId="right" type="monotone" dataKey="adjustedVisits" name="Kunjisan (x1000)" stroke="#059669" fill="#a7f3d0" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </div>
  );
}
