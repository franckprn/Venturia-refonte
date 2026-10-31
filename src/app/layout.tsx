import type { Metadata, Viewport } from "next";
import { Archivo, Bricolage_Grotesque, Geist, Geist_Mono, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site/SiteNav";

// Polices auto-hébergées par next/font (servies depuis notre domaine).
// Nouvelle direction (home, /services/seo, blog, /cas-inoko) : Archivo
// (axe de largeur) pour les titres et les gros chiffres, Geist pour le
// texte courant, Geist Mono pour les labels et les données.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Polices des pages d'origine (/services/sea, /services/automations,
// /services/creation-site, composants du blog) : gardées tant que ces
// pages les utilisent.
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

const fontVars = [archivo, geist, geistMono, display, sans, mono].map((f) => f.variable).join(" ");

// Nav, méga-menu et menu mobile (components/site), sur toutes les pages.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={fontVars} suppressHydrationWarning>
      <body>
        <SiteNav />
        <main id="contenu" style={{ paddingTop: "var(--nav-h)" }}>{children}</main>
      </body>
    </html>
  );
}
