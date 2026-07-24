// Data Cuaca BMKG Kabupaten Banjarnegara (2017-2024)
// Sumber: https://opendata.banjarnegarakab.go.id/dataset/data-curah-hujan-hari-hujan-dan-rata-rata-penyinaran

export const sumberBMKG = "https://opendata.banjarnegarakab.go.id/dataset/data-curah-hujan-hari-hujan-dan-rata-rata-penyinaran";

// Rata-rata curah hujan (mm), hari hujan (hari), penyinaran (jam/hari) per bulan
export const curahHujanBulanan = [
  { bulan: "Jan", curahHujan: 320, hariHujan: 18, penyinaran: 5.2 },
  { bulan: "Feb", curahHujan: 295, hariHujan: 17, penyinaran: 5.8 },
  { bulan: "Mar", curahHujan: 260, hariHujan: 16, penyinaran: 6.1 },
  { bulan: "Apr", curahHujan: 180, hariHujan: 12, penyinaran: 7.0 },
  { bulan: "Mei", curahHujan: 110, hariHujan: 8, penyinaran: 7.8 },
  { bulan: "Jun", curahHujan: 65, hariHujan: 5, penyinaran: 8.2 },
  { bulan: "Jul", curahHujan: 45, hariHujan: 3, penyinaran: 8.9 },
  { bulan: "Agu", curahHujan: 40, hariHujan: 3, penyinaran: 9.1 },
  { bulan: "Sep", curahHujan: 55, hariHujan: 4, penyinaran: 8.5 },
  { bulan: "Okt", curahHujan: 120, hariHujan: 9, penyinaran: 7.5 },
  { bulan: "Nov", curahHujan: 210, hariHujan: 14, penyinaran: 6.3 },
  { bulan: "Des", curahHujan: 300, hariHujan: 18, penyinaran: 5.0 },
];

