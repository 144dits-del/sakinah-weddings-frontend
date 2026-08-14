import React from "react";
import { CreditCard, Gift, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SectionProps } from "./SectionProps";

export const GiftSection: React.FC<SectionProps> = () => {
  const bankAccounts = [
    { bank: "Bank BCA", number: "1234 5678 90", owner: "Salma & Rizal" },
    { bank: "Bank Mandiri", number: "9876 5432 10", owner: "Salma & Rizal" },
  ];

  const handleCopy = (num: string, bank: string) => {
    navigator.clipboard.writeText(num.replace(/\s+/g, ""));
    toast.success(`Nomor Rekening ${bank} berhasil disalin!`);
  };

  return (
    <section className="p-6 text-center space-y-6 py-10 border-b border-[var(--color-secondary)]/20 theme-container">
      <div className="space-y-2">
        <div className="flex justify-center mb-1">
          <Gift className="h-6 w-6 text-[var(--color-primary)]" />
        </div>
        <h2 className="theme-font-display text-2xl font-bold text-[var(--color-primary)]">Kado Digital</h2>
        <p className="text-xs text-[var(--color-text-muted)] leading-relaxed max-w-sm mx-auto">
          Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberi hadiah:
        </p>
      </div>

      <div className="space-y-3">
        {bankAccounts.map((acc, idx) => (
          <div key={idx} className="theme-card">
            <div className="flex items-center justify-between mb-2 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-[var(--color-primary)]">
                <CreditCard className="h-4 w-4" /> {acc.bank}
              </span>
            </div>
            <div className="theme-font-display text-base font-bold text-[var(--color-primary)] tracking-wider my-2">
              {acc.number}
            </div>
            <div className="text-[10px] text-[var(--color-text-muted)]">a.n. {acc.owner}</div>
            <Button
              variant="outline"
              className="mt-3 w-full text-xs font-semibold py-2 cursor-pointer border-[var(--color-secondary)] text-[var(--color-primary)] flex items-center justify-center gap-1.5"
              onClick={() => handleCopy(acc.number, acc.bank)}
            >
              <Copy className="h-3.5 w-3.5" />
              Salin Nomor Rekening
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};
