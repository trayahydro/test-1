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
| # | Repo | Link | Stars (di video) |
|---|---|---|---|
| 1 | UI/UX Pro Max Skill | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | 137.459 |
| 2 | Awesome DESIGN.md | [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | 122.227 |
| 3 | Open Design | [nexu-io/open-design](https://github.com/nexu-io/open-design) | 102.408 |
| 4 | Taste Skill | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | 99.143 |
| 5 | Impeccable | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | 82.958 |
| 6 | React Bits | [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) | 49.689 |
| 7 | Emil Kowalski Skills | [emilkowalski/skills](https://github.com/emilkowalski/skills) | 47.523 |
| 8 | Hallmark | [Nutlope/hallmark](https://github.com/Nutlope/hallmark) | 30.374 |
| 9 | Google DESIGN.md | [google-labs-code/design.md](https://github.com/google-labs-code/design.md) | 28.421 |
| 10 | GSAP Skills | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | 16.632 |
| 11 | Scroll World | [oso95/scroll-world](https://github.com/oso95/scroll-world) | 10.264 |
| 12 | Canvas UI | [DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui) | 5.018 |

Link dari hasil pencarian GitHub (2026-10-30). Google DESIGN.md terkonfirmasi lewat halaman repo. GSAP Skills = #21 dan Emil Kowalski = #27 di daftar simpanan.

**Keterangan singkat:**
- **Awesome DESIGN.md**: kumpulan file DESIGN.md hasil analisis design system brand terkenal; taruh di project supaya agent membuat UI yang sesuai.
- **Open Design**: workspace agent desain AI kolaboratif, local-first (motion, prototipe, website, app, dashboard, presentasi).
- **React Bits**: library komponen React/Next.js beranimasi dan interaktif, open source terbesar.
- **Hallmark**: skill desain anti-"AI slop" untuk Claude Code, Cursor, dan Codex.
- **Google DESIGN.md**: format spesifikasi resmi Google Labs untuk menjelaskan identitas visual ke coding agent (Apache-2.0, npm `@google/design.md`, masih alpha).
- **Scroll World**: skill yang mengubah brand apa pun jadi landing page dunia 3D yang bisa di-scroll.
- **Canvas UI**: komponen kanvas kreatif (HTML asli + efek WebGL) untuk React, Vue, Svelte, dan vanilla.

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
- Repo di screenshot (`taste-skill/taste-skill`) **tidak ada di GitHub** (404). Repo aslinya **[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)** (± 106k★): memberi coding agent "selera" lewat art direction, gambar referensi, dan cek di browser.
- Perintah `npx install` tidak lazim (biasanya `npm install` atau `npx skills add`). Ikuti README asli saat memasang.

## Figma × Playwright lewat MCP
- Video menunjukkan alur **Figma ⇄ MCP ⇄ Playwright**: desain dibaca dari Figma lewat MCP, dibangun, lalu dicek otomatis di browser dengan Playwright.
- Kaitan: skill `figma-mcp` dan `playwright-tester` di claude-web-design-skills, serta prompt 5 (E2E test).

## Link tambahan
- **Prompt Motion**: https://prompt-motion.com/. Dari namanya, prompt untuk animasi/motion design. Belum dicek.
- **threeui (MengTo)**: https://github.com/MengTo/threeui. MengTo adalah kreator Design+Code. Dari namanya, UI berbasis Three.js/3D. Belum dicek.
- **Orca**: [stablyai/orca](https://github.com/stablyai/orca). Tempat menjalankan banyak coding agent sekaligus (mis. Claude Code) dengan langganan sendiri. ± 111k★.
- **Oh-my-pi**: [can1357/oh-my-pi](https://github.com/can1357/oh-my-pi). Coding agent dengan IDE terintegrasi (Stencil Labs). ± 37k★.

## Claude Code + Figcraft vs Google Stitch
- Klaim dari video TikTok: **Claude Code + Figcraft lebih bagus dari Google Stitch** untuk membuat desain UI.
- **Google Stitch:** tool desain UI berbasis AI dari Google.
- **Figcraft:** dua kandidat di GitHub:
  - [divikwu/figcraft](https://github.com/divikwu/figcraft): *"AI-driven Figma plugin that follows design specs. MCP bridge between IDE and Figma."* Plugin Figma + jembatan MCP antara IDE (Claude Code) dan Figma. **Paling cocok** dengan "Claude Code + Figcraft", walau bintangnya baru ± 5.
  - [storytold/figcraft](https://github.com/storytold/figcraft): **FigCraft, "Interface design, rebuilt in pure Rust"** (± 3,9k★). Screenshot IG menunjukkan situs ini: frames, auto layout, komponen & variant, vector network, style, variable, dan prototipe dalam **aplikasi native** yang langsung terbuka dan jalan offline. Tanpa akun, tanpa telemetri, tanpa langganan. Gratis dan open source (macOS, Windows, Linux, web). Jadi **alternatif Figma gratis**. *Update (IG): kemungkinan inilah FigCraft yang dimaksud, bukan divikwu.*
- **Ide uji:** buat satu landing page yang sama dengan Claude Code + Figcraft dan dengan Google Stitch, lalu bandingkan.

## Rekomendasi setup awal (untuk dicoba di PC lokal)
1. Frontend Design (resmi Anthropic)
2. Taste Skill atau Impeccable (pilih salah satu dulu)
3. UI UX Pro Max
4. Emil Kowalski Skills + GSAP Skills untuk motion

Lalu uji di satu landing page contoh dan bandingkan hasil dengan dan tanpa skill.
