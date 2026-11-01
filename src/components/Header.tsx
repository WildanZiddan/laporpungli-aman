import React, { useEffect, useRef } from 'react';
import { Shield, ShieldAlert, Lock } from 'lucide-react';
import styles from './Header.module.css';

export type NavTab = 'home' | 'timeline' | 'vault' | 'tracker' | 'guide' | 'faq' | 'about';

interface HeaderProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onNavigate }) => {
  const lastEscPressRef = useRef<number>(0);

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

  const triggerEmergencyExit = () => {
    try {
      window.sessionStorage.clear();
    } catch {
    }
    window.location.replace('https://www.bmkg.go.id');
  };

  return (
    <header className={styles.header}>
      <div className={styles.bannerEmergency} role="region" aria-label="Peringatan Keselamatan">
        <div className={styles.bannerEmergencyLeft}>
          <ShieldAlert size={15} aria-hidden="true" />
          <span>
            <strong>Keamanan Pelapor:</strong> Merasa diawasi atau dalam situasi darurat? Tekan tombol <kbd className={styles.kbd}>ESC</kbd> 2x untuk keluar instan ke BMKG.
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
          <span>KELUAR CEPAT</span>
        </button>
      </div>

      <div className={styles.container}>
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }} 
          className={styles.brand}
          aria-label="LaporPungli Aman - Beranda"
        >
          <div className={styles.brandLogoMark}>
            <Shield size={18} aria-hidden="true" />
          </div>
          <div className={styles.brandInfo}>
            <span className={styles.brandName}>LaporPungli Aman</span>
            <span className={styles.brandTagline}>Portal Pengaduan Aman Tanpa Identitas</span>
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
            className={`${styles.navLink} ${activeTab === 'timeline' ? styles.navLinkActive : ''}`}
            onClick={() => onNavigate('timeline')}
          >
            Linimasa Publik
          </button>
          <button
            type="button"
            className={`${styles.navLink} ${activeTab === 'tracker' ? styles.navLinkActive : ''}`}
            onClick={() => onNavigate('tracker')}
          >
            Status Tiket
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
            aria-label="Buka Form Pelaporan Terenkripsi"
          >
            <Lock size={15} aria-hidden="true" />
            <span>Lapor Terenkripsi</span>
          </button>
        </div>
      </div>
    </header>
  );
};
