import React, { useState } from 'react';
import type { ITicketReceipt } from '../types';
import { formatRupiah } from '../utils/webCrypto';
import { Copy, Check, Download, ShieldCheck, AlertTriangle, ArrowRight, KeyRound } from 'lucide-react';
import styles from './SecretTicketCard.module.css';

interface SecretTicketCardProps {
  receipt: ITicketReceipt;
  onDone: () => void;
  onCheckStatus?: (mnemonic: string) => void;
}

export const SecretTicketCard: React.FC<SecretTicketCardProps> = ({ receipt, onDone, onCheckStatus }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const words = receipt.mnemonicPhrase.split(' ');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(receipt.mnemonicPhrase);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = receipt.mnemonicPhrase;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    const fileContent = `================================================================================
CATATAN SANDI PELACAK LAPORAN — LAPORPUNGLI AMAN
================================================================================

Nomor Laporan        : ${receipt.ticketId}
Waktu Pengiriman     : ${new Date(receipt.createdAt).toLocaleString('id-ID')}
Instansi Terlapor    : ${receipt.agencyReported}
Kategori Layanan     : ${receipt.categoryLabel}
Estimasi Pungutan    : ${formatRupiah(receipt.amountRupiah)}
Segel Bukti Foto     : ${receipt.sanitizedEvidenceHash}

--------------------------------------------------------------------------------
16 KATA SANDI RAHASIA PELACAK LAPORAN:
--------------------------------------------------------------------------------
${receipt.mnemonicPhrase}

--------------------------------------------------------------------------------
PETUNJUK KESELAMATAN & PELACAKAN:
1. Simpan catatan ini di tempat yang aman dan tidak terhubung ke akun publik Anda.
2. Sistem LaporPungli Aman TIDAK MENYIMPAN nama, KTP, nomor HP, atau akun Anda.
3. 16 kata di atas adalah SATU-SATUNYA cara Anda membuka dan memantau status
   penanganan laporan ini melalui menu "Lacak Laporan".
4. Jangan pernah membagikan 16 kata ini kepada siapa pun yang tidak Anda percayai.
================================================================================`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SANDI-LAPORPUNGLI-${receipt.ticketId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.ticketCard} role="region" aria-label="Kartu Tiket Rahasia">
      <div className={styles.ticketHeader}>
        <div className={styles.ticketTitleArea}>
          <span className={styles.receiptBadge}>
            <ShieldCheck size={12} style={{ display: 'inline', marginRight: 4 }} />
            TERKUNCI AMAN DI PERANGKAT ANDA
          </span>
          <h2 className={styles.ticketTitle}>16 Kata Sandi Pelacak Anda</h2>
        </div>
        <div className={styles.ticketIdBox}>
          <span className={styles.ticketIdLabel}>Nomor Laporan</span>
          <span className={styles.ticketIdVal}>{receipt.ticketId}</span>
        </div>
      </div>

      <div className={styles.securityNotice}>
        <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: 1 }} />
        <span>
          <strong>Wajib Dicatat / Diunduh:</strong> Sistem kami tidak menyimpan akun Anda. 16 kata di bawah adalah satu-satunya kunci pribadi Anda untuk melacak perkembangan laporan ini.
        </span>
      </div>

      <div className={styles.wordsGrid} aria-label="16 Kata Rahasia Mnemonic">
        {words.map((word, idx) => (
          <div key={idx} className={styles.wordPill}>
            <span className={styles.wordIndex}>{(idx + 1).toString().padStart(2, '0')}.</span>
            <span className={styles.wordText}>{word}</span>
          </div>
        ))}
      </div>

      <div className={styles.detailsBox}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Kategori Layanan</span>
          <span className={styles.detailVal}>{receipt.categoryLabel}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Instansi Terlapor</span>
          <span className={styles.detailVal}>{receipt.agencyReported}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Estimasi Pungutan</span>
          <span className={styles.detailVal}>{formatRupiah(receipt.amountRupiah)}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Status Bukti Foto</span>
          <span className={styles.detailVal} style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
            {receipt.sanitizedEvidenceHash !== 'sha256:none' ? 'Foto Bersih (GPS & Info Perangkat Terhapus)' : 'Tanpa Lampiran Foto'}
          </span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Waktu Pengiriman</span>
          <span className={styles.detailVal} style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
            {new Date(receipt.createdAt).toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      <div className={styles.actionRow}>
        <button
          type="button"
          onClick={handleCopy}
          className={`${styles.btnAction} ${styles.btnCopy}`}
          aria-label="Salin 16 kata rahasia ke papan klip"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? 'Tersalin ke Papan Klip!' : 'Salin 16 Kata'}</span>
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className={`${styles.btnAction} ${styles.btnDownload}`}
          aria-label="Simpan catatan sandi format teks"
        >
          <Download size={16} />
          <span>Simpan Catatan Sandi (.txt)</span>
        </button>

        {onCheckStatus && (
          <button
            type="button"
            onClick={() => onCheckStatus(receipt.mnemonicPhrase)}
            className={`${styles.btnAction} ${styles.btnTrack}`}
          >
            <KeyRound size={15} />
            <span>Lacak Laporan Ini Sekarang</span>
          </button>
        )}

        <button
          type="button"
          onClick={onDone}
          className={`${styles.btnAction} ${styles.btnDone}`}
        >
          <span>Selesai &amp; Kembali ke Beranda</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
