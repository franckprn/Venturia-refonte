import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site/SiteNav";

// Archivo (axe de largeur) pour les titres géants : grotesque robuste,
// compacte en semi-condensé, lisible à 200px comme à 28px.
// Geist pour le texte courant, Geist Mono pour les labels d'interface.
const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://venturia.fr"),
  title: "Venturia, studio digital pour boutiques en ligne et PME",
  description:
    "Référencement (SEO et GEO), Google Ads, site internet et automatisation n8n : " +
    "Venturia aide les boutiques en ligne et les PME à trouver plus de clients et à vendre plus.",
};

// viewportFit: "cover" : la pile mobile du rail des pages historiques lit
// env(safe-area-inset-bottom), qui vaut 0 sans lui sur iPhone.
export const viewport: Viewport = {
  viewportFit: "cover",
};

// Nav, méga-menu et menu mobile (components/site), sur toutes les pages.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <SiteNav />
        <main id="contenu" style={{ paddingTop: "var(--nav-h)" }}>{children}</main>
      </body>
    </html>
  );
}
