import React, { useState, useEffect } from "react";
import { SectionWrapper } from "@/components/primitives/SectionWrapper";
import { SectionProps } from "./SectionProps";

export const CountdownTimer: React.FC<SectionProps> = ({ data }) => {
  const targetDateStr = data.events?.[0]?.date || "2026-07-19T08:00:00.000Z";

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  return (
    <SectionWrapper id="countdown" subTitle="COUNTDOWN" title="Hitung Mundur Acara">
      {timeLeft.isPast ? (
        <div className="theme-card text-center p-6 space-y-2">
          <span className="text-2xl block">💍</span>
          <p className="theme-font-display text-sm font-bold text-[var(--color-primary)]">
            Terima kasih telah menjadi bagian dari hari bahagia kami
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
          {[
            { v: timeLeft.days, l: "Hari" },
            { v: timeLeft.hours, l: "Jam" },
            { v: timeLeft.minutes, l: "Menit" },
            { v: timeLeft.seconds, l: "Detik" },
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
      )}
    </SectionWrapper>
  );
};
