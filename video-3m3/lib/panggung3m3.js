// Panggung bersama video SWRO 3 m³/hari di kapal pesiar:
//   panggungLaut()       → langit, laut, kapal pesiar, buih haluan & jejak buritan, (opsional) isi kapal X-ray
//   panggungRuangMesin() → ruang mesin kapal (lantai checker plate, gading, pipa plafon, mesin utama) + skid SWRO
//   panggungStudio()     → latar studio navy untuk potongan komponen
import * as THREE from 'three';
import { buatDunia, langit, laut, matahari, latarStudio, loadImg } from '../../video/lib/dunia.js';
import * as TX from '../../video/lib/tekstur.js';
import { buildKapal, buildInterior, KAPAL, halfB } from './kapal.js';
import { buildSkid } from './skid.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
export async function muatLogo() {
  await Promise.all(['400', '600', '700', '800'].map((w) => document.fonts.load(`${w} 20px Jakarta`)));
  return { dark: await loadImg('../logo/traya-logo-putih.png'), light: await loadImg('../traya-logo.png') };
}

export const LANGIT = {
  pagi: { elev: 24, az: -140 },
  senja: { elev: 5, az: -95, top: '#1b2c58', mid: '#7f6f9a', hor: '#ffbf86', sunCol: '#ffae6a', glow: 0.9 },
};

// ---------- buih (foam) ----------
function teksturBuih(seed = 3) {
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d');
  const r = TX.rng(seed); g.fillStyle = '#000'; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 2600; i++) {
    const x = r() * 512, y = r() * 512, s = 2 + r() * r() * 22, a = 0.15 + r() * 0.5;
    for (const dx of [-512, 0, 512]) for (const dy of [-512, 0, 512]) {
      const gr = g.createRadialGradient(x + dx, y + dy, 0, x + dx, y + dy, s);
      gr.addColorStop(0, `rgba(255,255,255,${a})`); gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gr; g.fillRect(x + dx - s, y + dy - s, s * 2, s * 2);
    }
  }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
