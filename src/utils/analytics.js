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

// ============================================
// WEATHER & CUACA ANALYTICS (Fitur 1)
// ============================================

/**
 * Weather Suitability Score per kecamatan per bulan
 * Bobot: Curah Hujan (30%), Hari Hujan (20%), Penyinaran (50%)
 */
export function calculateWeatherSuitability(kecamatan, bulanIndex) {
  // Simulasi data curah hujan berdasarkan zona cuaca kecamatan
  const baseRainfall = {
    "Batur": 2800, "Banjarnegara": 2400, "Susukan": 2300, "Banjarmangu": 2700,
    "Wanayasa": 2400, "Pejawaran": 2600, "Sigaluh": 2500, "Madukara": 2600,
    "Purwanegara": 2300, "Mandiraja": 2200, "Bawang": 2300, "Kalibening": 2400,
    "Karangkobar": 2500, "Pagedongan": 2800, "Punggelan": 2600, "Pandanarum": 2700,
    "Wanadadi": 2300, "Rakit": 2400, "Pagentan": 2600, "Purwareja Klampok": 2200,
  };

  const bulanNama = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const rainfallPattern = [0.18, 0.16, 0.14, 0.10, 0.06, 0.03, 0.02, 0.02, 0.03, 0.06, 0.10, 0.16]; // Distribusi bulanan
  
  const annualRain = baseRainfall[kecamatan] || 2400;
  const monthlyRain = annualRain * rainfallPattern[bulanIndex];
  const rainyDays = Math.round(monthlyRain / 18); // Est: 18mm/hari hujan
  const sunshineHours = Math.max(4, 9 - (rainyDays / 18) * 5);

  // Normalisasi (0-100)
  const rainScore = Math.max(0, 100 - (monthlyRain / 320) * 100);
  const daysScore = Math.max(0, 100 - (rainyDays / 20) * 100);
  const sunshineScore = Math.min(100, (sunshineHours / 9.1) * 100);

  // Weighted composite
  const weatherScore = (rainScore * 0.3) + (daysScore * 0.2) + (sunshineScore * 0.5);

  return {
    kecamatan,
    bulan: bulanNama[bulanIndex],
    monthlyRainfall: Math.round(monthlyRain),
    rainyDays,
    sunshineHours: sunshineHours.toFixed(1),
    weatherScore: Math.round(weatherScore),
    rating: weatherScore >= 80 ? "Excellent" : weatherScore >= 60 ? "Good" : weatherScore >= 40 ? "Fair" : "Poor"
  };
}

/**
 * Outdoor Activity Risk Assessment per bulan
 */
export function getOutdoorActivityRiskLevel(bulanIndex) {
  const bulanNama = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const rainyDaysPattern = [18, 17, 16, 12, 8, 5, 3, 3, 4, 9, 14, 18];
  
  const rainyDays = rainyDaysPattern[bulanIndex];
  
  let riskLevel, riskIcon, riskColor, riskDescription;
  
  if (rainyDays <= 5) {
    riskLevel = "Low";
    riskIcon = "🟢";
    riskColor = "text-emerald-700";
    riskDescription = "Ideal untuk semua aktivitas outdoor";
  } else if (rainyDays <= 10) {
    riskLevel = "Moderate";
    riskIcon = "🟡";
    riskColor = "text-amber-700";
    riskDescription = "Siapkan raincoat, sebagian besar aktivitas outdoor masih aman";
  } else {
    riskLevel = "High";
    riskIcon = "🔴";
    riskColor = "text-red-700";
    riskDescription = "Curah hujan tinggi, aktivitas outdoor berisiko";
  }

  return {
    bulan: bulanNama[bulanIndex],
    rainyDays,
    riskLevel,
    riskIcon,
    riskColor,
    riskDescription,
    recommendedActivities: rainyDays <= 5 
      ? ["Rafting", "Trekking", "Camping", "Sunrise View"]
      : rainyDays <= 10
        ? ["Rafting", "Wisata Kawah", "Desa Budaya"]
        : ["Wisata Kuliner", "Zoo", "Museum", "Kuliner Dawet Ayu"]
  };
}

/**
 * Season Classification
 */
