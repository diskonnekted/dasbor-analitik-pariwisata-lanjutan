# Panduan Deploy ke CloudPanel (CentOS) Tanpa Akses Sudo

Aplikasi **Dasbor Analitik Pariwisata Banjarnegara** dibangun menggunakan **Vite + React**, sehingga saat di-build (`npm run build`), seluruh kode dikompilasi menjadi **Static Web Assets (HTML, CSS, JS, GeoJSON)**. 

Karena hasilnya static, Anda **tidak memerlukan akses sudo/root** maupun Node.js daemon (pm2) di server. Cukup gunakan tipe **Static Site** di CloudPanel.

---

## 🚀 Cara 1: Deploy File Build `dist` (Paling Mudah & Cepat - Recommended)

### Langkah 1: Buat Site di CloudPanel
1. Login ke **CloudPanel** Anda (`https://ip-server:8443`).
2. Klik menu **Add Site** → Pilih **Static Site**.
3. Masukkan Domain / Subdomain Anda (contoh: `pariwisata.banjarnegarakab.go.id` atau `pariwisata.namadomain.com`).
4. Tentukan **Site User** (Gunakan user yang sudah ada / user tanpa sudo).
5. Klik **Create**.

---

### Langkah 2: Build Aplikasi di Komputer Lokal
Di terminal komputer Anda (VS Code / PowerShell), jalankan perintah:
```bash
npm run build
```
Perintah ini akan menghasilkan folder **`dist`** di dalam proyek Anda yang berisi:
- `index.html`
- `assets/` (CSS & JS terkompresi)
- `peta_kecamatan.geojson` & `peta_desa.geojson`

---

### Langkah 3: Upload ke Server via File Manager CloudPanel / SFTP
1. Buka folder `dist` di komputer Anda, lalu kompres **seluruh isi di dalam folder `dist`** menjadi file `build.zip` (Ingat: kompres *isi di dalam* folder `dist`, bukan folder `dist`-nya).
2. Di dashboard **CloudPanel**:
   - Buka menu **Sites** → Klik domain Anda → Pilih menu **File Manager**.
   - Masuk ke direktori web root: `/htdocs/namadomain.com/`
   - Hapus file bawaan (jika ada `index.html` lama).
   - Klik tombol **Upload** → Pilih `build.zip`.
3. Setelah terunggah, klik kanan pada `build.zip` → Pilih **Extract**.
4. Hapus file `build.zip`.

---

### Langkah 4: Aktifkan SSL / HTTPS Gratis (Let's Encrypt)
1. Di halaman site CloudPanel Anda, buka tab **SSL/TLS**.
2. Klik **Actions** → Pilih **New Let's Encrypt Certificate**.
3. Centang domain Anda lalu klik **Create and Install**.
4. Web Anda kini **Online & Secure (HTTPS)**! 🎉

---

## 🛠️ Cara 2: Deploy Otomatis via Git & SSH (Tanpa Sudo)

Jika Anda ingin melakukan update kode dari GitHub langsung di server via SSH tanpa upload manual:

### Langkah 1: Buat Static Site di CloudPanel
(Sama seperti Cara 1, buat **Static Site** dengan target folder `/htdocs/namadomain.com/`).

### Langkah 2: Clone Repositori via SSH
Buka Terminal/SSH ke server Anda (sebagai user non-sudo):
```bash
cd /tmp
git clone https://github.com/diskonnekted/dasbor-analitik-pariwisata.git
cd dasbor-analitik-pariwisata

# Install dependency & build di server
npm install
npm run build

# Salin hasil build ke direktori htdocs site Anda
cp -r dist/* /home/USER_ANDA/htdocs/namadomain.com/
```

### Langkah 3: Script Update Otomatis (Setiap ada perubahan kode)
Setiap kali Anda push update ke GitHub, Anda cukup menjalankan perintah ringkas ini di SSH:
```bash
cd /tmp/dasbor-analitik-pariwisata && git pull && npm run build && cp -r dist/* /home/USER_ANDA/htdocs/namadomain.com/
```

---

## ❓ Troubleshooting & Catatan Penting

1. **Routing 404 pada Refresh Halaman (Single Page App)**:
   Jika saat me-refresh halaman selain home terjadi error 404, di CloudPanel buka **Sites** → Domain Anda → **Vhost** / **Nginx Configuration**, lalu pastikan baris `try_files` terkonfigurasi:
   ```nginx
   location / {
       try_files $uri $uri/ /index.html;
   }
   ```
2. **Tanpa Sudo**:
   Karena aplikasi disajikan sebagai *Static HTML/JS*, Nginx di CloudPanel akan langsung melayani file tersebut dengan performa maksimal, penggunaan memori RAM server 0 MB, dan **100% tanpa membutuhkan perintah sudo**.
