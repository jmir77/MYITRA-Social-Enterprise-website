import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import source from "./get-started-button.html?raw";
import { RainbowButton } from "./rainbow-button";

function hasWebGL2() {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}

/**
 * The single primary hero CTA: the liquid-chrome shader button, tinted green, rendered in a sandboxed
 * iframe and set in a neumorphic well. Clicks inside the iframe arrive by postMessage; a focusable
 * Link laid over it carries the keyboard and screen-reader semantics.
 */
export function HeroCta() {
  const hostRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [, setLocation] = useLocation();
  const [gl] = useState(hasWebGL2);
  const [hostVisible, setHostVisible] = useState(true);
  const [docVisible, setDocVisible] = useState(() => !document.hidden);
  const [ready, setReady] = useState(false);
  const mounted = gl && hostVisible && docVisible;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(([e]) => setHostVisible(e?.isIntersecting ?? true), { rootMargin: "80px" });
    io.observe(host);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const on = () => setDocVisible(!document.hidden);
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);

  useEffect(() => setReady(false), [mounted]);

  useEffect(() => {
    const on = (e: MessageEvent) => {
      if (e.source !== frameRef.current?.contentWindow) return;
      if ((e.data as { type?: string })?.type === "myitra-cta") setLocation("/kotak-cantik");
    };
    window.addEventListener("message", on);
    return () => window.removeEventListener("message", on);
  }, [setLocation]);

  const hover = (on: boolean) => frameRef.current?.contentWindow?.postMessage({ type: "myitra-hover", on }, "*");

  if (!gl) {
    return (
      <RainbowButton asChild size="lg">
        <Link href="/kotak-cantik" data-testid="button-hero-explore">Explore Kotak Cantik <ArrowRight /></Link>
      </RainbowButton>
    );
  }

  return (
    <div ref={hostRef} className="neu-in relative w-full max-w-[360px] sm:w-[360px] aspect-[860/380] rounded-full! overflow-hidden" data-state={!mounted ? "paused" : ready ? "ready" : "loading"}>
      <span aria-hidden className={`absolute inset-[14%_9%] rounded-full bg-[linear-gradient(#f4f8f2,#cfdccb)] transition-opacity duration-300 ${ready ? "opacity-0" : "opacity-100 animate-pulse"}`} />
      {mounted && (
        <iframe
          ref={frameRef}
          title="Explore Kotak Cantik button"
          aria-hidden="true"
          tabIndex={-1}
          srcDoc={source}
          sandbox="allow-scripts"
          onLoad={() => setReady(true)}
          className="absolute inset-0 block h-full w-full border-0 bg-transparent transition-opacity duration-300"
          style={{ opacity: ready ? 1 : 0, pointerEvents: ready ? "auto" : "none", colorScheme: "light" }}
        />
      )}
      <Link
        href="/kotak-cantik"
        aria-label="Explore Kotak Cantik"
        onFocus={() => hover(true)}
        onBlur={() => hover(false)}
        className={`absolute inset-[12%_6%] rounded-full outline-none focus-visible:outline-[3px] focus-visible:outline-brand focus-visible:outline-offset-2 ${ready ? "pointer-events-none" : ""}`}
        data-testid="button-hero-explore"
      >
        <span className="sr-only">Explore Kotak Cantik</span>
      </Link>
    </div>
  );
}
