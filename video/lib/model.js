// Model 3D prosedural: sistem SWRO dalam kontainer 40 ft High Cube, branding PT Traya Hydro Indonesia.
// Satuan meter. Lantai dalam y=0; x = panjang (0 dinding depan → 12,03 sisi pintu);
// z = lebar (−1,175 sisi lorong → +1,175 sisi peralatan).
import * as THREE from 'three';
import * as TX from './tekstur.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const UP = V(0, 1, 0);
export const IN = { L: 12.03, W: 2.35, H: 2.70 };
export const EX = { x0: -0.08, x1: 12.11, z: 1.219, y0: -0.16, y1: 2.736 };

// ---------- Material ----------
export function makeMaterials(logos) {
  const logoImg = logos.dark;
  const brushed = TX.brushed();
  const chk = TX.checkerPlate();
  const S = (o) => new THREE.MeshStandardMaterial(o);
  const P = (o) => new THREE.MeshPhysicalMaterial(o);
  const M = {
    frp: P({ color: '#f1f1ec', roughness: 0.3, clearcoat: 0.7, clearcoatRoughness: 0.15 }),
    frpBronze: S({ color: '#b8925a', roughness: 0.45, metalness: 0.25 }),
    ss: S({ color: '#dfe4e8', metalness: 1, roughness: 0.3, roughnessMap: brushed }),
    duplex: S({ color: '#c9cfd5', metalness: 1, roughness: 0.34, roughnessMap: brushed }),
    upvc: S({ color: '#202327', roughness: 0.42 }),
    upvcGray: S({ color: '#7b838b', roughness: 0.48 }),
    motor: S({ color: '#1f4f94', roughness: 0.38, metalness: 0.15 }),
    motorDark: S({ color: '#173b70', roughness: 0.45, metalness: 0.15 }),
    frame: S({ color: '#474d55', roughness: 0.55, metalness: 0.3 }),
    galv: S({ color: '#b4b9bd', roughness: 0.45, metalness: 0.85 }),
    cabinet: S({ color: '#d9dbd8', roughness: 0.42, metalness: 0.1 }),
    pe: S({ color: '#f2f1ec', roughness: 0.6 }),
    mmf: P({ color: '#1a3459', roughness: 0.32, clearcoat: 0.6 }),
    cfBlue: P({ color: '#1f6fd0', roughness: 0.28, clearcoat: 0.8 }),
    white: S({ color: '#f4f5f6', roughness: 0.5 }),
    red: S({ color: '#c62828', roughness: 0.4 }),
    yellow: S({ color: '#f9a825', roughness: 0.45 }),
    green: S({ color: '#2e7d32', roughness: 0.4, emissive: '#1b5e20', emissiveIntensity: 0.4 }),
    blueInst: S({ color: '#1e88e5', roughness: 0.35 }),
    black: S({ color: '#111315', roughness: 0.5 }),
    rubber: S({ color: '#141516', roughness: 0.85 }),
    glass: P({ color: '#e8f6ff', roughness: 0.05, transparent: true, opacity: 0.28, depthWrite: false }),
    floor: S({ color: '#c8ccd0', metalness: 0.85, roughness: 0.55, roughnessMap: chk.rough, normalMap: chk.normal, normalScale: new THREE.Vector2(0.9, 0.9) }),
    wall: S({ color: '#eceff1', roughness: 0.62, normalMap: TX.wallPanel(14), normalScale: new THREE.Vector2(0.6, 0.6) }),
    ceil: S({ color: '#f1f3f4', roughness: 0.7, normalMap: TX.wallPanel(14), normalScale: new THREE.Vector2(0.4, 0.4) }),
    led: S({ color: '#ffffff', emissive: '#ffffff', emissiveIntensity: 2.2 }),
    concrete: S({ color: '#9a9c9a', roughness: 0.92 }),
  };
  M.exterior = S({ color: '#ffffff', roughness: 0.5, metalness: 0.35, map: brandTexture(logoImg) });
  M.exteriorPlain = S({ color: '#132a4c', roughness: 0.5, metalness: 0.35 });
  M.hmi = S({ color: '#000', emissive: '#ffffff', emissiveMap: hmiTexture(logoImg), emissiveIntensity: 1.0, roughness: 0.2 });
  M.gauge = S({ map: TX.gaugeFace(100), roughness: 0.3 });
  M.gaugeLP = S({ map: TX.gaugeFace(10), roughness: 0.3 });
  return M;
}

// Grafis branding pada dinding samping kontainer (diproyeksikan planar, mengikuti gelombang)
function brandTexture(logo) {
  return TX.textPanel(4096, 1024, (g, w, h) => {
    const grd = g.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, '#16305a'); grd.addColorStop(1, '#0e2242');
    g.fillStyle = grd; g.fillRect(0, 0, w, h);
    // gelombang air di bagian bawah
    g.fillStyle = '#1e6fd0';
    g.beginPath(); g.moveTo(0, h);
    for (let x = 0; x <= w; x += 8) g.lineTo(x, h * 0.80 + Math.sin(x / 260) * 26 + Math.sin(x / 97) * 8);
    g.lineTo(w, h); g.fill();
    g.fillStyle = '#4fc3f7'; g.globalAlpha = 0.55;
    g.beginPath(); g.moveTo(0, h);
    for (let x = 0; x <= w; x += 8) g.lineTo(x, h * 0.87 + Math.sin(x / 210 + 1.7) * 20);
    g.lineTo(w, h); g.fill(); g.globalAlpha = 1;
    if (logo) { const lh = 470, lw = lh * logo.width / logo.height; g.drawImage(logo, 260, 150, lw, lh); }
    g.fillStyle = '#ffffff'; g.font = '800 150px Jakarta, sans-serif'; g.fillText('SWRO', 1500, 380);
    g.font = '600 72px Jakarta, sans-serif'; g.fillText('SEAWATER REVERSE OSMOSIS SYSTEM', 1505, 480);
    g.fillStyle = '#9fd3ff'; g.font = '600 58px Jakarta, sans-serif'; g.fillText('PT TRAYA HYDRO INDONESIA  ·  www.trayahydro.com', 1505, 600);
  });
}

// Layar HMI pada panel kontrol
function hmiTexture(logo) {
  return TX.textPanel(800, 500, (g, w, h) => {
    g.fillStyle = '#0b1a30'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#132b4f'; g.fillRect(0, 0, w, 56);
    if (logo) g.drawImage(logo, 16, 6, 44 * logo.width / logo.height, 44);
    g.fillStyle = '#fff'; g.font = '700 24px Jakarta, sans-serif'; g.fillText('SWRO — LAYAR UTAMA', 150, 37);
    g.fillStyle = '#4caf50'; g.beginPath(); g.arc(760, 28, 10, 0, 7); g.fill();
    const box = (x, y, t, v) => {
      g.strokeStyle = '#4fc3f7'; g.lineWidth = 2; g.strokeRect(x, y, 112, 66);
      g.fillStyle = '#9fd3ff'; g.font = '600 15px Jakarta, sans-serif'; g.fillText(t, x + 8, y + 22);
      g.fillStyle = '#fff'; g.font = '700 20px Jakarta, sans-serif'; g.fillText(v, x + 8, y + 52);
    };
    const xs = [24, 152, 280, 408, 536, 664];
    [['INTAKE', '3.2 bar'], ['MMF', '2.8 bar'], ['CF 5 µm', '2.5 bar'], ['HPP', '62 bar'], ['RO', '99.7 %'], ['PRODUK', '310 mg/L']].forEach(([t, v], i) => box(xs[i], 110, t, v));
    g.strokeStyle = '#4fc3f7'; g.lineWidth = 3;
    for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(xs[i] + 112, 143); g.lineTo(xs[i + 1], 143); g.stroke(); }
    // grafik tren
    g.strokeStyle = '#2a4a75'; g.lineWidth = 1;
    for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(24, 230 + i * 50); g.lineTo(776, 230 + i * 50); g.stroke(); }
    g.strokeStyle = '#4fc3f7'; g.lineWidth = 3; g.beginPath();
    for (let x = 0; x <= 752; x += 8) g.lineTo(24 + x, 300 + Math.sin(x / 60) * 10 + Math.sin(x / 23) * 4);
    g.stroke();
    g.strokeStyle = '#ffb74d'; g.beginPath();
    for (let x = 0; x <= 752; x += 8) g.lineTo(24 + x, 400 + Math.sin(x / 80 + 1) * 8);
    g.stroke();
    g.fillStyle = '#9fd3ff'; g.font = '600 15px Jakarta, sans-serif'; g.fillText('Tekanan umpan (bar)', 30, 222); g.fillText('Konduktivitas produk (µS/cm)', 30, 380);
  });
}

