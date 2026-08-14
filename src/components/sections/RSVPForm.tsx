import React, { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SectionProps } from "./SectionProps";

export const RSVPForm: React.FC<SectionProps> = () => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [wishes, setWishes] = useState([
    { name: "Ahmad Rizky", text: "Selamat untuk mempelai! Semoga bahagia dunia akhirat, aamiin!" },
    { name: "Siti Nurhaliza", text: "Selamat ya! Langgeng selalu sampai kakek nenek!" },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      toast.error("Silakan isi nama dan ucapan.");
      return;
    }
    setWishes((prev) => [{ name, text }, ...prev]);
    setName("");
    setText("");
    toast.success("Terima kasih atas doa restu Anda!");
  };

  return (
    <section className="p-6 space-y-6 py-10 border-b border-[var(--color-secondary)]/20 theme-container">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-1">
          <MessageSquare className="h-6 w-6 text-[var(--color-primary)]" />
        </div>
        <h2 className="theme-font-display text-2xl font-bold text-[var(--color-primary)]">Kirim Doa Restu & RSVP</h2>
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed max-w-sm mx-auto">
          Berikan doa dan ucapan selamat untuk mengiringi kebahagiaan kami:
        </p>
      </div>

      <form onSubmit={handleSubmit} className="theme-card space-y-3 text-left">
        <div className="space-y-1">
          <Label className="text-[10px] text-[var(--color-text-muted)]">Nama Anda</Label>
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Nama lengkap..." 
            className="text-xs h-9 bg-[var(--color-surface)] border-[var(--color-secondary)]/40"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-[10px] text-[var(--color-text-muted)]">Pesan Doa Restu</Label>
          <Textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Tulis ucapan..." 
            className="text-xs bg-[var(--color-surface)] border-[var(--color-secondary)]/40" 
            rows={3} 
          />
        </div>
        <Button type="submit" className="w-full theme-btn-primary py-2 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer">
          <Send className="h-3.5 w-3.5" />
          Kirim Doa Restu
        </Button>
      </form>

      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {wishes.map((w, idx) => (
          <div key={idx} className="theme-card p-3 text-xs text-left space-y-1">
            <span className="font-bold text-[var(--color-primary)] block">{w.name}</span>
            <p className="text-[var(--color-text-muted)] text-[11px]">"{w.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};
