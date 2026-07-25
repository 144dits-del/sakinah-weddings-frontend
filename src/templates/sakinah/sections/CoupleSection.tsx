import React from "react";
import { WeddingData } from "@/lib/dummy-data";

interface CoupleSectionProps {
  wedding: WeddingData;
  theme: any;
  selectedTemplate?: string;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({
  wedding,
  theme,
  selectedTemplate,
}) => {
  const isT13 = selectedTemplate === "t13";

  return (
    <section className="p-6 space-y-6 text-center py-12 relative border-b border-border/40" id="mempelai">
      {/* Bismillah Calligraphy */}
      <div className={`text-center my-3 font-serif text-2xl tracking-wide ${isT13 ? "text-amber-400" : theme.textGold}`}>
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
      </div>

      {/* Surah Ar-Rum 21 Quote Card */}
      <div className={`p-4 rounded-xl border text-center my-4 space-y-2 ${isT13 ? "bg-amber-950/30 border-amber-500/30 text-amber-200/90" : "bg-muted/30 border-border text-foreground"}`}>
        <div className="text-[10px] uppercase font-bold tracking-widest text-amber-400">QS. AR-RUM : 21</div>
        <p className="text-[11px] italic leading-relaxed font-serif">
          "Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
        </p>
      </div>

      <div className="space-y-2">
        <p className={`${theme.fontHead} text-xl ${theme.textGold}`}>Assalamu'alaikum Warahmatullah Wabarakatuh</p>
        <p className="text-xs text-muted-foreground leading-relaxed italic max-w-sm mx-auto">
          Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami:
        </p>
      </div>

      {/* Profil Mempelai Wanita */}
      <div className={theme.cardBg}>
        <img 
          src="https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/wanita-1-210627044705-l.jpg" 
          alt={wedding.bride.fullName || "Salma"} 
          className="w-24 h-24 object-cover rounded-full mx-auto mb-3 border-2 border-amber-500/50 shadow-md"
        />
        <div className={`${theme.fontHead} text-lg font-black capitalize`}>
          {wedding.bride.fullName || "Salsabila Amelia Usman"}
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">
          Putri dari <br />
          <span className="font-semibold text-foreground">{wedding.bride.father || "Bpk. Usman"}</span> &{" "}
          <span className="font-semibold text-foreground">{wedding.bride.mother || "Ibu Usman"}</span>
        </p>
      </div>

      {/* Profil Mempelai Pria */}
      <div className={theme.cardBg}>
        <img 
          src="https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/pria-1-240421071848-l.jpg" 
          alt={wedding.groom.fullName || "Rizal"} 
          className="w-24 h-24 object-cover rounded-full mx-auto mb-3 border-2 border-amber-500/50 shadow-md"
        />
        <div className={`${theme.fontHead} text-lg font-black capitalize`}>
          {wedding.groom.fullName || "Rizal Syahputra"}
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">
          Putra dari <br />
          <span className="font-semibold text-foreground">{wedding.groom.father || "Bpk. Syahputra"}</span> &{" "}
          <span className="font-semibold text-foreground">{wedding.groom.mother || "Ibu Syahputra"}</span>
        </p>
      </div>
    </section>
  );
};
