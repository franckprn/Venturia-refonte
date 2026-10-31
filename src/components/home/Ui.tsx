import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Painting } from "@/content/paintings";
import s from "./home.module.css";

// Les composants de la direction, répétés partout : le filet titré
// (Rule), le bouton (Cta), la carte d'interface (Panel) et le tableau
// légendé (Art).

export function Rule({ label, tone }: { label: string; tone?: "dark" }) {
  return (
    <p className={s.rule} data-tone={tone}>
      <span>{label}</span>
    </p>
  );
}

export function Cta({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "line";
}) {
  const className = variant === "solid" ? s.cta : s.ctaLine;
  const content = (
    <>
      <span>{typeof children === "string" ? fr(children) : children}</span>
      <ArrowUpRight aria-hidden="true" size={18} weight="bold" className={s.ctaIcon} />
    </>
  );
  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export function Panel({
  label,
  meta,
  children,
  className,
}: {
  label: string;
  meta?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${s.panel} ${className ?? ""}`}>
      <div className={s.panelHead}>
        <span>{label}</span>
        {meta ? <span>{meta}</span> : null}
      </div>
      <div className={s.panelBody}>{children}</div>
    </div>
  );
}

// Tableau légendé, toujours à ses proportions réelles (jamais recadré) :
// le cadre prend le ratio de l'image, object-fit: cover n'y coupe rien.
export function Art({
  painting,
  sizes,
  className,
  priority,
  parallax,
}: {
  painting: Painting;
  sizes: string;
  className?: string;
  priority?: boolean;
  parallax?: boolean;
}) {
  return (
    <figure className={`${s.art} ${className ?? ""}`}>
      <div className={s.artFrame} style={{ aspectRatio: `${painting.width} / ${painting.height}` }}>
        <Image
          src={painting.src}
          alt={painting.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={s.cover}
          data-parallax={parallax ? "" : undefined}
        />
      </div>
      <figcaption className={s.artCaption}>
        <Caption painting={painting} />
      </figcaption>
    </figure>
  );
}

// Légende d'un tableau : titre, auteur, année.
export function Caption({ painting }: { painting: Painting }) {
  return (
    <>
      <cite>{fr(painting.title)}</cite>, {painting.author}, {painting.year}
    </>
  );
}

// Typographie française au rendu : espace fine insécable (U+202F) avant
// ? ! : ; et entre les tranches de milliers ; espace insécable (U+00A0)
// avant € et %, après « et avant », et entre un nombre et l'unité qui le
// suit (« 48 h », « 20 min »).
export function fr(text: string): string {
  return text
    .replace(/ ([?!:;])/g, "\u202f$1")
    .replace(/ »/g, "\u00a0»")
    .replace(/« /g, "«\u00a0")
    .replace(/(\d) (?=\d{3}(?!\d))/g, "$1\u202f")
    .replace(/(\d) (?=[\p{L}€%])/gu, "$1\u00a0")
    .replace(/ (?=[€%])/g, "\u00a0");
}

// Un mot composé (« mots-clés », « sur-mesure ») reste sur une ligne :
// le navigateur coupe sinon au trait d'union.
export function keepWords(text: string): React.ReactNode {
  const parts = fr(text).split(/(\S*\p{L}-\p{L}\S*)/u);
  return parts.length === 1
    ? parts[0]
    : parts.map((part, i) => (i % 2 ? <span key={i} className={s.nowrap}>{part}</span> : part));
}
