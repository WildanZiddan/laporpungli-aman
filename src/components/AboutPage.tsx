import React from 'react';
import {
  ShieldCheck,
  Scale,
  Lock,
  Eye,
  FileCheck2,
  Users
} from 'lucide-react';
import styles from './AboutPage.module.css';

interface AboutPageProps {
  onStartReport: () => void;
  onViewTimeline: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onStartReport, onViewTimeline }) => {
  return (
    <div className={styles.aboutWrapper}>
      <section className={styles.heroCard}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Menghilangkan Ketakutan, Menegakkan Transparansi
          </h1>
          <p className={styles.heroLead}>
            <strong>LaporPungli Aman</strong> adalah platform <em>whistleblower</em> generasi baru yang dibangun untuk menjawab paradoks klasik pelaporan publik di Indonesia: <em>masyarakat enggan melapor karena takut diintimidasi</em>.
          </p>
          <div className={styles.heroCtaRow}>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={onStartReport}
            >
              <Lock size={15} aria-hidden="true" />
              <span>Coba Kirim Laporan Rahasia</span>
            </button>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={onViewTimeline}
            >
              <Eye size={15} aria-hidden="true" />
              <span>Pantau Linimasa Kasus Riil</span>
            </button>
          </div>
        </div>

        <div className={styles.statCalloutBox}>
          <div className={styles.statMetricRow}>
            <div className={styles.statNumber}>70.97</div>
            <div className={styles.statBadge}>SPI KPK 2023</div>
          </div>
          <p className={styles.statExplanation}>
            Skor Survei Penilaian Integritas KPK merosot ke zona rentan. 7.000+ aduan pungli tercatat di Ombudsman RI setiap tahunnya, mayoritas menimpa pelayanan dasar warga.
          </p>
        </div>
      </section>

      <section className={styles.pillarsSection}>
        <div className={styles.sectionHeadingArea}>
          <span className={styles.sectionSubtitle}>Arsitektur Sistem</span>
          <h2 className={styles.sectionTitle}>Tiga Benteng Perlindungan Whistleblower</h2>
        </div>

        <div className={styles.pillarsGrid}>
          <div className={styles.pillarCard}>
            <div className={styles.pillarIconBox}>
              <Lock size={22} aria-hidden="true" />
            </div>
            <h3 className={styles.pillarTitle}>Laporan Tanpa Data Pribadi</h3>
            <p className={styles.pillarDesc}>
              Tidak ada kolom Nama, NIK, nomor WhatsApp, atau email. Kami memutus total relasi antara identitas pribadi pelapor dengan berkas insiden yang dilaporkan.
            </p>
            <span className={styles.pillarTag}>Privasi Mutlak</span>
          </div>

          <div className={styles.pillarCard}>
            <div className={styles.pillarIconBox}>
              <ShieldCheck size={22} aria-hidden="true" />
            </div>
            <h3 className={styles.pillarTitle}>Enkripsi Tingkat Militer di Perangkat Anda</h3>
            <p className={styles.pillarDesc}>
              Laporan dikunci langsung di perangkat Anda sebelum dikirim. Server hanya menerima data acak yang tidak bisa dibaca oleh siapapun, termasuk penyelenggara sistem.
            </p>
            <span className={styles.pillarTag}>Kriptografi Klien</span>
          </div>

          <div className={styles.pillarCard}>
            <div className={styles.pillarIconBox}>
              <FileCheck2 size={22} aria-hidden="true" />
            </div>
            <h3 className={styles.pillarTitle}>Linimasa Terbuka Anti-Manipulasi</h3>
            <p className={styles.pillarDesc}>
              Linimasa investigasi disegel dengan segel digital anti-pemalsuan dan batas waktu penanganan. Menjamin tidak ada laporan yang dapat dipeti-eskan oleh oknum.
            </p>
            <span className={styles.pillarTag}>Akuntabilitas Publik</span>
          </div>
        </div>
      </section>

      <section className={styles.legalSection}>
        <div className={styles.legalHeader}>
          <Scale size={24} className={styles.legalIcon} aria-hidden="true" />
          <div>
            <h2 className={styles.legalTitle}>Landasan Hukum & Rujukan Regulasi Resmi</h2>
            <p className={styles.legalSubtitle}>
              Sistem ini dibangun berlandaskan mandat konstitusi dan perundang-undangan Republik Indonesia
            </p>
          </div>
        </div>

        <div className={styles.legalGrid}>
          <div className={styles.legalCard}>
            <span className={styles.legalBadge}>UU No. 37 Tahun 2008</span>
            <h3 className={styles.legalCardHeading}>Ombudsman Republik Indonesia</h3>
            <p className={styles.legalCardText}>
              Pasal 24 mengamanatkan bahwa identitas pelapor maladministrasi dan pungli dalam pelayanan publik wajib dirahasiakan jika diminta oleh pelapor.
            </p>
          </div>

          <div className={styles.legalCard}>
            <span className={styles.legalBadge}>Perpres No. 87 Tahun 2016</span>
            <h3 className={styles.legalCardHeading}>Satgas Sapu Bersih Pungutan Liar</h3>
            <p className={styles.legalCardText}>
              Mengatur peran serta masyarakat dalam pemberantasan pungli, serta kewajiban aparat penegak hukum dan APIP menindaklanjuti informasi yang dapat diverifikasi.
            </p>
          </div>

          <div className={styles.legalCard}>
            <span className={styles.legalBadge}>UU No. 31 Tahun 2014</span>
            <h3 className={styles.legalCardHeading}>Perlindungan Saksi dan Korban (LPSK)</h3>
            <p className={styles.legalCardText}>
              Pasal 10 menjamin bahwa pelapor tindak pidana korupsi yang beriktikad baik tidak dapat dituntut secara hukum baik pidana maupun perdata atas laporannya.
            </p>
          </div>

          <div className={styles.legalCard}>
            <span className={styles.legalBadge}>UU No. 14 Tahun 2008</span>
            <h3 className={styles.legalCardHeading}>Keterbukaan Informasi Publik (KIP)</h3>
            <p className={styles.legalCardText}>
              Menjamin hak setiap warga negara untuk mengetahui proses dan perkembangan penanganan perkara layanan publik demi mewujudkan tata kelola yang bersih.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.teamCard}>
        <div className={styles.teamHeader}>
          <div className={styles.teamIconBox}>
            <Users size={22} aria-hidden="true" />
          </div>
          <div>
            <span className={styles.teamEyebrow}>Kreator & Pengembang</span>
            <h2 className={styles.teamTitle}>Tim Pengembang Civic Tech</h2>
          </div>
        </div>

        <div className={styles.teamGrid}>
          <div className={styles.memberCard}>
            <div className={styles.memberAvatar}>WYZ</div>
            <div className={styles.memberInfo}>
              <h3 className={styles.memberName}>Wildan Yazid Ziddan</h3>
              <span className={styles.memberRole}>Lead Security & Software Architect</span>
              <p className={styles.memberDesc}>
                Bertanggung jawab atas arsitektur kriptografi in-browser Web Crypto API (AES-GCM), modul EXIF Scrubber berbasis Canvas, dan mekanisme penyimpanan aman Zero-Knowledge.
              </p>
            </div>
          </div>

          <div className={styles.memberCard}>
            <div className={styles.memberAvatar}>TZ</div>
            <div className={styles.memberInfo}>
              <h3 className={styles.memberName}>Titta Zalfa Faliha Mukti</h3>
              <span className={styles.memberRole}>Civic Impact & UI/UX Designer</span>
              <p className={styles.memberDesc}>
                Bertanggung jawab atas perancangan desain sistem <em>Clean Institutional Editorial</em> dan psikologi antarmuka perlindungan saksi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
