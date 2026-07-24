# 🐛 Laporan Bug — Dasbor Analitik Pariwisata Banjarnegara

> **Tanggal Analisis:** 24 Juli 2026
> **Aplikasi:** Dasbor Analitik Pariwisata, Cagar Budaya & Peluang Investasi Banjarnegara
> **Stack:** React 18 + Vite + Tailwind CSS 4 + Leaflet + Recharts

---

## 🔴 BUG KRITIS (Mempengaruhi Fungsionalitas/Tampilan)

### 1. Teks Cyrillic/Rusia pada UI
- **Lokasi:** `src/App.jsx:631`
- **Kode Bermasalah:**
  ```jsx
  <span className="text-[10px] font-bold text-emerald-900 uppercase block">
    TOTAL EFЕКТИВНОСТЬ EKONOMI (INDIRECT & INDUCED)
  </span>
  ```
- **Masalah:** Kata **"EFЕКТИВНОСТЬ"** adalah bahasa Rusia (Cyrillic), bukan bahasa Indonesia. Seharusnya menggunakan "DAMPAK EKONOMI" atau "EFEK EKONOMI".
- **Dampak:** Tampilan tidak profesional, pengguna Indonesia tidak mengerti maksudnya.

### 2. Typo Nama Kategori "Geothermai"
- **Lokasi:** `src/data/pariwisataData.js:230`
- **Kode Bermasalah:**
  ```js
  kategori: "Alam & Geothermai",
  ```
- **Masalah:** Seharusnya **"Alam & Geothermal"** (bukan "Geothermai").
- **Dampak:** Mempengaruhi filter kategori dan tampilan di kartu destinasi.

### 3. Data Kecamatan Tidak Konsisten
- **Lokasi:** `src/data/pariwisataData.js`
- **Masalah:**
  - `objekWisata` menggunakan `kecamatan: "singomerto"` (lowercase) dan `kecamatan: "kejajar"` — tetapi kedua nama ini **tidak ada** di `kecamatanAnalytics`.
  - `kecamatanAnalytics` hanya memiliki **19 kecamatan**, sementara `metaPariwisata.totalKecamatan` menyatakan **20**.
  - **"Kejajar"** sebenarnya adalah kecamatan di **Kabupaten Wonosobo**, bukan Banjarnegara.
- **Dampak:**
  - Destinasi dengan kecamatan "Singomerto" dan "Kejajar" tidak muncul di radar chart, TPS ranking, atau analitik per kecamatan.
  - Data destinasi `Telaga Warna & Telaga Pengilon` (kec. Kejajar) seharusnya masuk ke kecamatan yang benar atau dihapus.

### 4. Class Tailwind Tidak Valid `p-4.5`
- **Lokasi:** `src/components/AdditionalDestinationsView.jsx:409`
- **Kode Bermasalah:**
  ```jsx
  className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm ..."
  ```
- **Masalah:** `p-4.5` **bukan class Tailwind yang valid**. Tailwind hanya mendukung skala `p-4` (1rem) atau `p-5` (1.25rem), tidak ada `p-4.5`.
- **Dampak:** Padding tidak teraplikasi, tata letak bisa terlihat tidak rapi.

---

## 🟡 BUG SEDANG (Unused Imports — Membengkakkan Bundle Size)

### 5. CagarBudayaView.jsx — Import Tidak Terpakai
- **Lokasi:** `src/components/CagarBudayaView.jsx`
- **Import dari lucide-react yang tidak dipakai di JSX:**
  - `AlertCircle`, `FileText`, `Printer`, `Calendar`, `Layers`, `ArrowUpRight`, `ShieldAlert`, `Users`
- **Import dari recharts yang tidak dipakai:**
  - `PieChart`, `Pie` (tidak pernah digunakan di JSX)

