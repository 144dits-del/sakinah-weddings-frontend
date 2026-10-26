import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useEffect, useState } from "react";
import { MobileFrame } from "@/components/preview/MobileFrame";
import { getWeddingBySubdomain, type WeddingData } from "@/lib/dummy-data";

export const Route = createFileRoute("/kepada/$guest")({
  validateSearch: (search) => z.object({
    subdomain: z.string().optional()
  }).parse(search),
  component: KepadaGuest,
});

function KepadaGuest() {
  const { guest } = Route.useParams();
  const { subdomain: querySubdomain } = Route.useSearch();
  const [wedding, setWedding] = useState<WeddingData | null>(null);
  const [loaded, setLoaded] = useState(false);
  let guestName = "Tamu Kehormatan";
  let guestAddress = "";

  if (guest) {
    // Memisahkan nama tamu dan alamat dengan pemisah "-"
    // Contoh: Budi-Jakarta -> nama: "Budi", alamat: "Jakarta"
    // Contoh: Budi-Santoso-Bandung -> nama: "Budi Santoso", alamat: "Bandung"
    const decoded = decodeURIComponent(guest);
    const parts = decoded.split("-");
    if (parts.length > 1) {
      guestAddress = parts[parts.length - 1].replace(/_/g, " ");
      guestName = parts.slice(0, parts.length - 1).join(" ").replace(/_/g, " ");
    } else {
      guestName = decoded.replace(/_/g, " ");
    }
  }

  useEffect(() => {
    const host = window.location.hostname.toLowerCase();
    const domains = ["sakinahweb.id", "sakinahweb.lovable.app", "sakinah.studio"];
    const hosted = domains.find((domain) => host.endsWith(`.${domain}`));
    const fromHost = hosted ? host.slice(0, -(hosted.length + 1)) : "";
    const subdomain = querySubdomain || fromHost;
    setWedding(getWeddingBySubdomain(subdomain));
    setLoaded(true);
  }, [querySubdomain]);

  if (!loaded) return <main className="p-8 text-center">Memuat undangan…</main>;
  if (!wedding) {
    return <main className="min-h-screen flex items-center justify-center p-8 text-center">
      <div><h1 className="text-2xl font-serif">Undangan tidak ditemukan</h1>
        <p className="mt-3 text-sm">Periksa tautan undangan. Pratinjau lokal hanya tersedia di browser tempat undangan disimpan.</p>
      </div>
    </main>;
  }

  const selectedTheme = localStorage.getItem(`sakinah_selected_template_${wedding.subdomain}`)
    || localStorage.getItem("sakinah_selected_template") || "t1";
  return <MobileFrame themeId={selectedTheme} weddingData={wedding} guestName={guestName} guestAddress={guestAddress} />;
}
