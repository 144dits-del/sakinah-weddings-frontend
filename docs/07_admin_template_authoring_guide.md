# 07 — Admin & Template Authoring Guide

Panduan operasional untuk tim internal: cara menambah tema baru, mengelola katalog tema di dashboard admin, dan menghubungkan editor admin ke preview mobile (`/preview?theme=`).

## 1. Peran Dashboard Admin vs Preview Mobile

| Surface | Fungsi | Lebar tampilan |
|---|---|---|
| **Dashboard admin** | Tempat user login, isi data (nama, tanggal, foto, dst.), pilih tema dari katalog, kelola RSVP masuk | Desktop-first, boleh multi-kolom, tabel, sidebar |
| **Preview mobile** (`/preview?theme=t1`) | Simulasi tampilan akhir undangan di HP tamu | Selalu mobile-first, dibungkus `MobileFrame` saat diakses dari desktop |

## 2. Alur Menambah Tema Baru

1. Tentukan kategori (Klasik/Elegan, Minimalis Modern, Islami/Kalem, Playful/Pastel).
2. Duplikasi folder tema terdekat sebagai starting point: `/themes/{template-baru}/`.
3. Isi `tokens.css` sesuai palet & tipografi baru (01).
4. Susun `theme.config.json`: pilih urutan section & varian per section (02, 04).
5. Siapkan aset: `thumbnail.jpg`, ornamen SVG, musik default.
6. Jalankan checklist QA mobile (05) & animasi (06).
7. Daftarkan tema di katalog admin (`themeCatalog.json` / DB) dengan metadata: nama, kategori, harga, tag.
8. Uji preview: `/preview?theme={id-tema-baru}` harus langsung berfungsi dengan dummy data (03).

## 3. Struktur Katalog Tema di Dashboard

Halaman "Pilih Tema" di dashboard admin:
- Menampilkan grid `thumbnail.jpg` + nama + kategori (filter by kategori).
- Tombol "Preview" per kartu → buka `/preview?theme={id}` di tab/iframe baru dalam `MobileFrame`.
- Tombol "Gunakan Tema Ini" → set `meta.theme` pada data undangan user.
- Badge status: "Aktif dipakai", "Baru", dsb.

## 4. Live Preview saat Mengedit Konten

Split-screen desktop: `[ Form input (kiri) ] | [ MobileFrame preview (kanan) ]`.
Preview memakai komponen persis sama dengan `/preview?theme=`, hanya sumber datanya dari state form aktif.

## 5. Metrik Evaluasi "Template Bagus vs Aneh"

- [ ] Beda dari minimal 2 tema lain di kategori yang sama secara struktural
- [ ] Lolos semua checklist 05 (Mobile UX) & 06 (Animasi)
- [ ] Dummy data preview terasa "nyata"
- [ ] Waktu muat preview pertama < 2 detik pada simulasi 4G
- [ ] Tidak ada elemen terpotong/overflow di 360/390/430px
