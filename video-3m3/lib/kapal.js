// Kapal pesiar generik (tanpa nama/merek), skala 1 unit = 1 m.
// Sumbu: x = panjang (buritan x=0 → haluan x=LOA), y = atas (garis air y=0), z = lebar (kanan kapal +z).
// buildKapal() → { root, refs } ; refs.xray(k) membuat badan kapal transparan untuk tampilan potongan.
import * as THREE from 'three';
import * as TX from '../../video/lib/tekstur.js';

export const KAPAL = { LOA: 180, B: 28, FB: 11, DR: 7, DECK: 2.9 };
const { LOA, B, FB, DR, DECK } = KAPAL;
const V = (x, y, z) => new THREE.Vector3(x, y, z);

// setengah lebar lambung pada posisi u (0 buritan → 1 haluan) dan ketinggian y
export function halfB(u, y) {
  let b = B / 2;
  if (u < 0.06) b *= 0.82 + 0.18 * Math.sin((u / 0.06) * Math.PI / 2);              // buritan membulat
  if (u > 0.62) { const t = (u - 0.62) / 0.38; b *= Math.sqrt(Math.max(0, 1 - Math.pow(t, 1.7))); } // haluan meruncing
  // bilga: menyempit di bawah garis air
  if (y < -3) { const t = (y + 3) / (DR - 3); b *= Math.sqrt(Math.max(0.02, 1 - t * t)); }
  // flare haluan: sedikit melebar ke atas
  if (u > 0.75 && y > 0) b *= 1 + 0.06 * (y / FB) * (u - 0.75) / 0.25;
  return b;
}

