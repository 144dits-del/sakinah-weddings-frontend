import React from "react";
import { Heart } from "lucide-react";

interface StorySectionProps {
  theme: any;
}

export const StorySection: React.FC<StorySectionProps> = ({ theme }) => {
  const stories = [
    { title: "Awal Berkelana", date: "Januari 2022", text: "Perkenalan singkat yang membawa rasa nyaman dan hangat di hati." },
    { title: "Momen Bahagia", date: "Agustus 2023", text: "Memutuskan untuk berkomitmen dalam hubungan yang lebih serius." },
    { title: "Lamaran", date: "Desember 2025", text: "Pertemuan keluarga besar dan pengikatan janji suci menuju pernikahan." },
    { title: "Pernikahan", date: "Juli 2026", text: "Mengikat janji sehidup semati di hadapan Allah SWT dan kedua orang tua." },
  ];

  return (
    <section className="p-6 space-y-6 py-12 relative border-b border-border/40" id="story">
      <div className="text-center space-y-2">
        <h2 className={`${theme.fontHead} text-2xl font-bold`}>Kisah Cinta Kami</h2>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
          Perjalanan romantis pertemuan hingga mengikat janji suci pernikahan:
        </p>
      </div>

      <div className="relative border-l-2 border-amber-500/40 ml-4 pl-6 space-y-6 my-4">
        {stories.map((item, idx) => (
          <div key={idx} className="relative group">
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-amber-500 border-2 border-background flex items-center justify-center">
              <Heart className="h-2 w-2 text-stone-950 fill-stone-950" />
            </div>
            <div className={theme.cardBg}>
              <div className="text-[10px] uppercase font-bold text-amber-500 mb-1">{item.date}</div>
              <h3 className={`${theme.fontHead} text-base font-bold text-foreground`}>{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
