---
tipe: prd
klien: calon klien "Teteh" (brand fashion)
status: DRAF v0.1, belum dikonfirmasi klien
dibuat: 2026-11-01
tags: [jualan-website, klien, prd, ecommerce, fashion]
---

# PRD: Toko Online Fashion [Nama Brand]

Kaitan: [[00 Jualan Website (MOC)]] · [[Dokumen Project - 4 Dokumen Wajib Vibe Coder]] · [[Keamanan - Checklist Sebelum Launch]] · [[SEO - Checklist Supaya Website Muncul di Google]]

> Draf disusun dari brief WhatsApp (29 Okt 2026). Bagian bertanda **[?]** perlu dikonfirmasi ke klien.

## 0. Keputusan stack (pendekatan A: platform toko online)
Alasan: pembayaran, login, dan keamanan data ditangani platform yang sudah terbukti, sehingga risiko rendah dan pengerjaan cepat. Fokus kita: desain, setup, integrasi, dan konten.

| Kebutuhan | Pilihan utama | Cadangan / catatan |
|---|---|---|
| Platform toko | **Shopify** (paket Basic) | Platform lokal dengan sinkron marketplace bawaan (mis. Jubelio Store / SIRCLO) bila integrasi Shopify kurang cocok |
| Tema & desain | Tema Shopify (mulai dari tema gratis **Dawn**, atau tema premium dibeli atas nama klien) + kustomisasi gaya mengikuti referensi | Kustomisasi kode tema (Liquid/CSS) dengan **Claude Code + Shopify CLI** |
| Login / akun pelanggan | Akun pelanggan Shopify (email) | Bawaan |
| Wishlist | Aplikasi wishlist Shopify | Banyak yang punya paket gratis |
| Zoom produk | Fitur tema (zoom/lightbox galeri) | Bawaan di banyak tema |
| Pembayaran | **Midtrans** atau **Xendit** (QRIS, VA bank, e-wallet, kartu) | Cek integrasi Shopify terbaru; Shopify Payments belum tersedia di Indonesia |
| Ongkir & kurir | Aplikasi ongkir lokal untuk Shopify (JNE, J&T, SiCepat, dll.) | Cek aplikasi yang aktif & tarifnya |
| Sinkron stok Shopee & Tokopedia | Aplikasi **omnichannel** (mis. Jubelio / Ginee / Forstok) yang terhubung ke Shopify + marketplace | Tahap 2; biaya bulanan dibayar klien |
| AI customer service | Aplikasi chatbot AI untuk Shopify yang dilatih dengan FAQ toko | Tahap 2; bisa juga diteruskan ke WhatsApp admin |
| Mailing list | **Shopify Email** (atau Klaviyo) + pop-up/form langganan | Bawaan / paket gratis tersedia |
| Domain | Domain .com atau .co.id **atas nama klien**, diarahkan ke Shopify | HTTPS otomatis |
| Analitik & SEO | Analitik Shopify + Google Search Console + Google Analytics | |

*Semua nama aplikasi dan biaya perlu dicek ulang (fitur/harga sering berubah) sebelum proposal final.*

## 1. Ringkasan produk
- **Produk:** website toko online brand fashion, tempat pelanggan bisa melihat koleksi, membuat akun, menyimpan wishlist, belanja, dan membayar langsung di website.
- **Referensi desain & fitur:** https://www.mote--mote.com · https://puranaindonesia.com *(belum dianalisis; minta screenshot bagian yang disukai klien)*.

## 2. Masalah
Penjualan saat ini bergantung pada marketplace (Shopee/Tokopedia): potongan biaya tinggi, brand kurang menonjol, data pelanggan tidak dimiliki brand, dan sulit membangun pelanggan setia (promo/koleksi baru).

## 3. Tujuan
1. Brand punya **toko online sendiri** yang terlihat premium dan sesuai identitas brand.
2. Pelanggan bisa **belanja sampai bayar** tanpa keluar dari website.
3. **Stok selalu sinkron** antara website dan marketplace (tahap 2).
4. Brand bisa **mengumpulkan email pelanggan** untuk promo dan koleksi baru.
5. Pertanyaan umum pelanggan **terjawab otomatis 24 jam** (tahap 2).

