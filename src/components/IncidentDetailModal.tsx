import React, { useEffect } from 'react';
import type { IPublicIncidentLog } from '../types';
import { X, ShieldCheck, Check, Clock } from 'lucide-react';
import styles from './IncidentDetailModal.module.css';

interface IncidentDetailModalProps {
  incident: IPublicIncidentLog | null;
  onClose: () => void;
}

export const IncidentDetailModal: React.FC<IncidentDetailModalProps> = ({ incident, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!incident) return null;

  return (
    <div 
      className={styles.modalBackdrop} 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-case-title"
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.titleArea}>
            <div className={styles.headerTop}>
              <span className={styles.caseId}>{incident.id}</span>
              <span className={styles.categoryTag}>{incident.categoryLabel}</span>
            </div>
            <h2 id="modal-case-title" className={styles.modalTitle}>
              {incident.title}
            </h2>
            <p className={styles.agencyInfo}>
              <strong>Instansi Terlapor:</strong> {incident.agencyReported}
            </p>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className={styles.btnClose}
            aria-label="Tutup jendela rincian kasus"
          >
            <X size={16} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.legalBox}>
            <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: 2 }}>
              Rujukan Hukum & Pasal Pelanggaran:
            </strong>
            {incident.legalReference}
          </div>

          <h3 className={styles.timelineSectionTitle}>
            Linimasa Audit 5 Tahap Inspektorat
          </h3>

          <div className={styles.verticalTimeline}>
            {incident.timelineMilestones?.map((milestone) => {
              const isCompleted = milestone.status === 'completed';
              const isCurrent = milestone.status === 'current';

              return (
                <div key={milestone.stageNumber} className={styles.timelineRow}>
                  <div 
                    className={`${styles.timelineMarker} ${
                      isCompleted ? styles.markerCompleted : isCurrent ? styles.markerCurrent : styles.markerPending
                    }`}
                  >
                    {isCompleted ? <Check size={13} /> : milestone.stageNumber}
                  </div>

                  <div className={styles.timelineDetail}>
                    <div className={styles.timelineDetailHeader}>
                      <span className={styles.stageHeading}>
                        Tahap {milestone.stageNumber}: {milestone.stageName}
                      </span>
                      <span className={styles.stageDate}>{milestone.date}</span>
                    </div>

                    <span className={styles.stageActor}>
                      Aktor Pelaksana: {milestone.actor}
                    </span>

                    <p className={styles.stageAction}>{milestone.actionSummary}</p>

                    <span className={styles.stageHashTag} title="Milestone Proof Hash">
                      Hash Milestone: {milestone.stageHash}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={15} color="var(--status-green)" />
            <span>Rekam jejak investigasi tersimpan di log audit inspektorat publik.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)' }}>
            <Clock size={13} />
            <span>{incident.slaRemainingDays > 0 ? `SLA: Sisa ${incident.slaRemainingDays} Hari Kerja` : 'Putusan Selesai'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
