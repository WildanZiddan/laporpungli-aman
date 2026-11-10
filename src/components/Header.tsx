import React, { useEffect, useRef } from 'react';
import { ShieldAlert, Lock } from 'lucide-react';
import styles from './Header.module.css';

export type NavTab = 'home' | 'cases' | 'vault' | 'tracker' | 'guide' | 'faq' | 'about';

interface HeaderProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onNavigate }) => {
  const lastEscPressRef = useRef<number>(0);

  const triggerEmergencyExit = () => {
    try {
      window.sessionStorage.clear();
    } catch {
      // Storage may be blocked in strict privacy browsing modes
    }
    window.location.replace('https://www.bmkg.go.id');
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const now = Date.now();
        if (now - lastEscPressRef.current < 500) {
          triggerEmergencyExit();
        } else {
          lastEscPressRef.current = now;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.bannerEmergency} role="region" aria-label="Peringatan Keselamatan">
        <div className={styles.bannerEmergencyInner}>
          <div className={styles.bannerEmergencyLeft}>
            <ShieldAlert size={15} aria-hidden="true" color="#ef4444" />
            <span>
              <strong>Keamanan Pelapor:</strong> Jika diawasi orang lain, tekan tombol Keluar Cepat untuk mengalihkan ke situs berita BMKG secara instan.
            </span>
          </div>
          <button
            type="button"
            onClick={triggerEmergencyExit}
            className={styles.btnQuickExit}
            aria-label="Keluar Cepat dari Situs ke BMKG (Shortcut: ESC dua kali)"
            title="Keluar Cepat (ESC 2x)"
          >
            <span className={styles.kbd}>ESC 2x</span>
            <span>Keluar Cepat</span>
          </button>
        </div>
      </div>

      <div className={styles.container}>
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }} 
          className={styles.brand}
          aria-label="LaporPungli Aman - Beranda"
        >
          <img
            src="/logo-mascot.png"
            alt=""
            width={42}
            height={45}
            className={styles.brandLogoImg}
            aria-hidden="true"
          />
          <div className={styles.brandInfo}>
            <div className={styles.brandTextCol}>
              <span className={styles.brandName}>
                <span className={styles.brandWordDark}>Lapor</span>
                <span className={styles.brandWordBlue}>Pungli</span>{' '}
                <span className={styles.brandWordAman}>Aman</span>
              </span>
              <span className={styles.brandTagline}>Portal Pengaduan Tanpa Jejak</span>
            </div>
            <span className={styles.brandPillBadge}>Civic Tech Terenkripsi</span>
          </div>
        </a>

        <nav className={styles.nav} aria-label="Navigasi Utama">
          <button
            type="button"
            className={`${styles.navLink} ${activeTab === 'home' ? styles.navLinkActive : ''}`}
            onClick={() => onNavigate('home')}
          >
            Beranda
          </button>
          <button
            type="button"
            className={`${styles.navLink} ${activeTab === 'tracker' ? styles.navLinkActive : ''}`}
            onClick={() => onNavigate('tracker')}
          >
            Lacak Laporan
          </button>
          <button
            type="button"
            className={`${styles.navLink} ${activeTab === 'guide' ? styles.navLinkActive : ''}`}
            onClick={() => onNavigate('guide')}
          >
            Panduan
          </button>
          <button
            type="button"
            className={`${styles.navLink} ${activeTab === 'faq' ? styles.navLinkActive : ''}`}
            onClick={() => onNavigate('faq')}
          >
            FAQ
          </button>
          <button
            type="button"
            className={`${styles.navLink} ${activeTab === 'about' ? styles.navLinkActive : ''}`}
            onClick={() => onNavigate('about')}
          >
            Tentang Kami
          </button>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnLapor}
            onClick={() => onNavigate('vault')}
            aria-label="Buka Formulir Lapor Rahasia"
          >
            <Lock size={15} aria-hidden="true" />
            <span>Lapor Rahasia</span>
          </button>
        </div>
      </div>
    </header>
  );
};
