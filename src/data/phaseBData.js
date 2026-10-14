// ============================================================
// phaseBData.js - Data makro & sektoral Fase B
// Sumber: BPS Banjarnegara, BPPKAD, DISPARBUD (master data CSV).
// Dinormalisasi (koreksi titik/koma) & diaudit. Generated - jangan edit manual.
// ============================================================

// Tarif penginapan per hotel per tahun (Rupiah; null = tidak terdata)
export const tarifPenginapan = [
  {
    "hotel": "Gunung Mas",
    "tahun": 2017,
    "maxDouble": 375000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 150000
  },
  {
    "hotel": "Gading Rejo",
    "tahun": 2017,
    "maxDouble": null,
    "maxSingle": 50000,
    "minDouble": null,
    "minSingle": 50000
  },
  {
    "hotel": "Setiya",
    "tahun": 2017,
    "maxDouble": null,
    "maxSingle": 120000,
    "minDouble": null,
    "minSingle": 85000
  },
  {
    "hotel": "Surya Yudha",
    "tahun": 2017,
    "maxDouble": 2500000,
    "maxSingle": null,
    "minDouble": 350000,
    "minSingle": null
  },
  {
    "hotel": "Agung",
    "tahun": 2017,
    "maxDouble": 135000,
    "maxSingle": null,
    "minDouble": 70000,
    "minSingle": null
  },
  {
    "hotel": "Asri",
    "tahun": 2017,
    "maxDouble": 400000,
    "maxSingle": null,
    "minDouble": 150000,
    "minSingle": null
  },
  {
    "hotel": "Central",
    "tahun": 2017,
    "maxDouble": 750000,
    "maxSingle": null,
    "minDouble": 150000,
    "minSingle": null
  },
  {
    "hotel": "Garuda",
    "tahun": 2017,
    "maxDouble": 500000,
    "maxSingle": null,
    "minDouble": 80000,
    "minSingle": null
  },
  {
    "hotel": "Sokanandi",
    "tahun": 2017,
    "maxDouble": 350000,
    "maxSingle": null,
    "minDouble": 150000,
    "minSingle": null
  },
  {
    "hotel": "Gunung Mas",
    "tahun": 2018,
    "maxDouble": 300000,
    "maxSingle": 300000,
    "minDouble": 180000,
    "minSingle": 180000
  },
  {
    "hotel": "Gading Rejo",
    "tahun": 2018,
    "maxDouble": 50000,
    "maxSingle": 50000,
    "minDouble": 50000,
    "minSingle": 50000
  },
  {
    "hotel": "Setiya",
    "tahun": 2018,
    "maxDouble": 120000,
    "maxSingle": 120000,
    "minDouble": 85000,
    "minSingle": 85000
  },
  {
    "hotel": "Surya Yudha",
    "tahun": 2018,
    "maxDouble": 160000,
    "maxSingle": 500000,
    "minDouble": 600000,
    "minSingle": 100000
  },
  {
    "hotel": "Agung",
    "tahun": 2018,
    "maxDouble": 130000,
    "maxSingle": 130000,
    "minDouble": 30000,
    "minSingle": 30000
  },
  {
    "hotel": "Asri",
    "tahun": 2018,
    "maxDouble": 350000,
    "maxSingle": 175000,
    "minDouble": 225000,
    "minSingle": 125000
  },
  {
    "hotel": "Central",
    "tahun": 2018,
    "maxDouble": 750000,
    "maxSingle": 260000,
    "minDouble": 400000,
    "minSingle": 150000
  },
  {
    "hotel": "Garuda",
    "tahun": 2018,
    "maxDouble": 500000,
    "maxSingle": 220000,
    "minDouble": 300000,
    "minSingle": 60000
  },
  {
    "hotel": "Sokanandi",
    "tahun": 2018,
    "maxDouble": 350000,
    "maxSingle": 350000,
    "minDouble": 150000,
    "minSingle": 150000
  },
  {
    "hotel": "Gunung Mas",
    "tahun": 2019,
    "maxDouble": 400000,
    "maxSingle": null,
    "minDouble": 180000,
    "minSingle": null
  },
  {
    "hotel": "Gading Rejo",
    "tahun": 2019,
    "maxDouble": null,
    "maxSingle": null,
    "minDouble": 50000,
    "minSingle": null
  },
  {
    "hotel": "Setiya",
    "tahun": 2019,
    "maxDouble": 100000,
    "maxSingle": null,
    "minDouble": 55000,
    "minSingle": null
  },
  {
    "hotel": "Surya Yudha",
    "tahun": 2019,
    "maxDouble": 1000000,
    "maxSingle": null,
    "minDouble": 50000,
    "minSingle": null
  },
  {
    "hotel": "Agung",
    "tahun": 2019,
    "maxDouble": 50000,
    "maxSingle": null,
    "minDouble": 25000,
    "minSingle": null
  },
  {
    "hotel": "Asri",
    "tahun": 2019,
    "maxDouble": 500000,
    "maxSingle": null,
    "minDouble": 150000,
    "minSingle": null
  },
  {
    "hotel": "Central",
    "tahun": 2019,
    "maxDouble": 750000,
    "maxSingle": null,
    "minDouble": 150000,
    "minSingle": null
  },
  {
    "hotel": "Garuda",
    "tahun": 2019,
    "maxDouble": 600000,
    "maxSingle": null,
    "minDouble": 80000,
    "minSingle": null
  },
  {
    "hotel": "Sokanandi",
    "tahun": 2019,
    "maxDouble": 325000,
    "maxSingle": null,
    "minDouble": 150000,
    "minSingle": null
  },
  {
    "hotel": "Nyaman",
    "tahun": 2019,
    "maxDouble": null,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": null
  },
  {
    "hotel": "Tirta Jadi",
    "tahun": 2019,
    "maxDouble": null,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": null
  },
  {
    "hotel": "Tani Jiwo",
    "tahun": 2019,
    "maxDouble": null,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": null
  },
  {
    "hotel": "Gunung Mas",
    "tahun": 2020,
    "maxDouble": null,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": null
  },
  {
    "hotel": "Gading Rejo",
    "tahun": 2020,
    "maxDouble": null,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": null
  },
  {
    "hotel": "Setiya",
    "tahun": 2020,
    "maxDouble": null,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": null
  },
  {
    "hotel": "Surya Yudha",
    "tahun": 2020,
    "maxDouble": null,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": null
  },
  {
    "hotel": "Agung",
    "tahun": 2020,
    "maxDouble": null,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": null
  },
  {
    "hotel": "Asri",
    "tahun": 2020,
    "maxDouble": null,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": null
  },
  {
    "hotel": "Central",
    "tahun": 2020,
    "maxDouble": null,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": null
  },
  {
    "hotel": "Garuda",
    "tahun": 2020,
    "maxDouble": null,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": null
  },
  {
    "hotel": "Sokanandi",
    "tahun": 2020,
    "maxDouble": null,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": null
  },
  {
    "hotel": "Nyaman",
    "tahun": 2020,
    "maxDouble": null,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": null
  },
  {
    "hotel": "Tirta Jadi",
    "tahun": 2020,
    "maxDouble": null,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": null
  },
  {
    "hotel": "Tani Jiwo",
    "tahun": 2020,
    "maxDouble": null,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": null
  },
  {
    "hotel": "Gunung Mas",
    "tahun": 2021,
    "maxDouble": 400000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 200000
  },
  {
    "hotel": "Gading Rejo",
    "tahun": 2021,
    "maxDouble": null,
    "maxSingle": 100000,
    "minDouble": null,
    "minSingle": 100000
  },
  {
    "hotel": "Setiya",
    "tahun": 2021,
    "maxDouble": 280000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 120000
  },
  {
    "hotel": "Surya Yudha",
    "tahun": 2021,
    "maxDouble": 2500000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 350000
  },
  {
    "hotel": "Agung",
    "tahun": 2021,
    "maxDouble": 150000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 100000
  },
  {
    "hotel": "Asri",
    "tahun": 2021,
    "maxDouble": 350000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 150000
  },
  {
    "hotel": "Central",
    "tahun": 2021,
    "maxDouble": 750000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 150000
  },
  {
    "hotel": "Garuda",
    "tahun": 2021,
    "maxDouble": 450000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 100000
  },
  {
    "hotel": "Sokanandi",
    "tahun": 2021,
    "maxDouble": 350000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 150000
  },
  {
    "hotel": "Nyaman",
    "tahun": 2021,
    "maxDouble": 290000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 190000
  },
  {
    "hotel": "Tirta Jadi",
    "tahun": 2021,
    "maxDouble": 250000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 125000
  },
  {
    "hotel": "Tani Jiwo",
    "tahun": 2021,
    "maxDouble": 690000,
    "maxSingle": 200000,
    "minDouble": 470000,
    "minSingle": 120000
  },
  {
    "hotel": "Gunung Mas",
    "tahun": 2022,
    "maxDouble": 400000,
    "maxSingle": 200000,
    "minDouble": null,
    "minSingle": 200000
  },
  {
    "hotel": "Gading Rejo",
    "tahun": 2022,
    "maxDouble": null,
    "maxSingle": 100000,
    "minDouble": null,
    "minSingle": 100000
  },
  {
    "hotel": "Setiya",
    "tahun": 2022,
    "maxDouble": 280000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 120000
  },
  {
    "hotel": "Surya Yudha",
    "tahun": 2022,
    "maxDouble": 2500000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 350000
  },
  {
    "hotel": "Agung",
    "tahun": 2022,
    "maxDouble": 150000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 100000
  },
  {
    "hotel": "Asri",
    "tahun": 2022,
    "maxDouble": 350000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 150000
  },
  {
    "hotel": "Central",
    "tahun": 2022,
    "maxDouble": 750000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 150000
  },
  {
    "hotel": "Garuda",
    "tahun": 2022,
    "maxDouble": 450000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 100000
  },
  {
    "hotel": "Sokanandi",
    "tahun": 2022,
    "maxDouble": 350000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 150000
  },
  {
    "hotel": "Nyaman",
    "tahun": 2022,
    "maxDouble": 290000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 190000
  },
  {
    "hotel": "Tirta Jadi",
    "tahun": 2022,
    "maxDouble": 250000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 125000
  },
  {
    "hotel": "Tani Jiwo",
    "tahun": 2022,
    "maxDouble": 690000,
    "maxSingle": 200000,
    "minDouble": 470000,
    "minSingle": 120000
  },
  {
    "hotel": "Gunung Mas",
    "tahun": 2023,
    "maxDouble": 400000,
    "maxSingle": 200000,
    "minDouble": null,
    "minSingle": 200000
  },
  {
    "hotel": "Gading Rejo",
    "tahun": 2023,
    "maxDouble": null,
    "maxSingle": 100000,
    "minDouble": null,
    "minSingle": 100000
  },
  {
    "hotel": "Setiya",
    "tahun": 2023,
    "maxDouble": 280000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 120000
  },
  {
    "hotel": "Surya Yudha",
    "tahun": 2023,
    "maxDouble": 2500000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 350000
  },
  {
    "hotel": "Agung",
    "tahun": 2023,
    "maxDouble": 150000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 100000
  },
  {
    "hotel": "Asri",
    "tahun": 2023,
    "maxDouble": 350000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 150000
  },
  {
    "hotel": "Central",
    "tahun": 2023,
    "maxDouble": 750000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 150000
  },
  {
    "hotel": "Garuda",
    "tahun": 2023,
    "maxDouble": 450000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 100000
  },
  {
    "hotel": "Sokanandi",
    "tahun": 2023,
    "maxDouble": 350000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 150000
  },
  {
    "hotel": "Nyaman",
    "tahun": 2023,
    "maxDouble": 290000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 190000
  },
  {
    "hotel": "Tirta Jadi",
    "tahun": 2023,
    "maxDouble": 250000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 125000
  },
  {
    "hotel": "Tani Jiwo",
    "tahun": 2023,
    "maxDouble": 690000,
    "maxSingle": 200000,
    "minDouble": 470000,
    "minSingle": 120000
  },
  {
    "hotel": "Gunung Mas",
    "tahun": 2024,
    "maxDouble": 400000,
    "maxSingle": 200000,
    "minDouble": null,
    "minSingle": 200000
  },
  {
    "hotel": "Gading Rejo",
    "tahun": 2024,
    "maxDouble": null,
    "maxSingle": 100000,
    "minDouble": null,
    "minSingle": 100000
  },
  {
    "hotel": "Setiya",
    "tahun": 2024,
    "maxDouble": 280000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 120000
  },
  {
    "hotel": "Surya Yudha",
    "tahun": 2024,
    "maxDouble": 2500000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 350000
  },
  {
    "hotel": "Agung",
    "tahun": 2024,
    "maxDouble": 150000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 100000
  },
  {
    "hotel": "Asri",
    "tahun": 2024,
    "maxDouble": 350000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 150000
  },
  {
    "hotel": "Central",
    "tahun": 2024,
    "maxDouble": 750000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 150000
  },
  {
    "hotel": "Garuda",
    "tahun": 2024,
    "maxDouble": 450000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 100000
  },
  {
    "hotel": "Sokanandi",
    "tahun": 2024,
    "maxDouble": 350000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 150000
  },
  {
    "hotel": "Nyaman",
    "tahun": 2024,
    "maxDouble": 290000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 190000
  },
  {
    "hotel": "Tirta Jadi",
    "tahun": 2024,
    "maxDouble": 250000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 125000
  },
  {
    "hotel": "Tani Jiwo",
    "tahun": 2024,
    "maxDouble": 690000,
    "maxSingle": 200000,
    "minDouble": 470000,
    "minSingle": 120000
  }
];

