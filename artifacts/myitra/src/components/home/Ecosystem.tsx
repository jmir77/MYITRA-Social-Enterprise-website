import { useState } from "react";
import { Link } from "wouter";
import { MapPin, Building2, ArrowRight } from "lucide-react";
import { Reveal, SectionHead } from "@/components/site/primitives";
import { RainbowButton } from "@/components/fx/rainbow-button";
import { Lightbox, PhotoButton } from "@/components/fx/lightbox";
import { PHOTOS } from "@/lib/photos";
import { img, queueAnchor } from "@/lib/site";

const sdgs: { n: number; post?: boolean; t: string; d: string; c: string }[] = [
  { n: 1, post: true, t: "No Poverty", d: "Income opportunities, skills and stronger families.", c: "#E5243B" },
  { n: 3, post: true, t: "Good Health & Well-being", d: "Better hygiene. Better health. Better lives.", c: "#4C9F38" },
  { n: 4, post: true, t: "Quality Education", d: "Learning today, leading tomorrow.", c: "#C5192D" },
  { n: 10, t: "Reduced Inequalities", d: "Equal opportunities. No one left behind.", c: "#DD1367" },
  { n: 17, post: true, t: "Partnerships for the Goals", d: "Stronger partnerships. Stronger communities.", c: "#19486A" },
];

export function SDGs() {
  return (
    <section id="sdgs" className="sec band-pale">
      <div className="wrap">
        <SectionHead title="Aligned with the UN Sustainable Development Goals" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {sdgs.map((s, i) => (
            <Reveal key={s.n} delay={i * 70} className="group neu lift p-2 text-white min-h-[220px] flex flex-col" >
              <div style={{ background: s.c }} className="p-6 rounded-[18px] flex flex-col flex-1 min-h-[204px] shadow-[inset_2px_2px_0_rgba(255,255,255,.18),inset_-3px_-3px_8px_rgba(0,0,0,.12)]" data-testid={`card-sdg-${s.n}`}>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[13px] font-semibold tracking-[0.16em] uppercase opacity-90">SDG</span>
                  {s.post && <img src={img(`sdg-${s.n}.jpg`)} alt="" className="size-12 rounded-xl object-cover ring-2 ring-white/40 shadow-[2px_2px_6px_rgba(0,0,0,.2)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" loading="lazy" />}
                </div>
                <span className="text-[56px] font-bold leading-none">{s.n}</span>
                <h3 className="!text-white text-[17px] font-semibold mt-3 leading-snug">{s.t}</h3>
                <p className="mt-auto pt-4 text-[14px] leading-snug text-white/95">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <RainbowButton asChild variant="outline"><Link href="/kotak-cantik" onClick={() => queueAnchor("sdgs")} data-testid="button-sdgs-kotak">Kotak Cantik and the SDGs <ArrowRight /></Link></RainbowButton>
        </Reveal>
      </div>
    </section>
  );
}

export function Venues() {
  const [lb, setLb] = useState<number | null>(null);
  const shots = [PHOTOS.centreLaunch, PHOTOS.centreTeam, PHOTOS.room7];
  return (
    <section id="venues" className="sec band-pale">
      <div className="wrap">
        <SectionHead title="Our Venues" sub="MYITRA Social Enterprise – Operational Facilities" />
        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <Reveal className="card lift flex flex-col">
            <div className="grid grid-cols-2 gap-3 p-3">
              <PhotoButton shot={PHOTOS.centreLaunch} onOpen={() => setLb(0)} className="col-span-2" imgClass="aspect-[16/9]" />
              <PhotoButton shot={PHOTOS.centreTeam} onOpen={() => setLb(1)} className="col-span-2 sm:col-span-1" imgClass="aspect-[16/9]" />
              <div className="neu-in col-span-2 flex flex-col justify-center p-5 sm:col-span-1">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#3a7a2b]">13 June 2026</p>
                <p className="mt-1.5 text-[14px] leading-snug">The launch was officiated by YBrs. Dr. Tan Awang Besar, Director-General of the National Housing Department (Jabatan Perumahan Negara).</p>
              </div>
            </div>
            <div className="p-7 pt-4">
              <h3 className="t-h3">Community Entrepreneurship & Empowerment Centre at PPR Lembah Subang 2</h3>
              <p className="mt-2 flex items-center gap-2 text-[#3a7a2b] font-medium text-[15px]"><MapPin className="w-4 h-4 shrink-0" aria-hidden /> Block B, Ground Floor, PPR Lembah Subang 2.</p>
              <p className="mt-3 text-[15px]">We secured a dedicated space located at Block B, Ground Floor, PPR Lembah Subang 2. This facility serves as a community-based operational hub & training centre for the KOTAK CANTIK initiative.</p>
            </div>
          </Reveal>
          <Reveal delay={100} className="card lift flex flex-col">
            <div className="p-3"><PhotoButton shot={PHOTOS.room7} onOpen={() => setLb(2)} imgClass="aspect-[4/3] lg:aspect-[4/5] object-[center_35%]" /></div>
            <div className="p-7 pt-4">
              <h3 className="t-h3">Corporate Workspace and Administrative Office</h3>
              <p className="mt-2 flex items-center gap-2 text-[#3a7a2b] font-medium text-[15px]"><Building2 className="w-4 h-4 shrink-0" aria-hidden /> Level 9, Room 7, "The Changemakers"</p>
              <p className="mt-3 text-[15px]">In recognition of MYITRA's commitment to social entrepreneurship and community development, INTI International College Subang (IICS) has generously allocated a dedicated meeting room equipped with corporate workstations at Level 9, INTI International College Subang.</p>
              <div className="mt-5 inline-flex rounded-2xl bg-[#fbfcfa] p-2.5 shadow-[5px_5px_12px_var(--neu-lo),-5px_-5px_12px_var(--neu-hi)]"><img src={img("inti-logo.jpg")} alt="INTI International College Subang logo" className="h-9 w-auto" loading="lazy" /></div>
            </div>
          </Reveal>
        </div>
      </div>
      <Lightbox shots={shots} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
    </section>
  );
}
