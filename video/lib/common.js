// Utilitas animasi bersama untuk semua contoh gaya.
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const prog = (t, start, dur) => clamp((t - start) / dur);
export const easeOut = (x) => 1 - Math.pow(1 - x, 3);
export const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const easeBack = (x) => { const c = 1.70158; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };

// Cue subtitle contoh (adegan 6: pompa tekanan tinggi)
export const CUES = [
  { a: 0.4, b: 3.9, text: 'Pompa tekanan tinggi menaikkan tekanan air' },
  { a: 3.9, b: 7.7, text: 'hingga tipikal 55–70 bar.' },
];
export const DURATION = 8;

// Tampilkan cue aktif pada elemen subtitle dengan fade singkat
export function subtitle(el, t) {
  const c = CUES.find((c) => t >= c.a && t < c.b);
  if (!c) { el.style.opacity = 0; return; }
  if (el.textContent !== c.text) el.textContent = c.text;
  el.style.opacity = Math.min(prog(t, c.a, 0.2), 1 - prog(t, c.b - 0.2, 0.2));
}

// Tampilkan elemen overlay dengan fade + geser
export function reveal(el, t, start, dur = 0.6, dy = 24, end = Infinity) {
  const p = easeOut(prog(t, start, dur)) * (1 - prog(t, end, 0.4));
  el.style.opacity = p;
  el.style.transform = `translateY(${(1 - p) * dy}px)`;
}
