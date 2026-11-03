import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Flag } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/site/primitives";
import { MorphingText } from "@/components/fx/morphing-text";
import { Lightbox, PhotoButton, type Shot } from "@/components/fx/lightbox";
import { PHOTOS } from "@/lib/photos";

type Entry = { d: string; title: string; t: string; photos?: Shot[]; future?: boolean; tag?: string };

const ENTRIES: Entry[] = [
  { d: "July 2018", title: "Kotak Cantik begins", t: "Kotak Cantik (Beauty Box) was first introduced by students of INTI International College Subang as a Corporate Social Responsibility (CSR) and community engagement initiative. Approximately 550 hygiene boxes were distributed to underprivileged families at PPR Lembah Subang 1.", photos: [PHOTOS.h2018July, PHOTOS.h2018Hall] },
  { d: "November 2018", title: "750 more boxes", t: "Approximately 750 hygiene boxes were distributed to underprivileged families at PPR Lembah Subang 1. The event was inaugurated by the former Minister of Housing and Local Government, YB Zuraida Kamarudin.", photos: [PHOTOS.h2018NovLaunch, PHOTOS.h2018NovOfficials, PHOTOS.h2018Boxes] },
  { d: "July 2022", title: "Community needs assessment", t: "A community needs assessment survey was conducted among 780 women from PPR Lembah Subang 1 and 2, asking one important question: \"What matters most to you and your family?\"" },
  { d: "10 January 2024", title: "USEC Pitch Round 1", t: "Ministry of Higher Education.", tag: "USEC" },
  { d: "7 March 2024", title: "USEC Pitch Round 2", t: "Peninsula College Malaysia, The Ship Campus.", tag: "USEC" },
  { d: "2024", title: "Beneficiaries in 2024", t: "4 women social entrepreneurs; 3,000 women & teenage girls. Activities: in-campus promotion; purchased hygiene items.", tag: "USEC" },
  { d: "2024 to 2026", title: "From 5 to 12 women", t: "From just 5 women to 12 aspiring social entrepreneurs. Together with INTI student volunteers, the community successfully participated in packaging the first 1,500 Kotak Cantik hygiene boxes.", photos: [PHOTOS.packingCentre, PHOTOS.volunteersPacking] },
  { d: "8 July 2025", title: "TUNAS Accreditation", t: "First-round TUNAS Accreditation from Institut Keusahawanan Negara (INSKEN), under the Ministry of Entrepreneur and Cooperatives Development (KUSKOP), presented at INTI International College Subang.", photos: [PHOTOS.tunas] },
  { d: "2026", title: "TUNAS renewed", t: "MYITRA Social Enterprise successfully renewed its TUNAS Accreditation for 2026." },
  { d: "13 June 2026", title: "Community Entrepreneurship & Empowerment Centre", t: "Launched at Block B, Ground Floor, PPR Lembah Subang 2, officiated by YBrs. Dr. Tan Awang Besar, Director-General of the National Housing Department (Jabatan Perumahan Negara).", photos: [PHOTOS.centreLaunch, PHOTOS.centreTeam] },
  { d: "November 2026", title: "Top 20 team in USEC", t: "Selected as one of the TOP 20 teams for the social enterprise competition. The finals will be held in Putrajaya in November.", future: true, tag: "USEC" },
  { d: "December 2026", title: "Our goals", t: "Sell or distribute all 1,500 boxes, and uplift 15 women by teaching them employability skills.", future: true },
];

const PHRASES = ["From Hygiene to Dignity.", "From Community Service to Social Entrepreneurship.", "From Empowering Women to Transforming Communities."];

