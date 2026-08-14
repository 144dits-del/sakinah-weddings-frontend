# 03 — Dynamic Data Contract

Skema data yang mengalir dari dashboard admin (input user) → preview mobile. Tujuan: 1 skema data dipakai semua tema, supaya ganti tema tidak butuh mapping data ulang.

## 1. Prinsip

- Section komponen hanya membaca `data` sesuai bentuk yang didefinisikan di sini (kontrak tetap).
- Field yang tidak diisi user harus punya **fallback dummy** yang tetap enak dilihat di preview (jangan biarkan section kosong/rusak).
- Semua tanggal disimpan ISO 8601, konversi timezone & format tampilan dilakukan di komponen, bukan di data source.

## 2. Skema Utama (`InvitationData`)

```ts
interface InvitationData {
  meta: {
    slug: string;                 // dipakai di URL undangan asli
    theme: string;                // "t1-ivory-gold"
    language: "id" | "en";
  };
  couple: {
    groom: PersonProfile;
    bride: PersonProfile;
    hashtag?: string;             // "#RaraDanFajar2026"
  };
  cover: {
    coverImageUrl: string;
    greetingText?: string;        // "The Wedding Of"
  };
  openingQuote?: {
    text: string;                 // kutipan ayat/quote, ditulis penuh oleh user
    source?: string;              // "QS. Ar-Rum: 21"
  };
  events: EventItem[];            // 1..n → akad, resepsi, dst.
  loveStory?: LoveStoryItem[];
  gallery?: {
    images: { url: string; caption?: string }[];
  };
  rsvp?: {
    enabled: boolean;
    deadline?: string;            // ISO date
  };
  gift?: {
    enabled: boolean;
    banks: { bankName: string; accountNumber: string; accountHolder: string }[];
    addresses?: { label: string; recipient: string; address: string }[];
  };
  guest?: {
    name: string;                 // dari query param ?to=Nama untuk personalisasi
  };
  music?: {
    url: string;
    autoplayOnOpen: boolean;
  };
}

interface PersonProfile {
  fullName: string;
  nickname: string;
  photoUrl?: string;
  parentInfo: string;             // "Putra pertama dari Bpk. X & Ibu Y"
  instagram?: string;
}

interface EventItem {
  label: string;                  // "Akad Nikah" / "Resepsi"
  date: string;                   // ISO 8601
  timeStart: string;              // "08:00"
  timeEnd?: string;
  venueName: string;
  venueAddress: string;
  mapUrl?: string;
}

interface LoveStoryItem {
  date?: string;
  title: string;
  description: string;
  photoUrl?: string;
}
```

## 3. Sumber Data di Mode Preview

`/preview?theme=t1` bisa dipanggil dalam 2 mode:

| Mode | Trigger | Sumber data |
|---|---|---|
| Dummy preview (katalog tema) | `?theme=t1` tanpa `invitationId` | `dummyInvitation.ts` — data contoh yang representatif & lengkap semua field |
| Live preview (user sedang edit) | `?theme=t1&invitationId=abc123` | Fetch dari draft tersimpan di dashboard, real-time saat user mengetik |

## 4. Personalisasi Tamu (`?to=`)

- Parameter `to` diteruskan ke `data.guest.name`, dipakai di Cover & RSVPForm ("Kepada Yth. Budi & Keluarga").
- Di mode preview katalog (`/preview?theme=t1`), field ini default ke `"Bapak/Ibu/Saudara/i"`.

## 5. Validasi & Fallback

| Field | Kalau kosong |
|---|---|
| `coverImageUrl` | pakai foto stok default per kategori tema |
| `events[].mapUrl` | tombol "Lihat Lokasi" disembunyikan, bukan error |
| `gallery.images` | section galeri disembunyikan otomatis dari registry |
| `music.url` | floating music toggle disembunyikan |
| `loveStory` | section dilewati |
