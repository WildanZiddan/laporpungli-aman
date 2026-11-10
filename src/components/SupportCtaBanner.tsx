import React from 'react';
import { Headphones, BookOpen, MessageSquare } from 'lucide-react';
import styles from './SupportCtaBanner.module.css';

interface SupportCtaBannerProps {
  onOpenGuide: () => void;
  onOpenFaq: () => void;
}

export const SupportCtaBanner: React.FC<SupportCtaBannerProps> = ({ onOpenGuide, onOpenFaq }) => {
  return (
    <section className={styles.banner} aria-labelledby="support-cta-heading">
      <div className={styles.left}>
        <div className={styles.iconCircle}>
          <Headphones size={22} aria-hidden="true" />
        </div>
        <div>
          <h2 id="support-cta-heading" className={styles.heading}>
            Masih Ragu atau Butuh Bantuan Mendampingi Orang Tua?
          </h2>
          <p className={styles.subtitle}>
            Baca panduan langkah per langkah pengamanan peramban atau hubungi jaringan relawan perlindungan saksi.
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.btnGhost}
          onClick={onOpenGuide}
        >
          <BookOpen size={15} aria-hidden="true" />
          <span>Buka Panduan Warga</span>
        </button>

        <button
          type="button"
          className={styles.btnBlue}
          onClick={onOpenFaq}
        >
          <MessageSquare size={15} aria-hidden="true" />
          <span>Tanya Layanan Bantu</span>
        </button>
      </div>
    </section>
  );
};