export function getClassifySeason(bulanIndex) {
  const bulanNama = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const rainyDaysPattern = [18, 17, 16, 12, 8, 5, 3, 3, 4, 9, 14, 18];
  
  const rainyDays = rainyDaysPattern[bulanIndex];
  
  let season, seasonIcon, seasonColor;
  
  if (rainyDays > 15) {
    season = "Musim Hujan";
    seasonIcon = "🌧️";
    seasonColor = "text-blue-700";
  } else if (rainyDays < 5) {
    season = "Musim Kemarau";
    seasonIcon = "☀️";
    seasonColor = "text-amber-700";
  } else {
    season = "Pancaroba";
    seasonIcon = "⛅";
    seasonColor = "text-green-700";
  }

  return {
    bulan: bulanNama[bulanIndex],
    season,
    seasonIcon,
    seasonColor
  };
}

/**
 * Best Time to Visit Recommendation
 */
export function getBestTimeToVisit() {
  const bestMonths = [5, 6, 7, 8, 9]; // Jun-Sep (musim kemarau)
  const bulanNama = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  
  return bestMonths.map(idx => ({
    bulan: bulanNama[idx],
    reason: idx === 6 || idx === 7 ? "Paling kering & cerah (3-4 hari hujan/bulan)" : "Musim kemarau, cocok untuk outdoor"
  }));
}

/**
 * Activity Recommendation per bulan
 */
export function getActivityRecommendation(bulanIndex) {
  const bulanNama = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const rainyDaysPattern = [18, 17, 16, 12, 8, 5, 3, 3, 4, 9, 14, 18];
  const penyinaranPattern = [5.2, 5.8, 6.1, 7.0, 7.8, 8.2, 8.9, 9.1, 8.5, 7.5, 6.3, 5.0];
  
  const rainyDays = rainyDaysPattern[bulanIndex];
  const sunshine = penyinaranPattern[bulanIndex];
  const bulan = bulanNama[bulanIndex];
  
  const activities = [];
  
  if (rainyDays <= 5) {
    activities.push({ name: "Rafting Sungai Serayu", icon: "🚣", confidence: 95 });
    activities.push({ name: "Trekking Curug Pitu", icon: "🥾", confidence: 90 });
    activities.push({ name: "Camping Dieng Plateau", icon: "⛺", confidence: 95 });
  } else if (rainyDays <= 10) {
    activities.push({ name: "Rafting Sungai Serayu", icon: "🚣", confidence: 75 });
    activities.push({ name: "Wisata Kawah Sikidang", icon: "🌋", confidence: 85 });
    activities.push({ name: "Desa Wisata Batik Gumelem", icon: "🎨", confidence: 90 });
  } else {
    activities.push({ name: "Wisata Kuliner Dawet Ayu", icon: "🍜", confidence: 95 });
    activities.push({ name: "TRMS Serulingmas Zoo", icon: "🦁", confidence: 90 });
    activities.push({ name: "Museum & Galeri Dieng", icon: "🏛️", confidence: 85 });
  }
  
  if (sunshine >= 7) {
    activities.push({ name: "Sunrise Candi Arjuna", icon: "🌅", confidence: 95 });
  }
  
  return { bulan, activities: activities.slice(0, 4) };
}

/**
 * Weather-based Carrying Capacity Adjustment
 * Musim hujan = kapasitas lebih rendah (jalan licin, risiko longsor)
 */
export function calculateWeatherAdjustedCapacity(kecData) {
  if (!kecData) return null;
  
  const bulanNama = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const rainyDaysPattern = [18, 17, 16, 12, 8, 5, 3, 3, 4, 9, 14, 18];
  
  const adjustments = bulanNama.map((bulan, idx) => {
    const rainyDays = rainyDaysPattern[idx];
    const capacityFactor = rainyDays <= 5 ? 1.1 : rainyDays <= 10 ? 1.0 : 0.85; // Hujan tinggi = kapasitas turun 15%
    const adjustedCapacity = Math.round((kecData.carryingCapacityMax || 5000) * capacityFactor);
    
    return {
      bulan,
      rainyDays,
      capacityFactor: capacityFactor.toFixed(2),
      originalCapacity: kecData.carryingCapacityMax,
      adjustedCapacity,
      impact: rainyDays > 15 ? "Turun 15% (hujan tinggi)" : rainyDays < 5 ? "Naik 10% (cuaca ideal)" : "Stabil"
    };
  });
  
  return { kecamatan: kecData.kecamatan, monthlyAdjustments: adjustments };
}

// ============================================
// DISASTER & RISIKO BENCANA (Fitur 2)
// ============================================

/**
 * Disaster Risk Score per kecamatan
 * Bobot: Jumlah Longsor (60%), Curah Hujan Puncak (20%), Topografi (20%)
 */
