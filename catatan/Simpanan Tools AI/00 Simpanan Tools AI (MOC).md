---
tipe: moc
topik: simpanan tools & repo AI dari TikTok/IG
dibuat: 2026-10-29
diperbarui: 2026-10-29
tags: [simpanan, tools-ai, github, inbox]
---

# Simpanan Tools AI

Daftar tools dan repo yang disimpan dari TikTok/Instagram. **Bukan khusus untuk project jualan website.**
Status: dicatat dari screenshot dan link yang dikirim user, isi repo **belum dicek langsung**
(sesi cloud tidak punya akses ke repo-repo ini). Deskripsi di bawah hanya berdasarkan teks yang
terlihat di screenshot. Repo yang hanya dikirim sebagai link belum ada deskripsinya.

## Daftar

| # | Nama | Link | Kategori | Sumber |
|---|------|------|----------|--------|
| 1 | Openjutsu | https://github.com/D3voz/openjutsu | Video AI: tukar karakter/objek | screenshot |
| 2 | huashu-motion | belum ada link (cari di GitHub) | Video: film peluncuran produk | screenshot |
| 3 | premiere-pro-mcp | https://github.com/leancoderkavy/premiere-pro-mcp | Edit video: Premiere Pro × AI | screenshot |
| 4 | 20 Video Effects Created by Claude | belum ada link | Efek video buatan Claude | screenshot |
| 5 | Agent Reach | belum ada link (cari di GitHub) | AI agent: akses internet | screenshot |
| 6 | harvey | https://github.com/ethanplusai/harvey | belum dicek | link |
| 7 | freefield | https://github.com/neuregex/freefield | belum dicek (open source) | link |
| 8 | voicebox | https://github.com/jamiepine/voicebox | belum dicek | link |
| 9 | Adobe_Premiere_Pro_MCP | https://github.com/hetpatel-11/Adobe_Premiere_Pro_MCP | Edit video: Premiere Pro × Claude Code | screenshot |
| 10 | Concat | belum ada link | Editor video gratis (pengganti CapCut) | screenshot |
| 11 | rea | https://github.com/morluto/rea | MCP: reverse engineering aplikasi | screenshot |
| 12 | skills (Matt Pocock) | https://github.com/mattpocock/skills | Agent skills untuk Claude | screenshot |
| 13 | diagram-design | https://github.com/cathrynlavery/diagram-design | Skill: 44 jenis diagram HTML+SVG | screenshot |

## Detail per item

### 1. Openjutsu
- **Link:** https://github.com/D3voz/openjutsu (lisensi MIT)
- **Fungsi:** tukar karakter atau objek di video dengan satu klik ("gaya Genjutsu"). Masukkan sebuah video dan foto karakter, tekan **Generate**, lalu orang utama di video diganti dengan karakter tersebut. Bisa juga mengganti rambut atau baju, menghapus sesuatu, atau menaruh orang di tempat lain. Kamera, potongan adegan, gerakan, dan soundtrack tetap sama.
- **Fitur:** banyak orang sekaligus (pilih siapa diganti siapa), *object swap* (cat area yang mau diganti), *from picture* (tampilan dan tempat baru dari satu gambar), *post-processing* (perbaiki wajah).
- **Teknologi:** jalan dengan model terbuka **di GPU sendiri**: MiniMax H3 untuk video, SAM 3.1 untuk melacak orang, Qwen3-VL 8B untuk mendeskripsikan gambar dan shot. Front end Next.js kecil di atas workflow **ComfyUI** (pakai `@comfyorg/sdk`, mengikuti contoh `comfy-reshoot`).
- **Catatan:** butuh GPU yang kuat, jadi tidak cocok untuk laptop dengan grafis bawaan.

### 2. huashu-motion
- **Tagline:** *"Commercial-grade product launch films, in one go."* Membuat film peluncuran produk kelas komersial sekaligus.
- **Badge yang terlihat:** License MIT, **Agent Skills** Standard, berarti berupa skill untuk AI agent (misalnya Claude).
- **Link:** belum ada, cari "huashu-motion" di GitHub.
- **Relevan untuk:** video promosi produk, misalnya video SWRO Traya berikutnya.

### 3. premiere-pro-mcp
- **Link:** https://github.com/leancoderkavy/premiere-pro-mcp (publik)
- **Isi repo yang terlihat:** folder `cep-plugin`, `chat-plugin`, `landing`, `scripts`, `src`.
- **Dugaan dari nama:** MCP server yang menghubungkan AI (Claude) ke **Adobe Premiere Pro** supaya bisa mengedit video lewat chat. Belum dicek.
- **Dari video:** "Step 2: Grab this repo". Clone atau download ZIP repo ini sebagai salah satu langkah tutorial.

### 4. 20 Video Effects Created by Claude
- Video yang memamerkan 20 efek video buatan Claude:
  01 Orbit · 02 Chat Takeover · 03 Frame Escape · 04 Snap Zoom · 05 Checklist Pop · 06 Headline Stack ·
  07 Zoom Portal · 08 Growth Curve · 09 Studio Reveal · 10 B-roll Overlay · 11 Paper Cutout · 12 Dolly Zoom ·
  13 Magazine Cover · 14 Liquid Glass · 15 Zoom Through Cut · 16 Green Screen · 17 Frame Break ·
  18 Digital Zoom · 19 Phone Mockup · 20 Checklist
