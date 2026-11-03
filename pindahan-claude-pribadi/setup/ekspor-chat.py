"""Ubah riwayat chat Claude Code (.jsonl) menjadi Markdown yang mudah dibaca / di-upload ke Project claude.ai.

Riwayat chat Claude Code otomatis tersimpan di:
  Windows : C:\\Users\\<nama>\\.claude\\projects\\<nama-folder-proyek>\\<id-sesi>.jsonl
  Mac/Linux: ~/.claude/projects/<nama-folder-proyek>/<id-sesi>.jsonl

Pemakaian:
  python ekspor-chat.py <file.jsonl> [output.md]
  python ekspor-chat.py <folder-proyek-di-.claude/projects> [output.md]   (semua sesi digabung)
Hanya teks pesan Anda dan jawaban Claude yang diambil (output alat & pesan sistem dibuang).
"""
import json, re, sys
from pathlib import Path

def baca(f):
    for line in open(f, encoding='utf-8'):
        try: d = json.loads(line)
        except Exception: continue
        t = d.get('type'); m = d.get('message') or {}
        if t not in ('user', 'assistant'): continue
        c = m.get('content'); txt = ''
        if isinstance(c, str): txt = c
        elif isinstance(c, list): txt = '\n'.join(b.get('text', '') for b in c if isinstance(b, dict) and b.get('type') == 'text')
        txt = re.sub(r'<system-reminder>.*?</system-reminder>', '', txt, flags=re.S)
        txt = re.sub(r'<(command-[a-z]+|local-command-[a-z]+|task-notification)>.*?</\1>', '', txt, flags=re.S).strip()
        if not txt or txt.startswith('[Request interrupted'): continue
        yield t, (d.get('timestamp') or '')[:16].replace('T', ' '), txt

src = Path(sys.argv[1]); out = Path(sys.argv[2] if len(sys.argv) > 2 else 'ekspor-chat.md')
files = sorted(src.glob('*.jsonl'), key=lambda p: p.stat().st_mtime) if src.is_dir() else [src]
with open(out, 'w', encoding='utf-8') as w:
    w.write('# Ekspor Chat Claude Code\n')
    for f in files:
        w.write(f'\n\n## Sesi: {f.stem}\n')
        for t, ts, txt in baca(f):
            w.write(f"\n---\n{'**Anda**' if t == 'user' else '**Claude**'} · {ts}\n\n{txt}\n")
print('Tersimpan:', out)
