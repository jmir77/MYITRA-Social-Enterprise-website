import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* Magic UI MorphingText, ported. The SVG threshold filter gets a unique id per instance. */
const morphTime = 1.5;
const cooldownTime = 1.6;

function useReducedMotionPref() {
  const [reduce, setReduce] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(q.matches);
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);
  return reduce;
}

const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(cooldownTime);
  const timeRef = useRef(new Date());
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const setStyles = useCallback(
    (fraction: number) => {
      const [c1, c2] = [text1Ref.current, text2Ref.current];
      if (!c1 || !c2) return;
      c2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      c2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      const inv = 1 - fraction;
      c1.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
      c1.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
      c1.textContent = texts[textIndexRef.current % texts.length];
      c2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    },
    [texts],
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;
    let fraction = morphRef.current / morphTime;
    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }
    setStyles(fraction);
    if (fraction === 1) textIndexRef.current++;
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [c1, c2] = [text1Ref.current, text2Ref.current];
    if (c1 && c2) {
      if (!c2.textContent) c2.textContent = texts[textIndexRef.current % texts.length];
      c2.style.filter = "none";
      c2.style.opacity = "100%";
      c1.style.filter = "none";
      c1.style.opacity = "0%";
    }
  }, [texts]);

  useEffect(() => {
    let id = 0;
    let visible = !document.hidden;
    const onVis = () => {
      visible = !document.hidden;
      timeRef.current = new Date();
    };
    document.addEventListener("visibilitychange", onVis);
    const animate = () => {
      id = requestAnimationFrame(animate);
      if (!visible) return;
      const now = new Date();
      const dt = Math.min((now.getTime() - timeRef.current.getTime()) / 1000, 0.1);
      timeRef.current = now;
      cooldownRef.current -= dt;
      const host = text1Ref.current?.parentElement;
      if (cooldownRef.current <= 0) {
        if (host) host.dataset.morphing = "1";
        doMorph();
      } else {
        // At rest the text is shown without the threshold filter, so it stays crisp.
        if (host) delete host.dataset.morphing;
        doCooldown();
      }
    };
    animate();
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref };
};

interface MorphingTextProps {
  className?: string;
  texts: string[];
  /** Shown instead of the animation when the user prefers reduced motion */
  staticText?: string;
}

function Texts({ texts }: { texts: string[] }) {
  const { text1Ref, text2Ref } = useMorphingText(texts);
  return (
    <>
      <span className="absolute inset-x-0 top-0 m-auto inline-block w-full" ref={text1Ref} />
      <span className="absolute inset-x-0 top-0 m-auto inline-block w-full" ref={text2Ref} />
    </>
  );
}

export function MorphingText({ texts, className, staticText }: MorphingTextProps) {
  const reduce = useReducedMotionPref();
  const raw = useId().replace(/:/g, "");
  const filterId = `myitra-morph-${raw}`;
  if (reduce) return <span className={cn("block", className)}>{staticText ?? texts.join(" ")}</span>;
  return (
    <span className={cn("relative block h-[1.25em] w-full leading-none [&[data-morphing]]:[filter:var(--morph-filter)]", className)} style={{ ["--morph-filter" as string]: `url(#${filterId}) blur(0.6px)` }}>
      <Texts texts={texts} />
      <svg aria-hidden className="fixed h-0 w-0" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id={filterId}>
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" />
          </filter>
        </defs>
      </svg>
    </span>
  );
}
