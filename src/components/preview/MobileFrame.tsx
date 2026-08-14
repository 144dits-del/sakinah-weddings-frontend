import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { WeddingData, dummyWedding } from "@/lib/dummy-data";
import { resolveTheme } from "@/lib/theme-resolver";
import { SECTION_REGISTRY } from "@/components/sections/SectionRegistry";

interface MobileFrameProps {
  themeId?: string;
  weddingData?: WeddingData;
  guestName?: string;
  guestAddress?: string;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  themeId = "t1",
  weddingData = dummyWedding,
  guestName,
  guestAddress,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlayingSound, setIsPlayingSound] = useState(true);

  const themeConfig = resolveTheme(themeId);

  const CoverComponent = SECTION_REGISTRY["cover"];

  return (
    <div className="min-h-screen w-full bg-stone-900 flex justify-center items-center py-0 md:py-6 px-0 select-none">
      {/* Mobile Frame Container (max-w-[430px], shadow-2xl, safe area simulated) */}
      <div 
        data-theme={themeConfig.id}
        className="w-full max-w-[430px] min-h-screen md:min-h-[820px] md:h-[840px] bg-[var(--color-bg,#FFFFFF)] text-[var(--color-text,#09090B)] md:rounded-[2.5rem] md:border-4 md:border-stone-800 overflow-hidden shadow-2xl relative flex flex-col justify-between"
      >
        {/* Floating Sound Toggle */}
        {isOpen && (
          <button
            type="button"
            className="fixed md:absolute top-5 right-5 z-40 w-10 h-10 rounded-full bg-[var(--color-surface,#FFFFFF)] text-[var(--color-primary,#7A5C3E)] shadow-lg border border-[var(--color-secondary)]/30 flex items-center justify-center cursor-pointer transition hover:scale-105"
            onClick={() => setIsPlayingSound((prev) => !prev)}
            aria-label="Toggle Sound"
          >
            {isPlayingSound ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5 opacity-60" />}
          </button>
        )}

        {/* Unopened Gate: Cover Section */}
        {!isOpen ? (
          <CoverComponent
            data={weddingData}
            guestName={guestName}
            guestAddress={guestAddress}
            onOpenInvitation={() => setIsOpen(true)}
          />
        ) : (
          /* Opened Main Content: Render sections from theme.config.json */
          <div className="flex-1 overflow-y-auto scrollbar-none w-full animate-fade-in">
            {themeConfig.sections
              .filter((s) => s.type !== "cover")
              .map((s, idx) => {
                const Component = SECTION_REGISTRY[s.type];
                if (!Component) return null;
                return (
                  <Component
                    key={`${s.type}-${idx}`}
                    data={weddingData}
                    variant={s.variant}
                    guestName={guestName}
                    guestAddress={guestAddress}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileFrame;
