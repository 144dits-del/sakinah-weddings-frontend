import React from "react";
import { Ornament } from "@/components/ui/Ornament";
import { SectionProps } from "./SectionProps";

export const OpeningQuote: React.FC<SectionProps> = () => {
  return (
    <section className="p-6 text-center space-y-4 py-8 border-b border-[var(--color-secondary)]/20 theme-container">
      <Ornament name="bismillah-header" />

      <div className="theme-card text-center space-y-2 my-2">
        <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-primary)]">
          QS. AR-RUM : 21
        </div>
        <p className="text-xs italic leading-relaxed theme-font-display text-[var(--color-text)]">
          "Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
        </p>
      </div>
    </section>
  );
};
