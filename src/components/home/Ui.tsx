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
  demo,
  children,
  className,
}: {
  label: string;
  meta?: string;
  demo?: boolean;
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
      {demo ? <p className={s.panelDemo}>Données de démonstration</p> : null}
    </div>
  );
}

export function Art({
  painting,
  sizes,
  className,
  priority,
  parallax,
  ratio,
}: {
  painting: Painting;
  sizes: string;
  className?: string;
  priority?: boolean;
  parallax?: boolean;
  /** Ratio du cadre ; par défaut 4/5. "native" : celui du tableau. */
  ratio?: string;
}) {
  return (
    <figure className={`${s.art} ${className ?? ""}`}>
      <div
        className={s.artFrame}
        style={ratio ? { aspectRatio: ratio === "native" ? `${painting.width} / ${painting.height}` : ratio } : undefined}
      >
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

// Typographie française au rendu : espace insécable avant ? ! : ; »,
// après «, et entre un nombre et ce qui le suit (« 48 h », « 20 min »).
// Espace insécable pleine (U+00A0) : Archivo n'a pas l'espace fine.
export function fr(text: string): string {
  return text
    .replace(/ ([?!:;»])/g, "\u00a0$1")
    .replace(/« /g, "«\u00a0")
    .replace(/(\d) (?=[\p{L}\d€%])/gu, "$1\u00a0");
}

// Un mot composé (« mots-clés », « sur-mesure ») reste sur une ligne :
// le navigateur coupe sinon au trait d'union.
export function keepWords(text: string): React.ReactNode {
  const parts = fr(text).split(/(\S*\p{L}-\p{L}\S*)/u);
  return parts.length === 1
    ? parts[0]
    : parts.map((part, i) => (i % 2 ? <span key={i} className={s.nowrap}>{part}</span> : part));
}
