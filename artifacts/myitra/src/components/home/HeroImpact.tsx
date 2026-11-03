import { Trophy, CalendarHeart, Package, Users, BadgeCheck } from "lucide-react";
import { img } from "@/lib/site";
import { CountUp, Reveal } from "@/components/site/primitives";
import { useGoTo } from "@/components/site/nav";
import { RainbowButton } from "@/components/fx/rainbow-button";
import { MorphingText } from "@/components/fx/morphing-text";
import { HeroCta } from "@/components/fx/hero-cta";

const HEADLINE = ["Small Boxes.", "Big Opportunities.", "Brighter Futures."];

export function Hero() {
  const goTo = useGoTo();
  return (
    <section id="home" className="hero-fast relative">
      <div className="wrap relative grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-14 items-center pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="min-w-0">
          <Reveal><span className="neu-sm inline-flex items-center gap-2 rounded-full! px-4 py-2 text-[13px] font-semibold text-deep"><span className="size-2 rounded-full bg-lime shadow-[0_0_0_3px_rgba(125,213,111,.25)]" />MYITRA Social Enterprise</span></Reveal>
          <Reveal delay={80}>
            <h1 className="t-h1 mt-7">
              <span className="sr-only">Small Boxes. Big Opportunities. Brighter Futures.</span>
              <span aria-hidden className="block">
                <MorphingText texts={HEADLINE} staticText="Small Boxes. Big Opportunities. Brighter Futures." className="text-left whitespace-nowrap text-deep text-[clamp(26px,7.4vw,50px)] tracking-[-0.025em] [&>span]:text-left" />
              </span>
            </h1>
            <div aria-hidden className="mt-3 flex gap-2">
              {[0, 1, 2].map((i) => <span key={i} className={`h-1.5 rounded-full ${i === 1 ? "w-10 bg-brand" : "w-4 bg-lime/70"}`} />)}
            </div>
          </Reveal>
          <Reveal delay={160}><p className="mt-6 max-w-xl text-[17px]">MYITRA Social Enterprise helps underserved communities rise through education, entrepreneurship and sustainable social innovation. Our flagship project, Kotak Cantik, brings hygiene, dignity and income to women and girls.</p></Reveal>
          <Reveal delay={240} className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5">
            <HeroCta />
            <RainbowButton type="button" variant="outline" size="lg" onClick={() => goTo("contact")} className="self-start sm:self-auto" data-testid="button-hero-partner">Partner With Us</RainbowButton>
          </Reveal>
          <Reveal delay={320}>
            <div className="neu-sm mt-8 inline-flex items-center gap-3 rounded-full! pl-2 pr-5 py-2" data-testid="badge-usec">
              <span className="neu-in neu-pink size-9 rounded-full! text-[#a3335c] grid place-items-center"><Trophy className="w-4 h-4" strokeWidth={1.75} aria-hidden /></span>
              <span className="text-[14px] font-semibold text-deep">Kotak Cantik is a Top 20 team in USEC</span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={150} className="relative">
          <div className="neu p-3 md:p-4 rotate-[1.2deg]">
            <img src={img("women-with-kotak-cantik-boxes.jpg")} alt="Community members and a facilitator smiling as they hold Kotak Cantik boxes in a community hall" className="rounded-[18px] w-full aspect-[4/3] object-cover" fetchPriority="high" />
          </div>
          <div className="neu-sm absolute -bottom-6 left-4 md:left-8 flex items-center gap-3 px-4 py-3">
            <span className="neu-in neu-pink grid size-11 place-items-center rounded-full!"><img src={img("kotak-cantik-logo.png")} alt="" className="w-8 h-8" /></span>
            <span className="script text-2xl text-deep leading-none">A box of dignity</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const stats = [
  { icon: CalendarHeart, pre: "Since ", n: 2018, fmt: false, label: "Kotak Cantik journey" },
  { icon: Package, n: 1500, fmt: true, label: "hygiene boxes packed" },
  { icon: Users, n: 12, fmt: true, label: "women social entrepreneurs" },
  { icon: BadgeCheck, n: 2, fmt: true, label: "years of TUNAS accreditation (2025 & 2026)" },
];

export function ImpactNumbers() {
  return (
    <section id="impact" aria-label="Impact numbers" className="py-12 md:py-16">
      <div className="wrap grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-7">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 90} className="card lift p-5 md:p-7">
            <div data-testid={`stat-impact-${i}`}>
              <span className="neu-in grid size-12 place-items-center rounded-full!"><s.icon className="w-6 h-6 text-brand" strokeWidth={1.75} aria-hidden /></span>
              <p className="mt-5 text-deep font-bold text-[28px] md:text-[42px] leading-none tabular-nums">
                {s.pre && <span className="text-[16px] md:text-[22px] font-semibold mr-1">{s.pre.trim()}</span>}
                <CountUp to={s.n} format={s.fmt} />
              </p>
              <p className="mt-3 text-[14px] md:text-[15px] leading-snug">{s.label}</p>
              <span aria-hidden className="mt-4 block h-1 w-10 rounded-full bg-gradient-to-r from-brand to-lime" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
