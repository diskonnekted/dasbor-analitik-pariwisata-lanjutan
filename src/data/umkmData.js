// Data Ekonomi Kreatif & UMKM Kabupaten Banjarnegara
// Sumber: Disperindagkop-UKM (opendata.banjarnegarakab.go.id)

export const sumberUMKM = "https://opendata.banjarnegarakab.go.id/organization/disperindagkop-ukm";

// Data UMKM per kecamatan (estimasi berdasarkan data Disperindagkop)
export const umkmPerKecamatan = [
  {
    kecamatan: "Batur",
    koperasi: 28,
    pasar: 3,
    saranaDagang: 45,
    tenagaKerja: 320,
    potensiWisata: 485000, // pengunjung tahunan
    multiplierIndex: 3.4,
    impactScore: 85
  },
  {
    kecamatan: "Banjarnegara",
    koperasi: 45,
    pasar: 5,
    saranaDagang: 120,
    tenagaKerja: 850,
    potensiWisata: 375000,
    multiplierIndex: 2.8,
    impactScore: 92
  },
  {
    kecamatan: "Susukan",
    koperasi: 18,
    pasar: 2,
    saranaDagang: 35,
    tenagaKerja: 210,
    potensiWisata: 42000,
    multiplierIndex: 2.2,
    impactScore: 68
  },
  {
    kecamatan: "Banjarmangu",
    koperasi: 15,
    pasar: 1,
    saranaDagang: 28,
    tenagaKerja: 180,
    potensiWisata: 92000,
    multiplierIndex: 2.5,
    impactScore: 62
  },
  {
    kecamatan: "Wanayasa",
    koperasi: 22,
    pasar: 2,
    saranaDagang: 40,
    tenagaKerja: 280,
    potensiWisata: 54000,
    multiplierIndex: 2.1,
    impactScore: 71
  },
  {
    kecamatan: "Pejawaran",
    koperasi: 12,
    pasar: 1,
    saranaDagang: 25,
    tenagaKerja: 150,
    potensiWisata: 62000,
    multiplierIndex: 2.0,
    impactScore: 58
  },
  {
    kecamatan: "Sigaluh",
    koperasi: 20,
    pasar: 2,
    saranaDagang: 38,
    tenagaKerja: 240,
    potensiWisata: 68000,
    multiplierIndex: 1.9,
    impactScore: 65
  },
  {
    kecamatan: "Madukara",
    koperasi: 16,
    pasar: 2,
    saranaDagang: 32,
    tenagaKerja: 200,
    potensiWisata: 38000,
    multiplierIndex: 1.8,
    impactScore: 60
  },
  {
    kecamatan: "Purwanegara",
    koperasi: 14,
    pasar: 1,
    saranaDagang: 28,
    tenagaKerja: 170,
    potensiWisata: 41000,
    multiplierIndex: 1.8,
    impactScore: 55
  },
  {
    kecamatan: "Mandiraja",
    koperasi: 13,
    pasar: 1,
    saranaDagang: 26,
    tenagaKerja: 160,
    potensiWisata: 35000,
    multiplierIndex: 1.7,
    impactScore: 52
  },
  {
    kecamatan: "Bawang",
    koperasi: 11,
    pasar: 1,
    saranaDagang: 24,
    tenagaKerja: 140,
    potensiWisata: 39000,
    multiplierIndex: 1.9,
    impactScore: 56
  },
  {
    kecamatan: "Kalibening",
    koperasi: 10,
    pasar: 1,
    saranaDagang: 22,
    tenagaKerja: 130,
    potensiWisata: 28000,
    multiplierIndex: 1.6,
    impactScore: 48
  },
  {
    kecamatan: "Karangkobar",
    koperasi: 12,
    pasar: 1,
    saranaDagang: 25,
    tenagaKerja: 150,
    potensiWisata: 32000,
    multiplierIndex: 1.7,
    impactScore: 54
  },
  {
    kecamatan: "Pagedongan",
    koperasi: 8,
    pasar: 1,
    saranaDagang: 18,
    tenagaKerja: 100,
    potensiWisata: 19000,
    multiplierIndex: 1.5,
    impactScore: 42
  },
  {
    kecamatan: "Punggelan",
    koperasi: 9,
    pasar: 1,
    saranaDagang: 20,
    tenagaKerja: 120,
    potensiWisata: 22000,
    multiplierIndex: 1.5,
    impactScore: 45
  },
  {
    kecamatan: "Pandanarum",
    koperasi: 7,
    pasar: 1,
    saranaDagang: 16,
    tenagaKerja: 90,
    potensiWisata: 14000,
    multiplierIndex: 1.4,
    impactScore: 38
  },
  {
    kecamatan: "Wanadadi",
    koperasi: 10,
    pasar: 1,
    saranaDagang: 23,
    tenagaKerja: 140,
    potensiWisata: 26000,
    multiplierIndex: 1.6,
    impactScore: 50
  },
  {
    kecamatan: "Rakit",
    koperasi: 8,
    pasar: 1,
    saranaDagang: 19,
    tenagaKerja: 110,
    potensiWisata: 21000,
    multiplierIndex: 1.5,
    impactScore: 44
  },
  {
    kecamatan: "Pagentan",
    koperasi: 7,
    pasar: 1,
    saranaDagang: 17,
    tenagaKerja: 95,
    potensiWisata: 18000,
    multiplierIndex: 1.4,
    impactScore: 40
  },
  {
    kecamatan: "Purwareja Klampok",
    koperasi: 15,
    pasar: 2,
    saranaDagang: 30,
    tenagaKerja: 200,
    potensiWisata: 48000,
    multiplierIndex: 2.1,
    impactScore: 66
  }
];