// Tarif terbaru per hotel (tahun terakhir yang memiliki data)
export const tarifPenginapanTerbaru = [
  {
    "hotel": "Agung",
    "tahun": 2024,
    "maxDouble": 150000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 100000
  },
  {
    "hotel": "Asri",
    "tahun": 2024,
    "maxDouble": 350000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 150000
  },
  {
    "hotel": "Central",
    "tahun": 2024,
    "maxDouble": 750000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 150000
  },
  {
    "hotel": "Gading Rejo",
    "tahun": 2024,
    "maxDouble": null,
    "maxSingle": 100000,
    "minDouble": null,
    "minSingle": 100000
  },
  {
    "hotel": "Garuda",
    "tahun": 2024,
    "maxDouble": 450000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 100000
  },
  {
    "hotel": "Gunung Mas",
    "tahun": 2024,
    "maxDouble": 400000,
    "maxSingle": 200000,
    "minDouble": null,
    "minSingle": 200000
  },
  {
    "hotel": "Nyaman",
    "tahun": 2024,
    "maxDouble": 290000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 190000
  },
  {
    "hotel": "Setiya",
    "tahun": 2024,
    "maxDouble": 280000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 120000
  },
  {
    "hotel": "Sokanandi",
    "tahun": 2024,
    "maxDouble": 350000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 150000
  },
  {
    "hotel": "Surya Yudha",
    "tahun": 2024,
    "maxDouble": 2500000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 350000
  },
  {
    "hotel": "Tani Jiwo",
    "tahun": 2024,
    "maxDouble": 690000,
    "maxSingle": 200000,
    "minDouble": 470000,
    "minSingle": 120000
  },
  {
    "hotel": "Tirta Jadi",
    "tahun": 2024,
    "maxDouble": 250000,
    "maxSingle": null,
    "minDouble": null,
    "minSingle": 125000
  }
];

