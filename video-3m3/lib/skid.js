// Model 3D skid SWRO 3 m³/hari (acuan: P&ID + model SketchUp).
// Sumbu: x = panjang skid (0 → 2,2 m, kiri → kanan dilihat dari depan), y = atas, z = depan (+0,4) / belakang (−0,4).
// buildSkid(logo, { tertutup, membran }) → { root, refs }.
import * as THREE from 'three';
import * as TX from '../../video/lib/tekstur.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const L = 2.2, D = 0.4, Y0 = 0.08, YB = 0.19, YS = 0.90, YT = 1.60;

export const SKID = { L, D, YB, YS, YT };

export function skidMaterials() {
  const brushed = TX.brushed(7);
  const S = (o) => new THREE.MeshStandardMaterial(o);
  const P = (o) => new THREE.MeshPhysicalMaterial(o);
  return {
    ss: S({ color: '#d6dbe0', metalness: 0.95, roughness: 0.32, roughnessMap: brushed }),
    ssDark: S({ color: '#9aa1a8', metalness: 0.9, roughness: 0.38 }),
    upvc: S({ color: '#3f4449', roughness: 0.45 }),
    upvcLight: S({ color: '#8a9096', roughness: 0.45 }),
    frpTank: P({ color: '#b7c59c', roughness: 0.35, clearcoat: 0.5, clearcoatRoughness: 0.3 }),
    frpBase: S({ color: '#141516', roughness: 0.6 }),
    valveHead: S({ color: '#141517', roughness: 0.45 }),
    handle: S({ color: '#c9cdd1', metalness: 0.6, roughness: 0.35 }),
    blue: P({ color: '#1546b8', roughness: 0.3, clearcoat: 0.7 }),
    blueDark: P({ color: '#0d2f86', roughness: 0.32, clearcoat: 0.6 }),
    motor: S({ color: '#17191c', roughness: 0.5, metalness: 0.2 }),
    panel: S({ color: '#bdb9ad', roughness: 0.55 }),
    panelDark: S({ color: '#b4b0a5', roughness: 0.6 }),
    encl: S({ color: '#a8acb1', roughness: 0.5, metalness: 0.25 }),
    housing: P({ color: '#ececea', roughness: 0.32, clearcoat: 0.6 }),
    endcap: S({ color: '#8f9398', roughness: 0.45, metalness: 0.4 }),
    cream: S({ color: '#e3dfd3', roughness: 0.55 }),
    orange: S({ color: '#c8601b', roughness: 0.45 }),
    black: S({ color: '#111214', roughness: 0.55 }),
    rubber: S({ color: '#0f1011', roughness: 0.9 }),
    red: S({ color: '#c62828', roughness: 0.4 }),
    yellow: S({ color: '#e9b11f', roughness: 0.45 }),
    green: S({ color: '#2e9c3a', roughness: 0.35, emissive: '#1b7a28', emissiveIntensity: 0.5 }),
    amber: S({ color: '#e0a21a', roughness: 0.35, emissive: '#a06d00', emissiveIntensity: 0.4 }),
    redLamp: S({ color: '#d12b2b', roughness: 0.35, emissive: '#8a1010', emissiveIntensity: 0.4 }),
    screen: S({ color: '#0d2a5c', roughness: 0.2, emissive: '#1d4f9e', emissiveIntensity: 0.6 }),
    glass: P({ color: '#eef8ff', roughness: 0.05, transparent: true, opacity: 0.35, depthWrite: false }),
    floatRed: S({ color: '#d9452f', roughness: 0.4 }),
    gauge: S({ map: TX.gaugeFace(100), roughness: 0.3 }),
    perf: S({ color: '#b9bec3', metalness: 0.85, roughness: 0.4, map: perfTex(), alphaTest: 0.5, transparent: false, side: THREE.DoubleSide }),
    louver: S({ color: '#ffffff', roughness: 0.5, metalness: 0.25, map: louverTex() }),
  };
}

