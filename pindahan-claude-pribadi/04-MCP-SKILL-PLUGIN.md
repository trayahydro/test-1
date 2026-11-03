---
tipe: setup
dibuat: 2026-11-03
tags: [claude-code, mcp, skill, plugin, connector]
---

# MCP, Skill, Plugin & Connector — Daftar Lengkap + Cara Pasang di Akun Pribadi

Ada **3 kelompok** yang perlu dibedakan:

| Kelompok | Penjelasan | Cara pindah |
|---|---|---|
| **A. Connector claude.ai** | Sambungan ke layanan (Gmail, Google Drive, Figma, Canva, dll.) yang menempel di **akun** | Aktifkan ulang di claude.ai → Settings → Connectors (login ke layanannya) |
| **B. Plugin & skill Claude Code** | Paket perintah/skill yang dipasang di Claude Code | Jalankan `setup/pasang-plugin` atau perintah `/plugin` di bawah |
| **C. Tools dari TikTok/IG** | Repo yang **dicatat** (belum pernah dipasang) | Pilih yang dibutuhkan saja, pasang satu per satu |

> Penting: koneksi akun (login Gmail, Figma, dll.) **tidak bisa dipindah lewat file** demi keamanan.
> Anda cukup login ulang sekali di akun pribadi. Jangan pernah menyimpan password/API key di catatan.

---

## A. Connector yang aktif di sesi cloud ini

| Connector | Dipakai untuk | Cara aktifkan |
|---|---|---|
| **GitHub** | Simpan semua proyek & catatan | claude.ai → Settings → Connectors → GitHub; di PC cukup `git` + akun GitHub |
| **Gmail** | Baca/draf email | claude.ai → Settings → Connectors → Gmail |
| **Google Drive** | Simpan/baca dokumen | claude.ai → Settings → Connectors → Google Drive |
| **Figma** | Desain website / mockup | claude.ai → Settings → Connectors → Figma |
| **Canva** | Desain cepat, resize sosmed | claude.ai → Settings → Connectors → Canva |
| **Adobe for creativity** | Edit foto/PDF/video ringan | claude.ai → Settings → Connectors → Adobe |
| **Trimble SketchUp** | Model 3D (berguna untuk file `.skp` SWRO) | claude.ai → Settings → Connectors → SketchUp |
| **Claude Docs** | Dokumen hidup di claude.ai | Bawaan claude.ai |

Connector claude.ai otomatis ikut terbaca di **Claude Code** selama Anda login dengan akun claude.ai yang sama
(`claude` → `/login`). Cek dengan perintah `/mcp` di dalam Claude Code.

---

## B. Plugin & skill yang terpasang di sesi cloud ini

| Plugin | Isi skill penting | Sumber |
|---|---|---|
| **design** | design-critique, design-system, ux-copy, accessibility-review, design-handoff, user-research | Anthropic knowledge-work-plugins |
| **engineering** | code-review, debug, architecture, system-design, testing-strategy, deploy-checklist, documentation | Anthropic knowledge-work-plugins |
| **operations** | process-doc, runbook, risk-assessment, status-report, vendor-review, capacity-plan | Anthropic knowledge-work-plugins |
| **data** | analyze, build-dashboard, create-viz, sql-queries, explore-data | Anthropic knowledge-work-plugins |
| **pdf-viewer** | buka, anotasi, isi form, tanda tangan PDF | marketplace plugin |
| **desktop-commander** | terminal & file di komputer sendiri | MCP open source |
| **figma**, **canva**, **adobe-for-creativity** | skill pendamping connector desain | marketplace plugin |
| **postiz** | jadwal posting sosial media | marketplace plugin |
| Skill bawaan Anthropic | **docx, pdf, pptx, xlsx, skill-creator** | bawaan claude.ai / repo anthropics/skills |

(Plugin *bio-research* dan *zoom* juga ada di sesi cloud, tetapi tidak relevan untuk pekerjaan Anda — tidak perlu dipasang.)

