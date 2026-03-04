import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "../../../lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium transition-[background-color,color,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:    "bg-primary hover:bg-primary-hover active:bg-primary-active active:scale-[0.98] text-white font-pretendard text-[18px] font-semibold",
        secondary:  "bg-sidebar-selected text-black font-pretendard text-[18px] font-semibold",
        pagination: "bg-primary-light text-primary hover:bg-[#A0C4C3] hover:text-primary-hover",
        ghost:      "bg-transparent text-delete-text hover:underline hover:text-primary-hover p-0 h-auto text-[14px]",
        outline:    "border border-border bg-transparent text-black hover:bg-sidebar-selected",
      },
      size: {
        default:    "h-10 px-4 rounded-lg",
        secondary:  "h-12 px-4 rounded-md",
        pagination: "h-10 w-10 rounded-md",
        ghost:      "h-auto p-0",
        icon:       "size-9",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

function Button({ className, variant = "primary", size = "default", asChild = false, ...props }:
  React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp data-slot="button" data-variant={variant} data-size={size}
      className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
