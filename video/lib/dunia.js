// Penyiapan dunia 3D bersama: renderer, post-processing, langit, laut, matahari, kamera keyframe.
import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { rng } from './tekstur.js';
import { easeInOut, clamp, lerp } from './common.js';

export const W = 1920, H = 1080;

export function buatDunia({ ao = true, bloom = 0.18, exposure = 0.95, samples = 4, shadows = true } = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true });
  renderer.setSize(W, H);
  renderer.shadowMap.enabled = shadows;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = exposure;
  renderer.localClippingEnabled = true;
  document.getElementById('stage').appendChild(renderer.domElement);
  RectAreaLightUniformsLib.init();
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(40, W / H, 0.02, 4000);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const rt = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType, samples });
  const composer = new EffectComposer(renderer, rt);
  composer.addPass(new RenderPass(scene, cam));
  let aoPass = null;
  if (ao) {
    aoPass = new GTAOPass(scene, cam, W, H);
    aoPass.updateGtaoMaterial({ radius: 0.35, distanceExponent: 1.5, thickness: 1.0, scale: 1.0, samples: 10 });
    aoPass.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 10 });
    aoPass.blendIntensity = 0.9;
    // objek transparan (air, kaca, garis aliran) tidak ikut pass AO agar tidak menimbulkan bayangan palsu
    const cache = new Map();
    aoPass.overrideVisibility = function () {
      this.scene.traverse((o) => {
        cache.set(o, o.visible);
        const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        if (o.isPoints || o.isLine || mats.some((m) => m.transparent)) o.visible = false;
      });
    };
    aoPass.restoreVisibility = function () { this.scene.traverse((o) => { if (cache.has(o)) o.visible = cache.get(o); }); cache.clear(); };
    composer.addPass(aoPass);
  }
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(W, H), bloom, 0.5, 0.9);
  if (bloom > 0) composer.addPass(bloomPass);
  composer.addPass(new OutputPass());
  // InstancedMesh: batas frustum dihitung dari posisi awal instans, jadi partikel yang bergerak bisa
  // ikut "terpotong". Matikan frustum culling untuk semua InstancedMesh sebelum render.
  const render = () => { scene.traverse((o) => { if (o.isInstancedMesh) o.frustumCulled = false; }); composer.render(); };
  return { renderer, scene, cam, pmrem, composer, aoPass, bloomPass, render };
}

