import React, { useState } from "react";
import { CoverSection } from "./sections/CoverSection";
import { CoupleSection } from "./sections/CoupleSection";
import { EventSection } from "./sections/EventSection";
import { MapSection } from "./sections/MapSection";
import { StorySection } from "./sections/StorySection";
import { GallerySection } from "./sections/GallerySection";
import { GiftSection } from "./sections/GiftSection";
import { WishesSection } from "./sections/WishesSection";
import { WeddingData, dummyWedding } from "@/lib/dummy-data";
import "./styles/theme.css";

interface SakinahTemplateProps {
  wedding?: WeddingData;
  guestName?: string;
  guestAddress?: string;
  isOpen: boolean;
  onOpenInvitation: () => void;
  selectedTemplate?: string;
  theme?: any;
}

export const SakinahTemplate: React.FC<SakinahTemplateProps> = ({
  wedding = dummyWedding,
  guestName,
  guestAddress,
  isOpen,
  onOpenInvitation,
  selectedTemplate = "t13",
  theme = {
    bg: "bg-stone-950 text-amber-100",
    coverBg: "bg-gradient-to-br from-[#2c2724] via-[#1c1816] to-[#36302c] text-amber-100",
    cardBg: "rounded-2xl border border-amber-500/30 bg-stone-900/90 p-5 text-center relative overflow-hidden shadow-xl text-stone-100",
    btn: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold rounded-full text-xs cursor-pointer shadow-md",
    btnOutline: "border-amber-500/50 hover:bg-amber-500/10 text-amber-400 rounded-full text-xs cursor-pointer bg-transparent",
    textGold: "text-amber-400 font-bold",
    fontHead: "font-serif",
    badge: "bg-amber-500 text-stone-950 font-bold",
  },
}) => {
  const [wishes, setWishes] = useState([
    { name: "Ahmad Rizky", relation: "Sahabat Pria", text: "Selamat untuk Salma & Rizal! Semoga menjadi keluarga yang sakinah mawaddah warahmah selamanya, aamiin!" },
    { name: "Siti Nurhaliza", relation: "Teman Kuliah", text: "Selamat yaaa Salma & Rizal! Berkah dan langgeng selalu sampai kakek nenek!" },
  ]);

  const [countdown] = useState({
    days: 12,
    hours: 8,
    minutes: 45,
    seconds: 30,
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Minggu, 19 Juli 2026";
    return dateStr;
  };

  const handleAddWish = (newWish: { name: string; relation: string; text: string }) => {
    setWishes((prev) => [newWish, ...prev]);
  };

  if (!isOpen) {
    return (
      <CoverSection
        wedding={wedding}
        guestName={guestName}
        guestAddress={guestAddress}
        countdown={countdown}
        onOpenInvitation={onOpenInvitation}
        selectedTemplate={selectedTemplate}
        theme={theme}
      />
    );
  }

  return (
    <div className="sakinah-template-container w-full h-full flex flex-col overflow-y-auto scrollbar-none space-y-0 text-amber-100 bg-stone-950">
      <CoupleSection wedding={wedding} theme={theme} selectedTemplate={selectedTemplate} />
      <EventSection wedding={wedding} theme={theme} formatDate={formatDate} />
      <MapSection venue={wedding.akad.venue || "Gedung Utama / Masjid Agung"} mapsUrl={wedding.akad.maps} theme={theme} />
      <StorySection theme={theme} />
      <GallerySection theme={theme} />
      <GiftSection theme={theme} />
      <WishesSection theme={theme} wishes={wishes} onAddWish={handleAddWish} />
      
      {/* Footer */}
      <footer className="p-6 text-center text-xs text-muted-foreground border-t border-border/40 py-8 bg-stone-900/60">
        <p className="font-serif text-lg font-bold text-amber-300 mb-1">{wedding.bride.nickname || "Salma"} & {wedding.groom.nickname || "Rizal"}</p>
        <p className="text-[10px]">Terima kasih atas doa & ucapan restu Anda</p>
        <p className="text-[9px] mt-4 opacity-70">Powered by SakinahWeb / Invisimple ID</p>
      </footer>
    </div>
  );
};

export default SakinahTemplate;
