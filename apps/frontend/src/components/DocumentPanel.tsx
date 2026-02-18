import React from "react";
import { Paragraph } from "./Paragraph";
import type { Paragraph as ParagraphType } from "../types";

interface DocumentPanelProps {
  paragraphs: ParagraphType[];
}

export function DocumentPanel({ paragraphs }: DocumentPanelProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <h2 className="text-sm font-semibold text-text-primary">
          Original Document
        </h2>
        <span className="rounded border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Read Only
        </span>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {paragraphs.map((p) => (
          <Paragraph
            key={p.id}
            id={p.id}
            text={p.text}
            styles={p.styles}
            variant="original"
          />
        ))}
      </div>
    </div>
  );
}
