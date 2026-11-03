import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";
import { img } from "@/lib/site";
import { RainbowButton } from "@/components/fx/rainbow-button";
import { useGoTo } from "./nav";

export type NavItem = { label: string; anchor?: string; href?: string };

/* Section navigation. On md+ it lives in the floating SiteDock; on phones the header menu lists all of it. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", anchor: "top" },
  { label: "About", anchor: "about" },
  { label: "Vision & Mission", anchor: "vision" },
  { label: "Kotak Cantik", href: "/kotak-cantik" },
  { label: "Impact", anchor: "impact" },
  { label: "Partners", anchor: "partners" },
  { label: "Get Involved", anchor: "get-involved" },
  { label: "Contact", anchor: "contact" },
];

function NavLinks({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate: () => void }) {
  const [location] = useLocation();
  const goTo = useGoTo();
  const base = mobile
    ? "flex w-full items-center justify-between rounded-2xl px-5 py-3.5 text-[17px] font-medium text-deep transition-shadow"
    : "whitespace-nowrap rounded-full px-3 2xl:px-4 py-2 text-[13.5px] font-medium text-ink transition-[box-shadow,color] duration-300 hover:text-deep";
  const raised = "shadow-[4px_4px_9px_var(--neu-lo),-4px_-4px_9px_var(--neu-hi)] text-deep! bg-[var(--neu)]";
  const hover = mobile ? "hover:shadow-[4px_4px_9px_var(--neu-lo),-4px_-4px_9px_var(--neu-hi)]" : "hover:shadow-[3px_3px_7px_var(--neu-lo),-3px_-3px_7px_var(--neu-hi)]";
  return (
    <>
      {NAV_ITEMS.map((it) => {
        if (it.href) {
          const active = location === it.href;
          return (
            <Link key={it.label} href={it.href} onClick={onNavigate} aria-current={active ? "page" : undefined} className={`${base} ${hover} ${active ? raised : ""}`} data-testid={`link-nav-kotak-cantik${mobile ? "-mobile" : ""}`}>
              {it.label}
              {mobile && <ArrowRight className="size-4 text-brand" aria-hidden />}
            </Link>
          );
        }
        return (
          <button key={it.label} type="button" onClick={() => { onNavigate(); goTo(it.anchor!); }} className={`${base} ${hover} text-left`} data-testid={`link-nav-${it.anchor}${mobile ? "-mobile" : ""}`}>
            {it.label}
          </button>
        );
      })}
    </>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const goTo = useGoTo();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-5">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 bg-deep text-white px-3 py-2 rounded z-10">Skip to content</a>
      <div className={`neu mx-auto flex h-[68px] max-w-[1320px] items-center justify-between gap-3 rounded-full! pl-3 pr-2.5 md:pl-4 transition-shadow duration-500 ${scrolled ? "" : "shadow-[5px_5px_14px_var(--neu-lo),-5px_-5px_14px_var(--neu-hi)]!"}`}>
        <Link href="/" className="flex min-w-0 items-center gap-3 shrink-0" data-testid="link-logo" onClick={() => location === "/" && window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="neu-in grid size-11 shrink-0 place-items-center rounded-full!">
            <img src={img("myitra-logo.jpeg")} alt="MYITRA Social Enterprise logo, a green geometric letter M" className="h-6 w-auto mix-blend-multiply" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-bold text-deep text-[14px] md:text-[15px]">MYITRA Social Enterprise</span>
            <span className="block truncate text-[10.5px] md:text-[11px] text-body">Under INTI International College Subang</span>
          </span>
        </Link>
        <RainbowButton type="button" onClick={() => goTo("contact")} className="hidden md:inline-flex" data-testid="button-partner-header">
          Partner With Us
        </RainbowButton>
        <RainbowButton type="button" variant="outline" size="icon" className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)} data-testid="button-menu-toggle">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </RainbowButton>
      </div>
      {open && (
        <div id="mobile-menu" className="md:hidden fixed inset-x-0 top-[84px] bottom-0 overflow-y-auto px-3 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <nav aria-label="Mobile" className="neu mx-auto max-w-lg space-y-1.5 p-4">
            <NavLinks mobile onNavigate={() => setOpen(false)} />
            <RainbowButton type="button" size="lg" onClick={() => { setOpen(false); goTo("contact"); }} className="mt-5 w-full" data-testid="button-partner-mobile">
              Partner With Us <ArrowRight />
            </RainbowButton>
          </nav>
        </div>
      )}
    </header>
  );
}
