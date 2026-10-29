import { Footer, Hero } from "@/components/home/Sections";
import {
  BlogPreview,
  Faq,
  InokoCase,
  Method,
  Reviews,
  Services,
  Situations,
  Start,
} from "@/components/home/HomeSections";
import { Motion } from "@/components/home/Motion";
import s from "@/components/home/home.module.css";

export default function Home() {
  return (
    <div className={s.page} data-v2>
      <Hero />
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
