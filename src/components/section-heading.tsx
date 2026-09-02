import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div
        className={cn(
          "mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em]",
          inverse ? "text-brand-gold" : "text-primary",
          align === "center" && "justify-center",
        )}
      >
        <span className="h-px w-8 bg-current" />
        {eyebrow}
      </div>
      <h2
        className={cn(
          "font-display text-3xl font-bold leading-tight sm:text-4xl",
          inverse ? "text-nav-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-7",
            inverse ? "text-nav-muted" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
