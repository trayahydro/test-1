// Overlay bersama untuk semua adegan: subtitle tersinkron VO, chip judul tahap, rel progres,
// kartu spesifikasi dengan garis penunjuk, logo, dan judul besar.
import { prog, easeOut, lerp } from './common.js';

export const PRE = 0.6;   // detik sebelum narasi dimulai
export const POST = 1.0;  // detik setelah narasi selesai (ruang transisi)
export const TAHAP = ['Intake', 'MMF', 'UF', 'Dosing', 'Cartridge', 'HPP', 'Membran RO', 'ERD', 'Post', 'Produk'];

const NS = 'http://www.w3.org/2000/svg';
let ov, svg, subEl, cues = [];
const items = [];

// Timing: animasi dirancang terhadap tts/timing_desain.json. Suara final (tts/timing_vo.json) bisa
// berbeda durasinya; waktu nyata dipetakan ke waktu desain secara linear per kalimat (time-warp),
// sehingga animasi tetap sinkron dengan narasi tanpa mengubah halaman adegan.
// Sub-adegan: { dari, ke } dalam detik waktu desain (termasuk PRE).
let kD = [0, 1], kR = [0, 1], T0R = 0;
const interp = (x, xs, ys) => {
  if (x <= xs[0]) return ys[0] + (x - xs[0]);
  for (let i = 1; i < xs.length; i++) if (x <= xs[i]) return ys[i - 1] + (ys[i] - ys[i - 1]) * (x - xs[i - 1]) / Math.max(1e-6, xs[i] - xs[i - 1]);
  return ys[ys.length - 1] + (x - xs[xs.length - 1]);
};
export const keDesain = (tr) => interp(tr, kR, kD);
export const keNyata = (td) => interp(td, kD, kR);
export async function siapkanAdegan(no, { pre = PRE, post = POST, extra = 0, dari = 0, ke = null } = {}) {
  const [des, vo] = await Promise.all(['../tts/timing_desain.json', '../tts/timing_vo.json'].map((u) => fetch(u).then((r) => r.json())));
  const sd = des.find((d) => d.no === no), sv = vo.find((d) => d.no === no);
  cues = sv.cues.map((c) => ({ ...c, a: c.a + pre, b: c.b + pre }));
  const fullD = +(pre + sd.durasi + post + extra).toFixed(3), fullR = +(pre + sv.durasi + post + extra).toFixed(3);
  if (sd.cues.length === sv.cues.length) {
    kD = [0]; kR = [0];
    sd.cues.forEach((c, i) => { kD.push(pre + c.a, pre + c.b); kR.push(pre + sv.cues[i].a, pre + sv.cues[i].b); });
    kD.push(fullD); kR.push(fullR);
  } else { kD = [0, fullD]; kR = [0, fullR]; }
  const akhirD = ke == null ? fullD : ke;
  T0R = keNyata(dari);
  window.DURASI = +(keNyata(akhirD) - T0R).toFixed(3);
  window.T0 = T0R;
  window.AUDIO_OFFSET = pre;
  ov = document.createElement('div'); ov.id = 'ov'; document.body.appendChild(ov);
  svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'lines'); svg.setAttribute('width', 1920); svg.setAttribute('height', 1080); ov.appendChild(svg);
  const subs = document.createElement('div'); subs.className = 'subs'; subEl = document.createElement('span'); subs.appendChild(subEl); ov.appendChild(subs);
  return { durasi: fullD, durasiNyata: fullR, lokal: window.DURASI, T0: dari, narasi: sd.durasi, cues, pre };
}

export function el(html, cls) { const d = document.createElement('div'); if (cls) d.className = cls; d.innerHTML = html; ov.insertBefore(d, ov.lastChild); return d; }

let tNyata = null;
// Ubah waktu lokal halaman (detik sejak awal klip) menjadi waktu desain adegan.
export function waktu(tl) { tNyata = tl + T0R; return keDesain(tNyata); }
export function subtitle(t) {
  if (tNyata != null) t = tNyata;
  const c = cues.find((c) => t >= c.a && t < c.b + 0.15);
  if (!c) { subEl.style.opacity = 0; return; }
  if (subEl.textContent !== c.text) subEl.textContent = c.text;
  subEl.style.opacity = Math.min(1, prog(t, c.a, 0.15) * 1, 1 - prog(t, c.b, 0.15));
}

// Chip judul tahap + rel progres (indeks tahap aktif dalam TAHAP, atau -1 tanpa rel)
export function chip(no, judul, sub = '', tahap = -1, t0 = 0.3) {
  const c = el(`<div class="no">${no}</div><div><div class="tt">${judul}</div>${sub ? `<div class="sub">${sub}</div>` : ''}</div>`, 'chip');
  let p = null;
  if (tahap >= 0) {
    p = el(TAHAP.map((_, i) => `<i class="${i < tahap ? 'done' : i === tahap ? 'on' : ''}"></i>`).join('') + `<b>${TAHAP[tahap].toUpperCase()}</b>`, 'prog');
    p.style.top = sub ? '150px' : '128px';
  }
  items.push({ up: (t) => { const a = easeOut(prog(t, t0, 0.6)); c.style.opacity = a; c.style.transform = `translateY(${(1 - a) * 14}px)`; if (p) p.style.opacity = easeOut(prog(t, t0 + 0.3, 0.6)); } });
}

