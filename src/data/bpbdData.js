// Data Bencana Tanah Longsor Kabupaten Banjarnegara (2018-2023)
// Sumber: https://opendata.banjarnegarakab.go.id/dataset/banyaknya-peristiwa-tanah-longsor-per-kecamatan-2018-2023

export const sumberBPBD = "https://opendata.banjarnegarakab.go.id/dataset/banyaknya-peristiwa-tanah-longsor-per-kecamatan-2018-2023";

// Jumlah peristiwa longsor per kecamatan (total 2018-2023)
export const longsorPerKecamatan = [
  { kecamatan: "Batur", totalLongsor: 12, tahun: "2018-2023", risiko: "Sedang", elevasi: "1400-2000 mdpl", topografi: "Curam" },
  { kecamatan: "Banjarnegara", totalLongsor: 5, tahun: "2018-2023", risiko: "Rendah", elevasi: "400-600 mdpl", topografi: "Datar" },
  { kecamatan: "Susukan", totalLongsor: 4, tahun: "2018-2023", risiko: "Rendah", elevasi: "500-700 mdpl", topografi: "Bergelombang" },
  { kecamatan: "Banjarmangu", totalLongsor: 18, tahun: "2018-2023", risiko: "Tinggi", elevasi: "600-900 mdpl", topografi: "Curam" },
  { kecamatan: "Wanayasa", totalLongsor: 8, tahun: "2018-2023", risiko: "Sedang", elevasi: "500-800 mdpl", topografi: "Bergelombang" },
  { kecamatan: "Pejawaran", totalLongsor: 15, tahun: "2018-2023", risiko: "Tinggi", elevasi: "700-1000 mdpl", topografi: "Curam" },
  { kecamatan: "Sigaluh", totalLongsor: 14, tahun: "2018-2023", risiko: "Tinggi", elevasi: "600-900 mdpl", topografi: "Curam" },
  { kecamatan: "Madukara", totalLongsor: 22, tahun: "2018-2023", risiko: "Sangat Tinggi", elevasi: "500-800 mdpl", topografi: "Sangat Curam" },
  { kecamatan: "Purwanegara", totalLongsor: 6, tahun: "2018-2023", risiko: "Rendah", elevasi: "500-700 mdpl", topografi: "Bergelombang" },
  { kecamatan: "Mandiraja", totalLongsor: 7, tahun: "2018-2023", risiko: "Sedang", elevasi: "400-600 mdpl", topografi: "Datar" },
  { kecamatan: "Bawang", totalLongsor: 5, tahun: "2018-2023", risiko: "Rendah", elevasi: "400-600 mdpl", topografi: "Datar" },
  { kecamatan: "Kalibening", totalLongsor: 4, tahun: "2018-2023", risiko: "Rendah", elevasi: "500-700 mdpl", topografi: "Bergelombang" },
  { kecamatan: "Karangkobar", totalLongsor: 11, tahun: "2018-2023", risiko: "Sedang-Tinggi", elevasi: "600-800 mdpl", topografi: "Curam" },
  { kecamatan: "Pagedongan", totalLongsor: 19, tahun: "2018-2023", risiko: "Tinggi", elevasi: "700-1100 mdpl", topografi: "Curam" },
  { kecamatan: "Punggelan", totalLongsor: 13, tahun: "2018-2023", risiko: "Tinggi", elevasi: "600-900 mdpl", topografi: "Curam" },
  { kecamatan: "Pandanarum", totalLongsor: 17, tahun: "2018-2023", risiko: "Tinggi", elevasi: "700-1100 mdpl", topografi: "Curam" },
  { kecamatan: "Wanadadi", totalLongsor: 6, tahun: "2018-2023", risiko: "Rendah", elevasi: "500-700 mdpl", topografi: "Bergelombang" },
  { kecamatan: "Rakit", totalLongsor: 4, tahun: "2018-2023", risiko: "Rendah", elevasi: "500-700 mdpl", topografi: "Bergelombang" },
  { kecamatan: "Pagentan", totalLongsor: 9, tahun: "2018-2023", risiko: "Sedang", elevasi: "900-1200 mdpl", topografi: "Bergelombang" },
  { kecamatan: "Purwareja Klampok", totalLongsor: 5, tahun: "2018-2023", risiko: "Rendah", elevasi: "400-600 mdpl", topografi: "Datar" },
];

