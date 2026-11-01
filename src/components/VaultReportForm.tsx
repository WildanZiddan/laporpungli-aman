import React, { useState, useRef } from 'react';
import type { PungliCategory, IReportPayload, ITicketReceipt, IPublicIncidentLog } from '../types';
import { stripImageExif } from '../utils/exifScrubber';
import type { IScrubResult } from '../utils/exifScrubber';
import { encryptWhistleblowerReport, formatRupiah } from '../utils/webCrypto';
import { saveNewReport, convertStoredToIncidentLog } from '../utils/reportStorage';
import { SecretTicketCard } from './SecretTicketCard';
import { 
  Lock, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldAlert, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import styles from './VaultReportForm.module.css';

interface VaultReportFormProps {
  onCancel: () => void;
  onSuccessDone: () => void;
  onCheckStatusDirectly?: (mnemonic: string) => void;
  onReportCreated?: (newCase: IPublicIncidentLog) => void;
}

export const VaultReportForm: React.FC<VaultReportFormProps> = ({ 
  onCancel, 
  onSuccessDone, 
  onCheckStatusDirectly,
  onReportCreated 
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [category, setCategory] = useState<PungliCategory>('PTSL_BPN');
  const [agencyName, setAgencyName] = useState<string>('');
  const [locationCity, setLocationCity] = useState<string>('');
  const [incidentDescription, setIncidentDescription] = useState<string>('');
  const [extortionAmountRupiah, setExtortionAmountRupiah] = useState<number>(1500000);
  const [amountInputDisplay, setAmountInputDisplay] = useState<string>('Rp 1.500.000');

  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [scrubResult, setScrubResult] = useState<IScrubResult | null>(null);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const [scrubError, setScrubError] = useState<string | null>(null);

  const [isEncrypting, setIsEncrypting] = useState<boolean>(false);
  const [completedReceipt, setCompletedReceipt] = useState<ITicketReceipt | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/\D/g, '');
    if (!rawDigits) {
      setExtortionAmountRupiah(0);
      setAmountInputDisplay('');
      return;
    }
    const numericVal = parseInt(rawDigits, 10);
    setExtortionAmountRupiah(numericVal);
    setAmountInputDisplay('Rp ' + new Intl.NumberFormat('id-ID').format(numericVal));
  };

  const handleApplyPresetAmount = (presetVal: number) => {
    setExtortionAmountRupiah(presetVal);
    setAmountInputDisplay('Rp ' + new Intl.NumberFormat('id-ID').format(presetVal));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setEvidenceFile(file);
    setIsScrubbing(true);
    setScrubError(null);

    try {
      const result = await stripImageExif(file);
      setScrubResult(result);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Gagal melakukan sanitasi gambar.';
      setScrubError(errorMsg);
      setScrubResult(null);
    } finally {
      setIsScrubbing(false);
    }
  };

  const handleRemoveFile = () => {
    if (scrubResult?.previewUrl) {
      URL.revokeObjectURL(scrubResult.previewUrl);
    }
    setEvidenceFile(null);
    setScrubResult(null);
    setScrubError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmitAndEncrypt = async () => {
    setIsEncrypting(true);

    try {
      const payload: IReportPayload = {
        category,
        agencyName: agencyName.trim() || 'Instansi Terkait Layanan Publik',
        locationCity: locationCity.trim() || 'Wilayah Bersangkutan',
        incidentDescription: incidentDescription.trim(),
        extortionAmountRupiah: Number(extortionAmountRupiah) || 0,
        hasEvidenceFile: !!scrubResult,
        evidenceFileName: evidenceFile?.name,
        evidenceCleanSize: scrubResult?.cleanSize,
        timestamp: new Date().toISOString()
      };

      const { receipt } = await encryptWhistleblowerReport(payload, scrubResult?.cleanBlob);
      
      const storedReport = saveNewReport(receipt, payload);
      
      if (onReportCreated) {
        onReportCreated(convertStoredToIncidentLog(storedReport));
      }

      setCompletedReceipt(receipt);
    } catch {
      alert('Terjadi kendala saat mengenkripsi laporan di peramban. Silakan coba kembali.');
    } finally {
      setIsEncrypting(false);
    }
  };

  if (completedReceipt) {
    return (
      <SecretTicketCard
        receipt={completedReceipt}
        onDone={onSuccessDone}
        onCheckStatus={onCheckStatusDirectly}
      />
    );
  }

  return (
    <div className={styles.formContainer} role="region" aria-label="Formulir Laporan Terenkripsi">
      <div className={styles.formHeader}>
        <div>
          <h2 className={styles.headerTitle}>Formulir Pelaporan Terenkripsi (The Vault)</h2>
          <p className={styles.headerSubtitle}>
            Laporan Anda dikunci dan dikirim langsung dari perangkat Anda tanpa melalui server yang bisa membaca isinya.
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className={styles.btnAbort}
          aria-label="Batalkan pelaporan dan keluar"
        >
          <ShieldAlert size={14} />
          <span>Batalkan &amp; Keluar</span>
        </button>
      </div>

      <div className={styles.wizardBar} role="navigation" aria-label="Tahapan Formulir">
        <div className={`${styles.stepIndicator} ${currentStep === 1 ? styles.stepActive : currentStep > 1 ? styles.stepCompleted : ''}`}>
          <div className={styles.stepCircle}>{currentStep > 1 ? '✓' : '1'}</div>
          <span className={styles.stepLabel}>1. Kategori & Instansi</span>
        </div>
        <div className={styles.stepDivider} />
        <div className={`${styles.stepIndicator} ${currentStep === 2 ? styles.stepActive : currentStep > 2 ? styles.stepCompleted : ''}`}>
          <div className={styles.stepCircle}>{currentStep > 2 ? '✓' : '2'}</div>
          <span className={styles.stepLabel}>2. Kronologi & Nominal</span>
        </div>
        <div className={styles.stepDivider} />
        <div className={`${styles.stepIndicator} ${currentStep === 3 ? styles.stepActive : ''}`}>
          <div className={styles.stepCircle}>3</div>
          <span className={styles.stepLabel}>3. Bukti & Enkripsi</span>
        </div>
      </div>

      {currentStep === 1 && (
        <div className={styles.stepContent}>
          <div className={styles.fieldGroup}>
            <label htmlFor="cat-select" className={styles.label}>
              Kategori Layanan Publik Terlapor <span style={{ color: 'var(--status-crimson)' }}>*</span>
            </label>
            <select
              id="cat-select"
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value as PungliCategory)}
            >
              <option value="PTSL_BPN">Pertanahan / Program Sertifikat Tanah PTSL (BPN & Desa)</option>
              <option value="SATPAS_SAMSAT">Kepolisian / Penerbitan SIM & Samsat</option>
              <option value="PPDB_SEKOLAH">Pendidikan / PPDB & Pungutan Komite Sekolah</option>
              <option value="RUTAN_LAPAS">Rutan & Lembaga Pemasyarakatan (Fasilitas Khusus)</option>
              <option value="PERIZINAN_PEMDA">Dinas Perizinan / Pelayanan Terpadu Satu Pintu (PTSP)</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="agency-input" className={styles.label}>
              Nama Kantor / Unit Pelayanan yang Meminta Pungutan <span style={{ color: 'var(--status-crimson)' }}>*</span>
            </label>
            <input
              id="agency-input"
              type="text"
              className={styles.input}
              placeholder="Contoh: Kantor Desa Sukamaju / Satpas Satlantas Polresta"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              required
            />
            <span className={styles.labelHint}>Sebutkan nama kantor, loket, atau seksi tempat oknum bertugas.</span>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="city-input" className={styles.label}>
              Kabupaten / Kota Tempat Kejadian <span style={{ color: 'var(--status-crimson)' }}>*</span>
            </label>
            <input
              id="city-input"
              type="text"
              className={styles.input}
              placeholder="Contoh: Kabupaten Pasuruan / Kota Bekasi"
              value={locationCity}
              onChange={(e) => setLocationCity(e.target.value)}
              required
            />
          </div>

          <div className={styles.footerNav}>
            <button type="button" className={styles.btnBack} onClick={onCancel}>
              Batal
            </button>
            <button
              type="button"
              className={styles.btnNext}
              disabled={!agencyName.trim() || !locationCity.trim()}
              onClick={() => setCurrentStep(2)}
            >
              <span>Lanjut: Kronologi Kasus</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className={styles.stepContent}>
          <div className={styles.fieldGroup}>
            <label htmlFor="desc-input" className={styles.label}>
              Uraian Kejadian Pungutan Liar <span style={{ color: 'var(--status-crimson)' }}>*</span>
            </label>
            <textarea
              id="desc-input"
              className={styles.textarea}
              placeholder="Jelaskan modus operandi, dalih pungutan (misal: 'uang percepatan administrasi', 'uang patok', atau 'sukarela komite'), serta posisi berkas Anda yang ditahan."
              value={incidentDescription}
              onChange={(e) => setIncidentDescription(e.target.value)}
              required
            />
            <span className={styles.labelHint}>Hindari menyebutkan nama lengkap Anda sendiri di dalam teks agar anonimitas terjaga mutlak.</span>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="amount-input" className={styles.label}>
              Estimasi Nominal Uang yang Diminta (Rupiah) <span style={{ color: 'var(--status-crimson)' }}>*</span>
            </label>
            <input
              id="amount-input"
              type="text"
              inputMode="numeric"
              className={styles.input}
              placeholder="Rp 1.500.000"
              value={amountInputDisplay}
              onChange={handleAmountChange}
              required
            />
            <span className={styles.labelHint} style={{ fontWeight: 600, color: 'var(--text-main)' }}>
              Nilai Terbaca: {formatRupiah(extortionAmountRupiah || 0)}
            </span>

            <div className={styles.amountPresets}>
              {[250000, 500000, 1000000, 2500000, 5000000, 10000000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className={`${styles.presetChip} ${extortionAmountRupiah === preset ? styles.presetChipActive : ''}`}
                  onClick={() => handleApplyPresetAmount(preset)}
                >
                  {formatRupiah(preset)}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.footerNav}>
            <button type="button" className={styles.btnBack} onClick={() => setCurrentStep(1)}>
              <ArrowLeft size={15} />
              <span>Kembali</span>
            </button>
            <button
              type="button"
              className={styles.btnNext}
              disabled={!incidentDescription.trim() || incidentDescription.length < 15}
              onClick={() => setCurrentStep(3)}
            >
              <span>Lanjut: Lampirkan Bukti</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className={styles.stepContent}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Lampiran Bukti Foto / Kuitansi / Tangkapan Layar Pesan (Opsional)
            </label>
            <span className={styles.labelHint}>
              Foto Anda akan otomatis dihapus jejak lokasinya (GPS) dan info perangkat Anda
              sebelum dikirim — dilakukan langsung di ponsel/laptop Anda, tidak melalui server.
            </span>

            {!scrubResult ? (
              <div
                className={styles.uploadZone}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') fileInputRef.current?.click(); }}
                aria-label="Klik untuk memilih foto bukti"
              >
                <Upload size={24} color="var(--text-subtle)" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                  {isScrubbing ? 'Memusnahkan Jejak EXIF GPS...' : 'Pilih atau Tarik Foto Bukti ke Sini'}
                </span>
                <span style={{ fontSize: '11.5px', color: 'var(--text-subtle)' }}>
                  Mendukung format JPG, PNG, atau WebP (Maks. 10 MB)
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className={styles.hiddenFileInput}
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className={styles.sanitizerStatusCard}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} />
                    <span>
                      <strong>EXIF Steril:</strong> Koordinat GPS, data kamera & timestamp telah dihapus.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    style={{ color: 'var(--status-crimson)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 600 }}
                  >
                    <Trash2 size={13} />
                    <span>Hapus</span>
                  </button>
                </div>

                <div className={styles.previewContainer}>
                  <img src={scrubResult.previewUrl} alt="Preview Bukti Bersih" className={styles.previewThumb} />
                  <div className={styles.previewMeta}>
                    <strong>{evidenceFile?.name}</strong>
                    <span>Ukuran Asli: {Math.round(scrubResult.originalSize / 1024)} KB</span>
                    <span>Ukuran Bersih: {Math.round(scrubResult.cleanSize / 1024)} KB ({scrubResult.reductionPercentage}% metadata dibersihkan)</span>
                  </div>
                </div>
              </div>
            )}

            {scrubError && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--status-crimson)', fontSize: '12px' }}>
                <AlertCircle size={14} />
                <span>{scrubError}</span>
              </div>
            )}
          </div>

          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-hairline)', borderRadius: '6px', padding: '14px', fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-main)', fontWeight: 600, marginBottom: 4 }}>
              <Lock size={14} />
              <span>Laporan Siap Dikirim Secara Rahasia</span>
            </div>
            Setelah menekan tombol di bawah, laporan Anda akan dikunci dengan <strong>enkripsi tingkat militer</strong> langsung di perangkat Anda. Anda akan mendapatkan <strong>16 kata kode rahasia</strong> sebagai tiket untuk memantau perkembangan kasus.
          </div>

          <div className={styles.footerNav}>
            <button type="button" className={styles.btnBack} onClick={() => setCurrentStep(2)}>
              <ArrowLeft size={15} />
              <span>Kembali</span>
            </button>
            <button
              type="button"
              className={styles.btnSubmit}
              disabled={isEncrypting || isScrubbing}
              onClick={handleSubmitAndEncrypt}
            >
              {isEncrypting ? (
                <>
                  <div className={styles.loadingSpinner} />
                  <span>Sedang Mengirim Laporan...</span>
                </>
              ) : (
                <>
                  <Lock size={15} />
                  <span>Kirim Laporan Aman &amp; Dapatkan Kode Tiket</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