// Jumlah rumah makan/restoran per kecamatan per tahun
export const rumahMakanPerKecamatan = {
  "2015": {
    "Banjarmangu": 1,
    "Banjarnegara": 97,
    "Batur": null,
    "Bawang": 14,
    "Kalibening": null,
    "Karangkobar": null,
    "Madukara": 3,
    "Mandiraja": 27,
    "Pagedongan": null,
    "Pagentan": null,
    "Pandanarum": null,
    "Pejawaran": null,
    "Punggelan": null,
    "Purwanegara": 2,
    "Purwareja Klampok": 6,
    "Rakit": null,
    "Sigaluh": 9,
    "Susukan": null,
    "Wanadadi": 1,
    "Wanayasa": 5
  },
  "2016": {
    "Banjarmangu": 1,
    "Banjarnegara": 97,
    "Batur": null,
    "Bawang": 14,
    "Kalibening": null,
    "Karangkobar": null,
    "Madukara": 3,
    "Mandiraja": 27,
    "Pagedongan": null,
    "Pagentan": null,
    "Pandanarum": null,
    "Pejawaran": null,
    "Punggelan": null,
    "Purwanegara": 2,
    "Purwareja Klampok": 6,
    "Rakit": null,
    "Sigaluh": 9,
    "Susukan": null,
    "Wanadadi": 1,
    "Wanayasa": 5
  },
  "2017": {
    "Banjarmangu": 1,
    "Banjarnegara": 97,
    "Batur": null,
    "Bawang": 14,
    "Kalibening": null,
    "Karangkobar": null,
    "Madukara": 3,
    "Mandiraja": 27,
    "Pagedongan": null,
    "Pagentan": null,
    "Pandanarum": null,
    "Pejawaran": null,
    "Punggelan": null,
    "Purwanegara": 2,
    "Purwareja Klampok": 6,
    "Rakit": null,
    "Sigaluh": 9,
    "Susukan": null,
    "Wanadadi": 1,
    "Wanayasa": 5
  },
  "2018": {
    "Banjarmangu": 1,
    "Banjarnegara": 97,
    "Batur": null,
    "Bawang": 14,
    "Kalibening": null,
    "Karangkobar": null,
    "Madukara": 3,
    "Mandiraja": 27,
    "Pagedongan": null,
    "Pagentan": null,
    "Pandanarum": null,
    "Pejawaran": null,
    "Punggelan": null,
    "Purwanegara": 2,
    "Purwareja Klampok": 6,
    "Rakit": null,
    "Sigaluh": 9,
    "Susukan": null,
    "Wanadadi": 1,
    "Wanayasa": 5
  },
  "2019": {
    "Banjarmangu": 1,
    "Banjarnegara": 97,
    "Batur": null,
    "Bawang": 14,
    "Kalibening": null,
    "Karangkobar": null,
    "Madukara": 3,
    "Mandiraja": 27,
    "Pagedongan": null,
    "Pagentan": null,
    "Pandanarum": null,
    "Pejawaran": null,
    "Punggelan": null,
    "Purwanegara": 2,
    "Purwareja Klampok": 6,
    "Rakit": null,
    "Sigaluh": 9,
    "Susukan": null,
    "Wanadadi": 1,
    "Wanayasa": 5
  },
  "2020": {
    "Banjarmangu": 1,
    "Banjarnegara": 97,
    "Batur": null,
    "Bawang": 14,
    "Kalibening": null,
    "Karangkobar": null,
    "Madukara": 3,
    "Mandiraja": null,
    "Pagedongan": null,
    "Pagentan": null,
    "Pandanarum": null,
    "Pejawaran": null,
    "Punggelan": null,
    "Purwanegara": 2,
    "Purwareja Klampok": null,
    "Rakit": null,
    "Sigaluh": 9,
    "Susukan": null,
    "Wanadadi": 1,
    "Wanayasa": 5
  },
  "2021": {
    "Banjarmangu": 9,
    "Banjarnegara": 97,
    "Batur": 29,
    "Bawang": 16,
    "Kalibening": 18,
    "Karangkobar": 18,
    "Madukara": 6,
    "Mandiraja": 30,
    "Pagedongan": 2,
    "Pagentan": null,
    "Pandanarum": null,
    "Pejawaran": null,
    "Punggelan": null,
    "Purwanegara": 9,
    "Purwareja Klampok": 11,
    "Rakit": null,
    "Sigaluh": 14,
    "Susukan": 3,
    "Wanadadi": 27,
    "Wanayasa": 6
  },
  "2022": {
    "Banjarmangu": 9,
    "Banjarnegara": 99,
    "Batur": 29,
    "Bawang": 16,
    "Kalibening": 18,
    "Karangkobar": 18,
    "Madukara": 6,
    "Mandiraja": null,
    "Pagedongan": 2,
    "Pagentan": null,
    "Pandanarum": null,
    "Pejawaran": null,
    "Punggelan": null,
    "Purwanegara": 9,
    "Purwareja Klampok": null,
    "Rakit": null,
    "Sigaluh": 16,
    "Susukan": null,
    "Wanadadi": 27,
    "Wanayasa": 6
  },
  "2023": {
    "Banjarmangu": 9,
    "Banjarnegara": 97,
    "Batur": 28,
    "Bawang": 18,
    "Kalibening": 18,
    "Karangkobar": 20,
    "Madukara": 18,
    "Mandiraja": 31,
    "Pagedongan": 4,
    "Pagentan": 5,
    "Pandanarum": 3,
    "Pejawaran": 1,
    "Punggelan": 7,
    "Purwanegara": 11,
    "Purwareja Klampok": 11,
    "Rakit": 12,
    "Sigaluh": 13,
    "Susukan": 3,
    "Wanadadi": 26,
    "Wanayasa": 7
  },
  "2024": {
    "Banjarmangu": 9,
    "Banjarnegara": 97,
    "Batur": 28,
    "Bawang": 18,
    "Kalibening": 18,
    "Karangkobar": 20,
    "Madukara": 18,
    "Mandiraja": 31,
    "Pagedongan": 4,
    "Pagentan": 5,
    "Pandanarum": 3,
    "Pejawaran": 1,
    "Punggelan": 7,
    "Purwanegara": 11,
    "Purwareja Klampok": 11,
    "Rakit": 12,
    "Sigaluh": 13,
    "Susukan": 3,
    "Wanadadi": 26,
    "Wanayasa": 7
  }
};

