"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/layout/Logo";
import { PAINTINGS } from "@/components/home/photos";
import { fr } from "@/components/home/Ui";
import { BOOKING_HREF, menu } from "@/content/menu";
import s from "./siteNav.module.css";

// Barre fixe crème, un seul déclencheur par largeur :
// - desktop (≥ 1024 px) : « Services » ouvre un sommaire sous la barre
//   (survol avec délai, clic, Entrée). Le tableau de droite suit le
//   service survolé ou focalisé.
// - mobile : « Menu » ouvre une feuille plein écran ; le reste de la page
//   passe en inert et le focus tourne dans la barre et la feuille.
// Échap ferme et rend le focus au déclencheur. Toutes les animations sont
// en GSAP, ramenées à zéro sous prefers-reduced-motion. La barre se
// retire au défilement vers le bas et revient dès qu'on remonte.

type Open = null | "services" | "mobile";

const HOVER_OPEN = 90;
const HOVER_CLOSE = 220;
const HIDE_AFTER = 160;
const FOCUSABLE = "a[href], button:not([disabled])";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Ramène la barre si le défilement l'a retirée.
function revealBar(header: HTMLElement | null, hidden: { current: boolean }) {
  if (!hidden.current || !header) return;
  hidden.current = false;
  gsap.to(header, { yPercent: 0, duration: reduced() ? 0 : 0.5, ease: "expo.out" });
}

