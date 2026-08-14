import React from "react";
import { SectionProps } from "./SectionProps";

export const CoupleProfile: React.FC<SectionProps> = ({ data }) => {
  return (
    <section className="p-6 text-center space-y-6 py-10 border-b border-[var(--color-secondary)]/20 theme-container">
      <div className="space-y-2">
        <h2 className="theme-font-display text-xl font-bold text-[var(--color-primary)]">Assalamu'alaikum Warahmatullah Wabarakatuh</h2>
        <p className="text-xs text-[var(--color-text-muted)] italic max-w-sm mx-auto leading-relaxed">
          Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami:
        </p>
      </div>

      {/* Profile Wanita */}
      <div className="theme-card space-y-2">
        <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-2 border-[var(--color-secondary)]">
          <img src="https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/wanita-1-210627044705-l.jpg" alt={data.bride.fullName} className="w-full h-full object-cover" />
        </div>
        <h3 className="theme-font-display text-lg font-bold text-[var(--color-text)]">{data.bride.fullName}</h3>
        <p className="text-[10px] text-[var(--color-text-muted)]">
          Putri dari <span className="font-semibold text-[var(--color-text)]">{data.bride.father}</span> & <span className="font-semibold text-[var(--color-text)]">{data.bride.mother}</span>
        </p>
      </div>

      {/* Profile Pria */}
      <div className="theme-card space-y-2">
        <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-2 border-[var(--color-secondary)]">
          <img src="https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/pria-1-240421071848-l.jpg" alt={data.groom.fullName} className="w-full h-full object-cover" />
        </div>
        <h3 className="theme-font-display text-lg font-bold text-[var(--color-text)]">{data.groom.fullName}</h3>
        <p className="text-[10px] text-[var(--color-text-muted)]">
          Putra dari <span className="font-semibold text-[var(--color-text)]">{data.groom.father}</span> & <span className="font-semibold text-[var(--color-text)]">{data.groom.mother}</span>
        </p>
      </div>
    </section>
  );
};
