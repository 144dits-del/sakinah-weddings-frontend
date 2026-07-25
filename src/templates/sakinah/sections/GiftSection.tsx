import React from "react";
import { CreditCard, Gift, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface GiftSectionProps {
  theme: any;
}

export const GiftSection: React.FC<GiftSectionProps> = ({ theme }) => {
  const bankAccounts = [
    { bank: "Bank BCA", number: "1234 5678 90", owner: "Salma & Rizal" },
    { bank: "Bank Mandiri", number: "9876 5432 10", owner: "Salma & Rizal" },
    { bank: "Bank BSI", number: "7123 4567 89", owner: "Salma & Rizal" },
  ];

  const handleCopyNumber = (num: string, bank: string) => {
    navigator.clipboard.writeText(num.replace(/\s+/g, ""));
    toast.success(`Nomor Rekening ${bank} berhasil disalin!`);
  };

  return (
    <section className="p-6 space-y-6 text-center py-12 relative border-b border-border/40" id="gift">
      <div className="space-y-2">
        <div className="flex justify-center mb-1">
          <Gift className={`h-6 w-6 ${theme.textGold}`} />
        </div>
        <h2 className={`${theme.fontHead} text-2xl font-bold`}>Kado Digital / Amplop Cashless</h2>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
          Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberi hadiah, kami menyediakan Rekening Kado Digital berikut:
        </p>
      </div>

      <div className="space-y-3">
        {bankAccounts.map((acc, idx) => (
          <div key={idx} className={theme.cardBg}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 font-bold text-xs">
                <CreditCard className="h-4 w-4 text-amber-500" />
                <span>{acc.bank}</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider font-semibold text-muted-foreground">Virtual Card</span>
            </div>
            
            <div className={`${theme.fontHead} text-lg font-bold ${theme.textGold} tracking-wider my-2`}>
              {acc.number}
            </div>
            <div className="text-[10px] text-muted-foreground">a.n. {acc.owner}</div>
            
            <Button 
              size="sm" 
              variant="outline" 
              className={`mt-3 w-full ${theme.btnOutline} py-2 text-[10px] font-bold flex items-center justify-center gap-1.5`}
              onClick={() => handleCopyNumber(acc.number, acc.bank)}
            >
              <Copy className="h-3 w-3" />
              Salin Nomor Rekening
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};
