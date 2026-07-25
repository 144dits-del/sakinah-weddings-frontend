import React from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapSectionProps {
  venue: string;
  mapsUrl?: string;
  theme: any;
}

export const MapSection: React.FC<MapSectionProps> = ({
  venue,
  mapsUrl,
  theme,
}) => {
  const finalUrl = mapsUrl && mapsUrl.startsWith("http")
    ? mapsUrl
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue || "Gedung Utama / Masjid Agung")}`;

  return (
    <section className="p-6 space-y-6 text-center py-12 relative border-b border-border/40" id="map">
      <div className="space-y-2">
        <h2 className={`${theme.fontHead} text-2xl font-bold`}>Peta Lokasi Acara</h2>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
          Klik tombol di bawah ini untuk melihat rute petunjuk arah menuju lokasi acara via Google Maps:
        </p>
      </div>

      <div className={theme.cardBg}>
        <div className="text-xs font-semibold flex items-center justify-center gap-1.5 mb-4">
          <MapPin className={`h-4 w-4 shrink-0 ${theme.textGold}`} />
          <span>{venue || "Gedung Utama / Masjid Agung"}</span>
        </div>

        {/* Embedded Map Container */}
        <div className="w-full h-48 rounded-xl overflow-hidden border border-border mb-4 bg-muted flex items-center justify-center relative">
          <iframe 
            className="w-full h-full border-0"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(venue || "Masjid Agung")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            title="Lokasi Pernikahan"
            loading="lazy"
          />
        </div>

        <Button 
          size="sm" 
          variant="outline" 
          className={`w-full ${theme.btnOutline} py-2.5 text-xs font-bold flex items-center justify-center gap-2`}
          onClick={() => window.open(finalUrl, "_blank")}
        >
          <MapPin className="h-4 w-4" />
          Buka Google Maps
        </Button>
      </div>
    </section>
  );
};
