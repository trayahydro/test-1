---
tipe: rangkuman-pindahan
dibuat: 2026-11-03
tags: [pindahan, claude-code, traya, jualan-website, video-swro]
---

# Rangkuman Lengkap Semua Pekerjaan (untuk Claude Code pribadi)

Dokumen ini merangkum **semua yang sudah dikerjakan** di sesi Claude Code cloud, supaya Claude di
akun pribadi bisa langsung melanjutkan tanpa "dilatih" dari awal. Bacaan wajib pertama:
`CLAUDE.md` di root folder (aturan + peta folder), lalu dokumen ini.

---

## A. Profil & preferensi pengguna

- Bekerja di/untuk **PT Traya Hydro Indonesia** (sistem pengolahan air, terutama SWRO = Sea Water Reverse Osmosis).
- Sedang membangun usaha sampingan **jasa pembuatan website** (pemula, baru paham sedikit frontend).
- Sudah memakai **Obsidian** sebagai memori/catatan di PC lokal. Catatan dari sesi cloud ada di folder `catatan/`.
- Langganan **Claude Pro** (akun pribadi).
- Gaya komunikasi yang diinginkan: **bahasa Indonesia sederhana**, jujur, ada tabel ringkas, langkah bernomor,
  dan saran yang jelas ("rekomendasi saya: …"), bukan daftar pilihan panjang.
- Untuk pekerjaan panjang (render), **jangan lapor tiap sebentar**; kabari saat hampir selesai, selesai, atau ada masalah.
- Revisi video biasanya dikirim dalam format **menit.detik + koreksi** (contoh: "03.46 UF 0,02 µm").

---

## B. Proyek 1 — Video promosi SWRO Kontainer 40 ft (SELESAI)

| Item | Isi |
|---|---|
| Hasil | Video ±10:00, 1920×1080 30 fps, narasi Bahasa Indonesia + subtitle, musik latar |
| Lokasi hasil | `hasil/` (5 bagian < 95 MB) |
| Sumber | `video/` (halaman `adegan-00..17*.html`), naskah `naskah/naskah-swro-v2.md` |
| Suara | **Ardi** (`id-ID-ArdiNeural`, Microsoft neural lewat edge-tts) → `tts/vo_ardi/`, timing `tts/timing_ardi.json` |
| Revisi dari Pak Jimmy (sudah masuk) | pori UF **0,02 µm** · cartridge **1 µm** · tekanan HPP **35–42 bar** · TDS air minum **< 300 mg/L** · adegan 3 mengikuti diagram "Prinsip Osmosis dan Reverse Osmosis" |
| Alur | Intake → MMF → UF (opsional) → Dosing → Cartridge → HPP → Membran RO → ERD → Post-treatment → Produk |

Catatan lisensi suara: edge-tts memakai layanan "Read Aloud" Microsoft yang **tidak resmi** untuk komersial
(abu-abu). Versi resmi suara Ardi yang sama: **Azure Speech** (ada paket gratis bulanan). Alternatif:
rekam suara sendiri (paling aman) atau Gemini TTS (gratis, resmi, sangat natural).

---

## C. Proyek 2 — Video SWRO 3 m³/hari di Kapal Pesiar (SELESAI + REVISI 1)

| Item | Isi |
|---|---|
| Hasil | 6:37, 1920×1080, VO Ardi. Full ±250 MB + 4 bagian di `hasil-3m3/` |
| Sumber | `video-3m3/` — naskah `naskah-swro-3m3-kapal.md` (v2, disetujui), dokumen `01-Flow-Kerja-dan-Fungsi-Komponen.md` |
| Model 3D | `lib/skid.js` (skid SS304 2,2×0,8×1,6 m, versi tertutup dengan 5 pintu), `lib/kapal.js` (kapal pesiar 180 m + isi X-ray), `lib/panggung3m3.js` (laut, ruang mesin, studio) |
| Referensi | `video-3m3/referensi/` (foto render + file SketchUp `.skp`) |

