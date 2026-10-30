---
tipe: daftar
sumber: Instagram (transkrip video + caption "30 best Claude plugins on GitHub", dikirim user sebagai teks)
dibuat: 2026-10-30
tags: [simpanan, claude-plugin, skill, sumber-ig]
---

# 30 Plugin Claude Terbaik di GitHub (dikelompokkan per peran)

Kaitan: [[00 Simpanan Tools AI (MOC)]] · [[00 Jualan Website (MOC)]]

> **Pesan utama video:** jangan pasang ke-30 plugin karena Claude malah penuh noise. **Pilih satu baris yang cocok dengan pekerjaan minggu ini, pasang satu plugin dari baris itu.** Sebelum memasang, buka repo-nya dan cek apa saja yang boleh dijalankan plugin itu di komputer.

Nama awalnya dari transkrip suara, lalu **dikonfirmasi dengan caption video**: "Garbati" = **Karpathy Skills**, "the PM. MAD method" = **BMAD Method**, GStack = **gstack**, ECC dan GSD juga tertulis di caption. Nomor `#` merujuk ke daftar di MOC simpanan.

**Pencarian repo (2026-10-30):** dicari lewat halaman pencarian GitHub (urut bintang). Link di bawah **dari hasil pencarian**, halaman repo belum dibuka satu per satu. Angka bintang perkiraan dari hasil pencarian.

## Fungsi singkat menurut caption video
| Peran | Plugin → fungsi (terjemahan) |
|---|---|
| **Coding seperti senior dev** | Superpowers → Claude merencanakan dan menulis tes dulu · Matt Pocock Skills → skill harian engineer sungguhan · ECC → paket besar skill dan agent · Karpathy Skills → menghentikan kebiasaan coding terburuk Claude · Ponytail → Claude menulis kode jauh lebih sedikit · Agent Skills → cara senior engineer merilis kode |
| **Riset & memahami** | Graphify → kode jadi peta · Agent Reach → Claude bisa membaca Reddit, X, YouTube · Understand Anything → tur terpandu codebase apa pun · Last 30 Days → apa yang dibicarakan orang sebulan terakhir · Career Ops → cari kerja dan sesuaikan CV · REA → Claude bisa membongkar aplikasi apa pun |
| **Project besar, hemat token** | gstack → Claude dapat tim startup lengkap · Caveman → Claude bicara singkat, hemat token · Claude-Mem → Claude ingat sesi sebelumnya · Headroom → memperkecil yang harus dibaca Claude · GSD → merencanakan dan membangun bertahap · BMAD Method → Claude jadi tim agile |
| **Desain & visual** | UI UX Pro Max → pengetahuan desain UI nyata · Taste → mencegah website terlihat generik · Archify → ide apa pun jadi diagram hidup · Impeccable → AI lebih jago desain · PPT Master → PowerPoint asli dari dokumen · Diagram Design → diagram rapi gaya majalah |
| **Menulis & video** | Skills by Anthropic → skill resmi Anthropic · OpenMontage → AI jadi studio video · HyperFrames → kode web jadi video · Humanizer → menghilangkan kesan AI di tulisan · I Have ADHD → Claude menjawab langsung ke intinya dulu · Marketing Skills → skill copywriting, SEO, growth |

> ⚠️ Caption: *"Before you install it, open the repo and read what it's allowed to do, because some of these can run commands on your computer."* Sebagian plugin bisa menjalankan perintah di komputer.

