import React from "react";
import { Paragraph } from "./Paragraph";
import type {
  Paragraph as ParagraphType,
  ParagraphTranslation,
  OverallStatus,
} from "../types";

interface TranslationPanelProps {
  paragraphs: ParagraphType[];
  translations: Record<string, ParagraphTranslation>;
  overallStatus: OverallStatus;
  targetLanguageLabel: string;
}

export function TranslationPanel({
  paragraphs,
  translations,
  overallStatus,
  targetLanguageLabel,
}: TranslationPanelProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <h2 className="text-sm font-semibold text-text-primary">
          {targetLanguageLabel} Translation
        </h2>
        {overallStatus === "translating" && (
          <span className="rounded bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
            Streaming
          </span>
        )}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {overallStatus === "idle" ? (
          <div className="flex h-full items-center justify-center py-20">
            <p className="text-sm text-text-muted">
              Select a language and click <strong>Translate</strong> to begin.
            </p>
          </div>
        ) : (
          paragraphs.map((p) => {
            const t = translations[p.id];
            return (
              <Paragraph
                key={p.id}
                id={p.id}
                text={t?.text ?? ""}
                styles={p.styles}
                status={t?.status ?? "idle"}
                variant="translation"
                error={t?.error}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