function perfTex() {
  const t = TX.textPanel(256, 64, (g, w, h) => {
    g.fillStyle = '#c3c8cd'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#4b5056'; for (let x = 10; x < w; x += 32) g.fillRect(x, 24, 16, 14);
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(12, 1);
  return t;
}
function louverTex() {
  return TX.textPanel(512, 512, (g, w, h) => {
    g.fillStyle = '#a8acb1'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 7; i++) {
      const y = 70 + i * 22; g.fillStyle = '#5f646a'; g.fillRect(110, y, 292, 9); g.fillStyle = '#c9cdd2'; g.fillRect(110, y + 9, 292, 3);
    }
    g.strokeStyle = '#8d9196'; g.lineWidth = 6; g.strokeRect(6, 6, w - 12, h - 12);
  });
}

// ---------- helper geometri ----------
function mk(geo, mat, parent, shadow = true) { const m = new THREE.Mesh(geo, mat); m.castShadow = m.receiveShadow = shadow; parent.add(m); return m; }
function box(w, h, d, mat, x, y, z, parent) { const m = mk(new THREE.BoxGeometry(w, h, d), mat, parent); m.position.set(x, y, z); return m; }
function cyl(r, a, b, mat, parent, seg = 24) {
  const dir = b.clone().sub(a), len = dir.length();
  const m = mk(new THREE.CylinderGeometry(r, r, len, seg), mat, parent);
  m.position.copy(a).add(b).multiplyScalar(0.5); m.quaternion.setFromUnitVectors(V(0, 1, 0), dir.normalize());
  return m;
}
function roundedPath(pts, rad) {
  const path = new THREE.CurvePath();
  let prev = pts[0].clone();
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i];
    if (i < pts.length - 1) {
      const n = pts[i + 1];
      const r = Math.min(rad, p.distanceTo(prev) / 2, p.distanceTo(n) / 2);
      const c0 = p.clone().add(prev.clone().sub(p).normalize().multiplyScalar(r));
      const c1 = p.clone().add(n.clone().sub(p).normalize().multiplyScalar(r));
      path.add(new THREE.LineCurve3(prev, c0)); path.add(new THREE.QuadraticBezierCurve3(c0, p.clone(), c1)); prev = c1;
    } else path.add(new THREE.LineCurve3(prev, p.clone()));
  }
  return path;
}
function pipe(pts, r, mat, parent, bend = 2.2) {
  const path = roundedPath(pts, r * bend);
  const m = mk(new THREE.TubeGeometry(path, Math.max(32, Math.round(path.getLength() * 60)), r, 16, false), mat, parent);
  return { path, r, mesh: m };
}
// Pelat label hitam-putih (seperti tag di model SketchUp)
function tag(text, w, parent, { h = null, bg = '#f4f4f2', fg = '#111', size = 64, bold = 800 } = {}) {
  const lines = text.split('\n');
  const cw = 1024, ch = 140 * lines.length + 40;
  const t = TX.textPanel(cw, ch, (g) => {
    g.fillStyle = '#111'; g.fillRect(0, 0, cw, ch); g.fillStyle = bg; g.fillRect(10, 10, cw - 20, ch - 20);
    g.fillStyle = fg; g.font = `${bold} ${size * 1.6}px Jakarta, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
    lines.forEach((l, i) => g.fillText(l, cw / 2, 20 + 70 + i * 140));
  });
  const hh = h || w * ch / cw;
  const m = mk(new THREE.PlaneGeometry(w, hh), new THREE.MeshStandardMaterial({ map: t, roughness: 0.5 }), parent, false);
  return m;
}
function gaugeDial(M, p, size, parent) {
  const g = new THREE.Group(); g.position.copy(p); parent.add(g);
  const c = mk(new THREE.CylinderGeometry(size, size, 0.035, 32), M.ss, g); c.rotation.x = Math.PI / 2;
  const f = mk(new THREE.CircleGeometry(size * 0.9, 32), M.gauge, g, false); f.position.z = 0.018;
  const nd = new THREE.Group(); nd.position.z = 0.02; g.add(nd);
  const n = mk(new THREE.BoxGeometry(size * 0.07, size * 0.8, 0.003), M.red, nd, false); n.position.y = size * 0.35;
  nd.rotation.z = 2.36;                       // 0 bar (skala 0–100: 270°, mulai kiri bawah)
  return { group: g, needle: nd, set(v) { nd.rotation.z = 2.36 - (v / 100) * 4.71; } };
}
function rotameter(M, x, y0, y1, z, parent) {
  const g = new THREE.Group(); parent.add(g);
  box(0.045, 0.035, 0.04, M.ssDark, x, y0, z, g); box(0.045, 0.035, 0.04, M.ssDark, x, y1, z, g);
  const tube = mk(new THREE.CylinderGeometry(0.014, 0.014, y1 - y0 - 0.03, 16), M.glass, g, false); tube.position.set(x, (y0 + y1) / 2, z);
  for (let i = 0; i < 9; i++) box(0.012, 0.0025, 0.001, M.black, x + 0.016, y0 + 0.04 + i * (y1 - y0 - 0.08) / 8, z + 0.015, g);
  const fl = mk(new THREE.CylinderGeometry(0.01, 0.006, 0.02, 12), M.floatRed, g, false); fl.position.set(x, y0 + 0.05, z);
  return { group: g, float: fl, set(k) { fl.position.y = y0 + 0.05 + k * (y1 - y0 - 0.1); } };
}
function ballValve(M, p, axis, r, parent) {
  const g = new THREE.Group(); g.position.copy(p); parent.add(g);
  const b = mk(new THREE.SphereGeometry(r * 1.7, 20, 14), M.ssDark, g);
  const stem = cyl(r * 0.3, V(0, r * 1.5, 0), V(0, r * 2.6, 0), M.ss, g, 10);
  const h = new THREE.Group(); h.position.y = r * 2.7; g.add(h);
  const hb = mk(new THREE.BoxGeometry(r * 5, r * 0.5, r * 0.9), M.red, h); hb.position.x = r * 2.2;
  if (axis === 'z') g.rotation.y = Math.PI / 2;
  return { group: g, handle: h, set(open) { h.rotation.y = open ? 0 : Math.PI / 2; } };
}

// ---------- model ----------
export function buildSkid(logos, { tertutup = true, membran = 1 } = {}) {
  const M = skidMaterials();
  const root = new THREE.Group();
  const refs = { M, doors: [], housings: [], pipes: {}, parts: {}, anchors: {}, tags: [] };
  const fr = new THREE.Group(); root.add(fr); refs.parts.frame = fr;

  // --- rangka SS304 hollow 40×40 ---
  const s = 0.04, xs = [0.02, 1.32, 2.18], zs = [-D + 0.02, D - 0.02];
  xs.forEach((x) => zs.forEach((z) => box(s, YT - Y0, s, M.ss, x, (YT + Y0) / 2, z, fr)));
  [YB - 0.02, YS, YT - 0.02].forEach((y) => {
    zs.forEach((z) => box(L, s, s, M.ss, L / 2, y, z, fr));
    xs.forEach((x) => box(s, s, 2 * D - 0.04, M.ss, x, y, 0, fr));
  });
  // bracing diagonal di sisi kiri & kanan atas
  [[0.02, 1], [2.18, -1]].forEach(([x]) => { const b = box(0.03, 0.03, 0.62, M.ss, x, YT - 0.2, 0, fr); b.rotation.x = 0.55; });
  // kanal berlubang (perforated) depan-belakang + pelat dasar
  zs.forEach((z) => { const c = box(L, YB - Y0 - 0.02, 0.006, M.perf, L / 2, (Y0 + YB) / 2 - 0.01, z + Math.sign(z) * 0.024, fr); c.castShadow = false; });
  box(L - 0.04, 0.008, 2 * D - 0.06, M.ssDark, L / 2, YB, 0, fr);
  // kaki adjustable + pad karet
  xs.forEach((x) => zs.forEach((z) => {
    cyl(0.009, V(x, 0.015, z), V(x, Y0, z), M.ss, fr, 10);
    mk(new THREE.CylinderGeometry(0.045, 0.05, 0.02, 24), M.rubber, fr).position.set(x, 0.01, z);
    mk(new THREE.CylinderGeometry(0.02, 0.02, 0.015, 6), M.ss, fr).position.set(x, Y0 - 0.008, z);
  }));
  refs.anchors.kaki = V(2.18, 0.03, D - 0.02);

  // --- tangki FRP 1054 (10" × 54") ---
  const tanks = [];
  [[0.50, 'SAND FILTER\nFRP 1054'], [0.82, 'ACTIVATED CARBON\nFRP 1054']].forEach(([x, lab], i) => {
    const g = new THREE.Group(); g.position.set(x, 0, -0.18); fr.add(g);
    const r = 0.127;
    mk(new THREE.CylinderGeometry(r * 1.01, r * 1.04, 0.18, 32), M.frpBase, g).position.y = YB + 0.09;
    mk(new THREE.CylinderGeometry(r, r, 1.22, 40), M.frpTank, g).position.y = YB + 0.18 + 0.61;
    const dome = mk(new THREE.SphereGeometry(r, 40, 16, 0, Math.PI * 2, 0, Math.PI / 2), M.frpTank, g); dome.position.y = YB + 1.40; dome.scale.y = 0.45;
    // head manual 3-way valve
    const hv = new THREE.Group(); hv.position.y = YB + 1.46; g.add(hv);
    mk(new THREE.CylinderGeometry(0.07, 0.075, 0.07, 28), M.valveHead, hv).position.y = 0.035;
    mk(new THREE.CylinderGeometry(0.062, 0.07, 0.07, 28), M.valveHead, hv).position.y = 0.105;
    mk(new THREE.CylinderGeometry(0.05, 0.062, 0.03, 28), M.valveHead, hv).position.y = 0.155;
    [-1, 1].forEach((sx) => { const p = mk(new THREE.CylinderGeometry(0.026, 0.026, 0.05, 16), M.valveHead, hv); p.rotation.z = Math.PI / 2; p.position.set(sx * 0.085, 0.06, 0); });
    const lever = new THREE.Group(); lever.position.y = 0.175; hv.add(lever);
    const lv = mk(new THREE.BoxGeometry(0.15, 0.022, 0.04), M.handle, lever); lv.position.set(0.045, 0.012, 0);
    const lt = mk(new THREE.BoxGeometry(0.04, 0.035, 0.045), M.handle, lever); lt.position.set(0.11, 0.0, 0);
    const tg = tag(lab, 0.15, g); tg.position.set(0, YB + 0.62, r + 0.004);
    tanks.push({ group: g, head: hv, lever, x, top: YB + 1.46 });
  });
  refs.parts.tanks = tanks;
  refs.anchors.sand = V(0.50, 0.8, -0.05); refs.anchors.carbon = V(0.82, 0.8, -0.05); refs.anchors.head = V(0.50, YB + 1.62, -0.18);

  // --- feed pump SS304 0,5 HP ---
  const fp = new THREE.Group(); fp.position.set(0, 0, 0.2); fr.add(fp);
  box(0.46, 0.02, 0.16, M.ssDark, 0.50, YB + 0.02, 0, fp);
  const vol = mk(new THREE.CylinderGeometry(0.07, 0.07, 0.12, 32), M.ss, fp); vol.rotation.z = Math.PI / 2; vol.position.set(0.36, 0.30, 0);
  for (let i = 0; i < 4; i++) { const rr = mk(new THREE.TorusGeometry(0.071, 0.006, 8, 32), M.ssDark, fp); rr.rotation.y = Math.PI / 2; rr.position.set(0.31 + i * 0.03, 0.30, 0); }
  const mot = mk(new THREE.CylinderGeometry(0.085, 0.085, 0.26, 32), M.motor, fp); mot.rotation.z = Math.PI / 2; mot.position.set(0.55, 0.30, 0);
  for (let i = 0; i < 8; i++) { const f = mk(new THREE.BoxGeometry(0.24, 0.006, 0.012), M.motor, fp); const a = i / 8 * Math.PI * 2; f.position.set(0.56, 0.30 + Math.sin(a) * 0.088, Math.cos(a) * 0.088); f.rotation.x = a; }
  box(0.08, 0.06, 0.08, M.motor, 0.58, 0.41, 0, fp);
  const fpt = tag('FEED PUMP\n0.5 HP SS304', 0.12, fp); fpt.position.set(0.60, 0.30, 0.09);
  refs.parts.feedPump = fp; refs.anchors.feedPump = V(0.45, 0.32, 0.30);
  // tutup kipas motor (berputar saat pompa jalan)
  const fan = new THREE.Group(); fan.position.set(0.69, 0.30, 0.2); fr.add(fan); refs.parts.feedRotor = fan;
  { const c = mk(new THREE.CylinderGeometry(0.08, 0.08, 0.02, 32), M.motor, fan); c.rotation.z = Math.PI / 2;
    for (let i = 0; i < 3; i++) { const bl = mk(new THREE.BoxGeometry(0.004, 0.13, 0.02), M.yellow, fan); bl.position.x = 0.012; bl.rotation.x = i * Math.PI / 3; } }

  // --- cartridge housing 20" Big Blue (2 × 20 µm + 2 × 5 µm) ---
  const carts = [];
  [[0.92, 20], [1.12, 20], [1.50, 5], [1.70, 5]].forEach(([x, um]) => {
    const g = new THREE.Group(); g.position.set(x, 0, 0.18); fr.add(g);
    mk(new THREE.CylinderGeometry(0.085, 0.08, 0.56, 36), M.blue, g).position.y = YB + 0.30;
    for (let i = 0; i < 10; i++) { const rib = mk(new THREE.BoxGeometry(0.006, 0.10, 0.006), M.blueDark, g); const a = i / 10 * Math.PI * 2; rib.position.set(Math.cos(a) * 0.082, YB + 0.08, Math.sin(a) * 0.082); }
    mk(new THREE.CylinderGeometry(0.095, 0.095, 0.03, 36), M.blueDark, g).position.y = YB + 0.60;
    mk(new THREE.CylinderGeometry(0.09, 0.095, 0.06, 36), M.blue, g).position.y = YB + 0.645;
    box(0.10, 0.012, 0.10, M.blueDark, 0, YB + 0.682, 0, g);
    mk(new THREE.CylinderGeometry(0.01, 0.01, 0.02, 12), M.red, g).position.set(0.02, YB + 0.695, 0.02);
    const tg = tag(`CARTRIDGE 20"\n${um} MICRON`, 0.12, g); tg.position.set(0, YB + 0.36, 0.088);
    carts.push({ group: g, x, um });
  });
  refs.parts.carts = carts; refs.anchors.cart20 = V(1.02, 0.55, 0.28); refs.anchors.cart5 = V(1.60, 0.55, 0.28);

  // --- pompa tekanan tinggi plunger SS316 60 bar ---
  const hp = new THREE.Group(); hp.position.set(0, 0, -0.16); fr.add(hp);
  box(0.52, 0.02, 0.18, M.ssDark, 1.34, YB + 0.02, 0, hp);
  const hm = mk(new THREE.CylinderGeometry(0.09, 0.09, 0.30, 32), M.motor, hp); hm.rotation.z = Math.PI / 2; hm.position.set(1.24, 0.31, 0);
  for (let i = 0; i < 10; i++) { const f = mk(new THREE.BoxGeometry(0.28, 0.006, 0.012), M.motor, hp); const a = i / 10 * Math.PI * 2; f.position.set(1.24, 0.31 + Math.sin(a) * 0.093, Math.cos(a) * 0.093); f.rotation.x = a; }
  box(0.08, 0.07, 0.08, M.motor, 1.22, 0.43, 0, hp);
  box(0.06, 0.12, 0.13, M.ss, 1.42, 0.31, 0, hp);                    // rumah crank
  const head = box(0.12, 0.13, 0.15, M.ss, 1.51, 0.31, 0, hp);       // manifold plunger
  [-0.045, 0, 0.045].forEach((z) => { const c = mk(new THREE.CylinderGeometry(0.02, 0.02, 0.02, 16), M.ssDark, hp); c.rotation.z = Math.PI / 2; c.position.set(1.575, 0.33, z); });
  mk(new THREE.CylinderGeometry(0.018, 0.018, 0.025, 16), M.yellow, hp).position.set(1.42, 0.385, 0);
  const hpt = tag('HP PUMP\n60 bar', 0.09, hp); hpt.position.set(1.24, 0.31, 0.094);
  refs.parts.hpPump = hp; refs.parts.hpHead = head; refs.anchors.hpPump = V(1.45, 0.34, -0.05);

  // --- tangki & pompa dosing ---
  const ds = new THREE.Group(); ds.position.set(1.93, 0, 0.17); fr.add(ds);
  mk(new THREE.CylinderGeometry(0.11, 0.11, 0.46, 40), M.cream, ds).position.y = YB + 0.23;
  mk(new THREE.CylinderGeometry(0.115, 0.115, 0.02, 40), M.cream, ds).position.y = YB + 0.47;
  const dp = box(0.13, 0.09, 0.10, M.orange, -0.02, YB + 0.53, 0, ds);
  const dph = mk(new THREE.CylinderGeometry(0.04, 0.04, 0.03, 24), M.black, ds); dph.rotation.x = Math.PI / 2; dph.position.set(-0.04, YB + 0.53, 0.06);
  const dtg = tag('DOSING TANK\nANTISCALANT', 0.13, ds); dtg.position.set(0, YB + 0.22, 0.112);
  refs.parts.dosing = ds; refs.parts.dosingHead = dph; refs.anchors.dosing = V(1.93, 0.62, 0.25);

  // --- panel kontrol + panel instrumen ---
  const cp = new THREE.Group(); fr.add(cp); refs.parts.control = cp;
  box(0.63, 0.63, 0.20, M.panel, 0.515, 1.245, 0.27, cp);
  const face = 0.371;
  box(0.004, 0.14, 0.02, M.ssDark, 0.81, 1.25, face + 0.01, cp);                 // handle pintu
  [['green', 0.29], ['amber', 0.36], ['redLamp', 0.43]].forEach(([m, x]) => { mk(new THREE.CylinderGeometry(0.016, 0.016, 0.012, 20), M[m], cp).rotation.x = Math.PI / 2; cp.children[cp.children.length - 1].position.set(x, 1.50, face + 0.006); });
  const plate = mk(new THREE.PlaneGeometry(0.40, 0.055), new THREE.MeshStandardMaterial({ map: nameplate(logos.light), roughness: 0.5 }), cp, false); plate.position.set(0.50, 1.43, face + 0.002);
  box(0.12, 0.08, 0.01, M.black, 0.34, 1.32, face + 0.005, cp); box(0.10, 0.06, 0.004, M.screen, 0.34, 1.32, face + 0.011, cp);
  [0.30, 0.37, 0.44].forEach((x) => { mk(new THREE.CylinderGeometry(0.012, 0.012, 0.01, 18), M.green, cp).rotation.x = Math.PI / 2; cp.children[cp.children.length - 1].position.set(x, 1.19, face + 0.005); });
  [0.30, 0.37, 0.44].forEach((x) => { const k = mk(new THREE.CylinderGeometry(0.016, 0.016, 0.02, 18), M.black, cp); k.rotation.x = Math.PI / 2; k.position.set(x, 1.12, face + 0.01); box(0.006, 0.026, 0.006, M.ssDark, x, 1.12, face + 0.022, cp); box(0.03, 0.01, 0.002, M.cream, x, 1.085, face + 0.002, cp); });
  box(0.07, 0.07, 0.006, M.yellow, 0.54, 1.12, face + 0.004, cp);
  const es = mk(new THREE.SphereGeometry(0.026, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), M.red, cp); es.rotation.x = Math.PI / 2; es.position.set(0.54, 1.12, face + 0.01);
  refs.anchors.estop = V(0.54, 1.12, face + 0.03); refs.anchors.display = V(0.34, 1.32, face + 0.02); refs.anchors.lampu = V(0.36, 1.50, face + 0.02);
  // panel instrumen
  box(0.44, 0.63, 0.12, M.panel, 1.075, 1.245, 0.31, cp);
  const fi = 0.371;
  const pgF = gaugeDial(M, V(0.97, 1.47, fi + 0.017), 0.042, cp); const pgC = gaugeDial(M, V(1.18, 1.47, fi + 0.017), 0.042, cp);
  const tA = tag('PG FEED (HP)', 0.09, cp); tA.position.set(0.97, 1.405, fi + 0.002);
  const tB = tag('PG CONCENTRATE', 0.10, cp); tB.position.set(1.18, 1.405, fi + 0.002);
  const rmP = rotameter(M, 0.97, 1.03, 1.35, fi + 0.02, cp); const rmC = rotameter(M, 1.18, 1.03, 1.35, fi + 0.02, cp);
  const tC = tag('FI PRODUCT', 0.08, cp); tC.position.set(0.97, 0.99, fi + 0.002);
  const tD = tag('FI CONCENTRATE', 0.10, cp); tD.position.set(1.18, 0.99, fi + 0.002);
  refs.parts.pgFeed = pgF; refs.parts.pgConc = pgC; refs.parts.fiProd = rmP; refs.parts.fiConc = rmC;
  pgF.set(0); pgC.set(0); rmP.set(0); rmC.set(0);
  refs.anchors.pgFeed = V(0.97, 1.47, fi + 0.05); refs.anchors.instrumen = V(1.075, 1.25, fi + 0.04);

  // --- housing membran FRP 4" (RO-101 SW30-4040), opsi 1–3 ---
  const hy = [1.14, 1.30, 1.46];
  hy.forEach((y, i) => {
    const g = new THREE.Group(); g.position.set(0, y, 0.05); fr.add(g);
    const body = mk(new THREE.CylinderGeometry(0.06, 0.06, 0.98, 40), M.housing, g); body.rotation.z = Math.PI / 2; body.position.x = 1.62;
    [1.12, 2.12].forEach((x) => { const c = mk(new THREE.CylinderGeometry(0.068, 0.068, 0.06, 40), M.endcap, g); c.rotation.z = Math.PI / 2; c.position.x = x; });
    [1.30, 1.95].forEach((x) => { const b = mk(new THREE.TorusGeometry(0.062, 0.008, 8, 40), M.black, g); b.rotation.y = Math.PI / 2; b.position.x = x; });
    const lb = tag(`RO-10${i + 1}  SW30-4040`, 0.20, g, { bg: '#1c5fc7', fg: '#fff' }); lb.position.set(1.62, 0.0, 0.062);
    // braket penyangga
    [1.30, 1.95].forEach((x) => box(0.03, 0.06, 0.03, M.ss, x, -0.08, 0, g));
    g.visible = i < membran;
    refs.housings.push({ group: g, y, body });
  });
  box(0.9, 0.03, 0.03, M.ss, 1.75, hy[0] - 0.11, 0.05, fr);           // balok penyangga housing
  refs.anchors.membran = V(1.62, hy[0] + 0.07, 0.11);

  // --- perpipaan ---
  const P = refs.pipes, r1 = 0.017, rh = 0.011, rs = 0.008;
  P.intake = pipe([V(-0.16, 0.30, 0.20), V(0.29, 0.30, 0.20)], r1, M.upvc, fr);
  const bvIn = ballValve(M, V(-0.05, 0.30, 0.20), 'x', r1, fr);
  P.feed = pipe([V(0.36, 0.37, 0.20), V(0.36, 0.62, 0.20), V(0.36, 0.62, -0.18), V(0.30, 0.62, -0.18), V(0.30, YB + 1.53, -0.18), V(0.415, YB + 1.53, -0.18)], r1, M.upvc, fr);
  P.t1t2 = pipe([V(0.585, YB + 1.53, -0.18), V(0.735, YB + 1.53, -0.18)], r1, M.upvc, fr);
  P.t2out = pipe([V(0.905, YB + 1.53, -0.18), V(1.00, YB + 1.53, -0.18), V(1.00, YB + 1.53, 0.03), V(1.00, 0.98, 0.03), V(0.78, 0.98, 0.03), V(0.78, YB + 0.63, 0.03), V(0.78, YB + 0.63, 0.18), V(0.84, YB + 0.63, 0.18)], r1, M.upvc, fr);
  P.cart = pipe([V(0.84, YB + 0.63, 0.18), V(1.78, YB + 0.63, 0.18)], r1, M.upvc, fr);
  P.toHP = pipe([V(1.78, YB + 0.63, 0.18), V(1.80, YB + 0.63, 0.18), V(1.80, YB + 0.63, -0.02), V(1.68, YB + 0.63, -0.02), V(1.68, 0.36, -0.02), V(1.68, 0.36, -0.16), V(1.575, 0.36, -0.16)], r1, M.upvc, fr);
  P.dose = pipe([V(1.91, YB + 0.53, 0.12), V(1.91, YB + 0.63, 0.12), V(1.80, YB + 0.63, 0.08)], 0.004, M.cream, fr, 4);
  P.hp = pipe([V(1.51, 0.38, -0.16), V(1.51, 0.98, -0.16), V(1.06, 0.98, -0.16), V(1.06, hy[0], -0.16), V(1.06, hy[0], 0.05), V(1.09, hy[0], 0.05)], rh, M.ss, fr);
  const hpv = ballValve(M, V(1.51, 0.72, -0.16), 'x', rh, fr);
  P.pgTap = pipe([V(1.06, 1.05, -0.16), V(1.06, 1.05, 0.12), V(0.97, 1.05, 0.12), V(0.97, 1.42, 0.25)], 0.004, M.ss, fr, 4);
  P.conc = pipe([V(2.07, hy[0] - 0.055, 0.05), V(2.07, 0.98, 0.05), V(2.07, 0.98, 0.27), V(2.07, 0.84, 0.27), V(2.12, 0.84, 0.30), V(2.12, 0.80, 0.30)], rs, M.ss, fr);
  P.flush = pipe([V(2.07, 1.03, 0.05), V(2.15, 1.03, 0.05), V(2.15, 0.88, 0.05), V(2.15, 0.88, 0.27), V(2.07, 0.88, 0.27)], rs, M.ss, fr);
  P.drain = pipe([V(2.12, 0.48, 0.30), V(2.12, 0.17, 0.30), V(2.34, 0.17, 0.30)], r1 * 0.8, M.upvcLight, fr);
  P.product = pipe([V(2.155, hy[0], 0.05), V(2.17, hy[0], 0.05), V(2.17, hy[0], 0.30), V(2.17, 1.58, 0.30), V(2.34, 1.58, 0.30)], r1 * 0.8, M.upvcLight, fr);
  P.bw1 = pipe([V(0.585, YB + 1.50, -0.24), V(0.585, YB + 0.02, -0.33)], 0.012, M.upvc, fr);
  P.bw2 = pipe([V(0.905, YB + 1.50, -0.24), V(0.905, YB + 0.02, -0.33)], 0.012, M.upvc, fr);
  const pgCx = gaugeDial(M, V(2.07, 0.96, 0.30), 0.032, fr);
  const nv = ballValve(M, V(2.07, 0.91, 0.27), 'z', rs * 1.4, fr);
  const fv = ballValve(M, V(2.15, 0.95, 0.05), 'z', rs * 1.4, fr);
  const rmPr = rotameter(M, 2.17, 1.22, 1.44, 0.30, fr);
  const rmCo = rotameter(M, 2.12, 0.50, 0.80, 0.30, fr);
  box(0.09, 0.08, 0.05, M.cream, 2.17, 1.50, 0.30, fr); box(0.05, 0.03, 0.003, M.screen, 2.17, 1.51, 0.327, fr);
  const tgs = [['SEA WATER IN', 0.10, V(0.04, 0.36, 0.22)], ['PRODUCT OUT', 0.10, V(2.26, 1.64, 0.32)], ['DRAIN', 0.06, V(2.27, 0.23, 0.32)],
    ['FI PRODUCT', 0.075, V(2.09, 1.33, 0.32)], ['FI CONCENTRATE', 0.09, V(2.04, 0.64, 0.33)], ['PG CONC.', 0.06, V(1.99, 0.96, 0.31)],
    ['FLUSH VALVE', 0.08, V(2.07, 1.07, 0.32)], ['NEEDLE VALVE', 0.085, V(1.98, 0.90, 0.30)], ['CONDUCTIVITY\nMETER', 0.07, V(2.17, 1.565, 0.33)],
    ['BACKWASH DRAIN', 0.09, V(0.585, 0.32, -0.36)], ['BACKWASH DRAIN', 0.09, V(0.905, 0.32, -0.36)]];
  tgs.forEach(([t, w, p]) => { const m = tag(t, w, fr); m.position.copy(p); if (p.z < 0) m.rotation.y = Math.PI; refs.tags.push(m); });
  Object.assign(refs.parts, { bvIn, hpv, nv, fv, pgCx, rmPr, rmCo });
  Object.assign(refs.anchors, { intake: V(-0.06, 0.36, 0.22), conductivity: V(2.17, 1.50, 0.34), pgConc: V(2.07, 0.96, 0.33), needle: V(2.07, 0.91, 0.30), flush: V(2.15, 0.95, 0.08), product: V(2.30, 1.58, 0.30), drain: V(2.30, 0.17, 0.30), hpValve: V(1.51, 0.72, -0.12) });

  // --- panel penutup (versi tertutup): pintu engsel bisa dibuka ---
  const encl = new THREE.Group(); root.add(encl); refs.parts.encl = encl;
  const door = (x0, x1, y0, y1, hingeLeft, louvers = true) => {
    const piv = new THREE.Group(); piv.position.set(hingeLeft ? x0 : x1, (y0 + y1) / 2, D + 0.012); encl.add(piv);
    const w = x1 - x0 - 0.006;
    const pn = box(w, y1 - y0 - 0.006, 0.012, louvers ? M.louver : M.encl, (hingeLeft ? 1 : -1) * w / 2, 0, 0, piv);
    box(0.016, 0.12, 0.02, M.ss, (hingeLeft ? 1 : -1) * (w - 0.05), 0, 0.016, piv);
    const d = { pivot: piv, sign: hingeLeft ? -1 : 1, set(k) { piv.rotation.y = d.sign * k * 1.75; } };
    refs.doors.push(d); return d;
  };
  door(0.04, 0.66, YB + 0.01, YS - 0.02, true); door(0.66, 1.30, YB + 0.01, YS - 0.02, false);
  door(1.34, 1.76, YB + 0.01, YS - 0.02, true); door(1.76, 2.16, YB + 0.01, YS - 0.02, false);
  door(1.34, 2.16, YS + 0.02, YT - 0.04, false);
  // strip tetap kiri panel kontrol, sisi kiri/kanan, belakang
  box(0.16, YT - YS - 0.06, 0.012, M.encl, 0.12, (YS + YT) / 2 - 0.01, D + 0.012, encl);
  [[-0.012, 0], [L + 0.012, 0]].forEach(([x]) => box(0.012, YT - YB - 0.04, 2 * D - 0.04, M.encl, x, (YB + YT) / 2 - 0.01, 0, encl));
  box(L - 0.04, YT - YB - 0.04, 0.012, M.encl, L / 2, (YB + YT) / 2 - 0.01, -D - 0.012, encl);
  const brand = mk(new THREE.PlaneGeometry(0.62, 0.14), new THREE.MeshStandardMaterial({ map: brandPlate(logos.dark), roughness: 0.45, transparent: true }), refs.doors[4].pivot, false);
  brand.position.set(-0.41, 0.17, 0.008);
  encl.visible = tertutup;
  refs.setPintu = (k) => refs.doors.forEach((d) => d.set(k));
  refs.setMembran = (n) => refs.housings.forEach((h, i) => (h.group.visible = i < n));
  return { root, refs };
}

function nameplate(logo) {
  return TX.textPanel(1024, 140, (g, w, h) => {
    g.fillStyle = '#a9aca7'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#16181a'; g.font = '800 92px Jakarta, sans-serif'; g.textBaseline = 'middle'; g.fillText('SWRO 3 m³/day', 40, h / 2 + 4);
    if (logo) { const lh = 100, lw = lh * logo.width / logo.height; g.drawImage(logo, w - lw - 30, (h - lh) / 2, lw, lh); }
  });
}
function brandPlate(logo) {
  return TX.textPanel(1240, 280, (g, w, h) => {
    g.fillStyle = 'rgba(14,34,66,0.92)'; g.beginPath(); g.roundRect(0, 0, w, h, 28); g.fill();
    if (logo) { const lh = 190, lw = lh * logo.width / logo.height; g.drawImage(logo, 40, (h - lh) / 2, lw, lh); }
    g.fillStyle = '#fff'; g.font = '800 70px Jakarta, sans-serif'; g.fillText('SWRO 3 m³/day', 470, 125);
    g.fillStyle = '#9fd3ff'; g.font = '600 40px Jakarta, sans-serif'; g.fillText('PT TRAYA HYDRO INDONESIA', 472, 195);
  });
}
