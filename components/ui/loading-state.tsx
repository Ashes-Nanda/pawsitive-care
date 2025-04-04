import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  size?: "sm" | "md" | "lg"
}

const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ className, text = "Loading...", size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center space-x-2 text-muted-foreground",
          className
        )}
        {...props}
      >
        <Loader2 className={cn("animate-spin", sizeClasses[size])} />
        <span className="text-sm">{text}</span>
      </div>
    )
  }
)
LoadingState.displayName = "LoadingState"

export { LoadingState } 