## 1. Menulis kode: Claude bekerja seperti senior developer
| Plugin | Catatan |
|---|---|
| Superpowers | [obra/superpowers](https://github.com/obra/superpowers): framework agentic skill + metodologi pengembangan software. ± 309k★, MIT. **Terkonfirmasi** (halaman repo dibuka). Pasang: `/plugin install superpowers@claude-plugins-official` |
| Matt Pocock skills | = #12 `mattpocock/skills` |
| ECC | **[affaan-m/ECC](https://github.com/affaan-m/ECC)** (Everything Claude Code; URL lama affaan-m/everything-claude-code dialihkan ke sini). **Terkonfirmasi**, ± 293k★, MIT, situs ecc.tools. Lihat detail di bawah. *(Repo WorldFlowAI/everything-claude-code yang tercatat sebelumnya bukan yang resmi.)* |
| Karpathy skills ("Garbati") | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills): satu file CLAUDE.md untuk memperbaiki perilaku Claude Code, berdasarkan pengamatan Andrej Karpathy soal kesalahan umum LLM saat coding. ± 227k★. Sumber aslinya mungkin `forrestchang/andrej-karpathy-skills` |
| Ponytail | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail): "AI agent berpikir seperti senior dev paling malas: kode terbaik adalah kode yang tidak perlu ditulis." ± 181k★ |
| Agent skills | repo bernama persis "agent-skills" belum ketemu. Kandidat: [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills), daftar kurasi Claude Skills (± 78k★) |

### Detail: ECC, Everything Claude Code *(IG, video kedua)*
- **Dari video:** setup Claude Code pribadi seorang developer yang dibuka jadi open source. Berisi ± 286 skill dan 68 sub-agent yang membuat Claude bekerja seperti satu tim developer. Ada skill yang memindai celah keamanan, menjaga memori tetap bersih, dan belajar dari sesi-sesi sebelumnya. Jalan juga di Cursor, Codex, dan Gemini. Pembuatnya **memakai setup ini untuk memenangkan hackathon Anthropic**.
- **Dari halaman repo (dicek 2026-10-30):** *"The agent harness performance optimization system. Skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor and beyond."*
  - README terbaru: **71 agent, 314 skill, 98 command**, plus hooks, rules, memori, continuous learning, dan scanner keamanan **AgentShield**. Angkanya berbeda dari video karena repo terus bertambah.
  - README menyebut dibuat di **Claude Code Hackathon (Cerebral Valley × Anthropic)**.
  - Paling optimal di Claude Code. Codex punya jalur plugin native; Cursor, Gemini, OpenCode, dll. lewat *adapter* yang fiturnya terbatas.
  - **Pasang:** `/plugin install ecc@ecc` di Claude Code, atau `npx ecc-universal@2.2.3 setup` (cek versi terbaru di README).
  - ⚠️ README memperingatkan: **unggahan ulang oleh pihak ketiga bisa berisi malware**. Sumber resmi hanya github.com/affaan-m/ECC.
- Sesuai saran video "30 plugin": jangan langsung pasang semuanya. ECC sangat besar; pilih bagian yang dibutuhkan.

## 2. Riset / memahami hal besar
| Plugin | Catatan |
|---|---|
| Graphify | [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify): ubah codebase + dokumen, skema SQL, config, PDF jadi knowledge graph yang bisa ditanya; skill `/graphify`. ± 139k★ |
| Agent Reach | = #5: [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach): agent bisa membaca dan mencari di Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu lewat satu CLI. ± 107k★ |
| Understand Anything | [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything): ubah kode jadi knowledge graph interaktif untuk dipelajari. ± 89k★ |
| Last 30 Days | [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill): riset topik apa pun di Reddit, X, YouTube, HN, Polymarket, dan web. ± 66k★ |
| Career Ops | [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops): agent cari kerja; scan lowongan dan beri skor 1–5 terhadap CV. ± 79k★ |
| REA | kemungkinan = #11 `morluto/rea` |

