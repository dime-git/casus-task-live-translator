import React from "react";
import { LANGUAGES, type Language, type OverallStatus } from "../types";

interface TopBarProps {
  targetLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onTranslate: () => void;
  onCancel: () => void;
  overallStatus: OverallStatus;
}

export function TopBar({
  targetLanguage,
  onLanguageChange,
  onTranslate,
  onCancel,
  overallStatus,
}: TopBarProps) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-3">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-text-primary text-sm font-semibold text-surface">
            C
          </div>
          <div>
            <span className="text-sm font-semibold tracking-tight text-text-primary">
              Casus
            </span>
            <span className="ml-1 text-[10px] font-medium uppercase tracking-widest text-text-muted">
              Live Translator
            </span>
          </div>
        </div>

        <div className="ml-4 hidden items-center gap-2 text-xs text-text-muted sm:flex">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
          <span>NDA_Mutual_Vertex_v4.pdf</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-alt-2 px-3 py-1.5 text-sm">
          <span className="text-[10px] font-semibold uppercase text-text-muted">
            EN
          </span>
          <span className="text-xs text-text-primary">English (Source)</span>
          <span className="mx-1 text-text-muted">→</span>
          <span className="text-[10px] font-semibold uppercase text-text-muted">
            {targetLanguage.flag}
          </span>
          <select
            className="bg-transparent text-xs text-text-primary outline-none"
            value={targetLanguage.code}
            onChange={(e) => {
              const lang = LANGUAGES.find((l) => l.code === e.target.value);
              if (lang) onLanguageChange(lang);
            }}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {overallStatus === "translating" ? (
          <button
            onClick={onCancel}
            className="rounded-lg bg-accent px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Processing...
          </button>
        ) : (
          <button
            onClick={onTranslate}
            className="rounded-lg bg-text-primary px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            Translate
          </button>
        )}
      </div>
    </header>
  );
}
