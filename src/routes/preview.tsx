import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { MobileFrame } from "@/components/preview/MobileFrame";
import { emptyWedding, getStoredWeddingData, type WeddingData } from "@/lib/dummy-data";

export const Route = createFileRoute("/preview")({
  validateSearch: (search) => z.object({
    theme: z.string().optional(),
    invitationId: z.string().optional(),
    to: z.string().optional(),
  }).parse(search),
  component: Preview,
});

function Preview() {
  const { theme: queryTheme, to } = Route.useSearch();
  const [wedding, setWedding] = useState<WeddingData>(emptyWedding);
  const [selectedTemplate, setSelectedTemplate] = useState(queryTheme || "t1");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const refresh = () => {
      const current = getStoredWeddingData();
      setWedding(current);
      setSelectedTemplate(queryTheme
        || (current.subdomain && localStorage.getItem(`sakinah_selected_template_${current.subdomain}`))
        || localStorage.getItem("sakinah_selected_template") || "t1");
      setLoaded(true);
    };
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("sakinah_template_changed", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("sakinah_template_changed", refresh);
    };
  }, [queryTheme]);

  return (
    <main className="min-h-screen bg-stone-950">
      <div className="mx-auto max-w-[430px] px-4 py-3 text-right">
        <Link to="/dashboard" search={{ tab: "Dashboard" }} className="text-sm text-stone-200 underline">Kembali ke Dashboard</Link>
      </div>
      {!loaded ? <p className="p-8 text-center text-white">Memuat pratinjau…</p>
        : !wedding.groom.fullName && !wedding.bride.fullName ? (
          <p className="p-8 text-center text-white">Isi data kedua mempelai di dashboard terlebih dahulu.</p>
        ) : (
          <MobileFrame themeId={selectedTemplate} weddingData={wedding} guestName={to || "Tamu Undangan"} />
        )}
    </main>
  );
}
