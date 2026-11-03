import { Link } from "wouter";
import { ArrowRight, Trophy, CalendarHeart, Package, Users, BadgeCheck } from "lucide-react";
import { img } from "@/lib/site";
import { CountUp, Reveal } from "@/components/site/primitives";
import { useGoTo } from "@/components/site/nav";

export function Hero() {
  const goTo = useGoTo();
  return (
    <section id="home" className="mpattern relative overflow-hidden">
      <div aria-hidden className="absolute -left-20 bottom-0 w-0 h-0 border-l-[180px] border-l-transparent border-r-[180px] border-r-transparent border-b-[260px] border-b-lime/20" />
      <div className="wrap relative grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center py-14 md:py-24">
        <div>
          <Reveal><span className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 text-[13px] font-semibold text-brand shadow-sm"><span className="w-2 h-2 rounded-full bg-lime" />MYITRA Social Enterprise</span></Reveal>
          <Reveal delay={80}><h1 className="t-h1 mt-6">Small Boxes. <span className="text-brand">Big Opportunities.</span> Brighter Futures.</h1></Reveal>
          <Reveal delay={160}><p className="mt-6 max-w-xl text-[17px]">MYITRA Social Enterprise helps underserved communities rise through education, entrepreneurship and sustainable social innovation. Our flagship project, Kotak Cantik, brings hygiene, dignity and income to women and girls.</p></Reveal>
          <Reveal delay={240} className="mt-8 flex flex-wrap gap-3">
            <Link href="/kotak-cantik" className="btn btn-primary" data-testid="button-hero-explore">Explore Kotak Cantik <ArrowRight className="w-4 h-4" /></Link>
            <button type="button" onClick={() => goTo("contact")} className="btn btn-outline bg-white/60" data-testid="button-hero-partner">Partner With Us</button>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-8 inline-flex items-center gap-3 bg-white rounded-full pl-2 pr-5 py-2 shadow-[0_8px_24px_-12px_rgba(45,94,39,.35)]" data-testid="badge-usec">
              <span className="w-9 h-9 rounded-full bg-pinkpale text-[#b23d68] grid place-items-center"><Trophy className="w-4 h-4" strokeWidth={1.75} aria-hidden /></span>
              <span className="text-[14px] font-semibold text-deep">Kotak Cantik is a Top 20 team in USEC</span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={150} className="relative">
          <div aria-hidden className="absolute -inset-3 md:-inset-5 rounded-[28px] bg-gradient-to-br from-lime/50 to-brand/30 rotate-2" />
          <img src={img("women-with-kotak-cantik-boxes.jpg")} alt="Community members and a facilitator smiling as they hold Kotak Cantik boxes in a community hall" className="relative rounded-[24px] w-full aspect-[4/3] object-cover shadow-xl" />
          <div className="absolute -bottom-5 left-5 bg-white rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
            <img src={img("kotak-cantik-logo.png")} alt="" className="w-10 h-10" />
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
    <section id="impact" aria-label="Impact numbers" className="bg-white py-14 md:py-20">
      <div className="wrap grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 90} className="card lift p-6 md:p-7 border-t-4 border-lime" >
            <div data-testid={`stat-impact-${i}`}>
              <s.icon className="w-7 h-7 text-brand" strokeWidth={1.75} aria-hidden />
              <p className="mt-4 text-deep font-bold text-[30px] md:text-[42px] leading-none tabular-nums">
                {s.pre && <span className="text-[18px] md:text-[22px] font-semibold mr-1">{s.pre.trim()}</span>}
                <CountUp to={s.n} format={s.fmt} />
              </p>
              <p className="mt-3 text-[14px] md:text-[15px] leading-snug">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
