# CLAUDE.md — Memori Proyek (baca ini dulu setiap sesi)

Proyek milik pengguna (PT Traya Hydro Indonesia + usaha jasa website). Folder ini adalah hasil
pindahan dari sesi Claude Code cloud. Rangkuman lengkap ada di `pindahan-claude-pribadi/`.

## Siapa pengguna & cara bicara
- Pengguna berbahasa **Indonesia**, menyebut dirinya awam di bidang coding → jelaskan dengan bahasa
  sederhana, pakai perumpamaan, tabel ringkas, dan langkah bernomor.
- Jujur soal batasan, tandai angka perkiraan sebagai **"tipikal"/"estimasi"**.
- Jangan minta pengguna menempel token/API key di chat. Simpan di file `.env` (tidak di-commit) atau
  pengaturan environment.

## Aturan tetap
1. **Jangan menyebut nama klien/proyek tertentu** di video, dokumen untuk publik, atau commit
   (khusus: jangan sebut nama instansi pemesan video 3 m³). Brand di video: **PT Traya Hydro Indonesia**.
2. Kontak di video: The Smith Alam Sutera SOHO-D/10/1009, Tangerang · +62 823 110 110 29 · www.trayahydro.com
3. Laporan progres: hanya kabari saat **hampir selesai, selesai, atau ada masalah** (tidak tiap 15 menit).
4. Render panjang boleh dilanjutkan otomatis (render memakai potongan, bisa disambung).
5. Jangan membuat Pull Request kecuali diminta.

## Peta folder
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

## Status pekerjaan terakhir
- Video kontainer SWRO (10:00, VO Ardi) — **selesai**, revisi Pak Jimmy sudah masuk.
- Video SWRO 3 m³ kapal pesiar (6:37, VO Ardi) — **selesai + revisi** (kaca kapal tidak berkedip,
  ruang mesin terlihat di tampilan X-ray). Angka opsi 2–3 membran masih **estimasi**, tunggu konfirmasi.
- Jualan website — catatan lengkap; paket & harga sudah disusun; PRD klien fashion v0.2; proposal belum dibuat.
- Pelajaran web developer — Pelajaran 1 selesai; berikutnya **Pelajaran 2: Frontend**.

## Perintah penting
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