**Keputusan pengguna (wajib diikuti):**
1. 4 housing cartridge (2 × 20 µm + 2 × 5 µm), walau P&ID menunjukkan satu.
2. 2 tangki FRP 1054 (sand filter + karbon aktif) dengan katup 3 arah manual (service/backwash/rinse).
3. 3 m³/hari adalah **produk** (recovery tipikal 12 %, ± 125 L/jam).
4. Versi **tertutup** dengan pintu yang bisa dibuka-tutup di video.
5. **Jangan sebut nama instansi pemesan**; brand PT Traya Hydro Indonesia.
6. Dipasang di **kapal pesiar** (kapal digambar detail).
7. Opsi **2–3 membran per skid** ditampilkan. Angka (2 membran ± 5–6, 3 membran ± 8–9 m³/hari) masih
   **estimasi** → minta konfirmasi tim teknik sebelum dipakai resmi.

**Data teknis tipikal:** membran SW30-4040 × 1 di housing FRP 4" (RO-101), tekanan kerja ± 42 bar
(rancang 60 bar, osmotik air laut ± 27 bar), pompa HP plunger SS316 20 L/menit, pompa umpan SS304 0,5 HP,
pipa 1", panel: lampu, layar controller, selektor, E-stop, 2 pressure gauge, 2 rotameter.

**16 adegan:** 0 Pembuka · 1 Kebutuhan air di kapal · 2 Solusi (X-ray kapal → ruang mesin, skid tertutup,
pintu terbuka) · 3 Prinsip RO · 4 Sea chest & pompa umpan · 5 Sand filter & karbon (potongan, backwash) ·
6 Cartridge · 7 Dosing · 8 Pompa HP (dial 42 bar) · 9 Membran spiral · 10 Produk & konsentrat · 11 Panel ·
12 Instalasi 4 titik + kaki karet · 13 Perawatan · 14 Opsi 2–3 membran · 15 Penutup + kontak.

**Revisi 1 (sudah):** kaca/fasad kapal berkedip (z-fighting) diperbaiki; ruang mesin kini terlihat jelas
saat tampilan X-ray dari laut (laut tembus pandang + lantai, garis ruangan, lampu, model skid asli).

**Ide lanjutan:** kalau pengguna mengekspor file SketchUp ke **COLLADA (.dae)** / OBJ / FBX, model asli
bisa dimuat langsung di three.js (ColladaLoader/OBJLoader/FBXLoader) menggantikan model buatan tangan.

---

## D. Cara kerja mesin video (penting untuk revisi)

1. **Naskah** (`*.md`, baris narasi berawalan `> ` di bawah `## Adegan N`) → `tts/buat_vo.py` membuat
   `adegan_XX.flac/wav` + `timing_vo.json` (cue subtitle per kalimat). KAMUS di skrip berisi ejaan ucapan
   (contoh: SW30-4040 → "es-we tiga puluh, empat puluh empat puluh").
2. **Halaman adegan** (`adegan-XX.html`) = three.js + overlay HTML (chip judul, kartu spesifikasi, penanda,
   subtitle). Fungsi `siapkanAdegan(no, {dari, ke, extra})` membaca timing; `window.TIMING_DIR`
   menunjuk folder timing; animasi ditulis dalam "waktu desain" dan dipetakan ke VO (time-warp).
   Satu adegan bisa dipecah jadi beberapa halaman (`02a`, `02b`) dengan `dari`/`ke`.
3. **Render**: `video/render.js` membuka halaman di Chromium (Playwright), merender frame demi frame,
   menyimpan per potongan 150 frame (`out/chunk/…`) sehingga **bisa dilanjutkan** bila terhenti.
   `render-semua.sh` menjalankan antrean beberapa proses.
4. **Rakit**: `video/rakit.py` menyambung adegan (crossfade 0,5 dtk), menaruh VO (+0,6 dtk), membuat musik
   (`audio/buat_musik.py`) dengan ducking otomatis, lalu memecah file > 95 MB.
5. **Pratinjau** cepat: `video/still.js <halaman> <prefix> t1 t2 …` → PNG.

Pelajaran teknis yang sudah ditemukan:
- Saat mengganti `material.transparent` setelah dirender, set `material.needsUpdate = true` (kalau tidak,
  hasil render final berbeda dari pratinjau).
- Objek berdekatan (< beberapa cm) di adegan jarak jauh → naikkan `camera.near` / beri `polygonOffset`.
- Di server cloud (tanpa GPU) render ± 3–6 detik/frame; di PC dengan kartu grafis jauh lebih cepat.

