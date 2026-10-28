import { fmt, inokoClicks } from "@/content/home";
import s from "./home.module.css";

// Courbe des clics Google d'Inoko (Search Console, déc. 2025 à mai 2026).
// Grand format : tracé animé par Motion via [data-draw]. Mini (hero) :
// tracé animé en CSS (.chartMini, home.module.css), visible sans JS.
export function ClicksChart({ variant }: { variant: "full" | "mini" }) {
  const full = variant === "full";
  const w = full ? 720 : 260;
  const h = full ? 320 : 84;
  const padX = full ? 28 : 6;
  const padTop = full ? 40 : 8;
  const padBottom = full ? 44 : 8;
  const max = 1800;
  const pts = inokoClicks.map((d, i) => ({
    ...d,
    x: padX + (i * (w - padX * 2)) / (inokoClicks.length - 1),
    y: padTop + (1 - d.value / max) * (h - padTop - padBottom),
  }));
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const area = `${line} L${pts.at(-1)!.x.toFixed(1)} ${h - padBottom} L${pts[0].x.toFixed(1)} ${h - padBottom} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={full ? s.chartFull : s.chartMini}
      role="img"
      aria-label={`Clics depuis Google pour Inoko : ${inokoClicks
        .map((d) => `${d.month} ${d.year}, ${fmt(d.value)}`)
        .join(" ; ")}.`}
    >
      {full
        ? [0, 600, 1200, 1800].map((v) => {
            const y = padTop + (1 - v / max) * (h - padTop - padBottom);
            return <line key={v} x1={0} x2={w} y1={y} y2={y} className={s.chartGrid} />;
          })
        : null}
      <path d={area} className={s.chartArea} data-fade />
      <path d={line} className={s.chartLine} pathLength={1} data-draw={full ? "" : undefined} />
      {pts.map((p, i) => (
        <g key={p.month} data-point>
          <circle cx={p.x} cy={p.y} r={full ? 5 : i === pts.length - 1 ? 3.5 : 0} className={s.chartDot} />
          {full ? (
            <>
              <text x={p.x} y={p.y - 16} textAnchor="middle" className={s.chartValue}>
                {fmt(p.value)}
              </text>
              <text x={p.x} y={h - 14} textAnchor="middle" className={s.chartMonth}>
                {p.month}
              </text>
            </>
          ) : null}
        </g>
      ))}
    </svg>
  );
}
