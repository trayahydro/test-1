# SWRO 3 m³/hari untuk Kapal Pesiar: Flow Kerja & Fungsi Komponen
**PT Traya Hydro Indonesia** · draf v0.1 (2 Nov 2026) · acuan: P&ID "3 m³ Sea Water Reverse Osmosis" + model SketchUp

## Keputusan dari user (2 Nov 2026)
1. Cartridge: acuan P&ID 1 housing, tetapi skid memakai **4 housing 20"**: 2× **20 µm** + 2× **5 µm** (sesuai model 3D).
2. Tangki FRP **2 buah** (1054): sand filter + activated carbon (sesuai P&ID).
3. Kapasitas **3 m³/hari = air produk**.
4. Skid versi **tertutup** (panel berpintu & berkisi) yang di video bisa **dibuka & ditutup**.
5. **Tidak menyebut BRIN**. Brand: **PT Traya Hydro Indonesia**.
6. Unit dipasang di **kapal pesiar**, dan kapal digambar detail di video.
7. **Opsional 2–3 membran per skid** untuk kapasitas lebih besar.

---

## 1. Data utama (tipikal)
| Parameter | Nilai |
|---|---|
| Kapasitas air produk | 3 m³/hari (± 125 L/jam) |
| Recovery | 12% (1 membran) |
| Air umpan ke HP pump | ± 25 m³/hari (± 17–20 L/menit) |
| Konsentrat (brine) | ± 22 m³/hari |
| Tekanan operasi | ± 42 bar (desain pompa 60 bar) |
| Membran | 1× SW30-4040 dalam housing FRP 4" (RO-101), flux ± 17 LMH |
| Kualitas produk | TDS tipikal < 300 mg/L (air minum, setelah post-treatment kapal) |
| Pipa | 1" (sisi tekanan rendah) |
| Skid | rangka SS304 hollow 40×40, ± 2,2 × 0,8 × 1,6 m, plat perforated, kaki adjustable + pad karet |

## 2. Flow kerja (urutan aliran)
```
Laut ──► Sea chest kapal ──► SEA WATER IN + ball valve
  ──► [1] Feed pump SS304 0,5 HP
  ──► [2] Tangki FRP 1054 Sand filter      (head manual 3-way valve, backwash drain)
  ──► [3] Tangki FRP 1054 Activated carbon (head manual 3-way valve, backwash drain)
  ──► [4] Cartridge 20" 20 µm ×2  ──► [5] Cartridge 20" 5 µm ×2
  ──► [6] Injeksi antiscalant/biocide (dosing pump + tangki dosing)
  ──► [7] HP pump plunger SS316 (20 L/menit, 60 bar) ──► valve HP + PG feed (± 42 bar)
  ──► [8] Membran RO-101 SW30-4040
        ├─ PERMEAT ──► [9] conductivity meter ──► flowmeter produk ──► PRODUCT OUT
        │              ──► (kapal) tangki air tawar / potable water tank (maks. tinggi 10 m)
        └─ KONSENTRAT ──► PG konsentrat ──► needle valve ──► flowmeter konsentrat ──► DRAIN
                          (flush valve/bypass untuk pembilasan)  ──► (kapal) overboard
```

## 3. Fungsi tiap komponen
| No | Komponen | Fungsi |
|---|---|---|
| 1 | **Inlet air laut + ball valve** | titik masuk air laut dari sea chest kapal; valve untuk membuka/menutup suplai |
| 2 | **Feed pump SS304 0,5 HP** | mendorong air laut melewati filter pretreatment ke sisi hisap HP pump |
| 3 | **Tangki FRP 1054: Sand filter** | menahan pasir, lumpur, dan partikel tersuspensi; dibersihkan dengan **backwash** |
| 4 | **Tangki FRP 1054: Activated carbon** | menyerap klorin, bau, dan zat organik yang dapat merusak membran |
| 5 | **Head manual 3-way valve** | mengatur mode tangki FRP: *service* (operasi), *backwash* (cuci balik), *rinse* (bilas) |
| 6 | **Cartridge 20" 20 µm (×2)** | penyaring kasar tahap 1, menangkap partikel yang lolos dari tangki FRP |
| 7 | **Cartridge 20" 5 µm (×2)** | penyaring halus terakhir sebelum HP pump, melindungi pompa & membran |
| 8 | **Tangki + pompa dosing antiscalant/biocide** | menginjeksi bahan kimia dosis kecil: antiscalant mencegah kerak di membran, biocide mencegah lumut/bakteri |
| 9 | **HP pump plunger SS316 60 bar + motor** | menaikkan tekanan air hingga ± 42 bar, di atas tekanan osmotik air laut (± 27 bar), sehingga air menembus membran |
| 10 | **Valve tekanan tinggi (HP)** | mengisolasi/mengatur aliran tekanan tinggi menuju membran |
| 11 | **Pressure gauge feed (HP)** | memantau tekanan masuk membran |
| 12 | **Housing FRP 4" + membran SW30-4040 (RO-101)** | memisahkan garam: air tawar (permeat) keluar di pipa tengah, garam terbawa konsentrat |
| 13 | **Pressure gauge konsentrat** | memantau tekanan sisi konsentrat; selisih dengan PG feed = ΔP membran (indikator kotor) |
| 14 | **Needle valve konsentrat** | mengatur tekanan kerja & recovery (makin ditutup, tekanan dan produk naik) |
| 15 | **Flush valve (bypass)** | membilas membran dengan aliran cepat bertekanan rendah saat start/stop |
| 16 | **Flowmeter/rotameter produk & konsentrat** | menunjukkan laju aliran, sehingga recovery bisa dihitung & disetel |
| 17 | **Conductivity meter produk** | mengukur kadar garam (TDS) air produk secara kontinu |
| 18 | **Outlet produk (PRODUCT OUT)** | menyalurkan air tawar ke tangki air kapal |
| 19 | **Outlet konsentrat (DRAIN)** | membuang brine ke saluran overboard kapal |
| 20 | **Panel kontrol** (MCB, kontaktor, power supply, display controller, lampu indikator, selector, emergency stop) | menyalakan/mematikan pompa, proteksi listrik, menampilkan status, berhenti darurat |
| 21 | **Rangka skid SS304 + panel tertutup berkisi** | menopang & melindungi komponen; pintu dibuka untuk perawatan, kisi untuk ventilasi |
| 22 | **Kaki adjustable + pad karet** | meratakan skid & meredam getaran (penting di kapal) |

