import React from 'react';
import { Lock, KeyRound, Clock } from 'lucide-react';
import styles from './HowItWorksSteps.module.css';

export const HowItWorksSteps: React.FC = () => {
  return (
    <section className={styles.section} aria-labelledby="how-it-works-heading">
      <div className={styles.headerCenter}>
        <span className={styles.eyebrow}>Panduan Warga</span>
        <h2 id="how-it-works-heading" className={styles.heading}>
          3 Langkah Sederhana Melapor dari Rumah
        </h2>
        <p className={styles.subtitle}>
          Tidak perlu datang ke kantor polisi atau kejaksaan. Anda cukup mengikuti tahapan ringkas berikut dari ponsel cerdas Anda.
        </p>
      </div>

      <div className={styles.grid}>
        <article className={styles.stepCard}>
          <div>
            <div className={styles.stepNum}>1</div>
            <h3 className={styles.stepTitle}>Tulis Kejadian &amp; Unggah Bukti</h3>
            <p className={styles.stepDesc}>
              Jelaskan lokasi kantor instansi, perkiraan tanggal kejadian, dan nominal uang yang dipungut paksa. Lampirkan foto kuitansi atau rekaman jika ada.
            </p>
          </div>
          <div className={styles.stepFooter}>
            <Lock size={14} aria-hidden="true" />
            <span>File dienkripsi lokal otomatis</span>
          </div>
        </article>

        <article className={styles.stepCard}>
          <div>
            <div className={styles.stepNum}>2</div>
            <h3 className={styles.stepTitle}>Simpan 16 Kata Sandi Rahasia</h3>
            <p className={styles.stepDesc}>
              Setelah selesai melapor, layar akan memunculkan 16 kata acak (contoh: lentera ombak padi...). Salin atau catat di kertas pribadi Anda.
            </p>
          </div>
          <div className={styles.stepFooter}>
            <KeyRound size={14} aria-hidden="true" />
            <span>Hanya Anda yang tahu kode kunci ini</span>
          </div>
        </article>

        <article className={styles.stepCard}>
          <div>
            <div className={styles.stepNum}>3</div>
            <h3 className={styles.stepTitle}>Pantau Kasus Kapan Saja</h3>
            <p className={styles.stepDesc}>
              Gunakan 16 kata tersebut untuk membuka perkembangan hasil audit inspektorat, sanksi pemecatan pegawai, hingga pengembalian hak uang Anda.
            </p>
          </div>
          <div className={styles.stepFooter}>
            <Clock size={14} aria-hidden="true" />
            <span>Lacak berkala 24/7 tanpa jejak</span>
          </div>
        </article>
      </div>
    </section>
  );
};