// Snapshot rumah makan 2024 (urut terbanyak)
export const rumahMakan2024 = [
  {
    "kecamatan": "Banjarnegara",
    "jumlah": 97
  },
  {
    "kecamatan": "Mandiraja",
    "jumlah": 31
  },
  {
    "kecamatan": "Batur",
    "jumlah": 28
  },
  {
    "kecamatan": "Wanadadi",
    "jumlah": 26
  },
  {
    "kecamatan": "Karangkobar",
    "jumlah": 20
  },
  {
    "kecamatan": "Bawang",
    "jumlah": 18
  },
  {
    "kecamatan": "Kalibening",
    "jumlah": 18
  },
  {
    "kecamatan": "Madukara",
    "jumlah": 18
  },
  {
    "kecamatan": "Sigaluh",
    "jumlah": 13
  },
  {
    "kecamatan": "Rakit",
    "jumlah": 12
  },
  {
    "kecamatan": "Purwanegara",
    "jumlah": 11
  },
  {
    "kecamatan": "Purwareja Klampok",
    "jumlah": 11
  },
  {
    "kecamatan": "Banjarmangu",
    "jumlah": 9
  },
  {
    "kecamatan": "Punggelan",
    "jumlah": 7
  },
  {
    "kecamatan": "Wanayasa",
    "jumlah": 7
  },
  {
    "kecamatan": "Pagentan",
    "jumlah": 5
  },
  {
    "kecamatan": "Pagedongan",
    "jumlah": 4
  },
  {
    "kecamatan": "Pandanarum",
    "jumlah": 3
  },
  {
    "kecamatan": "Susukan",
    "jumlah": 3
  },
  {
    "kecamatan": "Pejawaran",
    "jumlah": 1
  }
];