// ---------- Helper geometri ----------
let ROOT;
function add(geom, mat, parent = ROOT, shadow = true) {
  const m = new THREE.Mesh(geom, mat);
  m.castShadow = shadow; m.receiveShadow = true;
  parent.add(m); return m;
}
function box(w, h, d, mat, x, y, z, parent) { const m = add(new THREE.BoxGeometry(w, h, d), mat, parent); m.position.set(x, y, z); return m; }
// Silinder di antara dua titik
function cyl(r, a, b, mat, parent, seg = 32, r2 = r) {
  const len = a.distanceTo(b);
  const m = add(new THREE.CylinderGeometry(r2, r, len, seg), mat, parent);
  m.position.copy(a).add(b).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(UP, b.clone().sub(a).normalize());
  return m;
}
// Cincin baut / flens di titik p dengan arah dir
function ring(r, len, p, dir, mat, parent, seg = 32) {
  return cyl(r, p.clone().addScaledVector(dir, -len / 2), p.clone().addScaledVector(dir, len / 2), mat, parent, seg);
}

function roundedPath(pts, rad) {
  const path = new THREE.CurvePath();
  let prev = pts[0].clone();
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i];
    if (i < pts.length - 1) {
      const n = pts[i + 1];
      const a = p.clone().sub(prev).normalize(), b = n.clone().sub(p).normalize();
      const r = Math.min(rad, p.distanceTo(prev) / 2, n.distanceTo(p) / 2);
      const c0 = p.clone().addScaledVector(a, -r), c1 = p.clone().addScaledVector(b, r);
      if (prev.distanceTo(c0) > 1e-4) path.add(new THREE.LineCurve3(prev, c0));
      path.add(new THREE.QuadraticBezierCurve3(c0, p.clone(), c1));
      prev = c1;
    } else path.add(new THREE.LineCurve3(prev, p.clone()));
  }
  return path;
}

// Jalur pipa lengkap dengan fitting: 'grooved' (kopling baja tahan karat) atau 'socket' (UPVC)
const pipes = [];
function pipe(pts, r, mat, { fit = 'grooved', fitMat, parent = ROOT, name } = {}) {
  const path = roundedPath(pts, r * 2.2);
  const len = path.getLength();
  const m = add(new THREE.TubeGeometry(path, Math.max(24, Math.round(len * 30)), r, 20, false), mat, parent);
  const fm = fitMat || mat;
  path.curves.forEach((c) => {
    if (c instanceof THREE.LineCurve3) {
      const L = c.v1.distanceTo(c.v2); if (L < 0.12) return;
      const d = c.v2.clone().sub(c.v1).normalize();
      [c.v1.clone().addScaledVector(d, 0.03), c.v2.clone().addScaledVector(d, -0.03)].forEach((p) => {
        if (fit === 'grooved') {
          ring(r * 1.32, r * 0.9, p, d, fm, parent, 24);
          // baut kopling
          const side = Math.abs(d.y) > 0.9 ? V(1, 0, 0) : V(0, 1, 0);
          [1, -1].forEach((s) => { const q = p.clone().addScaledVector(side.clone().cross(d).normalize(), s * r * 1.45); ring(r * 0.18, r * 0.9, q, d, fm, parent, 8); });
        } else if (fit === 'socket') ring(r * 1.14, r * 1.4, p, d, fm, parent, 24);
      });
    }
  });
  pipes.push({ name, path, r, mesh: m });
  return { mesh: m, path };
}

// ---------- Komponen ----------
// Manometer kecil (case stainless + muka dial) menghadap arah normal n
function gauge(p, n, mat, size = 0.05, parent = ROOT) {
  const g = new THREE.Group(); g.position.copy(p); parent.add(g);
  g.quaternion.setFromUnitVectors(V(0, 0, 1), n.clone().normalize());
  const c = add(new THREE.CylinderGeometry(size, size, 0.03, 32), mat.ss, g); c.rotation.x = Math.PI / 2;
  const f = add(new THREE.CircleGeometry(size * 0.9, 32), mat.gauge, g, false); f.position.z = 0.0155;
  const nd = add(new THREE.BoxGeometry(size * 0.08, size * 0.75, 0.002), mat.black, g, false); nd.position.set(size * 0.25, size * 0.2, 0.018); nd.rotation.z = -0.9;
  add(new THREE.CylinderGeometry(0.008, 0.008, 0.05, 12), mat.ss, g).position.set(0, -size - 0.02, 0);
  return g;
}
// Pressure transmitter: badan stainless + kepala biru
function transmitter(p, mat, parent = ROOT) {
  const g = new THREE.Group(); g.position.copy(p); parent.add(g);
  add(new THREE.CylinderGeometry(0.012, 0.012, 0.08, 12), mat.ss, g).position.y = 0.04;
  add(new THREE.CylinderGeometry(0.035, 0.035, 0.06, 24), mat.blueInst, g).position.y = 0.11;
  const cap = add(new THREE.CylinderGeometry(0.032, 0.032, 0.03, 24), mat.ss, g); cap.position.set(0, 0.11, 0.035); cap.rotation.x = Math.PI / 2;
  return g;
}
// Katup bola dengan tuas merah pada pipa di titik p, arah pipa d
function ballValve(p, d, r, mat, parent = ROOT) {
  ring(r * 1.5, r * 3, p, d, mat.ss, parent, 20);
  const up = Math.abs(d.y) > 0.9 ? V(1, 0, 0) : V(0, 1, 0);
  const stem = p.clone().addScaledVector(up, r * 1.5);
  cyl(r * 0.25, stem, stem.clone().addScaledVector(up, r * 1.2), mat.ss, parent, 10);
  const h = box(r * 6, r * 0.4, r * 0.9, mat.red, 0, 0, 0, parent);
  h.position.copy(stem).addScaledVector(up, r * 1.3).addScaledVector(d, r * 2.5);
  h.quaternion.setFromUnitVectors(V(1, 0, 0), d);
}
// Katup kupu-kupu UPVC dengan tuas
function butterflyValve(p, d, r, mat, parent = ROOT) {
  ring(r * 1.6, r * 1.1, p, d, mat.upvcGray, parent, 24);
  const up = Math.abs(d.y) > 0.9 ? V(1, 0, 0) : V(0, 1, 0);
  const top = p.clone().addScaledVector(up, r * 1.6);
  cyl(r * 0.35, top, top.clone().addScaledVector(up, r * 1.4), mat.black, parent, 12);
  const h = box(r * 4.5, r * 0.45, r * 0.7, mat.red, 0, 0, 0, parent);
  h.position.copy(top).addScaledVector(up, r * 1.5).addScaledVector(d, r * 1.6);
  h.quaternion.setFromUnitVectors(V(1, 0, 0), d);
}