function materialBuih(noise, warna = '#ffffff') {
  return new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, toneMapped: true,
    uniforms: { nt: { value: noise }, off: { value: new THREE.Vector2() }, col: { value: new THREE.Color(warna) }, k: { value: 1 } },
    vertexShader: 'attribute float aA; varying float vA; varying vec2 vUv; void main(){ vA = aA; vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `uniform sampler2D nt; uniform vec2 off; uniform vec3 col; uniform float k; varying float vA; varying vec2 vUv;
      void main(){ float n = texture2D(nt, vUv + off).r * 0.7 + texture2D(nt, vUv * 0.43 - off * 0.6).r * 0.6;
        float a = vA * smoothstep(0.12, 0.75, n * (0.6 + vA * 0.8)) * k;
        gl_FragColor = vec4(col, a); }`,
  });
}
// jejak buritan (wake): grid horizontal di belakang kapal, alfa per vertex
function wakeMesh(mat, L = 520, Wd = 260) {
  const nx = 160, nz = 90, pos = [], uv = [], aA = [], idx = [];
  const tanK = Math.tan(THREE.MathUtils.degToRad(19.5));
  for (let i = 0; i <= nx; i++) {
    const d = i / nx, x = -d * L;
    for (let j = 0; j <= nz; j++) {
      const z = (j / nz - 0.5) * Wd;
      const w = 6 + d * L * 0.06;                                    // lebar alur tengah
      const core = Math.exp(-Math.pow(z / w, 2)) * Math.pow(1 - d, 1.4) * Math.min(1, d * 25 + 0.35);
      const arm = d * L * tanK, aw = 2 + d * 10;
      const arms = Math.exp(-Math.pow((Math.abs(z) - arm) / aw, 2)) * 0.55 * Math.pow(1 - d, 1.8) * Math.min(1, d * 12);
      pos.push(x, 0.06, z); uv.push(x / 18, z / 18); aA.push(Math.min(1, core + arms));
    }
  }
  for (let i = 0; i < nx; i++) for (let j = 0; j < nz; j++) { const a = i * (nz + 1) + j, b = a + nz + 1; idx.push(a, b, a + 1, b, b + 1, a + 1); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('aA', new THREE.Float32BufferAttribute(aA, 1)); g.setIndex(idx);
  const m = new THREE.Mesh(g, mat); m.renderOrder = 2; m.frustumCulled = false; return m;
}
// buih sepanjang garis air lambung (lebih tebal di haluan)
function hullFoam(mat) {
  const { LOA } = KAPAL, N = 140, pos = [], uv = [], aA = [], idx = [];
  for (const s of [-1, 1]) {
    const base = pos.length / 3;
    for (let i = 0; i <= N; i++) {
      const u = i / N, x = u * LOA, b = halfB(u, 0.05);
      const bow = Math.max(0, (u - 0.7) / 0.3), w = 1.5 + bow * 9;
      [[b - 0.2, 1], [b + w * 0.35, 0.9], [b + w, 0]].forEach(([zz, a], j) => {
        pos.push(x, 0.08, s * zz); uv.push(x / 14, (zz - b) / 6); aA.push(Math.min(1, a * (0.6 + 0.8 * bow)) * Math.min(1, u * 12));
      });
    }
    for (let i = 0; i < N; i++) for (let j = 0; j < 2; j++) { const a = base + i * 3 + j, b = a + 3; idx.push(a, b, a + 1, b, b + 1, a + 1); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('aA', new THREE.Float32BufferAttribute(aA, 1)); g.setIndex(idx);
  const m = new THREE.Mesh(g, mat); m.material.side = THREE.DoubleSide; m.renderOrder = 2; m.frustumCulled = false; return m;
}

export function panggungLaut({ waktu = 'pagi', interior = false, bloom = 0.15, exposure = 0.95, kecepatan = 7.5 } = {}) {
  const D = buatDunia({ ao: false, bloom, exposure });
  const { scene, pmrem, cam } = D;
  cam.far = 9000; cam.updateProjectionMatrix();
  const lp = LANGIT[waktu] || LANGIT.pagi;
  const sk = langit(scene, pmrem, lp);
  const sea = laut(scene, { y: 0, size: 7000, rep: 350, color: waktu === 'senja' ? '#2a4f78' : '#1f6fa3' });
  scene.environment = sk.env;
  const kapal = buildKapal(); scene.add(kapal.root);
  const sun = matahari(scene, sk.sunDir, V(90, 10, 0), { span: 120, dist: 300, map: 4096, intensity: waktu === 'senja' ? 2.4 : 3.2, color: lp.sunCol || '#fff3e2' });
  scene.add(new THREE.HemisphereLight(waktu === 'senja' ? '#ffd0b0' : '#cfe6ff', '#4a6070', waktu === 'senja' ? 0.45 : 0.6));
  const noise = teksturBuih();
  const mW = materialBuih(noise), mH = materialBuih(noise);
  scene.add(wakeMesh(mW), hullFoam(mH));
  // dasar gelap di bawah laut: terlihat saat laut dibuat tembus pandang (tampilan X-ray)
  const dasar = new THREE.Mesh(new THREE.PlaneGeometry(4000, 4000), new THREE.MeshBasicMaterial({ color: '#082a48' }));
  dasar.rotation.x = -Math.PI / 2; dasar.position.y = -14; dasar.visible = false; scene.add(dasar);
  let isi = null;
  if (interior) { isi = buildInterior(); isi.group.visible = false; scene.add(isi.group); }
  const n1 = sea.mat.normalMap;
  return {
    ...D, sky: sk, sea, sun, kapal, refs: kapal.refs, isi,
    // t: waktu (dtk) → animasi laut dan buih; kapal diam, air mengalir ke arah buritan (−x)
    update(t) {
      sea.update(t); n1.offset.x += t * kecepatan / 20;
      mW.uniforms.off.value.set(t * kecepatan / 18 * 0.6, t * 0.01);
      mH.uniforms.off.value.set(t * kecepatan / 14, -t * 0.05);
    },
    setXray(k) {
      kapal.refs.xray(k); if (isi) isi.group.visible = k > 0.02; mW.uniforms.k.value = mH.uniforms.k.value = 1 - 0.7 * k;
      sea.mat.transparent = k > 0; sea.mat.opacity = 1 - 0.55 * k; sea.mat.depthWrite = k < 0.5; dasar.visible = k > 0;
    },
  };
}

// ---------- ruang mesin ----------
export const RM = { x0: -2.6, x1: 9.5, zb: -1.35, zf: 7, h: 3.3 };
export async function panggungRuangMesin({ tertutup = true, membran = 1, bloom = 0.12, exposure = 0.88, logos = null } = {}) {
  const D = buatDunia({ ao: false, bloom, exposure });
  const { scene, pmrem, renderer } = D;
  logos = logos || await muatLogo();
  const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.background = new THREE.Color('#1a2026');
  const S = (o) => new THREE.MeshStandardMaterial(o);
  const room = new THREE.Group(); scene.add(room);
  const mk = (geo, mat, x, y, z, parent = room, shadow = true) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = shadow; m.receiveShadow = true; parent.add(m); return m; };
  const box = (w, h, d, mat, x, y, z, parent, sh) => mk(new THREE.BoxGeometry(w, h, d), mat, x, y, z, parent, sh);
  const { x0, x1, zb, zf, h } = RM;

  // lantai checker plate
  const chk = TX.checkerPlate();
  [chk.normal, chk.rough].forEach((t) => { t.repeat.set((x1 - x0) / 0.3, (zf - zb) / 0.3); });
  const floorM = S({ color: '#8d969e', metalness: 0.75, roughness: 0.45, normalMap: chk.normal, roughnessMap: chk.rough, normalScale: new THREE.Vector2(0.8, 0.8) });
  const floor = mk(new THREE.PlaneGeometry(x1 - x0, zf - zb), floorM, (x0 + x1) / 2, 0, (zb + zf) / 2); floor.rotation.x = -Math.PI / 2;
  // garis jalur kuning di lantai
  const yel = S({ color: '#e8b923', roughness: 0.6 });
  [1.05, 2.9].forEach((z) => { const s = mk(new THREE.PlaneGeometry(x1 - x0 - 0.4, 0.06), yel, (x0 + x1) / 2, 0.002, z, room, false); s.rotation.x = -Math.PI / 2; });
  // dinding: cat putih krem + gading (frame) tiap 0,6 m + pelat bawah hijau
  const wallM = S({ color: '#b9beb6', roughness: 0.85 }), ribM = S({ color: '#aab0a8', roughness: 0.75 }), lowM = S({ color: '#5b7f6a', roughness: 0.7 });
  box(x1 - x0, h, 0.05, wallM, (x0 + x1) / 2, h / 2, zb - 0.03, room, false);
  box(x1 - x0, 0.9, 0.06, lowM, (x0 + x1) / 2, 0.45, zb - 0.01, room, false);
  for (let x = x0 + 0.3; x < x1; x += 0.6) box(0.012, h, 0.22, ribM, x, h / 2, zb + 0.09);
  box(0.05, h, zf - zb, wallM, x0 - 0.03, h / 2, (zb + zf) / 2, room, false);
  box(0.06, 0.9, zf - zb, lowM, x0 - 0.01, 0.45, (zb + zf) / 2, room, false);
  for (let z = zb + 0.3; z < zf; z += 0.6) box(0.22, h, 0.012, ribM, x0 + 0.09, h / 2, z);
  // plafon + balok dek
  const ceilM = S({ color: '#8f958f', roughness: 0.9 });
  box(x1 - x0, 0.05, zf - zb, ceilM, (x0 + x1) / 2, h + 0.03, (zb + zf) / 2, room, false);
  for (let x = x0 + 0.6; x < x1; x += 1.2) box(0.14, 0.3, zf - zb, ribM, x, h - 0.15, (zb + zf) / 2, room, false);
  // pipa plafon (warna standar kapal): air laut hijau, air tawar biru, bahan bakar cokelat, uap/knalpot berinsulasi perak
  const pipeM = (c, o = {}) => S({ color: c, roughness: 0.5, metalness: 0.2, ...o });
  const ceilPipe = (r, z, y, mat, xa = x0, xb = x1) => { const m = mk(new THREE.CylinderGeometry(r, r, xb - xa, 20), mat, (xa + xb) / 2, y, z); m.rotation.z = Math.PI / 2; return m; };
  ceilPipe(0.06, -1.05, 2.95, pipeM('#3f8f4f'));
  ceilPipe(0.045, -0.85, 2.98, pipeM('#7a5a3a'));
  ceilPipe(0.05, -0.65, 2.96, pipeM('#2f6fb3'));
  ceilPipe(0.2, 0.15, 2.9, pipeM('#9ea4a8', { metalness: 0.6, roughness: 0.4 }), 3.2, x1);
  [-0.9, -0.6, 3.0, 5.0, 7.0].forEach((x) => box(0.04, 0.4, 1.4, ribM, x, 3.1, -0.5));
  // lampu TL plafon
  const tubeM = S({ color: '#ffffff', emissive: '#f2f7ff', emissiveIntensity: 2.2 });
  const fixM = S({ color: '#e6e8e8', roughness: 0.5 });
  [[0.2, 1.4], [2.6, 1.4], [5.0, 1.4], [7.4, 1.4], [0.2, 4.4], [2.6, 4.4], [5.0, 4.4]].forEach(([x, z]) => {
    box(1.25, 0.06, 0.16, fixM, x, h - 0.32, z, room, false);
    const tb = mk(new THREE.CylinderGeometry(0.018, 0.018, 1.18, 10), tubeM, x, h - 0.37, z, room, false); tb.rotation.z = Math.PI / 2;
  });
  // mesin utama di latar kanan (blok, kepala silinder, turbocharger)
  const engM = S({ color: '#6f8f86', roughness: 0.5, metalness: 0.3 }), engD = S({ color: '#4c5f5a', roughness: 0.5, metalness: 0.4 });
  const eng = new THREE.Group(); eng.position.set(7.3, 0, 0.2); room.add(eng);
  box(4.2, 1.5, 1.6, engM, 0, 0.75, 0, eng); box(4.0, 0.5, 1.3, engD, 0, 1.75, 0, eng);
  for (let i = 0; i < 6; i++) { const c = mk(new THREE.CylinderGeometry(0.16, 0.16, 0.35, 16), engM, -1.6 + i * 0.64, 2.15, 0, eng); c.castShadow = true; box(0.4, 0.08, 0.4, engD, -1.6 + i * 0.64, 2.36, 0, eng); }
  const tc = mk(new THREE.SphereGeometry(0.42, 24, 16), S({ color: '#b8bcbe', metalness: 0.7, roughness: 0.3 }), 2.4, 2.1, 0, eng);
  // pagar pengaman & tangga di sekitar mesin
  const railM = S({ color: '#e5b622', roughness: 0.5 });
  [[-2.3, -0.9], [-2.3, 0.9], [2.3, 0.9], [2.3, -0.9]].forEach(([x, z]) => mk(new THREE.CylinderGeometry(0.02, 0.02, 1.0, 8), railM, x, 0.5, z + Math.sign(z) * 0.2, eng));
  [-0.9, 0.9].forEach((z) => { const r = mk(new THREE.CylinderGeometry(0.02, 0.02, 4.6, 8), railM, 0, 1.0, z + Math.sign(z) * 0.2, eng); r.rotation.z = Math.PI / 2; });
  // panel listrik di dinding kiri belakang
  const boxM = S({ color: '#c9cbc4', roughness: 0.5 });
  box(0.7, 1.0, 0.25, boxM, -1.6, 1.5, zb + 0.14); box(0.5, 0.7, 0.2, boxM, 3.4, 1.4, zb + 0.12);
  // tangki kecil & tabung pemadam
  mk(new THREE.CylinderGeometry(0.11, 0.11, 0.55, 20), S({ color: '#c62828', roughness: 0.4 }), -2.3, 0.28, 2.4);
  const tagM = S({ color: '#1d6b3a', roughness: 0.5 });

  // ---------- skid SWRO ----------
  const skid = buildSkid(logos, { tertutup, membran });
  scene.add(skid.root);
  // ---------- sambungan kapal: air laut, air tawar, pembuangan, listrik ----------
  const conn = {};
  const tube = (pts, r, mat, bend = 3) => {
    const path = new THREE.CurvePath(); let prev = pts[0].clone();
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i];
      if (i < pts.length - 1) {
        const n = pts[i + 1], rr = Math.min(r * bend, p.distanceTo(prev) / 2, p.distanceTo(n) / 2);
        const c0 = p.clone().add(prev.clone().sub(p).normalize().multiplyScalar(rr)), c1 = p.clone().add(n.clone().sub(p).normalize().multiplyScalar(rr));
        path.add(new THREE.LineCurve3(prev, c0)); path.add(new THREE.QuadraticBezierCurve3(c0, p.clone(), c1)); prev = c1;
      } else path.add(new THREE.LineCurve3(prev, p.clone()));
    }
    const m = new THREE.Mesh(new THREE.TubeGeometry(path, Math.max(40, Math.round(path.getLength() * 30)), r, 14, false), mat); m.castShadow = m.receiveShadow = true; room.add(m);
    return { path, r, mesh: m };
  };
  const seaM = pipeM('#3f8f4f'), fwM = pipeM('#2f6fb3'), drM = pipeM('#5d6670'), cabM = S({ color: '#202326', roughness: 0.7 });
  conn.seaIn = tube([V(-1.25, -0.05, 0.2), V(-1.25, 0.30, 0.2), V(-0.16, 0.30, 0.2)], 0.02, seaM);
  // strainer (saringan Y) dan katup pada jalur air laut
  const str = new THREE.Group(); str.position.set(-0.75, 0.30, 0.2); room.add(str);
  mk(new THREE.CylinderGeometry(0.04, 0.04, 0.16, 20), S({ color: '#33475a', roughness: 0.4, metalness: 0.5 }), 0, 0, 0, str).rotation.z = Math.PI / 2;
  const sb = mk(new THREE.CylinderGeometry(0.032, 0.032, 0.14, 20), S({ color: '#33475a', roughness: 0.4, metalness: 0.5 }), 0.03, -0.07, 0, str); sb.rotation.z = -0.6;
  [-0.1, 0.1].forEach((x) => mk(new THREE.CylinderGeometry(0.05, 0.05, 0.015, 20), S({ color: '#33475a', metalness: 0.5, roughness: 0.4 }), x, 0, 0, str).rotation.z = Math.PI / 2);
  const flr = mk(new THREE.CylinderGeometry(0.09, 0.09, 0.012, 24), drM, -1.25, 0.006, 0.2); // flens lantai
  conn.product = tube([V(2.34, 1.58, 0.30), V(2.62, 1.58, 0.30), V(2.62, 2.75, 0.30), V(2.62, 2.75, -0.65), V(x1, 2.75, -0.65)], 0.014, fwM);
  conn.drain = tube([V(2.34, 0.17, 0.30), V(2.75, 0.17, 0.30), V(2.75, 0.02, 0.30)], 0.014, drM);
  mk(new THREE.CylinderGeometry(0.07, 0.05, 0.08, 20), drM, 2.75, 0.04, 0.30);   // corong pembuangan lantai
  conn.bw = tube([V(0.585, YBW, -0.33), V(0.585, 0.06, -0.33), V(0.585, 0.06, -1.0), V(1.6, 0.06, -1.0)], 0.012, drM);
  conn.power = tube([V(0.45, 3.0, -0.6), V(0.45, 1.75, -0.6), V(0.45, 1.75, -0.2), V(0.45, 1.62, -0.2)], 0.012, cabM, 2);
  box(x1 - x0 - 1, 0.03, 0.25, S({ color: '#9aa1a7', metalness: 0.6, roughness: 0.4 }), (x0 + x1) / 2, 3.02, -0.6, room, false); // tray kabel
  // label pipa (pita warna dengan panah) dekat skid
  const band = (txt, col, w, p, ry = 0) => {
    const t = TX.textPanel(512, 96, (g, W, H) => { g.fillStyle = col; g.fillRect(0, 0, W, H); g.fillStyle = '#fff'; g.font = '800 54px Jakarta, sans-serif'; g.textBaseline = 'middle'; g.fillText('➜ ' + txt, 20, H / 2 + 3); });
    const m = mk(new THREE.PlaneGeometry(w, w * 96 / 512), S({ map: t, roughness: 0.6 }), p.x, p.y, p.z, room, false); m.rotation.y = ry; return m;
  };
  band('SEA WATER', '#2f7d40', 0.36, V(-0.95, 0.38, 0.235));
  band('FRESH WATER', '#2a62a3', 0.40, V(2.62, 2.2, 0.33), 0);
  void tagM;

  // ---------- cahaya ----------
  scene.add(new THREE.HemisphereLight('#eef4ff', '#3a3f42', 0.4));
  const key = new THREE.DirectionalLight('#ffffff', 1.9); key.position.set(1.6, 6, 4.5); key.target.position.set(1.1, 0.6, 0);
  key.castShadow = true; key.shadow.mapSize.set(2048, 2048); Object.assign(key.shadow.camera, { left: -4, right: 5, top: 4, bottom: -3, near: 1, far: 16 });
  key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02; scene.add(key, key.target);
  const fill = new THREE.DirectionalLight('#cfe2ff', 0.7); fill.position.set(-4, 3, 6); scene.add(fill);
  [[0.2, 1.4], [2.6, 1.4], [5.0, 1.4], [0.2, 4.4], [5.0, 4.4]].forEach(([x, z]) => { const l = new THREE.PointLight('#f4f8ff', 1.8, 6, 1.6); l.position.set(x, h - 0.5, z); scene.add(l); });
  renderer.shadowMap.autoUpdate = false; renderer.shadowMap.needsUpdate = true;
  let nF = 0; const r0 = D.render;
  return {
    ...D, logos, room, skid, refs: skid.refs, conn, engine: eng,
    render() { if (nF % 6 === 0) renderer.shadowMap.needsUpdate = true; nF++; r0(); },
    bayangan() { renderer.shadowMap.needsUpdate = true; },
  };
}
const YBW = 0.21;

// ---------- studio ----------
export async function panggungStudio({ bloom = 0.12, exposure = 0.95, lantai = true } = {}) {
  const D = buatDunia({ ao: false, bloom, exposure });
  const { scene, pmrem } = D;
  latarStudio(scene, pmrem);
  scene.add(new THREE.HemisphereLight('#dcecff', '#223344', 0.6));
  const key = new THREE.DirectionalLight('#ffffff', 2.0); key.position.set(3, 6, 6); key.castShadow = true; key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -3, right: 3, top: 3, bottom: -2, near: 1, far: 20 }); key.shadow.bias = -0.0004; scene.add(key);
  const rim = new THREE.DirectionalLight('#6ec3ff', 1.4); rim.position.set(-4, 3, -3); scene.add(rim);
  if (lantai) {
    const f = new THREE.Mesh(new THREE.CircleGeometry(4, 64), new THREE.MeshStandardMaterial({ color: '#0b2142', roughness: 0.35, metalness: 0.2, transparent: true, opacity: 0.85 }));
    f.rotation.x = -Math.PI / 2; f.receiveShadow = true; scene.add(f);
  }
  const logos = await muatLogo();
  return { ...D, key, rim, logos };
}
