import React, { useState } from "react";
import sampleDoc from "./sampleDoc.json";
import { TopBar } from "./components/TopBar";
import { DocumentPanel } from "./components/DocumentPanel";
import { TranslationPanel } from "./components/TranslationPanel";
import { ProgressBar } from "./components/ProgressBar";
import { useTranslation } from "./hooks/useTranslation";
import { LANGUAGES, type Language } from "./types";

export default function App() {
  const [targetLanguage, setTargetLanguage] = useState<Language>(LANGUAGES[0]);
  const { overallStatus, translations, completed, total, error, startTranslation, cancel } =
    useTranslation();

  const handleTranslate = () => {
    startTranslation(sampleDoc.paragraphs, targetLanguage.code);
  };

  return (
    <div className="flex h-screen flex-col bg-canvas">
      <TopBar
        targetLanguage={targetLanguage}
        onLanguageChange={setTargetLanguage}
        onTranslate={handleTranslate}
        onCancel={cancel}
        overallStatus={overallStatus}
      />

      <ProgressBar
        completed={completed}
        total={total}
        overallStatus={overallStatus}
      />

      {error && (
        <div className="border-b border-red-200 bg-red-50 px-6 py-2 text-sm text-red-700">
          Connection error: {error}
        </div>
      )}

      <div className="flex min-h-0 flex-1 gap-0">
        <div className="flex flex-1 p-4 pr-2">
          <DocumentPanel paragraphs={sampleDoc.paragraphs} />
        </div>
        <div className="flex flex-1 p-4 pl-2">
          <TranslationPanel
            paragraphs={sampleDoc.paragraphs}
            translations={translations}
            overallStatus={overallStatus}
            targetLanguageLabel={targetLanguage.label}
          />
        </div>
      </div>
    </div>
  );
}
