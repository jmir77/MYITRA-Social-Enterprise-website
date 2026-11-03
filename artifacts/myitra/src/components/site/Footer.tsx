import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";
import { SiInstagram, SiFacebook } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { img } from "@/lib/site";
import { useGoTo } from "./nav";
import { RainbowButton } from "@/components/fx/rainbow-button";

export const socials = [
  { label: "[INSTAGRAM]", name: "Instagram", Icon: SiInstagram },
  { label: "[FACEBOOK]", name: "Facebook", Icon: SiFacebook },
  { label: "[LINKEDIN]", name: "LinkedIn", Icon: FaLinkedinIn },
];

export function Footer() {
  const goTo = useGoTo();
  const quick: [string, string][] = [["About", "about"], ["Vision & Mission", "vision"], ["Impact", "impact"], ["Partners", "partners"], ["Get Involved", "get-involved"], ["Contact", "contact"]];
  return (
    <footer className="relative px-3 md:px-5 pb-3 md:pb-5 mt-6"><div className="bg-deep text-white relative overflow-hidden rounded-[32px] md:rounded-[48px] max-w-[1320px] mx-auto shadow-[inset_6px_6px_18px_rgba(10,30,8,.45),inset_-6px_-6px_18px_rgba(90,150,72,.35),12px_12px_30px_var(--neu-lo),-10px_-10px_26px_var(--neu-hi)]">
      <div aria-hidden className="absolute -right-24 -top-24 w-80 h-80 rotate-45 bg-brand/25 rounded-[40px]" />
      <div className="wrap relative pt-16 pb-10 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1fr]">
        <div>
          <div className="inline-flex bg-[#EAF4E7] rounded-2xl p-3 mb-5 shadow-[5px_5px_12px_rgba(10,30,8,.5),-4px_-4px_10px_rgba(90,150,72,.35)]">
            <img src={img("myitra-logo.jpeg")} alt="MYITRA Social Enterprise logo" className="h-10 w-auto" />
          </div>
          <p className="text-white/80 text-[15px] max-w-xs">A student-rooted social enterprise empowering communities through education, entrepreneurship and sustainable social innovation.</p>
          <p className="script text-lime text-2xl mt-4">People · Purpose · Positive Change</p>
        </div>
        <div>
          <h3 className="!text-white font-semibold mb-4 text-[16px]">Quick Links</h3>
          <ul className="space-y-2 text-[15px]">
            {quick.map(([l, a]) => (
              <li key={a}><button type="button" onClick={() => goTo(a)} className="text-white/80 hover:text-lime transition-colors" data-testid={`link-footer-${a}`}>{l}</button></li>
            ))}
            <li><Link href="/kotak-cantik" className="text-white/80 hover:text-lime transition-colors" data-testid="link-footer-kotak-cantik">Kotak Cantik</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="!text-white font-semibold mb-4 text-[16px]">Contact</h3>
          <ul className="space-y-3 text-[15px] text-white/85">
            <li className="flex gap-3"><Mail className="w-5 h-5 text-lime shrink-0 mt-0.5" strokeWidth={1.75} aria-hidden /> [EMAIL]</li>
            <li className="flex gap-3"><Phone className="w-5 h-5 text-lime shrink-0 mt-0.5" strokeWidth={1.75} aria-hidden /> [PHONE]</li>
            <li className="flex gap-3"><MapPin className="w-5 h-5 text-lime shrink-0 mt-0.5" strokeWidth={1.75} aria-hidden /> Level 9, INTI International College Subang, [FULL ADDRESS]</li>
          </ul>
        </div>
        <div>
          <h3 className="!text-white font-semibold mb-4 text-[16px]">Follow Us</h3>
          <div className="flex gap-3">
            {socials.map(({ name, Icon }) => (
              <RainbowButton key={name} asChild variant="outline" size="icon" className="shadow-[4px_4px_10px_rgba(10,30,8,.5),-3px_-3px_8px_rgba(90,150,72,.4)]!"><a href="#" aria-label={`MYITRA on ${name}`} data-testid={`link-social-${name.toLowerCase()}`}>
                <Icon className="w-4 h-4" />
              </a></RainbowButton>
            ))}
          </div>
          <div className="mt-6 inline-flex items-center justify-center bg-[#EAF4E7] rounded-xl px-4 py-3 border-2 border-dashed border-lime" role="img" aria-label="INTI International College Subang logo placeholder">
            <span className="text-[12px] font-semibold text-deep tracking-wide">INTI LOGO</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="wrap py-5 text-[13px] text-white/70 text-center md:text-left">
          © 2026 MYITRA Social Enterprise. Under INTI International College Subang.
        </div>
      </div>
    </div></footer>
  );
}
