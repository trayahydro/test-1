// Visualisasi aliran fluida di dalam pipa: tabung bercahaya sedikit lebih besar dari pipa,
// dengan pola garis yang bergerak searah aliran. Warna mengikuti konvensi video:
export const WARNA = {
  laut: '#1f6fd6',      // air laut / umpan
  pre: '#38b6ff',       // setelah pretreatment
  hp: '#5ad1ff',        // air bertekanan tinggi
  produk: '#c8f4ff',    // permeat / air produk
  brine: '#ff8a3d',     // konsentrat
  kimia: '#ffd54f',     // bahan kimia
  cip: '#7cf29a',       // larutan CIP
};
import * as THREE from 'three';

const VS = `varying vec2 vUv; varying vec3 vN; varying vec3 vV;
void main(){ vUv = uv; vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`;
const FS = `uniform vec3 col; uniform float time, speed, spacing, len, prog, opa;
varying vec2 vUv; varying vec3 vN; varying vec3 vV;
void main(){
  if (vUv.x > prog) discard;
  float s = vUv.x * len - time * speed;
  float d = fract(s / spacing);
  float dash = smoothstep(0.0, 0.25, d) * (1.0 - smoothstep(0.45, 0.7, d));
  float rim = pow(1.0 - abs(dot(vN, vV)), 1.5);
  float head = smoothstep(prog - 0.02, prog, vUv.x) * step(prog, 0.999);
  float a = (0.28 + 0.72 * dash) * (0.55 + 0.45 * rim) + head;
  gl_FragColor = vec4(col * (1.2 + dash * 0.8), a * opa);
}`;

// Satu aliran pada kurva (THREE.Curve). Kembalikan pengendali set(t, progres 0..1, opasitas).
export function aliran(curve, r, warna, { speed = 0.7, spacing = 0.3, parent, scale = 1.25 } = {}) {
  const len = curve.getLength();
  const mat = new THREE.ShaderMaterial({
    vertexShader: VS, fragmentShader: FS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
    uniforms: { col: { value: new THREE.Color(warna) }, time: { value: 0 }, speed: { value: speed }, spacing: { value: spacing }, len: { value: len }, prog: { value: 1 }, opa: { value: 0 } },
  });
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(32, Math.round(len * 40)), r * scale, 16, false), mat);
  mesh.renderOrder = 10; mesh.frustumCulled = false;
  parent.add(mesh);
  return {
    mesh, len,
    set(t, p = 1, o = 1) { mat.uniforms.time.value = t; mat.uniforms.prog.value = p; mat.uniforms.opa.value = o; mesh.visible = o > 0.001; },
  };
}

// Aliran untuk pipa bernama dari registri model (refs.pipes)
export function aliranPipa(refs, nama, warna, opts = {}) {
  const p = refs.pipes.find((x) => x.name === nama);
  if (!p) throw new Error('pipa tidak ditemukan: ' + nama);
  return aliran(p.path, p.r, warna, opts);
}

// Rangkaian beberapa aliran yang "mengalir" berurutan: progres total dibagi menurut panjang
export function rangkaian(list) {
  const total = list.reduce((s, a) => s + a.len, 0);
  return {
    total,
    set(t, p = 1, o = 1) {
      let acc = 0;
      list.forEach((a) => {
        const lp = Math.min(1, Math.max(0, (p * total - acc) / a.len));
        a.set(t, lp, lp > 0 ? o : 0);
        acc += a.len;
      });
    },
  };
}
