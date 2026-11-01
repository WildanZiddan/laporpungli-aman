import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Scale, 
  Clock,
  Sparkles
} from 'lucide-react';
import styles from './FaqSection.module.css';

interface FaqItem {
  id: string;
  category: 'privacy' | 'ticket' | 'legal' | 'investigation';
  question: string;
  answer: string;
  legalRef?: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'privacy',
    question: 'Bagaimana sistem ini menjamin 100% anonimitas saya tanpa nama atau NIK?',
    answer: 'Kami menerapkan prinsip Zero-Knowledge Architecture dan Zero-PII (Personally Identifiable Information). Form pelaporan dirancang tanpa satu pun kolom identitas diri (tanpa nama, NIK, nomor telepon, atau alamat email). Server kami tidak pernah mencatat IP address atau fingerprint perangkat ke basis data publik.',
    legalRef: 'Prinsip Zero-Knowledge Architecture & Privacy-by-Design'
  },
  {
    id: 'faq-2',
    category: 'privacy',
    question: 'Apakah admin atau oknum instansi terlapor bisa melacak lokasi foto bukti yang saya unggah?',
    answer: 'Tidak bisa. Setiap gambar yang diunggah wajib melewati modul HTML5 Canvas EXIF Scrubber lokal di browser Anda. Modul ini menghapus total seluruh metadata yang tertanam di foto—termasuk koordinat lintang/bujur GPS, merk HP, nomor seri kamera, dan tanggal asli pemotretan—sebelum berkas dienkripsi dengan algoritma AES-GCM 256-bit.',
    legalRef: 'Sanitasi Metadata HTML5 Canvas Client-Side'
  },
  {
    id: 'faq-3',
    category: 'ticket',
    question: 'Apa fungsi 16 kata rahasia (BIP-39 Mnemonic) yang saya terima?',
    answer: 'Ke-16 kata rahasia tersebut adalah kunci kriptografi unik yang dibangkitkan secara acak langsung di RAM perangkat Anda. Kunci ini adalah satu-satunya alat untuk mendekripsi status laporan Anda di menu "Cek Tiket Rahasia" tanpa perlu membuat username atau password yang rentan dilacak.',
    legalRef: 'Standar Kriptografi Entropi BIP-39 & AES-GCM 256-bit'
  },
  {
    id: 'faq-4',
    category: 'ticket',
    question: 'Bagaimana jika saya kehilangan 16 kata rahasia tersebut?',
    answer: 'Demi keselamatan dan prinsip Zero-Knowledge, sistem kami tidak pernah menyimpan salinan 16 kata Anda dalam bentuk teks terbuka di server. Jika Anda kehilangan 16 kata tersebut, status laporan tidak dapat didekripsi kembali oleh siapa pun. Namun, berkas laporan yang telah terkirim tetap akan diproses oleh inspektorat.',
    legalRef: 'Peringatan Keamanan Kunci Kriptografi Mandiri'
  },
  {
    id: 'faq-5',
    category: 'legal',
    question: 'Apakah laporan anonim memiliki keabsahan hukum yang sah di mata penegak hukum Indonesia?',
    answer: 'Sangat sah. Berdasarkan UU No. 37 Tahun 2008 Pasal 24 (Ombudsman RI) serta Perpres No. 87 Tahun 2016 (Satgas Saber Pungli), aparat pengawas internal pemerintah (APIP) dan penegak hukum berkewajiban menindaklanjuti setiap informasi dugaan pungli dan maladministrasi yang disertai petunjuk dan bukti awal yang dapat diverifikasi kebenarannya.',
    legalRef: 'UU No. 37/2008 Pasal 24 & Perpres No. 87/2016'
  },
  {
    id: 'faq-6',
    category: 'legal',
    question: 'Apakah pelapor mendapatkan perlindungan hukum jika suatu saat identitasnya dicurigai terlapor?',
    answer: 'Pelapor tindak pidana korupsi dan pungli dilindungi secara mutlak oleh UU No. 31 Tahun 2014 tentang Perlindungan Saksi dan Korban (LPSK). Pasal 10 ayat (1) menyatakan secara tegas bahwa saksi, korban, dan pelapor tidak dapat dituntut secara hukum baik pidana maupun perdata atas laporan yang diberikannya dengan iktikad baik.',
    legalRef: 'UU No. 31/2014 Pasal 10 ayat (1) jo. UU No. 13/2006'
  },
  {
    id: 'faq-7',
    category: 'investigation',
    question: 'Berapa batas waktu (SLA) bagi Inspektorat/APIP untuk memproses laporan saya?',
    answer: 'Setiap tahapan investigasi terikat dengan SLA (Service Level Agreement) yang terpampang transparan di linimasa publik. Tahap 1: Verifikasi Awal memiliki SLA maksimal 3x24 jam kerja. Tahap 2: Telaah Bukti memiliki SLA 7 hari kerja. Jika batas waktu ini terlampaui tanpa tindak lanjut, sistem secara otomatis menandai status kasus sebagai "Peringatan Keterlambatan".',
    legalRef: 'Standar Operasional Pengawasan APIP Nasional'
  },
  {
    id: 'faq-8',
    category: 'investigation',
    question: 'Apa fungsi Cryptographic Audit Hash (SHA-256) pada linimasa publik?',
    answer: 'Setiap perkembangan investigasi yang dicatatkan inspektorat (seperti Berita Acara, Pemanggilan Terlapor, atau Rekomendasi Sanksi) langsung disegel dengan hash SHA-256 berantai (Merkle-tree audit trail). Ini menjamin catatan kasus bersifat tamper-evident—tidak dapat diedit surut, dihapus diam-diam, atau dipeti-eskan.',
    legalRef: 'Integritas Jejak Audit Kriptografis SHA-256'
  }
];

