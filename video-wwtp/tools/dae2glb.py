"""Konverter COLLADA (.dae dari SketchUp) → GLB ringan untuk three.js.

- Membaca file secara streaming (aman untuk file ratusan MB).
- Satuan & sumbu: SketchUp (inch, Z-up) → meter, Y-up.
- Semua instance dibakar transformasinya, lalu digabung per (GRUP, material).
  GRUP = awalan nama komponen SketchUp, mis. "35-MBR", "15-EQ", "05-SITE" (lihat fungsi grup()).
- Output: satu node per grup (nama = kode grup), mesh berisi satu primitive per material.
  Ringkasan jumlah segitiga per grup ditulis ke <output>.json

Pemakaian: python dae2glb.py <input.dae> <output.glb> [--skip GRUP1,GRUP2]
"""
import json, re, struct, sys
import xml.etree.ElementTree as ET
import numpy as np

NS = '{http://www.collada.org/2005/11/COLLADASchema}'
T = lambda t: NS + t


def grup(nama):
    n = (nama or '').lstrip('_')
    # bagian yang perlu dianimasikan terpisah
    r = re.match(r'35-MBR_Rack(\d+)_([SN])_R(\d)_C(\d)_T(\d)', n)
    if r:
        return f'35-RACK-{r.group(2)}-R{r.group(3)}C{r.group(4)}T{r.group(5)}'
    g = re.match(r'05-SITE_Gate_Leaf(\d)', n)
    if g:
        return f'05-GATE{g.group(1)}'
    if n.startswith('TRK'):
        return '06-TRK'
    m = re.match(r'(\d{2}-[A-Z]+)', n)
    if m:
        return m.group(1)
    if n.startswith('RUCIKA'):
        return 'PIPA'
    return None


def baca(path):
    mats, effects, geoms, nodes_lib, scene = {}, {}, {}, {}, None
    unit = 0.0254
    ctx = []
    for ev, el in ET.iterparse(path, events=('start', 'end')):
        tag = el.tag.replace(NS, '')
        if ev == 'start':
            ctx.append(tag)
            continue
        ctx.pop()
        if tag == 'unit':
            unit = float(el.get('meter', 0.0254))
        elif tag == 'effect':
            col, alpha = [0.8, 0.8, 0.8], 1.0
            d = el.find(f'.//{T("diffuse")}/{T("color")}')
            if d is not None:
                v = [float(x) for x in d.text.split()]
                col = v[:3]
                alpha = v[3] if len(v) > 3 else 1.0
            tex = el.find(f'.//{T("diffuse")}/{T("texture")}') is not None
            tr = el.find(f'.//{T("transparent")}/{T("color")}')
            if tr is not None:
                tv = [float(x) for x in tr.text.split()]
                alpha = min(alpha, 1 - (sum(tv[:3]) / 3)) if el.find(f'.//{T("transparent")}').get('opaque') == 'RGB_ZERO' else min(alpha, tv[3] if len(tv) > 3 else alpha)
            effects[el.get('id')] = {'color': col, 'alpha': alpha, 'tex': tex}
            el.clear()
        elif tag == 'material' and 'library_materials' in ctx:
            ie = el.find(T('instance_effect'))
            mats[el.get('id')] = {'name': el.get('name') or el.get('id'), 'effect': ie.get('url')[1:] if ie is not None else None}
            el.clear()
        elif tag == 'geometry':
            mesh = el.find(T('mesh'))
            if mesh is None:
                el.clear(); continue
            src = {s.get('id'): np.array(s.find(T('float_array')).text.split(), dtype=np.float32).reshape(-1, int(s.find(f'.//{T("accessor")}').get('stride', 3)))
                   for s in mesh.findall(T('source')) if s.find(T('float_array')) is not None and s.find(T('float_array')).text}
            vmap = {}
            for v in mesh.findall(T('vertices')):
                for inp in v.findall(T('input')):
                    if inp.get('semantic') == 'POSITION':
                        vmap[v.get('id')] = inp.get('source')[1:]
            tris = []
            for tr in mesh.findall(T('triangles')):
                if tr.find(T('p')) is None or not tr.find(T('p')).text:
                    continue
                inputs = tr.findall(T('input'))
                stride = max(int(i.get('offset')) for i in inputs) + 1
                p = np.array(tr.find(T('p')).text.split(), dtype=np.int64).reshape(-1, stride)
                pos = nor = None
                for i in inputs:
                    s, o = i.get('semantic'), int(i.get('offset'))
                    if s == 'VERTEX':
                        pos = (src[vmap[i.get('source')[1:]]], p[:, o])
                    elif s == 'NORMAL':
                        nor = (src[i.get('source')[1:]], p[:, o])
                if pos is None:
                    continue
                P = pos[0][pos[1]]
                N = nor[0][nor[1]] if nor is not None else None
                tris.append((tr.get('material'), P, N))
            geoms[el.get('id')] = tris
            el.clear()
        elif tag == 'node' and ctx and ctx[-1] == 'library_nodes':
            nodes_lib[el.get('id')] = el  # disimpan utuh (kecil: hanya struktur)
        elif tag == 'visual_scene':
            scene = el
    return unit, mats, effects, geoms, nodes_lib, scene


