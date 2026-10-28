// Render halaman HTML beranimasi menjadi MP4, frame demi frame.
// Halaman wajib menyediakan window.ready (Promise) dan window.renderFrame(t) (detik).
// Pemakaian: node render.js <file.html> <durasi_detik|auto> <output.mp4> [fps] [mulai_detik]
// 'auto' memakai window.DURASI dari halaman (durasi narasi + jeda).
// (mulai_detik + durasi memungkinkan render dipecah ke beberapa proses lalu disambung)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const http = require('http');
const fs = require('fs');

// Server statis lokal: modul ES (three.js) tidak bisa dimuat dari file://
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.wav': 'audio/wav', '.svg': 'image/svg+xml', '.json': 'application/json' };
function serve(root) {
  const srv = http.createServer((req, res) => {
    const f = path.join(root, decodeURIComponent(req.url.split('?')[0]));
    if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise((r) => srv.listen(0, '127.0.0.1', () => r(srv)));
}

(async () => {
  const [html, dur, out, fpsArg, startArg] = process.argv.slice(2);
  const fps = Number(fpsArg || 30);
  const f0 = Math.round(Number(startArg || 0) * fps);

  // GPU=1 memakai kartu grafis (default di Windows/Mac); GPU=0 memakai emulasi CPU SwiftShader (server tanpa GPU).
  const gpu = (process.env.GPU ?? (['win32', 'darwin'].includes(process.platform) ? '1' : '0')) === '1';
  const args = gpu
    ? ['--enable-gpu', '--ignore-gpu-blocklist', '--enable-gpu-rasterization', ...(process.platform === 'win32' ? ['--use-angle=d3d11'] : [])]
    : ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'];
  const browser = await chromium.launch({ args, headless: process.env.HEADED !== '1' });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('console', (m) => console.log('[page]', m.text()));
  page.on('pageerror', (e) => console.error('[pageerror]', e));
  const root = path.resolve(__dirname, '..');
  const srv = await serve(root);
  await page.goto(`http://127.0.0.1:${srv.address().port}/${path.relative(root, path.resolve(html))}`);
  await page.evaluate(() => window.ready);
  await page.evaluate(() => document.fonts.ready);
  const gl = await page.evaluate(() => {
    const g = document.createElement('canvas').getContext('webgl2'), e = g && g.getExtension('WEBGL_debug_renderer_info');
    return g ? (e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : g.getParameter(g.RENDERER)) : 'tanpa WebGL2';
  });
  console.log(`[grafis] ${gl}`);
  const durasi = dur === 'auto' ? await page.evaluate(() => window.DURASI) : Number(dur);
  const frames = Math.round(durasi * fps);

  // Mode potongan (output diakhiri '/'): frame dirender per potongan CHUNK frame ke <dir>/c0000.mp4 dst.
  // Potongan yang sudah ada dilewati, sehingga render bisa dilanjutkan setelah proses terhenti.
  const chunked = out.endsWith('/');
  const CH = chunked ? Number(process.env.CHUNK || 150) : frames;
  if (chunked) fs.mkdirSync(out, { recursive: true });
  for (let c0 = 0; c0 < frames; c0 += CH) {
    const c1 = Math.min(frames, c0 + CH);
    const dst = chunked ? path.join(out, `c${String(c0 / CH).padStart(4, '0')}.mp4`) : out;
    if (chunked && fs.existsSync(dst) && fs.statSync(dst).size > 0) continue;
    const tmp = chunked ? dst.replace(/\.mp4$/, '.part.mp4') : dst;
    const tc = Date.now();
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', tmp], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let i = c0; i < c1; i++) {
      await page.evaluate((t) => window.renderFrame(t), (f0 + i) / fps);
      const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
      if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
      if (i % 10 === 0) process.stdout.write(`\r${path.basename(html)} ${i}/${frames}`);
    }
    ff.stdin.end();
    await new Promise((r) => ff.on('close', r));
    if (chunked) fs.renameSync(tmp, dst);
    console.log(`\n[potongan] ${path.basename(dst)} ${((Date.now() - tc) / 1000 / (c1 - c0)).toFixed(2)} dtk/frame`);
  }
  await browser.close();
  srv.close();
  console.log(`\rselesai: ${out}`);
})();