// Makro BPS Banjarnegara 2018-2024 (+ kabupaten pembanding)
export const bpsMakro = {
  kemiskinan: [
  {
    "tahun": 2018,
    "jumlahRibuan": 141.7,
    "persen": 15.46
  },
  {
    "tahun": 2019,
    "jumlahRibuan": 136.1,
    "persen": 14.76
  },
  {
    "tahun": 2020,
    "jumlahRibuan": 144.95,
    "persen": 15.64
  },
  {
    "tahun": 2021,
    "jumlahRibuan": 150.19,
    "persen": 16.23
  },
  {
    "tahun": 2022,
    "jumlahRibuan": 141.25,
    "persen": 15.2
  },
  {
    "tahun": 2023,
    "jumlahRibuan": 138.99,
    "persen": 14.9
  },
  {
    "tahun": 2024,
    "jumlahRibuan": 137.68,
    "persen": 14.71
  }
],
  pertumbuhan: [
  {
    "tahun": 2018,
    "banjarnegara": 5.67,
    "cilacap": 2.99,
    "purbalingga": 5.42,
    "banyumas": 6.45,
    "wonosobo": 5.06,
    "jawaTengah": 5.3,
    "nasional": 5.17
  },
  {
    "tahun": 2019,
    "banjarnegara": 5.6,
    "cilacap": 2.27,
    "purbalingga": 5.64,
    "banyumas": 6.32,
    "wonosobo": 5.57,
    "jawaTengah": 5.36,
    "nasional": 5.02
  },
  {
    "tahun": 2020,
    "banjarnegara": -1.32,
    "cilacap": -10.28,
    "purbalingga": -1.18,
    "banyumas": -1.65,
    "wonosobo": -1.64,
    "jawaTengah": -2.65,
    "nasional": -2.07
  },
  {
    "tahun": 2021,
    "banjarnegara": 3.26,
    "cilacap": 2.15,
    "purbalingga": 3.19,
    "banyumas": 4,
    "wonosobo": 3.68,
    "jawaTengah": 3.33,
    "nasional": 3.7
  },
  {
    "tahun": 2022,
    "banjarnegara": 5.29,
    "cilacap": 5.15,
    "purbalingga": 5.41,
    "banyumas": 5.86,
    "wonosobo": 5.02,
    "jawaTengah": 5.31,
    "nasional": 5.31
  },
  {
    "tahun": 2023,
    "banjarnegara": 4.98,
    "cilacap": 5.34,
    "purbalingga": 4.51,
    "banyumas": 5.4,
    "wonosobo": 4.3,
    "jawaTengah": 4.98,
    "nasional": 5.05
  },
  {
    "tahun": 2024,
    "banjarnegara": 5.11,
    "cilacap": 2.65,
    "purbalingga": 4.55,
    "banyumas": 5.29,
    "wonosobo": 4.57,
    "jawaTengah": 4.95,
    "nasional": 5.03
  }
],
  ipm: [
  {
    "tahun": 2018,
    "banjarnegara": 66.54,
    "cilacap": 69.56,
    "purbalingga": 68.41,
    "banyumas": 71.3,
    "wonosobo": 67.81,
    "jawaTengah": 71.12,
    "nasional": 71.39
  },
  {
    "tahun": 2019,
    "banjarnegara": 67.34,
    "cilacap": 68.98,
    "purbalingga": 68.99,
    "banyumas": 71.96,
    "wonosobo": 68.27,
    "jawaTengah": 71.73,
    "nasional": 71.92
  },
  {
    "tahun": 2020,
    "banjarnegara": 67.46,
    "cilacap": 70.19,
    "purbalingga": 69.23,
    "banyumas": 72.13,
    "wonosobo": 69.04,
    "jawaTengah": 71.88,
    "nasional": 71.94
  },
  {
    "tahun": 2021,
    "banjarnegara": 67.87,
    "cilacap": 70.66,
    "purbalingga": 69.41,
    "banyumas": 72.59,
    "wonosobo": 69.24,
    "jawaTengah": 72.17,
    "nasional": 73.16
  },
  {
    "tahun": 2022,
    "banjarnegara": 68.62,
    "cilacap": 71.22,
    "purbalingga": 69.8,
    "banyumas": 73.3,
    "wonosobo": 69.69,
    "jawaTengah": 72.8,
    "nasional": 73.77
  },
  {
    "tahun": 2023,
    "banjarnegara": 69.16,
    "cilacap": 72.04,
    "purbalingga": 70.51,
    "banyumas": 73.96,
    "wonosobo": 70.18,
    "jawaTengah": 73.39,
    "nasional": 74.39
  },
  {
    "tahun": 2024,
    "banjarnegara": 69.62,
    "cilacap": 72.55,
    "purbalingga": 70.97,
    "banyumas": 74.52,
    "wonosobo": 70.63,
    "jawaTengah": 73.87,
    "nasional": 75.02
  }
],
  pdrbAkomodasi: [
  {
    "tahun": 2018,
    "rpJuta": 385943.66,
    "persenKontribusi": 1.92
  },
  {
    "tahun": 2019,
    "rpJuta": 427976.87,
    "persenKontribusi": 1.98
  },
  {
    "tahun": 2020,
    "rpJuta": 405064.1,
    "persenKontribusi": 1.87
  },
  {
    "tahun": 2021,
    "rpJuta": 437511.24,
    "persenKontribusi": 1.92
  },
  {
    "tahun": 2022,
    "rpJuta": 522297.91,
    "persenKontribusi": 2.09
  },
  {
    "tahun": 2023,
    "rpJuta": 582537.23,
    "persenKontribusi": 2.14
  },
  {
    "tahun": 2024,
    "rpJuta": 635622.8,
    "persenKontribusi": 2.17
  }
],
  pdrbTotal: [
  {
    "tahun": 2018,
    "totalJuta": 20083035.69
  },
  {
    "tahun": 2019,
    "totalJuta": 21599477.26
  },
  {
    "tahun": 2020,
    "totalJuta": 21694338.97
  },
  {
    "tahun": 2021,
    "totalJuta": 22827887.3
  },
  {
    "tahun": 2022,
    "totalJuta": 24996481.74
  },
  {
    "tahun": 2023,
    "totalJuta": 27192309.08
  },
  {
    "tahun": 2024,
    "totalJuta": 29231223.28
  }
],
};

