import React from "react";
import { Heart } from "lucide-react";
import { SectionProps } from "./SectionProps";

export const LoveStory: React.FC<SectionProps> = () => {
  const stories = [
    { title: "Awal Pertemuan", date: "Januari 2022", text: "Perkenalan singkat yang membawa rasa nyaman dan hangat di hati." },
    { title: "Momen Bahagia", date: "Agustus 2023", text: "Memutuskan untuk berkomitmen dalam hubungan yang lebih serius." },
    { title: "Lamaran", date: "Desember 2025", text: "Pertemuan keluarga besar dan pengikatan janji suci menuju pernikahan." },
    { title: "Pernikahan", date: "Juli 2026", text: "Mengikat janji sehidup semati di hadapan Allah SWT dan kedua orang tua." },
  ];

  return (
    <section className="p-6 space-y-6 py-10 border-b border-[var(--color-secondary)]/20 theme-container">
      <div className="text-center space-y-2">
        <h2 className="theme-font-display text-2xl font-bold text-[var(--color-primary)]">Kisah Cinta Kami</h2>
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed max-w-sm mx-auto">
          Perjalanan pertemuan hingga mengikat janji suci pernikahan:
        </p>
      </div>

      <div className="relative border-l-2 border-[var(--color-secondary)] ml-4 pl-6 space-y-6 my-4">
        {stories.map((item, idx) => (
          <div key={idx} className="relative">
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[var(--color-primary)] border-2 border-white flex items-center justify-center">
              <Heart className="h-2 w-2 text-white fill-white" />
            </div>
            <div className="theme-card text-left">
              <div className="text-[10px] uppercase font-bold text-[var(--color-primary)] mb-1">{item.date}</div>
              <h3 className="theme-font-display text-sm font-bold text-[var(--color-text)]">{item.title}</h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
