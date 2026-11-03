import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Expand } from "lucide-react";
import { img } from "@/lib/site";
import { Reveal, SectionHead } from "@/components/site/primitives";
import { Lightbox, type Shot } from "@/components/fx/lightbox";

type Sdg = { n: number; t: string; c: string; tagline?: string; d: string; points: { h: string; p: string }[]; quote?: string };

export const SDG_POSTS: Sdg[] = [
  {
    n: 1, t: "No Poverty", c: "#E5243B",
    d: "We empower individuals and families to rise above poverty through education, entrepreneurship and sustainable opportunities.",
    points: [
      { h: "Create Income Opportunities", p: "Supporting community entrepreneurs and small business development." },
      { h: "Build Skills & Confidence", p: "Providing training, mentorship and resources for long-term success." },
      { h: "Strengthen Families", p: "Improving financial stability and quality of life for families." },
    ],
    quote: "When we empower one person, we empower a family. When we empower a community, we break the cycle of poverty.",
  },
  {
    n: 3, t: "Good Health and Well-being", c: "#4C9F38",
    d: "We are dedicated to ensuring healthy lives and promoting well-being for all ages, focusing on health access, prevention, and support for communities.",
    points: [
      { h: "Increase Health Access", p: "Improving the availability of medical services and essential medications for everyone." },
      { h: "Support Disease Prevention", p: "Promoting healthy lifestyles, vaccinations and public health education." },
      { h: "Empower Well-being", p: "Advocating for mental health support, clean environment and balanced living." },
    ],
    quote: "Healthy communities are resilient communities. When we invest in health, we build a stronger future for generations to come.",
  },
  {
    n: 4, t: "Quality Education", c: "#C5192D", tagline: "Learning today, leading tomorrow.",
    d: "We provide quality education, digital literacy and skills to empower individuals for lifelong success.",
    points: [
      { h: "Lifelong Learning", p: "Continuous education for all ages." },
      { h: "Digital & Skills", p: "Preparing individuals for the future." },
      { h: "Brighter Futures", p: "Empowering communities through education." },
    ],
  },
  {
    n: 17, t: "Partnerships for the Goals", c: "#19486A", tagline: "Stronger partnerships. Stronger communities.",
    d: "We collaborate with government, NGOs, universities, corporates and volunteers to create sustainable impact and transform lives.",
    points: [
      { h: "Government", p: "Working together for community development." },
      { h: "NGOs & Community", p: "Building stronger, more inclusive communities." },
      { h: "Universities", p: "Driving knowledge, innovation and research." },
      { h: "Corporates", p: "Creating shared value and lasting impact." },
      { h: "Volunteers", p: "The heart behind every meaningful change." },
    ],
  },
];

const SHOTS: Shot[] = SDG_POSTS.map((s) => ({ src: img(`sdg-${s.n}.jpg`), alt: `MYITRA post for SDG ${s.n}, ${s.t}, branded The Changemakers, INTI International College Subang`, label: `SDG ${s.n}: ${s.t}` }));

export function SdgViewer() {
  const [i, setI] = useState(0);
  const [lb, setLb] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = SDG_POSTS[i];
  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + SDG_POSTS.length) % SDG_POSTS.length;
    setI(n);
    tabs.current[n]?.focus();
  };

  return (
    <section id="sdgs" className="sec band-pale">
      <div className="wrap">
        <SectionHead eyebrow="Kotak Cantik and the SDGs" title="Aligned with the UN Sustainable Development Goals" />
        <Reveal>
          <div role="tablist" aria-label="Sustainable Development Goals" className="neu-in mx-auto flex w-full max-w-2xl gap-1.5 overflow-x-auto rounded-full! p-1.5" onKeyDown={onKey}>
            {SDG_POSTS.map((g, k) => {
              const on = k === i;
              return (
                <button
                  key={g.n}
                  ref={(el) => { tabs.current[k] = el; }}
                  role="tab"
                  id={`sdg-tab-${g.n}`}
                  aria-selected={on}
                  aria-controls="sdg-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setI(k)}
                  className={`flex min-h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 text-[14px] font-semibold outline-none transition-[box-shadow,color,background-color] duration-300 focus-visible:ring-2 focus-visible:ring-brand ${on ? "bg-deep text-white shadow-[4px_4px_10px_var(--neu-lo),-3px_-3px_8px_var(--neu-hi)]" : "text-deep hover:shadow-[3px_3px_7px_var(--neu-lo),-3px_-3px_7px_var(--neu-hi)]"}`}
                  data-testid={`tab-sdg-${g.n}`}
                >
                  <span aria-hidden className="size-2.5 rounded-full ring-2 ring-white/70" style={{ background: g.c }} />SDG {g.n}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div id="sdg-panel" role="tabpanel" aria-labelledby={`sdg-tab-${s.n}`} className="mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={s.n}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
              className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12"
            >
              <button type="button" onClick={() => setLb(i)} aria-label={`Open the full SDG ${s.n} post`} className="group neu relative block w-full max-w-[520px] justify-self-center p-3 outline-none transition-transform duration-500 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-brand [perspective:1000px]">
                <img src={SHOTS[i].src} alt={SHOTS[i].alt} className="aspect-square w-full rounded-[18px] object-cover transition-transform duration-700 group-hover:[transform:rotateX(3deg)_rotateY(-4deg)_scale(1.02)]" />
                <span aria-hidden className="absolute right-6 bottom-6 grid size-10 place-items-center rounded-full bg-[#EAF4E7]/95 text-deep shadow-[3px_3px_8px_rgba(0,0,0,.18)]"><Expand className="size-4" /></span>
              </button>
              <div className="min-w-0">
                <div className="flex items-center gap-4">
                  <span className="grid size-16 shrink-0 place-items-center rounded-[18px] text-[30px] font-bold text-white shadow-[5px_5px_12px_var(--neu-lo),-4px_-4px_10px_var(--neu-hi),inset_2px_2px_0_rgba(255,255,255,.2)]" style={{ background: s.c }}>{s.n}</span>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#3a7a2b]">SDG {s.n}</p>
                    <h3 className="t-h3 !text-[24px] leading-tight">{s.t}</h3>
                  </div>
                </div>
                {s.tagline && <p className="script mt-5 text-[26px] leading-snug text-deep">{s.tagline}</p>}
                <p className="mt-4 text-[17px]">{s.d}</p>
                <ul className={`mt-6 grid gap-3 ${s.points.length > 3 ? "sm:grid-cols-2" : ""}`}>
                  {s.points.map((p, k) => (
                    <motion.li key={p.h} initial={reduce ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + k * 0.07, duration: 0.35 }} className="neu-sm flex gap-3 p-4">
                      <span aria-hidden className="mt-1.5 size-2.5 shrink-0 rounded-full" style={{ background: s.c }} />
                      <span><span className="block font-semibold text-deep">{p.h}</span><span className="block text-[14.5px]">{p.p}</span></span>
                    </motion.li>
                  ))}
                </ul>
                {s.quote && (
                  <blockquote className="neu-in mt-6 border-l-4 px-6 py-5" style={{ borderColor: s.c }}>
                    <p className="text-[17px] font-medium italic leading-relaxed text-deep">"{s.quote}"</p>
                  </blockquote>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Lightbox shots={SHOTS} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
    </section>
  );
}
