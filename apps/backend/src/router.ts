import { Router } from "express";
import type { TranslateRequest, SSEEventType } from "./types.js";
import { OpenAITranslationProvider } from "./services/translationService.js";
import { buildTranslationPrompt } from "./lib/prompt.js";
import { validateTranslation } from "./lib/validateTranslation.js";

export const router = Router();

const provider = new OpenAITranslationProvider();

function sendSSE(
  res: import("express").Response,
  event: SSEEventType,
  data: unknown,
) {
  res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

router.post("/translate/stream", async (req, res) => {
  const { paragraphs, targetLanguage } = req.body as TranslateRequest;

  if (!paragraphs?.length || !targetLanguage) {
    res.status(400).json({ error: "paragraphs and targetLanguage are required" });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  let clientDisconnected = false;
  res.on("close", () => { clientDisconnected = true; });

  const systemPrompt = buildTranslationPrompt(targetLanguage);
  let translated = 0;
  let failed = 0;

  for (const paragraph of paragraphs) {
    if (clientDisconnected) break;

    sendSSE(res, "paragraph:start", { paragraphId: paragraph.id });

    try {
      const text = await provider.translate(paragraph.text, systemPrompt);
      const { verified } = validateTranslation(paragraph.text, text);

      sendSSE(res, "paragraph:done", {
        paragraphId: paragraph.id,
        text,
        verified,
      });
      translated++;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Translation failed";
      sendSSE(res, "paragraph:error", {
        paragraphId: paragraph.id,
        error: message,
      });
      failed++;
    }
  }

  sendSSE(res, "complete", { translated, failed, total: paragraphs.length });
  res.end();
});
