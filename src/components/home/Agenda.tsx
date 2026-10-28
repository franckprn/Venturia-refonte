"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { agenda, BOOKING_EMBED_URL, BOOKING_URL } from "@/content/rendezvous";
import s from "./home.module.css";
import p from "./pages.module.css";

// Agenda cal.com intégré dans un iframe. Le lien « Ouvrir l'agenda » est
// dans la barre du cadre, toujours visible : si l'iframe reste vide
// (bloqueur, réseau), la réservation reste à un clic. Le message
// d'attente est sous l'iframe, recouvert par l'agenda dès qu'il
// s'affiche ; l'iframe n'est jamais masquée (onLoad peut passer avant
// l'hydratation et ne jamais être reçu).
export function Agenda() {
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const timeout = window.setTimeout(() => setSlow(true), 8000);
    return () => window.clearTimeout(timeout);
  }, [loaded]);

  return (
    <div className={`${s.panel} ${p.agenda}`}>
      <div className={`${s.panelHead} ${p.agendaHead}`}>
        <span>{agenda.label}</span>
        <span className={p.agendaMeta}>{agenda.meta}</span>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={p.agendaOpen}>
          {agenda.open}
          <ArrowUpRight aria-hidden="true" size={14} weight="bold" />
        </a>
      </div>
      <div className={p.agendaFrame}>
        <div className={p.agendaWaiting} aria-hidden={loaded}>
          <p>{slow ? agenda.slow : agenda.waiting}</p>
          {slow ? (
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={s.cta}>
              <span>{agenda.open}</span>
              <ArrowUpRight aria-hidden="true" size={18} weight="bold" className={s.ctaIcon} />
            </a>
          ) : null}
        </div>
        <iframe
          src={BOOKING_EMBED_URL}
          title={agenda.title}
          className={p.agendaIframe}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
