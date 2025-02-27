import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#6545a4] text-black shadow-md hover:bg-[#6545a4]/85 hover:shadow-lg active:scale-[0.98]",
        destructive:
          "bg-[#6545a4] text-black shadow-md hover:bg-[#6545a4]/85 hover:shadow-lg active:scale-[0.98]",
        outline:
          "border border-input bg-background text-white shadow-sm hover:bg-[#6545a4] hover:text-white hover:shadow-md",
        secondary:
          "bg-[#6545a4] text-white shadow-md hover:bg-[#6545a4]/85 hover:shadow-lg active:scale-[0.98]",
        ghost:
          "hover:bg-[#6545a4] hover:text-black transition-all hover:shadow-md",
        link: "text-white underline-offset-4 hover:underline hover:text-[#6545a4]/90",
      },
      size: {
        default: "h-10 px-5 py-2.5 text-base",
        sm: "h-9 px-4 py-2 text-sm",
        lg: "h-12 px-6 text-lg",
        icon: "h-10 w-10 p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
