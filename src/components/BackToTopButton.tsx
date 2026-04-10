"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-elevated/95 text-brand shadow-md backdrop-blur-sm transition-all hover:border-brand/50 hover:bg-brand-muted/40 hover:shadow-lg"
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}