**Bukan tujuan (non-goals) di proyek ini:** aplikasi mobile, sistem POS toko fisik, program afiliasi/reseller, multi-bahasa, iklan berbayar, foto produk.

## 4. Target pengguna
- **Pelanggan:** [?] wanita/pria, usia [?], pengguna HP, sudah terbiasa belanja online.
- **Admin toko (klien):** mengelola produk, stok, pesanan, promo, tanpa perlu kemampuan teknis.

**Persona singkat**
- *Rina, 26, karyawan:* belanja lewat HP saat istirahat; ingin lihat detail bahan (zoom), ukuran jelas, bayar QRIS cepat.
- *Admin [Nama Brand]:* ingin stok tidak dobel terjual di website dan marketplace, dan cepat membalas pertanyaan.

## 5. Ruang lingkup & tahapan
| Tahap | Fitur | Status |
|---|---|---|
| **Tahap 1 (MVP)** | Desain & tema, halaman inti, katalog + filter, halaman produk dengan **zoom**, varian ukuran/warna, **akun pelanggan (email)**, **wishlist**, **keranjang**, **checkout + pembayaran**, **ongkir otomatis**, **mailing list**, kode diskon, notifikasi email pesanan, SEO dasar, upload ≤ 30 produk, pelatihan admin | wajib |
| **Tahap 2** | **Sinkron stok** website + Shopee + Tokopedia (omnichannel), **AI customer service** | setelah tahap 1 stabil |
| **Nanti** | Ulasan produk, program poin/member, blog/lookbook, bundling | opsional |

## 6. Kebutuhan fungsional (tahap 1)
**6.1 Halaman**
- Beranda: banner/hero koleksi, koleksi unggulan, produk terbaru/best seller, form langganan email, footer (kontak, sosmed, kebijakan).
- Katalog/koleksi: grid produk, filter (kategori, ukuran, warna, harga) & urutkan.
- Halaman produk: galeri foto + **zoom**, nama, harga, varian, panduan ukuran (size chart), deskripsi & bahan, stok tersedia/habis, tombol **Tambah ke keranjang** & **Wishlist**, produk terkait.
- Keranjang & checkout, akun pelanggan (daftar/masuk, riwayat pesanan, alamat, wishlist).
- Halaman info: Tentang Kami, Kontak (+ tombol WhatsApp), FAQ, Kebijakan Pengiriman, Kebijakan Retur/Tukar Ukuran, Syarat & Ketentuan, Kebijakan Privasi.

**6.2 Akun & wishlist**
- Daftar/masuk dengan email (dan password atau kode). Pelanggan bisa checkout sebagai tamu [? klien mau wajib login atau boleh tamu].
- Wishlist tersimpan di akun.

**6.3 Pembayaran & pengiriman**
- Metode: QRIS, transfer VA (BCA, Mandiri, BNI, BRI, dll.), e-wallet, kartu [? sesuai payment gateway yang dipilih].
- Ongkir dihitung otomatis dari alamat & berat; kurir: [? JNE/J&T/SiCepat/AnterAja].
- Status pesanan & nomor resi dikirim lewat email.

**6.4 Mailing list**
- Form langganan di beranda/footer (+ pop-up opsional dengan insentif, mis. diskon pertama [?]).
- Template email: selamat datang, koleksi baru, sale.

**6.5 Admin**
- Tambah/ubah produk, stok, harga, diskon; kelola pesanan; ekspor data pelanggan/pesanan.

## 7. Kebutuhan fungsional (tahap 2)
- **Sinkron stok:** setiap penjualan di website/Shopee/Tokopedia mengurangi stok di semua kanal; produk dipetakan per SKU. Target jeda sinkron: [?] menit (tergantung aplikasi).
- **AI customer service:** menjawab pertanyaan umum (ukuran, bahan, ongkir, estimasi kirim, retur, status pesanan); berbahasa Indonesia; jika tidak yakin, diteruskan ke admin (WhatsApp/email). Dilatih dengan FAQ & kebijakan toko.

