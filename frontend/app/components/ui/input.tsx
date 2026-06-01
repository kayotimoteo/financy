import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 file:text-foreground py-3.5 px-3 placeholder:font-normal placeholder:text-gray-400 selection:bg-gray-200 caret-brand-base selection:text-gray-800 border-input w-full min-w-0 rounded-md border bg-transparent text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed md:text-md",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        "disabled:select-none",
        "autofill:transition-[background-color] autofill:duration-[5000s]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
