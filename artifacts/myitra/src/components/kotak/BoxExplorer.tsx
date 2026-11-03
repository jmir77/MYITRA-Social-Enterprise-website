import { Component, Suspense, lazy, useEffect, useRef, useState, type ReactNode } from "react";
import { PackageOpen, Package, Tags, RotateCcw, Move3d, Hand } from "lucide-react";
import { img } from "@/lib/site";
import { RainbowButton } from "@/components/fx/rainbow-button";
import { BOX_CONTENTS, type BoxItemId } from "./box-contents";

const BoxScene = lazy(() => import("./box-scene"));

export function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    (gl as WebGLRenderingContext | null)?.getExtension("WEBGL_lose_context")?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}

class GLBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function Skeleton() {
  return <div className="ph absolute inset-0 animate-pulse rounded-[22px]" aria-hidden />;
}

export function BoxExplorer() {
  const wellRef = useRef<HTMLDivElement>(null);
  const [gl] = useState(hasWebGL);
  const [near, setNear] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [docVisible, setDocVisible] = useState(() => !document.hidden);
  const [open, setOpen] = useState(false);
  const [labels, setLabels] = useState(true);
  const [active, setActive] = useState<BoxItemId | null>(null);
  const [touchMode, setTouchMode] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [coarse] = useState(() => window.matchMedia("(hover: none), (pointer: coarse)").matches);
  const [reduce] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const el = wellRef.current;
    if (!el) return;
    const pre = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); pre.disconnect(); } }, { rootMargin: "400px 0px" });
    const vis = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { rootMargin: "60px 0px" });
    pre.observe(el);
    vis.observe(el);
    const onVis = () => setDocVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => { pre.disconnect(); vis.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  // Open the lid shortly after the model first comes into view.
  useEffect(() => {
    if (!onScreen || open || interacted) return;
    const t = window.setTimeout(() => setOpen(true), reduce ? 0 : 700);
    return () => window.clearTimeout(t);
    // only the first reveal
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScreen]);

  const fallback = (
    <img src={img("kotak-cantik-box-contents.jpg")} alt="An open Kotak Cantik box with blue-wrapped pads in a row, bamboo toothbrush packs, a soap bar, a pocket tissue pack and a face mask pack" className="absolute inset-0 size-full rounded-[22px] object-cover" loading="lazy" />
  );

  const controls = !coarse || touchMode;
  const idle = !interacted && !reduce;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr] lg:gap-8">
      <div className="min-w-0">
        <div
          ref={wellRef}
          className={`neu-in neu-pink relative aspect-[4/3] w-full overflow-hidden rounded-[26px]! p-1.5 ${touchMode ? "ring-2 ring-brand/60" : ""}`}
          role="group"
          aria-label="Interactive 3D model of a Kotak Cantik box and what is inside it"
          data-testid="box-3d"
        >
          <div className="relative size-full">
            {!gl ? fallback : near ? (
              <GLBoundary fallback={fallback}>
                <Suspense fallback={<Skeleton />}>
                  <BoxScene
                    open={open}
                    labels={labels}
                    active={active}
                    setActive={setActive}
                    controls={controls}
                    zoom={coarse && touchMode}
                    running={onScreen && docVisible}
                    resetKey={resetKey}
                    idle={idle}
                    onInteract={() => setInteracted(true)}
                  />
                </Suspense>
              </GLBoundary>
            ) : <Skeleton />}
          </div>
          {gl && (
            <span aria-hidden className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#fdf3f6]/90 px-3 py-1 text-[12px] font-semibold text-deep shadow-[2px_2px_6px_rgba(178,61,104,.15)]">
              {coarse ? <Hand className="size-3.5" /> : <Move3d className="size-3.5" />}
              {coarse ? (touchMode ? "Drag to rotate, pinch to zoom" : "Tap Rotate to turn the box") : "Drag to rotate"}
            </span>
          )}
        </div>
        {gl && (
          <div className="mt-5 flex flex-wrap gap-3" role="toolbar" aria-label="3D box controls">
            <RainbowButton type="button" size="sm" onClick={() => { setOpen((o) => !o); setInteracted(true); }} aria-pressed={open} data-testid="button-box-lid">
              {open ? <Package /> : <PackageOpen />} {open ? "Close lid" : "Open lid"}
            </RainbowButton>
            <RainbowButton type="button" size="sm" variant="outline" onClick={() => setLabels((l) => !l)} aria-pressed={labels} data-testid="button-box-labels">
              <Tags /> {labels ? "Hide labels" : "Show labels"}
            </RainbowButton>
            {coarse && (
              <RainbowButton type="button" size="sm" variant="outline" onClick={() => { setTouchMode((t) => !t); setInteracted(true); }} aria-pressed={touchMode} data-testid="button-box-rotate">
                <Move3d /> {touchMode ? "Done" : "Rotate"}
              </RainbowButton>
            )}
            <RainbowButton type="button" size="sm" variant="outline" onClick={() => { setResetKey((k) => k + 1); setInteracted(false); setActive(null); }} data-testid="button-box-reset">
              <RotateCcw /> Reset view
            </RainbowButton>
          </div>
        )}
      </div>

      <ul className="grid grid-cols-2 gap-3 self-start sm:grid-cols-3 lg:grid-cols-2" aria-label="What's inside one box">
        {BOX_CONTENTS.map((c, i) => {
          const on = active === c.id;
          return (
            <li key={c.id}>
              <button
                type="button"
                aria-pressed={on}
                onMouseEnter={() => setActive(c.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(c.id)}
                onBlur={() => setActive(null)}
                onClick={() => { setActive(on ? null : c.id); if (!open) setOpen(true); }}
                className={`card neu-pink relative w-full p-4 text-left outline-none transition-[box-shadow,transform] duration-300 focus-visible:ring-2 focus-visible:ring-brand md:p-5 ${on ? "shadow-[inset_4px_4px_10px_rgba(178,61,104,.16),inset_-4px_-4px_10px_rgba(255,255,255,.9)]! translate-y-px" : ""}`}
                data-testid={`legend-${c.id}`}
              >
                {gl && <span aria-hidden className={`absolute right-3 top-3 grid size-6 place-items-center rounded-full text-[11px] font-bold ${on ? "bg-deep text-white" : "bg-[#EAF4E7] text-deep"}`}>{i + 1}</span>}
                <span className={`grid size-10 place-items-center rounded-full! ${on ? "bg-deep text-white" : "neu-in text-[#a3335c]"}`}><c.icon className="size-5" strokeWidth={1.75} aria-hidden /></span>
                <span className="mt-3 block text-[30px] font-bold leading-none text-deep tabular-nums">{c.n}</span>
                <span className="mt-1.5 block text-[14px] leading-snug">{c.t}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
