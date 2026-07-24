# 🚀 Pengembangan Aplikasi Analitik Pariwisata Banjarnegara

> **Tanggal Analisis:** 24 Juli 2026
> **Aplikasi:** Dasbor Analitik Pariwisata, Cagar Budaya & Peluang Investasi Banjarnegara
> **Lokasi Proyek:** `i:\pariwisatav2`
> **Sumber Data Utama:** https://opendata.banjarnegarakab.go.id/

---

## 📌 Ringkasan Aplikasi Saat Ini

### Tech Stack
- **React 18** + **Vite 6** + **Tailwind CSS 4** + **Leaflet** + **Recharts**

### 7 Tab Fitur yang Sudah Ada

| Tab | Fitur | Deskripsi |
|-----|-------|-----------|
| 1 | Dashboard Utama | Stat cards, peta WebGIS, grafik tren kunjungan, ranking destinasi, tabel matriks |
| 2 | Analisa Lanjutan | Tourism Potential Score (TPS), seasonality, economic multiplier, scatter plot, indeks fasilitas |
| 3 | Peta Tematik | 4 rute wisata tematik dengan routing OSRM |
| 4 | Event & Rekomendasi | Kalender festival, 8 rekomendasi kebijakan data-driven |
| 5 | Cagar Budaya | 10 cagar budaya, 5 OPK/WBTB, katalog detail, modal detail |
| 6 | Investasi | Kalkulator ROI, 4 katalog proyek investasi dengan proyeksi |
| 7 | Wisata Lainnya | 48+ destinasi desa dari Open Data, peta clustering, filter kategori |

---

## 📦 Dataset Open Data Banjarnegara yang Relevan untuk Pariwisata

Berikut dataset yang **sudah tersedia** di opendata.banjarnegarakab.go.id dan relevan untuk pengembangan aplikasi:

| No | Dataset | Sumber/Instansi | Tahun Data | Format | Relevansi |
|----|---------|-----------------|------------|--------|-----------|
| 1 | Data Pengunjung Wisata per Obyek Wisata | Disparbud | 2013-2025 | CSV/XLSX | ✅ SUDAH DIGUNAKAN |
| 2 | Data Curah Hujan, Hari Hujan, Penyinaran | BMKG | 2017-2024 | CSV | 🔥 BARU |
| 3 | Jumlah Kasus Penyakit per Kecamatan | Dinkes | - | API | 🔥 BARU |
| 4 | Peristiwa Tanah Longsor per Kecamatan | BPBD | 2018-2023 | CSV | 🔥 BARU |
| 5 | Data Penduduk Miskin per Kecamatan | BPS | 2018-2024 | CSV | 🔥 BARU |
| 6 | Realisasi Fisik & Keuangan APBD per Bulan | Sekda | - | CSV | 🔥 BARU |
| 7 | Jumlah Perusahaan & Tenaga Kerja | Disperindagkop-UKM | 2018-2025 | CSV | 🔥 BARU |
| 8 | Data Sarana Perdagangan | Disperindagkop-UKM | 2018-2025 | CSV | 🔥 BARU |
| 9 | Banyaknya Pasar per Jenis | Disperindagkop-UKM | 2017-2025 | CSV | 🔥 BARU |
| 10 | Jumlah Koperasi Aktif | Disperindagkop-UKM | 2022-2025 | CSV | 🔥 BARU |
| 11 | Jumlah Desa Kelurahan | Dispermades | - | CSV/XLSX | 🔥 BARU |
| 12 | Data Penduduk per Kecamatan | BPS | - | - | 🔥 BARU |

**Total 12 dataset tersedia**, 1 sudah digunakan, **11 dataset baru bisa diintegrasikan**.

---

## 🎯 PLANNING FITUR BARU YANG BISA DITAMBAHKAN

### 🔴 PRIORITAS TINGGI (High Impact, Relatif Mudah Diimplementasi)

#### Fitur 1: **Smart Weather Dashboard for Tourism**

**Sumber Data:** Dataset Curah Hujan, Hari Hujan, Penyinaran (BMKG)

**Deskripsi:**
Integrasi data cuaca ke dalam analisa pariwisata untuk membantu wisatawan dan pemerintah mengambil keputusan berbasis kondisi iklim.

**Konten Fitur:**
- **"Best Time to Visit" indicator** per destinasi berdasarkan pola cuaca (curah hujan < 100mm/bulan + penyinaran > 6 jam/hari = ideal)
- **Alert system** untuk destinasi outdoor: notifikasi risiko cuaca (rafting, trekking, camping)
- **Heatmap curah hujan per kecamatan** di peta WebGIS (overlay layer baru di Leaflet)
- **Chart korelasi**: hari hujan vs penurunan kunjungan di chart interaktif
- **Smart recommendation**: saran waktu terbaik berkunjung berdasarkan data historis BMKG