- Beberapa nama di sisi kiri terpotong di screenshot (05, 06, 08), jadi ditulis berdasarkan perkiraan.
- **Link/repo:** belum ada.
- **Relevan untuk:** konten TikTok/IG, video jualan website, promo produk.

### 5. Agent Reach
- **Tagline (Mandarin):** 给你的 AI Agent 一键装上互联网能力, artinya "satu klik memberi AI Agent kemampuan akses internet". Memilih, memasang, dan mengecek cara akses yang paling stabil, jadi kalau cara aksesnya berubah pengguna tidak perlu repot.
- **Badge:** GitHub Trending **#1 Repository of the Day**, Global Rank #142, lisensi MIT, Python 3.10+, ± 98K stars.
- **Fitur yang terlihat:** *BrowserAct*, yaitu mengambil data dari situs rumit seperti Amazon, LinkedIn, X, dan Google Maps dengan perintah bahasa biasa. Agent memakai browser asli, menghasilkan bot pengambil data yang bisa dipakai ulang, dan mengembalikan hasil terstruktur.
- **Link:** belum ada, cari "Agent Reach" di GitHub.
- **Relevan untuk:** riset prospek dan lead (misalnya data bisnis dari Google Maps untuk calon klien website).

### 6. harvey
- **Link:** https://github.com/ethanplusai/harvey
- **Fungsi:** belum dicek.

### 7. freefield
- **Link:** https://github.com/neuregex/freefield (open source)
- **Fungsi:** belum dicek.

### 8. voicebox
- **Link:** https://github.com/jamiepine/voicebox
- **Fungsi:** belum dicek. Dari namanya kemungkinan terkait suara/TTS. Kalau benar, bisa jadi alternatif voice-over natural untuk video.

### 9. Adobe_Premiere_Pro_MCP
- **Link:** https://github.com/hetpatel-11/Adobe_Premiere_Pro_MCP (publik, ± 684 stars, 129 fork). Nama pemilik dibaca dari URL di screenshot.
- **Fungsi:** MCP untuk Adobe Premiere Pro, sehingga Premiere bisa dikendalikan dari **Claude Code**.
- **Catatan:** mirip dengan item 3 (premiere-pro-mcp). Nanti bandingkan mana yang lebih bagus.

### 10. Concat
- **Tagline:** *"The free, open-source, cross-platform CapCut replacement."* Editor video gratis dan open source, jalan di Windows, Mac, dan Linux, sebagai pengganti CapCut.
- **Tampilan:** mirip CapCut (timeline, teks, panel tipografi).
- **Link:** belum ada, cari "Concat CapCut replacement" di GitHub.
- **Relevan untuk:** edit konten TikTok/IG tanpa langganan CapCut Pro.

### 11. rea (morluto/rea)
- **Tagline:** *"One MCP that lets your AI agent reverse engineer apps, all the way down to the binary."* Satu MCP yang memungkinkan AI agent membongkar (reverse engineer) aplikasi sampai level binary.
- **Angka di screenshot:** ★ 275.523, +239.477 minggu ini, MIT. Angkanya tidak wajar, jadi perlu dicek ulang.
- **Relevan untuk:** keperluan teknis/riset. Kemungkinan tidak terlalu relevan untuk jualan website.

### 12. skills (mattpocock/skills)
- **Tagline:** *"Agent skills straight from a working engineer's own setup."* Kumpulan agent skill dari setup pribadi seorang engineer ("AI Skills for Real Engineers").
- **Angka:** ★ 293.108, +12.147 minggu ini, MIT.
- **Cara pasang di Claude Code:**
  ```
  claude plugin install mattpocock-skills@claude-plugins-official
  ```
- **Relevan untuk:** membuat website dengan Claude Code lebih rapi.

### 13. diagram-design (cathrynlavery/diagram-design)
- **Tagline:** *"44 diagram types as clean HTML + SVG, for Claude Code, Codex, Cursor and more."* Skill untuk membuat 44 jenis diagram yang rapi ("Editorial diagrams your designer won't hate").
- **Angka:** ★ 56.037, +10.237 minggu ini, MIT.
- **Cara pasang:**
  ```
  npx skills add cathrynlavery/diagram-design
  ```
- **Relevan untuk:** diagram alur di website klien, proposal, dan presentasi (misalnya diagram proses SWRO).

## Yang perlu dicek nanti (di PC lokal)
- [ ] Buka 3 link tanpa deskripsi (harvey, freefield, voicebox), lalu isi fungsinya.
- [ ] Cari link huashu-motion, Agent Reach, Concat, dan sumber "20 Video Effects".
- [ ] Bandingkan 2 MCP Premiere Pro (item 3 dan 9).
- [ ] Cek kebutuhan hardware tiap tool. Laptop: Ryzen 3 5300U, Radeon bawaan, RAM 8 GB.
- [ ] Tandai mana yang relevan untuk [[00 Jualan Website (MOC)|Jualan Website]].
