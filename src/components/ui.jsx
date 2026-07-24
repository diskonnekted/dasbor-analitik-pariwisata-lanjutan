import {
  X,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Bus,
  Wifi,
  Compass,
  Sparkles,
  Printer,
  ArrowUpRight,
} from "lucide-react";
import { formatNumber, formatRupiah, formatShortRupiah, getCarryingCapacityInfo } from "../utils/analytics";

/* ============================================
   Header - SaaS Analytics Style
   ============================================ */
export function Header({ onPrint }) {
  return (
    <header className="gradient-header text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary-600/90 backdrop-blur-sm text-white p-2 rounded-lg border border-primary-500/30 shadow-md shrink-0">
            <Compass size={20} className="animate-spin-slow" />
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-300 font-bold flex items-center gap-1.5">
              <Sparkles size={11} /> BANJARNEGARA TOURISM ANALYTICS & WEBGIS
            </div>
            <h1 className="font-sans text-lg sm:text-xl font-bold leading-tight tracking-tight text-white">
              Dasbor Analitik Pariwisata Banjarnegara
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onPrint}
            className="hidden sm:flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg px-3 py-1.5 font-mono text-[11px] font-semibold transition cursor-pointer backdrop-blur-sm"
          >
            <Printer size={13} /> Cetak Laporan
          </button>
          <a
            href="https://opendata.banjarnegarakab.go.id/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-3 py-1.5 font-mono text-[11px] font-semibold transition shadow-md shadow-primary-600/20"
          >
            Open Data <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ============================================
   Panel - SaaS Card Container
   ============================================ */
export function Panel({ children, className = "" }) {
  const hasPadding = className.split(" ").some((c) => c.startsWith("p-") || c.startsWith("px-") || c.startsWith("py-"));
  const finalClass = hasPadding ? className : `p-5 ${className}`;
  return (
    <div className={`bg-white border border-slate-200 rounded-xl shadow-sm ${finalClass}`}>
      {children}
    </div>
  );
}

/* ============================================
   SectionTitle - Modern Section Headers
   ============================================ */
export function SectionTitle({ index, title, subtitle, rightElement }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-1 border-b border-slate-100">
      <div>
        <div className="flex items-center gap-2">
          {index && (
            <span className="font-mono text-[10px] font-bold uppercase bg-slate-800 text-white px-2 py-0.5 rounded-full">
              {index}
            </span>
          )}
          <h2 className="font-sans text-lg font-bold text-slate-900 leading-tight">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-xs text-slate-500 font-sans mt-0.5 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {rightElement && <div className="shrink-0">{rightElement}</div>}
    </div>
  );
}

/* ============================================
   StatCard - SaaS Metric Cards
   ============================================ */
export function StatCard({ label, value, sub, icon: Icon, accent = "blue", badge }) {
  const accentConfig = {
    dark: { bg: "bg-slate-50", iconBg: "bg-slate-100", iconColor: "text-slate-600", valueColor: "text-slate-900", borderLeft: "border-l-4 border-l-slate-400" },
    blue: { bg: "bg-primary-50", iconBg: "bg-primary-100", iconColor: "text-primary-600", valueColor: "text-primary-700", borderLeft: "border-l-4 border-l-primary-500" },
    amber: { bg: "bg-amber-50", iconBg: "bg-amber-100", iconColor: "text-amber-600", valueColor: "text-amber-700", borderLeft: "border-l-4 border-l-amber-500" },
    emerald: { bg: "bg-emerald-50", iconBg: "bg-emerald-100", iconColor: "text-emerald-600", valueColor: "text-emerald-700", borderLeft: "border-l-4 border-l-emerald-500" },
    purple: { bg: "bg-purple-50", iconBg: "bg-purple-100", iconColor: "text-purple-600", valueColor: "text-purple-700", borderLeft: "border-l-4 border-l-purple-500" },
  };

  const cfg = accentConfig[accent] || accentConfig.blue;

  return (
    <div className={`bg-white border border-slate-200 rounded-xl shadow-sm ${cfg.borderLeft} hover:shadow-md hover:border-slate-300 transition-all duration-200`}>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
            {label}
          </span>
          {Icon && (
            <div className={`${cfg.iconBg} p-1.5 rounded-lg`}>
              <Icon size={16} className={cfg.iconColor} />
            </div>
          )}
        </div>
        <div className="flex items-baseline justify-between gap-2">
          <div className={`font-mono text-2xl sm:text-3xl font-bold tracking-tight ${cfg.valueColor}`}>
            {value}
          </div>
          {badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold bg-primary-100 text-primary-700">
              {badge}
            </span>
          )}
        </div>
        {sub && <div className="text-[11px] text-slate-500 font-sans">{sub}</div>}
      </div>
    </div>
  );
}

/* ============================================
   TabButton - SaaS Tab Navigation
   ============================================ */
