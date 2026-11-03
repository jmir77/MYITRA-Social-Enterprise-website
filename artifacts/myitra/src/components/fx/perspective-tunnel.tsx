import { motion, useTransform, useReducedMotion, useMotionValue, useSpring, useScroll, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { img } from "@/lib/site";

/**
 * TUNNEL_IMAGES — the photos that fly through the home-page image tunnel.
 * Add new uploads here (file in public/images, plus real alt text). Entries with `kind: "brand"`
 * are neumorphic branded cards that use logos or short phrases already on the site.
 */
export type TunnelItem =
  | { kind: "photo"; src: string; alt: string }
  | { kind: "brand"; logo?: string; logoAlt?: string; text?: string; pink?: boolean };

export const TUNNEL_IMAGES: TunnelItem[] = [
  { kind: "photo", src: img("women-with-kotak-cantik-boxes.jpg"), alt: "Community members and a facilitator smiling as they hold Kotak Cantik boxes in a community hall" },
  { kind: "brand", logo: img("myitra-logo.jpeg"), logoAlt: "MYITRA Social Enterprise logo", text: "People · Purpose · Positive Change" },
  { kind: "photo", src: img("training-session.jpg"), alt: "Women attend an entrepreneurship training session led by a facilitator" },
  { kind: "brand", logo: img("kotak-cantik-logo.png"), logoAlt: "Kotak Cantik logo", text: "A box of dignity", pink: true },
  { kind: "photo", src: img("women-with-kotak-cantik-boxes.jpg"), alt: "Women holding their Kotak Cantik hygiene boxes together" },
  { kind: "photo", src: img("volunteers-packing-boxes.jpg"), alt: "Young volunteers stacking many packed Kotak Cantik boxes in a room with a painted mural" },
  { kind: "brand", text: "Small Boxes. Big Opportunities. Brighter Futures." },
  { kind: "photo", src: img("kotak-cantik-box-contents.jpg"), alt: "An open Kotak Cantik box with pads, bamboo toothbrush packs, a soap bar, a pocket tissue pack and a face mask pack" },
  { kind: "photo", src: img("facilitator-showing-box.jpg"), alt: "A facilitator shows an open Kotak Cantik box to a seated group of women" },
  { kind: "photo", src: img("opening-ceremony-learning-cube.jpg"), alt: "Guests beside a plaque being unveiled between red curtains at an official opening ceremony" },
  { kind: "photo", src: img("kotak-cantik-packing-guide.jpg"), alt: "Illustrated packing layout guide for the Kotak Cantik box" },
  { kind: "photo", src: img("training-session.jpg"), alt: "A MYITRA facilitator leads a training session for women seated in a community centre" },
  { kind: "brand", logo: img("kotak-cantik-logo.png"), logoAlt: "Kotak Cantik logo", text: "Dignity. Hygiene. Empowerment.", pink: true },
  { kind: "photo", src: img("women-with-kotak-cantik-boxes.jpg"), alt: "Kotak Cantik boxes held up by community members" },
];

interface CardData { item: TunnelItem; angleCos: number; angleSin: number; rx: number; ry: number; rotationZ: number; index: number }

const CARDS: CardData[] = TUNNEL_IMAGES.map((item, i) => {
  const a = i * 137.5 * (Math.PI / 180);
  return { item, angleCos: Math.cos(a), angleSin: Math.sin(a), rx: 0.28 + (i % 3) * 0.08, ry: 0.26 + (i % 2) * 0.09, rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2), index: i };
});

const SPRING = { stiffness: 60, damping: 25, mass: 0.5 };
interface Stage { width: number; height: number; isMobile: boolean }

function useCameraParallax(enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);
  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);
  return { x, y };
}

function CardFace({ item }: { item: TunnelItem }) {
  if (item.kind === "photo")
    return (
      <div className="neu group relative h-full w-full overflow-hidden rounded-[22px]! p-2">
        <img src={item.src} alt={item.alt} draggable={false} loading="lazy" decoding="async" className="h-full w-full rounded-[16px] object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      </div>
    );
  return (
    <div className={`neu ${item.pink ? "neu-pink" : ""} flex h-full w-full flex-col items-center justify-center gap-4 rounded-[22px]! p-5 text-center`}>
      {item.logo && (
        <span className="neu-in grid size-20 place-items-center rounded-full! sm:size-24">
          <img src={item.logo} alt={item.logoAlt ?? ""} className="w-12 sm:w-16 rounded-md mix-blend-multiply" draggable={false} />
        </span>
      )}
      {item.text && <p className={`script leading-tight ${item.logo ? "text-[20px] sm:text-[24px]" : "text-[24px] sm:text-[30px]"} ${item.pink ? "text-[#a3335c]" : "text-deep"}`}>{item.text}</p>}
    </div>
  );
}

