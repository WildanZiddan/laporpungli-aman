import React, { useState } from 'react';
import { FileText, RefreshCw, Landmark, Check, Clock, ArrowRight } from 'lucide-react';
import styles from './NationalAnalyticsDashboard.module.css';

interface SectorStat {
  id: string;
  label: string;
  percent: number;
  count: string;
  color: string;
}

interface RegionStat {
  rank: string;
  name: string;
  cases: string;
  completionRate: number;
  barWidthPercent: number;
  color: string;
  badgeBg: string;
  badgeText: string;
}

interface NationalAnalyticsDashboardProps {
  onStartReport: () => void;
  onViewCases: () => void;
}

const SECTOR_STATS: SectorStat[] = [
  { id: 'ptsl', label: 'Pertanahan & PTSL', percent: 38, count: '29.796', color: '#10b981' },
  { id: 'ppdb', label: 'Pendidikan & Sekolah (PPDB)', percent: 24, count: '18.818', color: '#f59e0b' },
  { id: 'rutan', label: 'Lembaga Pemasyarakatan & Rutan', percent: 18, count: '14.114', color: '#6366f1' },
  { id: 'dukcapil', label: 'Kependudukan (Dukcapil)', percent: 12, count: '9.409', color: '#2563eb' },
  { id: 'samsat', label: 'Sektor Lainnya & Samsat', percent: 8, count: '6.275', color: '#ef4444' }
];

const REGION_STATS: RegionStat[] = [
  {
    rank: '01',
    name: 'Jawa Barat',
    cases: '21.412 Kasus',
    completionRate: 90,
    barWidthPercent: 90,
    color: '#10b981',
    badgeBg: '#ecfdf5',
    badgeText: '#047857'
  },
  {
    rank: '02',
    name: 'DKI Jakarta',
    cases: '18.520 Kasus',
    completionRate: 85,
    barWidthPercent: 85,
    color: '#2563eb',
    badgeBg: '#eff6ff',
    badgeText: '#1d4ed8'
  },
  {
    rank: '03',
    name: 'Jawa Timur',
    cases: '14.120 Kasus',
    completionRate: 78,
    barWidthPercent: 78,
    color: '#f59e0b',
    badgeBg: '#fffbeb',
    badgeText: '#b45309'
  },
  {
    rank: '04',
    name: 'Sumatera Utara',
    cases: '12.010 Kasus',
    completionRate: 88,
    barWidthPercent: 88,
    color: '#ef4444',
    badgeBg: '#fef2f2',
    badgeText: '#b91c1c'
  },
  {
    rank: '05',
    name: 'Jawa Tengah',
    cases: '9.012 Kasus',
    completionRate: 84,
    barWidthPercent: 84,
    color: '#7c3aed',
    badgeBg: '#f5f3ff',
    badgeText: '#5b21b6'
  }
];

const SECTOR_SLICES = SECTOR_STATS.reduce<Array<SectorStat & { startPercent: number }>>(
  (acc, sector) => {
    const prev = acc[acc.length - 1];
    const startPercent = prev ? prev.startPercent + prev.percent : 0;
    acc.push({ ...sector, startPercent });
    return acc;
  },
  []
);

