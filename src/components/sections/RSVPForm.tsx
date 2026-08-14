import React, { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SectionWrapper } from "@/components/primitives/SectionWrapper";
import { SectionProps } from "./SectionProps";

export const RSVPForm: React.FC<SectionProps> = ({ data, guestName }) => {
  if (data.rsvp?.enabled === false) return null;

  const [name, setName] = useState(guestName || data.guest?.name || "");
  const [attendance, setAttendance] = useState("Hadir");
  const [pax, setPax] = useState("1");
  const [text, setText] = useState("");

  const [wishes, setWishes] = useState([
    { name: "Ahmad Rizky", status: "Hadir", text: "Selamat untuk mempelai! Semoga bahagia dunia akhirat, aamiin!" },
    { name: "Siti Nurhaliza", status: "Hadir", text: "Selamat ya! Langgeng selalu sampai kakek nenek!" },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      toast.error("Silakan isi nama dan ucapan.");
      return;
    }
    setWishes((prev) => [{ name, status: attendance, text }, ...prev]);
    setText("");
    toast.success("Terima kasih atas ucapan & konfirmasi Anda!");
  };

  return (
    <SectionWrapper id="rsvp" subTitle="RSVP" title="Konfirmasi Kehadiran & Doa Restu">
      <form onSubmit={handleSubmit} className="theme-card space-y-3 text-left">
        <div className="space-y-1">
          <Label className="text-[10px] text-[var(--color-text-muted)]">Nama Anda</Label>
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Nama lengkap..." 
            className="text-xs h-9 bg-[var(--color-surface)] border-[var(--color-secondary)]/40 text-[var(--color-text)]"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-[10px] text-[var(--color-text-muted)]">Status Kehadiran</Label>
            <select
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className="w-full h-9 text-xs rounded-md border border-[var(--color-secondary)]/40 bg-[var(--color-surface)] text-[var(--color-text)] px-2"
            >
              <option value="Hadir">Hadir</option>
              <option value="Tidak Hadir">Tidak Hadir</option>
              <option value="Ragu-ragu">Ragu-ragu</option>
            </select>
          </div>

          <div className="space-y-1">
            <Label className="text-[10px] text-[var(--color-text-muted)]">Jumlah Tamu</Label>
            <select
              value={pax}
              onChange={(e) => setPax(e.target.value)}
              className="w-full h-9 text-xs rounded-md border border-[var(--color-secondary)]/40 bg-[var(--color-surface)] text-[var(--color-text)] px-2"
            >
              <option value="1">1 Orang</option>
              <option value="2">2 Orang</option>
              <option value="3">3 Orang</option>
              <option value="4+">4+ Orang</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-[10px] text-[var(--color-text-muted)]">Pesan Doa Restu</Label>
          <Textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Tulis ucapan..." 
            className="text-xs bg-[var(--color-surface)] border-[var(--color-secondary)]/40 text-[var(--color-text)]" 
            rows={3} 
          />
        </div>

        <Button type="submit" className="w-full theme-btn-primary py-2 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer">
          <Send className="h-3.5 w-3.5" />
          Kirim Konfirmasi & Doa
        </Button>
      </form>

      {/* List Ucapan */}
      <div className="space-y-2 max-h-56 overflow-y-auto pr-1 mt-4">
        {wishes.map((w, idx) => (
          <div key={idx} className="theme-card p-3 text-xs text-left space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[var(--color-primary)]">{w.name}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--color-secondary)]/20 text-[var(--color-primary)] font-semibold">{w.status}</span>
            </div>
            <p className="text-[var(--color-text-muted)] text-[11px]">"{w.text}"</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};
