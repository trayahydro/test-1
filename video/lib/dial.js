// Panel manometer HTML (busur 0–80 bar, pita tipikal 55–70, penanda tekanan osmotik opsional)
import { el } from './overlay.js';
export function dial({ x = 110, y = 190, judul = 'TEKANAN UMPAN', osmotik = false } = {}) {
  const arc = (v0, v1) => { const a = (v) => Math.PI + (v / 80) * Math.PI, p = (v) => [150 + 120 * Math.cos(a(v)), 150 + 120 * Math.sin(a(v))]; const [x0, y0] = p(v0), [x1, y1] = p(v1); return `M${x0} ${y0} A120 120 0 0 1 ${x1} ${y1}`; };
  const osm = osmotik ? (() => { const a = Math.PI + (27 / 80) * Math.PI; return `<line x1="${150 + 104 * Math.cos(a)}" y1="${150 + 104 * Math.sin(a)}" x2="${150 + 140 * Math.cos(a)}" y2="${150 + 140 * Math.sin(a)}" stroke="#ffb36b" stroke-width="4"/>`; })() : '';
  const d = el(`<div style="font-size:15px;font-weight:700;letter-spacing:4px;color:#6ec3ff">${judul}</div>
    <svg width="300" height="175" viewBox="0 0 300 175" style="display:block;margin:6px auto 0">
      <path d="${arc(0, 80)}" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="18" stroke-linecap="round"/>
      <path d="${arc(55, 70)}" fill="none" stroke="rgba(110,195,255,.55)" stroke-width="18"/>
      <path class="dv" fill="none" stroke="#6ec3ff" stroke-width="7" stroke-linecap="round"/>
      ${osm}
      <line class="dn" x1="150" y1="150" x2="150" y2="62" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
      <circle cx="150" cy="150" r="10" fill="#fff"/>
      <text x="22" y="172" fill="#a9c7e4" font-size="14">0</text><text x="268" y="172" fill="#a9c7e4" font-size="14">80</text>
    </svg>
    <div style="text-align:center;margin-top:-6px"><b class="dt" style="font-size:58px;font-weight:800">0</b><span style="font-size:24px;color:#6ec3ff;font-weight:700"> bar</span></div>
    <div style="text-align:center;font-size:18px;color:#6ec3ff;font-weight:700">tipikal 55–70 bar</div>
    ${osmotik ? '<div style="text-align:center;font-size:16px;color:#ffb36b;font-weight:700;margin-top:6px">▍tekanan osmotik air laut ± 27 bar (tipikal)</div>' : ''}`, 'card');
  d.style.width = '360px'; d.style.left = x + 'px'; d.style.top = y + 'px';
  const dv = d.querySelector('.dv'), dn = d.querySelector('.dn'), dt = d.querySelector('.dt');
  return {
    node: d,
    set(v, a) { d.style.opacity = a; dv.setAttribute('d', arc(0, Math.max(0.01, v))); dn.setAttribute('transform', `rotate(${-90 + v / 80 * 180} 150 150)`); dt.textContent = Math.round(v); },
  };
}
