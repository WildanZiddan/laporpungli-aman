import React, { useState, useMemo } from 'react';
import type { IPublicIncidentLog, PungliCategory } from '../types';
import { IncidentDetailModal } from './IncidentDetailModal';
import { 
  Search, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Filter 
} from 'lucide-react';
import styles from './PublicAuditTimeline.module.css';

interface PublicAuditTimelineProps {
  cases: IPublicIncidentLog[];
}

const CATEGORY_TABS: { id: 'ALL' | PungliCategory; label: string }[] = [
  { id: 'ALL', label: 'Semua Kasus' },
  { id: 'PTSL_BPN', label: 'Pertanahan & PTSL' },
  { id: 'SATPAS_SAMSAT', label: 'Kepolisian & SIM' },
  { id: 'PPDB_SEKOLAH', label: 'Pendidikan & PPDB' },
  { id: 'RUTAN_LAPAS', label: 'Rutan & Lapas' },
  { id: 'PERIZINAN_PEMDA', label: 'Perizinan Pemda' }
];

const FIVE_STAGES = [
  { num: 1, name: 'Verifikasi' },
  { num: 2, name: 'Forensik' },
  { num: 3, name: 'Klarifikasi' },
  { num: 4, name: 'Majelis Etik' },
  { num: 5, name: 'Sanksi' }
];

export const PublicAuditTimeline: React.FC<PublicAuditTimelineProps> = ({ cases }) => {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | PungliCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIncident, setSelectedIncident] = useState<IPublicIncidentLog | null>(null);

  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchQuery = 
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.agencyReported.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchQuery;
    });
  }, [cases, selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: cases.length };
    cases.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, [cases]);

  return (
    <div className={styles.timelineContainer} role="region" aria-label="Linimasa Audit Publik">
      <div className={styles.timelineHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.heading}>Linimasa Akuntabilitas & Investigasi Publik</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '12px', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
            <ShieldCheck size={14} color="var(--status-green)" />
            <span>IMMUTABLE AUDIT LOG (SHA-256)</span>
          </div>
        </div>
        <p className={styles.leadText}>
          Setiap laporan yang masuk ke inspektorat daerah atau dewan pengawas dipublikasikan tahapannya secara terbuka. Warga dapat memantau batas waktu penyelesaian (SLA) dan mengaudit hasil pemeriksaan tanpa mengekspos data pribadi pelapor.
        </p>
      </div>

      <div className={styles.controlsBar}>
        <div className={styles.tabList} role="tablist" aria-label="Filter Kategori Kasus">
          {CATEGORY_TABS.map((tab) => {
            const count = categoryCounts[tab.id] || 0;
            const isActive = selectedCategory === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ''}`}
                onClick={() => setSelectedCategory(tab.id)}
              >
                <span>{tab.label}</span>
                <span className={styles.badgeCount}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.searchBox}>
          <Search size={14} color="var(--text-subtle)" />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Cari instansi, judul kasus, atau nomor tiket..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Cari arsip kasus publik"
          />
        </div>
      </div>

      {filteredCases.length > 0 ? (
        <div className={styles.cardsList}>
          {filteredCases.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.cardTopRow}>
                <div className={styles.idAndCat}>
                  <span className={styles.caseId}>{item.id}</span>
                  <span className={styles.catBadge}>{item.categoryLabel}</span>
                </div>
                <span className={`${styles.stageStatusBadge} ${item.statusType === 'sanction' ? styles.badgeCrimson : styles.badgeAmber}`}>
                  {item.stageLabel}
                </span>
              </div>

              <div>
                <h2 className={styles.caseTitle}>{item.title}</h2>
                <p className={styles.caseAgency}>
                  <strong>Instansi Terlapor:</strong> {item.agencyReported}
                </p>
              </div>

              <p className={styles.caseSummary}>{item.summaryAction}</p>

              <div className={styles.miniStepperContainer} aria-label="Progres 5 Tahap Penanganan">
                {FIVE_STAGES.map((stg, i) => {
                  const isCompleted = item.stageNumber > stg.num;
                  const isCurrent = item.stageNumber === stg.num;

                  return (
                    <React.Fragment key={stg.num}>
                      <div className={styles.stepperItem}>
                        <div 
                          className={`${styles.stepDot} ${
                            isCompleted ? styles.stepDotCompleted : isCurrent ? styles.stepDotCurrent : ''
                          }`}
                        >
                          {isCompleted ? <Check size={11} /> : stg.num}
                        </div>
                        <span className={`${styles.stepName} ${isCurrent ? styles.stepNameActive : ''}`}>
                          {stg.name}
                        </span>
                      </div>
                      {i < FIVE_STAGES.length - 1 && <div className={styles.stepperDivider} />}
                    </React.Fragment>
                  );
                })}
              </div>

              <div className={styles.cardBottom}>
                <div className={styles.proofArea}>
                  <span className={styles.hashTag} title="Cryptographic Hash SHA-256">
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>PROOF:</span> {item.cryptographicProofHash.substring(0, 22)}...
                  </span>
                  <span className={styles.slaBadge}>
                    <Clock size={12} style={{ display: 'inline', marginRight: 4 }} />
                    {item.slaRemainingDays > 0 ? `SLA: Tersisa ${item.slaRemainingDays} Hari Kerja` : 'Status: Putusan Selesai'}
                  </span>
                </div>

                <button
                  type="button"
                  className={styles.btnDetail}
                  onClick={() => setSelectedIncident(item)}
                  aria-label={`Buka audit forensik lengkap kasus ${item.id}`}
                >
                  <span>Rincian Audit Forensik (5 Tahap)</span>
                  <ExternalLink size={13} />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <Filter size={32} color="var(--text-subtle)" />
          <strong style={{ color: 'var(--text-main)' }}>Tidak Ada Kasus yang Sesuai dengan Kriteria</strong>
          <span style={{ fontSize: '13px' }}>Coba ubah kata kunci pencarian atau pilih tab kategori yang lain.</span>
          <button
            type="button"
            className={styles.filterBtn}
            onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
            style={{ marginTop: 8 }}
          >
            Reset Filter
          </button>
        </div>
      )}

      <IncidentDetailModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />
    </div>
  );
};
