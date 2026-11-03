// Ringankan GLB hasil dae2glb.py: weld → simplify per grup (rasio sesuai beratnya) → quantize → kompresi meshopt.
// Pemakaian: node ringankan-glb.mjs <input.glb> <output.glb> [targetSegitigaPerGrup=150000]
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS, EXTMeshoptCompression } from '@gltf-transform/extensions';
import { weld, simplifyPrimitive, prune, dedup, reorder, quantize } from '@gltf-transform/functions';
import { MeshoptSimplifier, MeshoptEncoder } from 'meshoptimizer';
const [inp, out, tArg] = process.argv.slice(2);
const target = Number(tArg || 150000);
await MeshoptEncoder.ready; await MeshoptSimplifier.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
const doc = await io.read(inp);
await doc.transform(weld());
const tri = (p) => (p.getIndices() ? p.getIndices().getCount() : p.getAttribute('POSITION').getCount()) / 3;
for (const mesh of doc.getRoot().listMeshes()) {
  const prims = mesh.listPrimitives();
  const total = prims.reduce((s, p) => s + tri(p), 0);
  if (total <= target) { console.log(mesh.getName(), Math.round(total), '(tetap)'); continue; }
  const ratio = Math.max(0.01, target / total);
  for (const p of prims) simplifyPrimitive(p, { simplifier: MeshoptSimplifier, ratio, error: 0.01, lockBorder: false });
  console.log(mesh.getName(), Math.round(total), '→', Math.round(mesh.listPrimitives().reduce((s, p) => s + tri(p), 0)));
}
await doc.transform(prune(), dedup(), reorder({ encoder: MeshoptEncoder }), quantize());
doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({ method: EXTMeshoptCompression.EncoderMethod.QUANTIZE });
await io.write(out, doc);
console.log('selesai', out);
