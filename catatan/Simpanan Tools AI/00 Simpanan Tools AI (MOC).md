---
tipe: moc
topik: simpanan tools & repo AI dari TikTok/IG
dibuat: 2026-10-29
diperbarui: 2026-10-30
tags: [simpanan, tools-ai, github, inbox]
---

# Simpanan Tools AI

Daftar tools, repo, dan prompt yang disimpan dari TikTok/Instagram. **Bukan khusus untuk project jualan website.**
Status: dicatat dari screenshot dan link yang dikirim user, isi repo **belum dicek langsung**
(sesi cloud tidak punya akses ke repo-repo ini). Deskripsi di bawah hanya berdasarkan teks yang
terlihat di screenshot. Repo yang hanya dikirim sebagai link belum ada deskripsinya.

## Catatan terkait
- [[30 Plugin Claude Terbaik per Peran]] *(IG)*: 30 plugin dikelompokkan per peran (kode, riset, hemat token, desain, menulis/video).

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
| 14 | hyperframes | https://github.com/heygen-com/hyperframes | Video dari HTML untuk AI agent | screenshot |
| 15 | openGym | https://github.com/DuarteSantos8/openGym | Aplikasi tracker gym (self-hosted) | screenshot |
| 16 | 20 Claude Animation Styles | belum ada link | Gaya animasi buatan Claude | screenshot |
| 17 | OpenMontage | https://github.com/calesthio/OpenMontage | Video/montage dengan agent skills | screenshot |
| 18 | animate | https://github.com/cth9191/animate | belum dicek (open source) | link |
| 19 | motionmaxxing | https://github.com/tejashmakwana/motionmaxxing | belum dicek (open source) | link |
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
| 31 | instagram-agent-skill | https://github.com/Jakeschincariol/instagram-agent-skill | belum dicek (skill Instagram) | link |
| 32 | security-audit-skill | kemungkinan https://github.com/cloudflare/security-audit-skill (cek) | Skill: audit keamanan 6 fase | screenshot IG |

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

### 14. hyperframes (heygen-com/hyperframes)
- **Tagline:** *"Write HTML. Render video. Built for AI agents."* Video ditulis sebagai HTML lalu dirender, dibuat untuk AI agent. Konsepnya sama dengan cara video SWRO Traya dibuat (halaman HTML dirender per frame).
- **Angka:** ★ 64.718, +5.318 minggu ini, lisensi Apache-2.0. Dari HeyGen.
- **Contoh gaya:** "Paper, ink & yellow" (editorial) dan "Loud, bordered, a little crooked" (neo-brutalism).
- **Cara pasang:**
  ```
  npx skills add heygen-com/hyperframes
  ```
- **Relevan untuk:** video promosi, konten TikTok/IG, video untuk klien website. Ini kandidat kuat.

### 15. openGym (DuarteSantos8/openGym)
- **Tagline:** *"Self-hosted gym and body-weight tracker. Your data stays yours."* Pencatat latihan gym dan berat badan yang di-host sendiri.
- **Fitur yang terlihat:** jadwal latihan mingguan, check-in di gym, grafik berat badan dan target, statistik (streak, aktivitas 12 bulan, muscle balance, fatigue, strength).
- **Angka:** ★ 12.465, +4.471 minggu ini, AGPL-3.0.
- **Cara jalan:**
  ```
  docker compose up
  ```
- **Relevan untuk:** pribadi, atau contoh/inspirasi desain aplikasi untuk jualan website.

### 16. 20 Insane Claude Animation Styles
- Video yang memamerkan 20 gaya animasi buatan Claude dalam 28 detik:
  1 Particles · 2 Liquid morph · 3 Neon glow · 4 Y2K chrome · 5 Kinetic type · 6 Paper cutout ·
  7 Holographic · 8 Isometric · 9 ASCII art · 10 Clay 3D · 11 Retro VHS · 12 Comic book ·
  13 Split-flap · 14 Hand-drawn · 15 Blueprint · 16 Physics · 17 Pixel art · 18 Bauhaus ·
  19 Art deco · 20 Neo-brutalism
- Contoh di video: kartu neo-brutalism "SHIP IT. / 98% FASTER / CLICK ME".
- **Link:** belum ada. Kemungkinan terkait dengan item 18 atau 19, perlu dicek.
- **Relevan untuk:** pilihan gaya visual website dan konten. Bisa jadi menu gaya untuk ditawarkan ke klien.

### 17. OpenMontage (calesthio/OpenMontage)
- **Link:** https://github.com/calesthio/OpenMontage (publik, 97 issues, 245 pull request, aktif)
- **Isi yang terlihat:** folder `.agents/skills`, berarti berbasis agent skills. Ada PR dengan kata "wan2", kemungkinan model video Wan 2.x.
- **Fungsi:** belum dicek. Dari namanya kemungkinan untuk membuat montage/video otomatis dengan AI agent.

### 18. animate (cth9191/animate)
- **Link:** https://github.com/cth9191/animate (open source)
- **Fungsi:** belum dicek. Dari namanya terkait animasi, mungkin sumber item 16.

