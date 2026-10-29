---
tipe: referensi
sumber: TikTok (beberapa video tentang skill desain untuk Claude Code)
dibuat: 2026-10-29
tags: [jualan-website, desain, skill, claude-code, tools]
---

# Skill Desain: Memperbaiki UI Buatan AI

Tujuan: website klien **tidak terlihat seperti "template AI"** (purple gradient generik).
Kaitan: [[00 Jualan Website (MOC)]] · [[Referensi Desain - Sumber Inspirasi Website]] · [[00 Simpanan Tools AI (MOC)]]

## "Probably the best design setup in Claude Code" (5 lapis)
| # | Skill | Peran |
|---|---|---|
| 01 | **Impeccable** | kualitas desain |
| 02 | **Frontend Design** | resmi dari Anthropic |
| 03 | **Taste Skill** | selera visual |
| 04 | **UI UX Pro Max** | pengetahuan desain |
| 05 | **Emil's skills** (emilkowalski, #27) | motion & interaksi |

**The full pack (tools):** Claude · Cursor · Figma · Vercel · Supabase · Raycast

## 12 GitHub Repos That Fix AI-Generated UI
| # | Repo | Stars (di video) |
|---|---|---|
| 1 | UI/UX Pro Max Skill | 137.459 |
| 2 | Awesome DESIGN.md | 122.227 |
| 3 | Open Design | 102.408 |
| 4 | Taste Skill | 99.143 |
| 5 | Impeccable | 82.958 |
| 6 | React Bits | 49.689 |
| 7 | Emil Kowalski Skills | 47.523 |
| 8 | Hallmark | 30.374 |
| 9 | Google DESIGN.md | 28.421 |
| 10 | GSAP Skills | 16.632 |
| 11 | Scroll World | 10.264 |
| 12 | Canvas UI | 5.018 |

Link per repo belum ada, cari namanya di GitHub. GSAP Skills = #21 dan Emil Kowalski = #27 di daftar simpanan.

## Taste Skill (detail dari screenshot README)
- *"A collection of skills that improve how AI tools write frontend. AI builds modern, premium designs with proper animation, typography, spacing, layout, visual hierarchy and design taste."*
- **Fungsi:** membantu AI membuat desain yang lebih baik dan disengaja lewat tipografi, spacing, layout, animasi, hierarki visual, dan selera desain. Berisi skill, prompt, dan panduan yang bisa dipakai ulang supaya UI buatan AI terlihat rapi dan sesuai brand.
- **Pasang:**
  ```
  npx install taste-skill
  ```
- **Pakai (contoh di README):**
  ```js
  import { createDesign } from 'taste-skill'
  const result = createDesign({
    intent: 'modern website',
    style: 'premium',
  })
  console.log(result)
  ```
- Repo di screenshot: `taste-skill/taste-skill`, v1.2.0, MIT, ± 482 stars. Angka ini beda jauh dengan 99.143 di daftar 12 repo, jadi **kemungkinan repo berbeda**. Cek yang asli.
- Perintah `npx install` tidak lazim (biasanya `npm install` atau `npx skills add`). Ikuti README asli saat memasang.

## Figma × Playwright lewat MCP
- Video menunjukkan alur **Figma ⇄ MCP ⇄ Playwright**: desain dibaca dari Figma lewat MCP, dibangun, lalu dicek otomatis di browser dengan Playwright.
- Kaitan: skill `figma-mcp` dan `playwright-tester` di claude-web-design-skills, serta prompt 5 (E2E test).

## Link tambahan
- **Prompt Motion**: https://prompt-motion.com/. Dari namanya, prompt untuk animasi/motion design. Belum dicek.
- **threeui (MengTo)**: https://github.com/MengTo/threeui. MengTo adalah kreator Design+Code. Dari namanya, UI berbasis Three.js/3D. Belum dicek.
- **Orca** dan **Oh-my-pi**: disebut sebagai *coding agent*. Link belum ada, cari namanya.

## Claude Code + Figcraft vs Google Stitch
- Klaim dari video TikTok: **Claude Code + Figcraft lebih bagus dari Google Stitch** untuk membuat desain UI.
- **Google Stitch:** tool desain UI berbasis AI dari Google.
- **Figcraft:** link dan cara kerjanya belum dicatat. Dari namanya kemungkinan terkait Figma (desain di Figma dikerjakan oleh Claude Code). *Cek di PC lokal.*
- **Ide uji:** buat satu landing page yang sama dengan Claude Code + Figcraft dan dengan Google Stitch, lalu bandingkan.

## Rekomendasi setup awal (untuk dicoba di PC lokal)
1. Frontend Design (resmi Anthropic)
2. Taste Skill atau Impeccable (pilih salah satu dulu)
3. UI UX Pro Max
4. Emil Kowalski Skills + GSAP Skills untuk motion

Lalu uji di satu landing page contoh dan bandingkan hasil dengan dan tanpa skill.
