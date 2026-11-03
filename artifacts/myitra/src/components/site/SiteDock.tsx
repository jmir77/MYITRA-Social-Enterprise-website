import { useEffect, useState, type ComponentType } from "react";
import { Link, useLocation } from "wouter";
import { Home, Info, Eye, Gift, BarChart3, Award, HandHeart, Mail, ArrowUp } from "lucide-react";
import { Dock, DockIcon, DockSeparator } from "@/components/fx/dock";
import { useGoTo } from "./nav";

type Item = { label: string; icon: ComponentType<{ className?: string; strokeWidth?: number }>; anchor?: string; href?: string; compact?: boolean };

/* Section navigation: same destinations as the header's NAV_ITEMS. */
const NAV: Item[] = [
  { label: "Home", icon: Home, anchor: "top" },
  { label: "About", icon: Info, anchor: "about", compact: true },
  { label: "Vision & Mission", icon: Eye, anchor: "vision" },
  { label: "Kotak Cantik", icon: Gift, href: "/kotak-cantik", compact: true },
  { label: "Impact", icon: BarChart3, anchor: "impact", compact: true },
  { label: "TUNAS Accreditation", icon: Award, anchor: "tunas" },
  { label: "Get Involved", icon: HandHeart, anchor: "get-involved", compact: true },
];
const ACTIONS: Item[] = [
  { label: "Contact", icon: Mail, anchor: "contact", compact: true },
  { label: "Back to top", icon: ArrowUp, anchor: "__top", compact: true },
];

/* Which dock entry is "current" for each home-page section id. */
const SECTION_TO_KEY: Record<string, string> = {
  home: "top", about: "about", vision: "vision", mission: "vision", "kotak-cantik": "/kotak-cantik",
  impact: "impact", tunas: "tunas", "get-involved": "get-involved", contact: "contact",
};

function useMedia(q: string) {
  const [m, setM] = useState(() => typeof window !== "undefined" && window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [q]);
  return m;
}

export function SiteDock() {
  const [location] = useLocation();
  const goTo = useGoTo();
  const coarse = useMedia("(hover: none), (pointer: coarse)");
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const wide = useMedia("(min-width: 768px)");
  const [active, setActive] = useState<string>("top");
  const [hide, setHide] = useState(false);

  // Active section
  useEffect(() => {
    if (location !== "/") { setActive(location === "/kotak-cantik" ? "/kotak-cantik" : ""); return; }
    const els = Object.keys(SECTION_TO_KEY).map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(SECTION_TO_KEY[e.target.id]); }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [location]);

  // Get out of the way: footer, form actions near the bottom edge, and on-screen keyboards
  useEffect(() => {
    let footerOn = false, avoidOn = false, typing = false;
    const sync = () => setHide(footerOn || avoidOn || typing);
    const footer = document.querySelector("footer");
    const fio = new IntersectionObserver(([e]) => { footerOn = e.isIntersecting; sync(); }, { rootMargin: "0px 0px -40px 0px" });
    if (footer) fio.observe(footer);
    let aio: IntersectionObserver | null = null;
    const setupAvoid = () => {
      aio?.disconnect();
      aio = new IntersectionObserver((es) => { avoidOn = es.some((e) => e.isIntersecting); sync(); }, { rootMargin: `-${Math.max(0, window.innerHeight - 130)}px 0px 0px 0px` });
      document.querySelectorAll("[data-dock-avoid]").forEach((el) => aio!.observe(el));
    };
    setupAvoid();
    const mo = new MutationObserver(() => setupAvoid());
    mo.observe(document.getElementById("main") ?? document.body, { childList: true, subtree: true });
    const onFocus = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      typing = !!t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) && window.matchMedia("(pointer: coarse)").matches;
      sync();
    };
    const onBlur = () => { typing = false; sync(); };
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onBlur);
    window.addEventListener("resize", setupAvoid);
    return () => {
      fio.disconnect(); aio?.disconnect(); mo.disconnect();
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onBlur);
      window.removeEventListener("resize", setupAvoid);
    };
  }, [location]);

  const size = coarse ? 44 : 42;
  const visible = (it: Item) => wide || it.compact;
  const btn = (on: boolean) =>
    `peer grid size-full place-items-center rounded-full outline-none transition-[box-shadow,color] duration-300 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--neu)] ${
      on ? "text-brand shadow-[inset_3px_3px_7px_var(--neu-lo),inset_-3px_-3px_7px_var(--neu-hi)]" : "text-deep hover:shadow-[3px_3px_7px_var(--neu-lo),-3px_-3px_7px_var(--neu-hi)]"
    }`;

  const render = (it: Item) => {
    const key = it.href ?? it.anchor!;
    const on = key === active;
    const Icon = it.icon;
    const inner = (
      <>
        <Icon className="size-[46%]" strokeWidth={1.9} />
        {on && <span aria-hidden className="absolute bottom-[5px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-brand" />}
      </>
    );
    return (
      <DockIcon key={it.label} padding={0}>
        {it.href ? (
          <Link href={it.href} aria-label={it.label} aria-current={on ? "page" : undefined} className={btn(on)} data-testid="dock-kotak-cantik">{inner}</Link>
        ) : (
          <button
            type="button"
            aria-label={it.label}
            aria-current={on ? "location" : undefined}
            className={btn(on)}
            onClick={() => (it.anchor === "__top" ? window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }) : goTo(it.anchor!))}
            data-testid={`dock-${it.anchor === "__top" ? "back-to-top" : it.anchor}`}
          >
            {inner}
          </button>
        )}
        <span role="tooltip" className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-deep px-3 py-1.5 text-[12px] font-semibold text-white opacity-0 shadow-[4px_4px_10px_var(--neu-lo)] transition-[opacity,transform] duration-200 peer-hover:translate-y-0 peer-hover:opacity-100 peer-focus-visible:translate-y-0 peer-focus-visible:opacity-100">
          {it.label}
        </span>
      </DockIcon>
    );
  };

  return (
    <nav
      aria-label="Quick navigation"
      inert={hide}
      className={`pointer-events-none fixed inset-x-0 z-40 flex justify-center px-2 ${reduce ? "" : "transition-[transform,opacity] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]"} ${hide ? "translate-y-[150%] opacity-0" : "opacity-100"}`}
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
      data-testid="site-dock"
    >
      <Dock
        iconSize={size}
        iconMagnification={58}
        iconDistance={130}
        disableMagnification={coarse || reduce}
        direction="bottom"
        className="neu pointer-events-auto max-w-full gap-1 rounded-full! p-2 md:gap-1.5"
        style={{ height: size + 16 }}
      >
        {NAV.filter(visible).map(render)}
        <DockSeparator />
        {ACTIONS.filter(visible).map(render)}
      </Dock>
    </nav>
  );
}
