import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*
 * Rainbow button, recoloured for MYITRA: a moving border and a blurred under-glow in greens and lime
 * only, sitting on a soft neumorphic (clay) body. Keeps the animate-rainbow keyframes, the variants,
 * the sizes and asChild.
 */
const GREENS = "linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))";

const rainbowButtonVariants = cva(
  cn(
    "relative cursor-pointer group animate-rainbow motion-reduce:animate-none",
    "inline-flex items-center justify-center gap-2 shrink-0 select-none",
    "rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-lime/70 aria-invalid:border-destructive",
    "font-semibold whitespace-nowrap",
    "transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
    "disabled:pointer-events-none disabled:opacity-60",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow motion-reduce:before:animate-none before:bg-[length:200%] before:[filter:blur(0.75rem)] before:opacity-80 before:pointer-events-none",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "text-white [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:2px_solid_transparent] bg-[length:200%]",
          "bg-[linear-gradient(180deg,#3f7f2f,#2D5E27),linear-gradient(#2D5E27_50%,rgba(45,94,39,0.6)_80%,rgba(45,94,39,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]",
          "shadow-[6px_6px_14px_rgba(62,112,50,.30),-6px_-6px_14px_rgba(255,255,255,.85),inset_0_1px_0_rgba(255,255,255,.22)]",
          "hover:shadow-[9px_9px_20px_rgba(62,112,50,.34),-8px_-8px_18px_rgba(255,255,255,.9),inset_0_1px_0_rgba(255,255,255,.25)]",
          "active:shadow-[inset_4px_4px_9px_rgba(10,30,8,.45),inset_-3px_-3px_8px_rgba(125,213,111,.25)]",
          "before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]",
        ),
        outline: cn(
          "text-deep [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:2px_solid_transparent] bg-[length:200%]",
          "bg-[linear-gradient(#EAF4E7,#EAF4E7),linear-gradient(#EAF4E7_50%,rgba(234,244,231,0.6)_80%,rgba(234,244,231,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]",
          "shadow-[6px_6px_14px_rgba(62,112,50,.22),-6px_-6px_14px_rgba(255,255,255,.9)]",
          "hover:shadow-[9px_9px_20px_rgba(62,112,50,.26),-8px_-8px_18px_rgba(255,255,255,.95)]",
          "active:shadow-[inset_4px_4px_9px_rgba(62,112,50,.24),inset_-4px_-4px_9px_rgba(255,255,255,.9)]",
          "before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:opacity-60",
        ),
      },
      size: {
        default: "h-11 px-6 text-[15px]",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-12 px-8 text-[16px]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof rainbowButtonVariants> {
  asChild?: boolean;
}

const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp data-slot="button" className={cn(rainbowButtonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
RainbowButton.displayName = "RainbowButton";

export { RainbowButton, rainbowButtonVariants, GREENS, type RainbowButtonProps };