---

## E. Proyek 3 — Jualan Website (BERJALAN)

Semua materi dari TikTok & Instagram yang dikirim pengguna sudah dicatat di **`catatan/`** (format Obsidian,
pakai `[[wikilink]]` dan properties). Halaman induk: `catatan/Jualan Website/00 Jualan Website (MOC).md`
dan `catatan/Simpanan Tools AI/00 Simpanan Tools AI (MOC).md`.

Ringkasan isi catatan (20 catatan + 1 PRD):
- **Mindset & panduan**: vibe coder vs AI engineer, jalur jadi AI engineer, stack pilihan.
- **Prompt & dokumen**: 8 prompt wajib sebelum vibecoding, 4 dokumen wajib (PRD, dll.), handoff anti context-rot.
- **Desain**: sumber inspirasi, skill perbaikan UI buatan AI (21st.dev, dll.).
- **Keamanan & SEO**: checklist sebelum launch, checklist SEO + GEO.
- **Biaya & model**: pembagian Opus/Sonnet/Haiku, stack $20/bulan.
- **Automasi & bisnis**: tim sosmed AI, alur bisnis jasa (plumber, kontraktor renovasi 10 agent),
  WhatsApp agent (Kapso), outreach otomatis.
- **Setup Claude Code**: 5 plugin untuk 5 titik buta, 5 connector wajib, 30 plugin terbaik per peran.

**Stack yang direkomendasikan** (dipakai semua klien):
Next.js + Tailwind CSS + shadcn/ui, animasi GSAP/Motion, kode di GitHub, hosting **Cloudflare Pages**
(gratis & boleh komersial; Vercel Hobby hanya non-komersial), domain di registrar lokal, AI = Claude Code.
Tambahan: Standard → Resend (email form) + Supabase/Sanity; Pro → Supabase + Midtrans/Xendit + Sentry.

**Harga & paket** → lihat `03-HARGA-PAKET-DAN-KLIEN.md` (Basic Rp 1,5–2,5 jt, Standard Rp 3–5 jt,
Pro Rp 7,5–14 jt, maintenance Rp 150 rb–1,5 jt/bulan; perbandingan pasar sudah dicek).

**Klien pertama — "Teteh" (toko online fashion)** → PRD v0.2 di
`catatan/Jualan Website/Klien/PRD - Toko Online Fashion (Teteh).md`. Rekomendasi: **Shopify + kustomisasi tema
dengan Claude Code** (bukan custom dari nol). Penawaran: Paket Inti Rp 8,5 jt / Paket Lengkap Rp 12,5 jt
(+ sinkron Shopee/Tokopedia via aplikasi omnichannel + AI CS), maintenance Rp 1 jt/bulan.
Referensi desain: mote--mote.com (WooCommerce + Xendit) dan puranaindonesia.com (Shopify, tema Debut).
**Langkah berikutnya yang belum dikerjakan:** draf proposal resmi (PDF/dokumen) dan daftar pertanyaan WA untuk klien.

**Claude Code vs Lovable/Emergent:** untuk toko Shopify pakai Claude Code; Lovable cocok untuk mockup cepat
pemenang klien & paket Basic/Standard. (Higgsfield = tool video/gambar, bukan pembuat website.)

---

## F. Proyek 4 — Belajar Web Developer (BERJALAN)

Kurikulum 11 pelajaran + isi **Pelajaran 1 (Cara Kerja Website)** ada di `02-PELAJARAN-WEB-DEV.md`.
Saat pengguna bilang **"lanjut pelajaran 2"**, buat **Pelajaran 2: Frontend** dengan format yang sama:
penjelasan sederhana · istilah penting (tabel + perumpamaan) · cara menjelaskan ke klien · latihan praktik · kuis.
Simpan tiap pelajaran ke Obsidian (`catatan/Belajar Web Dev/`).

---

## G. Lain-lain yang pernah dibahas
- Keuangan pribadi (anggaran ± Rp 5 jt/bulan): sudah dibahas jujur; detail tidak perlu diulang kecuali pengguna membuka topiknya lagi.
- Pengguna bertanya cara Claude lokal membaca semua ini → jawabannya: paket ini + `CLAUDE.md`.
