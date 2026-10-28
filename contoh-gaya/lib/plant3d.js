// Model 3D sederhana: cartridge filter → pompa tekanan tinggi → rak pressure vessel RO.
// Dipakai bersama oleh gaya "isometrik 2.5D" dan "3D sinematik"; materialnya ditentukan per gaya.
import * as THREE from 'three';

// Jalur pipa siku dengan sudut membulat
function roundedPath(pts, rad = 0.25) {
  const path = new THREE.CurvePath();
  let prev = pts[0].clone();
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i];
    if (i < pts.length - 1) {
      const n = pts[i + 1];
      const a = p.clone().sub(prev).normalize();
      const b = n.clone().sub(p).normalize();
      const r = Math.min(rad, p.distanceTo(prev) / 2, n.distanceTo(p) / 2);
      const c0 = p.clone().addScaledVector(a, -r);
      const c1 = p.clone().addScaledVector(b, r);
      if (prev.distanceTo(c0) > 1e-4) path.add(new THREE.LineCurve3(prev, c0));
      path.add(new THREE.QuadraticBezierCurve3(c0, p.clone(), c1));
      prev = c1;
    } else {
      path.add(new THREE.LineCurve3(prev, p.clone()));
    }
  }
  return path;
}

// Tekstur garis-garis aliran yang bergeser sepanjang pipa
function flowTexture(base, stripe) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 16;
  const g = c.getContext('2d');
  g.fillStyle = base; g.fillRect(0, 0, 256, 16);
  const grd = g.createLinearGradient(0, 0, 256, 0);
  grd.addColorStop(0, base); grd.addColorStop(0.55, stripe); grd.addColorStop(0.7, base); grd.addColorStop(1, base);
  g.fillStyle = grd; g.fillRect(0, 0, 256, 16);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const V = (x, y, z) => new THREE.Vector3(x, y, z);

