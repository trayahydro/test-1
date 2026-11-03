---
tipe: konteks-claude
dibuat: 2026-11-03
tags: [claude-code, konteks, pindahan]
---

# KONTEKS LENGKAP UNTUK CLAUDE (satu file)

> **Untuk pengguna:** taruh file ini di folder kerja Claude Code (atau seret ke chat), lalu ketik:
> *"Baca file KONTEKS-LENGKAP-UNTUK-CLAUDE.md dan jalankan bagian 0."*

---

## 0. INSTRUKSI UNTUK CLAUDE CODE — jalankan berurutan

Kamu melanjutkan pekerjaan dari sesi Claude Code sebelumnya milik pengguna ini. Semua pengetahuan ada
di file ini. Ikuti langkah berikut, **tanyakan konfirmasi sebelum memasang atau mengubah apa pun**, dan
jelaskan dengan bahasa Indonesia yang sederhana (pengguna awam soal coding).

**Langkah 1 — Pahami & simpan memori**
1. Baca seluruh file ini sampai habis.
2. Buat/lengkapi `CLAUDE.md` di folder kerja saat ini berisi ringkasan bagian 1 (aturan & gaya bicara),
   status proyek (bagian 2–5 dan 7), dan perintah penting. Jangan menimpa isi CLAUDE.md yang sudah ada — tambahkan saja.
3. Kalau tersedia fitur memori (auto memory / `/memory`), simpan juga poin terpenting di sana.

**Langkah 2 — Obsidian**
1. Tanyakan path vault Obsidian pengguna (contoh: `C:\Users\HP\Documents\Obsidian\Vault`).
2. Buat folder `Claude - Konteks` di vault, simpan salinan file ini di sana.
3. Kalau folder proyek dari GitHub/zip sudah ada (lihat Langkah 4), salin `catatan/Jualan Website`,
   `catatan/Simpanan Tools AI`, dan `catatan/Belajar Web Dev` ke vault (jangan menimpa catatan dengan nama sama — tanya dulu).

**Langkah 3 — Cek yang sudah terpasang (JANGAN pasang ulang)**
Pengguna sudah memasang banyak MCP sendiri: **Windows MCP, AutoCAD MCP, SketchUp MCP, SOLIDWORKS MCP,
FL Studio MCP, EPANET MCP**, dan lainnya. Jalankan `claude mcp list` dan `/plugin` lalu buat tabel:
"sudah terpasang" vs "belum". Jangan mengubah atau menghapus MCP yang sudah ada.

**Langkah 4 — Folder proyek (kode video, catatan, skrip) — lihat bagian 9**
- Kalau pengguna punya file `Pindahan-Claude-Traya.zip`, minta ia mengekstraknya, lalu kerja di folder itu.
- Kalau tidak, tawarkan clone dari GitHub: repo `trayahydro/test-1`, branch `claude/happy-bardeen-srjq1u`
  (butuh login GitHub pengguna).

**Langkah 5 — Pasang yang dibutuhkan (tanya dulu satu per satu, mulai dari yang paling berguna)**
| Prioritas | Item | Perintah / cara | Untuk |
|---|---|---|---|
| 1 | Program dasar | cek `python --version`, `node -v`, `git --version`, `ffmpeg -version`; yang belum ada → `winget install Python.Python.3.12` / `OpenJS.NodeJS.LTS` / `Git.Git` / `Gyan.FFmpeg` | semua |
| 2 | Setup proyek video | di folder proyek: `powershell -ExecutionPolicy Bypass -File pindahan-claude-pribadi\setup\setup-windows.ps1` (Python venv: edge-tts, numpy, scipy; Node: three, font, playwright + Chromium) | video SWRO |
| 3 | Plugin Anthropic | `/plugin marketplace add anthropics/knowledge-work-plugins` lalu `/plugin install design@knowledge-work-plugins`, `engineering@…`, `operations@…`, `data@…` | desain, kode, dokumen kerja |
| 4 | Plugin resmi | `/plugin install frontend-design@claude-plugins-official`, `security-guidance@claude-plugins-official` | jualan website |
| 5 | MCP browser | `claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest` | cek & debug website |
| 6 | Connector akun | arahkan pengguna ke claude.ai → Settings → Connectors (GitHub, Gmail, Google Drive, Figma, Canva) | login dilakukan pengguna sendiri |
| 7 | Skill tambahan (opsional) | lihat bagian 6 (paket awal) dan bagian 8 (semua repo) — pasang **hanya** yang diminta pengguna | sesuai kebutuhan |

Catatan: kalau nama plugin di atas tidak ditemukan, cari di katalog `/plugin` dengan kata kuncinya.
Ingatkan pengguna: terlalu banyak MCP/skill aktif menghabiskan limit Claude Pro — nonaktifkan yang jarang dipakai lewat `/mcp`.

**Langkah 6 — Ringkas riwayat HP Remote**
Pengguna sudah mengekspor chat HP Remote ke `C:\Users\HP\Desktop\Chat-folder-C.md` (7 sesi) dan
`Chat-folder-UsersHP.md` (1 sesi). Baca **bertahap** (per bagian, jangan sekaligus), lalu tulis
`Ringkasan HP Remote.md` di vault Obsidian dengan format: per proyek → tujuan, file penting (path),
keputusan teknis, status terakhir, langkah berikutnya. Gabungkan dengan bagian 7 file ini.
Supaya chat tidak terhapus otomatis lagi, tawarkan menambah `"cleanupPeriodDays": 365` di
`C:\Users\HP\.claude\settings.json`.

**Langkah 7 — Laporan**
Laporkan singkat: apa yang kamu pahami tentang pengguna & proyeknya, apa yang sudah/belum terpasang,
lalu tawarkan 3 langkah berikutnya (contoh: lanjut Pelajaran 2 Frontend, proposal klien Teteh, revisi video SWRO).

---


---

## 1. Memori proyek (CLAUDE.md)

### CLAUDE.md — Memori Proyek (baca ini dulu setiap sesi)

Proyek milik pengguna (PT Traya Hydro Indonesia + usaha jasa website). Folder ini adalah hasil
pindahan dari sesi Claude Code cloud. Rangkuman lengkap ada di `pindahan-claude-pribadi/`.

#### Siapa pengguna & cara bicara
- Pengguna berbahasa **Indonesia**, menyebut dirinya awam di bidang coding → jelaskan dengan bahasa
  sederhana, pakai perumpamaan, tabel ringkas, dan langkah bernomor.
- Jujur soal batasan, tandai angka perkiraan sebagai **"tipikal"/"estimasi"**.
- Jangan minta pengguna menempel token/API key di chat. Simpan di file `.env` (tidak di-commit) atau
  pengaturan environment.

#### Aturan tetap
1. **Jangan menyebut nama klien/proyek tertentu** di video, dokumen untuk publik, atau commit
   (khusus: jangan sebut nama instansi pemesan video 3 m³). Brand di video: **PT Traya Hydro Indonesia**.
2. Kontak di video: The Smith Alam Sutera SOHO-D/10/1009, Tangerang · +62 823 110 110 29 · www.trayahydro.com
3. Laporan progres: hanya kabari saat **hampir selesai, selesai, atau ada masalah** (tidak tiap 15 menit).
4. Render panjang boleh dilanjutkan otomatis (render memakai potongan, bisa disambung).
5. Jangan membuat Pull Request kecuali diminta.

#### Peta folder
| Folder | Isi |
|---|---|
| `catatan/` | **Vault Obsidian**: `Jualan Website/` (20 catatan + PRD klien) dan `Simpanan Tools AI/` (38 tools + 30 plugin) |
| `pindahan-claude-pribadi/` | Rangkuman lengkap, daftar MCP/skill, pelajaran, harga, skrip setup, prompt pembuka |
| `video/` | Mesin video 3D: `lib/` (dunia, overlay, aliran, dial, model kontainer), `render.js`, `still.js`, `rakit.py`, halaman `adegan-*.html` video **kontainer SWRO** |
| `video-3m3/` | Video **SWRO 3 m³/hari di kapal pesiar**: `lib/` (skid, kapal, panggung3m3, bantu), `adegan-00..15.html`, `tts/` (VO Ardi), `render-semua.sh`, `referensi/` (foto + .skp) |
| `tts/buat_vo.py` | Generator voice-over (mesin `edge` = suara Ardi, `piper`, `google`) |
| `audio/buat_musik.py` | Generator musik latar (numpy/scipy) |
| `naskah/` | Naskah video kontainer (v1, v2) |
| `contoh-gaya/` | 4 contoh gaya visual (isometrik, 3D sinematik, blueprint, infografis) |
| `logo/`, `traya-logo.png` | Logo Traya (putih & warna) |

#### Status pekerjaan terakhir
- Video kontainer SWRO (10:00, VO Ardi) — **selesai**, revisi Pak Jimmy sudah masuk.
- Video SWRO 3 m³ kapal pesiar (6:37, VO Ardi) — **selesai + revisi** (kaca kapal tidak berkedip,
  ruang mesin terlihat di tampilan X-ray). Angka opsi 2–3 membran masih **estimasi**, tunggu konfirmasi.
- Jualan website — catatan lengkap; paket & harga sudah disusun; PRD klien fashion v0.2; proposal belum dibuat.
- Pelajaran web developer — Pelajaran 1 selesai; berikutnya **Pelajaran 2: Frontend**.

#### Perintah penting
```
# pratinjau satu frame
node video/still.js video-3m3/adegan-02b.html <prefix_output> 3 7
# render semua adegan video 3 m³ (bisa dilanjutkan bila terhenti)
bash video-3m3/render-semua.sh 3
# rakit jadi satu video + VO + musik + pecah < 95 MB
RAKIT_ROOT=$PWD/video-3m3 RAKIT_N=16 RAKIT_VO=$PWD/video-3m3/tts/vo RAKIT_NAMA=SWRO-3m3-Kapal python video/rakit.py
# buat ulang voice-over dari naskah (suara Ardi)
python tts/buat_vo.py video-3m3/naskah-swro-3m3-kapal.md video-3m3/tts/vo --mesin edge
```
Di Windows/Mac render memakai kartu grafis (GPU) otomatis → jauh lebih cepat dari server cloud.

---

## 2. Rangkuman lengkap semua pekerjaan

### Rangkuman Lengkap Semua Pekerjaan (untuk Claude Code pribadi)

Dokumen ini merangkum **semua yang sudah dikerjakan** di sesi Claude Code cloud, supaya Claude di
akun pribadi bisa langsung melanjutkan tanpa "dilatih" dari awal. Bacaan wajib pertama:
`CLAUDE.md` di root folder (aturan + peta folder), lalu dokumen ini.

---

#### A. Profil & preferensi pengguna

- Bekerja di/untuk **PT Traya Hydro Indonesia** (sistem pengolahan air, terutama SWRO = Sea Water Reverse Osmosis).
- Sedang membangun usaha sampingan **jasa pembuatan website** (pemula, baru paham sedikit frontend).
- Sudah memakai **Obsidian** sebagai memori/catatan di PC lokal. Catatan dari sesi cloud ada di folder `catatan/`.
- Langganan **Claude Pro** (akun pribadi).
- Gaya komunikasi yang diinginkan: **bahasa Indonesia sederhana**, jujur, ada tabel ringkas, langkah bernomor,
  dan saran yang jelas ("rekomendasi saya: …"), bukan daftar pilihan panjang.
- Untuk pekerjaan panjang (render), **jangan lapor tiap sebentar**; kabari saat hampir selesai, selesai, atau ada masalah.
- Revisi video biasanya dikirim dalam format **menit.detik + koreksi** (contoh: "03.46 UF 0,02 µm").

---

#### B. Proyek 1 — Video promosi SWRO Kontainer 40 ft (SELESAI)

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

#### C. Proyek 2 — Video SWRO 3 m³/hari di Kapal Pesiar (SELESAI + REVISI 1)

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

#### D. Cara kerja mesin video (penting untuk revisi)

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

#### E. Proyek 3 — Jualan Website (BERJALAN)

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

#### F. Proyek 4 — Belajar Web Developer (BERJALAN)

Kurikulum 11 pelajaran + isi **Pelajaran 1 (Cara Kerja Website)** ada di `02-PELAJARAN-WEB-DEV.md`.
Saat pengguna bilang **"lanjut pelajaran 2"**, buat **Pelajaran 2: Frontend** dengan format yang sama:
penjelasan sederhana · istilah penting (tabel + perumpamaan) · cara menjelaskan ke klien · latihan praktik · kuis.
Simpan tiap pelajaran ke Obsidian (`catatan/Belajar Web Dev/`).

---

#### G. Lain-lain yang pernah dibahas
- Keuangan pribadi (anggaran ± Rp 5 jt/bulan): sudah dibahas jujur; detail tidak perlu diulang kecuali pengguna membuka topiknya lagi.
- Pengguna bertanya cara Claude lokal membaca semua ini → jawabannya: paket ini + `CLAUDE.md`.

---

## 3. Harga, paket, dan klien

### Harga, Paket, dan Penawaran Klien

