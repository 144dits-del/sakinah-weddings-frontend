import { WeddingData } from "@/lib/dummy-data";

export interface SectionProps {
  data: WeddingData;
  variant?: string;
  guestName?: string;
  guestAddress?: string;
  onOpenInvitation?: () => void;
}
