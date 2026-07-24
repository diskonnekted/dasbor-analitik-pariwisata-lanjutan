import { useState } from "react";
import { Info, ExternalLink, AlertCircle, X } from "lucide-react";

export function Footer() {
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);

  return (
    <footer className="gradient-header text-white mt-12 font-mono text-xs">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary-300">
              DASBOR ANALITIK PARIWISATA, CAGAR BUDAYA & INVESTASI
            </div>
            <h3 className="font-sans text-lg font-bold text-white mt-0.5">
              Kabupaten Banjarnegara — Jawa Tengah
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowDisclaimerModal(true)}
              className="bg-white/10 hover:bg-white/20 text-amber-300 border border-amber-500/40 px-3 py-1.5 font-semibold rounded-lg text-[11px] flex items-center gap-1.5 transition"
            >
              <Info size={14} /> Disclaimer
            </button>
            <a
              href="https://opendata.banjarnegarakab.go.id/"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/10 px-3 py-1.5 font-semibold rounded-lg text-[11px] flex items-center gap-1.5 transition"
            >
              Open Data <ExternalLink size={13} />
            </a>
            <a
              href="https://dikdaya.banjarnegarakab.go.id/cagarbudaya"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/10 px-3 py-1.5 font-semibold rounded-lg text-[11px] flex items-center gap-1.5 transition"
            >
              DIKDAYA Disparbud <ExternalLink size={13} />
            </a>
            <a
              href="https://dpmptsp.banjarnegarakab.go.id/alur-proses-perizinan/"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 font-semibold rounded-lg text-[11px] flex items-center gap-1.5 transition"
            >
              Izin DPMPTSP <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Disclaimer Text Box */}
        <div className="bg-white/5 border border-white/10 p-4 space-y-2 text-[11px] text-slate-300 leading-relaxed font-sans rounded-lg">
          <div className="font-mono text-[10px] font-bold uppercase text-amber-400 flex items-center gap-1.5">
            <AlertCircle size={14} /> DISCLAIMER PENGGUNAAN & SUMBER DATA
          </div>
          <p>
            Seluruh data publikasi pada dasbor analitik ini bersumber dari portal resmi <b>Open Data Banjarnegara</b> (<a href="https://opendata.banjarnegarakab.go.id/" target="_blank" rel="noreferrer" className="text-primary-400 underline">opendata.banjarnegarakab.go.id</a>) dan portal resmi <b>DIKDAYA Dinas Pariwisata dan Kebudayaan Kab. Banjarnegara</b> (<a href="https://dikdaya.banjarnegarakab.go.id/cagarbudaya" target="_blank" rel="noreferrer" className="text-primary-400 underline">dikdaya.banjarnegarakab.go.id/cagarbudaya</a>).
          </p>
          <p>
            Aplikasi ini berfungsi sebagai <b>sistem pengolah data, analitik visual, dan WebGIS interaktif</b> untuk memberikan analisis nilai tambah bagi masyarakat, pemerintah daerah, dan calon investor. Angka simulasi ROI disajikan sebagai estimasi pemodelan analitis.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 pt-2 font-mono">
          <span>© {new Date().getFullYear()} Dasbor Analitik Pariwisata & Cagar Budaya Banjarnegara.</span>
          <span>Pengolahan Data Sektoral & WebGIS Interaktif.</span>
        </div>

        {/* Disclaimer Modal */}
        {showDisclaimerModal && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-mono animate-fade-in">
            <div className="bg-white text-slate-900 max-w-lg w-full rounded-xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
              <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm uppercase">
                  <Info size={18} /> Sumber Data & Disclaimer
                </div>
                <button
                  onClick={() => setShowDisclaimerModal(false)}
                  className="text-white hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 space-y-3.5 text-xs font-sans leading-relaxed text-slate-600">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg font-mono text-[11px] space-y-1">
                  <b className="text-amber-900 uppercase block">1. Sumber Resmi Data:</b>
                  <ul className="list-disc pl-4 space-y-0.5 pt-1 text-slate-700">
                    <li><b>Open Data Banjarnegara</b> (Portal CKAN Pemkab)</li>
                    <li><b>Portal DIKDAYA</b> (Dinas Pariwisata & Kebudayaan)</li>
                  </ul>
                </div>

                <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg font-mono text-[11px] space-y-1">
                  <b className="text-primary-900 uppercase block">2. Peran Aplikasi:</b>
                  <p>Website ini <b>hanya mengolah, menstrukturkan, memvisualisasikan, dan menganalisis</b> data mentah sektoral ke dalam bentuk grafik, peta WebGIS, dan indikator potensi strategis.</p>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg font-mono text-[11px] space-y-1">
                  <b className="text-emerald-900 uppercase block">3. Pemisahan Data Investasi:</b>
                  <p>Pada halaman Peluang Investasi, data dipisahkan antara <b>Data Potensi Real (Empiris Terverifikasi)</b> dan <b>Model Simulasi & Rekomendasi Investasi</b>.</p>
                </div>

                <div className="p-3 bg-red-50 border border-red-200 rounded-lg font-mono text-[11px] space-y-1">
                  <b className="text-red-900 uppercase block">4. Margin of Error & Faktor Penyebab:</b>
                  <p>Model simulasi ROI, indeks kesiapan fasilitas, dan data analitik makro memiliki <b>Margin of Error ±10% - 15%</b> karena:</p>
                  <ul className="list-disc pl-4 space-y-0.5 pt-1 text-slate-700 font-sans text-[10px]">
                    <li><b>Asumsi Pajak Tidak Langsung:</b> Kontribusi PAD dari destinasi swasta merupakan estimasi taksiran pajak hotel/restoran 10%, bukan retribusi langsung.</li>
                    <li><b>Keterbatasan Pelaporan Fasilitas Open Data:</b> Sebagian desa wisata melaporkan fasilitas secara parsial (belum merinci keberadaan Toilet/Mushola secara eksplisit).</li>
                    <li><b>Parameter Konstan Investasi:</b> Simulasi ROI menggunakan parameter biaya operasional dan okupansi rata-rata linier yang fluktuatif di lapangan nyata.</li>
                    <li><b>Estimasi Area Publik:</b> Kunjungan area non-tiket (Alun-Alun) dihitung berbasis survei sampling pergerakan mingguan.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-50 p-3 border-t border-slate-200 flex justify-end font-mono">
                <button
                  onClick={() => setShowDisclaimerModal(false)}
                  className="bg-slate-800 text-white px-4 py-1.5 font-semibold rounded-lg text-xs hover:bg-slate-700 transition"
                >
                  Saya Mengerti & Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