def mat4(el):
    m = el.find(T('matrix'))
    if m is None:
        return np.eye(4)
    return np.array(m.text.split(), dtype=np.float64).reshape(4, 4)


def main():
    inp, out = sys.argv[1], sys.argv[2]
    skip = set(sys.argv[sys.argv.index('--skip') + 1].split(',')) if '--skip' in sys.argv else set()
    unit, mats, effects, geoms, nodes_lib, scene = baca(inp)
    print('geometri', len(geoms), 'node lib', len(nodes_lib), 'material', len(mats), flush=True)
    # Z-up inch → Y-up meter
    conv = np.array([[1, 0, 0, 0], [0, 0, 1, 0], [0, -1, 0, 0], [0, 0, 0, 1]], dtype=np.float64)
    conv[:3, :3] *= unit
    buckets = {}  # (grup, material_id) → list of (P, N)

    def walk(el, M, g, depth):
        for ch in el:
            tag = ch.tag.replace(NS, '')
            if tag == 'node':
                gg = grup(ch.get('name')) or g
                if depth == 0 and gg is None:
                    gg = None
                walk(ch, M @ mat4(ch), gg, depth + 1)
            elif tag == 'instance_node':
                ref = nodes_lib.get(ch.get('url')[1:])
                if ref is not None:
                    gg = grup(ref.get('name')) or g
                    walk(ref, M @ mat4(ref), gg, depth + 1)
            elif tag == 'instance_geometry':
                key_g = g or 'LAIN'
                if key_g in skip:
                    continue
                binds = {im.get('symbol'): im.get('target')[1:] for im in ch.iter(T('instance_material'))}
                R = M[:3, :3]; t = M[:3, 3]
                Rn = np.linalg.inv(R).T
                flip = np.linalg.det(R) < 0
                for sym, P, N in geoms.get(ch.get('url')[1:], []):
                    Pw = (P.astype(np.float64) @ R.T + t).astype(np.float32)
                    if N is not None:
                        Nw = N.astype(np.float64) @ Rn.T
                        Nw /= np.maximum(np.linalg.norm(Nw, axis=1, keepdims=True), 1e-9)
                        Nw = Nw.astype(np.float32)
                    else:
                        Nw = None
                    if flip:
                        Pw = Pw.reshape(-1, 3, 3)[:, ::-1].reshape(-1, 3)
                        if Nw is not None:
                            Nw = Nw.reshape(-1, 3, 3)[:, ::-1].reshape(-1, 3)
                    buckets.setdefault((key_g, binds.get(sym, sym)), []).append((Pw, Nw))

    walk(scene, conv, None, 0)
    # tulis GLB
    bin_chunks, bufviews, accessors, meshes, nodes, materials, mat_index, ringkas = [], [], [], [], [], [], {}, {}
    off = 0

    def add_view(arr, target=34962):
        nonlocal off
        b = arr.tobytes()
        pad = (-len(b)) % 4
        bin_chunks.append(b + b'\0' * pad)
        bufviews.append({'buffer': 0, 'byteOffset': off, 'byteLength': len(b), 'target': target})
        off += len(b) + pad
        return len(bufviews) - 1

    per_grup = {}
    for (g, mid), lst in buckets.items():
        per_grup.setdefault(g, []).append((mid, lst))
    for g in sorted(per_grup):
        prims = []
        ntri = 0
        for mid, lst in per_grup[g]:
            P = np.concatenate([a for a, _ in lst])
            def facen(a):
                t = a.reshape(-1, 3, 3)
                fn = np.cross(t[:, 1] - t[:, 0], t[:, 2] - t[:, 0])
                fn /= np.maximum(np.linalg.norm(fn, axis=1, keepdims=True), 1e-12)
                return np.repeat(fn, 3, axis=0).astype(np.float32)
            N = np.concatenate([n if n is not None else facen(a) for a, n in lst])
            bad = ~np.isfinite(N).all(1) | (np.linalg.norm(N, axis=1) < 0.5)
            N[bad] = [0, 1, 0]
            ntri += len(P) // 3
            if mid not in mat_index:
                m = mats.get(mid, {'name': mid, 'effect': None})
                e = effects.get(m['effect'], {'color': [0.8, 0.8, 0.8], 'alpha': 1.0, 'tex': False})
                mat = {'name': m['name'], 'pbrMetallicRoughness': {'baseColorFactor': e['color'] + [e['alpha']], 'metallicFactor': 0.0, 'roughnessFactor': 0.8}, 'doubleSided': True}
                if e['alpha'] < 0.999:
                    mat['alphaMode'] = 'BLEND'
                materials.append(mat); mat_index[mid] = len(materials) - 1
            vp = add_view(P)
            accessors.append({'bufferView': vp, 'componentType': 5126, 'count': len(P), 'type': 'VEC3', 'min': P.min(0).tolist(), 'max': P.max(0).tolist()})
            vn = add_view(N)
            accessors.append({'bufferView': vn, 'componentType': 5126, 'count': len(N), 'type': 'VEC3'})
            prims.append({'attributes': {'POSITION': len(accessors) - 2, 'NORMAL': len(accessors) - 1}, 'material': mat_index[mid]})
        meshes.append({'name': g, 'primitives': prims})
        nodes.append({'name': g, 'mesh': len(meshes) - 1})
        ringkas[g] = ntri
    gltf = {'asset': {'version': '2.0', 'generator': 'dae2glb.py'}, 'scene': 0, 'scenes': [{'nodes': list(range(len(nodes)))}],
            'nodes': nodes, 'meshes': meshes, 'materials': materials, 'accessors': accessors, 'bufferViews': bufviews,
            'buffers': [{'byteLength': off}]}
    js = json.dumps(gltf, separators=(',', ':')).encode()
    js += b' ' * ((-len(js)) % 4)
    binb = b''.join(bin_chunks)
    with open(out, 'wb') as f:
        f.write(struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(binb)))
        f.write(struct.pack('<II', len(js), 0x4E4F534A)); f.write(js)
        f.write(struct.pack('<II', len(binb), 0x004E4942)); f.write(binb)
    json.dump({'segitiga_per_grup': dict(sorted(ringkas.items(), key=lambda x: -x[1])), 'total': sum(ringkas.values()), 'material': len(materials)},
              open(out + '.json', 'w'), indent=1)
    print('selesai', out, 'grup', len(nodes), 'segitiga', sum(ringkas.values()), flush=True)


if __name__ == '__main__':
    main()
