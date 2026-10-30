---
tipe: template
sumber: Instagram Reels (@maxjohnscn, "Documents all vibe coders should know")
dibuat: 2026-10-30
tags: [jualan-website, dokumentasi, template, claude-code, sumber-ig]
---

# 4 Dokumen yang Wajib Diketahui Vibe Coder *(IG)*

Caption: *"Comment DOCS and I'll send you all four…"* (file aslinya belum didapat; isi di bawah ditranskrip dari screenshot).
Kaitan: [[Prompt - 8 Prompt Wajib Sebelum Vibecoding]] (prompt 1 = PRD, prompt 2 = design brief) · [[Mindset - Vibe Coder vs AI Engineer]] · [[00 Jualan Website (MOC)]]

**Struktur folder di video:**
```
AGENTS.md          ← instruksi untuk AI coding agent
ARCHITECTURE.md    ← struktur & cara sistem terhubung
CODE_STYLE.md
DESIGN_SYSTEM.md   ← warna, tipografi, komponen, aturan UI
examples/
PRD.md             ← apa yang dibangun, untuk siapa
README.md
SECURITY.md
TESTING.md
```
Di **Claude Code**, file instruksi yang otomatis dibaca bernama `CLAUDE.md`. Isi AGENTS.md bisa dimasukkan ke sana, atau buat `CLAUDE.md` yang merujuk ke AGENTS.md.

---

## 1. AGENTS.md: *"Tells your AI coding agent how to understand and work on your project."*
**Agent Instructions**: pedoman untuk AI coding agent di project ini.
- **01 Purpose:** instruksi, konteks, dan aturan untuk AI agent (Claude Code, Cursor, Copilot) supaya kodenya konsisten dan berkualitas.
- **02 Before You Start:** baca PRD.md (tujuan produk) · baca DESIGN_SYSTEM.md (aturan UI) · baca ARCHITECTURE.md (struktur) · cek komponen yang sudah ada · pahami struktur folder.
- **03 General Rules:** pakai TypeScript dan Next.js 14+ · ikuti design system · pakai ulang komponen yang ada · kode modular dan skalabel · jangan membuat file yang tidak perlu.
- **04 Code Guidelines:** functional components · nama yang bermakna · komponen kecil · ikuti CODE_STYLE.md · kode aksesibel dan semantik.
- **05 Security:** jangan pernah mengekspos API key · pakai environment variables · validasi semua input user · tangani error · ikuti SECURITY.md.
- **06 Useful Commands:** `npm install` · `npm run dev` · `npm run build` · `npm run test`
- **07 Need Help?:** kalau ragu, cek docs di `/docs`, lihat contoh kode yang ada, ikuti pola yang sudah ada, dan **tanya dulu sebelum membuat perubahan besar**.

## 2. PRD.md: *"Defines what you're building, who it's for, and what it needs to do."*
Contoh di video (produk "AI Portfolio Builder"):
- **01 Product Overview:** nama, tagline ("Build a stunning portfolio in minutes with AI"), deskripsi.
- **02 Problem:** banyak kreator kesulitan menampilkan karya secara profesional karena kendala teknis, waktu, dan skill desain.
- **03 Goal:** pengguna bisa meluncurkan portfolio profesional dalam < 10 menit dengan AI.
- **04 Target Users:** kreator, pelajar, freelancer, pencari kerja, pemilik usaha kecil.
- **05 Core Features:** generate website dengan AI · template yang bisa diubah · showcase project · publish satu klik ke domain sendiri · analytics.
- **06 Success Metrics:** 10.000+ pengguna dalam 6 bulan · 70% pengguna mempublikasikan portfolio · kepuasan ≥ 4,5/5.

## 3. DESIGN_SYSTEM.md: *"Defines your colours, typography, spacing, components, and UI rules."*
- **01 Brand Identity:** nama + tagline ("Empowering creators with modern tools"), nilai: simpel, kreatif, teknologi.
- **02 Color Palette:** Primary, Accent, Secondary, Background, Success, Error, Warning, Muted (masing-masing dengan kode hex).
- **03 Typography:** font **Inter**; skala H1 64/72px Bold · H2 48/56 Semibold · H3 32/40 Semibold · H4 24/32 Medium · Body 16/24 Regular · Caption 14/20 Regular.
- **04 Spacing:** sistem 8px (4, 8, 16, 24, 32, 48, 64px).
- **05 Border Radius:** 4, 8, 12, 16, 24px, full.
- **06 Components:** tombol (Primary, Secondary, Ghost), input field, badge (Default, Success, Warning, Error, Info).
- **07 Icons:** Lucide React.
- **08 Breakpoints:** Mobile < 640px · Tablet 640–1024 · Laptop 1024–1440 · Desktop > 1440px.

## 4. ARCHITECTURE.md: *"Explains how your app is structured and how its systems connect."*
- **01 System Overview:** Client (web/mobile) → Frontend (Next.js 14) → Backend & APIs (Supabase), plus Auth (Clerk), Payments (Stripe), Emails (Resend), Deployment (Vercel).
- **02 Tech Stack:** Frontend Next.js 14, React, TypeScript, Tailwind · Backend Supabase (Postgres, Auth, Storage) · Auth Clerk · Payments Stripe · Email Resend · Analytics PostHog · Monitoring Sentry · Deployment Vercel. *(Sama dengan [[Stack - 20 Dolar per Bulan Startup Stack]].)*
- **03 Project Structure:**
  ```
  my-app/
  ├ app/          # App routes
  ├ components/   # Reusable UI
  ├ lib/          # Utilities
  ├ hooks/        # Custom hooks
  ├ services/     # API services
  ├ types/        # TS types
  ├ public/       # Static assets
  ├ docs/         # Project docs
  └ package.json
  ```
- **04 Data Flow:** user berinteraksi dengan frontend → request ke Supabase → data diproses dan disimpan → respons kembali ke frontend → UI update real-time.
- **05 Scalability:** arsitektur modular · caching · background jobs untuk tugas lama · monitoring dan alert · deployment multi-region saat pengguna bertambah.

---

## Penerapan untuk website klien
Buat 4 dokumen ini **di awal setiap project klien** (Claude bisa membuatkan semuanya):
```
Berdasarkan hasil wawancara klien berikut: [CATATAN KLIEN]
buatkan 4 dokumen di root project:
1. PRD.md: overview bisnis klien, masalah, tujuan website, target pengunjung, fitur inti, ukuran sukses
2. DESIGN_SYSTEM.md: warna brand (hex), tipografi, spacing 8px, radius, komponen, ikon, breakpoint
3. ARCHITECTURE.md: stack (Next.js + Tailwind + shadcn/ui, deploy Cloudflare Pages), struktur folder, alur data
4. AGENTS.md (dan CLAUDE.md yang merujuk ke sana): aturan kerja agent, keamanan, perintah npm
Tanyakan dulu hal yang belum jelas sebelum menulis.
```
- PRD sejalan dengan prompt 1, DESIGN_SYSTEM dengan prompt 2 (design brief).
- Simpan versi kosongnya sebagai **template** untuk semua klien berikutnya (sejalan dengan prompt 8, jadikan skill).
