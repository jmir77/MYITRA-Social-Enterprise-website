import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import { Camera } from "lucide-react";

export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function CountUp({ to, duration = 1600, format = true }: { to: number; duration?: number; format?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    let raf = 0;
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  return <span ref={ref}>{format ? v.toLocaleString("en-MY") : v}</span>;
}

export function Placeholder({ label, className = "", pink = false }: { label: string; className?: string; pink?: boolean }) {
  return (
    <div role="img" aria-label={`Placeholder for ${label.toLowerCase()}`} className={`${pink ? "ph-pink" : "ph"} rounded-[18px] flex flex-col items-center justify-center text-center p-6 ${className}`}>
      <span className={`w-12 h-12 rounded-full grid place-items-center mb-3 ${pink ? "neu-sm neu-pink rounded-full! text-[#a3335c]" : "neu-sm rounded-full! text-brand"}`}>
        <Camera className="w-5 h-5" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="text-sm font-medium text-deep max-w-[22ch]">Photo: {label}</span>
    </div>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] ${light ? "text-lime" : "text-[#3a7a2b]"}`}>
      <span className={`h-[2px] w-7 rounded ${light ? "bg-lime" : "bg-lime"}`} />
      {children}
    </span>
  );
}

export function SectionHead({ title, sub, light = false, center = true, eyebrow }: { title: string; sub?: string; light?: boolean; center?: boolean; eyebrow?: string }) {
  return (
    <Reveal className={`${center ? "text-center mx-auto" : ""} max-w-3xl mb-12 md:mb-16`}>
      {eyebrow && <div className="mb-3"><Eyebrow light={light}>{eyebrow}</Eyebrow></div>}
      <h2 className={`t-h2 ${light ? "!text-white" : ""}`}>{title}</h2>
      {sub && <p className={`mt-4 ${light ? "text-white/80" : ""}`}>{sub}</p>}
    </Reveal>
  );
}
