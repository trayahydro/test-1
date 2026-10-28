"""Sintesis musik latar orisinal (bebas royalti) untuk video SWRO Traya.

Gaya: korporat lembut & optimis, 84 BPM, D mayor. Lapisan: pad hangat, arpeggio ala piano,
bass halus, shaker tipis. Dibuat sepenuhnya dengan numpy/scipy (tanpa sampel eksternal).

Pemakaian: python buat_musik.py <durasi_detik> <output.wav>
"""
import sys
import wave

import numpy as np
from scipy.signal import lfilter, oaconvolve

SR = 44100
BPM = 84
BEAT = 60 / BPM
BAR = 4 * BEAT
rng = np.random.default_rng(7)


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


# Progresi: Dmaj9 → Bm7(11) → Gmaj7 → A6/9, masing-masing 2 birama
CHORDS = [
    {"bass": 38, "pad": [54, 57, 61, 64], "arp": [62, 66, 69, 73, 76, 73, 69, 66]},  # Dmaj9
    {"bass": 35, "pad": [54, 57, 62, 64], "arp": [59, 62, 66, 69, 76, 69, 66, 62]},  # Bm7(11)
    {"bass": 43, "pad": [55, 59, 62, 66], "arp": [62, 66, 67, 71, 74, 71, 67, 66]},  # Gmaj7
    {"bass": 45, "pad": [54, 57, 61, 64], "arp": [61, 64, 66, 69, 71, 69, 66, 64]},  # A6/9
]
SEG = 2 * BAR


def env_adsr(n, a, r):
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    if na:
        e[:na] = np.linspace(0, 1, na) ** 1.5
    if nr:
        e[-nr:] *= np.linspace(1, 0, nr) ** 1.5
    return e


def pad_note(f, dur, detune_cents=5):
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.zeros((n, 2))
    for side, cents in ((0, -detune_cents), (1, detune_cents)):
        ff = f * 2 ** (cents / 1200)
        s = np.zeros(n)
        for h in range(1, 11):
            s += np.sin(2 * np.pi * ff * h * t + rng.uniform(0, 6.28)) / h ** 1.7
        out[:, side] = s
    lfo = 1 + 0.08 * np.sin(2 * np.pi * 0.11 * t + rng.uniform(0, 6.28))
    return out * lfo[:, None]


def piano_note(f, dur=1.6, vel=1.0):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = np.zeros(n)
    for h, (amp, dec) in enumerate([(1.0, 2.6), (0.42, 4.0), (0.18, 6.0), (0.08, 8.0), (0.04, 10.0)], start=1):
        inh = 1 + 0.0004 * h * h  # sedikit inharmonis seperti senar piano
        s += amp * np.sin(2 * np.pi * f * h * inh * t) * np.exp(-dec * t)
    att = np.minimum(1, t / 0.006)
    return s * att * vel


def bass_note(f, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * t) + 0.25 * np.sin(4 * np.pi * f * t)
    return s * env_adsr(n, 0.04, 0.5) * np.exp(-0.6 * t)


def shaker(dur=0.09):
    n = int(dur * SR)
    x = rng.standard_normal(n)
    x = np.diff(np.concatenate([[0], x]))  # tapis lolos-tinggi sederhana
    return x * np.exp(-np.arange(n) / SR * 45)


def put(buf, sig, start, gain=1.0, pan=0.0):
    i0 = int(start * SR)
    if i0 < 0:
        sig, i0 = sig[-i0:], 0
    if i0 >= len(buf):
        return
    sig = sig[: len(buf) - i0]
    if sig.ndim == 1:
        l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
        buf[i0:i0 + len(sig), 0] += sig * gain * l
        buf[i0:i0 + len(sig), 1] += sig * gain * r
    else:
        buf[i0:i0 + len(sig)] += sig * gain


def main():
    L = float(sys.argv[1])
    out = sys.argv[2]
    N = int((L + 4) * SR)
    pad = np.zeros((N, 2)); arp = np.zeros((N, 2)); bass = np.zeros((N, 2)); perc = np.zeros((N, 2))
    nseg = int(np.ceil(L / SEG)) + 1
    for k in range(nseg):
        t0 = k * SEG
        if t0 > L:
            break
        c = CHORDS[k % 4]
        # pad dengan tumpang-tindih antar akor
        for m in c["pad"]:
            put(pad, pad_note(hz(m), SEG + 1.6) * env_adsr(int((SEG + 1.6) * SR), 1.4, 1.8)[:, None], t0 - 0.4, 0.05)
        # bagian: arpeggio & bass mulai setelah intro; jeda ringan berkala untuk variasi
        intro = t0 < 18
        outro = t0 > L - 30
        jeda = (k % 24) in (16, 17)
        if not intro:
            for i in range(16):  # not ke-8 sepanjang 2 birama
                m = c["arp"][i % 8] + (12 if (k % 8 >= 4 and i % 4 == 3) else 0)
                vel = (0.9 if i % 4 == 0 else 0.62) * rng.uniform(0.85, 1.0)
                put(arp, piano_note(hz(m), 1.6, vel), t0 + i * BEAT / 2, 0.11, pan=0.35 * np.sin(i * 0.9))
        if not intro and not jeda and not outro:
            for b in (0, 2, 4, 6):
                put(bass, bass_note(hz(c["bass"]), BEAT * 1.9), t0 + b * BEAT, 0.16)
        if t0 > 50 and not jeda and not outro:
            for i in range(16):
                put(perc, shaker(), t0 + i * BEAT / 2 + 0.01, 0.035 if i % 2 else 0.018, pan=0.25)
    mix = pad + arp + bass + perc
    # reverb: impuls derau meluruh 2,6 dtk, stereo
    n_ir = int(2.6 * SR)
    tt = np.arange(n_ir) / SR
    ir = rng.standard_normal((n_ir, 2)) * np.exp(-tt / 0.65)[:, None]
    k = 40; ir = np.apply_along_axis(lambda v: np.convolve(v, np.ones(k) / k, mode="same"), 0, ir)  # gelapkan
    ir /= np.sqrt((ir ** 2).sum(axis=0))
    wet = np.stack([oaconvolve(mix[:, ch], ir[:, ch])[:N] for ch in range(2)], axis=1)
    y = 0.78 * mix + 0.32 * wet
    # tapis lolos-rendah satu kutub untuk kesan hangat
    a = np.exp(-2 * np.pi * 7500 / SR)
    y = lfilter([1 - a], [1, -a], y, axis=0)
    # fade in/out
    fi, fo = int(3 * SR), int(6 * SR)
    y[:fi] *= np.linspace(0, 1, fi)[:, None]
    end = int(L * SR)
    y = y[:end]
    y[-fo:] *= np.linspace(1, 0, fo)[:, None] ** 1.5
    y /= np.max(np.abs(y)) / 0.89
    pcm = (y * 32767).astype(np.int16)
    with wave.open(out, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
    print(f"musik: {out} ({L:.1f} dtk)")


if __name__ == "__main__":
    main()
