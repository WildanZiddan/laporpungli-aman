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
KARTU TIKET RAHASIA PELAPORAN — LAPORPUNGLI AMAN
SISTEM ADVOKASI PUBLIK ZERO-KNOWLEDGE
================================================================================

Nomor Tiket Publik   : ${receipt.ticketId}
Waktu Enkripsi       : ${new Date(receipt.createdAt).toLocaleString('id-ID')}
Instansi Terlapor    : ${receipt.agencyReported}
Kategori Layanan     : ${receipt.categoryLabel}
Estimasi Pungutan    : ${formatRupiah(receipt.amountRupiah)}
Hash Bukti Steril    : ${receipt.sanitizedEvidenceHash}

--------------------------------------------------------------------------------
KUNCI RAHASIA PELAPOR (16 KATA MNEMONIC):
--------------------------------------------------------------------------------
${receipt.mnemonicPhrase}

--------------------------------------------------------------------------------
PETUNJUK KESELAMATAN & PENGAWASAN:
1. Simpan berkas ini di media yang aman dan tidak terhubung akun publik Anda.
2. Server LaporPungli Aman TIDAK MENYIMPAN nama, NIK, nomor telepon, atau kata sandi Anda.
3. 16 kata di atas adalah SATU-SATUNYA cara Anda mendekripsi pesan dua arah atau
   memantau tahapan audit investigasi inspektorat.
4. Jangan pernah membagikan 16 kata ini kepada siapa pun yang tidak Anda percayai.
================================================================================`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TIKET-LAPORPUNGLI-${receipt.ticketId}.txt`;
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
            TERENKRIPSI AES-GCM-256
          </span>
          <h2 className={styles.ticketTitle}>Kunci Tiket Rahasia Anda</h2>
        </div>
        <div className={styles.ticketIdBox}>
          <span className={styles.ticketIdLabel}>Nomor Tiket</span>
          <span className={styles.ticketIdVal}>{receipt.ticketId}</span>
        </div>
      </div>

      <div className={styles.securityNotice}>
        <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: 1 }} />
        <span>
          <strong>Wajib Dicatat / Diunduh:</strong> Sistem kami tidak menyimpan data akun Anda. 16 kata di bawah adalah <em>kunci privat kriptografis</em> satu-satunya untuk memantau proses audit inspektorat.
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
            {receipt.sanitizedEvidenceHash !== 'sha256:none' ? 'EXIF Steril (Lolos Sanitasi Canvas)' : 'Tanpa Lampiran Foto'}
          </span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Waktu Enkripsi</span>
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
          aria-label="Unduh kartu tiket format teks"
        >
          <Download size={16} />
          <span>Unduh Kartu Tiket (.txt)</span>
        </button>

        {onCheckStatus && (
          <button
            type="button"
            onClick={() => onCheckStatus(receipt.mnemonicPhrase)}
            className={`${styles.btnAction}`}
            style={{ 
              backgroundColor: 'var(--bg-elevated)', 
              color: 'var(--text-main)', 
              border: '1px solid var(--border-strong)' 
            }}
          >
            <KeyRound size={15} />
            <span>Cek Status Tiket Ini Langsung</span>
          </button>
        )}

        <button
          type="button"
          onClick={onDone}
          className={`${styles.btnAction} ${styles.btnDone}`}
        >
          <span>Selesai & Lihat Linimasa Publik</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
