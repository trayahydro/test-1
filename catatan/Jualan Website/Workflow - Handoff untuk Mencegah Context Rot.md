---
tipe: workflow
sumber: Instagram (transkrip video, dikirim user sebagai teks)
dibuat: 2026-10-30
tags: [jualan-website, claude-code, workflow, context, sumber-ig]
---

# Handoff: Mencegah "Context Rot" di Claude Code *(IG)*

> *"The longer you run a Claude Code session, the dumber it gets. And using compact is not enough to fix it."*

Kaitan: [[Hemat Biaya - Pembagian Model Claude (Opus, Sonnet, Haiku)]] · [[Dokumen Project - 4 Dokumen Wajib Vibe Coder]] · Claude-Mem (#memori) di [[30 Plugin Claude Terbaik per Peran]]

## Masalah: context rot
- Makin lama satu sesi berjalan, kualitas jawaban Claude makin turun.
- `/compact` tetap **membawa percakapan lama**: jalan buntu, debugging yang berantakan, dan asumsi yang salah ikut terbawa ke percakapan berikutnya.

## Solusi: full handoff
**1. Sebelum mengakhiri sesi**, minta Claude membuat `handoff.md` berisi 6 hal:
1. **Goal**: tujuan pekerjaan
2. **Current state**: kondisi sekarang
3. **Active files**: file yang sedang dikerjakan
4. **Changes made**: perubahan yang sudah dilakukan
5. **Failed attempts**: daftar percobaan yang gagal (supaya tidak diulang)
6. **Next steps**: langkah berikutnya yang spesifik

**2.** Jalankan `/clear` atau buka sesi baru.
**3.** Minta Claude **membaca handoff.md dan melanjutkan** dari titik terakhir.

## Kapan dipakai
- Saat akan **meninggalkan pekerjaan berjam-jam**.
- Saat Claude **terus mengulang kesalahan yang sama**.

## Prompt siap pakai
**Membuat handoff:**
```
Sebelum sesi ini ditutup, buat file handoff.md di root project berisi:
1. Goal: tujuan pekerjaan ini
2. Current state: apa yang sudah jalan dan apa yang belum
3. Active files: daftar file yang sedang dikerjakan (path lengkap)
4. Changes made: perubahan yang sudah dibuat di sesi ini
5. Failed attempts: semua yang sudah dicoba tapi gagal, beserta alasannya
6. Next steps: langkah berikutnya yang spesifik dan berurutan
Tulis ringkas dan faktual. Jangan sertakan asumsi yang belum terbukti.
```
**Melanjutkan di sesi baru (setelah `/clear`):**
```
Baca handoff.md lalu lanjutkan dari langkah "Next steps" pertama.
Jangan ulangi apa pun yang ada di "Failed attempts".
```

## Penerapan untuk project klien
- Tiap project klien punya `handoff.md` yang diperbarui di akhir setiap sesi kerja. Kalau besok lanjut, tidak perlu menjelaskan ulang.
- Kombinasikan dengan 4 dokumen project (AGENTS/PRD/DESIGN_SYSTEM/ARCHITECTURE). Dokumen itu konteks tetap; handoff.md konteks harian.
- Sesi yang pendek dan bersih juga **lebih hemat token/biaya**.
- Bisa dijadikan skill (prompt 8): "buat handoff" dan "lanjutkan dari handoff".
