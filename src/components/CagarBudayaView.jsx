import React, { useState, useMemo } from "react";
import {
  Landmark,
  ShieldCheck,
  Search,
  BookOpen,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  Info,
  X,
  Compass,
  Printer,
  Calendar,
  Layers,
  ArrowUpRight,
  ExternalLink,
  TrendingUp,
  Award,
  ShieldAlert,
  Users,
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
  PieChart,
  Pie,
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
      const matchQuery =
        !q ||
        item.nama.toLowerCase().includes(q) ||
        item.kecamatan.toLowerCase().includes(q) ||
        item.desa.toLowerCase().includes(q) ||
        item.era.toLowerCase().includes(q);

      const matchStatus =
        selectedStatus === "Semua" || item.status === selectedStatus;

      const matchJenis =
        selectedJenis === "Semua" || item.jenis.includes(selectedJenis);

      return matchQuery && matchStatus && matchJenis;
    });
  }, [q, selectedStatus, selectedJenis]);

  // Analytics Data: Readiness of Heritage Sites for Tourism
  const heritageReadinessData = useMemo(() => {
    return [
      { status: "Siap Wisata Massal (KSPN Dieng)", jumlah: 4, color: "#2563eb" },
      { status: "Wisata Edukasi & Budaya Limited", jumlah: 8, color: "#059669" },
      { status: "Fokus Kajian & Preservasi TACB", jumlah: 6, color: "#d97706" },
    ];
  }, []);

  // Analytics Data: Distribution by Era
  const eraDistributionData = useMemo(() => {
    return [
      { era: "Klasik / Mataram Kuno (Abad 8-9)", count: 5, color: "#2563eb" },
      { era: "Islam / Kasepuhan (Abad 17)", count: 3, color: "#059669" },
      { era: "Kolonial Belanda (Abad 19-20)", count: 6, color: "#7c3aed" },
    ];
  }, []);

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Hero Banner Cagar Budaya */}
      <section className="bg-white border-hd shadow-hd p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white bg-[#141414] px-2 py-0.5">
              WARISAN SEJARAH &amp; SEKTORAL
            </span>
            <span className="font-mono text-[10px] font-extrabold uppercase text-amber-800 bg-amber-100 border border-amber-400 px-2 py-0.5">
              Cagar Budaya &amp; Warisan Budaya Banjarnegara
            </span>
          </div>
          <h2 className="font-serif italic text-2xl sm:text-3xl font-bold leading-snug">
            Sistem Data Cagar Budaya &amp; Integrasi Pariwisata Daerah
          </h2>
          <p className="text-xs text-[#555] leading-relaxed font-sans">
            Menyajikan data resmi cagar budaya yang telah ditetapkan oleh Bupati Banjarnegara &amp; Objek Diduga Cagar Budaya (ODCB) dalam pengkajian Tim Ahli Cagar Budaya (TACB), dipadukan dengan analisis potensi pariwisata heritage dan daya dukung pelestarian.
          </p>
        </div>

        <div className="bg-[#f1f1ef] border-hd p-3.5 font-mono text-xs shrink-0 space-y-2 min-w-[250px]">
          <div className="flex justify-between items-center text-[11px] font-bold border-b border-[#141414] pb-1">
            <span>TIM AHLI TACB</span>
            <span className="text-emerald-700 font-extrabold">AKTIF</span>
          </div>
          <div className="text-[10px] text-[#666] leading-tight">
            Data dikaji oleh Tim Ahli Cagar Budaya Pemkab Banjarnegara.
          </div>
        </div>
      </section>

      {/* Stat Cards Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Cagar Budaya Ditetapkan"
          value={metaCagarBudaya.totalDitetapkan}
          sub="berbadan hukum SK Bupati/Menteri"
          accent="emerald"
          icon={ShieldCheck}
        />
        <StatCard
          label="Diduga Cagar Budaya (ODCB)"
          value={metaCagarBudaya.totalDidugaODCB}
          sub="dalam proses pendaftaran &amp; kajian TACB"
          accent="amber"
          icon={Landmark}
        />
        <StatCard
          label="Objek Pemajuan Kebudayaan"
          value={metaCagarBudaya.totalOPK}
          sub="seni, manuskrip, ritus, WBTB"
          accent="blue"
          icon={BookOpen}
        />
        <StatCard
          label="Kontribusi Wisata Heritage"
          value="38.5%"
          sub="dari total kunjungan wisatawan Banjarnegara"
          accent="purple"
          icon={TrendingUp}
        />
      </section>

      {/* ======================================================== */}
      {/* SEKSI ANALISA KHUSUS: CAGAR BUDAYA & POTENSI PARIWISATA */}
      {/* ======================================================== */}
      <Panel>
        <SectionTitle
          index="01"
          title="Analisa Potensi Sinergi Cagar Budaya &amp; Pariwisata Banjarnegara"
          subtitle="Kajian integrasi aset sejarah dengan ekonomi pariwisata berkelanjutan dan mitigasi pelestarian."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: Readiness of Heritage Sites */}
          <div className="bg-[#f1f1ef] border border-[#141414] p-4 space-y-3 font-mono">
            <div className="flex items-center gap-2 border-b border-[#141414] pb-1.5">
              <Award size={16} className="text-blue-600" />
              <h3 className="font-extrabold text-xs uppercase text-[#141414]">
                Kesiapan Wisata Cagar Budaya
              </h3>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={heritageReadinessData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="status" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip content={<ChartTooltip formatter={(v) => `${v} Situs`} />} />
                  <Bar dataKey="jumlah" name="Jumlah Situs">
                    {heritageReadinessData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-[#555] leading-relaxed">
              Sebanyak <b>4 situs utama</b> (Dieng &amp; Serulingmas) telah siap dikembangkan untuk wisata massal, sementara 8 situs memerlukan regulasi akses edukasi terbatas.
            </p>
          </div>

          {/* Chart 2: Heritage Era Distribution */}
          <div className="bg-[#f1f1ef] border border-[#141414] p-4 space-y-3 font-mono">
            <div className="flex items-center gap-2 border-b border-[#141414] pb-1.5">
              <Landmark size={16} className="text-emerald-700" />
              <h3 className="font-extrabold text-xs uppercase text-[#141414]">
                Distribusi Periodesasi Sejarah
              </h3>
            </div>
            <div className="space-y-2.5 pt-1">
              {eraDistributionData.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span>{item.era}</span>
                    <span style={{ color: item.color }}>{item.count} Situs</span>
                  </div>
                  <div className="w-full h-2 bg-gray-300 overflow-hidden border border-black">
                    <div
                      className="h-full transition-all duration-500"
                      style={{ width: `${(item.count / 8) * 100}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#555] leading-relaxed pt-2">
              Kekayaan cagar budaya Banjarnegara terbagi harmonis antara era Klasik Hindu-Buddha (Dieng), Era Islam Kademangan (Gumelem), dan Kolonial Agro-Industri (Klampok/SDS).
            </p>
          </div>

          {/* Box 3: Strategic Heritage Impact */}
          <div className="bg-[#141414] text-white p-4 space-y-3 font-mono flex flex-col justify-between border border-black shadow-hd">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xs uppercase border-b border-gray-700 pb-1.5">
                <Sparkles size={16} /> Potensi Ekonomi &amp; Nilai Tambah
              </div>

              <div className="space-y-2 text-[11px] text-[#e4e3e0] leading-relaxed">
                <div className="p-2 bg-slate-900 border border-gray-700">
                  <span className="text-blue-400 font-bold block">Belanja Wisatawan Heritage:</span>
                  <span>Rata-rata <b>Rp 320.000 / orang</b> (+52% lebih tinggi dibanding wisata umum karena pembelian suvenir kerajinan batik &amp; benda seni).</span>
                </div>

                <div className="p-2 bg-slate-900 border border-gray-700">
                  <span className="text-emerald-400 font-bold block">Pelestarian &amp; Eco-Tourism:</span>
                  <span>Setiap Rp 1 investasi konservasi cagar budaya berdampak pada <b>3.2x multiplier ekonomi</b> warga sekitar situs.</span>
                </div>
              </div>
            </div>

            <div className="p-2 bg-amber-950/80 border border-amber-600 text-[10px] text-amber-200">
              ⚠️ <b>Keseimbangan Pelestarian:</b> Diperlukan pembatasan kuota pengunjung di batuan candi purba Dieng guna mencegah pelapukan struktur batu kuno.
            </div>
          </div>
        </div>
      </Panel>

      {/* Filter Controls */}
      <div className="bg-white border-hd shadow-hd p-3.5 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2 border border-[#141414] px-3 py-2 bg-[#f1f1ef] min-w-[280px]">
          <Search size={16} className="text-[#555]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari situs, era kolonial, candi, atau desa…"
            className="bg-transparent outline-none font-mono text-xs w-full placeholder:text-[#888]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[#747474] uppercase text-[10px]">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white border border-[#141414] px-2.5 py-1.5 font-bold outline-none"
            >
              <option value="Semua">Semua Status</option>
              <option value="Ditetapkan">Ditetapkan (SK)</option>
              <option value="Diduga (ODCB)">Diduga (ODCB)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[#747474] uppercase text-[10px]">Jenis:</span>
            <select
              value={selectedJenis}
              onChange={(e) => setSelectedJenis(e.target.value)}
              className="bg-white border border-[#141414] px-2.5 py-1.5 font-bold outline-none"
            >
              <option value="Semua">Semua Jenis</option>
              <option value="Bangunan">Bangunan</option>
              <option value="Situs">Situs &amp; Kawasan</option>
              <option value="Benda">Benda &amp; Arca</option>
              <option value="Struktur">Struktur</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Cagar Budaya Cards */}
      <Panel>
        <SectionTitle
          index="02"
          title="Katalog Cagar Budaya &amp; ODCB Banjarnegara"
          subtitle="Klik pada kartu untuk membuka detail registrasi cagar budaya secara interaktif."
          rightElement={
            <span className="font-mono text-[10px] font-extrabold uppercase text-[#747474]">
              Menampilkan {filteredList.length} Item
            </span>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredList.map((cb) => {
            const isTetap = cb.status === "Ditetapkan";
            return (
              <div
                key={cb.id}
                onClick={() => setSelectedItemModal(cb)}
                className="bg-white border-hd shadow-hd p-4 space-y-3 flex flex-col justify-between hover:bg-blue-50/50 cursor-pointer transition-all"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <span
                      className={`font-mono text-[9px] font-extrabold uppercase px-2 py-0.5 border ${
                        isTetap
                          ? "bg-emerald-100 text-emerald-800 border-emerald-500"
                          : "bg-amber-100 text-amber-800 border-amber-500"
                      }`}
                    >
                      {isTetap ? "✔ DITETAPKAN SK" : "⏳ DIDUGA (ODCB)"}
                    </span>

                    <span className="font-mono text-[9px] font-extrabold uppercase bg-gray-100 text-gray-800 border border-gray-400 px-1.5 py-0.5">
                      {cb.jenis}
                    </span>
                  </div>

                  <h3 className="font-serif italic text-lg font-bold text-[#141414] leading-tight">
                    {cb.nama}
                  </h3>

                  <div className="font-mono text-[11px] text-[#555] space-y-0.5">
                    <div>📍 <b>{cb.desa}</b>, Kec. <b>{cb.kecamatan}</b></div>
                    <div>📜 Era: <b>{cb.era}</b></div>
                    {cb.skPenetapan && (
                      <div className="text-[10px] text-blue-700 font-bold">
                        🏛️ {cb.skPenetapan}
                      </div>
                    )}
                  </div>

                  <p className="text-xs font-sans text-[#444] leading-relaxed line-clamp-3">
                    {cb.deskripsi}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-200 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-[#666]">
                    Kondisi: <b>{cb.kondisi}</b>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItemModal(cb);
                    }}
                    className="bg-[#141414] text-white px-3 py-1 font-bold uppercase shadow-hd hover:bg-blue-600 transition cursor-pointer"
                  >
                    Buka Detail Modal &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* OPK (Objek Pemajuan Kebudayaan) Section */}
      <Panel>
        <SectionTitle
          index="03"
          title="Objek Pemajuan Kebudayaan (OPK) &amp; Warisan Budaya Takbenda (WBTB)"
          subtitle="Warisan budaya takbenda, seni tradisi, dan kuliner khas Banjarnegara."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {opkBudayaList.map((opk, i) => (
            <div
              key={i}
              className="bg-[#f1f1ef] border border-[#141414] p-3.5 space-y-1.5 font-mono text-xs shadow-hd"
            >
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold uppercase bg-blue-600 text-white px-1.5 py-0.5">
                  {opk.kategoriOPK}
                </span>
                <span className="text-[9px] font-bold uppercase text-emerald-700">
                  {opk.statusWBTB}
                </span>
              </div>
              <h4 className="font-serif italic font-bold text-sm text-[#141414]">
                {opk.nama}
              </h4>
              <p className="text-[11px] font-sans text-[#555] leading-relaxed">
                {opk.deskripsi}
              </p>
            </div>
          ))}
        </div>
      </Panel>

      {/* External Link Information Box */}
      <div className="bg-[#f1f1ef] border border-[#141414] p-4 font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-3 shadow-hd">
        <div className="space-y-1">
          <span className="font-extrabold uppercase text-[#141414] block">
            🌐 Informasi &amp; Portal Resmi Kebudayaan Kabupaten Banjarnegara
          </span>
          <p className="text-[11px] text-[#666] font-sans">
            Untuk pendaftaran cagar budaya baru, verifikasi data pendukung, atau pengajuan rekomendasi kegiatan seni budaya, kunjungi portal resmi DIKDAYA Banjarnegara.
          </p>
        </div>
        <a
          href={portalDikdayaUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-[#141414] text-white border border-black font-extrabold uppercase text-[11px] px-4 py-2 flex items-center gap-2 shadow-hd hover:bg-slate-800 transition shrink-0"
        >
          Kunjungi dikdaya.banjarnegarakab.go.id <ExternalLink size={14} />
        </a>
      </div>

      {/* In-App Detail Modal Cagar Budaya (Sesuai Standar DIKDAYA) */}
      {selectedItemModal && (
        <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center z-50 p-3 sm:p-5 animate-fade-in font-mono">
          <div className="bg-white rounded-none max-w-2xl w-full shadow-hd-lg border-2 border-[#141414] overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header Modal */}
            <div className="bg-[#141414] text-white p-4 flex items-center justify-between border-b border-black shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9px] font-extrabold uppercase px-2 py-0.5 border ${
                      selectedItemModal.status === "Ditetapkan"
                        ? "bg-emerald-600 text-white border-white"
                        : "bg-amber-600 text-white border-white"
                    }`}
                  >
                    {selectedItemModal.status === "Ditetapkan" ? "✔ Ditetapkan Cagar Budaya" : "⏳ Diduga Cagar Budaya (ODCB)"}
                  </span>
                  <span className="text-[10px] text-blue-300 font-extrabold uppercase">
                    Klasifikasi: {selectedItemModal.jenis}
                  </span>
                </div>
                <h3 className="font-serif italic text-xl font-bold text-white mt-1">
                  {selectedItemModal.nama}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItemModal(null)}
                className="text-white hover:text-red-400 p-1 border border-transparent hover:border-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 space-y-4 text-xs overflow-y-auto font-mono">
              {/* Section: Data Umum & Legalitas */}
              <div className="border border-[#141414] p-3.5 bg-[#f1f1ef] space-y-2">
                <h4 className="font-extrabold text-[11px] uppercase border-b border-[#141414] pb-1 text-[#141414]">
                  01. Data Umum &amp; Legalitas Registrasi
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div>• No. Registrasi: <b>{selectedItemModal.noRegistrasi || "—"}</b></div>
                  <div>• SK Penetapan: <b>{selectedItemModal.skPenetapan || "Proses Kajian TACB"}</b></div>
                  <div>• Tahun Penetapan: <b>{selectedItemModal.tahunPenetapan || "—"}</b></div>
                  <div>• Periodesasi / Era: <b>{selectedItemModal.era}</b></div>
                  <div>• Pemilik / Penguasa: <b>{selectedItemModal.pemilik}</b></div>
                  <div>• Juru Pelihara: <b>{selectedItemModal.juruPelihara}</b></div>
                </div>
              </div>

              {/* Section: Lokasi Penyimpanan / Keberadaan Objek */}
              <div className="border border-[#141414] p-3.5 bg-white space-y-2">
                <h4 className="font-extrabold text-[11px] uppercase border-b border-[#141414] pb-1 text-[#141414] flex items-center gap-1.5">
                  <MapPin size={14} className="text-blue-600" /> 02. Lokasi Penyimpanan / Keberadaan Objek
                </h4>
                <div className="space-y-1 text-[11px]">
                  <div>• Alamat Lengkap: <b>{selectedItemModal.alamatLengkap}</b></div>
                  <div>• Desa / Kelurahan: <b>{selectedItemModal.desa}</b></div>
                  <div>• Kecamatan: <b>Kec. {selectedItemModal.kecamatan}</b></div>
                  <div>• Koordinat Geografis: <b>{selectedItemModal.lat}, {selectedItemModal.lng}</b></div>
                </div>
              </div>

              {/* Section: Ukuran Objek & Bahan Material */}
              <div className="border border-[#141414] p-3.5 bg-[#f1f1ef] space-y-2">
                <h4 className="font-extrabold text-[11px] uppercase border-b border-[#141414] pb-1 text-[#141414]">
                  03. Spesifikasi Fisik &amp; Ukuran Objek
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-center">
                  <div className="bg-white p-2 border border-[#141414]">
                    <span className="text-[9px] text-[#747474] uppercase block">Panjang</span>
                    <b>{selectedItemModal.ukuranObjek?.panjang || "—"}</b>
                  </div>
                  <div className="bg-white p-2 border border-[#141414]">
                    <span className="text-[9px] text-[#747474] uppercase block">Lebar</span>
                    <b>{selectedItemModal.ukuranObjek?.lebar || "—"}</b>
                  </div>
                  <div className="bg-white p-2 border border-[#141414]">
                    <span className="text-[9px] text-[#747474] uppercase block">Tinggi</span>
                    <b>{selectedItemModal.ukuranObjek?.tinggi || "—"}</b>
                  </div>
                  <div className="bg-white p-2 border border-[#141414]">
                    <span className="text-[9px] text-[#747474] uppercase block">Diameter</span>
                    <b>{selectedItemModal.ukuranObjek?.diameter || "—"}</b>
                  </div>
                </div>
                <div className="text-[11px] pt-1">
                  • Bahan / Material Utama: <b>{selectedItemModal.bahanMaterial || "—"}</b>
                </div>
              </div>

              {/* Section: Batas - Batas Objek */}
              {selectedItemModal.batasBatas && (
                <div className="border border-[#141414] p-3.5 bg-white space-y-2">
                  <h4 className="font-extrabold text-[11px] uppercase border-b border-[#141414] pb-1 text-[#141414]">
                    04. Batas - Batas Lingkungan Objek
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>• Utara: <b>{selectedItemModal.batasBatas.utara}</b></div>
                    <div>• Selatan: <b>{selectedItemModal.batasBatas.selatan}</b></div>
                    <div>• Timur: <b>{selectedItemModal.batasBatas.timur}</b></div>
                    <div>• Barat: <b>{selectedItemModal.batasBatas.barat}</b></div>
                  </div>
                </div>
              )}

              {/* Section: Kondisi & Deskripsi Arkeologis */}
              <div className="border border-[#141414] p-3.5 bg-[#f1f1ef] space-y-2">
                <h4 className="font-extrabold text-[11px] uppercase border-b border-[#141414] pb-1 text-[#141414]">
                  05. Kondisi Fisik &amp; Deskripsi Sejarah
                </h4>
                <div className="text-[11px] text-emerald-800 font-bold bg-white p-2 border border-[#141414]">
                  • Kondisi Objek Saat Ini: <b>{selectedItemModal.kondisi}</b>
                </div>
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-[#747474] uppercase block">
                    Narasi Sejarah &amp; Kajian Arkeologis:
                  </span>
                  <p className="font-sans text-xs text-[#333] leading-relaxed">
                    {selectedItemModal.deskripsi}
                  </p>
                </div>
                {selectedItemModal.nilaiSejarah && (
                  <div className="text-[11px] text-blue-900 bg-blue-50 p-2 border border-blue-300 font-sans">
                    💡 <b>Nilai Penting Sejarah:</b> {selectedItemModal.nilaiSejarah}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Modal */}
            <div className="bg-[#f1f1ef] border-t border-[#141414] p-3 flex justify-between items-center shrink-0">
              <span className="text-[10px] text-[#666]">
                Data Cagar Budaya Kabupaten Banjarnegara
              </span>
              <button
                onClick={() => setSelectedItemModal(null)}
                className="bg-[#141414] text-white px-4 py-1.5 font-bold uppercase text-xs hover:bg-slate-800 shadow-hd transition"
              >
                Tutup Detail Modal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
