import { useEffect, useState } from "react";
import { Trophy, ArrowRight, Store, Coins, HeartHandshake, Gift, HandHeart, HandCoins } from "lucide-react";
import type { EnquiryInterest } from "@workspace/api-client-react";
import { img, useMeta } from "@/lib/site";
import { CountUp, Reveal, SectionHead, Eyebrow } from "@/components/site/primitives";
import { BoxExplorer, hasWebGL } from "@/components/kotak/BoxExplorer";
import { useGoTo } from "@/components/site/nav";
import { RainbowButton } from "@/components/fx/rainbow-button";

const steps = [
  { icon: Store, t: "Affordable for the community", d: "Sold at RM22 per box." },
  { icon: Coins, t: "Women earn income", d: "Trained women entrepreneurs sell each box and earn a 10% commission (RM2.20)." },
  { icon: HeartHandshake, t: "Sponsors and donors make it reach more", d: "Sponsorships and donations cover the rest so more boxes reach those who need them most." },
];

const timeline = [
  { d: "July 2018", t: "Kotak Cantik launched by INTI International College Subang students as a CSR initiative. About 550 boxes distributed at PPR Lembah Subang 1 with MyRelo." },
  { d: "November 2018", t: "About 750 boxes distributed at PPR Lembah Subang 1, inaugurated by former KPKT Minister YB Zuraida Kamarudin, with MyRelo and the Ministry of Housing and Local Government." },
  { d: "2022", t: "Community needs assessment of 780 women." },
  { d: "2024 to 2026", t: "Women entrepreneurship training grows from 5 to 12 women at PPR Lembah Subang 2. With INTI student volunteers, the first 1,500 Kotak Cantik boxes are packed." },
  { d: "July 2025", t: "SE TUNAS Accreditation from INSKEN/KUSKOP (renewed for 2026)." },
  { d: "13 June 2026", t: "Community Entrepreneurship & Empowerment Centre launched at PPR Lembah Subang 2." },
  { d: "November 2026", t: "USEC finals in Putrajaya.", future: true },
];

const support: { t: string; icon: typeof Gift; interest: EnquiryInterest; bg: string }[] = [
  { t: "Sponsor boxes", icon: Gift, interest: "Sponsoring Kotak Cantik", bg: "neu-in text-brand" },
  { t: "Donate a box", icon: HandCoins, interest: "Donating", bg: "neu-in neu-pink text-[#a3335c]" },
  { t: "Volunteer", icon: HandHeart, interest: "Volunteering", bg: "neu-in [--neu:#fff1e3] [--neu-lo:rgba(181,101,29,.16)] text-[#9a5418]" },
];