export const FaqSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className={styles.faqWrapper}>
      <section className={styles.headerCard}>
        <span className={styles.eyebrowBadge}>
          <HelpCircle size={14} aria-hidden="true" />
          Pusat Bantuan & Keabsahan Hukum
        </span>
        <h1 className={styles.mainTitle}>
          Pertanyaan Kritis & Tanya Jawab (FAQ)
        </h1>
        <p className={styles.leadText}>
          Penjelasan komprehensif mengenai cara kerja enkripsi browser, garansi kerahasiaan identitas, perlindungan hukum LPSK, dan akuntabilitas linimasa investigasi inspektorat.
        </p>

        <div className={styles.searchBarWrap}>
          <Search size={18} className={styles.searchIcon} aria-hidden="true" />
          <input 
            type="text" 
            placeholder="Cari pertanyaan... (contoh: NIK, 16 kata, bukti foto, hukum LPSK)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            aria-label="Cari pertanyaan FAQ"
          />
          {searchQuery && (
            <button 
              type="button" 
              className={styles.btnClearSearch} 
              onClick={() => setSearchQuery('')}
            >
              Hapus
            </button>
          )}
        </div>
      </section>

      <div className={styles.filterRow}>
        <button
          type="button"
          className={`${styles.filterChip} ${selectedCategory === 'all' ? styles.filterChipActive : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          <Sparkles size={14} aria-hidden="true" />
          <span>Semua ({FAQ_DATA.length})</span>
        </button>
        <button
          type="button"
          className={`${styles.filterChip} ${selectedCategory === 'privacy' ? styles.filterChipActive : ''}`}
          onClick={() => setSelectedCategory('privacy')}
        >
          <Lock size={14} aria-hidden="true" />
          <span>Privasi & Anonimitas (2)</span>
        </button>
        <button
          type="button"
          className={`${styles.filterChip} ${selectedCategory === 'ticket' ? styles.filterChipActive : ''}`}
          onClick={() => setSelectedCategory('ticket')}
        >
          <FileText size={14} aria-hidden="true" />
          <span>Kunci 16 Kata (2)</span>
        </button>
        <button
          type="button"
          className={`${styles.filterChip} ${selectedCategory === 'legal' ? styles.filterChipActive : ''}`}
          onClick={() => setSelectedCategory('legal')}
        >
          <Scale size={14} aria-hidden="true" />
          <span>Hukum & Regulasi (2)</span>
        </button>
        <button
          type="button"
          className={`${styles.filterChip} ${selectedCategory === 'investigation' ? styles.filterChipActive : ''}`}
          onClick={() => setSelectedCategory('investigation')}
        >
          <Clock size={14} aria-hidden="true" />
          <span>Investigasi & SLA (2)</span>
        </button>
      </div>

      <div className={styles.faqList}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = expandedId === faq.id;
            return (
              <div 
                key={faq.id} 
                className={`${styles.accordionCard} ${isOpen ? styles.accordionCardOpen : ''}`}
              >
                <button
                  type="button"
                  className={styles.accordionHeader}
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <div className={`${styles.iconWrap} ${isOpen ? styles.iconWrapRotated : ''}`}>
                    <ChevronDown size={18} aria-hidden="true" />
                  </div>
                </button>

                {isOpen && (
                  <div className={styles.accordionBody}>
                    <p className={styles.answerText}>{faq.answer}</p>
                    {faq.legalRef && (
                      <div className={styles.legalRefBadge}>
                        <ShieldCheck size={13} aria-hidden="true" />
                        <span>Rujukan: {faq.legalRef}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <HelpCircle size={32} className={styles.emptyIcon} aria-hidden="true" />
            <h3 className={styles.emptyTitle}>Tidak Menemukan Pertanyaan</h3>
            <p className={styles.emptyDesc}>
              Tidak ada pertanyaan yang sesuai dengan kata kunci "{searchQuery}". Coba gunakan kata kunci lain seperti "enkripsi", "bukti", atau "APIP".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