export const NationalAnalyticsDashboard: React.FC<NationalAnalyticsDashboardProps> = ({
  onStartReport,
  onViewCases
}) => {
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  const radius = 56;
  const circumference = 2 * Math.PI * radius;

  const activeSector = SECTOR_STATS.find((s) => s.id === hoveredSector) || null;

  return (
    <section className={styles.section} aria-labelledby="analytics-heading">
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <span className={styles.eyebrow}>Keterbukaan Informasi Publik</span>
          <h2 id="analytics-heading" className={styles.heading}>
            Dashboard Transparansi &amp; Data Pungli Nasional
          </h2>
          <p className={styles.subtitle}>
            Data publik pengawasan internal dan sebaran daerah untuk memastikan tidak ada laporan warga yang diabaikan atau dipeti-eskan.
          </p>
        </div>

        <span className={styles.updatedBadge}>
          <Clock size={14} aria-hidden="true" />
          <span>Data Diperbarui Hari Ini, 09:30 WIB</span>
        </span>
      </div>

      <div className={styles.metricsGrid}>
        <article className={styles.metricCard}>
          <div className={styles.metricTop}>
            <span className={styles.metricLabel}>Total Laporan Warga Diterima</span>
            <div className={styles.metricIconWrap}>
              <FileText size={16} aria-hidden="true" />
            </div>
          </div>
          <div className={styles.metricValue}>78.412</div>
          <div className={styles.metricMeta}>
            <Check size={14} aria-hidden="true" />
            <span>100% anonimitas terlindung</span>
          </div>
        </article>

        <article className={styles.metricCard}>
          <div className={styles.metricTop}>
            <span className={styles.metricLabel}>Tingkat Tindak Lanjut Inspektorat</span>
            <div className={styles.metricIconWrap}>
              <RefreshCw size={16} aria-hidden="true" />
            </div>
          </div>
          <div className={styles.metricValue}>84,6%</div>
          <div className={`${styles.metricMeta} ${styles.metricMetaNeutral}`}>
            <Check size={14} color="#2563eb" aria-hidden="true" />
            <span>66.336 kasus telah diperiksa</span>
          </div>
        </article>

        <article className={styles.metricCard}>
          <div className={styles.metricTop}>
            <span className={styles.metricLabel}>Nilai Pungli &amp; Aset Diamankan</span>
            <div className={styles.metricIconWrap}>
              <Landmark size={16} aria-hidden="true" />
            </div>
          </div>
          <div className={styles.metricValue}>Rp 325,8 M</div>
          <div className={`${styles.metricMeta} ${styles.metricMetaNeutral}`}>
            <span>Diselamatkan ke kas negara &amp; korban</span>
          </div>
        </article>
      </div>

      <div className={styles.chartsGrid}>
        <article className={styles.chartCard} aria-labelledby="donut-chart-title">
          <div>
            <div className={styles.chartHeader}>
              <h3 id="donut-chart-title" className={styles.chartTitle}>
                Sebaran Sektor &amp; Instansi Terbanyak
              </h3>
              <span className={styles.chartBadge}>Proporsi Nasional</span>
            </div>
            <p className={styles.chartSubtitle}>
              Kategori instansi yang paling sering dilaporkan warga terkait pemerasan atau pungutan di luar tarif resmi.
            </p>

            <div className={styles.donutBody}>
              <div className={styles.donutWrap}>
                <svg viewBox="0 0 160 160" className={styles.donutSvg} role="img" aria-label="Grafik donat proporsi sektor pungli">
                  {SECTOR_SLICES.map((sector) => {
                    const strokeLength = (sector.percent / 100) * circumference;
                    const gapLength = circumference - strokeLength;
                    const offset = -(sector.startPercent / 100) * circumference;

                    const isDimmed = hoveredSector !== null && hoveredSector !== sector.id;
                    const isHighlighted = hoveredSector === sector.id;

                    return (
                      <circle
                        key={sector.id}
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="transparent"
                        stroke={sector.color}
                        strokeWidth={isHighlighted ? 26 : 22}
                        strokeDasharray={`${Math.max(0, strokeLength - 2)} ${gapLength + 2}`}
                        strokeDashoffset={offset}
                        opacity={isDimmed ? 0.35 : 1}
                        className={styles.donutSlice}
                        onMouseEnter={() => setHoveredSector(sector.id)}
                        onMouseLeave={() => setHoveredSector(null)}
                      />
                    );
                  })}
                </svg>

                <div className={styles.donutCenter}>
                  <span className={styles.donutCenterValue}>
                    {activeSector ? `${activeSector.percent}%` : '5'}
                  </span>
                  <span className={styles.donutCenterLabel}>
                    {activeSector ? `${activeSector.count} Kasus` : 'Sektor Utama'}
                  </span>
                </div>
              </div>

              <div className={styles.legendList}>
                {SECTOR_STATS.map((sector) => (
                  <div
                    key={sector.id}
                    className={`${styles.legendItem} ${hoveredSector === sector.id ? styles.legendItemActive : ''}`}
                    onMouseEnter={() => setHoveredSector(sector.id)}
                    onMouseLeave={() => setHoveredSector(null)}
                  >
                    <div className={styles.legendLeft}>
                      <span className={styles.legendDot} style={{ backgroundColor: sector.color }} />
                      <span className={styles.legendName}>{sector.label}</span>
                    </div>
                    <div className={styles.legendRight}>
                      <span className={styles.legendPercent}>{sector.percent}%</span>
                      <span className={styles.legendCount}>({sector.count})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className={styles.chartFootnote}>
              *Data agregat berbasis kompilasi laporan nasional Satgas Saber Pungli Kemenko Polhukam &amp; SPI KPK yang divalidasi secara berjenjang.
            </p>
            <div className={styles.chartFooterAction}>
              <span>Transparansi Penanganan Kasus</span>
              <button
                type="button"
                className={styles.btnViewCases}
                onClick={onViewCases}
              >
                <span>Lihat Laporan Sedang &amp; Sudah Diproses</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        </article>

        <article className={styles.chartCard} aria-labelledby="region-chart-title">
          <div>
            <div className={styles.chartHeader}>
              <h3 id="region-chart-title" className={styles.chartTitle}>
                5 Daerah dengan Laporan Tertinggi
              </h3>
              <span className={`${styles.chartBadge} ${styles.chartBadgeGreen}`}>Terkawal Ketat</span>
            </div>
            <p className={styles.chartSubtitle}>
              Tingkat tindak lanjut menunjukkan persentase kasus yang telah diteruskan ke sidang etik atau penyidikan.
            </p>

            <div className={styles.regionList}>
              {REGION_STATS.map((reg) => (
                <div key={reg.rank} className={styles.regionItem}>
                  <div className={styles.regionRowTop}>
                    <div className={styles.regionNameWrap}>
                      <span className={styles.regionRank}>{reg.rank}</span>
                      <span className={styles.regionName}>{reg.name}</span>
                    </div>
                    <div className={styles.regionMeta}>
                      <span className={styles.regionCount}>{reg.cases}</span>
                      <span
                        className={styles.regionRateBadge}
                        style={{ backgroundColor: reg.badgeBg, color: reg.badgeText }}
                      >
                        {reg.completionRate}% Selesai
                      </span>
                    </div>
                  </div>
                  <div className={styles.barTrack} role="progressbar" aria-valuenow={reg.completionRate} aria-valuemin={0} aria-valuemax={100} aria-label={`${reg.name} tingkat penyelesaian ${reg.completionRate}%`}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${reg.barWidthPercent}%`, backgroundColor: reg.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.chartFooterAction}>
            <span>Sumber: Satgas Saber Pungli &amp; Ombudsman Wilayah</span>
            <button
              type="button"
              className={styles.btnMapLink}
              onClick={onStartReport}
            >
              <span>Laporkan Pungli di Daerah Anda</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};
