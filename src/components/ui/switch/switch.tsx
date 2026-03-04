"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "../../../lib/utils"

function Switch({
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false)
  const isChecked = checked ?? internalChecked

  const handleCheckedChange = React.useCallback(
    (value: boolean) => {
      if (checked === undefined) {
        setInternalChecked(value)
      }
      onCheckedChange?.(value)
    },
    [checked, onCheckedChange]
  )

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={handleCheckedChange}
      className={cn(
        "peer inline-flex shrink-0 items-center rounded-full w-[44px] h-[24px] cursor-pointer transition-colors duration-200 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        isChecked ? "bg-toggle-on hover:bg-[#2563EB]" : "bg-toggle-off hover:bg-[#B0BEC5]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-5 rounded-full bg-white ring-0 transition-transform duration-200 ease-in-out",
          isChecked ? "translate-x-[22px]" : "translate-x-[2px]"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