Semua angka adalah **perkiraan pasar freelancer pemula di Indonesia** (dicek 1 Nov 2026). Cek ulang harga platform/aplikasi sebelum dipakai di proposal.

### 1. Susunan paket

#### Paket utama

| | **Basic** | **Standard** | **Pro** (toko online) |
|---|---|---|---|
| **Cocok untuk** | Usaha kecil yang baru mulai online: warung, salon, bengkel, jasa | Usaha yang ingin terlihat profesional: klinik, kontraktor, sekolah, kantor | Brand yang jualan langsung di website (seperti klien fashion) |
| **Jumlah halaman** | 1 halaman (landing page) | 4–6 halaman (Beranda, Tentang, Layanan/Produk, Galeri, Kontak, FAQ) | Toko lengkap: katalog, produk, akun, keranjang, checkout, kebijakan |
| **Desain** | Template rapi + warna brand | Desain custom mengikuti referensi | Desain premium mengikuti referensi |
| **Mobile friendly + HTTPS** | ✅ | ✅ | ✅ |
| **Tombol WhatsApp + Google Maps** | ✅ | ✅ | ✅ |
| **Form kontak** | – | ✅ | ✅ |
| **Galeri / portofolio / testimoni** | Sederhana | ✅ | ✅ |
| **SEO dasar** (judul, deskripsi, Search Console) | ✅ | ✅ | ✅ |
| **Google Business Profile** | – | ✅ | Opsional |
| **Animasi halus** | – | ✅ | ✅ |
| **Login, wishlist, keranjang, pembayaran, ongkir** | – | – | ✅ |
| **Mailing list** | – | Opsional | ✅ |
| **Revisi** | 1 kali | 2 kali | 2 kali |
| **Waktu pengerjaan** | 3–5 hari | 1–2 minggu | 3–4 minggu |
| **Domain + hosting tahun pertama** | ✅ Termasuk | ✅ Termasuk | Dibayar klien langsung (langganan platform) |
| **Kisaran harga** | **Rp 1,5 – 2,5 juta** | **Rp 3 – 5 juta** | **Rp 7,5 – 9 juta** (inti) / **Rp 10 – 14 juta** (lengkap) |

#### Add-on (bisa ditambahkan ke paket mana pun)

| Add-on | Kisaran harga |
|---|---|
| Halaman tambahan | Rp 300 – 500 rb / halaman |
| Upload produk tambahan (toko online) | Rp 5 – 10 rb / produk |
| Copywriting (teks website ditulis) | Rp 300 rb – 1 juta |
| Setup Google Business Profile (untuk Basic) | Rp 250 – 500 rb |
| Agent WhatsApp otomatis (booking / jawab pertanyaan) | Rp 1,5 – 3 juta + biaya layanan WA |
| Sinkron stok Shopee & Tokopedia | Rp 1,5 – 3 juta + biaya aplikasi bulanan |
| AI customer service | Rp 1 – 2,5 juta |

#### Paket maintenance bulanan (pemasukan rutin)

| Paket | Isi | Harga |
|---|---|---|
| **Maintenance Basic** | Perpanjangan domain dan hosting, cek website aktif, perbaikan kecil | Rp 150 – 300 rb / bulan |
| **Maintenance Plus** | + update konten/promo 2–4 kali sebulan, backup, cek keamanan | Rp 500 rb – 1 juta / bulan |
| **Maintenance Toko** | + update banner, bantuan admin, laporan penjualan singkat | Rp 750 rb – 1,5 juta / bulan |

#### Ketentuan semua paket
- DP 50%, pelunasan sebelum website diluncurkan.
- Bahan (logo, foto, teks) disiapkan klien. Kalau terlambat, timeline ikut mundur.
- Domain atas nama klien.
- Garansi perbaikan bug 30 hari.
- Tahun kedua: perpanjangan domain/hosting ditagih ulang, atau masuk paket maintenance.

### 2. Perbandingan harga pasar

#### Harga pasar yang terlihat

| Sumber | Jenis | Harga | Catatan |
|---|---|---|---|
| **Fastwork.id** (264 halaman listing) | Marketplace freelancer | **"Mulai" Rp 500 rb – Rp 5 juta**. Paling banyak di **Rp 500 rb – 1,5 juta** | "Mulai" artinya harga paket termurah. Isinya company profile, toko online, aplikasi custom |
| **Jagoan Hosting** | Perusahaan hosting | **Rp 500 rb/tahun** (buat sendiri dengan AI) dan **mulai Rp 1,5 juta** (dibuatkan developer) | WordPress + Elementor Pro, domain gratis tahun pertama |
| **Rumahweb** | Perusahaan hosting | **Mulai Rp 49 rb/bulan** (paket 5/10/15 halaman, ditagih per tahun) | Template. Edit halaman Rp 20 rb, halaman baru Rp 50 rb |
| **Niagahoster (Hostinger)** | Website builder buat sendiri | **Rp 23.900 – 35.900/bulan** (harga promo, bayar 4 tahun di muka) | Mereka sendiri menulis bahwa website UMKM sederhana **biasanya Rp 500 rb – 1 juta** |
| Dewaweb, Projects.co.id | – | Tidak bisa dibuka | – |

#### Posisi paket Anda

| Paket Anda | Dibanding pasar |
|---|---|
| **Basic** Rp 1,5 – 2,5 juta | **Lebih mahal** dari harga "mulai" pasar (Rp 500 rb – 1,5 juta) |
| **Standard** Rp 3 – 5 juta | Di atas rata-rata freelancer, masih di bawah agensi |
| **Pro (toko online)** Rp 7,5 – 14 juta | Wajar, karena jauh lebih rumit dari paket "mulai Rp 500 rb" |

#### Jujurnya, apa artinya
1. **Pasar bawah sangat murah dan ramai.** Banyak yang menjual template atau website buat sendiri seharga Rp 500 rb – 1 juta. Jangan bersaing di harga, karena Anda akan kalah dan capek.
2. **Menangkan di value**, dan tonjolkan ini di penawaran:
   - Desain **custom**, tidak terlihat seperti template.
   - **Siap muncul di Google dan Google Maps** (SEO + Google Business Profile).
   - **Dicek keamanan dan kecepatannya.**
   - **Garansi 30 hari** dan pendampingan, bukan "jadi lalu ditinggal".
3. **Untuk 2–3 klien pertama**, pertimbangkan **harga perkenalan**: Basic sekitar **Rp 1 – 1,5 juta**, dengan syarat website boleh dijadikan portofolio dan klien memberi testimoni. Setelah punya portofolio, naikkan ke harga normal.
4. **Harga toko online untuk klien fashion tetap aman**, karena itu jenis pekerjaan yang berbeda kelas.

### 3. Margin (contoh Paket Inti Rp 7,5 juta)

#### Contoh hitungan Paket Inti (Rp 7,5 juta)

| Pos | Perkiraan |
|---|---|
| **Pendapatan** | **Rp 7.500.000** |
| Langganan Claude Pro (± 1 bulan pengerjaan) | − Rp 350.000 |
| Cadangan tak terduga (± 10%), misalnya aplikasi uji coba atau revisi ekstra | − Rp 750.000 |
| Pulsa, internet, dan lain-lain | − Rp 150.000 |
| **Sisa bersih untuk Anda** | **± Rp 6.250.000 (sekitar 83%)** |

Kalau Paket Lengkap (sekitar Rp 12 juta), sisa bersihnya sekitar **Rp 10 juta**.

#### Yang perlu diperhatikan supaya margin tidak hilang
1. **Tema premium:** kalau perlu tema berbayar (bisa ratusan dolar), **minta klien yang membeli** atas nama tokonya. Jangan Anda yang menalangi.
2. **Waktu Anda adalah biaya.** Project ini kira-kira 60–80 jam kerja, apalagi karena project pertama. Rp 6,25 juta dibagi 70 jam sekitar **Rp 90 ribu per jam**. Itu wajar untuk pemula. Tapi kalau revisi tidak dibatasi, jamnya membengkak dan nilai per jam Anda turun. Karena itu **batas 2 kali revisi** penting.
3. **Upload produk** itu memakan waktu. Makanya di atas 30 produk dikenakan biaya per produk.
4. **Pajak:** kalau usaha Anda nanti sudah terdaftar, ada pajak UMKM yang kecil dari omzet. Untuk sekarang cukup sisihkan sedikit, dan tanyakan detailnya ke kantor pajak atau konsultan saat penghasilan sudah rutin.
5. **Maintenance bulanan** adalah margin terbaik: kerjanya sedikit dan pemasukannya rutin. Misalnya Rp 750 ribu per bulan, maka setahun Rp 9 juta dari satu klien.

#### Saran harga untuk project ini
- **Jangan di bawah Rp 7 juta** untuk Paket Inti. Kalau lebih murah, Anda berisiko rugi waktu.
- Kalau klien menawar, **kurangi isi pekerjaan, bukan harganya**. Misalnya hilangkan wishlist atau kurangi jumlah upload produk, supaya nilai per jam Anda tetap aman.

### 4. Penawaran untuk klien fashion (Teteh)

#### Penawaran yang saya sarankan

| Opsi | Isi | Harga |
|---|---|---|
| **Opsi 1: Paket Inti** | Toko online Shopify lengkap: desain mengikuti referensi, halaman utama, katalog, halaman produk dengan zoom, size chart, akun pelanggan (login email), wishlist, keranjang, pembayaran (Xendit/Midtrans), ongkir otomatis, mailing list, kode diskon, SEO dasar, upload 30 produk, pelatihan admin | **Rp 8.500.000** |
| **Opsi 2: Paket Lengkap** *(disarankan ke klien)* | Opsi 1 + **sinkron stok Shopee & Tokopedia** + **AI customer service** | **Rp 12.500.000** |
| **Maintenance** (opsional) | Update banner/promo, bantuan teknis, cek rutin, laporan singkat bulanan | **Rp 1.000.000 / bulan** |
| Upload produk tambahan | Di atas 30 produk | Rp 7.500 / produk |

Opsi 2 sudah dibuat **sedikit lebih hemat** dibanding membeli terpisah (Rp 8,5 juta + sinkron Rp 2,5 juta + AI CS Rp 2 juta = Rp 13 juta), supaya klien tertarik mengambil paket lengkap.

#### Alasan angka ini
- **Kompleksitasnya tinggi:** login, wishlist, pembayaran, ongkir, sinkron marketplace. Ini jauh di atas website biasa yang di pasar dijual mulai Rp 500 rb.
- **Brand referensinya premium.** Mote Mote menjual produk Rp 679 rb – 1,7 juta per potong, dan Purana Rp 1,2 – 4,9 juta. Klien dengan target seperti itu wajar berinvestasi Rp 8–13 juta untuk tokonya.
- Masih **jauh di bawah harga agensi** untuk toko online, tapi tetap memberi Anda margin yang sehat (sekitar Rp 7 juta bersih untuk Opsi 1, dan sekitar Rp 10,5 juta untuk Opsi 2).

#### Biaya operasional (dibayar klien langsung, atas nama klien)
Ini **di luar** harga jasa Anda. Sebutkan sejak awal supaya klien tidak kaget:
- **Langganan Shopify** per bulan (cek harga paket terbaru di shopify.com).
- **Domain** per tahun.
- **Potongan payment gateway** per transaksi.
- **Aplikasi omnichannel** per bulan (untuk Opsi 2).
- Aplikasi tambahan (wishlist, chatbot, email). Banyak yang gratis, sebagian berbayar.

#### Ketentuan
- **DP 50%** (Opsi 1 Rp 4.250.000, Opsi 2 Rp 6.250.000), **pelunasan** sebelum website diluncurkan.
- Revisi desain **maksimal 2 kali**.
- Waktu pengerjaan: Opsi 1 sekitar **3–4 minggu**, Opsi 2 ditambah sekitar **2–3 minggu**, dihitung setelah bahan dari klien lengkap.
- Garansi perbaikan bug **30 hari**.

#### Kalau klien menawar
- **Batas bawah Opsi 1: Rp 7.500.000.** Jangan lebih rendah dari ini.
- Lebih baik **kurangi isi pekerjaan**, misalnya upload 30 menjadi 15 produk atau wishlist dipindah ke tahap 2, daripada menurunkan harga.
- Atau tawarkan **maintenance gratis 1 bulan pertama** sebagai bonus. Biayanya kecil bagi Anda, tapi terasa bernilai bagi klien.

### 5. Stack teknis

#### Stack utama (dipakai untuk semua klien)

| Bagian | Pilihan | Alasan |
|---|---|---|
| **Framework** | **Next.js** | Paling banyak dipakai, paling dikuasai Claude, dan cocok untuk website kecil sampai aplikasi. |
| **Styling** | **Tailwind CSS** + **shadcn/ui** | Desain cepat dan rapi. Semua skill desain yang Anda simpan mendukung keduanya. |
| **Animasi** | **GSAP** atau **Motion** | Supaya terlihat premium. Sudah ada GSAP Skill di catatan Anda. |
| **Kode** | **GitHub** | Gratis dan jadi arsip semua project klien. |
| **Hosting** | **Cloudflare Pages** | Gratis dan **boleh untuk komersial**. |
| **Domain** | Registrar lokal (Niagahoster, Rumahweb, IDCloudHost) | Bisa .com, .id, maupun .co.id. |
| **AI** | **Claude Code** + skill desain | Sekitar $20/bulan. Ini satu-satunya biaya tetap. |

