# MULAI DI SINI — Pindah ke Claude Code Pribadi (Claude Pro)

Isi paket ini: **semua kode, catatan Obsidian, naskah, model 3D, suara, dan rangkuman** dari sesi Claude
Code cloud. Ikuti langkah di bawah dari atas ke bawah (± 30–60 menit, sekali saja).

## Isi folder
| File | Fungsi |
|---|---|
| `CLAUDE.md` (root) | Memori proyek — otomatis dibaca Claude Code setiap sesi |
| `pindahan-claude-pribadi/01-RANGKUMAN-LENGKAP.md` | Semua proyek, keputusan, status, cara kerja mesin video |
| `pindahan-claude-pribadi/02-PELAJARAN-WEB-DEV.md` | Kurikulum 11 pelajaran + Pelajaran 1 |
| `pindahan-claude-pribadi/03-HARGA-PAKET-DAN-KLIEN.md` | Paket, harga, margin, penawaran klien Teteh, stack |
| `pindahan-claude-pribadi/04-MCP-SKILL-PLUGIN.md` | Semua connector/plugin/skill/MCP + cara pasang |
| `pindahan-claude-pribadi/05-PROMPT-PEMBUKA.md` | Prompt pertama untuk Claude pribadi |
| `pindahan-claude-pribadi/setup/` | Skrip setup Python + Node (Windows & Mac/Linux), pasang plugin, contoh MCP |
| `catatan/` | **Vault Obsidian** (Jualan Website + Simpanan Tools AI) |
| `video/`, `video-3m3/`, `tts/`, `audio/`, `naskah/` | Mesin & sumber video SWRO (kontainer & kapal 3 m³) |

File video hasil akhir (MP4 besar) **tidak** dimasukkan ke zip supaya ringan — Anda sudah mengunduhnya,
dan versi bagiannya juga ada di GitHub (`hasil/`, `hasil-3m3/`).

## Langkah 1 — Install program dasar (sekali saja)
**Windows** (buka PowerShell sebagai biasa, ketik satu per satu):
```
winget install Python.Python.3.12
winget install OpenJS.NodeJS.LTS
winget install Git.Git
winget install Gyan.FFmpeg
```
**Mac**: install Homebrew (brew.sh), lalu `brew install python node git ffmpeg`.
Tutup lalu buka lagi terminal setelah install.

## Langkah 2 — Install & login Claude Code
```
npm install -g @anthropic-ai/claude-code
```
Lalu buka terminal **di folder proyek ini** (hasil ekstrak zip), ketik `claude`, dan login dengan akun
**Claude Pro** Anda (`/login` → pilih akun claude.ai).
(Alternatif: aplikasi Claude Desktop → tab Code, pilih folder proyek ini.)

## Langkah 3 — Jalankan setup proyek
Windows:
```
powershell -ExecutionPolicy Bypass -File pindahan-claude-pribadi\setup\setup-windows.ps1
```
Mac/Linux:
```
bash pindahan-claude-pribadi/setup/setup-mac-linux.sh
```
Skrip ini memasang paket Python (suara Ardi, musik), three.js, Playwright + Chromium, lalu membuat 1 gambar
uji di folder `uji/`. (Bisa juga minta Claude yang menjalankan — lihat Langkah 5.)

## Langkah 4 — Connector & plugin
1. Buka **claude.ai → Settings → Connectors**, aktifkan yang Anda pakai (GitHub, Gmail, Google Drive,
   Figma, Canva, Adobe, SketchUp). Login ke tiap layanan.
2. Pasang plugin: jalankan `pindahan-claude-pribadi/setup/pasang-plugin.ps1` (Windows) atau `.sh` (Mac),
   atau ketik perintah `/plugin …` dari file `04-MCP-SKILL-PLUGIN.md` di dalam Claude Code.
3. Di Claude Code ketik `/mcp` dan `/plugin` untuk memastikan semuanya terpasang.

## Langkah 5 — Kenalkan Claude pada semua pekerjaan
Buka `pindahan-claude-pribadi/05-PROMPT-PEMBUKA.md`, isi path vault Obsidian Anda, salin promptnya,
tempel ke Claude Code. Claude akan membaca semuanya, menyalin catatan ke Obsidian, dan siap melanjutkan.

## Langkah 6 (disarankan) — Simpan ke GitHub
Proyek ini juga ada di GitHub (`trayahydro/test-1`, branch `claude/happy-bardeen-srjq1u`). Supaya Claude di PC
dan di cloud selalu sinkron, minta Claude: *"Sambungkan folder ini ke repo GitHub saya dan commit perubahan."*

## Kalau ada masalah
- Perintah tidak dikenal (python/node/ffmpeg) → tutup-buka terminal, atau ulangi Langkah 1.
- Render video di Windows memakai kartu grafis otomatis; skrip `render-semua.sh` dijalankan lewat **Git Bash**.
- Tanya saja ke Claude Code: *"Tolong cek kenapa setup gagal"* — dia bisa membaca pesan errornya.
