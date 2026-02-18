import React from "react";
import type { TranslationStatus } from "../types";

interface ParagraphProps {
  id: string;
  text: string;
  styles?: string[];
  status?: TranslationStatus;
  variant: "original" | "translation";
  error?: string;
}

const PLACEHOLDER_REGEX = /(\{\{[A-Z_]+\}\})/g;

function renderTextWithPlaceholders(
  text: string,
  variant: "original" | "translation",
) {
  const parts = text.split(PLACEHOLDER_REGEX);
  return parts.map((part, i) => {
    if (PLACEHOLDER_REGEX.test(part)) {
      PLACEHOLDER_REGEX.lastIndex = 0;
      return (
        <span
          key={i}
          className={`inline-block rounded px-1.5 py-0.5 font-mono text-[0.8em] font-medium ${
            variant === "original"
              ? "bg-orange-100 text-orange-700"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function StatusBadge({ status }: { status: TranslationStatus }) {
  switch (status) {
    case "verified":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Verified
        </span>
      );
    case "context_error":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-600">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          Context Error
        </span>
      );
    case "error":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-600">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          Error
        </span>
      );
    case "translating":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-600">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
          Translating
        </span>
      );
    default:
      return null;
  }
}

export function Paragraph({
  id,
  text,
  styles = [],
  status,
  variant,
  error,
}: ParagraphProps) {
  const idNumber = id.replace("p", "");

  const isHeading = styles.some(
    (s) => s.includes("text-2xl") || s.includes("text-3xl"),
  );

  return (
    <div className="group relative flex gap-4">
      <div className="flex w-8 shrink-0 flex-col items-end pt-1">
        <span className="font-mono text-[11px] text-text-muted">{idNumber}</span>
      </div>

      <div
        className={`min-w-0 flex-1 ${
          status === "translating"
            ? "border-l-2 border-blue-400 pl-4"
            : status === "error" || status === "context_error"
              ? "border-l-2 border-red-400 pl-4"
              : "pl-[18px]"
        }`}
      >
        {status && status !== "idle" && (
          <div className="mb-1.5">
            <StatusBadge status={status} />
          </div>
        )}

        {error ? (
          <p className="text-sm italic text-red-500">{error}</p>
        ) : (
          <p
            className={`leading-relaxed ${
              isHeading
                ? "font-heading text-xl font-semibold text-text-primary"
                : "font-body text-[15px] text-text-body"
            }`}
          >
            {text ? renderTextWithPlaceholders(text, variant) : (
              variant === "translation" && status === "idle" ? (
                <span className="text-text-muted italic text-sm">
                  Waiting for translation...
                </span>
              ) : null
            )}
          </p>
        )}
      </div>
    </div>
  );
}
