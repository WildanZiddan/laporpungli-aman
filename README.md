# LaporPungli Aman

> **Platform *whistleblower* dan pengaduan pungutan liar layanan publik yang aman tanpa identitas, dilengkapi enkripsi langsung di peramban warga serta linimasa penanganan perkara yang terbuka dan akuntabel.**

---

## 📌 Sekilas Proyek

**LaporPungli Aman** dibangun untuk meruntuhkan tembok ketakutan warga negara dalam melaporkan praktik pungutan liar (pungli) di instansi pelayanan dasar publik Indonesia. Platform ini memutus total relasi antara identitas pelapor dan substansi perkara (*Zero-PII*), melindungi dokumen dari pelacakan fisik via *EXIF metadata scrubber*, mengunci berkas secara lokal di perangkat pelapor (*AES-GCM 256-bit Web Crypto*), serta menyegel setiap langkah audit inspektorat (*APIP*) dalam linimasa publik terbuka anti-manipulasi.

* **Kategori:** *Civic Reporting & Accountability*
* **Rujukan Regulasi:** UU No. 37/2008 (Ombudsman RI), Perpres No. 87/2016 (Satgas Saber Pungli), UU No. 31/2014 (LPSK), UU No. 14/2008 (KIP)

---

## 🛠️ Tech Stack

Platform ini dibangun menggunakan arsitektur frontend murni tanpa ketergantungan pihak ketiga yang membahayakan privasi data (*0 KB telemetry dependency*):

| Lapisan | Teknologi | Catatan Implementasi |
| :--- | :--- | :--- |
| **Framework** | **React 19** + **TypeScript** | *Strict type safety* & arsitektur komponen modular |
| **Build Tool** | **Vite 8** | HMR super cepat & optimasi *production bundle* |
| **Styling** | **Vanilla CSS Modules** + **CSS Custom Properties** | *Design system* modular berstandar WCAG 2.1 AAA |
| **Keamanan Klien** | **W3C Web Cryptography API** (`window.crypto.subtle`) | Enkripsi simetris AES-GCM 256-bit & digest SHA-256 di memori perangkat |
| **Sanitasi Privasi** | **HTML5 Canvas 2D API** | Dekompresi piksel murni untuk melucuti geotag GPS, perangkat, dan timestamp EXIF foto bukti |
| **Ikonografi** | **Lucide React** | Ikon visual konsisten dan ringan |

---

## 🚀 Cara Menjalankan Proyek

Pastikan Anda telah memasang **Node.js** (versi 18 LTS atau lebih baru) dan npm di komputer Anda.

### 1. Kloning Repositori
```bash
git clone https://github.com/WildanZiddan/laporpungli-aman.git
cd laporpungli-aman
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Jalankan Server Pengembangan (Dev Mode)
```bash
npm run dev
```
Buka peramban dan akses: **`http://localhost:5173/`**

### 4. Build untuk Produksi & Uji Kompilasi
```bash
npm run build
npm run preview
```

---

## 📊 Progress Saat Ini

Seluruh fitur inti dan modul keselamatan sistem telah selesai dibangun (*100% Functional MVP*):

- **Beranda Editorial & Showcase Kasus**
  - Tata letak dua kolom responsif dengan filosofi desain *Clean Institutional*.
  - *Ticker* data riil nasional berbasis temuan resmi SPI KPK 2023–2024 (Skor 72,32) dan Satgas Saber Pungli (59.000+ OTT).
- **Formulir Pelaporan Terenkripsi (The Vault)**
  - *Wizard* pelaporan 3 tahap tanpa meminta data pribadi (tanpa Nama, NIK, No HP, atau Surel).
  - Sanitasi otomatis berkas bukti foto via Canvas peramban (melucuti GPS & metadata kamera).
  - Eksekusi enkripsi AES-GCM 256-bit langsung di memori RAM perangkat pelapor.
- **Penerbitan Kunci Tiket Rahasia (16 Kata Rahasia)**
  - Penurunan 16 kata rahasia berbahasa Indonesia dari master hash SHA-256 sebagai pengganti akun/kata sandi.
  - Opsi salin ke papan klip dan ekspor tiket ke format teks `.txt`.
- **Linimasa Investigasi Publik (Public Audit Trail)**
  - Tampilan rekam jejak investigasi 5 tahap APIP/Inspektorat dengan segel bukti hash kriptografis SHA-256.
  - Penghitung mundur batas waktu penanganan perkara (*SLA countdown*) untuk mencegah kasus dipeti-eskan.
  - Filter interaktif berbasis kategori instansi dan pencarian teks penuh.
- **Pelacak Status Kasus Mandiri (Report Tracker)**
  - Formulir dekripsi status investigasi langsung di sisi klien menggunakan input 16 kata kode tiket.
  - Menampilkan catatan resmi auditor inspektorat, status bukti, dan perkembangan vonis etik/hukum.
- **Fitur Keselamatan Darurat (Emergency Quick Exit)**
  - *Keyboard shortcut* tombol **ESC dua kali** (< 500ms) untuk seketika memusnahkan riwayat sesi dan mengalihkan layar ke portal netral resmi BMKG (`bmkg.go.id`).
- **Pusat Panduan Whistleblower & Tanya Jawab (FAQ)**
  - Panduan protokol keamanan digital warga negara dan 3 aturan emas keselamatan saksi.
  - Basis edukasi hukum perlindungan saksi LPSK dan UU Keterbukaan Informasi Publik.
- **Halaman Profil Inisiatif & Tim Pengembang**
  - Uraian visi arsitektur sistem dan landasan mandat konstitusi penanganan maladministrasi.

---

## 👥 Tim Pengembang

Platform ini dirancang dan dikembangkan oleh:

* **Wildan Yazid Ziddan** — *Ketua Tim & Front-End Developer*
* **Titta Zalfa Faliha Mukti** — *UI/UX Designer & System Analyst*