**Integrasi dengan Fitur Existing:**
- Data cuaca ditampilkan di sisi kanan "Seasonality Analysis" di tab Analisa Lanjutan
- Icon cuaca ditambahkan di marker destinasi di TourismMap
- Data curah hujan digunakan untuk refine skor carrying capacity (musim hujan = kapasitas lebih rendah)

**Implementasi Teknis:**
- Buat komponen `SmartWeatherView.jsx`
- Tambah fungsi `calculateWeatherSuitabilityScore()` di `analytics.js`
- Tambah layer GeoJSON curah hujan di `TourismMap.jsx`
- Data BMKG disimpan di `src/data/bmkgData.js`

**Contoh Kalkulasi Weather Score:**
```
WeatherSuitability = (CurahHujanNormalized × 0.3) + (HariHujanNormalized × 0.2) + (PenyinaranNormalized × 0.5)
```

---

#### Fitur 2: **Bencana & Risiko Wisata (Disaster Risk Map)**

**Sumber Data:** Peristiwa Tanah Longsor per Kecamatan (BPBD) + Curah Hujan (BMKG)

**Deskripsi:**
Memetakan risiko bencana di sekitar destinasi wisata untuk keamanan wisatawan dan perencanaan mitigasi.

**Konten Fitur:**
- **Peta WebGIS layer bencana**: overlay kejadian longsor di atas peta wisata (layer toggle di Leaflet)
- **Risk index per destinasi**: kalkulasi proximity ke zona longsor + intensitas curah hujan
- **Timeline tren longsor 2018-2023** per kecamatan (bar chart horizontal)
- **"Safe Season" recommendation**: bulan dengan risiko longsor terendah di setiap kecamatan
- **Alert panel** untuk destinasi di zona rawan: Madukara, Pagedongan, Pandanarum, Banjarmangu

**Integrasi dengan Fitur Existing:**
- Layer bencana toggle-able di TourismMap.jsx (sidebar panel)
- Risk indicator ditampilkan di DestinasiDetailModal
- Risk score dimasukkan ke kalkulasi Tourism Potential Score (TPS)

**Implementasi Teknis:**
- Buat komponen `DisasterRiskView.jsx`
- Tambah fungsi `calculateDisasterRiskScore()` di `analytics.js`
- Tambah layer GeoJSON longsor di `TourismMap.jsx`
- Data BPBD disimpan di `src/data/bpbdData.js`

**Contoh Kalkulasi Risk Score:**
```
RiskScore = (jumlahLongsor × 0.6) + (curahHujanPuncak × 0.2) + (topografi × 0.2)
```

---

#### Fitur 3: **Ekonomi Kreatif & UMKM Pariwisata Tracker**

**Sumber Data:** Jumlah Koperasi Aktif, Sarana Perdagangan, Pasar, Tenaga Kerja (Disperindagkop-UKM)

**Deskripsi:**
Dashboard komprehensif untuk memantau pertumbuhan UMKM dan ekonomi kreatif yang terkait pariwisata.

**Konten Fitur:**
- **Dashboard UMKM**: jumlah koperasi, pasar, sarana dagang per kecamatan (bar chart)
- **Tren pertumbuhan**: UMKM vs kunjungan wisatawan (dual-axis chart, multi-tahun)
- **Mapping destinasi belanja**: lokasi pasar tradisional sebagai destinasi wisata belanja
- **Economic impact per kecamatan**: dampak pariwisata terhadap UMKM lokal (multiplier index)
- **Rekomendasi pengembangan**: kecamatan prioritas untuk pembinaan UMKM wisata

**Integrasi dengan Fitur Existing:**
- Ditambahkan di tab baru "Ekonomi Kreatif" atau integrasi ke tab Investasi
- Data koperasi/pasar ditampilkan di tabel matriks destinasi di Dashboard Utama
- Economic impact diperkaya dengan data tenaga kerja dari Disperindagkop

**Implementasi Teknis:**
- Buat komponen `UMKMTrackerView.jsx`
- Tambah fungsi `calculateEconomicImpact()` di `analytics.js`
- Tambah data di `src/data/umkmData.js`
- Tambah marker pasar di TourismMap.jsx

**Contoh Kalkulasi Impact:**
```
UMKM_Economic_Impact = (jumlahKoperasi × 0.3) + (jumlahPasar × 0.25) + (saranaDagang × 0.25) + (tenagaKerja × 0.2)
```

