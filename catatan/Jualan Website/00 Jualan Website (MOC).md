---
tipe: moc
topik: bisnis jualan jasa website
dibuat: 2026-10-29
diperbarui: 2026-10-29
tags: [jualan-website, moc]
---

# Jualan Website

> **Status materi TikTok: lengkap** (semua video yang disimpan sudah dicatat per 2026-10-29).
> **Materi IG: sedang dicatat** (mulai 2026-10-30, ditandai *(IG)*).
> **Untuk Claude di PC lokal, mulai dari sini:**
> 1. Baca catatan di tabel bawah, lalu [[00 Simpanan Tools AI (MOC)]] (31 tools/repo/skill).
> 2. Kerjakan checklist "Yang perlu dicek nanti" di catatan simpanan (link yang belum ada, repo yang belum dicek).
> 3. Pasang setup desain + skill web, lalu uji di satu landing page contoh.
> 4. Lanjut isi topik bisnis yang masih kosong (cari klien, harga, portofolio).

Halaman induk project jualan jasa pembuatan website. Materi dikumpulkan dari video TikTok/IG
yang disimpan user, dalam bentuk screenshot.

## Catatan
| Catatan | Isi | Status |
|---|---|---|
| [[Prompt - 8 Prompt Wajib Sebelum Vibecoding]] | PRD, design brief, audit keamanan, debug, E2E test, cleanup, commit, task→skill | lengkap 8/8 |
| [[Stack - 20 Dolar per Bulan Startup Stack]] | 14 layanan (Claude, Supabase, Vercel, dst.) ± $20/bulan, plus catatan versi Indonesia | lengkap |
| [[Referensi Desain - Sumber Inspirasi Website]] | Refero Styles, Motionsites, Pinterest, claude-web-design-skills | lengkap |
| [[Skill Desain - Perbaiki UI Buatan AI]] | Setup desain 5 lapis, 12 repo perbaiki UI AI, Taste Skill, Figma×Playwright MCP, Figcraft vs Google Stitch | lengkap |
| [[Keamanan - Checklist Sebelum Launch]] *(IG)* | 20 poin keamanan sebelum launch + security-audit-skill (asal harness Cloudflare) | lengkap |
| [[Mindset - Vibe Coder vs AI Engineer]] *(IG)* | Putuskan stack/integrasi/desain dulu, format prompt Goal-Context-Constraints-Done, **3 level pengguna Claude Code** | lengkap |
| [[Panduan - Jadi AI Engineer & Stack Pilihan]] | Alur kerja per klien, stack utama, tambahan per paket (Basic/Standard/Pro) | lengkap |
| [[Strategi - Bangun Software & Outreach Otomatis]] *(IG)* | Claude Code + Supabase, outreach DM/email otomatis (GrokBot / harvey) | lengkap |
| [[Connector - 5 Connector Wajib untuk Claude]] *(IG)* | Perplexity, Firecrawl, Playwright, PostHog, Composio | lengkap |
| [[WhatsApp Agent - Kapso]] *(IG)* | Agent WA booking otomatis lewat Claude Code + Kapso; ide paket upsell | lengkap |
| [[SEO - Checklist Supaya Website Muncul di Google]] *(IG)* | Search Console, sitemap, SEO & GEO, meta tag, Google Business Profile | lengkap |
| [[Hemat Biaya - Pembagian Model Claude (Opus, Sonnet, Haiku)]] *(IG)* | Opus merencanakan, Sonnet membangun, Haiku mencari; `/model opusplan` | lengkap |
| [[Dokumen Project - 4 Dokumen Wajib Vibe Coder]] *(IG)* | Template AGENTS.md, PRD.md, DESIGN_SYSTEM.md, ARCHITECTURE.md | lengkap |
| [[Automasi - Contoh Alur Bisnis Jasa (Plumber)]] *(IG)* | Alur automasi booking → konfirmasi → rute → laporan AI → invoice → ulasan; ide paket jasa lapangan | lengkap |
| [[Workflow - Handoff untuk Mencegah Context Rot]] *(IG)* | handoff.md (6 bagian) + /clear, lebih baik dari /compact | lengkap |

## Alur kerja membuat website klien (sementara, dari materi yang ada)
1. **PRD + dokumen project** ([[Dokumen Project - 4 Dokumen Wajib Vibe Coder|4 dokumen]]): prompt 1. Gali kebutuhan klien, tentukan MVP, putuskan stack/integrasi/desain ([[Mindset - Vibe Coder vs AI Engineer|cara AI Engineer]]).
2. **Design brief**: prompt 2. Cari referensi di Refero / Motionsites / Pinterest, lalu tiru gayanya dengan Design DNA (#22).
3. **Bangun**: Claude Code + setup desain (lihat [[Skill Desain - Perbaiki UI Buatan AI]]) + skill web: Genjutsu (#24), GSAP (#21), emilkowalski/skills (#27), Three.js (#20) kalau perlu 3D.
4. **Audit SEO** ([[SEO - Checklist Supaya Website Muncul di Google|checklist SEO]]) dan **audit keamanan sebelum serah terima**: prompt 3, [[Keamanan - Checklist Sebelum Launch|checklist 20 poin]], security-audit-skill (#32), Cybersecurity Skills (#28).
5. **Debug saat ada masalah**: prompt 4.
6. **Uji & rapikan**: prompt 5 (E2E Playwright), prompt 6 (cleanup), prompt 7 (commit rapi).
7. **Jadikan skill**: prompt 8. Tiap pekerjaan berulang (misalnya "bikin landing page UMKM") disimpan jadi skill.

**Pola utama:** kasih role, paksa jeda, kunci output.

Nomor `#` merujuk ke [[00 Simpanan Tools AI (MOC)]].

## Topik yang belum ada materinya
- [ ] Cara cari klien (awal: [[Strategi - Bangun Software & Outreach Otomatis]])
- [ ] Harga & paket (ide upsell: agent WhatsApp ([[WhatsApp Agent - Kapso]]), automasi bisnis jasa ([[Automasi - Contoh Alur Bisnis Jasa (Plumber)]]))
- [ ] Portofolio
- [ ] Closing & kontrak
- [ ] Hosting, domain & maintenance (sebagian ada di catatan Stack)