## 3. Project besar / token cepat habis
| Plugin | Catatan |
|---|---|
| GStack | [garrytan/gstack](https://github.com/garrytan/gstack): setup Claude Code milik Garry Tan; 23 tool yang berperan sebagai CEO, Designer, Eng Manager, Release Manager, Doc Engineer, dan QA. ± 138k★. **Terkonfirmasi** |
| Caveman | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman): "why use many token when few token do trick". Skill + proxy yang memangkas ± 65% token dengan gaya bicara ringkas ala manusia gua. ± 116k★ |
| Claude Mem | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem): konteks/memori permanen antar sesi untuk agent. ± 106k★ |
| Headroom | [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom): mengompres output tool, log, file, dan potongan RAG sebelum masuk ke LLM. Klaim: token coding agent turun ± 20%, JSON turun 60–95%, jawaban sama. Tersedia sebagai library, proxy, dan MCP server; mendukung `headroom wrap claude`. ± 78k★. **Terkonfirmasi** |
| GSD | [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done): sistem meta-prompting, context engineering, dan spec-driven development untuk Claude Code. ± 64k★. **Status: diarsipkan** (public archive) |
| BMAD Method | [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD): "Breakthrough Method for Agile AI Driven Development". ± 55k★ |

## 4. Desain & visual
| Plugin | Catatan |
|---|---|
| UI UX Pro Max | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): skill "design intelligence" untuk UI/UX profesional di banyak platform. ± 143k★ |
| Taste | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill): memberi coding agent "selera": art direction, gambar referensi, dan cek di browser supaya tidak menghasilkan halaman AI generik. ± 106k★ |
| Archify | [tt-a1i/archify](https://github.com/tt-a1i/archify): ubah ide, rencana, atau codebase jadi diagram interaktif yang bagus; skill untuk Claude Code, Codex, dll. ± 92k★ |
| Impeccable | [pbakaus/impeccable](https://github.com/pbakaus/impeccable): kosakata desain untuk coding agent. Arahkan dengan *polish* / *bolder*, review dengan *critique* / *audit*, tangkap "AI slop" sebelum rilis. ± 96k★ |
| PPT Master | [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master): AI mengubah dokumen atau topik jadi PowerPoint asli (shape, transisi, animasi, chart berbasis data). ± 71k★ |
| Diagram Design | = #13 `cathrynlavery/diagram-design` |

## 5. Menulis & video
| Plugin | Catatan |
|---|---|
| Skills by Anthropic | [anthropics/skills](https://github.com/anthropics/skills): repo publik Agent Skills resmi Anthropic. ± 185k★. **Terkonfirmasi** |
| Open Montage | = #17 `calesthio/OpenMontage` |
| Hyperframes | = #14 `heygen-com/hyperframes` |
| Humanizer | [blader/humanizer](https://github.com/blader/humanizer): skill yang menghapus ciri tulisan buatan AI. ± 63k★ |
| I Have ADHD | nama persis belum ketemu. Paling mirip: [alexh/i-really-have-adhd](https://github.com/alexh/i-really-have-adhd), skill yang membentuk output ringkas sesuai jumlah keputusan pembaca (± 12★). Skill ADHD lain: [UditAkhourii/adhd](https://github.com/UditAkhourii/adhd) (tree-of-thought dengan pruning, ± 4,5k★) |
| Marketing Skills | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills): skill marketing untuk Claude Code: CRO, copywriting, SEO, analytics, growth. ± 57k★ |

## Pilihan untuk jualan website
Mengikuti saran video (satu baris dulu):
- **Minggu membangun website:** baris **4. Desain & visual**. Mulai dari UI UX Pro Max atau Impeccable.
- **Minggu bikin konten promosi:** baris **5. Menulis & video**. Coba Marketing Skills atau Humanizer untuk caption/copy website.
- **Kalau token Claude cepat habis:** baris **3**, misalnya Caveman atau Claude Mem.

## Cek keamanan sebelum memasang plugin
- Baca README dan file konfigurasinya. Perhatikan perintah apa yang dijalankan otomatis (hooks, script, akses internet, akses file).
- Pilih repo yang aktif, punya banyak bintang/kontributor, dan berlisensi jelas.
- Pasang satu per satu, lalu uji.
