import { Feather, Sparkles, Smile, Package, Bath, Droplets } from "lucide-react";

export type BoxItemId = "pads" | "liners" | "brushes" | "paste" | "soap" | "wash";

/* Exactly what goes into one Kotak Cantik box. Shared by the 3D model, its legend and the fallback. */
export const BOX_CONTENTS: { id: BoxItemId; n: number; t: string; icon: typeof Feather }[] = [
  { id: "pads", n: 10, t: "Sanitary Pads", icon: Feather },
  { id: "liners", n: 10, t: "Panty Liners", icon: Sparkles },
  { id: "brushes", n: 5, t: "Bamboo Toothbrushes", icon: Smile },
  { id: "paste", n: 1, t: "Toothpaste", icon: Package },
  { id: "soap", n: 1, t: "Bar Soap", icon: Bath },
  { id: "wash", n: 1, t: "Feminine Wash", icon: Droplets },
];
