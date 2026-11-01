import type { ITicketReceipt, IReportPayload, IPublicIncidentLog, ITimelineMilestone, PungliCategory, InspectorateStage } from '../types';

export interface IStoredVaultReport {
  ticketId: string;
  mnemonicPhrase: string;
  category: PungliCategory;
  categoryLabel: string;
  agencyReported: string;
  locationCity: string;
  incidentDescription: string;
  extortionAmountRupiah: number;
  hasEvidenceFile: boolean;
  evidenceFileName?: string;
  sanitizedEvidenceHash: string;
  cryptographicProofHash: string;
  createdAt: string;
  currentStage: InspectorateStage;
  stageNumber: number;
  stageLabel: string;
  slaRemainingDays: number;
  inspectorateNotes: string;
  legalReference: string;
  timelineMilestones: ITimelineMilestone[];
}

const STORAGE_KEY = 'laporpungli_temporary_vault';
const LATEST_MNEMONIC_KEY = 'laporpungli_latest_mnemonic';

const INITIAL_DEMO_REPORTS: IStoredVaultReport[] = [
  {
    ticketId: "LP-2024-PTSL-084",
    mnemonicPhrase: "lentera ombak padi cakra waspada satria garda fajar karunia prasasti wibawa surya cakrawala aksara perisai lentera",
    category: "PTSL_BPN",
    categoryLabel: "Pertanahan & PTSL",
    agencyReported: "Kantor Pertanahan / Kelompok Masyarakat (Pokmas) Desa Wonosari Pasuruan",
    locationCity: "Kabupaten Pasuruan, Jawa Timur",
    incidentDescription: "Warga dimintai uang patok dan biaya percepatan penerbitan sertifikat tanah PTSL sebesar Rp2,5 juta per bidang tanah, melanggar batas resmi SKB 3 Menteri (Rp150.000).",
    extortionAmountRupiah: 2500000,
    hasEvidenceFile: true,
    evidenceFileName: "kwitansi_pungli_ptsl_wonosari.jpg",
    sanitizedEvidenceHash: "sha256:d8a1f49e0c5b3671a82f63e41b9e28c704f5e16790b1ad84a62174c839f289b0",
    cryptographicProofHash: "sha256:d8a1f49e0c5b3671a82f63e41b9e28c704f5e16790b1ad84a62174c839f289b0",
    createdAt: "2024-08-01T09:30:00Z",
    currentStage: "STAGE_4_MAJELIS",
    stageNumber: 4,
    stageLabel: "Tahap 4: Sidang Majelis Etik & Pemeriksaan LHP",
    slaRemainingDays: 3,
    inspectorateNotes: "Inspektorat Daerah telah merampungkan audit LHP potensi kerugian warga; bukti aliran dana dan aset hasil pungutan diserahkan ke Kejaksaan Negeri untuk proses penuntutan Tipikor.",
    legalReference: "Pelanggaran SKB 3 Menteri No. 25/2017 jo UU No. 20/2001 Tipikor",
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
    ticketId: "LP-2024-RUTAN-012",
    mnemonicPhrase: "garda wibawa cakrawala lentera fajar perisai satria karunia prasasti surya cakra aksara waspada padi ombak lentera",
    category: "RUTAN_LAPAS",
    categoryLabel: "Rutan & Pemasyarakatan",
    agencyReported: "Rutan Kelas I Jakarta Timur Cabang KPK",
    locationCity: "Jakarta Selatan, DKI Jakarta",
    incidentDescription: "Pungutan liar sewa fasilitas handphone dan percepatan kunjungan tahanan rutan dengan tarif bulanan mencapai Rp20 juta.",
    extortionAmountRupiah: 20000000,
    hasEvidenceFile: true,
    evidenceFileName: "catatan_transfer_rekening_pihak_ketiga.pdf",
    sanitizedEvidenceHash: "sha256:4b9e28c704f5e16790b1ad84a62174c839f289b0d8a1f49e0c5b3671a82f63e4",
    cryptographicProofHash: "sha256:4b9e28c704f5e16790b1ad84a62174c839f289b0d8a1f49e0c5b3671a82f63e4",
    createdAt: "2023-06-15T11:00:00Z",
    currentStage: "STAGE_5_VONIS",
    stageNumber: 5,
    stageLabel: "Tahap 5: Eksekusi Putusan Sanksi Etik Berat & Tipikor",
    slaRemainingDays: 0,
    inspectorateNotes: "Dewan Pengawas (Dewas) KPK telah menjatuhkan vonis etik berat kepada 78 pegawai rutan berupa permohonan maaf terbuka langsung, pemecatan dinas, dan pelimpahan tersangka ke Deputi Penindakan KPK.",
    legalReference: "Peraturan Dewas KPK No. 03/2021 jo UU Tipikor",
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
  }
];

export const getStoredReports = (): IStoredVaultReport[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REPORTS));
      return INITIAL_DEMO_REPORTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_DEMO_REPORTS;
  } catch {
    return INITIAL_DEMO_REPORTS;
  }
};

