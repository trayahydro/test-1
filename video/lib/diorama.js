// Diorama potongan pantai (miniatur): balok tanah berpenampang lapisan, laut transparan dengan dasar
// miring, permukaan daratan, dan objek-objek pesisir. Dipakai adegan 1 (intrusi air laut),
// adegan 4 (intake & sumur pantai) dan adegan 13 (pembuangan brine).
import * as THREE from 'three';
import { textPanel, rng } from './tekstur.js';

export const DX0 = -10, DX1 = 10, DZ = 6, YB = -5, SEA = -0.55;
const YT = 0.8;

// Profil permukaan: daratan datar → pantai → dasar laut miring
export function h(x) {
  if (x < -0.5) return 0.02 * Math.sin(x * 1.7) + 0.015 * Math.sin(x * 3.1);
  if (x < 2.2) { const u = (x + 0.5) / 2.7; return -0.95 * (u * u * (3 - 2 * u)); }
  return -0.95 - (x - 2.2) * 0.4;
}
export const pantai = (() => { let x = -0.5; while (h(x) > SEA) x += 0.01; return x; })();

function profilShape(xa, xb, top, bot = YB, step = 0.05) {
  const s = new THREE.Shape();
  s.moveTo(xa, bot);
  for (let x = xa; x <= xb + 1e-6; x += step) s.lineTo(x, top(x));
  s.lineTo(xb, top(xb)); s.lineTo(xb, bot); s.lineTo(xa, bot);
  return s;
}

// Tekstur penampang tanah. mode: 'lapisan' | 'intrusi'
function teksturPenampang(mode) {
  const W = 2048, H = 1024;
  const X = (x) => (x - DX0) / (DX1 - DX0) * W, Y = (y) => (YT - y) / (YT - YB) * H;
  return textPanel(W, H, (g) => {
    g.fillStyle = '#6b5a48'; g.fillRect(0, 0, W, H);
    const r = rng(17);
    for (let px = 0; px < W; px += 2) {
      const x = DX0 + px / W * (DX1 - DX0), top = h(x);
      const lay = [[top, top - 0.3, '#6e4f33'], [top - 0.3, top - 1.7, '#d8bf86'], [top - 1.7, top - 3.0, '#a98a62'], [top - 3.0, YB, '#8b8781']];
      if (x > pantai) lay[0][2] = '#cdb98a';
      lay.forEach(([a, b, c]) => { g.fillStyle = c; g.fillRect(px, Y(a), 2, Y(b) - Y(a) + 1); });
    }
    // butiran tekstur
    for (let i = 0; i < 26000; i++) { const x = r() * W, y = r() * H; g.fillStyle = `rgba(${r() > 0.5 ? '255,255,255' : '0,0,0'},${0.05 + r() * 0.08})`; g.fillRect(x, y, 2 + r() * 2, 2); }
    if (mode === 'intrusi') {
      // lensa air tawar (biru muda) di lapisan pasir, menipis ke arah laut
      g.fillStyle = 'rgba(70,175,245,0.62)';
      g.beginPath(); g.moveTo(X(DX0), Y(-0.45));
      for (let x = DX0; x <= pantai; x += 0.1) g.lineTo(X(x), Y(Math.min(-0.45, h(x) - 0.25)));
      for (let x = pantai; x >= DX0; x -= 0.1) { const k = (x - DX0) / (pantai - DX0); g.lineTo(X(x), Y(-0.6 - 1.6 * (1 - k * k))); }
      g.closePath(); g.fill();
      // baji air laut (biru tua kehijauan) menyusup di bawah lensa
      g.fillStyle = 'rgba(12,58,96,0.88)';
      g.beginPath(); g.moveTo(X(pantai + 1.5), Y(h(pantai + 1.5) - 0.1));
      for (let x = pantai + 1.5; x >= -6.5; x -= 0.1) { const k = (x - DX0) / (pantai - DX0); g.lineTo(X(x), Y(Math.min(h(x) - 0.3, -0.6 - 1.6 * (1 - k * k)) - 0.05)); }
      g.lineTo(X(-6.5), Y(-3.0)); g.lineTo(X(pantai + 1.5), Y(-3.0)); g.closePath(); g.fill();
      // zona campuran (payau)
      g.strokeStyle = 'rgba(160,220,255,0.6)'; g.setLineDash([14, 10]); g.lineWidth = 4;
      g.beginPath();
      for (let x = -6.5; x <= pantai + 1.5; x += 0.1) { const k = (x - DX0) / (pantai - DX0); const y = Math.min(h(x) - 0.3, -0.6 - 1.6 * (1 - k * k)) - 0.05; x === -6.5 ? g.moveTo(X(x), Y(y)) : g.lineTo(X(x), Y(y)); }
      g.stroke(); g.setLineDash([]);
      // panah arah intrusi (dari laut ke darat)
      g.fillStyle = 'rgba(255,255,255,0.85)';
      [[pantai - 0.6, -2.35], [-2.2, -2.55], [-4.2, -2.7]].forEach(([x, y]) => {
        const px = X(x), py = Y(y);
        g.beginPath(); g.moveTo(px - 46, py); g.lineTo(px + 20, py - 14); g.lineTo(px + 20, py - 5); g.lineTo(px + 46, py - 5); g.lineTo(px + 46, py + 5); g.lineTo(px + 20, py + 5); g.lineTo(px + 20, py + 14); g.closePath(); g.fill();
      });
    }
  });
}

