// Optimasi GLB hasil konversi model SketchUp (assimp) untuk dirender di three.js:
//  - semua mesh dikelompokkan per GRUP (awalan nama komponen SketchUp, mis. "35-MBR", "15-EQ", "05-SITE")
//  - transformasi dibakar ke vertex, lalu primitive dengan material sama digabung (draw call turun drastis)
//  - weld + (opsional) simplify + kompresi meshopt
// Pemakaian: node tools/optimasi-glb.mjs <input.glb> <output.glb> [rasioSimplify=1]
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS, EXTMeshoptCompression } from '@gltf-transform/extensions';
import { join, weld, prune, dedup, simplify, reorder, quantize, transformPrimitive } from '@gltf-transform/functions';
import { MeshoptSimplifier, MeshoptEncoder } from 'meshoptimizer';

const [inp, out, rasioArg] = process.argv.slice(2);
const rasio = Number(rasioArg || 1);
await MeshoptEncoder.ready; await MeshoptSimplifier.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
const doc = await io.read(inp);
const root = doc.getRoot();
const scene = root.getDefaultScene() || root.listScenes()[0];

// kunci grup dari nama: "_35-MBR_Rack1..." → "35-MBR"; "20-EFR-C1-R01_..." → "20-EFR"; tanpa awalan → "LAIN"
function grup(nama) {
  const n = (nama || '').replace(/^_+/, '');
  const m = n.match(/^(\d{2}-[A-Z]+)/);
  if (m) return m[1];
  if (/^RUCIKA/.test(n)) return 'PIPA';
  return null;
}
// cari grup dengan menelusuri nama node dari atas
const kelompok = new Map();
function jelajah(node, g) {
  const gg = grup(node.getName()) || g;
  const mesh = node.getMesh();
  if (mesh) {
    const key = gg || 'LAIN';
    if (!kelompok.has(key)) kelompok.set(key, []);
    kelompok.get(key).push({ node, mesh, m: node.getWorldMatrix() });
  }
  node.listChildren().forEach((c) => jelajah(c, gg));
}
scene.listChildren().forEach((n) => jelajah(n, null));

// bangun scene baru: satu node per grup, berisi satu mesh dengan semua primitive (transform dibakar)
const baru = doc.createScene('millenium');
let nPrim = 0;
for (const [key, items] of kelompok) {
  const gNode = doc.createNode(key);
  const gMesh = doc.createMesh(key);
  for (const { mesh, m } of items) {
    for (const prim of mesh.listPrimitives()) {
      const p = prim.clone();
      // clone accessor supaya instance yang dipakai berulang tidak ikut berubah
      for (const sem of p.listSemantics()) p.setAttribute(sem, p.getAttribute(sem).clone());
      if (p.getIndices()) p.setIndices(p.getIndices().clone());
      transformPrimitive(p, m);
      gMesh.addPrimitive(p); nPrim++;
    }
  }
  gNode.setMesh(gMesh); baru.addChild(gNode);
}
root.setDefaultScene(baru);
scene.dispose();
console.log('grup', kelompok.size, 'primitive', nPrim);
const steps = [prune(), dedup(), join({ keepMeshes: true, keepNamed: false }), weld()];
if (rasio < 1) steps.push(simplify({ simplifier: MeshoptSimplifier, ratio: rasio, error: 0.0005 }));
steps.push(prune(), reorder({ encoder: MeshoptEncoder }), quantize());
await doc.transform(...steps);
doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({ method: EXTMeshoptCompression.EncoderMethod.QUANTIZE });
await io.write(out, doc);
const prims = root.listMeshes().reduce((s, m) => s + m.listPrimitives().length, 0);
console.log('selesai:', out, 'mesh', root.listMeshes().length, 'primitive setelah gabung', prims);
console.log(JSON.stringify([...kelompok.keys()].sort()));