## 4. Mode operasi
| Mode | Langkah singkat |
|---|---|
| **Start** | buka inlet → nyalakan feed pump → flush membran (flush valve terbuka) → nyalakan dosing → nyalakan HP pump → tutup flush valve perlahan, setel needle valve hingga ± 42 bar → cek conductivity, alirkan produk ke tangki |
| **Operasi normal** | pantau PG feed/konsentrat, flowmeter, conductivity; catat tiap shift |
| **Backwash tangki FRP** | putar head 3-way valve ke *backwash* → *rinse* → kembali ke *service* (berkala, mis. harian/mingguan sesuai kekeruhan) |
| **Ganti cartridge** | saat ΔP cartridge naik atau rutin (mis. 1–3 bulan) |
| **Stop** | turunkan tekanan (buka needle valve) → matikan HP pump → flush membran → matikan feed pump & dosing |
| **CIP membran** | bila produk turun ± 10–15% atau ΔP naik; sirkulasi larutan pembersih (opsional, skid terpisah) |

## 5. Konteks kapal pesiar (untuk video)
- Air laut diambil dari **sea chest** (lubang hisap di lambung kapal), lalu ada strainer kapal.
- Skid ditempatkan di **ruang mesin / engine room**, dibaut ke lantai, dengan peredam getaran.
- Produk masuk **tangki air tawar kapal** → (post-treatment kapal: mineralisasi/klorinasi/UV) → distribusi ke kabin, dapur, laundry.
- Brine dibuang **overboard** sesuai aturan pembuangan kapal.
- Keunggulan untuk kapal: **ringkas**, kapasitas sesuai kebutuhan, mengurangi ketergantungan isi air di pelabuhan.

## 6. Opsi 2–3 membran per skid (estimasi, perlu konfirmasi engineering)
| Opsi | Konfigurasi | Perkiraan produk | Catatan |
|---|---|---|---|
| **1 membran** (standar) | 1× SW30-4040 | ± 3 m³/hari | recovery 12% |
| **2 membran** | 2× SW30-4040 (seri dalam 1–2 housing) | ± 5–6 m³/hari | recovery naik ± 20–25%; HP pump & feed disesuaikan |
| **3 membran** | 3× SW30-4040 | ± 8–9 m³/hari | recovery ± 30%; HP pump lebih besar |
Angka opsi 2–3 membran adalah **perkiraan kasar**; ukuran pompa, tekanan, dan recovery final harus dihitung dengan software desain membran (mis. WAVE/ROSA) oleh tim teknik.

## 7. Usulan alur video (ringkas)
1. Pembuka: kapal pesiar di laut, judul + logo Traya
2. Masalah: kebutuhan air tawar di kapal (penumpang, kru, dapur)
3. Solusi: skid SWRO 3 m³/hari di ruang mesin, tertutup → **pintu dibuka**
4. Prinsip osmosis & RO (diagram + grafik tekanan osmotik)
5–12. Perjalanan air: sea chest → feed pump → sand filter → carbon → cartridge 20/5 µm → dosing → HP pump → membran → produk & konsentrat
13. Instrumen & panel kontrol (PG, rotameter, conductivity, emergency stop)
14. Mode operasi & perawatan (backwash, ganti cartridge)
15. Opsi 2–3 membran (skid ditambah membran)
16. Keunggulan Traya → penutup + kontak