// Retribusi pariwisata BPPKAD: target vs realisasi (Rupiah) + capaian %
export const retribusiPariwisata = [
  {
    "tahun": 2018,
    "jenis": "Ret. Tempat Rekreasi dan O R",
    "target": 5817222000,
    "realisasi": 8324048000,
    "persen": 143.09
  },
  {
    "tahun": 2019,
    "jenis": "Ret. Tempat Rekreasi dan O R",
    "target": 11488250000,
    "realisasi": 12969890000,
    "persen": 112.9
  },
  {
    "tahun": 2020,
    "jenis": "Ret. Tempat Rekreasi dan O R",
    "target": 8975000000,
    "realisasi": 8379243000,
    "persen": 93.36
  },
  {
    "tahun": 2021,
    "jenis": "Ret. Tempat Rekreasi dan O R",
    "target": 13906650000,
    "realisasi": 13814633000,
    "persen": 99.34
  },
  {
    "tahun": 2022,
    "jenis": "Ret. Tempat Rekreasi dan O R",
    "target": 18968059000,
    "realisasi": 20062898000,
    "persen": 105.77
  },
  {
    "tahun": 2023,
    "jenis": "Ret. Tempat Rekreasi dan O R",
    "target": 16976300000,
    "realisasi": 21460615000,
    "persen": 126.42
  },
  {
    "tahun": 2024,
    "jenis": "Retribusi Pelayanan Tempat Rekreasi, Pariwisata, dan Olahraga",
    "target": 29199835000,
    "realisasi": 31311001724,
    "persen": 107.23
  }
];