### Cara pasang (di dalam Claude Code, ketik satu per satu)
```
/plugin marketplace add anthropics/knowledge-work-plugins
/plugin install design@knowledge-work-plugins
/plugin install engineering@knowledge-work-plugins
/plugin install operations@knowledge-work-plugins
/plugin install data@knowledge-work-plugins
/plugin marketplace add anthropics/skills
/plugin
```
Perintah terakhir (`/plugin`) membuka katalog: cari **frontend-design**, **security-guidance**, **superpowers**,
**pdf-viewer**, **figma**, **canva**, **postiz**, lalu klik Install. Nama di katalog bisa sedikit berbeda;
cari dengan kata kuncinya.

Atau jalankan skrip otomatis: `setup/pasang-plugin.ps1` (Windows) / `setup/pasang-plugin.sh` (Mac/Linux).
Kalau ada baris yang gagal (nama berubah), pasang manual lewat `/plugin`.

### MCP lokal (contoh konfigurasi: `setup/mcp-contoh.json`)
| MCP | Fungsi |
|---|---|
| `desktop-commander` | terminal & file di PC |
| `chrome-devtools` | Claude bisa membuka & memeriksa website di Chrome (wajib untuk jualan website) |
| `playwright` | otomasi browser, tes website, screenshot |

Cara mengaktifkan (pilih yang Anda butuhkan saja, cek dulu sumbernya):
- salin `setup/mcp-contoh.json` ke root proyek dengan nama `.mcp.json`, lalu buka Claude Code → saat ditanya, pilih **Yes**; atau
- tambahkan satu per satu: `claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest`

Butuh **Node.js 18+** terpasang.

---

## C. Tools dari TikTok/IG (dicatat, belum dipasang)

Daftar lengkap 38 tools + 30 plugin beserta link ada di:
- `catatan/Simpanan Tools AI/00 Simpanan Tools AI (MOC).md`
- `catatan/Simpanan Tools AI/30 Plugin Claude Terbaik per Peran.md`
- `catatan/Jualan Website/Setup Claude Code - 5 Plugin untuk 5 Titik Buta.md`
- `catatan/Jualan Website/Skill Desain - Perbaiki UI Buatan AI.md`
- `catatan/Jualan Website/Connector - 5 Connector Wajib untuk Claude.md`

### Paket awal yang disarankan untuk jualan website (pasang ini dulu)
| Tool | Untuk | Perintah |
|---|---|---|
| frontend-design (resmi) | Desain UI tidak "kelihatan AI" | `/plugin install frontend-design@claude-plugins-official` |
| security-guidance (resmi) | Cek keamanan saat coding | `/plugin install security-guidance@claude-plugins-official` |
| superpowers | Alur kerja terstruktur (rencana → kerja → cek) | `/plugin install superpowers@claude-plugins-official` |
| agent-skills (Addy Osmani) | Skill engineering lengkap | `/plugin marketplace add addyosmani/agent-skills` lalu `/plugin install agent-skills@addy-agent-skills` |
| chrome-devtools-mcp | Lihat & debug website di Chrome | `claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest` |
| GSAP skills | Animasi web premium | `npx skills add greensock/gsap-skills` |
| taste-skill | Selera desain | `npx skills add Leonxlnx/taste-skill` |
| ui-ux-pro-max-skill | Panduan UI/UX | `npx skills add nextlevelbuilder/ui-ux-pro-max-skill` |
| security-audit-skill (Cloudflare) | Audit keamanan sebelum launch | `npx skills add cloudflare/security-audit-skill` |
| marketingskills | SEO, copywriting, iklan | `npx skills add coreyhaines31/marketingskills` |

### Untuk video & 3D (proyek Traya)
| Tool | Perintah |
|---|---|
| Three.js skills | `npx skills add CloudAI-X/threejs-skills` |
| hyperframes (video dari HTML) | `npx skills add heygen-com/hyperframes` |
| diagram-design | `npx skills add cathrynlavery/diagram-design` |
| motion-design-skill (Lottie) | `npx skills add lottiefiles/motion-design-skill` |

Catatan jujur: isi repo-repo di bagian C **belum pernah dicek langsung** (sesi cloud tidak bisa membuka
semuanya). Sebelum memasang, minta Claude membaca README repo-nya dulu dan pastikan sumbernya terpercaya.
Pasang **seperlunya**: terlalu banyak skill membuat Claude lebih lambat dan boros token.
