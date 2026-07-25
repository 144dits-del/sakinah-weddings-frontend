import { useState, useEffect } from "react";
import { getBaseDomain } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  getStoredWeddingData,
  getStoredPackage,
  WeddingData,
  dummyWedding,
} from "@/lib/dummy-data";
import {
  Heart,
  MapPin,
  Calendar,
  Gift,
  MessageCircle,
  Home as HomeIcon,
  Users,
  Image as ImageIcon,
  Compass,
  Lock,
  Volume2,
} from "lucide-react";

const CornerOrnament = ({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const rotationClass = {
    "top-left": "top-2 left-2 rotate-0",
    "top-right": "top-2 right-2 rotate-90",
    "bottom-left": "bottom-2 left-2 -rotate-90",
    "bottom-right": "bottom-2 right-2 rotate-180",
  }[position];

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`absolute w-10 h-10 text-zinc-950 pointer-events-none fill-none stroke-current z-10 ${rotationClass}`}
      strokeWidth="1.5"
    >
      <path d="M 5 95 L 5 5 L 95 5" />
      <path d="M 10 90 L 10 10 L 90 10" strokeWidth="0.75" strokeDasharray="1,2" />
      <path d="M 5 35 C 10 35, 18 28, 18 18 C 18 8, 8 18, 8 18" strokeWidth="1" />
      <path d="M 35 5 C 35 10, 28 18, 18 18" strokeWidth="1" />
      <circle cx="18" cy="18" r="2.5" fill="currentColor" />
    </svg>
  );
};

const formatIndonesianDate = (dateStr: string) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch (e) {
    return dateStr;
  }
};

interface FullScreenInvitationProps {
  subdomain: string;
  guestName?: string;
  guestAddress?: string;
}

