import { MapPin, Building2 } from "lucide-react";
import { Reveal, SectionHead, Placeholder } from "@/components/site/primitives";

const sdgs = [
  { n: 1, t: "No Poverty", d: "Income opportunities, skills and stronger families.", c: "#E5243B" },
  { n: 3, t: "Good Health & Well-being", d: "Better hygiene. Better health. Better lives.", c: "#4C9F38" },
  { n: 4, t: "Quality Education", d: "Learning today, leading tomorrow.", c: "#C5192D" },
  { n: 10, t: "Reduced Inequalities", d: "Equal opportunities. No one left behind.", c: "#DD1367" },
  { n: 17, t: "Partnerships for the Goals", d: "Stronger partnerships. Stronger communities.", c: "#19486A" },
];

export function SDGs() {
  return (
    <section id="sdgs" className="sec bg-white">
      <div className="wrap">
        <SectionHead title="Aligned with the UN Sustainable Development Goals" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {sdgs.map((s, i) => (
            <Reveal key={s.n} delay={i * 70} className="lift rounded-[18px] p-6 text-white min-h-[220px] flex flex-col shadow-md" >
              <div style={{ background: s.c }} className="-m-6 p-6 rounded-[18px] flex flex-col h-[calc(100%+3rem)] min-h-[220px]" data-testid={`card-sdg-${s.n}`}>
                <span className="text-[13px] font-semibold tracking-[0.16em] uppercase opacity-90">SDG</span>
                <span className="text-[56px] font-bold leading-none">{s.n}</span>
                <h3 className="!text-white text-[17px] font-semibold mt-3 leading-snug">{s.t}</h3>
                <p className="mt-auto pt-4 text-[14px] leading-snug text-white/95">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const partners = ["Public Bank Berhad", "Vinda", "AIA", "SWCorp Malaysia", "Ministry of Housing and Local Government (KPKT)", "INSKEN", "KUSKOP", "MyRelo"];

export function Partners() {
  return (
    <section id="partners" className="sec bg-pale">
      <div className="wrap">
        <SectionHead title="Our Partners & Collaborators" sub="We collaborate with government, NGOs, universities, corporates and volunteers to create sustainable impact." />
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {partners.map((p, i) => (
            <Reveal as="li" key={p} delay={(i % 4) * 70} className="card lift h-28 px-4 grid place-items-center text-center" >
              <span role="img" aria-label={`${p} logo placeholder`} className="flex flex-col items-center gap-1" data-testid={`logo-partner-${i}`}>
                <span className="text-[10px] uppercase tracking-[0.18em] text-brand/60">Logo</span>
                <span className="font-semibold text-deep text-[14px] md:text-[15px] leading-snug">{p}</span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Venues() {
  return (
    <section id="venues" className="sec bg-white">
      <div className="wrap">
        <SectionHead title="Our Venues" />
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal className="card lift overflow-hidden">
            <Placeholder label="Community Entrepreneurship & Empowerment Centre at PPR Lembah Subang 2" className="!rounded-none !border-0 !border-b-2 aspect-[16/9]" />
            <div className="p-7">
              <h3 className="t-h3">Community Entrepreneurship & Empowerment Centre.</h3>
              <p className="mt-2 flex items-center gap-2 text-brand font-medium text-[15px]"><MapPin className="w-4 h-4" aria-hidden /> Block B, Ground Floor, PPR Lembah Subang 2.</p>
              <p className="mt-3 text-[15px]">A community-based operational hub and training centre for Kotak Cantik, set up through a strategic collaboration with Public Bank Berhad. Launched on 13 June 2026 and officiated by YBrs. Dr. Tan Awang Besar, Director-General of the National Housing Department (Jabatan Perumahan Negara).</p>
            </div>
          </Reveal>
          <Reveal delay={100} className="card lift overflow-hidden">
            <Placeholder label="Corporate workspace and meeting room at INTI International College Subang" className="!rounded-none !border-0 !border-b-2 aspect-[16/9]" />
            <div className="p-7">
              <h3 className="t-h3">Corporate Workspace & Administrative Office.</h3>
              <p className="mt-2 flex items-center gap-2 text-brand font-medium text-[15px]"><Building2 className="w-4 h-4" aria-hidden /> Level 9, INTI International College Subang.</p>
              <p className="mt-3 text-[15px]">A dedicated meeting room with corporate workstations, generously allocated by INTI International College Subang.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