const isVisible = (el: HTMLElement) =>
  el.checkVisibility ? el.checkVisibility({ visibilityProperty: true }) : el.offsetParent !== null;

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState<Open>(null);
  const [active, setActive] = useState(0);
  const panelId = useId();
  const sheetId = useId();

  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const plusRef = useRef<SVGLineElement>(null);
  const burgerRef = useRef<SVGSVGElement>(null);

  const openRef = useRef<Open>(null);
  const hoverTimer = useRef<number | null>(null);
  const hoverOpenedAt = useRef(0);
  const focusFirst = useRef(false);
  const barHidden = useRef(false);
  const frameZ = useRef(1);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname === href);

  function clearHover() {
    if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  }

  // ---------- Desktop : survol, clic, sortie du focus ----------

  function onServicesEnter(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    clearHover();
    if (openRef.current === "services") return;
    hoverTimer.current = window.setTimeout(() => {
      hoverOpenedAt.current = Date.now();
      setOpen("services");
    }, HOVER_OPEN);
  }

  function onServicesLeave(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    clearHover();
    hoverTimer.current = window.setTimeout(() => {
      setOpen((o) => (o === "services" ? null : o));
    }, HOVER_CLOSE);
  }

  function onTriggerClick(e: React.MouseEvent) {
    clearHover();
    // Ouvert par le survol à l'instant : le clic qui suit le confirme.
    if (openRef.current === "services" && Date.now() - hoverOpenedAt.current < 600) return;
    // detail === 0 : activé au clavier (Entrée, Espace).
    focusFirst.current = e.detail === 0;
    setOpen((o) => (o === "services" ? null : "services"));
  }

  function onServicesBlur(e: React.FocusEvent<HTMLLIElement>) {
    const next = e.relatedTarget as Node | null;
    if (next && !e.currentTarget.contains(next)) setOpen((o) => (o === "services" ? null : o));
  }

  // Le service actif remonte au premier plan, révélé de bas en haut.
  function activate(i: number) {
    if (i === active) return;
    setActive(i);
    const frame = previewRef.current?.querySelectorAll<HTMLElement>("[data-frame]")[i];
    if (!frame) return;
    frameZ.current += 1;
    frame.style.zIndex = String(frameZ.current);
    if (reduced()) return;
    gsap.fromTo(frame, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.65, ease: "expo.out" });
    gsap.fromTo(frame.querySelector("img"), { scale: 1.08 }, { scale: 1, duration: 1, ease: "expo.out" });
  }

  // ---------- Mobile ----------

  function onMenuClick() {
    setOpen((o) => (o === "mobile" ? null : "mobile"));
  }

  // Focus captif pendant que la feuille est ouverte : barre + feuille.
  function onHeaderKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key !== "Tab" || openRef.current !== "mobile" || !headerRef.current) return;
    const items = Array.from(headerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(isVisible);
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const closeOnNavigate = () => setOpen(null);

  // ---------- Effets ----------

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Échap, et fermeture au passage d'une largeur à l'autre.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const was = openRef.current;
      if (e.key !== "Escape" || !was) return;
      setOpen(null);
      (was === "services" ? triggerRef : menuBtnRef).current?.focus();
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setOpen(null);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
      if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current);
    };
  }, []);

  // La barre se retire en descendant, revient en remontant.
  useEffect(() => {
    const header = headerRef.current;
    if (!header || reduced()) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - last;
      last = y;
      if (openRef.current) return;
      if (y > HIDE_AFTER && dy > 2 && !barHidden.current) {
        barHidden.current = true;
        gsap.to(header, { yPercent: -101, duration: 0.45, ease: "power3.out" });
      } else if (dy < -2 || y <= HIDE_AFTER) {
        revealBar(header, barHidden);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Méga-menu desktop. Les rangées s'animent en opacité seule : un
  // autoAlpha les rendrait invisibles, et le lien focalisé perdrait le focus.
  useEffect(() => {
    const panel = panelRef.current;
    const scrim = scrimRef.current;
    if (!panel || !scrim) return;
    const rows = panel.querySelectorAll("[data-row]");
    const r = reduced();
    gsap.killTweensOf([panel, scrim, rows, plusRef.current]);

    if (open === "services") {
      revealBar(headerRef.current, barHidden);
      gsap.set([panel, scrim], { autoAlpha: 1 });
      if (focusFirst.current) {
        panel.querySelector<HTMLElement>(FOCUSABLE)?.focus();
        focusFirst.current = false;
      }
      if (r) {
        gsap.set(panel, { clipPath: "inset(0 0 0% 0)" });
        gsap.set(rows, { clearProps: "opacity,transform" });
        gsap.set(plusRef.current, { scaleY: 0, transformOrigin: "50% 50%" });
        return;
      }
      gsap.fromTo(panel, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.75, ease: "expo.out" });
      gsap.fromTo(rows, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", stagger: 0.05, delay: 0.06 });
      gsap.fromTo(scrim, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
      gsap.to(plusRef.current, { scaleY: 0, transformOrigin: "50% 50%", duration: 0.35, ease: "power3.out" });
    } else {
      const d = r ? 0 : 1;
      gsap.to(panel, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.4 * d,
        ease: "power3.inOut",
        onComplete: () => gsap.set(panel, { autoAlpha: 0 }),
      });
      gsap.to(scrim, { autoAlpha: 0, duration: 0.3 * d, ease: "power2.out" });
      gsap.to(plusRef.current, { scaleY: 1, transformOrigin: "50% 50%", duration: 0.35 * d, ease: "power3.out" });
    }
  }, [open]);

  // Menu mobile.
  useEffect(() => {
    const sheet = sheetRef.current;
    const burger = burgerRef.current;
    if (!sheet || !burger) return;
    const rows = sheet.querySelectorAll("[data-row]");
    const [top, bottom] = Array.from(burger.querySelectorAll("line"));
    const main = document.querySelector("main");
    const r = reduced();
    const d = r ? 0 : 1;
    gsap.killTweensOf([sheet, rows, top, bottom]);

    if (open === "mobile") {
      revealBar(headerRef.current, barHidden);
      document.documentElement.style.overflow = "hidden";
      main?.setAttribute("inert", "");
      gsap.set(sheet, { autoAlpha: 1 });
      sheet.querySelector<HTMLElement>(FOCUSABLE)?.focus();
      gsap.to(top, { y: 4, rotation: 45, svgOrigin: "11 5", duration: 0.4 * d, ease: "power3.out" });
      gsap.to(bottom, { y: -4, rotation: -45, svgOrigin: "11 5", duration: 0.4 * d, ease: "power3.out" });
      if (r) {
        gsap.set(sheet, { clipPath: "inset(0 0 0% 0)" });
        gsap.set(rows, { clearProps: "opacity,transform" });
      } else {
        gsap.fromTo(sheet, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.out" });
        gsap.fromTo(rows, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", stagger: 0.04, delay: 0.1 });
      }
      return () => {
        document.documentElement.style.overflow = "";
        main?.removeAttribute("inert");
      };
    }

    gsap.to(sheet, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.4 * d,
      ease: "power3.inOut",
      onComplete: () => gsap.set(sheet, { autoAlpha: 0 }),
    });
    gsap.to([top, bottom], { y: 0, rotation: 0, svgOrigin: "11 5", duration: 0.35 * d, ease: "power3.out" });
  }, [open]);

  const current = menu.services[active];

  return (
    <>
      <div ref={scrimRef} className={s.scrim} aria-hidden="true" onClick={() => setOpen(null)} />

      <header ref={headerRef} className={s.bar} onKeyDown={onHeaderKeyDown} onFocus={() => revealBar(headerRef.current, barHidden)}>
        <a href="#contenu" className={s.skip}>
          {menu.skip}
        </a>

        <div className={s.inner}>
          <Link href="/" className={s.brand} aria-label={menu.homeLabel} onClick={closeOnNavigate}>
            <Logo className={s.logo} />
            <span className={s.wordmark} aria-hidden="true">
              Venturia
            </span>
          </Link>

          <nav aria-label={menu.ariaLabel} className={s.desktopNav}>
            <ul className={s.items}>
              <li onPointerEnter={onServicesEnter} onPointerLeave={onServicesLeave} onBlur={onServicesBlur}>
                <button
                  ref={triggerRef}
                  type="button"
                  className={s.item}
                  aria-expanded={open === "services"}
                  aria-controls={panelId}
                  data-open={open === "services" || undefined}
                  data-section={pathname.startsWith("/services/") || undefined}
                  onClick={onTriggerClick}
                >
                  <span className={s.itemLabel}>{menu.trigger}</span>
                  <svg viewBox="0 0 10 10" className={s.plus} aria-hidden="true">
                    <line x1="0" y1="5" x2="10" y2="5" />
                    <line ref={plusRef} x1="5" y1="0" x2="5" y2="10" />
                  </svg>
                </button>

                <div ref={panelRef} id={panelId} className={s.panel}>
                  <div className={s.panelGrid}>
                    <div className={s.panelList}>
                      <p className={s.label}>{menu.panel.label}</p>
                      <ul className={s.rows}>
                        {menu.services.map((sv, i) => (
                          <li key={sv.id} data-row>
                            <Link
                              href={sv.href}
                              className={s.row}
                              data-active={i === active || undefined}
                              aria-current={isCurrent(sv.href) ? "page" : undefined}
                              onPointerEnter={() => activate(i)}
                              onFocus={() => activate(i)}
                              onClick={closeOnNavigate}
                            >
                              <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
                              <span className={s.rowName}>{sv.name}</span>
                              <span className={s.rowLead}>{fr(sv.lead)}</span>
                              <ArrowUpRight aria-hidden="true" weight="bold" className={s.rowArrow} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={s.preview} aria-hidden="true">
                      <div ref={previewRef} className={s.previewFrame}>
                        {menu.services.map((sv, i) => (
                          <div key={sv.id} data-frame className={s.frame} style={i === 0 ? { zIndex: 1 } : undefined}>
                            <Image src={PAINTINGS[sv.painting].src} alt="" fill sizes="30vw" className={s.cover} />
                          </div>
                        ))}
                      </div>
                      <p className={s.caption}>{PAINTINGS[current.painting].caption}</p>
                      <p className={s.previewTags}>
                        {current.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </p>
                    </div>

                    <div className={s.strip} data-row>
                      <Link href="/#inoko" className={s.proof} onClick={closeOnNavigate}>
                        <span className={s.label}>{menu.panel.proofLabel}</span>
                        <span className={s.proofText}>
                          {fr(menu.panel.proofText)}{" "}
                          <span className={s.underline}>
                            {menu.panel.proofLink}
                            <ArrowRight aria-hidden="true" weight="bold" />
                          </span>
                        </span>
                      </Link>
                      <div className={s.ask}>
                        <p>
                          <span className={s.soft}>{fr(menu.panel.ask)}</span>{" "}
                          <a href={`mailto:${menu.email}`} className={s.underline}>
                            {menu.email}
                          </a>
                        </p>
                        <Link href={BOOKING_HREF} className={s.cta} onClick={closeOnNavigate}>
                          {menu.panel.cta}
                          <ArrowUpRight aria-hidden="true" weight="bold" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {menu.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={s.item}
                    aria-current={isCurrent(l.href) ? "page" : undefined}
                    onClick={closeOnNavigate}
                  >
                    <span className={s.itemLabel}>{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={s.actions}>
            <a href={`mailto:${menu.email}`} className={s.email}>
              {menu.email}
            </a>
            <Link href={BOOKING_HREF} className={s.cta} onClick={closeOnNavigate}>
              <span className={s.ctaLong}>{menu.cta.long}</span>
              <span className={s.ctaShort}>{menu.cta.short}</span>
              <ArrowUpRight aria-hidden="true" weight="bold" />
            </Link>
            <button
              ref={menuBtnRef}
              type="button"
              className={s.menuBtn}
              aria-expanded={open === "mobile"}
              aria-controls={sheetId}
              onClick={onMenuClick}
            >
              <svg ref={burgerRef} viewBox="0 0 22 10" className={s.burger} aria-hidden="true">
                <line x1="0" y1="1" x2="22" y2="1" />
                <line x1="0" y1="9" x2="22" y2="9" />
              </svg>
              <span>{open === "mobile" ? menu.mobile.close : menu.mobile.open}</span>
            </button>
          </div>
        </div>

        <div ref={sheetRef} id={sheetId} className={s.sheet}>
          <nav aria-label={menu.mobile.label} className={s.sheetNav}>
            <p className={s.label} data-row>
              {menu.mobile.servicesLabel}
            </p>
            <ul className={s.sheetRows}>
              {menu.services.map((sv) => (
                <li key={sv.id} data-row>
                  <Link
                    href={sv.href}
                    className={s.sheetRow}
                    aria-current={isCurrent(sv.href) ? "page" : undefined}
                    onClick={closeOnNavigate}
                  >
                    <span className={s.thumb} aria-hidden="true">
                      <Image src={PAINTINGS[sv.painting].src} alt="" fill sizes="64px" className={s.cover} />
                    </span>
                    <span>
                      <span className={s.sheetName}>{sv.name}</span>
                      <span className={s.sheetLead}>{fr(sv.lead)}</span>
                    </span>
                    <ArrowUpRight aria-hidden="true" weight="bold" className={s.rowArrow} />
                  </Link>
                </li>
              ))}
            </ul>

            <p className={s.label} data-row>
              {menu.mobile.moreLabel}
            </p>
            <ul className={s.more}>
              {menu.links.map((l) => (
                <li key={l.href} data-row>
                  <Link
                    href={l.href}
                    className={s.moreLink}
                    aria-current={isCurrent(l.href) ? "page" : undefined}
                    onClick={closeOnNavigate}
                  >
                    {l.label}
                    <ArrowRight aria-hidden="true" weight="bold" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className={s.sheetFoot} data-row>
              <Link href={BOOKING_HREF} className={`${s.cta} ${s.ctaBlock}`} onClick={closeOnNavigate}>
                {fr(menu.mobile.cta)}
                <ArrowUpRight aria-hidden="true" weight="bold" />
              </Link>
              <p className={s.sheetMail}>
                <span className={s.soft}>{menu.mobile.write}</span>{" "}
                <a href={`mailto:${menu.email}`} className={s.underline}>
                  {menu.email}
                </a>
              </p>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