export default function FullScreenInvitation({
  subdomain,
  guestName,
  guestAddress,
}: FullScreenInvitationProps) {
  const [wedding, setWedding] = useState<WeddingData>(dummyWedding);
  const [activePkg, setActivePkg] = useState("Sakinah");
  const [selectedTemplate, setSelectedTemplate] = useState("sakinah");
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const [audio] = useState(() => {
    if (typeof window !== "undefined") {
      const a = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3");
      a.loop = true;
      return a;
    }
    return null;
  });

  useEffect(() => {
    if (audio) {
      if (isOpen && !isMuted) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    }
  }, [isOpen, isMuted, audio]);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

  const toggleSound = () => {
    setIsMuted((prev) => !prev);
  };

  const isMonochrome = selectedTemplate === "monochrome" || selectedTemplate === "basic" || selectedTemplate === "t6" || selectedTemplate === "t9" || selectedTemplate === "t12";

  const getTheme = (id: string) => {
    const norm = id.toLowerCase();
    const isMono = norm === "monochrome" || norm === "basic" || norm === "t6" || norm === "t9" || norm === "t12";
    const isRose = norm === "rose_red" || norm === "t2" || norm === "blossom" || norm === "bliss";
    const isMawaddah = norm === "t3" || norm === "chic";
    const isLuxury = norm === "dark_gold" || norm === "dark_gold_2" || norm === "t4";
    const isGarden = norm === "bloom" || norm === "t5" || norm === "bloom_bliss" || norm === "blossom_celebration";
    const isRoyal = norm === "t7";
    const isSweet = norm === "t8" || norm === "blossom";
    const isSakinah = norm === "t10";

    if (isMono) {
      return {
        bg: "bg-gradient-to-b from-zinc-100 via-white to-zinc-100 text-zinc-900",
        coverBg: "bg-white text-zinc-900",
        cardBg: "bg-white border-zinc-950 rounded-none border-2 p-5 text-center relative overflow-hidden text-zinc-900",
        btn: "bg-zinc-950 hover:bg-zinc-900 text-white rounded-none border border-zinc-950 cursor-pointer text-xs",
        btnOutline: "border-zinc-950 hover:bg-zinc-100 text-zinc-950 rounded-none border cursor-pointer text-xs bg-white",
        textGold: "text-zinc-950 font-bold",
        fontHead: "font-serif",
        borderGold: "border-zinc-950",
        badge: "bg-zinc-950 text-white hover:bg-zinc-950",
        avatar: "bg-zinc-950 text-white rounded-none border-2 border-zinc-950",
        emoji: "✦ ✦ ✦"
      };
    }

    if (isSakinah) {
      return {
        bg: "bg-gradient-to-br from-[#f8f5f0] via-[#fdfbf7] to-[#eedfc2]/40 text-stone-900",
        coverBg: "bg-gradient-to-b from-[#f8f5f0] via-[#fdfbf7] to-background text-stone-900",
        cardBg: "rounded-[2rem] border border-[#8c7853]/30 bg-white/95 p-6 text-center relative overflow-hidden shadow-md text-stone-900",
        btn: "bg-[#8c7853] hover:bg-[#726241] text-white rounded-full text-xs font-semibold cursor-pointer border-0",
        btnOutline: "border-[#8c7853]/40 hover:bg-[#8c7853]/10 text-[#8c7853] rounded-full text-xs cursor-pointer bg-white",
        textGold: "text-[#8c7853] font-bold",
        fontHead: "font-display",
        borderGold: "border-[#8c7853]/20",
        badge: "bg-[#8c7853] text-white",
        avatar: "bg-gradient-to-br from-[#bda87f] to-[#8c7853] text-white rounded-full",
        emoji: "🦢"
      };
    }

    if (isRose) {
      return {
        bg: "bg-gradient-to-br from-rose-50 via-pink-50/30 to-rose-100/40 text-rose-950",
        coverBg: "bg-gradient-to-b from-rose-50 via-pink-50/50 to-background text-rose-950",
        cardBg: "rounded-2xl border border-rose-200 bg-white/80 p-5 text-center relative overflow-hidden shadow-md text-rose-950",
        btn: "bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xs font-semibold cursor-pointer",
        btnOutline: "border-rose-300 hover:bg-rose-50 text-rose-500 hover:text-rose-600 rounded-full text-xs cursor-pointer",
        textGold: "text-rose-500",
        fontHead: "font-display",
        borderGold: "border-rose-200",
        badge: "bg-rose-500 text-white",
        avatar: "bg-gradient-to-br from-rose-400 to-pink-500 text-white rounded-full",
        emoji: "🌹"
      };
    }

    if (isMawaddah) {
      return {
        bg: "bg-gradient-to-br from-amber-50 via-yellow-50/30 to-amber-100/30 text-amber-950",
        coverBg: "bg-gradient-to-b from-amber-50 via-ivory to-background text-amber-950",
        cardBg: "rounded-2xl border border-amber-200 bg-white p-5 text-center relative overflow-hidden shadow-sm text-amber-950",
        btn: "bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs font-semibold cursor-pointer",
        btnOutline: "border-amber-300 hover:bg-amber-50 text-amber-700 rounded-full text-xs cursor-pointer",
        textGold: "text-amber-600",
        fontHead: "font-display",
        borderGold: "border-amber-200",
        badge: "bg-amber-600 text-white",
        avatar: "bg-gradient-to-br from-amber-400 to-yellow-500 text-white rounded-full",
        emoji: "💛"
      };
    }

    if (isLuxury) {
      return {
        bg: "bg-gradient-to-br from-zinc-900 via-stone-900 to-black text-stone-100",
        coverBg: "bg-gradient-to-b from-stone-950 via-zinc-900 to-stone-950 text-stone-100",
        cardBg: "rounded-2xl border border-amber-500/30 bg-zinc-950 p-5 text-center relative overflow-hidden shadow-xl text-stone-100",
        btn: "bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-bold rounded-full text-xs cursor-pointer",
        btnOutline: "border-amber-500/50 hover:bg-amber-500/10 text-amber-400 rounded-full text-xs cursor-pointer",
        textGold: "text-amber-400 font-bold",
        fontHead: "font-display",
        borderGold: "border-amber-500/25",
        badge: "bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold",
        avatar: "bg-gradient-to-br from-amber-400 to-yellow-500 text-black rounded-full",
        emoji: "✨"
      };
    }

    if (isGarden) {
      return {
        bg: "bg-gradient-to-br from-green-50 via-emerald-50/20 to-emerald-100/30 text-emerald-950",
        coverBg: "bg-gradient-to-b from-green-50 via-ivory to-background text-emerald-950",
        cardBg: "rounded-2xl border border-emerald-200 bg-white/90 p-5 text-center relative overflow-hidden shadow-sm text-emerald-950",
        btn: "bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold cursor-pointer",
        btnOutline: "border-emerald-300 hover:bg-emerald-50 text-emerald-700 rounded-full text-xs cursor-pointer",
        textGold: "text-emerald-600",
        fontHead: "font-display",
        borderGold: "border-emerald-200",
        badge: "bg-emerald-600 text-white",
        avatar: "bg-gradient-to-br from-emerald-400 to-green-500 text-white rounded-full",
        emoji: "🌿"
      };
    }

    if (isRoyal) {
      return {
        bg: "bg-gradient-to-br from-slate-900 via-blue-950 to-zinc-950 text-amber-100",
        coverBg: "bg-gradient-to-b from-blue-950 via-slate-900 to-zinc-950 text-amber-100",
        cardBg: "rounded-2xl border border-amber-400/40 bg-slate-950 p-5 text-center relative overflow-hidden shadow-xl text-amber-100",
        btn: "bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-full text-xs font-semibold cursor-pointer",
        btnOutline: "border-amber-400/50 hover:bg-amber-400/10 text-amber-300 rounded-full text-xs cursor-pointer",
        textGold: "text-amber-400",
        fontHead: "font-display",
        borderGold: "border-amber-400/30",
        badge: "bg-amber-500 text-slate-950",
        avatar: "bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 rounded-full",
        emoji: "👑"
      };
    }

    if (isSweet) {
      return {
        bg: "bg-gradient-to-br from-pink-50 via-purple-50/20 to-indigo-100/30 text-purple-950",
        coverBg: "bg-gradient-to-b from-pink-50 via-ivory to-background text-purple-950",
        cardBg: "rounded-2xl border border-pink-200 bg-white/90 p-5 text-center relative overflow-hidden shadow-sm text-purple-950",
        btn: "bg-pink-500 hover:bg-pink-600 text-white rounded-full text-xs font-semibold cursor-pointer",
        btnOutline: "border-pink-300 hover:bg-pink-50 text-pink-700 rounded-full text-xs cursor-pointer",
        textGold: "text-pink-500",
        fontHead: "font-display",
        borderGold: "border-pink-200",
        badge: "bg-pink-500 text-white",
        avatar: "bg-gradient-to-br from-pink-400 to-purple-500 text-white rounded-full",
        emoji: "🌸"
      };
    }

    // Default Sakinah Theme
    return {
      bg: "bg-gradient-to-br from-cream via-ivory to-gold-soft/20 text-foreground",
      coverBg: "bg-gradient-to-b from-cream via-ivory to-background text-foreground",
      cardBg: "rounded-2xl border border-border bg-card p-5 text-center relative overflow-hidden shadow-sm text-foreground",
      btn: "bg-gold hover:bg-gold/90 text-primary-foreground rounded-full text-xs font-semibold cursor-pointer",
      btnOutline: "border-border hover:bg-gold-soft/10 text-muted-foreground hover:text-foreground rounded-full text-xs cursor-pointer",
      textGold: "text-gold",
      fontHead: "font-display",
      borderGold: "border-gold/15",
      badge: "bg-gold text-primary-foreground",
      avatar: "bg-gradient-to-br from-gold to-gold-soft text-white rounded-full",
      emoji: "🌸"
    };
  };

  const theme = getTheme(selectedTemplate);

  const [activeTab, setActiveTab] = useState("Home");
  const [tabKey, setTabKey] = useState(0); // Digunakan untuk mereset animasi transisi
  const [wishes, setWishes] = useState<any[]>([
    { name: "Dewi Lestari", relation: "Sahabat Wanita", text: "Selamat menempuh hidup baru bibi & rarw! Semoga sakinah mawaddah warahmah selalu." },
    { name: "Yusuf Kuncoro", text: "Selamat ya, semoga berkah pernikahannya." }
  ]);
  const [wishName, setWishName] = useState("");
  const [wishRelation, setWishRelation] = useState("Teman");
  const [wishText, setWishText] = useState("");

  // Live countdown state
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  // Update target countdown live
  useEffect(() => {
    let targetTime = new Date("2026-05-30T14:30:00").getTime();
    if (wedding.akad && wedding.akad.date) {
      try {
        const parsed = new Date(wedding.akad.date).getTime();
        if (!isNaN(parsed)) {
          targetTime = parsed;
        }
      } catch (e) {}
    }

    const nowAtStart = new Date().getTime();
    let isPast = targetTime - nowAtStart < 0;

    const finalTarget = isPast 
      ? nowAtStart + (5 * 24 * 60 * 60 * 1000) + (12 * 60 * 60 * 1000) + (34 * 60 * 1000) + (12 * 1000)
      : targetTime;

    const updateTimer = () => {
      const now = new Date().getTime();
      let diff = finalTarget - now;

      if (diff < 0) {
        diff = 0;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds, isPast });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [wedding]);

  useEffect(() => {
    // Muat data mempelai
    let storedData = getStoredWeddingData();
    
    // If a subdomain is passed, check for custom data stored for this subdomain
    if (subdomain && subdomain !== "di-ra") {
      const subSaved = localStorage.getItem(`sakinah_wedding_data_${subdomain}`);
      if (subSaved) {
        try {
          const parsed = JSON.parse(subSaved);
          storedData = {
            ...dummyWedding,
            ...parsed,
            groom: { ...dummyWedding.groom, ...parsed.groom },
            bride: { ...dummyWedding.bride, ...parsed.bride },
            akad: { ...dummyWedding.akad, ...parsed.akad },
            resepsi: { ...dummyWedding.resepsi, ...parsed.resepsi },
          };
        } catch (e) {}
      } else {
        // If not saved, but our current localStorage data matches, use it
        if (storedData.subdomain === subdomain) {
          // already matching
        } else {
          // Otherwise, adapt the dummy data based on subdomain parts (e.g. adi-siti -> adi & siti)
          const parts = subdomain.split("-");
          let groomNick = storedData.groom.nickname;
          let brideNick = storedData.bride.nickname;
          let groomFull = storedData.groom.fullName;
          let brideFull = storedData.bride.fullName;
          
          if (parts.length > 0 && parts[0]) {
            groomNick = parts[0];
            groomFull = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
          }
          if (parts.length > 1 && parts[1]) {
            brideNick = parts[1];
            brideFull = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
          }
          
          storedData = {
            ...storedData,
            subdomain: subdomain,
            groom: {
              ...storedData.groom,
              nickname: groomNick,
              fullName: groomFull,
            },
            bride: {
              ...storedData.bride,
              nickname: brideNick,
              fullName: brideFull,
            }
          };
        }
      }
    }
    
    setWedding(storedData);
    setActivePkg(getStoredPackage());
    
    const searchParams = new URLSearchParams(window.location.search);
    const urlTemplate = searchParams.get("template") || searchParams.get("theme");
    const savedTemplate = urlTemplate || (subdomain && localStorage.getItem(`sakinah_selected_template_${subdomain}`)) || localStorage.getItem("sakinah_selected_template") || "sakinah";
    setSelectedTemplate(savedTemplate);

    // Dengarkan jika ada perubahan data, paket, atau tema
    const handleSyncChange = () => {
      let freshData = getStoredWeddingData();
      if (subdomain && subdomain !== "di-ra") {
        const subSaved = localStorage.getItem(`sakinah_wedding_data_${subdomain}`);
        if (subSaved) {
          try {
            const parsed = JSON.parse(subSaved);
            freshData = {
              ...dummyWedding,
              ...parsed,
              groom: { ...dummyWedding.groom, ...parsed.groom },
              bride: { ...dummyWedding.bride, ...parsed.bride },
              akad: { ...dummyWedding.akad, ...parsed.akad },
              resepsi: { ...dummyWedding.resepsi, ...parsed.resepsi },
            };
          } catch (e) {}
        }
      }
      setWedding(freshData);
      setActivePkg(getStoredPackage());
      const freshTemplate = (subdomain && localStorage.getItem(`sakinah_selected_template_${subdomain}`)) || localStorage.getItem("sakinah_selected_template") || "sakinah";
      setSelectedTemplate(freshTemplate);
    };
    window.addEventListener("storage", handleSyncChange);
    window.addEventListener("sakinah_package_changed", handleSyncChange);
    window.addEventListener("sakinah_template_changed", handleSyncChange);
    return () => {
      window.removeEventListener("storage", handleSyncChange);
      window.removeEventListener("sakinah_package_changed", handleSyncChange);
      window.removeEventListener("sakinah_template_changed", handleSyncChange);
    };
  }, [subdomain]);

  const handleBukaUndangan = () => {
    setIsOpen(true);
    toast.success("Musik latar belakang dimainkan (Beautiful - Instrumental 🎵)");
  };

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishText.trim()) {
      toast.error("Nama dan ucapan doa harus diisi!");
      return;
    }
    const newWish = { name: wishName, relation: wishRelation, text: wishText };
    setWishes([newWish, ...wishes]);
    setWishName("");
    setWishText("");
    toast.success("Doa & ucapan restu Anda berhasil dikirim!");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setTabKey((prev) => prev + 1); // Trigger reset animasi tabSlideIn
  };

  const isFeatureLocked = (feature: string) => {
    if (activePkg === "Sakinah") {
      if (feature === "Cerita" || feature === "Ucapan" || feature === "Kado") return true;
    }
    return false;
  };

  const isMapAddressUnset = (address: string) => {
    return !address || address.trim() === "" || address.trim() === "Peta belum diatur";
  };

  const renderMapPreview = (address: string, mapsUrl?: string) => {
    if (!mapsUrl || mapsUrl.trim() === "") {
      return (
        <div className="h-36 rounded-lg bg-cream/40 border border-gold/15 flex flex-col items-center justify-center text-[10px] text-muted-foreground p-3 text-center">
          <Compass className="h-5 w-5 text-gold/60 mb-1" />
          <span>Lokasi: {address}</span>
          <span className="text-[8px] text-muted-foreground/80 mt-1">(Tautan Peta belum diatur di Dashboard)</span>
        </div>
      );
    }

    if (mapsUrl.includes("<iframe")) {
      let cleanedIframe = mapsUrl
        .replace(/width="[0-9%]+"/, 'width="100%"')
        .replace(/height="[0-9%]+"/, 'height="100%"');
      if (!cleanedIframe.includes("style=")) {
        cleanedIframe = cleanedIframe.replace("<iframe", '<iframe style="border:0; width:100%; height:100%; border-radius:0.5rem;"');
      }
      return (
        <div 
          className="h-36 w-full rounded-lg overflow-hidden border border-border bg-muted/40"
          dangerouslySetInnerHTML={{ __html: cleanedIframe }}
        />
      );
    }

    return (
      <a 
        href={mapsUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="h-36 rounded-lg bg-gradient-to-br from-cream/50 to-gold-soft/20 border border-gold/20 flex flex-col items-center justify-center text-[10px] text-muted-foreground hover:bg-gold-soft/30 transition p-4 text-center cursor-pointer group"
      >
        <MapPin className="h-6 w-6 text-gold group-hover:scale-110 transition mb-1" />
        <span className="font-semibold text-foreground">Klik untuk Buka Google Maps</span>
        <span className="text-[8px] text-gold mt-1 max-w-full px-2 truncate">{mapsUrl}</span>
      </a>
    );
  };

  return (
    <div className={`min-h-screen w-full ${isMonochrome ? "bg-zinc-100 text-zinc-900" : "bg-gradient-to-br from-cream via-ivory to-gold-soft/20"} flex justify-center items-center py-0 md:py-4 px-0`}>
      
      {/* Container utama: Terpusat di PC (max-w-md), alami 100% di HP */}
      <div className={`w-full max-w-md ${isMonochrome ? "bg-white border-2 border-zinc-950 text-zinc-900" : "bg-background border border-border/40 md:rounded-[2rem]"} min-h-screen md:min-h-[800px] md:h-[840px] overflow-hidden shadow-2xl relative flex flex-col justify-between`}>
        
        {(selectedTemplate === "t12" || selectedTemplate === "t13") && (
          <style dangerouslySetInnerHTML={{ __html: `
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0,400..700;1,400..700&family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Sora:wght@300;400;600;700&display=swap');
            .font-pinyon {
              font-family: 'Pinyon Script', cursive !important;
            }
            .font-cormorant {
              font-family: 'Cormorant Infant', Georgia, serif !important;
            }
            .font-sora {
              font-family: 'Sora', sans-serif !important;
            }
            .font-serif {
              font-family: 'Playfair Display', Georgia, serif !important;
            }
            .font-sans {
              font-family: 'Plus Jakarta Sans', Inter, sans-serif !important;
            }
            .frame-section {
              position: relative;
              padding: 24px 14px;
              background: #ffffff;
              color: #09090b;
            }
            .frame-wrapper {
              position: relative;
              border: 1px solid #09090b;
              padding: 20px 12px;
              min-height: auto;
              width: 100%;
            }
            .cover-frame {
              position: relative;
              border: 1px solid #09090b;
              padding: 24px 14px;
              height: 100%;
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            .story-timeline {
              position: relative;
              border-left: 1.5px solid #09090b;
              padding-left: 16px;
              margin-left: 8px;
            }
            .story-item {
              position: relative;
              margin-bottom: 24px;
            }
            .story-item:last-child {
              margin-bottom: 0;
            }
            .countdown-box {
              background: #09090b !important;
              color: #ffffff !important;
              padding: 6px;
              min-width: 48px;
              text-align: center;
              border-radius: 0px !important;
            }
            .invisimple-card {
              background: rgba(22, 34, 29, 0.85);
              border: 1px solid rgba(16, 185, 129, 0.25);
              backdrop-filter: blur(12px);
              border-radius: 1.25rem;
              padding: 1.5rem 1rem;
              color: #f1f5f9;
            }
          `}} />
        )}

        {/* Sound Toggle (Fixed at top-right inside mockup) */}
        {(selectedTemplate === "t12" || selectedTemplate === "t13") && (
          <button 
            type="button"
            onClick={toggleSound} 
            className={`absolute top-4 right-4 z-[60] w-10 h-10 rounded-full flex items-center justify-center shadow-md transition cursor-pointer text-lg font-bold ${selectedTemplate === "t13" ? "bg-[#16221d]/90 border border-emerald-500/40 text-emerald-400 hover:bg-[#1f312a]" : "bg-white/95 border border-zinc-950 text-zinc-900 hover:bg-zinc-100"}`}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        )}

        {/* 1. COVER PAGE (BEFORE OPENING) */}
        {!isOpen ? (
          selectedTemplate === "t13" ? (
            <section className="absolute inset-0 z-50 bg-gradient-to-b from-[#0a120e] via-[#121f19] to-[#0a120e] flex flex-col items-center justify-center text-center p-6 select-none overflow-hidden animate-fade-in font-sora text-slate-100">
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center pointer-events-none" />
              <div className="relative z-10 w-full max-w-xs mx-auto border border-emerald-500/30 rounded-3xl p-6 bg-[#0f1b15]/80 backdrop-blur-md shadow-2xl flex flex-col items-center">
                
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-400/40 mb-4 p-1 shadow-lg shadow-emerald-950/50">
                  <img 
                    src="https://the.invisimple.id/wp-content/uploads/jet-form-builder/d0a24f3e4478f0f3c7a3982a784bcc25/2026/04/1000507989.jpg" 
                    alt="Salma & Rizal" 
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute("src", "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80");
                    }}
                  />
                </div>

                <div className="text-[9px] tracking-[0.4em] uppercase text-emerald-400 font-bold mb-1">THE WEDDING OF</div>
                
                <h1 className="font-pinyon text-5xl text-emerald-300 my-1 drop-shadow-md leading-tight">
                  {wedding.bride.nickname || "Salma"} & {wedding.groom.nickname || "Rizal"}
                </h1>
                
                <p className="text-[11px] text-slate-300 font-serif italic mt-1">
                  {formatIndonesianDate(wedding.akad.date) || "Minggu, 19 Juli 2026"}
                </p>

                {/* Countdown */}
                <div className="grid grid-cols-4 gap-1.5 my-4 w-full">
                  {[
                    { v: countdown.days, l: "Hari" },
                    { v: countdown.hours, l: "Jam" },
                    { v: countdown.minutes, l: "Menit" },
                    { v: countdown.seconds, l: "Detik" },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-[#182921] border border-emerald-500/30 rounded-xl p-2 text-center">
                      <span className="text-sm font-bold text-emerald-300 block leading-none">{item.v.toString().padStart(2, "0")}</span>
                      <p className="text-[7px] uppercase tracking-wider text-slate-400 font-semibold mt-1 leading-none">{item.l}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center text-xs text-slate-300 mt-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-0.5">Kepada Yth. Bapak/Ibu/Saudara/i:</span>
                  <p className="font-bold text-sm text-emerald-300 capitalize leading-relaxed">
                    {guestName || "Tamu Undangan"}
                  </p>
                  {guestAddress && <p className="text-[10px] text-slate-400 capitalize">di {guestAddress}</p>}
                </div>

                <button 
                  type="button"
                  className="mt-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold tracking-wider text-[11px] py-3 px-8 rounded-full uppercase transition duration-300 cursor-pointer shadow-lg shadow-emerald-950/60 border border-emerald-400/30 flex items-center gap-2"
                  onClick={handleBukaUndangan}
                >
                  <Heart className="w-3.5 h-3.5 fill-white text-white animate-pulse" />
                  Buka Undangan
                </button>
              </div>
            </section>
          ) : selectedTemplate === "t12" ? (
            <section className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center text-center p-6 select-none overflow-hidden animate-fade-in font-sans">
              <div className="cover-frame">
                <CornerOrnament position="top-left" />
                <CornerOrnament position="top-right" />
                <CornerOrnament position="bottom-left" />
                <CornerOrnament position="bottom-right" />
                
                <img 
                  src="https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/slide-1-2372-l-202102060607.jpg" 
                  alt="foto pasangan" 
                  className="w-32 h-32 object-cover rounded-full border-2 border-zinc-950 mb-4 shadow-sm"
                />
                
                <p className="font-serif tracking-[0.2em] text-[10px] uppercase text-zinc-500 mb-1">Pernikahan</p>
                <h1 className="font-serif text-3xl font-bold my-2 text-zinc-900 leading-tight">
                  {wedding.groom.nickname} & {wedding.bride.nickname}
                </h1>
                
                {/* Countdown */}
                <div className="flex justify-center gap-1.5 my-3">
                  {[
                    { v: countdown.days, l: "Hari" },
                    { v: countdown.hours, l: "Jam" },
                    { v: countdown.minutes, l: "Menit" },
                    { v: countdown.seconds, l: "Detik" },
                  ].map((item, idx) => (
                    <div key={idx} className="countdown-box">
                      <span className="text-sm font-bold block leading-none">{item.v.toString().padStart(2, "0")}</span>
                      <p className="text-[7px] uppercase tracking-wider font-semibold mt-1 leading-none">{item.l}</p>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-3 text-xs text-zinc-700">
                  Kepada Yth. Bapak/Ibu/Saudara/i:<br />
                  <p className="font-bold text-sm text-zinc-950 mt-1 capitalize leading-relaxed">
                    {guestName || "Tamu Undangan"}
                  </p>
                  {guestAddress && <p className="text-[10px] text-zinc-500 capitalize">di {guestAddress}</p>}
                  
                  <button 
                    type="button"
                    className="mt-4 bg-zinc-950 hover:bg-zinc-900 text-white font-bold tracking-wider text-[10px] py-2.5 px-6 uppercase transition cursor-pointer border border-zinc-950"
                    onClick={handleBukaUndangan}
                  >
                    Buka Undangan
                  </button>
                </div>
              </div>
            </section>
          ) : (
            <section className={`absolute inset-0 z-50 ${theme.coverBg} flex flex-col items-center justify-center text-center p-6 select-none overflow-hidden animate-fade-in`}>
              
              {/* Corner border ornaments for Monochrome */}
              {isMonochrome && (
                <>
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-zinc-950" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-zinc-950" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-zinc-950" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-zinc-950" />
                </>
              )}

              {/* Floral branch ornaments for t10 (Sakinah Theme) */}
              {selectedTemplate === "t10" && (
                <>
                  <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none select-none opacity-90 animate-fade-in">
                    <svg viewBox="0 0 100 100" className="fill-[#8c7853]/25 w-full h-full">
                      <path d="M 0 0 C 40 10, 80 50, 100 100 C 60 80, 20 40, 0 0 Z" />
                      <circle cx="20" cy="30" r="3" fill="#8c7853" opacity="0.4" />
                      <circle cx="45" cy="55" r="4" fill="#8c7853" opacity="0.3" />
                    </svg>
                  </div>
                  <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none select-none opacity-90 animate-fade-in">
                    <svg viewBox="0 0 100 100" className="fill-[#8c7853]/25 w-full h-full -scale-x-100">
                      <path d="M 0 0 C 40 10, 80 50, 100 100 C 60 80, 20 40, 0 0 Z" />
                      <circle cx="20" cy="30" r="3" fill="#8c7853" opacity="0.4" />
                      <circle cx="45" cy="55" r="4" fill="#8c7853" opacity="0.3" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none select-none opacity-80 flex items-end justify-center">
                    <div className="w-full h-8 bg-gradient-to-t from-[#8c7853]/10 to-transparent relative">
                      <div className="absolute bottom-1 left-4 w-12 h-6 border-t border-[#8c7853]/30 rounded-t-full" />
                      <div className="absolute bottom-1 right-4 w-12 h-6 border-t border-[#8c7853]/30 rounded-t-full" />
                    </div>
                  </div>
                </>
              )}

              {/* Hiasan Bunga Mini / Bintang */}
              <div className={`absolute top-12 ${isMonochrome ? "text-zinc-950 font-serif text-xl" : "text-[#8c7853] text-2xl animate-pulse"}`}>
                {selectedTemplate === "t10" ? "🕊️" : isMonochrome ? "✦ ✦ ✦" : "🌸"}
              </div>
              
              <div className={`text-[10px] tracking-[0.4em] uppercase ${theme.textGold} mb-4`}>THE WEDDING OF</div>

              {selectedTemplate === "t10" && (
                <div className="mb-4 animate-bounce duration-1000">
                  <span className="text-4xl">🕊️</span>
                </div>
              )}
              
              <div className="space-y-2">
                <h1 className={`${theme.fontHead} text-5xl font-black capitalize tracking-tight`}>
                  {wedding.groom.nickname}
                </h1>
                <div className={`${theme.fontHead} text-3xl ${theme.textGold} italic my-2 font-semibold`}>&</div>
                <h1 className={`${theme.fontHead} text-5xl font-black capitalize tracking-tight`}>
                  {wedding.bride.nickname}
                </h1>
              </div>

              <div className="mt-8 text-xs text-muted-foreground tracking-wide font-semibold">
                Akan segera melangsungkan pernikahan pada:
              </div>
              <div className={`mt-2 text-base font-bold ${theme.fontHead}`}>
                Sabtu, 30 Mei 2026
              </div>

              {/* Live Ticking Countdown */}
              <div className={`mt-6 p-4 max-w-xs w-full mx-auto ${isMonochrome ? "bg-zinc-50 border border-zinc-950 rounded-none" : "rounded-2xl bg-gold-soft/30 border border-gold/15"}`}>
                <div className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">
                  {countdown.isPast ? "Simulasi Hitung Mundur (Acara Berlalu)" : "Hitung Mundur Acara"}
                </div>
                <div className="grid grid-cols-4 gap-1.5 mt-2">
                  {[
                    { v: countdown.days, l: "Hari" },
                    { v: countdown.hours, l: "Jam" },
                    { v: countdown.minutes, l: "Menit" },
                    { v: countdown.seconds, l: "Detik" },
                  ].map((item, idx) => (
                    <div key={idx} className={`rounded-lg p-1.5 text-center ${isMonochrome ? "bg-white border border-zinc-950 rounded-none" : "bg-background/80"}`}>
                      <div className={`${theme.fontHead} text-base font-black ${theme.textGold} leading-none`}>
                        {item.v.toString().padStart(2, "0")}
                      </div>
                      <div className="text-[7px] text-muted-foreground uppercase font-bold mt-1">
                        {item.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personalized Envelope block for Guests */}
              {guestName && (
                <div className={`mt-8 backdrop-blur p-4 max-w-xs w-full mx-auto text-xs shadow-sm ${isMonochrome ? "bg-white border border-zinc-950 rounded-none" : "bg-white/80 border border-gold/15 rounded-2xl"}`}>
                  <div className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">
                    Kepada Yth. Bapak/Ibu/Saudara/i:
                  </div>
                  <div className={`${theme.fontHead} font-bold text-sm ${theme.textGold} capitalize`}>
                    {guestName}
                  </div>
                  {guestAddress && (
                    <div className="text-[9px] text-muted-foreground mt-0.5 capitalize">
                      di {guestAddress}
                    </div>
                  )}
                </div>
              )}

              <Button
                onClick={handleBukaUndangan}
                className={`mt-8 ${theme.btn} px-8 py-5 h-auto flex items-center gap-2 group transform hover:scale-105 transition duration-300`}
              >
                <Heart className={`h-4 w-4 ${isMonochrome ? "fill-zinc-950 text-white" : "fill-primary-foreground"} group-hover:scale-125 transition`} />
                Buka Undangan
              </Button>
              
              <div className={`absolute bottom-12 ${isMonochrome ? "text-zinc-950 font-serif text-xl" : "text-gold text-3xl animate-pulse"}`}>
                {isMonochrome ? "✦ ✦ ✦" : "🌸"}
              </div>
            </section>
          )
        ) : (
          /* 2. LIVE INVITATION (MAIN INTERACTIVE AREA) */
          <div className={`flex-1 flex flex-col justify-between h-full ${isMonochrome ? "bg-white text-zinc-900" : "bg-background"} overflow-hidden relative`}>
            
            {/* Tampilan Content Area dengan Animasi transisi tabSlideIn */}
            {selectedTemplate === "t13" ? (
              <div className={`flex-1 overflow-y-auto scrollbar-none w-full space-y-5 text-slate-100 bg-gradient-to-b from-[#0c1411] via-[#121f1a] to-[#0c1411] font-sora p-4 ${activePkg === "Sakinah" ? "pb-8" : "pb-4"}`}>
                
                {/* 1. HERO / AYAT AL-QURAN */}
                <section className="invisimple-card text-center space-y-3 relative overflow-hidden">
                  <div className="text-emerald-400 font-serif text-xl font-bold tracking-widest leading-relaxed">
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </div>
                  <p className="text-[11px] text-slate-300 italic leading-relaxed font-serif">
                    "Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
                  </p>
                  <span className="text-[10px] text-emerald-400 font-bold block">(QS. Ar-Rum: 21)</span>
                </section>

                {/* 2. MEMPELAI PROFILES */}
                <section className="invisimple-card text-center space-y-5">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Mempelai Wanita & Pria</span>
                    <h2 className="font-pinyon text-4xl text-emerald-300">Pasangan Bahagia</h2>
                  </div>

                  {/* Profile Salma */}
                  <div className="p-4 rounded-2xl bg-[#0f1b15] border border-emerald-500/20 space-y-2">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-emerald-400/40 p-1 shadow-md">
                      <img 
                        src="https://the.invisimple.id/wp-content/uploads/jet-form-builder/d0a24f3e4478f0f3c7a3982a784bcc25/2026/04/1000507989.jpg" 
                        alt={wedding.bride.fullName || "Salma (Salsabila Amelia)"} 
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          (e.target as HTMLElement).setAttribute("src", "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=400&q=80");
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-pinyon text-3xl text-emerald-300 font-bold leading-tight">
                        {wedding.bride.fullName || "Salsabila Amelia (Salma)"}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Putri dari Bpk. <span className="text-slate-200 font-semibold">{wedding.bride.father || "Usman"}</span> & Ibu <span className="text-slate-200 font-semibold">{wedding.bride.mother || "Amelia"}</span>
                      </p>
                    </div>
                  </div>

                  <div className="font-pinyon text-3xl text-emerald-400 my-1">&</div>

                  {/* Profile Rizal */}
                  <div className="p-4 rounded-2xl bg-[#0f1b15] border border-emerald-500/20 space-y-2">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-emerald-400/40 p-1 shadow-md">
                      <img 
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80" 
                        alt={wedding.groom.fullName || "Rizal"} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-pinyon text-3xl text-emerald-300 font-bold leading-tight">
                        {wedding.groom.fullName || "Rizal Fitrianto"}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Putra dari Bpk. <span className="text-slate-200 font-semibold">{wedding.groom.father || "Harun"}</span> & Ibu <span className="text-slate-200 font-semibold">{wedding.groom.mother || "Rizal"}</span>
                      </p>
                    </div>
                  </div>
                </section>

                {/* 3. ACARA PERNIKAHAN */}
                <section className="invisimple-card space-y-4 text-center">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Rangkaian Acara</span>
                    <h2 className="font-pinyon text-4xl text-emerald-300">Waktu & Tempat</h2>
                  </div>

                  {/* Akad Nikah */}
                  <div className="p-4 rounded-2xl bg-[#0f1b15] border border-emerald-500/30 text-left space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-600/30 text-emerald-300 text-[9px] font-bold rounded-bl-xl border-l border-b border-emerald-500/30">
                      Akad Nikah
                    </div>
                    <h3 className="font-bold text-xs text-emerald-300 flex items-center gap-1.5 pt-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      {formatIndonesianDate(wedding.akad.date) || "Minggu, 19 Juli 2026"}
                    </h3>
                    <p className="text-[10px] text-slate-300">
                      ⏰ Pukul {wedding.akad.start || "08:00"} - {wedding.akad.end || "10:00"} WIB
                    </p>
                    <p className="text-[10px] text-slate-400 flex items-start gap-1 pt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{wedding.akad.venue || "Gedung Pernikahan Grand Ballroom, Jakarta"}</span>
                    </p>
                    <div className="pt-1">
                      <a 
                        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+${encodeURIComponent(wedding.groom.nickname)}+dan+${encodeURIComponent(wedding.bride.nickname)}&dates=20260719T010000Z/20260719T030000Z&details=Selamat+menghadiri+pernikahan+${encodeURIComponent(wedding.groom.nickname)}+dan+${encodeURIComponent(wedding.bride.nickname)}&location=${encodeURIComponent(wedding.akad.venue)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[9px] bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 py-1 px-3 rounded-full font-semibold transition"
                      >
                        📅 Add to Google Calendar
                      </a>
                    </div>
                  </div>

                  {/* Resepsi Nikah */}
                  <div className="p-4 rounded-2xl bg-[#0f1b15] border border-emerald-500/30 text-left space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-teal-600/30 text-teal-300 text-[9px] font-bold rounded-bl-xl border-l border-b border-teal-500/30">
                      Resepsi
                    </div>
                    <h3 className="font-bold text-xs text-emerald-300 flex items-center gap-1.5 pt-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      {formatIndonesianDate(wedding.resepsi.date) || "Minggu, 19 Juli 2026"}
                    </h3>
                    <p className="text-[10px] text-slate-300">
                      ⏰ Pukul {wedding.resepsi.start || "11:00"} - {wedding.resepsi.end || "14:00"} WIB
                    </p>
                    <p className="text-[10px] text-slate-400 flex items-start gap-1 pt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{wedding.resepsi.venue || "Gedung Pernikahan Grand Ballroom, Jakarta"}</span>
                    </p>
                    <div className="pt-1">
                      <a 
                        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Pernikahan+${encodeURIComponent(wedding.groom.nickname)}+dan+${encodeURIComponent(wedding.bride.nickname)}&dates=20260719T040000Z/20260719T070000Z&details=Selamat+menghadiri+pernikahan+${encodeURIComponent(wedding.groom.nickname)}+dan+${encodeURIComponent(wedding.bride.nickname)}&location=${encodeURIComponent(wedding.resepsi.venue)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[9px] bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 py-1 px-3 rounded-full font-semibold transition"
                      >
                        📅 Add to Google Calendar
                      </a>
                    </div>
                  </div>
                </section>

                {/* 4. PETA LOKASI */}
                <section className="invisimple-card space-y-3 text-center">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Lokasi Acara</span>
                    <h2 className="font-pinyon text-4xl text-emerald-300">Google Maps</h2>
                  </div>

                  <a 
                    href={wedding.akad.maps || "https://maps.google.com"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-bold py-2 px-5 rounded-full shadow-lg transition transform hover:scale-105"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Buka Google Maps
                  </a>

                  <div className="h-40 w-full rounded-xl overflow-hidden border border-emerald-500/30 bg-[#0f1b15]">
                    {wedding.akad.maps && wedding.akad.maps.includes("<iframe") ? (
                      <div 
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{ 
                          __html: wedding.akad.maps
                            .replace(/width="[0-9%]+"/, 'width="100%"')
                            .replace(/height="[0-9%]+"/, 'height="100%"') 
                        }}
                      />
                    ) : (
                      <iframe
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(wedding.akad.venue || "Jakarta")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                      />
                    )}
                  </div>
                </section>

                {/* 5. LOVE STORY TIMELINE */}
                <section className="invisimple-card space-y-3 text-center">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Perjalanan Cinta</span>
                    <h2 className="font-pinyon text-4xl text-emerald-300">Kisah Kami</h2>
                  </div>
                  <div className="text-left space-y-3 pl-3 border-l-2 border-emerald-500/40 ml-2">
                    {[
                      { date: "Oktober 2021", title: "Pertama Bertemu", desc: "Pertama kali berkenalan dan saling bertukar cerita." },
                      { date: "Maret 2024", title: "Lamaran", desc: "Kedua keluarga besar resmi mengikat niat suci." },
                      { date: "Juli 2026", title: "Pernikahan", desc: "Hari bahagia ucapan janji suci seumur hidup." },
                    ].map((st, idx) => (
                      <div key={idx} className="relative pl-4 space-y-0.5">
                        <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0c1411]" />
                        <span className="text-[9px] text-emerald-400 font-bold block">{st.date}</span>
                        <h4 className="font-bold text-xs text-slate-100">{st.title}</h4>
                        <p className="text-[10px] text-slate-400">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 6. GALERI PHOTO & VIDEO */}
                <section className="invisimple-card space-y-3 text-center">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Dokumentasi</span>
                    <h2 className="font-pinyon text-4xl text-emerald-300">Galeri & Video</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=80",
                    ].map((imgUrl, i) => (
                      <div key={i} className="aspect-square rounded-xl overflow-hidden border border-emerald-500/20 shadow-md">
                        <img src={imgUrl} alt={`Foto ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition" />
                      </div>
                    ))}
                  </div>

                  {/* Embedded Video Player */}
                  <div className="pt-1">
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-emerald-500/30 bg-black">
                      {isPlayingVideo ? (
                        <iframe 
                          src="https://www.youtube.com/embed/hE-1XnJs61w?autoplay=1" 
                          title="Video Prewedding" 
                          className="w-full h-full"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      ) : (
                        <div 
                          onClick={() => setIsPlayingVideo(true)}
                          className="absolute inset-0 cursor-pointer flex items-center justify-center group"
                        >
                          <img 
                            src="https://img.youtube.com/vi/hE-1XnJs61w/hqdefault.jpg" 
                            alt="Prewedding Video Thumbnail" 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
                          />
                          <div className="absolute w-10 h-10 bg-emerald-600/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition border border-emerald-400">
                            <svg className="w-4 h-4 text-white fill-current ml-0.5" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* 7. KADO DIGITAL */}
                <section className="invisimple-card space-y-3 text-center">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Cashless Gift</span>
                    <h2 className="font-pinyon text-4xl text-emerald-300">Kirim Kado</h2>
                  </div>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    Doa restu Anda adalah kado terindah bagi kami. Namun jika ingin memberi kado cashless, dapat dikirim via rekening berikut:
                  </p>

                  <div className="space-y-2 pt-1">
                    <div className="p-3 rounded-xl bg-[#0f1b15] border border-emerald-500/30 text-center space-y-0.5">
                      <span className="text-xs font-bold text-emerald-400 block">Bank BCA</span>
                      <span className="text-sm font-mono font-bold text-white block">8830492019</span>
                      <span className="text-[10px] text-slate-400 block mb-1">a.n. Salma & Rizal</span>
                      <button 
                        type="button"
                        className="bg-emerald-600/40 hover:bg-emerald-600 text-emerald-300 hover:text-white text-[10px] font-bold py-1 px-4 rounded-full border border-emerald-500/40 transition cursor-pointer"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText("8830492019");
                            toast.success("Nomor rekening BCA disalin!");
                          }
                        }}
                      >
                        Copy No. Rekening
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0f1b15] border border-emerald-500/30 text-center space-y-0.5">
                      <span className="text-xs font-bold text-emerald-400 block">Bank Mandiri</span>
                      <span className="text-sm font-mono font-bold text-white block">1320006284864</span>
                      <span className="text-[10px] text-slate-400 block mb-1">a.n. Salma & Rizal</span>
                      <button 
                        type="button"
                        className="bg-emerald-600/40 hover:bg-emerald-600 text-emerald-300 hover:text-white text-[10px] font-bold py-1 px-4 rounded-full border border-emerald-500/40 transition cursor-pointer"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText("1320006284864");
                            toast.success("Nomor rekening Mandiri disalin!");
                          }
                        }}
                      >
                        Copy No. Rekening
                      </button>
                    </div>
                  </div>
                </section>

                {/* 8. KIRIM DOA & RESTU */}
                <section className="invisimple-card space-y-3">
                  <div className="text-center space-y-0.5">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Doa & Ucapan</span>
                    <h2 className="font-pinyon text-4xl text-emerald-300">RSVP & Wishes</h2>
                  </div>

                  <form onSubmit={handleSendWish} className="space-y-2.5 text-left">
                    <div>
                      <Label className="text-[9px] text-emerald-400 uppercase font-bold">Nama Lengkap</Label>
                      <Input 
                        value={wishName}
                        onChange={(e) => setWishName(e.target.value)}
                        placeholder="Nama Anda..." 
                        className="text-xs bg-[#0f1b15] border-emerald-500/30 text-slate-100 h-8 rounded-xl focus:border-emerald-400"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-[9px] text-emerald-400 uppercase font-bold">Pesan Doa Restu</Label>
                      <Textarea 
                        value={wishText}
                        onChange={(e) => setWishText(e.target.value)}
                        placeholder="Tuliskan ucapan selamat..." 
                        rows={2}
                        className="text-xs bg-[#0f1b15] border-emerald-500/30 text-slate-100 rounded-xl focus:border-emerald-400"
                        required
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-[10px] py-2 px-4 rounded-xl uppercase tracking-wider cursor-pointer border border-emerald-400/30 shadow-md"
                    >
                      Kirim Doa Restu
                    </button>
                  </form>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {wishes.map((w, idx) => (
                      <div key={idx} className="p-2.5 bg-[#0f1b15] border border-emerald-500/20 rounded-xl text-left text-[10px] space-y-0.5">
                        <div className="flex justify-between items-center font-bold text-emerald-300">
                          <span>{w.name}</span>
                          <Badge className="bg-emerald-600 text-white text-[7px]">{w.relation || "Teman"}</Badge>
                        </div>
                        <p className="text-slate-300 font-serif italic">"{w.text}"</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 9. FOOTER */}
                <footer className="text-center py-3 space-y-1 text-[10px] text-slate-400">
                  <p className="font-pinyon text-2xl text-emerald-300">Salma & Rizal</p>
                  <p>Undangan Digital Website oleh <span className="text-emerald-400 font-bold">Invisimple ID</span></p>
                  <p className="text-[8px] text-slate-500">© 2026 SakinahWeb / Invisimple ID. All rights reserved.</p>
                </footer>
              </div>
            ) : selectedTemplate === "t12" ? (
              <div className={`flex-1 overflow-y-auto scrollbar-none w-full space-y-0 text-zinc-900 bg-white font-sans ${activePkg === "Sakinah" ? "pb-5" : ""}`}>
                {/* 1. PEMBUKA */}
                <section className="frame-section" id="pembuka">
                  <div className="frame-wrapper">
                    <CornerOrnament position="top-left" />
                    <CornerOrnament position="top-right" />
                    <CornerOrnament position="bottom-left" />
                    <CornerOrnament position="bottom-right" />
                    <p className="salam text-xs leading-relaxed mb-4">
                      Assalamu'alaikum Warahmatullah<br />
                      Dengan Rahmat Allah yang Maha Kuasa InsyaAllah kami akan melangsungkan pernikahan pada:
                    </p>
                    <div className="info-acara text-xs font-bold mb-5 space-y-1">
                      <p><span className="emoji mr-1">📅</span>{formatIndonesianDate(wedding.akad.date) || "Senin, 31 Agustus 2026"}</p>
                      <p><span className="emoji mr-1">📍</span>{wedding.akad.venue || "Aula Masjid ABRI Cimahi - Jalan Gatot Subroto Kota Cimahi"}</p>
                    </div>

                    <div className="w-full space-y-4">
                      <div className="profile-card">
                        <img 
                          src="https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/wanita-1-210627044705-l.jpg" 
                          alt={wedding.bride.fullName || "Siti Salamah Azzahra"} 
                          className="profile-img" 
                        />
                        <div className="profile-info">
                          <p className="couple-name">
                            {wedding.bride.fullName || "Siti Salamah Azzahra"}<br />
                            <span className="text-[10px] text-zinc-500 font-normal">Putri dari {wedding.bride.father || "Maman"} & {wedding.bride.mother || "Imas"}</span>
                          </p>
                        </div>
                      </div>

                      <div className="profile-card">
                        <img 
                          src="https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/pria-1-240421071848-l.jpg" 
                          alt={wedding.groom.fullName || "Adi Sumaryadi"} 
                          className="profile-img" 
                        />
                        <div className="profile-info">
                          <p className="couple-name">
                            {wedding.groom.fullName || "Adi Sumaryadi"}<br />
                            <span className="text-[10px] text-zinc-500 font-normal">Putra dari {wedding.groom.father || "Sumarmo"} & {wedding.groom.mother || "Kantun"}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 2. LOVE STORY */}
                <section className="frame-section" id="love-story">
                  <div className="frame-wrapper">
                    <CornerOrnament position="top-left" />
                    <CornerOrnament position="top-right" />
                    <CornerOrnament position="bottom-left" />
                    <CornerOrnament position="bottom-right" />
                    <h2 className="section-title">Cerita Cinta</h2>
                    <p className="text-[11px] text-zinc-500 leading-relaxed mb-5">
                      Banyak cerita yang kami lalui sehingga akhirnya kami bisa bersatu, cerita yang akan kami kenang selalu, dan cerita itu kami bagi untuk anda.
                    </p>
                    <div className="story-timeline">
                      {[
                        {
                          date: "Kamis, 16 Oktober 2014",
                          title: "Pertama Kali Berjumpa",
                          desc: `Pertama kali berjumpa di kampus. Pertemuan awal yang menumbuhkan benih kekaguman satu sama lain antara ${wedding.groom.nickname} dan ${wedding.bride.nickname}.`
                        },
                        {
                          date: "Minggu, 14 Desember 2014",
                          title: `${wedding.groom.nickname} Mengunjungi Rumah ${wedding.bride.nickname} Pertama Kali`,
                          desc: "Langkah serius pertama untuk bersilaturahmi dengan keluarga besar dan menyatakan niat tulus menjalin hubungan yang lebih dekat."
                        },
                        {
                          date: "Minggu, 15 Maret 2015",
                          title: "Prosesi Lamaran",
                          desc: "Hari yang bersejarah di mana kedua keluarga resmi dipertemukan untuk meminang dan merencanakan masa depan pernikahan kami."
                        },
                        {
                          date: "Kamis, 11 Juni 2015",
                          title: "Kami Dipingit Satu Sama Lain",
                          desc: "Tradisi adat pingitan sebelum hari pernikahan. Menjaga kerinduan dan kesucian hubungan hingga hari ijab qobul tiba."
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="story-item">
                          <div className="story-date">{item.date}</div>
                          <h4 className="story-title">{item.title}</h4>
                          <p className="story-description">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 3. ACARA */}
                <section className="frame-section" id="acara">
                  <div className="frame-wrapper">
                    <CornerOrnament position="top-left" />
                    <CornerOrnament position="top-right" />
                    <CornerOrnament position="bottom-left" />
                    <CornerOrnament position="bottom-right" />
                    <h2 className="judul-section">Undangan dan Acara</h2>
                    <p className="deskripsi-section">
                      Bahagia rasanya apabila anda berkenan hadir dan memberikan doa restu kepada kami. Kami mengundang anda untuk hadir dalam acara resepsi pernikahan kami berikut ini
                    </p>

                    <div className="section-box">
                      <h3 className="section-title">Akad Nikah</h3>
                      <hr className="divider" />
                      <div className="section-content">
                        <p className="font-bold">{formatIndonesianDate(wedding.akad.date) || "Senin, 31 Agustus 2026"}</p>
                        <p>{wedding.akad.start || "12:00"} - {wedding.akad.end || "selesai"}</p>
                        <p>{wedding.akad.venue || "Aula Masjid ABRI Cimahi - Jalan Gatot Subroto Kota Cimahi"}</p>
                      </div>
                      <div className="mt-3">
                        <a 
                          href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+${encodeURIComponent(wedding.groom.nickname)}+dan+${encodeURIComponent(wedding.bride.nickname)}&dates=20260831T050000Z/20260831T080000Z&details=Selamat+menghadiri+pernikahan+${encodeURIComponent(wedding.groom.nickname)}+dan+${encodeURIComponent(wedding.bride.nickname)}&location=${encodeURIComponent(wedding.akad.venue)}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <button type="button" className="calendar-button">Add To Calendar</button>
                        </a>
                      </div>
                    </div>

                    <div className="section-box">
                      <h3 className="section-title">Resepsi Pernikahan</h3>
                      <hr className="divider" />
                      <div className="section-content">
                        <p className="font-bold">{formatIndonesianDate(wedding.resepsi.date) || "Senin, 31 Agustus 2026"}</p>
                        <p>{wedding.resepsi.start || "12:00"} - {wedding.resepsi.end || "selesai"}</p>
                        <p>{wedding.resepsi.venue || "Aula Masjid ABRI Cimahi - Jalan Gatot Subroto Kota Cimahi"}</p>
                      </div>
                      <div className="mt-3">
                        <a 
                          href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Pernikahan+${encodeURIComponent(wedding.groom.nickname)}+dan+${encodeURIComponent(wedding.bride.nickname)}&dates=20260831T050000Z/20260831T080000Z&details=Selamat+menghadiri+pernikahan+${encodeURIComponent(wedding.groom.nickname)}+dan+${encodeURIComponent(wedding.bride.nickname)}&location=${encodeURIComponent(wedding.resepsi.venue)}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <button type="button" className="calendar-button">Add To Calendar</button>
                        </a>
                      </div>
                    </div>

                    <div className="section-box">
                      <h3 className="section-title">Turut Mengundang</h3>
                      <hr className="divider" />
                      <div className="text-zinc-600 text-[11px] leading-relaxed text-center space-y-1">
                        <p>Keluarga Besar Mempelai Pria</p>
                        <p>Keluarga Besar Mempelai Wanita</p>
                        <p>Rekan Kerja & Sahabat Dekat Kedua Mempelai</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 4. PETA LOKASI */}
                <section className="frame-section" id="peta-lokasi">
                  <div className="frame-wrapper">
                    <CornerOrnament position="top-left" />
                    <CornerOrnament position="top-right" />
                    <CornerOrnament position="bottom-left" />
                    <CornerOrnament position="bottom-right" />
                    <h2 className="judul-section">Peta Lokasi Pernikahan</h2>
                    <p className="location-note">
                      Anda dapat menuju lokasi pernikahan kami dengan bantuan peta dibawah ini. Atau anda bisa buka di
                    </p>

                    <a 
                      href={wedding.akad.maps || "https://www.google.com/maps?q=-6.8778538795485575,107.52693846630785"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="maps-button"
                    >
                      Buka di Google Maps
                    </a>

                    <div className="map-container">
                      {wedding.akad.maps && wedding.akad.maps.includes("<iframe") ? (
                        <div 
                          className="w-full h-full"
                          dangerouslySetInnerHTML={{ 
                            __html: wedding.akad.maps
                              .replace(/width="[0-9%]+"/, 'width="100%"')
                              .replace(/height="[0-9%]+"/, 'height="100%"') 
                          }}
                        />
                      ) : (
                        <iframe
                          src={`https://maps.google.com/maps?q=${encodeURIComponent(wedding.akad.venue || "-6.8778538795485575,107.52693846630785")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen={false}
                          loading="lazy"
                        />
                      )}
                    </div>
                  </div>
                </section>

                {/* 5. GALERI PHOTO */}
                <section className="frame-section" id="galeri">
                  <div className="frame-wrapper">
                    <CornerOrnament position="top-left" />
                    <CornerOrnament position="top-right" />
                    <CornerOrnament position="bottom-left" />
                    <CornerOrnament position="bottom-right" />
                    <h2 className="judul-section">Galeri Photo</h2>
                    <p className="text-[11px] text-zinc-500 mb-4">Photo-photo kebahagiaan kami yang kami kenang selalu.</p>
                    <div className="grid grid-cols-2 gap-2 w-full">
                      {[
                        "https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/photo-1-47-l.jpg",
                        "https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/photo-1-48-l.jpg",
                        "https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/photo-1-49-l.jpg",
                        "https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/photo-1-50-l.jpg",
                        "https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/photo-1-51-l.jpg",
                        "https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/photo-1-52-l.jpg",
                      ].map((url, idx) => (
                        <div key={idx} className="gallery">
                          <img src={url} alt={`Galeri ${idx + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 6. VIDEO */}
                <section className="frame-section" id="video">
                  <div className="frame-wrapper">
                    <CornerOrnament position="top-left" />
                    <CornerOrnament position="top-right" />
                    <CornerOrnament position="bottom-left" />
                    <CornerOrnament position="bottom-right" />
                    <h2 className="judul-section">Video</h2>
                    <p className="text-[11px] text-zinc-500 mb-4">Sudi sejenak melihat kebahagiaan kami melalui video dibawah ini</p>
                    
                    <div className="border border-zinc-950 p-2 bg-white w-full">
                      <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
                        {isPlayingVideo ? (
                          <iframe 
                            src="https://www.youtube.com/embed/hE-1XnJs61w?autoplay=1" 
                            title="Prewedding Adi dan Rara" 
                            className="w-full h-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          />
                        ) : (
                          <div 
                            onClick={() => setIsPlayingVideo(true)}
                            className="absolute inset-0 cursor-pointer flex items-center justify-center group"
                          >
                            <img 
                              src="https://img.youtube.com/vi/hE-1XnJs61w/hqdefault.jpg" 
                              alt="Thumbnail" 
                              className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition"
                            />
                            <div className="absolute w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                              <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                      <h5 className="text-xs font-bold text-zinc-900 mt-2 text-left">Prewedding Adi dan Rara</h5>
                      <p className="text-[10px] text-zinc-500 text-left mt-1">
                        Saksikan cuplikan video prewedding romantis kami.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 7. KADO */}
                <section className="frame-section" id="kado">
                  <div className="frame-wrapper">
                    <CornerOrnament position="top-left" />
                    <CornerOrnament position="top-right" />
                    <CornerOrnament position="bottom-left" />
                    <CornerOrnament position="bottom-right" />
                    <h2 className="judul-section">Kirim Kado</h2>
                    <p className="text-[11px] text-zinc-500 mb-5">
                      Terima kasih atas doa dan restu yang telah anda berikan, jika anda ingin mengirimkan kado nikah, silahkan kirim dengan cara dibawah ini. Sebelumnya, kami mengucapkan banyak terima kasih.
                    </p>

                    <div className="w-full space-y-4">
                      <div className="card-undangan p-3 bg-white border border-zinc-950 flex flex-col items-center">
                        <img src="https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/rekening-1-230205022445.png" className="img-fluid max-h-10 mb-2" alt="BSI Logo" />
                        <div className="text-center text-xs">
                          <strong className="text-zinc-800">Nama Bank</strong>
                          <p className="mb-1">Bank Syariah Indonesia</p>
                          <strong className="text-zinc-800">Nomor Rekening</strong>
                          <p className="font-mono font-bold text-sm">12345678910</p>
                          <button 
                            type="button"
                            className="btn-primary2" 
                            onClick={() => {
                              if (typeof navigator !== "undefined" && navigator.clipboard) {
                                navigator.clipboard.writeText("12345678910").then(() => {
                                  toast.success("Nomor rekening BSI disalin!");
                                }).catch(() => {
                                  alert("Nomor Rekening Tersalin: 12345678910");
                                });
                              } else {
                                alert("Nomor Rekening Tersalin: 12345678910");
                              }
                            }}
                          >
                            Copy Rekening
                          </button>
                        </div>
                      </div>

                      <div className="card-undangan p-3 bg-white border border-zinc-950 flex flex-col items-center">
                        <img src="https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/rekening-1-230205114909.png" className="img-fluid max-h-10 mb-2" alt="Mandiri Logo" />
                        <div className="text-center text-xs">
                          <strong className="text-zinc-800">Nama Bank</strong>
                          <p className="mb-1">Bank Mandiri</p>
                          <strong className="text-zinc-800">Nomor Rekening</strong>
                          <p className="font-mono font-bold text-sm">12345678910</p>
                          <button 
                            type="button"
                            className="btn-primary2" 
                            onClick={() => {
                              if (typeof navigator !== "undefined" && navigator.clipboard) {
                                navigator.clipboard.writeText("12345678910").then(() => {
                                  toast.success("Nomor rekening Mandiri disalin!");
                                }).catch(() => {
                                  alert("Nomor Rekening Tersalin: 12345678910");
                                });
                              } else {
                                alert("Nomor Rekening Tersalin: 12345678910");
                              }
                            }}
                          >
                            Copy Rekening
                          </button>
                        </div>
                      </div>

                      <div className="card-undangan p-3 bg-white border border-zinc-950">
                        <img src="https://adirara.webnikah.com/dirmember/00000001/adisumaryadi/kadonikah-1-210627035302.png" alt="Kado Nikah" className="w-full max-h-32 object-contain mb-2" />
                        <p className="text-[10px] text-zinc-600 leading-relaxed">
                          Untuk mengirimkan Kado Nikah kepada kami, silahkan kirimkan melalui Saweria kami. Atau melalui Nomor Rekening Bank Mandiri 1320006284864
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 8. KIRIM DOA & UCAPAN */}
                <section className="frame-section" id="doa-ucapan-kirim">
                  <div className="frame-wrapper">
                    <CornerOrnament position="top-left" />
                    <CornerOrnament position="top-right" />
                    <CornerOrnament position="bottom-left" />
                    <CornerOrnament position="bottom-right" />
                    <h2 className="judul-section">Kirim Doa & Ucapan</h2>
                    <p className="text-[11px] text-zinc-500 mb-4">Sampaikan ucapan selamat dan doa restu Anda kepada kedua mempelai.</p>
                    
                    <form onSubmit={handleSendWish} className="w-full space-y-3 text-left">
                      <div>
                        <Label className="text-[9px] uppercase tracking-wider font-bold text-zinc-500">Nama Lengkap</Label>
                        <Input 
                          value={wishName}
                          onChange={(e) => setWishName(e.target.value)}
                          placeholder="Tulis nama lengkap anda" 
                          className="text-xs bg-white border border-zinc-950 rounded-none h-8 px-2 focus:ring-0 focus:border-zinc-950"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-[9px] uppercase tracking-wider font-bold text-zinc-500">Hubungan</Label>
                        <select 
                          value={wishRelation}
                          onChange={(e) => setWishRelation(e.target.value)}
                          className="w-full text-xs bg-white border border-zinc-950 rounded-none h-8 px-1 focus:ring-0 focus:border-zinc-950"
                        >
                          <option value="Keluarga">Keluarga</option>
                          <option value="Sahabat">Sahabat</option>
                          <option value="Teman">Teman</option>
                          <option value="Tetangga">Tetangga</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-[9px] uppercase tracking-wider font-bold text-zinc-500">Ucapan / Doa</Label>
                        <Textarea 
                          value={wishText}
                          onChange={(e) => setWishText(e.target.value)}
                          placeholder="Tulis ucapan atau doa untuk kedua mempelai" 
                          rows={3}
                          className="text-xs bg-white border border-zinc-950 rounded-none p-2 focus:ring-0 focus:border-zinc-950"
                          required
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="w-full bg-zinc-950 hover:bg-zinc-900 text-white font-bold text-[10px] py-2 px-4 uppercase tracking-wider cursor-pointer border border-zinc-950"
                      >
                        Kirim Ucapan
                      </button>
                    </form>
                  </div>
                </section>

                {/* 9. DOA & UCAPAN TERKIRIM */}
                <section className="frame-section" id="doa">
                  <div className="frame-wrapper">
                    <CornerOrnament position="top-left" />
                    <CornerOrnament position="top-right" />
                    <CornerOrnament position="bottom-left" />
                    <CornerOrnament position="bottom-right" />
                    <h2 className="judul-section">Doa dan Ucapan</h2>
                    
                    <div className="w-full space-y-3 mt-4 max-h-64 overflow-y-auto pr-1">
                      {wishes.map((w, idx) => (
                        <div key={idx} className="p-3 bg-white border border-zinc-950 text-left">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-xs">{w.name}</span>
                            <Badge className="bg-zinc-950 text-white text-[8px] rounded-none py-0.5 px-2 font-normal hover:bg-zinc-950">{w.relation || "Teman"}</Badge>
                          </div>
                          <p className="text-[11px] text-zinc-700 font-sans italic">"{w.text}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 10. FOOTER */}
                <section className="frame-section" id="footer">
                  <div className="frame-wrapper">
                    <CornerOrnament position="top-left" />
                    <CornerOrnament position="top-right" />
                    <CornerOrnament position="bottom-left" />
                    <CornerOrnament position="bottom-right" />
                    
                    <div className="text-center py-2 space-y-3 w-full">
                      <b className="font-serif text-xs block">{wedding.bride.fullName || "Siti Salamah Azzahra"} & {wedding.groom.fullName || "Adi Sumaryadi"}</b>
                      <p className="text-[10px] text-zinc-500">Digital Invitation by <a target="_blank" rel="noopener noreferrer" href="https://webnikah.com" className="text-zinc-900 underline font-bold">webnikah.com</a></p>
                      
                      <div className="my-2">
                        <a target="_blank" rel="noopener noreferrer" href="https://webnikah.com">
                          <img 
                            src="https://webnikah.com/template/webnikah/images/img-logo.png" 
                            alt="WebNikah Logo" 
                            className="mx-auto p-2 bg-white border border-zinc-200 max-h-9 object-contain"
                          />
                        </a>
                      </div>
                      <div className="text-[9px] text-zinc-400">Copyright © WebNikah. All rights reserved.</div>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <div key={tabKey} className={`flex-1 overflow-y-auto scrollbar-none w-full animate-tab-slide ${activePkg === "Sakinah" ? "pb-20" : "pb-16"}`}>
                
                {/* TAB 1: HOME */}
              {activeTab === "Home" && (
                <section className={`${isMonochrome ? "bg-white text-zinc-900 relative" : "bg-gradient-to-b from-cream/40 via-background to-background"} min-h-full flex flex-col items-center justify-center p-6 text-center select-none py-20`}>
                  
                  {isMonochrome && (
                    <>
                      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-zinc-950" />
                      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-zinc-950" />
                      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-zinc-950" />
                      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-zinc-950" />
                    </>
                  )}

                  <div className={`text-[9px] tracking-[0.3em] uppercase ${theme.textGold} mb-3`}>THE WEDDING OF</div>
                  <h1 className={`${theme.fontHead} text-4xl font-black capitalize leading-tight`}>
                    {wedding.groom.nickname} & {wedding.bride.nickname}
                  </h1>
                  <p className="text-xs text-muted-foreground mt-4 max-w-xs leading-relaxed">
                    Akan segera melangsungkan pernikahan pada hari bahagia kami.
                  </p>
                  
                  {/* Countdown live */}
                  <div className={`my-8 p-4 w-full max-w-xs mx-auto ${isMonochrome ? "bg-zinc-50 border border-zinc-950 rounded-none" : "rounded-2xl bg-gold-soft/20 border border-gold/10"}`}>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { v: countdown.days, l: "Hari" },
                        { v: countdown.hours, l: "Jam" },
                        { v: countdown.minutes, l: "Menit" },
                        { v: countdown.seconds, l: "Detik" },
                      ].map((item, idx) => (
                        <div key={idx} className={`rounded-xl p-2.5 text-center ${isMonochrome ? "bg-white border border-zinc-950 rounded-none" : "bg-background/80"}`}>
                          <div className={`${theme.fontHead} text-lg font-black ${theme.textGold}`}>
                            {item.v.toString().padStart(2, "0")}
                          </div>
                          <div className="text-[8px] text-muted-foreground uppercase font-bold mt-1">
                            {item.l}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground font-semibold">
                    Sabtu, 30 Mei 2026
                  </div>
                  <div className={`mt-8 ${isMonochrome ? "text-zinc-900 font-serif text-xl animate-pulse" : "text-gold text-2xl"}`}>
                    {isMonochrome ? "✦ ✦ ✦" : "💍"}
                  </div>
                </section>
              )}

              {/* TAB 2: MEMPELAI */}
              {activeTab === "Mempelai" && (
                <section className="p-6 space-y-6 text-center py-12 relative">
                  {isMonochrome && (
                    <>
                      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-zinc-950 pointer-events-none" />
                      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-zinc-950 pointer-events-none" />
                    </>
                  )}
                  <div className="space-y-2">
                    <p className={`${theme.fontHead} text-xl ${theme.textGold}`}>Assalamu'alaikum</p>
                    <p className="text-xs text-muted-foreground leading-relaxed italic max-w-sm mx-auto">
                      Dengan Rahmat Allah yang Maha Kuasa, InsyaAllah kami akan melangsungkan pernikahan pada:
                    </p>
                    <p className="text-xs font-semibold">Sabtu, 30 Mei 2026</p>
                  </div>

                  {/* Profil Pria */}
                  <div className={theme.cardBg}>
                    {isMonochrome && (
                      <>
                        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-zinc-950" />
                        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-zinc-950" />
                        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-zinc-950" />
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-zinc-950" />
                      </>
                    )}
                    <div className={`mx-auto h-20 w-20 flex items-center justify-center ${theme.fontHead} text-xl font-bold mb-3 ${theme.avatar}`}>
                      {((wedding.groom?.nickname || "G").charAt(0) || "G").toUpperCase()}
                    </div>
                    <div className={`${theme.fontHead} text-lg font-black capitalize`}>
                      {wedding.groom.fullName}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Putra dari <br />
                      <span className="font-semibold text-foreground">{wedding.groom.father}</span> &{" "}
                      <span className="font-semibold text-foreground">{wedding.groom.mother}</span>
                    </p>
                  </div>

                  {/* Profil Wanita */}
                  <div className={theme.cardBg}>
                    {isMonochrome && (
                      <>
                        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-zinc-950" />
                        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-zinc-950" />
                        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-zinc-950" />
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-zinc-950" />
                      </>
                    )}
                    <div className={`mx-auto h-20 w-20 flex items-center justify-center ${theme.fontHead} text-xl font-bold mb-3 ${theme.avatar}`}>
                      {((wedding.bride?.nickname || "B").charAt(0) || "B").toUpperCase()}
                    </div>
                    <div className={`${theme.fontHead} text-lg font-black capitalize`}>
                      {wedding.bride.fullName}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Putri dari <br />
                      <span className="font-semibold text-foreground">{wedding.bride.father}</span> &{" "}
                      <span className="font-semibold text-foreground">{wedding.bride.mother}</span>
                    </p>
                  </div>
                </section>
              )}

              {/* TAB 3: UNDANGAN (MENAMPILKAN ACARA & SELURUH FITUR TAMBAHAN SECARA SCROLLABLE) */}
              {activeTab === "Undangan" && (
                <section className="p-6 space-y-8 py-12 relative">
                  {isMonochrome && (
                    <>
                      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-zinc-950 pointer-events-none" />
                      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-zinc-950 pointer-events-none" />
                    </>
                  )}
                  <div className="text-center space-y-2">
                    <h2 className={`${theme.fontHead} text-2xl font-bold`}>Undangan dan Acara</h2>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                      Bahagia rasanya apabila anda berkenan hadir dan memberikan doa restu kepada kami. Kami mengundang anda untuk hadir dalam acara resepsi pernikahan kami berikut ini.
                    </p>
                  </div>

                  {/* Card Akad Nikah */}
                  <div className={theme.cardBg}>
                    {!isMonochrome && <div className="absolute top-0 inset-x-0 h-1 bg-gold" />}
                    {isMonochrome && (
                      <>
                        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-zinc-950" />
                        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-zinc-950" />
                        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-zinc-950" />
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-zinc-950" />
                      </>
                    )}
                    <h3 className={`${theme.fontHead} text-lg font-black`}>Akad Nikah</h3>
                    <div className="my-3 flex flex-col items-center justify-center gap-1 text-xs">
                      <div className={`flex items-center gap-1.5 font-semibold ${theme.textGold}`}>
                        <Calendar className="h-3.5 w-3.5" />
                        Sabtu, 30 Mei 2026
                      </div>
                      <div className="text-muted-foreground">Pukul 14:30 - 14:30 WIB</div>
                    </div>
                    <div className="text-[10px] text-muted-foreground flex justify-center items-start gap-1">
                      <MapPin className={`h-3.5 w-3.5 ${theme.textGold} shrink-0 mt-0.5`} />
                      <span>{wedding.akad.venue}</span>
                    </div>
                  </div>

                  {/* Card Resepsi */}
                  <div className={theme.cardBg}>
                    {!isMonochrome && <div className="absolute top-0 inset-x-0 h-1 bg-gold" />}
                    {isMonochrome && (
                      <>
                        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-zinc-950" />
                        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-zinc-950" />
                        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-zinc-950" />
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-zinc-950" />
                      </>
                    )}
                    <h3 className={`${theme.fontHead} text-lg font-black`}>Resepsi Pernikahan</h3>
                    <div className="my-3 flex flex-col items-center justify-center gap-1 text-xs">
                      <div className={`flex items-center gap-1.5 font-semibold ${theme.textGold}`}>
                        <Calendar className="h-3.5 w-3.5" />
                        Minggu, 31 Mei 2026
                      </div>
                      <div className="text-muted-foreground">Pukul 14:30 - 14:30 WIB</div>
                    </div>
                    <div className="text-[10px] text-muted-foreground flex justify-center items-start gap-1">
                      <MapPin className={`h-3.5 w-3.5 ${theme.textGold} shrink-0 mt-0.5`} />
                      <span>{wedding.resepsi.venue}</span>
                    </div>
                  </div>

                  {/* 1. SECT: CERITA CINTA (INLINE) */}
                  <div className={`border-t ${theme.borderGold} pt-6 space-y-4`}>
                    <h3 className={`${theme.fontHead} text-xl font-bold text-center flex items-center justify-center gap-1.5`}>
                      {isMonochrome ? "✦ Kisah Cinta Kami" : "💖 Kisah Cinta Kami"}
                    </h3>
                    {isFeatureLocked("Cerita") ? (
                      <div className={theme.cardBg}>
                        {isMonochrome && (
                          <>
                            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-zinc-950" />
                            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-zinc-950" />
                            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-zinc-950" />
                            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-zinc-950" />
                          </>
                        )}
                        <Lock className={`h-5 w-5 mx-auto ${theme.textGold}`} />
                        <div className="text-xs font-semibold">Fitur Cerita Terkunci</div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                          Fitur Cerita Cinta terkunci pada paket Sakinah. Upgrade untuk mengaktifkannya.
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-xs text-muted-foreground italic">
                        Belum ada cerita cinta yang dibagikan.
                      </div>
                    )}
                  </div>

                  {/* 2. SECT: FOTO GALERI (INLINE) */}
                  <div className={`border-t ${theme.borderGold} pt-6 space-y-4`}>
                    <h3 className={`${theme.fontHead} text-xl font-bold text-center flex items-center justify-center gap-1.5`}>
                      {isMonochrome ? "✦ Galeri Foto Bahagia" : "📸 Galeri Foto Bahagia"}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className={`aspect-square flex items-center justify-center text-[9px] text-muted-foreground font-semibold ${isMonochrome ? "bg-white border border-zinc-950 rounded-none" : "rounded-xl bg-gradient-to-br from-cream to-gold-soft/30 border border-gold/10"}`}>
                          Foto Galeri {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. SECT: KADO NIKAH (INLINE) */}
                  <div className={`border-t ${theme.borderGold} pt-6 space-y-4`}>
                    <h3 className={`${theme.fontHead} text-xl font-bold text-center flex items-center justify-center gap-1.5`}>
                      {isMonochrome ? "✦ Kado Digital (Cashless)" : "🎁 Kado Digital (Cashless)"}
                    </h3>
                    {isFeatureLocked("Kado") ? (
                      <div className={theme.cardBg}>
                        {isMonochrome && (
                          <>
                            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-zinc-950" />
                            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-zinc-950" />
                            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-zinc-950" />
                            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-zinc-950" />
                          </>
                        )}
                        <Lock className={`h-5 w-5 mx-auto ${theme.textGold}`} />
                        <div className="text-xs font-semibold">Fitur Kado Terkunci</div>
                        <p className="text-[10px] text-muted-foreground">
                          Kado digital eksklusif hanya aktif mulai paket Mawaddah.
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-2 text-xs text-muted-foreground italic">
                        Fitur Kado Digital Aktif (Silahkan kirim ke rekening tertera)
                      </div>
                    )}
                  </div>

                  {/* 4. SECT: DOA DAN HARAPAN (INLINE) */}
                  <div className={`border-t ${theme.borderGold} pt-6 space-y-4`}>
                    <h3 className={`${theme.fontHead} text-xl font-bold text-center flex items-center justify-center gap-1.5`}>
                      {isMonochrome ? "✦ Doa & Harapan Tamu" : "💬 Doa & Harapan Tamu"}
                    </h3>
                    {isFeatureLocked("Ucapan") ? (
                      <div className={theme.cardBg}>
                        {isMonochrome && (
                          <>
                            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-zinc-950" />
                            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-zinc-950" />
                            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-zinc-950" />
                            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-zinc-950" />
                          </>
                        )}
                        <Lock className={`h-5 w-5 mx-auto ${theme.textGold}`} />
                        <div className="text-xs font-semibold">Fitur Doa & RSVP Terkunci</div>
                        <p className="text-[10px] text-muted-foreground">
                          Tersedia mulai dari paket keanggotaan Mawaddah.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Form Doa */}
                        <form onSubmit={handleSendWish} className={`space-y-3 p-4 text-xs ${isMonochrome ? "bg-white border border-zinc-950 rounded-none" : "bg-cream/10 rounded-xl border border-border"}`}>
                          <div className="space-y-1">
                            <Label className="text-[9px]">Nama Anda</Label>
                            <Input
                              value={wishName}
                              onChange={(e) => setWishName(e.target.value)}
                              placeholder="Nama lengkap..."
                              className={`text-xs h-8 bg-background ${isMonochrome ? "rounded-none border-zinc-950" : ""}`}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-[9px]">Pesan Doa Restu</Label>
                            <Textarea
                              value={wishText}
                              onChange={(e) => setWishText(e.target.value)}
                              placeholder="Tulis ucapan selamat..."
                              className={`text-xs ${isMonochrome ? "rounded-none border-zinc-950" : ""}`}
                              rows={2}
                            />
                          </div>
                          <Button type="submit" className={`w-full ${theme.btn} h-8 py-0 flex items-center justify-center font-semibold`}>
                            Kirim Doa Restu
                          </Button>
                        </form>

                        {/* List Doa */}
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {wishes.map((w, idx) => (
                            <div key={idx} className={`p-3 text-[10px] space-y-1 ${isMonochrome ? "bg-white border border-zinc-950 rounded-none" : "bg-muted/30 rounded-lg border border-border/60"}`}>
                              <div className="font-bold flex justify-between items-center">
                                <span>{w.name}</span>
                                <Badge className={`text-[7px] h-3.5 font-bold px-1.5 ${theme.badge}`}>{w.relation || "Teman"}</Badge>
                              </div>
                              <p className="text-muted-foreground">"{w.text}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* TAB 4: MAP */}
              {activeTab === "Map" && (
                <section className="p-6 space-y-6 py-12 relative">
                  {isMonochrome && (
                    <>
                      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-zinc-950 pointer-events-none" />
                      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-zinc-950 pointer-events-none" />
                    </>
                  )}
                  <div className="text-center mb-2">
                    <h2 className={`${theme.fontHead} text-2xl font-bold`}>Peta Lokasi Acara</h2>
                  </div>

                  {/* Lokasi Akad */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Lokasi Akad Nikah</h3>
                    <div className={`p-4 space-y-3 ${isMonochrome ? "bg-white border border-zinc-950 rounded-none" : "rounded-xl border border-border bg-muted/20"}`}>
                      {isMapAddressUnset(wedding.akad.venue) ? (
                        <div className="text-xs text-muted-foreground text-center py-4 italic">Peta belum diatur</div>
                      ) : (
                        <>
                          <div className="text-xs font-semibold flex items-start gap-1.5">
                            <MapPin className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${theme.textGold}`} />
                            {wedding.akad.venue}
                          </div>
                          {renderMapPreview(wedding.akad.venue, wedding.akad.maps)}
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className={`w-full ${theme.btnOutline} py-2 h-auto`}
                            onClick={() => {
                              const url = wedding.akad.maps && wedding.akad.maps.startsWith("http") 
                                ? wedding.akad.maps 
                                : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding.akad.venue)}`;
                              window.open(url, "_blank");
                            }}
                          >
                            Buka Google Maps
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Lokasi Resepsi */}
                  <div className="space-y-2 pt-2">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Lokasi Resepsi Pernikahan</h3>
                    <div className={`p-4 space-y-3 ${isMonochrome ? "bg-white border border-zinc-950 rounded-none" : "rounded-xl border border-border bg-muted/20"}`}>
                      {isMapAddressUnset(wedding.resepsi.venue) ? (
                        <div className="text-xs text-muted-foreground text-center py-4 italic">Peta belum diatur</div>
                      ) : (
                        <>
                          <div className="text-xs font-semibold flex items-start gap-1.5">
                            <MapPin className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${theme.textGold}`} />
                            {wedding.resepsi.venue}
                          </div>
                          {renderMapPreview(wedding.resepsi.venue, wedding.resepsi.maps)}
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className={`w-full ${theme.btnOutline} py-2 h-auto`}
                            onClick={() => {
                              const url = wedding.resepsi.maps && wedding.resepsi.maps.startsWith("http") 
                                ? wedding.resepsi.maps 
                                : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding.resepsi.venue)}`;
                              window.open(url, "_blank");
                            }}
                          >
                            Buka Google Maps
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </section>
              )}
            </div>
            )}

            {/* FIXED BOTTOM NAVIGATION BAR (MAKSIMAL 4 NAVIGASI KUNCI) */}
            {selectedTemplate !== "t12" && selectedTemplate !== "t13" && (
              <nav className={`absolute inset-x-0 z-30 h-14 border-t flex items-center justify-around text-[10px] font-bold shadow-[0_-2px_10px_rgba(0,0,0,0.05)] select-none ${isMonochrome ? "bg-white border-zinc-950 text-zinc-900" : "bg-background border-border text-muted-foreground"} ${activePkg === "Sakinah" ? "bottom-5" : "bottom-0"}`}>
                {[
                  { tab: "Home", icon: HomeIcon },
                  { tab: "Mempelai", icon: Users },
                  { tab: "Undangan", icon: Calendar },
                  { tab: "Map", icon: Compass },
                ].map((item) => {
                  const isActive = activeTab === item.tab;
                  return (
                    <button
                      key={item.tab}
                      onClick={() => handleTabChange(item.tab)}
                      className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition relative
                        ${isActive ? (isMonochrome ? "text-zinc-950 font-black" : "text-gold") : (isMonochrome ? "text-zinc-400 hover:text-zinc-900 font-normal" : "hover:text-foreground")}`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.tab}</span>
                      {isActive && <span className={`absolute bottom-1 w-4 h-0.5 rounded-full ${isMonochrome ? "bg-zinc-950" : "bg-gold"}`} />}
                    </button>
                  );
                })}
              </nav>
            )}

            {/* WATERMARK KHUSUS PAKET GRATIS (SAKINAH) DI BAWAH BOTTOM BAR */}
            {activePkg === "Sakinah" && (
              <div className={`absolute bottom-0 inset-x-0 z-30 h-5 border-t flex items-center justify-center text-[8px] font-semibold select-none ${isMonochrome ? "bg-zinc-100 border-zinc-200 text-zinc-600" : "bg-rose-50 border-rose-100 text-rose-600 dark:bg-rose-950/30 dark:border-rose-900/40"}`}>
                Undangan ini dibuat gratis menggunakan <span className={`font-bold ml-1 ${isMonochrome ? "text-zinc-900" : "text-rose-700 dark:text-rose-400"}`}>{getBaseDomain()}</span>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
