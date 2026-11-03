import { useEffect, useRef, useState } from "react";
import { RotateCcw, X } from "lucide-react";
import { img } from "@/lib/site";
import { GlassIconReveal } from "./liquid-glass-logo-reveal";
import { RainbowButton } from "./rainbow-button";

const LOGO = img("myitra-logo.jpeg");
const BASE = "#EAF4E7";
const KEY = "myitra:intro-seen";

const tuning = { dispersion: 1.1, colorBleed: 0.8, present: 1.7, glide: 1.6, startZoom: 2.2 };

/** Short intro: plays once per session, under 3 s, skippable; never shown under reduced motion. */
export function LogoIntro() {
  const [show, setShow] = useState(() => {
    try {
      return !/[?&]nointro\b/.test(window.location.search) && !sessionStorage.getItem(KEY) && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  });
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!show) return;
    try { sessionStorage.setItem(KEY, "1"); } catch { /* private mode */ }
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setLeaving(true);
      window.setTimeout(() => setShow(false), 450);
    };
    const t = window.setTimeout(finish, 2600);
    const k = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", k);
    skipRef.current = finish;
    return () => { window.clearTimeout(t); window.removeEventListener("keydown", k); };
  }, [show]);
  const skipRef = useRef<() => void>(() => {});

  if (!show) return null;
  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center transition-opacity duration-500 ${leaving ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      style={{ background: BASE }}
      onClick={() => skipRef.current()}
      data-testid="overlay-intro"
    >
      <GlassIconReveal logo={LOGO} look="light" background={BASE} originalColors logoScale={0.62} finalScale={0.8} loop={false} speed={1.25} tuning={tuning} label="MYITRA Social Enterprise logo" className="absolute inset-0 !cursor-default" />
      <RainbowButton variant="outline" size="sm" className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-5" onClick={(e) => { e.stopPropagation(); skipRef.current(); }} data-testid="button-intro-skip">
        Skip <X />
      </RainbowButton>
    </div>
  );
}

/** Featured, click-to-replay glass reveal of the MYITRA mark, set in a neumorphic well. */
export function LogoRevealCard({ className = "" }: { className?: string }) {
  const [nonce, setNonce] = useState(0);
  return (
    <div className={`neu p-3 ${className}`}>
      <div className="neu-in relative h-56 md:h-64 overflow-hidden">
        <GlassIconReveal key={nonce} logo={LOGO} look="light" background={BASE} originalColors logoScale={0.6} finalScale={0.82} loop={false} tuning={tuning} label="MYITRA Social Enterprise logo, a green geometric letter M" className="absolute inset-0" />
        <RainbowButton variant="outline" size="icon" aria-label="Replay logo reveal" className="absolute bottom-3 right-3 size-10" onClick={() => setNonce((n) => n + 1)} data-testid="button-logo-replay">
          <RotateCcw />
        </RainbowButton>
      </div>
    </div>
  );
}
