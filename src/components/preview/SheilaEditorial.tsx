import React from "react";
import type { InvitationData } from "@/lib/types/invitation-data";

interface EditorialProps {
  data: InvitationData;
  guestName?: string;
  guestAddress?: string;
  onOpenInvitation?: () => void;
  page: "cover" | "contents";
}

const dateLabel = (value?: string) => {
  if (!value) return "Tanggal menyusul";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta",
  }).format(date);
};

const locationHref = (mapUrl: string | undefined, venue: string) =>
  mapUrl && /^https?:\/\//i.test(mapUrl)
    ? mapUrl
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`;

/** An original, typography-led manuscript layout; no reference-site media is used. */
export const SheilaEditorial: React.FC<EditorialProps> = ({
  data,
  guestName,
  guestAddress,
  onOpenInvitation,
  page,
}) => {
  const couple = data.couple;
  const firstEvent = data.events[0];
  const names = `${couple.bride.nickname || couple.bride.fullName} & ${couple.groom.nickname || couple.groom.fullName}`;

  if (page === "cover") {
    return (
      <section className="editorial-cover" aria-label="Sampul undangan">
        <div className="editorial-cover__border">
          <p className="editorial-kicker">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <span className="editorial-rule" aria-hidden="true" />
          <p className="editorial-eyebrow">Sebuah undangan pernikahan</p>
          <h1 className="editorial-cover__names">{couple.bride.nickname || couple.bride.fullName}<em>&amp;</em>{couple.groom.nickname || couple.groom.fullName}</h1>
          <p className="editorial-cover__date">{dateLabel(firstEvent?.date)}</p>
          <div className="editorial-cover__recipient">
            <span>Kepada Yth.</span>
            <strong>{guestName || data.guest?.name || "Tamu Undangan"}</strong>
            {guestAddress && <span>di {guestAddress}</span>}
          </div>
          <button type="button" className="editorial-button" onClick={onOpenInvitation}>
            Buka Undangan <span aria-hidden="true">↗</span>
          </button>
          <p className="editorial-folio">01 / UNDANGAN</p>
        </div>
      </section>
    );
  }

  return (
    <article className="editorial-story" aria-label={`Undangan pernikahan ${names}`}>
      <section className="editorial-story__intro">
        <p className="editorial-kicker">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <p className="editorial-eyebrow">Dengan rahmat Allah SWT</p>
        <h2>{names}</h2>
        <span className="editorial-rule" aria-hidden="true" />
        <p>Kami mengundang {guestName || "Bapak/Ibu/Saudara/i"} untuk hadir dan memberikan doa restu pada hari bahagia kami.</p>
      </section>

      {data.openingQuote?.text && (
        <section className="editorial-story__quote" aria-label="Ayat pilihan">
          <span className="editorial-folio">02 / FIRMAN-NYA</span>
          <blockquote>“{data.openingQuote.text}”</blockquote>
          {data.openingQuote.source && <cite>{data.openingQuote.source}</cite>}
        </section>
      )}

      <section className="editorial-story__couple" aria-labelledby="editorial-couple-title">
        <p className="editorial-eyebrow">Dua insan, satu perjalanan</p>
        <h2 id="editorial-couple-title">Mempelai</h2>
        <div className="editorial-story__people">
          <div><span className="editorial-folio">01 / MEMPELAI WANITA</span><h3>{couple.bride.fullName}</h3><p>{couple.bride.parentInfo}</p></div>
          <span className="editorial-ampersand" aria-hidden="true">&amp;</span>
          <div><span className="editorial-folio">02 / MEMPELAI PRIA</span><h3>{couple.groom.fullName}</h3><p>{couple.groom.parentInfo}</p></div>
        </div>
      </section>

      {data.events.length > 0 && (
        <section className="editorial-story__events" aria-labelledby="editorial-events-title">
          <p className="editorial-eyebrow">Waktu & tempat</p>
          <h2 id="editorial-events-title">Rangkaian acara</h2>
          {data.events.map((event, index) => (
            <div className="editorial-story__event" key={`${event.label}-${index}`}>
              <span className="editorial-folio">{String(index + 1).padStart(2, "0")} / ACARA</span>
              <div><h3>{event.label}</h3><p>{dateLabel(event.date)}</p></div>
              <div><p>{event.timeStart}{event.timeEnd && event.timeEnd !== event.timeStart ? ` – ${event.timeEnd}` : ""}</p><p>{event.venueName}</p><p>{event.venueAddress !== event.venueName ? event.venueAddress : ""}</p></div>
              {event.venueName && <a href={locationHref(event.mapUrl, event.venueName)} target="_blank" rel="noopener noreferrer" aria-label={`Lihat lokasi ${event.label}`}>Lihat lokasi ↗</a>}
            </div>
          ))}
        </section>
      )}

      <footer className="editorial-story__footer">
        <span className="editorial-rule" aria-hidden="true" />
        <p>Kehadiran dan doa restu Anda adalah hadiah yang berarti bagi kami.</p>
        <h2>{names}</h2>
        <span className="editorial-folio">AKHIR / TERIMA KASIH</span>
      </footer>
    </article>
  );
};
