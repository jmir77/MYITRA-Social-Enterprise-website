import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { RainbowButton } from "./rainbow-button";

export type Shot = { src: string; alt: string; label?: string };

export function Lightbox({ shots, index, onClose, onIndex }: { shots: Shot[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<Element | null>(null);
  const open = index !== null;
  const n = shots.length;
  const go = useCallback((d: number) => { if (index !== null) onIndex((index + d + n) % n); }, [index, n, onIndex]);
  const goRef = useRef(go);
  goRef.current = go;
  const closeFn = useRef(onClose);
  closeFn.current = onClose;

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFn.current();
      else if (e.key === "ArrowRight") goRef.current(1);
      else if (e.key === "ArrowLeft") goRef.current(-1);
    };
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", k);
      (lastFocus.current as HTMLElement | null)?.focus?.();
    };
  }, [open]);

  // swipe
  const sx = useRef<number | null>(null);
  if (!open || index === null) return null;
  const s = shots[index];
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={s.label ?? "Photo"}
      className="fixed inset-0 z-[90] grid place-items-center bg-[#173512]/80 p-3 backdrop-blur-sm animate-in fade-in duration-200 md:p-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => { sx.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { if (sx.current === null) return; const dx = e.changedTouches[0].clientX - sx.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); sx.current = null; }}
      data-testid="lightbox"
    >
      <figure className="neu relative flex max-h-full w-full max-w-5xl flex-col p-2.5 md:p-3">
        <img key={s.src} src={s.src} alt={s.alt} className="mx-auto max-h-[72dvh] w-auto max-w-full rounded-[18px] object-contain animate-in fade-in zoom-in-95 duration-300" />
        <figcaption className="flex items-center justify-between gap-3 px-2 pt-3 pb-1">
          <span className="min-w-0 text-[14px] text-deep">{s.label ?? s.alt}</span>
          <span className="shrink-0 text-[12px] font-semibold tabular-nums text-[#3a7a2b]">{index + 1} / {n}</span>
        </figcaption>
        <RainbowButton ref={closeRef} type="button" size="icon" variant="outline" aria-label="Close" onClick={onClose} className="absolute -top-3 -right-1 md:-right-3" data-testid="button-lightbox-close"><X /></RainbowButton>
        {n > 1 && (
          <>
            <RainbowButton type="button" size="icon" variant="outline" aria-label="Previous photo" onClick={() => go(-1)} className="absolute left-1 top-1/2 -translate-y-1/2 md:-left-6"><ChevronLeft /></RainbowButton>
            <RainbowButton type="button" size="icon" variant="outline" aria-label="Next photo" onClick={() => go(1)} className="absolute right-1 top-1/2 -translate-y-1/2 md:-right-6"><ChevronRight /></RainbowButton>
          </>
        )}
      </figure>
    </div>,
    document.body,
  );
}

/** A photo that lifts on hover and opens a lightbox. */
export function PhotoButton({ shot, onOpen, className = "", imgClass = "aspect-[4/3]", eager = false }: { shot: Shot; onOpen: () => void; className?: string; imgClass?: string; eager?: boolean }) {
  return (
    <button type="button" onClick={onOpen} aria-label={`Open photo: ${shot.label ?? shot.alt}`} className={`group neu relative block w-full overflow-hidden p-2 text-left outline-none transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-brand md:p-2.5 ${className}`}>
      <span className="block overflow-hidden rounded-[16px]">
        <img src={shot.src} alt={shot.alt} loading={eager ? "eager" : "lazy"} decoding="async" className={`block w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06] ${imgClass}`} />
      </span>
      <span aria-hidden className="absolute right-4 bottom-4 grid size-9 place-items-center rounded-full bg-[#EAF4E7]/90 text-deep opacity-0 shadow-[3px_3px_8px_rgba(0,0,0,.15)] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <Expand className="size-4" />
      </span>
    </button>
  );
}

/** Gallery grid with a shared lightbox. First photo can be featured (spans two columns). */
export function Gallery({ shots, feature = true, className = "" }: { shots: Shot[]; feature?: boolean; className?: string }) {
  const [i, setI] = useState<number | null>(null);
  return (
    <>
      <div className={`grid grid-cols-2 gap-3 md:gap-4 ${className}`}>
        {shots.map((s, k) => (
          <PhotoButton key={s.src} shot={s} onOpen={() => setI(k)} className={feature && k === 0 && shots.length % 2 === 1 ? "col-span-2" : ""} imgClass={feature && k === 0 && shots.length % 2 === 1 ? "aspect-[16/9]" : "aspect-[4/3]"} />
        ))}
      </div>
      <Lightbox shots={shots} index={i} onClose={() => setI(null)} onIndex={setI} />
    </>
  );
}
