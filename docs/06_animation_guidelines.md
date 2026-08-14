# 06 — Animation Guidelines

Animasi yang tidak konsisten/berlebihan sering jadi penyebab preview "terasa aneh" (elemen muncul mendadak, transisi patah-patah, timing beda tiap section). Dokumen ini menstandarkan motion di semua tema, memakai token dari 01.

## 1. Prinsip

1. **Fungsional, bukan pamer** — animasi menuntun perhatian & menandai transisi.
2. **Konsisten lintas tema** — timing & easing sama (`--duration-base: 400ms`, `--ease-standard`).
3. **Hormati preferensi user**: hormati `prefers-reduced-motion` — jika aktif, semua animasi masuk diganti instant/fade sangat singkat (150ms).
4. **Murah secara performa**: hanya animasikan `transform` dan `opacity` (GPU-accelerated).

## 2. Token Motion

```css
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
--duration-fast: 200ms;   /* micro-interaction: tap, toggle */
--duration-base: 400ms;   /* transisi antar state kecil */
--duration-slow: 800ms;   /* reveal section saat scroll, buka cover */
```

## 3. Pola Animasi per Konteks

### 3.1 Cover Gate → Terbuka
- Tap "Buka Undangan" → cover fade-out + scale 1 → 1.05 (`--duration-slow`), main content fade-in + slide-up 24px.
- Total animasi gate ≤ 1 detik.

### 3.2 Scroll Reveal (Section Masuk Viewport)
`IntersectionObserver` (threshold ~0.2), sekali trigger per elemen.

```css
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity var(--duration-base) var(--ease-standard),
              transform var(--duration-base) var(--ease-standard);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 3.3 Micro-interaction
- Tombol tap: `scale(0.97)` / `scale-95` on `:active`, durasi `--duration-fast`.
- Toast: slide-up dari bawah + fade, auto-dismiss 2.5 detik.

## 4. Variasi Motion per Kategori Tema

| Kategori tema | Gaya reveal |
|---|---|
| Klasik/Elegan | fade + slide-up halus |
| Minimalis Modern | fade murni, tanpa slide |
| Islami/Kalem | fade + slide-up lambat (`--duration-slow`) |
| Playful/Pastel | fade + slide-up + sedikit scale (1.02→1) |

## 5. Larangan

- Dilarang auto-playing carousel tanpa kontrol user.
- Dilarang typewriter animation per-kata/huruf untuk paragraf panjang.
- Dilarang parallax berat (scroll-linked transform besar) di background.
