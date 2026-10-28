import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & { variant?: "primary" | "quiet"; size?: "md" | "sm" };

/**
 * Primary: the only blue fill on the site. Near-black text on #4F8EF7 = 6.1:1 (AA).
 * Quiet: ink text with an underline that draws in on hover.
 */
export function Button({ variant = "primary", size = "md", className = "", children, ...rest }: Props) {
  if (variant === "quiet") {
    return (
      <Link {...rest} className={`tap group inline-flex items-center gap-2 text-fg ${className}`}>
        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:100%_1px]">
          {children}
        </span>
        <span aria-hidden="true" className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
          →
        </span>
      </Link>
    );
  }
  const sizing = size === "sm" ? "h-10 touch:h-11 px-4 gap-2 text-small" : "h-12 px-6 gap-3";
  return (
    <Link
      {...rest}
      className={`group inline-flex shrink-0 items-center rounded-full bg-accent font-medium whitespace-nowrap text-on-accent transition-[transform,background-color] duration-300 ease-out-expo hover:bg-[#6a9ff8] active:scale-[0.98] ${sizing} ${className}`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
