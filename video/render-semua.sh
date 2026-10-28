#!/usr/bin/env bash
# Render semua halaman adegan menjadi segmen MP4.
# Tiap adegan dirender per potongan 150 frame (out/chunk/<adegan>/), lalu disambung ke out/seg/<adegan>.mp4.
# Dapat dilanjutkan: potongan dan segmen yang sudah ada dilewati.
# Pemakaian: ./render-semua.sh [jumlah_proses]   (default 3)
cd "$(dirname "$0")"
N=${1:-3}
mkdir -p out/seg out/log out/chunk
rm -f out/seg/*.part.mp4 out/chunk/*/*.part.mp4
# urutan: terberat dulu agar beban seimbang
JOBS="adegan-02 adegan-16 adegan-17 adegan-15 adegan-12 adegan-07 adegan-05a adegan-10a adegan-04b adegan-13a adegan-11a adegan-09a adegan-08a
adegan-05b adegan-10b adegan-01 adegan-06 adegan-11b adegan-08b adegan-13b adegan-09b adegan-04a adegan-10c adegan-03 adegan-14 adegan-00"
echo $JOBS | tr ' ' '\n' | xargs -P "$N" -I{} bash -c '
  f={}; out=out/seg/$f.mp4; dir=out/chunk/$f
  if [ -s "$out" ]; then echo "lewati $f"; exit 0; fi
  node render.js $f.html auto $dir/ >> out/log/$f.log 2>&1 || { echo "GAGAL $f"; exit 0; }
  ls $dir/c*.mp4 | grep -v part | sed "s|^|file $PWD/|" > $dir/daftar.txt
  ffmpeg -nostdin -y -loglevel error -f concat -safe 0 -i $dir/daftar.txt -c copy -movflags +faststart out/seg/$f.part.mp4 \
    && mv out/seg/$f.part.mp4 "$out" && echo "selesai $f"
'
