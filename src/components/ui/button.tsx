import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none transition-all disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-[#4070D6] hover:bg-[#3460C0] text-white shadow-sm': variant === 'default',
            'border border-slate-400 bg-white hover:bg-slate-50 text-black shadow-sm': variant === 'outline',
            'hover:bg-slate-100 text-black': variant === 'ghost',
            'bg-red-500 hover:bg-red-600 text-white shadow-sm': variant === 'destructive',
            'h-9 px-4 py-2': size === 'default',
            'h-7 px-3 text-xs': size === 'sm',
            'h-11 px-8 text-base': size === 'lg',
            'h-9 w-9': size === 'icon',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
