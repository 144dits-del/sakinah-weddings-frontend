import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeddingData } from "@/lib/dummy-data";

interface EventSectionProps {
  wedding: WeddingData;
  theme: any;
  formatDate: (date: string) => string;
}

export const EventSection: React.FC<EventSectionProps> = ({
  wedding,
  theme,
  formatDate,
}) => {
  const handleAddToCalendar = (title: string, dateStr: string, venue: string) => {
    const eventDate = new Date(dateStr || "2026-07-19");
    const startTime = eventDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startTime}/${startTime}&details=${encodeURIComponent("Acara Pernikahan")}&location=${encodeURIComponent(venue)}`;
    window.open(calendarUrl, "_blank");
  };

  return (
    <section className="p-6 space-y-6 text-center py-12 relative border-b border-border/40" id="acara">
      <div className="space-y-2">
        <h2 className={`${theme.fontHead} text-2xl font-bold`}>Rangkaian Acara Pernikahan</h2>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara kami:
        </p>
      </div>

      {/* Card Akad Nikah */}
      <div className={theme.cardBg}>
        <div className="flex justify-center mb-2">
          <Calendar className={`h-6 w-6 ${theme.textGold}`} />
        </div>
        <h3 className={`${theme.fontHead} text-lg font-bold text-foreground`}>Akad Nikah</h3>
        <div className="text-xs text-muted-foreground mt-3 space-y-2">
          <p className="flex items-center justify-center gap-1.5 font-semibold">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            {wedding.akad.start || "08:00 WIB - Selesai"}
          </p>
          <p className="font-bold text-foreground">
            {formatDate(wedding.akad.date) || "Minggu, 19 Juli 2026"}
          </p>
          <p className="flex items-center justify-center gap-1 text-[11px]">
            <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            {wedding.akad.venue || "Gedung Utama / Masjid Agung"}
          </p>
        </div>

        <Button 
          size="sm" 
          variant="outline" 
          className={`mt-4 w-full ${theme.btnOutline} py-2 text-xs font-semibold`}
          onClick={() => handleAddToCalendar("Akad Nikah Salma & Rizal", wedding.akad.date, wedding.akad.venue)}
        >
          📅 Simpan ke Google Calendar
        </Button>
      </div>

      {/* Card Resepsi Pernikahan */}
      <div className={theme.cardBg}>
        <div className="flex justify-center mb-2">
          <Calendar className={`h-6 w-6 ${theme.textGold}`} />
        </div>
        <h3 className={`${theme.fontHead} text-lg font-bold text-foreground`}>Resepsi Pernikahan</h3>
        <div className="text-xs text-muted-foreground mt-3 space-y-2">
          <p className="flex items-center justify-center gap-1.5 font-semibold">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            {wedding.resepsi.start || "11:00 WIB - Selesai"}
          </p>
          <p className="font-bold text-foreground">
            {formatDate(wedding.resepsi.date) || "Minggu, 19 Juli 2026"}
          </p>
          <p className="flex items-center justify-center gap-1 text-[11px]">
            <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            {wedding.resepsi.venue || "Gedung Utama / Masjid Agung"}
          </p>
        </div>

        <Button 
          size="sm" 
          variant="outline" 
          className={`mt-4 w-full ${theme.btnOutline} py-2 text-xs font-semibold`}
          onClick={() => handleAddToCalendar("Resepsi Pernikahan Salma & Rizal", wedding.resepsi.date, wedding.resepsi.venue)}
        >
          📅 Simpan ke Google Calendar
        </Button>
      </div>
    </section>
  );
};
