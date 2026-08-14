export interface CatalogThemeItem {
  id: string;
  name: string;
  category: "Klasik / Elegan" | "Minimalis Modern" | "Islami / Kalem" | "Playful / Pastel";
  packageLevel: "Sakinah" | "Mawaddah" | "Warahmah";
  thumbnail: string;
  tag?: "Populer" | "Baru" | "Rekomendasi";
  status: "Aktif" | "Draft";
}

export const THEME_CATALOG: CatalogThemeItem[] = [
  {
    id: "t13",
    name: "Salma & Rizal Elegant",
    category: "Klasik / Elegan",
    packageLevel: "Warahmah",
    thumbnail: "https://the.invisimple.id/wp-content/uploads/jet-form-builder/d0a24f3e4478f0f3c7a3982a784bcc25/2026/04/1000507989.jpg",
    tag: "Rekomendasi",
    status: "Aktif",
  },
  {
    id: "t10",
    name: "Nikah Sakinah",
    category: "Islami / Kalem",
    packageLevel: "Sakinah",
    thumbnail: "https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/slide-1-2372-l-202102060607.jpg",
    tag: "Populer",
    status: "Aktif",
  },
  {
    id: "t1",
    name: "Ivory Gold",
    category: "Klasik / Elegan",
    packageLevel: "Sakinah",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500",
    status: "Aktif",
  },
  {
    id: "t2",
    name: "Rose Gold",
    category: "Playful / Pastel",
    packageLevel: "Warahmah",
    thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500",
    tag: "Populer",
    status: "Aktif",
  },
  {
    id: "t3",
    name: "Mawaddah Chic",
    category: "Minimalis Modern",
    packageLevel: "Sakinah",
    thumbnail: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500",
    status: "Aktif",
  },
  {
    id: "t4",
    name: "Luxury Velvet",
    category: "Klasik / Elegan",
    packageLevel: "Warahmah",
    thumbnail: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500",
    status: "Aktif",
  },
  {
    id: "t6",
    name: "Minimal Elegance",
    category: "Minimalis Modern",
    packageLevel: "Sakinah",
    thumbnail: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=500",
    tag: "Baru",
    status: "Aktif",
  },
  {
    id: "t12",
    name: "Monochrome Theme",
    category: "Minimalis Modern",
    packageLevel: "Mawaddah",
    thumbnail: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=500",
    status: "Aktif",
  },
];
