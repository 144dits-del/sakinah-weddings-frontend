import { InvitationData } from "./types/invitation-data";

export const defaultDummyInvitation: InvitationData = {
  meta: {
    slug: "salma-rizal",
    theme: "t13",
    language: "id",
  },
  couple: {
    groom: {
      fullName: "Rizal Syahputra, S.T.",
      nickname: "Rizal",
      photoUrl: "https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/pria-1-240421071848-l.jpg",
      parentInfo: "Putra pertama dari Bpk. Ir. H. Syahputra & Ibu Hj. Ratna Kurnia",
      instagram: "@rizal.syahputra",
    },
    bride: {
      fullName: "Salsabila Amelia Usman, S.Ked.",
      nickname: "Salma",
      photoUrl: "https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/wanita-1-210627044705-l.jpg",
      parentInfo: "Putri kedua dari Bpk. Dr. H. Usman Ahmad & Ibu Hj. Nurhayati",
      instagram: "@salma.usman",
    },
    hashtag: "#SalmaDanRizal2026",
  },
  cover: {
    coverImageUrl: "https://the.invisimple.id/wp-content/uploads/jet-form-builder/d0a24f3e4478f0f3c7a3982a784bcc25/2026/04/1000507989.jpg",
    greetingText: "The Wedding Of",
  },
  openingQuote: {
    text: "Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  },
  events: [
    {
      label: "Akad Nikah",
      date: "2026-07-19T08:00:00.000Z",
      timeStart: "08:00 WIB",
      timeEnd: "10:00 WIB",
      venueName: "Masjid Agung Al-Azhar",
      venueAddress: "Jl. Sisingamangaraja No.1, Kebayoran Baru, Jakarta Selatan",
      mapUrl: "https://maps.google.com/?q=Masjid+Agung+Al-Azhar",
    },
    {
      label: "Resepsi Pernikahan",
      date: "2026-07-19T11:00:00.000Z",
      timeStart: "11:00 WIB",
      timeEnd: "14:00 WIB",
      venueName: "Grand Ballroom Hotel Mulia",
      venueAddress: "Jl. Asia Afrika No.1, Senayan, Jakarta Pusat",
      mapUrl: "https://maps.google.com/?q=Hotel+Mulia+Senayan",
    },
  ],
  loveStory: [
    {
      date: "Januari 2022",
      title: "Awal Pertemuan",
      description: "Perkenalan singkat saat kegiatan sosial kampus yang membawa rasa hangat dan cocok satu sama lain.",
    },
    {
      date: "Agustus 2023",
      title: "Komitmen Bersama",
      description: "Memutuskan untuk saling berkomitmen menjalani hubungan yang lebih serius dengan saling mendukung karir & cita-cita.",
    },
    {
      date: "Desember 2025",
      title: "Lamaran Suci",
      description: "Pertemuan hangat antar kedua keluarga besar dan pengikatan janji suci mengarah ke pernikahan.",
    },
  ],
  gallery: {
    images: [
      { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600", caption: "Moments of Joy" },
      { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600", caption: "Sweet Smile" },
      { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600", caption: "Prewedding Walk" },
      { url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600", caption: "Together Forever" },
    ],
  },
  rsvp: {
    enabled: true,
    deadline: "2026-07-15T23:59:59.000Z",
  },
  gift: {
    enabled: true,
    banks: [
      { bankName: "Bank BCA", accountNumber: "1234 5678 90", accountHolder: "Salma & Rizal" },
      { bankName: "Bank Mandiri", accountNumber: "9876 5432 10", accountHolder: "Salma & Rizal" },
      { bankName: "Bank BSI", accountNumber: "7123 4567 89", accountHolder: "Salma & Rizal" },
    ],
  },
  guest: {
    name: "Bapak/Ibu/Saudara/i",
  },
  music: {
    url: "/assets/audio/wedding-bgm.mp3",
    autoplayOnOpen: true,
  },
};

// Adapter: WeddingData (wizard/dummy) -> InvitationData (section contract)
export const weddingToInvitation = (
  w: import("./dummy-data").WeddingData,
  themeId = "t1",
): InvitationData => ({
  ...defaultDummyInvitation,
  meta: { ...defaultDummyInvitation.meta, slug: w.subdomain, theme: themeId },
  couple: {
    ...defaultDummyInvitation.couple,
    groom: {
      ...defaultDummyInvitation.couple.groom,
      fullName: w.groom.fullName || defaultDummyInvitation.couple.groom.fullName,
      nickname: w.groom.nickname || defaultDummyInvitation.couple.groom.nickname,
      parentInfo: `Putra dari Bpk. ${w.groom.father} & Ibu ${w.groom.mother}`,
    },
    bride: {
      ...defaultDummyInvitation.couple.bride,
      fullName: w.bride.fullName || defaultDummyInvitation.couple.bride.fullName,
      nickname: w.bride.nickname || defaultDummyInvitation.couple.bride.nickname,
      parentInfo: `Putri dari Bpk. ${w.bride.father} & Ibu ${w.bride.mother}`,
    },
  },
  events: [
    {
      label: "Akad Nikah",
      date: w.akad.date,
      timeStart: w.akad.start,
      timeEnd: w.akad.end,
      venueName: w.akad.venue,
      venueAddress: w.akad.venue,
      mapUrl: w.akad.maps,
    },
    {
      label: "Resepsi",
      date: w.resepsi.date,
      timeStart: w.resepsi.start,
      timeEnd: w.resepsi.end,
      venueName: w.resepsi.venue,
      venueAddress: w.resepsi.venue,
      mapUrl: w.resepsi.maps,
    },
  ],
});
