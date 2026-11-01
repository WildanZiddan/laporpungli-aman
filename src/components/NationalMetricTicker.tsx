import React from 'react';
import { Database } from 'lucide-react';
import styles from './NationalMetricTicker.module.css';

export const NationalMetricTicker: React.FC = () => {
  return (
    <section className={styles.tickerSection} aria-labelledby="ticker-heading">
      <div className={styles.headerRow}>
        <div className={styles.titleArea}>
          <Database size={16} aria-hidden="true" />
          <h2 id="ticker-heading" className={styles.sectionTitle}>
            Fakta & Data Integritas Nasional
          </h2>
        </div>
        <span className={styles.legalBadge}>
          Dasar Hukum: UU No. 37/2008 & Perpres No. 87/2016
        </span>
      </div>

      <div className={styles.grid}>
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Indeks Integritas Nasional</span>
            <span className={`${styles.metricBadge} ${styles.badgeAmber}`}>Rentan (0-72,9)</span>
          </div>
          <div className={styles.metricValue}>72,32</div>
          <p className={styles.metricSubtext}>
            Praktik suap dan pungutan liar masih terdeteksi di <strong>97% Pemerintah Daerah</strong> serta <strong>90% Kementerian/Lembaga</strong>.
          </p>
          <div className={styles.metricSource}>
            Sumber: Survei Penilaian Integritas (SPI) KPK RI 2024–2025
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Operasi Tangkap Tangan</span>
            <span className={`${styles.metricBadge} ${styles.badgeCrimson}`}>59.000+ OTT</span>
          </div>
          <div className={styles.metricValue}>78.000+</div>
          <p className={styles.metricSubtext}>
            Tersangka pungli ditindak dari sektor perizinan, pendidikan (PPDB), penegakan hukum, hingga pertanahan (PTSL).
          </p>
          <div className={styles.metricSource}>
            Sumber: Rilis Akumulatif Satgas Saber Pungli Kemenko Polhukam
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Sitaan Barang Bukti Tunai</span>
            <span className={`${styles.metricBadge} ${styles.badgeNeutral}`}>Kumulatif Nasional</span>
          </div>
          <div className={styles.metricValue}>Rp325+ M</div>
          <p className={styles.metricSubtext}>
            Uang tunai hasil pungutan ilegal diamankan dari berbagai Unit Pemberantasan Pungli (UPP) daerah rawan.
          </p>
          <div className={styles.metricSource}>
            Sumber: Laporan Penindakan Satgas Saber Pungli & Rekapitulasi Polri
          </div>
        </div>
      </div>
    </section>
  );
};
