import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { notFound } from "@/content/rendezvous";
import { Art, Rule, keepWords } from "@/components/home/Ui";
import { ART } from "@/content/paintings";
import s from "@/components/home/home.module.css";
import p from "@/components/home/pages.module.css";

export const metadata: Metadata = {
  title: { absolute: "Erreur 404 | Venturia" },
};

// Page courte : la rue de Caillebotte (le passant qui cherche son
// chemin) et les six adresses du site, en grand.
export default function NotFound() {
  return (
    <div className={s.page} data-v2>
      <section className={p.lost} aria-labelledby="lost-title" data-tone="light">
        <div className={p.lostHead}>
          <Rule label={notFound.label} />
          <h1 id="lost-title" className={`${s.h2Giant} ${p.lostTitle}`}>
            {keepWords(notFound.title)}
          </h1>
          <p className={s.heroSub}>{keepWords(notFound.sub)}</p>
        </div>
        <Art painting={ART.lost} sizes="(max-width: 899px) 100vw, 33vw" className={p.lostArt} />
        <nav aria-label="Pages principales" className={p.lostNav}>
          <ul>
            {notFound.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={p.lostLink}>
                  <span className={p.lostLabel}>
                    {l.label}
                    <ArrowUpRight aria-hidden="true" weight="bold" className={s.serviceArrow} />
                  </span>
                  <span className={s.mono}>{keepWords(l.note)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </div>
  );
}
