import { DitherField } from "./dither-field";

/** Site-wide animated background: soft brand-green clouds of dither dots on the pale clay base. */
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <DitherField
        pattern="clouds"
        className="h-full w-full"
        color={["rgba(125,213,111,0.22)", "rgba(70,139,52,0.26)", "rgba(70,139,52,0.36)"]}
        dotSize={2}
        intensity={0.55}
        speed={0.7}
        fps={24}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(234,244,231,0)_0%,rgba(234,244,231,0.55)_70%)]" />
    </div>
  );
}
