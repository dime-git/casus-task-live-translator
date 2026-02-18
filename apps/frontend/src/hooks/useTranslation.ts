import { useCallback, useRef, useState } from "react";
import { connectSSE } from "../lib/sse";
import type {
  Paragraph,
  ParagraphTranslation,
  OverallStatus,
} from "../types";

interface TranslationHookState {
  overallStatus: OverallStatus;
  translations: Record<string, ParagraphTranslation>;
  completed: number;
  total: number;
  error: string | null;
}

export function useTranslation() {
  const [state, setState] = useState<TranslationHookState>({
    overallStatus: "idle",
    translations: {},
    completed: 0,
    total: 0,
    error: null,
  });

  const controllerRef = useRef<AbortController | null>(null);

  const startTranslation = useCallback(
    (paragraphs: Paragraph[], targetLanguage: string) => {
      controllerRef.current?.abort();

      const total = paragraphs.length;
      const initial: Record<string, ParagraphTranslation> = {};
      for (const p of paragraphs) {
        initial[p.id] = { paragraphId: p.id, text: "", status: "idle" };
      }

      setState({
        overallStatus: "translating",
        translations: initial,
        completed: 0,
        total,
        error: null,
      });

      const controller = connectSSE(
        "/translate/stream",
        { paragraphs, targetLanguage },
        (sseEvent) => {
          const data = JSON.parse(sseEvent.data);

          switch (sseEvent.event) {
            case "paragraph:start":
              setState((prev) => ({
                ...prev,
                translations: {
                  ...prev.translations,
                  [data.paragraphId]: {
                    ...prev.translations[data.paragraphId],
                    status: "translating",
                    text: "",
                  },
                },
              }));
              break;

            case "paragraph:done":
              setState((prev) => ({
                ...prev,
                completed: prev.completed + 1,
                translations: {
                  ...prev.translations,
                  [data.paragraphId]: {
                    paragraphId: data.paragraphId,
                    text: data.text,
                    status: data.verified ? "verified" : "context_error",
                  },
                },
              }));
              break;

            case "paragraph:error":
              setState((prev) => ({
                ...prev,
                completed: prev.completed + 1,
                translations: {
                  ...prev.translations,
                  [data.paragraphId]: {
                    paragraphId: data.paragraphId,
                    text: "",
                    status: "error",
                    error: data.error,
                  },
                },
              }));
              break;

            case "complete":
              setState((prev) => ({
                ...prev,
                overallStatus: "done",
              }));
              break;
          }
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            overallStatus: "done",
            error: err.message,
          }));
        },
        () => {},
      );

      controllerRef.current = controller;
    },
    [],
  );

  const cancel = useCallback(() => {
    controllerRef.current?.abort();
    setState((prev) => ({ ...prev, overallStatus: "done" }));
  }, []);

  return { ...state, startTranslation, cancel };
}
