"""Hitung bounding box (meter, Y-up) tiap komponen bernama di model SketchUp (.dae) → JSON.
Pemakaian: python dae-posisi.py <input.dae> <output.json>"""
import json, re, sys
import numpy as np
sys.path.insert(0, __import__('os').path.dirname(__file__))
from dae2glb import baca, mat4, NS, T

def main():
    unit, mats, effects, geoms, nodes_lib, scene = baca(sys.argv[1])
    conv = np.array([[1, 0, 0, 0], [0, 0, 1, 0], [0, -1, 0, 0], [0, 0, 0, 1]], dtype=np.float64); conv[:3, :3] *= unit
    gb = {k: (np.vstack([P for _, P, _ in v]).min(0), np.vstack([P for _, P, _ in v]).max(0)) for k, v in geoms.items() if v}
    out = {}
    def walk(el, M, nama):
        for ch in el:
            tag = ch.tag.replace(NS, '')
            if tag == 'node':
                n0 = ch.get('name') or ''
                nm = n0 if n0 and not re.match(r'(instance|group|Difference|ID\d|skp_camera)', n0) else nama
                walk(ch, M @ mat4(ch), nm)
            elif tag == 'instance_node':
                ref = nodes_lib.get(ch.get('url')[1:])
                if ref is not None:
                    n0 = ref.get('name') or ''
                    walk(ref, M @ mat4(ref), n0 if n0 and not re.match(r'(instance|group|Difference|ID\d)', n0) else nama)
            elif tag == 'instance_geometry' and nama:
                b = gb.get(ch.get('url')[1:])
                if b is None: continue
                c = np.array([[x, y, z] for x in (b[0][0], b[1][0]) for y in (b[0][1], b[1][1]) for z in (b[0][2], b[1][2])])
                w = c @ M[:3, :3].T + M[:3, 3]
                lo, hi = w.min(0), w.max(0)
                if nama in out: out[nama] = [np.minimum(out[nama][0], lo), np.maximum(out[nama][1], hi)]
                else: out[nama] = [lo, hi]
    for ch in scene:
        if ch.tag.replace(NS, '') == 'node':
            for c2 in ch:
                if c2.tag.replace(NS, '') == 'node': walk(c2, conv @ mat4(ch) @ mat4(c2), c2.get('name'))
    json.dump({k.lstrip('_'): [np.round(v[0], 2).tolist(), np.round(v[1], 2).tolist()] for k, v in out.items()}, open(sys.argv[2], 'w'))
    print(len(out))
main()
