// Utility Analitik & Kalkulasi Pariwisata Banjarnegara

export function isNum(val) {
  return typeof val === "number" && !isNaN(val);
}

export function formatNumber(val, digits = 0) {
  if (!isNum(val)) return "—";
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(val);
}

export function formatRupiah(val) {
  if (!isNum(val)) return "—";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
}

export function formatShortRupiah(val) {
  if (!isNum(val)) return "—";
  if (val >= 1000000000) {
    return (val / 1000000000).toFixed(2) + " Miliar";
  }
  if (val >= 1000000) {
    return (val / 1000000).toFixed(1) + " Juta";
  }
  if (val >= 1000) {
    return (val / 1000).toFixed(0) + " Rb";
  }
  return val.toString();
}

/**
 * Tourism Potential Score (TPS) - Indeks Komposit Potensi Wisata Desa/Kecamatan
 * Bobot:
 * - Volume Kunjungan & Destinasi: 35%
 * - Retribusi & PAD Pariwisata: 25%
 * - Aksesibilitas Transportasi: 20%
 * - Kesiapan Akomodasi/Homestay: 10%
 * - Digital Marketing & Sinyal: 10%
 */
export function calculateTPS(kecData) {
  if (!kecData) return 0;
  
  const visitorScore = Math.min(100, (kecData.totalPengunjung / 500000) * 100);
  const padScore = Math.min(100, (kecData.padRetribusi / 3000000000) * 100);
  const aksesScore = kecData.aksesibilitasFisik || 70;
  const homestayScore = Math.min(100, (kecData.homestayCapacity / 150) * 100);
  const promoScore = kecData.promosiDigital || 60;

  const composite = (
    visitorScore * 0.35 +
    padScore * 0.25 +
    aksesScore * 0.20 +
    homestayScore * 0.10 +
    promoScore * 0.10
  );

  return Math.round(composite * 10) / 10;
}

/**
 * Evaluasi Risk Level Carrying Capacity
 */
export function getCarryingCapacityInfo(current, max) {
  if (!isNum(current) || !isNum(max) || max === 0) {
    return { ratio: 0, status: "Normal", bg: "bg-gray-100", color: "text-gray-800", border: "border-gray-400" };
  }

  const ratio = Math.round((current / max) * 100);

  if (ratio >= 90) {
    return { ratio, status: "KRITIS / OVER-TOURISM", bg: "bg-red-100", color: "text-red-700", border: "border-red-500" };
  }
  if (ratio >= 75) {
    return { ratio, status: "PADAT / WASPADA", bg: "bg-amber-100", color: "text-amber-800", border: "border-amber-500" };
  }
  if (ratio >= 50) {
    return { ratio, status: "SEDANG / STABIL", bg: "bg-blue-100", color: "text-blue-800", border: "border-blue-500" };
  }
  return { ratio, status: "OPTIMAL / AMAN", bg: "bg-emerald-100", color: "text-emerald-800", border: "border-emerald-500" };
}

/**
 * Simulasi Dampak Economic Multiplier
 * Mengukur estimasi total perputaran uang berdasarkan rata-rata pengeluaran per wisatawan.
 */
export function calculateEconomicMultiplier(totalWisatawan, avgSpending = 275000, multiplierFactor = 2.4) {
  const directSpending = totalWisatawan * avgSpending;
  const totalEconomicImpact = directSpending * multiplierFactor;
  const msmeBenefit = totalEconomicImpact * 0.45; // 45% ke UMKM/Masyarakat lokal

  return {
    directSpending,
    totalEconomicImpact,
    msmeBenefit,
    multiplierFactor,
  };
}

/**
 * Data Komparasi Radar 5 Dimensi untuk Peer Benchmarking Kecamatan
 */
export function prepareTourismRadarData(rowA, rowB) {
  const nameA = rowA?.kecamatan || "Kecamatan A";
  const nameB = rowB?.kecamatan || "Kecamatan B";

  const subjects = [
    { subject: "Daya Tarik & Kunjungan", key: "kunjungan", max: 100 },
    { subject: "Kontribusi PAD & Retribusi", key: "pad", max: 100 },
    { subject: "Aksesibilitas Jalan (R4)", key: "akses", max: 100 },
    { subject: "Kapasitas Akomodasi", key: "akomodasi", max: 100 },
    { subject: "Pemasaran & Sinyal Digital", key: "digital", max: 100 },
  ];

  const normalizeA = {
    kunjungan: Math.min(100, Math.round(((rowA?.totalPengunjung || 0) / 400000) * 100)),
    pad: Math.min(100, Math.round(((rowA?.padRetribusi || 0) / 2000000000) * 100)),
    akses: rowA?.aksesibilitasFisik || 50,
    akomodasi: Math.min(100, Math.round(((rowA?.homestayCapacity || 0) / 100) * 100)),
    digital: rowA?.promosiDigital || 50,
  };

  const normalizeB = {
    kunjungan: Math.min(100, Math.round(((rowB?.totalPengunjung || 0) / 400000) * 100)),
    pad: Math.min(100, Math.round(((rowB?.padRetribusi || 0) / 2000000000) * 100)),
    akses: rowB?.aksesibilitasFisik || 50,
    akomodasi: Math.min(100, Math.round(((rowB?.homestayCapacity || 0) / 100) * 100)),
    digital: rowB?.promosiDigital || 50,
  };

  return subjects.map((sub) => ({
    subject: sub.subject,
    [nameA]: normalizeA[sub.key],
    [nameB]: normalizeB[sub.key],
  }));
}
