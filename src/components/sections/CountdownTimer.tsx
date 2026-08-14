import React from "react";
import { SectionProps } from "./SectionProps";

export const CountdownTimer: React.FC<SectionProps> = () => {
  const countdown = { days: 12, hours: 8, minutes: 45, seconds: 30 };

  return (
    <section className="p-6 text-center space-y-4 py-8 border-b border-[var(--color-secondary)]/20 theme-container">
      <h3 className="text-xs uppercase tracking-widest font-bold text-[var(--color-primary)]">
        Hitung Mundur Hari Bahagia
      </h3>

      <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
        {[
          { v: countdown.days, l: "Hari" },
          { v: countdown.hours, l: "Jam" },
          { v: countdown.minutes, l: "Menit" },
          { v: countdown.seconds, l: "Detik" },
        ].map((item, idx) => (
          <div key={idx} className="theme-card p-2 text-center">
            <span className="theme-font-display text-lg font-bold text-[var(--color-primary)] block">
              {item.v.toString().padStart(2, "0")}
            </span>
            <span className="text-[8px] uppercase tracking-wider font-semibold text-[var(--color-text-muted)] mt-1 block">
              {item.l}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
