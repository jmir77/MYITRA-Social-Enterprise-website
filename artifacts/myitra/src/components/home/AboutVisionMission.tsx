import { useState } from "react";
import { GraduationCap, Sprout, Lightbulb, Medal, HeartHandshake, Droplets, Coins, Sparkles, Recycle, Handshake } from "lucide-react";
import { Lightbox, PhotoButton } from "@/components/fx/lightbox";
import { PHOTOS } from "@/lib/photos";
import { img } from "@/lib/site";
import { Reveal, SectionHead, Eyebrow } from "@/components/site/primitives";
import { LogoRevealCard } from "@/components/fx/logo-reveal";

const pillars = [
  { icon: GraduationCap, t: "Education", d: "Empowering minds with knowledge for a brighter future." },
  { icon: Sprout, t: "Entrepreneurship", d: "Supporting dreams to build a sustainable livelihood." },
  { icon: Lightbulb, t: "Sustainable Social Innovation", d: "Creating solutions today for a better tomorrow." },
];

export function About() {
  return (
    <section id="about" className="sec band-pale">
      <div className="wrap grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <Reveal><Eyebrow>Who we are</Eyebrow><h2 className="t-h2 mt-3">About MYITRA Social Enterprise</h2></Reveal>
          <Reveal delay={80}><p className="mt-6">MYITRA Social Enterprise is a student-rooted social enterprise based at INTI International College Subang. We believe sustainable change begins with people. We don't just provide short-term aid. We invest in long-term independence through Education, Entrepreneurship and Sustainable Social Innovation.</p></Reveal>
          <Reveal delay={140}>
            <blockquote className="neu-in mt-8 border-l-4 border-lime px-6 py-5">
              <p className="script text-[28px] md:text-[32px] text-deep leading-snug">"We don't just give people fish; we teach them how to fish."</p>
            </blockquote>
          </Reveal>
          <Reveal delay={160}>
            <div className="mt-8 inline-flex flex-wrap items-center gap-4 rounded-[22px] bg-[#fbfcfa] py-3 pl-3 pr-5 shadow-[6px_6px_14px_var(--neu-lo),-6px_-6px_14px_var(--neu-hi)]" data-testid="lockup-inti">
              <img src={img("inti-logo.jpg")} alt="INTI International College Subang logo" className="h-10 w-auto md:h-11" />
              <span className="text-[13px] font-semibold text-deep">Under INTI International College Subang</span>
            </div>
          </Reveal>
          <ul className="mt-8 space-y-4">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.t} delay={180 + i * 70} className="flex gap-4 items-start">
                <span className="neu-sm w-12 h-12 shrink-0 text-brand grid place-items-center"><p.icon className="w-6 h-6" strokeWidth={1.75} aria-hidden /></span>
                <span><span className="block font-semibold text-deep">{p.t}</span><span className="block text-[15px]">{p.d}</span></span>
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <Reveal>
            <div className="neu p-3"><img src={img("training-session.jpg")} alt="A MYITRA facilitator leads a training session for women seated in a community centre" className="rounded-[18px] w-full aspect-[4/3] object-cover" loading="lazy" /></div>
          </Reveal>
          <Reveal delay={60}><LogoRevealCard /></Reveal>
        </div>
      </div>
    </section>
  );
}

