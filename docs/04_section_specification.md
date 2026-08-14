# 04 — Section Specification

Spesifikasi tiap section: tujuan, data yang dipakai, varian layout yang wajib disediakan, dan aturan mobile-nya. Semua section merujuk token di 01, dirakit lewat 02, diberi makan data dari 03.

---

## 4.1 Cover / CoverGate
**Tujuan**: kesan pertama; nama pengantin, tanggal, tombol "Buka Undangan".
- Data: `cover.coverImageUrl`, `couple`, `events[0].date`, `guest.name`
- Wajib full-viewport-height (`100dvh`, foto cover `object-fit: cover`).
- State: **tertutup** (gate, minta tap "Buka Undangan", trigger autoplay musik) → **terbuka** (scroll ke section berikutnya).
- Varian: `fullbleed-photo`, `split-frame`, `minimal-typographic`.

## 4.2 Opening Quote
**Tujuan**: kutipan ayat/quote sebelum masuk ke profil mempelai.
- Data: `openingQuote.text`, `openingQuote.source`
- Varian: `arabic-calligraphy`, `plain-serif`, `handwritten-script`.
- Section ini **dilewati** jika `openingQuote` tidak diisi.

## 4.3 Couple Profile
**Tujuan**: identitas kedua mempelai.
- Data: `couple.groom`, `couple.bride`
- Varian: `portrait-circle`, `side-by-side-card`, `single-couple-photo`.
- Mobile: di layar sempit (<360px) otomatis stack vertikal.

## 4.4 Event Detail
**Tujuan**: info akad/resepsi — bagian paling fungsional.
- Data: `events[]`
- Wajib menampilkan: label acara, tanggal (format lokal "Sabtu, 19 Juli 2026"), jam, nama venue, alamat, tombol buka maps.
- Varian: `card-stacked`, `tab-switch`.
- Tombol maps: wajib deep-link (`https://maps.google.com/?q=`).

## 4.5 Countdown Timer
**Tujuan**: hitung mundur ke tanggal acara utama (`events[0].date`).
- Update tiap detik, format: Hari / Jam / Menit / Detik.
- Varian: `flip-clock`, `simple-digits`, `circular-progress`.
- Jika tanggal event sudah lewat: tampilkan pesan alternatif ("Terima kasih telah menjadi bagian dari hari bahagia kami").

## 4.6 Love Story
**Tujuan**: cerita perjalanan hubungan.
- Data: `loveStory[]`
- Varian: `timeline-vertical`, `carousel-swipe`.
- Dilewati jika data kosong.

## 4.7 Gallery
**Tujuan**: foto-foto pasangan.
- Data: `gallery.images[]`
- Varian: `grid-3col`, `masonry`, `swipe-fullscreen`.
- Wajib lazy-load gambar & buka lightbox saat foto di-tap.

## 4.8 RSVP / Konfirmasi Kehadiran
**Tujuan**: tamu konfirmasi hadir + isi ucapan.
- Data: `rsvp.enabled`, `rsvp.deadline`, `guest.name` (prefill)
- Field minimal: Nama, Status kehadiran (Hadir/Tidak/Ragu), Jumlah tamu, Ucapan/doa.
- Varian: `inline-form`, `modal-trigger`.

## 4.9 Gift / Amplop Digital
**Tujuan**: info rekening/hadiah.
- Data: `gift.enabled`, `gift.banks[]`, `gift.addresses[]`
- Wajib ada tombol "Salin Nomor Rekening" (copy-to-clipboard) dengan feedback toast.
- Varian: `accordion-bank-list`, `card-list`.
- Section disembunyikan total jika `gift.enabled = false`.

## 4.10 Footer
**Tujuan**: penutup, ucapan terima kasih, kredit pembuat undangan.
- Varian: `thank-you-signature`, `minimal-credit`.

---

## Aturan Lintas-Section

1. **Konsistensi spacing**: tiap section pakai `SectionWrapper` yang otomatis menerapkan `--section-padding-y/x` dari 01.
2. **Heading pattern seragam**: tiap section punya heading kecil beraksen dengan style yang sama secara struktural di semua tema.
3. **Empty-state governance**: keputusan render/tidak render section diatur bersih di level Section Registry / Wrapper.