// Motor listrik horizontal (sumbu x) dengan sirip pendingin, kotak terminal, tutup kipas
function motor(x0, x1, y, z, r, mat, parent = ROOT) {
  const g = new THREE.Group(); parent.add(g);
  cyl(r, V(x0, y, z), V(x1, y, z), mat.motor, g, 40);
  const fins = 28;
  for (let i = 0; i < fins; i++) {
    const a = (i / fins) * Math.PI * 2;
    if (Math.sin(a) < -0.6) continue; // bagian bawah tertutup kaki motor
    const f = box(x1 - x0 - 0.08, 0.004, r * 0.16, mat.motor, (x0 + x1) / 2, y + Math.sin(a) * (r + r * 0.07), z + Math.cos(a) * (r + r * 0.07), g);
    f.rotation.x = -a;
  }
  cyl(r * 1.02, V(x1, y, z), V(x1 + r * 0.55, y, z), mat.motorDark, g, 40);
  for (let i = 1; i < 6; i++) ring(r * 1.03, 0.006, V(x1 + r * 0.09 * i, y, z), V(1, 0, 0), mat.black, g, 40);
  ring(r * 1.12, 0.03, V(x0 + 0.015, y, z), V(1, 0, 0), mat.motorDark, g, 40);
  box(x1 - x0 - 0.1, r * 0.5, r * 1.7, mat.motorDark, (x0 + x1) / 2, y - r * 0.85, z, g);
  // kotak terminal + pelat nama
  box(r * 0.95, r * 0.6, r * 0.95, mat.motor, (x0 + x1) / 2 - 0.03, y + r * 1.2, z, g);
  box(r * 0.75, r * 0.12, r * 0.75, mat.motorDark, (x0 + x1) / 2 - 0.03, y + r * 1.55, z, g);
  box(0.09, 0.05, 0.002, mat.galv, (x0 + x1) / 2 + 0.05, y + r * 0.4, z - r - 0.02, g);
  cyl(0.012, V((x0 + x1) / 2 - 0.03, y + r * 1.2, z - r * 0.48), V((x0 + x1) / 2 - 0.03, y + r * 1.2, z - r * 0.65), mat.black, g, 10);
  cyl(r * 0.18, V(x0 - 0.06, y, z), V(x0, y, z), mat.ss, g, 16); // poros
  return g;
}

// Pompa multistage horizontal stainless (sumbu x)
function multistagePump(x0, x1, y, z, r, mat, parent = ROOT) {
  const g = new THREE.Group(); parent.add(g);
  cyl(r, V(x0, y, z), V(x1, y, z), mat.ss, g, 40);
  const n = 6;
  for (let i = 0; i <= n; i++) ring(r * 1.08, 0.025, V(x0 + (i / n) * (x1 - x0), y, z), V(1, 0, 0), mat.duplex, g, 40);
  for (let k = 0; k < 4; k++) { const a = Math.PI / 4 + k * Math.PI / 2; cyl(0.008, V(x0 - 0.02, y + Math.sin(a) * r * 1.15, z + Math.cos(a) * r * 1.15), V(x1 + 0.02, y + Math.sin(a) * r * 1.15, z + Math.cos(a) * r * 1.15), mat.ss, g, 8); }
  ring(r * 1.25, 0.06, V(x0, y, z), V(1, 0, 0), mat.duplex, g, 40);
  ring(r * 1.25, 0.06, V(x1, y, z), V(1, 0, 0), mat.duplex, g, 40);
  [x0 + 0.03, x1 - 0.03].forEach((x) => box(0.06, y - 0.12, r * 2, mat.frame, x, (y + 0.12) / 2, z, g));
  return g;
}

// ---------- Kontainer ----------
function corrugatedWall(len, height, flipU, mat, parent) {
  // Profil trapesium dinding samping: pitch 0,278 m, kedalaman 0,036 m
  const pitch = 0.278, dep = 0.036, s = new THREE.Shape();
  const xs = [];
  for (let x = 0; x <= len + 1e-6; x += pitch) {
    xs.push([x, 0], [x + 0.035, dep], [x + 0.035 + 0.07, dep], [x + 0.14, 0], [x + 0.278 - 0.0001, 0]);
  }
  const prof = xs.filter(([x]) => x <= len);
  s.moveTo(0, -0.004);
  prof.forEach(([x, d]) => s.lineTo(x, d));
  s.lineTo(len, -0.004);
  s.lineTo(0, -0.004);
  const geo = new THREE.ExtrudeGeometry(s, { depth: height, bevelEnabled: false, curveSegments: 1 });
  // UV planar: u sepanjang dinding, v tinggi (agar branding mengikuti gelombang)
  const pos = geo.attributes.position, uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, flipU ? 1 - pos.getX(i) / len : pos.getX(i) / len, pos.getZ(i) / height);
  uv.needsUpdate = true;
  const m = add(geo, mat, parent);
  m.rotation.x = -Math.PI / 2; // ekstrusi ke atas (y), gelombang ke arah −z
  return m;
}

function buildContainer(M, refs) {
  const g = new THREE.Group(); ROOT.add(g); refs.container = g;
  const { x0, x1, z, y0, y1 } = EX;
  const len = x1 - x0, hh = y1 - y0 - 0.32;
  // Lantai checker plate & dinding dalam
  const floor = add(new THREE.PlaneGeometry(IN.L, IN.W), M.floor, g, false);
  floor.rotation.x = -Math.PI / 2; floor.position.set(IN.L / 2, 0, 0);
  const inner = new THREE.Group(); g.add(inner); refs.inner = inner;
  const wallTex = M.wall.normalMap; wallTex.repeat.set(1, 1);
  const wb = add(new THREE.PlaneGeometry(IN.L, IN.H), M.wall, inner, false); wb.position.set(IN.L / 2, IN.H / 2, IN.W / 2); wb.rotation.y = Math.PI;
  const wf = add(new THREE.PlaneGeometry(IN.W, IN.H), M.wall, inner, false); wf.position.set(0, IN.H / 2, 0); wf.rotation.y = Math.PI / 2;
  const ce = add(new THREE.PlaneGeometry(IN.L, IN.W), M.ceil, inner, false); ce.position.set(IN.L / 2, IN.H, 0); ce.rotation.x = Math.PI / 2;
  // dinding dalam sisi lorong (ikut dilepas saat cutaway)
  const near = new THREE.Group(); g.add(near); refs.nearWall = near;
  const wn = add(new THREE.PlaneGeometry(IN.L, IN.H), M.wall, near, false); wn.position.set(IN.L / 2, IN.H / 2, -IN.W / 2);
  // Dinding luar bergelombang
  const farW = corrugatedWall(len, hh, false, M.exterior, g); farW.position.set(x0, y0 + 0.16, z);
  // sisi lorong: dicerminkan agar gelombang menghadap keluar; UV dibalik agar tulisan tidak terbalik
  const nearW = corrugatedWall(len, hh, true, M.exterior, near); nearW.position.set(x0, y0 + 0.16, -z);
  nearW.scale.y = -1;
  // Rel atas/bawah, tiang sudut, atap
  [[-1, near], [1, g]].forEach(([s, par]) => {
    box(len, 0.16, 0.12, M.exteriorPlain, x0 + len / 2, y0 + 0.08, s * (z - 0.06), par);
    box(len, 0.1, 0.04, M.exteriorPlain, x0 + len / 2, y1 - 0.05, s * (z - 0.02), par);
  });
  [x0 + 0.04, x1 - 0.04].forEach((xx) => [-z + 0.04, z - 0.04].forEach((zz) => box(0.08, y1 - y0, 0.08, M.exteriorPlain, xx, (y0 + y1) / 2, zz, zz < 0 ? near : g)));
  const roof = box(len, 0.03, 2 * z, M.exteriorPlain, x0 + len / 2, y1 - 0.015, 0, g); refs.roof = roof;
  box(len, 0.15, 2 * z - 0.1, M.exteriorPlain, x0 + len / 2, y0 + 0.075 - 0.006, 0, g);
  // Corner casting
  [x0 + 0.045, x1 - 0.045].forEach((xx) => [-z + 0.045, z - 0.045].forEach((zz) => [y0 + 0.06, y1 - 0.06].forEach((yy) => box(0.09, 0.12, 0.09, M.black, xx, yy, zz, zz < 0 ? near : g))));
  // Dinding depan (ujung tertutup)
  box(0.04, y1 - y0 - 0.2, 2 * z - 0.2, M.exteriorPlain, x0 + 0.02, (y0 + y1) / 2, 0, g);
  // Pintu belakang (dua daun, engsel di sudut)
  refs.doors = [];
  [-1, 1].forEach((s) => {
    const pivot = new THREE.Group(); pivot.position.set(x1, 0, s * (z - 0.02)); g.add(pivot);
    const leaf = new THREE.Group(); leaf.position.set(0, 0, -s * (z - 0.02) / 2); pivot.add(leaf);
    box(0.05, y1 - y0 - 0.25, z - 0.06, M.exteriorPlain, 0.03, (y0 + y1) / 2, 0, leaf);
    for (let k = 0; k < 5; k++) box(0.02, y1 - y0 - 0.5, 0.04, M.exteriorPlain, 0.065, (y0 + y1) / 2, -0.45 + k * 0.22, leaf);
    [-0.25, 0.25].forEach((zz) => { cyl(0.016, V(0.09, y0 + 0.2, zz), V(0.09, y1 - 0.15, zz), M.galv, leaf, 12); box(0.05, 0.25, 0.05, M.galv, 0.11, 1.0, zz + 0.06, leaf); });
    refs.doors.push({ pivot, s });
  });
  // Tanah / landasan beton
  const pad = box(22, 0.2, 7, M.concrete, 3.5, y0 - 0.2, 0.5, g);
  pad.receiveShadow = true; refs.pad = pad;
  [1.0, 6.0, 11.0].forEach((xx) => box(0.3, 0.06, 2.4, M.concrete, xx, y0 - 0.07, 0, g));
}

