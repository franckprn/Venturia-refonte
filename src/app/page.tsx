import { Footer, Hero } from "@/components/home/Sections";
import { Faq, Reviews, Services } from "@/components/home/HomeSections";
import { BlogPreview, InokoCase, Interlude, Method, Situations, Start } from "@/components/home/v1/Sections";
import { Motion } from "@/components/home/Motion";
import s from "@/components/home/home.module.css";

// Home V2 (CLAUDE.md, « Home V2 — sélection finale ») : base du test 2,
// six sections reprises du test 1 (components/home/v1).
export default function Home() {
  return (
    <div className={s.page} data-v2>
      <Hero />
      <Interlude />
      <Services />
      <InokoCase />
      <Situations />
      <Reviews />
      <Method />
      <Start />
      <Faq />
      <BlogPreview />
      <Footer />
      <Motion />
    </div>
  );
}
