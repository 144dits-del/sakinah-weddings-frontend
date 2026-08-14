import React from "react";
import { SectionProps } from "./SectionProps";

export const GallerySection: React.FC<SectionProps> = () => {
  const images = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=500",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500",
  ];

  return (
    <section className="p-6 space-y-6 py-10 border-b border-[var(--color-secondary)]/20 theme-container">
      <div className="text-center space-y-2">
        <h2 className="theme-font-display text-2xl font-bold text-[var(--color-primary)]">Galeri Foto</h2>
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed max-w-sm mx-auto">
          Momen kenangan indah kebahagiaan kami:
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {images.map((src, idx) => (
          <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-[var(--color-secondary)]/40 shadow-sm">
            <img src={src} alt={`Galeri ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
};
