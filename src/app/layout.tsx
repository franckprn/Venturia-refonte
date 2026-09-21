import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";

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

export const metadata: Metadata = {
  title: "Venturia",
  description: "[TEXTE À FOURNIR]",
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
