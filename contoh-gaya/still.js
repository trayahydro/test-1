// Ambil frame diam untuk pratinjau: node still.js <file.html> <out_prefix> t1 t2 ...
const { chromium } = require('playwright');
const path = require('path');
const http = require('http');
const fs = require('fs');
(async () => {
  const [html, prefix, ...ts] = process.argv.slice(2);
  const root = path.resolve(__dirname, '..');
  const srv = http.createServer((req, res) => {
    const f = path.join(root, decodeURIComponent(req.url.split('?')[0]));
    if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2' }[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', (m) => console.log('[page]', m.text()));
  page.on('pageerror', (e) => console.error('[pageerror]', e));
  await page.goto(`http://127.0.0.1:${srv.address().port}/${path.relative(root, path.resolve(html))}`);
  await page.evaluate(() => window.ready);
  await page.evaluate(() => document.fonts.ready);
  for (const t of ts) {
    const s = Date.now();
    await page.evaluate((t) => window.renderFrame(t), Number(t));
    await page.screenshot({ path: `${prefix}-${t}.png` });
    console.log(`t=${t} ${Date.now() - s}ms`);
  }
  await browser.close(); srv.close();
})();