## 8. Kebutuhan non-fungsional
- **Mobile-first:** tampil rapi di HP (mayoritas pengunjung).
- **Kecepatan:** skor PageSpeed mobile ≥ 80 untuk beranda & produk (foto dioptimasi).
- **Keamanan:** HTTPS, pembayaran ditangani payment gateway (data kartu tidak disimpan di toko), akses admin dengan verifikasi 2 langkah, akun atas nama klien.
- **SEO:** judul & deskripsi unik per halaman/produk, URL rapi, alt text gambar, sitemap ke Google Search Console, Google Business Profile [? bila ada toko fisik].
- **Aksesibilitas dasar:** kontras teks cukup, tombol mudah ditekan di HP.

## 9. Bahan dari klien
Logo (format vektor/PNG), palet warna/brand guideline (bila ada), foto produk (resolusi tinggi, background konsisten), data produk (nama, harga, varian, stok, berat, deskripsi, bahan, size chart), teks Tentang Kami, kebijakan retur & pengiriman, akun & dokumen untuk payment gateway (KTP/NPWP/rekening atas nama usaha), akses Shopee & Tokopedia (tahap 2).

## 10. Ukuran keberhasilan
- Website live dan menerima pesanan pertama dalam [?] minggu setelah bahan lengkap.
- Tingkat konversi awal ≥ [?]% ; [?] email pelanggan terkumpul dalam 3 bulan.
- Tidak ada kasus stok dobel terjual setelah tahap 2.
- [?] % pertanyaan umum terjawab chatbot tanpa admin.

## 11. Timeline (perkiraan, setelah DP & bahan lengkap)
| Minggu | Kegiatan |
|---|---|
| 1 | Finalisasi PRD, moodboard dari referensi, setup toko, domain, payment, ongkir |
| 2 | Desain & kustomisasi tema, halaman inti |
| 3 | Upload produk, akun/wishlist, mailing list, SEO; uji pembayaran (mode tes) |
| 4 | Revisi (maks. 2 putaran), uji menyeluruh di HP, pelatihan admin, **launch** |
| +2–3 | Tahap 2: sinkron marketplace + AI customer service |

## 12. Kriteria serah terima (tahap 1)
- [ ] Semua halaman di bagian 6.1 tersedia & tampil baik di HP dan laptop
- [ ] Transaksi uji berhasil untuk tiap metode pembayaran; email konfirmasi terkirim
- [ ] Ongkir muncul benar untuk minimal 3 kota uji
- [ ] Daftar/masuk, wishlist, keranjang, kode diskon berfungsi
- [ ] Form mailing list menyimpan email & email selamat datang terkirim
- [ ] Skor PageSpeed mobile ≥ 80; HTTPS aktif; domain atas nama klien
- [ ] Admin sudah dilatih & menerima panduan singkat

## 13. Pertanyaan terbuka untuk klien
1. Nama brand, jumlah produk & varian, rata-rata pesanan per bulan?
2. Wajib login untuk beli, atau boleh checkout sebagai tamu juga?
3. Metode pembayaran & kurir yang diinginkan? Sudah punya akun payment gateway?
4. Stok sekarang dikelola di mana? Sudah pakai aplikasi omnichannel?
5. Kebijakan retur/tukar ukuran?
6. Bagian mana dari kedua website referensi yang paling disukai (tampilan, alur, fitur)?
7. Sudah punya domain, logo, dan foto produk siap pakai?
8. Budget & target tanggal launch?

## 14. Ringkasan penawaran (lihat diskusi harga)
| Paket | Isi | Harga jasa |
|---|---|---|
| Paket Inti | Tahap 1 | Rp 7,5 – 9 juta |
| Paket Lengkap | Tahap 1 + sinkron marketplace + AI CS | Rp 10 – 14 juta |
| Maintenance (opsional) | update, bantuan, cek rutin | Rp 750 rb – 1 juta / bulan |
Biaya platform, domain, aplikasi, dan payment gateway dibayar langsung oleh klien. DP 50%, revisi maks. 2 kali, garansi bug 30 hari.