// ---------- Rakitan peralatan ----------
export function buildSWRO(M, logos) {
  const logoImg = logos.dark;
  ROOT = new THREE.Group();
  pipes.length = 0;
  const refs = { hot: {} };
  buildContainer(M, refs);
  const E = new THREE.Group(); ROOT.add(E); refs.equipment = E;
  const prevRoot = ROOT; ROOT = E;

  // --- Rak membran RO: 2 kolom × 4 baris pressure vessel FRP 8" (6 elemen) ---
  const rows = [0.55, 0.93, 1.31, 1.69], cols = [0.62, 0.98];
  const vx0 = 4.85, vx1 = 11.45, vr = 0.13;
  const posts = [5.05, 8.15, 11.25];
  posts.forEach((x) => [0.43, 1.15].forEach((zz) => box(0.05, 1.95, 0.05, M.frame, x, 0.975, zz)));
  posts.forEach((x) => rows.forEach((y) => box(0.05, 0.04, 0.77, M.frame, x, y - vr - 0.02, 0.79)));
  [0.08, 1.93].forEach((y) => [0.43, 1.15].forEach((zz) => box(vx1 - vx0 - 0.3, 0.05, 0.05, M.frame, (vx0 + vx1) / 2, y, zz)));
  posts.forEach((x) => box(0.12, 0.01, 0.82, M.frame, x, 0.005, 0.79));
  refs.vesselMeshes = [];
  rows.forEach((y) => cols.forEach((zz) => {
    refs.vesselMeshes.push({ mesh: cyl(vr, V(vx0 + 0.06, y, zz), V(vx1 - 0.06, y, zz), M.frp, E, 48), y, z: zz, x0: vx0, x1: vx1, r: vr });
    [vx0, vx1].forEach((x, k) => {
      const d = k ? 1 : -1;
      cyl(vr + 0.012, V(x - d * 0.08, y, zz), V(x, y, zz), M.frp, E, 48, vr);   // ujung melebar
      ring(vr + 0.005, 0.012, V(x - d * 0.02, y, zz), V(1, 0, 0), M.frame, E, 48);
      const head = add(new THREE.CircleGeometry(vr - 0.012, 40), M.frpBronze, E, false);
      head.position.set(x - d * 0.012, y, zz); head.rotation.y = d * Math.PI / 2;
    });
    // klem U pada setiap tiang
    posts.forEach((x) => { const t = add(new THREE.TorusGeometry(vr + 0.006, 0.006, 8, 32, Math.PI), M.galv, E); t.position.set(x + 0.04, y, zz); t.rotation.y = Math.PI / 2; });
    // side port umpan & brine menghadap celah antar kolom
    const toward = zz < 0.8 ? 1 : -1;
    [vx1 - 0.2, vx0 + 0.2].forEach((x) => { cyl(0.032, V(x, y, zz + toward * 0.1), V(x, y, zz + toward * 0.15), M.duplex, E, 16); ring(0.042, 0.03, V(x, y, zz + toward * 0.15), V(0, 0, 1), M.ss, E, 20); });
  }));
  refs.hot.vessel = V(8.0, rows[3], cols[0]);
  refs.hot.vesselEnd = V(vx1, rows[1], cols[0]);
  // Header umpan & brine (super duplex) di celah antar kolom
  const zg = 0.80;
  pipe([V(vx1 - 0.2, rows[0] - 0.12, zg), V(vx1 - 0.2, rows[3] + 0.06, zg)], 0.045, M.duplex, { fitMat: M.ss });
  pipe([V(vx0 + 0.2, rows[0] - 0.12, zg), V(vx0 + 0.2, rows[3] + 0.06, zg)], 0.045, M.duplex, { fitMat: M.ss });
  // Pelat nama rak
  const plate = add(new THREE.PlaneGeometry(0.62, 0.2), new THREE.MeshStandardMaterial({ map: TX.textPanel(620, 200, (g2) => {
    g2.fillStyle = '#0e2242'; g2.fillRect(0, 0, 620, 200);
    if (logoImg) g2.drawImage(logoImg, 18, 22, 156 * logoImg.width / logoImg.height / 1.0 * 0.6, 156 * 0.6 * 1.0);
    g2.fillStyle = '#fff'; g2.font = '800 44px Jakarta, sans-serif'; g2.fillText('SWRO SYSTEM', 200, 95);
    g2.fillStyle = '#9fd3ff'; g2.font = '600 24px Jakarta, sans-serif'; g2.fillText('PT TRAYA HYDRO INDONESIA', 200, 140);
  }), roughness: 0.4, metalness: 0.3 }), E, false);
  plate.position.set(9.6, 1.98, 0.40); plate.rotation.y = Math.PI;

  // --- Skid pompa tekanan tinggi ---
  const pz = 0.14, py = 0.36;
  box(2.55, 0.1, 0.5, M.frame, 9.9, 0.05, pz);
  box(2.55, 0.02, 0.46, M.galv, 9.9, 0.11, pz);
  motor(9.98, 10.88, py, pz, 0.19, M);
  // pelindung kopling
  const guard = add(new THREE.CylinderGeometry(0.12, 0.12, 0.2, 32, 1, true, 0, Math.PI), M.ss);
  guard.rotation.z = Math.PI / 2; guard.position.set(9.85, py, pz); guard.rotation.x = 0; guard.rotation.set(0, 0, Math.PI / 2);
  cyl(0.06, V(9.75, py, pz), V(9.95, py, pz), M.yellow, E, 16);
  // kopling berputar (terlihat di bawah pelindung)
  const kop = new THREE.Group(); kop.position.set(9.85, py, pz); E.add(kop);
  const kd = add(new THREE.CylinderGeometry(0.085, 0.085, 0.07, 24), M.duplex, kop); kd.rotation.z = Math.PI / 2;
  for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; const b = add(new THREE.BoxGeometry(0.09, 0.018, 0.018), M.black, kop); b.position.set(0, Math.cos(a) * 0.07, Math.sin(a) * 0.07); }
  refs.hppKopling = kop;
  multistagePump(8.95, 9.72, py, pz, 0.14, M);
  refs.hot.hpp = V(9.4, py + 0.1, pz);
  refs.hot.motor = V(10.4, py + 0.2, pz);
  // nozzle hisap & tekan
  cyl(0.06, V(9.62, py + 0.1, pz), V(9.62, py + 0.3, pz), M.duplex, E, 24);
  ring(0.09, 0.03, V(9.62, py + 0.3, pz), UP, M.duplex, E);
  cyl(0.045, V(9.05, py + 0.1, pz), V(9.05, py + 0.28, pz), M.duplex, E, 24);
  ring(0.075, 0.03, V(9.05, py + 0.28, pz), UP, M.duplex, E);

  // --- Pipa tekanan tinggi: pompa → atas → header umpan ---
  const hp = pipe([V(9.05, py + 0.3, pz), V(9.05, 2.18, pz), V(vx1 - 0.2, 2.18, pz), V(vx1 - 0.2, 2.18, zg), V(vx1 - 0.2, rows[3] + 0.08, zg)], 0.045, M.duplex, { fitMat: M.ss, name: 'hp' });
  transmitter(V(9.6, 2.23, pz), M);
  gauge(V(10.2, 2.27, pz - 0.0), V(0, 0, -1), M, 0.055);
  ballValve(V(9.05, 1.2, pz), UP, 0.045, M);
  refs.hot.hpLine = V(10.0, 2.18, pz);

  // --- ERD (pressure exchanger isobarik) + booster pump ---
  const ez = 0.16, ey = 0.46;
  [6.55, 7.35].forEach((x) => box(0.08, ey - 0.1, 0.24, M.frame, x, ey / 2 - 0.05, ez));
  box(1.2, 0.04, 0.3, M.frame, 6.95, 0.02, ez);
  cyl(0.115, V(6.4, ey, ez), V(7.5, ey, ez), new THREE.MeshPhysicalMaterial({ color: '#e9e9e4', roughness: 0.3, clearcoat: 0.5 }), E, 40);
  [6.4, 7.5].forEach((x) => { ring(0.13, 0.07, V(x, ey, ez), V(1, 0, 0), M.ss, E, 40); for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; cyl(0.008, V(x - 0.05, ey + Math.sin(a) * 0.12, ez + Math.cos(a) * 0.12), V(x + 0.05, ey + Math.sin(a) * 0.12, ez + Math.cos(a) * 0.12), M.ss, E, 6); } });
  // port HP/LP di kedua ujung
  [[6.42, 0.035, M.duplex], [6.42, -0.0, M.duplex], [7.48, 0.035, M.upvc]].forEach(([x, dz, m], i) => cyl(0.035, V(x + (i === 1 ? 0.0 : 0), ey + 0.12, ez + (i === 1 ? -0.05 : 0.05)), V(x, ey + 0.3, ez + (i === 1 ? -0.05 : 0.05)), m, E, 16));
  refs.hot.erd = V(6.95, ey + 0.05, ez);
  // booster pump
  box(0.75, 0.08, 0.32, M.frame, 5.85, 0.04, ez);
  motor(5.95, 6.25, 0.24, ez, 0.11, M);
  multistagePump(5.55, 5.88, 0.24, ez, 0.085, M);
  // pipa HP dari PX → booster → bergabung ke jalur HP
  pipe([V(6.42, ey + 0.3, ez - 0.05), V(6.42, 0.9, ez - 0.05), V(5.6, 0.9, ez - 0.05), V(5.6, 0.38, ez - 0.05)], 0.035, M.duplex, { fitMat: M.ss });
  pipe([V(5.75, 0.36, ez), V(5.75, 1.95, ez), V(9.05, 1.95, ez)], 0.035, M.duplex, { fitMat: M.ss });
  // jalur brine dari header brine → PX
  pipe([V(vx0 + 0.2, rows[0] - 0.14, zg), V(vx0 + 0.2, 0.22, zg), V(vx0 + 0.2, 0.22, 0.42), V(6.42, 0.22, 0.42), V(6.42, ey - 0.13, 0.42), V(6.42, ey - 0.13, ez + 0.08)], 0.04, M.duplex, { fitMat: M.ss });
  // brine bertekanan rendah keluar ke pembuangan
  pipe([V(7.48, ey + 0.3, ez + 0.05), V(7.48, 0.95, ez + 0.05), V(7.48, 0.95, 1.12), V(4.7, 0.95, 1.12), V(4.7, 2.45, 1.12), V(-0.2, 2.45, 1.12)], 0.04, M.upvc, { fit: 'socket', name: 'brine' });

  // --- Header tekanan rendah (UPVC hitam): cartridge filter → pompa & PX ---
  const lpY = 0.86, lpZ = 0.3;
  pipe([V(4.42, 0.32, 0.12), V(4.65, 0.32, 0.12), V(4.65, lpY, lpZ), V(9.62, lpY, lpZ), V(9.62, py + 0.33, lpZ), V(9.62, py + 0.33, pz)], 0.055, M.upvc, { fit: 'socket', name: 'lp' });
  pipe([V(7.48, lpY, lpZ), V(7.48, ey + 0.3, lpZ), V(7.48, ey + 0.3, ez - 0.05)], 0.035, M.upvc, { fit: 'socket' });
  butterflyValve(V(5.3, lpY, lpZ), V(1, 0, 0), 0.055, M);
  butterflyValve(V(8.9, lpY, lpZ), V(1, 0, 0), 0.055, M);
  gauge(V(6.0, lpY + 0.11, lpZ), V(0, 0, -1), { ...M, gauge: M.gaugeLP }, 0.045);

  // --- Rotameter permeat di depan rak ---
  [10.35, 10.0].forEach((x, i) => {
    pipe([V(x, 0.25, 0.36), V(x, 0.95, 0.36)], 0.025, M.upvcGray, { fit: 'socket' });
    pipe([V(x, 1.52, 0.36), V(x, 2.05, 0.36), V(x, 2.05, 0.6)], 0.025, M.upvcGray, { fit: 'socket' });
    cyl(0.03, V(x, 0.95, 0.36), V(x, 1.52, 0.36), M.glass, E, 24);
    ring(0.04, 0.04, V(x, 0.97, 0.36), UP, M.black, E); ring(0.04, 0.04, V(x, 1.5, 0.36), UP, M.black, E);
    box(0.012, 0.5, 0.004, M.white, x + 0.033, 1.235, 0.36, E);
    const fl = add(new THREE.ConeGeometry(0.022, 0.04, 16), M.red, E); fl.position.set(x, 1.15 + i * 0.12, 0.36); fl.rotation.x = Math.PI;
    refs.hot['rota' + i] = V(x, 1.25, 0.36);
  });
  // kolektor permeat di ujung brine (UPVC abu)
  cols.forEach((zz) => {
    rows.forEach((y) => pipe([V(vx0, y, zz), V(vx0 - 0.14, y, zz)], 0.022, M.upvcGray, { fit: 'socket' }));
    pipe([V(vx0 - 0.14, rows[0] - 0.05, zz), V(vx0 - 0.14, 2.3, zz), V(vx0 - 0.14, 2.3, 0.85)], 0.03, M.upvcGray, { fit: 'socket' });
  });
  pipe([V(vx0 - 0.14, 2.3, 0.85), V(-0.2, 2.3, 0.85)], 0.035, M.upvcGray, { fit: 'socket', name: 'permeate' });

  // --- Cartridge filter 5 µm (2 housing FRP biru) ---
  [3.98, 4.38].forEach((x, i) => {
    const z0 = 0.12;
    [0, 1, 2].forEach((k) => { const a = k / 3 * Math.PI * 2; cyl(0.012, V(x + Math.cos(a) * 0.12, 0, z0 + Math.sin(a) * 0.12), V(x + Math.cos(a) * 0.12, 0.2, z0 + Math.sin(a) * 0.12), M.ss, E, 8); });
    cyl(0.165, V(x, 0.2, z0), V(x, 1.18, z0), M.cfBlue, E, 48);
    const bot = add(new THREE.SphereGeometry(0.165, 40, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), M.cfBlue, E); bot.position.set(x, 0.2, z0);
    cyl(0.19, V(x, 1.18, z0), V(x, 1.24, z0), M.white, E, 48);
    cyl(0.175, V(x, 1.24, z0), V(x, 1.31, z0), M.white, E, 48);
    const dome = add(new THREE.SphereGeometry(0.175, 40, 12, 0, Math.PI * 2, 0, Math.PI / 2), M.white, E); dome.position.set(x, 1.31, z0); dome.scale.y = 0.35;
    for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2; cyl(0.009, V(x + Math.cos(a) * 0.182, 1.15, z0 + Math.sin(a) * 0.182), V(x + Math.cos(a) * 0.182, 1.3, z0 + Math.sin(a) * 0.182), M.ss, E, 6); }
    gauge(V(x, 1.43, z0), V(0, 0.4, -1), { ...M, gauge: M.gaugeLP }, 0.04);
    // label 5 µm
    const lab = add(new THREE.CylinderGeometry(0.1665, 0.1665, 0.16, 40, 1, true, Math.PI * 0.85, Math.PI * 0.6), new THREE.MeshStandardMaterial({ map: TX.textPanel(512, 160, (g2) => {
      g2.fillStyle = '#ffffff'; g2.fillRect(0, 0, 512, 160);
      g2.fillStyle = '#0e2242'; g2.font = '800 64px Jakarta, sans-serif'; g2.fillText('5 µm', 150, 80);
      g2.fillStyle = '#1e6fd0'; g2.font = '700 28px Jakarta, sans-serif'; g2.fillText('CARTRIDGE FILTER', 116, 128);
    }), roughness: 0.5 }), E, false);
    lab.position.set(x, 0.85, z0);
    // nozzle samping
    cyl(0.05, V(x, 1.05, z0 - 0.15), V(x, 1.05, z0 - 0.24), M.upvc, E, 20);
  });
  pipe([V(3.98, 1.05, -0.12), V(3.98, 1.05, -0.18), V(4.38, 1.05, -0.18), V(4.38, 1.05, -0.12)], 0.045, M.upvc, { fit: 'socket' });
  pipe([V(3.98, 0.32, 0.12), V(4.42, 0.32, 0.12)], 0.05, M.upvc, { fit: 'socket' });
  refs.hot.cartridge = V(4.18, 0.9, 0.12);

  // --- Panel kontrol (PLC + HMI) ---
  const cx = 3.38, cz = 0.92;
  box(0.9, 0.1, 0.5, M.frame, cx, 0.05, cz);
  box(0.9, 2.0, 0.5, M.cabinet, cx, 1.1, cz);
  box(0.86, 1.96, 0.01, M.cabinet, cx, 1.1, cz - 0.255);
  const scr = add(new THREE.PlaneGeometry(0.42, 0.26), M.hmi, E, false); scr.position.set(cx, 1.52, cz - 0.262); scr.rotation.y = Math.PI;
  box(0.46, 0.3, 0.012, M.black, cx, 1.52, cz - 0.257);
  [[-0.25, M.green], [-0.12, M.red], [0.01, M.yellow]].forEach(([dx, m]) => { const b = cyl(0.022, V(cx + dx, 1.18, cz - 0.26), V(cx + dx, 1.18, cz - 0.29), m, E, 20); });
  cyl(0.04, V(cx + 0.24, 1.18, cz - 0.26), V(cx + 0.24, 1.18, cz - 0.29), M.yellow, E, 24);
  cyl(0.032, V(cx + 0.24, 1.18, cz - 0.29), V(cx + 0.24, 1.18, cz - 0.33), M.red, E, 24);
  box(0.03, 0.18, 0.04, M.black, cx + 0.38, 1.1, cz - 0.27);
  for (let k = 0; k < 6; k++) box(0.5, 0.012, 0.012, M.frame, cx, 0.3 + k * 0.035, cz - 0.262);
  const logoPlate = add(new THREE.PlaneGeometry(0.3, 0.17), new THREE.MeshStandardMaterial({ map: TX.textPanel(300, 170, (g2) => { g2.fillStyle = '#fff'; g2.fillRect(0, 0, 300, 170); const L = logos.light; if (L) { const h2 = 150, w2 = h2 * L.width / L.height; g2.drawImage(L, 150 - w2 / 2, 10, w2, h2); } }), roughness: 0.5 }), E, false);
  logoPlate.position.set(cx, 1.88, cz - 0.262); logoPlate.rotation.y = Math.PI;
  refs.hot.panel = V(cx, 1.5, cz - 0.27);
  // rak kabel di langit-langit
  box(8.6, 0.04, 0.3, M.galv, 7.3, 2.52, 0.82);
  for (let k = 0; k < 40; k++) box(0.02, 0.05, 0.3, M.galv, 3.05 + k * 0.215, 2.52, 0.82);
  [[10.4, pz], [6.1, ez]].forEach(([x, zz]) => pipe([V(x, 0.62, zz), V(x, 0.9, zz), V(x, 0.9, 0.55), V(x, 2.5, 0.55), V(x, 2.5, 0.82)], 0.012, M.black, { fit: 'none' }));

  // --- Stasiun dosing kimia: selang menuju titik injeksi masing-masing ---
  refs.dosing = {};
  [['KOAGULAN', 1.40, V(0.3, 2.5, 0.17)], ['ANTISCALANT', 1.84, V(3.25, 0.6, 0.35)], ['SMBS', 2.28, V(3.42, 0.6, 0.35)], ['NaOCl', 2.72, V(1.6, 2.3, 0.85)]].forEach(([nm, x, inj]) => {
    const z0 = 0.86, rt = 0.19;
    cyl(rt, V(x, 0, z0), V(x, 0.78, z0), M.pe, E, 40);
    cyl(0.1, V(x, 0.78, z0), V(x, 0.82, z0), M.blueInst, E, 32);
    const pumpBox = box(0.13, 0.15, 0.11, M.blueInst, x, 0.9, z0 - 0.06);
    box(0.06, 0.05, 0.005, M.black, x, 0.93, z0 - 0.118);
    const led = box(0.014, 0.014, 0.004, M.green, x - 0.04, 0.95, z0 - 0.118);
    const k = add(new THREE.CylinderGeometry(0.018, 0.018, 0.02, 16), M.red, E); k.rotation.x = Math.PI / 2; k.position.set(x + 0.035, 0.88, z0 - 0.12);
    const lab = add(new THREE.CylinderGeometry(rt + 0.0005, rt + 0.0005, 0.16, 40, 1, true, Math.PI * 0.8, Math.PI * 0.7), new THREE.MeshStandardMaterial({ map: TX.textPanel(512, 120, (g2) => {
      g2.fillStyle = '#ffd54f'; g2.fillRect(0, 0, 512, 120); g2.fillStyle = '#111'; g2.font = '800 50px Jakarta, sans-serif'; g2.textAlign = 'center'; g2.fillText(nm, 256, 80);
    }), roughness: 0.6 }), E, false);
    lab.position.set(x, 0.5, z0);
    // selang dosing: dari pompa naik ke rak kabel, lalu turun ke titik injeksi
    const pts = [V(x, 0.96, z0 - 0.06), V(x, 1.4, z0 - 0.12), V(x, 2.35, 0.75), V((x + inj.x) / 2, 2.45, 0.6), V(inj.x, inj.y + 0.35, inj.z), V(inj.x, inj.y + 0.06, inj.z)];
    const tube = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
    add(new THREE.TubeGeometry(tube, 90, 0.006, 8, false), M.white, E);
    // quill injeksi pada pipa
    cyl(0.014, V(inj.x, inj.y + 0.02, inj.z), V(inj.x, inj.y + 0.08, inj.z), M.ss, E, 12);
    ring(0.022, 0.025, V(inj.x, inj.y + 0.075, inj.z), V(0, 1, 0), M.ss, E, 12);
    refs.dosing[nm] = { tank: V(x, 0.5, z0), pump: V(x, 0.9, z0 - 0.06), inj, tube, led };
  });
  refs.hot.dosing = V(2.18, 0.6, 0.62);

  // --- Tangki CIP + pompa CIP ---
  cyl(0.36, V(1.95, 0.25, -0.5), V(1.95, 1.25, -0.5), M.pe, E, 48);
  const cone = add(new THREE.ConeGeometry(0.36, 0.25, 48), M.pe, E); cone.position.set(1.95, 0.125, -0.5); cone.rotation.x = Math.PI;
  [0, 1, 2, 3].forEach((k) => { const a = k / 4 * Math.PI * 2 + 0.6; box(0.04, 0.3, 0.04, M.frame, 1.95 + Math.cos(a) * 0.3, 0.15, -0.5 + Math.sin(a) * 0.3); });
  cyl(0.37, V(1.95, 1.25, -0.5), V(1.95, 1.29, -0.5), M.blueInst, E, 48);
  const cipLab = add(new THREE.CylinderGeometry(0.3605, 0.3605, 0.2, 48, 1, true, Math.PI * 1.1, Math.PI * 0.6), new THREE.MeshStandardMaterial({ map: TX.textPanel(512, 120, (g2) => { g2.fillStyle = '#1e6fd0'; g2.fillRect(0, 0, 512, 120); g2.fillStyle = '#fff'; g2.font = '800 56px Jakarta, sans-serif'; g2.textAlign = 'center'; g2.fillText('CIP TANK', 256, 80); }), roughness: 0.6 }), E, false);
  cipLab.position.set(1.95, 0.85, -0.5);
  box(0.5, 0.06, 0.25, M.frame, 2.75, 0.03, -0.62);
  motor(2.75, 2.98, 0.17, -0.62, 0.085, M);
  multistagePump(2.5, 2.74, 0.17, -0.62, 0.07, M);
  pipe([V(2.5, 0.17, -0.62), V(2.3, 0.17, -0.62), V(2.3, 0.17, -0.5), V(2.31, 0.17, -0.5)], 0.03, M.upvcGray, { fit: 'socket' });
  refs.hot.cip = V(1.95, 0.9, -0.5);

  // --- Multimedia filter (2 tangki FRP navy) ---
  [[0.55, 0.66], [0.55, -0.32]].forEach(([x, z0], i) => {
    [0, 1, 2].forEach((k) => { const a = k / 3 * Math.PI * 2; box(0.05, 0.25, 0.05, M.frame, x + Math.cos(a) * 0.3, 0.125, z0 + Math.sin(a) * 0.3); });
    const bot = add(new THREE.SphereGeometry(0.42, 48, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), M.mmf, E); bot.position.set(x, 0.42, z0); bot.scale.y = 0.45;
    cyl(0.42, V(x, 0.42, z0), V(x, 1.9, z0), M.mmf, E, 56);
    const top = add(new THREE.SphereGeometry(0.42, 48, 16, 0, Math.PI * 2, 0, Math.PI / 2), M.mmf, E); top.position.set(x, 1.9, z0); top.scale.y = 0.45;
    cyl(0.12, V(x, 2.05, z0), V(x, 2.2, z0), M.upvcGray, E, 32);
    box(0.24, 0.12, 0.24, M.upvcGray, x, 2.26, z0);
    cyl(0.05, V(x, 2.32, z0), V(x, 2.4, z0), M.black, E, 20);
    pipe([V(x + 0.12, 2.26, z0), V(x + 0.45, 2.26, z0), V(x + 0.45, 0.6, z0), V(x + 0.6, 0.6, z0)], 0.045, M.upvcGray, { fit: 'socket' });
    gauge(V(x + 0.45, 1.4, z0 - 0.07), V(1, 0, -0.4), { ...M, gauge: M.gaugeLP }, 0.04);
    const lab = add(new THREE.CylinderGeometry(0.4205, 0.4205, 0.22, 56, 1, true, Math.PI * 0.3 + (i ? Math.PI * 0.2 : 0), Math.PI * 0.55), new THREE.MeshStandardMaterial({ map: TX.textPanel(640, 140, (g2) => { g2.fillStyle = '#ffffff'; g2.fillRect(0, 0, 640, 140); g2.fillStyle = '#0e2242'; g2.font = '800 54px Jakarta, sans-serif'; g2.textAlign = 'center'; g2.fillText('MULTIMEDIA FILTER', 320, 90); }), roughness: 0.5 }), E, false);
    lab.position.set(x, 1.45, z0);
  });
  refs.hot.mmf = V(0.55, 1.3, -0.32);
  // header umpan masuk dari dinding depan ke kepala katup MMF
  pipe([V(-0.2, 2.5, 0.17), V(0.3, 2.5, 0.17)], 0.05, M.upvc, { fit: 'socket', name: 'feed' });
  pipe([V(0.3, 2.5, -0.32), V(0.3, 2.5, 0.66)], 0.05, M.upvc, { fit: 'socket' });
  [0.66, -0.32].forEach((z0) => pipe([V(0.3, 2.5, z0), V(0.3, 2.26, z0), V(0.43, 2.26, z0)], 0.04, M.upvc, { fit: 'socket' }));
  butterflyValve(V(0.05, 2.5, 0.17), V(1, 0, 0), 0.05, M);
  // keluaran MMF → cartridge filter
  pipe([V(1.15, 0.6, 0.66), V(1.15, 0.6, 0.35), V(3.6, 0.6, 0.35), V(3.6, 0.6, -0.18), V(3.6, 1.05, -0.18), V(3.98, 1.05, -0.18)], 0.045, M.upvc, { fit: 'socket', name: 'pre' });
  pipe([V(1.15, 0.6, -0.32), V(1.15, 0.6, 0.35)], 0.045, M.upvc, { fit: 'socket' });
  gauge(V(3.6, 0.85, -0.12), V(0, 0, -1), { ...M, gauge: M.gaugeLP }, 0.04);

  // --- Utilitas: lampu LED, AC split, pemadam api, kipas exhaust ---
  refs.lights = [];
  [1.5, 3.8, 6.1, 8.4, 10.7].forEach((x) => {
    box(1.22, 0.04, 0.12, M.white, x, IN.H - 0.03, 0);
    box(1.18, 0.012, 0.08, M.led, x, IN.H - 0.056, 0);
    refs.lights.push(V(x, IN.H - 0.07, 0));
  });
  box(0.95, 0.3, 0.22, M.white, 10.6, 2.3, -1.06);
  for (let k = 0; k < 3; k++) box(0.88, 0.01, 0.02, M.cabinet, 10.6, 2.18 + k * 0.012, -0.95);
  box(0.12, 0.08, 0.01, M.black, 10.95, 2.4, -0.949);
  cyl(0.08, V(11.6, 0.05, -1.05), V(11.6, 0.6, -1.05), M.red, E, 24);
  cyl(0.03, V(11.6, 0.6, -1.05), V(11.6, 0.7, -1.05), M.black, E, 12);
  box(0.4, 0.4, 0.06, M.galv, 0.03, 2.2, 0.0);

  buildExterior(M, refs, logos);
  ROOT = prevRoot;
  refs.pipes = pipes;
  return { root: ROOT, refs };
}

