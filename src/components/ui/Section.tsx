import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

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

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        centered && "text-center",
        !centered && "max-w-2xl",
        className,
      )}
    >
      <p className="section-label mb-3">{eyebrow}</p>
      <h2
        className={cn(
          "font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl",
          centered && "mx-auto",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base text-muted-foreground md:text-lg",
            centered && "mx-auto max-w-xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
