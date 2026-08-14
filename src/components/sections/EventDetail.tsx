import React, { useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/primitives/SectionWrapper";
import { SectionProps } from "./SectionProps";

export const EventDetail: React.FC<SectionProps> = ({ data, variant = "card-stacked" }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!data.events || data.events.length === 0) return null;

  const formatDateLabel = (isoDate?: string) => {
    if (!isoDate) return "Sabtu, 19 Juli 2026";
    try {
      const d = new Date(isoDate);
      return d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    } catch {
      return isoDate;
    }
  };

  const handleOpenMaps = (mapUrl?: string, venueName?: string, venueAddress?: string) => {
    if (mapUrl && mapUrl.startsWith("http")) {
      window.open(mapUrl, "_blank");
    } else {
      const query = encodeURIComponent(`${venueName || ""} ${venueAddress || ""}`.trim());
      window.open(`https://maps.google.com/?q=${query}`, "_blank");
    }
  };

  const isTabSwitch = variant === "tab-switch" && data.events.length > 1;

  return (
    <SectionWrapper 
      id="event-detail" 
      subTitle="ACARA" 
      title="Rangkaian Acara Pernikahan"
    >
      {isTabSwitch ? (
        <div className="space-y-4">
          <div className="flex justify-center border-b border-[var(--color-secondary)]/20 pb-2 gap-2">
            {data.events.map((ev, idx) => (
              <button
                key={idx}
                type="button"
                className={`px-4 py-1.5 text-xs font-semibold rounded-full cursor-pointer transition ${activeTab === idx ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-secondary)]/40"}`}
                onClick={() => setActiveTab(idx)}
              >
                {ev.label}
              </button>
            ))}
          </div>

          {data.events[activeTab] && (
            <div className="theme-card space-y-3 text-center">
              <h3 className="theme-font-display text-lg font-bold text-[var(--color-text)]">
                {data.events[activeTab].label}
              </h3>
              <div className="text-xs text-[var(--color-text-muted)] space-y-1">
                <p className="flex items-center justify-center gap-1 font-semibold text-[var(--color-primary)]">
                  <Clock className="h-3.5 w-3.5" /> {data.events[activeTab].timeStart} {data.events[activeTab].timeEnd ? `- ${data.events[activeTab].timeEnd}` : ""}
                </p>
                <p className="font-bold text-[var(--color-text)]">{formatDateLabel(data.events[activeTab].date)}</p>
                <p className="font-semibold text-[var(--color-text)]">{data.events[activeTab].venueName}</p>
                <p className="text-[11px] flex items-center justify-center gap-1">
                  <MapPin className="h-3.5 w-3.5 shrink-0" /> {data.events[activeTab].venueAddress}
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full text-xs font-semibold py-2 cursor-pointer border-[var(--color-secondary)] text-[var(--color-primary)] flex items-center justify-center gap-1.5"
                onClick={() => handleOpenMaps(data.events[activeTab].mapUrl, data.events[activeTab].venueName, data.events[activeTab].venueAddress)}
              >
                <MapPin className="h-3.5 w-3.5" />
                Lihat Lokasi Google Maps
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {data.events.map((ev, idx) => (
            <div key={idx} className="theme-card space-y-3 text-center">
              <div className="flex justify-center">
                <Calendar className="h-6 w-6 text-[var(--color-primary)]" />
              </div>
              <h3 className="theme-font-display text-lg font-bold text-[var(--color-text)]">{ev.label}</h3>
              <div className="text-xs text-[var(--color-text-muted)] space-y-1">
                <p className="flex items-center justify-center gap-1 font-semibold text-[var(--color-primary)]">
                  <Clock className="h-3.5 w-3.5" /> {ev.timeStart} {ev.timeEnd ? `- ${ev.timeEnd}` : ""}
                </p>
                <p className="font-bold text-[var(--color-text)]">{formatDateLabel(ev.date)}</p>
                <p className="font-semibold text-[var(--color-text)]">{ev.venueName}</p>
                <p className="text-[11px] flex items-center justify-center gap-1">
                  <MapPin className="h-3.5 w-3.5 shrink-0" /> {ev.venueAddress}
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full text-xs font-semibold py-2 cursor-pointer border-[var(--color-secondary)] text-[var(--color-primary)] flex items-center justify-center gap-1.5"
                onClick={() => handleOpenMaps(ev.mapUrl, ev.venueName, ev.venueAddress)}
              >
                <MapPin className="h-3.5 w-3.5" />
                Lihat Lokasi Google Maps
              </Button>
            </div>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
};