function hullGeometry() {
  const NU = 120, NV = 28, pos = [], uv = [], idx = [];
  for (let side = -1; side <= 1; side += 2) {
    const base = pos.length / 3;
    for (let i = 0; i <= NU; i++) {
      const u = i / NU;
      for (let j = 0; j <= NV; j++) {
        const y = -DR + (FB + DR) * (j / NV);
        let x = u * LOA;
        if (u > 0.9) x += (y + DR) * 0.55 * ((u - 0.9) / 0.1);                // rake haluan
        if (u < 0.02) x -= (y + DR) * 0.12 * (1 - u / 0.02);                   // buritan miring
        pos.push(x, y, side * halfB(u, y));
        uv.push(u, j / NV);
      }
    }
    for (let i = 0; i < NU; i++) for (let j = 0; j < NV; j++) {
      const a = base + i * (NV + 1) + j, b = a + NV + 1;
      if (side > 0) idx.push(a, b, a + 1, b, b + 1, a + 1); else idx.push(a, a + 1, b, b, a + 1, b + 1);
    }
  }
  // transom buritan: sambungkan kolom pertama sisi kiri & kanan
  const nSide = (NU + 1) * (NV + 1);
  for (let j = 0; j < NV; j++) { const a = j, c = nSide + j; idx.push(a, c, a + 1, c, c + 1, a + 1); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}
// pelat dek atas lambung (menutup bagian atas)
function deckShape(y, shrink = 0, x0 = 0, x1 = 1) {
  const s = new THREE.Shape(), N = 80;
  for (let i = 0; i <= N; i++) { const u = x0 + (x1 - x0) * i / N; const b = Math.max(0.2, halfB(u, y) - shrink); const pt = [u * LOA + (u > 0.9 ? (y + DR) * 0.55 * ((u - 0.9) / 0.1) : 0), b]; i ? s.lineTo(...pt) : s.moveTo(...pt); }
  for (let i = N; i >= 0; i--) { const u = x0 + (x1 - x0) * i / N; const b = Math.max(0.2, halfB(u, y) - shrink); s.lineTo(u * LOA + (u > 0.9 ? (y + DR) * 0.55 * ((u - 0.9) / 0.1) : 0), -b); }
  return s;
}

function hullTexture() {
  return TX.textPanel(4096, 512, (g, w, h) => {
    const yOf = (y) => h - ((y + DR) / (FB + DR)) * h;
    g.fillStyle = '#7d2620'; g.fillRect(0, yOf(0.4), w, h);                      // antifouling merah
    g.fillStyle = '#0e2444'; g.fillRect(0, yOf(6.5), w, yOf(0.4) - yOf(6.5));      // lambung navy
    g.fillStyle = '#f4f6f8'; g.fillRect(0, 0, w, yOf(6.5));                         // pita putih atas
    g.fillStyle = '#3aa0e8'; g.fillRect(0, yOf(6.7), w, 6);                         // garis biru tipis
    // jendela bulat (portholes) di pita navy & jendela persegi di pita putih
    g.fillStyle = '#9fb8d0';
    for (let x = 60; x < w * 0.93; x += 22) { g.beginPath(); g.arc(x, yOf(4.2), 4, 0, 7); g.fill(); }
    g.fillStyle = '#20384f';
    for (let x = 50; x < w * 0.9; x += 30) g.fillRect(x, yOf(9.6), 16, 12);
    // garis air & tanda draft
    g.fillStyle = '#ffffff'; for (let i = 0; i < 6; i++) g.fillRect(w * 0.965, yOf(0.4 + i), 20, 4);
  });
}
function facadeTexture(kind = 'balkon') {
  const t = TX.textPanel(512, 256, (g, w, h) => {
    g.fillStyle = '#f5f6f7'; g.fillRect(0, 0, w, h);
    if (kind === 'balkon') {
      g.fillStyle = '#5d7d99'; g.fillRect(0, 40, w, 150);                         // pintu kaca balkon
      g.fillStyle = '#86a8c4'; for (let x = 0; x < w; x += 128) g.fillRect(x + 10, 50, 108, 60);
      g.fillStyle = '#e9ecef'; for (let x = 0; x < w; x += 128) g.fillRect(x, 30, 8, 190);   // sekat balkon
      g.fillStyle = 'rgba(200,225,245,0.85)'; g.fillRect(0, 150, w, 70);              // pagar kaca
      g.fillStyle = '#ffffff'; g.fillRect(0, 146, w, 6);
    } else if (kind === 'jendela') {
      g.fillStyle = '#284660'; for (let x = 12; x < w; x += 64) g.fillRect(x, 80, 44, 90);
    } else if (kind === 'kaca') {
      g.fillStyle = '#2d5272'; g.fillRect(0, 30, w, 190); g.fillStyle = '#5b86a8'; for (let x = 0; x < w; x += 64) g.fillRect(x + 4, 36, 56, 80);
    }
  });
  t.wrapS = THREE.RepeatWrapping;
  t.anisotropy = 8; t.generateMipmaps = true; t.minFilter = THREE.LinearMipmapLinearFilter;
  return t;
}

export function buildKapal() {
  const root = new THREE.Group();
  const S = (o) => new THREE.MeshStandardMaterial(o);
  const P = (o) => new THREE.MeshPhysicalMaterial(o);
  const M = {
    hull: S({ map: hullTexture(), roughness: 0.42, metalness: 0.15, side: THREE.DoubleSide }),
    white: S({ color: '#f3f5f7', roughness: 0.45 }),
    deck: S({ color: '#b98a5c', roughness: 0.7 }),
    deckGray: S({ color: '#9aa3ab', roughness: 0.7 }),
    navy: S({ color: '#10284a', roughness: 0.4, metalness: 0.2 }),
    sky: S({ color: '#3aa0e8', roughness: 0.4 }),
    black: S({ color: '#141516', roughness: 0.6 }),
    orange: S({ color: '#f07a1a', roughness: 0.45 }),
    glass: P({ color: '#5e88ab', roughness: 0.08, metalness: 0.3, clearcoat: 1 }),
    pool: P({ color: '#36b6e0', roughness: 0.05, transmission: 0, clearcoat: 1, emissive: '#0b5a80', emissiveIntensity: 0.25 }),
    red: S({ color: '#c62828', roughness: 0.45 }),
    yellow: S({ color: '#f2c12e', roughness: 0.45 }),
  };
  const ghostable = [];
  const mk = (geo, mat, parent = root, shadow = true) => { const m = new THREE.Mesh(geo, mat); m.castShadow = m.receiveShadow = shadow; parent.add(m); ghostable.push(m); return m; };
  const box = (w, h, d, mat, x, y, z, parent) => { const m = mk(new THREE.BoxGeometry(w, h, d), mat, parent); m.position.set(x, y, z); return m; };

  // --- lambung ---
  const hullG = hullGeometry();
  mk(hullG, M.hull);
  // garis bantu lambung (tampak hanya saat X-ray)
  const wire = new THREE.LineSegments(new THREE.WireframeGeometry(hullG), new THREE.LineBasicMaterial({ color: '#7fd0ff', transparent: true, opacity: 0, depthWrite: false }));
  wire.visible = false; root.add(wire);
  const dk = mk(new THREE.ShapeGeometry(deckShape(FB, 0)), M.deckGray); dk.rotation.x = Math.PI / 2; dk.position.y = FB; dk.scale.y = -1;
  // fender atas lambung (pagar putih)
  const top = new THREE.Group(); root.add(top);

  // --- bangunan atas (superstructure): dek bertingkat dengan balkon ---
  const decks = [];
  const nDeck = 9, xA = 22, xF = 146;
  for (let k = 0; k < nDeck; k++) {
    const y0 = FB + k * DECK, y1 = y0 + DECK;
    const back = k < 2 ? 16 : 19 + (k - 2) * 0.9, front = xF - (k > 5 ? (k - 5) * 7 : 0) - (k === nDeck - 1 ? 18 : 0);
    const half = B / 2 - 0.6 - (k > 6 ? (k - 6) * 1.2 : 0);
    const len = front - back;
    const blk = box(len, DECK * 0.98, half * 2, M.white, (back + front) / 2, (y0 + y1) / 2, 0);
    // fasad balkon kiri-kanan
    const kind = k < 2 ? 'jendela' : k > 6 ? 'kaca' : 'balkon';
    [-1, 1].forEach((s) => {
      const tex = facadeTexture(kind); tex.repeat.set(len / 8, 1);
      const f = mk(new THREE.PlaneGeometry(len - 0.4, DECK * 0.92), S({ map: tex, roughness: 0.4 }), root, false);
      f.position.set((back + front) / 2, (y0 + y1) / 2, s * (half + 0.02)); if (s < 0) f.rotation.y = Math.PI;
    });
    // ujung depan membulat
    const cap = mk(new THREE.CylinderGeometry(half, half, DECK * 0.98, 32, 1, false, 0, Math.PI), M.white); cap.position.set(front, (y0 + y1) / 2, 0); cap.scale.x = 0.45;
    const capB = mk(new THREE.CylinderGeometry(half, half, DECK * 0.98, 32, 1, false, Math.PI, Math.PI), M.white); capB.position.set(back, (y0 + y1) / 2, 0); capB.scale.x = 0.22;
    decks.push({ y0, y1, back, front, half });
  }
  const topY = FB + nDeck * DECK;
  // anjungan (bridge) dengan kaca melingkar + sayap anjungan
  const bridgeY = FB + 6 * DECK, bx = decks[6].front;
  const bw = mk(new THREE.CylinderGeometry(decks[6].half + 0.1, decks[6].half + 0.1, DECK * 0.6, 40, 1, true, 0, Math.PI), M.glass); bw.position.set(bx, bridgeY + DECK * 0.5, 0); bw.scale.x = 0.47;
  [-1, 1].forEach((s) => box(5, 0.8, 3.2, M.white, bx - 4, bridgeY + DECK * 0.5, s * (B / 2 + 1.2)));
  // tiang radar
  box(1, 7, 1, M.white, bx - 10, topY + 3.5, 0); box(6, 0.4, 0.6, M.white, bx - 10, topY + 6, 0);
  const radar = box(4, 0.3, 0.5, M.black, bx - 10, topY + 7.3, 0);
  // cerobong (funnel)
  const fun = new THREE.Group(); fun.position.set(44, topY, 0); root.add(fun);
  const fs = new THREE.Shape(); fs.moveTo(-9, -3.5); fs.lineTo(7, -3.5); fs.quadraticCurveTo(10, 0, 7, 3.5); fs.lineTo(-9, 3.5); fs.quadraticCurveTo(-11, 0, -9, -3.5);
  const fg = mk(new THREE.ExtrudeGeometry(fs, { depth: 11, bevelEnabled: false }), M.navy, fun); fg.rotation.x = -Math.PI / 2;
  const band = mk(new THREE.ExtrudeGeometry(fs, { depth: 1.4, bevelEnabled: false }), M.sky, fun); band.rotation.x = -Math.PI / 2; band.position.y = 6.5; band.scale.set(1.01, 1.01, 1);
  const ftop = mk(new THREE.ExtrudeGeometry(fs, { depth: 0.8, bevelEnabled: false }), M.black, fun); ftop.rotation.x = -Math.PI / 2; ftop.position.y = 11; ftop.scale.set(0.98, 0.98, 1);
  // dek kolam renang (atas)
  const pd = topY + 0.05;
  const poolDeck = mk(new THREE.BoxGeometry(70, 0.1, B - 4), M.deck); poolDeck.position.set(95, pd, 0);
  box(16, 0.3, 7, M.pool, 98, pd + 0.1, 0); box(6, 0.3, 4, M.pool, 116, pd + 0.1, 0);
  box(16.6, 0.25, 7.6, M.white, 98, pd + 0.02, 0);
  const lounger = new THREE.InstancedMesh(new THREE.BoxGeometry(1.8, 0.35, 0.7), M.white, 40); lounger.castShadow = true;
  const _m = new THREE.Matrix4(); let n = 0;
  for (let i = 0; i < 10; i++) for (const z of [-6.5, -5.2, 5.2, 6.5]) { _m.makeTranslation(84 + i * 3.2, pd + 0.25, z); lounger.setMatrixAt(n++, _m); }
  root.add(lounger); ghostable.push(lounger);
  // payung warna
  for (let i = 0; i < 6; i++) { const u = mk(new THREE.ConeGeometry(1.4, 0.6, 12), i % 2 ? M.sky : M.yellow); u.position.set(86 + i * 5.2, pd + 2.4, (i % 2 ? 1 : -1) * 9); const st = mk(new THREE.CylinderGeometry(0.05, 0.05, 2.2, 6), M.white); st.position.set(86 + i * 5.2, pd + 1.1, (i % 2 ? 1 : -1) * 9); }
  // perosotan air (waterslide) spiral
  const pts = []; for (let i = 0; i <= 120; i++) { const a = i / 120 * Math.PI * 5; pts.push(V(70 + Math.cos(a) * 3, pd + 9 - i / 120 * 8.5, -8 + Math.sin(a) * 3)); }
  mk(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 300, 0.55, 12, false), M.yellow);
  box(1.2, 9.5, 1.2, M.white, 73, pd + 4.75, -8);
  // sekoci (lifeboats) oranye pada davit di dek 3
  const lbY = FB + 2 * DECK + 1.2;
  for (let x = 40; x <= 130; x += 9) [-1, 1].forEach((s) => {
    const lb = mk(new THREE.CapsuleGeometry(1.3, 6, 6, 12), M.orange); lb.rotation.z = Math.PI / 2; lb.position.set(x, lbY, s * (B / 2 + 0.6)); lb.scale.set(1, 1, 0.9);
    const cv = mk(new THREE.BoxGeometry(5.5, 0.7, 2.2), M.white); cv.position.set(x, lbY + 1.1, s * (B / 2 + 0.6));
    [-2.5, 2.5].forEach((dx) => box(0.25, 2.6, 0.25, M.white, x + dx, lbY + 0.6, s * (B / 2 - 0.4)));
  });
  // detail haluan: dek depan, jangkar
  [-1, 1].forEach((s) => { const a = box(1.2, 1.6, 0.3, M.black, LOA - 14, FB - 2.2, s * (halfB((LOA - 14) / LOA, FB - 2) + 0.05)); a.rotation.y = s * 0.35; });
  // garis dek (pagar) sepanjang tepi dek utama
  const rail = new THREE.Group(); root.add(rail);

  // --- refs ---
  const refs = { M, decks, topY, radar, funnel: fun, ghostable };
  const orig = new Map();
  refs.xray = (k) => {
    wire.visible = k > 0.01; wire.material.opacity = 0.22 * k;
    ghostable.forEach((m) => {
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      mats.forEach((mt) => {
        if (!orig.has(mt)) orig.set(mt, { t: mt.transparent, o: mt.opacity, dw: mt.depthWrite });
        const o = orig.get(mt);
        mt.transparent = k > 0 || o.t; mt.opacity = THREE.MathUtils.lerp(o.o, 0.09, k); mt.depthWrite = k < 0.5 ? o.dw : false;
      });
      m.castShadow = k < 0.5;
    });
  };
  return { root, refs };
}

