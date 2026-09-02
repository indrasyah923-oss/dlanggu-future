import { Sparkles } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="batik-pattern relative overflow-hidden bg-hero pt-32 text-nav-foreground sm:pt-36">
      <div className="container-shell relative z-10 py-16 sm:py-24">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-nav-foreground/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold">
            <Sparkles className="size-3.5" /> {eyebrow}
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-nav-muted sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
