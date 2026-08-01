import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";

export { SectionHeader };

export function Section({
  id,
  children,
  className,
  innerClassName,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 border-t border-border/60 py-20 md:py-28",
        className,
      )}
    >
      <div className={cn("section-shell", innerClassName)}>{children}</div>
    </section>
  );
}
