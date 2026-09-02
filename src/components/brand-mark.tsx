import { GraduationCap } from "lucide-react";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="grid size-11 shrink-0 place-items-center rounded-lg border border-brand-gold/40 bg-brand-lavender text-primary shadow-sm">
        <GraduationCap className="size-6" aria-hidden="true" />
      </div>
      {!compact && (
        <div className="min-w-0 leading-tight">
          <span className="block truncate font-display text-base font-bold text-nav-foreground">
            SMKN 1 Dlanggu
          </span>
          <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-nav-muted">
            Digital School & Career Center
          </span>
        </div>
      )}
    </div>
  );
}
