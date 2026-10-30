---
tipe: mindset
sumber: Instagram Reels (@nuhushaik "Vibe Coder vs AI Engineer"; + video "Three levels of Claude Code")
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

---

## 3 Level Pengguna Claude Code *(IG, video kedua)*
| Level | Ciri-ciri | Pola |
|---|---|---|
| **1. Pemula** | pakai ekstensi Claude Code di VS Code; belum tahu cara memberi konteks, jadi Claude menebak | terjebak **siklus koreksi**: salah, dikoreksi, salah lagi |
| **2. Menengah** | pindah ke **CLI**; memberi konteks dengan benar lewat file **CLAUDE.md**; paham stack sendiri; bisa debug; mengganti **model & effort** sesuai tugas; memakai **plan mode** dengan efektif | **mengarahkan, bukan mengoreksi** |
| **3. Ahli** | jago mengelola sumber daya: mengatur konteks dengan **skills**; menjalankan **banyak agent paralel di beberapa git worktree**; memakai **`/remote-control`** supaya tetap membangun saat tidak di depan komputer | tidak ngoding lagi; **mengawasi "anak magang" (agent) bekerja** |

**Peta belajar untuk saya** (semua sudah ada catatannya):
- Naik ke level 2: CLAUDE.md / AGENTS.md ([[Dokumen Project - 4 Dokumen Wajib Vibe Coder]]), pilih model per tugas ([[Hemat Biaya - Pembagian Model Claude (Opus, Sonnet, Haiku)]]), plan mode + format prompt di atas, debug pakai prompt 4 ([[Prompt - 8 Prompt Wajib Sebelum Vibecoding]]).
- Naik ke level 3: skills ([[00 Simpanan Tools AI (MOC)]]), handoff untuk mengelola konteks ([[Workflow - Handoff untuk Mencegah Context Rot]]), worktree untuk mengerjakan beberapa project klien sekaligus, remote control untuk memantau dari HP.
- Catatan: perintah dan nama fitur bisa berubah; cek dokumentasi Claude Code terbaru di PC lokal (`/help`).
