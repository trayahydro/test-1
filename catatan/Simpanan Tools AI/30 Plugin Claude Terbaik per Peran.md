---
tipe: daftar
sumber: Instagram (transkrip video "30 best Claude plugins on GitHub", dikirim user sebagai teks)
dibuat: 2026-10-30
tags: [simpanan, claude-plugin, skill, sumber-ig]
---

# 30 Plugin Claude Terbaik di GitHub (dikelompokkan per peran)

Kaitan: [[00 Simpanan Tools AI (MOC)]] · [[00 Jualan Website (MOC)]]

> **Pesan utama video:** jangan pasang ke-30 plugin karena Claude malah penuh noise. **Pilih satu baris yang cocok dengan pekerjaan minggu ini, pasang satu plugin dari baris itu.** Sebelum memasang, buka repo-nya dan cek apa saja yang boleh dijalankan plugin itu di komputer.

Nama ditulis sesuai **transkrip suara**, jadi beberapa mungkin salah dengar. Yang meragukan diberi tanda *(?)* beserta dugaan nama aslinya. Nomor `#` merujuk ke daftar di MOC simpanan.

**Pencarian repo (2026-10-30):** dicari lewat halaman pencarian GitHub (urut bintang). Link di bawah **dari hasil pencarian**, halaman repo belum dibuka satu per satu. Angka bintang perkiraan dari hasil pencarian.

## 1. Menulis kode: Claude bekerja seperti senior developer
| Plugin | Catatan |
|---|---|
| Superpowers | repo utama belum terkonfirmasi (dugaan `obra/superpowers`). Terlihat: [obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace) (marketplace plugin Claude Code, ± 1,3k★) |
| Matt Pocock skills | = #12 `mattpocock/skills` |
| ECC | Everything Claude Code. Terlihat: [WorldFlowAI/everything-claude-code](https://github.com/WorldFlowAI/everything-claude-code), toolkit agents/commands/skills/rules/hooks, ± 5,6k★. Ada juga rujukan ke `affaan-m/ECC` (belum dicek) |
| Karpathy skills ("Garbati") | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills): satu file CLAUDE.md untuk memperbaiki perilaku Claude Code, berdasarkan pengamatan Andrej Karpathy soal kesalahan umum LLM saat coding. ± 227k★. Sumber aslinya mungkin `forrestchang/andrej-karpathy-skills` |
| Ponytail | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail): "AI agent berpikir seperti senior dev paling malas: kode terbaik adalah kode yang tidak perlu ditulis." ± 181k★ |
| Agent skills | belum dicek (nama umum, cari repo-nya) |

## 2. Riset / memahami hal besar
| Plugin | Catatan |
|---|---|
| Graphify | [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify): ubah codebase + dokumen, skema SQL, config, PDF jadi knowledge graph yang bisa ditanya; skill `/graphify`. ± 139k★ |
| Agent Reach | = #5 (akses internet untuk agent) |
| Understand Anything | [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything): ubah kode jadi knowledge graph interaktif untuk dipelajari. ± 89k★ |
| Last 30 Days | [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill): riset topik apa pun di Reddit, X, YouTube, HN, Polymarket, dan web. ± 66k★ |
| Career Ops | [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops): agent cari kerja; scan lowongan dan beri skor 1–5 terhadap CV. ± 79k★ |
| REA | kemungkinan = #11 `morluto/rea` |

## 3. Project besar / token cepat habis
| Plugin | Catatan |
|---|---|
| GStack | repo utama `garrytan/gstack` belum muncul di pencarian (hanya fork, mis. Ahacad/gstack) |
| Caveman | belum dicek (dari namanya kemungkinan menghemat token dengan jawaban ringkas) |
| Claude Mem | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem): konteks/memori permanen antar sesi untuk agent. ± 106k★ |
| Headroom | belum dicek |
| GSD | *(?)* kemungkinan "Get Shit Done" |
| BMAD Method | *(?)* transkrip: "the PM. MAD method", kemungkinan "BMAD Method" |

## 4. Desain & visual
| Plugin | Catatan |
|---|---|
| UI UX Pro Max | ada di [[Skill Desain - Perbaiki UI Buatan AI]] |
| Taste | = Taste Skill (catatan skill desain) |
| Archify | belum dicek |
| Impeccable | ada di catatan skill desain |
| PPT Master | belum dicek (dari namanya membuat slide/PowerPoint) |
| Diagram Design | = #13 `cathrynlavery/diagram-design` |

## 5. Menulis & video
| Plugin | Catatan |
|---|---|
| Skills by Anthropic | skill resmi Anthropic |
| Open Montage | = #17 `calesthio/OpenMontage` |
| Hyperframes | = #14 `heygen-com/hyperframes` |
| Humanizer | belum dicek (dari namanya membuat tulisan AI terdengar manusiawi) |
| I Have ADHD | belum dicek |
| Marketing Skills | belum dicek |

## Pilihan untuk jualan website
Mengikuti saran video (satu baris dulu):
- **Minggu membangun website:** baris **4. Desain & visual**. Mulai dari UI UX Pro Max atau Impeccable.
- **Minggu bikin konten promosi:** baris **5. Menulis & video**. Coba Marketing Skills atau Humanizer untuk caption/copy website.
- **Kalau token Claude cepat habis:** baris **3**, misalnya Caveman atau Claude Mem.

## Cek keamanan sebelum memasang plugin
- Baca README dan file konfigurasinya. Perhatikan perintah apa yang dijalankan otomatis (hooks, script, akses internet, akses file).
- Pilih repo yang aktif, punya banyak bintang/kontributor, dan berlisensi jelas.
- Pasang satu per satu, lalu uji.
