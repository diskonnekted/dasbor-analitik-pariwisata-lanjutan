import React from "react";
import {
  X,
  MapPin,
  Users,
  DollarSign,
  Star,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Bus,
  Wifi,
  Sparkles,
  Printer,
  Calendar,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { formatNumber, formatRupiah, formatShortRupiah, getCarryingCapacityInfo } from "../utils/analytics";

export function Header({ onPrint }) {
  return (
    <header className="bg-[#141414] text-white border-b-2 border-[#141414] sticky top-0 z-40">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 border border-white shadow-hd shrink-0">
            <Compass size={22} className="animate-spin-slow" />
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-blue-400 font-extrabold flex items-center gap-1.5">
              <Sparkles size={12} /> BANJARNEGARA TOURISM ANALYTICS & WEBGIS
            </div>
            <h1 className="font-serif italic text-xl sm:text-2xl font-bold leading-tight tracking-tight">
              Dasbor Analitik Pariwisata Banjarnegara
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onPrint}
            className="hidden sm:flex items-center gap-2 bg-[#f1f1ef] text-[#141414] border border-white shadow-hd px-3.5 py-1.5 font-mono text-[11px] font-extrabold uppercase hover:bg-white transition cursor-pointer"
          >
            <Printer size={14} /> Cetak Laporan / PDF
          </button>
          <a
            href="https://opendata.banjarnegarakab.go.id/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 bg-blue-600 text-white border border-blue-400 shadow-hd px-3.5 py-1.5 font-mono text-[11px] font-extrabold uppercase hover:bg-blue-700 transition"
          >
            Open Data <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </header>
  );
}

export function Panel({ children, className = "" }) {
  return (
    <div className={`bg-white border-hd shadow-hd p-5 space-y-4 rounded-none ${className}`}>
      {children}
    </div>
  );
}

export function SectionTitle({ index, title, subtitle, rightElement }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#141414] pb-3 mb-2">
      <div>
        <div className="flex items-center gap-2">
          {index && (
            <span className="font-mono text-[10px] font-extrabold uppercase bg-[#141414] text-white px-2 py-0.5 tracking-wider">
              {index}
            </span>
          )}
          <h2 className="font-serif italic text-xl font-bold text-[#141414] leading-tight">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-xs text-[#555] font-sans mt-0.5 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {rightElement && <div className="shrink-0">{rightElement}</div>}
    </div>
  );
}

export function StatCard({ label, value, sub, icon: Icon, accent = "dark", badge }) {
  const accentStyles = {
    dark: "border-l-4 border-l-[#141414]",
    blue: "border-l-4 border-l-blue-600",
    amber: "border-l-4 border-l-amber-500",
    emerald: "border-l-4 border-l-emerald-600",
    purple: "border-l-4 border-l-purple-600",
  };

  return (
    <div className={`bg-white border-hd shadow-hd p-4 space-y-2 rounded-none ${accentStyles[accent] || accentStyles.dark}`}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] font-extrabold text-[#747474] uppercase tracking-wide">
          {label}
        </span>
        {Icon && <Icon size={18} className="text-[#141414] opacity-80" />}
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <div className="font-mono text-2xl sm:text-3xl font-black text-[#141414] tracking-tight">
          {value}
        </div>
        {badge && (
          <span className="font-mono text-[9px] font-extrabold uppercase px-1.5 py-0.5 bg-blue-50 border border-blue-300 text-blue-700">
            {badge}
          </span>
        )}
      </div>
      {sub && <div className="text-[11px] text-[#666] font-sans font-medium">{sub}</div>}
    </div>
  );
}

