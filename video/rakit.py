#!/usr/bin/env python3
"""Rakit video final dari segmen hasil render.

Langkah:
  1. sambung sub-segmen per adegan (04a+04b, 10a+10b+10c, ...) tanpa transisi
  2. sambung 18 adegan dengan crossfade 0,5 dtk
  3. letakkan VO tiap adegan pada awal adegan + PRE (0,6 dtk)
  4. backsound (audio/buat_musik.py) diredam otomatis saat ada narasi
  5. encode H.264 + AAC, lalu pecah menjadi beberapa file < 95 MB bila perlu

Pemakaian: python3 rakit.py [--vo /home/user/tts/out] [--crf 20] [--maks-mb 95]
"""
import argparse, glob, json, math, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SEG = os.environ.get('RAKIT_SEG', os.path.join(ROOT, 'out', 'seg'))
WORK = os.environ.get('RAKIT_WORK', os.path.join(ROOT, 'out', 'rakit'))
PRE, XF = 0.6, 0.5          # jeda sebelum narasi; durasi crossfade antar adegan
MUSIK_DB = -17              # level backsound sebelum ducking


def sh(cmd, **kw):
    print('+', ' '.join(cmd) if len(' '.join(cmd)) < 400 else ' '.join(cmd)[:400] + ' ...', flush=True)
    subprocess.run(cmd, check=True, **kw)


def durasi(f):
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f],
                         check=True, capture_output=True, text=True).stdout
    return float(out.strip())


