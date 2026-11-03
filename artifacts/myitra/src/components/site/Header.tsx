import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";
import { img } from "@/lib/site";
import { useGoTo } from "./nav";

const items: { label: string; anchor?: string; href?: string }[] = [
  { label: "Home", anchor: "top" },
  { label: "About", anchor: "about" },
  { label: "Vision & Mission", anchor: "vision" },
  { label: "Kotak Cantik", href: "/kotak-cantik" },
  { label: "Impact", anchor: "impact" },
  { label: "Partners", anchor: "partners" },
  { label: "Get Involved", anchor: "get-involved" },
  { label: "Contact", anchor: "contact" },
];

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

  const linkCls = "whitespace-nowrap text-[14px] font-medium text-ink hover:text-brand transition-colors relative py-1 after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full after:bg-lime after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform";

  const renderItem = (it: (typeof items)[number], mobile = false) => {
    const cls = mobile ? "block py-3 text-lg font-medium text-deep border-b border-pale" : linkCls;
    const active = it.href && location === it.href;
    if (it.href)
      return (
        <Link key={it.label} href={it.href} onClick={() => setOpen(false)} className={`${cls} ${active ? "!text-brand after:scale-x-100" : ""}`} data-testid={`link-nav-kotak-cantik${mobile ? "-mobile" : ""}`}>
          {it.label}
        </Link>
      );
    return (
      <button key={it.label} type="button" onClick={() => { setOpen(false); goTo(it.anchor!); }} className={`${cls} text-left w-full xl:w-auto`} data-testid={`link-nav-${it.anchor}${mobile ? "-mobile" : ""}`}>
        {it.label}
      </button>
    );
  };

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-[0_6px_24px_-12px_rgba(45,94,39,.35)]" : ""}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 bg-deep text-white px-3 py-2 rounded">Skip to content</a>
      <div className="wrap flex items-center justify-between h-[76px] gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0" data-testid="link-logo" onClick={() => location === "/" && window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={img("myitra-logo.jpeg")} alt="MYITRA Social Enterprise logo, a green geometric letter M" className="h-9 w-auto" />
          <span className="leading-tight">
            <span className="block font-bold text-deep text-[15px] md:text-[16px]">MYITRA Social Enterprise</span>
            <span className="block text-[11px] text-body">Under INTI International College Subang</span>
          </span>
        </Link>
        <nav aria-label="Main" className="hidden xl:flex items-center gap-4 2xl:gap-6">
          {items.map((i) => renderItem(i))}
        </nav>
        <button type="button" onClick={() => goTo("contact")} className="btn btn-primary hidden xl:inline-flex whitespace-nowrap !py-2.5 !px-5" data-testid="button-partner-header">
          Partner With Us
        </button>
        <button type="button" className="xl:hidden w-11 h-11 grid place-items-center rounded-full bg-pale text-deep" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)} data-testid="button-menu-toggle">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div id="mobile-menu" className="xl:hidden fixed inset-x-0 top-[76px] bottom-0 bg-white overflow-y-auto">
          <nav aria-label="Mobile" className="wrap py-4">
            {items.map((i) => renderItem(i, true))}
            <button type="button" onClick={() => { setOpen(false); goTo("contact"); }} className="btn btn-primary w-full justify-center mt-6" data-testid="button-partner-mobile">
              Partner With Us <ArrowRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