// Analisis kecamatan RIIL (menggantikan kecamatanAnalytics fabrikasi)
export const kecamatanRiil = [
  {
    "kecamatan": "Banjarmangu",
    "objekWisataCount": 3,
    "totalPengunjung": 9016,
    "rumahMakanCount": 9
  },
  {
    "kecamatan": "Banjarnegara",
    "objekWisataCount": 11,
    "totalPengunjung": 174355,
    "rumahMakanCount": 97
  },
  {
    "kecamatan": "Batur",
    "objekWisataCount": 25,
    "totalPengunjung": 1113654,
    "rumahMakanCount": 28
  },
  {
    "kecamatan": "Bawang",
    "objekWisataCount": 0,
    "totalPengunjung": 0,
    "rumahMakanCount": 18
  },
  {
    "kecamatan": "Kalibening",
    "objekWisataCount": 1,
    "totalPengunjung": 0,
    "rumahMakanCount": 18
  },
  {
    "kecamatan": "Karangkobar",
    "objekWisataCount": 0,
    "totalPengunjung": 0,
    "rumahMakanCount": 20
  },
  {
    "kecamatan": "Madukara",
    "objekWisataCount": 2,
    "totalPengunjung": 0,
    "rumahMakanCount": 18
  },
  {
    "kecamatan": "Mandiraja",
    "objekWisataCount": 8,
    "totalPengunjung": 0,
    "rumahMakanCount": 31
  },
  {
    "kecamatan": "Pagedongan",
    "objekWisataCount": 0,
    "totalPengunjung": 0,
    "rumahMakanCount": 4
  },
  {
    "kecamatan": "Pagentan",
    "objekWisataCount": 2,
    "totalPengunjung": 0,
    "rumahMakanCount": 5
  },
  {
    "kecamatan": "Pandanarum",
    "objekWisataCount": 0,
    "totalPengunjung": 0,
    "rumahMakanCount": 3
  },
  {
    "kecamatan": "Pejawaran",
    "objekWisataCount": 4,
    "totalPengunjung": 0,
    "rumahMakanCount": 1
  },
  {
    "kecamatan": "Punggelan",
    "objekWisataCount": 2,
    "totalPengunjung": 0,
    "rumahMakanCount": 7
  },
  {
    "kecamatan": "Purwanegara",
    "objekWisataCount": 5,
    "totalPengunjung": 0,
    "rumahMakanCount": 11
  },
  {
    "kecamatan": "Purwareja Klampok",
    "objekWisataCount": 4,
    "totalPengunjung": 0,
    "rumahMakanCount": 11
  },
  {
    "kecamatan": "Rakit",
    "objekWisataCount": 1,
    "totalPengunjung": 0,
    "rumahMakanCount": 12
  },
  {
    "kecamatan": "Sigaluh",
    "objekWisataCount": 13,
    "totalPengunjung": 221504,
    "rumahMakanCount": 13
  },
  {
    "kecamatan": "Susukan",
    "objekWisataCount": 2,
    "totalPengunjung": 0,
    "rumahMakanCount": 3
  },
  {
    "kecamatan": "Wanadadi",
    "objekWisataCount": 1,
    "totalPengunjung": 1462,
    "rumahMakanCount": 26
  },
  {
    "kecamatan": "Wanayasa",
    "objekWisataCount": 2,
    "totalPengunjung": 0,
    "rumahMakanCount": 7
  }
];

