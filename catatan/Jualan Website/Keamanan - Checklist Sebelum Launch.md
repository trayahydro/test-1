---
tipe: checklist
sumber: Instagram (@cooked_dev + screenshot repo security-audit-skill)
dibuat: 2026-10-30
tags: [jualan-website, keamanan, checklist, sebelum-launch, sumber-ig]
---

# Keamanan: Checklist Sebelum Launch Website/Aplikasi

Dipakai **sebelum website klien diserahkan atau go-live**. Melengkapi prompt 3 (Temukan Celah Keamanan)
di [[Prompt - 8 Prompt Wajib Sebelum Vibecoding]] dan Cybersecurity Skills (#28) di [[00 Simpanan Tools AI (MOC)]].

## 20 hal yang perlu dikerjakan Claude sebelum launch (@cooked_dev, IG)
| # | Item | Arti singkat |
|---|---|---|
| 1 | Hide API keys | API key jangan ada di kode frontend; simpan di env server |
| 2 | Purge Git secrets | hapus secret yang terlanjur masuk riwayat Git |
| 3 | Use public DB key | di frontend hanya pakai key publik (mis. Supabase anon key), bukan service key |
| 4 | Enable RLS | aktifkan Row Level Security di database (Supabase/Postgres) |
| 5 | Encrypt sensitive data | enkripsi data sensitif |
| 6 | Enforce server-side auth | cek login/izin di server, bukan hanya di tampilan |
| 7 | Lock record access | user hanya bisa akses datanya sendiri |
| 8 | Block field tampering | user tidak bisa mengubah field terlarang (mis. role, harga) lewat request |
| 9 | Secure session cookies | cookie sesi pakai HttpOnly, Secure, SameSite |
| 10 | Hash passwords | password disimpan dalam bentuk hash (bcrypt/argon2) |
| 11 | Rate limit login | batasi percobaan login (cegah brute force) |
| 12 | Add bot protection | captcha/turnstile di form |
| 13 | Parameterize queries | query database pakai parameter (cegah SQL injection) |
| 14 | Validate all input | validasi semua input di server |
| 15 | Escape user content | escape konten dari user (cegah XSS) |
| 16 | Restrict file uploads | batasi tipe & ukuran file upload |
| 17 | Trim API responses | API hanya mengirim data yang perlu |
| 18 | Add security headers | CSP, HSTS, X-Frame-Options, dst. |
| 19 | Force HTTPS | semua lalu lintas lewat HTTPS |
| 20 | Scan dependencies | cek library yang rentan (npm audit, dll.) |

**Untuk website company profile statis:** yang relevan terutama #1, #2, #12, #16, #18, #19, #20.
Item lain penting kalau ada login, database, atau form/pembayaran.

**Prompt cepat untuk Claude:**
```
Sebelum launch, periksa codebase ini terhadap 20 poin keamanan berikut
dan laporkan status tiap poin (aman / bermasalah / tidak relevan) beserta
file dan perbaikannya. Jangan ubah kode sebelum saya setujui:
1 Hide API keys · 2 Purge Git secrets · 3 Use public DB key · 4 Enable RLS ·
5 Encrypt sensitive data · 6 Enforce server-side auth · 7 Lock record access ·
8 Block field tampering · 9 Secure session cookies · 10 Hash passwords ·
11 Rate limit login · 12 Add bot protection · 13 Parameterize queries ·
14 Validate all input · 15 Escape user content · 16 Restrict file uploads ·
17 Trim API responses · 18 Add security headers · 19 Force HTTPS · 20 Scan dependencies
```
Prompt ini disusun dari checklist di atas dan bukan bagian dari video aslinya.

## security-audit-skill (repo GitHub)
- **Deskripsi:** *"A coding-agent skill for multi-phase security audits with independently verified, machine-readable findings."*
- **Isi README:** skill yang mengubah agent menjadi **security auditor**. Skill ini mengatur agent-agent terpisah melalui tahap reconnaissance, perburuan berbasis cakupan (coverage-led hunting), validasi kandidat temuan, output terstruktur, verifikasi independen, dan laporan yang netral terhadap target.
- **Asal:** skill inilah yang menjadi cikal bakal *vulnerability discovery harness* milik **Cloudflare** (artikel "Build your own vulnerability harness"). Harness itu kemudian berkembang menjadi sistem multi-tahap.
- **6 fase audit** (2 yang terlihat di screenshot):
  1. **Reconnaissance**: memetakan arsitektur, batas kepercayaan (trust boundary), permukaan input, bukti sebelumnya, dan cakupan deterministik di `architecture.md` dan `coverage-ledger.json`.
  2. **Coverage-led hunting**: menugaskan "hunter" terpisah dari unit ledger, mencatat pengecekannya, dan memakai coverage critics…
  3–6. Belum terlihat di screenshot.
- **Angka:** ± 50,6k stars, 3,2k fork, MIT, 14 commit, kontributor literally-dan dan CooperSheroy (Sheroy Cooper).
- **Link:** **https://github.com/cloudflare/security-audit-skill** (milik organisasi Cloudflare, ± 53k★; ketemu lewat pencarian GitHub 2026-10-30).
- **Semgrep** (#34, https://github.com/semgrep/semgrep, sumber IG): scanner kode otomatis untuk bug & celah keamanan. Cocok dijalankan bersama poin #13–15 dan #20 checklist di atas.
- Skill keamanan lain yang ditemukan: [trailofbits/skills](https://github.com/trailofbits/skills) (Trail of Bits, ± 7,9k★) dan [raroque/vibe-security-skill](https://github.com/raroque/vibe-security-skill) (± 1,2k★).
- **Relevan untuk:** audit menyeluruh sebelum serah terima website/aplikasi klien yang punya login atau database.
