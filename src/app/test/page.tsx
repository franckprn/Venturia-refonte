import type { CSSProperties } from "react";
import { Shell } from "@/components/Shell";
import { RailSlot, RailCard } from "@/components/Rail";

// Page jetable : uniquement pour vérifier la grille et la mécanique du rail.
// Trois blocs de hauteurs différentes ; les slots du rail reprennent les
// mêmes hauteurs pour que le carton se fige et se libère au bon moment.
const BLOCKS: { label: string; height: number; bg: string }[] = [
  { label: "Bloc 1", height: 720, bg: "var(--ink)" },
  { label: "Bloc 2", height: 1180, bg: "var(--accent)" },
  { label: "Bloc 3", height: 900, bg: "var(--ink)" },
];

const blockStyle = (b: (typeof BLOCKS)[number]): CSSProperties => ({
  gridColumn: "1 / -1",
  height: b.height,
  background: b.bg,
  color: "var(--ground)",
  display: "grid",
  placeItems: "center",
  fontFamily: "var(--font-mono)",
  fontSize: "var(--t-mono)",
  letterSpacing: "var(--t-mono-ls)",
});

export default function TestPage() {
  return (
    <Shell
      rail={
        <>
          <RailSlot height={BLOCKS[0].height}>
            <RailCard title="CARTON TEST 01" action>
              Doit se figer à 84px du haut, rester figé sur toute la hauteur du
              bloc 1, puis repartir vers le haut avec lui. [CONTENU À FOURNIR]
            </RailCard>
          </RailSlot>
          <RailSlot height={BLOCKS[1].height} />
          <RailSlot height={BLOCKS[2].height} />
        </>
      }
    >
      {BLOCKS.map((b) => (
        <section key={b.label} style={blockStyle(b)}>
          {b.label} — {b.height}px
        </section>
      ))}
    </Shell>
  );
}
