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
    nch = len([c for c in glob.glob(f'out/chunk/{n}/c*.mp4') if not c.endswith('.part.mp4')])
    cur = max(cur, nch * 150)
    if os.path.exists(seg) and os.path.getsize(seg) > 0 and fr: cur = fr
    if fr: cur = min(cur, fr)
    if fr: done += cur; total += fr
TOTAL = 19038  # total frame seluruh adegan (durasi desain × 30 fps)
selesai = len([f for f in glob.glob('out/seg/*.mp4') if not f.endswith('.part.mp4')])
print(f'{done}/{TOTAL} frame ({done / TOTAL * 100:.1f}%), segmen selesai: {selesai}/26')
PY
