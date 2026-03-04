"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "../../../lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex shrink-0 items-center rounded-full w-[44px] h-[24px] cursor-pointer transition-colors duration-200 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-toggle-off data-[state=checked]:bg-toggle-on data-[state=unchecked]:hover:bg-[#B0BEC5] data-[state=checked]:hover:bg-[#2563EB]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-5 rounded-full bg-white ring-0 transition-transform duration-200 ease-in-out data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[22px]"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
