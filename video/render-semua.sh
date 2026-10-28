#!/usr/bin/env bash
# Render semua halaman adegan menjadi segmen MP4 (dapat dilanjutkan: segmen yang sudah ada dilewati).
# Pemakaian: ./render-semua.sh [jumlah_proses]   (default 3)
cd "$(dirname "$0")"
N=${1:-3}
mkdir -p out/seg out/log
# urutan: terberat dulu agar beban seimbang
JOBS="adegan-02 adegan-16 adegan-17 adegan-15 adegan-12 adegan-07 adegan-05a adegan-10a adegan-04b adegan-13a adegan-11a adegan-09a adegan-08a
adegan-05b adegan-10b adegan-01 adegan-06 adegan-11b adegan-08b adegan-13b adegan-09b adegan-04a adegan-10c adegan-03 adegan-14 adegan-00"
echo $JOBS | tr ' ' '\n' | xargs -P "$N" -I{} bash -c '
  f={}; out=out/seg/$f.mp4
  if [ -s "$out" ]; then echo "lewati $f"; exit 0; fi
  node render.js $f.html auto out/seg/$f.part.mp4 > out/log/$f.log 2>&1 && mv out/seg/$f.part.mp4 "$out" && echo "selesai $f"
'
