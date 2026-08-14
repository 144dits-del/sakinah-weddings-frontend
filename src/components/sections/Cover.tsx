import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ornament } from "@/components/ui/Ornament";
import { SectionProps } from "./SectionProps";

export const Cover: React.FC<SectionProps> = ({
  data,
  guestName,
  guestAddress,
  onOpenInvitation,
}) => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center p-6 text-center select-none theme-container">
      <Ornament name="corner-flourish" className="absolute top-4 left-4" />
      <Ornament name="corner-flourish" className="absolute top-4 right-4 rotate-90" />
      <Ornament name="corner-flourish" className="absolute bottom-4 left-4 -rotate-90" />
      <Ornament name="corner-flourish" className="absolute bottom-4 right-4 rotate-180" />

      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[var(--color-secondary,#C9A876)] mb-4 shadow-lg mx-auto">
        <img 
          src="https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/slide-1-2372-l-202102060607.jpg" 
          alt="Foto Pasangan" 
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[var(--color-primary)] mb-1">
        THE WEDDING OF
      </p>
      
      <h1 className="text-3xl font-bold my-2 theme-font-display text-[var(--color-primary)]">
        {data.bride.nickname} & {data.groom.nickname}
      </h1>

      <Ornament name="divider-floral" />

      <div className="mt-4 text-xs space-y-1">
        <p className="text-[var(--color-text-muted)]">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
        <p className="font-bold text-sm capitalize text-[var(--color-text)]">
          {guestName || "Tamu Undangan"}
        </p>
        {guestAddress && <p className="text-[10px] text-[var(--color-text-muted)]">di {guestAddress}</p>}

        <Button
          type="button"
          className="mt-5 theme-btn-primary px-6 py-2.5 text-xs font-semibold flex items-center gap-2 mx-auto cursor-pointer"
          onClick={onOpenInvitation}
        >
          <Heart className="h-4 w-4 fill-current" />
          Buka Undangan
        </Button>
      </div>
    </section>
  );
};
