---
tipe: tips
sumber: Instagram (transkrip video, dikirim user sebagai teks)
dibuat: 2026-10-30
tags: [jualan-website, claude-code, biaya, model, sumber-ig]
---

# Hemat Biaya: Bagi Tugas Antar Model Claude *(IG)*

> *"You're still wasting money paying a genius to dig holes."*

Kaitan: [[00 Jualan Website (MOC)]] · Caveman / Headroom / Claude-Mem (hemat token) di [[30 Plugin Claude Terbaik per Peran]]

## Inti video: Claude seperti kru bangunan, satu tugas per pekerja
| Model | Peran | Tugas |
|---|---|---|
| **Opus** | arsitek | hanya membuat rencana |
| **Sonnet** | tukang | membangun (menulis kode); menurut video harganya ± setengah Opus |
| **Haiku** | penggali | mencari file, mengambil informasi yang dibutuhkan; menurut video ± 40× lebih murah dari Opus |

- Klaim video: panduan Anthropic sendiri menyebut **memakai Opus sebagai default** termasuk penyebab utama tagihan yang membengkak.
- Perbandingan harga di video adalah **klaim video**. Harga berubah tiap generasi model, jadi **cek halaman harga resmi Anthropic** sebelum menghitung.

## Cara setting di Claude Code
1. Ketik:
   ```
   /model opusplan
   ```
   Opus dipakai saat merencanakan (plan mode), Sonnet saat mengeksekusi. Di video ditulis "/model Opus plan"; nama perintahnya `opusplan`.
2. "One more line puts Haiku on digging duty": video tidak menyebut baris persisnya. Kemungkinan pengaturan model untuk **subagent** atau tugas pencarian. *Cek dokumentasi Claude Code terbaru* (pengaturan model subagent / `settings.json`) di PC lokal.

## Relevansi untuk jualan website
- Biaya Claude adalah biaya tetap utama bisnis (lihat [[Panduan - Jadi AI Engineer & Stack Pilihan]]). Membagi model menekan biaya per project, jadi margin per klien lebih besar.
- Pola kerja: **rencanakan dengan Opus** (PRD, design brief), **bangun dengan Sonnet**, dan biarkan pencarian file atau riset ringan dikerjakan model kecil.
- Kalau memakai langganan (bukan API), pembagian ini juga membantu kuota pemakaian tidak cepat habis.
