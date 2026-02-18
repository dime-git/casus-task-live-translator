import OpenAI from "openai";

const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

export class OpenAITranslationProvider {
  private client: OpenAI | null = null;

  private getClient(): OpenAI {
    if (!this.client) {
      this.client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
    return this.client;
  }

  async translate(text: string, systemPrompt: string): Promise<string> {
    const response = await this.getClient().chat.completions.create({
      model: MODEL,
      temperature: 0.3,
      messages: [
        { role: "developer", content: systemPrompt },
        { role: "user", content: text },
      ],
    });

    return response.choices[0]?.message?.content ?? "";
  }
}