// Tren pertumbuhan UMKM vs Kunjisan (multi-tahun)
export const trenUMKMvsWisata = [
  { tahun: "2020", umkm: 4200, kunjungan: 680000, pad: 4800000000 },
  { tahun: "2021", umkm: 4350, kunjungan: 810000, pad: 6100000000 },
  { tahun: "2022", umkm: 4680, kunjungan: 1350000, pad: 11400000000 },
  { tahun: "2023", umkm: 5120, kunjungan: 1680000, pad: 13600000000 },
  { tahun: "2024", umkm: 5480, kunjungan: 1820000, pad: 14850000000 },
  { tahun: "2025", umkm: 5850, kunjungan: 2050000, pad: 16500000000 },
];

// Pasar tradisional sebagai destinasi wisata belanja
export const pasarWisata = [
  {
    nama: "Pasar Alun-Alun Banjarnegara",
    kecamatan: "Banjarnegara",
    jenis: "Pasar Besar",
    produk: ["Dawet Ayu", "Nasi Penggel", "Batik", "Keripik Singkong"],
    pengunjungHarian: 5000,
    rating: 4.5,
    harga: "Ekonomis",
    rekomendasi: "Pusat kuliner Dawet Ayu & belanja oleh-oleh"
  },
  {
    nama: "Pasar Batur Dieng",
    kecamatan: "Batur",
    jenis: "Pasar Tradisional",
    produk: ["Sayuran Organik", "Buah-buahan", "Herbal Dieng", "Tenun"],
    pengunjungHarian: 1200,
    rating: 4.2,
    harga: "Ekonomis",
    rekomendasi: "Belanja produk khas Dieng & sayuran organik"
  },
  {
    nama: "Pasar Madukara",
    kecamatan: "Madukara",
    jenis: "Pasar Kecamatan",
    produk: ["Ikan Air Tawar", "Sayuran", "Kerajinan Bambu"],
    pengunjungHarian: 800,
    rating: 3.8,
    harga: "Ekonomis",
    rekomendasi: "Cicipi ikan air tawar segar khas Madukara"
  },
  {
    nama: "Pasar Sigaluh",
    kecamatan: "Sigaluh",
    jenis: "Pasar Kecamatan",
    produk: ["Kopi Arabika", "Batik Sigaluh", "Roti Senggolo"],
    pengunjungHarian: 600,
    rating: 4.0,
    harga: "Ekonomis",
    rekomendasi: "Kopi arabika Pejawaran & batik khas selatan"
  },
  {
    nama: "Pasar Wanayasa",
    kecamatan: "Wanayasa",
    jenis: "Pasar Kecamatan",
    produk: ["Salak Pondoh", "Kopi", "Agro Wisata"],
    pengunjungHarian: 700,
    rating: 4.3,
    harga: "Ekonomis",
    rekomendasi: "Salak pondoh segar langsung dari petani"
  },
  {
    nama: "Pasar Susukan Gumelem",
    kecamatan: "Susukan",
    jenis: "Pasar Kecamatan",
    produk: ["Batik Gumelem", "Kerajinan", "Kuliner Tradisional"],
    pengunjungHarian: 900,
    rating: 4.4,
    harga: "Ekonomis",
    rekomendasi: "Sentra batik tulis Gumelem & kuliner tradisional"
  }
];

// Kalkulasi Economic Impact Score per kecamatan
export function calculateEconomicImpact(kecamatanData) {
  if (!kecamatanData) return null;
  
  const { koperasi, pasar, saranaDagang, tenagaKerja, potensiWisata } = kecamatanData;
  
  // Normalisasi faktor (0-100)
  const koperasiScore = Math.min(100, (koperasi / 50) * 100);
  const pasarScore = Math.min(100, (pasar / 5) * 100);
  const dagangScore = Math.min(100, (saranaDagang / 120) * 100);
  const tenagaScore = Math.min(100, (tenagaKerja / 850) * 100);
  
  // Weighted composite
  const impactScore = (koperasiScore * 0.3) + (pasarScore * 0.25) + (dagangScore * 0.25) + (tenagaScore * 0.2);
  
  // Estimasi economic impact
  const wisataMultiplier = 2.4; // multiplier ekonomi pariwisata
  const estimatedImpact = potensiWisata * 275000 * wisataMultiplier; // Rp pengeluaran × multiplier
  
  let impactLevel, impactColor;
  
  if (impactScore >= 75) {
    impactLevel = "Sangat Tinggi";
    impactColor = "text-emerald-700";
  } else if (impactScore >= 55) {
    impactLevel = "Tinggi";
    impactColor = "text-blue-700";
  } else if (impactScore >= 35) {
    impactLevel = "Sedang";
    impactColor = "text-amber-700";
  } else {
    impactLevel = "Rendah";
    impactColor = "text-slate-600";
  }
  
  return {
    kecamatan: kecamatanData.kecamatan,
    impactScore: Math.round(impactScore),
    impactLevel,
    impactColor,
    koperasi,
    pasar,
    saranaDagang,
    tenagaKerja,
    estimatedEconomicImpact: Math.round(estimatedImpact / 1000000) + " Juta",
    multiplier: wisataMultiplier,
    priority: impactScore >= 75 ? "Tinggi" : impactScore >= 55 ? "Sedang" : "Rendah"
  };
}