function airPenampang() {
  return textPanel(512, 512, (g) => {
    const gr = g.createLinearGradient(0, 0, 0, 512);
    gr.addColorStop(0, 'rgba(80,170,235,0.55)'); gr.addColorStop(1, 'rgba(10,50,110,0.85)');
    g.fillStyle = gr; g.fillRect(0, 0, 512, 512);
    g.strokeStyle = 'rgba(200,240,255,0.25)'; g.lineWidth = 3;
    for (let i = 0; i < 6; i++) { g.beginPath(); for (let x = 0; x <= 512; x += 8) g.lineTo(x, 40 + i * 70 + Math.sin(x / 40 + i) * 8); g.stroke(); }
  });
}

export function buatDiorama(scene, { mode = 'lapisan', gelombang } = {}) {
  const G = new THREE.Group(); scene.add(G);
  // balok tanah (diekstrusi sepanjang z), tutup depan/belakang bertekstur penampang
  const tex = teksturPenampang(mode);
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.repeat.set(1 / (DX1 - DX0), 1 / (YT - YB)); tex.offset.set(-DX0 / (DX1 - DX0), -YB / (YT - YB));
  const capMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 });
  const sideMat = new THREE.MeshStandardMaterial({ color: '#5d4a38', roughness: 0.95 });
  // permukaan balok sedikit di bawah lapisan permukaan agar tidak saling tumpang (menghindari artefak AO)
  const geo = new THREE.ExtrudeGeometry(profilShape(DX0, DX1, (x) => h(x) - 0.012), { depth: DZ, bevelEnabled: false, curveSegments: 1 });
  const block = new THREE.Mesh(geo, [capMat, sideMat]); block.position.z = -DZ / 2; block.receiveShadow = true; block.castShadow = true; G.add(block);
  // permukaan: rumput → pasir → dasar laut (warna per verteks)
  const pg = new THREE.PlaneGeometry(DX1 - DX0, DZ + 0.004, 400, 12); pg.rotateX(-Math.PI / 2); pg.translate((DX0 + DX1) / 2, 0, 0);
  const pos = pg.attributes.position, col = [];
  const r = rng(5);
  const cGrass = new THREE.Color('#6f9a52'), cSand = new THREE.Color('#e4d1a0'), cBed = new THREE.Color('#bfae80');
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    pos.setY(i, h(x) + 0.002);
    const c = x < -1.3 ? cGrass.clone().lerp(cSand, Math.max(0, (x + 2.2) / 0.9) * 0.0) : x < pantai ? cSand : cBed;
    if (x > -1.6 && x < -1.0) c.copy(cGrass).lerp(cSand, (x + 1.6) / 0.6);
    col.push(c.r, c.g, c.b);
  }
  pg.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); pg.computeVertexNormals();
  const top = new THREE.Mesh(pg, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 })); top.receiveShadow = true; G.add(top);
  // volume air laut + muka penampang bergradasi
  const ws = new THREE.Shape(); ws.moveTo(pantai, SEA);
  for (let x = pantai; x <= DX1; x += 0.05) ws.lineTo(x, h(x)); ws.lineTo(DX1, h(DX1)); ws.lineTo(DX1, SEA); ws.lineTo(pantai, SEA);
  const wGeo = new THREE.ExtrudeGeometry(ws, { depth: DZ - 0.02, bevelEnabled: false, curveSegments: 1 });
  const wTex = airPenampang(); wTex.wrapS = wTex.wrapT = THREE.ClampToEdgeWrapping;
  const yb = h(DX1);
  wTex.repeat.set(1 / (DX1 - pantai), 1 / (SEA - yb)); wTex.offset.set(-pantai / (DX1 - pantai), -yb / (SEA - yb));
  const wCap = new THREE.MeshStandardMaterial({ map: wTex, transparent: true, roughness: 0.2, depthWrite: false });
  const wSide = new THREE.MeshStandardMaterial({ color: '#2a79c2', transparent: true, opacity: 0.25, roughness: 0.2, depthWrite: false });
  const water = new THREE.Mesh(wGeo, [wCap, wSide]); water.position.z = -DZ / 2 + 0.01; water.renderOrder = 5; G.add(water);
  // muka laut beriak
  const sGeo = new THREE.PlaneGeometry(DX1 - pantai, DZ - 0.02, 120, 30); sGeo.rotateX(-Math.PI / 2); sGeo.translate((pantai + DX1) / 2, SEA, 0);
  const sMat = new THREE.MeshPhysicalMaterial({ color: '#2f86d0', roughness: 0.08, metalness: 0.1, transparent: true, opacity: 0.55, clearcoat: 1, depthWrite: false });
  const sea = new THREE.Mesh(sGeo, sMat); sea.renderOrder = 6; G.add(sea);
  const sp = sGeo.attributes.position, base = Float32Array.from(sp.array);
  return {
    G, block, water, sea,
    update(t) {
      for (let i = 0; i < sp.count; i++) {
        const x = base[i * 3], z = base[i * 3 + 2];
        sp.setY(i, SEA + 0.025 * Math.sin(x * 2.1 + t * 1.6) + 0.018 * Math.sin(z * 2.7 - t * 1.2 + x));
      }
      sp.needsUpdate = true; sGeo.computeVertexNormals();
    },
  };
}