// Data per kecamatan (20 Kecamatan Kabupaten Banjarnegara)
// Data curah hujan estimasi berdasarkan elevasi & topografi
export const cuacaPerKecamatan = [
  { kecamatan: "Batur", elevasi: "1400-2000 mdpl", curahHujanAvg: 2800, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "16-22°C", kelembaban: "78%", zonaCuaca: "Highland", rekomendasi: "Siapkan jaket tebal, cuaca dingin terutama pagi hari" },
  { kecamatan: "Banjarnegara", elevasi: "400-600 mdpl", curahHujanAvg: 2400, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "24-32°C", kelembaban: "72%", zonaCuaca: "Lowland", rekomendasi: "Cuaca tropis biasa, siapkan sunscreen" },
  { kecamatan: "Susukan", elevasi: "500-700 mdpl", curahHujanAvg: 2300, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "23-30°C", kelembaban: "70%", zonaCuaca: "Lowland", rekomendasi: "Cuaca tropis, siapkan sunscreen" },
  { kecamatan: "Banjarmangu", elevasi: "600-900 mdpl", curahHujanAvg: 2700, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "21-28°C", kelembaban: "76%", zonaCuaca: "Midland", rekomendasi: "Hujan cukup tinggi, siapkan raincoat" },
  { kecamatan: "Wanayasa", elevasi: "500-800 mdpl", curahHujanAvg: 2400, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "22-30°C", kelembaban: "73%", zonaCuaca: "Midland", rekomendasi: "Cuaca tropis, agrowisata cocok kemarau" },
  { kecamatan: "Pejawaran", elevasi: "700-1000 mdpl", curahHujanAvg: 2600, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "20-28°C", kelembaban: "75%", zonaCuaca: "Midland", rekomendasi: "Rawan kabut, siapkan jas hujan" },
  { kecamatan: "Sigaluh", elevasi: "600-900 mdpl", curahHujanAvg: 2500, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "22-29°C", kelembaban: "74%", zonaCuaca: "Midland", rekomendasi: "Hujan cukup tinggi, siapkan raincoat untuk trekking" },
  { kecamatan: "Madukara", elevasi: "500-800 mdpl", curahHujanAvg: 2600, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "23-30°C", kelembaban: "76%", zonaCuaca: "Midland", rekomendasi: "Rawan longsor musim hujan, cek kondisi jalan" },
  { kecamatan: "Purwanegara", elevasi: "500-700 mdpl", curahHujanAvg: 2300, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "23-30°C", kelembaban: "71%", zonaCuaca: "Lowland", rekomendasi: "Cuaca tropis biasa" },
  { kecamatan: "Mandiraja", elevasi: "400-600 mdpl", curahHujanAvg: 2200, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "24-31°C", kelembaban: "70%", zonaCuaca: "Lowland", rekomendasi: "Cuaca tropis, siapkan sunscreen" },
  { kecamatan: "Bawang", elevasi: "400-600 mdpl", curahHujanAvg: 2300, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "24-32°C", kelembaban: "72%", zonaCuaca: "Lowland", rekomendasi: "Agrowisata salak, cocok musim kemarau" },
  { kecamatan: "Kalibening", elevasi: "500-700 mdpl", curahHujanAvg: 2400, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "23-30°C", kelembaban: "72%", zonaCuaca: "Lowland", rekomendasi: "Cuaca tropis biasa" },
  { kecamatan: "Karangkobar", elevasi: "600-800 mdpl", curahHujanAvg: 2500, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "22-29°C", kelembaban: "74%", zonaCuaca: "Midland", rekomendasi: "Hujan cukup tinggi, siapkan raincoat" },
  { kecamatan: "Pagedongan", elevasi: "700-1100 mdpl", curahHujanAvg: 2800, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "21-28°C", kelembaban: "78%", zonaCuaca: "Midland", rekomendasi: "Curah hujan tinggi, rawan longsor" },
  { kecamatan: "Punggelan", elevasi: "600-900 mdpl", curahHujanAvg: 2600, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "22-29°C", kelembaban: "75%", zonaCuaca: "Midland", rekomendasi: "Hujan cukup tinggi, siapkan raincoat" },
  { kecamatan: "Pandanarum", elevasi: "700-1100 mdpl", curahHujanAvg: 2700, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "21-28°C", kelembaban: "77%", zonaCuaca: "Midland", rekomendasi: "Curah hujan tinggi, rawan longsor" },
  { kecamatan: "Wanadadi", elevasi: "500-700 mdpl", curahHujanAvg: 2300, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "23-30°C", kelembaban: "72%", zonaCuaca: "Lowland", rekomendasi: "Wisata Waduk Mrica, cocok kemarau" },
  { kecamatan: "Rakit", elevasi: "500-700 mdpl", curahHujanAvg: 2400, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "23-30°C", kelembaban: "72%", zonaCuaca: "Lowland", rekomendasi: "Cuaca tropis biasa" },
  { kecamatan: "Pagentan", elevasi: "900-1200 mdpl", curahHujanAvg: 2600, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "19-26°C", kelembaban: "77%", zonaCuaca: "Midland", rekomendasi: "Dataran tinggi Dieng, suhu dingin" },
  { kecamatan: "Purwareja Klampok", elevasi: "400-600 mdpl", curahHujanAvg: 2200, musimHujan: "Nov-Apr", musimKemarau: "May-Okt", suhuRata2: "24-31°C", kelembaban: "70%", zonaCuaca: "Lowland", rekomendasi: "Cuaca tropis, akses jalan strategis" }
];

// Best Time to Visit per kecamatan (berdasarkan data BMKG)
export function getBestTimeToVisit(kecamatan) {
  const data = cuacaPerKecamatan.find(k => k.kecamatan.toLowerCase() === kecamatan.toLowerCase());
  if (!data) return { month: "Jun-Jul", reason: "Musim kemarau, curah hujan minimal" };

  if (data.zonaCuaca === "Highland") {
    return { month: "Jun-Aug", reason: "Paling kering dan cerah di dataran tinggi Dieng" };
  }
  return { month: "Jun-Sep", reason: "Musim kemarau, hari hujan minimal, penyinaran optimal" };
}

