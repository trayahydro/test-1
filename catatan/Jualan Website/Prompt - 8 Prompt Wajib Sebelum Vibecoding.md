---
tipe: prompt
sumber: TikTok (carousel, akun belum dicatat)
dibuat: 2026-10-29
status: 4 dari 8 prompt tercatat (prompt 5–8 belum dikirim)
tags: [jualan-website, prompt, vibecoding, workflow]
---

# 8 Prompt Wajib Sebelum Mulai Vibecoding
> *"Biar hasilnya rapi, bukan cuma cepat."*

Dipakai berurutan saat membuat website/aplikasi klien dengan Claude Code.
Kaitan: [[00 Jualan Website (MOC)]] · skill pendukung di [[00 Simpanan Tools AI (MOC)]]
(pm-skills #29, Genjutsu #24, Design DNA #22, Cybersecurity Skills #28).

---

## 1/ Tulis PRD Lengkap
*Berhenti mulai dengan "buatin aplikasi." Mulai dengan spek yang ditulis bareng AI.*

```
Kamu adalah senior product manager. Saya butuh PRD
lengkap untuk produk di bawah ini.

Ide produk: [JELASKAN IDE KAMU]

Sebelum menulis apa pun, tanyakan maksimal 5 pertanyaan
klarifikasi soal target user, scope must-have vs nice-to-have,
batasan teknis, dan seperti apa "selesai" itu. Tunggu jawaban
saya.

Lalu buat PRD dengan bagian berikut:
1. Problem statement — siapa yang dirugikan dan kenapa
2. Target user + 2 persona
3. Goals dan non-goals
4. User stories format "Sebagai... saya ingin... supaya..."
5. Daftar fitur dibagi MVP / v2 / nanti
6. Functional requirement detail per fitur MVP
7. Sketsa data model (entitas + field kunci)
8. Edge case dan failure state
9. Success metrics
10. Open questions

Spesifik dan tegas. Tanpa basa-basi. Kalau ada requirement
ambigu, tandai sebagai pertanyaan terbuka, jangan mengarang
sendiri.
```

## 2/ Full UI & UX Design Brief
*Desain dulu sebelum ngoding. Ini yang bikin aplikasimu nggak keliatan template purple gradient generik.*

```
Kamu adalah senior product designer. Berdasarkan PRD di
atas, buatkan design brief lengkap sebelum satu baris kode
pun ditulis.

Hasilkan:
1. Design principles — 3 aturan yang wajib dipatuhi UI ini
2. Visual direction — mood, referensi, apa yang dihindari
3. Design tokens — palet warna + hex, skala tipografi,
skala spacing, radius, shadow
4. Screen inventory — setiap screen beserta tujuannya
5. User flow — langkah demi langkah tiap journey utama
6. Layout per screen — section, hierarki, primary action,
komponen yang dipakai
7. Component library — tiap komponen reusable + variant
dan state-nya
8. State — empty, loading, error, success, offline untuk
tiap screen kunci
9. Responsive behaviour — mobile, tablet, desktop
10. Accessibility — rasio kontras, focus order, keyboard
nav, kebutuhan ARIA

Ambil keputusan yang tegas dan jelaskan alasannya. Hindari
default yang generic. Kalau pilih font atau warna, jelaskan
kenapa itu cocok untuk produk ini.
```

## 3/ Temukan Celah Keamanan
*Step yang paling sering dilewatin. Jalankan sebelum deploy, bukan sesudah.*

```
Berperanlah sebagai application security engineer yang
melakukan audit pre-launch pada codebase ini.

Review untuk:
- Kelemahan autentikasi dan session handling
- Celah otorisasi (bisa nggak user A akses data user B?)
- Secret, key, atau token hardcoded; apapun sensitif yang
terekspos di client-side
- Risiko injection (SQL, NoSQL, command, XSS)
- API route yang tidak dilindungi atau tidak divalidasi
- Input validation dan sanitization yang hilang
- Rate limiting / proteksi brute force yang hilang
- Insecure direct object reference
- CORS terlalu longgar, security header hilang, cookie
flag tidak aman
- Dependency yang sudah diketahui rentan
- Data sensitif yang bocor ke log atau error response

Untuk tiap temuan, berikan:
- Severity: Critical / High / Medium / Low
- File dan baris
- Cara nyatanya dieksploitasi
- Fix kode yang pasti

Lalu urutkan semua temuan berdasarkan severity. JANGAN
ubah kode apapun sebelum saya approve. Kalau satu kategori
bersih, katakan eksplisit, jangan diam saja.
```

## 4/ Debug Error dengan Cepat
*Membunuh death loop "coba ini… eh coba yang ini deh".*

```
Saya ada bug. JANGAN tulis fix dulu.

Error / perilaku yang tidak diharapkan: [TEMPEL ERROR]
Yang saya harapkan: [JELASKAN]
Yang sebenarnya terjadi: [JELASKAN]
Kode relevan: [TEMPEL ATAU TUNJUK FILE]
Yang sudah saya coba: [DAFTAR]

Langkah 1: Restate masalahnya pakai kata-katamu sendiri
supaya kita satu pemahaman.
Langkah 2: Daftar 3-5 kemungkinan root cause paling
besar, urut berdasarkan probabilitas, tiap poin sertakan
alasan.
Langkah 3: Untuk tiap penyebab, kasih satu cara tercepat
untuk konfirmasi atau eliminasi — satu log line, satu
pengecekan, satu test singkat.
Langkah 4: Berhenti dan tunggu hasil dari saya.
Langkah 5: Setelah penyebabnya terkonfirmasi, baru tulis
fix paling minimal, jelaskan kenapa itu berhasil, dan
beri tahu persis apa yang harus saya tes untuk verifikasi.

Jangan shotgun perubahan. Jangan refactor kode yang tidak
terkait. Jangan benerin hal yang tidak saya minta.
```

## 5/ – 8/ (belum dicatat)
Screenshot slide 5 sampai 8 belum dikirim. Tambahkan nanti.
