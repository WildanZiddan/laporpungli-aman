import React, { useState, useEffect } from 'react';
import { Header, type NavTab } from './components/Header';
import { SecurityLayersSection } from './components/SecurityLayersSection';
import { NationalAnalyticsDashboard } from './components/NationalAnalyticsDashboard';
import { HowItWorksSteps } from './components/HowItWorksSteps';
import { SupportCtaBanner } from './components/SupportCtaBanner';
import { VaultReportForm } from './components/VaultReportForm';
import { PublicAuditTimeline } from './components/PublicAuditTimeline';
import { ReportTracker } from './components/ReportTracker';
import { UserGuide } from './components/UserGuide';
import { FaqSection } from './components/FaqSection';
import { AboutPage } from './components/AboutPage';
import { getStoredReports, convertStoredToIncidentLog } from './utils/reportStorage';
import type { IPublicIncidentLog } from './types';
import {
  ShieldCheck,
  Shield,
  Lock,
  ArrowRight,
  Search,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import styles from './App.module.css';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [cases, setCases] = useState<IPublicIncidentLog[]>(() =>
    getStoredReports().map(convertStoredToIncidentLog)
  );
  const [trackerInitialMnemonic, setTrackerInitialMnemonic] = useState<string>('');
  const [quickTicketInput, setQuickTicketInput] = useState<string>('');

  useEffect(() => {
    fetch('/data/real_cases_archive.json')
      .then((res) => {
        if (!res.ok) throw new Error('Data file not reachable');
        return res.json();
      })
      .then((data: IPublicIncidentLog[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setCases((prev) => {
            const merged = [...prev];
            data.forEach((item) => {
              if (!merged.some((c) => c.id === item.id)) {
                merged.push(item);
              }
            });
            return merged;
          });
        }
      })
      .catch(() => {
        // Keep local stored cases when archive json is unavailable
      });
  }, []);

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab !== 'tracker') {
      setTrackerInitialMnemonic('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackerInitialMnemonic(quickTicketInput.trim());
    setActiveTab('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.mainWrapper}>
      <Header activeTab={activeTab} onNavigate={handleNavigate} />

      <main className={styles.contentContainer}>
        {activeTab === 'home' && (
          <>
            <section className={styles.heroSection} aria-labelledby="hero-heading">
              <div className={styles.heroHeader}>
                <span className={styles.heroTrustBadge}>
                  <ShieldCheck size={14} aria-hidden="true" />
                  <span>Kerahasiaan Mutlak: Dijamin UU No. 37/2008 &amp; Enkripsi Zero-Knowledge</span>
                </span>

                <h1 id="hero-heading" className={styles.heroTitle}>
                  Laporkan Pungutan Liar Tanpa Jejak. Lindungi Diri &amp; Keluarga Anda.
                </h1>

                <p className={styles.heroSubtitle}>
                  Aman 100% tanpa KTP, tanpa nama, dan tanpa nomor HP. Bukti laporan otomatis dikunci di perangkat Anda sebelum dikirim, sehingga pejabat terlapor tidak dapat melacak pelapor.
                </p>
              </div>

              <div className={styles.heroSplitGrid}>
                <article className={styles.heroCardDark}>
                  <Shield size={170} strokeWidth={1.25} className={styles.heroCardWatermark} aria-hidden="true" />
                  <div className={styles.heroCardContent}>
                    <div className={styles.darkCardTopMeta}>
                      <span className={styles.darkPillTag}>
                        <span className={styles.darkDot} aria-hidden="true" />
                        <span>Kanal Enkripsi Terbuka</span>
                      </span>
                      <span className={styles.darkDurationTag}>Cukup 3 Menit &amp; Bebas Biaya</span>
                    </div>

                    <h2 className={styles.darkCardTitle} style={{ marginTop: 22 }}>
                      Kirim Laporan Kasus Pungli
                    </h2>
                    <p className={styles.darkCardDesc}>
                      Punya bukti pemerasan, suap surat tanah, biaya sekolah liar, atau perizinan yang dipersulit? Serahkan bukti secara anonim tanpa rasa takut.
                    </p>

                    <div className={styles.darkFeatureRow}>
                      <span className={styles.darkFeatureItem}>
                        <CheckCircle2 size={15} color="#38bdf8" aria-hidden="true" />
                        <span>Tanpa Akun &amp; Kata Sandi</span>
                      </span>
                      <span className={styles.darkFeatureItem}>
                        <CheckCircle2 size={15} color="#38bdf8" aria-hidden="true" />
                        <span>Otomatis Hapus Geotag GPS</span>
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.btnHeroWhite}
                    onClick={() => handleNavigate('vault')}
                    aria-label="Mulai lapor kasus pungli sekarang secara rahasia"
                  >
                    <Lock size={16} color="#2563eb" aria-hidden="true" />
                    <span>Mulai Lapor Sekarang Secara Rahasia</span>
                    <ArrowRight size={16} color="#2563eb" aria-hidden="true" />
                  </button>
                </article>

                <article className={styles.heroCardLight}>
                  <div>
                    <div className={styles.trackerCardHeader}>
                      <div className={styles.trackerIconCircle}>
                        <Search size={20} aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className={styles.trackerTitle}>Lacak Status Laporan</h2>
                        <p className={styles.trackerSubtitle}>Cek perkembangan penanganan tanpa perlu login</p>
                      </div>
                    </div>

                    <p className={styles.trackerDesc} style={{ marginTop: 16 }}>
                      Masukkan 16 kata sandi rahasia atau nomor laporan yang Anda simpan saat melapor untuk memantau tindak lanjut petugas pemeriksa.
                    </p>
                  </div>

                  <form onSubmit={handleQuickTrackSubmit} className={styles.trackerForm}>
                    <label htmlFor="quick-tracker-input" className={styles.trackerLabel}>
                      Nomor Laporan / 16 Kata Sandi Pelacak:
                    </label>
                    <div className={styles.trackerInputWrap}>
                      <KeyRound size={16} className={styles.trackerInputIcon} aria-hidden="true" />
                      <input
                        id="quick-tracker-input"
                        type="text"
                        className={styles.trackerInput}
                        placeholder="Contoh: lentera ombak padi cakra..."
                        value={quickTicketInput}
                        onChange={(e) => setQuickTicketInput(e.target.value)}
                      />
                    </div>
                    <div className={styles.trackerHint}>
                      <CheckCircle2 size={13} color="#10b981" aria-hidden="true" />
                      <span>Alamat pengakses tidak dicatat dan data dibuka lokal di perangkat Anda.</span>
                    </div>

                    <button type="submit" className={styles.btnTrackerBlue} style={{ marginTop: 6 }}>
                      <Search size={15} aria-hidden="true" />
                      <span>Lacak Laporan Saya</span>
                    </button>
                  </form>
                </article>
              </div>
            </section>

            <SecurityLayersSection onAuditClick={() => handleNavigate('about')} />

            <NationalAnalyticsDashboard
              onStartReport={() => handleNavigate('vault')}
              onViewCases={() => handleNavigate('cases')}
            />

            <HowItWorksSteps />

            <SupportCtaBanner
              onOpenGuide={() => handleNavigate('guide')}
              onOpenFaq={() => handleNavigate('faq')}
            />
          </>
        )}

        {activeTab === 'cases' && (
          <PublicAuditTimeline cases={cases} onBack={() => handleNavigate('home')} />
        )}

        {activeTab === 'vault' && (
          <div style={{ maxWidth: '820px', margin: '0 auto', width: '100%' }}>
            <VaultReportForm
              onCancel={() => handleNavigate('home')}
              onSuccessDone={() => handleNavigate('home')}
              onCheckStatusDirectly={(mnemonic) => {
                setTrackerInitialMnemonic(mnemonic);
                setActiveTab('tracker');
              }}
              onReportCreated={(newIncident) => {
                setCases((prev) => [newIncident, ...prev.filter((c) => c.id !== newIncident.id)]);
              }}
            />
          </div>
        )}

        {activeTab === 'tracker' && (
          <div style={{ maxWidth: '820px', margin: '0 auto', width: '100%' }}>
            <ReportTracker
              key={trackerInitialMnemonic}
              onBack={() => {
                handleNavigate('home');
                setTrackerInitialMnemonic('');
              }}
              initialMnemonic={trackerInitialMnemonic}
            />
          </div>
        )}

        {activeTab === 'guide' && (
          <UserGuide
            onStartReport={() => handleNavigate('vault')}
            onCheckStatus={() => handleNavigate('tracker')}
          />
        )}

        {activeTab === 'faq' && (
          <FaqSection />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onStartReport={() => handleNavigate('vault')}
            onTrackReport={() => handleNavigate('tracker')}
          />
        )}
      </main>

      <footer className={styles.footerDark}>
        <div className={styles.footerInner}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrandCol}>
              <div className={styles.footerBrandRow}>
                <img
                  src="/logo-mascot.png"
                  alt=""
                  width={40}
                  height={42}
                  className={styles.footerLogoImg}
                  aria-hidden="true"
                />
                <span className={styles.footerBrandTitle}>
                  Lapor<span className={styles.footerBrandBlue}>Pungli</span> Aman
                </span>
              </div>
              <p className={styles.footerBrandDesc}>
                Portal pengaduan saksi &amp; korban pungli pelayanan publik berarsitektur Zero-Knowledge Kriptografis. Melindungi identitas warga secara mutlak tanpa jejak digital yang tertinggal.
              </p>
              <div className={styles.footerTrustPill}>
                <CheckCircle2 size={14} aria-hidden="true" />
                <span>100% Bebas Nama, Bebas KTP, Bebas Nomor HP</span>
              </div>
            </div>

            <div>
              <h3 className={styles.footerColTitle}>Rujukan Hukum &amp; Mandat</h3>
              <ul className={styles.footerLinkList}>
                <li className={styles.footerLinkItem}>UU No. 37 Tahun 2008 (Ombudsman RI)</li>
                <li className={styles.footerLinkItem}>Perpres No. 87 Tahun 2016 (Satgas Saber Pungli)</li>
                <li className={styles.footerLinkItem}>UU No. 31 Tahun 2014 (Perlindungan Saksi LPSK)</li>
                <li className={styles.footerLinkItem}>Instruksi Presiden No. 2 Tahun 2023</li>
              </ul>
            </div>

            <div>
              <h3 className={styles.footerColTitle}>Bantuan &amp; Navigasi</h3>
              <ul className={styles.footerLinkList}>
                <li>
                  <button type="button" className={styles.footerNavBtn} onClick={() => handleNavigate('vault')}>
                    Buat Laporan Rahasia
                  </button>
                </li>
                <li>
                  <button type="button" className={styles.footerNavBtn} onClick={() => handleNavigate('tracker')}>
                    Lacak Status Laporan
                  </button>
                </li>
                <li>
                  <button type="button" className={styles.footerNavBtn} onClick={() => handleNavigate('cases')}>
                    Laporan Sedang &amp; Sudah Diproses
                  </button>
                </li>
                <li>
                  <button type="button" className={styles.footerNavBtn} onClick={() => handleNavigate('guide')}>
                    Panduan Warga &amp; Keamanan Peramban
                  </button>
                </li>
                <li>
                  <button type="button" className={styles.footerNavBtn} onClick={() => handleNavigate('faq')}>
                    Pertanyaan Umum &amp; Layanan LPSK
                  </button>
                </li>
                <li>
                  <button type="button" className={styles.footerNavBtn} onClick={() => handleNavigate('about')}>
                    Tentang Inisiatif Tim Kok bisa
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.footerBottomBar}>
            <span>&copy; 2026 LaporPungli Aman. Hak Warga Dilindungi. Pemulihan Integritas Publik Indonesia.</span>
            <div className={styles.footerSecuritySpecs}>
              <span className={styles.footerSpecHighlight}>AES-GCM 256 Encryption Active</span>
              <span>|</span>
              <span>Zero-Log Network</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