### 19. motionmaxxing (tejashmakwana/motionmaxxing)
- **Link:** https://github.com/tejashmakwana/motionmaxxing (open source)
- **Fungsi:** belum dicek. Dari namanya terkait motion/animasi.

### Kumpulan skill web dari @rifqieh ("Build web and mobile apps")
Lima skill di bawah berasal dari satu video carousel. **Sangat relevan untuk [[00 Jualan Website (MOC)|Jualan Website]]**, karena semuanya membuat website buatan Claude terlihat premium.

### 20. Three.js Skills (CloudAI-X/threejs-skills)
- **Isi:** skill untuk membuat 3D di web dengan Three.js: interactive 3D scene, camera controls, model GLTF, lighting setup, particle effects.
- **Catatan:** video SWRO Traya juga dibuat dengan Three.js.
- **Relevan untuk:** website premium dengan hero 3D (produk berputar, scene interaktif).

### 21. GSAP Skill (greensock/gsap-skills)
- **Isi:** **skill resmi dari GreenSock** untuk GSAP ("Animate anything", library animasi JavaScript profesional): timeline animation, ScrollTrigger (animasi saat scroll), text reveal effects, integrasi React.
- **Relevan untuk:** animasi scroll dan teks di landing page klien. Ini standar website agensi.

### 22. Design DNA (zanwei/design-dna)
- **Isi:** agent skill untuk **mengekstrak, menyusun, dan menerapkan identitas visual** sebuah website sebagai "Design DNA" yang bisa dibaca mesin, dalam 3 dimensi: design tokens, gaya kualitatif, dan efek visual.
- **Contoh:** "Apply the style of thekrakentraining to Deno", yaitu menerapkan gaya satu website ke website lain.
- **Fitur:** reverse engineer design, copy UI style, color palette, typography, layout analysis.
- **Relevan untuk:** "buatkan website seperti referensi ini" dari klien. Sangat berguna untuk jualan website.

### 23. Motion Design Skill (lottiefiles/motion-design-skill)
- **Isi:** dari LottieFiles. Mencakup animasi Lottie, animasi SVG, timeline & keyframes, interactive states, alur kerja motion dengan AI, export JSON & dotLottie.
- **Relevan untuk:** ikon dan ilustrasi beranimasi yang ringan di website klien.

### 24. Genjutsu (AThevon/genjutsu)
- **Tagline:** *"The art of illusion. Cast motion. Paint signatures. Zero AI slop."*
- **Isi:** skill creative coding untuk **Claude Code dan claude.ai**. Mengubah antarmuka dari sekadar berfungsi menjadi luar biasa lewat motion design, pola interaksi, dan sistem visual. Mendukung Web (React, Vue, Svelte, vanilla CSS, Three.js, Canvas), Android (Jetpack Compose), dan Apple (SwiftUI iOS + macOS).
- **Catatan versi:** v3.0 adalah rebrand dari plugin `creative-excellence`. Skill `/creative-excellence:creative-excellence` dan `/creative-excellence:design-excellence` sekarang bernama `/genjutsu:cast` dan `/genjutsu:paint`.
- **Fitur:** UI kelas award, layout modern, animasi premium, creative direction, visual polish.
- **Relevan untuk:** membuat website klien tidak terlihat "template AI". Kandidat utama.

