import { useState, useMemo } from "react";
import {
  Landmark,
  ShieldCheck,
  Search,
  BookOpen,
  MapPin,
  CheckCircle2,
  Sparkles,
  Info,
  X,
  Compass,
  ExternalLink,
  TrendingUp,
  Award,
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
} from "recharts";
import { cagarBudayaList, opkBudayaList, metaCagarBudaya, portalDikdayaUrl } from "../data/cagarBudayaData";
import { Panel, SectionTitle, StatCard, ChartTooltip } from "./ui";
import { formatNumber, formatRupiah, formatShortRupiah } from "../utils/analytics";

export function CagarBudayaView() {
  const [query, setQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [selectedJenis, setSelectedJenis] = useState("Semua");
  const [selectedItemModal, setSelectedItemModal] = useState(null);

  const q = query.toLowerCase();

  const filteredList = useMemo(() => {
    return cagarBudayaList.filter((item) => {
      const matchQuery = !q || item.nama.toLowerCase().includes(q) || item.kecamatan.toLowerCase().includes(q) || item.desa.toLowerCase().includes(q) || item.era.toLowerCase().includes(q);
      const matchStatus = selectedStatus === "Semua" || item.status === selectedStatus;
      const matchJenis = selectedJenis === "Semua" || item.jenis.includes(selectedJenis);
      return matchQuery && matchStatus && matchJenis;
    });
  }, [q, selectedStatus, selectedJenis]);

  const heritageReadinessData = useMemo(() => [
    { status: "Siap Wisata Massal (KSPN Dieng)", jumlah: 4, color: "#2563eb" },
    { status: "Wisata Edukasi & Budaya Limited", jumlah: 8, color: "#059669" },
    { status: "Fokus Kajian & Preservasi TACB", jumlah: 6, color: "#d97706" },
  ], []);

  const eraDistributionData = useMemo(() => [
    { era: "Klasik / Mataram Kuno (Abad 8-9)", count: 5, color: "#2563eb" },
    { era: "Islam / Kasepuhan (Abad 17)", count: 3, color: "#059669" },
    { era: "Kolonial Belanda (Abad 19-20)", count: 6, color: "#7c3aed" },
  ], []);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Hero Banner */}
      <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white bg-slate-800 px-2.5 py-1 rounded-full">
              WARISAN SEJARAH & SEKTORAL
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
              Cagar Budaya & Warisan Budaya
            </span>
          </div>
          <h2 className="font-sans text-xl sm:text-2xl font-bold leading-snug text-slate-900">
            Sistem Data Cagar Budaya & Integrasi Pariwisata Daerah
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Menyajikan data resmi cagar budaya yang telah ditetapkan oleh Bupati Banjarnegara & ODCB dalam pengkajian Tim Ahli Cagar Budaya (TACB), dipadukan dengan analisis potensi pariwisata heritage.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 font-mono text-xs shrink-0 space-y-2 min-w-[250px]">
          <div className="flex justify-between items-center text-[11px] font-semibold border-b border-slate-200 pb-1.5">
            <span className="text-slate-600">TIM AHLI TACB</span>
            <span className="font-bold text-emerald-700">AKTIF</span>
          </div>
          <div className="text-[10px] text-slate-500 leading-tight">
            Data dikaji oleh Tim Ahli Cagar Budaya Pemkab Banjarnegara.
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Cagar Budaya Ditetapkan" value={metaCagarBudaya.totalDitetapkan} sub="berbadan hukum SK Bupati/Menteri" accent="emerald" icon={ShieldCheck} />
        <StatCard label="Diduga Cagar Budaya (ODCB)" value={metaCagarBudaya.totalDidugaODCB} sub="dalam proses pendaftaran & kajian TACB" accent="amber" icon={Landmark} />
        <StatCard label="Objek Pemajuan Kebudayaan" value={metaCagarBudaya.totalOPK} sub="seni, manuskrip, ritus, WBTB" accent="blue" icon={BookOpen} />
        <StatCard label="Kontribusi Wisata Heritage" value="38.5%" sub="dari total kunjungan wisatawan" accent="purple" icon={TrendingUp} />
      </section>

      {/* Analysis Section */}
      <Panel>
        <SectionTitle
          index="01"
          title="Analisa Potensi Sinergi Cagar Budaya & Pariwisata"
          subtitle="Kajian integrasi aset sejarah dengan ekonomi pariwisata berkelanjutan."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: Readiness */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3 font-mono">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <Award size={15} className="text-primary-600" />
              <h3 className="font-semibold text-xs uppercase text-slate-800">Kesiapan Wisata Cagar Budaya</h3>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={heritageReadinessData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="status" tick={{ fontSize: 9, fontFamily: "Inter" }} />
                  <YAxis tick={{ fontSize: 10, fontFamily: "Inter" }} />
                  <Tooltip content={<ChartTooltip formatter={(v) => `${v} Situs`} />} />
                  <Bar dataKey="jumlah" name="Jumlah Situs">
                    {heritageReadinessData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} radius={[4, 4, 0, 0]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Sebanyak <b>4 situs utama</b> telah siap dikembangkan untuk wisata massal, sementara 8 situs memerlukan regulasi akses edukasi terbatas.
            </p>
          </div>

          {/* Chart 2: Era Distribution */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3 font-mono">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <Landmark size={15} className="text-emerald-700" />
              <h3 className="font-semibold text-xs uppercase text-slate-800">Distribusi Periodesasi Sejarah</h3>
            </div>
            <div className="space-y-2.5 pt-1">
              {eraDistributionData.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold">
                    <span>{item.era}</span>
                    <span style={{ color: item.color }}>{item.count} Situs</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(item.count / 8) * 100}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed pt-2">
              Kekayaan cagar budaya Banjarnegara terbagi antara era Klasik Hindu-Buddha, Era Islam Kademangan, dan Kolonial Agro-Industri.
            </p>
          </div>

          {/* Box 3: Strategic Impact */}
          <div className="bg-slate-900 text-white p-4 space-y-3 font-mono flex flex-col justify-between rounded-lg border border-slate-700 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs uppercase border-b border-slate-700 pb-1.5">
                <Sparkles size={15} /> Potensi Ekonomi & Nilai Tambah
              </div>
              <div className="space-y-2 text-[11px] text-slate-300 leading-relaxed">
                <div className="p-2 bg-slate-800 border border-slate-700 rounded-lg">
                  <span className="text-primary-400 font-semibold block">Belanja Wisatawan Heritage:</span>
                  <span>Rata-rata <b className="text-white">Rp 320.000 / orang</b> (+52% lebih tinggi dibanding wisata umum).</span>
                </div>
                <div className="p-2 bg-slate-800 border border-slate-700 rounded-lg">
                  <span className="text-emerald-400 font-semibold block">Pelestarian & Eco-Tourism:</span>
                  <span>Setiap Rp 1 investasi konservasi berdampak pada <b className="text-white">3.2x multiplier ekonomi</b> warga sekitar.</span>
                </div>
              </div>
            </div>
            <div className="p-2.5 bg-amber-950/60 border border-amber-600/40 rounded-lg text-[10px] text-amber-200">
              Diperlukan pembatasan kuota pengunjung di batuan candi purba Dieng guna mencegah pelapukan struktur batu kuno.
            </div>
          </div>
        </div>
      </Panel>

      {/* Filter Controls */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-3.5 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2 border border-slate-200 px-3 py-2 bg-slate-50 rounded-lg min-w-[280px]">
          <Search size={15} className="text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari situs, era kolonial, candi, atau desa..." className="bg-transparent outline-none font-mono text-xs w-full placeholder:text-slate-400" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[10px] text-slate-500 uppercase">Status:</span>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="bg-white border border-slate-200 px-2.5 py-1.5 font-mono text-xs font-semibold rounded-lg outline-none focus:border-primary-500 transition-all">
              <option value="Semua">Semua Status</option>
              <option value="Ditetapkan">Ditetapkan (SK)</option>
              <option value="Diduga (ODCB)">Diduga (ODCB)</option>
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[10px] text-slate-500 uppercase">Jenis:</span>
            <select value={selectedJenis} onChange={(e) => setSelectedJenis(e.target.value)} className="bg-white border border-slate-200 px-2.5 py-1.5 font-mono text-xs font-semibold rounded-lg outline-none focus:border-primary-500 transition-all">
              <option value="Semua">Semua Jenis</option>
              <option value="Bangunan">Bangunan</option>
              <option value="Situs">Situs & Kawasan</option>
              <option value="Benda">Benda & Arca</option>
              <option value="Struktur">Struktur</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cagar Budaya Cards */}
      <Panel>
        <SectionTitle
          index="02"
          title="Katalog Cagar Budaya & ODCB Banjarnegara"
          subtitle="Klik pada kartu untuk membuka detail registrasi secara interaktif."
          rightElement={<span className="font-mono text-[10px] text-slate-500 font-semibold">{filteredList.length} Item</span>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((cb) => {
            const isTetap = cb.status === "Ditetapkan";
            return (
              <div key={cb.id} onClick={() => setSelectedItemModal(cb)} className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-3 flex flex-col justify-between hover:shadow-md hover:border-slate-300 cursor-pointer transition-all">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <span className={`font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                      isTetap ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-amber-100 text-amber-800 border-amber-300"
                    }`}>
                      {isTetap ? "DITETAPKAN SK" : "DIDUGA (ODCB)"}
                    </span>
                    <span className="font-mono text-[9px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200 px-1.5 py-0.5 rounded-full">
                      {cb.jenis}
                    </span>
                  </div>
                  <h3 className="font-sans text-base font-bold text-slate-900 leading-tight">{cb.nama}</h3>
                  <div className="font-mono text-[11px] text-slate-500 space-y-0.5">
                    <div><b className="text-slate-700">{cb.desa}</b>, Kec. <b className="text-slate-700">{cb.kecamatan}</b></div>
                    <div>Era: <b className="text-slate-700">{cb.era}</b></div>
                    {cb.skPenetapan && <div className="text-[10px] text-primary-700 font-semibold">🏛️ {cb.skPenetapan}</div>}
                  </div>
                  <p className="text-xs font-sans text-slate-600 leading-relaxed line-clamp-3">{cb.deskripsi}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-slate-500">Kondisi: <b className="text-slate-700">{cb.kondisi}</b></span>
                  <button onClick={(e) => { e.stopPropagation(); setSelectedItemModal(cb); }} className="bg-slate-800 text-white px-3 py-1 font-semibold uppercase rounded-lg hover:bg-slate-700 transition cursor-pointer">
                    Detail &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* OPK Section */}
      <Panel>
        <SectionTitle
          index="03"
          title="Objek Pemajuan Kebudayaan (OPK) & WBTB"
          subtitle="Warisan budaya takbenda, seni tradisi, dan kuliner khas Banjarnegara."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {opkBudayaList.map((opk, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-1.5 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold uppercase bg-primary-600 text-white px-1.5 py-0.5 rounded-full">{opk.kategoriOPK}</span>
                <span className="text-[9px] font-semibold text-emerald-700">{opk.statusWBTB}</span>
              </div>
              <h4 className="font-sans font-bold text-sm text-slate-900">{opk.nama}</h4>
              <p className="text-[11px] font-sans text-slate-500 leading-relaxed">{opk.deskripsi}</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* External Link Info Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="space-y-1">
          <span className="font-semibold uppercase text-slate-800 block">Informasi & Portal Resmi Kebudayaan Kabupaten Banjarnegara</span>
          <p className="text-[11px] text-slate-500 font-sans">Untuk pendaftaran cagar budaya baru, verifikasi data, atau pengajuan kegiatan seni budaya, kunjungi portal resmi DIKDAYA.</p>
        </div>
        <a href={portalDikdayaUrl} target="_blank" rel="noreferrer" className="bg-slate-800 text-white border border-slate-700 font-semibold uppercase text-[11px] px-4 py-2 flex items-center gap-2 rounded-lg hover:bg-slate-700 transition shrink-0">
          Kunjungi DIKDAYA <ExternalLink size={14} />
        </a>
      </div>

      {/* Detail Modal */}
      {selectedItemModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-5 animate-fade-in font-mono">
          <div className="bg-white rounded-xl max-w-2xl w-full shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-700 shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                    selectedItemModal.status === "Ditetapkan" ? "bg-emerald-600 text-white border-white" : "bg-amber-600 text-white border-white"
                  }`}>
                    {selectedItemModal.status === "Ditetapkan" ? "Ditetapkan Cagar Budaya" : "Diduga Cagar Budaya (ODCB)"}
                  </span>
                  <span className="text-[10px] text-primary-300 font-bold uppercase">Klasifikasi: {selectedItemModal.jenis}</span>
                </div>
                <h3 className="font-sans text-lg font-bold text-white mt-1">{selectedItemModal.nama}</h3>
              </div>
              <button onClick={() => setSelectedItemModal(null)} className="text-white hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition">
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs overflow-y-auto font-mono">
              <div className="border border-slate-200 p-3.5 bg-slate-50 rounded-lg space-y-2">
                <h4 className="font-semibold text-[11px] uppercase border-b border-slate-200 pb-1 text-slate-800">01. Data Umum & Legalitas</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div>No. Registrasi: <b className="text-slate-900">{selectedItemModal.noRegistrasi || "—"}</b></div>
                  <div>SK Penetapan: <b className="text-slate-900">{selectedItemModal.skPenetapan || "Proses Kajian TACB"}</b></div>
                  <div>Tahun Penetapan: <b className="text-slate-900">{selectedItemModal.tahunPenetapan || "—"}</b></div>
                  <div>Periodesasi / Era: <b className="text-slate-900">{selectedItemModal.era}</b></div>
                  <div>Pemilik / Penguasa: <b className="text-slate-900">{selectedItemModal.pemilik}</b></div>
                  <div>Juru Pelihara: <b className="text-slate-900">{selectedItemModal.juruPelihara}</b></div>
                </div>
              </div>

              <div className="border border-slate-200 p-3.5 bg-white rounded-lg space-y-2">
                <h4 className="font-semibold text-[11px] uppercase border-b border-slate-200 pb-1 text-slate-800 flex items-center gap-1.5">
                  <MapPin size={14} className="text-primary-600" /> 02. Lokasi
                </h4>
                <div className="space-y-1 text-[11px]">
                  <div>Alamat: <b className="text-slate-900">{selectedItemModal.alamatLengkap}</b></div>
                  <div>Desa: <b className="text-slate-900">{selectedItemModal.desa}</b></div>
                  <div>Kecamatan: <b className="text-slate-900">Kec. {selectedItemModal.kecamatan}</b></div>
                  <div>Koordinat: <b className="text-slate-900">{selectedItemModal.lat}, {selectedItemModal.lng}</b></div>
                </div>
              </div>

              <div className="border border-slate-200 p-3.5 bg-slate-50 rounded-lg space-y-2">
                <h4 className="font-semibold text-[11px] uppercase border-b border-slate-200 pb-1 text-slate-800">03. Spesifikasi Fisik</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-center">
                  {[
                    { label: "Panjang", val: selectedItemModal.ukuranObjek?.panjang },
                    { label: "Lebar", val: selectedItemModal.ukuranObjek?.lebar },
                    { label: "Tinggi", val: selectedItemModal.ukuranObjek?.tinggi },
                    { label: "Diameter", val: selectedItemModal.ukuranObjek?.diameter },
                  ].map((d) => (
                    <div key={d.label} className="bg-white p-2 border border-slate-200 rounded-lg">
                      <span className="text-[9px] text-slate-500 uppercase block">{d.label}</span>
                      <b className="text-slate-900">{d.val || "—"}</b>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] pt-1">Bahan / Material: <b className="text-slate-900">{selectedItemModal.bahanMaterial || "—"}</b></div>
              </div>

              {selectedItemModal.batasBatas && (
                <div className="border border-slate-200 p-3.5 bg-white rounded-lg space-y-2">
                  <h4 className="font-semibold text-[11px] uppercase border-b border-slate-200 pb-1 text-slate-800">04. Batas-Batas Lingkungan</h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>Utara: <b className="text-slate-900">{selectedItemModal.batasBatas.utara}</b></div>
                    <div>Selatan: <b className="text-slate-900">{selectedItemModal.batasBatas.selatan}</b></div>
                    <div>Timur: <b className="text-slate-900">{selectedItemModal.batasBatas.timur}</b></div>
                    <div>Barat: <b className="text-slate-900">{selectedItemModal.batasBatas.barat}</b></div>
                  </div>
                </div>
              )}

              <div className="border border-slate-200 p-3.5 bg-slate-50 rounded-lg space-y-2">
                <h4 className="font-semibold text-[11px] uppercase border-b border-slate-200 pb-1 text-slate-800">05. Kondisi & Deskripsi Sejarah</h4>
                <div className="text-[11px] text-emerald-800 font-semibold bg-white p-2 border border-slate-200 rounded-lg">
                  Kondisi Saat Ini: <b>{selectedItemModal.kondisi}</b>
                </div>
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Narasi Sejarah & Kajian Arkeologis:</span>
                  <p className="font-sans text-xs text-slate-700 leading-relaxed">{selectedItemModal.deskripsi}</p>
                </div>
                {selectedItemModal.nilaiSejarah && (
                  <div className="text-[11px] text-primary-900 bg-primary-50 p-2 border border-primary-200 rounded-lg font-sans">
                    Nilai Penting Sejarah: {selectedItemModal.nilaiSejarah}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-50 border-t border-slate-200 p-3 flex justify-between items-center shrink-0">
              <span className="text-[10px] text-slate-500">Data Cagar Budaya Kabupaten Banjarnegara</span>
              <button onClick={() => setSelectedItemModal(null)} className="bg-slate-800 text-white px-4 py-1.5 font-semibold rounded-lg text-xs hover:bg-slate-700 transition">
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
