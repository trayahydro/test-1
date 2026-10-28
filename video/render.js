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

  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('console', (m) => console.log('[page]', m.text()));
  page.on('pageerror', (e) => console.error('[pageerror]', e));
  const root = path.resolve(__dirname, '..');
  const srv = await serve(root);
  await page.goto(`http://127.0.0.1:${srv.address().port}/${path.relative(root, path.resolve(html))}`);
  await page.evaluate(() => window.ready);
  await page.evaluate(() => document.fonts.ready);
  const durasi = dur === 'auto' ? await page.evaluate(() => window.DURASI) : Number(dur);
  const frames = Math.round(durasi * fps);

  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });

  for (let i = 0; i < frames; i++) {
    await page.evaluate((t) => window.renderFrame(t), (f0 + i) / fps);
    const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (i % 30 === 0) process.stdout.write(`\r${path.basename(html)} ${i}/${frames}`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  await browser.close();
  srv.close();
  console.log(`\rselesai: ${out}`);
})();
