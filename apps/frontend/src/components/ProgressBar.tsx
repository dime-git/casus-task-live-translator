import React from "react";
import type { OverallStatus } from "../types";

interface ProgressBarProps {
  completed: number;
  total: number;
  overallStatus: OverallStatus;
}

export function ProgressBar({
  completed,
  total,
  overallStatus,
}: ProgressBarProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="flex items-center gap-4 border-b border-border bg-surface px-6 py-2.5">
      {overallStatus === "translating" && (
        <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-600">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
          Live
        </span>
      )}

      <div className="flex items-center gap-3 text-xs text-text-muted">
        <span className="font-medium text-text-primary">
          Translation Progress
        </span>
        {total > 0 && (
          <span>
            {completed}/{total} paragraphs
          </span>
        )}
      </div>

      {total > 0 && (
        <div className="flex-1">
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-accent transition-all duration-300 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
