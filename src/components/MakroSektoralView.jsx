import { useMemo } from "react";
import {
  Users,
  Globe2,
  DollarSign,
  TrendingUp,
  Hotel as HotelIcon,
  UtensilsCrossed,
  Activity,
  GraduationCap,
  Percent,
  Landmark,
  Info,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { Panel, SectionTitle, StatCard, ChartTooltip } from "./ui";
import { formatNumber, formatRupiah, formatShortRupiah } from "../utils/analytics";
import { kunjunganBulanan2024, kunjunganTahunanKabupaten } from "../data/disparbudMasterData";
import {
  retribusiPariwisata,
  bpsMakro,
  tarifPenginapanTerbaru,
  rumahMakan2024,
  catatanKualitasPhaseB,
} from "../data/phaseBData";

const rupiahAxis = (v) => formatShortRupiah(v);

export function MakroSektoralView() {
  // ---- Domestik vs Mancanegara ----
  const kab2024 = useMemo(
    () => kunjunganTahunanKabupaten.find((x) => x.tahun === 2024) || { domestik: 0, mancanegara: 0, jumlah: 0 },
    []
  );
  const asingPct = kab2024.jumlah > 0 ? ((kab2024.mancanegara || 0) / kab2024.jumlah) * 100 : 0;
  const tahunanDA = useMemo(
    () => kunjunganTahunanKabupaten.map((x) => ({ tahun: x.tahun, domestik: x.domestik, mancanegara: x.mancanegara || 0 })),
    []
  );

  // ---- Retribusi ----
  const ret2024 = useMemo(() => retribusiPariwisata.find((r) => r.tahun === 2024) || {}, []);
  const retChart = useMemo(
    () => retribusiPariwisata.map((r) => ({ tahun: r.tahun, target: r.target, realisasi: r.realisasi, persen: r.persen })),
    []
  );

  // ---- BPS makro 2024 ----
  const miskin2024 = useMemo(() => bpsMakro.kemiskinan.find((x) => x.tahun === 2024) || {}, []);
  const tumbuh2024 = useMemo(() => bpsMakro.pertumbuhan.find((x) => x.tahun === 2024) || {}, []);
  const ipm2024 = useMemo(() => bpsMakro.ipm.find((x) => x.tahun === 2024) || {}, []);
  const pdrb2024 = useMemo(() => bpsMakro.pdrbAkomodasi.find((x) => x.tahun === 2024) || {}, []);
  const peers = useMemo(
    () =>
      bpsMakro.pertumbuhan.map((p) => {
        const i = bpsMakro.ipm.find((x) => x.tahun === p.tahun) || {};
        const k = bpsMakro.kemiskinan.find((x) => x.tahun === p.tahun) || {};
        return {
          tahun: p.tahun,
          tumbuhBna: p.banjarnegara,
          tumbuhJateng: p.jawaTengah,
          tumbuhNasional: p.nasional,
          ipmBna: i.banjarnegara,
          ipmJateng: i.jawaTengah,
          ipmNasional: i.nasional,
          miskinPct: k.persen,
          miskinJumlah: k.jumlahRibuan,
        };
      }),
    []
  );
  const pdrbChart = useMemo(
    () => bpsMakro.pdrbAkomodasi.map((x) => ({ tahun: x.tahun, rpMiliar: Math.round((x.rpJuta / 1000) * 10) / 10, kontribusi: x.persenKontribusi })),
    []
  );

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Banner */}
      <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white bg-slate-800 px-2.5 py-1 rounded-full">
            MAKRO & SEKTORAL
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary-100 text-primary-800 border border-primary-200">
            Data Riil BPS · BPPKAD · DISPARBUD
          </span>
        </div>
        <h2 className="font-sans text-xl sm:text-2xl font-bold leading-snug text-slate-900">
          Indikator Makro Daerah & Sektoral Pariwisata
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
          Komposisi wisatawan, retribusi pariwisata (target vs realisasi), indikator makro BPS (kemiskinan, pertumbuhan
          ekonomi, IPM, PDRB akomodasi), tarif penginapan, dan sebaran rumah makan per kecamatan. Seluruh angka
          dinormalisasi dan diaudit dari master data resmi.
        </p>
      </section>

      {/* ============ 1. DOMESTIK VS MANCANEGARA ============ */}
      <Panel>
        <SectionTitle
          index="01"
          title="Komposisi Wisatawan Domestik vs Mancanegara"
          subtitle="Sumber: DISPARBUD 7.2.1 (2024). Wisatawan mancanegara mulai terdata terpisah sejak 2020."
          rightElement={
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Realisasi 2024
            </span>
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <StatCard label="Wisatawan Domestik 2024" value={formatNumber(kab2024.domestik)} sub="kunjungan wisatawan nusantara" accent="blue" icon={Users} />
          <StatCard label="Wisatawan Mancanegara 2024" value={formatNumber(kab2024.mancanegara || 0)} sub="kunjungan wisatawan asing" accent="emerald" icon={Globe2} />
          <StatCard label="Porsi Mancanegara" value={asingPct.toFixed(2) + "%"} sub="dari total kunjungan 2024" accent="amber" icon={Percent} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-mono text-[11px] font-bold uppercase text-slate-600 mb-2">Bulanan 2024 (domestik vs mancanegara)</h4>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={kunjunganBulanan2024} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 9, fontFamily: "Inter" }} interval={0} angle={-40} textAnchor="end" height={50} />
                  <YAxis tick={{ fontSize: 10, fontFamily: "Inter" }} tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}rb` : v)} />
                  <Tooltip content={<ChartTooltip formatter={(v) => formatNumber(v)} />} />
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: "Inter" }} />
                  <Bar dataKey="domestik" name="Domestik" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="mancanegara" name="Mancanegara" stackId="a" fill="#059669" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[11px] font-bold uppercase text-slate-600 mb-2">Tren tahunan 2016-2024</h4>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={tahunanDA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="tahun" tick={{ fontSize: 10, fontFamily: "Inter" }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10, fontFamily: "Inter" }} tickFormatter={(v) => (v >= 1e6 ? `${(v / 1e6).toFixed(1)}jt` : v >= 1e3 ? `${(v / 1e3).toFixed(0)}rb` : v)} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fontFamily: "Inter" }} tickFormatter={(v) => formatNumber(v)} />
                  <Tooltip content={<ChartTooltip formatter={(v) => formatNumber(v)} />} />
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: "Inter" }} />
                  <Bar yAxisId="left" dataKey="domestik" name="Domestik" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="mancanegara" name="Mancanegara" stroke="#059669" strokeWidth={2.5} dot={{ r: 3 }} connectNulls />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Panel>

      {/* ============ 2. RETRIBUSI PARIWISATA (BPPKAD) ============ */}
      <Panel>
        <SectionTitle
          index="02"
          title="Retribusi Pariwisata: Target vs Realisasi"
          subtitle="Sumber: BPPKAD. 'Ret. Tempat Rekreasi dan O R' (2018-2023); 2024 = 'Retribusi Pelayanan Tempat Rekreasi, Pariwisata, dan Olahraga'."
          rightElement={
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              BPPKAD
            </span>
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <StatCard label="Target Retribusi 2024" value={formatShortRupiah(ret2024.target)} sub="rencana penerimaan retribusi wisata" accent="dark" icon={Landmark} />
          <StatCard label="Realisasi Retribusi 2024" value={formatShortRupiah(ret2024.realisasi)} sub="penerimaan terealisasi" accent="emerald" icon={DollarSign} />
          <StatCard label="Capaian 2024" value={(ret2024.persen || 0).toFixed(2) + "%"} sub="realisasi terhadap target" accent="amber" icon={TrendingUp} />
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={retChart} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="tahun" tick={{ fontSize: 11, fontFamily: "Inter" }} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fontFamily: "Inter" }} tickFormatter={rupiahAxis} width={70} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fontFamily: "Inter" }} tickFormatter={(v) => `${v}%`} domain={[0, 160]} />
              <Tooltip content={<ChartTooltip formatter={(v, n) => (n === "Capaian" ? `${v}%` : formatRupiah(v))} />} />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: "Inter" }} />
              <Bar yAxisId="left" dataKey="target" name="Target" fill="#94a3b8" radius={[3, 3, 0, 0]} />
              <Bar yAxisId="left" dataKey="realisasi" name="Realisasi" fill="#059669" radius={[3, 3, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="persen" name="Capaian" stroke="#d97706" strokeWidth={2.5} dot={{ r: 4, fill: "#d97706", strokeWidth: 2, stroke: "#fff" }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      {/* ============ 3. BPS MAKRO ============ */}
      <Panel>
        <SectionTitle
          index="03"
          title="Indikator Makro Daerah (BPS Banjarnegara)"
          subtitle="Kemiskinan, laju pertumbuhan ekonomi, Indeks Pembangunan Manusia (IPM), dan PDRB sektor akomodasi & makan-minum 2018-2024."
          rightElement={
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary-100 text-primary-800 border border-primary-200">
              BPS 2024
            </span>
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <StatCard label="Penduduk Miskin 2024" value={(miskin2024.persen || 0).toFixed(2) + "%"} sub={`${(miskin2024.jumlahRibuan || 0).toFixed(2)} ribu jiwa`} accent="dark" icon={Percent} />
          <StatCard label="Pertumbuhan Ekonomi 2024" value={(tumbuh2024.banjarnegara || 0).toFixed(2) + "%"} sub={`nasional ${(tumbuh2024.nasional || 0).toFixed(2)}%`} accent="emerald" icon={TrendingUp} />
          <StatCard label="IPM 2024" value={(ipm2024.banjarnegara || 0).toFixed(2)} sub={`nasional ${(ipm2024.nasional || 0).toFixed(2)}`} accent="blue" icon={GraduationCap} />
          <StatCard label="PDRB Akomodasi & Makan-Minum" value={formatShortRupiah((pdrb2024.rpJuta || 0) * 1e6)} sub={`${(pdrb2024.persenKontribusi || 0).toFixed(2)}% dari PDRB`} accent="amber" icon={Activity} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-mono text-[11px] font-bold uppercase text-slate-600 mb-2">Laju pertumbuhan ekonomi (%)</h4>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={peers} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="tahun" tick={{ fontSize: 10, fontFamily: "Inter" }} />
                  <YAxis tick={{ fontSize: 10, fontFamily: "Inter" }} domain={[0, "auto"]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} />
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: "Inter" }} />
                  <Line type="monotone" dataKey="tumbuhBna" name="Banjarnegara" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="tumbuhJateng" name="Jawa Tengah" stroke="#64748b" strokeWidth={2} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="tumbuhNasional" name="Nasional" stroke="#d97706" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[11px] font-bold uppercase text-slate-600 mb-2">Indeks Pembangunan Manusia (IPM)</h4>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={peers} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="tahun" tick={{ fontSize: 10, fontFamily: "Inter" }} />
                  <YAxis tick={{ fontSize: 10, fontFamily: "Inter" }} domain={[60, 80]} />
                  <Tooltip content={<ChartTooltip formatter={(v) => formatNumber(v)} />} />
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: "Inter" }} />
                  <Line type="monotone" dataKey="ipmBna" name="Banjarnegara" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="ipmJateng" name="Jawa Tengah" stroke="#64748b" strokeWidth={2} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="ipmNasional" name="Nasional" stroke="#d97706" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[11px] font-bold uppercase text-slate-600 mb-2">Penduduk miskin (% & ribu jiwa)</h4>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={peers} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="tahun" tick={{ fontSize: 10, fontFamily: "Inter" }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10, fontFamily: "Inter" }} tickFormatter={(v) => `${v}%`} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fontFamily: "Inter" }} />
                  <Tooltip content={<ChartTooltip formatter={(v, n) => (n === "Persentase" ? `${v}%` : `${v} ribu`)} />} />
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: "Inter" }} />
                  <Bar yAxisId="right" dataKey="miskinJumlah" name="Jumlah (ribu)" fill="#cbd5e1" radius={[3, 3, 0, 0]} />
                  <Line yAxisId="left" type="monotone" dataKey="miskinPct" name="Persentase" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[11px] font-bold uppercase text-slate-600 mb-2">PDRB akomodasi & makan-minum (miliar Rp & kontribusi %)</h4>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={pdrbChart} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="tahun" tick={{ fontSize: 10, fontFamily: "Inter" }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10, fontFamily: "Inter" }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fontFamily: "Inter" }} tickFormatter={(v) => `${v}%`} domain={[0, 3]} />
                  <Tooltip content={<ChartTooltip formatter={(v, n) => (n === "Kontribusi" ? `${v}%` : `Rp ${v} M`)} />} />
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: "Inter" }} />
                  <Bar yAxisId="left" dataKey="rpMiliar" name="Nilai (miliar Rp)" fill="#0ea5e9" radius={[3, 3, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="kontribusi" name="Kontribusi" stroke="#d97706" strokeWidth={2.5} dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Panel>

      {/* ============ 4. TARIF PENGINAPAN ============ */}
      <Panel>
        <SectionTitle
          index="04"
          title="Tarif Penginapan (Hotel/Losmen)"
          subtitle="Sumber: DISPARBUD. Tarif terbaru per hotel (tahun terakhir terdata). Tahun 2020 kosong di sumber; '–' = tidak terdata."
          rightElement={
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary-100 text-primary-800 border border-primary-200">
              DISPARBUD
            </span>
          }
        />
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full text-xs text-left font-mono">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-semibold">
              <tr>
                <th className="py-3 px-3">Hotel / Losmen</th>
                <th className="py-3 px-2 text-center">Tahun Data</th>
                <th className="py-3 px-2 text-right">Single (min–maks)</th>
                <th className="py-3 px-2 text-right">Double (min–maks)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tarifPenginapanTerbaru.map((t) => {
                const single = t.minSingle != null || t.maxSingle != null ? `${t.minSingle != null ? formatNumber(t.minSingle) : "–"} – ${t.maxSingle != null ? formatNumber(t.maxSingle) : "–"}` : "–";
                const double_ = t.minDouble != null || t.maxDouble != null ? `${t.minDouble != null ? formatNumber(t.minDouble) : "–"} – ${t.maxDouble != null ? formatNumber(t.maxDouble) : "–"}` : "–";
                const anomaly = t.minDouble != null && t.maxDouble != null && t.minDouble > t.maxDouble;
                return (
                  <tr key={t.hotel} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900 font-sans">
                      {t.hotel}
                      {anomaly && <span className="ml-2 text-[9px] font-bold uppercase text-amber-700 bg-amber-100 border border-amber-300 px-1.5 py-0.5 rounded-full">anomali sumber</span>}
                    </td>
                    <td className="py-2.5 px-2 text-center text-slate-500">{t.tahun || "–"}</td>
                    <td className="py-2.5 px-2 text-right text-slate-700">{single}</td>
                    <td className="py-2.5 px-2 text-right text-slate-700">{double_}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* ============ 5. RUMAH MAKAN PER KECAMATAN ============ */}
      <Panel>
        <SectionTitle
          index="05"
          title="Rumah Makan / Restoran per Kecamatan (2024)"
          subtitle="Sumber: DISPARBUD. Jumlah rumah makan & restoran terdata di 20 kecamatan, tahun 2024."
          rightElement={
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary-100 text-primary-800 border border-primary-200">
              20 Kecamatan
            </span>
          }
        />
        <div className="h-[460px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rumahMakan2024} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fontFamily: "Inter" }} />
              <YAxis type="category" dataKey="kecamatan" tick={{ fontSize: 10, fontFamily: "Inter" }} width={110} />
              <Tooltip content={<ChartTooltip formatter={(v) => `${formatNumber(v)} unit`} />} />
              <Bar dataKey="jumlah" name="Rumah Makan/Restoran" radius={[0, 4, 4, 0]}>
                {rumahMakan2024.map((entry, i) => (
                  <Cell key={i} fill={i === 0 ? "#059669" : i < 3 ? "#3b82f6" : "#64748b"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      {/* ============ CATATAN KUALITAS ============ */}
      <Panel>
        <SectionTitle index="06" title="Catatan Kualitas Data" subtitle="Audit normalisasi dan keterbatasan data Fase B." />
        <div className="space-y-1.5">
          {catatanKualitasPhaseB.map((c, i) => (
            <div key={i} className="flex items-start gap-2 text-[11px] text-slate-600 leading-relaxed">
              <Info size={13} className="text-slate-400 shrink-0 mt-0.5" />
              <span>{c}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export default MakroSektoralView;
