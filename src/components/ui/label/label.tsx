"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "../../../lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "font-pretendard text-[20px] font-semibold text-[#101010] mb-2 flex items-center gap-2 leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