function TunnelCard({ card, progress, pointer, total, stage }: { card: CardData; progress: MotionValue<number>; pointer: { x: MotionValue<number>; y: MotionValue<number> }; total: number; stage: Stage }) {
  const span = 0.55;
  const start = (card.index / total) * (1 - span);
  const local = useTransform(progress, [start, start + span], [0, 1]);
  const z = useTransform(local, [0, 1], [stage.isMobile ? -1200 : -1700, stage.isMobile ? 350 : 500]);
  const opacity = useTransform(local, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);
  const width = stage.isMobile ? Math.max(130, Math.min(180, stage.width * 0.4)) : Math.max(180, Math.min(270, stage.width * 0.18));
  const bx = card.angleCos * stage.width * card.rx;
  const by = card.angleSin * stage.height * card.ry;
  const pan = stage.isMobile ? 20 : 45;
  const transform = useTransform([z, pointer.x, pointer.y], ([cz, px, py]: number[]) =>
    `translate3d(calc(-50% + ${bx - px * pan}px), calc(-50% + ${by - py * pan}px), ${cz}px) rotateZ(${card.rotationZ}deg)`,
  );
  return (
    <motion.div style={{ width, transform, opacity, zIndex: card.index + 1 }} className="absolute left-1/2 top-1/2 aspect-[4/5] will-change-transform select-none" data-testid={`card-tunnel-${card.index}`}>
      <CardFace item={card.item} />
    </motion.div>
  );
}

/** Scroll-driven image tunnel: a tall section with a sticky 100svh stage. Never hijacks the wheel. */
export function PerspectiveTunnel({ eyebrow, title }: { eyebrow: string; title: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<Stage>({ width: 1440, height: 900, isMobile: false });

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setStage({ width: window.innerWidth, height: window.innerHeight, isMobile: window.innerWidth < 768 }));
    };
    update();
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("resize", update); cancelAnimationFrame(raf); };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.0001 });
  const fine = typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const pointer = useCameraParallax(!reduce && fine);
  const titleScale = useTransform(progress, [0, 0.5, 1], [0.8, 1, 1.3]);
  const titleOpacity = useTransform(progress, [0, 0.1, 0.85, 1], [0.35, 1, 1, 0]);
  const promptOpacity = useTransform(progress, [0, 0.1], [1, 0]);

  if (reduce) {
    return (
      <section aria-label={title} className="sec">
        <div className="wrap">
          <div className="text-center mb-10">
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#3a7a2b]">{eyebrow}</p>
            <p className="t-h2 mt-3 text-deep">{title}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {TUNNEL_IMAGES.slice(0, 6).map((it, i) => <div key={i} className="aspect-[4/5]"><CardFace item={it} /></div>)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} aria-label={title} className="relative h-[260svh] md:h-[320svh]">
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden" style={{ perspective: stage.isMobile ? "900px" : "1200px", transformStyle: "preserve-3d" }}>
        <div aria-hidden className="pointer-events-none absolute h-[52vmin] w-[52vmin] rounded-full neu-in opacity-70" />
        <div aria-hidden className="pointer-events-none absolute h-[80vmin] w-[80vmin] rounded-full border-2 border-dashed border-lime/40" />
        <motion.div style={{ scale: titleScale, opacity: titleOpacity }} className="pointer-events-none z-0 flex max-w-xl flex-col items-center px-6 text-center">
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#3a7a2b]">{eyebrow}</p>
          <p className="text-[34px] sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight text-deep">{title}</p>
        </motion.div>
        <motion.div aria-hidden style={{ opacity: promptOpacity }} className="pointer-events-none absolute bottom-8 z-20 neu-sm grid size-11 place-items-center rounded-full! text-brand">
          <ChevronDown className="size-5 animate-bounce" />
        </motion.div>
        <div className="pointer-events-none absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {CARDS.map((c) => <TunnelCard key={c.index} card={c} progress={progress} pointer={pointer} total={CARDS.length} stage={stage} />)}
        </div>
      </div>
    </section>
  );
}