export function TabButton({ active, onClick, icon: Icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-mono text-[11px] font-semibold px-4 py-2 rounded-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap ${
        active
          ? "bg-slate-800 text-white shadow-sm"
          : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300"
      }`}
    >
      {Icon && <Icon size={14} />}
      <span>{children}</span>
    </button>
  );
}

/* ============================================
   ChartTooltip - SaaS Style Tooltip
   ============================================ */
export function ChartTooltip({ active, payload, label, formatter }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-slate-900 p-3 border border-slate-200 rounded-lg shadow-lg font-mono text-xs space-y-1.5 z-50">
        <div className="font-bold text-sm text-slate-800 border-b border-slate-100 pb-1.5">
          {label}
        </div>
        {payload.map((entry, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4 text-[11px]">
            <span style={{ color: entry.color || "#3b82f6" }} className="font-medium">
              ● {entry.name}:
            </span>
            <span className="font-bold text-slate-900">
              {formatter ? formatter(entry.value) : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

/* ============================================
   ProgressBar - SaaS Progress Bar
   ============================================ */
export function ProgressBar({ value, max = 100, label, color = "bg-primary-600" }) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  return (
    <div className="space-y-1.5 font-mono text-xs">
      <div className="flex justify-between items-center text-[10px] font-semibold text-slate-500 uppercase">
        <span>{label}</span>
        <span className="text-slate-700">{pct}%</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

const DESTINASI_DISCLAIMERS = {
  "OW-01": {
    judul: "💡 Catatan Tiket Terusan & Pengelolaan (Candi Arjuna):",
    poin: [
      "Tiket masuk merupakan Tiket Terusan yang dibundling dengan Kawah Sikidang (tidak dijual terpisah).",
      "Dikelola langsung oleh UPTD Dieng Dinas Pariwisata & Kebudayaan Kabupaten Banjarnegara.",
      "Terdapat tarif tiket khusus untuk wisatawan mancanegara sesuai regulasi daerah.",
      "Tarif tiket terusan terbaru di lapangan berkisar Rp 30.000 - Rp 35.000 per orang."
    ]
  },
  "OW-02": {
    judul: "💡 Catatan Tiket Terusan & Pengelolaan (Kawah Sikidang):",
    poin: [
      "Tiket masuk merupakan Tiket Terusan yang dibundling dengan Candi Arjuna (tidak dijual terpisah).",
      "Dikelola langsung oleh UPTD Dieng Dinas Pariwisata & Kebudayaan Kabupaten Banjarnegara.",
      "Terdapat tarif tiket khusus untuk wisatawan mancanegara sesuai regulasi daerah.",
      "Tarif tiket terusan terbaru di lapangan berkisar Rp 30.000 - Rp 35.000 per orang."
    ]
  },
  "OW-03": {
    judul: "💡 Catatan Pengelolaan (Telaga Warna & Pengilon):",
    poin: [
      "Dikelola oleh BKSDA Jawa Tengah bekerja sama dengan pihak swasta, bukan Pemkab Banjarnegara secara langsung.",
      "Kontribusi PAD yang tercantum disetorkan sebagai PNBP (Penerimaan Negara Bukan Pajak) kehutanan dan bagi hasil retribusi.",
      "Tiket Masuk untuk wisatawan mancanegara berbeda signifikan (sesuai regulasi PNBP KLHK)."
    ]
  },
  "OW-04": {
    judul: "💡 Catatan Swadaya (Batu Ratapan Angin):",
    poin: [
      "Dikelola secara swadaya oleh Pokdarwis desa setempat bersama pemilik lahan swasta.",
      "Kontribusi PAD berupa pajak hiburan daerah dan bagi hasil kontribusi pembangunan desa wisata Kulon."
    ]
  },
  "OW-06": {
    judul: "💡 Catatan Kawasan Terpadu (Gumelem):",
    poin: [
      "Wisata Gumelem bersifat kawasan desa wisata terbuka. Tiket masuk bersifat opsional (sukarela/paket kunjungan batik).",
      "PAD mencakup perputaran ekonomi pengrajin batik tulis lokal dan retribusi wisata religi Makam Girilaya."
    ]
  },
  "OW-07": {
    judul: "💡 Catatan Validitas Data (The Pikas):",
    poin: [
      "Pengunjung mencakup total pengunjung resort terpadu (outbound, penginapan, restoran), bukan hanya peserta rafting.",
      "Kontribusi PAD merupakan pajak tidak langsung (pajak hotel/restoran 10%) karena kepemilikan swasta penuh.",
      "Tiket Masuk merepresentasikan tarif dasar untuk paket trip pendek rafting per orang."
    ]
  },
  "OW-08": {
    judul: "💡 Catatan Pokdarwis Desa (Tampomas):",
    poin: [
      "Merupakan danau buatan bekas tambang batu Mrica yang dikelola oleh Pokdarwis Desa Pagelak.",
      "Sebagian besar pendapatan retribusi tiket dikelola untuk pembangunan kas desa (APBDes) dan operasional lokal."
    ]
  },
  "OW-10": {
    judul: "💡 Catatan Kemitraan (Kebun Teh Keningar):",
    poin: [
      "Lahan kebun teh dimiliki oleh PT Pagilaran (UGM) dan dikelola secara kemitraan wisata dengan warga lokal.",
      "Kontribusi daerah berupa pajak pariwisata swasta dan Pajak Bumi & Bangunan (PBB) sektor perkebunan."
    ]
  },
  "OW-12": {
    judul: "💡 Catatan Ruang Publik (Alun-Alun):",
    poin: [
      "Merupakan ruang publik terbuka milik Pemkab Banjarnegara tanpa tiket masuk (Gratis).",
      "Estimasi Pengunjung didasarkan pada survei pergerakan akhir pekan dan keramaian mingguan.",
      "PAD berasal dari retribusi lapak UMKM kuliner Dawet Ayu dan pajak parkir di sekitar Alun-Alun."
    ]
  }
};

/* ============================================
   DestinasiDetailModal - SaaS Modal
   ============================================ */
export function DestinasiDetailModal({ item, onClose }) {
  if (!item) return null;

  const capInfo = getCarryingCapacityInfo(item.carryingCapacityAvg, item.carryingCapacityMax);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl max-w-xl w-full shadow-xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-700 shrink-0">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase text-primary-400 tracking-wider block">
              {item.kategori} · {item.desa}, Kec. {item.kecamatan}
            </span>
            <h3 className="font-sans text-lg font-bold text-white">{item.nama}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 font-mono text-xs">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 font-semibold uppercase block">Pengunjung / Thn</span>
              <span className="font-bold text-sm text-slate-900">{formatNumber(item.pengunjung)}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 font-semibold uppercase block">Kontribusi PAD</span>
              <span className="font-bold text-sm text-emerald-700">{formatShortRupiah(item.padTahunan)}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 font-semibold uppercase block">Tiket Masuk</span>
              <span className="font-bold text-sm text-primary-700">{item.tiket ? formatRupiah(item.tiket) : "Gratis"}</span>
            </div>
          </div>

          {DESTINASI_DISCLAIMERS[item.id] && (
            <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 text-[10px] rounded-lg leading-relaxed space-y-1 font-sans">
              <span className="font-bold block uppercase tracking-wider text-[9px] text-blue-900">
                {DESTINASI_DISCLAIMERS[item.id].judul}
              </span>
              {DESTINASI_DISCLAIMERS[item.id].poin.map((p, idx) => (
                <p key={idx}>• {p}</p>
              ))}
            </div>
          )}

          {/* Carrying Capacity Indicator */}
          <div className={`p-3 rounded-lg border ${capInfo.border} ${capInfo.bg} space-y-1.5`}>
            <div className="flex justify-between items-center text-[11px] font-bold">
              <span className="flex items-center gap-1.5">
                <AlertTriangle size={14} /> DAYA DUKUNG
              </span>
              <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full border ${capInfo.border} ${capInfo.color} bg-white uppercase`}>
                {capInfo.status}
              </span>
            </div>
            <ProgressBar value={item.carryingCapacityAvg} max={item.carryingCapacityMax} label="Beban Pengunjung Harian vs Kuota Maksimal" color="bg-amber-600" />
            <div className="text-[10px] text-slate-600 pt-1">
              Rata-rata: {formatNumber(item.carryingCapacityAvg)} orang/hari | Maksimum: {formatNumber(item.carryingCapacityMax)} orang/hari
            </div>
          </div>

          {/* Infrastructure */}
          <div className="space-y-2">
            <span className="font-bold uppercase text-[11px] text-slate-800 border-b border-slate-200 pb-1 block">
              Infrastruktur & Aksesibilitas
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-2">
                <Bus size={14} className="text-primary-600" />
                <span>Akses Roda 4+: <b>{item.aksesibilitasR4}% Kelayakan</b></span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi size={14} className="text-indigo-600" />
                <span>Sinyal Digital: <b>{item.sinyalDigital}</b></span>
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div className="space-y-2">
            <span className="font-bold uppercase text-[11px] text-slate-800 border-b border-slate-200 pb-1 block">
              Fasilitas Pendukung
            </span>
            <div className="flex flex-wrap gap-1.5">
              {item.fasilitas?.map((f, i) => (
                <span key={i} className="bg-slate-50 border border-slate-200 text-[10px] font-semibold px-2 py-1 flex items-center gap-1 rounded-full">
                  <CheckCircle2 size={11} className="text-emerald-600" /> {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-3 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="bg-slate-800 text-white border border-slate-700 px-4 py-1.5 font-mono text-xs font-semibold rounded-lg hover:bg-slate-700 transition"
          >
            Tutup Detail
          </button>
        </div>
      </div>
    </div>
  );
}
