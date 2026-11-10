import React, { useState, useCallback } from 'react';
import {
  findReportByMnemonic,
  type IStoredVaultReport
} from '../utils/reportStorage';
import { formatRupiah } from '../utils/webCrypto';
import {
  KeyRound,
  Search,
  ShieldCheck,
  Clock,
  AlertCircle,
  ArrowLeft,
  Check,
  Lock,
  Copy
} from 'lucide-react';
import styles from './ReportTracker.module.css';

interface ReportTrackerProps {
  onBack: () => void;
  initialMnemonic?: string;
}

export const ReportTracker: React.FC<ReportTrackerProps> = ({ onBack, initialMnemonic }) => {
  const initialTrimmed = (initialMnemonic || '').trim();
  const initialFound = initialTrimmed ? findReportByMnemonic(initialTrimmed) : null;

  const [mnemonicInput, setMnemonicInput] = useState<string>(initialTrimmed);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [matchedReport, setMatchedReport] = useState<IStoredVaultReport | null>(initialFound);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    initialTrimmed && !initialFound
      ? 'Laporan tidak ditemukan. Pastikan Anda mengetikkan 16 kata sandi rahasia dengan benar (dipisahkan spasi) atau nomor laporan yang valid.'
      : null
  );
  const [copiedTicket, setCopiedTicket] = useState<boolean>(false);

  const handleDecrypt = useCallback((phraseToTest?: string) => {
    const phrase = (phraseToTest ?? mnemonicInput).trim();
    if (!phrase) return;
    setErrorMessage(null);
    setIsSearching(true);

    setTimeout(() => {
      const result = findReportByMnemonic(phrase);
      setIsSearching(false);

      if (result) {
        setMatchedReport(result);
        setErrorMessage(null);
      } else {
        setMatchedReport(null);
        setErrorMessage(
          'Laporan tidak ditemukan. Pastikan Anda mengetikkan 16 kata sandi rahasia dengan benar (dipisahkan spasi) atau nomor laporan yang valid.'
        );
      }
    }, 350);
  }, [mnemonicInput]);

  const wordCount = mnemonicInput.trim() ? mnemonicInput.trim().split(/\s+/).filter(Boolean).length : 0;

  const handleCopyTicket = (ticketId: string) => {
    navigator.clipboard.writeText(ticketId);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2000);
  };

  return (
    <div className={styles.trackerContainer} role="region" aria-label="Lacak Status Laporan">
      <div className={styles.trackerHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.mainTitle}>Lacak Status Laporan Anda</h1>
          <p className={styles.subTitle}>
            Pantau perkembangan penanganan laporan tanpa perlu membuat akun. Cukup masukkan 16 kata sandi rahasia atau nomor laporan Anda.
          </p>
        </div>
        <button type="button" className={styles.resetBtn} onClick={onBack}>
          <ArrowLeft size={14} style={{ display: 'inline', marginRight: 4 }} />
          <span>Kembali ke Beranda</span>
        </button>
      </div>

      {!matchedReport && (
        <div className={styles.inputSection}>
          <div className={styles.labelRow}>
            <label htmlFor="mnemonic-textarea" className={styles.label}>
              16 Kata Sandi Rahasia atau Nomor Laporan
            </label>
            <span className={`${styles.wordCounter} ${wordCount === 16 ? styles.counterValid : styles.counterInvalid}`}>
              {wordCount} kata terisi
            </span>
          </div>

          <textarea
            id="mnemonic-textarea"
            className={styles.textarea}
            rows={3}
            placeholder="Ketik atau tempel 16 kata sandi rahasia atau nomor laporan Anda..."
            value={mnemonicInput}
            onChange={(e) => {
              setMnemonicInput(e.target.value);
              setErrorMessage(null);
            }}
          />

          {errorMessage && (
            <div className={styles.errorMessage} role="alert">
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="button"
            className={styles.btnDecrypt}
            disabled={wordCount === 0 || isSearching}
            onClick={() => handleDecrypt()}
          >
            {isSearching ? (
              <>
                <Lock size={15} />
                <span>Membuka Status Laporan...</span>
              </>
            ) : (
              <>
                <KeyRound size={15} />
                <span>Cek Status Laporan Sekarang</span>
              </>
            )}
          </button>
        </div>
      )}

      {matchedReport && (
        <div className={styles.decryptedCard}>
          <div className={styles.caseHeaderBar}>
            <div className={styles.ticketBadgeBox}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className={styles.ticketIdText}>{matchedReport.ticketId}</span>
                <button
                  type="button"
                  onClick={() => handleCopyTicket(matchedReport.ticketId)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)' }}
                  title="Salin Nomor Laporan"
                >
                  {copiedTicket ? <Check size={14} style={{ color: 'var(--status-green)' }} /> : <Copy size={14} />}
                </button>
              </div>
              <span className={`${styles.stagePill} ${matchedReport.stageNumber === 5 ? styles.stageCrimson : styles.stageAmber}`}>
                {matchedReport.stageLabel}
              </span>
            </div>

            <div className={styles.slaBox}>
              <Clock size={14} />
              <span>
                {matchedReport.slaRemainingDays > 0
                  ? `Batas Waktu Penanganan: ${matchedReport.slaRemainingDays} Hari Kerja`
                  : 'STATUS: PUTUSAN VONIS SELESAI'}
              </span>
            </div>
          </div>

          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Instansi Terlapor</span>
              <span className={styles.metaVal}>{matchedReport.agencyReported}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Kategori Layanan</span>
              <span className={styles.metaVal}>{matchedReport.categoryLabel}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Estimasi Nominal Pungli</span>
              <span className={`${styles.metaVal} ${styles.amountVal}`}>
                {formatRupiah(matchedReport.extortionAmountRupiah)}
              </span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Lokasi Kabupaten/Kota</span>
              <span className={styles.metaVal}>{matchedReport.locationCity}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Waktu Masuk Laporan</span>
              <span className={styles.metaVal} style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                {new Date(matchedReport.createdAt).toLocaleString('id-ID')}
              </span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Keamanan Berkas Bukti</span>
              <span className={styles.metaVal} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--status-green)' }}>
                {matchedReport.hasEvidenceFile ? 'GPS & Info Perangkat Sudah Dihapus' : 'Tanpa Lampiran Foto'}
              </span>
            </div>
          </div>

          <div className={styles.descBox}>
            <span className={styles.descTitle}>Uraian Kejadian Laporan Anda</span>
            <p className={styles.descContent}>{matchedReport.incidentDescription}</p>
          </div>

          <div className={styles.apipNotesCard}>
            <div className={styles.apipHeader}>
              <ShieldCheck size={16} />
              <span>Catatan Resmi Tim Pemeriksa / Inspektorat</span>
            </div>
            <p className={styles.apipText}>{matchedReport.inspectorateNotes}</p>
            <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 4 }}>
              <strong>Dasar Hukum Penindakan:</strong> {matchedReport.legalReference}
            </div>
          </div>

          <div className={styles.milestonesSection}>
            <h3 className={styles.milestonesTitle}>Riwayat Perkembangan Penanganan Kasus</h3>
            <div>
              {matchedReport.timelineMilestones.map((m) => (
                <div key={m.stageNumber} className={styles.milestoneItem}>
                  <div className={`${styles.milestoneDot} ${m.status === 'completed' ? styles.dotCompleted : m.status === 'current' ? styles.dotCurrent : styles.dotPending}`}>
                    {m.status === 'completed' ? '✓' : m.stageNumber}
                  </div>
                  <div className={styles.milestoneBody}>
                    <div className={styles.milestoneHeadRow}>
                      <span className={styles.milestoneName}>{m.stageName}</span>
                      <span className={styles.milestoneDate}>{m.date}</span>
                    </div>
                    <span className={styles.milestoneActor}>Pihak Berwenang: {m.actor}</span>
                    <p className={styles.milestoneSummary}>{m.actionSummary}</p>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-subtle)' }}>
                      Segel Verifikasi: {m.stageHash}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: 'var(--space-4)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={() => {
                setMatchedReport(null);
                setMnemonicInput('');
              }}
            >
              <Search size={14} style={{ display: 'inline', marginRight: 6 }} />
              <span>Lacak Laporan Lain</span>
            </button>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={onBack}
            >
              <span>Kembali ke Beranda</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