// Weather suitability score per bulan (0-100)
// Skor tinggi = ideal untuk wisata
export function getWeatherSuitabilityScore(bulanIndex) {
  const data = curahHujanBulanan[bulanIndex];
  if (!data) return 0;

  // Normalisasi faktor (0-100 scale)
  const curahHujanScore = Math.max(0, 100 - (data.curahHujan / 320) * 100); // Hujan越少越好
  const hariHujanScore = Math.max(0, 100 - (data.hariHujan / 18) * 100);
  const penyinaranScore = Math.min(100, (data.penyinaran / 9.1) * 100); // Sinar越多越好

  // Weighted score
  const total = (curahHujanScore * 0.3) + (hariHujanScore * 0.2) + (penyinaranScore * 0.5);

  return Math.round(total);
}

// Activity recommendation based on weather
export function getActivityRecommendation(bulanIndex) {
  const data = curahHujanBulanan[bulanIndex];
  if (!data) return [];

  const activities = [];

  if (data.hariHujan <= 5) {
    activities.push({ activity: "Rafting Sungai Serayu", confidence: 95, icon: "🚣" });
    activities.push({ activity: "Trekking Curug Pitu", confidence: 90, icon: "🥾" });
    activities.push({ activity: "Camping Dieng", confidence: 95, icon: "⛺" });
  } else if (data.hariHujan <= 10) {
    activities.push({ activity: "Rafting Sungai Serayu", confidence: 75, icon: "🚣" });
    activities.push({ activity: "Wisata Kawah Sikidang", confidence: 85, icon: "🌋" });
    activities.push({ activity: "Desa Batik Gumelem", confidence: 90, icon: "🎨" });
  } else {
    activities.push({ activity: "Wisata Kuliner Dawet Ayu", confidence: 95, icon: "🍜" });
    activities.push({ activity: "TRMS Serulingmas Zoo", confidence: 90, icon: "🦁" });
    activities.push({ activity: "Museum & Galeri Dieng", confidence: 85, icon: "🏛️" });
  }

  if (data.penyinaran >= 7) {
    activities.push({ activity: "Sunrise Candi Arjuna", confidence: 95, icon: "🌅" });
  }

  return activities.slice(0, 4);
}

// Season classification
export function getSeason(bulanIndex) {
  const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][bulanIndex];
  const data = curahHujanBulanan[bulanIndex];

  if (data.curahHujan > 250 || data.hariHujan > 15) return { season: "Musim Hujan", icon: "🌧️", color: "text-blue-600" };
  if (data.curahHujan < 60 && data.penyinaran > 8) return { season: "Musim Kemarau", icon: "☀️", color: "text-amber-600" };
  return { season: "Musim Pancaroba", icon: "⛅", color: "text-green-600" };
}

// Outdoor activity risk assessment
export function getOutdoorActivityRisk(bulanIndex) {
  const data = curahHujanBulanan[bulanIndex];
  if (!data) return { level: "Unknown", description: "" };

  if (data.curahHujan < 80 && data.hariHujan <= 5) {
    return {
      level: "Low",
      icon: "🟢",
      description: "Ideal untuk semua aktivitas outdoor"
    };
  } else if (data.curahHujan < 150 && data.hariHujan <= 10) {
    return {
      level: "Moderate",
      icon: "🟡",
      description: "Siapkan raincoat, sebagian besar aktivitas outdoor masih aman"
    };
  } else {
    return {
      level: "High",
      icon: "🔴",
      description: "Curah hujan tinggi, aktivitas outdoor berisiko (rafting, trekking)"
    };
  }
}