export function buildPlant(M, opts = {}) {
  const root = new THREE.Group();
  const anim = { flows: [], spinners: [], particles: null };
  const outline = opts.outline;

  function add(geom, mat, parent = root) {
    const m = new THREE.Mesh(geom, mat);
    m.castShadow = m.receiveShadow = true;
    parent.add(m);
    if (outline) {
      const e = new THREE.LineSegments(new THREE.EdgesGeometry(geom, 35), outline);
      m.add(e);
    }
    return m;
  }
  const cylX = (r, len, mat, x, y, z, seg = 40) => {
    const m = add(new THREE.CylinderGeometry(r, r, len, seg), mat);
    m.rotation.z = Math.PI / 2; m.position.set(x, y, z); return m;
  };
  const box = (w, h, d, mat, x, y, z) => { const m = add(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); return m; };

  function pipe(pts, r, speed, flow = true) {
    const curve = roundedPath(pts, 0.3);
    const len = curve.getLength();
    let mat = M.pipe;
    if (flow) {
      const tex = flowTexture(M.flowBase, M.flowStripe);
      tex.repeat.set(len / 0.9, 1);
      mat = M.pipeFlow.clone();
      mat.map = tex;
      if (mat.emissiveMap !== undefined && M.flowEmissive) { mat.emissiveMap = tex; }
      anim.flows.push({ tex, speed });
    }
    const m = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(64, Math.round(len * 40)), r, 20, false), mat);
    m.castShadow = true;
    root.add(m);
    if (outline) {
      // Garis tepi pipa: dua garis sejajar terlalu ramai, jadi cukup sambungan di ujung
      [0, 1].forEach((u) => {
        const p = curve.getPointAt(u), tg = curve.getTangentAt(u);
        const ring = new THREE.Mesh(new THREE.TorusGeometry(r * 1.15, r * 0.25, 8, 24), M.pipe);
        ring.position.copy(p); ring.lookAt(p.clone().add(tg)); root.add(ring);
      });
    }
    return curve;
  }

  // Lantai
  if (M.ground) {
    const g = new THREE.Mesh(new THREE.PlaneGeometry(60, 40), M.ground);
    g.rotation.x = -Math.PI / 2; g.receiveShadow = true; root.add(g);
  }

  // --- Cartridge filter (housing vertikal di atas kaki) ---
  const fx = -6;
  add(new THREE.CylinderGeometry(0.55, 0.55, 1.9, 48), M.housing).position.set(fx, 1.35, 0);
  const dome = add(new THREE.SphereGeometry(0.55, 48, 16, 0, Math.PI * 2, 0, Math.PI / 2), M.housing); dome.position.set(fx, 2.3, 0);
  add(new THREE.CylinderGeometry(0.62, 0.62, 0.1, 48), M.flange).position.set(fx, 2.2, 0);
  add(new THREE.CylinderGeometry(0.5, 0.3, 0.4, 48), M.housing).position.set(fx, 0.2, 0);
  [-1, 1].forEach((s) => box(0.08, 0.4, 0.08, M.frame, fx + s * 0.35, 0.2, 0));

  // --- Pompa tekanan tinggi di atas skid ---
  box(3.6, 0.25, 1.3, M.skid, -2.2, 0.125, 0);
  // motor
  cylX(0.5, 1.5, M.motor, -3.1, 0.8, 0);
  for (let i = 0; i < 9; i++) cylX(0.53, 0.04, M.motorFin, -3.7 + i * 0.15, 0.8, 0);
  cylX(0.42, 0.2, M.motorFin, -3.95, 0.8, 0); // tutup kipas
  box(1.0, 0.3, 0.9, M.motor, -3.1, 0.38, 0);
  // kopling berputar
  const coupling = new THREE.Group(); coupling.position.set(-2.15, 0.8, 0); root.add(coupling);
  const cdisc = add(new THREE.CylinderGeometry(0.22, 0.22, 0.25, 6), M.accent, coupling); cdisc.rotation.z = Math.PI / 2;
  for (let i = 0; i < 4; i++) {
    const b = add(new THREE.BoxGeometry(0.27, 0.06, 0.06), M.flange, coupling);
    const a = (i / 4) * Math.PI * 2; b.position.set(0, Math.cos(a) * 0.17, Math.sin(a) * 0.17);
  }
  anim.spinners.push(coupling);
  // pompa multistage
  cylX(0.42, 1.1, M.pump, -1.35, 0.8, 0);
  for (let i = 0; i < 5; i++) cylX(0.46, 0.06, M.flange, -1.8 + i * 0.22, 0.8, 0);
  box(1.0, 0.35, 0.8, M.pump, -1.35, 0.35, 0);

  // --- Rak pressure vessel ---
  const levels = [0.9, 1.6, 2.3];
  const vx0 = 1.0, vx1 = 7.0, vr = 0.28;
  [1.4, 6.6].forEach((x) => [-0.45, 0.45].forEach((z) => box(0.1, 2.75, 0.1, M.frame, x, 1.375, z)));
  levels.forEach((y) => [1.4, 6.6].forEach((x) => box(0.12, 0.08, 1.0, M.frame, x, y - vr - 0.04, 0)));
  const vessels = levels.map((y) => {
    const v = cylX(vr, vx1 - vx0, M.vessel, (vx0 + vx1) / 2, y, 0, 48);
    v.renderOrder = 2;
    [vx0, vx1].forEach((x) => cylX(vr + 0.04, 0.12, M.vesselCap, x, y, 0, 48));
    if (M.membrane) {
      // elemen membran di dalam vessel (terlihat bila vessel transparan)
      for (let k = 0; k < 6; k++) {
        const e = cylX(vr * 0.82, 0.92, M.membrane, vx0 + 0.55 + k * 0.98, y, 0, 40);
        e.castShadow = false;
      }
      cylX(0.05, vx1 - vx0, M.permeate, (vx0 + vx1) / 2, y, 0, 16);
    }
    return v;
  });

  // --- Pipa ---
  const feed = pipe([V(fx + 0.55, 1.9, 0), V(-1.75, 1.9, 0), V(-1.75, 1.2, 0)], 0.11, 0.9);
  const hp = pipe([V(-0.95, 1.2, 0), V(-0.95, 1.6, 0), V(0.45, 1.6, 0), V(0.45, 0.9, 0)], 0.1, 1.8);
  pipe([V(0.45, 0.9, 0), V(0.45, 2.3, 0)], 0.1, 1.8);
  levels.forEach((y) => pipe([V(0.45, y, 0), V(vx0 - 0.06, y, 0)], 0.08, 1.8));
  levels.forEach((y) => pipe([V(vx1 + 0.06, y, 0), V(7.5, y, 0)], 0.08, 1.4));
  pipe([V(7.5, 2.3, 0), V(7.5, 0.5, 0), V(10, 0.5, 0)], 0.1, 1.4);

  // Partikel air di dalam vessel (hanya untuk vessel transparan)
  if (opts.particles) {
    const N = 420;
    // partikel memanjang seperti garis aliran
    const geo = new THREE.SphereGeometry(0.016, 8, 6).scale(5, 1, 1);
    const inst = new THREE.InstancedMesh(geo, M.particle, N);
    const seeds = [];
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2;
      // partikel mengalir di celah antara elemen membran dan dinding vessel
      const rr = M.membrane ? vr * (0.85 + 0.1 * Math.random()) : Math.sqrt(Math.random()) * vr * 0.9;
      seeds.push({ y: levels[i % 3] + Math.cos(a) * rr, z: Math.sin(a) * rr, u: Math.random(), s: 0.8 + Math.random() * 0.4 });
    }
    inst.renderOrder = 3;
    root.add(inst);
    anim.particles = { inst, seeds, x0: vx0, x1: vx1 };
  }

  anim.paths = { feed, hp };
  anim.vessels = vessels;
  return { root, anim };
}

// Perbarui animasi: kecepatan aliran mengikuti faktor tekanan p (0..1)
const _m = new THREE.Matrix4();
export function updatePlant(anim, t, p) {
  const spin = t > 0.8 ? 22 * ((t - 0.8) - (1 - Math.exp(-1.5 * (t - 0.8))) / 1.5) : 0;
  anim.spinners.forEach((s) => (s.rotation.x = spin));
  anim.flows.forEach((f) => (f.tex.offset.x = -t * f.speed * (0.35 + 0.65 * p) / 0.9));
  if (anim.particles) {
    const { inst, seeds, x0, x1 } = anim.particles;
    seeds.forEach((s, i) => {
      const u = (s.u + t * 0.09 * s.s * (0.3 + 0.7 * p)) % 1;
      _m.makeTranslation(x0 + u * (x1 - x0), s.y, s.z);
      inst.setMatrixAt(i, _m);
    });
    inst.instanceMatrix.needsUpdate = true;
  }
}