---

### 🟡 PRIORITAS SEDANG (High Value, Butuh Data Collection)

#### Fitur 4: **Kesehatan Wisatawan & Fasilitas Medis**

**Sumber Data:** Jumlah Kasus Penyakit per Kecamatan (Dinkes)

**Deskripsi:**
Analisa pola kesehatan masyarakat dan wisatawan untuk kesiapan layanan medis di destinasi wisata.

**Konten Fitur:**
- **Peta sebaran penyakit per kecamatan** (choropleth map di Leaflet)
- **Korelasi jenis penyakit dengan jenis destinasi**: misal penyakit pernapasan tinggi di Dieng karena dingin
- **Indikator kesiapan kesehatan destinasi**: scoring berdasarkan prevalensi penyakit + jarak ke fasilitas medis
- **Seasonal health alert**: penyakit yang meningkat di musim hujan vs kemarau
- **Recommendation panel**: saran kesehatan per destinasi (masker dingin, anti nyamuk, dll)

**Integrasi dengan Fitur Existing:**
- Ditampilkan di tab baru "Kesehatan Wisata" atau integrasi ke fitur Bencana
- Health indicator ditampilkan di DestinasiDetailModal bersama carrying capacity

**Implementasi Teknis:**
- Buat komponen `HealthDashboard.jsx`
- Tambah fungsi `calculateHealthReadiness()` di `analytics.js`
- Data Dinkes disimpan di `src/data/healthData.js`
- Choropleth layer di TourismMap.jsx

---

#### Fitur 5: **Dampak Pariwisata terhadap Pengentasan Kemiskinan**

**Sumber Data:** Data Penduduk Miskin per Kecamatan (BPS) + Data Pengunjung Wisata

**Deskripsi:**
Analisa korelasi antara pertumbuhan pariwisata dan penurunan kemiskinan untuk mengukur inklusivitas sektor wisata.

**Konten Fitur:**
- **Scatter plot**: jumlah wisatawan vs persentase penduduk miskin per kecamatan
- **Correlation analysis**: apakah pariwisata berhasil mengurangi kemiskinan? (Pearson coefficient)
- **Radar chart**: kecamatan dengan pariwisata tinggi vs kemiskinan rendah
- **"Pariwisata Inklusif Index"**: skor seberapa besar manfaat wisata ke masyarakat kurang mampu
- **Rekomendasi**: destinasi prioritas untuk program desa binaan

**Integrasi dengan Fitur Existing:**
- Ditambahkan di tab Analisa Lanjutan setelah TPS dan Seasonality
- Inklusif Index ditampilkan di_stat card_ Dashboard Utama

**Implementasi Teknis:**
- Buat komponen `PovertyImpactView.jsx`
- Tambah fungsi `calculateInclusiveTourismIndex()` di `analytics.js`
- BPS data disimpan di `src/data/kemiskinanData.js`
- Scatter plot menggunakan Recharts ScatterChart

---

#### Fitur 6: **Anggaran & Efisiensi APBD Pariwisata**

**Sumber Data:** Realisasi Fisik & Keuangan APBD per Bulan (Sekda)

**Deskripsi:**
Dashboard monitoring anggaran dan realisasi belanja bidang pariwisata untuk transparansi dan akuntabilitas.

**Konten Fitur:**
- **Dashboard anggaran**: realisasi per bulan vs target (line chart kumulatif)
- **Efficiency ratio**: PAD vs anggaran pariwisata (widget stat card)
- **Breakdown belanja**: infrastruktur wisata vs promosi vs operasional (pie chart)
- **Timeline visual realisasi**: progress bar per bulan
- **Predictive**: proyeksi realisasi akhir tahun (line chart + confidence interval)

**Integrasi dengan Fitur Existing:**
- Ditambahkan di tab baru "APBD & Anggaran" atau integrasi ke tab Investasi
- Efficiency ratio ditampilkan di Dashboard Utama stat cards

**Implementasi Teknis:**
- Buat komponen `APBDTrackerView.jsx`
- Tambah fungsi `calculateBudgetEfficiency()` di `analytics.js`
- Data Sekda disimpan di `src/data/apbdData.js`
- Chart menggunakan Recharts ComposedChart

---

### 🟢 PRIORITAS RENDAH (Nice to Have, Complex)

#### Fitur 7: **Multi-Source Data Integration Hub**

**Deskripsi:**
Halaman agregator yang menampilkan semua dataset Open Data Banjarnegara dalam satu views dengan kemampuan download langsung.