// Catatan kualitas data Fase B
export const catatanKualitasPhaseB = [
  "Tarif penginapan: sumber DISPARBUD 2017-2024 (CSV). Tahun 2020 seluruhnya kosong (' - ') di sumber. Beberapa nama hotel tertulis dengan spasi antar-huruf di sumber (mis. 'S e t i y a') dan telah dinormalisasi.",
  "Tarif penginapan: 1 anomali sumber terdeteksi - Surya Yudha 2018 minDouble (600.000) > maxDouble (160.000); nilai ditampilkan apa adanya dengan penanda.",
  "Rumah makan/restoran per kecamatan: sumber DISPARBUD 2015-2024 (CSV). 20 kecamatan. Nilai ' - ' (null) muncul di beberapa kecamatan/tahun awal.",
  "Retribusi pariwisata: sumber BPPKAD 'Ret. Tempat Rekreasi dan O R' 2018-2023; tahun 2024 nomenklatur berubah menjadi 'Retribusi Pelayanan Tempat Rekreasi, Pariwisata, dan Olahraga'. Target & realisasi dalam Rupiah; persentase capaian dinormalisasi (sumber campuran '143.09' dan '107.23%').",
  "BPS makro (kemiskinan, pertumbuhan ekonomi, IPM, PDRB): sumber BPS Banjarnegara 2018-2024 (CSV), disertai kabupaten pembanding. Sumber BPS menulis 'Jawa Tegah' (typo) - dinormalisasi ke Jawa Tengah.",
  "PDRB sektor 'Penyediaan Akomodasi dan Makan Minum' = proksi kontribusi ekonomi pariwisata; nilai dalam juta Rupiah (harga berlaku).",
  "kecamatanRiil: objekWisataCount & totalPengunjung diagregasi dari data objek wisata riil (Fase A); rumahMakanCount dari DISPARBUD 2024. Metrik lama yang tidak memiliki sumber riil (tpsScore, multiplierIndex, okupansiAvg, homestayCapacity, carryingCapacityRisk, padRetribusi per kecamatan) TIDAK dipertahankan.",
  "TARIF minDouble>maxDouble: Surya Yudha 2018 min=600000 max=160000"
];