### Kumpulan skill dari carousel "#1–#7"
Satu carousel berisi 7 repo (#1–#4 = item 25–28, #6–#7 = item 29–30). #5 di carousel adalah **diagram-design**, sudah tercatat sebagai item 13.

### 25. academic-research-skills (Imbad0202/academic-research-skills)
- **Isi:** pipeline riset lengkap dalam bentuk skill untuk Claude Code: cari literatur → tulis draf → review → revisi → finalisasi. Claude bekerja seperti satu kelompok riset, bukan sekadar asisten menulis.
- **Angka:** 43k stars, 3k fork, 22 kontributor.
- **Catatan:** huruf pertama nama akun (I atau l) kurang jelas di screenshot.
- **Relevan untuk:** riset pasar, artikel/konten website klien, dokumen teknis (misalnya SWRO).

### 26. ai-job-search (MadsLorentzen/ai-job-search)
- **Isi:** pencarian kerja sebagai pipeline lokal di mesin sendiri. Membaca lowongan, menilai kecocokan dengan profil sendiri, menyesuaikan CV, dan menyusun lamaran. Framework berbasis Claude Code.
- **Angka:** 33k stars, 12k fork, 54 kontributor.
- **Relevan untuk:** pola pipelinenya bisa ditiru untuk **cari klien website** (membaca prospek → menilai kecocokan → menyusun penawaran).

### 27. emilkowalski/skills
- **Isi:** "Skills for Designers and Engineers". Keahlian menyusun antarmuka yang ditulis oleh desainer berpengalaman: animasi, transisi, dan detail kecil yang membedakan produk jadi dari sekadar demo.
- **Angka:** 32k stars, 2k fork.
- **Relevan untuk:** kualitas detail website klien. Cocok dipakai bersama [[#24. Genjutsu (AThevon/genjutsu)|Genjutsu]] dan GSAP.

### 28. Cybersecurity Skills (mukul975/Anthropic-Cybersecurity-Skills)
- **Isi:** 817 skill keamanan siber terstruktur untuk AI agent, dipetakan ke 6 framework (MITRE ATT&CK, NIST CSF 2.0, MITRE ATLAS, D3FEND, dan lainnya). Claude memeriksa setup dengan checklist yang sama seperti tim keamanan.
- **Angka:** 31k stars, 4k fork.
- **Catatan:** nama repo terpotong di screenshot, perlu dicek.
- **Relevan untuk:** cek keamanan website klien sebelum diserahkan (nilai tambah saat jualan).

### 29. pm-skills (phuryn/pm-skills)
- **Isi:** "lapisan product manager": discovery, strategi, spesifikasi, eksekusi. PM Skills Marketplace berisi 100+ agent skill, command, dan plugin dari discovery sampai strategi, eksekusi, launch, dan growth. Tetap berguna walaupun timnya cuma satu orang, karena tetap harus ada yang memutuskan apa yang dibuat.
- **Angka:** 26k stars, 3k fork.
- **Relevan untuk:** merencanakan bisnis jualan website (paket, target pasar, launch), juga menyusun spesifikasi website klien.

### 30. book-to-skill (virgiliojr94/book-to-skill)
- **Isi:** mengubah buku PDF teknis apa pun menjadi skill Claude Code yang siap dipelajari, dirujuk, dan dipakai saat bekerja. Menurut carousel, inilah yang diam-diam bisa menggantikan enam repo lainnya.
- **Angka:** 24k stars, 3k fork, 34 kontributor.
- **Relevan untuk:** mengubah buku desain web, copywriting, atau sales menjadi skill. Bisa juga buku teknis SWRO/water treatment untuk Traya.

### 31. instagram-agent-skill (Jakeschincariol/instagram-agent-skill)
- **Link:** https://github.com/Jakeschincariol/instagram-agent-skill
- **Fungsi:** belum dicek. Dari namanya, skill agent untuk Instagram.
- **Relevan untuk:** promosi jasa website lewat IG, kalau fungsinya sesuai.

### 32. security-audit-skill (sumber: IG)
- Skill audit keamanan 6 fase dengan temuan yang diverifikasi independen. Cikal bakal harness keamanan Cloudflare. ± 50,6k stars, MIT.
- Detail lengkap ada di [[Keamanan - Checklist Sebelum Launch]].

### Catatan tambahan untuk item 13 (diagram-design)
Carousel ini menyebut **38** jenis diagram ("plain HTML and SVG, no Mermaid … for Claude Code, Codex, and Pi. No shadows.") dengan 26k stars. Video sebelumnya menyebut **44** jenis dan 56k stars. Kemungkinan videonya dibuat di waktu berbeda. Versi terbaru dicek langsung di repo.

## Prompt simpanan

### Prompt "versi yang lebih dalam"
Untuk membuat hasil kerja AI lebih mendalam, bukan sekadar lebih panjang. Teks asli:

> I want a deeper version of this task, not a bigger one. Before rewriting it: (1) say what a top professional in this field would do here that I'm not asking for; (2) name the rawest material they would start from instead of what has already been digested for me; (3) name the specific methods and tools they would use; (4) say what, other than you or me, would show the result is right. Then rewrite my prompt to ask for exactly that.

**Terjemahan bebas:**
> Saya ingin versi yang lebih dalam dari tugas ini, bukan yang lebih besar. Sebelum menulis ulang: (1) sebutkan apa yang akan dilakukan seorang profesional top di bidang ini yang tidak saya minta; (2) sebutkan bahan paling mentah yang akan dia pakai sebagai titik awal, bukan bahan yang sudah dicerna untuk saya; (3) sebutkan metode dan alat spesifik yang akan dia pakai; (4) sebutkan apa (selain kamu atau saya) yang bisa membuktikan hasilnya benar. Lalu tulis ulang prompt saya supaya meminta persis itu.

**Kapan dipakai:** sebelum mengerjakan tugas penting, misalnya desain website klien, riset pasar, atau proposal.

## Yang perlu dicek nanti (di PC lokal)
- [ ] Buka link tanpa deskripsi (harvey, freefield, voicebox, OpenMontage, animate, motionmaxxing, instagram-agent-skill), lalu isi fungsinya.
- [ ] Cari link huashu-motion, Agent Reach, Concat, sumber "20 Video Effects" dan "20 Claude Animation Styles".
- [ ] Bandingkan 2 MCP Premiere Pro (item 3 dan 9).
- [ ] Cek kebutuhan hardware tiap tool. Laptop: Ryzen 3 5300U, Radeon bawaan, RAM 8 GB.
- [ ] Tandai mana yang relevan untuk [[00 Jualan Website (MOC)|Jualan Website]]. Kandidat awal: #20–24 dan #27 (skill web), #14 hyperframes, #13 diagram-design, #12 skills.
- [ ] Pasang skill web (#20–24) di Claude Code PC lokal, lalu uji di satu contoh landing page.
