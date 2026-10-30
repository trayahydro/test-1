---
tipe: ide-produk
sumber: Instagram (transkrip video, dikirim user sebagai teks)
dibuat: 2026-10-30
tags: [jualan-website, automasi, ide-produk, upsell, crm, sumber-ig]
---

# Automasi Bisnis Jasa: Contoh Alur untuk Tukang Ledeng (Plumber) *(IG)*

> Klaim video: automasi ini bisa dijual ke plumber seharga **$20.000 per tahun**, menjalankan bisnisnya secara autopilot.
> Alasannya: pemilik jasa lapangan sibuk bekerja dan tidak sempat mengurus bisnisnya, jadi mau membayar mahal untuk automasi.

Kaitan: [[WhatsApp Agent - Kapso]] · [[Connector - 5 Connector Wajib untuk Claude]] · [[00 Jualan Website (MOC)]]

## Alur lengkap (dari video)
```mermaid
flowchart TD
  A[Pelanggan booking di website] --> B[Email + SMS konfirmasi otomatis]
  A --> C[Kontak baru di CRM HighLevel]
  A --> D[Job dikirim ke plumber yang tepat<br/>berdasarkan lokasi & keahlian]
  D --> E[Tunggu sampai 24 jam sebelum jadwal]
  E --> F{SMS: jadi datang? Ya/Tidak}
  F -- Tidak --> G[Urutan reschedule]
  G -- mau reschedule --> H[Kirim link booking lagi] --> A
  G -- Tidak lagi --> I[Urutan nurture untuk booking di masa depan]
  F -- Ya --> J[Lokasi & jam masuk rute GPS plumber besok<br/>rute dioptimalkan]
  J --> K[SMS otomatis saat plumber mendekat<br/>berdasarkan GPS]
  K --> L[Setelah kerja: catatan & foto plumber<br/>dikirim ke Claude AI → laporan untuk klien]
  L --> M[Invoice otomatis via QuickBooks]
  M --> N{Email feedback}
  N -- Negatif --> O[Tugas untuk pemilik: hubungi klien, cari masalahnya]
  N -- Positif --> P[Email terima kasih + diskon berikutnya<br/>+ link ulasan Google]
  O --> Q[Kampanye nurture & reaktivasi<br/>booking ulang / paket perawatan berkala]
  P --> Q
```

## Komponen & tools yang disebut
| Tahap | Tools di video | Padanan lokal Indonesia (ide) |
|---|---|---|
| Booking | website plumber | website buatan kita + kalender booking |
| Notifikasi | email + SMS | **WhatsApp** (Kapso / WA Business API), email |
| CRM | **HighLevel** (GoHighLevel) | HighLevel, atau Google Sheets/Supabase untuk klien kecil |
| Penugasan & rute | GPS route optimization | Google Maps (rute), share lokasi WA |
| Laporan kerja | **Claude AI** (catatan + foto → laporan) | sama (Claude API) |
| Invoice | **QuickBooks** | aplikasi akuntansi lokal atau invoice PDF + link Midtrans/Xendit |
| Ulasan | link Google review | **Google Business Profile** (lihat [[SEO - Checklist Supaya Website Muncul di Google]]) |

## Ide penerapan di Indonesia
- **Target:** jasa lapangan seperti servis AC, tukang ledeng, pest control, cuci sofa/karpet, bengkel panggilan, teknisi listrik, **juga servis water treatment / filter air** (relevan dengan bisnis Traya).
- **Paket bertahap** (supaya terjangkau UMKM):
  1. **Basic:** website + booking + konfirmasi WA + pengingat H-1
  2. **Pro:** + CRM, invoice otomatis, permintaan ulasan Google
  3. **Premium:** + penugasan teknisi, rute, laporan kerja AI, kampanye perawatan berkala
- Model harga: **biaya setup + langganan bulanan** (maintenance & biaya tools). Angka $20.000/tahun adalah klaim untuk pasar AS; sesuaikan dengan pasar lokal.
- **Bisa dibangun dengan:** Claude Code + Supabase + WhatsApp (Kapso) + tool automasi (misalnya n8n/Make/Zapier). Tool automasi tidak disebut di video, ini saran tambahan.

## Catatan
- Patuhi aturan WhatsApp (opt-in, template di luar 24 jam). Lihat [[WhatsApp Agent - Kapso]].
- Data pelanggan dan lokasi harus dijaga keamanannya. Lihat [[Keamanan - Checklist Sebelum Launch]].

---

# Contoh 2: Kontraktor Renovasi Kamar Mandi, "Flywheel" Agent *(IG, transkrip)*
Satu calon pelanggan diproses dari awal sampai menghasilkan konten & SEO yang **mendatangkan pelanggan berikutnya**.

| Waktu / tahap | Agent | Yang dilakukan |
|---|---|---|
| Jam 21.00 | **Website** | pemilik rumah memotret kamar mandi lamanya; dalam 10 detik website memberi **kisaran harga**, lalu menanyakan budget & waktu pengerjaan |
| +30 detik | **Booking agent** | mengirim SMS dan menjadwalkan telepon untuk hari Kamis |
| Sebelum telepon | **Nurture agent** | mengirim 3 contoh kamar mandi yang baru dikerjakan **di dekat lokasinya** |
| Jam 19.00 malam sebelumnya | Nurture agent | mengirim video perkenalan singkat kru, supaya calon pelanggan sudah "hangat" |
| | **Intake agent** | foto, budget, dan timeline masuk ke satu file di CRM |
| | **Quote agent** | menyusun draf proposal dari file itu; pemilik datang ke telepon dengan harga siap |
| Setelah "ya" | **Scheduling agent** | menjadwalkan kru dan memesan material; kerja mulai Senin |
| Selesai | **Follow-up agent** | SMS terima kasih + tanya kepuasan. Puas: minta **ulasan Google**. Tidak puas: lapor ke pemilik dulu untuk diperbaiki |
| Ulasan 5★ | **Content agent** | mengambil foto before/after, menulis **studi kasus + blog post**, dan memasangnya di website |
| | **Social agent** | mengubahnya jadi postingan Instagram & Facebook |
| | **Strategy agent** | membaca transkrip telepon, menemukan **2 pertanyaan yang belum dijawab website**, menulis artikel FAQ untuk masing-masing |
| | **SEO agent** | mengecek artikel terhadap praktik terbaik Google **dan ChatGPT** sebelum tayang |

**Hasil akhir:** saat calon pelanggan berikutnya bertanya ke ChatGPT *"berapa lama renovasi kamar mandi?"*, bisnis ini muncul di jawabannya (**GEO**, lihat [[SEO - Checklist Supaya Website Muncul di Google]]). Lalu siklusnya berulang.

## Pelajaran untuk jualan website
- **Website bukan brosur**, tapi mesin penjualan: kalkulator harga dari foto, form budget & timeline, booking otomatis.
- **Konten dari pekerjaan nyata** (before/after, studi kasus, FAQ dari pertanyaan pelanggan) memperkuat SEO + GEO tanpa harus memikirkan ide konten.
- Paket yang bisa ditawarkan bertahap: (1) website + kalkulator estimasi + booking WA, (2) + follow-up & ulasan Google, (3) + mesin konten (studi kasus, blog, sosmed, FAQ).
- Fitur "harga dari foto" memakai AI vision (mis. Claude) dan hasilnya hanya **kisaran estimasi**; tulis jelas bahwa harga final setelah survei.
- Versi lokal: SMS diganti **WhatsApp** ([[WhatsApp Agent - Kapso]]); minta izin pelanggan sebelum memakai foto rumahnya untuk konten.
