import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full min-w-0 border border-border rounded-md font-inter text-[18px] text-black placeholder:text-placeholder bg-white px-4",
        "hover:border-[#CBD5E0]",
        "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-[border-color,box-shadow] duration-150 ease-out",
        "disabled:bg-table-header disabled:text-placeholder disabled:cursor-not-allowed",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
