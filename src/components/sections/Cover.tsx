import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ornament } from "@/components/ui/Ornament";
import { SectionProps } from "./SectionProps";

export const Cover: React.FC<SectionProps> = ({
  data,
  variant = "fullbleed-photo",
  guestName,
  guestAddress,
  onOpenInvitation,
}) => {
  const isMinimal = variant === "minimal-typographic";
  const isSplit = variant === "split-frame";

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center p-6 text-center select-none theme-container overflow-hidden">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ 
          backgroundImage: !isMinimal ? `url(${data.cover.coverImageUrl || "https://the.invisimple.id/wp-content/uploads/jet-form-builder/d0a24f3e4478f0f3c7a3982a784bcc25/2026/04/1000507989.jpg"})` : undefined,
        }}
      >
        <div className="absolute inset-0 bg-[var(--color-overlay,rgba(20,16,10,0.6))] backdrop-blur-[1px]" />
      </div>

      <Ornament name="corner-flourish" className="absolute top-4 left-4 text-[var(--color-secondary)]" />
      <Ornament name="corner-flourish" className="absolute top-4 right-4 rotate-90 text-[var(--color-secondary)]" />
      <Ornament name="corner-flourish" className="absolute bottom-4 left-4 -rotate-90 text-[var(--color-secondary)]" />
      <Ornament name="corner-flourish" className="absolute bottom-4 right-4 rotate-180 text-[var(--color-secondary)]" />

      {/* Frame Container */}
      <div className={`relative z-10 w-full max-w-sm p-6 rounded-2xl ${isSplit ? "bg-[var(--color-surface)] border border-[var(--color-secondary)] shadow-2xl text-[var(--color-text)]" : "text-white"}`}>
        {!isMinimal && (
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[var(--color-secondary,#C9A876)] mb-4 shadow-lg mx-auto">
            <img 
              src={data.couple.groom.photoUrl || "https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/slide-1-2372-l-202102060607.jpg"} 
              alt="Foto Pasangan" 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <p className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-90 mb-1">
          {data.cover.greetingText || "THE WEDDING OF"}
        </p>
        
        <h1 className="text-3xl font-bold my-2 theme-font-display leading-tight">
          {data.couple.bride.nickname} & {data.couple.groom.nickname}
        </h1>

        <Ornament name="divider-floral" />

        <div className="mt-4 text-xs space-y-1">
          <p className="opacity-80">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
          <p className="font-bold text-sm capitalize">
            {guestName || data.guest?.name || "Tamu Undangan"}
          </p>
          {guestAddress && <p className="text-[10px] opacity-70">di {guestAddress}</p>}

          <Button
            type="button"
            className="mt-5 theme-btn-primary px-6 py-2.5 text-xs font-semibold flex items-center gap-2 mx-auto cursor-pointer shadow-lg hover:scale-105 transition"
            onClick={onOpenInvitation}
          >
            <Heart className="h-4 w-4 fill-current" />
            Buka Undangan
          </Button>
        </div>
      </div>
    </section>
  );
};