// --- isi kapal (tampilan potongan/X-ray): lantai dek, ruang mesin, tangki air tawar, posisi skid SWRO ---
export function buildInterior() {
  const g = new THREE.Group();
  const S = (o) => new THREE.MeshStandardMaterial(o);
  const M = {
    slab: S({ color: '#7f95ad', roughness: 0.7, transparent: true, opacity: 0.35, depthWrite: false }),
    engine: S({ color: '#55606c', roughness: 0.5, metalness: 0.5 }),
    gen: S({ color: '#2f6f9e', roughness: 0.5, metalness: 0.3 }),
    tankFW: S({ color: '#2a8fe0', roughness: 0.3, transparent: true, opacity: 0.75, emissive: '#0d4f8a', emissiveIntensity: 0.3 }),
    tankFuel: S({ color: '#6b5a3a', roughness: 0.5, transparent: true, opacity: 0.55 }),
    skid: S({ color: '#ffffff', emissive: '#6ec3ff', emissiveIntensity: 1.2, roughness: 0.3 }),
    chest: S({ color: '#1b3550', roughness: 0.5 }),
  };
  const box = (w, h, d, mat, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); g.add(m); return m; };
  // lantai dek
  for (let k = 0; k < 9; k++) box(118, 0.15, 24, M.slab, 84, FB + k * DECK, 0);
  box(150, 0.15, 22, M.slab, 92, 2.5, 0); box(150, 0.15, 18, M.slab, 92, -3.5, 0);
  // ruang mesin (bawah, tengah-belakang): mesin utama & generator
  const er = { x0: 40, x1: 80, y: -3.4 };
  [-4.5, 4.5].forEach((z) => { box(12, 4, 3.4, M.engine, 52, -1.4, z); box(6, 2.6, 2.4, M.gen, 66, -2.1, z); });
  // tangki air tawar & bahan bakar
  const fw = box(14, 3.2, 7, M.tankFW, 100, -5.3, 4.5); box(14, 3.2, 7, M.tankFuel, 100, -5.3, -4.5);
  // skid SWRO (skala nyata 2,2 × 0,8 × 1,6 m) disorot
  const skid = box(2.2, 1.6, 0.8, M.skid, 74, -2.6, -7.5);
  // sea chest di lambung kanan-bawah & keluaran overboard
  const chest = box(2.4, 1.4, 0.6, M.chest, 72, -4.8, -12.0);
  return { group: g, M, pos: { skid: skid.position.clone(), fw: fw.position.clone(), chest: chest.position.clone(), overboard: V(76, 1.0, -B / 2), er } };
}
