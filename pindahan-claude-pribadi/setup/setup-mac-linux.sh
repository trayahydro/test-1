#!/usr/bin/env bash
# Setup proyek Traya di Mac/Linux. Jalankan dari folder root proyek:
#   bash pindahan-claude-pribadi/setup/setup-mac-linux.sh
# Prasyarat: Python 3.11+, Node.js 18+, Git, FFmpeg (Mac: brew install python node git ffmpeg)
set -e
cd "$(dirname "$0")/../.."
echo "== Cek program =="
for c in python3 node npm git ffmpeg; do command -v $c >/dev/null && echo "  OK  $c" || echo "  BELUM ADA: $c"; done
echo "== Python venv + paket =="
python3 -m venv .venv
./.venv/bin/pip install --upgrade pip
./.venv/bin/pip install -r pindahan-claude-pribadi/setup/requirements.txt
echo "== Node: three.js, font, playwright =="
for d in video contoh-gaya; do (cd $d && npm install && npm install playwright); done
(cd video && npx playwright install chromium)
echo "== Tes cepat: pratinjau 1 frame =="
mkdir -p uji && node video/still.js video-3m3/adegan-02b.html uji/tes 3
echo "Selesai. Lihat uji/tes-3.png. Aktifkan Python: source .venv/bin/activate"
