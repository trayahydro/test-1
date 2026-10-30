---
tipe: referensi
sumber: Instagram (transkrip video, dikirim user sebagai teks)
dibuat: 2026-10-30
tags: [jualan-website, connector, mcp, tools, sumber-ig]
---

# 5 Connector yang Dipasang Sebelum Memakai Claude *(IG)*

> Kalimat pembuka di transkrip: *"…use Claude before adding these 5 connectors"*. Kemungkinan aslinya **"Don't use Claude before adding these 5 connectors."**

Kaitan: [[00 Jualan Website (MOC)]] · [[Stack - 20 Dolar per Bulan Startup Stack]] · [[00 Simpanan Tools AI (MOC)]]

| # | Connector | Fungsi (dari video) | Kegunaan untuk jualan website |
|---|---|---|---|
| 1 | **Perplexity** | memberi Claude mesin riset dengan data real-time tentang topik apa pun | riset bisnis klien, kompetitor, tren desain, harga pasar jasa website |
| 2 | **Firecrawl** | "memberi Claude mata": menyalin dan meng-scrape website apa pun, mengambil aset brand, riset kompetitor | mengambil konten dan logo dari website lama klien saat redesign; analisis website kompetitor klien |
| 3 | **Playwright** | Claude punya browser sendiri: membuka halaman, mengetes tombol, mengisi form, dan mengetes hasil buatannya sendiri | QA otomatis sebelum serah terima (lihat prompt 5 di [[Prompt - 8 Prompt Wajib Sebelum Vibecoding]]) |
| 4 | **PostHog** *(transkrip: "Postdoc")* | Claude bisa melihat apa yang dilakukan pengunjung di website, berapa yang mendaftar, dan error apa yang mereka alami | laporan performa website klien; jadi nilai tambah paket maintenance |
| 5 | **Composio** | satu connector ke banyak aplikasi (Gmail, Slack, dll.), jadi tidak perlu memasang satu per satu | otomatisasi email ke klien, follow-up, dan laporan |

"Postdoc" di transkrip kemungkinan salah dengar dari **PostHog**, karena fungsinya (analytics pengunjung, signup, error) cocok dan PostHog juga ada di [[Stack - 20 Dolar per Bulan Startup Stack]].

## Catatan pemasangan
- Semuanya dipasang sebagai **connector / MCP server** di Claude (claude.ai: Settings → Connectors; Claude Code: `claude mcp add …`). Ikuti dokumentasi resmi masing-masing.
- Perplexity, Firecrawl, dan Composio umumnya butuh **API key**, dan ada paket gratis dengan batas pemakaian. Playwright gratis dan jalan lokal. PostHog punya free tier.
- Berikan akses seperlunya saja, terutama Composio (akses email/Slack).
- **Etika scraping:** gunakan Firecrawl untuk website milik klien atau riset wajar. Jangan menyalin konten atau desain orang lain mentah-mentah.
