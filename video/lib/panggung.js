// Panggung kontainer SWRO: dunia luar (langit, laut, daratan) + model + cahaya + peta lingkungan.
// Dipakai bersama oleh semua adegan yang memperlihatkan kontainer.
import * as THREE from 'three';
import { buatDunia, langit, laut, matahari, loadImg } from './dunia.js';
import { makeMaterials, buildSWRO, EX } from './model.js';

export async function panggungKontainer({ ao = true, bloom = 0.18, exposure = 0.95, langitOpt = {} } = {}) {
  const D = buatDunia({ ao, bloom, exposure });
  const { scene, pmrem, renderer } = D;
  const sk = langit(scene, pmrem, langitOpt);
  const sea = laut(scene, { y: -0.9 });
  const land = new THREE.Mesh(new THREE.PlaneGeometry(120, 40), new THREE.MeshStandardMaterial({ color: '#cbc4b3', roughness: 0.95 }));
  land.rotation.x = -Math.PI / 2; land.position.set(4, -0.37, -8); land.receiveShadow = true; scene.add(land);

  const logos = { dark: await loadImg('../logo/traya-logo-putih.png'), light: await loadImg('../traya-logo.png') };
  await document.fonts.ready;
  const M = makeMaterials(logos);
  const { root, refs } = buildSWRO(M, logos);
  scene.add(root);

  // dinding sisi lorong bisa "turun" (cutaway)
  const clipWall = new THREE.Plane(new THREE.Vector3(0, 1, 0), -EX.y0 + 0.001);
  refs.nearWall.traverse((o) => { if (o.isMesh) { o.material = o.material.clone(); o.material.clippingPlanes = [clipWall]; } });
  // bidang potong global untuk tampilan X-ray dari atas (atap & plafon "terangkat")
  const cut = new THREE.Plane(new THREE.Vector3(0, -1, 0), 50);
  renderer.clippingPlanes = [cut];

  const sun = matahari(scene, sk.sunDir, new THREE.Vector3(5, 0, 0), { span: 13 });
  scene.add(new THREE.HemisphereLight('#cfe6ff', '#6b6458', 0.5));
  const q = new URLSearchParams(location.search);
  const nRect = q.has('rect') ? Number(q.get('rect')) : 0, spotShadow = q.get('spot') === '1', nSpot = q.has('nspot') ? Number(q.get('nspot')) : 3;
  // mode cepat (default): lampu LED disimulasikan dengan point light tanpa bayangan (jauh lebih murah dari RectAreaLight)
  if (!q.has('rect')) {
    refs.lights.forEach((p, i) => { if (i % 2) return; const l = new THREE.PointLight('#f4f8ff', 2.6, 7, 1.5); l.position.set(p.x, p.y - 0.12, p.z); scene.add(l); });
  }
  if (q.has('rect')) refs.lights.slice(0, nRect).forEach((p) => { const l = new THREE.RectAreaLight('#f4f8ff', 9 * 5 / Math.max(1, nRect), 1.18, 0.25); l.position.copy(p); l.lookAt(p.x, 0, p.z); scene.add(l); });
  [[3.0, 0.2], [7.0, 0.3], [10.4, 0.3]].slice(0, nSpot).forEach(([x, z]) => {
    const s = new THREE.SpotLight('#ffffff', 9, 6, 1.25, 0.9, 1.6);
    s.position.set(x, 2.62, z); s.target.position.set(x, 0, z + 0.3);
    s.castShadow = spotShadow; s.shadow.mapSize.set(1024, 1024); s.shadow.bias = -0.0005; s.shadow.radius = 5;
    scene.add(s, s.target);
  });
  // peta lingkungan interior
  const cubeRT = new THREE.WebGLCubeRenderTarget(256, { type: THREE.HalfFloatType });
  const cubeCam = new THREE.CubeCamera(0.05, 50, cubeRT);
  cubeCam.position.set(7, 1.3, -0.4); scene.add(cubeCam);
  cubeCam.update(renderer, scene);
  const envInterior = pmrem.fromCubemap(cubeRT.texture).texture;
  scene.environment = sk.env;

  // Bayangan hanya dihitung ulang saat geometri berubah (dinding/potongan) atau tiap 15 frame.
  renderer.shadowMap.autoUpdate = false;
  let nFrame = 0, kotor = true, lastW = null, lastC = null;
  const renderD = D.render;
  return {
    ...D, M, refs, sea, sun, sky: sk,
    render() { if (kotor || nFrame % 15 === 0) renderer.shadowMap.needsUpdate = true; kotor = false; nFrame++; renderD(); },
    tandaiBayangan() { kotor = true; },
    env: { luar: sk.env, dalam: envInterior },
    // k: 0 = dinding utuh, 1 = dinding sisi lorong turun penuh
    setDinding(k) { if (k !== lastW) { kotor = true; lastW = k; } refs.nearWall.position.y = -k * 3.0; refs.nearWall.visible = k < 0.999; },
    // tinggi potong global (m); Infinity = tanpa potongan
    setPotong(y) { if (y !== lastC) { kotor = true; lastC = y; } cut.constant = Number.isFinite(y) ? y : 50; },
    setEnv(dalam) { scene.environment = dalam ? envInterior : sk.env; },
  };
}
