import { useEffect } from "react";
import { consumeAnchor, scrollToId, useMeta } from "@/lib/site";
import { Hero, ImpactNumbers } from "@/components/home/HeroImpact";
import { About, Vision, Mission } from "@/components/home/AboutVisionMission";
import { Objectives, Pillars, KotakTeaser } from "@/components/home/ProgramSections";
import { SDGs, Partners, Venues } from "@/components/home/Ecosystem";
import { PerspectiveTunnel } from "@/components/fx/perspective-tunnel";
import { GetInvolved, Contact } from "@/components/home/Involve";

export default function Home() {
  useMeta(
    "MYITRA Social Enterprise | Empowering Communities. Inspiring Futures.",
    "MYITRA Social Enterprise, under INTI International College Subang, empowers underserved communities through education, entrepreneurship and sustainable social innovation. Home of Kotak Cantik.",
  );
  useEffect(() => {
    const a = consumeAnchor();
    if (a && a !== "top") setTimeout(() => scrollToId(a), 60);
    else window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Hero />
      <ImpactNumbers />
      <PerspectiveTunnel eyebrow="MYITRA Social Enterprise" title="Empowering Communities. Inspiring Futures." />
      <About />
      <Vision />
      <Mission />
      <Objectives />
      <Pillars />
      <KotakTeaser />
      <SDGs />
      <Partners />
      <Venues />
      <GetInvolved />
      <Contact />
    </>
  );
}
