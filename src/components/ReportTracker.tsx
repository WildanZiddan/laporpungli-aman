import React, { useState, useEffect } from 'react';
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
  const [mnemonicInput, setMnemonicInput] = useState<string>(initialMnemonic || '');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [matchedReport, setMatchedReport] = useState<IStoredVaultReport | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedTicket, setCopiedTicket] = useState<boolean>(false);

  useEffect(() => {
    if (initialMnemonic) {
      handleDecrypt(initialMnemonic);
    }
  }, [initialMnemonic]);

  const wordCount = mnemonicInput.trim() ? mnemonicInput.trim().split(/\s+/).filter(Boolean).length : 0;

  const handleDecrypt = (phraseToTest?: string) => {
    const phrase = phraseToTest || mnemonicInput;
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
          'Kode tiket tidak ditemukan. Pastikan Anda mengetikkan 16 kata rahasia dengan benar, dipisahkan satu spasi. Periksa kembali catatan tiket Anda.'
        );
      }
    }, 350);
  };

  const handleCopyTicket = (ticketId: string) => {
    navigator.clipboard.writeText(ticketId);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2000);
  };

  return (
    <div className={styles.trackerContainer} role="region" aria-label="Pelacak Tiket Rahasia">
      <div className={styles.trackerHeader}>
        <div className={styles.titleArea}>
          <h1 className={styles.mainTitle}>Pelacak Status Investigasi Terenkripsi</h1>
          <p className={styles.subTitle}>
            Dekripsi status tindak lanjut inspektorat secara langsung di peramban Anda menggunakan 16 kata rahasia.
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
              16 Kata Kode Tiket Rahasia Anda
            </label>
            <span className={`${styles.wordCounter} ${wordCount === 16 ? styles.counterValid : styles.counterInvalid}`}>
              {wordCount} / 16 kata
            </span>
          </div>

          <textarea
            id="mnemonic-textarea"
            className={styles.textarea}
            rows={3}
            placeholder="Ketik atau tempel 16 kata rahasia Anda di sini (dipisahkan spasi)..."
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
                <span>Mendekripsi Data di Peramban...</span>
              </>
            ) : (
              <>
                <KeyRound size={15} />
                <span>Dekripsi & Ambil Status Laporan</span>
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
                  title="Salin Nomor Tiket"
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
                  ? `SLA Penanganan: H-${matchedReport.slaRemainingDays} Hari Kerja`
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
              <span className={styles.metaLabel}>Integritas Berkas Bukti</span>
              <span className={styles.metaVal} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--status-green)' }}>
                {matchedReport.hasEvidenceFile ? 'EXIF Steril (Canvas Scrubber)' : 'Tanpa Lampiran Foto'}
              </span>
            </div>
          </div>

          <div className={styles.descBox}>
            <span className={styles.descTitle}>Uraian Kronologi (Didekripsi dari Brankas Klien)</span>
            <p className={styles.descContent}>{matchedReport.incidentDescription}</p>
          </div>

          <div className={styles.apipNotesCard}>
            <div className={styles.apipHeader}>
              <ShieldCheck size={16} />
              <span>Catatan Resmi Tim Pemeriksa Inspektorat / APIP</span>
            </div>
            <p className={styles.apipText}>{matchedReport.inspectorateNotes}</p>
            <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 4 }}>
              <strong>Dasar Regulasi Penindakan:</strong> {matchedReport.legalReference}
            </div>
          </div>

          <div className={styles.milestonesSection}>
            <h3 className={styles.milestonesTitle}>Linimasa Tahapan Investigasi Kasus Ini</h3>
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
                      Hash Tahap: {m.stageHash}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: 'var(--space-4)', display: 'flex', gap: '12px' }}>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={() => {
                setMatchedReport(null);
                setMnemonicInput('');
              }}
            >
              <Search size={14} style={{ display: 'inline', marginRight: 6 }} />
              <span>Cek Tiket Lain</span>
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