// ---------- Peralatan di luar kontainer (sisi dinding depan, x < 0) ----------
// Skid pompa umpan + basket strainer, jalur intake & brine ke laut, skid post-treatment, tangki air produk.
function buildExterior(M, refs, logos) {
  const G = new THREE.Group(); ROOT.add(G); refs.exterior = G;
  const yg = EX.y0 - 0.1; // permukaan landasan beton
  // skid pompa umpan
  box(1.5, 0.08, 0.5, M.frame, -1.15, yg + 0.04, -0.6, G);
  motor(-0.95, -0.5, yg + 0.3, -0.6, 0.12, M, G);
  multistagePump(-1.32, -0.97, yg + 0.3, -0.6, 0.1, M, G);
  // basket strainer
  refs.strainerBody = cyl(0.13, V(-1.75, yg + 0.1, -0.6), V(-1.75, yg + 0.62, -0.6), M.ss, G, 32);
  ring(0.16, 0.04, V(-1.75, yg + 0.62, -0.6), UP, M.duplex, G, 32);
  const lid = add(new THREE.SphereGeometry(0.14, 32, 10, 0, Math.PI * 2, 0, Math.PI / 2), M.ss, G); lid.position.set(-1.75, yg + 0.64, -0.6); lid.scale.y = 0.5; refs.strainerLid = lid;
  const hw = add(new THREE.TorusGeometry(0.07, 0.008, 8, 24), M.red, G); hw.position.set(-1.75, yg + 0.78, -0.6); hw.rotation.x = Math.PI / 2;
  gauge(V(-1.75, yg + 0.45, -0.73), V(0, 0, -1), { ...M, gauge: M.gaugeLP }, 0.04, G);
  refs.hot.strainer = V(-1.75, yg + 0.4, -0.6);
  refs.hot.feedPump = V(-1.0, yg + 0.35, -0.6);
  // pipa intake dari laut (datang dari arah +z, tertanam lalu muncul di strainer)
  pipe([V(-1.75, yg - 0.4, 9), V(-1.75, yg - 0.4, -0.15), V(-1.75, yg + 0.25, -0.15), V(-1.75, yg + 0.25, -0.47)], 0.07, M.upvc, { fit: 'socket', name: 'intake', parent: G });
  pipe([V(-1.75, yg + 0.3, -0.73), V(-1.75, yg + 0.3, -0.9), V(-1.45, yg + 0.3, -0.9), V(-1.45, yg + 0.3, -0.6), V(-1.33, yg + 0.3, -0.6)], 0.06, M.upvc, { fit: 'socket', parent: G });
  pipe([V(-1.25, yg + 0.4, -0.6), V(-1.25, 2.5, -0.6), V(-1.25, 2.5, 0.17), V(-0.2, 2.5, 0.17)], 0.05, M.upvc, { fit: 'socket', name: 'feedOut', parent: G });
  butterflyValve(V(-1.25, 1.2, -0.6), UP, 0.05, M, G);
  // brine keluar → turun → ke laut
  pipe([V(-0.2, 2.45, 1.12), V(-0.45, 2.45, 1.12), V(-0.45, yg - 0.3, 1.12), V(-0.45, yg - 0.3, 9)], 0.045, M.upvc, { fit: 'socket', name: 'brineOut', parent: G });
  // --- skid post-treatment ---
  const pz = 1.25;
  box(2.2, 0.08, 0.9, M.frame, -1.55, yg + 0.04, pz, G);
  // filter kalsit (remineralisasi)
  const cx = -0.95;
  cyl(0.26, V(cx, yg + 0.35, pz), V(cx, yg + 1.45, pz), M.white, G, 40);
  const cb = add(new THREE.SphereGeometry(0.26, 40, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), M.white, G); cb.position.set(cx, yg + 0.35, pz); cb.scale.y = 0.45;
  const ct = add(new THREE.SphereGeometry(0.26, 40, 12, 0, Math.PI * 2, 0, Math.PI / 2), M.white, G); ct.position.set(cx, yg + 1.45, pz); ct.scale.y = 0.45;
  [0, 1, 2].forEach((k) => { const a = k / 3 * Math.PI * 2; box(0.04, 0.25, 0.04, M.frame, cx + Math.cos(a) * 0.18, yg + 0.2, pz + Math.sin(a) * 0.18, G); });
  const lab = add(new THREE.CylinderGeometry(0.2605, 0.2605, 0.18, 40, 1, true, Math.PI * 1.25, Math.PI * 0.55), new THREE.MeshStandardMaterial({ map: TX.textPanel(512, 120, (g2) => { g2.fillStyle = '#0e2242'; g2.fillRect(0, 0, 512, 120); g2.fillStyle = '#fff'; g2.font = '800 54px Jakarta, sans-serif'; g2.textAlign = 'center'; g2.fillText('FILTER KALSIT', 256, 80); }), roughness: 0.5 }), G, false);
  lab.position.set(cx, yg + 1.0, pz);
  refs.hot.calcite = V(cx, yg + 1.0, pz);
  // reaktor UV
  cyl(0.085, V(-2.3, yg + 0.75, pz), V(-1.5, yg + 0.75, pz), M.ss, G, 32);
  [-2.3, -1.5].forEach((x) => ring(0.1, 0.03, V(x, yg + 0.75, pz), V(1, 0, 0), M.duplex, G, 32));
  cyl(0.03, V(-2.36, yg + 0.75, pz), V(-2.3, yg + 0.75, pz), M.black, G, 16);
  [-2.15, -1.65].forEach((x) => box(0.06, 0.45, 0.06, M.frame, x, yg + 0.3, pz, G));
  box(0.3, 0.38, 0.16, M.cabinet, -1.9, yg + 1.3, pz + 0.28, G);
  box(0.12, 0.06, 0.005, M.hmi, -1.9, yg + 1.38, pz + 0.199, G);
  refs.hot.uv = V(-1.9, yg + 0.75, pz);
  // dosing pH (NaOH) kecil
  cyl(0.15, V(-2.45, yg + 0.08, pz + 0.3), V(-2.45, yg + 0.6, pz + 0.3), M.pe, G, 32);
  box(0.1, 0.12, 0.09, M.blueInst, -2.45, yg + 0.68, pz + 0.3, G);
  refs.hot.ph = V(-2.45, yg + 0.5, pz + 0.3);
  // pipa: permeat → kalsit → UV → tangki produk
  pipe([V(-0.2, 2.3, 0.85), V(-0.6, 2.3, 0.85), V(-0.6, 2.3, pz), V(-0.6, yg + 1.6, pz), V(cx, yg + 1.6, pz), V(cx, yg + 1.5, pz)], 0.035, M.upvcGray, { fit: 'socket', name: 'permOut', parent: G });
  pipe([V(cx - 0.27, yg + 0.45, pz), V(-1.35, yg + 0.45, pz), V(-1.35, yg + 0.75, pz), V(-1.5, yg + 0.75, pz)], 0.035, M.upvcGray, { fit: 'socket', name: 'calOut', parent: G });
  // tangki air produk
  const tx = -4.0, tz = 0.9, tr = 1.05, th = 2.5;
  cyl(tr, V(tx, yg, tz), V(tx, yg + th, tz), new THREE.MeshStandardMaterial({ color: '#2a72c9', roughness: 0.55 }), G, 64);
  const dome = add(new THREE.SphereGeometry(tr, 64, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: '#2a72c9', roughness: 0.55 }), G); dome.position.set(tx, yg + th, tz); dome.scale.y = 0.18;
  for (let k = 1; k < 6; k++) ring(tr + 0.01, 0.03, V(tx, yg + k * th / 6, tz), UP, new THREE.MeshStandardMaterial({ color: '#2466b5', roughness: 0.6 }), G, 64);
  const plab = add(new THREE.CylinderGeometry(tr + 0.02, tr + 0.02, 0.9, 64, 1, true, Math.PI * 1.15, Math.PI * 0.7), new THREE.MeshStandardMaterial({ map: TX.textPanel(1024, 360, (g2) => {
    g2.fillStyle = '#ffffff'; g2.fillRect(0, 0, 1024, 360);
    const L = logos.light; if (L) { const h2 = 250, w2 = h2 * L.width / L.height; g2.drawImage(L, 40, 55, w2, h2); }
    g2.fillStyle = '#0e2242'; g2.font = '800 96px Jakarta, sans-serif'; g2.fillText('AIR PRODUK', 470, 175);
    g2.fillStyle = '#1e6fd0'; g2.font = '700 44px Jakarta, sans-serif'; g2.fillText('PRODUCT WATER', 474, 250);
  }), roughness: 0.5 }), G, false);
  plab.position.set(tx, yg + 1.45, tz);
  refs.hot.productTank = V(tx, yg + 1.4, tz + tr);
  refs.productTank = { x: tx, z: tz, r: tr, h: th, yg };
  pipe([V(-2.3, yg + 0.75, pz), V(-2.75, yg + 0.75, pz), V(-2.75, yg + th + 0.15, pz), V(tx, yg + th + 0.15, pz), V(tx, yg + th + 0.1, tz + 0.4)], 0.035, M.upvcGray, { fit: 'socket', name: 'uvOut', parent: G });
  // pipa distribusi keluar dari dasar tangki
  pipe([V(tx - tr, yg + 0.25, tz), V(tx - tr - 1.5, yg + 0.25, tz), V(tx - tr - 1.5, yg - 0.3, tz), V(tx - tr - 8, yg - 0.3, tz)], 0.05, M.upvcGray, { fit: 'socket', name: 'dist', parent: G });
}
