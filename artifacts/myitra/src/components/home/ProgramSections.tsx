import { Link } from "wouter";
import { ArrowRight, Trophy } from "lucide-react";
import { img } from "@/lib/site";
import { RainbowButton } from "@/components/fx/rainbow-button";
import { Reveal, SectionHead, Placeholder } from "@/components/site/primitives";

const objectives = [
  "Reduce hygiene poverty by making safe, quality hygiene products affordable for B40 women and teenage girls.",
  "Equip women with entrepreneurship, financial literacy and digital marketing skills.",
  "Create real income opportunities through community-based sales and a 10% sales commission.",
  "Build a financially sustainable model combining product sales, sponsorships and public contributions.",
  "Provide education and leadership development through the 21st Century Learning Cube and the LEAD Programme.",
  "Grow lasting partnerships and student volunteerism to widen our reach.",
];

export function Objectives() {
  return (
    <section id="objectives" className="sec band-pale">
      <div className="wrap">
        <SectionHead title="Our Objectives" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {objectives.map((o, i) => (
            <Reveal key={i} delay={(i % 3) * 90} className="card lift p-7 relative overflow-hidden">
              <span aria-hidden className="absolute -right-2 -top-4 text-[96px] font-bold text-white/80 leading-none [text-shadow:2px_2px_4px_rgba(62,112,50,.12)] select-none">{i + 1}</span>
              <span className="relative w-11 h-11 rounded-full bg-deep text-white font-semibold grid place-items-center shadow-[4px_4px_9px_var(--neu-lo),-4px_-4px_9px_var(--neu-hi)]">{i + 1}</span>
              <p className="relative mt-5 text-[16px] text-ink/85">{o}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pillars() {
  return (
    <section id="pillars" className="sec">
      <div className="wrap">
        <SectionHead title="Our Three Impact Pillars" sub="The driving forces behind our mission to create a brighter, more equitable future." />
        <div className="grid md:grid-cols-3 gap-6">
          <Reveal className="card lift overflow-hidden flex flex-col">
            <img src={img("volunteers-packing-boxes.jpg")} alt="Young volunteers stacking many packed Kotak Cantik boxes in a room with a painted mural" className="m-3 rounded-[18px] aspect-[4/3] object-cover" loading="lazy" />
            <div className="p-7 flex flex-col flex-1">
              <h3 className="t-h3">Kotak Cantik</h3>
              <p className="mt-3 text-[15px] flex-1">Promoting community well-being and social entrepreneurship. We are empowering women to earn an income while providing essential personal hygiene resources.</p>
              <RainbowButton asChild className="mt-6 self-start"><Link href="/kotak-cantik" data-testid="button-pillar-learn-more">Learn more <ArrowRight /></Link></RainbowButton>
            </div>
          </Reveal>
          <Reveal delay={90} className="card lift overflow-hidden flex flex-col">
            <img src={img("opening-ceremony-learning-cube.jpg")} alt="Guests standing beside a plaque being unveiled between red curtains at an official opening ceremony" className="m-3 rounded-[18px] aspect-[4/3] object-cover" loading="lazy" />
            <div className="p-7"><h3 className="t-h3">21st Century Learning Cube</h3><p className="mt-3 text-[15px]">Building safe, inclusive and inspiring learning spaces for children, youth and families in underserved areas.</p></div>
          </Reveal>
          <Reveal delay={180} className="card lift overflow-hidden flex flex-col">
            <Placeholder label="LEAD Programme session" className="!rounded-[18px] m-3 aspect-[4/3]" />
            <div className="p-7"><h3 className="t-h3">LEAD Programme</h3><p className="mt-3 text-[15px]">Investing in tomorrow's leaders through continuous education and leadership development opportunities.</p></div>
          </Reveal>
        </div>
        <Reveal><p className="script text-center text-[26px] md:text-[32px] text-deep mt-12">Every program is rooted in hope, dignity and inclusivity.</p></Reveal>
      </div>
    </section>
  );
}

export function KotakTeaser() {
  return (
    <section id="kotak-cantik" className="sec band-pink relative overflow-hidden">
      <div aria-hidden className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full bg-pink/20 blur-2xl" />
      <div className="wrap relative grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-center">
        <Reveal className="mx-auto">
          <div className="neu neu-pink w-52 h-52 md:w-72 md:h-72 rounded-full! grid place-items-center">
            <img src={img("kotak-cantik-logo.png")} alt="Kotak Cantik logo, a heart on a box inside a circle of green, red and orange segments" className="w-40 md:w-56" />
          </div>
        </Reveal>
        <div>
          <Reveal><h2 className="t-h2">Kotak Cantik: A Small Box. A Big Change.</h2></Reveal>
          <Reveal delay={80}><p className="mt-4 text-[19px] text-ink/80">More than a hygiene box. A box of dignity, opportunity and hope.</p></Reveal>
          <Reveal delay={160}>
            <div className="neu-in neu-pink mt-7 flex items-center gap-4 border-l-4 border-pink p-5">
              <Trophy className="w-7 h-7 text-[#b23d68] shrink-0" strokeWidth={1.75} aria-hidden />
              <p className="font-semibold text-deep">Top 20 team in USEC. Finals in Putrajaya, November 2026.</p>
            </div>
          </Reveal>
          <Reveal delay={220}><RainbowButton asChild size="lg" className="mt-8"><Link href="/kotak-cantik" data-testid="button-teaser-story">See the full story <ArrowRight /></Link></RainbowButton></Reveal>
        </div>
      </div>
    </section>
  );
}
