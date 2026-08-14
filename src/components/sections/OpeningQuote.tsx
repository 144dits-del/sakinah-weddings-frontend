import React from "react";
import { SectionWrapper } from "@/components/primitives/SectionWrapper";
import { SectionProps } from "./SectionProps";

export const OpeningQuote: React.FC<SectionProps> = ({ data, variant = "arabic-calligraphy" }) => {
  if (!data.openingQuote?.text) return null;

  return (
    <SectionWrapper id="opening-quote" ornament="bismillah-header">
      <div className="theme-card text-center space-y-2">
        {data.openingQuote.source && (
          <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-primary)]">
            {data.openingQuote.source}
          </div>
        )}
        <p className={`text-xs italic leading-relaxed text-[var(--color-text)] ${variant === "handwritten-script" ? "theme-font-script text-base" : "theme-font-display"}`}>
          "{data.openingQuote.text}"
        </p>
      </div>
    </SectionWrapper>
  );
};
