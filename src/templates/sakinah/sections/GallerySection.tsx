import React, { useState } from "react";
import { Play } from "lucide-react";

interface GallerySectionProps {
  theme: any;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ theme }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=500",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=500",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=500",
  ];

  return (
    <section className="p-6 space-y-6 py-12 relative border-b border-border/40" id="gallery">
      <div className="text-center space-y-2">
        <h2 className={`${theme.fontHead} text-2xl font-bold`}>Galeri Foto & Video</h2>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
          Momen kenangan indah kebahagiaan kami:
        </p>
      </div>

      {/* Grid Foto */}
      <div className="grid grid-cols-2 gap-2.5">
        {images.map((src, idx) => (
          <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-border/50 bg-muted group cursor-pointer shadow-sm">
            <img 
              src={src} 
              alt={`Galeri ${idx + 1}`} 
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
            />
          </div>
        ))}
      </div>

      {/* Video Prewedding Player */}
      <div className="pt-4 space-y-3">
        <h3 className={`${theme.fontHead} text-lg font-bold text-center`}>Video Prewedding</h3>
        <div className="aspect-video rounded-2xl border border-border bg-black overflow-hidden relative group shadow-lg">
          {isPlayingVideo ? (
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Prewedding Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div 
              className="w-full h-full relative flex items-center justify-center bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=800')` }}
              onClick={() => setIsPlayingVideo(true)}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition" />
              <div className="w-12 h-12 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition relative z-10 pl-1">
                <Play className="h-5 w-5 fill-current" />
              </div>
              <span className="absolute bottom-3 text-[10px] text-white/90 font-medium z-10 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                Klik untuk memutar video
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
