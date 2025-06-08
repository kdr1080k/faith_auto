import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-white hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-white hover:bg-secondary/90",
        accent:
          "border-transparent bg-accent text-white hover:bg-accent/90",
        success:
          "border-transparent bg-success text-white hover:bg-success/90",
        danger:
          "border-transparent bg-danger text-white hover:bg-danger/90",
        warning:
          "border-transparent bg-warning text-black hover:bg-warning/90",
        info:
          "border-transparent bg-info text-white hover:bg-info/90",
        outline:
          "text-text-primary border-border hover:bg-background-light",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, className }))} {...props} />
  )
}

export { Badge, badgeVariants }
