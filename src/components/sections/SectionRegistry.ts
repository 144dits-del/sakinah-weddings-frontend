import React from "react";
import { SectionProps } from "./SectionProps";
import { Cover } from "./Cover";
import { OpeningQuote } from "./OpeningQuote";
import { CoupleProfile } from "./CoupleProfile";
import { EventDetail } from "./EventDetail";
import { CountdownTimer } from "./CountdownTimer";
import { LoveStory } from "./LoveStory";
import { GallerySection } from "./GallerySection";
import { RSVPForm } from "./RSVPForm";
import { GiftSection } from "./GiftSection";
import { Footer } from "./Footer";

export const SECTION_REGISTRY: Record<string, React.ComponentType<SectionProps>> = {
  "cover": Cover,
  "opening-quote": OpeningQuote,
  "couple-profile": CoupleProfile,
  "event-detail": EventDetail,
  "countdown": CountdownTimer,
  "love-story": LoveStory,
  "gallery": GallerySection,
  "rsvp": RSVPForm,
  "gift": GiftSection,
  "footer": Footer,
};
