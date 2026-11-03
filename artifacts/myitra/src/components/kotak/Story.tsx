import { Package, GraduationCap, Coins, Users, Truck, Megaphone, Calculator, Lightbulb, Wrench, Rocket, ShieldCheck, TrendingUp, Network, Sprout, BookOpenCheck, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Reveal, SectionHead, Eyebrow, CountUp } from "@/components/site/primitives";
import { Gallery, PhotoButton, Lightbox } from "@/components/fx/lightbox";
import { PHOTOS } from "@/lib/photos";

/* ---------------- Our Impact: the July 2022 survey ---------------- */
const SURVEY = [
  { v: 84, t: "prioritised food", why: "because feeding their families comes first.", c: "bg-deep" },
  { v: 12, t: "prioritised education", why: "because they believe in securing a better future for their children.", c: "bg-brand" },
  { v: 6, t: "were uncertain about their priorities.", why: "", c: "bg-lime" },
  { v: 2, t: "prioritised access to quality personal hygiene products.", why: "", c: "bg-pink", pink: true },
];

export function SurveyImpact() {
  return (
    <section id="our-impact" className="sec">
      <div className="wrap">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <Reveal><Eyebrow>Our Impact</Eyebrow><h2 className="t-h2 mt-3">Why Kotak Cantik exists</h2></Reveal>
            <Reveal delay={60}><blockquote className="neu-in neu-pink mt-6 border-l-4 border-pink px-6 py-5"><p className="script text-[28px] leading-snug text-deep md:text-[32px]">"When survival becomes a priority, personal hygiene becomes a luxury."</p></blockquote></Reveal>
            <Reveal delay={120}><p className="mt-6">In July 2022, a community needs assessment survey was conducted among <strong className="text-deep">780 women</strong> from PPR Lembah Subang 1 and 2, asking one important question: <em className="text-deep">"What matters most to you and your family?"</em> The findings revealed a concerning reality.</p></Reveal>
          </div>
          <Reveal delay={80} className="card p-6 md:p-9">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#3a7a2b]">780 women, PPR Lembah Subang 1 and 2, July 2022</p>
            <ul className="mt-6 space-y-6">
              {SURVEY.map((s, i) => (
                <li key={s.v} data-testid={`survey-${s.v}`}>
                  <div className="flex items-baseline gap-3">
                    <span className={`w-[3.2ch] shrink-0 text-[34px] font-bold leading-none tabular-nums md:text-[40px] ${s.pink ? "text-[#a3335c]" : "text-deep"}`}><CountUp to={s.v} />%</span>
                    <span className="text-[15px] leading-snug"><strong className="text-deep">{i === 3 ? "Only 2% " : ""}{s.t}</strong>{s.why ? ` – ${s.why}` : ""}</span>
                  </div>
                  <div className="neu-in mt-3 h-3.5 rounded-full! p-[3px]">
                    <span className={`bar block h-full rounded-full ${s.c}`} style={{ ["--v" as string]: Math.max(s.v / 100, 0.02), transitionDelay: `${150 + i * 120}ms` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <Reveal className="card p-7 md:p-8 lg:col-span-2">
            <h3 className="t-h3">But what does this really mean?</h3>
            <p className="mt-3">It does not mean that personal hygiene is unimportant to these women. It means that when financial resources are limited, basic survival needs take precedence over personal well-being.</p>
            <p className="mt-4">This finding became one of the driving forces behind the creation of KOTAK CANTIK: a social enterprise initiative designed not only to make quality personal hygiene products affordable and accessible, but also to empower women through entrepreneurship, skills development, and income-generating opportunities.</p>
          </Reveal>
          <Reveal delay={100} className="relative overflow-hidden rounded-[24px] bg-deep p-7 text-white shadow-[inset_4px_4px_12px_rgba(10,30,8,.45),inset_-4px_-4px_12px_rgba(90,150,72,.35),10px_10px_24px_var(--neu-lo),-8px_-8px_20px_var(--neu-hi)] md:p-8">
            <p className="text-[19px] font-medium leading-snug">"Should a woman have to choose between feeding her family and protecting her own health, hygiene, and dignity?"</p>
            <p className="mt-5 text-white/85">At MYITRA Social Enterprise, we believe the answer is</p>
            <p className="mt-1 text-[56px] font-bold leading-none tracking-tight text-lime">NO.</p>
          </Reveal>
        </div>
        <Reveal><p className="script mt-12 text-center text-[26px] leading-snug text-deep md:text-[34px]">"Because every woman deserves dignity. Every woman deserves opportunity. And no woman should be left behind."</p></Reveal>
      </div>
    </section>
  );
}

/* ---------------- Business model ---------------- */
const MODEL = [
  { icon: Package, t: "Access to Essential Hygiene Products", d: "Providing affordable and quality personal hygiene products through Kotak Cantik, supported by product sales, corporate sponsorships and community partnerships." },
  { icon: GraduationCap, t: "Entrepreneurial Education and Capacity Building", d: "Equipping B40 women with practical skills in entrepreneurship, financial literacy, digital marketing, personal branding, customer engagement and business management." },
  { icon: Coins, t: "Income Generation and Economic Empowerment", d: "Creating opportunities for trained women to participate in the distribution and sales of Kotak Cantik products, with the potential to earn a 10% sales commission while developing their own entrepreneurial capabilities." },
];

export function BusinessModel() {
  const [lb, setLb] = useState<number | null>(null);
  return (
    <section id="business-model" className="sec band-pale">
      <div className="wrap">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>MYITRA Social Enterprise – Our Business Model</Eyebrow>
          <h2 className="t-h2 mt-3">"We Don't Just Give People Fish; We Teach Them How to Fish."</h2>
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            "MYITRA Social Enterprise operates on the philosophy of empowerment over dependency. We believe that sustainable social impact is not achieved merely by providing temporary assistance, but by equipping individuals with the knowledge, skills, resources and opportunities to become financially independent.",
            "Through our flagship initiative, Kotak Cantik, we adopt a community-based social entrepreneurship model that combines affordable personal hygiene products, women's empowerment, entrepreneurial education and income-generating opportunities.",
            "Rather than simply distributing hygiene boxes to underserved B40 women and teenage girls, MYITRA aims to create a sustainable ecosystem where women are empowered to become social entrepreneurs themselves.",
          ].map((t, i) => <Reveal key={i} delay={i * 80}><p className="text-[15.5px]">{t}</p></Reveal>)}
        </div>
        <Reveal><p className="mt-14 text-center text-[13px] font-semibold uppercase tracking-[0.16em] text-[#3a7a2b]">Our business model focuses on three key pillars</p></Reveal>
        <ol className="mt-6 grid gap-6 lg:grid-cols-3">
          {MODEL.map((m, i) => (
            <Reveal as="li" key={m.t} delay={i * 110} className={`card lift relative flex flex-col overflow-hidden p-7 md:p-8 ${i === 2 ? "lg:-translate-y-0" : ""}`}>
              <span aria-hidden className="absolute -right-3 -top-6 select-none text-[110px] font-bold leading-none text-white/80 [text-shadow:2px_2px_4px_rgba(62,112,50,.12)]">{i + 1}</span>
              <span className="neu-in relative grid size-14 place-items-center rounded-full! text-brand"><m.icon className="size-7" strokeWidth={1.75} aria-hidden /></span>
              <h3 className="relative mt-6 text-[19px] font-semibold leading-snug text-deep">{m.t}</h3>
              <p className="relative mt-3 flex-1 text-[15px]">{m.d}</p>
              {i === 2 && (
                <div className="neu-in relative mt-6 flex items-center gap-4 p-4">
                  <span className="text-[44px] font-bold leading-none text-deep tabular-nums"><CountUp to={10} />%</span>
                  <span className="text-[14px] font-semibold leading-snug text-[#3a7a2b]">sales commission</span>
                </div>
              )}
            </Reveal>
          ))}
        </ol>
        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
          <Reveal><PhotoButton shot={PHOTOS.facilitatorBox} onOpen={() => setLb(0)} imgClass="aspect-[16/9]" /></Reveal>
          <Reveal delay={100}><p className="script text-center text-[28px] leading-snug text-deep md:text-[36px] lg:text-left">"When you support a box, you empower a family."</p></Reveal>
        </div>
      </div>
      <Lightbox shots={[PHOTOS.facilitatorBox]} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
    </section>
  );
}

/* ---------------- From beneficiaries to social entrepreneurs ---------------- */
const CURRICULUM = [
  "Product knowledge",
  "Communication & customer engagement",
  "Basic sales skills",
  "Social media & digital marketing",
  "Personal branding",
  "Basic entrepreneurship",
  "How to present and explain Kotak Cantik confidently",
];

export function Beneficiaries() {
  const [lb, setLb] = useState<number | null>(null);
  const shots = [PHOTOS.womenWithBoxes];
  return (
    <section id="entrepreneurs" className="sec">
      <div className="wrap">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <PhotoButton shot={PHOTOS.womenWithBoxes} onOpen={() => setLb(0)} className="-rotate-1" />
            <div className="neu absolute -bottom-8 right-3 p-5 text-center md:right-6 md:p-6" data-testid="stat-3000">
              <p className="text-[40px] font-bold leading-none text-deep tabular-nums md:text-[48px]"><CountUp to={3000} /></p>
              <p className="mt-1 text-[13px] font-semibold text-[#3a7a2b]">hygiene boxes</p>
            </div>
          </Reveal>
          <div className="pt-6 lg:pt-0">
            <Reveal><h2 className="t-h2">From Beneficiaries to Social Entrepreneurs</h2></Reveal>
            <Reveal delay={60}><p className="mt-6">Our long-term vision is to transform women from aid recipients into active economic contributors. By integrating entrepreneurial training with real business opportunities, MYITRA enables women to build confidence, generate supplementary income and gradually achieve greater financial independence.</p></Reveal>
            <Reveal delay={110}><p className="mt-4">Revenue generated through product sales and partnerships can be reinvested into expanding community training, improving product accessibility and supporting more women.</p></Reveal>
            <Reveal delay={160}><p className="mt-4">Our ultimate goal is not simply to provide 3,000 hygiene boxes, but to create a sustainable, community-driven social enterprise that empowers women to build better livelihoods for themselves and their families.</p></Reveal>
            <Reveal delay={200}><blockquote className="card mt-8 border-l-4 border-lime p-6"><p className="script text-[24px] leading-snug text-deep md:text-[28px]">"We do not measure success solely by how many people we help today, but by how many people we empower to stand independently tomorrow."</p></blockquote></Reveal>
          </div>
        </div>

        <Reveal className="neu mt-20 p-7 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <Eyebrow>Training curriculum</Eyebrow>
              <h3 className="t-h3 mt-3 !text-[26px]">Empowering the <span className="tabular-nums"><CountUp to={15} /></span> Women</h3>
              <p className="mt-3 text-[15px]">Plus a Product Knowledge Deck with information about each item (benefits, usage, brand details, halal status, etc.).</p>
            </div>
            <ul className="flex flex-wrap gap-3">
              {CURRICULUM.map((c, i) => (
                <Reveal as="li" key={c} delay={i * 60} className="neu-sm flex items-center gap-2 rounded-full! px-4 py-2.5 text-[14px] font-semibold text-deep">
                  <BookOpenCheck className="size-4 text-brand" aria-hidden /> {c}
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
      <Lightbox shots={shots} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
    </section>
  );
}

/* ---------------- Programmes 2024 to 2026 ---------------- */
export function Programmes() {
  return (
    <section id="programmes" className="sec band-pink">
      <div className="wrap">
        <SectionHead eyebrow="2024 to 2026" title="Our Programmes" />
        <div className="space-y-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <span className="neu-sm neu-pink inline-block rounded-full! px-3 py-1 text-[12px] font-semibold text-[#a3335c]">2024–2026</span>
              <h3 className="t-h3 mt-4 !text-[26px]">Women Empowerment Through Entrepreneurship</h3>
              <p className="mt-4">A continuous journey of empowering B40 women at PPR Lembah Subang 2 through entrepreneurial skills training, capacity-building workshops, and community engagement initiatives.</p>
            </Reveal>
            <Reveal delay={100}><Gallery shots={[PHOTOS.workshopCentre, PHOTOS.workshopStudents]} /></Reveal>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal className="lg:order-2">
              <span className="neu-sm neu-pink inline-block rounded-full! px-3 py-1 text-[12px] font-semibold text-[#a3335c]">2024–2026</span>
              <h3 className="t-h3 mt-4 !text-[26px]">Hygiene Awareness and Community Engagement</h3>
              <p className="mt-4">Promoting personal hygiene awareness and well-being among women through educational campaigns, interactive sessions, and community-based learning activities.</p>
            </Reveal>
            <Reveal delay={100} className="lg:order-1"><Gallery shots={[PHOTOS.hygieneSession]} /></Reveal>
          </div>
          <div>
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <Reveal>
                <span className="neu-sm neu-pink inline-block rounded-full! px-3 py-1 text-[12px] font-semibold text-[#a3335c]">2024–2026</span>
                <h3 className="t-h3 mt-4 !text-[26px]">From 5 to 12 Women Social Entrepreneurs – Growing Our Impact</h3>
                <p className="mt-4 max-w-3xl">From just 5 women to 12 aspiring social entrepreneurs, our journey continues to grow. Together with INTI student volunteers, the community successfully participated in packaging the first 1,500 Kotak Cantik hygiene boxes, turning empowerment into meaningful social impact.</p>
              </Reveal>
              <Reveal delay={80} className="neu neu-pink flex items-center gap-4 px-7 py-5" data-testid="stat-5-to-12">
                <span className="text-[44px] font-bold leading-none text-[#a3335c]/70 tabular-nums">5</span>
                <ArrowRight className="size-7 text-[#a3335c]" aria-hidden />
                <span className="text-[60px] font-bold leading-none text-deep tabular-nums"><CountUp to={12} /></span>
              </Reveal>
            </div>
            <Reveal delay={120} className="mt-8"><Gallery shots={[PHOTOS.packingCentre, PHOTOS.studentsBoxes, PHOTOS.womenWithBoxes, PHOTOS.volunteersWomen, PHOTOS.volunteersPacking]} /></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Community Development Program, ACE, advisors ---------------- */
const SKILLS = [
  { icon: Users, t: "Development of management experience", s: ["Leadership in a team", "Decision-making and task delegation", "Exposure to real-world problem solving"] },
  { icon: Truck, t: "Development of logistics and production experience", s: ["Hands-on experience in organising events/production", "Inventory and supply chain coordination", "Time management in production cycles"] },
  { icon: Megaphone, t: "Enhancement of marketing and sales skills", s: ["Practical training in product/service promotion", "Customer engagement and communication", "Use of digital platforms for sales growth"] },
  { icon: Calculator, t: "Development of book-keeping and financial tracking abilities", s: ["Basic accounting practices", "Recording and monitoring cash flow", "Budgeting and financial planning skills"] },
];
const ACE = [
  { l: "A", t: "Awareness", icon: Lightbulb },
  { l: "C", t: "Capability Building", icon: Wrench },
  { l: "E", t: "Empowerment", icon: Rocket },
];
const ADVISORS = [
  { icon: ShieldCheck, t: "Product Development & Quality Assurance", s: ["Guidance on the design, packaging, and quality standards of Kotak Cantik hygiene boxes.", "Ensure products meet health, safety, and industry requirements.", "Advise on sustainable and cost-effective materials for packaging."] },
  { icon: TrendingUp, t: "Market Insights & Trends", s: ["Recommend strategies to ensure products remain competitive and relevant.", "Support in shaping the business model, pricing strategies, and scaling-up plans."] },
  { icon: Network, t: "Networking & Partnerships", s: [] },
  { icon: Sprout, t: "Capacity Building & Mentorship", s: [] },
];

export function Development() {
  return (
    <section id="development" className="sec">
      <div className="wrap">
        <SectionHead eyebrow="Skills the women develop" title="Community Development Program" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((g, i) => (
            <Reveal key={g.t} delay={i * 90} className="card lift flex flex-col p-6">
              <span className="neu-in grid size-12 place-items-center rounded-full! text-brand"><g.icon className="size-6" strokeWidth={1.75} aria-hidden /></span>
              <h3 className="mt-5 text-[17px] font-semibold leading-snug text-deep">{g.t}</h3>
              <ul className="mt-4 space-y-2.5">
                {g.s.map((x) => <li key={x} className="flex gap-2.5 text-[14.5px] leading-snug"><span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-lime" />{x}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <Eyebrow>Workshop: Capability Building</Eyebrow>
            <h3 className="t-h2 mt-3">3 stages named ACE</h3>
            <p className="mt-3">Awareness, Capability Building & Empowerment.</p>
          </Reveal>
          <ol className="relative grid gap-4 sm:grid-cols-3">
            <span aria-hidden className="absolute left-[16%] right-[16%] top-[52px] hidden h-[3px] rounded-full bg-gradient-to-r from-brand via-lime to-pink sm:block" />
            {ACE.map((a, i) => (
              <Reveal as="li" key={a.l} delay={i * 140} className="relative text-center">
                <span className="neu relative mx-auto grid size-[104px] place-items-center rounded-full!">
                  <span className="text-[44px] font-bold leading-none text-deep">{a.l}</span>
                  <span className="absolute -right-1 -top-1 grid size-9 place-items-center rounded-full bg-deep text-lime shadow-[3px_3px_7px_var(--neu-lo)]"><a.icon className="size-4" aria-hidden /></span>
                </span>
                <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#3a7a2b]">Stage {i + 1}</p>
                <p className="mt-1 text-[18px] font-semibold text-deep">{a.t}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-20">
          <Reveal><h3 className="t-h3 text-center !text-[26px]">Industry experts as external advisors</h3></Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {ADVISORS.map((a, i) => (
              <Reveal key={a.t} delay={(i % 2) * 90} className={`card p-6 md:p-7 ${a.s.length ? "" : "flex items-center"}`}>
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-deep text-lime shadow-[4px_4px_10px_var(--neu-lo),-3px_-3px_8px_var(--neu-hi)]"><a.icon className="size-6" strokeWidth={1.75} aria-hidden /></span>
                  <div>
                    <h4 className="text-[18px] font-semibold leading-snug text-deep">{a.t}</h4>
                    {a.s.length > 0 && <ul className="mt-3 space-y-2">{a.s.map((x) => <li key={x} className="flex gap-2.5 text-[14.5px] leading-snug"><span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-lime" />{x}</li>)}</ul>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
