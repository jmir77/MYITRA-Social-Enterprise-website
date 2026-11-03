import { GraduationCap, Sprout, Lightbulb, Medal, HeartHandshake, BookOpen, HeartPulse, Briefcase, Handshake, Sparkles } from "lucide-react";
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
          <Reveal delay={100} className="card p-6 md:p-8 relative overflow-hidden">
            <div aria-hidden className="absolute right-0 top-0 w-28 h-28 bg-lime/20 rounded-bl-[60px]" />
            <div className="flex gap-4 items-start relative">
              <span className="w-14 h-14 shrink-0 rounded-full bg-deep text-lime grid place-items-center shadow-[4px_4px_10px_var(--neu-lo),-4px_-4px_10px_var(--neu-hi)]"><Medal className="w-7 h-7" strokeWidth={1.75} aria-hidden /></span>
              <div>
                <h3 className="t-h3">SE TUNAS Accreditation.</h3>
                <p className="mt-2 text-[15px]">MYITRA received its first TUNAS Accreditation from Institut Keusahawanan Negara (INSKEN), under the Ministry of Entrepreneur and Cooperatives Development (KUSKOP), presented on 8 July 2025 at INTI International College Subang. The accreditation was successfully renewed for 2026.</p>
              </div>
            </div>
          </Reveal>
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
        <Reveal><h2 className="t-h2 !text-white">Our Vision</h2><div className="mx-auto mt-4 h-1 w-14 rounded bg-lime" /></Reveal>
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
  { icon: BookOpen, t: "Empower through Education", d: "Empower underserved communities through quality education and lifelong learning." },
  { icon: HeartPulse, t: "Improve Well-being", d: "Improve community well-being through sustainable initiatives." },
  { icon: Briefcase, t: "Develop Entrepreneurs", d: "Develop community entrepreneurs and strengthen financial resilience." },
  { icon: Handshake, t: "Build Partnerships", d: "Build strategic partnerships with government, corporations, NGOs and institutions." },
  { icon: Sparkles, t: "Inspire Change", d: "Inspire volunteerism, innovation and shared responsibility." },
];

export function Mission() {
  return (
    <section id="mission" className="sec">
      <div className="wrap">
        <SectionHead title="Our Mission" sub="We · Empower · Educate · Impact · Sustain. Together, we build stronger communities." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {missions.map((m, i) => (
            <Reveal key={m.t} delay={i * 80} className="card lift p-6 flex flex-col">
              <span className="text-[12px] font-semibold text-[#3a7a2b] tabular-nums">0{i + 1}</span>
              <span className="neu-in mt-3 w-12 h-12 rounded-2xl text-brand grid place-items-center"><m.icon className="w-6 h-6" strokeWidth={1.75} aria-hidden /></span>
              <h3 className="mt-5 text-[18px] font-semibold leading-snug">{m.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed">{m.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal><p className="script text-center text-[26px] md:text-[32px] text-deep mt-12">Education. Empowerment. Opportunity. A Better Future for All.</p></Reveal>
      </div>
    </section>
  );
}
