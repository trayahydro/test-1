// Bantuan kecil untuk halaman adegan video 3 m³
import * as THREE from 'three';
import { layar } from '../../video/lib/dunia.js';
import { aliran } from '../../video/lib/aliran.js';
import { prog, easeInOut } from '../../video/lib/common.js';
export const V = (x, y, z) => new THREE.Vector3(x, y, z);
// penunjuk layar untuk titik 3D (null bila di belakang kamera)
export const penunjuk = (cam) => (p) => () => { const s = layar(cam, p); return s[2] < 1 ? s : null; };
// aliran pada pipa bernama dari skid / sambungan kapal
export function alir(pipa, warna, opt = {}) { return aliran(pipa.path, pipa.r, warna, { parent: opt.parent, speed: 0.5, spacing: 0.14, scale: 1.35, ...opt }); }
// jalankan aliran: muncul (progres) dari t0 selama dur, padam di t1
export function jalan(a, t, t0, dur = 1.2, t1 = 1e9) { const p = easeInOut(prog(t, t0, dur)); a.set(t, p, p > 0 ? 1 - prog(t, t1, 0.5) : 0); }
export function kurva(pts) { return new THREE.CatmullRomCurve3(pts, false, 'centripetal'); }
