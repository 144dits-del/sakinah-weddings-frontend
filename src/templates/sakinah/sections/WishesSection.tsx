import React, { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface WishItem {
  name: string;
  relation: string;
  text: string;
}

interface WishesSectionProps {
  theme: any;
  wishes: WishItem[];
  onAddWish: (wish: WishItem) => void;
}

export const WishesSection: React.FC<WishesSectionProps> = ({
  theme,
  wishes,
  onAddWish,
}) => {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("Teman / Sahabat");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      toast.error("Silakan isi nama dan ucapan Anda.");
      return;
    }
    onAddWish({ name, relation, text });
    setName("");
    setText("");
    toast.success("Terima kasih atas doa restu Anda!");
  };

  return (
    <section className="p-6 space-y-6 py-12 relative border-b border-border/40" id="wishes">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-1">
          <MessageSquare className={`h-6 w-6 ${theme.textGold}`} />
        </div>
        <h2 className={`${theme.fontHead} text-2xl font-bold`}>Kirim Doa Restu & RSVP</h2>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
          Berikan doa dan ucapan selamat untuk mengiringi kebahagiaan kami:
        </p>
      </div>

      {/* Form Ucapan */}
      <form onSubmit={handleSubmit} className={`space-y-3 p-4 text-xs ${theme.cardBg}`}>
        <div className="space-y-1 text-left">
          <Label className="text-[10px]">Nama Anda</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama Anda..."
            className="text-xs h-9 bg-background"
          />
        </div>

        <div className="space-y-1 text-left">
          <Label className="text-[10px]">Hubungan</Label>
          <Input
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            placeholder="Teman / Sahabat / Keluarga..."
            className="text-xs h-9 bg-background"
          />
        </div>

        <div className="space-y-1 text-left">
          <Label className="text-[10px]">Pesan Doa Restu</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tulis ucapan dan doa restu..."
            className="text-xs bg-background"
            rows={3}
          />
        </div>

        <Button type="submit" className={`w-full ${theme.btn} py-2 text-xs font-bold flex items-center justify-center gap-1.5`}>
          <Send className="h-3.5 w-3.5" />
          Kirim Doa Restu
        </Button>
      </form>

      {/* List Ucapan Live */}
      <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
        {wishes.map((w, idx) => (
          <div key={idx} className={`p-3.5 text-xs text-left space-y-1.5 ${theme.cardBg}`}>
            <div className="font-bold flex justify-between items-center">
              <span className="text-foreground">{w.name}</span>
              <Badge className={`text-[8px] font-bold px-2 py-0.5 ${theme.badge}`}>{w.relation || "Tamu"}</Badge>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">"{w.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};