export function TabButton({ active, onClick, icon: Icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-mono text-[11px] font-extrabold uppercase px-4 py-2.5 border-hd shadow-hd transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
        active
          ? "bg-[#141414] text-white translate-x-0.5 translate-y-0.5 shadow-none"
          : "bg-white text-[#141414] hover:bg-[#f1f1ef]"
      }`}
    >
      {Icon && <Icon size={14} />}
      <span>{children}</span>
    </button>
  );
}

export function ChartTooltip({ active, payload, label, formatter }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#141414] text-white p-3 border border-black shadow-hd-lg font-mono text-xs space-y-1.5 rounded-none z-50">
        <div className="font-extrabold uppercase border-b border-gray-700 pb-1 text-blue-400">
          {label}
        </div>
        {payload.map((entry, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4 text-[11px]">
            <span style={{ color: entry.color || "#fff" }} className="font-semibold">
              ● {entry.name}:
            </span>
            <span className="font-bold">
              {formatter ? formatter(entry.value) : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function ProgressBar({ value, max = 100, label, color = "bg-blue-600" }) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  return (
    <div className="space-y-1 font-mono text-xs">
      <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#555]">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-2.5 bg-[#e5e7eb] border border-[#141414] overflow-hidden">
        <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function DestinasiDetailModal({ item, onClose }) {
  if (!item) return null;

  const capInfo = getCarryingCapacityInfo(item.carryingCapacityAvg, item.carryingCapacityMax);

  return (
    <div className="fixed inset-0 bg-slate-950/75 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-none max-w-xl w-full shadow-hd-lg overflow-hidden border-2 border-[#141414] flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="bg-[#141414] text-white p-4 flex items-center justify-between border-b border-black shrink-0">
          <div>
            <span className="font-mono text-[10px] font-extrabold uppercase text-blue-400 tracking-wider block">
              {item.kategori} · {item.desa}, Kec. {item.kecamatan}
            </span>
            <h3 className="font-serif italic text-xl font-bold text-white">{item.nama}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-red-400 p-1 border border-transparent hover:border-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 font-mono text-xs">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-2.5 border border-[#141414] bg-[#f1f1ef]">
              <span className="text-[10px] text-[#747474] font-extrabold uppercase block">Pengunjung / Thn</span>
              <span className="font-bold text-sm text-[#141414]">{formatNumber(item.pengunjung)}</span>
            </div>
            <div className="p-2.5 border border-[#141414] bg-[#f1f1ef]">
              <span className="text-[10px] text-[#747474] font-extrabold uppercase block">Kontribusi PAD</span>
              <span className="font-bold text-sm text-emerald-700">{formatShortRupiah(item.padTahunan)}</span>
            </div>
            <div className="p-2.5 border border-[#141414] bg-[#f1f1ef]">
              <span className="text-[10px] text-[#747474] font-extrabold uppercase block">Tiket Masuk</span>
              <span className="font-bold text-sm text-blue-700">{item.tiket ? formatRupiah(item.tiket) : "Gratis"}</span>
            </div>
          </div>

          {/* Carrying Capacity Indicator */}
          <div className={`p-3 border ${capInfo.border} ${capInfo.bg} space-y-1.5`}>
            <div className="flex justify-between items-center text-[11px] font-bold">
              <span className="flex items-center gap-1.5">
                <AlertTriangle size={14} /> DAYA DUKUNG (CARRYING CAPACITY)
              </span>
              <span className={`px-2 py-0.5 text-[9px] font-extrabold border ${capInfo.border} ${capInfo.color} bg-white uppercase`}>
                {capInfo.status}
              </span>
            </div>
            <ProgressBar value={item.carryingCapacityAvg} max={item.carryingCapacityMax} label="Beban Pengunjung Harian vs Kuota Maksimal" color="bg-amber-600" />
            <div className="text-[10px] text-[#555] pt-1">
              Rata-rata: {formatNumber(item.carryingCapacityAvg)} orang/hari | Maksimum: {formatNumber(item.carryingCapacityMax)} orang/hari
            </div>
          </div>

          {/* Infrastructure & Facilities */}
          <div className="space-y-2">
            <span className="font-extrabold uppercase text-[11px] text-[#141414] border-b border-[#141414] pb-1 block">
              Infrastruktur & Aksesibilitas
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-2">
                <Bus size={14} className="text-blue-600" />
                <span>Akses Roda 4+: <b>{item.aksesibilitasR4}% Kelayakan</b></span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi size={14} className="text-indigo-600" />
                <span>Sinyal Digital: <b>{item.sinyalDigital}</b></span>
              </div>
            </div>
          </div>

          {/* Facilities List */}
          <div className="space-y-2">
            <span className="font-extrabold uppercase text-[11px] text-[#141414] border-b border-[#141414] pb-1 block">
              Fasilitas Pendukung Objek Wisata
            </span>
            <div className="flex flex-wrap gap-1.5">
              {item.fasilitas?.map((f, i) => (
                <span key={i} className="bg-[#f1f1ef] border border-[#141414] text-[10px] font-bold px-2 py-1 flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-emerald-600" /> {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#f1f1ef] border-t border-[#141414] p-3 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="bg-[#141414] text-white border border-black px-4 py-1.5 font-mono text-xs font-bold uppercase hover:bg-gray-800 transition"
          >
            Tutup Detail
          </button>
        </div>
      </div>
    </div>
  );
}