**Soal Vercel:** paket gratisnya (Hobby) setahu saya **hanya untuk pemakaian pribadi atau non-komersial**, jadi untuk website klien kurang aman. Pilihannya Cloudflare Pages yang gratis, atau Vercel Pro sekitar $20/bulan. Syarat terbarunya sebaiknya dicek dulu.

#### Tambahan sesuai paket

| Paket | Kebutuhan | Tambahan |
|---|---|---|
| **Basic**: landing page / company profile | Info bisnis, tombol WA, peta | Tidak ada. Pakai stack utama saja. |
| **Standard**: ada form & konten bisa diubah | Form kontak, blog/katalog | **Resend** untuk email form. **Supabase** atau CMS (misalnya Sanity) supaya klien bisa edit sendiri. |
| **Pro**: toko online / sistem | Login, database, pembayaran | **Supabase** (database + login), **Midtrans/Xendit** (QRIS, VA, e-wallet), **Sentry** (lacak error). |

#### Mulai dari mana
Pakai **stack utama saja** dulu dan buat 1–2 website portofolio paket Basic. Kalau nanti ada klien yang butuh form atau pembayaran, baru tambah Supabase dan Midtrans/Xendit.

Kalimat yang bisa langsung dipakai di prompt bagian **Batasan**:
```
Stack: Next.js + Tailwind CSS + shadcn/ui, animasi GSAP, deploy ke Cloudflare Pages.
```

---

## 4. Pelajaran web developer

### Belajar Web Developer untuk Penjual Website

Format tiap pelajaran: penjelasan sederhana · istilah penting · cara menjelaskan ke klien · latihan praktik · kuis.
Status: **Pelajaran 1 selesai**. Berikutnya: **Pelajaran 2 — Frontend** (tunggu pengguna bilang "lanjut pelajaran 2").

#### Kurikulum "Web Developer untuk Penjual Website"

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

### 📘 Pelajaran 1: Cara Kerja Website

#### 1. Apa yang terjadi saat orang membuka website?
Misalnya pelanggan mengetik **bengkelmaju.com** di HP:

1. **Browser** (Chrome/Safari) bertanya ke **DNS**: "bengkelmaju.com itu alamatnya di mana?"
2. DNS menjawab dengan alamat server, berupa angka seperti `104.21.x.x` (disebut **alamat IP**).
3. Browser menghubungi **server** (komputer yang menyala 24 jam) tempat website disimpan, yaitu **hosting**.
4. Server mengirim file website: teks, gambar, desain, kode.
5. Browser **menyusun dan menampilkannya** di layar.

Semua ini terjadi dalam **1–3 detik**. Kalau lebih lama, pengunjung mulai pergi.

#### 2. Istilah penting (perumpamaan rumah)

| Istilah | Perumpamaan | Penjelasan | Biaya umum |
|---|---|---|---|
| **Domain** | Alamat rumah | Nama website: `bengkelmaju.com`, `.co.id`, `.id` | Bayar **per tahun** |
| **DNS** | Buku alamat / petunjuk jalan | Menghubungkan nama domain ke server | Biasanya gratis (mis. Cloudflare) |
| **Hosting / server** | Tanah tempat rumah berdiri | Komputer yang menyimpan website dan menyala 24 jam | Gratis sampai berbayar per bulan/tahun |
| **Browser** | Tamu yang berkunjung | Aplikasi yang dipakai pengunjung untuk membuka website | – |
| **HTTPS / SSL** | Gembok pintu | Mengamankan data antara pengunjung dan website. Tanpa ini, browser memberi peringatan "Tidak aman" | Umumnya gratis sekarang |
| **URL** | Alamat lengkap sampai nomor kamar | Alamat halaman tertentu, misalnya `bengkelmaju.com/layanan` | – |

#### 3. Website statis vs dinamis

| | **Statis** | **Dinamis** |
|---|---|---|
| Contoh | Landing page, company profile | Toko online, sistem booking, website dengan login |
| Isi | Sama untuk semua pengunjung | Berubah sesuai pengguna/data (keranjang, akun, stok) |
| Butuh backend & database? | Tidak | Ya |
| Kecepatan & keamanan | Sangat cepat, risiko kecil | Perlu perhatian lebih |
| Biaya | Lebih murah | Lebih mahal |
| Paket Anda | **Basic & Standard** | **Pro** |

#### 4. 💬 Cara menjelaskan ke klien (bahasa awam)
> *"Website itu seperti toko fisik, Pak. **Domain** itu alamat tokonya, misalnya bengkelmaju.com, dan dibayar per tahun seperti sewa papan nama. **Hosting** itu tanah tempat tokonya berdiri supaya bisa dibuka 24 jam. Tanda **gembok (HTTPS)** membuat pelanggan merasa aman. Semua itu sudah saya urus. Bapak tinggal terima beres, dan domainnya atas nama Bapak sendiri."*

**Pertanyaan klien yang sering muncul:**
- *"Kenapa ada biaya tiap tahun?"* Domain itu sewa nama, harus diperpanjang. Kalau tidak, alamatnya bisa diambil orang lain.
- *"Kalau saya tidak lanjut maintenance, website-nya hilang?"* Tidak, selama domain dan hosting tetap diperpanjang. Maintenance itu untuk update, perbaikan, dan pengecekan rutin.
- *"Website saya aman tidak?"* Sudah pakai HTTPS (gembok). Untuk toko online, pembayaran ditangani payment gateway resmi, jadi data kartu tidak disimpan di website.

#### 5. 🛠️ Latihan praktik (10 menit)
1. Buka website mana pun di HP, lalu klik ikon **gembok** di samping alamat. Lihat informasi "koneksi aman".
2. Buka **whois.com** (atau situs pengecek domain lain), lalu ketik `puranaindonesia.com`. Lihat kapan domain itu didaftarkan dan kapan habis masa berlakunya.
3. Coba cek ketersediaan domain untuk nama usaha khayalan Anda di Niagahoster atau Rumahweb, misalnya `trayawebstudio.com`. Perhatikan harga tahun pertama dan harga perpanjangannya, karena biasanya berbeda.

#### 6. ✅ Kuis singkat (jawab di sini kalau mau dicek)
1. Apa beda **domain** dan **hosting**?
2. Kenapa website **wajib HTTPS**?
3. Klien warung kopi ingin website berisi menu, lokasi, dan tombol WhatsApp. Itu website **statis** atau **dinamis**? Masuk paket apa?
4. Bagaimana menjawab klien yang bertanya *"kenapa harus bayar domain tiap tahun?"*

---

## 5. Claude.ai Project, Obsidian, hemat limit

### Memindahkan Pengetahuan ke Claude Pribadi (claude.ai / Claude Desktop)

#### Cara paling hemat limit: pakai **Project** di claude.ai
1. Buka claude.ai → **Projects** → **Create project** → beri nama *Traya & Jualan Website*.
2. Di **Project knowledge**, upload file ini (cukup ini saja, jangan semua):
   - `CLAUDE.md`
   - `pindahan-claude-pribadi/01-RANGKUMAN-LENGKAP.md`
   - `pindahan-claude-pribadi/03-HARGA-PAKET-DAN-KLIEN.md`
   - `pindahan-claude-pribadi/02-PELAJARAN-WEB-DEV.md`
   - `catatan/Jualan Website/00 Jualan Website (MOC).md` dan `catatan/Jualan Website/Klien/PRD - Toko Online Fashion (Teteh).md`
   - (opsional, hanya kalau butuh riwayat detail) `Ekspor-Chat-Traya.md`
3. Di **Project instructions**, tempel teks di kotak bawah.
4. Setiap chat baru di dalam Project itu otomatis tahu semua konteks.

```
Saya pengguna berbahasa Indonesia, awam soal coding. Jelaskan dengan bahasa sederhana, pakai perumpamaan,
tabel ringkas, langkah bernomor, dan beri rekomendasi yang jelas. Jujur soal batasan; tandai angka
perkiraan sebagai "tipikal/estimasi".
Konteks saya ada di Project knowledge (CLAUDE.md + 01-RANGKUMAN-LENGKAP.md): saya bekerja untuk
PT Traya Hydro Indonesia (video promosi SWRO) dan sedang membangun usaha jasa website (klien pertama: toko
fashion "Teteh"), serta belajar web developer (lanjut Pelajaran 2: Frontend).
Aturan: jangan menyebut nama klien/instansi di materi publik; jangan minta saya menempel password/API key;
untuk pekerjaan panjang cukup kabari saat hampir selesai, selesai, atau ada masalah.
Catatan saya disimpan di Obsidian; kalau membuat catatan baru, tulis dalam format Markdown Obsidian
(properties di atas, [[wikilink]] antar catatan).
```

#### Untuk Claude Code / Claude Desktop di PC
- Folder proyek + `CLAUDE.md` (dari zip) sudah cukup. Claude otomatis membaca `CLAUDE.md`; file lain dibaca
  **hanya saat dibutuhkan** — jangan menyuruh Claude membaca semua file sekaligus (boros limit).
- MCP yang sudah Anda pasang di PC (Windows MCP, SketchUp, FL Studio, EPANET, dll.) **tetap di PC** dan tidak
  perlu dipindah. Yang dipindah hanya **pengetahuan** (file-file ini).
- Obsidian: salin folder `catatan/` ke vault Anda. Agar Claude Desktop bisa membaca vault, sambungkan folder
  vault lewat MCP filesystem / Windows MCP / Obsidian MCP yang sudah Anda pasang.

#### Hemat limit Claude Pro
- Limit Claude Pro **dipakai bersama** oleh claude.ai, Claude Desktop, dan Claude Code, dan di-reset tiap
  beberapa jam (plus batas mingguan). Pindah aplikasi tidak menambah kuota.
- Pakai model **Sonnet** untuk pekerjaan harian; Opus hanya untuk yang berat.
- Di Claude Code: `/clear` saat ganti topik, `/compact` kalau percakapan sudah panjang.
- Terlalu banyak MCP & skill aktif juga memakan token di setiap pesan → matikan yang tidak dipakai
  (`/mcp` untuk melihat dan menonaktifkan).

---

## 6. Daftar lengkap MCP, skill, plugin & connector

### MCP, Skill, Plugin & Connector — Daftar Lengkap + Cara Pasang di Akun Pribadi

Ada **3 kelompok** yang perlu dibedakan:

| Kelompok | Penjelasan | Cara pindah |
|---|---|---|
| **A. Connector claude.ai** | Sambungan ke layanan (Gmail, Google Drive, Figma, Canva, dll.) yang menempel di **akun** | Aktifkan ulang di claude.ai → Settings → Connectors (login ke layanannya) |
| **B. Plugin & skill Claude Code** | Paket perintah/skill yang dipasang di Claude Code | Jalankan `setup/pasang-plugin` atau perintah `/plugin` di bawah |
| **C. Tools dari TikTok/IG** | Repo yang **dicatat** (belum pernah dipasang) | Pilih yang dibutuhkan saja, pasang satu per satu |

> Penting: koneksi akun (login Gmail, Figma, dll.) **tidak bisa dipindah lewat file** demi keamanan.
> Anda cukup login ulang sekali di akun pribadi. Jangan pernah menyimpan password/API key di catatan.

---

#### A. Connector yang aktif di sesi cloud ini

| Connector | Dipakai untuk | Cara aktifkan |
|---|---|---|
| **GitHub** | Simpan semua proyek & catatan | claude.ai → Settings → Connectors → GitHub; di PC cukup `git` + akun GitHub |
| **Gmail** | Baca/draf email | claude.ai → Settings → Connectors → Gmail |
| **Google Drive** | Simpan/baca dokumen | claude.ai → Settings → Connectors → Google Drive |
| **Figma** | Desain website / mockup | claude.ai → Settings → Connectors → Figma |
| **Canva** | Desain cepat, resize sosmed | claude.ai → Settings → Connectors → Canva |
| **Adobe for creativity** | Edit foto/PDF/video ringan | claude.ai → Settings → Connectors → Adobe |
| **Trimble SketchUp** | Model 3D (berguna untuk file `.skp` SWRO) | claude.ai → Settings → Connectors → SketchUp |
| **Claude Docs** | Dokumen hidup di claude.ai | Bawaan claude.ai |

Connector claude.ai otomatis ikut terbaca di **Claude Code** selama Anda login dengan akun claude.ai yang sama
(`claude` → `/login`). Cek dengan perintah `/mcp` di dalam Claude Code.

---

#### B. Plugin & skill yang terpasang di sesi cloud ini

