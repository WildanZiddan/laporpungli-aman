import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Smartphone, 
  EyeOff, 
  Key, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle, 
  ShieldAlert,
  Lock
} from 'lucide-react';
import styles from './UserGuide.module.css';

interface UserGuideProps {
  onStartReport: () => void;
  onCheckStatus: () => void;
}

export const UserGuide: React.FC<UserGuideProps> = ({ onStartReport, onCheckStatus }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      id: 1,
      badge: 'Fase 01',
      title: 'Persiapan Perangkat & Jaringan Aman',
      subtitle: 'Memastikan jejak digital lokal tidak tersimpan di riwayat perangkat Anda',
      icon: <Smartphone size={20} aria-hidden="true" />,
      tag: 'Protokol Awal',
      details: [
        'Gunakan mode Penyamaran (Incognito / InPrivate Browsing) pada browser Anda agar riwayat kunjungan tidak tersimpan lokal.',
        'HINDARI menggunakan jaringan WiFi kantor, instansi terlapor, atau fasilitas publik yang mewajibkan login dengan KTP/No HP.',
        'Disarankan menggunakan koneksi data seluler pribadi Anda di lokasi yang tenang dan aman.',
        'Pahami fitur Emergency Exit: Tekan tombol ESC 2 kali untuk langsung menutup halaman jika ada orang menghampiri Anda.'
      ]
    },
    {
      id: 2,
      badge: 'Fase 02',
      title: 'Pengunggahan Bukti & Sanitasi EXIF Otomatis',
      subtitle: 'Menghilangkan koordinat GPS dan metadata kamera secara lokal',
      icon: <EyeOff size={20} aria-hidden="true" />,
      tag: 'Sanitasi Metadata',
      details: [
        'Unggah bukti berupa foto kuitansi, struk pembayaran liar, rekaman percakapan tertulis, atau SK palsu.',
        'Sistem otomatis mengeksekusi modul HTML5 Canvas EXIF Scrubber langsung di browser Anda.',
        'Koordinat lintang-bujur GPS, merk HP, tipe lensa, dan tanggal pembuatan foto dihapus total sebelum berkas dienkripsi.',
        'Pastikan foto bukti tidak memuat wajah Anda, kartu identitas pribadi, atau pantulan yang mengidentifikasi pelapor.'
      ]
    },
    {
      id: 3,
      badge: 'Fase 03',
      title: 'Enkripsi Sisi Klien (In-Browser AES-GCM)',
      subtitle: 'Data dienkripsi di RAM browser sebelum menyentuh jaringan',
      icon: <Lock size={20} aria-hidden="true" />,
      tag: 'Zero-Knowledge',
      details: [
        'Formulir pelaporan menerapkan prinsip Zero-PII: Tidak ada kolom Nama, NIK, No Telepon, atau Alamat Rumah.',
        'Algoritma militer AES-GCM 256-bit dijalankan langsung melalui Web Crypto API milik browser Anda.',
        'Paket yang dikirim hanyalah rangkaian kode acak (ciphertext) dan digest SHA-256 yang mustahil dibongkar tanpa kunci.',
        'Bahkan jika server diretas atau disita, pihak penyerang tidak dapat membaca isi dokumen Anda.'
      ]
    },
    {
      id: 4,
      badge: 'Fase 04',
      title: 'Menyimpan 16 Kata Sandi Rahasia',
      subtitle: 'Satu-satunya kunci pribadi untuk membuka dan memantau kasus Anda',
      icon: <Key size={20} aria-hidden="true" />,
      tag: 'Kunci Pribadi',
      details: [
        'Setelah laporan terkirim, Anda akan menerima catatan bukti berisi 16 kata sandi rahasia.',
        'Catat ke-16 kata ini di kertas pribadi dan simpan di tempat aman, atau unduh salinan teksnya.',
        'PERINGATAN: Sandi ini tidak pernah disimpan di server mana pun. Jika hilang, tidak ada pihak yang bisa memulihkannya.',
        'Jangan pernah membagikan 16 kata ini kepada siapa pun yang mengaku sebagai petugas pemeriksa.'
      ]
    },
    {
      id: 5,
      badge: 'Fase 05',
      title: 'Lacak Perkembangan Penanganan Laporan',
      subtitle: 'Mengawal proses pemeriksaan yang transparan dan anti-peti es',
      icon: <Clock size={20} aria-hidden="true" />,
      tag: 'Akuntabilitas Terbuka',
      details: [
        'Buka menu "Lacak Laporan" dan masukkan 16 kata sandi Anda (atau nomor laporan) untuk membuka status kasus.',
        'Pantau 5 tahapan pemeriksaan resmi: Verifikasi Awal (3x24 jam) → Telaah Bukti → Audit Lapangan → Rekomendasi Sanksi → Tindak Lanjut.',
        'Statistik jumlah laporan per instansi dan per daerah ditampilkan terbuka pada Dashboard Transparansi di Beranda.',
        'Jika pemeriksa lambat melewati batas waktu (SLA), status pengawasan akan memunculkan catatan keterlambatan.'
      ]
    }
  ];

  return (
    <div className={styles.guideWrapper}>
      <section className={styles.headerCard}>
        <div className={styles.headerLeft}>
          <span className={styles.eyebrowBadge}>
            <ShieldCheck size={14} aria-hidden="true" />
            Panduan Whistleblower Indonesia
          </span>
          <h1 className={styles.mainTitle}>
            Panduan Melapor Tanpa Jejak
          </h1>
          <p className={styles.leadText}>
            Protokol keamanan digital langkah demi langkah untuk warga negara yang hendak mengungkap praktik pungli di instansi publik secara aman, terenkripsi, dan terlindungi penuh.
          </p>
          <div className={styles.actionRow}>
            <button 
              type="button" 
              className={styles.btnPrimary} 
              onClick={onStartReport}
            >
              <Lock size={15} aria-hidden="true" />
              <span>Mulai Buat Laporan Rahasia</span>
            </button>
            <button 
              type="button" 
              className={styles.btnSecondary} 
              onClick={onCheckStatus}
            >
              <span>Sudah Punya 16 Kata Sandi? Lacak Laporan</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className={styles.headerRightNotice}>
          <div className={styles.noticeIconWrap}>
            <ShieldAlert size={24} aria-hidden="true" />
          </div>
          <div className={styles.noticeContent}>
            <h2 className={styles.noticeTitle}>Emergency Quick Exit</h2>
            <p className={styles.noticeText}>
              Jika Anda sedang mengisi laporan dan merasa diawasi, tekan tombol <strong>ESC dua kali</strong> secara cepat. Sistem akan langsung memusnahkan isian form dan mengalihkan layar ke portal BMKG.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.stepsSection}>
        <div className={styles.stepsNavRow}>
          {steps.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`${styles.stepNavTab} ${activeStep === s.id ? styles.stepNavTabActive : ''}`}
              onClick={() => setActiveStep(s.id)}
            >
              <span className={styles.stepNumBadge}>{s.id}</span>
              <span className={styles.stepNavText}>{s.badge}</span>
            </button>
          ))}
        </div>

        {steps.map((s) => s.id === activeStep && (
          <div key={s.id} className={styles.activeStepCard}>
            <div className={styles.stepCardHeader}>
              <div className={styles.stepIconBox}>
                {s.icon}
              </div>
              <div className={styles.stepHeaderTitles}>
                <div className={styles.stepMetaRow}>
                  <span className={styles.stepPhaseTag}>{s.badge}</span>
                  <span className={styles.stepCategoryTag}>{s.tag}</span>
                </div>
                <h2 className={styles.stepTitleText}>{s.title}</h2>
                <p className={styles.stepSubtitleText}>{s.subtitle}</p>
              </div>
            </div>

            <div className={styles.stepCardBody}>
              <h3 className={styles.instructionsHeading}>Instruksi Keamanan Wajib:</h3>
              <ul className={styles.instructionsList}>
                {s.details.map((detail, idx) => (
                  <li key={idx} className={styles.instructionItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} aria-hidden="true" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.stepCardFooter}>
              <div className={styles.stepNavButtons}>
                {activeStep > 1 && (
                  <button 
                    type="button" 
                    className={styles.btnStepPrev}
                    onClick={() => setActiveStep(prev => prev - 1)}
                  >
                    ← Langkah Sebelumnya
                  </button>
                )}
                {activeStep < steps.length ? (
                  <button 
                    type="button" 
                    className={styles.btnStepNext}
                    onClick={() => setActiveStep(prev => prev + 1)}
                  >
                    <span>Lanjut ke Langkah {activeStep + 1}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                ) : (
                  <button 
                    type="button" 
                    className={styles.btnStepNext}
                    onClick={onStartReport}
                  >
                    <span>Saya Siap, Buat Laporan Sekarang</span>
                    <Lock size={14} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.rulesCard}>
        <div className={styles.rulesHeader}>
          <AlertTriangle size={20} className={styles.rulesWarningIcon} aria-hidden="true" />
          <h2 className={styles.rulesTitle}>3 Aturan Emas Keselamatan Pelapor</h2>
        </div>
        <div className={styles.rulesGrid}>
          <div className={styles.ruleItem}>
            <span className={styles.ruleNum}>01</span>
            <h3 className={styles.ruleHeading}>Jangan Ungkap Identitas</h3>
            <p className={styles.ruleDesc}>
              Jangan pernah mengetikkan nama asli, nama kerabat, atau nomor handphone di kolom kronologi insiden.
            </p>
          </div>
          <div className={styles.ruleItem}>
            <span className={styles.ruleNum}>02</span>
            <h3 className={styles.ruleHeading}>Amankan Kertas 16 Kata</h3>
            <p className={styles.ruleDesc}>
              Simpan 16 kata di catatan fisik rahasia. Jangan pernah mengirimkan 16 kata ini lewat chat WhatsApp atau email.
            </p>
          </div>
          <div className={styles.ruleItem}>
            <span className={styles.ruleNum}>03</span>
            <h3 className={styles.ruleHeading}>Gunakan Hotkey Darurat</h3>
            <p className={styles.ruleDesc}>
              Ingat selalu tombol ESC ganda. Keselamatan fisik Anda selalu menjadi prioritas di atas dokumen apa pun.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
