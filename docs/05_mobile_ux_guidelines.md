# 05 — Mobile UX Guidelines

Preview di `/preview?theme=t1` harus merepresentasikan pengalaman **HP tamu undangan asli**, bukan versi ciutan dari desain desktop. Dokumen ini aturan teknis & UX khusus mobile.

## 1. Viewport & Frame

- Base target: lebar 360–430px (Android menengah s/d iPhone Pro Max), tinggi dinamis.
- Gunakan unit `100dvh` (dynamic viewport height) untuk Cover, bukan `100vh`.
- Saat preview dibuka dari **dashboard admin di desktop**: bungkus dalam `MobileFrame` bergaya "device mockup" (lebar tetap ~390-430px, di-center).
- Saat diakses langsung dari HP: tidak perlu frame device, langsung full width natural.

## 2. Tipografi Mobile

- Body text minimum efektif `16px` — hindari zoom otomatis Safari saat fokus ke input form.
- Line-length nyaman: batasi `max-width` teks paragraf ke ~34–42 karakter per baris.

## 3. Layout Responsif per Section

- Single column adalah default mutlak.
- Grid galeri: 2 kolom untuk layar <375px, 3 kolom untuk ≥375px.
- Tombol full-width (`width: 100%`) untuk aksi utama (RSVP submit, buka maps).

## 4. Interaksi Sentuh (Touch)

- Semua elemen tap minimal 44×44px target area.
- Feedback tap instan: gunakan `:active` state (`scale-97` / opacity 0.9).

## 5. Performa di Perangkat Low-End

- Lazy-load gambar di bawah fold (`loading="lazy"`), cover eager load.
- Preload metadata audio saja, play synchronous saat gate dibuka.

## 6. Navigasi & Orientasi

- Floating "scroll to top" muncul setelah scroll > 1 layar.
- Scroll-snap per section (`scroll-snap-type: y proximity`).

## 7. Cover Gate & Autoplay Musik

- Autoplay audio di mobile browser dipicu synchronous saat tap "Buka Undangan".
- Lock scroll saat gate tertutup (`overflow-hidden`).

## 8. Safe Area & Notch

```css
.mobile-frame {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```