export const saveNewReport = (
  receipt: ITicketReceipt,
  payload: IReportPayload
): IStoredVaultReport => {
  const existing = getStoredReports();

  const newReport: IStoredVaultReport = {
    ticketId: receipt.ticketId,
    mnemonicPhrase: receipt.mnemonicPhrase,
    category: payload.category,
    categoryLabel: receipt.categoryLabel,
    agencyReported: receipt.agencyReported,
    locationCity: payload.locationCity,
    incidentDescription: payload.incidentDescription,
    extortionAmountRupiah: receipt.amountRupiah,
    hasEvidenceFile: payload.hasEvidenceFile,
    evidenceFileName: payload.evidenceFileName,
    sanitizedEvidenceHash: receipt.sanitizedEvidenceHash,
    cryptographicProofHash: receipt.sanitizedEvidenceHash !== 'sha256:none' 
      ? receipt.sanitizedEvidenceHash 
      : 'sha256:' + Math.random().toString(36).substring(2) + Date.now().toString(36),
    createdAt: receipt.createdAt,
    currentStage: "STAGE_1_VERIFIKASI",
    stageNumber: 1,
    stageLabel: "Tahap 1: Validasi Formil & Uji Bukti Awal",
    slaRemainingDays: 3,
    inspectorateNotes: "Laporan terenkripsi Anda telah berhasil didaftarkan di brankas digital APIP. Tim Penerimaan Pengaduan sedang melakukan telaah kelayakan bukti awal dalam kurun waktu 3 hari kerja.",
    legalReference: "UU No. 37/2008 tentang Ombudsman RI jo Perpres No. 87/2016 tentang Satgas Saber Pungli",
    timelineMilestones: [
      {
        stageNumber: 1,
        stageName: "Validasi Formil & Uji Bukti Awal",
        status: "current",
        date: new Date(receipt.createdAt).toISOString().split('T')[0],
        actor: "Tim Penerimaan Pengaduan APIP / Inspektorat",
        actionSummary: `Penerimaan berkas aduan ${receipt.categoryLabel} pada ${receipt.agencyReported}; uji kelayakan formil sedang berjalan.`,
        stageHash: (receipt.sanitizedEvidenceHash !== 'sha256:none' ? receipt.sanitizedEvidenceHash.substring(0, 16) : 'sha256:a1b2c3d4') + '...'
      },
      {
        stageNumber: 2,
        stageName: "Audit Forensik & Verifikasi Lapangan",
        status: "pending",
        date: "Target H+3",
        actor: "Auditor Investigasi Khusus",
        actionSummary: "Pemeriksaan kas, wawancara saksi tertutup, dan uji silang bukti sanitasi canvas.",
        stageHash: "sha256:pending"
      },
      {
        stageNumber: 3,
        stageName: "Pemanggilan & Pemeriksaan Terlapor",
        status: "pending",
        date: "Target H+10",
        actor: "Majelis Pemeriksa APIP",
        actionSummary: "Konfrontasi keterangan oknum terlapor atas dugaan pungli nominal terkait.",
        stageHash: "sha256:pending"
      },
      {
        stageNumber: 4,
        stageName: "Sidang Majelis Etik & Rekomendasi Sanksi",
        status: "pending",
        date: "Target H+17",
        actor: "Dewan Majelis Sidang Etik",
        actionSummary: "Perumusan Laporan Hasil Pemeriksaan (LHP) dan rekomendasi sanksi disiplin berat/Tipikor.",
        stageHash: "sha256:pending"
      },
      {
        stageNumber: 5,
        stageName: "Putusan & Eksekusi Penegakan Hukum",
        status: "pending",
        date: "Target H+24",
        actor: "Pejabat Pembina Kepegawaian & APH Kejaksaan",
        actionSummary: "Pemberian sanksi pemecatan, pengembalian uang warga, atau pelimpahan pidana.",
        stageHash: "sha256:pending"
      }
    ]
  };

  const updated = [newReport, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(LATEST_MNEMONIC_KEY, receipt.mnemonicPhrase);
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }

  return newReport;
};

export const findReportByMnemonic = (phrase: string): IStoredVaultReport | null => {
  const normalized = phrase.trim().toLowerCase().replace(/\s+/g, ' ');
  if (!normalized) return null;

  const list = getStoredReports();
  const match = list.find(r => r.mnemonicPhrase.trim().toLowerCase().replace(/\s+/g, ' ') === normalized);
  return match || null;
};

export const getLatestSubmittedMnemonic = (): string | null => {
  try {
    return localStorage.getItem(LATEST_MNEMONIC_KEY);
  } catch {
    return null;
  }
};

export const convertStoredToIncidentLog = (stored: IStoredVaultReport): IPublicIncidentLog => {
  return {
    id: stored.ticketId,
    category: stored.category,
    categoryLabel: stored.categoryLabel,
    title: `Dugaan Pungli ${stored.categoryLabel} di ${stored.agencyReported}`,
    agencyReported: stored.agencyReported,
    currentStage: stored.currentStage,
    stageNumber: stored.stageNumber,
    stageLabel: stored.stageLabel,
    slaRemainingDays: stored.slaRemainingDays,
    lastUpdated: stored.createdAt,
    cryptographicProofHash: stored.cryptographicProofHash,
    summaryAction: stored.inspectorateNotes,
    legalReference: stored.legalReference,
    statusType: stored.stageNumber === 5 ? 'sanction' : 'investigating',
    timelineMilestones: stored.timelineMilestones
  };
};
