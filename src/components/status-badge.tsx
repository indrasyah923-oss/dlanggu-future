import { cn } from "@/lib/utils";
import type { SubmissionStatus } from "@/lib/mock-store";

const map: Record<SubmissionStatus, { dot: string; className: string }> = {
  "Menunggu Persetujuan": {
    dot: "🟡",
    className: "bg-status-pending-soft text-status-pending",
  },
  Disetujui: { dot: "🟢", className: "bg-status-approved-soft text-status-approved" },
  Ditolak: { dot: "🔴", className: "bg-status-rejected-soft text-status-rejected" },
  Ditutup: { dot: "⚪", className: "bg-muted text-muted-foreground" },
};

export function StatusBadge({
  status,
  className,
}: {
  status: SubmissionStatus;
  className?: string;
}) {
  const style = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
        style.className,
        className,
      )}
    >
      <span aria-hidden="true">{style.dot}</span>
      {status}
    </span>
  );
}
