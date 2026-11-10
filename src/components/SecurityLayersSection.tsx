import React from 'react';
import { EyeOff, ImageOff, KeyRound, Check, ShieldCheck } from 'lucide-react';
import styles from './SecurityLayersSection.module.css';

interface SecurityLayersSectionProps {
  onAuditClick?: () => void;
}

export const SecurityLayersSection: React.FC<SecurityLayersSectionProps> = ({ onAuditClick }) => {
  return (
    <section className={styles.section} aria-labelledby="security-layers-heading">
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <span className={styles.eyebrow}>Perlindungan Maksimal Warga</span>
          <h2 id="security-layers-heading" className={styles.heading}>
            Tiga Lapis Keamanan: Rahasia Anda Terkunci Seutuhnya
          </h2>
          <p className={styles.subtitle}>
            Kami membangun sistem ini khusus agar masyarakat biasa, pekerja honorer, dan pedagang kecil dapat melapor tanpa takut diintimidasi.
          </p>
        </div>

        <button
          type="button"
          className={styles.auditBadgeBtn}
          onClick={onAuditClick}
          aria-label="Pelajari audit kriptografi sistem"
        >
          <ShieldCheck size={15} color="var(--color-blue-text)" aria-hidden="true" />
          <span>Audit Kriptografis Tempo-Real</span>
        </button>
      </div>

      <div className={styles.grid}>
        <article className={styles.card}>
          <div>
            <div className={styles.iconBox}>
              <EyeOff size={20} aria-hidden="true" />
            </div>
            <h3 className={styles.cardTitle}>Nol Jejak Identitas</h3>
            <p className={styles.cardDesc}>
              Sistem secara otomatis memotong alamat IP internet, jenis perangkat, nama, dan identitas kartu keluarga Anda. Tidak ada jejak yang tersisa di peladen.
            </p>
          </div>
          <div className={styles.cardFooter}>
            <Check size={14} aria-hidden="true" />
            <span>100% Arsitektur Klien</span>
          </div>
        </article>

        <article className={styles.card}>
          <div>
            <div className={styles.iconBox}>
              <ImageOff size={20} aria-hidden="true" />
            </div>
            <h3 className={styles.cardTitle}>GPS & Metadata Foto Dihapus</h3>
            <p className={styles.cardDesc}>
              Setiap foto kuitansi fisik, tangkapan layar percakapan, atau rekaman suara yang Anda lampirkan dibersihkan dari titik koordinat GPS sebelum dikirim ke inspektorat.
            </p>
          </div>
          <div className={styles.cardFooter}>
            <Check size={14} aria-hidden="true" />
            <span>Pembersihan Otomatis EXIF</span>
          </div>
        </article>

        <article className={styles.card}>
          <div>
            <div className={`${styles.iconBox} ${styles.iconBoxDark}`}>
              <KeyRound size={20} aria-hidden="true" />
            </div>
            <h3 className={styles.cardTitle}>Kunci Rahasia di Tangan Anda</h3>
            <p className={styles.cardDesc}>
              Hanya pelapor yang memegang 16 kata rahasia unik. Pengelola sistem maupun pejabat inspektorat tidak memiliki kunci apa pun untuk membongkar siapa Anda.
            </p>
          </div>
          <div className={styles.cardFooter}>
            <Check size={14} aria-hidden="true" />
            <span>Asimetris SHA-256 Kriptik</span>
          </div>
        </article>
      </div>
    </section>
  );
};