**Konten Fitur:**
- Halaman "Data Hub" dengan tabel dataset + filter + search
- Download langsung CSV/XLSX dari API Open Data Banjarnegara (CKAN API)
- API endpoint preview untuk developer
- Dataset request tracking (status pengajuan data via formulir Open Data)
- Data freshness indicator (last updated per dataset)

**Implementasi Teknis:**
- Integrasikan CKAN API: `https://opendata.banjarnegarakab.go.id/api/3/action/package_list`
- Buat komponen `DataHubView.jsx`
- Pagination + search functionality
- Auto-fetch metadata datasets

---

#### Fitur 8: **Tourist Demographics & Behavior Analytics**

**Deskripsi:**
Analisa mendalam tentang profil demografi wisatawan dan pola perilaku berkunjung.

**Konten Fitur:**
- Estimasi demografi wisatawan berdasarkan pola kunjungan
- Analisis origin-destination (domestik vs mancanegara per bulan)
- Traveler type segmentation (family, solo, group, adventure)
- Predictive demand forecasting per destinasi (time series projection)

**Implementasi Teknis:**
- Perlu data tambahan: usia wisatawan, asal daerah, durasi kunjungan
- Bisa request ke Disparbud via Open Data platform
- Gunakan Recharts untuk visualisasi segmen
- Komponen: `DemographicsView.jsx`

---

#### Fitur 9: **Agrowisata & Culinary Tourism Explorer**

**Sumber Data:** Data Sarana Perdagangan, Pasar, Koperasi + Data Penduduk Miskin

**Deskripsi:**
Peta interaktif dan panduan untuk agrowisata (kebun teh, salak, kopi) dan wisata kuliner khas Banjarnegara.

**Konten Fitur:**
- **Peta destinasi agrowisata**: kebun teh, kebun salak, perkebunan kopi berdasarkan data koperasi/UMKM
- **Peta kuliner tour**: warung, pasar tradisional, sentra dawet Ayu
- **Rating berbasis ketersediaan**: keragaman kuliner dan agrowisata per kecamatan
- **Rute kuliner interaktif**: custom route di TourismMap dengan marker kuliner
- **Seasonal calendar**: waktu terbaik untuk agrowisata (panen salak, musim kopi)

**Implementasi Teknis:**
- Tambah data agrowisata di `pariwisataData.js`
- Tambah marker kuliner + agrowisata di TourismMap.jsx
- Buat komponen `AgrowisataExplorer.jsx`
- Rute baru di `ruteWisataTematik`

---

#### Fitur 10: **Investment Attractiveness Score (IAS)**

**Deskripsi:**
Komposit score per kecamatan untuk membantu investor menentukan lokasi investasi pariwisata yang optimal.

**Konten Fitur:**
- **IAS per kecamatan**: gabungan TPS, multiplier, aksesibilitas, ekonomi, risiko bencana
- **Top 5 kecamatan terbaik** untuk investasi pariwisata (ranking + penjelasan)
- **Interactive investment calculator**: scenario planning dengan berbagai parameter
- **Benchmarking**: perbandingan per kecamatan terhadap standar nasional
- **Risk-adjusted return**: proyeksi ROI dengan penyesuaian risiko bencana dan ekonomi

**Integrasi dengan Fitur Existing:**
- Enhance existing `InvestorAnalyticsView.jsx` dengan scoring lebih komprehensif
- IAS ditampilkan di Dashboard Utama sebagai highlight

**Implementasi Teknis:**
- Kalkulasi IAS di `analytics.js`:
```
IAS = (TPS × 0.25) + (multiplier × 0.2) + (aksesibilitas × 0.2) + (pengurangan_kemiskinan × 0.15) + (stabilitas_bencana × 0.2)
```
- Komponen: `IASDashboard.jsx`
- Data dari semua dataset yang terintegrasi

---

## 📋 RINGKASAN PRIORITAS IMPLEMENTASI

| No | Fitur | Dataset Utama | Prioritas | Kompleksitas | Dependencies |
|----|-------|---------------|-----------|--------------|--------------|
| 1 | Smart Weather Dashboard | BMKG | 🔴 HIGH | Medium | Existing Weather data |
| 2 | Bencana & Risiko Wisata | BPBD + BMKG | 🔴 HIGH | Medium | Existing Disaster data |
| 3 | UMKM & Ekonomi Kreatif Tracker | Disperindagkop | 🔴 HIGH | Medium-High | Existing UMKM data |
| 4 | Kesehatan Wisatawan | Dinkes | 🟡 MEDIUM | Low-Medium | Health data request |
| 5 | Dampak Pariwisata vs Kemiskinan | BPS + Disparbud | 🟡 MEDIUM | High | Multi-source integration |
| 6 | APBD Pariwisata Tracker | Sekda | 🟡 MEDIUM | Low | Existing APBD data |
| 7 | Data Hub Integration | CKAN API | 🟢 LOW | High | API integration |
| 8 | Demographics & Behavior | BPS + Disparbud | 🟢 LOW | High | New data collection |
| 9 | Agrowisata & Culinary Explorer | Multi-source | 🟢 LOW | Medium | New data entry |
| 10 | Investment Attractiveness Score | All datasets | 🟢 LOW | Medium | All integrations complete |

