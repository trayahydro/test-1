---
tipe: tutorial
sumber: Instagram (transkrip video, dikirim user sebagai teks)
dibuat: 2026-10-30
tags: [jualan-website, whatsapp, agent, otomatisasi, upsell, sumber-ig]
---

# WhatsApp Agent dengan Kapso *(IG)*

Membuat **agent WhatsApp** (misalnya untuk booking janji temu) yang punya nomor sendiri, dibuat oleh Claude Code.
Kaitan: [[00 Jualan Website (MOC)]] · [[Connector - 5 Connector Wajib untuk Claude]]

## Tentang Kapso
- Menghubungkan Claude ke **WhatsApp Business API resmi** (Meta).
- **Paket gratis: 2.000 pesan/bulan** (menurut video; *cek harga terbaru*).
- Di transkrip juga tertulis "Capsule", kemungkinan salah dengar dari **Kapso**.
- Link belum dicatat, cari "Kapso WhatsApp" di browser.

## Langkah (dari video)
1. **Buat akun Kapso gratis** dan hubungkan nomor WhatsApp.
2. **Buka Claude Code**, lalu pasang **WhatsApp skills** dari Kapso dengan satu perintah (perintah persisnya ada di dokumentasi Kapso).
3. **Perintahkan Claude**, misalnya:
   ```
   Build me a WhatsApp agent that books appointments.
   ```
   Claude menulis semuanya, dan agent punya nomor sendiri.

**Contoh hasil:** kalau ada yang bertanya *"Jumat kosong?"*, agent menawarkan slot yang tersedia lalu langsung mem-booking-nya, bahkan tengah malam.

## Aturan WhatsApp yang wajib diikuti
- **Minta opt-in dulu**: orang harus setuju menerima pesan.
- **Aturan 24 jam**: kalau pelanggan diam lebih dari 24 jam sejak pesan terakhirnya, bisnis **hanya boleh mengirim template pesan yang sudah disetujui** Meta.
- Melanggar aturan ini bisa membuat nomor dibatasi atau diblokir.

## Peluang untuk jualan website
Bisa dijual sebagai **add-on / paket upsell** untuk klien UMKM:
- **Bengkel, salon, klinik, barbershop:** booking janji via WA otomatis 24 jam.
- **Toko:** jawab pertanyaan stok, harga, dan jam buka.
- **Paket gabungan:** website + tombol WA + agent WA yang menjawab otomatis.

**Prompt versi Indonesia (contoh):**
```
Buatkan agent WhatsApp untuk [Salon Cantik] yang:
- menjawab pertanyaan harga & layanan dari daftar ini: [DAFTAR]
- menawarkan slot kosong dari jadwal dan mem-booking-nya
- mengirim konfirmasi dan pengingat H-1 (pakai template yang disetujui)
- meneruskan ke admin manusia kalau pertanyaannya di luar daftar
Patuhi aturan opt-in dan jendela 24 jam WhatsApp.
```

Hitung biaya per klien: paket gratis 2.000 pesan/bulan, lalu biaya Kapso + biaya percakapan Meta kalau lebih. *Cek tarif terbaru.*
