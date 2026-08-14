import React from "react";
import { getBaseDomain } from "@/lib/utils";
import { SectionProps } from "./SectionProps";

export const Footer: React.FC<SectionProps> = ({ data, variant = "thank-you-signature" }) => {
  const isMinimal = variant === "minimal-credit";

  return (
    <footer className="p-6 text-center space-y-2 py-8 theme-container border-t border-[var(--color-secondary)]/20">
      {!isMinimal && (
        <>
          <h3 className="theme-font-display text-lg font-bold text-[var(--color-primary)]">
            {data.couple.bride.nickname} & {data.couple.groom.nickname}
          </h3>
          <p className="text-[10px] text-[var(--color-text-muted)]">
            Terima kasih atas doa & ucapan restu Bapak/Ibu/Saudara/i sekalian.
          </p>
        </>
      )}
      <p className="text-[9px] text-[var(--color-text-muted)]/70 pt-2">
        Undangan dibuat menggunakan <span className="font-bold">{getBaseDomain()}</span>
      </p>
    </footer>
  );
};