def kelompok_adegan():
    """{no: [segmen urut]} dari out/seg/adegan-XX[a-c].mp4"""
    g = {}
    for f in sorted(glob.glob(os.path.join(SEG, 'adegan-*.mp4'))):
        if f.endswith('.part.mp4'):
            continue
        m = re.match(r'adegan-(\d+)([a-z]?)\.mp4$', os.path.basename(f))
        g.setdefault(int(m.group(1)), []).append(f)
    return g


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--vo', default=os.path.join(ROOT, '..', 'tts', 'vo'), help='folder adegan_XX.flac / .wav')
    ap.add_argument('--crf', type=int, default=20)
    ap.add_argument('--maks-mb', type=float, default=95)
    ap.add_argument('--out', default=os.path.join(ROOT, 'out', 'SWRO-Traya-Hydro-Indonesia.mp4'))
    a = ap.parse_args()
    os.makedirs(WORK, exist_ok=True)

    g = kelompok_adegan()
    nos = sorted(g)
    if nos != list(range(18)):
        sys.exit(f'segmen belum lengkap, adegan tersedia: {nos}')
    # pastikan semua sub-segmen ada (sesuai daftar halaman)
    for p in glob.glob(os.path.join(ROOT, 'adegan-*.html')):
        n = os.path.splitext(os.path.basename(p))[0]
        if not os.path.exists(os.path.join(SEG, n + '.mp4')):
            sys.exit(f'segmen hilang: {n}')

    # 1. sambung sub-segmen (encoding identik → stream copy)
    adegan = []
    for no in nos:
        parts = g[no]
        dst = os.path.join(WORK, f'adegan_{no:02d}.mp4')
        if len(parts) == 1:
            adegan.append(parts[0]); continue
        lst = os.path.join(WORK, f'adegan_{no:02d}.txt')
        open(lst, 'w').write(''.join(f"file '{os.path.abspath(p).replace(os.sep, '/')}'\n" for p in parts))
        sh(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', dst])
        adegan.append(dst)
    D = [durasi(f) for f in adegan]
    S = [sum(D[:k]) - XF * k for k in range(len(D))]       # waktu mulai tiap adegan di video final
    total = S[-1] + D[-1]
    print('durasi adegan:', [round(d, 2) for d in D])
    print(f'total: {total:.2f} dtk ({total / 60:.2f} menit)')

    # 2. backsound sepanjang video
    musik = os.path.join(WORK, 'musik.wav')
    py = '/home/user/tts/venv/bin/python' if os.path.exists('/home/user/tts/venv/bin/python') else sys.executable
    sh([py, os.path.join(ROOT, '..', 'audio', 'buat_musik.py'), f'{total + 1:.2f}', musik])

    # 3. satu kali ffmpeg: xfade video + penempatan VO + ducking musik
    inp, fc = [], []
    for f in adegan:
        inp += ['-i', f]
    vo = [next(f for f in (os.path.join(a.vo, f'adegan_{no:02d}.{e}') for e in ('flac', 'wav')) if os.path.exists(f)) for no in nos]
    for f in vo:
        inp += ['-i', f]
    inp += ['-i', musik]
    n = len(adegan)
    prev = '0:v'
    for k in range(1, n):
        lab = f'x{k}'
        fc.append(f'[{prev}][{k}:v]xfade=transition=fade:duration={XF}:offset={S[k]:.3f}[{lab}]')
        prev = lab
    fc.append(f'[{prev}]fade=t=out:st={total - 1.5:.3f}:d=1.5,format=yuv420p[v]')
    for k in range(n):
        ms = int(round((S[k] + PRE) * 1000))
        fc.append(f'[{n + k}:a]aresample=48000,aformat=channel_layouts=mono,adelay={ms}:all=1[a{k}]')
    fc.append(''.join(f'[a{k}]' for k in range(n)) + f'amix=inputs={n}:duration=longest:normalize=0,apad=whole_dur={total:.3f},atrim=0:{total:.3f}[vo]')
    fc.append('[vo]asplit=2[v1][v2]')
    fc.append(f'[{2 * n}:a]aresample=48000,aformat=channel_layouts=mono,volume={MUSIK_DB}dB,atrim=0:{total:.3f}[m]')
    fc.append('[m][v1]sidechaincompress=threshold=0.02:ratio=6:attack=40:release=600:makeup=1[md]')
    fc.append(f'[v2][md]amix=inputs=2:duration=first:normalize=0,afade=t=in:d=0.4,afade=t=out:st={total - 2.5:.3f}:d=2.5,'
              'alimiter=limit=0.95,aformat=channel_layouts=stereo[a]')
    fcf = os.path.join(WORK, 'filter.txt')
    open(fcf, 'w').write(';\n'.join(fc))
    sh(['ffmpeg', '-y', '-loglevel', 'error', '-stats', *inp, '-filter_complex_script', fcf, '-map', '[v]', '-map', '[a]',
        '-c:v', 'libx264', '-preset', 'slow', '-crf', str(a.crf), '-r', '30', '-g', '60', '-pix_fmt', 'yuv420p',
        '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', a.out])
    mb = os.path.getsize(a.out) / 1e6
    print(f'hasil: {a.out} ({mb:.1f} MB)')
    json.dump({'adegan': [os.path.basename(f) for f in adegan], 'durasi': D, 'mulai': S, 'total': total},
              open(os.path.join(WORK, 'peta.json'), 'w'), indent=1)

    # 4. pecah bila > batas
    if mb <= a.maks_mb:
        return
    bagian = math.ceil(mb / (a.maks_mb * 0.9))
    while True:
        base = os.path.splitext(a.out)[0]
        for f in glob.glob(base + '-bagian*.mp4'):
            os.remove(f)
        sh(['ffmpeg', '-y', '-loglevel', 'error', '-i', a.out, '-map', '0', '-c', 'copy', '-f', 'segment',
            '-segment_time', f'{total / bagian:.2f}', '-reset_timestamps', '1', '-segment_start_number', '1',
            '-movflags', '+faststart', base + '-bagian%d.mp4'])
        files = sorted(glob.glob(base + '-bagian*.mp4'), key=lambda f: int(re.search(r'bagian(\d+)', f).group(1)))
        ukuran = [os.path.getsize(f) / 1e6 for f in files]
        print('bagian:', [f'{os.path.basename(f)} {u:.1f} MB' for f, u in zip(files, ukuran)])
        if max(ukuran) <= a.maks_mb:
            break
        bagian += 1


if __name__ == '__main__':
    main()