| Plugin | Isi skill penting | Sumber |
|---|---|---|
| **design** | design-critique, design-system, ux-copy, accessibility-review, design-handoff, user-research | Anthropic knowledge-work-plugins |
| **engineering** | code-review, debug, architecture, system-design, testing-strategy, deploy-checklist, documentation | Anthropic knowledge-work-plugins |
| **operations** | process-doc, runbook, risk-assessment, status-report, vendor-review, capacity-plan | Anthropic knowledge-work-plugins |
| **data** | analyze, build-dashboard, create-viz, sql-queries, explore-data | Anthropic knowledge-work-plugins |
| **pdf-viewer** | buka, anotasi, isi form, tanda tangan PDF | marketplace plugin |
| **desktop-commander** | terminal & file di komputer sendiri | MCP open source |
| **figma**, **canva**, **adobe-for-creativity** | skill pendamping connector desain | marketplace plugin |
| **postiz** | jadwal posting sosial media | marketplace plugin |
| Skill bawaan Anthropic | **docx, pdf, pptx, xlsx, skill-creator** | bawaan claude.ai / repo anthropics/skills |

(Plugin *bio-research* dan *zoom* juga ada di sesi cloud, tetapi tidak relevan untuk pekerjaan Anda — tidak perlu dipasang.)

##### Cara pasang (di dalam Claude Code, ketik satu per satu)
```
/plugin marketplace add anthropics/knowledge-work-plugins
/plugin install design@knowledge-work-plugins
/plugin install engineering@knowledge-work-plugins
/plugin install operations@knowledge-work-plugins
/plugin install data@knowledge-work-plugins
/plugin marketplace add anthropics/skills
/plugin
```
Perintah terakhir (`/plugin`) membuka katalog: cari **frontend-design**, **security-guidance**, **superpowers**,
**pdf-viewer**, **figma**, **canva**, **postiz**, lalu klik Install. Nama di katalog bisa sedikit berbeda;
cari dengan kata kuncinya.

Atau jalankan skrip otomatis: `setup/pasang-plugin.ps1` (Windows) / `setup/pasang-plugin.sh` (Mac/Linux).
Kalau ada baris yang gagal (nama berubah), pasang manual lewat `/plugin`.

##### MCP lokal (contoh konfigurasi: `setup/mcp-contoh.json`)
| MCP | Fungsi |
|---|---|
| `desktop-commander` | terminal & file di PC |
| `chrome-devtools` | Claude bisa membuka & memeriksa website di Chrome (wajib untuk jualan website) |
| `playwright` | otomasi browser, tes website, screenshot |

Cara mengaktifkan (pilih yang Anda butuhkan saja, cek dulu sumbernya):
- salin `setup/mcp-contoh.json` ke root proyek dengan nama `.mcp.json`, lalu buka Claude Code → saat ditanya, pilih **Yes**; atau
- tambahkan satu per satu: `claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest`

Butuh **Node.js 18+** terpasang.

---

#### C. Tools dari TikTok/IG (dicatat, belum dipasang)

Daftar lengkap 38 tools + 30 plugin beserta link ada di:
- `catatan/Simpanan Tools AI/00 Simpanan Tools AI (MOC).md`
- `catatan/Simpanan Tools AI/30 Plugin Claude Terbaik per Peran.md`
- `catatan/Jualan Website/Setup Claude Code - 5 Plugin untuk 5 Titik Buta.md`
- `catatan/Jualan Website/Skill Desain - Perbaiki UI Buatan AI.md`
- `catatan/Jualan Website/Connector - 5 Connector Wajib untuk Claude.md`

##### Paket awal yang disarankan untuk jualan website (pasang ini dulu)
| Tool | Untuk | Perintah |
|---|---|---|
| frontend-design (resmi) | Desain UI tidak "kelihatan AI" | `/plugin install frontend-design@claude-plugins-official` |
| security-guidance (resmi) | Cek keamanan saat coding | `/plugin install security-guidance@claude-plugins-official` |
| superpowers | Alur kerja terstruktur (rencana → kerja → cek) | `/plugin install superpowers@claude-plugins-official` |
| agent-skills (Addy Osmani) | Skill engineering lengkap | `/plugin marketplace add addyosmani/agent-skills` lalu `/plugin install agent-skills@addy-agent-skills` |
| chrome-devtools-mcp | Lihat & debug website di Chrome | `claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest` |
| GSAP skills | Animasi web premium | `npx skills add greensock/gsap-skills` |
| taste-skill | Selera desain | `npx skills add Leonxlnx/taste-skill` |
| ui-ux-pro-max-skill | Panduan UI/UX | `npx skills add nextlevelbuilder/ui-ux-pro-max-skill` |
| security-audit-skill (Cloudflare) | Audit keamanan sebelum launch | `npx skills add cloudflare/security-audit-skill` |
| marketingskills | SEO, copywriting, iklan | `npx skills add coreyhaines31/marketingskills` |

##### Untuk video & 3D (proyek Traya)
| Tool | Perintah |
|---|---|
| Three.js skills | `npx skills add CloudAI-X/threejs-skills` |
| hyperframes (video dari HTML) | `npx skills add heygen-com/hyperframes` |
| diagram-design | `npx skills add cathrynlavery/diagram-design` |
| motion-design-skill (Lottie) | `npx skills add lottiefiles/motion-design-skill` |

Catatan jujur: isi repo-repo di bagian C **belum pernah dicek langsung** (sesi cloud tidak bisa membuka
semuanya). Sebelum memasang, minta Claude membaca README repo-nya dulu dan pastikan sumbernya terpercaya.
Pasang **seperlunya**: terlalu banyak skill membuat Claude lebih lambat dan boros token.

---


## 7. Proyek teknik di laptop HP (HP Remote & sesi MCP) — ringkasan dari daftar sesi

