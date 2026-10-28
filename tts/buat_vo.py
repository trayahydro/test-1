"""Buat voice-over dari naskah dengan Piper TTS (id_ID-news_tts-medium).

- Narasi diambil dari baris berawalan "> " di tiap "## Adegan N" pada naskah.
- Teks tampilan (subtitle) dikonversi ke teks ucapan memakai KAMUS + konversi angka ke kata.
- Disintesis per kalimat agar timing subtitle diketahui persis.

Pemakaian:
  python buat_vo.py <naskah.md> <folder_output> --mesin piper --model <model.onnx> [--ls 1.0]
  python buat_vo.py <naskah.md> <folder_output> --mesin google [--suara id-ID-Chirp3-HD-Charon]
    (Google Cloud Text-to-Speech; API key dibaca dari variabel lingkungan GOOGLE_TTS_API_KEY)
Hasil: adegan_XX.wav, timing.json (durasi & cue subtitle per adegan), vo_draf.mp3 (semua adegan).
"""
import argparse
import base64
import io
import json
import os
import urllib.request
import re
import subprocess
import sys
import wave
from pathlib import Path


JEDA_KALIMAT = 0.28   # detik antar kalimat
JEDA_PARAGRAF = 0.70  # detik antar paragraf
JEDA_ADEGAN = 1.2     # hanya untuk berkas pratinjau gabungan

# Teks tampilan → ucapan. Urutan penting: frasa panjang lebih dulu.
KAMUS = [
    ("PT Traya Hydro Indonesia", "pe-te traya haidro indonesia"),
    ("+62 823 110 110 29", "plus enam dua, delapan dua tiga, satu satu nol, satu satu nol, dua sembilan"),
    ("www.trayahydro.com", "we we we titik traya haidro titik kom"),
    ("The Smith Alam Sutera", "de smit alam sutera"),
    ("SOHO-D/10/1009", "soho de, sepuluh, seribu sembilan"),
    ("Sea Water Reverse Osmosis", "si woter rivers osmosis"),
    ("reverse osmosis", "rivers osmosis"),
    ("isobaric pressure exchanger", "aisobarik presyur ekscenjer"),
    ("energy recovery device", "enerji rikaferi difais"),
    ("polypropylene melt-blown", "polipropilen melt-blon"),
    ("clean-in-place", "klin in ples"),
    ("pressure vessel", "presyur vesel"),
    ("stainless steel", "stenles stil"),
    ("cartridge filter", "kartrij filter"),
    ("Booster pump", "Buster pam"),
    ("booster pump", "buster pam"),
    ("spiral-wound", "spiral waund"),
    ("post-treatment", "pos-tritmen"),
    ("pretreatment", "pri-tritmen"),
    ("real-time", "riltaim"),
    ("Antiscalant", "Antiskelan"),
    ("antiscalant", "antiskelan"),
    ("backwash", "bekwos"),
    ("strainer", "streiner"),
    ("Strainer", "Streiner"),
    ("cartridge", "kartrij"),
    ("housing", "hausing"),
    ("outfall", "autfol"),
    ("duplex", "dupleks"),
    ("spacer", "speiser"),
    ("rating", "reting"),
    ("custom", "kastem"),
    ("intake", "intek"),
    ("brine", "brain"),
    ("Brine", "Brain"),
    ("mg/L", "miligram per liter"),
]
# Singkatan: hanya dicocokkan sebagai kata utuh (huruf besar/kecil persis)
SINGKATAN = {
    "SWRO": "es-we-er-o", "RO": "er-o", "UF": "u-ef", "TDS": "te-de-es", "SDI": "es-de-i",
    "CIP": "ce-i-pe", "PLC": "pe-el-ce", "HMI": "ha-em-i", "SMBS": "es-em-be-es", "FRP": "ef-er-pe",
    "pH": "pe-ha", "psi": "pe-es-i", "MMF": "em-em-ef",
}

SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"]


