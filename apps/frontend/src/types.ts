export interface Paragraph {
  id: string;
  text: string;
  styles?: string[];
}

export interface Document {
  paragraphs: Paragraph[];
}

export type TranslationStatus =
  | "idle"
  | "translating"
  | "verified"
  | "context_error"
  | "error";

export interface ParagraphTranslation {
  paragraphId: string;
  text: string;
  status: TranslationStatus;
  error?: string;
}

export type OverallStatus = "idle" | "translating" | "done";

export interface TranslationState {
  overallStatus: OverallStatus;
  translations: Map<string, ParagraphTranslation>;
  progress: { completed: number; total: number };
}

export interface Language {
  code: string;
  label: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: "de", label: "German", flag: "DE" },
  { code: "fr", label: "French", flag: "FR" },
  { code: "it", label: "Italian", flag: "IT" },
  { code: "es", label: "Spanish", flag: "ES" },
  { code: "pt", label: "Portuguese", flag: "PT" },
];
