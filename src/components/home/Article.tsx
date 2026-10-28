import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { slugifyHeading } from "@/lib/blog";
import type { ArticleBlock } from "@/content/blog/types";
import { PAINTINGS, type Painting } from "./photos";
import { keepWords } from "./Ui";
import p from "./pages.module.css";

// Rubrique → tableau : l'affiche pour la publicité, la rue pour le
// référencement, la vitrine pour le site, l'atelier pour l'automatisation.
export function paintingFor(category: string): Painting {
  const c = category.toLowerCase();
  if (c.includes("ads") || c.includes("publicit")) return PAINTINGS.affiche;
  if (c.includes("seo") || c.includes("référencement") || c.includes("geo")) return PAINTINGS.rue;
  if (c.includes("site")) return PAINTINGS.vitrine;
  if (c.includes("automat")) return PAINTINGS.atelier;
  return PAINTINGS.marche;
}

// Ids d'ancre des H2, calculés une fois : le sommaire et le corps lisent
// la même liste, ils ne peuvent pas diverger.
export function headingsOf(blocks: ArticleBlock[]) {
  const seen = new Set<string>();
  return blocks.flatMap((block, index) => {
    if (block.type !== "h2") return [];
    const base = block.id ?? slugifyHeading(block.text);
    let id = base;
    for (let n = 2; seen.has(id); n++) id = `${base}-${n}`;
    seen.add(id);
    return [{ index, id, text: block.text }];
  });
}

export function Toc({ headings }: { headings: { id: string; text: string }[] }) {
  return (
    <nav aria-labelledby="toc-title" className={p.toc}>
      <p id="toc-title" className={p.tocTitle}>
        Sommaire
      </p>
      <ol className={p.tocList}>
        {headings.map((h, i) => (
          <li key={h.id}>
            <a href={`#${h.id}`}>
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              {keepWords(h.text)}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ArticleProse({ blocks }: { blocks: ArticleBlock[] }) {
  const ids = new Map(headingsOf(blocks).map((h) => [h.index, h.id]));
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2 key={index} id={ids.get(index)} className={p.proseH2}>
              {keepWords(block.text)}
            </h2>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={index} className={p.proseList}>
              {block.items.map((item) => (
                <li key={item}>{keepWords(item)}</li>
              ))}
            </ul>
          );
        }
        return (
          <div key={index} className={p.proseBlock}>
            <p>{keepWords(block.text)}</p>
            {block.link ? (
              <Link href={block.link.href} className={p.proseLink}>
                {block.link.label}
                <ArrowRight aria-hidden="true" size={16} weight="bold" />
              </Link>
            ) : null}
          </div>
        );
      })}
    </>
  );
}
