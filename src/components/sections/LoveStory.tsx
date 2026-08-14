import React from "react";
import { Heart } from "lucide-react";
import { SectionWrapper } from "@/components/primitives/SectionWrapper";
import { SectionProps } from "./SectionProps";

export const LoveStory: React.FC<SectionProps> = ({ data, variant = "timeline-vertical" }) => {
  if (!data.loveStory || data.loveStory.length === 0) return null;

  const isCarousel = variant === "carousel-swipe";

  return (
    <SectionWrapper id="love-story" subTitle="STORY" title="Kisah Cinta Kami">
      {isCarousel ? (
        <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-none snap-x">
          {data.loveStory.map((item, idx) => (
            <div key={idx} className="theme-card min-w-[260px] max-w-[280px] shrink-0 snap-center text-left space-y-1">
              {item.date && <div className="text-[10px] uppercase font-bold text-[var(--color-primary)] mb-1">{item.date}</div>}
              <h3 className="theme-font-display text-sm font-bold text-[var(--color-text)]">{item.title}</h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative border-l-2 border-[var(--color-secondary)] ml-4 pl-6 space-y-6 my-2 text-left">
          {data.loveStory.map((item, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[var(--color-primary)] border-2 border-white flex items-center justify-center">
                <Heart className="h-2 w-2 text-white fill-white" />
              </div>
              <div className="theme-card">
                {item.date && <div className="text-[10px] uppercase font-bold text-[var(--color-primary)] mb-1">{item.date}</div>}
                <h3 className="theme-font-display text-sm font-bold text-[var(--color-text)]">{item.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
};
