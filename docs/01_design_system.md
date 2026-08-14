# 01 — Design System

Dokumen ini adalah sumber kebenaran (source of truth) untuk semua token visual yang dipakai template undangan. Tujuannya: setiap tema (`t1`, `t2`, `t3`, ...) hanya berbeda di **nilai token**, bukan di struktur/markup. Kalau ini konsisten, preview mobile di `/preview?theme=t1` akan terasa "beda tema", bukan "beda template acak".

## 1. Kenapa preview terasa "aneh" & mirip-mirip

Gejala umum yang biasanya bikin preview kelihatan janggal:
- Warna, font, dan spacing di-hardcode langsung di tiap komponen section → ganti tema jadi harus edit banyak file.
- Tidak ada skala tipografi/spacing yang konsisten → elemen terlihat "ngambang" atau padding tidak proporsional di layar HP.
- Tema hanya ganti warna aksen, tapi layout section-nya sama persis → user merasa "template itu-itu saja".
- Tidak ada mode preview khusus mobile (viewport, safe-area, font-size dasar) sehingga preview di browser desktop terlihat beda jauh dari HP asli tamu undangan.

Solusi: pisahkan **Design Tokens** (bagian ini), **Arsitektur Template** (file 02), dan **Data Dinamis** (file 03) secara tegas.

## 2. Struktur Token

Semua token disimpan sebagai CSS Custom Properties per-tema, di-inject ke `<html data-theme="t1">` atau container `[data-theme="t1"]`.

```css
:root[data-theme="t1"], [data-theme="t1"] {
  /* ===== COLOR ===== */
  --color-bg: #FDFBF7;
  --color-bg-alt: #F5F0E6;
  --color-surface: #FFFFFF;
  --color-primary: #7A5C3E;      /* warna utama/aksen — nama, judul besar */
  --color-secondary: #C9A876;    /* garis, ornamen, border */
  --color-text: #2E2A24;
  --color-text-muted: #7A756C;
  --color-overlay: rgba(20,16,10,0.45); /* overlay di atas cover image */

  /* ===== TYPOGRAPHY ===== */
  --font-display: "Playfair Display", serif;   /* nama mempelai, judul */
  --font-script: "Great Vibes", cursive;        /* elemen dekoratif opsional */
  --font-body: "Inter", sans-serif;             /* isi teks, tanggal, alamat */

  --fs-display-xl: clamp(2.25rem, 8vw, 3rem);   /* nama mempelai di hero */
  --fs-display-lg: clamp(1.75rem, 6vw, 2.25rem);
  --fs-heading: 1.25rem;
  --fs-body: 0.9375rem;   /* 15px */
  --fs-caption: 0.75rem;

  --lh-tight: 1.2;
  --lh-body: 1.6;

  /* ===== SPACING (skala 4px) ===== */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;

  --section-padding-y: var(--space-8);
  --section-padding-x: var(--space-5);

  /* ===== RADIUS & BORDER ===== */
  --radius-sm: 4px;
  --radius-md: 12px;
  --radius-lg: 24px;
  --radius-pill: 999px;
  --border-hairline: 1px solid var(--color-secondary);

  /* ===== SHADOW ===== */
  --shadow-card: 0 8px 24px rgba(0,0,0,0.08);
  --shadow-float: 0 4px 12px rgba(0,0,0,0.12);

  /* ===== MOTION ===== */
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 200ms;
  --duration-base: 400ms;
  --duration-slow: 800ms;

  /* ===== Z-INDEX ===== */
  --z-cover: 10;
  --z-nav: 20;
  --z-modal: 30;
  --z-toast: 40;
}
```

Setiap tema baru (`t2`, `t3`, dst) hanya membuat blok `[data-theme="t2"] { ... }` dengan nilai berbeda. **Nama variabel tidak boleh berubah** — ini kontrak antara design system dan komponen.

## 3. Kategori Tema

| Kategori | Contoh nama | Ciri token |
|---|---|---|
| Klasik/Elegan | `t1-ivory-gold` / `t13` | Serif tebal, warna earth-tone, ornamen garis tipis, radius kecil |
| Minimalis Modern | `t2-mono-sage` / `t6` / `t9` / `t12` | Sans-serif, whitespace besar (`--space-7/8`), radius besar, tanpa ornamen |
| Islami/Kalem | `t3-nude-arabesque` / `t10` | Aksen motif geometris SVG di background, palet pastel, font display kaligrafis ringan |
| Playful/Pastel | `t4-blush-botanical` / `t8` | Ilustrasi bunga garis (line-art), radius pill, warna cerah lembut |

## 4. Aturan Kontras & Aksesibilitas Mobile

- Rasio kontras teks-di-atas-cover-image minimal 4.5:1 → gunakan `--color-overlay`.
- Ukuran font body minimum di mobile: `16px` efektif (hindari <14px untuk isi acara).
- Target tap area tombol (RSVP, buka amplop, share) minimal 44×44px.
- Semua warna WAJIB didefinisikan lewat token, dilarang hex hardcode di komponen section.

## 5. Ikon & Ornamen

- Ikon: satu set konsisten (mis. Lucide/Phosphor), stroke width seragam per tema.
- Ornamen dekoratif (bunga, garis, motif) disimpan sebagai SVG terpisah per tema, direferensikan lewat komponen `<Ornament name="corner-flourish" />`, bukan ditempel manual di tiap section.
