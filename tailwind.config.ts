import type { Config } from "tailwindcss";

/**
 * Les valeurs vivent dans globals.css (variables CSS = source de vérité).
 * Ce fichier ne fait que les exposer comme tokens Tailwind, et il ferme
 * les échelles : couleurs, spacing, arrondis et typo sont *remplacés*,
 * pas étendus — impossible d'écrire `bg-zinc-50` ou `p-7`.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    // Palette fermée — trois couleurs + deux filets, rien d'autre
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      ground: "var(--ground)",
      ink: "var(--ink)",
      accent: "var(--accent)",
      line: "var(--line)",
      "line-accent": "var(--line-accent)",
    },

    // Échelle d'espacement limitée aux valeurs du CLAUDE.md
    // 4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64 · 96 · 128 · 160
    spacing: {
      "0": "0px",
      "1": "4px",
      "2": "8px",
      "3": "12px",
      "4": "16px",
      "5": "20px",
      "6": "24px",
      "8": "32px",
      "12": "48px",
      "16": "64px",
      "24": "96px",
      "32": "128px",
      "40": "160px",
    },

    borderRadius: {
      none: "0px",
      tag: "3px", // tags
      DEFAULT: "4px", // boutons, cartons, panneaux, cartes, champs, images
      full: "9999px",
    },

    fontFamily: {
      display: ["var(--font-display)", "system-ui", "sans-serif"],
      sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      mono: ["var(--font-mono)", "ui-monospace", "monospace"],
    },

    // Sept niveaux — taille + interligne + approche, responsive via les vars
    fontSize: {
      mono: ["var(--t-mono)", { lineHeight: "var(--t-mono-lh)", letterSpacing: "var(--t-mono-ls)" }],
      small: ["var(--t-small)", { lineHeight: "var(--t-small-lh)", letterSpacing: "var(--t-small-ls)" }],
      body: ["var(--t-body)", { lineHeight: "var(--t-body-lh)", letterSpacing: "var(--t-body-ls)" }],
      lead: [
        "var(--t-lead)",
        {
          lineHeight: "var(--t-lead-lh)",
          letterSpacing: "var(--t-lead-ls)",
          fontWeight: "var(--t-lead-weight)",
        },
      ],
      title: ["var(--t-title)", { lineHeight: "var(--t-title-lh)", letterSpacing: "var(--t-title-ls)" }],
      hero: ["var(--t-hero)", { lineHeight: "var(--t-hero-lh)", letterSpacing: "var(--t-hero-ls)" }],
      mass: ["var(--t-mass)", { lineHeight: "var(--t-mass-lh)", letterSpacing: "var(--t-mass-ls)" }],
    },

    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      extrabold: "800",
    },

    extend: {
      maxWidth: {
        shell: "var(--shell-max)",
      },
    },
  },
  plugins: [],
};

export default config;
