import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeddingData } from "@/lib/dummy-data";

interface CoverSectionProps {
  wedding: WeddingData;
  guestName?: string;
  guestAddress?: string;
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast?: boolean;
  };
  onOpenInvitation: () => void;
  selectedTemplate?: string;
  theme: any;
}

export const CoverSection: React.FC<CoverSectionProps> = ({
  wedding,
  guestName,
  guestAddress,
  countdown,
  onOpenInvitation,
  selectedTemplate,
  theme,
}) => {
  const isMonochrome = selectedTemplate === "monochrome" || selectedTemplate === "basic" || selectedTemplate === "t6" || selectedTemplate === "t9" || selectedTemplate === "t12";
  const isT13 = selectedTemplate === "t13";

  return (
    <section className={`absolute inset-0 z-50 flex flex-col items-center justify-center text-center p-6 select-none overflow-hidden animate-fade-in font-sans ${isT13 ? "bg-gradient-to-br from-[#2c2724] via-[#1c1816] to-[#36302c] text-amber-100" : isMonochrome ? "bg-white text-zinc-900" : theme.coverBg}`}>
      <div className="cover-frame relative w-full h-full border p-6 flex flex-col items-center justify-center rounded-2xl">
        {/* Corner Ornaments */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-current opacity-70" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-current opacity-70" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-current opacity-70" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-current opacity-70" />
        
        <img 
          src={isT13 ? "https://the.invisimple.id/wp-content/uploads/jet-form-builder/d0a24f3e4478f0f3c7a3982a784bcc25/2026/04/1000507989.jpg" : "https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/slide-1-2372-l-202102060607.jpg"} 
          alt="Foto Pasangan" 
          className={`w-32 h-32 object-cover rounded-full mb-4 shadow-lg border-2 ${isT13 ? "border-amber-500/60" : "border-current"}`}
        />
        
        <p className={`tracking-[0.25em] text-[10px] uppercase mb-1 ${isT13 ? "text-amber-400 font-bold" : "text-muted-foreground"}`}>
          The Wedding Of
        </p>
        <h1 className={`text-3xl font-bold my-2 leading-tight ${isT13 ? "font-serif text-amber-200" : theme.fontHead}`}>
          {wedding.bride.nickname || "Salma"} & {wedding.groom.nickname || "Rizal"}
        </h1>
        
        {/* Countdown */}
        <div className="flex justify-center gap-1.5 my-3">
          {[
            { v: countdown.days, l: "Hari" },
            { v: countdown.hours, l: "Jam" },
            { v: countdown.minutes, l: "Menit" },
            { v: countdown.seconds, l: "Detik" },
          ].map((item, idx) => (
            <div key={idx} className={`p-2 min-w-[48px] text-center rounded-lg ${isT13 ? "bg-amber-500 text-stone-950 font-bold" : isMonochrome ? "bg-zinc-950 text-white" : "bg-primary text-primary-foreground"}`}>
              <span className="text-sm font-bold block leading-none">{item.v.toString().padStart(2, "0")}</span>
              <p className="text-[7px] uppercase tracking-wider font-semibold mt-1 leading-none">{item.l}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-3 text-xs">
          <p className={isT13 ? "text-amber-300/80" : "text-muted-foreground"}>Kepada Yth. Bapak/Ibu/Saudara/i:</p>
          <p className={`font-bold text-sm mt-1 capitalize leading-relaxed ${isT13 ? "text-amber-100" : "text-foreground"}`}>
            {guestName || "Tamu Undangan"}
          </p>
          {guestAddress && <p className={`text-[10px] capitalize ${isT13 ? "text-amber-400/70" : "text-muted-foreground"}`}>di {guestAddress}</p>}
          
          <Button 
            type="button"
            className={`mt-4 font-bold tracking-wider text-[10px] py-2.5 px-6 uppercase transition cursor-pointer flex items-center gap-2 mx-auto ${isT13 ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-stone-950 rounded-full shadow-lg hover:from-amber-600 hover:to-yellow-700" : theme.btn}`}
            onClick={onOpenInvitation}
          >
            <Heart className="h-3.5 w-3.5 fill-current" />
            Buka Undangan
          </Button>
        </div>
      </div>
    </section>
  );
};
