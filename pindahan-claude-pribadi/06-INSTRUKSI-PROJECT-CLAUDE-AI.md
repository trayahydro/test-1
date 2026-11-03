# Memindahkan Pengetahuan ke Claude Pribadi (claude.ai / Claude Desktop)

## Cara paling hemat limit: pakai **Project** di claude.ai
1. Buka claude.ai → **Projects** → **Create project** → beri nama *Traya & Jualan Website*.
2. Di **Project knowledge**, upload file ini (cukup ini saja, jangan semua):
   - `CLAUDE.md`
   - `pindahan-claude-pribadi/01-RANGKUMAN-LENGKAP.md`
   - `pindahan-claude-pribadi/03-HARGA-PAKET-DAN-KLIEN.md`
   - `pindahan-claude-pribadi/02-PELAJARAN-WEB-DEV.md`
   - `catatan/Jualan Website/00 Jualan Website (MOC).md` dan `catatan/Jualan Website/Klien/PRD - Toko Online Fashion (Teteh).md`
   - (opsional, hanya kalau butuh riwayat detail) `Ekspor-Chat-Traya.md`
3. Di **Project instructions**, tempel teks di kotak bawah.
4. Setiap chat baru di dalam Project itu otomatis tahu semua konteks.

```
Saya pengguna berbahasa Indonesia, awam soal coding. Jelaskan dengan bahasa sederhana, pakai perumpamaan,
tabel ringkas, langkah bernomor, dan beri rekomendasi yang jelas. Jujur soal batasan; tandai angka
perkiraan sebagai "tipikal/estimasi".
Konteks saya ada di Project knowledge (CLAUDE.md + 01-RANGKUMAN-LENGKAP.md): saya bekerja untuk
PT Traya Hydro Indonesia (video promosi SWRO) dan sedang membangun usaha jasa website (klien pertama: toko
fashion "Teteh"), serta belajar web developer (lanjut Pelajaran 2: Frontend).
Aturan: jangan menyebut nama klien/instansi di materi publik; jangan minta saya menempel password/API key;
untuk pekerjaan panjang cukup kabari saat hampir selesai, selesai, atau ada masalah.
Catatan saya disimpan di Obsidian; kalau membuat catatan baru, tulis dalam format Markdown Obsidian
(properties di atas, [[wikilink]] antar catatan).
```

## Untuk Claude Code / Claude Desktop di PC
- Folder proyek + `CLAUDE.md` (dari zip) sudah cukup. Claude otomatis membaca `CLAUDE.md`; file lain dibaca
  **hanya saat dibutuhkan** — jangan menyuruh Claude membaca semua file sekaligus (boros limit).
- MCP yang sudah Anda pasang di PC (Windows MCP, SketchUp, FL Studio, EPANET, dll.) **tetap di PC** dan tidak
  perlu dipindah. Yang dipindah hanya **pengetahuan** (file-file ini).
- Obsidian: salin folder `catatan/` ke vault Anda. Agar Claude Desktop bisa membaca vault, sambungkan folder
  vault lewat MCP filesystem / Windows MCP / Obsidian MCP yang sudah Anda pasang.

## Hemat limit Claude Pro
- Limit Claude Pro **dipakai bersama** oleh claude.ai, Claude Desktop, dan Claude Code, dan di-reset tiap
  beberapa jam (plus batas mingguan). Pindah aplikasi tidak menambah kuota.
- Pakai model **Sonnet** untuk pekerjaan harian; Opus hanya untuk yang berat.
- Di Claude Code: `/clear` saat ganti topik, `/compact` kalau percakapan sudah panjang.
- Terlalu banyak MCP & skill aktif juga memakan token di setiap pesan → matikan yang tidak dipakai
  (`/mcp` untuk melihat dan menonaktifkan).