Sumber: judul & ringkasan otomatis sesi di akun pengguna (detail lengkap ada di file ekspor chat; lihat Langkah 6).
Sesi-sesi ini berjalan lewat **Remote Control** dari laptop HP (folder kerja utama `C:\`).

| Sesi / periode | Topik & status terakhir |
|---|---|
| Akses PC, AutoCAD connection (Agu 2026) | Awal menyambungkan Claude ke PC dan AutoCAD |
| wwtp-drafter skill setup (27 Agu) | Membuat skill khusus untuk menggambar WWTP |
| Solidworks MCP, SolidWorks MCP connection test (31 Agu–2 Okt) | Uji koneksi SOLIDWORKS MCP |
| EPANET MCP exploration (3 Sep) | Eksplorasi EPANET (simulasi jaringan pipa) lewat MCP |
| SketchUp MCP (14 Sep–8 Okt) | Volume tangki MBR (sel D39) diset **56,24 m³** (D38: 9300 × 1800 × 2320 mm) di workbook BQ Excel — perlu disimpan (Ctrl+S) |
| AutoCAD MCP (24 Sep–15 Okt) | Prompt **rack MBR 25 modul**: 8 outlet permeate di atas, tinggi 1763, 100 nipple 1/2"; backwash bawah & tebal lug masih opsional |
| SOLIDWORKS-MCP NEW (2–8 Okt) | `TH-MP-001_MempulseDevice.SLDPRT` tersimpan; material diasumsikan AISI 304 → ukuran U-bend & reducer perlu dicek |
| HP remote (2 Okt) | Penjelasan SketchUp LayOut: template, scene sebagai viewport, update otomatis, ekspor PDF/DWG |
| HP remote (4–5 Okt) | PC dimatikan 01:31; tab Chrome disimpan; daftar tugas lanjutan dicatat |
| SketchUp MCP (8–13 Okt) | 17 label pompa & blower ditempatkan di tag 08k (belum disimpan saat itu) |
| Koneksi Figma (14 Okt) | 4 desain cover di Figma: Midnight Premium, Navy Diagonal, Angka Besar, Blueprint Teknik |
| HP remote (16 Okt) | Brosur **Rack Membrane MBR 25 Modul** (PDF: rack saja, dan rack + membran) terkirim |
| HP remote (16 Okt) | `<gambar WWTP 16 okt>.dwg` disimpan dengan label pompa Permeate & Backwash baru (versi 15 Okt tidak diubah) |
| HP remote (19 Okt) | Dua blower EQ dipindah ke kotak tengah sebelah pompa transfer; pipa digabung ke manifold; label dipindah ke utara tutup bak |
| Penentuan bak equalisasi (20 Okt, web) | Bak EQ 5 × 7,1 × 2,7 m; aerator Tsurumi TRN; ± 34 m³ volume efektif di atas kedalaman minimum 1,5 m; cek fluktuasi debit dengan mass diagram |
| HP remote (20–22 Okt) | File AutoCAD & SketchUp disimpan; "Hermes" dihentikan; laptop dijadwalkan mati |
| HP Remote (22 Okt–1 Nov) | Sesi panjang terakhir — lihat file ekspor untuk detail |

Folder proyek di laptop: `C:\Users\HP\Desktop\<folder proyek WWTP>`, `C:\Users\HP\Downloads\PT traya hydro`,
`C:\Users\HP\Desktop\claude (autocad)`.



---

## 8. Semua repo GitHub dari TikTok/IG (77 repo) + cara pasang

Status: repo-repo ini **dicatat**, belum dipasang. Sebagian sudah dicek langsung (ditandai "Terkonfirmasi"),
sisanya baru dari screenshot. **Pasang hanya yang diminta pengguna**, baca README-nya dulu, dan pastikan sumbernya resmi.

### 8a. Simpanan Tools AI (38 item)

### Simpanan Tools AI

Daftar tools, repo, dan prompt yang disimpan dari TikTok/Instagram. **Bukan khusus untuk project jualan website.**
Status: dicatat dari screenshot dan link yang dikirim user, isi repo **belum dicek langsung**
(sesi cloud tidak punya akses ke repo-repo ini). Deskripsi di bawah hanya berdasarkan teks yang
terlihat di screenshot. Repo yang hanya dikirim sebagai link belum ada deskripsinya.

#### Catatan terkait
- [[30 Plugin Claude Terbaik per Peran]] *(IG)*: 30 plugin dikelompokkan per peran (kode, riset, hemat token, desain, menulis/video).

#### Daftar

| # | Nama | Link | Kategori | Sumber |
|---|------|------|----------|--------|
| 1 | Openjutsu | https://github.com/D3voz/openjutsu | Video AI: tukar karakter/objek | screenshot |
| 2 | huashu-motion | https://github.com/alchaincyf/huashu-motion | Video: film peluncuran produk | screenshot |
| 3 | premiere-pro-mcp | https://github.com/leancoderkavy/premiere-pro-mcp | Edit video: Premiere Pro × AI | screenshot |
| 4 | 20 Video Effects Created by Claude | belum ada link | Efek video buatan Claude | screenshot |
| 5 | Agent Reach | https://github.com/Panniantong/Agent-Reach | AI agent: akses internet | screenshot |
| 6 | harvey | https://github.com/ethanplusai/harvey | **AI sales agent** (cari prospek, cold email) | link |
| 7 | freefield | https://github.com/neuregex/freefield | Higgsfield open source di ComfyUI (video AI) | link |
| 8 | voicebox | https://github.com/jamiepine/voicebox | Studio suara AI: clone, dikte, TTS | link |
| 9 | Adobe_Premiere_Pro_MCP | https://github.com/hetpatel-11/Adobe_Premiere_Pro_MCP | Edit video: Premiere Pro × Claude Code | screenshot |
| 10 | Concat | https://github.com/jub0t/Concat | Editor video gratis (pengganti CapCut) | screenshot |
| 11 | rea | https://github.com/morluto/rea | MCP: reverse engineering aplikasi | screenshot |
| 12 | skills (Matt Pocock) | https://github.com/mattpocock/skills | Agent skills untuk Claude | screenshot |
| 13 | diagram-design | https://github.com/cathrynlavery/diagram-design | Skill: 44 jenis diagram HTML+SVG | screenshot |
| 14 | hyperframes | https://github.com/heygen-com/hyperframes | Video dari HTML untuk AI agent | screenshot |
| 15 | openGym | https://github.com/DuarteSantos8/openGym | Aplikasi tracker gym (self-hosted) | screenshot |
| 16 | 20 Claude Animation Styles | belum ada link | Gaya animasi buatan Claude | screenshot |
| 17 | OpenMontage | https://github.com/calesthio/OpenMontage | Sistem produksi video agentic | screenshot |
| 18 | animate | https://github.com/cth9191/animate | Animasi prosedural untuk Claude Code | link |
| 19 | motionmaxxing | https://github.com/Tejashmakwana/motionmaxxing | Skill: video AI jadi kelas motion designer | link |
| 20 | Three.js Skills | https://github.com/CloudAI-X/threejs-skills | Skill: 3D web (Three.js) | screenshot (sumber: @rifqieh) |
| 21 | GSAP Skill | https://github.com/greensock/gsap-skills | Skill resmi: animasi web GSAP | screenshot (@rifqieh) |
| 22 | Design DNA | https://github.com/zanwei/design-dna | Skill: ekstrak & tiru gaya desain web | screenshot (@rifqieh) |
| 23 | Motion Design Skill | https://github.com/lottiefiles/motion-design-skill | Skill: animasi Lottie/SVG | screenshot (@rifqieh) |
| 24 | Genjutsu | https://github.com/AThevon/genjutsu | Skill: UI kreatif kelas premium | screenshot (@rifqieh) |
| 25 | academic-research-skills | https://github.com/Imbad0202/academic-research-skills | Skill: pipeline riset & penulisan | screenshot |
| 26 | ai-job-search | https://github.com/MadsLorentzen/ai-job-search | Pipeline cari kerja di Claude Code | screenshot |
| 27 | emilkowalski/skills | https://github.com/emilkowalski/skills | Skill: detail UI, animasi, transisi | screenshot |
| 28 | Cybersecurity Skills | https://github.com/mukul975/Anthropic-Cybersecurity-Skills (nama terpotong, cek) | Skill: 817 skill keamanan | screenshot |
| 29 | pm-skills | https://github.com/phuryn/pm-skills | Skill: product manager (strategi s/d launch) | screenshot |
| 30 | book-to-skill | https://github.com/virgiliojr94/book-to-skill | Ubah buku PDF teknis jadi skill Claude | screenshot |
| 31 | instagram-agent-skill | https://github.com/Jakeschincariol/instagram-agent-skill | 13 skill untuk menjalankan akun Instagram | link |
| 32 | security-audit-skill | https://github.com/cloudflare/security-audit-skill | Skill: audit keamanan 6 fase | screenshot IG |
| 33 | VibeWise | belum ketemu (situs: github.com/vibewisehq/vibewise) | Plugin Claude Code: belajar sambil AI menulis kode | screenshot IG |
| 34 | Semgrep | https://github.com/semgrep/semgrep | Scan keamanan kode (static analysis) | screenshot IG |
| 35 | Day Trader skill | belum ada link | 11 skill Claude untuk analisis saham / day trading | transkrip IG |
| 36 | "Azars" (?): agent asisten "Jarvis" | belum ada link | Agent pribadi yang menelepon dengan jadwal harian | transkrip IG |
| 37 | Knowledge Work Plugins (Anthropic) | https://github.com/anthropics/knowledge-work-plugins | Plugin resmi Anthropic untuk pekerjaan kantor per peran | screenshot IG |
| 38 | Founder Skill | belum ada link | 11 skill untuk menguji ide bisnis sebelum launch | transkrip IG |

#### Detail per item

##### 1. Openjutsu
- **Link:** https://github.com/D3voz/openjutsu (lisensi MIT)
- **Fungsi:** tukar karakter atau objek di video dengan satu klik ("gaya Genjutsu"). Masukkan sebuah video dan foto karakter, tekan **Generate**, lalu orang utama di video diganti dengan karakter tersebut. Bisa juga mengganti rambut atau baju, menghapus sesuatu, atau menaruh orang di tempat lain. Kamera, potongan adegan, gerakan, dan soundtrack tetap sama.
- **Fitur:** banyak orang sekaligus (pilih siapa diganti siapa), *object swap* (cat area yang mau diganti), *from picture* (tampilan dan tempat baru dari satu gambar), *post-processing* (perbaiki wajah).
- **Teknologi:** jalan dengan model terbuka **di GPU sendiri**: MiniMax H3 untuk video, SAM 3.1 untuk melacak orang, Qwen3-VL 8B untuk mendeskripsikan gambar dan shot. Front end Next.js kecil di atas workflow **ComfyUI** (pakai `@comfyorg/sdk`, mengikuti contoh `comfy-reshoot`).
- **Catatan:** butuh GPU yang kuat, jadi tidak cocok untuk laptop dengan grafis bawaan.

##### 2. huashu-motion
- **Tagline:** *"Commercial-grade product launch films, in one go."* Membuat film peluncuran produk kelas komersial sekaligus.
- **Badge yang terlihat:** License MIT, **Agent Skills** Standard, berarti berupa skill untuk AI agent (misalnya Claude).
- **Link:** https://github.com/alchaincyf/huashu-motion (± 1,9k★). Deskripsi: agent membuat video promosi produk kelas komersial sekali jadi; bisa membuat musik dan mengubah bagian video dengan menunjuk frame-nya.
- **Relevan untuk:** video promosi produk, misalnya video SWRO Traya berikutnya.

##### 3. premiere-pro-mcp
- **Link:** https://github.com/leancoderkavy/premiere-pro-mcp (publik)
- **Isi repo yang terlihat:** folder `cep-plugin`, `chat-plugin`, `landing`, `scripts`, `src`.
- **Dugaan dari nama:** MCP server yang menghubungkan AI (Claude) ke **Adobe Premiere Pro** supaya bisa mengedit video lewat chat. Belum dicek.
- **Dari video:** "Step 2: Grab this repo". Clone atau download ZIP repo ini sebagai salah satu langkah tutorial.

##### 4. 20 Video Effects Created by Claude
- Video yang memamerkan 20 efek video buatan Claude:
  01 Orbit · 02 Chat Takeover · 03 Frame Escape · 04 Snap Zoom · 05 Checklist Pop · 06 Headline Stack ·
  07 Zoom Portal · 08 Growth Curve · 09 Studio Reveal · 10 B-roll Overlay · 11 Paper Cutout · 12 Dolly Zoom ·
  13 Magazine Cover · 14 Liquid Glass · 15 Zoom Through Cut · 16 Green Screen · 17 Frame Break ·
  18 Digital Zoom · 19 Phone Mockup · 20 Checklist
- Beberapa nama di sisi kiri terpotong di screenshot (05, 06, 08), jadi ditulis berdasarkan perkiraan.
- **Link/repo:** belum ada.
- **Relevan untuk:** konten TikTok/IG, video jualan website, promo produk.

##### 5. Agent Reach
- **Tagline (Mandarin):** 给你的 AI Agent 一键装上互联网能力, artinya "satu klik memberi AI Agent kemampuan akses internet". Memilih, memasang, dan mengecek cara akses yang paling stabil, jadi kalau cara aksesnya berubah pengguna tidak perlu repot.
- **Badge:** GitHub Trending **#1 Repository of the Day**, Global Rank #142, lisensi MIT, Python 3.10+, ± 98K stars.
- **Fitur yang terlihat:** *BrowserAct*, yaitu mengambil data dari situs rumit seperti Amazon, LinkedIn, X, dan Google Maps dengan perintah bahasa biasa. Agent memakai browser asli, menghasilkan bot pengambil data yang bisa dipakai ulang, dan mengembalikan hasil terstruktur.
- **Link:** https://github.com/Panniantong/Agent-Reach (± 107k★, dari hasil pencarian GitHub).
- **Relevan untuk:** riset prospek dan lead (misalnya data bisnis dari Google Maps untuk calon klien website).

##### 6. harvey
- **Link:** https://github.com/ethanplusai/harvey (± 3,4k★, MIT, Python)
- **Fungsi:** *"Autonomous AI sales agent powered by Claude Code or Codex."* Mencari prospek, menulis cold email, mengirim kampanye, membalas respons, dan membuat jadwal meeting. Tidak perlu API key karena jalan di langganan Claude/Codex.
- **Relevan untuk:** ⭐ **sangat relevan untuk [[00 Jualan Website (MOC)|Jualan Website]]**, yaitu mencari calon klien dan mengirim penawaran otomatis. Perhatikan etika dan aturan anti-spam; kirim ke prospek yang relevan saja.

##### 7. freefield
- **Link:** https://github.com/neuregex/freefield (± 263★, MIT)
- **Fungsi:** *"Open-source Higgsfield on ComfyUI: every app is one folder, every model is open weights."* Versi open source dari Higgsfield (tool video/gambar AI) yang berjalan di ComfyUI.
- **Catatan:** butuh GPU kuat, jadi tidak cocok untuk laptop dengan grafis bawaan.

##### 8. voicebox
- **Link:** https://github.com/jamiepine/voicebox (± 59k★, MIT)
- **Fungsi:** *"The open-source AI voice studio. Clone, dictate, create."* Studio suara AI: clone suara, dikte (Whisper), dan TTS (Qwen3-TTS). Mendukung CUDA dan MLX (Mac).
- **Relevan untuk:** ⭐ **voice-over natural** untuk video SWRO Traya berikutnya, sebagai alternatif Piper yang terdengar kaku. Cek dukungan bahasa Indonesia dan kebutuhan GPU.

##### 9. Adobe_Premiere_Pro_MCP
- **Link:** https://github.com/hetpatel-11/Adobe_Premiere_Pro_MCP (publik, ± 684 stars, 129 fork). Nama pemilik dibaca dari URL di screenshot.
- **Fungsi:** MCP untuk Adobe Premiere Pro, sehingga Premiere bisa dikendalikan dari **Claude Code**.
- **Catatan:** mirip dengan item 3 (premiere-pro-mcp). Nanti bandingkan mana yang lebih bagus.

##### 10. Concat
- **Tagline:** *"The free, open-source, cross-platform CapCut replacement."* Editor video gratis dan open source, jalan di Windows, Mac, dan Linux, sebagai pengganti CapCut.
- **Tampilan:** mirip CapCut (timeline, teks, panel tipografi).
- **Link:** https://github.com/jub0t/Concat (± 12,8k★). Dibuat dengan Rust + ffmpeg, *local-first*, bisa dikendalikan lewat JSON-RPC API & **MCP**, jadi bisa diperintah Claude.
- **Relevan untuk:** edit konten TikTok/IG tanpa langganan CapCut Pro.

##### 11. rea (morluto/rea)
- **Tagline:** *"One MCP that lets your AI agent reverse engineer apps, all the way down to the binary."* Satu MCP yang memungkinkan AI agent membongkar (reverse engineer) aplikasi sampai level binary.
- **Angka di screenshot:** ★ 275.523, +239.477 minggu ini, MIT. Angkanya tidak wajar, jadi perlu dicek ulang.
- **Relevan untuk:** keperluan teknis/riset. Kemungkinan tidak terlalu relevan untuk jualan website.
- **Tambahan dari IG (@jackmandeville1, "Claude clones your apps"):** link **terkonfirmasi** `github.com/morluto/rea`. Deskripsi About: *"Reverse engineer anything with agents, from app behavior down to native binaries."* Skill gratis bernama **reverse-engineer-anything**. Caption: *"Would you rather rent your apps or build your own…"*, yaitu membuat versi sendiri dari aplikasi berlangganan.
- **Kaitan:** = "REA" di [[30 Plugin Claude Terbaik per Peran]] (baris Riset: "lets Claude take apart any app").
- ⚠️ **Catatan hukum/etika:** membongkar dan mengkloning aplikasi orang lain bisa melanggar lisensi, hak cipta, atau ketentuan layanan. Gunakan untuk aplikasi sendiri, belajar, atau riset yang diizinkan. Untuk jualan website, lebih aman meniru **konsep dan alur**, bukan menyalin kode atau aset.

##### 12. skills (mattpocock/skills)
- **Tagline:** *"Agent skills straight from a working engineer's own setup."* Kumpulan agent skill dari setup pribadi seorang engineer ("AI Skills for Real Engineers").
- **Angka:** ★ 293.108, +12.147 minggu ini, MIT.
- **Cara pasang di Claude Code:**
  ```
  claude plugin install mattpocock-skills@claude-plugins-official
  ```
- **Relevan untuk:** membuat website dengan Claude Code lebih rapi.

##### 13. diagram-design (cathrynlavery/diagram-design)
- **Tagline:** *"44 diagram types as clean HTML + SVG, for Claude Code, Codex, Cursor and more."* Skill untuk membuat 44 jenis diagram yang rapi ("Editorial diagrams your designer won't hate").
- **Angka:** ★ 56.037, +10.237 minggu ini, MIT.
- **Cara pasang:**
  ```
  npx skills add cathrynlavery/diagram-design
  ```
- **Relevan untuk:** diagram alur di website klien, proposal, dan presentasi (misalnya diagram proses SWRO).

##### 14. hyperframes (heygen-com/hyperframes)
- **Tagline:** *"Write HTML. Render video. Built for AI agents."* Video ditulis sebagai HTML lalu dirender, dibuat untuk AI agent. Konsepnya sama dengan cara video SWRO Traya dibuat (halaman HTML dirender per frame).
- **Angka:** ★ 64.718, +5.318 minggu ini, lisensi Apache-2.0. Dari HeyGen.
- **Contoh gaya:** "Paper, ink & yellow" (editorial) dan "Loud, bordered, a little crooked" (neo-brutalism).
- **Cara pasang:**
  ```
  npx skills add heygen-com/hyperframes
  ```
- **Relevan untuk:** video promosi, konten TikTok/IG, video untuk klien website. Ini kandidat kuat.

##### 15. openGym (DuarteSantos8/openGym)
- **Tagline:** *"Self-hosted gym and body-weight tracker. Your data stays yours."* Pencatat latihan gym dan berat badan yang di-host sendiri.
- **Fitur yang terlihat:** jadwal latihan mingguan, check-in di gym, grafik berat badan dan target, statistik (streak, aktivitas 12 bulan, muscle balance, fatigue, strength).
- **Angka:** ★ 12.465, +4.471 minggu ini, AGPL-3.0.
- **Cara jalan:**
  ```
  docker compose up
  ```
- **Relevan untuk:** pribadi, atau contoh/inspirasi desain aplikasi untuk jualan website.

##### 16. 20 Insane Claude Animation Styles
- Video yang memamerkan 20 gaya animasi buatan Claude dalam 28 detik:
  1 Particles · 2 Liquid morph · 3 Neon glow · 4 Y2K chrome · 5 Kinetic type · 6 Paper cutout ·
  7 Holographic · 8 Isometric · 9 ASCII art · 10 Clay 3D · 11 Retro VHS · 12 Comic book ·
  13 Split-flap · 14 Hand-drawn · 15 Blueprint · 16 Physics · 17 Pixel art · 18 Bauhaus ·
  19 Art deco · 20 Neo-brutalism
- Contoh di video: kartu neo-brutalism "SHIP IT. / 98% FASTER / CLICK ME".
- **Link:** belum ada. Kemungkinan terkait dengan item 18 atau 19, perlu dicek.
- **Relevan untuk:** pilihan gaya visual website dan konten. Bisa jadi menu gaya untuk ditawarkan ke klien.

##### 17. OpenMontage (calesthio/OpenMontage)
- **Link:** https://github.com/calesthio/OpenMontage (publik, 97 issues, 245 pull request, aktif)
- **Isi yang terlihat:** folder `.agents/skills`, berarti berbasis agent skills. Ada PR dengan kata "wan2", kemungkinan model video Wan 2.x.
- **Fungsi (dari halaman repo):** *"World's first open-source, agentic video production system."* 12 pipeline produksi, 100+ tool, 700+ file skill. Mengubah AI coding assistant jadi studio produksi video lengkap (komposer Remotion). ± 73k★, AGPL-3.0.

##### 18. animate (cth9191/animate)
- **Link:** https://github.com/cth9191/animate (± 1,1k★, MIT)
- **Fungsi:** animasi prosedural dengan gaya apa pun untuk Claude Code: video canvas pendek satu file, dengan cek cerita, tampilan, dan storyboard. Ada 7 gaya bawaan atau gaya dari referensi sendiri, musik sendiri (sinkron ketukan), screenshot produk asli, dan semua format dari satu karya.
- **Kemungkinan** sumber video "20 Claude Animation Styles" (#16).

##### 19. motionmaxxing (Tejashmakwana/motionmaxxing)
- **Link:** https://github.com/Tejashmakwana/motionmaxxing (± 1,1k★, Apache-2.0)
- **Fungsi:** *"Looksmaxxing for motion graphics."* Agent skill yang mengubah video AI asal-asalan jadi film yang terlihat dibuat motion designer.

##### Kumpulan skill web dari @rifqieh ("Build web and mobile apps")
Lima skill di bawah berasal dari satu video carousel. **Sangat relevan untuk [[00 Jualan Website (MOC)|Jualan Website]]**, karena semuanya membuat website buatan Claude terlihat premium.

##### 20. Three.js Skills (CloudAI-X/threejs-skills)
- **Isi:** skill untuk membuat 3D di web dengan Three.js: interactive 3D scene, camera controls, model GLTF, lighting setup, particle effects.
- **Catatan:** video SWRO Traya juga dibuat dengan Three.js.
- **Relevan untuk:** website premium dengan hero 3D (produk berputar, scene interaktif).

##### 21. GSAP Skill (greensock/gsap-skills)
- **Isi:** **skill resmi dari GreenSock** untuk GSAP ("Animate anything", library animasi JavaScript profesional): timeline animation, ScrollTrigger (animasi saat scroll), text reveal effects, integrasi React.
- **Relevan untuk:** animasi scroll dan teks di landing page klien. Ini standar website agensi.

##### 22. Design DNA (zanwei/design-dna)
- **Isi:** agent skill untuk **mengekstrak, menyusun, dan menerapkan identitas visual** sebuah website sebagai "Design DNA" yang bisa dibaca mesin, dalam 3 dimensi: design tokens, gaya kualitatif, dan efek visual.
- **Contoh:** "Apply the style of thekrakentraining to Deno", yaitu menerapkan gaya satu website ke website lain.
- **Fitur:** reverse engineer design, copy UI style, color palette, typography, layout analysis.
- **Relevan untuk:** "buatkan website seperti referensi ini" dari klien. Sangat berguna untuk jualan website.

##### 23. Motion Design Skill (lottiefiles/motion-design-skill)
- **Isi:** dari LottieFiles. Mencakup animasi Lottie, animasi SVG, timeline & keyframes, interactive states, alur kerja motion dengan AI, export JSON & dotLottie.
- **Relevan untuk:** ikon dan ilustrasi beranimasi yang ringan di website klien.

##### 24. Genjutsu (AThevon/genjutsu)
- **Tagline:** *"The art of illusion. Cast motion. Paint signatures. Zero AI slop."*
- **Isi:** skill creative coding untuk **Claude Code dan claude.ai**. Mengubah antarmuka dari sekadar berfungsi menjadi luar biasa lewat motion design, pola interaksi, dan sistem visual. Mendukung Web (React, Vue, Svelte, vanilla CSS, Three.js, Canvas), Android (Jetpack Compose), dan Apple (SwiftUI iOS + macOS).
- **Catatan versi:** v3.0 adalah rebrand dari plugin `creative-excellence`. Skill `/creative-excellence:creative-excellence` dan `/creative-excellence:design-excellence` sekarang bernama `/genjutsu:cast` dan `/genjutsu:paint`.
- **Fitur:** UI kelas award, layout modern, animasi premium, creative direction, visual polish.
- **Relevan untuk:** membuat website klien tidak terlihat "template AI". Kandidat utama.

##### Kumpulan skill dari carousel "#1–#7"
Satu carousel berisi 7 repo (#1–#4 = item 25–28, #6–#7 = item 29–30). #5 di carousel adalah **diagram-design**, sudah tercatat sebagai item 13.

##### 25. academic-research-skills (Imbad0202/academic-research-skills)
- **Isi:** pipeline riset lengkap dalam bentuk skill untuk Claude Code: cari literatur → tulis draf → review → revisi → finalisasi. Claude bekerja seperti satu kelompok riset, bukan sekadar asisten menulis.
- **Angka:** 43k stars, 3k fork, 22 kontributor.
- **Catatan:** huruf pertama nama akun (I atau l) kurang jelas di screenshot.
- **Relevan untuk:** riset pasar, artikel/konten website klien, dokumen teknis (misalnya SWRO).

##### 26. ai-job-search (MadsLorentzen/ai-job-search)
- **Isi:** pencarian kerja sebagai pipeline lokal di mesin sendiri. Membaca lowongan, menilai kecocokan dengan profil sendiri, menyesuaikan CV, dan menyusun lamaran. Framework berbasis Claude Code.
- **Angka:** 33k stars, 12k fork, 54 kontributor.
- **Relevan untuk:** pola pipelinenya bisa ditiru untuk **cari klien website** (membaca prospek → menilai kecocokan → menyusun penawaran).

##### 27. emilkowalski/skills
- **Isi:** "Skills for Designers and Engineers". Keahlian menyusun antarmuka yang ditulis oleh desainer berpengalaman: animasi, transisi, dan detail kecil yang membedakan produk jadi dari sekadar demo.
- **Angka:** 32k stars, 2k fork.
- **Relevan untuk:** kualitas detail website klien. Cocok dipakai bersama [[#24. Genjutsu (AThevon/genjutsu)|Genjutsu]] dan GSAP.

##### 28. Cybersecurity Skills (mukul975/Anthropic-Cybersecurity-Skills)
- **Isi:** 817 skill keamanan siber terstruktur untuk AI agent, dipetakan ke 6 framework (MITRE ATT&CK, NIST CSF 2.0, MITRE ATLAS, D3FEND, dan lainnya). Claude memeriksa setup dengan checklist yang sama seperti tim keamanan.
- **Angka:** 31k stars, 4k fork.
- **Catatan:** nama repo terpotong di screenshot, perlu dicek.
- **Relevan untuk:** cek keamanan website klien sebelum diserahkan (nilai tambah saat jualan).

##### 29. pm-skills (phuryn/pm-skills)
- **Isi:** "lapisan product manager": discovery, strategi, spesifikasi, eksekusi. PM Skills Marketplace berisi 100+ agent skill, command, dan plugin dari discovery sampai strategi, eksekusi, launch, dan growth. Tetap berguna walaupun timnya cuma satu orang, karena tetap harus ada yang memutuskan apa yang dibuat.
- **Angka:** 26k stars, 3k fork.
- **Relevan untuk:** merencanakan bisnis jualan website (paket, target pasar, launch), juga menyusun spesifikasi website klien.

##### 30. book-to-skill (virgiliojr94/book-to-skill)
- **Isi:** mengubah buku PDF teknis apa pun menjadi skill Claude Code yang siap dipelajari, dirujuk, dan dipakai saat bekerja. Menurut carousel, inilah yang diam-diam bisa menggantikan enam repo lainnya.
- **Angka:** 24k stars, 3k fork, 34 kontributor.
- **Relevan untuk:** mengubah buku desain web, copywriting, atau sales menjadi skill. Bisa juga buku teknis SWRO/water treatment untuk Traya.

##### 31. instagram-agent-skill (Jakeschincariol/instagram-agent-skill)
- **Link:** https://github.com/Jakeschincariol/instagram-agent-skill
- **Fungsi:** *"Thirteen Claude skills that run an Instagram account."* Reels dari 26 formula hook yang sudah dinilai, skill riset viral, caption linter, dan humanizer. Gratis, MIT. ± 3,8k★.
- **Relevan untuk:** ⭐ **promosi jasa website lewat IG**.
- **Tambahan dari IG (@ghostless.ai, "A free Claude skill finds what's already viral"):** 13 skill Instagram, **gratis, tanpa API key**, MIT, open source. Contoh command:
  - `/ig-viral`: mencari dan meranking Reels yang sedang viral di niche tertentu
  - `/ig-reel`: membuat Reel; contoh output: skor hook ("hook 86 STRONG") dan *beat sheet* (urutan adegan)
  - `/ig-audit`: audit akun Instagram
  - `/ig-profile`: optimasi profil
- Caption: *"Posted 30 reels and got zero views? Stop guessing."* Riset dulu apa yang sudah viral, baru buat konten.
- **Penerapan:** riset Reels viral di niche "jasa website" / "UMKM", lalu buat konten promosi berdasarkan pola hook yang terbukti.

##### 32. security-audit-skill (sumber: IG)
- Skill audit keamanan 6 fase dengan temuan yang diverifikasi independen. Cikal bakal harness keamanan Cloudflare. ± 50,6k stars, MIT.
- Detail lengkap ada di [[Keamanan - Checklist Sebelum Launch]].

##### 33. VibeWise (sumber: IG)
- *"Free Claude Code plugin, open source"*, MIT, ± 3k★ dalam 9 hari, motto **"you build · AI writes"**.
- Dari repo turunan yang ditemukan, ini plugin **learning-first**: kita belajar engineering sementara AI menulis kodenya.
- **Link:** repo utama belum ketemu di pencarian GitHub. Yang ada: [vibewisehq/vibewise](https://github.com/vibewisehq/vibewise) (situs landing resmi), versi opencode (Akshat-2011/vibe-wise-opencode), dan versi Codex (mmlvc/open-wise).
- **Relevan untuk:** belajar dasar web sambil membuat website klien (sejalan dengan langkah 6 di [[Panduan - Jadi AI Engineer & Stack Pilihan]]).

##### 34. Semgrep (sumber: IG, @gracebuilds.ai)
- **Link:** https://github.com/semgrep/semgrep (publik, sangat aktif: ± 887 issues, 2.151 branch, 371 tag)
- **Dari video:** *"This GitHub repo can help you create a secure backend."*
- **Fungsi (pengetahuan umum):** alat **static analysis** open source yang memindai kode di banyak bahasa (JavaScript/TypeScript, Python, Go, dll.) untuk menemukan bug dan celah keamanan (injection, secret bocor, pola berbahaya) berdasarkan aturan (rules). Bisa dijalankan di terminal atau CI. Ada juga fitur SCA (cek dependency rentan).
- **Pakai:** misalnya `semgrep scan --config auto` di folder project (ikuti README untuk cara instal terbaru).
- **Relevan untuk:** ⭐ cek keamanan otomatis website klien sebelum serah terima. Lihat [[Keamanan - Checklist Sebelum Launch]].

##### 35. Day Trader skill (sumber: IG, transkrip)
- **Isi:** 11 skill Claude, gratis dan open source, masing-masing satu tugas. Contoh:
  - memindai ribuan grafik saham untuk mencari *setup*
  - memantau berita terbaru setiap saham di watchlist
  - memberi tahu momen masuk (entry)
  - menentukan stop loss dan target **sebelum** masuk
  - **"time machine"**: memutar ulang sisa hari itu **10.000 kali** dari candle terbaru saham itu sendiri (simulasi) dan memberi peluang yang jujur. Contoh Tesla di video: hasilnya "hampir seperti lempar koin".
- **Pengaman bawaan:** tidak ada transaksi tanpa persetujuan user; **paper trading** (uang virtual) jadi default.
- **Cara pasang (dari video):** tempel link repo ke Claude, lalu bilang "install skill".
- **Link:** belum ada di transkrip; cari "day trader skill claude" di GitHub.
- ⚠️ **Catatan risiko:** trading saham berisiko tinggi. Simulasi dan peluang dari AI bukan jaminan hasil, dan di contoh video pun hasilnya hampir 50:50. Pakai paper trading dulu, jangan pakai uang yang tidak siap hilang. Ini bukan nasihat keuangan.
- **Relevan untuk:** pribadi / belajar; tidak terkait jualan website.

##### 36. Agent asisten "Jarvis" lewat "Azars" (sumber: IG, transkrip)
- **Ide:** agent AI menelepon tiap pagi dan membacakan jadwal hari itu, gaya "Jarvis".
- **3 langkah (dari video):**
  1. Buka **"Azars"** (nama dari transkrip suara, **kemungkinan salah dengar**; cek nama aslinya). Hubungkan **Google Calendar** di *Integrations* dan **iMessage** di *Ways to Talk*, supaya agent tahu jadwal dan punya cara menghubungi.
  2. Buat **routine** (tugas terjadwal yang dijalankan agent tanpa diminta) pada jam bangun. Saat jalan, agent menarik acara hari ini lalu membuat ringkasan singkat untuk dibacakan.
  3. Agent **menelepon lewat ponsel** dan membacakan ringkasannya.
- **Catatan:** iMessage hanya untuk iPhone/Mac. Alternatif yang mirip: **Routines** di Claude (tugas terjadwal) + connector Google Calendar + pengiriman lewat WhatsApp/email (lihat [[WhatsApp Agent - Kapso]]).
- **Relevan untuk:** produktivitas pribadi. Bisa juga jadi ide layanan untuk klien, mis. ringkasan booking harian dikirim ke pemilik usaha tiap pagi (lihat [[Automasi - Contoh Alur Bisnis Jasa (Plumber)]]).

##### 37. Knowledge Work Plugins (sumber: IG, @pedroaitech)
- **Link:** https://github.com/anthropics/knowledge-work-plugins (resmi Anthropic, open source, Apache-2.0, ± 29k★ menurut video)
- **Fungsi (pengetahuan umum, cek README):** kumpulan plugin resmi Anthropic untuk **pekerjaan non-coding per peran/divisi**, misalnya sales, marketing, operasional, desain, engineering, data, keuangan, dan legal. Bisa dipakai di Claude (termasuk Cowork) dan Claude Code. Isinya skill + command siap pakai seperti laporan status, risk assessment, review desain, dan analisis data.
- **Catatan:** beberapa plugin dari kumpulan ini (mis. *operations*, *design*, *engineering*, *data*) kemungkinan sudah tersedia di akun Claude Anda.
- **Relevan untuk:** sisi bisnis jualan website, mis. plugin marketing/sales untuk promosi dan proposal, *operations* untuk SOP dan status report ke klien, *design* untuk review desain.

##### 38. Founder Skill (sumber: IG, transkrip)
- **Isi:** 11 skill Claude, gratis, masing-masing satu tugas, untuk **menguji bisnis sebelum mengeluarkan uang**. Contoh:
  - **Board of directors**: "dewan direksi" yang dilatih gaya pemikiran tokoh seperti Alex Hormozi, Peter Thiel, Steve Jobs
  - **Marketing director**: strategi pemasaran
  - **CFO**: mencari margin keuntungan
  - **Consumer skill** *(paling menarik)*: membuat **swarm agent** yang meniru target pelanggan, masing-masing dengan tingkat penghasilan, keberatan, dan perilaku beli berbeda. Bisnis dijalankan melalui **100 skenario pembeli** untuk melihat siapa yang membeli, siapa yang tidak, dan kenapa.
- **Klaim:** dapat rencana bisnis yang menguntungkan sebelum launch, alih-alih gagal setelah menghabiskan uang.
- **Cara pasang (dari video):** tempel link ke Claude, lalu bilang "install skill". **Link belum ada** di transkrip; cari "founder skill claude" di GitHub.
- **Catatan:** simulasi pembeli oleh AI hanya **perkiraan**, bukan pengganti validasi dengan calon pelanggan sungguhan (wawancara, pre-order, tes iklan kecil). "Dilatih pada tokoh X" biasanya berarti meniru gaya pemikirannya, bukan nasihat dari orangnya langsung.
- **Relevan untuk:** ⭐ merancang **paket & harga jasa website**. Uji ke "pemilik UMKM" virtual (warung, salon, bengkel, klinik) untuk melihat keberatan umum (mahal, tidak perlu website, sudah punya IG) sebelum menawarkan ke klien nyata. Lihat topik harga di [[00 Jualan Website (MOC)]].

##### Catatan tambahan untuk item 13 (diagram-design)
Carousel ini menyebut **38** jenis diagram ("plain HTML and SVG, no Mermaid … for Claude Code, Codex, and Pi. No shadows.") dengan 26k stars. Video sebelumnya menyebut **44** jenis dan 56k stars. Kemungkinan videonya dibuat di waktu berbeda. Versi terbaru dicek langsung di repo.

#### Prompt simpanan

##### Prompt "versi yang lebih dalam"
Untuk membuat hasil kerja AI lebih mendalam, bukan sekadar lebih panjang. Teks asli:

> I want a deeper version of this task, not a bigger one. Before rewriting it: (1) say what a top professional in this field would do here that I'm not asking for; (2) name the rawest material they would start from instead of what has already been digested for me; (3) name the specific methods and tools they would use; (4) say what, other than you or me, would show the result is right. Then rewrite my prompt to ask for exactly that.

**Terjemahan bebas:**
> Saya ingin versi yang lebih dalam dari tugas ini, bukan yang lebih besar. Sebelum menulis ulang: (1) sebutkan apa yang akan dilakukan seorang profesional top di bidang ini yang tidak saya minta; (2) sebutkan bahan paling mentah yang akan dia pakai sebagai titik awal, bukan bahan yang sudah dicerna untuk saya; (3) sebutkan metode dan alat spesifik yang akan dia pakai; (4) sebutkan apa (selain kamu atau saya) yang bisa membuktikan hasilnya benar. Lalu tulis ulang prompt saya supaya meminta persis itu.

**Kapan dipakai:** sebelum mengerjakan tugas penting, misalnya desain website klien, riset pasar, atau proposal.

#### Yang perlu dicek nanti (di PC lokal)
- [x] Deskripsi harvey, freefield, voicebox, OpenMontage, animate, motionmaxxing, instagram-agent-skill sudah diisi dari halaman repo (2026-10-30).
- [x] Link huashu-motion, Agent Reach, Concat sudah ketemu (2026-10-30).
- [ ] Cari sumber "20 Video Effects" dan "20 Claude Animation Styles".
- [ ] Bandingkan 2 MCP Premiere Pro (item 3 dan 9).
- [ ] Cek kebutuhan hardware tiap tool. Laptop: Ryzen 3 5300U, Radeon bawaan, RAM 8 GB.
- [ ] Tandai mana yang relevan untuk [[00 Jualan Website (MOC)|Jualan Website]]. Kandidat awal: #20–24 dan #27 (skill web), #14 hyperframes, #13 diagram-design, #12 skills.
- [ ] Pasang skill web (#20–24) di Claude Code PC lokal, lalu uji di satu contoh landing page.

### 8b. 30 Plugin Claude terbaik per peran

### 30 Plugin Claude Terbaik di GitHub (dikelompokkan per peran)

Kaitan: [[00 Simpanan Tools AI (MOC)]] · [[00 Jualan Website (MOC)]]

> **Pesan utama video:** jangan pasang ke-30 plugin karena Claude malah penuh noise. **Pilih satu baris yang cocok dengan pekerjaan minggu ini, pasang satu plugin dari baris itu.** Sebelum memasang, buka repo-nya dan cek apa saja yang boleh dijalankan plugin itu di komputer.

Nama awalnya dari transkrip suara, lalu **dikonfirmasi dengan caption video**: "Garbati" = **Karpathy Skills**, "the PM. MAD method" = **BMAD Method**, GStack = **gstack**, ECC dan GSD juga tertulis di caption. Nomor `#` merujuk ke daftar di MOC simpanan.

**Pencarian repo (2026-10-30):** dicari lewat halaman pencarian GitHub (urut bintang). Link di bawah **dari hasil pencarian**, halaman repo belum dibuka satu per satu. Angka bintang perkiraan dari hasil pencarian.

#### Fungsi singkat menurut caption video
| Peran | Plugin → fungsi (terjemahan) |
|---|---|
| **Coding seperti senior dev** | Superpowers → Claude merencanakan dan menulis tes dulu · Matt Pocock Skills → skill harian engineer sungguhan · ECC → paket besar skill dan agent · Karpathy Skills → menghentikan kebiasaan coding terburuk Claude · Ponytail → Claude menulis kode jauh lebih sedikit · Agent Skills → cara senior engineer merilis kode |
| **Riset & memahami** | Graphify → kode jadi peta · Agent Reach → Claude bisa membaca Reddit, X, YouTube · Understand Anything → tur terpandu codebase apa pun · Last 30 Days → apa yang dibicarakan orang sebulan terakhir · Career Ops → cari kerja dan sesuaikan CV · REA → Claude bisa membongkar aplikasi apa pun |
| **Project besar, hemat token** | gstack → Claude dapat tim startup lengkap · Caveman → Claude bicara singkat, hemat token · Claude-Mem → Claude ingat sesi sebelumnya · Headroom → memperkecil yang harus dibaca Claude · GSD → merencanakan dan membangun bertahap · BMAD Method → Claude jadi tim agile |
| **Desain & visual** | UI UX Pro Max → pengetahuan desain UI nyata · Taste → mencegah website terlihat generik · Archify → ide apa pun jadi diagram hidup · Impeccable → AI lebih jago desain · PPT Master → PowerPoint asli dari dokumen · Diagram Design → diagram rapi gaya majalah |
| **Menulis & video** | Skills by Anthropic → skill resmi Anthropic · OpenMontage → AI jadi studio video · HyperFrames → kode web jadi video · Humanizer → menghilangkan kesan AI di tulisan · I Have ADHD → Claude menjawab langsung ke intinya dulu · Marketing Skills → skill copywriting, SEO, growth |

> ⚠️ Caption: *"Before you install it, open the repo and read what it's allowed to do, because some of these can run commands on your computer."* Sebagian plugin bisa menjalankan perintah di komputer.

#### 1. Menulis kode: Claude bekerja seperti senior developer
| Plugin | Catatan |
|---|---|
| Superpowers | [obra/superpowers](https://github.com/obra/superpowers): framework agentic skill + metodologi pengembangan software. ± 309k★, MIT. **Terkonfirmasi** (halaman repo dibuka). Pasang: `/plugin install superpowers@claude-plugins-official` |
| Matt Pocock skills | = #12 `mattpocock/skills` |
| ECC | **[affaan-m/ECC](https://github.com/affaan-m/ECC)** (Everything Claude Code; URL lama affaan-m/everything-claude-code dialihkan ke sini). **Terkonfirmasi**, ± 293k★, MIT, situs ecc.tools. Lihat detail di bawah. *(Repo WorldFlowAI/everything-claude-code yang tercatat sebelumnya bukan yang resmi.)* |
| Karpathy skills ("Garbati") | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills): satu file CLAUDE.md untuk memperbaiki perilaku Claude Code, berdasarkan pengamatan Andrej Karpathy soal kesalahan umum LLM saat coding. ± 227k★. Sumber aslinya mungkin `forrestchang/andrej-karpathy-skills` |
| Ponytail | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail): "AI agent berpikir seperti senior dev paling malas: kode terbaik adalah kode yang tidak perlu ditulis." ± 181k★ |
| Agent skills | **[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)** (Addy Osmani): *"Production-grade engineering skills for AI coding agents."* ± 112k★, 25 skill. **Terkonfirmasi.** Pasang: `/plugin marketplace add addyosmani/agent-skills` lalu `/plugin install agent-skills@addy-agent-skills`. Lihat [[Setup Claude Code - 5 Plugin untuk 5 Titik Buta]] |

##### Detail: ECC, Everything Claude Code *(IG, video kedua)*
- **Dari video:** setup Claude Code pribadi seorang developer yang dibuka jadi open source. Berisi ± 286 skill dan 68 sub-agent yang membuat Claude bekerja seperti satu tim developer. Ada skill yang memindai celah keamanan, menjaga memori tetap bersih, dan belajar dari sesi-sesi sebelumnya. Jalan juga di Cursor, Codex, dan Gemini. Pembuatnya **memakai setup ini untuk memenangkan hackathon Anthropic**.
- **Dari halaman repo (dicek 2026-10-30):** *"The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond."*
  - README terbaru: **71 agent, 314 skill, 98 command**, plus hooks, rules, memori, continuous learning, dan scanner keamanan **AgentShield**. Angkanya berbeda dari video karena repo terus bertambah.
  - README menyebut dibuat di **Claude Code Hackathon (Cerebral Valley × Anthropic)**.
  - Paling optimal di Claude Code. Codex punya jalur plugin native; Cursor, Gemini, OpenCode, dll. lewat *adapter* yang fiturnya terbatas.
  - **Pasang:** `/plugin install ecc@ecc` di Claude Code, atau `npx ecc-universal@2.2.3 setup` (cek versi terbaru di README).
  - ⚠️ README memperingatkan: **unggahan ulang oleh pihak ketiga bisa berisi malware**. Sumber resmi hanya github.com/affaan-m/ECC.
- Sesuai saran video "30 plugin": jangan langsung pasang semuanya. ECC sangat besar; pilih bagian yang dibutuhkan.

#### 2. Riset / memahami hal besar
| Plugin | Catatan |
|---|---|
| Graphify | [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify): ubah codebase + dokumen, skema SQL, config, PDF jadi knowledge graph yang bisa ditanya; skill `/graphify`. ± 139k★ |
| Agent Reach | = #5: [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach): agent bisa membaca dan mencari di Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu lewat satu CLI. ± 107k★ |
| Understand Anything | [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything): ubah kode jadi knowledge graph interaktif untuk dipelajari. ± 89k★ |
| Last 30 Days | [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill): riset topik apa pun di Reddit, X, YouTube, HN, Polymarket, dan web. ± 66k★ |
| Career Ops | [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops): agent cari kerja; scan lowongan dan beri skor 1–5 terhadap CV. ± 79k★ |
| REA | kemungkinan = #11 `morluto/rea` |

#### 3. Project besar / token cepat habis
| Plugin | Catatan |
|---|---|
| GStack | [garrytan/gstack](https://github.com/garrytan/gstack): setup Claude Code milik Garry Tan; 23 tool yang berperan sebagai CEO, Designer, Eng Manager, Release Manager, Doc Engineer, dan QA. ± 138k★. **Terkonfirmasi** |
| Caveman | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman): "why use many token when few token do trick". Skill + proxy yang memangkas ± 65% token dengan gaya bicara ringkas ala manusia gua. ± 116k★ |
| Claude Mem | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem): konteks/memori permanen antar sesi untuk agent. ± 106k★ |
| Headroom | [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom): mengompres output tool, log, file, dan potongan RAG sebelum masuk ke LLM. Klaim: token coding agent turun ± 20%, JSON turun 60–95%, jawaban sama. Tersedia sebagai library, proxy, dan MCP server; mendukung `headroom wrap claude`. ± 78k★. **Terkonfirmasi** |
| GSD | [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done): sistem meta-prompting, context engineering, dan spec-driven development untuk Claude Code. ± 64k★. **Status: diarsipkan** (public archive) |
| BMAD Method | [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD): "Breakthrough Method for Agile AI Driven Development". ± 55k★ |