def terbilang(n: int) -> str:
    if n < 12:
        return SATUAN[n] if n else "nol"
    if n < 20:
        return SATUAN[n - 10] + " belas"
    if n < 100:
        return (SATUAN[n // 10] + " puluh " + (SATUAN[n % 10] if n % 10 else "")).strip()
    if n < 200:
        return ("seratus " + (terbilang(n - 100) if n > 100 else "")).strip()
    if n < 1000:
        return (SATUAN[n // 100] + " ratus " + (terbilang(n % 100) if n % 100 else "")).strip()
    if n < 2000:
        return ("seribu " + (terbilang(n - 1000) if n > 1000 else "")).strip()
    if n < 1_000_000:
        return (terbilang(n // 1000) + " ribu " + (terbilang(n % 1000) if n % 1000 else "")).strip()
    return (terbilang(n // 1_000_000) + " juta " + (terbilang(n % 1_000_000) if n % 1_000_000 else "")).strip()


def angka_ke_kata(m: re.Match) -> str:
    s = m.group(0)
    if "," in s:  # desimal Indonesia: angka di belakang koma dibaca per digit
        bulat, pecahan = s.split(",")
        return terbilang(int(bulat.replace(".", ""))) + " koma " + " ".join(terbilang(int(d)) for d in pecahan)
    return terbilang(int(s.replace(".", "")))


def ke_ucapan(teks: str) -> str:
    for a, b in SINGKATAN.items():
        teks = re.sub(rf"(?<![\w-]){re.escape(a)}(?![\w-])", b, teks)
    for a, b in KAMUS:
        teks = re.sub(re.escape(a), b, teks, flags=re.IGNORECASE)
    teks = re.sub(r"(\d)\s*[–-]\s*(\d)", r"\1 sampai \2", teks)
    teks = teks.replace("%", " persen").replace("µm", "mikron")
    teks = re.sub(r"\d{1,3}(?:\.\d{3})+(?:,\d+)?|\d+(?:,\d+)?", angka_ke_kata, teks)
    return re.sub(r"\s+", " ", teks).strip()


def baca_naskah(path: Path):
    adegan, cur = [], None
    for line in path.read_text(encoding="utf-8").splitlines():
        h = re.match(r"^## Adegan (\d+):\s*(.+?)\s*\(", line)
        if h:
            cur = {"no": int(h.group(1)), "judul": h.group(2), "paragraf": [[]]}
            adegan.append(cur)
            continue
        if cur is None or not line.startswith(">"):
            continue
        isi = line[1:].strip()
        if isi:
            cur["paragraf"][-1].append(isi)
        elif cur["paragraf"][-1]:
            cur["paragraf"].append([])
    for a in adegan:
        a["paragraf"] = [" ".join(p) for p in a["paragraf"] if p]
    return adegan


def pecah_kalimat(p: str):
    # pisah setelah . ? ! yang diikuti spasi + huruf besar (abaikan "www.", angka desimal, dsb.)
    return [k.strip() for k in re.split(r"(?<=[.?!])\s+(?=[A-Z])", p) if k.strip()]


def pecah_cue(kalimat: str, a: float, b: float, maks=84):
    """Kalimat panjang dipecah di koma menjadi beberapa cue; waktu dibagi proporsional jumlah huruf."""
    if len(kalimat) <= maks:
        return [{"a": round(a, 3), "b": round(b, 3), "text": kalimat}]
    bagian, buf = [], ""
    for frag in re.split(r"(?<=,|:)\s+", kalimat):
        if buf and len(buf) + len(frag) + 1 > maks:
            bagian.append(buf)
            buf = frag
        else:
            buf = (buf + " " + frag).strip()
    if buf:
        bagian.append(buf)
    hasil = []
    for x in bagian:
        while len(x) > maks:
            tengah = len(x) // 2
            kiri, kanan = x.rfind(" ", 0, tengah + 8), x.find(" ", tengah - 8)
            pos = kiri if kiri > 0 and (kanan < 0 or tengah - kiri <= kanan - tengah) else kanan
            if pos <= 0:
                break
            hasil.append(x[:pos])
            x = x[pos + 1:]
        hasil.append(x)
    bagian = hasil
    total = sum(len(x) for x in bagian)
    cues, t = [], a
    for x in bagian:
        d = (b - a) * len(x) / total
        cues.append({"a": round(t, 3), "b": round(t + d, 3), "text": x})
        t += d
    return cues


class MesinPiper:
    def __init__(self, model, ls):
        from piper import PiperVoice, SynthesisConfig
        self.voice = PiperVoice.load(model)
        self.cfg = SynthesisConfig(length_scale=ls)
        self.sr = self.voice.config.sample_rate

    def pcm(self, teks):
        buf = io.BytesIO()
        with wave.open(buf, "wb") as wf:
            self.voice.synthesize_wav(teks, wf, syn_config=self.cfg)
        with wave.open(io.BytesIO(buf.getvalue()), "rb") as rf:
            return rf.readframes(rf.getnframes())


class MesinGoogle:
    """Google Cloud Text-to-Speech (REST). Suara neural Chirp 3 HD terdengar paling natural."""
    sr = 24000

    def __init__(self, suara, rate=1.0):
        self.key = os.environ.get("GOOGLE_TTS_API_KEY")
        if not self.key:
            sys.exit("GOOGLE_TTS_API_KEY belum diatur di environment.")
        self.suara, self.rate = suara, rate

    def pcm(self, teks):
        # akronim berejaan "es-we-er-o" dibaca lebih luwes tanpa tanda hubung
        teks = re.sub(r"(?<=\w)-(?=\w)", " ", teks)
        body = {"input": {"text": teks}, "voice": {"languageCode": "id-ID", "name": self.suara},
                "audioConfig": {"audioEncoding": "LINEAR16", "sampleRateHertz": self.sr, "speakingRate": self.rate}}
        req = urllib.request.Request("https://texttospeech.googleapis.com/v1/text:synthesize",
                                     data=json.dumps(body).encode(), headers={"Content-Type": "application/json", "X-Goog-Api-Key": self.key})
        with urllib.request.urlopen(req, timeout=60) as r:
            wavb = base64.b64decode(json.load(r)["audioContent"])
        with wave.open(io.BytesIO(wavb), "rb") as rf:
            return rf.readframes(rf.getnframes())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("naskah"); ap.add_argument("out")
    ap.add_argument("--mesin", default="piper", choices=["piper", "google"])
    ap.add_argument("--model"); ap.add_argument("--ls", type=float, default=1.0)
    ap.add_argument("--suara", default="id-ID-Chirp3-HD-Charon"); ap.add_argument("--rate", type=float, default=1.0)
    args = ap.parse_args()
    naskah, out = Path(args.naskah), Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    mesin = MesinPiper(args.model, args.ls) if args.mesin == "piper" else MesinGoogle(args.suara, args.rate)
    sr = mesin.sr
    hasil = []
    for a in baca_naskah(naskah):
        pcm, t, cues = bytearray(), 0.0, []
        for pi, par in enumerate(a["paragraf"]):
            for kal in pecah_kalimat(par):
                frames = mesin.pcm(ke_ucapan(kal))
                d = len(frames) / 2 / sr
                cues += pecah_cue(kal, t, t + d)
                pcm += frames
                t += d
                pcm += b"\x00\x00" * int(JEDA_KALIMAT * sr)
                t += JEDA_KALIMAT
            if pi < len(a["paragraf"]) - 1:
                extra = JEDA_PARAGRAF - JEDA_KALIMAT
                pcm += b"\x00\x00" * int(extra * sr)
                t += extra
        f = out / f"adegan_{a['no']:02d}.wav"
        with wave.open(str(f), "wb") as wf:
            wf.setnchannels(1); wf.setsampwidth(2); wf.setframerate(sr); wf.writeframes(bytes(pcm))
        hasil.append({"no": a["no"], "judul": a["judul"], "durasi": round(t, 3), "cues": cues, "wav": f.name})
        print(f"Adegan {a['no']:2d}  {t:6.1f} dtk  {a['judul']}")
    (out / "timing.json").write_text(json.dumps(hasil, ensure_ascii=False, indent=1), encoding="utf-8")
    total = sum(h["durasi"] for h in hasil)
    print(f"Total narasi: {total:.1f} dtk ({total / 60:.2f} menit)")
    lst, sil = out / "daftar.txt", out / "jeda.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", f"anullsrc=r={sr}:cl=mono", "-t", str(JEDA_ADEGAN), sil], check=True)
    lst.write_text("".join(f"file '{h['wav']}'\nfile 'jeda.wav'\n" for h in hasil))
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-c:a", "libmp3lame", "-b:a", "128k", out / "vo_draf.mp3"], check=True)


if __name__ == "__main__":
    main()