export function bug(t0 = 0.2) {
  const b = document.createElement('img'); b.className = 'bug'; b.src = '../logo/traya-logo-putih.png'; ov.insertBefore(b, ov.lastChild);
  items.push({ up: (t) => (b.style.opacity = 0.92 * prog(t, t0, 0.5)) });
}

// Kartu spesifikasi. rows: [[label, nilai, 'TIPIKAL'?], ...]; anchor: fungsi (t) → [x,y] layar atau null
export function kartu({ k, tt, rows = [], x, y, t0, t1 = 1e9, anchor = null, w = 450 }) {
  const c = el(`<div class="k">${k}</div><div class="tt">${tt}</div>` + rows.map(([l, v, typ]) => `<div class="row"><span>${l}</span><b>${v}${typ ? `<em>${typ}</em>` : ''}</b></div>`).join(''), 'card');
  c.style.width = w + 'px';
  let ln = null;
  if (anchor) {
    const g = document.createElementNS(NS, 'g');
    const l = document.createElementNS(NS, 'polyline'); l.setAttribute('fill', 'none'); l.setAttribute('stroke', '#6ec3ff'); l.setAttribute('stroke-width', '2');
    const d = document.createElementNS(NS, 'circle'); d.setAttribute('r', '8'); d.setAttribute('fill', '#6ec3ff');
    const r = document.createElementNS(NS, 'circle'); r.setAttribute('fill', 'none'); r.setAttribute('stroke', '#6ec3ff'); r.setAttribute('stroke-width', '2');
    g.append(l, d, r); svg.appendChild(g); ln = { g, l, d, r };
  }
  items.push({ up: (t) => {
    const a = easeOut(prog(t, t0, 0.5)) * (1 - prog(t, t1, 0.35));
    c.style.opacity = a; c.style.left = x + 'px'; c.style.top = (y + (1 - a) * 18) + 'px';
    if (!ln) return;
    const p = anchor(t);
    if (!p || a <= 0) { ln.g.setAttribute('opacity', 0); return; }
    const [sx, sy] = p;
    const cx = x + w / 2 < 960 ? x + w + 52 : x, cy = y + 46;
    const k2 = easeOut(prog(t, t0 + 0.15, 0.5));
    const ex = lerp(sx, sx + (cx - sx) * 0.3, k2), mx = lerp(sx, cx, k2), my = lerp(sy, cy, k2);
    ln.l.setAttribute('points', `${sx},${sy} ${ex},${my} ${mx},${my}`);
    ln.d.setAttribute('cx', sx); ln.d.setAttribute('cy', sy);
    const pu = (t * 1.2) % 1; ln.r.setAttribute('cx', sx); ln.r.setAttribute('cy', sy); ln.r.setAttribute('r', 8 + pu * 18); ln.r.setAttribute('opacity', 1 - pu);
    ln.g.setAttribute('opacity', a);
  } });
  return c;
}

// Judul besar (kiri bawah) dengan bayangan gradasi
export function judulBesar({ k, tt, sub = '', t0, t1 = 1e9, left = 96, bottom = 190 }) {
  const sh = el('', 'shade'); sh.style.background = 'linear-gradient(20deg, rgba(4,14,30,.72) 0%, rgba(4,14,30,.25) 40%, transparent 62%)';
  const b = el(`<div class="k">${k}</div><div class="tt">${tt}</div>${sub ? `<div class="sub">${sub}</div>` : ''}`, 'big');
  b.style.left = left + 'px'; b.style.bottom = bottom + 'px';
  items.push({ up: (t) => { const a = easeOut(prog(t, t0, 0.8)) * (1 - prog(t, t1, 0.5)); b.style.opacity = a; sh.style.opacity = a; b.style.transform = `translateY(${(1 - a) * 20}px)`; } });
  return b;
}

// Elemen bebas dengan fade masuk/keluar
export function muncul(node, t0, t1 = 1e9, dy = 16) {
  items.push({ up: (t) => { const a = easeOut(prog(t, t0, 0.5)) * (1 - prog(t, t1, 0.4)); node.style.opacity = a; node.style.transform = `translateY(${(1 - a) * dy}px)`; } });
}

export function perbarui(t) { items.forEach((i) => i.up(t)); subtitle(t); }

// Penanda bernomor yang menempel pada titik 3D (anchor: fungsi (t) → [x,y] layar)
export function penanda(no, label, anchor, t0, t1 = 1e9, { kiri = false } = {}) {
  const d = el(`<div class="pn-no">${no}</div><div class="pn-lb">${label}</div>`, 'pn' + (kiri ? ' kiri' : ''));
  items.push({ up: (t) => {
    const a = easeOut(prog(t, t0, 0.45)) * (1 - prog(t, t1, 0.35));
    const p = anchor(t);
    if (!p || a <= 0) { d.style.opacity = 0; return; }
    d.style.opacity = a;
    d.style.left = p[0] + 'px'; d.style.top = p[1] + 'px';
    d.style.transform = `translate(${kiri ? 'calc(-100% + 22px)' : '-22px'}, -22px) scale(${0.8 + 0.2 * a})`;
  } });
  return d;
}
