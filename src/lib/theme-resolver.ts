export interface SectionConfig {
  type: string;
  variant?: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  category: "klasik-elegan" | "minimalis-modern" | "islami-kalem" | "playful-pastel";
  sections: SectionConfig[];
  musicDefault?: string;
}

export const THEME_CONFIGS: Record<string, ThemeConfig> = {
  "t1": {
    id: "t1",
    name: "Ivory Gold",
    category: "klasik-elegan",
    sections: [
      { type: "cover", variant: "fullbleed-photo" },
      { type: "opening-quote", variant: "arabic-calligraphy" },
      { type: "couple-profile", variant: "portrait-circle" },
      { type: "event-detail", variant: "card-stacked" },
      { type: "countdown", variant: "cards" },
      { type: "love-story", variant: "timeline-vertical" },
      { type: "gallery", variant: "grid-2col" },
      { type: "rsvp", variant: "inline-form" },
      { type: "gift", variant: "bank-cards" },
      { type: "footer", variant: "standard" },
    ],
  },
  "t2": {
    id: "t2",
    name: "Rose Gold",
    category: "playful-pastel",
    sections: [
      { type: "cover", variant: "floral-badge" },
      { type: "opening-quote", variant: "standard" },
      { type: "couple-profile", variant: "cards" },
      { type: "countdown", variant: "pill-badge" },
      { type: "event-detail", variant: "card-stacked" },
      { type: "gallery", variant: "grid-2col" },
      { type: "love-story", variant: "timeline-vertical" },
      { type: "gift", variant: "bank-cards" },
      { type: "rsvp", variant: "inline-form" },
      { type: "footer", variant: "standard" },
    ],
  },
  "t3": {
    id: "t3",
    name: "Mawaddah Chic",
    category: "minimalis-modern",
    sections: [
      { type: "cover", variant: "minimal-clean" },
      { type: "couple-profile", variant: "portrait-circle" },
      { type: "opening-quote", variant: "standard" },
      { type: "event-detail", variant: "card-stacked" },
      { type: "countdown", variant: "cards" },
      { type: "gallery", variant: "grid-2col" },
      { type: "rsvp", variant: "inline-form" },
      { type: "gift", variant: "bank-cards" },
      { type: "footer", variant: "standard" },
    ],
  },
  "t6": {
    id: "t6",
    name: "Minimal Elegance",
    category: "minimalis-modern",
    sections: [
      { type: "cover", variant: "monochrome-bold" },
      { type: "opening-quote", variant: "arabic-calligraphy" },
      { type: "couple-profile", variant: "portrait-circle" },
      { type: "event-detail", variant: "card-stacked" },
      { type: "countdown", variant: "cards" },
      { type: "gallery", variant: "grid-2col" },
      { type: "rsvp", variant: "inline-form" },
      { type: "gift", variant: "bank-cards" },
      { type: "footer", variant: "standard" },
    ],
  },
  "t10": {
    id: "t10",
    name: "Nikah Sakinah",
    category: "islami-kalem",
    sections: [
      { type: "cover", variant: "fullbleed-photo" },
      { type: "opening-quote", variant: "arabic-calligraphy" },
      { type: "couple-profile", variant: "portrait-circle" },
      { type: "event-detail", variant: "card-stacked" },
      { type: "countdown", variant: "cards" },
      { type: "love-story", variant: "timeline-vertical" },
      { type: "gallery", variant: "grid-2col" },
      { type: "rsvp", variant: "inline-form" },
      { type: "gift", variant: "bank-cards" },
      { type: "footer", variant: "standard" },
    ],
  },
  "t13": {
    id: "t13",
    name: "Salma & Rizal Elegant",
    category: "klasik-elegan",
    sections: [
      { type: "cover", variant: "fullbleed-photo" },
      { type: "opening-quote", variant: "arabic-calligraphy" },
      { type: "couple-profile", variant: "portrait-circle" },
      { type: "event-detail", variant: "card-stacked" },
      { type: "countdown", variant: "cards" },
      { type: "love-story", variant: "timeline-vertical" },
      { type: "gallery", variant: "grid-2col" },
      { type: "rsvp", variant: "inline-form" },
      { type: "gift", variant: "bank-cards" },
      { type: "footer", variant: "standard" },
    ],
  },
};

export const resolveTheme = (themeId: string): ThemeConfig => {
  const norm = (themeId || "t1").toLowerCase();
  if (THEME_CONFIGS[norm]) {
    return THEME_CONFIGS[norm];
  }
  
  // Fallback to t1
  return THEME_CONFIGS["t1"];
};
