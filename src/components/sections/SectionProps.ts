import { InvitationData } from "@/lib/types/invitation-data";

export interface SectionProps {
  data: InvitationData;
  variant?: string;
  guestName?: string;
  guestAddress?: string;
  onOpenInvitation?: () => void;
}
