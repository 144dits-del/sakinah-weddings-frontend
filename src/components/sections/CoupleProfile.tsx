import React from "react";
import { SectionWrapper } from "@/components/primitives/SectionWrapper";
import { SectionProps } from "./SectionProps";

export const CoupleProfile: React.FC<SectionProps> = ({ data, variant = "portrait-circle" }) => {
  const isSideBySide = variant === "side-by-side-card";
  const isSingleCouple = variant === "single-couple-photo";

  return (
    <SectionWrapper 
      id="couple-profile" 
      subTitle="MEMPELAI" 
      title="Assalamu'alaikum Warahmatullah Wabarakatuh"
    >
      <p className="text-xs text-[var(--color-text-muted)] italic max-w-sm mx-auto leading-relaxed text-center mb-6">
        Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami:
      </p>

      {isSingleCouple ? (
        <div className="theme-card text-center space-y-4">
          <div className="w-full h-48 rounded-xl overflow-hidden border border-[var(--color-secondary)]">
            <img src={data.cover.coverImageUrl || data.couple.bride.photoUrl} alt="Foto Pasangan" className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="theme-font-display text-lg font-bold text-[var(--color-text)]">{data.couple.bride.fullName}</h3>
              <p className="text-[10px] text-[var(--color-text-muted)]">{data.couple.bride.parentInfo}</p>
            </div>
            <div>
              <h3 className="theme-font-display text-lg font-bold text-[var(--color-text)]">{data.couple.groom.fullName}</h3>
              <p className="text-[10px] text-[var(--color-text-muted)]">{data.couple.groom.parentInfo}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={`grid ${isSideBySide ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"} gap-4`}>
          {/* Profile Wanita */}
          <div className="theme-card text-center space-y-2">
            <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-2 border-[var(--color-secondary)] shadow-md">
              <img src={data.couple.bride.photoUrl || "https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/wanita-1-210627044705-l.jpg"} alt={data.couple.bride.fullName} className="w-full h-full object-cover" />
            </div>
            <h3 className="theme-font-display text-lg font-bold text-[var(--color-text)]">{data.couple.bride.fullName}</h3>
            <p className="text-[10px] text-[var(--color-text-muted)]">{data.couple.bride.parentInfo}</p>
            {data.couple.bride.instagram && (
              <span className="text-[10px] font-semibold text-[var(--color-primary)] block">{data.couple.bride.instagram}</span>
            )}
          </div>

          <div className="text-center font-serif text-xl text-[var(--color-primary)] my-1">
            &
          </div>

          {/* Profile Pria */}
          <div className="theme-card text-center space-y-2">
            <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-2 border-[var(--color-secondary)] shadow-md">
              <img src={data.couple.groom.photoUrl || "https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/pria-1-240421071848-l.jpg"} alt={data.couple.groom.fullName} className="w-full h-full object-cover" />
            </div>
            <h3 className="theme-font-display text-lg font-bold text-[var(--color-text)]">{data.couple.groom.fullName}</h3>
            <p className="text-[10px] text-[var(--color-text-muted)]">{data.couple.groom.parentInfo}</p>
            {data.couple.groom.instagram && (
              <span className="text-[10px] font-semibold text-[var(--color-primary)] block">{data.couple.groom.instagram}</span>
            )}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};
