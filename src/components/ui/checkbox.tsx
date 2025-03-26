"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@utils";
import { Check } from "lucide-react";
import { forwardRef } from "react";

import type { ComponentPropsWithoutRef, ElementRef } from "react";

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:ring-ring h-4 w-4 shrink-0 rounded-sm border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
