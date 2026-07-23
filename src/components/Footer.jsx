import React, { useState } from "react";
import { Info, ExternalLink, ShieldCheck, AlertCircle, FileText, X } from "lucide-react";

export function Footer() {
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);

  return (
    <footer className="bg-[#141414] text-white border-t-2 border-[#141414] mt-12 font-mono text-xs">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 py-6 space-y-4">
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-4">
          <div>
            <div className="text-[10px] uppercase font-black tracking-[0.25em] text-blue-400">
              DASBOR ANALITIK PARIWISATA, CAGAR BUDAYA &amp; INVESTASI
            </div>
            <h3 className="font-serif italic text-lg font-bold text-white mt-0.5">
              Kabupaten Banjarnegara — Jawa Tengah
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowDisclaimerModal(true)}
              className="bg-[#262626] hover:bg-gray-800 text-amber-400 border border-amber-500/50 px-3 py-1.5 font-bold uppercase text-[11px] flex items-center gap-1.5 shadow-hd transition cursor-pointer"
            >
              <Info size={14} /> Disclaimer Pengolahan Data
            </button>
            <a
              href="https://opendata.banjarnegarakab.go.id/"
              target="_blank"
              rel="noreferrer"
              className="bg-[#262626] hover:bg-gray-800 text-white border border-gray-700 px-3 py-1.5 font-bold uppercase text-[11px] flex items-center gap-1.5 transition"
            >
              Open Data Banjarnegara <ExternalLink size={13} />
            </a>
            <a
              href="https://dikdaya.banjarnegarakab.go.id/cagarbudaya"
              target="_blank"
              rel="noreferrer"
              className="bg-[#262626] hover:bg-gray-800 text-white border border-gray-700 px-3 py-1.5 font-bold uppercase text-[11px] flex items-center gap-1.5 transition"
            >
              DIKDAYA Disparbud <ExternalLink size={13} />
            </a>
            <a
              href="https://dpmptsp.banjarnegarakab.go.id/alur-proses-perizinan/"
              target="_blank"
              rel="noreferrer"
              className="bg-[#262626] hover:bg-gray-800 text-emerald-400 border border-emerald-600/50 px-3 py-1.5 font-bold uppercase text-[11px] flex items-center gap-1.5 transition"
            >
              Izin DPMPTSP <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Disclaimer Text Box in Footer */}
        <div className="bg-[#1c1c1a] border border-gray-800 p-4 space-y-2 text-[11px] text-gray-300 leading-relaxed font-sans">
          <div className="font-mono text-[10px] font-extrabold uppercase text-amber-400 flex items-center gap-1.5">
            <AlertCircle size={14} /> DISCLAIMER PENGGUNAAN &amp; SUMBER DATA OFFICIAL
          </div>
          <p>
            Seluruh data publikasi pada dasbor analitik ini bersumber dari portal resmi <b>Open Data Banjarnegara</b> (<a href="https://opendata.banjarnegarakab.go.id/" target="_blank" rel="noreferrer" className="text-blue-400 underline">opendata.banjarnegarakab.go.id</a>) dan portal resmi <b>DIKDAYA Dinas Pariwisata dan Kebudayaan Kabupaten Banjarnegara</b> (<a href="https://dikdaya.banjarnegarakab.go.id/cagarbudaya" target="_blank" rel="noreferrer" className="text-blue-400 underline">dikdaya.banjarnegarakab.go.id/cagarbudaya</a>).
          </p>
          <p>
            Aplikasi website ini berfungsi sebagai <b>sistem pengolah data, analitik visual, dan WebGIS interaktif</b> untuk memberikan analisis nilai tambah bagi masyarakat, pemerintah daerah, dan calon investor. Angka simulasi ROI dan rekomendasi investasi disajikan sebagai estimasi pemodelan analitis.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-500 pt-2 font-mono">
          <span>© {new Date().getFullYear()} Dasbor Analitik Pariwisata &amp; Cagar Budaya Banjarnegara.</span>
          <span>Pengolahan Data Sektoral &amp; WebGIS Interaktif.</span>
        </div>
      </div>

      {/* Modal Disclaimer Detail */}
      {showDisclaimerModal && (
        <div className="fixed inset-0 bg-slate-950/85 flex items-center justify-center z-50 p-4 font-mono">
          <div className="bg-white text-[#141414] max-w-lg w-full shadow-hd-lg border-2 border-[#141414] overflow-hidden flex flex-col animate-fade-in">
            <div className="bg-[#141414] text-white p-4 flex items-center justify-between border-b border-black">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm uppercase">
                <Info size={18} /> Halaman Disclaimer &amp; Sumber Data
              </div>
              <button
                onClick={() => setShowDisclaimerModal(false)}
                className="text-white hover:text-red-400 p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs font-sans leading-relaxed text-[#333]">
              <div className="p-3 bg-amber-50 border border-amber-300 font-mono text-[11px] space-y-1">
                <b className="text-amber-900 uppercase block">1. Sumber Resmi Data:</b>
                <p>
                  Seluruh data primer yang digunakan dalam aplikasi ini diambil langsung dari:
                </p>
                <ul className="list-disc pl-4 space-y-0.5 pt-1 text-[#222]">
                  <li><b>Open Data Banjarnegara</b> (Portal CKAN Pemkab Banjarnegara)</li>
                  <li><b>Portal DIKDAYA</b> (Dinas Pariwisata dan Kebudayaan Kab. Banjarnegara)</li>
                </ul>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-300 font-mono text-[11px] space-y-1">
                <b className="text-blue-900 uppercase block">2. Peran Aplikasi:</b>
                <p>
                  Website ini <b>hanya berfungsi mengolah, menstrukturkan, memvisualisasikan, dan menganalisis</b> data mentah sektoral ke dalam bentuk grafik, peta WebGIS, serta indikator potensi strategis.
                </p>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-300 font-mono text-[11px] space-y-1">
                <b className="text-emerald-900 uppercase block">3. Pemisahan Data Investasi:</b>
                <p>
                  Pada halaman Peluang Investasi, data telah dipisahkan secara tegas antara <b>Data Potensi Real (Empiris Terverifikasi)</b> dan <b>Model Simulasi &amp; Rekomendasi Investasi</b>.
                </p>
              </div>
            </div>

            <div className="bg-[#f1f1ef] p-3 border-t border-[#141414] flex justify-end font-mono">
              <button
                onClick={() => setShowDisclaimerModal(false)}
                className="bg-[#141414] text-white px-4 py-1.5 font-bold uppercase text-xs hover:bg-slate-800 shadow-hd"
              >
                Saya Mengerti &amp; Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
