import { useEffect, useState } from "react";
import { Trophy, ArrowRight, Gift, HandHeart } from "lucide-react";
import type { EnquiryInterest } from "@workspace/api-client-react";
import { consumeAnchor, img, scrollToId, useMeta } from "@/lib/site";
import { Reveal, SectionHead } from "@/components/site/primitives";
import { useGoTo } from "@/components/site/nav";
import { RainbowButton } from "@/components/fx/rainbow-button";
import { Lightbox, PhotoButton } from "@/components/fx/lightbox";
import { BoxExplorer, hasWebGL } from "@/components/kotak/BoxExplorer";
import { SurveyImpact, BusinessModel, Beneficiaries, Programmes, Development } from "@/components/kotak/Story";
import { SdgViewer } from "@/components/kotak/SdgViewer";
import { History } from "@/components/kotak/History";
import { PHOTOS } from "@/lib/photos";

const support: { t: string; icon: typeof Gift; interest: EnquiryInterest; bg: string }[] = [
  { t: "Sponsor boxes", icon: Gift, interest: "Sponsoring Kotak Cantik", bg: "neu-in text-brand" },
  { t: "Volunteer", icon: HandHeart, interest: "Volunteering", bg: "neu-in neu-pink text-[#a3335c]" },
];

export default function KotakCantik() {
  const goTo = useGoTo();
  const [gl] = useState(hasWebGL);
  const [lb, setLb] = useState<number | null>(null);
  useMeta(
    "Kotak Cantik | Dignity. Hygiene. Empowerment. | MYITRA Social Enterprise",
    "Kotak Cantik is a hygiene care box for underprivileged women and teenage girls, and a community-based social enterprise model by MYITRA Social Enterprise. A Top 20 team in USEC.",
  );
  useEffect(() => {
    const a = consumeAnchor();
    if (a) setTimeout(() => scrollToId(a), 80);
    else window.scrollTo(0, 0);
  }, []);
  const boxShots = gl ? [PHOTOS.boxContents, PHOTOS.packingGuide] : [PHOTOS.packingGuide];

  return (
    <>
      {/* Hero */}
      <section id="kc-top" className="hero-fast relative overflow-hidden band-pink">
        <div aria-hidden className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full bg-pink/20 blur-2xl" />
        <div aria-hidden className="absolute -left-24 bottom-10 w-60 h-60 rounded-full bg-pink/15 blur-2xl" />
        <div className="wrap relative py-16 md:py-24 text-center">
          <Reveal className="neu neu-pink mx-auto w-36 h-36 md:w-44 md:h-44 rounded-full! grid place-items-center">
            <img src={img("kotak-cantik-logo.png")} alt="Kotak Cantik logo, a heart on a box inside a circle of green, red and orange segments" className="w-28 md:w-32" />
          </Reveal>
          <Reveal><h1 className="t-h1 mt-8">Kotak Cantik</h1></Reveal>
          <Reveal><p className="script text-[30px] md:text-[40px] text-[#a3335c] mt-2">Dignity. Hygiene. Empowerment.</p></Reveal>
          <Reveal><p className="mt-3 text-[18px] max-w-xl mx-auto">More Than a Box. A Box of Dignity, Opportunity and Hope.</p></Reveal>
          <Reveal><p className="mt-4 text-[16px] max-w-2xl mx-auto">A hygiene care box for underprivileged women and teenage girls. More than hygiene products, it's about dignity, health and a brighter tomorrow.</p></Reveal>
          <Reveal>
            <div className="mt-9 inline-flex items-center gap-3 rounded-[28px] bg-deep text-white pl-2 pr-6 py-2 text-left shadow-[6px_6px_16px_rgba(178,61,104,.22),-6px_-6px_14px_rgba(255,255,255,.9),inset_0_1px_0_rgba(255,255,255,.15)]" data-testid="banner-usec">
              <span className="w-10 h-10 rounded-full bg-lime text-deep grid place-items-center shrink-0"><Trophy className="w-5 h-5" strokeWidth={1.75} aria-hidden /></span>
              <span className="text-[14px] md:text-[15px] font-medium">Proud to be a Top 20 team in USEC. Finals in Putrajaya, November 2026.</span>
            </div>
          </Reveal>
          <Reveal><p className="script mt-8 text-[24px] text-deep">Same People. A Kinder Tomorrow.</p></Reveal>
        </div>
      </section>

      <SurveyImpact />

      {/* Inside */}
      <section id="inside" className="sec band-pink">
        <div className="wrap">
          <SectionHead title="What's inside one box" />
          <Reveal><BoxExplorer /></Reveal>
          <div className={`mt-12 grid gap-6 ${gl ? "md:grid-cols-[1.15fr_1fr]" : "max-w-3xl mx-auto"}`}>
            {gl && (
              <Reveal>
                <PhotoButton shot={PHOTOS.boxContents} onOpen={() => setLb(0)} className="neu-pink" />
              </Reveal>
            )}
            <Reveal delay={100} as="figure">
              <PhotoButton shot={PHOTOS.packingGuide} onOpen={() => setLb(gl ? 1 : 0)} className="neu-pink" imgClass="aspect-[4/3] !object-contain bg-[#fdf6f8]" />
              <figcaption className="px-2 pt-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#a3335c]">Packing layout guide</figcaption>
            </Reveal>
          </div>
        </div>
        <Lightbox shots={boxShots} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
      </section>

      <BusinessModel />
      <Beneficiaries />
      <Programmes />
      <Development />
      <SdgViewer />
      <History />

      {/* USEC */}
      <section id="usec" className="sec band-pink">
        <div className="wrap">
          <Reveal className="relative overflow-hidden rounded-[32px] bg-deep text-white shadow-[inset_6px_6px_18px_rgba(10,30,8,.45),inset_-6px_-6px_18px_rgba(90,150,72,.35),12px_12px_30px_rgba(178,61,104,.2),-10px_-10px_26px_rgba(255,255,255,.9)] p-8 md:p-14 grid md:grid-cols-[auto_1fr] gap-8 items-center">
            <div aria-hidden className="absolute -right-20 -bottom-20 w-72 h-72 rotate-45 rounded-[40px] bg-brand/40" />
            <span className="relative w-24 h-24 rounded-full bg-lime text-deep grid place-items-center shadow-[6px_6px_14px_rgba(10,30,8,.5),-4px_-4px_12px_rgba(125,213,111,.3),inset_2px_2px_0_rgba(255,255,255,.4)]"><Trophy className="w-11 h-11" strokeWidth={1.5} aria-hidden /></span>
            <div className="relative">
              <p className="text-lime text-[13px] font-semibold uppercase tracking-[0.16em]">USEC Competition</p>
              <h2 className="t-h2 !text-white mt-2">Top 20 Team.</h2>
              <p className="mt-3 text-white/85 max-w-2xl">Kotak Cantik has been selected as one of the top 20 teams in the USEC competition. The finals will be held in Putrajaya in November 2026.</p>
              <RainbowButton type="button" variant="outline" onClick={() => goTo("contact")} className="mt-6 shadow-[4px_4px_10px_rgba(10,30,8,.5),-3px_-3px_8px_rgba(90,150,72,.4)]!" data-testid="button-usec-support">Support us <ArrowRight /></RainbowButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="sec">
        <div className="wrap">
          <SectionHead title="Support a box" sub="When you support a box, you empower a family." />
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {support.map((s, i) => (
              <Reveal key={s.t} delay={i * 90}>
                <button type="button" onClick={() => goTo("contact", s.interest)} className="card lift w-full p-8 text-left group active:shadow-[inset_5px_5px_11px_var(--neu-lo),inset_-5px_-5px_11px_var(--neu-hi)]" data-testid={`button-support-${i}`}>
                  <span className={`w-14 h-14 rounded-2xl grid place-items-center ${s.bg}`}><s.icon className="w-7 h-7" strokeWidth={1.75} aria-hidden /></span>
                  <h3 className="t-h3 mt-6">{s.t}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-[#3a7a2b] font-semibold text-[15px]">Get started <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
                </button>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-12">
            <RainbowButton type="button" size="lg" onClick={() => goTo("contact")} data-testid="button-enquire-now">Enquire Now <ArrowRight /></RainbowButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
