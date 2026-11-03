# Setup proyek Traya di Windows. Jalankan dari folder root proyek:
#   powershell -ExecutionPolicy Bypass -File pindahan-claude-pribadi\setup\setup-windows.ps1
# Prasyarat (install sekali): Python 3.11+, Node.js 18+, Git, FFmpeg  (lihat MULAI-DI-SINI.md)
$ErrorActionPreference = "Stop"
$root = (Resolve-Path "$PSScriptRoot\..\..").Path
Set-Location $root
Write-Host "== Cek program =="
foreach ($c in @("python","node","npm","git","ffmpeg")) {
  if (Get-Command $c -ErrorAction SilentlyContinue) { Write-Host "  OK  $c" } else { Write-Host "  BELUM ADA: $c  (install dulu, lihat MULAI-DI-SINI.md)" -ForegroundColor Yellow }
}
Write-Host "== Python venv + paket =="
python -m venv .venv
& .\.venv\Scripts\python.exe -m pip install --upgrade pip
& .\.venv\Scripts\python.exe -m pip install -r pindahan-claude-pribadi\setup\requirements.txt
Write-Host "== Node: three.js, font, playwright =="
foreach ($d in @("video","contoh-gaya")) { Push-Location $d; npm install; npm install playwright; Pop-Location }
Push-Location video; npx playwright install chromium; Pop-Location
Write-Host "== Tes cepat: pratinjau 1 frame =="
New-Item -ItemType Directory -Force -Path "uji" | Out-Null
node video\still.js video-3m3\adegan-02b.html uji\tes 3
Write-Host "Selesai. Lihat gambar di folder uji\. Aktifkan Python: .\.venv\Scripts\Activate.ps1"