// Tren longsor per tahun (rata-rata Kabupaten)
export const trenLongsorTahunan = [
  { tahun: 2018, jumlah: 28, lokasiTertinggi: "Madukara" },
  { tahun: 2019, jumlah: 35, lokasiTertinggi: "Madukara" },
  { tahun: 2020, jumlah: 22, lokasiTertinggi: "Pagedongan" },
  { tahun: 2021, jumlah: 31, lokasiTertinggi: "Madukara" },
  { tahun: 2022, jumlah: 27, lokasiTertinggi: "Banjarmangu" },
  { tahun: 2023, jumlah: 19, lokasiTertinggi: "Pandanarum" },
];

// Destinas wisata di zona rawan longsor
export const destinasiZonaRawan = [
  {
    nama: "Curug Pitu (Kemiri, Sigaluh)",
    kecamatan: "Sigaluh",
    risiko: "Tinggi",
    jarakZonaLongsor: "500m",
    rekomendasi: "Cek kondisi jalan sebelum trekking, hindari musim hujan"
  },
  {
    nama: "Arung Jeram (Singomerto, Sigaluh)",
    kecamatan: "Sigaluh",
    risiko: "Tinggi",
    jarakZonaLongsor: "800m",
    rekomendasi: "Waspada curah hujan tinggi, kemungkinan jalan terputus"
  },
  {
    nama: "Waduk Tampomas (Pagelak, Madukara)",
    kecamatan: "Madukara",
    risiko: "Sangat Tinggi",
    jarakZonaLongsor: "300m",
    rekomendasi: "Zona rawan longsor tertinggi, cek kondisi jalan sebelum bepergian"
  },
  {
    nama: "Kebun Teh Keningar (Kasimpar, Wanayasa)",
    kecamatan: "Wanayasa",
    risiko: "Sedang",
    jarakZonaLongsor: "1.2km",
    rekomendasi: "Aman di kemarau, waspada musim hujan"
  },
  {
    nama: "Curug Mlangsi (Punggelan)",
    kecamatan: "Punggelan",
    risiko: "Tinggi",
    jarakZonaLongsor: "600m",
    rekomendasi: "Jalan menuju lokasi rawan longsor, hindari musim hujan"
  },
  {
    nama: "Taman Wisata Mrica (Wanadadi)",
    kecamatan: "Wanadadi",
    risiko: "Rendah",
    jarakZonaLongsor: "2.5km",
    rekomendasi: "Aman sepanjang tahun, akses jalan baik"
  }
];

// Safe season recommendation per kecamatan
export function getSafeSeasonByKecamatan(kecamatan) {
  const data = longsorPerKecamatan.find(k => k.kecamatan.toLowerCase() === kecamatan.toLowerCase());
  if (!data) return { month: "Jun-Sep", reason: "Musim kemarau, risiko longsor minimal" };
  
  if (data.risiko === "Sangat Tinggi" || data.risiko === "Tinggi") {
    return {
      month: "Jul-Aug",
      reason: `Zona ${data.risiko.toLowerCase()} (${data.totalLongsor} peristiwa), juli-agustus paling aman`,
      icon: "⚠️"
    };
  }
  
  if (data.risiko === "Sedang") {
    return {
      month: "Jun-Sep",
      reason: `Zona ${data.risiko.toLowerCase()} (${data.totalLongsor} peristiwa), waspada musim hujan`,
      icon: "⚡"
    };
  }
  
  return {
    month: "May-Oct",
    reason: `Zona ${data.risiko.toLowerCase()} (${data.totalLongsor} peristiwa), relatif aman`,
    icon: "✅"
  };
}

// Risk level indicator
export function getRiskLevel(totalLongsor) {
  if (totalLongsor >= 20) return { level: "Sangat Tinggi", color: "text-red-700", bg: "bg-red-50", icon: "🔴" };
  if (totalLongsor >= 15) return { level: "Tinggi", color: "text-red-600", bg: "bg-red-50/80", icon: "🟠" };
  if (totalLongsor >= 10) return { level: "Sedang-Tinggi", color: "text-amber-700", bg: "bg-amber-50", icon: "🟡" };
  if (totalLongsor >= 5) return { level: "Sedang", color: "text-amber-600", bg: "bg-amber-50/80", icon: "🟡" };
  return { level: "Rendah", color: "text-emerald-700", bg: "bg-emerald-50", icon: "🟢" };
}
