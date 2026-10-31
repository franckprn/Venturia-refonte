"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Une seule île client par page. Le HTML rendu est l'état final, visible :
// sans JavaScript, tout est lisible. L'intro du hero est en CSS
// (home.module.css, @keyframes), les animations ci-dessous ne touchent
// que ce qui est encore sous la ligne de flottaison au montage, pour ne
// jamais faire disparaître un texte déjà affiché. Rien ne bouge sous
// prefers-reduced-motion. État de départ posé par gsap.set, en opacité
// seule (jamais autoAlpha, qui retirerait l'élément de la tabulation).
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ease = "expo.out";
        const fold = window.innerHeight * 0.92;
        const belowFold = (el: Element) => el.getBoundingClientRect().top > fold;

        gsap.utils.toArray<HTMLElement>("[data-reveal]").filter(belowFold).forEach((el) => {
          gsap.set(el, { opacity: 0, y: 32 });
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease,
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        gsap.utils.toArray<SVGPathElement>("[data-draw]").forEach((path) => {
          const svg = path.ownerSVGElement!;
          if (!belowFold(svg)) return;
          const fades = svg.querySelectorAll("[data-fade]");
          const points = svg.querySelectorAll("[data-point]");
          gsap.set(path, { strokeDashoffset: 1 });
          gsap.set([fades, points], { opacity: 0 });
          const tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: "top 85%", once: true } });
          tl.to(path, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" })
            .to(fades, { opacity: 1, duration: 0.8 }, 0.6)
            .to(points, { opacity: 1, duration: 0.3, stagger: 0.22 }, 0.1);
        });

        // FAQ : la réponse se déplie en douceur à l'ouverture.
        const faqs = gsap.utils.toArray<HTMLDetailsElement>("[data-faq]");
        const onToggle = (e: Event) => {
          const d = e.currentTarget as HTMLDetailsElement;
          if (!d.open) return;
          const answer = d.querySelector("[data-faq-answer]");
          if (!answer) return;
          ctx.add(() => {
            gsap.set(answer, { opacity: 0, y: -10 });
            gsap.to(answer, { opacity: 1, y: 0, duration: 0.5, ease, overwrite: true });
          });
        };
        faqs.forEach((d) => d.addEventListener("toggle", onToggle));

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        return () => faqs.forEach((d) => d.removeEventListener("toggle", onToggle));
      });
    });

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return null;
}
