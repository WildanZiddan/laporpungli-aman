export type PungliCategory = 
  | 'PTSL_BPN'
  | 'SATPAS_SAMSAT'
  | 'PPDB_SEKOLAH'
  | 'RUTAN_LAPAS'
  | 'PERIZINAN_PEMDA';

export type InspectorateStage = 
  | 'STAGE_1_VERIFIKASI'
  | 'STAGE_2_FORENSIK'
  | 'STAGE_3_KLARIFIKASI'
  | 'STAGE_4_MAJELIS'
  | 'STAGE_5_VONIS';

export interface ITimelineMilestone {
  stageNumber: number;
  stageName: string;
  status: 'completed' | 'current' | 'pending';
  date: string;
  actor: string;
  actionSummary: string;
  stageHash: string;
}

export interface IPublicIncidentLog {
  id: string;
  category: PungliCategory;
  categoryLabel: string;
  title: string;
  agencyReported: string;
  currentStage: InspectorateStage;
  stageNumber: number;
  stageLabel: string;
  slaRemainingDays: number;
  lastUpdated: string;
  cryptographicProofHash: string;
  summaryAction: string;
  legalReference: string;
  statusType: 'investigating' | 'sanction' | 'resolved';
  timelineMilestones?: ITimelineMilestone[];
}

export interface IReportPayload {
  category: PungliCategory;
  agencyName: string;
  locationCity: string;
  incidentDescription: string;
  extortionAmountRupiah: number;
  hasEvidenceFile: boolean;
  evidenceFileName?: string;
  evidenceCleanSize?: number;
  timestamp: string;
}

export interface ITicketReceipt {
  mnemonicPhrase: string;
  ticketId: string;
  createdAt: string;
  sanitizedEvidenceHash: string;
  categoryLabel: string;
  agencyReported: string;
  amountRupiah: number;
}

export interface INationalMetric {
  id: string;
  label: string;
  value: string;
  subValue: string;
  source: string;
  badge: string;
}