// Kubah langit gradasi + kilau matahari. Warna dapat diganti (pagi, siang, senja).
export function langit(scene, pmrem, { elev = 26, az = -150, top = '#0f4c9a', mid = '#4f95d8', hor = '#dcebf7', sunCol = '#fff3e0', glow = 0.35 } = {}) {
  const sunDir = new THREE.Vector3().setFromSphericalCoords(1, THREE.MathUtils.degToRad(90 - elev), THREE.MathUtils.degToRad(az));
  const mk = (radius) => new THREE.Mesh(new THREE.SphereGeometry(radius, 48, 24), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { top: { value: new THREE.Color(top) }, mid: { value: new THREE.Color(mid) }, hor: { value: new THREE.Color(hor) }, sun: { value: sunDir }, sunCol: { value: new THREE.Color(sunCol) }, glow: { value: glow } },
    vertexShader: 'varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform vec3 top, mid, hor, sun, sunCol; uniform float glow; varying vec3 vD;
      void main(){ float h = vD.y; vec3 c = mix(hor, mid, smoothstep(0.0, 0.22, h)); c = mix(c, top, smoothstep(0.22, 0.85, h));
        if (h < 0.0) c = hor * 0.85;
        float s = max(dot(normalize(vD), normalize(sun)), 0.0);
        c += sunCol * (pow(s, 900.0) * 6.0 + pow(s, 12.0) * glow);
        gl_FragColor = vec4(c, 1.0); }`,
  }));
  const sky = mk(1500); scene.add(sky);
  const s2 = new THREE.Scene(); s2.add(mk(50));
  const env = pmrem.fromScene(s2, 0.02).texture;
  return { sky, env, sunDir };
}

// Laut: dua lapis normal map bergerak untuk riak yang hidup
function waveNormal(seed, n = 1400) {
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d');
  const r = rng(seed); g.fillStyle = '#8080ff'; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < n; i++) {
    const x = r() * 512, y = r() * 512, w = 20 + r() * 70;
    const gr = g.createLinearGradient(x, y - 4, x, y + 4);
    gr.addColorStop(0, 'rgba(128,96,255,.5)'); gr.addColorStop(1, 'rgba(128,160,255,.5)');
    g.fillStyle = gr; g.fillRect(x - w / 2, y - 3, w, 6);
  }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}
export function laut(scene, { y = -0.9, color = '#1b5c8c', size = 4000, rep = 60 } = {}) {
  const n1 = waveNormal(5); n1.repeat.set(rep, rep);
  const n2 = waveNormal(9, 900);
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.1, metalness: 0.25, normalMap: n1, normalScale: new THREE.Vector2(0.55, 0.55) });
  // lapis kedua digabung lewat onBeforeCompile: normal map kedua (skala 0,37×, arah gerak berbeda) dijumlahkan
  const off2 = new THREE.Vector2();
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.n2 = { value: n2 }; sh.uniforms.off2 = { value: off2 };
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <normalmap_pars_fragment>', '#include <normalmap_pars_fragment>\nuniform sampler2D n2; uniform vec2 off2;')
      .replace('#include <normal_fragment_maps>', `
      vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
      vec3 mapN2 = texture2D( n2, vNormalMapUv * 0.37 + off2 ).xyz * 2.0 - 1.0;
      mapN = normalize( vec3( mapN.xy + mapN2.xy, mapN.z * mapN2.z ) );
      mapN.xy *= normalScale;
      normal = normalize( tbn * mapN );`);
  };
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
  sea.rotation.x = -Math.PI / 2; sea.position.y = y; scene.add(sea);
  return { sea, mat, update: (t) => { n1.offset.set(t * 0.006, t * 0.003); off2.set(-t * 0.05, t * 0.07); } };
}

export function matahari(scene, sunDir, target, { intensity = 3.2, color = '#fff3e2', span = 11, dist = 30, map = 4096 } = {}) {
  const sun = new THREE.DirectionalLight(color, intensity);
  sun.position.copy(sunDir).multiplyScalar(dist).add(target); sun.target.position.copy(target);
  sun.castShadow = true; sun.shadow.mapSize.set(map, map);
  Object.assign(sun.shadow.camera, { left: -span, right: span, top: span * 0.75, bottom: -span * 0.75, near: 1, far: dist * 3 });
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
  scene.add(sun, sun.target);
  return sun;
}

// Kamera keyframe: { t, p:[x,y,z], l:[x,y,z], f:fov, sx: geser horizontal (px) }
// Antar keyframe diinterpolasi dengan easeInOut; ease:'lin' untuk gerak konstan.
export function kamera(cam, K) {
  const V3 = (a) => new THREE.Vector3(...a);
  return (t) => {
    let i = 0; while (i < K.length - 2 && t > K[i + 1].t) i++;
    const a = K[i], b = K[i + 1] || a;
    let u = b === a ? 0 : clamp((t - a.t) / (b.t - a.t));
    u = b.ease === 'lin' ? u : easeInOut(u);
    cam.position.copy(V3(a.p).lerp(V3(b.p), u));
    cam.lookAt(V3(a.l).lerp(V3(b.l), u));
    cam.fov = lerp(a.f ?? 40, b.f ?? 40, u);
    cam.setViewOffset(W, H, lerp(a.sx ?? 0, b.sx ?? 0, u), 0, W, H);
    cam.updateProjectionMatrix();
  };
}

export function layar(cam, p) { const v = p.clone().project(cam); return [(v.x + 1) / 2 * W, (1 - v.y) / 2 * H, v.z]; }
export const loadImg = (src) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = src; });

// Latar studio (gradasi navy + kisi halus) dan peta lingkungan ruang untuk adegan non-kontainer
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
export function latarStudio(scene, pmrem, { atas = '#123a6b', bawah = '#050f20', kisi = true } = {}) {
  const c = document.createElement('canvas'); c.width = 1920; c.height = 1080; const g = c.getContext('2d');
  const gr = g.createRadialGradient(960, 420, 80, 960, 540, 1250); gr.addColorStop(0, atas); gr.addColorStop(1, bawah);
  g.fillStyle = gr; g.fillRect(0, 0, 1920, 1080);
  if (kisi) { g.strokeStyle = 'rgba(110,195,255,0.05)'; g.lineWidth = 1; for (let x = 0; x <= 1920; x += 60) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 1080); g.stroke(); } for (let y = 0; y <= 1080; y += 60) { g.beginPath(); g.moveTo(0, y); g.lineTo(1920, y); g.stroke(); } }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  scene.background = t;
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
}