export function calculateDisasterRiskScore(kecamatan, longsorData, cuacaData) {
  if (!kecamatan || !longsorData) return null;
  
  const { totalLongsor, topografi } = longsorData;
  const hujanPuncak = cuacaData ? Math.max(...cuacaData.map(d => d.curahHujan)) : 320;
  
  // Normalisasi faktor
  const longsorScore = Math.min(100, (totalLongsor / 25) * 100);
  const hujanScore = Math.min(100, (hujanPuncak / 320) * 100);
  
  const topografiScore = {
    "Sangat Curam": 90,
    "Curam": 70,
    "Bergelombang": 40,
    "Datar": 20
  };
  const topoScore = topografiScore[topografi] || 50;
  
  // Weighted composite
  const riskScore = (longsorScore * 0.6) + (hujanScore * 0.2) + (topoScore * 0.2);
  
  let riskLevel, riskColor, riskIcon;
  
  if (riskScore >= 75) {
    riskLevel = "Sangat Tinggi";
    riskColor = "text-red-700";
    riskIcon = "🔴";
  } else if (riskScore >= 55) {
    riskLevel = "Tinggi";
    riskColor = "text-orange-600";
    riskIcon = "🟠";
  } else if (riskScore >= 35) {
    riskLevel = "Sedang";
    riskColor = "text-amber-600";
    riskIcon = "🟡";
  } else {
    riskLevel = "Rendah";
    riskColor = "text-emerald-700";
    riskIcon = "🟢";
  }
  
  return {
    kecamatan,
    riskScore: Math.round(riskScore),
    riskLevel,
    riskColor,
    riskIcon,
    longsorCount: totalLongsor,
    topografi,
    recommendedAction: riskScore >= 75 
      ? "Hindari musim hujan, cek kondisi jalan secara berkala"
      : riskScore >= 55
        ? "Waspada musim hujan, siapkan rute alternatif"
        : "Relatif aman, tetap waspada saat hujan lebat"
  };
}

/**
 * Safe Season Calculator - bulan dengan risiko longsor terendah
 */
export function getSafeSeason(kecamatan) {
  const bulanNama = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const rainyDaysPattern = [18, 17, 16, 12, 8, 5, 3, 3, 4, 9, 14, 18];
  
  // Bulan dengan hari hujan ≤ 5 = risiko longsor minimal
  const safeMonths = rainyDaysPattern
    .map((days, idx) => ({ bulan: bulanNama[idx], rainyDays: days }))
    .filter(d => d.rainyDays <= 5)
    .map(d => ({
      bulan: d.bulan,
      rainyDays: d.rainyDays,
      risk: "Aman",
      icon: "✅"
    }));
  
  const moderateMonths = rainyDaysPattern
    .map((days, idx) => ({ bulan: bulanNama[idx], rainyDays: days }))
    .filter(d => d.rainyDays > 5 && d.rainyDays <= 10)
    .map(d => ({
      bulan: d.bulan,
      rainyDays: d.rainyDays,
      risk: "Perlu Waspada",
      icon: "⚠️"
    }));
  
  const highRiskMonths = rainyDaysPattern
    .map((days, idx) => ({ bulan: bulanNama[idx], rainyDays: days }))
    .filter(d => d.rainyDays > 10)
    .map(d => ({
      bulan: d.bulan,
      rainyDays: d.rainyDays,
      risk: "Risiko Tinggi",
      icon: "🚨"
    }));
  
  return {
    kecamatan,
    safeMonths,
    moderateMonths,
    highRiskMonths
  };
}

/**
 * Destination Risk Assessment - per destinasi wisata
 */
export function getDestinationRisk(destinasi, kecamatanLongsorData) {
  if (!destinasi || !kecamatanLongsorData) return null;
  
  const { totalLongsor, topografi } = kecamatanLongsorData;
  const riskScore = Math.min(100, (totalLongsor / 25) * 100);
  
  return {
    nama: destinasi.nama,
    kecamatan: destinasi.kecamatan,
    riskScore: Math.round(riskScore),
    riskLevel: riskScore >= 75 ? "Sangat Tinggi" : riskScore >= 55 ? "Tinggi" : riskScore >= 35 ? "Sedang" : "Rendah",
    longsorCount: totalLongsor,
    topografi,
    safeSeason: "Jul-Aug (musim kemarau)",
    alert: riskScore >= 55 ? "⚠️ Zona rawan longsor, cek kondisi jalan" : "✅ Relatif aman"
  };
}
