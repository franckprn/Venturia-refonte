import { Contact, Footer, Hero, Inoko, Reviews, Services, Showcase, Start } from "@/components/home/Sections";
import { Motion } from "@/components/home/Motion";
import s from "@/components/home/home.module.css";

export default function Home() {
  return (
    <div className={s.page} data-v2>
      <Hero />
      <Inoko />
      <Services />
      <Showcase />
      <Start />
      <Reviews />
      <Contact />
      <Footer />
      <Motion />
    </div>
  );
}