#### 4. Desain & visual
| Plugin | Catatan |
|---|---|
| UI UX Pro Max | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): skill "design intelligence" untuk UI/UX profesional di banyak platform. ± 143k★ |
| Taste | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill): memberi coding agent "selera": art direction, gambar referensi, dan cek di browser supaya tidak menghasilkan halaman AI generik. ± 106k★ |
| Archify | [tt-a1i/archify](https://github.com/tt-a1i/archify): ubah ide, rencana, atau codebase jadi diagram interaktif yang bagus; skill untuk Claude Code, Codex, dll. ± 92k★ |
| Impeccable | [pbakaus/impeccable](https://github.com/pbakaus/impeccable): kosakata desain untuk coding agent. Arahkan dengan *polish* / *bolder*, review dengan *critique* / *audit*, tangkap "AI slop" sebelum rilis. ± 96k★ |
| PPT Master | [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master): AI mengubah dokumen atau topik jadi PowerPoint asli (shape, transisi, animasi, chart berbasis data). ± 71k★ |
| Diagram Design | = #13 `cathrynlavery/diagram-design` |

#### 5. Menulis & video
| Plugin | Catatan |
|---|---|
| Skills by Anthropic | [anthropics/skills](https://github.com/anthropics/skills): repo publik Agent Skills resmi Anthropic. ± 185k★. **Terkonfirmasi** |
| Open Montage | = #17 `calesthio/OpenMontage` |
| Hyperframes | = #14 `heygen-com/hyperframes` |
| Humanizer | [blader/humanizer](https://github.com/blader/humanizer): skill yang menghapus ciri tulisan buatan AI. ± 63k★ |
| I Have ADHD | nama persis belum ketemu. Paling mirip: [alexh/i-really-have-adhd](https://github.com/alexh/i-really-have-adhd), skill yang membentuk output ringkas sesuai jumlah keputusan pembaca (± 12★). Skill ADHD lain: [UditAkhourii/adhd](https://github.com/UditAkhourii/adhd) (tree-of-thought dengan pruning, ± 4,5k★) |
| Marketing Skills | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills): skill marketing untuk Claude Code: CRO, copywriting, SEO, analytics, growth. ± 57k★ |

#### Shortlist 10 skill (komentar IG @mr.penguinnz)
Daftar 10 skill dari sebuah komentar IG. **Semuanya sudah ada di daftar 30 di atas**, jadi ini bisa dianggap "paling sering disebut":
| Skill | Repo |
|---|---|
| Taste Skill | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) |
| Agent Skills | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) |
| Caveman | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) |
| Graphify | [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) |
| UI UX Pro Max | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| Ponytail | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) |
| Anthropic Skills | [anthropics/skills](https://github.com/anthropics/skills) |
| Karpathy Skills | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) |
| Matt Pocock Skills | [mattpocock/skills](https://github.com/mattpocock/skills) |
| Superpowers | [obra/superpowers](https://github.com/obra/superpowers) |

#### Pilihan untuk jualan website
Mengikuti saran video (satu baris dulu):
- **Minggu membangun website:** baris **4. Desain & visual**. Mulai dari UI UX Pro Max atau Impeccable.
- **Minggu bikin konten promosi:** baris **5. Menulis & video**. Coba Marketing Skills atau Humanizer untuk caption/copy website.
- **Kalau token Claude cepat habis:** baris **3**, misalnya Caveman atau Claude Mem.

#### Cek keamanan sebelum memasang plugin
- Baca README dan file konfigurasinya. Perhatikan perintah apa yang dijalankan otomatis (hooks, script, akses internet, akses file).
- Pilih repo yang aktif, punya banyak bintang/kontributor, dan berlisensi jelas.
- Pasang satu per satu, lalu uji.

### 8c. Repo tambahan dari catatan Jualan Website

| Repo | Keterangan (dari catatan) | Catatan asal |
|---|---|---|
| [trailofbits/skills](https://github.com/trailofbits/skills), [raroque/vibe-security-skill](https://github.com/raroque/vibe-security-skill) | - Skill keamanan lain yang ditemukan: [trailofbits/skills](https://github.com/trailofbits/skills) (Trail of Bits, ± 7,9k★) dan [raroque/vibe-security-skill](https://github.com/raroque/vibe-security-skill) (± 1,2k★). | Keamanan - Checklist Sebelum Launch |
| [edisonmbli/refactoring-ui-skill](https://github.com/edisonmbli/refactoring-ui-skill) | - ± 8,2k stars. **Nama pemilik repo tidak terlihat** di screenshot, dan pencarian GitHub dengan nama ini **tidak menemukannya** (2026-10-30). Kemungkinan namanya berbeda atau repo-nya privat/dihapus. Alternatif serupa: Genjutsu (#24) dan [edisonmbli/refactorin | Referensi Desain - Sumber Inspirasi Website |
| [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | **1 & 2. Security Guidance & Frontend Design**: dari direktori plugin resmi Anthropic [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) (± 45k★). Format pasang: | Setup Claude Code - 5 Plugin untuk 5 Titik Buta |
| [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | **5. Chrome DevTools MCP**: [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp): *"Chrome DevTools for coding agents."* ± 55k★, Apache-2.0. **Terkonfirmasi.** | Setup Claude Code - 5 Plugin untuk 5 Titik Buta |
| [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | | 2 | Awesome DESIGN.md | [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | 122.227 | | Skill Desain - Perbaiki UI Buatan AI |
| [nexu-io/open-design](https://github.com/nexu-io/open-design) | | 3 | Open Design | [nexu-io/open-design](https://github.com/nexu-io/open-design) | 102.408 | | Skill Desain - Perbaiki UI Buatan AI |
| [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) | | 6 | React Bits | [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) | 49.689 | | Skill Desain - Perbaiki UI Buatan AI |
| [Nutlope/hallmark](https://github.com/Nutlope/hallmark) | | 8 | Hallmark | [Nutlope/hallmark](https://github.com/Nutlope/hallmark) | 30.374 | | Skill Desain - Perbaiki UI Buatan AI |
| [google-labs-code/design.md](https://github.com/google-labs-code/design.md) | | 9 | Google DESIGN.md | [google-labs-code/design.md](https://github.com/google-labs-code/design.md) | 28.421 | | Skill Desain - Perbaiki UI Buatan AI |
| [oso95/scroll-world](https://github.com/oso95/scroll-world) | | 11 | Scroll World | [oso95/scroll-world](https://github.com/oso95/scroll-world) | 10.264 | | Skill Desain - Perbaiki UI Buatan AI |
| [DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui) | | 12 | Canvas UI | [DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui) | 5.018 | | Skill Desain - Perbaiki UI Buatan AI |
| [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber) | | 1 | **React Three Fiber** | memasukkan library 3D Three.js ke website (React) | kemungkinan `github.com/pmndrs/react-three-fiber` | | Skill Desain - Perbaiki UI Buatan AI |
| [ruucm/shadergradient](https://github.com/ruucm/shadergradient) | | 3 | **Shader Gradient** | gradien bergerak yang halus di React; bisa diatur bentuk, warna, dan gerakannya | kemungkinan `github.com/ruucm/shadergradient` | | Skill Desain - Perbaiki UI Buatan AI |
| [MengTo/threeui](https://github.com/MengTo/threeui) | - **threeui (MengTo)**: https://github.com/MengTo/threeui. MengTo adalah kreator Design+Code. Dari namanya, UI berbasis Three.js/3D. Belum dicek. | Skill Desain - Perbaiki UI Buatan AI |
| [stablyai/orca](https://github.com/stablyai/orca) | - **Orca**: [stablyai/orca](https://github.com/stablyai/orca). Tempat menjalankan banyak coding agent sekaligus (mis. Claude Code) dengan langganan sendiri. ± 111k★. | Skill Desain - Perbaiki UI Buatan AI |
| [can1357/oh-my-pi](https://github.com/can1357/oh-my-pi) | - **Oh-my-pi**: [can1357/oh-my-pi](https://github.com/can1357/oh-my-pi). Coding agent dengan IDE terintegrasi (Stencil Labs). ± 37k★. | Skill Desain - Perbaiki UI Buatan AI |
| [divikwu/figcraft](https://github.com/divikwu/figcraft) | - [divikwu/figcraft](https://github.com/divikwu/figcraft): *"AI-driven Figma plugin that follows design specs. MCP bridge between IDE and Figma."* Plugin Figma + jembatan MCP antara IDE (Claude Code) dan Figma. **Paling cocok** dengan "Claude Code + Figcraft", | Skill Desain - Perbaiki UI Buatan AI |
| [storytold/figcraft](https://github.com/storytold/figcraft) | - [storytold/figcraft](https://github.com/storytold/figcraft): **FigCraft, "Interface design, rebuilt in pure Rust"** (± 3,9k★). Screenshot IG menunjukkan situs ini: frames, auto layout, komponen & variant, vector network, style, variable, dan prototipe dalam  | Skill Desain - Perbaiki UI Buatan AI |

---

## 9. Repo proyek pengguna di GitHub

| Item | Isi |
|---|---|
| Repo | `trayahydro/test-1` — https://github.com/trayahydro/test-1 |
| Branch kerja | `claude/happy-bardeen-srjq1u` (semua pekerjaan ada di sini, belum di-merge ke main) |
| Visibilitas | **Public** — siapa pun bisa melihat isinya. Sarankan pengguna mengubahnya ke **Private** (GitHub → repo → Settings → General → Danger Zone → Change visibility) |
| Isi | `CLAUDE.md`, `catatan/` (vault Obsidian), `pindahan-claude-pribadi/` (rangkuman, setup, skrip ekspor chat), `video/` & `video-3m3/` (mesin & adegan video SWRO), `tts/`, `audio/`, `naskah/`, `contoh-gaya/`, `logo/`, `hasil/` & `hasil-3m3/` (bagian video MP4) |

Cara mengambil di PC (butuh Git + login GitHub):
```
git clone -b claude/happy-bardeen-srjq1u https://github.com/trayahydro/test-1.git traya-proyek
```
Setelah itu jalankan setup: `powershell -ExecutionPolicy Bypass -File traya-proyek\pindahan-claude-pribadi\setup\setup-windows.ps1`.
Untuk menyimpan pekerjaan baru: minta Claude "commit dan push ke branch claude/happy-bardeen-srjq1u".