// ---------- objek miniatur ----------
const S = (o) => new THREE.MeshStandardMaterial({ roughness: 0.75, ...o });
const MAT = {
  wall: S({ color: '#f3efe6' }), roofR: S({ color: '#c8553d' }), roofO: S({ color: '#d98b3a' }), roofB: S({ color: '#3d6fa8' }),
  trunk: S({ color: '#8a6a45' }), leaf: S({ color: '#3f8a3a', side: THREE.DoubleSide }), gray: S({ color: '#9aa3ab' }), dark: S({ color: '#30363d' }),
  white: S({ color: '#fafafa' }), blue: S({ color: '#2a6fc0' }), glass: S({ color: '#9fd3ff', roughness: 0.2, metalness: 0.3 }), red: S({ color: '#c62828' }),
  wood: S({ color: '#a07a4f' }), umb: S({ color: '#ffffff', side: THREE.DoubleSide }), stripe: S({ color: '#1e88e5', side: THREE.DoubleSide }),
};
function m(geo, mat, parent, x, y, z) { const o = new THREE.Mesh(geo, mat); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; parent.add(o); return o; }

export function rumah(parent, x, z, { w = 1.1, d = 0.9, hh = 0.6, atap = 'R', rot = 0 } = {}) {
  const g = new THREE.Group(); g.position.set(x, h(x), z); g.rotation.y = rot; parent.add(g);
  m(new THREE.BoxGeometry(w, hh, d), MAT.wall, g, 0, hh / 2, 0);
  // atap pelana: segitiga diekstrusi sepanjang lebar rumah
  const sh = new THREE.Shape(); sh.moveTo(-d / 2 - 0.08, 0); sh.lineTo(d / 2 + 0.08, 0); sh.lineTo(0, d * 0.42); sh.lineTo(-d / 2 - 0.08, 0);
  const rg = new THREE.ExtrudeGeometry(sh, { depth: w * 1.1, bevelEnabled: false }); rg.translate(0, 0, -w * 0.55); rg.rotateY(Math.PI / 2);
  const roof = new THREE.Mesh(rg, atap === 'R' ? MAT.roofR : atap === 'O' ? MAT.roofO : MAT.roofB);
  roof.position.set(0, hh, 0); roof.castShadow = true; g.add(roof);
  m(new THREE.BoxGeometry(0.18, 0.3, 0.02), MAT.wood, g, 0, 0.15, d / 2 + 0.005);
  [-1, 1].forEach((s) => m(new THREE.BoxGeometry(0.16, 0.14, 0.02), MAT.glass, g, s * w * 0.3, hh * 0.6, d / 2 + 0.005));
  return g;
}
export function kelapa(parent, x, z, tinggi = 1.6, seed = 1) {
  const r = rng(seed); const g = new THREE.Group(); g.position.set(x, h(x), z); parent.add(g);
  const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.25 * (r() - 0.5), tinggi * 0.5, 0.1), new THREE.Vector3(0.35 * (r() - 0.3), tinggi, 0.15 * (r() - 0.5)));
  const trunk = new THREE.Mesh(new THREE.TubeGeometry(curve, 12, 0.05, 8), MAT.trunk); trunk.castShadow = true; g.add(trunk);
  const topP = curve.getPoint(1);
  for (let i = 0; i < 7; i++) {
    const a = i / 7 * Math.PI * 2 + r();
    const leaf = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.13), MAT.leaf);
    leaf.geometry.translate(0.27, 0, 0);
    leaf.position.copy(topP); leaf.rotation.set(Math.PI / 2, 0, 0); leaf.rotateZ(a); leaf.rotateY(0.7 + r() * 0.25);
    leaf.castShadow = true; g.add(leaf);
  }
  return g;
}
export function sumur(parent, x, z) {
  const g = new THREE.Group(); g.position.set(x, h(x), z); parent.add(g);
  m(new THREE.CylinderGeometry(0.2, 0.2, 0.25, 20, 1, true), MAT.gray, g, 0, 0.125, 0).material.side = THREE.DoubleSide;
  m(new THREE.CircleGeometry(0.18, 20), S({ color: '#3a6a8a' }), g, 0, 0.1, 0).rotation.x = -Math.PI / 2;
  [-1, 1].forEach((s) => m(new THREE.BoxGeometry(0.03, 0.5, 0.03), MAT.wood, g, s * 0.2, 0.35, 0));
  const roof = m(new THREE.CylinderGeometry(0.01, 0.3, 0.5, 4), MAT.roofR, g, 0, 0.7, 0); roof.rotation.y = Math.PI / 4; roof.scale.y = 0.5;
  return g;
}
export function truk(parent, x, z, rot = 0) {
  const g = new THREE.Group(); g.position.set(x, h(x), z); g.rotation.y = rot; parent.add(g);
  m(new THREE.BoxGeometry(1.4, 0.08, 0.42), MAT.dark, g, 0, 0.14, 0);
  m(new THREE.BoxGeometry(0.36, 0.34, 0.44), MAT.blue, g, 0.55, 0.33, 0);
  m(new THREE.BoxGeometry(0.02, 0.15, 0.36), MAT.glass, g, 0.735, 0.4, 0);
  const tank = m(new THREE.CylinderGeometry(0.19, 0.19, 0.95, 24), MAT.white, g, -0.18, 0.38, 0); tank.rotation.z = Math.PI / 2;
  const lab = m(new THREE.CylinderGeometry(0.192, 0.192, 0.4, 24, 1, true, 0, Math.PI), MAT.stripe, g, -0.18, 0.38, 0); lab.rotation.z = Math.PI / 2;
  [[0.5, 1], [0.5, -1], [-0.4, 1], [-0.4, -1]].forEach(([wx, s]) => { const w = m(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 16), MAT.dark, g, wx, 0.09, s * 0.21); w.rotation.x = Math.PI / 2; });
  return g;
}
export function resor(parent, x, z) {
  const g = new THREE.Group(); g.position.set(x, h(x), z); parent.add(g);
  m(new THREE.BoxGeometry(1.8, 1.1, 1.0), MAT.white, g, 0, 0.55, 0);
  for (let k = 0; k < 2; k++) for (let i = 0; i < 4; i++) m(new THREE.BoxGeometry(0.28, 0.22, 0.02), MAT.glass, g, -0.6 + i * 0.4, 0.35 + k * 0.42, 0.505);
  m(new THREE.BoxGeometry(1.95, 0.06, 1.1), MAT.roofB, g, 0, 1.12, 0);
  [[1.4, 0.4], [1.8, -0.3]].forEach(([ux, uz]) => {
    m(new THREE.CylinderGeometry(0.015, 0.015, 0.5, 6), MAT.wood, g, ux, 0.25, uz);
    m(new THREE.ConeGeometry(0.3, 0.12, 8, 1, true), MAT.stripe, g, ux, 0.52, uz);
  });
  return g;
}
export function pabrik(parent, x, z) {
  const g = new THREE.Group(); g.position.set(x, h(x), z); parent.add(g);
  m(new THREE.BoxGeometry(1.6, 0.8, 1.1), MAT.gray, g, 0, 0.4, 0);
  for (let i = 0; i < 3; i++) { const r2 = m(new THREE.CylinderGeometry(0.01, 0.42, 1.12, 3), S({ color: '#7d878f' }), g, -0.55 + i * 0.55, 0.92, 0); r2.rotation.x = Math.PI / 2; r2.rotation.z = Math.PI / 2; r2.scale.set(1, 0.48, 0.6); }
  m(new THREE.CylinderGeometry(0.09, 0.12, 1.5, 16), MAT.red, g, 0.6, 0.75, -0.35);
  m(new THREE.CylinderGeometry(0.25, 0.25, 0.6, 20), MAT.white, g, -1.15, 0.3, 0.2);
  return g;
}
export function dermaga(parent, x0, x1, z) {
  const g = new THREE.Group(); parent.add(g);
  m(new THREE.BoxGeometry(x1 - x0, 0.06, 0.6), MAT.wood, g, (x0 + x1) / 2, SEA + 0.35, z);
  for (let x = x0 + 0.3; x < x1; x += 0.7) [-0.26, 0.26].forEach((dz) => m(new THREE.CylinderGeometry(0.04, 0.04, SEA + 0.35 - h(x) + 0.02, 8), MAT.wood, g, x, (SEA + 0.35 + h(x)) / 2, z + dz));
  // perahu
  const b = new THREE.Group(); b.position.set(x1 - 0.6, SEA + 0.06, z + 0.85); g.add(b);
  const hull = m(new THREE.CylinderGeometry(0.28, 0.12, 1.5, 12, 1, false, 0, Math.PI), MAT.white, b, 0, 0, 0); hull.rotation.z = Math.PI / 2; hull.rotation.x = Math.PI;
  m(new THREE.BoxGeometry(0.5, 0.28, 0.34), MAT.blue, b, -0.1, 0.18, 0);
  return { g, perahu: b };
}
