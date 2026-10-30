---
tipe: mindset
sumber: Instagram Reels (@nuhushaik, "Vibe Coder vs AI Engineer in 30 seconds")
dibuat: 2026-10-30
tags: [jualan-website, mindset, prompt, workflow, sumber-ig]
---

# Vibe Coder vs AI Engineer

Video pendek dari **@nuhushaik** (caption: *"Comment ENGINEER for a free guide to level up…"*, guide-nya belum didapat).
Kaitan: [[Prompt - 8 Prompt Wajib Sebelum Vibecoding]] · [[Stack - 20 Dolar per Bulan Startup Stack]] · [[00 Jualan Website (MOC)]]

## 1P: Vibe Coder (yang dihindari)
"Items" yang **tidak dibawa** (dicoret ✗):
- ~~References~~: tanpa referensi
- ~~Documentation~~: tanpa dokumentasi
- ~~Creative thinking~~
- ~~Critical thinking~~

Langsung menyuruh AI "buatkan aplikasi" tanpa berpikir. Narator: *"…creative or critical thinking"*.

## 2P: AI Engineer (yang ditiru)

### a. Putuskan dulu hal-hal kritis (Critical Decisions)
*"Decisions for stack, integrations, design"*, sebelum menyuruh AI menulis kode:
| Keputusan | Contoh di video |
|---|---|
| **Stack** | Next.js + Postgres |
| **Integrasi** | Stripe (pembayaran) + Resend (email) |
| **Design** | palet warna + font (Aa) |

### b. Format prompt yang selalu diikuti
*"Prompts follow this"*:
```
I want to achieve: [GOAL]
Here's the context: [CONTEXT]
Constraints: [CONSTRAINTS]
It's done when: [KRITERIA SELESAI]
```
Baris terakhir tertutup tombol play; dibaca *"It's done wh…"*, kemungkinan **"It's done when…"**.

**Versi Indonesia:**
```
Yang ingin saya capai: [TUJUAN]
Konteksnya: [KONTEKS: bisnis klien, target pengunjung, halaman yang ada]
Batasan: [BATASAN: stack, budget, deadline, gaya desain]
Dianggap selesai kalau: [KRITERIA SELESAI yang bisa dicek]
```

### c. Jawab pertanyaan detail supaya AI bisa memutuskan dengan benar
*"Questions so that they can ma[ke the right decisions]…"*. Contoh untuk fitur pembayaran:
1. **One-time or monthly?** Bayar sekali atau langganan bulanan?
2. **Which provider?** Pakai penyedia pembayaran apa?
3. **Free trial?** Ada masa coba gratis?

## Pelajaran untuk jualan website
- Sebelum mengerjakan website klien, **putuskan stack, integrasi, dan desain** dulu (lihat [[Stack - 20 Dolar per Bulan Startup Stack]] dan [[Referensi Desain - Sumber Inspirasi Website]]).
- Tiap prompt pakai format **Goal, Context, Constraints, Done when**.
- Siapkan **daftar pertanyaan untuk klien** sebelum mulai (pembayaran sekali/langganan, payment gateway, fitur, dsb.). Ini sejalan dengan prompt 1 (PRD) yang menyuruh AI bertanya dulu.
- Polanya sama dengan "Pola di balik 8 prompt": kasih role, paksa jeda, kunci output.
