// Render semua adegan (lintas platform: Windows / Mac / Linux).
// Tiap adegan dirender per potongan 150 frame ke out/chunk/<adegan>/, lalu disambung ke out/seg/<adegan>.mp4.
// Dapat dilanjutkan: potongan dan segmen yang sudah ada dilewati, jadi aman dihentikan (Ctrl+C) lalu dijalankan lagi.
// Pemakaian: node render-semua.js [jumlah_proses]   (default 1)
const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

process.chdir(__dirname);
const N = Number(process.argv[2] || 1);
const TOTAL = 19038; // total frame seluruh adegan
const JOBS = `adegan-02 adegan-16 adegan-17 adegan-15 adegan-12 adegan-07 adegan-05a adegan-10a adegan-04b adegan-13a adegan-11a adegan-09a adegan-08a
adegan-05b adegan-10b adegan-01 adegan-06 adegan-11b adegan-08b adegan-13b adegan-09b adegan-04a adegan-10c adegan-03 adegan-14 adegan-00`.split(/\s+/)
  .filter((f) => !process.env.RENDER_JOBS || process.env.RENDER_JOBS.split(',').includes(f)); // RENDER_JOBS: hanya adegan tertentu
['out/seg', 'out/log', 'out/chunk'].forEach((d) => fs.mkdirSync(d, { recursive: true }));

const prog = {}; // frame selesai per adegan
const potongan = (f) => (fs.existsSync(`out/chunk/${f}`) ? fs.readdirSync(`out/chunk/${f}`).filter((c) => /^c\d+\.mp4$/.test(c)).length : 0);
const t0 = Date.now(); let f0 = null;

function laporan() {
  const done = Object.values(prog).reduce((a, b) => a + b, 0);
  if (f0 == null) f0 = done;
  const el = (Date.now() - t0) / 1000, laju = (done - f0) / el;
  const sisa = laju > 0 ? (TOTAL - done) / laju : 0;
  const segSelesai = JOBS.filter((f) => fs.existsSync(`out/seg/${f}.mp4`)).length;
  const eta = laju > 0 ? `, sisa ± ${Math.floor(sisa / 3600)} jam ${Math.round((sisa % 3600) / 60)} menit` : '';
  console.log(`[progres] ${done}/${TOTAL} frame (${(done / TOTAL * 100).toFixed(1)}%), segmen ${segSelesai}/26${eta}`);
}

function renderSatu(f) {
  return new Promise((resolve) => {
    const out = `out/seg/${f}.mp4`, dir = `out/chunk/${f}`;
    if (fs.existsSync(out) && fs.statSync(out).size > 0) { console.log(`lewati ${f}`); return resolve(); }
    fs.mkdirSync(dir, { recursive: true });
    fs.readdirSync(dir).filter((c) => c.endsWith('.part.mp4')).forEach((c) => fs.unlinkSync(path.join(dir, c)));
    const log = fs.createWriteStream(`out/log/${f}.log`, { flags: 'a' });
    console.log(`mulai ${f}`);
    const p = spawn(process.execPath, ['render.js', `${f}.html`, process.env.DURASI || 'auto', `${dir}/`]);
    const baca = (d) => {
      const s = d.toString(); log.write(s);
      const m = [...s.matchAll(/(\d+)\/(\d+)/g)].pop(); if (m) prog[f] = Number(m[1]);
      const g = s.match(/\[grafis\][^\n]*/); if (g) console.log(`${f} ${g[0]}`);
    };
    p.stdout.on('data', baca); p.stderr.on('data', baca);
    p.on('close', (code) => {
      log.end();
      if (code !== 0) { console.log(`GAGAL ${f} (lihat out/log/${f}.log)`); return resolve(); }
      const list = fs.readdirSync(dir).filter((c) => /^c\d+\.mp4$/.test(c)).sort()
        .map((c) => `file '${path.resolve(dir, c).replace(/\\/g, '/')}'`).join('\n');
      fs.writeFileSync(`${dir}/daftar.txt`, list + '\n');
      const r = spawnSync('ffmpeg', ['-nostdin', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', `${dir}/daftar.txt`,
        '-c', 'copy', '-movflags', '+faststart', `out/seg/${f}.part.mp4`], { stdio: 'inherit' });
      if (r.status === 0) { fs.renameSync(`out/seg/${f}.part.mp4`, out); console.log(`selesai ${f}`); } else console.log(`GAGAL menyambung ${f}`);
      resolve();
    });
  });
}

(async () => {
  JOBS.forEach((f) => { prog[f] = potongan(f) * 150; });
  const timer = setInterval(laporan, 60000);
  const antre = [...JOBS];
  await Promise.all(Array.from({ length: N }, async () => { while (antre.length) await renderSatu(antre.shift()); }));
  clearInterval(timer);
  laporan();
  const kurang = JOBS.filter((f) => !fs.existsSync(`out/seg/${f}.mp4`));
  console.log(kurang.length ? `Belum selesai: ${kurang.join(', ')} — jalankan lagi perintah yang sama.` : 'SEMUA SEGMEN SELESAI. Lanjut: python rakit.py');
})();
