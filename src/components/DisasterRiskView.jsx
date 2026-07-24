import { useState, useMemo } from "react";
import {
  AlertTriangle,
  Mountain,
  Droplets,
  MapPin,
  ShieldAlert,
  Info,
  CheckCircle2,
  XCircle,
  Thermometer,
  Calendar,
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
} from "recharts";
import { Panel, SectionTitle } from "./ui";
import { longsorPerKecamatan, trenLongsorTahunan, destinasiZonaRawan, getRiskLevel } from "../data/bpbdData";
import { calculateDisasterRiskScore, getSafeSeason } from "../utils/analytics";
import { curahHujanBulanan } from "../data/bmkgData";

export default function DisasterRiskView() {
  const [selectedKecamatan, setSelectedKecamatan] = useState("Madukara");

  // Sort kecamatan by risk
  const sortedKecamatan = useMemo(() => {
    return [...longsorPerKecamatan].sort((a, b) => b.totalLongsor - a.totalLongsor);
  }, []);

  // Risk data for chart
  const riskChartData = useMemo(() => {
    return longsorPerKecamatan.map((k) => {
      const risk = getRiskLevel(k.totalLongsor);
      const riskScore = Math.min(100, (k.totalLongsor / 25) * 100);
      return {
        kecamatan: k.kecamatan,
        longsor: k.totalLongsor,
        riskScore: Math.round(riskScore),
        riskLevel: risk.level,
        riskColor: risk.level === "Sangat Tinggi" ? "#dc2626" :
                   risk.level === "Tinggi" ? "#ea580c" :
                   risk.level === "Sedang-Tinggi" ? "#d97706" :
                   risk.level === "Sedang" ? "#f59e0b" : "#059669",
      };
    });
  }, []);

  // Safe season for selected kecamatan
  const safeSeason = useMemo(() => {
    return getSafeSeason(selectedKecamatan);
  }, [selectedKecamatan]);

  // Disaster risk score for selected kecamatan
  const disasterRisk = useMemo(() => {
    const kecData = longsorPerKecamatan.find(k => k.kecamatan.toLowerCase() === selectedKecamatan.toLowerCase());
    if (!kecData) return null;
    return calculateDisasterRiskScore(selectedKecamatan, kecData, curahHujanBulanan);
  }, [selectedKecamatan]);

  // Top 5 rawan longsor
  const topRawan = useMemo(() => sortedKecamatan.slice(0, 5), [sortedKecamatan]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionTitle
        badge="FITUR 2"
        title="Bencana & Risiko Wisata"
        subtitle="Analisis risiko longsor & rekomendasi safe season per kecamatan"
        rightElement={
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldAlert className="w-4 h-4" />
            <span>Sumber: BPBD 2018-2023</span>
          </div>
        }
      />

      {/* Kecamatan Selector */}
      <Panel title="Pilih Kecamatan" subtitle="Analisis risiko bencana per lokasi">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
          {longsorPerKecamatan
            .sort((a, b) => b.totalLongsor - a.totalLongsor)
            .map((k) => {
              const risk = getRiskLevel(k.totalLongsor);
              return (
                <button
                  key={k.kecamatan}
                  onClick={() => setSelectedKecamatan(k.kecamatan)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                    selectedKecamatan === k.kecamatan
                      ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-200"
                      : `${risk.bg} ${risk.color} border-slate-200 hover:border-red-300`
                  }`}
                >
                  <span className="block text-xs opacity-75">{k.kecamatan}</span>
                  <span className="block text-xs font-bold">{k.totalLongsor} longsor</span>
                </button>
              );
            })}
        </div>
      </Panel>

      {/* Disaster Risk Overview for Selected Kecamatan */}
      {disasterRisk && (
        <Panel title={`Risiko Bencana - ${selectedKecamatan}`} subtitle="Kalkulasi berbasis longsor, curah hujan, dan topografi">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border-2 border-red-200 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <span className="text-4xl">{disasterRisk.riskIcon}</span>
              </div>
              <p className={`text-xl font-bold ${disasterRisk.riskColor}`}>{disasterRisk.riskLevel}</p>
              <p className="text-xs text-slate-500 mt-1">Risk Level</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-2xl font-bold text-slate-800">{disasterRisk.riskScore}/100</p>
              <p className="text-xs text-slate-500 mt-1">Risk Score</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
              <div className="flex justify-center mb-2">
                <Mountain className="w-8 h-8 text-amber-600" />
              </div>
              <p className="text-lg font-bold text-slate-800">{disasterRisk.topografi}</p>
              <p className="text-xs text-slate-500 mt-1">Topografi</p>
              <p className="text-xs text-slate-500">{disasterRisk.longsorCount} peristiwa</p>
            </div>
            <div className="bg-white border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-slate-700 font-medium">{disasterRisk.recommendedAction}</p>
              </div>
            </div>
          </div>
        </Panel>
      )}

      {/* Risk Chart - Kecamatan Ranking */}
      <Panel title="Ranking Risiko Longsor per Kecamatan" subtitle="Berdasarkan jumlah peristiwa (2018-2023)">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskChartData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="kecamatan" tick={{ fontSize: 10 }} width={90} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload[0]) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-sm">
                        <p className="font-bold text-slate-800">{data.kecamatan}</p>
                        <p className="text-slate-600">Longsor: <span className="font-bold">{data.longsor} peristiwa</span></p>
                        <p className="text-slate-600">Risk Score: <span className="font-bold">{data.riskScore}/100</span></p>
                        <p className={`font-semibold ${data.riskColor}`}>Level: {data.riskLevel}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="longsor" name="Jumlah Longsor" radius={[0, 6, 6, 0]}>
                {riskChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.riskColor} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      {/* Top 5 Zona Rawan */}
      <Panel title="Top 5 Kecamatan Zona Rawan Longsor">
        <div className="space-y-3">
          {topRawan.map((k, idx) => {
            const risk = getRiskLevel(k.totalLongsor);
            return (
              <div key={k.kecamatan} className={`flex items-center gap-4 p-4 rounded-xl border ${risk.bg} ${risk.level === "Sangat Tinggi" ? "border-red-300" : risk.level === "Tinggi" ? "border-orange-300" : "border-amber-300"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${idx === 0 ? "bg-red-600" : idx === 1 ? "bg-orange-500" : idx === 2 ? "bg-amber-500" : "bg-slate-400"}`}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">{k.kecamatan}</p>
                  <p className="text-xs text-slate-600">{k.elevasi} • {k.topografi}</p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${risk.color}`}>{k.totalLongsor}</p>
                  <p className="text-xs text-slate-600">peristiwa</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${risk.bg} ${risk.color}`}>
                  {risk.icon} {risk.level}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* Tren Longsor Tahunan */}
      <Panel title="Tren Longsor per Tahun" subtitle="Total peristiwa bencana tanah longsor 2018-2023">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trenLongsorTahunan} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="tahun" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="jumlah" name="Jumlah Longsor" stroke="#dc2626" fill="#fecaca" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      {/* Safe Season Calendar */}
      <Panel title={`Safe Season - ${selectedKecamatan}`} subtitle="Klasifikasi risiko longsor per bulan">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
          {safeSeason.safeMonths.map((m) => (
            <div key={m.bulan} className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <p className="text-xs font-bold text-emerald-800 mb-1">{m.bulan}</p>
              <span className="text-xl">{m.icon}</span>
              <p className="text-[10px] text-emerald-600 mt-1">{m.rainyDays} hujan</p>
            </div>
          ))}
          {safeSeason.moderateMonths.map((m) => (
            <div key={m.bulan} className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
              <p className="text-xs font-bold text-amber-800 mb-1">{m.bulan}</p>
              <span className="text-xl">{m.icon}</span>
              <p className="text-[10px] text-amber-600 mt-1">{m.rainyDays} hujan</p>
            </div>
          ))}
          {safeSeason.highRiskMonths.map((m) => (
            <div key={m.bulan} className="p-3 bg-red-50 border border-red-200 rounded-xl text-center">
              <p className="text-xs font-bold text-red-800 mb-1">{m.bulan}</p>
              <span className="text-xl">{m.icon}</span>
              <p className="text-[10px] text-red-600 mt-1">{m.rainyDays} hujan</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* Destinasi Zona Rawan */}
      <Panel title="Destinasi Wisata di Zona Rawan Longsor">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinasiZonaRawan.map((dest, idx) => {
            const isHighRisk = ["Madukara", "Sigaluh", "Punggelan"].includes(dest.kecamatan);
            return (
              <div key={idx} className={`p-4 rounded-xl border-2 ${isHighRisk ? "border-red-300 bg-red-50/50" : "border-amber-200 bg-amber-50/50"}`}>
                <div className="flex items-start gap-3">
                  <MapPin className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isHighRisk ? "text-red-600" : "text-amber-600"}`} />
                  <div className="flex-1">
                    <p className="font-bold text-slate-800">{dest.nama}</p>
                    <p className="text-xs text-slate-600 mt-1">Kec. {dest.kecamatan} • Jarak: {dest.jarakZonaLongsor}</p>
                    <div className="mt-2 p-2 bg-white/80 rounded-lg border border-slate-200">
                      <p className="text-[11px] text-slate-700">💡 {dest.rekomendasi}</p>
                    </div>
                  </div>
                  {isHighRisk ? (
                    <ShieldAlert className="w-6 h-6 text-red-500 flex-shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