---

## 💡 REKOMENDASI FASE IMPLEMENTASI

### Fase 1: Quick Wins (Dataset sudah tersedia, tidak perlu request baru)
| Fitur | Estimasi |
|-------|----------|
| 1. Smart Weather Dashboard | BMKG data tersedia, integrate ke seasonality |
| 2. Bencana & Risiko Wisata | BPBD data tersedia, add layer ke peta |
| **Total** | **2 fitur, 3 dataset baru** |

### Fase 2: Core Features (Data collection via Open Data request)
| Fitur | Estimasi |
|-------|----------|
| 3. UMKM & Ekonomi Kreatif Tracker | 4 dataset dari Disperindagkop |
| 6. APBD Pariwisata Tracker | 1 dataset dari Sekda |
| **Total** | **2 fitur, 5 dataset baru** |

### Fase 3: Advanced Analytics (Multi-source integration)
| Fitur | Estimasi |
|-------|----------|
| 4. Kesehatan Wisatawan | 1 dataset dari Dinkes |
| 5. Dampak Pariwisata vs Kemiskinan | 2 dataset (BPS + Disparbud) |
| 10. Investment Attractiveness Score | All datasets |
| **Total** | **3 fitur, multi-source** |

### Fase 4: Future Enhancements (Nice to have)
| Fitur | Estimasi |
|-------|----------|
| 7. Data Hub Integration | CKAN API integration |
| 8. Demographics & Behavior | New data collection |
| 9. Agrowisata & Culinary Explorer | New data entry |
| **Total** | **3 fitur, mixed** |

---

## 🔗 API Open Data Banjarnegara

Base URL: `https://opendata.banjarnegarakab.go.id/api/3/action/`

**Endpoints yang bisa digunakan:**
```
package_list              # List semua dataset
package_show?id={id}      # Detail dataset tertentu
resource_list?id={id}     # List resource (CSV, XLSX, PDF)
resource_show?id={id}     # Detail resource
organization_show?id={id} # Detail instansi penyedia
```

**Dataset IDs yang sudah teridentifikasi:**
| Dataset | Package ID |
|---------|------------|
| Pengunjung Wisata | `1d291aa2-0f65-4305-bc25-d5593eaef479` |
| Curah Hujan BMKG | `cef016ce-7cc1-4521-a105-9fdc8f1fb678` |
| Kasus Penyakit | `5644d9b5-3635-422a-ade6-4497104a1c39` |
| Tanah Longsor | `77f938d2-5ae2-43ea-a155-c4c91b9a450f` |
| Penduduk Miskin | `45389786-1c02-426e-87e2-532598fb1170` |
| APBD | `a1219dfb-113a-42ad-b5a1-fb1aa4efe063` |

---

## 🐛 Bug yang Ditemukan (bug.md)

### Prioritas P1 (Kritis - Harus Diperbaiki Dahulu):
1. **Teks Cyrillic/Rusia** di `App.jsx:631` — "EFЕКТИВНОСТЬ" → "DAMPAK"
2. **Typo "Geothermai"** di `pariwisataData.js:230` → "Geothermal"
3. **Kecamatan tidak konsisten** — "Singomerto", "Kejajar" tidak ada di `kecamatanAnalytics`
4. **Class Tailwind `p-4.5`** tidak valid di `AdditionalDestinationsView.jsx:409`

### Prioritas P2 (Medium - Unused Imports):
5. CagarBudayaView.jsx — 8 unused imports
6. InvestorAnalyticsView.jsx — 6 unused imports
7. AdditionalDestinationsView.jsx — 2 unused imports
8. TourismMap.jsx — 3 unused imports
9. ui.jsx — 10 unused imports

### Prioritas P3 (Low - Code Cleanliness):
10. Import React tidak diperlukan di semua komponen
11. Inconsistent casing nama kecamatan

---

*Catatan: Dokumen ini bersifat dinamis dan akan diperbarui seiring perkembangan implementasi.*
