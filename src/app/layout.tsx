import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { homeMeta } from "@/content/meta";

// Polices auto-hébergées par next/font (servies depuis notre domaine,
// aucun <link> vers fonts.googleapis.com).
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Métadonnées de la home (content/meta.ts) : la seule page du Shell
// sans son propre export `metadata` (contrairement à /contact) — celles
// du layout racine lui servent donc de valeurs par défaut.
//
// metadataBase : absent avant les pages /services/* — ajouté ici pour
// que leur `alternates.canonical` (chemin relatif) se résolve en URL
// absolue. Ce site EST venturia.fr (CLAUDE.md, « Services (home) » §
// « AVANT MISE EN LIGNE ») : jamais une autre valeur. N'affecte aucune
// page existante (home/contact ne déclarent ni canonical ni image
// og/twitter en relatif aujourd'hui).
export const metadata: Metadata = {
  metadataBase: new URL("https://venturia.fr"),
  title: homeMeta.title,
  description: homeMeta.description,
};

// viewportFit: "cover" — sans lui, env(safe-area-inset-bottom) vaut
// toujours 0 sur iPhone (encoche/barre de home) : la pile mobile du
// rail (MobileRailStack.tsx, CLAUDE.md « Rail droit » § « Pile
// mobile ») en dépend pour ne jamais se coller sous la zone gestuelle.
export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <Nav />
        <main style={{ paddingTop: "var(--nav-h)" }}>{children}</main>
      </body>
    </html>
  );
}
