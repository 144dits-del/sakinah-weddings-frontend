import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, ArrowUp } from "lucide-react";
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
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const themeConfig = resolveTheme(themeId);
  const CoverComponent = SECTION_REGISTRY["cover"];

  useEffect(() => {
    // Preload audio metadata only
    audioRef.current = new Audio("/assets/audio/wedding-bgm.mp3");
    audioRef.current.preload = "metadata";
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleOpenGate = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlayingSound(true);
      }).catch(() => {
        setIsPlayingSound(false);
      });
    }
  };

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (isPlayingSound) {
      audioRef.current.pause();
      setIsPlayingSound(false);
    } else {
      audioRef.current.play();
      setIsPlayingSound(true);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollTop > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    }
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-stone-950 flex justify-center items-center py-0 md:py-6 px-0 select-none">
      {/* Mobile Frame Container (max-w-[430px], safe area insets) */}
      <div 
        data-theme={themeConfig.id}
        className="w-full max-w-[430px] min-h-[100dvh] md:min-h-[820px] md:h-[840px] bg-[var(--color-bg,#FFFFFF)] text-[var(--color-text,#09090B)] md:rounded-[2.5rem] md:border-4 md:border-stone-800 overflow-hidden shadow-2xl relative flex flex-col justify-between pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
      >
        {/* Floating Sound Toggle */}
        {isOpen && (
          <button
            type="button"
            className="fixed md:absolute top-5 right-5 z-40 w-11 h-11 rounded-full bg-[var(--color-surface,#FFFFFF)] text-[var(--color-primary,#7A5C3E)] shadow-lg border border-[var(--color-secondary)]/30 flex items-center justify-center cursor-pointer active:scale-95 transition"
            onClick={toggleSound}
            aria-label="Toggle Sound"
          >
            {isPlayingSound ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5 opacity-60" />}
          </button>
        )}

        {/* Floating Scroll to Top */}
        {isOpen && showScrollTop && (
          <button
            type="button"
            className="fixed md:absolute bottom-5 right-5 z-40 w-11 h-11 rounded-full bg-[var(--color-primary,#7A5C3E)] text-white shadow-xl flex items-center justify-center cursor-pointer active:scale-95 transition"
            onClick={scrollToTop}
            aria-label="Scroll to Top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}

        {/* Unopened Gate: Cover Section */}
        {!isOpen ? (
          <div className="w-full h-full overflow-hidden">
            <CoverComponent
              data={weddingData}
              guestName={guestName}
              guestAddress={guestAddress}
              onOpenInvitation={handleOpenGate}
            />
          </div>
        ) : (
          /* Opened Main Content: Scrollable with proximity snap */
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto scrollbar-none w-full animate-fade-in scroll-snap-y-proximity"
          >
            {themeConfig.sections
              .filter((s) => s.type !== "cover")
              .map((s, idx) => {
                const Component = SECTION_REGISTRY[s.type];
                if (!Component) return null;
                return (
                  <div key={`${s.type}-${idx}`} className="scroll-snap-align-start">
                    <Component
                      data={weddingData}
                      variant={s.variant}
                      guestName={guestName}
                      guestAddress={guestAddress}
                    />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileFrame;
