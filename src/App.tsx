import React, { useState, useEffect } from 'react';
import { Header, type NavTab } from './components/Header';
import { NationalMetricTicker } from './components/NationalMetricTicker';
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
  Lock,
  Eye,
  FileCheck2,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import heroImg from './assets/civic_vault_hero.jpg';
import auditDocImg from './assets/inspection_audit_flow.jpg';
import styles from './App.module.css';

const FALLBACK_CASES: IPublicIncidentLog[] = [
  {
    id: "LP-2024-PTSL-084",
    category: "PTSL_BPN",
    categoryLabel: "Pertanahan & PTSL",
    title: "Dugaan Pungli Sertifikat Tanah PTSL di Desa Wonosari Pasuruan",
    agencyReported: "Kantor Pertanahan / Kelompok Masyarakat (Pokmas) Desa",
    currentStage: "STAGE_4_MAJELIS",
    stageNumber: 4,
    stageLabel: "Tahap 4: Sidang Majelis Etik & Pemeriksaan LHP",
    slaRemainingDays: 3,
    lastUpdated: "2024-09-18T10:30:00Z",
    cryptographicProofHash: "sha256:d8a1f49e0c5b3671a82f63e41b9e28c704f5e16790b1ad84a62174c839f289b0",
    summaryAction: "Inspektorat Daerah merampungkan audit LHP potensi kerugian warga; bukti aliran dana dan aset diserahkan ke Kejaksaan Negeri untuk proses penuntutan Tipikor.",
    legalReference: "Pelanggaran SKB 3 Menteri No. 25/2017 (Batas legal Rp150.000) jo UU No. 20/2001 Tipikor",
    statusType: "investigating",
    timelineMilestones: [
      {
        stageNumber: 1,
        stageName: "Validasi Formil & Uji Bukti Awal",
        status: "completed",
        date: "2024-08-01",
        actor: "Tim Penerimaan Pengaduan Inspektorat Daerah",
        actionSummary: "Pengecekan kwitansi tarikan 'uang patok' Rp2,5 juta pada program PTSL warga; berkas dinyatakan memenuhi syarat formil pengaduan.",
        stageHash: "sha256:1a01...88c4"
      },
      {
        stageNumber: 2,
        stageName: "Audit Forensik & Verifikasi Lapangan",
        status: "completed",
        date: "2024-08-15",
        actor: "Auditor Investigasi Khusus Inspektorat",
        actionSummary: "Audit buku kas bendahara Pokmas dan wawancara tertutup dengan 24 warga pemohon sertifikat tanah; ditemukan selisih dana ilegal.",
        stageHash: "sha256:3b92...f01a"
      },
      {
        stageNumber: 3,
        stageName: "Pemanggilan & Pemeriksaan Terlapor",
        status: "completed",
        date: "2024-09-02",
        actor: "Majelis Pemeriksa APIP Daerah",
        actionSummary: "Pemeriksaan resmi terhadap Ketua Pokmas dan Kepala Desa; bukti transfer dan aset hasil pungutan dikonfrontasikan.",
        stageHash: "sha256:7c44...119d"
      },
      {
        stageNumber: 4,
        stageName: "Sidang Majelis Etik & Rekomendasi Sanksi",
        status: "current",
        date: "2024-09-18",
        actor: "Dewan Sidang Majelis Etik & APH",
        actionSummary: "Penyusunan Laporan Hasil Pemeriksaan (LHP) final untuk pelimpahan tindak pidana korupsi ke Kejaksaan Negeri.",
        stageHash: "sha256:d8a1...89b0"
      },
      {
        stageNumber: 5,
        stageName: "Putusan & Eksekusi Penegakan Hukum",
        status: "pending",
        date: "Target: 2024-09-21",
        actor: "Kejaksaan Negeri & Pengadilan Tipikor",
        actionSummary: "Penetapan tersangka tindak pidana korupsi dan penyitaan aset hasil kejahatan pungutan liar.",
        stageHash: "sha256:pending"
      }
    ]
  },
  {
    id: "LP-2024-RUTAN-012",
    category: "RUTAN_LAPAS",
    categoryLabel: "Rutan & Pemasyarakatan",
    title: "Skandal Fasilitas Ilegal & Pungutan Liar Rutan Cabang KPK",
    agencyReported: "Rutan Kelas I Jakarta Timur Cabang KPK",
    currentStage: "STAGE_5_VONIS",
    stageNumber: 5,
    stageLabel: "Tahap 5: Eksekusi Putusan Sanksi Etik Berat & Tipikor",
    slaRemainingDays: 0,
    lastUpdated: "2024-03-27T14:15:00Z",
    cryptographicProofHash: "sha256:4b9e28c704f5e16790b1ad84a62174c839f289b0d8a1f49e0c5b3671a82f63e4",
    summaryAction: "Dewan Pengawas (Dewas) KPK menjatuhkan sanksi etik berat kepada 78 pegawai rutan berupa permohonan maaf terbuka langsung, pemecatan dinas, dan pelimpahan tersangka Tipikor.",
    legalReference: "Peraturan Dewas KPK No. 03/2021 jo UU Tipikor",
    statusType: "sanction",
    timelineMilestones: [
      {
        stageNumber: 1,
        stageName: "Temuan Investigasi Pelanggaran Awal",
        status: "completed",
        date: "2023-06-15",
        actor: "Dewan Pengawas KPK",
        actionSummary: "Pengusutan awal dari aduan pelanggaran etik penjaga rutan yang terbukti memeras keluarga tahanan.",
        stageHash: "sha256:9a01...12b4"
      },
      {
        stageNumber: 2,
        stageName: "Audit Rekening & Forensik Transaksi",
        status: "completed",
        date: "2023-11-20",
        actor: "Satgas Forensik Digital Dewas KPK",
        actionSummary: "Penelusuran puluhan rekening penampung pihak ketiga; terungkap perputaran dana pungli mencapai Rp6,1 Miliar.",
        stageHash: "sha256:5b88...a991"
      },
      {
        stageNumber: 3,
        stageName: "Pemeriksaan Maraton 93 Pegawai",
        status: "completed",
        date: "2024-01-18",
        actor: "Majelis Sidang Etik Dewas KPK",
        actionSummary: "Pemeriksaan saksi tahanan dan mantan pegawai terkait skema tarif ponsel Rp20 juta dan listrik Rp5 juta per bulan.",
        stageHash: "sha256:2d44...330a"
      },
      {
        stageNumber: 4,
        stageName: "Musyawarah Putusan Majelis Sidang Etik",
        status: "completed",
        date: "2024-02-15",
        actor: "Pimpinan Sidang Dewas KPK",
        actionSummary: "Gelar putusan etik: 78 dari 90 pegawai dinyatakan terbukti melakukan pelanggaran berat berencana.",
        stageHash: "sha256:8f12...bc49"
      },
      {
        stageNumber: 5,
        stageName: "Vonis Sanksi Berat Terbuka & Pidana Tipikor",
        status: "completed",
        date: "2024-03-27",
        actor: "Dewan Pengawas & Deputi Penindakan KPK",
        actionSummary: "Eksekusi sanksi etik berat berupa permohonan maaf terbuka langsung secara publik, pencopotan jabatan, dan pelimpahan tersangka Tipikor.",
        stageHash: "sha256:4b9e...63e4"
      }
    ]
  },
  {
    id: "LP-2024-PPDB-119",
    category: "PPDB_SEKOLAH",
    categoryLabel: "Pendidikan & PPDB",
    title: "Pungutan Liar Kuota Siswa Titipan PPDB SMA Negeri",
    agencyReported: "Komite Sekolah & Panitia PPDB Tingkat SMA Jawa Barat",
    currentStage: "STAGE_2_FORENSIK",
    stageNumber: 2,
    stageLabel: "Tahap 2: Audit Forensik Rekening & Pemeriksaan Saksi",
    slaRemainingDays: 5,
    lastUpdated: "2024-07-08T09:00:00Z",
    cryptographicProofHash: "sha256:7c839f289b0d8a1f49e0c5b3671a82f63e41b9e28c704f5e16790b1ad84a621a",
    summaryAction: "Satgas Saber Pungli Jawa Barat bersama Inspektorat Daerah memverifikasi bukti kuitansi sumbangan wajib sebesar Rp7,5 juta per siswa jalur non-zonasi.",
    legalReference: "Permendikbud No. 1/2021 tentang PPDB jo Perpres No. 87/2016",
    statusType: "investigating"
  }
];

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [cases, setCases] = useState<IPublicIncidentLog[]>(FALLBACK_CASES);
  const [trackerInitialMnemonic, setTrackerInitialMnemonic] = useState<string>('');

  useEffect(() => {
    const storedReports = getStoredReports();
    const storedAsIncidentLogs = storedReports.map(convertStoredToIncidentLog);

    fetch('/data/real_cases_archive.json')
      .then((res) => {
        if (!res.ok) throw new Error('Data file not reachable');
        return res.json();
      })
      .then((data: IPublicIncidentLog[]) => {
        if (Array.isArray(data) && data.length > 0) {
          const combined = [...storedAsIncidentLogs];
          data.forEach(item => {
            if (!combined.some(c => c.id === item.id)) {
              combined.push(item);
            }
          });
          setCases(combined);
        }
      })
      .catch(() => {
        const combined = [...storedAsIncidentLogs];
        FALLBACK_CASES.forEach(item => {
          if (!combined.some(c => c.id === item.id)) {
            combined.push(item);
          }
        });
        setCases(combined);
      });
  }, []);

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab !== 'tracker') {
      setTrackerInitialMnemonic('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.mainWrapper}>
      <Header activeTab={activeTab} onNavigate={handleNavigate} />

      <main className={styles.contentContainer}>
        {activeTab === 'home' && (
          <>
            <div className={styles.twoColGrid}>
              <div className={styles.leftCol}>
                <h1 className={styles.heroTitle}>
                  Laporkan Pungli Tanpa Jejak. Pantau Penanganannya Secara Terbuka.
                </h1>

                <p className={styles.heroLead}>
                  Kanal pengaduan untuk warga yang kena pungli. Laporan Anda dikirim secara
                  rahasia — tanpa nama, NIK, atau nomor HP. Setiap langkah penanganan oleh
                  inspektorat dicatat terbuka agar kasus tidak bisa ditutup diam-diam.
                </p>

                <div className={styles.heroMediaCard}>
                  <div className={styles.heroImageWrap}>
                    <img
                      src={heroImg}
                      alt="Gerbang Brankas Kriptografi Sipil dan Terminal Transparansi Publik"
                      className={styles.heroImage}
                    />
                    <div className={styles.imageOverlayBadge}>
                      <Lock size={12} aria-hidden="true" />
                      <span>LAPORAN DIKUNCI DI PERANGKAT ANDA</span>
                    </div>
                  </div>
                  <div className={styles.imageCaptionArea}>
                    <strong>Laporan Dikunci di Perangkat Anda:</strong> Dokumen bukti dikunci di perangkat Anda sebelum dikirimkan, sehingga tidak ada yang bisa membacanya — termasuk penyelenggara sistem.
                  </div>
                </div>

                <div className={styles.securityPillarCard} role="region" aria-labelledby="privacy-pillar-heading">
                  <div className={styles.pillarHeader}>
                    <div className={styles.pillarIconBox}>
                      <ShieldCheck size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <h2 id="privacy-pillar-heading" className={styles.pillarTitle}>
                        Laporan Anda Tidak Bisa Dibaca Oleh Siapapun
                      </h2>
                      <p className={styles.pillarSubtitle}>
                        Didesain untuk menjamin keamanan fisik dan hukum pelapor
                      </p>
                    </div>
                  </div>

                  <ul className={styles.pillarList}>
                    <li className={styles.pillarItem}>
                      <span className={styles.pillarMarker}>01</span>
                      <span><strong>Nol Data Pribadi (Zero-PII):</strong> Tidak memerlukan nama, NIK, alamat rumah, nomor HP, maupun surel.</span>
                    </li>
                    <li className={styles.pillarItem}>
                      <span className={styles.pillarMarker}>02</span>
                      <span><strong>Jejak Lokasi Dihapus Otomatis:</strong> Setiap foto bukti yang Anda lampirkan otomatis dihapus koordinat GPS dan info perangkat sebelum dikirim.</span>
                    </li>
                    <li className={styles.pillarItem}>
                      <span className={styles.pillarMarker}>03</span>
                      <span><strong>Kode Tiket 16 Kata:</strong> Laporan Anda hanya bisa dibuka dengan 16 kata rahasia yang Anda simpan sendiri. Tidak ada login, tidak ada email.</span>
                    </li>
                  </ul>
                </div>

                <div className={styles.ctaArea}>
                  <button
                    type="button"
                    className={styles.btnPrimary}
                    onClick={() => handleNavigate('vault')}
                    aria-label="Buka Form Pelaporan Terenkripsi"
                  >
                    <Lock size={16} aria-hidden="true" />
                    <span>Buat Laporan Terenkripsi</span>
                  </button>

                  <button
                    type="button"
                    className={styles.btnSecondary}
                    onClick={() => handleNavigate('timeline')}
                    aria-label="Lihat Linimasa Investigasi Publik"
                  >
                    <Eye size={16} aria-hidden="true" />
                    <span>Buka Linimasa Investigasi</span>
                  </button>

                  <button
                    type="button"
                    className={styles.btnSecondary}
                    onClick={() => handleNavigate('guide')}
                    aria-label="Pelajari Panduan Whistleblower"
                  >
                    <span>Baca Panduan Aman</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className={styles.rightCol}>
                <div className={styles.panelCard}>
                  <div className={styles.panelHeader}>
                    <div className={styles.panelTitleArea}>
                      <span className={styles.livePulseDot} aria-hidden="true" />
                      <h2 className={styles.panelTitle}>Kasus Dalam Pengawasan</h2>
                    </div>
                    <span className={styles.feedCountBadge}>{cases.length} Kasus Aktif</span>
                  </div>

                  <div className={styles.feedList}>
                    {cases.slice(0, 3).map((item) => (
                      <article key={item.id} className={styles.feedItem}>
                        <div className={styles.feedItemHeader}>
                          <span className={styles.caseId}>{item.id}</span>
                          <span className={`${styles.stageBadge} ${item.statusType === 'sanction' ? styles.badgeCrimson : styles.badgeAmber}`}>
                            {item.stageLabel}
                          </span>
                        </div>

                        <h3 className={styles.caseTitle}>{item.title}</h3>
                        <p className={styles.caseAgency}>{item.agencyReported}</p>
                        <p className={styles.caseAction}>{item.summaryAction}</p>

                        <div className={styles.feedItemFooter}>
                          <span className={styles.proofHash}>
                            <FileCheck2 size={12} aria-hidden="true" />
                            {item.cryptographicProofHash.substring(0, 20)}...
                          </span>
                          <span className={styles.slaTag}>
                            {item.slaRemainingDays === 0 ? 'Vonis Selesai' : `SLA: ${item.slaRemainingDays} Hari`}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={styles.viewAllBtn}
                    onClick={() => handleNavigate('timeline')}
                  >
                    <span>Buka Arsip & Linimasa Selengkapnya</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <section className={styles.investigativeFeatureSection} aria-labelledby="feature-audit-heading">
              <div className={styles.featureMedia}>
                <img
                  src={auditDocImg}
                  alt="Dokumen Laporan Hasil Pemeriksaan LHP dengan Stempel Kriptografis dan Segel Integritas"
                  className={styles.featureImg}
                />
              </div>
              <div className={styles.featureTextCol}>
                <span className={styles.featureEyebrow}>Akuntabilitas Penegakan Hukum</span>
                <h2 id="feature-audit-heading" className={styles.featureHeading}>
                  Audit Trail Kriptografis: Mencegah Kasus Dipeti-Eskan
                </h2>
                <p className={styles.featureParagraph}>
                  Setiap tahapan penanganan oleh Aparat Pengawas Internal Pemerintah (APIP) dan Inspektorat Wilayah
                  disertai stempel waktu digital dan bukti hash SHA-256 yang terpampang transparan bagi publik.
                </p>
                <div className={styles.featurePointList}>
                  <div className={styles.featurePointItem}>
                    <CheckCircle2 size={18} className={styles.featureCheckIcon} aria-hidden="true" />
                    <span><strong>SLA Waktu Terikat:</strong> Penghitung waktu mundur memastikan tahapan verifikasi tidak tertahan tanpa kejelasan.</span>
                  </div>
                  <div className={styles.featurePointItem}>
                    <CheckCircle2 size={18} className={styles.featureCheckIcon} aria-hidden="true" />
                    <span><strong>Bukti Bersifat Tamper-Evident:</strong> Log perkembangan kasus tidak dapat diedit atau dihapus secara diam-diam.</span>
                  </div>
                  <div className={styles.featurePointItem}>
                    <CheckCircle2 size={18} className={styles.featureCheckIcon} aria-hidden="true" />
                    <span><strong>Sanksi Berdampak Riil:</strong> Rujukan rekomendasi sanksi berat terhubung langsung dengan Dewan Pengawas, APIP, dan Kejaksaan Tipikor.</span>
                  </div>
                </div>
              </div>
            </section>

            <NationalMetricTicker />
          </>
        )}

        {activeTab === 'timeline' && (
          <PublicAuditTimeline cases={cases} />
        )}

        {activeTab === 'vault' && (
          <div style={{ maxWidth: '820px', margin: '0 auto', width: '100%' }}>
            <VaultReportForm
              onCancel={() => handleNavigate('home')}
              onSuccessDone={() => handleNavigate('timeline')}
              onCheckStatusDirectly={(mnemonic) => {
                setTrackerInitialMnemonic(mnemonic);
                setActiveTab('tracker');
              }}
              onReportCreated={(newIncident) => {
                setCases(prev => [newIncident, ...prev.filter(c => c.id !== newIncident.id)]);
              }}
            />
          </div>
        )}

        {activeTab === 'tracker' && (
          <div style={{ maxWidth: '820px', margin: '0 auto', width: '100%' }}>
            <ReportTracker
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
            onViewTimeline={() => handleNavigate('timeline')}
          />
        )}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLeft}>
            <strong style={{ color: 'var(--color-obsidian)', fontSize: '14px' }}>
              LaporPungli Aman — Kanal Civic Tech Anti-Korupsi
            </strong>
            <span>
              Rujukan Regulasi: UU No. 37/2008 (Ombudsman RI), Perpres No. 87/2016 (Saber Pungli), UU No. 31/2014 (LPSK), UU No. 14/2008 (KIP)
            </span>
            <div className={styles.footerNavLinks}>
              <button type="button" className={styles.footerNavLink} onClick={() => handleNavigate('home')}>Beranda</button>
              <span className={styles.footerSeparator}>•</span>
              <button type="button" className={styles.footerNavLink} onClick={() => handleNavigate('timeline')}>Linimasa Publik</button>
              <span className={styles.footerSeparator}>•</span>
              <button type="button" className={styles.footerNavLink} onClick={() => handleNavigate('tracker')}>Status Tiket</button>
              <span className={styles.footerSeparator}>•</span>
              <button type="button" className={styles.footerNavLink} onClick={() => handleNavigate('guide')}>Panduan Whistleblower</button>
              <span className={styles.footerSeparator}>•</span>
              <button type="button" className={styles.footerNavLink} onClick={() => handleNavigate('faq')}>FAQ & Bantuan</button>
              <span className={styles.footerSeparator}>•</span>
              <button type="button" className={styles.footerNavLink} onClick={() => handleNavigate('about')}>Tentang Inisiatif</button>
            </div>
          </div>
          <div className={styles.footerRight}>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
