---
tipe: setup
sumber: Instagram (transkrip video, dikirim user sebagai teks)
dibuat: 2026-10-30
tags: [jualan-website, claude-code, plugin, setup, sumber-ig]
---

# Setup Claude Code: 5 Plugin untuk 5 "Titik Buta" *(IG)*

> *"Everyone says Claude Code is ready out of the box. It's brilliant, but it has 5 blind spots."*

Kaitan: [[Skill Desain - Perbaiki UI Buatan AI]] · [[Keamanan - Checklist Sebelum Launch]] · [[30 Plugin Claude Terbaik per Peran]] · [[00 Jualan Website (MOC)]]

| # | Titik buta Claude Code | Plugin | Fungsi (dari video) |
|---|---|---|---|
| 1 | tidak ada yang mengecek ulang keamanannya | **Security Guidance** (Anthropic) | setiap giliran, Claude kedua dengan "mata segar" mereview celah keamanan, lalu Claude pertama memperbaikinya |
| 2 | desainnya seperti semua app AI | **Frontend Design** (Anthropic) | memaksa Claude memilih arah desain nyata, bukan gradien ungu dan kartu emoji |
| 3 | melewati langkah-langkah membosankan | **Agent Skills** (Addy Osmani) | spec → plan → build → test → review → ship; kalau Claude bilang "tes nanti saja", skill ini membantah |
| 4 | membangun berlebihan | **Ponytail** | contoh: date picker 400 baris jadi 23 baris; rata-rata kode ± setengahnya |
| 5 | tidak bisa melihat app-nya | **Chrome DevTools MCP** (tim Chrome Google) | Claude bisa melihat app: error console, network request, screenshot |

Catatan transkrip: "Adios Mani" = **Addy Osmani** (engineer Google Chrome). Ini sekaligus menjawab "Agent Skills" di daftar 30 plugin yang sebelumnya belum ketemu.

## Repo & cara pasang (dicek di halaman GitHub, 2026-10-30)
**1 & 2. Security Guidance & Frontend Design**: dari direktori plugin resmi Anthropic [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) (± 45k★). Format pasang:
```
/plugin install security-guidance@claude-plugins-official
/plugin install frontend-design@claude-plugins-official
```
Nama plugin persisnya belum terlihat saat dicek; jalankan `/plugin` di Claude Code untuk melihat daftar resminya.

*Tambahan (IG, screenshot video lain):* Frontend Design berbentuk file **`frontend-design/SKILL.md`**, yaitu sebuah skill. Kemungkinan ada juga di repo skill resmi [anthropics/skills](https://github.com/anthropics/skills) (#30 plugin: "Skills by Anthropic"). Videonya dari kreator lain lagi, jadi skill ini termasuk yang paling sering direkomendasikan.

**3. Agent Skills**: [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills): *"Production-grade engineering skills for AI coding agents."* ± 112k★, MIT, 25 skill. **Terkonfirmasi.**
```
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills
```
Alternatif: `npx skills add addyosmani/agent-skills`

**4. Ponytail**: [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) (± 181k★, dari hasil pencarian). Cara pasang ada di README.

**5. Chrome DevTools MCP**: [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp): *"Chrome DevTools for coding agents."* ± 55k★, Apache-2.0. **Terkonfirmasi.**
```
/plugin marketplace add ChromeDevTools/chrome-devtools-mcp
/plugin install chrome-devtools-mcp@chrome-devtools-plugins
```
Atau sebagai MCP server: `npx -y chrome-devtools-mcp@latest` (lihat panduan konfigurasi di repo).

## Kenapa cocok untuk jualan website
- **Keamanan** dicek otomatis sebelum serah terima.
- **Desain** tidak terlihat seperti template AI (pembeda saat menjual).
- **Proses rapi** (spec sampai ship) sejalan dengan [[Prompt - 8 Prompt Wajib Sebelum Vibecoding]].
- **Kode ramping** lebih mudah dirawat (maintenance klien).
- **Chrome DevTools MCP** membuat Claude bisa memeriksa tampilan dan error website klien sendiri, mirip Playwright di [[Connector - 5 Connector Wajib untuk Claude]].

**Saran urutan pasang:** Frontend Design → Chrome DevTools MCP → Security Guidance → Agent Skills → Ponytail. Pasang satu per satu dan uji (sesuai saran "jangan pasang semua sekaligus").
