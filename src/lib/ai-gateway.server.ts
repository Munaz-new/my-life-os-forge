import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export function createAiProvider(apiKey: string) {
  const baseURL = process.env.AI_BASE_URL;
  if (!baseURL) throw new Error("AI_BASE_URL is required");
  return createOpenAICompatible({ name: "lifeos", baseURL, apiKey });
}

export const CORE_MODEL = process.env.AI_MODEL ?? "";
