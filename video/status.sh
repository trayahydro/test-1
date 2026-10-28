#!/usr/bin/env bash
# Ringkasan progres render: frame selesai / total frame
cd "$(dirname "$0")"
python3 - <<'PY'
import glob, os, re, json
pages = sorted(glob.glob('adegan-*.html'))
done = total = 0
for p in pages:
    n = os.path.splitext(p)[0]
    log = f'out/log/{n}.log'
    seg = f'out/seg/{n}.mp4'
    fr = None; cur = 0
    if os.path.exists(log):
        s = open(log, errors='ignore').read().replace('\r', '\n')
        m = re.findall(r'(\d+)/(\d+)', s)
        if m: cur, fr = int(m[-1][0]), int(m[-1][1])
    if os.path.exists(seg) and os.path.getsize(seg) > 0 and fr: cur = fr
    if fr: done += cur; total += fr
print(f'{done}/{total} frame')
PY
