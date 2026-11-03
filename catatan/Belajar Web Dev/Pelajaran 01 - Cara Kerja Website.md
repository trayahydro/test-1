---
tipe: pelajaran
dibuat: 2026-11-03
tags: [belajar-web-dev, jualan-website]
---

# Belajar Web Developer untuk Penjual Website

Format tiap pelajaran: penjelasan sederhana · istilah penting · cara menjelaskan ke klien · latihan praktik · kuis.
Status: **Pelajaran 1 selesai**. Berikutnya: **Pelajaran 2 — Frontend** (tunggu pengguna bilang "lanjut pelajaran 2").

## Kurikulum "Web Developer untuk Penjual Website"

| No | Pelajaran | Kegunaan saat jualan |
|---|---|---|
| **1** | **Cara kerja website**: internet, browser, server, domain, DNS, hosting, HTTPS | Menjelaskan "website itu apa saja isinya dan kenapa ada biaya tahunan" |
| 2 | **Frontend**: HTML, CSS, JavaScript, responsive, framework (Next.js, Tailwind) | Menjelaskan tampilan, mobile friendly, kecepatan |
| 3 | **Desain web (UI/UX)**: layout, warna, font, hierarki, tombol aksi, design system | Menjual "desain yang menghasilkan pelanggan", bukan sekadar cantik |
| 4 | **Backend & database**: server, API, database, login, form | Menjelaskan kapan klien butuh fitur "di balik layar" |
| 5 | **Toko online (e-commerce)**: platform (Shopify/WooCommerce), payment gateway, ongkir, stok, marketplace | Menangani klien seperti Teteh |
| 6 | **Keamanan web**: HTTPS, password, data pelanggan, celah umum, backup | Membangun kepercayaan: "website Anda aman" |
| 7 | **SEO & Google**: Search Console, Google Business Profile, kecepatan, GEO (AI search) | Menjual "website yang ditemukan pelanggan" |
| 8 | **Performa & pengujian**: PageSpeed, tes di HP, tes fitur sebelum serah terima | Menjamin kualitas sebelum diserahkan |
| 9 | **Deploy & maintenance**: GitHub, hosting (Cloudflare/Vercel), update, backup, domain | Menjual paket maintenance (pemasukan rutin) |
| 10 | **Bekerja dengan AI (Claude Code)**: prompt, dokumen project, skill, alur kerja | Mengerjakan cepat dan rapi |
| 11 | **Bisnis & pitching**: wawancara klien, proposal, harga, kontrak, serah terima | Menutup deal dengan percaya diri |

---

# 📘 Pelajaran 1: Cara Kerja Website

## 1. Apa yang terjadi saat orang membuka website?
Misalnya pelanggan mengetik **bengkelmaju.com** di HP:

1. **Browser** (Chrome/Safari) bertanya ke **DNS**: "bengkelmaju.com itu alamatnya di mana?"
2. DNS menjawab dengan alamat server, berupa angka seperti `104.21.x.x` (disebut **alamat IP**).
3. Browser menghubungi **server** (komputer yang menyala 24 jam) tempat website disimpan, yaitu **hosting**.
4. Server mengirim file website: teks, gambar, desain, kode.
5. Browser **menyusun dan menampilkannya** di layar.

Semua ini terjadi dalam **1–3 detik**. Kalau lebih lama, pengunjung mulai pergi.

## 2. Istilah penting (perumpamaan rumah)

| Istilah | Perumpamaan | Penjelasan | Biaya umum |
|---|---|---|---|
| **Domain** | Alamat rumah | Nama website: `bengkelmaju.com`, `.co.id`, `.id` | Bayar **per tahun** |
| **DNS** | Buku alamat / petunjuk jalan | Menghubungkan nama domain ke server | Biasanya gratis (mis. Cloudflare) |
| **Hosting / server** | Tanah tempat rumah berdiri | Komputer yang menyimpan website dan menyala 24 jam | Gratis sampai berbayar per bulan/tahun |
| **Browser** | Tamu yang berkunjung | Aplikasi yang dipakai pengunjung untuk membuka website | – |
| **HTTPS / SSL** | Gembok pintu | Mengamankan data antara pengunjung dan website. Tanpa ini, browser memberi peringatan "Tidak aman" | Umumnya gratis sekarang |
| **URL** | Alamat lengkap sampai nomor kamar | Alamat halaman tertentu, misalnya `bengkelmaju.com/layanan` | – |

## 3. Website statis vs dinamis

| | **Statis** | **Dinamis** |
|---|---|---|
| Contoh | Landing page, company profile | Toko online, sistem booking, website dengan login |
| Isi | Sama untuk semua pengunjung | Berubah sesuai pengguna/data (keranjang, akun, stok) |
| Butuh backend & database? | Tidak | Ya |
| Kecepatan & keamanan | Sangat cepat, risiko kecil | Perlu perhatian lebih |
| Biaya | Lebih murah | Lebih mahal |
| Paket Anda | **Basic & Standard** | **Pro** |

## 4. 💬 Cara menjelaskan ke klien (bahasa awam)
> *"Website itu seperti toko fisik, Pak. **Domain** itu alamat tokonya, misalnya bengkelmaju.com, dan dibayar per tahun seperti sewa papan nama. **Hosting** itu tanah tempat tokonya berdiri supaya bisa dibuka 24 jam. Tanda **gembok (HTTPS)** membuat pelanggan merasa aman. Semua itu sudah saya urus. Bapak tinggal terima beres, dan domainnya atas nama Bapak sendiri."*

**Pertanyaan klien yang sering muncul:**
- *"Kenapa ada biaya tiap tahun?"* Domain itu sewa nama, harus diperpanjang. Kalau tidak, alamatnya bisa diambil orang lain.
- *"Kalau saya tidak lanjut maintenance, website-nya hilang?"* Tidak, selama domain dan hosting tetap diperpanjang. Maintenance itu untuk update, perbaikan, dan pengecekan rutin.
- *"Website saya aman tidak?"* Sudah pakai HTTPS (gembok). Untuk toko online, pembayaran ditangani payment gateway resmi, jadi data kartu tidak disimpan di website.

## 5. 🛠️ Latihan praktik (10 menit)
1. Buka website mana pun di HP, lalu klik ikon **gembok** di samping alamat. Lihat informasi "koneksi aman".
2. Buka **whois.com** (atau situs pengecek domain lain), lalu ketik `puranaindonesia.com`. Lihat kapan domain itu didaftarkan dan kapan habis masa berlakunya.
3. Coba cek ketersediaan domain untuk nama usaha khayalan Anda di Niagahoster atau Rumahweb, misalnya `trayawebstudio.com`. Perhatikan harga tahun pertama dan harga perpanjangannya, karena biasanya berbeda.

## 6. ✅ Kuis singkat (jawab di sini kalau mau dicek)
1. Apa beda **domain** dan **hosting**?
2. Kenapa website **wajib HTTPS**?
3. Klien warung kopi ingin website berisi menu, lokasi, dan tombol WhatsApp. Itu website **statis** atau **dinamis**? Masuk paket apa?
4. Bagaimana menjawab klien yang bertanya *"kenapa harus bayar domain tiap tahun?"*
