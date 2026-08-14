import React from "react";
import { CreditCard, Gift, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SectionWrapper } from "@/components/primitives/SectionWrapper";
import { SectionProps } from "./SectionProps";

export const GiftSection: React.FC<SectionProps> = ({ data }) => {
  if (data.gift?.enabled === false) return null;
  if (!data.gift?.banks || data.gift.banks.length === 0) return null;

  const handleCopy = (num: string, bank: string) => {
    navigator.clipboard.writeText(num.replace(/\s+/g, ""));
    toast.success(`Nomor Rekening ${bank} berhasil disalin!`);
  };

  return (
    <SectionWrapper id="gift" subTitle="AMPLOP DIGITAL" title="Kado Digital / Amplop Cashless">
      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed max-w-sm mx-auto text-center mb-4">
        Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberi hadiah:
      </p>

      <div className="space-y-3">
        {data.gift.banks.map((acc, idx) => (
          <div key={idx} className="theme-card text-center">
            <div className="flex items-center justify-between mb-1 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-[var(--color-primary)]">
                <CreditCard className="h-4 w-4" /> {acc.bankName}
              </span>
            </div>
            <div className="theme-font-display text-base font-bold text-[var(--color-primary)] tracking-wider my-2">
              {acc.accountNumber}
            </div>
            <div className="text-[10px] text-[var(--color-text-muted)]">a.n. {acc.accountHolder}</div>
            <Button
              variant="outline"
              className="mt-3 w-full text-xs font-semibold py-2 cursor-pointer border-[var(--color-secondary)] text-[var(--color-primary)] flex items-center justify-center gap-1.5"
              onClick={() => handleCopy(acc.accountNumber, acc.bankName)}
            >
              <Copy className="h-3.5 w-3.5" />
              Salin Nomor Rekening
            </Button>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};