### 6. InvestorAnalyticsView.jsx — Import Tidak Terpakai
- **Lokasi:** `src/components/InvestorAnalyticsView.jsx`
- **Import dari lucide-react yang tidak dipakai:**
  - `TrendingUp`, `DollarSign`, `Briefcase`
- **Import dari recharts yang tidak dipakai:**
  - `BarChart`, `Bar`, `Cell` (hanya `LineChart` yang digunakan)

### 7. AdditionalDestinationsView.jsx — Import Tidak Terpakai
- **Lokasi:** `src/components/AdditionalDestinationsView.jsx`
- **Import dari lucide-react yang tidak dipakai:**
  - `BarChart2`, `CheckCircle2`
- **Import dari recharts yang tidak dipakai:**
  - `Legend`

### 8. TourismMap.jsx — Import Tidak Terpakai
- **Lokasi:** `src/components/TourismMap.jsx`
- **Import dari lucide-react yang tidak dipakai:**
  - `MapPin`, `ShieldAlert`, `Route`

### 9. ui.jsx — Banyak Import Tidak Terpakai
- **Lokasi:** `src/components/ui.jsx`
- **Import dari lucide-react yang tidak dipakai:**
  - `Users`, `DollarSign`, `Star`, `Activity`, `Compass`, `Sparkles`, `Printer`, `Calendar`, `Layers`, `ArrowUpRight`

---

## 🟢 BUG RINGAN

### 10. Import React Tidak Diperlukan (React 18+)
- **Lokasi:** Semua file komponen:
  - `src/components/ui.jsx`
  - `src/components/Footer.jsx`
  - `src/components/CagarBudayaView.jsx`
  - `src/components/InvestorAnalyticsView.jsx`
  - `src/components/AdditionalDestinationsView.jsx`
  - `src/components/TourismMap.jsx`
- **Kode Bermasalah:**
  ```js
  import React from "react";
  ```
- **Masalah:** `import React` tidak diperlukan lagi sejak React 17/18 dengan JSX transform baru (otomatis oleh Vite).
- **Dampak:** Tidak mempengaruhi fungsionalitas, hanya kebersihan kode.

### 11. Inconsistent Casing Nama Kecamatan
- **Lokasi:** `src/data/pariwisataData.js`
- **Masalah:**
  - `objekWisata` menggunakan **lowercase**: `"batur"`, `"banjarnegara"`, `"singomerto"`, `"kejajar"`
  - `kecamatanAnalytics` menggunakan **Title Case**: `"Batur"`, `"Banjarnegara"`
- **Catatan:** Saat ini terselamatkan oleh `.toLowerCase()` di filter, tetapi tetap tidak konsisten dan bisa menyebabkan bug jika ada perubahan kode di masa depan.

---

## 📋 TABEL PRIORITAS PERBAIKAN

| Prioritas | Bug | File | Perbaikan |
|-----------|-----|------|-----------|
| 🔴 **P1** | Teks Cyrillic | `App.jsx:631` | Ganti "EFЕКТИВНОСТЬ" → "DAMPAK" |
| 🔴 **P1** | Typo Geothermai | `pariwisataData.js:230` | Ganti "Geothermai" → "Geothermal" |
| 🔴 **P1** | Kecamatan tidak konsisten | `pariwisataData.js` | Perbaiki nama kecamatan atau tambah data kecamatan yang hilang |
| 🔴 **P1** | Class `p-4.5` | `AdditionalDestinationsView.jsx:409` | Ganti dengan `p-4` atau `p-5` |
| 🟡 **P2** | Unused imports | Semua file komponen | Hapus import yang tidak terpakai |
| 🟢 **P3** | Import React redundant | Semua file komponen | Hapus `import React from "react"` |
| 🟢 **P3** | Inconsistent casing | `pariwisataData.js` | Seragamkan casing nama kecamatan |

---

> **Catatan:** Build berhasil (exit code 0) tanpa error. Semua bug di atas bersifat fungsional/tampilan dan tidak menyebabkan kegagalan kompilasi.