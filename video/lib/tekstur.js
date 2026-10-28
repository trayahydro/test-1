// Tekstur prosedural (dibuat dengan canvas) untuk material realistis tanpa file gambar eksternal.
import * as THREE from 'three';

function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; }

// RNG deterministik agar setiap render menghasilkan tekstur yang sama
export function rng(seed = 1) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

function tex(c, { repeat = [1, 1], srgb = false } = {}) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(...repeat);
  t.anisotropy = 8;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Peta tinggi (grayscale) → normal map
function heightToNormal(src, strength = 2) {
  const w = src.width, h = src.height;
  const d = src.getContext('2d').getImageData(0, 0, w, h).data;
  const [c, g] = canvas(w, h);
  const out = g.createImageData(w, h);
  const H = (x, y) => d[(((y + h) % h) * w + ((x + w) % w)) * 4] / 255;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const dx = (H(x + 1, y) - H(x - 1, y)) * strength, dy = (H(x, y + 1) - H(x, y - 1)) * strength;
    const n = new THREE.Vector3(-dx, -dy, 1).normalize();
    const i = (y * w + x) * 4;
    out.data[i] = (n.x * 0.5 + 0.5) * 255; out.data[i + 1] = (n.y * 0.5 + 0.5) * 255; out.data[i + 2] = (n.z * 0.5 + 0.5) * 255; out.data[i + 3] = 255;
  }
  g.putImageData(out, 0, 0);
  return c;
}

// Stainless steel brushed: goresan halus searah
export function brushed(seed = 3) {
  const r = rng(seed);
  const [c, g] = canvas(512, 512);
  g.fillStyle = '#8a8a8a'; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 2600; i++) {
    const y = r() * 512, v = 110 + r() * 60;
    g.strokeStyle = `rgba(${v},${v},${v},${0.15 + r() * 0.25})`;
    g.lineWidth = 0.5 + r();
    g.beginPath(); g.moveTo(0, y); g.lineTo(512, y + (r() - 0.5) * 2); g.stroke();
  }
  return tex(c, { repeat: [1, 4] });
}

// Lantai checker plate aluminium (pola tapak berlian)
export function checkerPlate() {
  const [c, g] = canvas(256, 256);
  g.fillStyle = '#000'; g.fillRect(0, 0, 256, 256);
  const bar = (x, y, a) => {
    g.save(); g.translate(x, y); g.rotate(a);
    const grd = g.createLinearGradient(0, -6, 0, 6); grd.addColorStop(0, '#333'); grd.addColorStop(0.5, '#fff'); grd.addColorStop(1, '#333');
    g.fillStyle = grd; g.beginPath(); g.ellipse(0, 0, 26, 6, 0, 0, Math.PI * 2); g.fill(); g.restore();
  };
  for (let y = 0; y < 2; y++) for (let x = 0; x < 2; x++) {
    bar(x * 128 + 32, y * 128 + 32, Math.PI / 4); bar(x * 128 + 96, y * 128 + 96, Math.PI / 4);
    bar(x * 128 + 96, y * 128 + 32, -Math.PI / 4); bar(x * 128 + 32, y * 128 + 96, -Math.PI / 4);
  }
  const n = tex(heightToNormal(c, 3), { repeat: [60, 12] });
  const [rc, rg] = canvas(256, 256);
  const rr = rng(7);
  rg.fillStyle = '#7a7a7a'; rg.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 4000; i++) { const v = 90 + rr() * 80; rg.fillStyle = `rgba(${v},${v},${v},.35)`; rg.fillRect(rr() * 256, rr() * 256, 2, 2); }
  return { normal: n, rough: tex(rc, { repeat: [60, 12] }) };
}

// Panel sandwich dinding dalam: putih dengan sambungan vertikal
export function wallPanel(panels = 12) {
  const [c, g] = canvas(1024, 128);
  g.fillStyle = '#808080'; g.fillRect(0, 0, 1024, 128);
  for (let i = 0; i <= panels; i++) {
    const x = (i / panels) * 1024;
    g.fillStyle = '#202020'; g.fillRect(x - 2, 0, 3, 128);
    g.fillStyle = '#c0c0c0'; g.fillRect(x + 1, 0, 2, 128);
  }
  // rib tipis di tengah panel
  for (let i = 0; i < panels; i++) for (let k = 1; k < 4; k++) { const x = ((i + k / 4) / panels) * 1024; g.fillStyle = '#9a9a9a'; g.fillRect(x, 0, 2, 128); }
  return tex(heightToNormal(c, 1.5));
}

// Gelombang dinding luar kontainer (normal map untuk detail tambahan karat/cat halus)
export function paintNoise(seed = 11) {
  const r = rng(seed);
  const [c, g] = canvas(256, 256);
  g.fillStyle = '#909090'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 3000; i++) { const v = 120 + r() * 50; g.fillStyle = `rgba(${v},${v},${v},.25)`; g.beginPath(); g.arc(r() * 256, r() * 256, r() * 3, 0, 7); g.fill(); }
  return tex(c, { repeat: [8, 2] });
}

// Teks / logo di canvas → tekstur (untuk branding kontainer, papan nama, label)
export function textPanel(w, h, draw) {
  const [c, g] = canvas(w, h);
  draw(g, w, h);
  const t = tex(c, { srgb: true });
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

// Muka manometer
export function gaugeFace(maxVal = 100, unit = 'bar') {
  return textPanel(256, 256, (g) => {
    g.fillStyle = '#f7f7f2'; g.beginPath(); g.arc(128, 128, 124, 0, 7); g.fill();
    g.strokeStyle = '#222'; g.lineWidth = 3;
    for (let i = 0; i <= 20; i++) {
      const a = Math.PI * 0.75 + (i / 20) * Math.PI * 1.5, r0 = i % 5 ? 98 : 88;
      g.beginPath(); g.moveTo(128 + Math.cos(a) * r0, 128 + Math.sin(a) * r0); g.lineTo(128 + Math.cos(a) * 110, 128 + Math.sin(a) * 110); g.stroke();
    }
    g.strokeStyle = '#d32f2f'; g.lineWidth = 8; g.beginPath(); g.arc(128, 128, 104, Math.PI * 0.75 + 1.5 * Math.PI * 0.8, Math.PI * 2.25); g.stroke();
    g.fillStyle = '#222'; g.font = 'bold 26px Jakarta, sans-serif'; g.textAlign = 'center'; g.fillText(unit, 128, 190);
    g.font = '18px Jakarta, sans-serif';
    [0, maxVal / 2, maxVal].forEach((v, i) => { const a = Math.PI * 0.75 + (i / 2) * Math.PI * 1.5; g.fillText(v, 128 + Math.cos(a) * 70, 134 + Math.sin(a) * 70); });
  });
}
