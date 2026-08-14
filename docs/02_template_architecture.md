# 02 — Template Architecture

Dokumen ini menjelaskan bagaimana halaman preview `/preview?theme=t1` dirakit: pemisahan **Layout**, **Section Registry**, **Theme Resolver**, dan **Renderer**, supaya nambah tema baru tidak perlu nulis ulang halaman.

## 1. Alur Render Preview

```
URL: /preview?theme=t1&invitationId=xxxx (opsional, default pakai data dummy)
        │
        ▼
1. Theme Resolver  → baca query "theme", load configuration (01-DESIGN-SYSTEM)
        │
        ▼
2. Data Loader     → ambil data undangan (03-DYNAMIC-DATA): dummy atau dari DB
        │
        ▼
3. Section Registry → baca urutan & konfigurasi section dari configuration
        │
        ▼
4. Renderer (Mobile Frame) → bungkus dalam device-frame mobile, apply CSS vars tema
        │
        ▼
5. Output: halaman preview scrollable, 1 kolom, lebar viewport mobile
```

## 2. Struktur Folder yang Disarankan

```
/src/themes
  /configs
    t1-ivory-gold.json
    t2-mono-sage.json
    ...
/src/components
  /sections
    Cover.tsx
    OpeningQuote.tsx
    CoupleProfile.tsx
    EventDetail.tsx
    CountdownTimer.tsx
    GallerySection.tsx
    LoveStory.tsx
    RSVPForm.tsx
    GiftSection.tsx
    Footer.tsx
    SectionRegistry.ts
  /primitives
    Button.tsx
    Card.tsx
    Ornament.tsx
    SectionWrapper.tsx
  /preview
    MobileFrame.tsx
    ThemeResolver.ts
```

## 3. Prinsip Utama

### 3.1 Section = komponen "bodoh" (dumb component)
Setiap section (Cover, CoupleProfile, dst.) **tidak tahu** tema apa yang aktif. Ia hanya menerima:
1. `data`
2. `variant` (string, misal `"variant-a"` / `"variant-b"` — layout alternatif dalam section yang sama)
3. Styling murni dari CSS variables global tema (`var(--color-primary)`, dst.)

Ini yang membuat 1 section bisa dipakai lintas tema tanpa modifikasi, tapi tetap tampil beda karena token beda.

### 3.2 theme configuration mengatur komposisi
```json
{
  "id": "t1-ivory-gold",
  "category": "klasik-elegan",
  "sections": [
    { "type": "cover", "variant": "fullbleed-photo" },
    { "type": "opening-quote", "variant": "arabic-calligraphy" },
    { "type": "couple-profile", "variant": "portrait-circle" },
    { "type": "event-detail", "variant": "card-stacked" },
    { "type": "countdown", "variant": "flip-clock" },
    { "type": "love-story", "variant": "timeline-vertical" },
    { "type": "gallery", "variant": "grid-3col" },
    { "type": "rsvp", "variant": "inline-form" },
    { "type": "gift", "variant": "accordion-bank-list" },
    { "type": "footer", "variant": "thank-you-signature" }
  ],
  "musicDefault": "/assets/audio/t1-default.mp3"
}
```

### 3.3 Section Registry (mapping type → component)
```ts
export const SECTION_REGISTRY: Record<string, React.ComponentType<SectionProps>> = {
  "cover": Cover,
  "opening-quote": OpeningQuote,
  "couple-profile": CoupleProfile,
  "event-detail": EventDetail,
  "countdown": CountdownTimer,
  "love-story": LoveStory,
  "gallery": GallerySection,
  "rsvp": RSVPForm,
  "gift": GiftSection,
  "footer": Footer,
};
```

## 4. MobileFrame (wadah preview)

`MobileFrame.tsx` bertanggung jawab atas:
- Membatasi lebar konten ke `max-width: 430px` (setara device lebar terbesar umum) dan center di layar desktop saat preview dibuka dari dashboard admin (bukan dari HP).
- Simulasi safe-area (`env(safe-area-inset-*)`) untuk notch.
- Floating music toggle & tombol "buka undangan" (cover gate).