export function History() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const shots = useMemo(() => ENTRIES.flatMap((e) => e.photos ?? []), []);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="history" className="sec relative">
      <div className="wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>2018 to 2026</Eyebrow>
          <h2 className="t-h2 mt-3">The History of Kotak Cantik</h2>
          <p className="mt-3 text-[17px] font-medium text-deep">From a Community Service Initiative in 2018 to MYITRA Social Enterprise in 2026</p>
        </Reveal>
        <Reveal delay={80} className="mx-auto mt-8 max-w-3xl">
          <h3 className="sr-only">{PHRASES.join(" ")}</h3>
          <div aria-hidden className="neu-in px-4 py-5 md:px-8">
            <MorphingText texts={PHRASES} staticText={PHRASES.join(" ")} className="h-[2.6em] whitespace-normal text-center text-[clamp(20px,4.4vw,34px)] font-bold leading-[1.15] text-deep" />
          </div>
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
          <Reveal><p>The initiative began with a simple yet meaningful mission: to ensure that financial difficulties would not prevent women and girls from accessing essential personal hygiene products.</p></Reveal>
          <Reveal delay={80}><p>Through student-led community service projects, Kotak Cantik introduced affordable hygiene boxes containing essential personal care products, with an emphasis on environmentally responsible packaging and products made with natural ingredients.</p></Reveal>
        </div>

        <ol ref={listRef} className="relative mx-auto mt-16 max-w-5xl">
          {/* track + drawn line */}
          <span aria-hidden className="absolute top-0 bottom-0 left-[19px] w-[6px] -translate-x-1/2 rounded-full shadow-[inset_2px_2px_4px_var(--neu-lo),inset_-2px_-2px_4px_var(--neu-hi)] md:left-1/2" />
          <motion.span
            aria-hidden
            style={{ scaleY: reduce ? 1 : draw }}
            className="absolute top-0 bottom-0 left-[19px] w-[4px] origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-brand via-lime to-pink md:left-1/2"
          />
          {ENTRIES.map((e, i) => {
            const right = i % 2 === 1;
            const firstShot = e.photos ? shots.indexOf(e.photos[0]) : -1;
            return (
              <li key={e.d} className="relative pb-12 pl-14 last:pb-0 md:grid md:grid-cols-2 md:gap-14 md:pl-0">
                <span aria-hidden className={`absolute left-[19px] top-2 z-[1] grid size-7 -translate-x-1/2 place-items-center rounded-full md:left-1/2 ${e.future ? "bg-pink" : "bg-brand"} shadow-[3px_3px_7px_var(--neu-lo),-3px_-3px_7px_var(--neu-hi)] ring-4 ring-[var(--neu)]`}>
                  {e.future ? <Flag className="size-3.5 text-white" /> : <span className="size-2 rounded-full bg-white" />}
                </span>
                <Reveal className={`${right ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}>
                  <div className={`card lift p-6 md:p-7 ${e.future ? "neu-pink" : ""}`}>
                    <div className={`flex flex-wrap items-center gap-2 ${right ? "" : "md:justify-end"}`}>
                      <span className={`text-[13px] font-semibold uppercase tracking-[0.14em] ${e.future ? "text-[#a3335c]" : "text-[#3a7a2b]"}`}>{e.d}</span>
                      {e.tag && <span className="rounded-full bg-deep px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white">{e.tag}</span>}
                    </div>
                    <h3 className="mt-2 text-[20px] font-semibold leading-snug text-deep">{e.title}</h3>
                    <p className="mt-2 text-[15px]">{e.t}</p>
                  </div>
                </Reveal>
                {e.photos && (
                  <Reveal delay={120} className={`mt-4 grid gap-3 md:mt-0 ${e.photos.length > 1 ? "grid-cols-2" : ""} ${right ? "md:col-start-1 md:row-start-1" : "md:col-start-2"}`}>
                    {e.photos.map((s, k) => (
                      <PhotoButton key={s.src} shot={s} onOpen={() => setOpen(firstShot + k)} className={e.photos!.length === 3 && k === 0 ? "col-span-2" : ""} imgClass={e.photos!.length === 3 && k === 0 ? "aspect-[16/9]" : "aspect-[4/3]"} />
                    ))}
                  </Reveal>
                )}
              </li>
            );
          })}
        </ol>

        <Reveal className="neu mx-auto mt-16 max-w-4xl p-7 md:p-12">
          <Eyebrow>Our Commitment</Eyebrow>
          <p className="mt-4 text-[17px]">Today, Kotak Cantik is more than a hygiene box. It represents a sustainable social enterprise model that connects personal hygiene, women's dignity, entrepreneurial education, income generation and community empowerment. What began in 2018 as a student-led community service initiative has evolved into a social enterprise committed to creating lasting social and economic opportunities for underserved women and girls.</p>
          <p className="script mt-6 text-[26px] leading-snug text-deep md:text-[32px]">"From Hygiene to Dignity. From Community Service to Social Entrepreneurship. From Empowering Women to Transforming Communities."</p>
        </Reveal>
      </div>
      <Lightbox shots={shots} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}
