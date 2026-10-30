---
tipe: panduan
sumber: rangkuman diskusi dengan Claude (2026-10-30), berdasarkan materi TikTok/IG
dibuat: 2026-10-30
tags: [jualan-website, panduan, stack, workflow]
---

# Panduan: Jadi AI Engineer & Stack Pilihan

Kaitan: [[Mindset - Vibe Coder vs AI Engineer]] · [[Prompt - 8 Prompt Wajib Sebelum Vibecoding]] · [[Stack - 20 Dolar per Bulan Startup Stack]] · [[00 Jualan Website (MOC)]]

Intinya: **berpikir dulu, baru menyuruh AI.** Saya pengambil keputusan dan pemeriksa; Claude yang mengetik kode.

## Alur kerja per klien
1. **Tanya klien dulu** (daftar tetap):
   - Bisnisnya apa, siapa calon pembelinya?
   - Halaman apa saja (Beranda, Tentang, Produk, Kontak)?
   - Perlu WhatsApp, form, toko online, atau pembayaran?
   - Ada contoh website yang disukai?
   - Sudah punya logo, warna, dan foto?
   - Deadline dan budget?
2. **Putuskan 3 hal kritis**: stack, integrasi, desain. Tulis di satu catatan sebelum membuka Claude.
3. **Tiap prompt pakai format:** Yang ingin dicapai / Konteks / Batasan / Dianggap selesai kalau.
4. **Pakai 8 prompt berurutan:** PRD → design brief → bangun → tes → audit keamanan → simpan jadi skill.
5. **Periksa sendiri:** buka di HP dan laptop, klik semua tombol. Kalau ada yang aneh, minta Claude menjelaskan dulu sebelum memperbaiki.
6. **Belajar sedikit demi sedikit:** tanyakan "kenapa pilih ini?" setiap kali Claude memilih sesuatu.

**Contoh prompt:**
```
Yang ingin saya capai: Landing page untuk Bengkel Maju Jaya
Konteksnya: bengkel motor di Tangerang, target pelanggan sekitar, ingin dihubungi lewat WhatsApp
Batasan: Next.js + Tailwind, warna biru-oranye, mobile-first, selesai 1 halaman dulu
Dianggap selesai kalau: tampil rapi di HP, tombol WA berfungsi, skor Lighthouse > 90
```

**Langkah pertama:** buat 1 website portofolio (usaha teman atau usaha fiktif) dengan alur di atas.

## Stack utama (semua klien)
| Bagian | Pilihan | Alasan |
|---|---|---|
| Framework | **Next.js** | paling umum dan paling dikuasai Claude |
| Styling | **Tailwind CSS + shadcn/ui** | cepat, rapi, didukung semua skill desain |
| Animasi | **GSAP** atau **Motion** | terlihat premium (ada GSAP Skill #21) |
| Kode | **GitHub** | gratis, arsip semua project |
| Hosting | **Cloudflare Pages** | gratis dan boleh komersial |
| Domain | registrar lokal (Niagahoster, Rumahweb, IDCloudHost) | bisa .com, .id, dan .co.id |
| AI | **Claude Code** + skill desain | ± $20/bulan, satu-satunya biaya tetap |

**Catatan Vercel:** paket gratis (Hobby) setahu Claude hanya untuk pemakaian pribadi/non-komersial. Untuk klien pakai Cloudflare Pages atau Vercel Pro (± $20/bulan). *Cek syarat terbaru.*

## Tambahan sesuai paket
| Paket | Kebutuhan | Tambahan |
|---|---|---|
| **Basic**: landing page / company profile | info bisnis, tombol WA, peta | tidak ada |
| **Standard**: form & konten bisa diubah | form kontak, blog/katalog | Resend (email form), Supabase atau CMS (mis. Sanity) |
| **Pro**: toko online / sistem | login, database, pembayaran | Supabase, Midtrans/Xendit (QRIS, VA, e-wallet), Sentry |

**Kalimat batasan untuk prompt:**
```
Stack: Next.js + Tailwind CSS + shadcn/ui, animasi GSAP, deploy ke Cloudflare Pages.
```