export default function KotakCantik() {
  const goTo = useGoTo();
  const [gl] = useState(hasWebGL);
  useMeta(
    "Kotak Cantik | Dignity. Hygiene. Empowerment. | MYITRA Social Enterprise",
    "Kotak Cantik is a hygiene box that brings dignity to women and girls and creates income for B40 women entrepreneurs. A Top 20 team in USEC, by MYITRA Social Enterprise.",
  );
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden band-pink">
        <div aria-hidden className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full bg-pink/20 blur-2xl" />
        <div aria-hidden className="absolute -left-24 bottom-10 w-60 h-60 rounded-full bg-pink/15 blur-2xl" />
        <div className="wrap relative py-16 md:py-24 text-center">
          <Reveal className="neu neu-pink mx-auto w-36 h-36 md:w-44 md:h-44 rounded-full! grid place-items-center">
            <img src={img("kotak-cantik-logo.png")} alt="Kotak Cantik logo, a heart on a box inside a circle of green, red and orange segments" className="w-28 md:w-32" />
          </Reveal>
          <Reveal delay={80}><h1 className="t-h1 mt-8">Kotak Cantik</h1></Reveal>
          <Reveal delay={140}><p className="script text-[30px] md:text-[40px] text-[#a3335c] mt-2">Dignity. Hygiene. Empowerment.</p></Reveal>
          <Reveal delay={200}><p className="mt-3 text-[18px] max-w-xl mx-auto">More Than a Box. A Box of Dignity, Opportunity and Hope.</p></Reveal>
          <Reveal delay={260}>
            <div className="mt-9 inline-flex items-center gap-3 rounded-[28px] bg-deep text-white pl-2 pr-6 py-2 text-left shadow-[6px_6px_16px_rgba(178,61,104,.22),-6px_-6px_14px_rgba(255,255,255,.9),inset_0_1px_0_rgba(255,255,255,.15)]" data-testid="banner-usec">
              <span className="w-10 h-10 rounded-full bg-lime text-deep grid place-items-center shrink-0"><Trophy className="w-5 h-5" strokeWidth={1.75} aria-hidden /></span>
              <span className="text-[14px] md:text-[15px] font-medium">Proud to be a Top 20 team in USEC. Finals in Putrajaya, November 2026.</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why */}
      <section className="sec">
        <div className="wrap grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <Reveal><Eyebrow>Our why</Eyebrow><h2 className="t-h2 mt-3">Why Kotak Cantik exists</h2></Reveal>
            <Reveal delay={60}><blockquote className="neu-in neu-pink mt-6 border-l-4 border-pink px-6 py-5"><p className="script text-[28px] md:text-[32px] text-deep leading-snug">"When survival becomes a priority, personal hygiene becomes a luxury."</p></blockquote></Reveal>
            <Reveal delay={120}><p className="mt-6">In July 2022, a community needs assessment of 780 women from PPR Lembah Subang 1 and 2 asked: 'What matters most to you and your family?' 84% prioritised food, because feeding their families comes first. Only 2% prioritised access to quality personal hygiene products. It does not mean hygiene is unimportant. It means that when money is limited, survival comes first. At MYITRA, we believe no woman should have to choose between feeding her family and protecting her own health, hygiene and dignity.</p></Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Reveal className="card lift neu-dark p-6 md:p-8 text-white">
              <p className="text-[48px] md:text-[64px] font-bold leading-none text-lime tabular-nums" data-testid="stat-food"><CountUp to={84} />%</p>
              <p className="mt-3 text-white/90 text-[15px]">prioritised food</p>
            </Reveal>
            <Reveal delay={100} className="card lift neu-pink p-6 md:p-8">
              <p className="text-[48px] md:text-[64px] font-bold leading-none text-[#a3335c] tabular-nums" data-testid="stat-hygiene"><CountUp to={2} />%</p>
              <p className="mt-3 text-[15px]">prioritised access to quality personal hygiene products</p>
            </Reveal>
            <Reveal delay={160} className="col-span-2 text-center text-[14px]">of 780 women from PPR Lembah Subang 1 and 2, July 2022</Reveal>
          </div>
        </div>
      </section>

      {/* Inside */}
      <section className="sec band-pink">
        <div className="wrap">
          <SectionHead title="What's inside one box" />
          <Reveal><BoxExplorer /></Reveal>
          <div className={`mt-12 grid gap-6 ${gl ? "md:grid-cols-[1.15fr_1fr]" : "max-w-3xl mx-auto"}`}>
            {gl && <Reveal className="neu neu-pink p-3">
              <img src={img("kotak-cantik-box-contents.jpg")} alt="An open Kotak Cantik box with blue-wrapped pads in a row, three bamboo toothbrush packs, an Olederm soap bar, a small green pocket tissue pack and a surgical face mask pack" className="w-full aspect-[4/3] rounded-[18px] object-cover" loading="lazy" data-testid="img-box-contents" />
            </Reveal>}
            <Reveal delay={100} as="figure" className="neu neu-pink p-3">
              <img src={img("kotak-cantik-packing-guide.jpg")} alt="Illustrated packing layout guide for the Kotak Cantik box, showing top, lid-open and side views with the box measurements, the items included and packing tips" className="w-full aspect-[4/3] rounded-[18px] object-contain bg-[#fdf6f8]" loading="lazy" data-testid="img-packing-guide" />
              <figcaption className="px-2 pt-3 pb-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#a3335c]">Packing layout guide</figcaption>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How */}
      <section className="sec">
        <div className="wrap">
          <SectionHead title="How it works" />
          <ol className="grid md:grid-cols-3 gap-6 relative">
            <div aria-hidden className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[2px] border-t-2 border-dashed border-lime" />
            {steps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 100} className="relative text-center px-4">
                <span className="neu relative mx-auto w-20 h-20 rounded-full! text-brand grid place-items-center">
                  <s.icon className="w-8 h-8" strokeWidth={1.75} aria-hidden />
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-deep text-white text-[13px] font-semibold grid place-items-center">{i + 1}</span>
                </span>
                <h3 className="t-h3 mt-6 !text-[20px]">{s.t}</h3>
                <p className="mt-2 text-[15px]">{s.d}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="neu mt-14 p-3">
            <img src={img("facilitator-showing-box.jpg")} alt="A facilitator standing at the front of a room shows an open Kotak Cantik box to a seated group of women, seen mostly from behind" className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[18px] object-cover" loading="lazy" />
          </Reveal>
          <Reveal><p className="script text-center text-[28px] md:text-[34px] text-deep mt-14">"When you support a box, you empower a family."</p></Reveal>
        </div>
      </section>

      {/* Entrepreneurs */}
      <section className="sec band-pale">
        <div className="wrap grid lg:grid-cols-2 gap-12 items-center">
          <Reveal className="relative">
            <div className="neu neu-pink p-3 -rotate-1"><img src={img("training-session.jpg")} alt="Women attend an entrepreneurship training session led by a facilitator" className="relative rounded-[18px] w-full aspect-[4/3] object-cover" loading="lazy" /></div>
          </Reveal>
          <div>
            <Reveal><h2 className="t-h2">From beneficiaries to social entrepreneurs</h2></Reveal>
            <Reveal delay={80}><p className="mt-6">Our long-term vision is to transform women from aid recipients into active economic contributors. Through training in entrepreneurship, financial literacy, digital marketing, personal branding, customer engagement and business management, women build confidence, earn supplementary income and move toward financial independence. Revenue from sales and partnerships is reinvested into more training and more boxes.</p></Reveal>
            <Reveal delay={140}><blockquote className="mt-8 card p-6 border-l-4 border-lime"><p className="script text-[24px] md:text-[28px] text-deep leading-snug">"We do not measure success solely by how many people we help today, but by how many people we empower to stand independently tomorrow."</p></blockquote></Reveal>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="sec">
        <div className="wrap max-w-3xl">
          <SectionHead title="Our Journey" />
          <ol className="neu relative ml-0 p-6 md:p-10 before:absolute before:left-[34px] md:before:left-[50px] before:top-10 before:bottom-10 before:w-[3px] before:rounded-full before:shadow-[inset_1px_1px_2px_var(--neu-lo),inset_-1px_-1px_2px_var(--neu-hi)]">
            {timeline.map((e, i) => (
              <Reveal as="li" key={e.d} delay={i * 50} className="relative pl-10 md:pl-12 pb-10 last:pb-0">
                <span aria-hidden className={`absolute left-0 top-1 w-5 h-5 rounded-full border-4 border-[#EAF4E7] shadow-[2px_2px_5px_var(--neu-lo),-2px_-2px_5px_var(--neu-hi)] ${e.future ? "bg-pink" : "bg-brand"}`} />
                <p className={`text-[13px] font-semibold uppercase tracking-[0.14em] ${e.future ? "text-[#a3335c]" : "text-[#3a7a2b]"}`}>{e.d}</p>
                <p className="mt-2 text-ink/85">{e.t}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* USEC */}
      <section className="sec band-pink">
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
      <section className="sec">
        <div className="wrap">
          <SectionHead title="Support a box" sub="When you support a box, you empower a family." />
          <div className="grid md:grid-cols-3 gap-6">
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
