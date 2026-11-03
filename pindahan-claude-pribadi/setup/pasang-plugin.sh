#!/usr/bin/env bash
# Pasang plugin Claude Code yang dipakai di sesi cloud + paket awal jualan website.
# Kalau satu baris gagal (nama berubah), lanjut saja lalu pasang manual lewat /plugin di Claude Code.
p() { echo "+ claude plugin $*"; claude plugin "$@" || echo "  (gagal — pasang manual lewat /plugin)"; }
p marketplace add anthropics/knowledge-work-plugins
p install design@knowledge-work-plugins
p install engineering@knowledge-work-plugins
p install operations@knowledge-work-plugins
p install data@knowledge-work-plugins
p marketplace add anthropics/skills
p install frontend-design@claude-plugins-official
p install security-guidance@claude-plugins-official
p install superpowers@claude-plugins-official
p marketplace add addyosmani/agent-skills
p install agent-skills@addy-agent-skills
echo "Selesai. Buka Claude Code lalu ketik /plugin untuk cek, dan /mcp untuk cek connector."