export function Vision() {
  return (
    <section id="vision" className="relative px-3 md:px-5"><div className="sec bg-deep text-white relative overflow-hidden rounded-[32px] md:rounded-[48px] max-w-[1320px] mx-auto shadow-[inset_6px_6px_18px_rgba(10,30,8,.45),inset_-6px_-6px_18px_rgba(90,150,72,.35),12px_12px_30px_var(--neu-lo),-10px_-10px_26px_var(--neu-hi)]">
      <div aria-hidden className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(135deg,#7DD56F 25%,transparent 25%),linear-gradient(225deg,#7DD56F 25%,transparent 25%)", backgroundSize: "160px 160px" }} />
      <div className="wrap relative text-center max-w-4xl">
        <Reveal><p className="text-lime text-[13px] font-semibold uppercase tracking-[0.16em]">Dignity, Empowerment and Sustainability</p><h2 className="t-h2 !text-white mt-3">Our Vision</h2><div className="mx-auto mt-4 h-1 w-14 rounded bg-lime" /></Reveal>
        <Reveal delay={100}><p className="mt-10 text-[24px] md:text-[34px] font-medium leading-snug text-white">"We envision a future where no woman is denied dignity because of poverty, and every woman has the opportunity to become the <span className="text-lime">architect of her own future</span>."</p></Reveal>
        <Reveal delay={180}><p className="mt-8 text-white/80 max-w-2xl mx-auto">Our vision is not simply to help women survive today's challenges, but to empower them to shape tomorrow's opportunities.</p></Reveal>
        <Reveal delay={260} className="neu neu-dark mt-12 text-left md:text-center p-7 md:p-10">
          <div className="flex md:justify-center items-center gap-3 text-lime font-semibold uppercase tracking-[0.16em] text-[13px]"><HeartHandshake className="w-5 h-5" strokeWidth={1.75} aria-hidden /> Our Promise</div>
          <p className="mt-4 text-white text-[18px] md:text-[20px]">We do not simply provide assistance. We create opportunities. We educate. We empower. We inspire. Together, we build stronger communities for generations to come.</p>
        </Reveal>
      </div>
    </div></section>
  );
}

const missions = [
  { icon: Droplets, t: "Making Hygiene Accessible", d: "To reduce hygiene poverty by providing safe, quality, and affordable personal hygiene products to women and teenage girls from B40 and underserved communities.", b: "Because personal hygiene is a basic necessity, not a privilege." },
  { icon: Coins, t: "Empowering Women Economically", d: "To equip women with practical entrepreneurship skills, business knowledge, and income-generating opportunities through our community-based social enterprise model.", b: "Because empowering one woman can create opportunities for an entire family." },
  { icon: Sparkles, t: "Building Confidence and Independence", d: "To strengthen women's confidence, communication, leadership, financial literacy, and digital marketing capabilities, enabling them to participate meaningfully in economic activities.", b: "Because confidence creates possibilities, and skills create independence." },
  { icon: Recycle, t: "Creating Sustainable Social Impact", d: "To develop a financially sustainable social enterprise model that combines subsidised product sales, community entrepreneurship, corporate sponsorships, and public contributions.", b: "Because meaningful social change should continue long after the first donation." },
  { icon: Handshake, t: "Strengthening Community Partnerships", d: "To build lasting partnerships with corporations, educational institutions, government agencies, NGOs, and local communities to expand our reach and maximise social impact.", b: "Because lasting change is never achieved alone. It is built through collective action." },
];

export function Mission() {
  return (
    <section id="mission" className="sec">
      <div className="wrap">
        <SectionHead title="Our Mission" sub="Our mission is built on one powerful belief: true empowerment begins when assistance becomes opportunity." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {missions.map((m, i) => (
            <Reveal key={m.t} delay={(i % 3) * 90} className={`card lift flex flex-col p-6 md:p-7 ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"} ${i === 4 ? "md:col-span-2 lg:col-span-3" : ""}`}>
              <div className="flex items-center gap-4">
                <span className="neu-in grid size-12 shrink-0 place-items-center rounded-2xl text-brand"><m.icon className="size-6" strokeWidth={1.75} aria-hidden /></span>
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#3a7a2b]">Mission {i + 1}</span>
              </div>
              <h3 className="mt-5 text-[19px] font-semibold leading-snug">{m.t}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed">{m.d}</p>
              <p className="mt-4 border-t border-white/80 pt-4 text-[15px] font-medium italic text-deep">{m.b}</p>
            </Reveal>
          ))}
        </div>
        <Reveal><p className="script text-center text-[26px] md:text-[32px] text-deep mt-12">Education. Empowerment. Opportunity. A Better Future for All.</p></Reveal>
      </div>
    </section>
  );
}

export function Tunas() {
  const [lb, setLb] = useState<number | null>(null);
  return (
    <section id="tunas" className="relative px-3 md:px-5">
      <div className="sec relative mx-auto max-w-[1320px] overflow-hidden rounded-[32px] band-pale shadow-[inset_6px_6px_16px_var(--neu-lo),inset_-6px_-6px_16px_var(--neu-hi)] md:rounded-[48px]">
        <div aria-hidden className="absolute -left-24 -top-24 size-80 rounded-full bg-lime/25 blur-3xl" />
        <div className="wrap relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-deep text-lime shadow-[5px_5px_12px_var(--neu-lo),-5px_-5px_12px_var(--neu-hi)]"><Medal className="size-8" strokeWidth={1.6} aria-hidden /></span>
            <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#3a7a2b]">National Recognition</p>
            <h2 className="t-h2 mt-2">TUNAS Accreditation</h2>
          </Reveal>
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <PhotoButton shot={PHOTOS.tunas} onOpen={() => setLb(0)} imgClass="aspect-[16/9]" />
            </Reveal>
            <div>
              <Reveal delay={80}><p className="text-[17px]">MYITRA Social Enterprise was honoured to receive its first-round TUNAS Accreditation from Institut Keusahawanan Negara (INSKEN), under the Ministry of Entrepreneur and Cooperatives Development (KUSKOP).</p></Reveal>
              <Reveal delay={140}><p className="mt-4">The recognition was formally presented by YB Dato' Sri Ramanan Ramakrishnan, former Deputy Minister of Entrepreneur and Cooperatives Development, on 8 July 2025, at INTI International College Subang.</p></Reveal>
              <Reveal delay={200}><p className="mt-4">Building on this milestone, MYITRA Social Enterprise successfully renewed its TUNAS Accreditation for 2026, demonstrating its continued commitment to strengthening social entrepreneurship, community empowerment, and sustainable business practices.</p></Reveal>
              <Reveal delay={260} className="mt-7 flex flex-wrap gap-4">
                <div className="neu-sm px-5 py-3"><p className="text-[28px] font-bold leading-none text-deep">2025</p><p className="mt-1 text-[12.5px] font-semibold text-[#3a7a2b]">8 July 2025</p></div>
                <div className="neu-sm px-5 py-3"><p className="text-[28px] font-bold leading-none text-deep">2026</p><p className="mt-1 text-[12.5px] font-semibold text-[#3a7a2b]">Renewed</p></div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <Lightbox shots={[PHOTOS.tunas]} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
    </section>
  );
}
