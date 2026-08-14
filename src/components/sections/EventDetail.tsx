import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionProps } from "./SectionProps";

export const EventDetail: React.FC<SectionProps> = ({ data }) => {
  const handleCalendar = (title: string, venue: string) => {
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent("Acara Pernikahan")}&location=${encodeURIComponent(venue)}`;
    window.open(calendarUrl, "_blank");
  };

  return (
    <section className="p-6 text-center space-y-6 py-10 border-b border-[var(--color-secondary)]/20 theme-container">
      <div className="space-y-2">
        <h2 className="theme-font-display text-2xl font-bold text-[var(--color-primary)]">Rangkaian Acara Pernikahan</h2>
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed max-w-sm mx-auto">
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk menghadiri acara kami:
        </p>
      </div>

      {/* Akad Nikah */}
      <div className="theme-card space-y-3">
        <div className="flex justify-center">
          <Calendar className="h-6 w-6 text-[var(--color-primary)]" />
        </div>
        <h3 className="theme-font-display text-lg font-bold text-[var(--color-text)]">Akad Nikah</h3>
        <div className="text-xs text-[var(--color-text-muted)] space-y-1">
          <p className="flex items-center justify-center gap-1 font-semibold">
            <Clock className="h-3.5 w-3.5" /> {data.akad.time}
          </p>
          <p className="font-bold text-[var(--color-text)]">{data.akad.date}</p>
          <p className="flex items-center justify-center gap-1 text-[11px]">
            <MapPin className="h-3.5 w-3.5 shrink-0" /> {data.akad.venue}
          </p>
        </div>
        <Button 
          variant="outline" 
          className="w-full text-xs font-semibold py-2 cursor-pointer border-[var(--color-secondary)] text-[var(--color-primary)] hover:bg-[var(--color-secondary)]/10"
          onClick={() => handleCalendar("Akad Nikah", data.akad.venue)}
        >
          📅 Simpan ke Google Calendar
        </Button>
      </div>

      {/* Resepsi */}
      <div className="theme-card space-y-3">
        <div className="flex justify-center">
          <Calendar className="h-6 w-6 text-[var(--color-primary)]" />
        </div>
        <h3 className="theme-font-display text-lg font-bold text-[var(--color-text)]">Resepsi Pernikahan</h3>
        <div className="text-xs text-[var(--color-text-muted)] space-y-1">
          <p className="flex items-center justify-center gap-1 font-semibold">
            <Clock className="h-3.5 w-3.5" /> {data.resepsi.time}
          </p>
          <p className="font-bold text-[var(--color-text)]">{data.resepsi.date}</p>
          <p className="flex items-center justify-center gap-1 text-[11px]">
            <MapPin className="h-3.5 w-3.5 shrink-0" /> {data.resepsi.venue}
          </p>
        </div>
        <Button 
          variant="outline" 
          className="w-full text-xs font-semibold py-2 cursor-pointer border-[var(--color-secondary)] text-[var(--color-primary)] hover:bg-[var(--color-secondary)]/10"
          onClick={() => handleCalendar("Resepsi Pernikahan", data.resepsi.venue)}
        >
          📅 Simpan ke Google Calendar
        </Button>
      </div>
    </section>
  );
};
