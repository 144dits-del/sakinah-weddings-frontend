export interface PersonProfile {
  fullName: string;
  nickname: string;
  photoUrl?: string;
  parentInfo: string;
  instagram?: string;
}

export interface EventItem {
  label: string;
  date: string;
  timeStart: string;
  timeEnd?: string;
  venueName: string;
  venueAddress: string;
  mapUrl?: string;
}

export interface LoveStoryItem {
  date?: string;
  title: string;
  description: string;
  photoUrl?: string;
}

export interface InvitationData {
  meta: {
    slug: string;
    theme: string;
    language: "id" | "en";
  };
  couple: {
    groom: PersonProfile;
    bride: PersonProfile;
    hashtag?: string;
  };
  cover: {
    coverImageUrl: string;
    greetingText?: string;
  };
  openingQuote?: {
    text: string;
    source?: string;
  };
  events: EventItem[];
  loveStory?: LoveStoryItem[];
  gallery?: {
    images: { url: string; caption?: string }[];
  };
  rsvp?: {
    enabled: boolean;
    deadline?: string;
  };
  gift?: {
    enabled: boolean;
    banks: { bankName: string; accountNumber: string; accountHolder: string }[];
    addresses?: { label: string; recipient: string; address: string }[];
  };
  guest?: {
    name: string;
  };
  music?: {
    url: string;
    autoplayOnOpen: boolean;
  };
}
