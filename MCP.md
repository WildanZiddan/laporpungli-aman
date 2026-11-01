# Model Context Protocol (MCP) Configuration
## Project: LaporPungli Aman

Dokumen ini mendefinisikan server MCP yang dibutuhkan untuk pengembangan, pengujian kriptografi client-side, dan verifikasi kepatuhan data publik.

---

### 1. Arsitektur Server MCP

1. `mcp-crypto-tester`: Server lokal untuk menjalankan test suite Web Crypto API dan memvalidasi pembersihan header EXIF JPEG/PNG secara headless.
2. `mcp-civic-data`: Server data lokal SQLite/JSON untuk menyediakan feed data riil (KPK, Saber Pungli, Ombudsman) tanpa ketergantungan API eksternal yang tidak stabil.
3. `mcp-accessibility-audit`: Integrasi dengan Lighthouse / Axe-core untuk memastikan antarmuka mematuhi WCAG 2.1 AAA dan rasio kontras 7:1.

---

### 2. File Konfigurasi: `mcp_config.json`

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./src", "./public/data"]
    },
    "crypto-sandbox": {
      "command": "node",
      "args": ["./scripts/mcp-crypto-verifier.js"],
      "env": {
        "NODE_ENV": "development"
      }
    },
    "civic-data-provider": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "./public/data/civic_records.db"]
    }
  }
}
```

---

### 3. Tool Declarations (MCP Tools yang Disediakan untuk Agent)

#### Tool 1: `verify_exif_stripping`
- Input: `filePath: string` (Path foto bukti lokal).
- Output: `hasExifGps: boolean`, `hasCameraModel: boolean`, `byteReduction: number`.
- Fungsi: Memverifikasi apakah script `exifScrubber.ts` benar-benar menghapus tag EXIF 0x8825 (GPSInfo) sebelum berkas diproses.

#### Tool 2: `audit_color_contrast`
- Input: `foregroundHex: string`, `backgroundHex: string`.
- Output: `ratio: number`, `passesWcagAAA: boolean`.
- Fungsi: Menolak warna yang melanggar batas kontras keterbacaan (wajib > 7:1 untuk teks normal).

#### Tool 3: `query_real_cases`
- Input: `category: string`, `limit: number`.
- Output: Array kasus riil resmi (PTSL Pasuruan, Rutan KPK, PPDB Jabar) lengkap dengan tanggal putusan, nomor LHP inspektorat, dan pasal sanksi.
