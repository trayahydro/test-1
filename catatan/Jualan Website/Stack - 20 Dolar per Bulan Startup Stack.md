---
tipe: referensi
sumber: TikTok (gambar "The $20/mo startup stack")
dibuat: 2026-10-29
tags: [jualan-website, tech-stack, tools, biaya]
---

# The $20/mo Startup Stack
> *"If you want to build a startup"*: total biaya bulanan menjalankan startup ± **$20**.

| Layanan | Fungsi | Biaya |
|---|---|---|
| **Claude** | coding | $20/bulan |
| **Supabase** | backend (database, storage) | gratis |
| **Vercel** | deploy / hosting | gratis |
| **Namecheap** | domain | $12/tahun |
| **Stripe** | pembayaran | 2,9% per transaksi |
| **GitHub** | version control | gratis |
| **Resend** | email | gratis |
| **ProductBridge** | feedback pengguna | gratis |
| **Clerk** | login / auth | gratis |
| **Cloudflare** | DNS | gratis |
| **PostHog** | analytics | gratis |
| **Sentry** | error tracking | gratis |
| **Upstash** | Redis | gratis |
| **Pinecone** | vector DB | gratis |

"Gratis" artinya paket free tier, yang punya batas pemakaian.

## Catatan untuk konteks Indonesia (jualan website)
- **Stripe** belum melayani merchant Indonesia secara langsung. Alternatif lokal: **Midtrans** atau **Xendit** (QRIS, VA bank, e-wallet). *Perlu dicek ulang syarat terbarunya.*
- **Domain .id / .co.id**: bisa lewat registrar lokal (misalnya Niagahoster, Rumahweb, IDCloudHost). Namecheap tidak menjual .co.id.
- Untuk **website company profile / landing page UMKM** biasanya cukup: Claude + GitHub + Vercel (atau Cloudflare Pages) + domain. Supabase/Clerk/Stripe baru perlu kalau ada login, database, atau pembayaran.
- Biaya ke klien bisa dihitung dari stack ini, misalnya domain per tahun + jasa pembuatan + maintenance bulanan. Lihat topik harga di [[00 Jualan Website (MOC)]].
