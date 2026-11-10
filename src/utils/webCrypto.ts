import { CATEGORY_LABELS, type IReportPayload, type ITicketReceipt } from '../types';

const CIVIC_WORDLIST: string[] = [
  'akar', 'aksara', 'alun', 'amanat', 'angin', 'antariksa', 'arsip', 'asri',
  'badai', 'bahari', 'baja', 'bakteri', 'balairung', 'bambu', 'bangsa', 'barat',
  'batu', 'bayang', 'benih', 'benteng', 'berani', 'berkah', 'bintang', 'bianglala',
  'biru', 'budi', 'bukti', 'bumi', 'cahaya', 'cakra', 'cakrawala', 'candi',
  'cempaka', 'cendekia', 'cerdas', 'cinta', 'citra', 'danau', 'darat', 'darma',
  'daun', 'daya', 'delapan', 'dermaga', 'desa', 'dewan', 'dirgantara', 'doa',
  'elang', 'emas', 'embun', 'energi', 'fajar', 'fauna', 'flora', 'gading',
  'gagah', 'gajah', 'samudra', 'garda', 'garuda', 'gemilang', 'getar', 'giat',
  'guntur', 'gunung', 'habibat', 'hakim', 'haluan', 'hangat', 'harkat', 'hati',
  'hayat', 'hebat', 'hijau', 'himpun', 'hulu', 'hutan', 'ilmu', 'indah',
  'ingat', 'insani', 'integritas', 'intan', 'irama', 'jagad', 'jagat', 'jalur',
  'jamrud', 'janji', 'jaya', 'jejak', 'jelajah', 'jernih', 'juang', 'jujur',
  'kalbu', 'karsa', 'karunia', 'karya', 'kasih', 'kawan', 'kencana', 'kendali',
  'khatulistiwa', 'kidung', 'kobar', 'komitmen', 'kristal', 'ksatria', 'kunci', 'ladang',
  'langit', 'layar', 'lembayung', 'lentera', 'lestari', 'lindung', 'logam', 'luas',
  'luhur', 'mabuk', 'mahkota', 'maju', 'makmur', 'mandiri', 'mantap', 'marwah',
  'matahari', 'megah', 'melati', 'merdeka', 'merpati', 'merah', 'merapi', 'merbabu',
  'muara', 'mulia', 'musyawarah', 'mutiara', 'nada', 'napas', 'negara', 'negeri',
  'netral', 'niat', 'nirmala', 'nurani', 'nusa', 'nusantara', 'ombak', 'padang',
  'padi', 'pahala', 'pahlawan', 'palapa', 'pandu', 'panji', 'pantang', 'pantai',
  'pariwisata', 'pasti', 'patuh', 'pawang', 'pedoman', 'peduli', 'pelita', 'pelopor',
  'penjaga', 'perisai', 'permata', 'pertiwi', 'pesona', 'pilar', 'pohon', 'pondok',
  'pradana', 'prakarsa', 'pratama', 'pribadi', 'pusaka', 'pustaka', 'putih', 'rajawali',
  'rakyat', 'rantai', 'rasa', 'raya', 'redam', 'relung', 'resik', 'rimba',
  'rindang', 'ruang', 'rukun', 'sabda', 'sahabat', 'sakti', 'salam', 'salju',
  'samarinda', 'sanubari', 'sarana', 'sasana', 'satria', 'saudara', 'segar', 'sejati',
  'selaras', 'selatan', 'semboyan', 'semesta', 'senja', 'serasi', 'seroja', 'setia',
  'sigap', 'sinar', 'sobat', 'suara', 'suci', 'sukma', 'suluh', 'sungai',
  'surya', 'swara', 'tabah', 'tali', 'taman', 'tanah', 'tangguh', 'tata',
  'tegap', 'teguh', 'teladan', 'telaga', 'tembok', 'tenang', 'terang', 'teratai',
  'terbit', 'tiang', 'timur', 'titisan', 'tonggak', 'tulus', 'tunas', 'udara',
  'ukir', 'untaian', 'upaya', 'utama', 'utara', 'wahana', 'wangi', 'warga',
  'waspada', 'wibawa', 'wijaya', 'wira', 'wisata', 'wujud', 'zamrud', 'zenith'
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

function bufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function derive16WordMnemonic(hashBuffer: ArrayBuffer): string {
  const bytes = new Uint8Array(hashBuffer);
  const words: string[] = [];
  
  for (let i = 0; i < 16; i++) {
    const byteVal = bytes[i];
    const word = CIVIC_WORDLIST[byteVal % CIVIC_WORDLIST.length];
    words.push(word);
  }
  
  return words.join(' ');
}

export interface IEncryptionResult {
  receipt: ITicketReceipt;
  ciphertextHex: string;
  ivHex: string;
}

export async function encryptWhistleblowerReport(
  payload: IReportPayload,
  sanitizedFileBlob?: Blob
): Promise<IEncryptionResult> {
  const encoder = new TextEncoder();
  const rawPayloadText = JSON.stringify(payload);
  const payloadData = encoder.encode(rawPayloadText);

  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const aesKey = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    aesKey,
    payloadData
  );

  let evidenceHash = 'sha256:none';
  if (sanitizedFileBlob) {
    const fileBuffer = await sanitizedFileBlob.arrayBuffer();
    const digest = await window.crypto.subtle.digest('SHA-256', fileBuffer);
    evidenceHash = `sha256:${bufferToHex(digest).substring(0, 32)}`;
  }

  const masterDigest = await window.crypto.subtle.digest('SHA-256', encryptedBuffer);
  const masterHashHex = bufferToHex(masterDigest);

  const mnemonicPhrase = derive16WordMnemonic(masterDigest);
  const currentYear = new Date().getFullYear();
  const shortTicketId = `LP-${currentYear}-${masterHashHex.substring(0, 6).toUpperCase()}`;

  const receipt: ITicketReceipt = {
    mnemonicPhrase,
    ticketId: shortTicketId,
    createdAt: new Date().toISOString(),
    sanitizedEvidenceHash: evidenceHash,
    categoryLabel: CATEGORY_LABELS[payload.category] || payload.category,
    agencyReported: payload.agencyName,
    amountRupiah: payload.extortionAmountRupiah
  };

  return {
    receipt,
    ciphertextHex: bufferToHex(encryptedBuffer),
    ivHex: bufferToHex(iv.buffer as ArrayBuffer)
  };
}
