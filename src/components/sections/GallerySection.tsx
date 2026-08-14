import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SectionWrapper } from "@/components/primitives/SectionWrapper";
import { SectionProps } from "./SectionProps";

export const GallerySection: React.FC<SectionProps> = ({ data, variant = "grid-2col" }) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!data.gallery?.images || data.gallery.images.length === 0) return null;

  const is3Col = variant === "grid-3col";

  return (
    <SectionWrapper id="gallery" subTitle="GALERI" title="Galeri Foto">
      <div className={`grid ${is3Col ? "grid-cols-3" : "grid-cols-2"} gap-2.5`}>
        {data.gallery.images.map((img, idx) => (
          <div 
            key={idx} 
            className="aspect-square rounded-xl overflow-hidden border border-[var(--color-secondary)]/40 shadow-sm cursor-pointer hover:scale-105 transition"
            onClick={() => setActiveImage(img.url)}
          >
            <img 
              src={img.url} 
              alt={img.caption || `Galeri ${idx + 1}`} 
              loading="lazy" 
              className="w-full h-full object-cover" 
            />
          </div>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!activeImage} onOpenChange={() => setActiveImage(null)}>
        <DialogContent className="max-w-md p-2 bg-stone-950 border-stone-800">
          {activeImage && (
            <img src={activeImage} alt="Preview Lightbox" className="w-full h-auto rounded-lg max-h-[80vh] object-contain mx-auto" />
          )}
        </DialogContent>
      </Dialog>
    </SectionWrapper>
  );
};
