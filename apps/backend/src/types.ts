export interface Paragraph {
  id: string;
  text: string;
  styles?: string[];
}

export interface TranslateRequest {
  paragraphs: Paragraph[];
  targetLanguage: string;
}

export type SSEEventType =
  | "paragraph:start"
  | "paragraph:done"
  | "paragraph:error"
  | "complete";

export interface ParagraphStartEvent {
  paragraphId: string;
}

export interface ParagraphDoneEvent {
  paragraphId: string;
  text: string;
  verified: boolean;
}

export interface ParagraphErrorEvent {
  paragraphId: string;
  error: string;
}

export interface CompleteEvent {
  translated: number;
  failed: number;
  total: number;
}
